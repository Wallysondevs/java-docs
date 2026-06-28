# O Comando jarsigner

## Nome

jarsigner - assina e verifica arquivos Java Archive (JAR)

## Sinopse

`jarsigner` [_options_] _jar-file_ _alias_

`jarsigner` `-verify` [_options_] _jar-file_ [_alias_ ...]

`jarsigner` `-version`

_options_
     As opções de linha de comando. Consulte Opções para jarsigner.
`-verify`
    

A opção `-verify` pode receber zero ou mais nomes de alias de keystore após o nome do arquivo JAR. Quando a opção `-verify` é especificada, o comando `jarsigner` verifica se o certificado usado para verificar cada entrada assinada no arquivo JAR corresponde a um dos aliases do keystore. Os aliases são definidos no keystore especificado por `-keystore` ou no keystore padrão.

Se você também especificar a opção `-strict`, e o comando `jarsigner` detectar avisos graves, a mensagem "jar verified, with signer errors" será exibida.

_jar-file_
    

O arquivo JAR a ser assinado.

Se você também especificou a opção `-strict`, e o comando `jarsigner` detectou avisos graves, a mensagem "jar signed, with signer errors" será exibida.

_alias_
     Os aliases são definidos no keystore especificado por `-keystore` ou no keystore padrão.
`-version`
     A opção `-version` imprime a versão do programa `jarsigner`.

## Descrição

A ferramenta `jarsigner` tem dois propósitos:

  * Assinar arquivos Java Archive (JAR).

  * Verificar as assinaturas e a integridade de arquivos JAR assinados.

O recurso JAR permite o empacotamento de arquivos de classe, imagens, sons e outros dados digitais em um único arquivo para uma distribuição mais rápida e fácil. Uma ferramenta chamada `jar` permite que os desenvolvedores produzam arquivos JAR. (Tecnicamente, qualquer arquivo ZIP também pode ser considerado um arquivo JAR, embora quando criados pelo comando `jar` ou processados pelo comando `jarsigner`, os arquivos JAR também contenham um arquivo `META-INF/MANIFEST.MF`.)

Uma assinatura digital é uma sequência de bits que é calculada a partir de alguns dados (os dados sendo assinados) e da chave privada de uma entidade (uma pessoa, empresa, etc.). Semelhante a uma assinatura manuscrita, uma assinatura digital possui muitas características úteis:

  * Sua autenticidade pode ser verificada por um cálculo que usa a chave pública correspondente à chave privada usada para gerar a assinatura.

  * Não pode ser forjada, assumindo que a chave privada seja mantida em segredo.

  * É uma função dos dados assinados e, portanto, não pode ser alegada como a assinatura para outros dados também.

  * Os dados assinados não podem ser alterados. Se os dados forem alterados, a assinatura não poderá ser verificada como autêntica.

Para gerar a assinatura de uma entidade para um arquivo, a entidade deve primeiro ter um par de chaves pública/privada associado a ela e um ou mais certificados que autentiquem sua chave pública. Um certificado é uma declaração digitalmente assinada de uma entidade que afirma que a chave pública de outra entidade tem um valor específico.

O comando `jarsigner` usa informações de chave e certificado de um keystore para gerar assinaturas digitais para arquivos JAR. Um keystore é um banco de dados de chaves privadas e suas cadeias de certificados X.509 associadas que autenticam as chaves públicas correspondentes. O comando `keytool` é usado para criar e administrar keystores.

O comando `jarsigner` usa a chave privada de uma entidade para gerar uma assinatura. O arquivo JAR assinado contém, entre outras coisas, uma cópia do certificado do keystore para a chave pública correspondente à chave privada usada para assinar o arquivo. O comando `jarsigner` pode verificar a assinatura digital do arquivo JAR assinado usando o certificado dentro dele (em seu arquivo de bloco de assinatura).

O comando `jarsigner` pode gerar assinaturas que incluem um carimbo de data/hora que permite que um sistema ou implantador verifique se o arquivo JAR foi assinado enquanto o certificado de assinatura ainda era válido.

Além disso, as APIs permitem que os aplicativos obtenham as informações de carimbo de data/hora.

Atualmente, o comando `jarsigner` pode assinar apenas arquivos JAR criados pelo comando `jar` ou arquivos zip. Arquivos JAR são os mesmos que arquivos zip, exceto que eles também possuem um arquivo `META-INF/MANIFEST.MF`. Um arquivo `META-INF/MANIFEST.MF` é criado quando o comando `jarsigner` assina um arquivo zip.

O comportamento padrão do comando `jarsigner` é assinar um arquivo JAR ou zip. Use a opção `-verify` para verificar um arquivo JAR assinado.

O comando `jarsigner` também tenta validar o certificado do signatário após a assinatura ou verificação. Durante a validação, ele verifica o status de revogação de cada certificado na cadeia de certificados do signatário quando a opção `-revCheck` é especificada. Se houver um erro de validação ou qualquer outro problema, o comando gera mensagens de aviso. Se você especificar a opção `-strict`, o comando trata avisos graves como erros. Consulte Erros e Avisos.

## Aliases de Keystore

Todas as entidades do keystore são acessadas com aliases únicos.

Ao usar o comando `jarsigner` para assinar um arquivo JAR, você deve especificar o alias para a entrada do keystore que contém a chave privada necessária para gerar a assinatura. Se nenhum arquivo de saída for especificado, ele sobrescreve o arquivo JAR original com o arquivo JAR assinado.

Keystores são protegidos com uma senha, então a senha do armazenamento deve ser especificada. Você será solicitado a fornecê-la se não a especificar na linha de comando. Da mesma forma, as chaves privadas são protegidas em um keystore com uma senha, então a senha da chave privada deve ser especificada, e você será solicitado a fornecê-la se não a especificar na linha de comando e ela não for a mesma que a senha do armazenamento.

## Localização do Keystore

O comando `jarsigner` possui uma opção `-keystore` para especificar a URL do keystore a ser usado. O keystore é, por padrão, armazenado em um arquivo chamado `.keystore` no diretório inicial do usuário, conforme determinado pela propriedade de sistema `user.home`.

**Linux e macOS:** `user.home` assume como padrão o diretório inicial do usuário.

O fluxo de entrada da opção `-keystore` é passado para o método `KeyStore.load`. Se `NONE` for especificado como a URL, então um fluxo nulo é passado para o método `KeyStore.load`. `NONE` deve ser especificado quando a classe `KeyStore` não é baseada em arquivo, por exemplo, quando reside em um dispositivo de token de hardware.

## Implementação do Keystore

A classe `KeyStore` fornecida no pacote `java.security` oferece uma série de interfaces bem definidas para acessar e modificar as informações em um keystore. Você pode ter várias implementações concretas diferentes, onde cada implementação é para um tipo específico de keystore.

Atualmente, existem duas ferramentas de linha de comando que usam implementações de keystore (`keytool` e `jarsigner`).

A implementação padrão de keystore é `PKCS12`. Este é um keystore multiplataforma baseado no Padrão de Sintaxe de Troca de Informações Pessoais RSA PKCS12. Este padrão destina-se principalmente a armazenar ou transportar chaves privadas de um usuário, certificados e segredos diversos. Existe outra implementação embutida, fornecida pela Oracle. Ela implementa o keystore como um arquivo com um tipo de keystore (formato) proprietário chamado `JKS`. Ele protege cada chave privada com sua senha individual e também protege a integridade de todo o keystore com uma senha (possivelmente diferente).

As implementações de keystore são baseadas em provedores, o que significa que as interfaces de aplicativo fornecidas pela classe `KeyStore` são implementadas em termos de uma Interface de Provedor de Serviço (SPI). Existe uma classe abstrata `KeystoreSpi` correspondente, também no pacote `java.security`, que define os métodos da Interface de Provedor de Serviço que os provedores devem implementar. O termo provedor refere-se a um pacote ou um conjunto de pacotes que fornecem uma implementação concreta de um subconjunto de serviços que podem ser acessados pela Java Security API. Para fornecer uma implementação de keystore, os clientes devem implementar um provedor e fornecer uma implementação de subclasse `KeystoreSpi`, conforme descrito em [Como Implementar um Provedor na Arquitetura de Criptografia Java](<https://www.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=security_guide_implement_provider_jca>).

Os aplicativos podem escolher diferentes tipos de implementações de keystore de diferentes provedores, com o método de fábrica `getInstance` na classe `KeyStore`. Um tipo de keystore define o armazenamento e o formato de dados das informações do keystore e os algoritmos usados para proteger as chaves privadas no keystore e a integridade do próprio keystore. Implementações de keystore de diferentes tipos não são compatíveis.

Os comandos `jarsigner` podem ler keystores baseados em arquivo de qualquer local que possa ser especificado usando uma URL. Além disso, esses comandos podem ler keystores não baseados em arquivo, como os fornecidos pelo MSCAPI no Windows e PKCS11 em todas as plataformas.

Para os comandos `jarsigner` e `keytool`, você pode especificar um tipo de keystore na linha de comando com a opção `-storetype`.

Se você não especificar explicitamente um tipo de keystore, as ferramentas escolherão uma implementação de keystore com base no valor da propriedade `keystore.type` especificada no arquivo de propriedades de segurança. O arquivo de propriedades de segurança é chamado `java.security` e reside no diretório de propriedades de segurança do JDK, `java.home/conf/security`.

Cada ferramenta obtém o valor `keystore.type` e, em seguida, examina todos os provedores instalados até encontrar um que implemente keystores desse tipo. Em seguida, ela usa a implementação de keystore desse provedor.

A classe `KeyStore` define um método estático chamado `getDefaultType` que permite que os aplicativos recuperem o valor da propriedade `keystore.type`. A seguinte linha de código cria uma instância do tipo de keystore padrão conforme especificado na propriedade `keystore.type`:

> `KeyStore keyStore = KeyStore.getInstance(KeyStore.getDefaultType());`

O tipo de keystore padrão é `pkcs12`, que é um keystore multiplataforma baseado no Padrão de Sintaxe de Troca de Informações Pessoais RSA PKCS12. Isso é especificado pela seguinte linha no arquivo de propriedades de segurança:

> `keystore.type=pkcs12`

O uso de maiúsculas e minúsculas não importa nas designações de tipo de keystore. Por exemplo, `JKS` é o mesmo que `jks`.

Para que as ferramentas utilizem uma implementação de keystore diferente da padrão, você pode alterar essa linha para especificar um tipo de keystore diferente. Por exemplo, se você quiser usar a implementação de keystore `jks` da Oracle, altere a linha para o seguinte:

> `keystore.type=jks`

## Algoritmos Suportados

Por padrão, o comando `jarsigner` assina um arquivo JAR usando um dos seguintes algoritmos e extensões de arquivo de bloco, dependendo do tipo e tamanho da chave privada:

Algoritmos de Assinatura Padrão e Extensões de Arquivo de Bloco keyalg | key size | default sigalg | block file extension
---|---|---|---
DSA | any size | SHA256withDSA | .DSA
RSA | < 624 | SHA256withRSA | .RSA
| <= 7680 | SHA384withRSA |
| > 7680 | SHA512withRSA |
EC | < 512 | SHA384withECDSA | .EC
| >= 512 | SHA512withECDSA |
RSASSA-PSS | < 624 | RSASSA-PSS (with SHA-256) | .RSA
| <= 7680 | RSASSA-PSS (with SHA-384) |
| > 7680 | RSASSA-PSS (with SHA-512) |
EdDSA | 255 | Ed25519 | .EC
| 448 | Ed448 |

  * Se uma chave RSASSA-PSS for codificada com parâmetros, o jarsigner usará os mesmos parâmetros na assinatura. Caso contrário, o jarsigner usará parâmetros determinados pelo tamanho da chave, conforme especificado na tabela acima. Por exemplo, uma chave RSASSA-PSS de 3072 bits usará RSASSA-PSS como algoritmo de assinatura e SHA-384 como algoritmos de hash e MGF1.

  * Se um algoritmo de chave não estiver listado nesta tabela, a extensão `.DSA` será usada ao assinar um arquivo JAR.

Esses algoritmos de assinatura padrão podem ser substituídos usando a opção `-sigalg`.

O comando `jarsigner` usa as propriedades de segurança `jdk.jar.disabledAlgorithms` e `jdk.security.legacyAlgorithms` para determinar quais algoritmos são considerados um risco de segurança. Se o arquivo JAR foi assinado com quaisquer algoritmos desabilitados, ele será tratado como um arquivo JAR não assinado. Se o arquivo JAR foi assinado com quaisquer algoritmos legados, ele será tratado como assinado com um aviso informativo para informar aos usuários que o algoritmo legado será desabilitado em uma futura atualização. Para uma saída de verificação detalhada, inclua `-J-Djava.security.debug=jar`. As propriedades de segurança `jdk.jar.disabledAlgorithms` e `jdk.security.legacyAlgorithms` são definidas no arquivo `java.security` (localizado no diretório `$JAVA_HOME/conf/security` do JDK).

**Nota:**

Para melhorar a segurança "out of the box", o tamanho da chave padrão e os nomes dos algoritmos de assinatura são periodicamente atualizados para valores mais fortes a cada lançamento do JDK. Se a interoperabilidade com lançamentos mais antigos do JDK for importante, certifique-se de que os padrões sejam suportados por esses lançamentos, ou, alternativamente, use a opção `-sigalg` para substituir os valores padrão por sua própria conta e risco.

## O Arquivo JAR Assinado

Quando o comando `jarsigner` é usado para assinar um arquivo JAR, o arquivo JAR assinado de saída é exatamente o mesmo que o arquivo JAR de entrada, exceto que ele possui dois arquivos adicionais colocados no diretório META-INF:

  * Um arquivo de assinatura com extensão `.SF`

  * Um arquivo de bloco de assinatura com extensão `.DSA`, `.RSA` ou `.EC`

Os nomes de arquivo base para esses dois arquivos vêm do valor da opção `-sigfile`. Por exemplo, quando a opção é `-sigfile MKSIGN`, os arquivos são nomeados `MKSIGN.SF` e `MKSIGN.RSA`. Neste documento, assumimos que o signatário sempre usa uma chave RSA.

Se nenhuma opção `-sigfile` aparecer na linha de comando, o nome de arquivo base para os arquivos `.SF` e de bloco de assinatura será os primeiros 8 caracteres do nome do alias especificado na linha de comando, todos convertidos para maiúsculas. Se o nome do alias tiver menos de 8 caracteres, o nome completo do alias será usado. Se o nome do alias contiver quaisquer caracteres que não são permitidos em um nome de arquivo de assinatura, cada um desses caracteres será convertido em um caractere de sublinhado (_) ao formar o nome do arquivo. Caracteres válidos incluem letras, dígitos, sublinhados e hífens.

## Arquivo de Assinatura

Um arquivo de assinatura (arquivo `.SF`) se parece com o arquivo de manifesto que é sempre incluído em um arquivo JAR quando o comando `jarsigner` é usado para assinar o arquivo. Para cada arquivo de origem incluído no arquivo JAR, o arquivo `.SF` tem duas linhas, como no arquivo de manifesto, que listam o seguinte:

  * Nome do arquivo

  * Nome do algoritmo de digest (SHA)

  * Valor do digest SHA

**Nota:**

O nome do algoritmo de digest (SHA) e o valor do digest SHA estão na mesma linha.

No arquivo de manifesto, o valor do digest SHA para cada arquivo de origem é o digest (hash) dos dados binários no arquivo de origem. No arquivo `.SF`, o valor do digest para um arquivo de origem especificado é o hash das duas linhas no arquivo de manifesto para o arquivo de origem.

O arquivo de assinatura, por padrão, inclui um cabeçalho com um hash de todo o arquivo de manifesto. O cabeçalho também contém um hash do cabeçalho do manifesto. A presença do cabeçalho permite a otimização da verificação. Consulte Verificação de Arquivo JAR.

## Arquivo de Bloco de Assinatura

O arquivo `.SF` é assinado e a assinatura é colocada no arquivo de bloco de assinatura. Este arquivo também contém, codificado em seu interior, o certificado ou cadeia de certificados do keystore que autentica a chave pública correspondente à chave privada usada para assinar. O arquivo tem a extensão `.DSA`, `.RSA` ou `.EC`, dependendo do algoritmo de chave usado. Consulte a tabela em Algoritmos Suportados.

## Carimbo de Data/Hora da Assinatura

O comando `jarsigner` usado com as seguintes opções gera e armazena um carimbo de data/hora de assinatura ao assinar um arquivo JAR:

  * `-tsa` _url_

  * `-tsacert` _alias_

  * `-tsapolicyid` _policyid_

  * `-tsadigestalg` _algorithm_

Consulte Opções para jarsigner.

## Verificação de Arquivo JAR

Uma verificação bem-sucedida de um arquivo JAR ocorre quando as assinaturas são válidas e nenhum dos arquivos que estavam no arquivo JAR quando as assinaturas foram geradas foi alterado desde então. A verificação de arquivo JAR envolve as seguintes etapas:

  1. Verifique a assinatura do arquivo `.SF`.

A verificação garante que a assinatura armazenada em cada arquivo de bloco de assinatura foi gerada usando a chave privada correspondente à chave pública cujo certificado (ou cadeia de certificados) também aparece no arquivo de bloco de assinatura. Ela também garante que a assinatura é uma assinatura válida do arquivo de assinatura (`.SF`) correspondente e, portanto, o arquivo `.SF` não foi adulterado.

  2. Verifique o digest listado em cada entrada no arquivo `.SF` com cada seção correspondente no manifesto.

O arquivo `.SF` por padrão inclui um cabeçalho que contém um hash de todo o arquivo de manifesto. Quando o cabeçalho está presente, a verificação pode verificar se o hash no cabeçalho corresponde ao hash do arquivo de manifesto. Se houver uma correspondência, a verificação prossegue para a próxima etapa.

Se não houver correspondência, uma verificação menos otimizada é necessária para garantir que o hash em cada seção de informações do arquivo de origem no arquivo `.SF` seja igual ao hash de sua seção correspondente no arquivo de manifesto. Consulte Arquivo de Assinatura.

Uma razão pela qual o hash do arquivo de manifesto armazenado no cabeçalho do arquivo `.SF` pode não ser igual ao hash do arquivo de manifesto atual é que ele pode conter seções para arquivos recém-adicionados após a assinatura do arquivo. Por exemplo, suponha que um ou mais arquivos foram adicionados ao arquivo JAR assinado (usando a ferramenta `jar`) que já contém uma assinatura e um arquivo `.SF`. Se o arquivo JAR for assinado novamente por um signatário diferente, o arquivo de manifesto é alterado (seções são adicionadas a ele para os novos arquivos pela ferramenta `jarsigner`) e um novo arquivo `.SF` é criado, mas o arquivo `.SF` original permanece inalterado. Uma verificação ainda é considerada bem-sucedida se nenhum dos arquivos que estavam no arquivo JAR quando a assinatura original foi gerada foi alterado desde então. Isso ocorre porque os hashes nas seções não-cabeçalho do arquivo `.SF` são iguais aos hashes das seções correspondentes no arquivo de manifesto.

  3. Leia cada arquivo no arquivo JAR que possui uma entrada no arquivo `.SF`. Durante a leitura, calcule o digest do arquivo e compare o resultado com o digest para este arquivo na seção do manifesto. Os digests devem ser os mesmos ou a verificação falha.

Se ocorrerem falhas graves de verificação durante o processo de verificação, o processo é interrompido e uma exceção de segurança é lançada. O comando `jarsigner` captura e exibe a exceção.

  4. Verifique o uso de algoritmos desabilitados. Consulte Algoritmos Suportados.

**Nota:**

Você deve ler quaisquer avisos adicionais (ou erros, se você especificou a opção `-strict`), bem como o conteúdo do certificado (especificando as opções `-verbose` e `-certs`) para determinar se a assinatura pode ser confiável.
## Múltiplas Assinaturas para um Arquivo JAR

Um arquivo JAR pode ser assinado por várias pessoas executando o comando `jarsigner` no arquivo várias vezes e especificando o alias para uma pessoa diferente a cada vez, como segue:
```
    jarsigner myBundle.jar susan
    jarsigner myBundle.jar kevin
```

Quando um arquivo JAR é assinado várias vezes, existem múltiplos arquivos `.SF` e de bloco de assinatura no arquivo JAR resultante, um par para cada assinatura. No exemplo anterior, o arquivo JAR de saída inclui arquivos com os seguintes nomes:
```
    SUSAN.SF
    SUSAN.RSA
    KEVIN.SF
    KEVIN.RSA
```

## Opções para jarsigner

As seções a seguir descrevem as opções para o `jarsigner`. Esteja ciente dos seguintes padrões:

  * Todos os nomes de opções são precedidos por um sinal de hífen (-).

  * As opções podem ser fornecidas em qualquer ordem.

  * Itens em itálico ou sublinhados (valores de opção) representam os valores reais que devem ser fornecidos.

  * As opções `-storepass`, `-keypass`, `-sigfile`, `-sigalg`, `-digestalg`, `-signedjar` e as opções relacionadas a TSA são relevantes apenas ao assinar um arquivo JAR; elas não são relevantes ao verificar um arquivo JAR assinado. A opção `-keystore` é relevante para assinar e verificar um arquivo JAR. Além disso, aliases são especificados ao assinar e verificar um arquivo JAR.

`-keystore` _url_
    

Especifica a URL que indica a localização do keystore. Isso assume como padrão o arquivo `.keystore` no diretório home do usuário, conforme determinado pela propriedade de sistema `user.home`.

Um keystore é necessário ao assinar. Você deve especificar explicitamente um keystore quando o keystore padrão não existir ou se você quiser usar um diferente do padrão.

Um keystore não é necessário ao verificar, mas se um for especificado ou o padrão existir e a opção `-verbose` também for especificada, então informações adicionais são exibidas sobre se algum dos certificados usados para verificar o arquivo JAR está contido nesse keystore.

O argumento `-keystore` pode ser um nome de arquivo e especificação de caminho em vez de uma URL, caso em que é tratado da mesma forma que uma URL `file:`, por exemplo, os seguintes são equivalentes:

  * `-keystore` _filePathAndName_

  * `-keystore file:`_filePathAndName_

Se o provedor Sun PKCS #11 foi configurado no arquivo de propriedades de segurança `java.security` (localizado no diretório `$JAVA_HOME/conf/security` do JDK), então as ferramentas `keytool` e `jarsigner` podem operar no token PKCS #11 especificando estas opções:

> `-keystore NONE -storetype PKCS11`

Por exemplo, o seguinte comando lista o conteúdo do token PKCS#11 configurado:

> `keytool -keystore NONE -storetype PKCS11 -list`

`-storepass` [`:env` | `:file`] _argument_
    

Especifica a senha necessária para acessar o keystore. Isso é necessário apenas ao assinar (não verificar) um arquivo JAR. Nesse caso, se uma opção `-storepass` não for fornecida na linha de comando, o usuário será solicitado a inserir a senha.

Se o modificador `env` ou `file` não for especificado, a senha terá o valor `argument`. Caso contrário, a senha é recuperada da seguinte forma:

  * `env`: Recupera a senha da variável de ambiente nomeada _argument_.

  * `file`: Recupera a senha do arquivo nomeado _argument_.

**Nota:**

A senha não deve ser especificada na linha de comando ou em um script, a menos que seja para fins de teste, ou você esteja em um sistema seguro.

`-storetype` _storetype_
    

Especifica o tipo de keystore a ser instanciado. O tipo de keystore padrão é aquele especificado como o valor da propriedade `keystore.type` no arquivo de propriedades de segurança, que é retornado pelo método estático `getDefaultType` em `java.security.KeyStore`.

O PIN para um token PKCS #11 também pode ser especificado com a opção `-storepass`. Se nenhum for especificado, os comandos `keytool` e `jarsigner` solicitarão o PIN do token. Se o token tiver um caminho de autenticação protegido (como um PIN-pad dedicado ou um leitor biométrico), então a opção `-protected` deve ser especificada e nenhuma opção de senha pode ser especificada.

`-keypass` [`:env` | `:file`] _argument_ `-certchain` _file_
    

Especifica a senha usada para proteger a chave privada da entrada do keystore endereçada pelo alias especificado na linha de comando. A senha é necessária ao usar `jarsigner` para assinar um arquivo JAR. Se nenhuma senha for fornecida na linha de comando, e a senha necessária for diferente da senha do keystore, o usuário será solicitado a inseri-la.

Se o modificador `env` ou `file` não for especificado, a senha terá o valor `argument`. Caso contrário, a senha é recuperada da seguinte forma:

  * `env`: Recupera a senha da variável de ambiente nomeada _argument_.

  * `file`: Recupera a senha do arquivo nomeado _argument_.

**Nota:**

A senha não deve ser especificada na linha de comando ou em um script, a menos que seja para fins de teste, ou você esteja em um sistema seguro.

`-certchain` _file_
     Especifica a cadeia de certificados a ser usada quando a cadeia de certificados associada à chave privada da entrada do keystore que é endereçada pelo alias especificado na linha de comando não estiver completa. Isso pode acontecer quando o keystore está localizado em um token de hardware onde não há capacidade suficiente para armazenar uma cadeia de certificados completa. O arquivo pode ser uma sequência de certificados X.509 concatenados, ou um único bloco de dados formatado em PKCS#7, tanto em formato de codificação binária quanto em formato de codificação imprimível (também conhecido como codificação Base64) conforme definido pelo [Internet RFC 1421 Certificate Encoding Standard](<http://tools.ietf.org/html/rfc1421>).
`-sigfile` _file_
    

Especifica o nome base do arquivo a ser usado para os arquivos `.SF` e de bloco de assinatura gerados. Por exemplo, se o arquivo for `DUKESIGN`, então os arquivos `.SF` e de bloco de assinatura gerados serão nomeados `DUKESIGN.SF` e `DUKESIGN.RSA`, e colocados no diretório `META-INF` do arquivo JAR assinado.

Os caracteres no arquivo devem vir do conjunto `a-zA-Z0-9_-`. Apenas letras, números, sublinhado e hífens são permitidos. Todos os caracteres minúsculos são convertidos para maiúsculas para os nomes dos arquivos `.SF` e de bloco de assinatura.

Se nenhuma opção `-sigfile` aparecer na linha de comando, então o nome base do arquivo para os arquivos `.SF` e de bloco de assinatura será os primeiros 8 caracteres do nome do alias especificado na linha de comando, todos convertidos para maiúsculas. Se o nome do alias tiver menos de 8 caracteres, então o nome completo do alias é usado. Se o nome do alias contiver quaisquer caracteres que não sejam válidos em um nome de arquivo de assinatura, então cada um desses caracteres é convertido para um caractere de sublinhado (_) para formar o nome do arquivo.

`-signedjar` _file_
     Especifica o nome do arquivo JAR assinado.
`-digestalg` _algorithm_
    

Especifica o nome do algoritmo de resumo de mensagem a ser usado ao digerir as entradas de um arquivo JAR.

Para uma lista de nomes de algoritmos de resumo de mensagem padrão, consulte a Java Security Standard Algorithm Names Specification.

Se esta opção não for especificada, então `SHA-384` é usado. Deve haver um provedor instalado estaticamente fornecendo uma implementação do algoritmo especificado ou o usuário deve especificar um com as opções `-addprovider` ou `-providerClass`; caso contrário, o comando não terá sucesso.

`-sigalg` _algorithm_
    

Especifica o nome do algoritmo de assinatura a ser usado para assinar o arquivo JAR.

Este algoritmo deve ser compatível com a chave privada usada para assinar o arquivo JAR. Se esta opção não for especificada, então use um algoritmo padrão que corresponda à chave privada, conforme descrito na seção Supported Algorithms. Deve haver um provedor instalado estaticamente fornecendo uma implementação do algoritmo especificado ou você deve especificar um com a opção `-addprovider` ou `-providerClass`; caso contrário, o comando não terá sucesso.

Para uma lista de nomes de algoritmos de assinatura padrão, consulte a Java Security Standard Algorithm Names Specification.

`-verify`
     Verifica um arquivo JAR assinado.
`-verbose`[`:`_suboptions_]
    

Quando a opção `-verbose` aparece na linha de comando, ela indica que o `jarsigner` usa o modo verboso ao assinar ou verificar, com as subopções determinando quanta informação é mostrada. Isso faz com que o `jarsigner` exiba informações extras sobre o progresso da assinatura ou verificação do JAR. As _subopções_ podem ser `all`, `grouped` ou `summary`.

Se a opção `-certs` também for especificada, então o modo padrão (ou subopção `all`) exibe cada entrada à medida que é processada, e depois disso, as informações do certificado para cada signatário do arquivo JAR.

Se as subopções `-certs` e `-verbose:grouped` forem especificadas, então as entradas com as mesmas informações do signatário são agrupadas e exibidas juntamente com suas informações de certificado.

Se as subopções `-certs` e `-verbose:summary` forem especificadas, então as entradas com as mesmas informações do signatário são agrupadas e exibidas juntamente com suas informações de certificado.

Detalhes sobre cada entrada são resumidos e exibidos como _uma entrada (e mais)_. Consulte Example of Verifying a Signed JAR File e Example of Verification with Certificate Information.

`-certs`
    

Se a opção `-certs` aparecer na linha de comando com as opções `-verify` e `-verbose`, então a saída inclui informações de certificado para cada signatário do arquivo JAR. Esta informação inclui o nome do tipo de certificado (armazenado no arquivo de bloco de assinatura) que certifica a chave pública do signatário, e se o certificado é um certificado X.509 (uma instância de `java.security.cert.X509Certificate`), então o nome distinto do signatário.

O keystore também é examinado. Se nenhum valor de keystore for especificado na linha de comando, então o arquivo de keystore padrão (se houver) é verificado. Se o certificado de chave pública para um signatário corresponder a uma entrada no keystore, então o nome do alias para a entrada do keystore para esse signatário é exibido entre parênteses.

`-revCheck`
     Esta opção habilita a verificação de revogação de certificados ao assinar ou verificar um arquivo JAR. O comando `jarsigner` tenta fazer conexões de rede para buscar respostas OCSP e CRLs se a opção `-revCheck` for especificada na linha de comando. Observe que as verificações de revogação não são habilitadas a menos que esta opção seja especificada.
`-tsa` _url_
    

Se `-tsa http://example.tsa.url` aparecer na linha de comando ao assinar um arquivo JAR, então um carimbo de data/hora é gerado para a assinatura. A URL, `http://example.tsa.url`, identifica a localização da Autoridade de Carimbo de Tempo (TSA) e substitui qualquer URL encontrada com a opção `-tsacert`. A opção `-tsa` não exige que o certificado de chave pública da TSA esteja presente no keystore.

Para gerar o carimbo de data/hora, o `jarsigner` se comunica com a TSA usando o Time-Stamp Protocol (TSP) definido na RFC 3161. Quando bem-sucedido, o token de carimbo de data/hora retornado pela TSA é armazenado com a assinatura no arquivo de bloco de assinatura.

`-tsacert` _alias_
    

Quando `-tsacert` _alias_ aparece na linha de comando ao assinar um arquivo JAR, um carimbo de data/hora é gerado para a assinatura. O alias identifica o certificado de chave pública da TSA no keystore que está em vigor. O certificado da entrada é examinado em busca de uma extensão Subject Information Access que contenha uma URL identificando a localização da TSA.

O certificado de chave pública da TSA deve estar presente no keystore ao usar a opção `-tsacert`.

`-tsapolicyid` _policyid_
    

Especifica o identificador de objeto (OID) que identifica o ID da política a ser enviado ao servidor TSA. Se esta opção não for especificada, nenhum ID de política é enviado e o servidor TSA escolherá um ID de política padrão.

Identificadores de objeto são definidos por X.696, que é um padrão do ITU Telecommunication Standardization Sector (ITU-T). Esses identificadores são tipicamente conjuntos de dígitos não negativos separados por pontos, como `1.2.3.4`, por exemplo.

`-tsadigestalg` _algorithm_
    

Especifica o algoritmo de resumo de mensagem que é usado para gerar a impressão da mensagem a ser enviada ao servidor TSA. Se esta opção não for especificada, SHA-384 será usado.

Consulte Supported Algorithms.

Para uma lista de nomes de algoritmos de resumo de mensagem padrão, consulte a Java Security Standard Algorithm Names Specification.

`-internalsf`
     No passado, o arquivo de bloco de assinatura gerado quando um arquivo JAR era assinado incluía uma cópia codificada completa do arquivo `.SF` (arquivo de assinatura) também gerado. Este comportamento foi alterado. Para reduzir o tamanho total do arquivo JAR de saída, o arquivo de bloco de assinatura por padrão não contém mais uma cópia do arquivo `.SF`. Se `-internalsf` aparecer na linha de comando, então o comportamento antigo é utilizado. Esta opção é útil para testes. Na prática, não use a opção `-internalsf` porque ela acarreta maior sobrecarga.
`-sectionsonly`
    

Se a opção `-sectionsonly` aparecer na linha de comando, então o arquivo `.SF` (arquivo de assinatura) gerado quando um arquivo JAR é assinado não inclui um cabeçalho que contém um hash de todo o arquivo manifest. Ele contém apenas as informações e hashes relacionados a cada arquivo fonte individual incluído no arquivo JAR. Consulte Signature File.

Por padrão, este cabeçalho é adicionado, como uma otimização. Quando o cabeçalho está presente, sempre que o arquivo JAR é verificado, a verificação pode primeiro verificar se o hash no cabeçalho corresponde ao hash de todo o arquivo manifest. Quando há uma correspondência, a verificação prossegue para a próxima etapa. Quando não há correspondência, é necessário fazer uma verificação menos otimizada de que o hash em cada seção de informações do arquivo fonte no arquivo `.SF` é igual ao hash de sua seção correspondente no arquivo manifest. Consulte JAR File Verification.

A opção `-sectionsonly` é usada principalmente para testes. Ela não deve ser usada para outros fins que não sejam testes, pois seu uso acarreta maior sobrecarga.

`-protected`
     Os valores podem ser `true` ou `false`. Especifique `true` quando uma senha deve ser especificada através de um caminho de autenticação protegido, como um leitor de PIN dedicado.
`-providerName` _providerName_
    

Se mais de um provedor foi configurado no arquivo de propriedades de segurança `java.security`, então você pode usar a opção `-providerName` para direcionar uma instância de provedor específica. O argumento para esta opção é o nome do provedor.

Para o provedor Oracle PKCS #11, _providerName_ tem a forma `SunPKCS11-`_TokenName_, onde _TokenName_ é o sufixo do nome com o qual a instância do provedor foi configurada, conforme detalhado na tabela de atributos de configuração. Por exemplo, o seguinte comando lista o conteúdo da instância do provedor de keystore `PKCS #11` com o sufixo de nome `SmartCard`:

> `jarsigner -keystore NONE -storetype PKCS11 -providerName SunPKCS11-SmartCard -list`

`-addprovider` _name_ [`-providerArg` _arg_]
    

Adiciona um provedor de segurança por nome (como SunPKCS11) e um argumento de configuração opcional. O valor do provedor de segurança é o nome de um provedor de segurança que é definido em um módulo.

Usado com a opção `-providerArg ConfigFilePath`, as ferramentas `keytool` e `jarsigner` instalam o provedor dinamicamente e usam `ConfigFilePath` para o caminho do arquivo de configuração do token. O exemplo a seguir mostra um comando para listar um keystore `PKCS #11` quando o provedor Oracle PKCS #11 não foi configurado no arquivo de propriedades de segurança.

> `jarsigner -keystore NONE -storetype PKCS11 -addprovider SunPKCS11 -providerArg /mydir1/mydir2/token.config`

`-providerClass` _provider-class-name_ [`-providerArg` _arg_]
    

Usado para especificar o nome do arquivo de classe mestre do provedor de serviço criptográfico quando o provedor de serviço não está listado no arquivo de propriedades de segurança `java.security`. Adiciona um provedor de segurança por nome de classe totalmente qualificado e um argumento de configuração opcional.

**Nota:**

A forma preferida de carregar PKCS11 é usando módulos. Consulte `-addprovider`.

`-providerPath` _classpath_
     Usado para especificar o classpath para provedores especificados pela opção `-providerClass`. Múltiplos caminhos devem ser separados pelo caractere separador de caminho dependente do sistema.
`-J` _javaoption_
     Passa a string _javaoption_ especificada diretamente para o interpretador Java. O comando `jarsigner` é um wrapper em torno do interpretador. Esta opção não deve conter espaços. É útil para ajustar o ambiente de execução ou o uso de memória. Para uma lista de possíveis opções do interpretador, digite `java -h` ou `java -X` na linha de comando.
`-strict`
     Durante o processo de assinatura ou verificação, o comando pode emitir mensagens de aviso. Se você especificar esta opção, o código de saída da ferramenta reflete as mensagens de aviso severas que este comando encontrou. Consulte Errors and Warnings.
`-conf` _url_
     Especifica um arquivo de opções pré-configurado. Leia a [documentação do keytool](<#/doc/guides/tools/keytool>) para detalhes. As chaves de propriedade suportadas são "jarsigner.all" para todas as ações, "jarsigner.sign" para assinatura e "jarsigner.verify" para verificação. Argumentos do `jarsigner`, incluindo o nome do arquivo JAR e o(s) nome(s) do alias, não podem ser definidos neste arquivo.
`-version`
     Imprime a versão do programa.

## Erros e Avisos

Durante o processo de assinatura ou verificação, o comando `jarsigner` pode emitir vários erros ou avisos.

Se houver uma falha, o comando `jarsigner` sai com o código 1. Se não houver falha, mas houver um ou mais avisos severos, o comando `jarsigner` sai com o código 0 quando a opção `-strict` **não** é especificada, ou sai com o valor OR dos códigos de aviso quando `-strict` é especificado. Se houver apenas avisos informativos ou nenhum aviso, o comando sempre sai com o código 0.

Por exemplo, se um certificado usado para assinar uma entrada estiver expirado e tiver uma extensão KeyUsage que não permite assinar um arquivo, o comando `jarsigner` sai com o código 12 (=4+8) quando a opção `-strict` é especificada.

**Nota:** Os códigos de saída são reutilizados porque apenas os valores de 0 a 255 são legais no Linux e macOS.

As seções a seguir descrevem os nomes, códigos e descrições dos erros e avisos que o comando `jarsigner` pode emitir.

## Falha

As razões pelas quais o comando `jarsigner` falha incluem (mas não se limitam a) um erro de análise da linha de comando, a incapacidade de encontrar um par de chaves para assinar o arquivo JAR, ou a falha na verificação de um JAR assinado.

failure
     Código 1. A assinatura ou verificação falha.
## Advertências Graves

**Nota:**

Advertências graves são reportadas como erros se você especificar a opção `-strict`.

As razões pelas quais o comando `jarsigner` emite uma advertência grave incluem o certificado usado para assinar o arquivo JAR ter um erro ou o arquivo JAR assinado ter outros problemas.

`hasExpiredCert`
     Código 4. Este JAR contém entradas cujo certificado do signatário expirou.
`hasExpiredTsaCert`
     Código 4. O carimbo de data/hora expirou.
`notYetValidCert`
     Código 4. Este JAR contém entradas cujo certificado do signatário ainda não é válido.
`chainNotValidated`
     Código 4. Este JAR contém entradas cuja cadeia de certificados não é validada.
`tsaChainNotValidated`
     Código 64. O carimbo de data/hora é inválido.
`signerSelfSigned`
     Código 4. Este JAR contém entradas cujo certificado do signatário é autoassinado.
`disabledAlg`
     Código 4. Um algoritmo usado é considerado um risco de segurança e está desabilitado.
`badKeyUsage`
     Código 8. Este JAR contém entradas cuja extensão KeyUsage do certificado do signatário não permite a assinatura de código.
`badExtendedKeyUsage`
     Código 8. Este JAR contém entradas cuja extensão ExtendedKeyUsage do certificado do signatário não permite a assinatura de código.
`badNetscapeCertType`
     Código 8. Este JAR contém entradas cuja extensão NetscapeCertType do certificado do signatário não permite a assinatura de código.
`hasUnsignedEntry`
     Código 16. Este JAR contém entradas não assinadas que não foram verificadas quanto à integridade.
`notSignedByAlias`
     Código 32. Este JAR contém entradas assinadas que não são assinadas pelo(s) alias(es) especificado(s).
`aliasNotInStore`
     Código 32. Este JAR contém entradas assinadas que não são assinadas por um alias neste keystore.
`tsaChainNotValidated`
     Código 64. Este JAR contém entradas cuja cadeia de certificados TSA é inválida.

## Advertências Informativas

Advertências informativas incluem aquelas que não são erros, mas são consideradas uma má prática. Elas não possuem um código.

`extraAttributesDetected`
     As permissões de arquivo POSIX e/ou atributos de symlink são detectados durante a assinatura ou verificação de um arquivo JAR. A ferramenta `jarsigner` preserva esses atributos no arquivo recém-assinado, mas adverte que esses atributos não são assinados e não são protegidos pela assinatura.
`hasExpiringCert`
     Este JAR contém entradas cujo certificado do signatário expira em seis meses.
`hasExpiringTsaCert`
     O carimbo de data/hora expirará dentro de um ano em `AAAA-MM-DD`.
`hasMultipleManifests`
     Este JAR continha múltiplos arquivos manifest. Durante a assinatura, um dos arquivos foi selecionado, e os outros foram descartados.
`hasNonexistentEntries`
     Este JAR contém entradas assinadas para arquivos que não existem.
`internalInconsistenciesDetected`
     Este JAR contém inconsistências internas detectadas durante a verificação que podem resultar em conteúdos diferentes ao ler via JarFile e JarInputStream.
`legacyAlg`
     Um algoritmo usado é considerado um risco de segurança, mas não está desabilitado.
`noTimestamp`
     Este JAR contém assinaturas que não incluem um carimbo de data/hora. Sem um carimbo de data/hora, os usuários podem não conseguir validar este arquivo JAR após a data de expiração do certificado do signatário (`AAAA-MM-DD`) ou após qualquer data de revogação futura.

## Exemplo de Assinatura de um Arquivo JAR

Use o seguinte comando para assinar `bundle.jar` com a chave privada de um usuário cujo alias do keystore é `jane` em um keystore chamado `mystore` no diretório `working` e nomear o arquivo JAR assinado `sbundle.jar`:

> `jarsigner -keystore /working/mystore -storepass` _keystore_password_ `-keypass` _private_key_password_ `-signedjar sbundle.jar bundle.jar jane`

Não há `-sigfile` especificado no comando anterior, então os arquivos `.SF` e de bloco de assinatura gerados para serem colocados no arquivo JAR assinado têm nomes padrão baseados no nome do alias. Eles são nomeados `JANE.SF` e `JANE.RSA`.

Se você quiser que seja solicitada a senha do store e a senha da chave privada, então você pode encurtar o comando anterior para o seguinte:

> `jarsigner -keystore /working/mystore -signedjar sbundle.jar bundle.jar jane`

Se o `keystore` for o `keystore` padrão (`.keystore` no seu diretório home), então você não precisa especificar um `keystore`, como segue:

> `jarsigner -signedjar sbundle.jar bundle.jar jane`

Se você quiser que o arquivo JAR assinado sobrescreva o arquivo JAR de entrada (`bundle.jar`), então você não precisa especificar a opção `-signedjar`, como segue:

> `jarsigner bundle.jar jane`

## Exemplo de Verificação de um Arquivo JAR Assinado

Para verificar um arquivo JAR assinado e garantir que a assinatura é válida e que o arquivo JAR não foi adulterado, use um comando como o seguinte:

> `jarsigner -verify ButtonDemo.jar`

Quando a verificação é bem-sucedida, `jar verified` é exibido. Caso contrário, uma mensagem de erro é exibida. Você pode obter mais informações ao usar a opção `-verbose`. Um exemplo de uso de `jarsigner` com a opção `-verbose` segue:
```
    jarsigner -verify -verbose ButtonDemo.jar
    
    s       866 Tue Sep 12 20:08:48 EDT 2017 META-INF/MANIFEST.MF
            825 Tue Sep 12 20:08:48 EDT 2017 META-INF/ORACLE_C.SF
           7475 Tue Sep 12 20:08:48 EDT 2017 META-INF/ORACLE_C.RSA
              0 Tue Sep 12 20:07:54 EDT 2017 META-INF/
              0 Tue Sep 12 20:07:16 EDT 2017 components/
              0 Tue Sep 12 20:07:16 EDT 2017 components/images/
    sm      523 Tue Sep 12 20:07:16 EDT 2017 components/ButtonDemo$1.class
    sm     3440 Tue Sep 12 20:07:16 EDT 2017 components/ButtonDemo.class
    sm     2346 Tue Sep 12 20:07:16 EDT 2017 components/ButtonDemo.jnlp
    sm      172 Tue Sep 12 20:07:16 EDT 2017 components/images/left.gif
    sm      235 Tue Sep 12 20:07:16 EDT 2017 components/images/middle.gif
    sm      172 Tue Sep 12 20:07:16 EDT 2017 components/images/right.gif
    
      s = assinatura foi verificada
      m = entrada está listada no manifest
      k = pelo menos um certificado foi encontrado no keystore
    
    - Assinado por "CN="Oracle America, Inc.", OU=Software Engineering, O="Oracle America, Inc.", L=Redwood City, ST=California, C=US"
        Algoritmo de resumo: SHA-256
        Algoritmo de assinatura: SHA256withRSA, chave de 2048 bits
      Carimbo de data/hora por "CN=Symantec Time Stamping Services Signer - G4, O=Symantec Corporation, C=US" em Ter Set 12 20:08:49 UTC 2017
        Algoritmo de resumo do carimbo de data/hora: SHA-1
        Algoritmo de assinatura do carimbo de data/hora: SHA1withRSA, chave de 2048 bits
    
    jar verificado.
    
    O certificado do signatário expirou em 01-02-2018. No entanto, o JAR será válido até que o carimbo de data/hora expire em 29-12-2020.
```

## Exemplo de Verificação com Informações do Certificado

Se você especificar a opção `-certs` com as opções `-verify` e `-verbose`, a saída incluirá informações do certificado para cada signatário do arquivo JAR. As informações incluem o tipo de certificado, as informações de nome distinto do signatário (quando é um certificado X.509) e, entre parênteses, o alias do keystore para o signatário quando o certificado de chave pública no arquivo JAR corresponde ao de uma entrada do keystore, por exemplo:
```
    jarsigner -keystore $JAVA_HOME/lib/security/cacerts -verify -verbose -certs ButtonDemo.jar
    
    s k     866 Tue Sep 12 20:08:48 EDT 2017 META-INF/MANIFEST.MF
    
          >>> Signatário
          X.509, CN="Oracle America, Inc.", OU=Software Engineering, O="Oracle America, Inc.", L=Redwood City, ST=California, C=US
          [certificado é válido de 30-01-2017, 19:00 a 01-02-2018, 18:59]
          X.509, CN=Symantec Class 3 SHA256 Code Signing CA, OU=Symantec Trust Network, O=Symantec Corporation, C=US
          [certificado é válido de 09-12-2013, 19:00 a 09-12-2023, 18:59]
          X.509, CN=VeriSign Class 3 Public Primary Certification Authority - G5, OU="(c) 2006 VeriSign, Inc. - For authorized use only", OU=VeriSign Trust Network, O="VeriSign, Inc.", C=US (verisignclass3g5ca [jdk])
          [certificado confiável]
          >>> TSA
          X.509, CN=Symantec Time Stamping Services Signer - G4, O=Symantec Corporation, C=US
          [certificado é válido de 17-10-2012, 20:00 a 29-12-2020, 18:59]
          X.509, CN=Symantec Time Stamping Services CA - G2, O=Symantec Corporation, C=US
          [certificado é válido de 20-12-2012, 19:00 a 30-12-2020, 18:59]
    
            825 Tue Sep 12 20:08:48 EDT 2017 META-INF/ORACLE_C.SF
           7475 Tue Sep 12 20:08:48 EDT 2017 META-INF/ORACLE_C.RSA
              0 Tue Sep 12 20:07:54 EDT 2017 META-INF/
              0 Tue Sep 12 20:07:16 EDT 2017 components/
              0 Tue Sep 12 20:07:16 EDT 2017 components/images/
    smk     523 Tue Sep 12 20:07:16 EDT 2017 components/ButtonDemo$1.class
    
          [entrada foi assinada em 12-09-2017, 16:08]
          >>> Signatário
          X.509, CN="Oracle America, Inc.", OU=Software Engineering, O="Oracle America, Inc.", L=Redwood City, ST=California, C=US
          [certificado é válido de 30-01-2017, 19:00 a 01-02-2018, 18:59]
          X.509, CN=Symantec Class 3 SHA256 Code Signing CA, OU=Symantec Trust Network, O=Symantec Corporation, C=US
          [certificado é válido de 09-12-2013, 19:00 a 09-12-2023, 18:59]
          X.509, CN=VeriSign Class 3 Public Primary Certification Authority - G5, OU="(c) 2006 VeriSign, Inc. - For authorized use only", OU=VeriSign Trust Network, O="VeriSign, Inc.", C=US (verisignclass3g5ca [jdk])
          [certificado confiável]
          >>> TSA
          X.509, CN=Symantec Time Stamping Services Signer - G4, O=Symantec Corporation, C=US
          [certificado é válido de 17-10-2012, 20:00 a 29-12-2020, 18:59]
          X.509, CN=Symantec Time Stamping Services CA - G2, O=Symantec Corporation, C=US
          [certificado é válido de 20-12-2012, 19:00 a 30-12-2020, 18:59]
    
    smk    3440 Tue Sep 12 20:07:16 EDT 2017 components/ButtonDemo.class
    ...
    smk    2346 Tue Sep 12 20:07:16 EDT 2017 components/ButtonDemo.jnlp
    ...
    smk     172 Tue Sep 12 20:07:16 EDT 2017 components/images/left.gif
    ...
    smk     235 Tue Sep 12 20:07:16 EDT 2017 components/images/middle.gif
    ...
    smk     172 Tue Sep 12 20:07:16 EDT 2017 components/images/right.gif
    ...
    
      s = assinatura foi verificada
      m = entrada está listada no manifest
      k = pelo menos um certificado foi encontrado no keystore
    
    - Assinado por "CN="Oracle America, Inc.", OU=Software Engineering, O="Oracle America, Inc.", L=Redwood City, ST=California, C=US"
        Algoritmo de resumo: SHA-256
        Algoritmo de assinatura: SHA256withRSA, chave de 2048 bits
      Carimbo de data/hora por "CN=Symantec Time Stamping Services Signer - G4, O=Symantec Corporation, C=US" em Ter Set 12 20:08:49 UTC 2017
        Algoritmo de resumo do carimbo de data/hora: SHA-1
        Algoritmo de assinatura do carimbo de data/hora: SHA1withRSA, chave de 2048 bits
    
    jar verificado.
    
    O certificado do signatário expirou em 01-02-2018. No entanto, o JAR será válido até que o carimbo de data/hora expire em 29-12-2020.
```

Se o certificado de um signatário não for um certificado X.509, então não haverá informações de nome distinto. Nesse caso, apenas o tipo de certificado e o alias são mostrados. Por exemplo, se o certificado for um certificado PGP, e o alias for `bob`, então você obteria: `PGP, (bob)`.