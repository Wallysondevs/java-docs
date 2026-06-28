# O Comando keytool

## Nome

keytool - um utilitário de gerenciamento de chaves e certificados

## Sinopse

`keytool` [_comandos_]

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

  * `-version`: Imprime a versão do programa




Consulte Comandos e Opções para uma descrição desses comandos com suas opções.

## Descrição

O comando `keytool` é um utilitário de gerenciamento de chaves e certificados. Ele permite que os usuários administrem seus próprios pares de chaves públicas/privadas e certificados associados para uso em autoautenticação (onde um usuário se autentica para outros usuários e serviços) ou serviços de integridade e autenticação de dados, usando assinaturas digitais. O comando `keytool` também permite que os usuários armazenem em cache as chaves públicas (na forma de certificados) de seus pares de comunicação.

Um certificado é uma declaração digitalmente assinada de uma entidade (pessoa, empresa, etc.), que afirma que a chave pública (e algumas outras informações) de alguma outra entidade tem um valor específico. Quando os dados são assinados digitalmente, a assinatura pode ser verificada para checar a integridade e autenticidade dos dados. Integridade significa que os dados não foram modificados ou adulterados, e autenticidade significa que os dados vêm do indivíduo que afirma tê-los criado e assinado.

O comando `keytool` também permite que os usuários administrem chaves secretas e passphrases usadas em criptografia e descriptografia simétricas (Data Encryption Standard). Ele também pode exibir outras informações relacionadas à segurança.

O comando `keytool` armazena as chaves e certificados em um keystore.

O comando `keytool` usa as propriedades de segurança `jdk.certpath.disabledAlgorithms` e `jdk.security.legacyAlgorithms` para determinar quais algorithms são considerados um risco de segurança. Ele emite avisos quando algorithms desabilitados ou legados estão sendo usados. As propriedades de segurança `jdk.certpath.disabledAlgorithms` e `jdk.security.legacyAlgorithms` são definidas no arquivo `java.security` (localizado no diretório `$JAVA_HOME/conf/security` do JDK).

## Notas sobre Comandos e Opções

As seguintes notas se aplicam às descrições em Comandos e Opções:

  * Todos os nomes de comandos e opções são precedidos por um sinal de hífen (`-`).

  * Apenas um comando pode ser fornecido.

  * As opções para cada comando podem ser fornecidas em qualquer ordem.

  * Existem dois tipos de opções: uma é de valor único, que deve ser fornecida apenas uma vez. Se uma opção de valor único for fornecida várias vezes, o valor da última é usado. O outro tipo é de múltiplos valores, que pode ser fornecida várias vezes e todos os valores são usados. A única opção de múltiplos valores atualmente suportada é a opção `-ext` usada para gerar extensões de certificado X.509v3.

  * Todos os itens que não estão em itálico ou entre chaves ({ }) ou colchetes ([ ]) devem aparecer como estão.

  * Chaves envolvendo uma opção significam que um valor padrão é usado quando a opção não é especificada na linha de comando. Chaves também são usadas em torno das opções `-v`, `-rfc` e `-J`, que só têm significado quando aparecem na linha de comando. Elas não possuem valores padrão.

  * Colchetes envolvendo uma opção significam que o usuário é solicitado a fornecer os valores quando a opção não é especificada na linha de comando. Para a opção `-keypass`, se você não especificar a opção na linha de comando, o comando `keytool` primeiro tenta usar a senha do keystore para recuperar a chave privada/secreta. Se essa tentativa falhar, o comando `keytool` solicitará a senha da chave privada/secreta.

  * Itens em itálico (valores de opção) representam os valores reais que devem ser fornecidos. Por exemplo, aqui está o formato do comando `-printcert`:

> `keytool -printcert` {`-file` _cert_file_} {`-v`}

Quando você especifica um comando `-printcert`, substitua _cert_file_ pelo nome do arquivo real, como segue: `keytool -printcert -file VScert.cer`

  * Os valores das opções devem ser colocados entre aspas quando contêm um espaço em branco.




## Comandos e Opções

Os comandos keytool e suas opções podem ser agrupados pelas tarefas que executam.

Comandos para Criar ou Adicionar Dados ao Keystore:

  * `-gencert`

  * `-genkeypair`

  * `-genseckey`

  * `-importcert`

  * `-importpass`




Comandos para Importar Conteúdo de Outro Keystore:

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



Comandos para Exibir a Versão do Programa:

  * `-version`



## Comandos para Criar ou Adicionar Dados ao Keystore

`-gencert`
    

As seguintes são as opções disponíveis para o comando `-gencert`:

  * {`-rfc`}: Saída no estilo RFC (Request For Comment)

  * {`-infile` _infile_}: Nome do arquivo de entrada

  * {`-outfile` _outfile_}: Nome do arquivo de saída

  * {`-alias` _alias_}: Nome do alias da entrada a ser processada

  * {`-sigalg` _sigalg_}: Nome do algoritmo de assinatura

  * {`-dname` _dname_}: Nome distinto

  * {`-startdate` _startdate_}: Data e hora de início da validade do certificado

  * {`-ext` _ext_}*: Extensão X.509

  * {`-validity` _days_}: Número de dias de validade

  * [`-keypass` _arg_]: Senha da chave

  * {`-keystore` _keystore_}: Nome do keystore

  * [`-storepass` _arg_]: Senha do keystore

  * {`-storetype` _type_}: Tipo de keystore

  * {`-providername` _name_}: Nome do provider

  * {`-addprovider` _name_ [`-providerarg` _arg_]}: Adiciona um security provider pelo nome (como SunPKCS11) com um argumento de configuração opcional. O valor do security provider é o nome de um security provider que é definido em um módulo.

Por exemplo,

> `keytool -addprovider SunPKCS11 -providerarg some.cfg ...`

**Nota:**

Por razões de compatibilidade, o provider SunPKCS11 ainda pode ser carregado com `-providerclass sun.security.pkcs11.SunPKCS11` mesmo que agora esteja definido em um módulo. Este é o único módulo incluído no JDK que precisa de uma configuração e, portanto, o mais amplamente usado com a opção `-providerclass`. Para security providers legados localizados no classpath e carregados por reflection, `-providerclass` ainda deve ser usado.

  * {`-providerclass` _class_ [`-providerarg` _arg_]}: Adiciona security provider pelo nome de classe totalmente qualificado com um argumento de configuração opcional.

Por exemplo, se `MyProvider` é um provider legado carregado via reflection,

> `keytool -providerclass com.example.MyProvider ...`

  * {`-providerpath` _list_}: Classpath do provider

  * {`-v`}: Saída detalhada

  * {`-protected`}: Senha fornecida através de um mecanismo protegido




Use o comando `-gencert` para gerar um certificado como resposta a um arquivo de solicitação de certificado (que pode ser criado pelo comando `keytool -certreq`). O comando lê a solicitação de _infile_ ou, se omitido, da entrada padrão, assina-o usando a chave privada do alias e gera o certificado X.509 para _outfile_ ou, se omitido, para a saída padrão. Quando `-rfc` é especificado, o formato de saída é PEM codificado em Base64; caso contrário, um DER binário é criado.

O valor de `-sigalg` especifica o algorithm que deve ser usado para assinar o certificado. O argumento _startdate_ é a data e hora de início da validade do certificado. O argumento _days_ indica o número de dias pelos quais o certificado deve ser considerado válido.

Quando _dname_ é fornecido, ele é usado como o subject do certificado gerado. Caso contrário, o da solicitação de certificado é usado.

O valor de `-ext` mostra quais extensões X.509 serão incorporadas no certificado. Leia Opções de Comando Comuns para a grammar de `-ext`.

A opção `-gencert` permite criar cadeias de certificados. O exemplo a seguir cria um certificado, `e1`, que contém três certificados em sua cadeia de certificados.

Os seguintes comandos criam quatro pares de chaves nomeados `ca`, `ca1`, `ca2` e `e1`:
```
    keytool -alias ca -dname CN=CA -genkeypair -keyalg rsa
    keytool -alias ca1 -dname CN=CA -genkeypair -keyalg rsa
    keytool -alias ca2 -dname CN=CA -genkeypair -keyalg rsa
    keytool -alias e1 -dname CN=E1 -genkeypair -keyalg rsa
```

Os dois comandos a seguir criam uma cadeia de certificados assinados; `ca` assina `ca1` e `ca1` assina `ca2`, todos os quais são autoemitidos:
```
    keytool -alias ca1 -certreq |
        keytool -alias ca -gencert -ext san=dns:ca1 |
        keytool -alias ca1 -importcert
    
    keytool -alias ca2 -certreq |
        keytool -alias ca1 -gencert -ext san=dns:ca2 |
        keytool -alias ca2 -importcert
```

O comando a seguir cria o certificado `e1` e o armazena no arquivo `e1.cert`, que é assinado por `ca2`. Como resultado, `e1` deve conter `ca`, `ca1` e `ca2` em sua cadeia de certificados:

> `keytool -alias e1 -certreq | keytool -alias ca2 -gencert > e1.cert`

`-genkeypair`
    

As seguintes são as opções disponíveis para o comando `-genkeypair`:

  * {`-alias` _alias_}: Nome do alias da entrada a ser processada

  * `-keyalg` _alg_ : Nome do algoritmo da chave

  * {`-keysize` _size_}: Tamanho em bits da chave

  * {`-groupname` _name_}: Nome do grupo. Por exemplo, um nome de Elliptic Curve.

  * {`-sigalg` _alg_}: Nome do algoritmo de assinatura

  * {`-signer` _alias_}: Alias do signatário

  * [`-signerkeypass` _arg_]: Senha da chave do signatário

  * [`-dname` _name_]: Nome distinto

  * {`-startdate` _date_}: Data e hora de início da validade do certificado

  * {`-ext` _value_}*: Extensão X.509

  * {`-validity` _days_}: Número de dias de validade

  * [`-keypass` _arg_]: Senha da chave

  * {`-keystore` _keystore_}: Nome do keystore

  * [`-storepass` _arg_]: Senha do keystore

  * {`-storetype` _type_}: Tipo de keystore

  * {`-providername` _name_}: Nome do provider

  * {`-addprovider` _name_ [`-providerarg` _arg_]}: Adiciona security provider pelo nome (como SunPKCS11) com um argumento de configuração opcional.

  * {`-providerclass` _class_ [`-providerarg` _arg_] }: Adiciona security provider pelo nome de classe totalmente qualificado com um argumento de configuração opcional.

  * {`-providerpath` _list_}: Classpath do provider

  * {`-v`}: Saída detalhada

  * {`-protected`}: Senha fornecida através de um mecanismo protegido




Use o comando `-genkeypair` para gerar um par de chaves (uma chave pública e a chave privada associada). Quando a opção `-signer` não é especificada, a chave pública é encapsulada em um certificado autoassinado X.509 v3 e armazenada como uma cadeia de certificados de elemento único. Quando a opção `-signer` é especificada, um novo certificado é gerado e assinado pelo signatário designado e armazenado como uma cadeia de certificados de múltiplos elementos (contendo o próprio certificado gerado e a cadeia de certificados do signatário). A cadeia de certificados e a chave privada são armazenadas em uma nova entrada do keystore que é identificada por seu alias.

O valor de `-keyalg` especifica o algorithm a ser usado para gerar o par de chaves. O valor de `-keysize` especifica o tamanho de cada chave a ser gerada. O valor de `-groupname` especifica o grupo nomeado (por exemplo, o nome padrão ou predefinido de uma Elliptic Curve) da chave a ser gerada.

Quando um valor `-keysize` é fornecido, ele será usado para inicializar um objeto `KeyPairGenerator` usando o método `initialize(int keysize)`. Quando um valor `-groupname` é fornecido, ele será usado para inicializar um objeto `KeyPairGenerator` usando o método `initialize(AlgorithmParameterSpec params)` onde `params` é `new NamedParameterSpec(groupname)`.

Apenas um de `-groupname` e `-keysize` pode ser especificado. Se um algorithm tiver vários grupos nomeados que possuem o mesmo tamanho de chave, a opção `-groupname` geralmente deve ser usada. Neste caso, se `-keysize` for especificado, cabe ao security provider determinar qual grupo nomeado é escolhido ao gerar um par de chaves.

O valor de `-sigalg` especifica o algorithm que deve ser usado para assinar o certificado. Este algorithm deve ser compatível com o valor de `-keyalg`.

O valor de `-signer` especifica o alias de uma `PrivateKeyEntry` para o signatário que já existe no keystore. Esta opção é usada para assinar o certificado com a chave privada do signatário. Isso é especialmente útil para key agreement algorithms (ou seja, o valor de `-keyalg` é `XDH`, `X25519`, `X448` ou `DH`), pois essas chaves não podem ser usadas para digital signatures e, portanto, um certificado autoassinado não pode ser criado.

O valor de `-signerkeypass` especifica a senha da chave privada do signatário. Ele pode ser especificado se a chave privada da entrada do signatário for protegida por uma senha diferente da store password.

O valor de `-dname` especifica o X.500 Distinguished Name a ser associado ao valor de `-alias`. Se a opção `-signer` não for especificada, os campos issuer e subject do certificado autoassinado são preenchidos com o nome distinto especificado. Se a opção `-signer` for especificada, o campo subject do certificado é preenchido com o nome distinto especificado e o campo issuer é preenchido com o campo subject do certificado do signatário. Se um nome distinto não for fornecido na linha de comando, o usuário será solicitado a fornecê-lo.

O valor de `-keypass` é uma senha usada para proteger a chave privada do par de chaves gerado. Se uma senha não for fornecida, o usuário será solicitado a fornecê-la. Se você pressionar a tecla **Return** no prompt, a senha da chave será definida como a mesma senha do keystore. O valor de `-keypass` deve ter pelo menos seis caracteres.

O valor de `-startdate` especifica o issue time do certificado, também conhecido como o valor "Not Before" do campo Validity do certificado X.509.

O valor da opção pode ser definido em uma destas duas formas:

([`+-`]_nnn_[`ymdHMS`])+

[_yyyy_`/`_mm_`/`_dd_] [_HH_`:`_MM_`:`_SS_]

Com a primeira forma, o issue time é deslocado pelo valor especificado a partir da hora atual. O valor é uma concatenação de uma sequência de subvalores. Dentro de cada subvalor, o sinal de mais (+) significa deslocar para frente, e o sinal de menos (-) significa deslocar para trás. O tempo a ser deslocado é _nnn_ unidades de anos, meses, dias, horas, minutos ou segundos (denotados por um único caractere de `y`, `m`, `d`, `H`, `M` ou `S` respectivamente). O valor exato do issue time é calculado usando o método `java.util.GregorianCalendar.add(int field, int amount)` em cada subvalor, da esquerda para a direita. Por exemplo, o issue time pode ser especificado por:
```
    Calendar c = new GregorianCalendar();
    c.add(Calendar.YEAR, -1);
    c.add(Calendar.MONTH, 1);
    c.add(Calendar.DATE, -1);
    return c.getTime()
```

Com a segunda forma, o usuário define o issue time exato em duas partes, ano/mês/dia e hora:minuto:segundo (usando o local time zone). O usuário pode fornecer apenas uma parte, o que significa que a outra parte é a mesma que a data (ou hora) atual. O usuário deve fornecer o número exato de dígitos mostrado na definição do formato (preenchendo com 0 quando mais curto). Quando data e hora são fornecidas, há um (e apenas um) caractere de espaço entre as duas partes. A hora deve ser sempre fornecida no formato de 24 horas.

Quando a opção não é fornecida, a data de início é a hora atual. A opção só pode ser fornecida uma vez.

O valor de _date_ especifica o número de dias (começando na data especificada por `-startdate`, ou na data atual quando `-startdate` não é especificado) pelos quais o certificado deve ser considerado válido.

`-genseckey`
    

As seguintes são as opções disponíveis para o comando `-genseckey`:

  * {`-alias` _alias_}: Nome do alias da entrada a ser processada

  * [`-keypass` _arg_]: Senha da chave

  * `-keyalg` _alg_ : Nome do algoritmo da chave

  * {`-keysize` _size_}: Tamanho em bits da chave

  * {`-keystore` _keystore_}: Nome do keystore

  * [`-storepass` _arg_]: Senha do keystore

  * {`-storetype` _type_}: Tipo de keystore

  * {`-providername` _name_}: Nome do provider

  * {`-addprovider` _name_ [`-providerarg` _arg_]}: Adiciona security provider pelo nome (como SunPKCS11) com um argumento de configuração opcional.

  * {`-providerclass` _class_ [`-providerarg` _arg_]}: Adiciona security provider pelo nome de classe totalmente qualificado com um argumento de configuração opcional.

  * {`-providerpath` _list_}: Classpath do provider

  * {`-v`}: Saída detalhada

  * {`-protected`}: Senha fornecida através de um mecanismo protegido




Use o comando `-genseckey` para gerar uma chave secreta e armazená-la em uma nova `KeyStore.SecretKeyEntry` identificada por `alias`.

O valor de `-keyalg` especifica o algorithm a ser usado para gerar a chave secreta, e o valor de `-keysize` especifica o tamanho da chave que é gerada. O valor de `-keypass` é uma senha que protege a chave secreta. Se uma senha não for fornecida, o usuário será solicitado a fornecê-la. Se você pressionar a tecla **Return** no prompt, a senha da chave será definida como a mesma senha usada para o `-keystore`. O valor de `-keypass` deve conter pelo menos seis caracteres.

`-importcert`
    

As seguintes são as opções disponíveis para o comando `-importcert`:

  * {`-noprompt`}: Não solicitar

  * {`-trustcacerts`}: Confiar em certificados de cacerts

  * {`-protected`}: Senha é fornecida através de mecanismo protegido

  * {`-alias` _alias_}: Nome do alias da entrada a ser processada

  * {`-file` _file_}: Nome do arquivo de entrada

  * [`-keypass` _arg_]: Senha da chave

  * {`-keystore` _keystore_}: Nome do keystore

  * {`-cacerts`}: Acessa o keystore cacerts

  * [`-storepass` _arg_]: Senha do keystore

  * {`-storetype` _type_}: Tipo de keystore

  * {`-providername` _name_}: Nome do provider

  * {`-addprovider` _name_ [`-providerarg` _arg_]}: Adiciona security provider pelo nome (como SunPKCS11) com um argumento de configuração opcional.

  * {`-providerclass` _class_ [`-providerarg` _arg_]}: Adiciona security provider pelo nome de classe totalmente qualificado com um argumento de configuração opcional.

  * {`-providerpath` _list_}: Classpath do provider

  * {`-v`}: Saída detalhada




Use o comando `-importcert` para ler o certificado ou a cadeia de certificados (onde esta última é fornecida em uma resposta formatada em PKCS#7 ou em uma sequência de certificados X.509) de `-file` _file_ e armazená-lo na entrada do `keystore` identificada por `-alias`. Se `-file` _file_ não for especificado, o certificado ou a cadeia de certificados é lida de `stdin`.

O comando `keytool` pode importar certificados X.509 v1, v2 e v3, e cadeias de certificados formatadas em PKCS#7 consistindo em certificados desse tipo. Os dados a serem importados devem ser fornecidos em formato de codificação binária ou em formato de codificação imprimível (também conhecido como Base64 encoding), conforme definido pelo padrão Internet RFC 1421. Neste último caso, a codificação deve ser delimitada no início por uma string que começa com `-----BEGIN` e delimitada no final por uma string que começa com `-----END`.

Você importa um certificado por duas razões: Para adicioná-lo à lista de trusted certificates, e para importar uma certificate reply recebida de uma certificate authority (CA) como resultado do envio de uma Certificate Signing Request (CSR) para essa CA. Consulte o comando `-certreq` em Comandos para Gerar uma Solicitação de Certificado.

O tipo de importação é indicado pelo valor da opção `-alias`. Se o alias não apontar para uma key entry, o comando `keytool` assume que você está adicionando uma trusted certificate entry. Neste caso, o alias não deve já existir no keystore. Se o alias existir, o comando `keytool` gera um erro porque um trusted certificate já existe para esse alias e não importa o certificado. Se `-alias` apontar para uma key entry, o comando `keytool` assume que você está importando uma certificate reply.

`-importpass`
    

As seguintes são as opções disponíveis para o comando `-importpass`:

  * {`-alias` _alias_}: Nome do alias da entrada a ser processada

  * [`-keypass` _arg_]: Senha da chave

  * {`-keyalg` _alg_}: Nome do algoritmo da chave

  * {`-keysize` _size_}: Tamanho em bits da chave

  * {`-keystore` _keystore_}: Nome do keystore

  * [`-storepass` _arg_]: Senha do keystore

  * {`-storetype` _type_}: Tipo de keystore

  * {`-providername` _name_}: Nome do provider

  * {`-addprovider` _name_ [`-providerarg` _arg_]}: Adiciona security provider pelo nome (como SunPKCS11) com um argumento de configuração opcional.

  * {`-providerclass` _class_ [`-providerarg` _arg_]}: Adiciona security provider pelo nome de classe totalmente qualificado com um argumento de configuração opcional.

  * {`-providerpath` _list_}: Classpath do provider

  * {`-v`}: Saída detalhada

  * {`-protected`}: Senha fornecida através de um mecanismo protegido




Use o comando `-importpass` para importar uma passphrase e armazená-la em uma nova `KeyStore.SecretKeyEntry` identificada por `-alias`. A passphrase pode ser fornecida via standard input stream; caso contrário, o usuário será solicitado a fornecê-la. A opção `-keypass` fornece uma senha para proteger a passphrase importada. Se uma senha não for fornecida, o usuário será solicitado a fornecê-la. Se você pressionar a tecla **Return** no prompt, a senha da chave será definida como a mesma senha usada para o `keystore`. O valor de `-keypass` deve conter pelo menos seis caracteres.
## Comandos para Importar Conteúdo de Outro Keystore

`-importkeystore`
    

A seguir estão as opções disponíveis para o comando `-importkeystore`:

  * `-srckeystore` _keystore_ : Nome do keystore de origem

  * {`-destkeystore` _keystore_}: Nome do keystore de destino

  * {`-srcstoretype` _type_}: Tipo do keystore de origem

  * {`-deststoretype` _type_}: Tipo do keystore de destino

  * [`-srcstorepass` _arg_]: Senha do keystore de origem

  * [`-deststorepass` _arg_]: Senha do keystore de destino

  * {`-srcprotected`}: Senha do keystore de origem protegida

  * {`-destprotected`}: Senha do keystore de destino protegida

  * {`-srcprovidername` _name_}: Nome do provedor do keystore de origem

  * {`-destprovidername` _name_}: Nome do provedor do keystore de destino

  * {`-srcalias` _alias_}: Alias de origem

  * {`-destalias` _alias_}: Alias de destino

  * [`-srckeypass` _arg_]: Senha da chave de origem

  * [`-destkeypass` _arg_]: Senha da chave de destino

  * {`-noprompt`}: Não solicitar

  * {`-addprovider` _name_ [`-providerarg` _arg_]}: Adiciona provedor de segurança por nome (como SunPKCS11) com um argumento de configuração opcional.

  * {`-providerclass` _class_ [`-providerarg` _arg_]}: Adiciona provedor de segurança por nome de classe totalmente qualificado com um argumento de configuração opcional

  * {`-providerpath` _list_}: classpath do provedor

  * {`-v`}: Saída detalhada




**Nota:**

Esta é a primeira linha de todas as opções:

> `-srckeystore` _keystore_ `-destkeystore` _keystore_

Use o comando `-importkeystore` para importar uma única entrada ou todas as entradas de um keystore de origem para um keystore de destino.

**Nota:**

Se você não especificar `-destkeystore` ao usar o comando `keytool -importkeystore`, o keystore padrão usado é `$HOME/.keystore`.

Quando a opção `-srcalias` é fornecida, o comando importa a única entrada identificada pelo alias para o keystore de destino. Se um alias de destino não for fornecido com `-destalias`, então `-srcalias` é usado como o alias de destino. Se a entrada de origem for protegida por uma senha, então `-srckeypass` é usado para recuperar a entrada. Se `-srckeypass` não for fornecido, o comando `keytool` tenta usar `-srcstorepass` para recuperar a entrada. Se `-srcstorepass` não for fornecido ou estiver incorreto, o usuário será solicitado a fornecer uma senha. A entrada de destino é protegida com `-destkeypass`. Se `-destkeypass` não for fornecido, a entrada de destino é protegida com a senha da entrada de origem. Por exemplo, a maioria das ferramentas de terceiros exige que `storepass` e `keypass` em um keystore PKCS #12 sejam os mesmos. Para criar um keystore PKCS#12 para essas ferramentas, sempre especifique um `-destkeypass` que seja o mesmo que `-deststorepass`.

Se a opção `-srcalias` não for fornecida, todas as entradas no keystore de origem serão importadas para o keystore de destino. Cada entrada de destino é armazenada sob o alias da entrada de origem. Se a entrada de origem for protegida por uma senha, então `-srcstorepass` é usado para recuperar a entrada. Se `-srcstorepass` não for fornecido ou estiver incorreto, o usuário será solicitado a fornecer uma senha. Se um tipo de entrada do keystore de origem não for suportado no keystore de destino, ou se ocorrer um erro ao armazenar uma entrada no keystore de destino, o usuário será solicitado a pular a entrada e continuar ou a sair. A entrada de destino é protegida com a senha da entrada de origem.

Se o alias de destino já existir no keystore de destino, o usuário será solicitado a sobrescrever a entrada ou a criar uma nova entrada sob um nome de alias diferente.

Se a opção `-noprompt` for fornecida, o usuário não será solicitado a fornecer um novo alias de destino. As entradas existentes são sobrescritas com o nome do alias de destino. As entradas que não podem ser importadas são ignoradas e um aviso é exibido.

## Comandos para Gerar uma Requisição de Certificado

`-certreq`
    

A seguir estão as opções disponíveis para o comando `-certreq`:

  * {`-alias` _alias_}: Nome do alias da entrada a ser processada

  * {`-sigalg` _alg_}: Nome do algoritmo de assinatura

  * {`-file` _file_}: Nome do arquivo de saída

  * [ `-keypass` _arg_]: Senha da chave

  * {`-keystore` _keystore_}: Nome do keystore

  * {`-dname` _name_}: Nome distinto

  * {`-ext` _value_}: Extensão X.509

  * [`-storepass` _arg_]: Senha do keystore

  * {`-storetype` _type_}: Tipo do keystore

  * {`-providername` _name_}: Nome do provedor

  * {`-addprovider` _name_ [`-providerarg` _arg_]}: Adiciona provedor de segurança por nome (como SunPKCS11) com um argumento de configuração opcional.

  * {`-providerclass` _class_ [`-providerarg` _arg_]}: Adiciona provedor de segurança por nome de classe totalmente qualificado com um argumento de configuração opcional.

  * {`-providerpath` _list_}: classpath do provedor

  * {`-v`}: Saída detalhada

  * {`-protected`}: Senha fornecida através de um mecanismo protegido




Use o comando `-certreq` para gerar uma Requisição de Assinatura de Certificado (CSR) usando o formato PKCS #10.

Uma CSR destina-se a ser enviada a uma CA. A CA autentica o solicitante do certificado (geralmente offline) e retorna um certificado ou cadeia de certificados para substituir a cadeia de certificados existente (inicialmente um certificado autoassinado) no keystore.

A chave privada associada a _alias_ é usada para criar a requisição de certificado PKCS #10. Para acessar a chave privada, a senha correta deve ser fornecida. Se `-keypass` não for fornecido na linha de comando e for diferente da senha usada para proteger a integridade do keystore, o usuário será solicitado a fornecê-la. Se `-dname` for fornecido, ele será usado como o assunto na CSR. Caso contrário, o Nome Distinto X.500 associado ao alias será usado.

O valor de `-sigalg` especifica o algoritmo que deve ser usado para assinar a CSR.

A CSR é armazenada no `-file` _file_. Se um arquivo não for especificado, a CSR é enviada para `-stdout`.

Use o comando `-importcert` para importar a resposta da CA.

## Comandos para Exportar Dados

`-exportcert`
    

A seguir estão as opções disponíveis para o comando `-exportcert`:

  * {`-rfc`}: Saída no estilo RFC

  * {`-alias` _alias_}: Nome do alias da entrada a ser processada

  * {`-file` _file_}: Nome do arquivo de saída

  * {`-keystore` _keystore_}: Nome do keystore

  * {`-cacerts`}: Acessa o keystore cacerts

  * [`-storepass` _arg_]: Senha do keystore

  * {`-storetype` _type_}: Tipo do keystore

  * {`-providername` _name_}: Nome do provedor

  * {`-addprovider` _name_ [`-providerarg` _arg_]}: Adiciona provedor de segurança por nome (como SunPKCS11) com um argumento de configuração opcional.

  * {`-providerclass` _class_ [`-providerarg` _arg_]}: Adiciona provedor de segurança por nome de classe totalmente qualificado com um argumento de configuração opcional.

  * {`-providerpath` _list_}: classpath do provedor

  * {`-v`}: Saída detalhada

  * {`-protected`}: Senha fornecida através de um mecanismo protegido




Use o comando `-exportcert` para ler um certificado do keystore que está associado a `-alias` _alias_ e armazená-lo no `-file` _file_. Quando um arquivo não é especificado, o certificado é enviado para `stdout`.

Por padrão, o certificado é enviado em codificação binária. Se a opção `-rfc` for especificada, a saída será no formato de codificação imprimível definido pelo Padrão de Codificação de Certificados RFC 1421 da Internet.

Se `-alias` se refere a um certificado confiável, então esse certificado é enviado. Caso contrário, `-alias` se refere a uma entrada de chave com uma cadeia de certificados associada. Nesse caso, o primeiro certificado na cadeia é retornado. Este certificado autentica a chave pública da entidade endereçada por `-alias`.

## Comandos para Exibir Dados

`-list`
    

A seguir estão as opções disponíveis para o comando `-list`:

  * {`-rfc`}: Saída no estilo RFC

  * {`-alias` _alias_}: Nome do alias da entrada a ser processada

  * {`-keystore` _keystore_}: Nome do keystore

  * {`-cacerts`}: Acessa o keystore cacerts

  * [`-storepass` _arg_]: Senha do keystore

  * {`-storetype` _type_}: Tipo do keystore

  * {`-providername` _name_}: Nome do provedor

  * {`-addprovider` _name_ [`-providerarg` _arg_]}: Adiciona provedor de segurança por nome (como SunPKCS11) com um argumento de configuração opcional.

  * {`-providerclass` _class_ [`-providerarg` _arg_]}: Adiciona provedor de segurança por nome de classe totalmente qualificado com um argumento de configuração opcional.

  * {`-providerpath` _list_}: classpath do provedor

  * {`-v`}: Saída detalhada

  * {`-protected`}: Senha fornecida através de um mecanismo protegido




Use o comando `-list` para imprimir o conteúdo da entrada do keystore identificada por `-alias` para `stdout`. Se `-alias` _alias_ não for especificado, o conteúdo de todo o keystore será impresso.

Por padrão, este comando imprime a impressão digital SHA-256 de um certificado. Se a opção `-v` for especificada, o certificado será impresso em formato legível por humanos, com informações adicionais como proprietário, emissor, número de série e quaisquer extensões. Se a opção `-rfc` for especificada, o conteúdo do certificado será impresso usando o formato de codificação imprimível, conforme definido pelo Padrão de Codificação de Certificados RFC 1421 da Internet.

**Nota:**

Você não pode especificar `-v` e `-rfc` no mesmo comando. Caso contrário, um erro será relatado.

`-printcert`
    

A seguir estão as opções disponíveis para o comando `-printcert`:

  * {`-rfc`}: Saída no estilo RFC

  * {`-file` _cert_file_}: Nome do arquivo de entrada

  * {`-sslserver` _server_[`:`_port_]}:: Host e porta do servidor Secure Sockets Layer (SSL)

  * {`-jarfile` _JAR_file_}: Arquivo `.jar` assinado

  * {`-keystore` _keystore_}: Nome do keystore

  * {`-trustcacerts`}: Confiar em certificados de cacerts

  * [`-storepass` _arg_]: Senha do keystore

  * {`-storetype` _type_}: Tipo do keystore

  * {`-providername` _name_}: Nome do provedor

  * {`-addprovider` _name_ [`-providerarg` _arg_]}: Adiciona provedor de segurança por nome (como SunPKCS11) com um argumento de configuração opcional.

  * {`-providerclass` _class_ [`-providerarg` _arg_]}: Adiciona provedor de segurança por nome de classe totalmente qualificado com um argumento de configuração opcional.

  * {`-providerpath` _list_}: classpath do provedor

  * {`-protected`}: A senha é fornecida através de mecanismo protegido

  * {`-v`}: Saída detalhada




Use o comando `-printcert` para ler e imprimir o certificado de `-file` _cert_file_, do servidor SSL localizado em `-sslserver` _server_[`:`_port_], ou do arquivo JAR assinado especificado por `-jarfile` _JAR_file_. Ele imprime seu conteúdo em um formato legível por humanos. Quando uma porta não é especificada, a porta HTTPS padrão 443 é assumida.

**Nota:**

As opções `-sslserver` e `-file` não podem ser fornecidas no mesmo comando. Caso contrário, um erro será relatado. Se você não especificar nenhuma das opções, o certificado será lido de `stdin`.

Quando `-rfc` é especificado, o comando `keytool` imprime o certificado no modo PEM conforme definido pelo padrão de Codificação de Certificados RFC 1421 da Internet.

Se o certificado for lido de um arquivo ou `stdin`, ele pode estar codificado em binário ou em formato de codificação imprimível, conforme definido pelo padrão de Codificação de Certificados RFC 1421.

Se o servidor SSL estiver atrás de um firewall, as opções `-J-Dhttps.proxyHost=proxyhost` e `-J-Dhttps.proxyPort=proxyport` podem ser especificadas na linha de comando para tunelamento de proxy.

**Nota:**

Este comando pode ser usado independentemente de um keystore. Este comando não verifica a fraqueza do algoritmo de assinatura de um certificado se for um certificado confiável no keystore do usuário (especificado por `-keystore`) ou no keystore `cacerts` (se `-trustcacerts` for especificado).

`-printcertreq`
    

A seguir estão as opções disponíveis para o comando `-printcertreq`:

  * {`-file` _file_}: Nome do arquivo de entrada

  * {`-v`}: Saída detalhada




Use o comando `-printcertreq` para imprimir o conteúdo de uma requisição de certificado no formato PKCS #10, que pode ser gerada pelo comando `keytool -certreq`. O comando lê a requisição do arquivo. Se não houver arquivo, a requisição é lida da entrada padrão.

`-printcrl`
    

A seguir estão as opções disponíveis para o comando `-printcrl`:

  * {`-file crl`}: Nome do arquivo de entrada

  * {`-keystore` _keystore_}: Nome do keystore

  * {`-trustcacerts`}: Confiar em certificados de cacerts

  * [`-storepass` _arg_]: Senha do keystore

  * {`-storetype` _type_}: Tipo do keystore

  * {`-providername` _name_}: Nome do provedor

  * {`-addprovider` _name_ [`-providerarg` _arg_]}: Adiciona provedor de segurança por nome (como SunPKCS11) com um argumento de configuração opcional.

  * {`-providerclass` _class_ [`-providerarg` _arg_]}: Adiciona provedor de segurança por nome de classe totalmente qualificado com um argumento de configuração opcional.

  * {`-providerpath` _list_}: classpath do provedor

  * {`-protected`}: A senha é fornecida através de mecanismo protegido

  * {`-v`}: Saída detalhada




Use o comando `-printcrl` para ler a Lista de Revogação de Certificados (CRL) de `-file crl`. Uma CRL é uma lista de certificados digitais que foram revogados pela CA que os emitiu. A CA gera o arquivo `crl`.

**Nota:**

Este comando pode ser usado independentemente de um keystore. Este comando tenta verificar a CRL usando um certificado do keystore do usuário (especificado por `-keystore`) ou do keystore `cacerts` (se `-trustcacerts` for especificado), e imprimirá um aviso se não puder ser verificado.

## Comandos para Gerenciar o Keystore

`-storepasswd`
    

A seguir estão as opções disponíveis para o comando `-storepasswd`:

  * [`-new` _arg_]: Nova senha

  * {`-keystore` _keystore_}: Nome do keystore

  * {`-cacerts`}: Acessa o keystore cacerts

  * [`-storepass` _arg_]: Senha do keystore

  * {`-storetype` _type_}: Tipo do keystore

  * {`-providername` _name_}: Nome do provedor

  * {`-addprovider` _name_ [`-providerarg` _arg_]}: Adiciona provedor de segurança por nome (como SunPKCS11) com um argumento de configuração opcional.

  * {`-providerclass` _class_ [`-providerarg` _arg_]}: Adiciona provedor de segurança por nome de classe totalmente qualificado com um argumento de configuração opcional.

  * {`-providerpath` _list_}: classpath do provedor

  * {`-v`}: Saída detalhada




Use o comando `-storepasswd` para alterar a senha usada para proteger a integridade do conteúdo do keystore. A nova senha é definida por `-new` _arg_ e deve conter pelo menos seis caracteres.

`-keypasswd`
    

A seguir estão as opções disponíveis para o comando `-keypasswd`:

  * {`-alias` _alias_}: Nome do alias da entrada a ser processada

  * [`-keypass` _old_keypass_]: Senha da chave

  * [`-new` _new_keypass_]: Nova senha

  * {`-keystore` _keystore_}: Nome do keystore

  * {`-storepass` _arg_}: Senha do keystore

  * {`-storetype` _type_}: Tipo do keystore

  * {`-providername` _name_}: Nome do provedor

  * {`-addprovider` _name_ [`-providerarg` _arg_]}: Adiciona provedor de segurança por nome (como SunPKCS11) com um argumento de configuração opcional.

  * {`-providerclass` _class_ [`-providerarg` _arg_]}: Adiciona provedor de segurança por nome de classe totalmente qualificado com um argumento de configuração opcional.

  * {`-providerpath` _list_}: classpath do provedor

  * {`-v`}: Saída detalhada




Use o comando `-keypasswd` para alterar a senha (sob a qual as chaves privadas/secretas identificadas por `-alias` são protegidas) de `-keypass` _old_keypass_ para `-new` _new_keypass_. O valor da senha deve conter pelo menos seis caracteres.

Se a opção `-keypass` não for fornecida na linha de comando e a senha `-keypass` for diferente da senha do keystore (`-storepass` _arg_), o usuário será solicitado a fornecê-la.

Se a opção `-new` não for fornecida na linha de comando, o usuário será solicitado a fornecê-la.

`-delete`
    

A seguir estão as opções disponíveis para o comando `-delete`:

  * [`-alias` _alias_]: Nome do alias da entrada a ser processada

  * {`-keystore` _keystore_}: Nome do keystore

  * {`-cacerts`}: Acessa o keystore cacerts

  * [`-storepass` _arg_]: Senha do keystore

  * {`-storetype` _type_}: Tipo do keystore

  * {`-providername` _name_}: Nome do provedor

  * {`-addprovider` _name_ [`-providerarg` _arg_]}: Adiciona provedor de segurança por nome (como SunPKCS11) com um argumento de configuração opcional.

  * {`-providerclass` _class_ [`-providerarg` _arg_]}: Adiciona provedor de segurança por nome de classe totalmente qualificado com um argumento de configuração opcional.

  * {`-providerpath` _list_}: classpath do provedor

  * {`-v`}: Saída detalhada

  * {`-protected`}: Senha fornecida através de um mecanismo protegido




Use o comando `-delete` para excluir a entrada `-alias` _alias_ do keystore. Quando não fornecido na linha de comando, o usuário é solicitado a fornecer o `alias`.

`-changealias`
    

A seguir estão as opções disponíveis para o comando `-changealias`:

  * {`-alias` _alias_}: Nome do alias da entrada a ser processada

  * [`-destalias` _alias_]: Alias de destino

  * [`-keypass` _arg_]: Senha da chave

  * {`-keystore` _keystore_}: Nome do keystore

  * {`-cacerts`}: Acessa o keystore cacerts

  * [`-storepass` _arg_]: Senha do keystore

  * {`-storetype` _type_}: Tipo do keystore

  * {`-providername` _name_}: Nome do provedor

  * {`-addprovider` _name_ [`-providerarg` _arg_]}: Adiciona provedor de segurança por nome (como SunPKCS11) com um argumento de configuração opcional.

  * {`-providerclass` _class_ [`-providerarg` _arg_]}: Adiciona provedor de segurança por nome de classe totalmente qualificado com um argumento de configuração opcional.

  * {`-providerpath` _list_}: classpath do provedor

  * {`-v`}: Saída detalhada

  * {`-protected`}: Senha fornecida através de um mecanismo protegido




Use o comando `-changealias` para mover uma entrada existente do keystore de `-alias` _alias_ para um novo `-destalias` _alias_. Se um alias de destino não for fornecido, o comando solicitará um. Se a entrada original for protegida com uma senha de entrada, a senha pode ser fornecida com a opção `-keypass`. Se uma senha de chave não for fornecida, o `-storepass` (se fornecido) é tentado primeiro. Se a tentativa falhar, o usuário será solicitado a fornecer uma senha.

## Comandos para Exibir Informações Relacionadas à Segurança

`-showinfo`
    

A seguir estão as opções disponíveis para o comando `-showinfo`:

  * {`-tls`}: Exibe informações de configuração TLS

  * {`-v`}: Saída detalhada




Use o comando `-showinfo` para exibir várias informações relacionadas à segurança. A opção `-tls` exibe configurações TLS, como a lista de protocolos e conjuntos de cifras habilitados.
## Comandos para Exibir a Versão do Programa

Você pode usar `-version` para imprimir a versão do programa `keytool`.

## Comandos para Exibir Informações de Ajuda

Você pode usar `--help` para exibir uma lista de comandos `keytool` ou para exibir informações de ajuda sobre um comando `keytool` específico.

  * Para exibir uma lista de comandos `keytool`, digite:

> `keytool --help`

  * Para exibir informações de ajuda sobre um comando `keytool` específico, digite:

> `keytool -<command> --help`

## Opções Comuns de Comando

A opção `-v` pode aparecer para todos os comandos, exceto `--help`. Quando a opção `-v` aparece, ela significa modo verboso, o que significa que mais informações são fornecidas na saída.

O argumento `-J` _option_ pode aparecer para qualquer comando. Quando a opção `-J` _option_ é usada, a string _option_ especificada é passada diretamente para o interpretador Java. Esta opção não contém espaços. É útil para ajustar o ambiente de execução ou o uso de memória. Para uma lista de possíveis opções do interpretador, digite `java -h` ou `java -X` na linha de comando.

Estas opções podem aparecer para todos os comandos que operam em um keystore:

`-storetype` _storetype_
     Este qualificador especifica o tipo de keystore a ser instanciado.
`-keystore` _keystore_


A localização do keystore.

Se o `storetype` JKS for usado e um arquivo de keystore ainda não existir, então certos comandos `keytool` podem resultar na criação de um novo arquivo de keystore. Por exemplo, se `keytool -genkeypair` for chamado e a opção `-keystore` não for especificada, o arquivo de keystore padrão chamado `.keystore` é criado no diretório home do usuário, se ele ainda não existir. Da mesma forma, se a opção `-keystore ks_file` for especificada, mas `ks_file` não existir, então ele é criado. Para mais informações sobre o `storetype` JKS, consulte a seção **KeyStore Implementation** em **KeyStore aliases**.

Observe que o input stream da opção `-keystore` é passado para o método `KeyStore.load`. Se `NONE` for especificado como URL, então um stream nulo é passado para o método `KeyStore.load`. `NONE` deve ser especificado se o keystore não for baseado em arquivo. Por exemplo, quando o keystore reside em um dispositivo de token de hardware.

`-cacerts` _cacerts_
     Opera no keystore _cacerts_. Esta opção é equivalente a `-keystore` _path_to_cacerts_ `-storetype` _type_of_cacerts_. Um erro é relatado se a opção `-keystore` ou `-storetype` for usada com a opção `-cacerts`.
`-storepass` [`:env` | `:file` ] _argument_


A senha que é usada para proteger a integridade do keystore.

Se o modificador `env` ou `file` não for especificado, então a senha tem o valor _argument_, que deve conter pelo menos seis caracteres. Caso contrário, a senha é recuperada da seguinte forma:

  * `env`: Recupera a senha da variável de ambiente nomeada _argument_.

  * `file`: Recupera a senha do arquivo nomeado _argument_.


**Nota:** Todas as outras opções que exigem senhas, como `-keypass`, `-srckeypass`, `-destkeypass`, `-srcstorepass` e `-deststorepass`, aceitam os modificadores `env` e `file`. Lembre-se de separar a opção de senha e o modificador com dois pontos (:).

A senha deve ser fornecida a todos os comandos que acessam o conteúdo do keystore. Para tais comandos, quando a opção `-storepass` não é fornecida na linha de comando, o usuário é solicitado a inseri-la.

Ao recuperar informações do keystore, a senha é opcional. Se uma senha não for especificada, a integridade das informações recuperadas não pode ser verificada e um aviso é exibido.

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

## Arquivo de opções pré-configuradas

Um arquivo de opções pré-configuradas é um arquivo de propriedades Java que pode ser especificado com a opção `-conf`. Cada propriedade representa a(s) opção(ões) padrão para um comando `keytool` usando "keytool._command_name_" como nome da propriedade. Uma propriedade especial chamada "keytool.all" representa a(s) opção(ões) padrão aplicada(s) a todos os comandos. Um valor de propriedade pode incluir `${prop}`, que será expandido para a propriedade de sistema associada a ele. Se um valor de opção incluir espaços em branco, ele deve ser cercado por aspas (" ou '). Todos os nomes de propriedades devem estar em letras minúsculas.

Quando o `keytool` é iniciado com um arquivo de opções pré-configuradas, o valor para "keytool.all" (se existir) é adicionado ao início da linha de comando `keytool` primeiro, com o valor para o nome do comando (se existir) vindo em seguida, e as opções existentes na linha de comando por último. Para uma opção de valor único, isso permite que a propriedade para um comando específico sobrescreva o valor de "keytool.all", e o valor especificado na linha de comando sobrescreva ambos. Para opções de múltiplos valores, todas elas serão usadas pelo `keytool`.

Por exemplo, dado o seguinte arquivo chamado `preconfig`:
```
        # A tiny pre-configured options file
        keytool.all = -keystore ${user.home}/ks
        keytool.list = -v
        keytool.genkeypair = -keyalg rsa
```

`keytool -conf preconfig -list` é idêntico a

> `keytool -keystore ~/ks -v -list`

`keytool -conf preconfig -genkeypair -alias me` é idêntico a

> `keytool -keystore ~/ks -keyalg rsa -genkeypair -alias me`

`keytool -conf preconfig -genkeypair -alias you -keyalg ec` é idêntico a

> `keytool -keystore ~/ks -keyalg rsa -genkeypair -alias you -keyalg ec`

o que é equivalente a

> `keytool -keystore ~/ks -genkeypair -alias you -keyalg ec`

porque `-keyalg` é uma opção de valor único e o valor `ec` especificado na linha de comando sobrescreve o arquivo de opções pré-configuradas.

## Exemplos de Valores de Opção

Os exemplos a seguir mostram os valores padrão para várias opções:
```
    -alias "mykey"

    -keysize
        2048 (when using -genkeypair and -keyalg is "DSA")
        3072 (when using -genkeypair and -keyalg is "RSA", "RSASSA-PSS", or "DH")
        384 (when using -genkeypair and -keyalg is "EC")
        56 (when using -genseckey and -keyalg is "DES")
        168 (when using -genseckey and -keyalg is "DESede")

    -groupname
        ed25519 (when using -genkeypair and -keyalg is "EdDSA", key size is 255)
        x25519 (when using -genkeypair and -keyalg is "XDH", key size is 255)

    -validity 90

    -keystore <the file named .keystore in the user's home directory>

    -destkeystore <the file named .keystore in the user's home directory>

    -storetype <the value of the "keystore.type" property in the
        security properties file, which is returned by the static
        getDefaultType method in java.security.KeyStore>

    -file
        stdin (if reading)
        stdout (if writing)

    -protected false
```

Ao gerar um certificado ou uma requisição de certificado, o algoritmo de assinatura padrão (opção `-sigalg`) é derivado do algoritmo da chave privada subjacente para fornecer um nível apropriado de força de segurança, conforme segue:

Algoritmos de Assinatura Padrão keyalg | key size | default sigalg
---|---|---
DSA | any size | SHA256withDSA
RSA | < 624 | SHA256withRSA (key size is too small for using SHA-384)
| <= 7680 | SHA384withRSA
| > 7680 | SHA512withRSA
EC | < 512 | SHA384withECDSA
| >= 512 | SHA512withECDSA
RSASSA-PSS | < 624 | RSASSA-PSS (with SHA-256, key size is too small for
| | using SHA-384)
| <= 7680 | RSASSA-PSS (with SHA-384)
| > 7680 | RSASSA-PSS (with SHA-512)
EdDSA | 255 | Ed25519
| 448 | Ed448
Ed25519 | 255 | Ed25519
Ed448 | 448 | Ed448

  * O tamanho da chave, medido em bits, corresponde ao tamanho da chave privada. Este tamanho é determinado pelo valor das opções `-keysize` ou `-groupname` ou pelo valor derivado de uma configuração padrão.

  * Um algoritmo de assinatura RSASSA-PSS usa um algoritmo `MessageDigest` como seu hash e algoritmos MGF1.

  * Se nem um `-keysize` padrão nem um `-groupname` for definido para um algoritmo, o provedor de segurança escolherá uma configuração padrão.


**Nota:**

Para melhorar a segurança "out of the box", o tamanho de chave padrão (`keysize`), o nome do grupo (`groupname`) e os nomes dos algoritmos de assinatura são periodicamente atualizados para valores mais fortes a cada lançamento do JDK. Se a interoperabilidade com versões mais antigas do JDK for importante, certifique-se de que os padrões sejam suportados por essas versões. Alternativamente, você pode usar as opções `-keysize`, `-groupname` ou `-sigalg` para sobrescrever os valores padrão por sua própria conta e risco.

## Extensões Nomeadas Suportadas

O comando `keytool` suporta estas extensões nomeadas. Os nomes não diferenciam maiúsculas de minúsculas.

`BC` ou `BasicConstraints`


Valores:

A forma completa é `ca:`{`true`|`false`}[`,pathlen:`_len_] ou _len_, que é a abreviação de `ca:true,pathlen:`_len_.

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


Desde que não haja ambiguidade, o argumento _usage_ pode ser abreviado com as primeiras letras (como `dig` para `digitalSignature`) ou em estilo camel-case (como `dS` para `digitalSignature` ou `cRLS` para `cRLSign`). Os valores de _usage_ diferenciam maiúsculas de minúsculas.

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


Desde que não haja ambiguidade, o argumento _usage_ pode ser abreviado com as primeiras letras ou em estilo camel-case. Os valores de _usage_ diferenciam maiúsculas de minúsculas.

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


Quando _name_ é OID, o valor é a codificação hexadecimal despejada de Definite Encoding Rules (DER) do `extnValue` para a extensão, excluindo o tipo OCTET STRING e os bytes de comprimento. Além dos números hexadecimais padrão (0-9, a-f, A-F), quaisquer caracteres extras são ignorados na string HEX. Portanto, tanto 01:02:03:04 quanto 01020304 são aceitos como valores idênticos. Quando não há valor, a extensão tem um campo de valor vazio.

Um nome especial `honored`, usado apenas em `-gencert`, denota como as extensões incluídas na requisição de certificado devem ser honradas. O valor para este nome é uma lista separada por vírgulas de `all` (todas as extensões solicitadas são honradas), _name_{`:`[`critical`|`non-critical`]} (a extensão nomeada é honrada, mas usa um atributo `isCritical` diferente), e `-name` (usado com `all`, denota uma exceção). As extensões solicitadas não são honradas por padrão.

Se, além da opção `-ext honored`, outra opção `-ext` nomeada ou OID for fornecida, esta extensão é adicionada às já honradas. No entanto, se este nome (ou OID) também aparecer no valor honrado, então seu valor e criticidade sobrescrevem os da requisição. Se uma extensão do mesmo tipo for fornecida várias vezes através de um nome ou um OID, apenas a última extensão é usada.

A extensão `subjectKeyIdentifier` é sempre criada. Para certificados não autoassinados, o `authorityKeyIdentifier` é criado.

**CUIDADO:**

Os usuários devem estar cientes de que algumas combinações de extensões (e outros campos de certificado) podem não estar em conformidade com o padrão da Internet. Consulte Aviso de Conformidade de Certificado.

## Exemplos de Tarefas na Criação de um keystore

Os exemplos a seguir descrevem a sequência de ações na criação de um keystore para gerenciar pares de chaves públicas/privadas e certificados de entidades confiáveis.

  * Gerando o Par de Chaves

  * Solicitando um Certificado Assinado de uma CA

  * Importando um Certificado para a CA

  * Importando a Resposta do Certificado da CA

  * Exportando um Certificado que Autentica a Chave Pública

  * Importando o Keystore

  * Gerando Certificados para um Servidor SSL

## Gerando o Par de Chaves

Crie um keystore e então gere o par de chaves.

Você pode digitar o comando em uma única linha, como o seguinte:

> `keytool -genkeypair -dname "cn=myname, ou=mygroup, o=mycompany, c=mycountry" -alias business -keyalg rsa -keypass` _password_ `-keystore /working/mykeystore -storepass password -validity 180`

O comando cria o keystore chamado `mykeystore` no diretório de trabalho (desde que ele ainda não exista), e atribui a ele a senha especificada por `-keypass`. Ele gera um par de chaves pública/privada para a entidade cujo nome distinto é `myname`, `mygroup`, `mycompany`, e um código de país de duas letras `mycountry`. Ele usa o algoritmo de geração de chaves RSA para criar as chaves; ambas têm 3072 bits.

O comando usa o algoritmo de assinatura padrão SHA384withRSA para criar um certificado autoassinado que inclui a chave pública e as informações do nome distinto. O certificado é válido por 180 dias e está associado à chave privada em uma entrada de keystore referida por `-alias business`. A chave privada recebe a senha especificada por `-keypass`.

O comando é significativamente mais curto quando os padrões das opções são aceitos. Neste caso, apenas `-keyalg` é necessário, e os padrões são usados para opções não especificadas que possuem valores padrão. Você será solicitado a fornecer quaisquer valores necessários. Você poderia ter o seguinte:

> `keytool -genkeypair -keyalg rsa`

Neste caso, uma entrada de keystore com o alias `mykey` é criada, com um par de chaves recém-gerado e um certificado válido por 90 dias. Esta entrada é colocada em seu diretório home em um keystore chamado `.keystore`. O `.keystore` é criado se ainda não existir. Você será solicitado a fornecer as informações do nome distinto, a senha do keystore e a senha da chave privada.

**Nota:**

O restante dos exemplos assume que você respondeu aos prompts com valores iguais aos especificados no primeiro comando `-genkeypair`. Por exemplo, um nome distinto de `cn=`_myname_`, ou=`_mygroup_`, o=`_mycompany_`, c=`_mycountry_.

## Solicitando um Certificado Assinado de uma CA

**Nota:**

A geração do par de chaves criou um certificado autoassinado; no entanto, um certificado tem maior probabilidade de ser confiável por outros quando é assinado por uma CA.

Para obter uma assinatura de CA, complete o seguinte processo:

  1. Gere um CSR:

> `keytool -certreq -file myname.csr`

Isso cria um CSR para a entidade identificada pelo alias padrão `mykey` e coloca a requisição no arquivo chamado `myname.csr`.

  2. Envie `myname.csr` para uma CA, como a DigiCert.


A CA autentica você, o solicitante (geralmente offline), e retorna um certificado, assinado por ela, autenticando sua chave pública. Em alguns casos, a CA retorna uma cadeia de certificados, cada um autenticando a chave pública do signatário do certificado anterior na cadeia.

## Importando um Certificado para a CA

Para importar um certificado para a CA, complete o seguinte processo:

  1. Antes de importar a resposta do certificado de uma CA, você precisa de um ou mais certificados confiáveis, seja em seu keystore ou no arquivo de keystore `cacerts`. Consulte `-importcert` em **Comandos**.

     * Se a resposta do certificado for uma cadeia de certificados, então você precisa do certificado superior da cadeia. O certificado raiz da CA que autentica a chave pública da CA.

     * Se a resposta do certificado for um único certificado, então você precisa de um certificado para a CA emissora (aquela que o assinou). Se esse certificado não for autoassinado, então você precisa de um certificado para seu signatário, e assim por diante, até um certificado raiz de CA autoassinado.

O keystore `cacerts` vem com um conjunto de certificados raiz emitidos pelas CAs do [programa Oracle Java Root Certificate](<https://www.oracle.com/java/technologies/javase/carootcertsprogram.html>). Se você solicitar um certificado assinado de uma CA, e um certificado que autentica a chave pública dessa CA não tiver sido adicionado ao `cacerts`, então você deve importar um certificado dessa CA como um certificado confiável.

Um certificado de uma CA é geralmente autoassinado ou assinado por outra CA. Se for assinado por outra CA, você precisa de um certificado que autentique a chave pública dessa CA.

Por exemplo, você obteve um arquivo _X_`.cer` de uma empresa que é uma CA e o arquivo supostamente é um certificado autoassinado que autentica a chave pública dessa CA. Antes de importá-lo como um certificado confiável, você deve garantir que o certificado seja válido:

     1. Visualizando-o com o comando `keytool -printcert` ou o comando `keytool -importcert` sem usar a opção `-noprompt`. Certifique-se de que as impressões digitais do certificado exibidas correspondam às impressões digitais esperadas.

     2. Ligando para a pessoa que enviou o certificado e comparando as impressões digitais que você vê com as que ela mostra ou com as que um repositório seguro de chaves públicas mostra.

Somente quando as impressões digitais são iguais é que se garante que o certificado não foi substituído em trânsito pelo certificado de outra pessoa (como o certificado de um atacante). Se tal ataque ocorrer, e você não verificou o certificado antes de importá-lo, então você estaria confiando em qualquer coisa que o atacante assinou.

  2. Substitua o certificado autoassinado por uma cadeia de certificados, onde cada certificado na cadeia autentica a chave pública do signatário do certificado anterior na cadeia, até uma CA raiz.

Se você confia que o certificado é válido, então você pode adicioná-lo ao seu keystore digitando o seguinte comando:

> `keytool -importcert -alias` _alias_ `-file *X*`.cer`

Este comando cria uma entrada de certificado confiável no keystore a partir dos dados no arquivo de certificado da CA e atribui os valores do _alias_ à entrada.
## Importando a Resposta do Certificado da CA

Após importar um certificado que autentica a chave pública da CA para a qual você enviou sua solicitação de assinatura de certificado (ou se já houver tal certificado no arquivo `cacerts`), você pode importar a resposta do certificado e substituir seu certificado autoassinado por uma cadeia de certificados.

A cadeia de certificados é uma das seguintes:

  * Retornada pela CA quando a resposta da CA é uma cadeia.

  * Construída quando a resposta da CA é um único certificado. Esta cadeia de certificados é construída usando a resposta do certificado e certificados confiáveis disponíveis tanto no keystore onde você importa a resposta quanto no arquivo keystore `cacerts`.

Por exemplo, se você enviou sua solicitação de assinatura de certificado para a DigiCert, você pode importar a resposta deles digitando o seguinte comando:

**Nota:**

Neste exemplo, o certificado retornado é nomeado `DCmyname.cer`.

> `keytool -importcert -trustcacerts -file DCmyname.cer`

## Exportando um Certificado que Autentica a Chave Pública

**Nota:**

Se você usou o comando `jarsigner` para assinar um arquivo Java Archive (JAR), os clientes que usarem o arquivo desejarão autenticar sua assinatura.

Uma maneira pela qual os clientes podem autenticá-lo é importando seu certificado de chave pública para o keystore deles como uma entrada confiável. Você pode então exportar o certificado e fornecê-lo aos seus clientes.

Por exemplo:

  1. Copie seu certificado para um arquivo chamado `myname.cer` digitando o seguinte comando:

**Nota:**

Neste exemplo, a entrada tem um alias de `mykey`.

> `keytool -exportcert -alias mykey -file myname.cer`

  2. Com o certificado e o arquivo JAR assinado, um cliente pode usar o comando `jarsigner` para autenticar sua assinatura.

## Importando o Keystore

Use o comando `importkeystore` para importar um keystore inteiro para outro keystore. Isso importa todas as entradas do keystore de origem, incluindo chaves e certificados, para o keystore de destino com um único comando. Você pode usar este comando para importar entradas de um tipo diferente de keystore. Durante a importação, todas as novas entradas no keystore de destino terão os mesmos nomes de alias e senhas de proteção (para chaves secretas e chaves privadas). Se o comando `keytool` não conseguir recuperar as chaves privadas ou chaves secretas do keystore de origem, ele solicitará uma senha. Se detectar duplicação de alias, ele pedirá um novo alias, e você pode especificar um novo alias ou simplesmente permitir que o comando `keytool` sobrescreva o existente.

Por exemplo, importe entradas de um keystore típico do tipo JKS `key.jks` para um keystore baseado em hardware do tipo PKCS #11, digitando o seguinte comando:

> `keytool -importkeystore -srckeystore key.jks -destkeystore NONE -srcstoretype JKS -deststoretype PKCS11 -srcstorepass` _password_ `-deststorepass` _password_

O comando `importkeystore` também pode ser usado para importar uma única entrada de um keystore de origem para um keystore de destino. Neste caso, além das opções que você usou no exemplo anterior, você precisa especificar o alias que deseja importar. Com a opção `-srcalias` especificada, você também pode especificar o nome do alias de destino, a senha de proteção para uma chave secreta ou privada, e a senha de proteção de destino que você deseja, da seguinte forma:

> `keytool -importkeystore -srckeystore key.jks -destkeystore NONE -srcstoretype JKS -deststoretype PKCS11 -srcstorepass` _password_ `-deststorepass` _password_ `-srcalias myprivatekey -destalias myoldprivatekey -srckeypass` _password_ `-destkeypass` _password_ `-noprompt`

## Gerando Certificados para um Servidor SSL

A seguir estão os comandos `keytool` usados para gerar pares de chaves e certificados para três entidades:

  * Root CA (`root`)

  * Intermediate CA (`ca`)

  * SSL server (`server`)

Certifique-se de armazenar todos os certificados no mesmo keystore.
```
    keytool -genkeypair -keystore root.jks -alias root -ext bc:c -keyalg rsa
    keytool -genkeypair -keystore ca.jks -alias ca -ext bc:c -keyalg rsa
    keytool -genkeypair -keystore server.jks -alias server -keyalg rsa
    
    keytool -keystore root.jks -alias root -exportcert -rfc > root.pem
    
    keytool -storepass password -keystore ca.jks -certreq -alias ca |
        keytool -storepass password -keystore root.jks
        -gencert -alias root -ext BC=0 -rfc > ca.pem
    keytool -keystore ca.jks -importcert -alias ca -file ca.pem
    
    keytool -storepass password -keystore server.jks -certreq -alias server |
        keytool -storepass password -keystore ca.jks -gencert -alias ca
        -ext ku:c=dig,kE -rfc > server.pem
    cat root.pem ca.pem server.pem |
        keytool -keystore server.jks -importcert -alias server
```

## Termos

Keystore
     Um keystore é uma facilidade de armazenamento para chaves criptográficas e certificados.
Entradas do Keystore
    

Keystores podem ter diferentes tipos de entradas. Os dois tipos de entrada mais aplicáveis para o comando `keytool` incluem o seguinte:

Entradas de chave: Cada entrada contém informações de chave criptográfica muito sensíveis, que são armazenadas em um formato protegido para evitar acesso não autorizado. Tipicamente, uma chave armazenada neste tipo de entrada é uma chave secreta, ou uma chave privada acompanhada pela cadeia de certificados para a chave pública correspondente. Veja **Cadeias de Certificados**. O comando `keytool` pode lidar com ambos os tipos de entradas, enquanto a ferramenta `jarsigner` lida apenas com o último tipo de entrada, ou seja, chaves privadas e suas cadeias de certificados associadas.

Entradas de certificado confiável: Cada entrada contém um único certificado de chave pública que pertence a outra parte. A entrada é chamada de certificado confiável porque o proprietário do keystore confia que a chave pública no certificado pertence à identidade identificada pelo sujeito (proprietário) do certificado. O emissor do certificado garante isso, assinando o certificado.

Aliases do Keystore
    

Todas as entradas do keystore (entradas de chave e de certificado confiável) são acessadas por meio de aliases únicos.

Um alias é especificado quando você adiciona uma entidade ao keystore com o comando `-genseckey` para gerar uma chave secreta, o comando `-genkeypair` para gerar um par de chaves (chave pública e privada), ou o comando `-importcert` para adicionar um certificado ou cadeia de certificados à lista de certificados confiáveis. Comandos `keytool` subsequentes devem usar este mesmo alias para se referir à entidade.

Por exemplo, você pode usar o alias `duke` para gerar um novo par de chaves pública/privada e encapsular a chave pública em um certificado autoassinado com o seguinte comando. Veja **Cadeias de Certificados**.

> `keytool -genkeypair -alias duke -keyalg rsa -keypass` _passwd_

Este exemplo especifica uma _passwd_ inicial exigida por comandos subsequentes para acessar a chave privada associada ao alias `duke`. Se você mais tarde quiser alterar a senha da chave privada de Duke, use um comando como o seguinte:

> `keytool -keypasswd -alias duke -keypass` _passwd_ `-new` _newpasswd_

Isso muda a _passwd_ inicial para _newpasswd_. Uma senha não deve ser especificada na linha de comando ou em um script, a menos que seja para fins de teste, ou se você estiver em um sistema seguro. Se você não especificar uma opção de senha necessária na linha de comando, ela será solicitada.

Implementação do Keystore
    

A classe `KeyStore` fornecida no pacote `java.security` oferece interfaces bem definidas para acessar e modificar as informações em um keystore. É possível que existam múltiplas implementações concretas diferentes, onde cada implementação é para um tipo particular de keystore.

Atualmente, duas ferramentas de linha de comando (`keytool` e `jarsigner`) utilizam implementações de keystore. Como a classe `KeyStore` é `public`, os usuários podem escrever aplicações de segurança adicionais que a utilizam.

No JDK 9 e posterior, a implementação padrão do keystore é `PKCS12`. Este é um keystore multiplataforma baseado no padrão RSA PKCS12 Personal Information Exchange Syntax. Este padrão é principalmente destinado a armazenar ou transportar chaves privadas, certificados e segredos diversos de um usuário. Existe outra implementação embutida, fornecida pela Oracle. Ela implementa o keystore como um arquivo com um tipo (formato) de keystore proprietário chamado `JKS`. Ele protege cada chave privada com sua senha individual e também protege a integridade de todo o keystore com uma senha (possivelmente diferente).

As implementações de keystore são baseadas em provedores. Mais especificamente, as interfaces de aplicação fornecidas por `KeyStore` são implementadas em termos de uma Service Provider Interface (SPI). Ou seja, existe uma classe `KeystoreSpi` abstrata correspondente, também no pacote `java.security`, que define os métodos da Service Provider Interface que os provedores devem implementar. O termo _provedor_ refere-se a um pacote ou a um conjunto de pacotes que fornecem uma implementação concreta de um subconjunto de serviços que podem ser acessados pela Java Security API. Para fornecer uma implementação de keystore, os clientes devem implementar um provedor e fornecer uma implementação de subclasse `KeystoreSpi`, conforme descrito em Steps to Implement and Integrate a Provider.

As aplicações podem escolher diferentes tipos de implementações de keystore de diferentes provedores, usando o método de fábrica `getInstance` fornecido na classe `KeyStore`. Um tipo de keystore define o armazenamento e o formato de dados das informações do keystore, e os algoritmos usados para proteger chaves privadas/secretas no keystore e a integridade do keystore. Implementações de keystore de diferentes tipos não são compatíveis.

O comando `keytool` funciona em qualquer implementação de keystore baseada em arquivo. Ele trata o local do keystore que lhe é passado na linha de comando como um nome de arquivo e o converte em um `FileInputStream`, do qual ele carrega as informações do keystore. Os comandos `jarsigner` podem ler um keystore de qualquer local que possa ser especificado com uma URL.

Para `keytool` e `jarsigner`, você pode especificar um tipo de keystore na linha de comando, com a opção `-storetype`.

Se você não especificar explicitamente um tipo de keystore, as ferramentas escolherão uma implementação de keystore com base no valor da propriedade `keystore.type` especificada no arquivo de propriedades de segurança. O arquivo de propriedades de segurança é chamado `java.security` e reside no diretório de propriedades de segurança:

  * **Linux e macOS:** `java.home/lib/security`

  * **Windows:** `java.home\lib\security`

Cada ferramenta obtém o valor de `keystore.type` e então examina todos os provedores atualmente instalados até encontrar um que implemente um keystore desse tipo. Em seguida, ela usa a implementação de keystore desse provedor. A classe `KeyStore` define um método estático chamado `getDefaultType` que permite que as aplicações recuperem o valor da propriedade `keystore.type`. A seguinte linha de código cria uma instância do tipo de keystore padrão conforme especificado na propriedade `keystore.type`:

> `KeyStore keyStore = KeyStore.getInstance(KeyStore.getDefaultType());`

O tipo de keystore padrão é `pkcs12`, que é um keystore multiplataforma baseado no padrão RSA PKCS12 Personal Information Exchange Syntax. Isso é especificado pela seguinte linha no arquivo de propriedades de segurança:

> `keystore.type=pkcs12`

Para que as ferramentas utilizem uma implementação de keystore diferente da padrão, você pode alterar essa linha para especificar um tipo de keystore diferente. Por exemplo, se você quiser usar a implementação de keystore `jks` da Oracle, altere a linha para o seguinte:

> `keystore.type=jks`

**Nota:**

O uso de maiúsculas/minúsculas não importa nas designações de tipo de keystore. Por exemplo, `JKS` seria considerado o mesmo que `jks`.

Certificado
    

Um certificado (ou certificado de chave pública) é uma declaração assinada digitalmente por uma entidade (o emissor), afirmando que a chave pública e algumas outras informações de outra entidade (o sujeito) possuem um valor específico. Os seguintes termos estão relacionados a certificados:

  * Chaves Públicas: São números associados a uma entidade particular, e são destinadas a serem conhecidas por todos que precisam ter interações confiáveis com essa entidade. Chaves públicas são usadas para verificar assinaturas.

  * Assinado Digitalmente: Se alguns dados são assinados digitalmente, então eles são armazenados com a identidade de uma entidade e uma assinatura que prova que essa entidade conhece os dados. Os dados são tornados inforjáveis pela assinatura com a chave privada da entidade.

  * Identidade: Uma forma conhecida de endereçar uma entidade. Em alguns sistemas, a identidade é a chave pública, e em outros pode ser qualquer coisa, desde um Oracle Solaris UID a um endereço de e-mail ou um distinguished name X.509.

  * Assinatura: Uma assinatura é calculada sobre alguns dados usando a chave privada de uma entidade. O signatário, que no caso de um certificado também é conhecido como o emissor.

  * Chaves Privadas: São números, cada um dos quais deve ser conhecido apenas pela entidade particular cuja chave privada é (ou seja, deve ser mantida em segredo). Chaves privadas e públicas existem em pares em todos os sistemas de criptografia de chave pública (também referidos como sistemas criptográficos de chave pública). Em um sistema criptográfico de chave pública típico, como DSA, uma chave privada corresponde a exatamente uma chave pública. Chaves privadas são usadas para calcular assinaturas.

  * Entidade: Uma entidade é uma pessoa, organização, programa, computador, negócio, banco ou qualquer outra coisa em que você confia em algum grau.

A criptografia de chave pública requer acesso às chaves públicas dos usuários. Em um ambiente de rede em larga escala, é impossível garantir que relacionamentos anteriores entre entidades comunicantes foram estabelecidos ou que existe um repositório confiável com todas as chaves públicas usadas. Os certificados foram inventados como uma solução para este problema de distribuição de chave pública. Agora, uma Certification Authority (CA) pode atuar como um terceiro confiável. CAs são entidades como empresas que são confiáveis para assinar (emitir) certificados para outras entidades. Assume-se que as CAs criam apenas certificados válidos e confiáveis porque estão vinculadas por acordos legais. Existem muitas Certification Authorities públicas, como DigiCert, Comodo, Entrust, e assim por diante.

Você também pode operar sua própria Certification Authority usando produtos como Microsoft Certificate Server ou o produto Entrust CA para sua organização. Com o comando `keytool`, é possível exibir, importar e exportar certificados. Também é possível gerar certificados autoassinados.

O comando `keytool` atualmente lida com certificados X.509.

Certificados X.509
    

O padrão X.509 define quais informações podem constar em um certificado e descreve como registrá-las (o formato dos dados). Todos os dados em um certificado são codificados com dois padrões relacionados chamados ASN.1/DER. Abstract Syntax Notation 1 descreve os dados. As Definite Encoding Rules descrevem uma única maneira de armazenar e transferir esses dados.

Todos os certificados X.509 possuem os seguintes dados, além da assinatura:

  * Versão: Isso identifica qual versão do padrão X.509 se aplica a este certificado, o que afeta quais informações podem ser especificadas nele. Até agora, três versões são definidas. O comando `keytool` pode importar e exportar certificados v1, v2 e v3. Ele gera certificados v3.

    * A Versão 1 do X.509 está disponível desde 1988, é amplamente implantada e é a mais genérica.

    * A Versão 2 do X.509 introduziu o conceito de identificadores únicos de sujeito e emissor para lidar com a possibilidade de reutilização de nomes de sujeito ou emissor ao longo do tempo. A maioria dos documentos de perfil de certificado recomenda fortemente que os nomes não sejam reutilizados e que os certificados não utilizem identificadores únicos. Certificados da Versão 2 não são amplamente utilizados.

    * A Versão 3 do X.509 é a mais recente (1996) e suporta a noção de extensões onde qualquer um pode definir uma extensão e incluí-la no certificado. Algumas extensões comuns são: KeyUsage (limita o uso das chaves para propósitos específicos, como `signing-only`) e AlternativeNames (permite que outras identidades também sejam associadas a esta chave pública, por exemplo, nomes DNS, endereços de e-mail, endereços IP). As extensões podem ser marcadas como críticas para indicar que a extensão deve ser verificada e imposta ou usada. Por exemplo, se um certificado tem a extensão KeyUsage marcada como crítica e definida como `keyCertSign`, então quando este certificado é apresentado durante a comunicação SSL, ele deve ser rejeitado porque a extensão do certificado indica que a chave privada associada deve ser usada apenas para assinar certificados e não para uso SSL.

  * Número de série: A entidade que criou o certificado é responsável por atribuir-lhe um número de série para distingui-lo de outros certificados que ela emite. Esta informação é usada de várias maneiras. Por exemplo, quando um certificado é revogado, seu número de série é colocado em uma Certificate Revocation List (CRL).

  * Identificador do algoritmo de assinatura: Isso identifica o algoritmo usado pela CA para assinar o certificado.

  * Nome do emissor: O X.500 Distinguished Name da entidade que assinou o certificado. Isso é tipicamente uma CA. Usar este certificado implica confiar na entidade que assinou este certificado. Em alguns casos, como certificados de CA raiz ou de nível superior, o emissor assina seu próprio certificado.

  * Período de validade: Cada certificado é válido apenas por um período limitado de tempo. Este período é descrito por uma data e hora de início e uma data e hora de término, e pode ser tão curto quanto alguns segundos ou quase tão longo quanto um século. O período de validade escolhido depende de vários fatores, como a força da chave privada usada para assinar o certificado, ou o valor que se está disposto a pagar por um certificado. Este é o período esperado em que as entidades podem confiar no valor público, quando a chave privada associada não foi comprometida.

  * Nome do sujeito: O nome da entidade cuja chave pública o certificado identifica. Este nome usa o padrão X.500, portanto, destina-se a ser único em toda a Internet. Este é o X.500 Distinguished Name (DN) da entidade. Por exemplo,

> `CN=Java Duke, OU=Java Software Division, O=Oracle Corporation, C=US`

Estes se referem ao common name (CN) do sujeito, organizational unit (OU), organization (O) e country (C).

  * Informações da chave pública do sujeito: Esta é a chave pública da entidade nomeada com um identificador de algoritmo que especifica a qual sistema criptográfico de chave pública esta chave pertence e quaisquer parâmetros de chave associados.

Cadeias de Certificados
    

O comando `keytool` pode criar e gerenciar entradas de chave de keystore que contêm cada uma uma chave privada e uma cadeia de certificados associada. O primeiro certificado na cadeia contém a chave pública que corresponde à chave privada.

Quando as chaves são geradas pela primeira vez, a cadeia geralmente começa contendo um único elemento, um certificado autoassinado. Veja -genkeypair em **Comandos**. Um certificado autoassinado é aquele para o qual o emissor (signatário) é o mesmo que o sujeito. O sujeito é a entidade cuja chave pública está sendo autenticada pelo certificado. Quando o comando `-genkeypair` é chamado para gerar um novo par de chaves pública/privada, ele também encapsula a chave pública em um certificado autoassinado (a menos que a opção `-signer` seja especificada).

Mais tarde, depois que uma Certificate Signing Request (CSR) foi gerada com o comando `-certreq` e enviada a uma Certification Authority (CA), a resposta da CA é importada com `-importcert`, e o certificado autoassinado é substituído por uma cadeia de certificados. Na parte inferior da cadeia está o certificado (resposta) emitido pela CA autenticando a chave pública do sujeito. O próximo certificado na cadeia é um que autentica a chave pública da CA.

Em muitos casos, este é um certificado autoassinado, que é um certificado da CA autenticando sua própria chave pública, e o último certificado na cadeia. Em outros casos, a CA pode retornar uma cadeia de certificados. Neste caso, o certificado inferior na cadeia é o mesmo (um certificado assinado pela CA, autenticando a chave pública da entrada de chave), mas o segundo certificado na cadeia é um certificado assinado por uma CA diferente que autentica a chave pública da CA para a qual você enviou o CSR. O próximo certificado na cadeia é um certificado que autentica a chave da segunda CA, e assim por diante, até que um certificado raiz autoassinado seja alcançado. Cada certificado na cadeia (após o primeiro) autentica a chave pública do signatário do certificado anterior na cadeia.

Muitas CAs retornam apenas o certificado emitido, sem cadeia de suporte, especialmente quando há uma hierarquia plana (sem CAs intermediárias). Neste caso, a cadeia de certificados deve ser estabelecida a partir de informações de certificado confiáveis já armazenadas no keystore.

Um formato de resposta diferente (definido pelo padrão PKCS #7) inclui a cadeia de certificados de suporte além do certificado emitido. Ambos os formatos de resposta podem ser tratados pelo comando `keytool`.

O certificado da CA de nível superior (raiz) é autoassinado. No entanto, a confiança na chave pública da raiz não vem do próprio certificado raiz, mas de outras fontes, como um jornal. Isso ocorre porque qualquer pessoa poderia gerar um certificado autoassinado com o distinguished name de, por exemplo, a CA raiz DigiCert. A chave pública da CA raiz é amplamente conhecida. A única razão pela qual ela é armazenada em um certificado é porque este é o formato compreendido pela maioria das ferramentas, então o certificado, neste caso, é usado apenas como um veículo para transportar a chave pública da CA raiz. Antes de adicionar o certificado da CA raiz ao seu keystore, você deve visualizá-lo com a opção `-printcert` e comparar o fingerprint exibido com o fingerprint conhecido obtido de um jornal, da página web da CA raiz, e assim por diante.

Arquivo de Certificados cacerts
    

Um arquivo de certificados chamado `cacerts` reside no diretório de propriedades de segurança:

  * **Linux e macOS:** _JAVA_HOME_`/lib/security`

  * **Windows:** _JAVA_HOME_`\lib\security`

O arquivo `cacerts` representa um keystore de todo o sistema com certificados de CA. Administradores de sistema podem configurar e gerenciar esse arquivo com o comando `keytool` especificando `jks` como o tipo de keystore. O arquivo keystore `cacerts` é fornecido com um conjunto padrão de certificados de CA raiz. Para Linux, macOS e Windows, você pode listar os certificados padrão com o seguinte comando:

> `keytool -list -cacerts`

A senha inicial do arquivo keystore `cacerts` é `changeit`. Administradores de sistema devem alterar essa senha e a permissão de acesso padrão desse arquivo ao instalar o SDK.

**Nota:**

É importante verificar seu arquivo `cacerts`. Como você confia nas CAs no arquivo `cacerts` como entidades para assinar e emitir certificados para outras entidades, você deve gerenciar o arquivo `cacerts` cuidadosamente. O arquivo `cacerts` deve conter apenas certificados das CAs em que você confia. É sua responsabilidade verificar os certificados de CA raiz confiáveis incluídos no arquivo `cacerts` e tomar suas próprias decisões de confiança.

Para remover um certificado de CA não confiável do arquivo `cacerts`, use a opção `-delete` do comando `keytool`. Você pode encontrar o arquivo `cacerts` no diretório `$JAVA_HOME/lib/security` do JDK. Entre em contato com o administrador do sistema se você não tiver permissão para editar este arquivo.

Padrão de Codificação de Certificados Internet RFC 1421
    

Os certificados são frequentemente armazenados usando o formato de codificação imprimível definido pelo padrão Internet RFC 1421, em vez de sua codificação binária. Este formato de certificado, também conhecido como codificação Base64, facilita a exportação de certificados para outras aplicações por e-mail ou através de algum outro mecanismo.

Os certificados lidos pelos comandos `-importcert` e `-printcert` podem estar neste formato ou codificados em binário. O comando `-exportcert` por padrão gera um certificado em codificação binária, mas, em vez disso, gerará um certificado no formato de codificação imprimível, quando a opção `-rfc` for especificada.

O comando `-list` por padrão imprime o fingerprint SHA-256 de um certificado. Se a opção `-v` for especificada, o certificado é impresso em formato legível por humanos. Se a opção `-rfc` for especificada, o certificado é gerado no formato de codificação imprimível.

Em seu formato de codificação imprimível, o certificado codificado é delimitado no início e no fim pelo seguinte texto:
```
    -----BEGIN CERTIFICATE-----

    encoded certificate goes here.

    -----END CERTIFICATE-----
```

Nomes Distintos X.500
    

Nomes Distintos X.500 são usados para identificar entidades, como aquelas nomeadas pelos campos `subject` e `issuer` (signatário) de certificados X.509. O comando `keytool` suporta as seguintes subpartes:

  * commonName: O nome comum de uma pessoa, como Susan Jones.

  * organizationUnit: O nome da pequena organização (como departamento ou divisão). Por exemplo, Compras.

  * localityName: O nome da localidade (cidade), por exemplo, Palo Alto.

  * stateName: Nome do estado ou província, por exemplo, Califórnia.

  * country: Código de país de duas letras, por exemplo, CH.

Quando você fornece uma string de nome distinto como valor de uma opção `-dname`, como para o comando `-genkeypair`, a string deve estar no seguinte formato:

> `CN=cName, OU=orgUnit, O=org, L=city, S=state, C=countryCode`

Todos os itens a seguir representam valores reais e as palavras-chave anteriores são abreviações para o seguinte:
```
    CN=commonName
    OU=organizationUnit
    O=organizationName
    L=localityName
    S=stateName
    C=country
```

Uma string de nome distinto de exemplo é:

> `CN=Mark Smith, OU=Java, O=Oracle, L=Cupertino, S=California, C=US`

Um comando de exemplo usando tal string é:

> `keytool -genkeypair -dname "CN=Mark Smith, OU=Java, O=Oracle, L=Cupertino, S=California, C=US" -alias mark -keyalg rsa`

O uso de maiúsculas/minúsculas não importa para as abreviações das palavras-chave. Por exemplo, CN, cn e Cn são todos tratados da mesma forma.

A ordem importa; cada subcomponente deve aparecer na ordem designada. No entanto, não é necessário ter todos os subcomponentes. Você pode usar um subconjunto, por exemplo:

> `CN=Smith, OU=Java, O=Oracle, C=US`

Se um valor de string de nome distinto contiver uma vírgula, então a vírgula deve ser escapada por um caractere de barra invertida (\\) ao especificar a string na linha de comando, como em:

> `cn=Jack, ou=Java\, Product Development, o=Oracle, c=US`

Nunca é necessário especificar uma string de nome distinto na linha de comando. Quando o nome distinto é necessário para um comando, mas não é fornecido na linha de comando, o usuário é solicitado para cada um dos subcomponentes. Neste caso, uma vírgula não precisa ser escapada por uma barra invertida (\\).
## Avisos

## Aviso sobre a Importação de Certificados Confiáveis

**Importante**: Certifique-se de verificar um certificado com muito cuidado antes de importá-lo como um certificado confiável.

**Exemplo no Windows:**

Visualize o certificado primeiro com o comando `-printcert` ou o comando `-importcert` sem a opção `-noprompt`. Certifique-se de que as fingerprints do certificado exibidas correspondam às esperadas. Por exemplo, suponha que alguém lhe envie por e-mail um certificado que você salvou em um arquivo chamado `\tmp\cert`. Antes de considerar adicionar o certificado à sua lista de certificados confiáveis, você pode executar um comando `-printcert` para visualizar suas fingerprints, da seguinte forma:
```
      keytool -printcert -file \tmp\cert
        Owner: CN=ll, OU=ll, O=ll, L=ll, S=ll, C=ll
        Issuer: CN=ll, OU=ll, O=ll, L=ll, S=ll, C=ll
        Serial Number: 59092b34
        Valid from: Thu Jun 24 18:01:13 PDT 2016 until: Wed Jun 23 17:01:13 PST 2016
        Certificate Fingerprints:
    
                       SHA-1: 20:B6:17:FA:EF:E5:55:8A:D0:71:1F:E8:D6:9D:C0:37:13:0E:5E:FE
                     SHA-256: 90:7B:70:0A:EA:DC:16:79:92:99:41:FF:8A:FE:EB:90:
                              17:75:E0:90:B2:24:4D:3A:2A:16:A6:E4:11:0F:67:A4
```

**Exemplo no Linux:**

Visualize o certificado primeiro com o comando `-printcert` ou o comando `-importcert` sem a opção `-noprompt`. Certifique-se de que as fingerprints do certificado exibidas correspondam às esperadas. Por exemplo, suponha que alguém lhe envie por e-mail um certificado que você salvou em um arquivo chamado `/tmp/cert`. Antes de considerar adicionar o certificado à sua lista de certificados confiáveis, você pode executar um comando `-printcert` para visualizar suas fingerprints, da seguinte forma:
```
      keytool -printcert -file /tmp/cert
        Owner: CN=ll, OU=ll, O=ll, L=ll, S=ll, C=ll
        Issuer: CN=ll, OU=ll, O=ll, L=ll, S=ll, C=ll
        Serial Number: 59092b34
        Valid from: Thu Jun 24 18:01:13 PDT 2016 until: Wed Jun 23 17:01:13 PST 2016
        Certificate Fingerprints:
    
                       SHA-1: 20:B6:17:FA:EF:E5:55:8A:D0:71:1F:E8:D6:9D:C0:37:13:0E:5E:FE
                       SHA-256: 90:7B:70:0A:EA:DC:16:79:92:99:41:FF:8A:FE:EB:90:
                               17:75:E0:90:B2:24:4D:3A:2A:16:A6:E4:11:0F:67:A4
```

Em seguida, ligue ou entre em contato com a pessoa que enviou o certificado e compare as fingerprints que você vê com as que ela mostra. Somente quando as fingerprints são iguais é garantido que o certificado não foi substituído em trânsito pelo certificado de outra pessoa, como o certificado de um atacante. Se tal ataque ocorresse, e você não verificasse o certificado antes de importá-lo, então você estaria confiando em qualquer coisa que o atacante assinasse, por exemplo, um arquivo JAR com arquivos de classe maliciosos dentro.

**Nota:**

Não é obrigatório executar um comando `-printcert` antes de importar um certificado. Isso ocorre porque, antes de adicionar um certificado à lista de certificados confiáveis no keystore, o comando `-importcert` imprime as informações do certificado e solicita que você as verifique. Você pode então interromper a operação de importação. No entanto, você só pode fazer isso ao chamar o comando `-importcert` sem a opção `-noprompt`. Se a opção `-noprompt` for especificada, não haverá interação com o usuário.

## Aviso sobre Senhas

A maioria dos comandos que operam em um keystore requer a senha do store. Alguns comandos requerem uma senha de chave privada/secreta. As senhas podem ser especificadas na linha de comando nas opções `-storepass` e `-keypass`. No entanto, uma senha não deve ser especificada na linha de comando ou em um script, a menos que seja para testes, ou você esteja em um sistema seguro. Quando você não especifica uma opção de senha necessária na linha de comando, ela é solicitada.

## Aviso de Conformidade de Certificado

[Perfil de Certificado e Lista de Revogação de Certificados (CRL) da Infraestrutura de Chave Pública X.509 da Internet](<https://tools.ietf.org/rfc/rfc5280.txt>) definiu um perfil para certificados X.509 conformes, que inclui quais valores e combinações de valores são válidos para campos e extensões de certificado.

O comando `keytool` não impõe todas essas regras, portanto, pode gerar certificados que não estão em conformidade com o padrão, como certificados autoassinados que seriam usados para fins de teste interno. Certificados que não estão em conformidade com o padrão podem ser rejeitados pelo JDK ou por outras aplicações. Os usuários devem garantir que fornecem as opções corretas para `-dname`, `-ext`, e assim por diante.

## Importar um Novo Certificado Confiável

Antes de adicionar o certificado ao keystore, o comando `keytool` o verifica tentando construir uma cadeia de confiança desse certificado para um certificado autoassinado (pertencente a uma root CA), usando certificados confiáveis que já estão disponíveis no keystore.

Se a opção `-trustcacerts` foi especificada, então certificados adicionais são considerados para a cadeia de confiança, ou seja, os certificados em um arquivo chamado `cacerts`.

Se o comando `keytool` falhar em estabelecer um caminho de confiança do certificado a ser importado até um certificado autoassinado (seja do keystore ou do arquivo `cacerts`), então as informações do certificado são impressas, e o usuário é solicitado a verificá-lo comparando as fingerprints do certificado exibidas com as fingerprints obtidas de alguma outra fonte de informação (confiável), que pode ser o proprietário do certificado. Tenha muito cuidado para garantir que o certificado é válido antes de importá-lo como um certificado confiável. O usuário tem então a opção de interromper a operação de importação. Se a opção `-noprompt` for especificada, não haverá interação com o usuário.

## Importar uma Resposta de Certificado

Ao importar uma resposta de certificado, a resposta de certificado é validada com certificados confiáveis do keystore e, opcionalmente, os certificados configurados no arquivo keystore `cacerts` quando a opção `-trustcacerts` é especificada.

Os métodos para determinar se a resposta de certificado é confiável são os seguintes:

*   Se a resposta for um único certificado X.509, então o comando `keytool` tenta estabelecer uma cadeia de confiança, começando na resposta de certificado e terminando em um certificado autoassinado (pertencente a uma root CA). A resposta de certificado e a hierarquia de certificados são usadas para autenticar a resposta de certificado da nova cadeia de aliases de certificado. Se uma cadeia de confiança não puder ser estabelecida, a resposta de certificado não será importada. Neste caso, o comando `keytool` não imprime o certificado e não solicita ao usuário que o verifique, porque é muito difícil para um usuário determinar a autenticidade da resposta de certificado.

*   Se a resposta for uma cadeia de certificados formatada em PKCS #7 ou uma sequência de certificados X.509, então a cadeia é ordenada com o certificado do usuário primeiro, seguido por zero ou mais certificados CA. Se a cadeia terminar com um certificado root CA autoassinado e a opção `-trustcacerts` foi especificada, o comando `keytool` tenta combiná-lo com qualquer um dos certificados confiáveis no keystore ou no arquivo keystore `cacerts`. Se a cadeia não terminar com um certificado root CA autoassinado e a opção `-trustcacerts` foi especificada, o comando `keytool` tenta encontrar um entre os certificados confiáveis no keystore ou no arquivo keystore `cacerts` e adicioná-lo ao final da cadeia. Se o certificado não for encontrado e a opção `-noprompt` não for especificada, as informações do último certificado na cadeia são impressas, e o usuário é solicitado a verificá-lo.

Se a chave pública na resposta de certificado corresponder à chave pública do usuário já armazenada com `alias`, então a antiga cadeia de certificados é substituída pela nova cadeia de certificados na resposta. A cadeia antiga só pode ser substituída com uma `keypass` válida, e assim a senha usada para proteger a chave privada da entrada é fornecida. Se nenhuma senha for fornecida, e a senha da chave privada for diferente da senha do keystore, o usuário é solicitado a fornecê-la.

Este comando foi nomeado `-import` em versões anteriores. Este nome antigo ainda é suportado nesta versão. O novo nome, `-importcert`, é preferido.