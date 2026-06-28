# Guia de Referência PKCS#11

## 5 Guia de Referência PKCS#11

A plataforma Java define um conjunto de interfaces de programação para realizar operações criptográficas. Essas interfaces são coletivamente conhecidas como Java Cryptography Architecture (JCA) e Java Cryptography Extension (JCE). Consulte [Java Cryptography Architecture (JCA) Reference Guide](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide> "A Java Cryptography Architecture (JCA) é uma parte importante da plataforma e contém uma arquitetura de "provedor" e um conjunto de APIs para assinaturas digitais, resumos de mensagens (hashes), certificados e validação de certificados, criptografia (cifras de bloco/fluxo simétricas/assimétricas), geração e gerenciamento de chaves e geração segura de números aleatórios, para citar alguns.").

As interfaces criptográficas são baseadas em provedores. Especificamente, as aplicações se comunicam com Application Programming Interfaces (APIs), e as operações criptográficas reais são realizadas em provedores configurados que aderem a um conjunto de Service Provider Interfaces (SPIs). Essa arquitetura suporta diferentes implementações de provedores. Alguns provedores podem realizar operações criptográficas em software; outros podem realizar as operações em um token de hardware (por exemplo, em um dispositivo smartcard ou em um acelerador criptográfico de hardware).

O Cryptographic Token Interface Standard, PKCS#11, é produzido pela RSA Security e define interfaces de programação nativas para tokens criptográficos, como aceleradores criptográficos de hardware e smartcards. Aplicações existentes que usam as APIs JCA e JCE podem acessar tokens PKCS#11 nativos com o provedor PKCS#11. Nenhuma modificação na aplicação é necessária. O único requisito é configurar corretamente o provedor.

Embora uma aplicação possa usar a maioria dos recursos PKCS#11 usando as APIs existentes, algumas aplicações podem precisar de mais flexibilidade e capacidades. Por exemplo, uma aplicação pode querer lidar com smartcards sendo removidos e inseridos dinamicamente com mais facilidade. Ou, um token PKCS#11 pode exigir autenticação para algumas operações não relacionadas a chaves e, portanto, a aplicação deve ser capaz de fazer login no token sem usar o keystore. A JCA oferece às aplicações maior flexibilidade ao lidar com diferentes provedores.

Este documento descreve como tokens PKCS#11 nativos podem ser configurados na plataforma Java para uso por aplicações Java. Ele também descreve como a JCA facilita para as aplicações lidar com diferentes tipos de provedores, incluindo provedores PKCS#11.

### Provedor SunPKCS11

O provedor SunPKCS11, em contraste com a maioria dos outros provedores, não implementa algoritmos criptográficos por si só. Em vez disso, ele atua como uma ponte entre as APIs Java JCA e JCE e a API criptográfica nativa PKCS#11, traduzindo as chamadas e convenções entre as duas.

Isso significa que aplicações Java que chamam as APIs JCA e JCE padrão podem, sem modificação, aproveitar os algoritmos oferecidos pelas implementações PKCS#11 subjacentes, como, por exemplo,

*   Smartcards criptográficos,
*   Aceleradores criptográficos de hardware, e
*   Implementações de software de alto desempenho.

Nota:

Java SE apenas facilita o acesso a implementações PKCS#11 nativas, ele próprio não inclui uma implementação PKCS#11 nativa. No entanto, dispositivos criptográficos como Smartcards e aceleradores de hardware geralmente vêm com software que inclui uma implementação PKCS#11, que você precisa instalar e configurar de acordo com as instruções do fabricante.

### Requisitos do SunPKCS11

O provedor SunPKCS11 requer que uma implementação de PKCS#11 v2.20 ou posterior esteja instalada no sistema. Esta implementação deve ter a forma de uma biblioteca de objeto compartilhado (`.so` no Linux) ou biblioteca de vínculo dinâmico (`.dll` no Windows ou `.dylib` no macOS). Consulte a documentação do seu fornecedor para descobrir se o seu dispositivo criptográfico inclui tal implementação PKCS#11, como configurá-la e qual é o nome do arquivo da biblioteca.

O provedor SunPKCS11 suporta vários algoritmos, desde que a implementação PKCS#11 subjacente os ofereça. Os algoritmos e seus mecanismos PKCS#11 correspondentes estão listados na tabela em [SunPKCS11 Provider Supported Algorithms](<#/doc/guides/security/pkcs11-reference-guide1>).

### Configuração do SunPKCS11

O provedor SunPKCS11 está no módulo jdk.crypto.cryptoki. Para usar o provedor, você deve primeiro instalá-lo estaticamente ou programaticamente.

Para instalar o provedor estaticamente, adicione o provedor ao arquivo de propriedades de segurança Java (`java-home/conf/security/java.security`).

Nota:

As propriedades no arquivo `java.security` são tipicamente analisadas apenas uma vez. Se você modificou alguma propriedade neste arquivo, reinicie suas aplicações para garantir que as alterações sejam refletidas corretamente.

Por exemplo, aqui está um fragmento do arquivo `java.security` que instala o provedor SunPKCS11 com o arquivo de configuração `/opt/bar/cfg/pkcs11.cfg`.
```
    # configuration for security providers 1-12 omitted
    security.provider.13=SunPKCS11 /opt/bar/cfg/pkcs11.cfg
```

Para instalar o provedor dinamicamente, crie uma instância do provedor com o nome do arquivo de configuração apropriado e, em seguida, instale-o. Aqui está um exemplo.
```
    String configName = "/opt/bar/cfg/pkcs11.cfg";
    Provider p = Security.getProvider("SunPKCS11");
    p = p.configure(configName);
    Security.addProvider(p);
```

Nota:

Salve o objeto Provider retornado do método configure, e então adicione esse objeto, como demonstrado neste exemplo:
```
    p = p.configure(configName);
    Security.addProvider(p);
```

Não adicione o provedor do qual você chamou o método configure:
```
    p.configure(configName);
    Security.addProvider(p);
```

Se este provedor não puder ser configurado no local, um novo provedor será criado e retornado. Portanto, sempre use o provedor retornado do método configure.

Para usar mais de um slot por implementação PKCS#11, ou para usar mais de uma implementação PKCS#11, simplesmente repita a instalação para cada uma com o arquivo de configuração apropriado. Isso resultará em uma instância do provedor SunPKCS11 para cada slot de cada implementação PKCS#11.

O arquivo de configuração é um arquivo de texto que contém entradas no seguinte formato:

`attribute=value`

Os valores válidos para attribute e value são descritos na tabela desta seção:

Os dois atributos obrigatórios são `name` e `library`.

Aqui está um arquivo de configuração de exemplo:
```
    name = FooAccelerator
    library = /opt/foo/lib/libpkcs11.so
```

Comentários são indicados por linhas que começam com o símbolo `#` (hash).

Tabela 5-1 Atributos no Arquivo de Configuração do Provedor PKCS#11

Atributo | Valor | Descrição
---|---|---
`allowLegacy` | Valor booleano, padrão: `false` | Para registros de serviço criptográfico Cipher, mecanismos PKCS11 que suportam descriptografia, mas não criptografia, são considerados legados e serão desabilitados por padrão. Da mesma forma, para registros de serviço criptográfico Signature, mecanismos PKCS11 que suportam verificação, mas não assinatura, são considerados legados e serão desabilitados por padrão. Se `true`, o provedor SunPKCS11 não desabilitará mecanismos legados.
`allowSingleThreadedModules` | Valor booleano, padrão: `true` | Se `true`, permite módulos que suportam apenas acesso de thread única. Módulos de thread única não podem ser usados com segurança por múltiplos consumidores PKCS#11 no mesmo processo, por exemplo, ao usar Network Security Services (NSS) com SunPKCS11.
`attributes` | Consulte [Attributes Configuration](<#/doc/guides/security/pkcs11-reference-guide1>) | Especifica atributos PKCS#11 adicionais que devem ser definidos ao criar objetos de chave PKCS#11. Isso possibilita acomodar tokens que exigem atributos específicos.
`cipherTextStealingVariant` | Um de `CS1`, `CS2`, ou `CS3` | Especifica a variante CTS usada pela implementação PKCS#11, conforme descrito no [Addendum to NIST Special Publication 800-38A, "Recommendation for Block Cipher Modes of Operation: Three Variants of Ciphertext Stealing for CBC Mode"](<https://doi.org/10.6028/NIST.SP.800-38A-Add>). Para máxima interoperabilidade, o provedor SunPKCS11 usa a variante CS3 e lidará com a conversão de dados se `CS1` ou `CS2` for especificado. Se nenhuma variante for especificada, o mecanismo CKM_AES_CTS é desabilitado, exceto para NSS, cuja implementação é conhecida por ser CS1.
`cleaner.longInterval` | Inteiro em milissegundos, padrão `60000`. O valor deve ser maior que 1000 ms. | Especifica com que frequência, em milissegundos, a thread do limpador deve verificar referências nativas durante períodos de não-atividade, ou seja, a frequência com que a thread do limpador verifica a fila por referências nativas. Nota: A thread do limpador mudará para a frequência `cleaner.shortInterval` se referências PKCS11 nativas para limpeza forem detectadas.
`cleaner.shortInterval` | Inteiro em milissegundos, padrão: `2000`. O valor deve ser maior que 1000 ms. | Especifica com que frequência, em milissegundos, a limpeza de referências nativas deve ser realizada durante períodos de atividade, ou seja, a frequência com que a thread do limpador processa referências nativas não mais necessárias na fila para liberar memória nativa. Nota: A thread do limpador mudará para a frequência `cleaner.longInterval` após 200 tentativas falhas, ou seja, quando nenhuma referência for encontrada na fila.
`description` | Descrição desta instância do provedor | Especifica a string que o método `Provider.getInfo()` da instância do provedor retorna. Se nenhuma string for especificada, uma descrição padrão é retornada.
`destroyTokenAfterLogout` | Valor booleano, padrão: `false` | Se `true`, então quando `java.security.AuthProvider.logout()` for chamado da instância do provedor SunPKCS11, o objeto de token subjacente será destruído e os recursos serão liberados. Isso essencialmente torna a instância do provedor SunPKCS11 inutilizável após as chamadas `logout()`. Nota: Você não deve adicionar um provedor SunPKCS11 com este atributo definido como true à lista de provedores do sistema porque o objeto do provedor não é utilizável após `logout()` ser chamado.
`disabledMechanisms` | Lista de mecanismos PKCS#11 entre chaves e separados por espaço em branco para desabilitar | Especifica a lista de mecanismos PKCS#11 que esta instância do provedor deve ignorar. O provedor ignora qualquer mecanismo listado, mesmo que sejam suportados pelo token e pelo provedor SunPKCS11. Especifique as strings `SecureRandom` e `KeyStore` para desabilitar esses serviços. No máximo, você pode especificar um de `enabledMechanisms` ou `disabledMechanisms`. Se você não especificar nenhum, os mecanismos habilitados são aqueles suportados tanto pelo provedor SunPKCS11 (consulte [SunPKCS11 Provider Supported Algorithms](<#/doc/guides/security/pkcs11-reference-guide1>)) quanto pelo token PKCS#11.
`enabledMechanisms` | Lista de mecanismos PKCS#11 entre chaves e separados por espaço em branco para habilitar | Especifica a lista de mecanismos PKCS#11 que esta instância do provedor deve usar, desde que sejam suportados tanto pelo provedor SunPKCS11 quanto pelo token PKCS#11. Todos os outros mecanismos são ignorados. Cada entrada na lista é o nome de um mecanismo PKCS#11. Aqui está um exemplo que lista dois mecanismos PKCS#11.
```
    enabledMechanisms = {
      CKM_RSA_PKCS
      CKM_RSA_PKCS_KEY_PAIR_GEN
    }
```

No máximo, você pode especificar um de `enabledMechanisms` ou `disabledMechanisms`. Se você não especificar nenhum, os mecanismos habilitados são aqueles suportados tanto pelo provedor SunPKCS11 (consulte [SunPKCS11 Provider Supported Algorithms](<#/doc/guides/security/pkcs11-reference-guide1>)) quanto pelo token PKCS#11.
`explicitCancel` | Valor booleano, padrão: `true` | Se `true`, este atributo indica que você deve cancelar explicitamente as operações.
`functionList` | Nome da função C que retorna a lista de funções PKCS#11, padrão: `C_GetFunctionList` | Esta opção existe principalmente para o método `Secmod.Module.getProvider()` obsoleto.
`handleStartupErrors` | Valores possíveis: `ignoreAll`, `ignoreMissingLibrart`, ou `halt`; padrão: `halt` | Descreve como lidar com erros durante a inicialização.
`insertionCheckInterval` | Inteiro em milissegundos, padrão `2000`. O valor deve ser maior que 100 ms. | Especifica com que frequência testar a inserção de token, em milissegundos, se nenhum token estiver presente.
`keyStoreCompatibilityMode` | Valor booleano, padrão: `true` | Se `true`, este atributo indica que o P11Keystore é mais tolerante a parâmetros de entrada.
`library` | Caminho da implementação PKCS#11 | Especifica o caminho completo (incluindo extensão) da implementação PKCS#11; o formato do caminho é dependente da plataforma. Por exemplo, `/opt/foo/lib/libpkcs11.so` pode ser o caminho de uma implementação PKCS#11 no Linux, enquanto `C:\foo\mypkcs11.dll` pode ser o caminho no Windows ou `/opt/local/lib/libpkcs11.dylib` no macOS. Nota:

*   Para configurar o Mozilla Network Security Services (NSS) como a implementação PKCS#11, defina este atributo para o caminho completo da biblioteca `softokn3` do NSS.
*   Dependendo da sua plataforma, você pode ter que definir a variável de ambiente `LD_LIBRARY_PATH` (Linux), `PATH` (Windows), ou `DYLD_LIBRARY_PATH` (macOS) para incluir o diretório que a contém para permitir que o sistema operacional localize as bibliotecas dependentes.
`name` | Sufixo do nome desta instância do provedor | Especifica a string, que é concatenada com o prefixo `SunPKCS11-` para produzir o nome desta instância do provedor (ou seja, a string retornada pelo seu método `Provider.getName()`). Por exemplo, se o atributo `name` for `"FooAccelerator"`, o nome da instância do provedor será `"SunPKCS11-FooAccelerator"`.
`nssArgs` | String entre aspas | Especifica uma string de argumento de inicialização especial para o soft token NSS. Isso é usado ao usar o soft token NSS diretamente sem o modo secmod.
`nssDbMode` | Consulte [Table 5-2](<#/doc/guides/security/pkcs11-reference-guide1>) | Consulte [Table 5-2](<#/doc/guides/security/pkcs11-reference-guide1>)
`nssLibraryDirectory` | Consulte [Table 5-2](<#/doc/guides/security/pkcs11-reference-guide1>) | Consulte [Table 5-2](<#/doc/guides/security/pkcs11-reference-guide1>)
`nssModule` | Consulte [Table 5-2](<#/doc/guides/security/pkcs11-reference-guide1>) | Consulte [Table 5-2](<#/doc/guides/security/pkcs11-reference-guide1>)
`nssNetscapeDbWorkaround` | Consulte [Table 5-2](<#/doc/guides/security/pkcs11-reference-guide1>) | Consulte [Table 5-2](<#/doc/guides/security/pkcs11-reference-guide1>)
`nssOptimizeSpace` | Consulte [Table 5-2](<#/doc/guides/security/pkcs11-reference-guide1>) | Consulte [Table 5-2](<#/doc/guides/security/pkcs11-reference-guide1>)
`nssSecmodDirectory` | Consulte [Table 5-2](<#/doc/guides/security/pkcs11-reference-guide1>) | Consulte [Table 5-2](<#/doc/guides/security/pkcs11-reference-guide1>)
`nssUseSecmod` | Consulte [Table 5-2](<#/doc/guides/security/pkcs11-reference-guide1>) | Consulte [Table 5-2](<#/doc/guides/security/pkcs11-reference-guide1>)
`omitInitialize` | Valor booleano, padrão: `false` | Se `true`, omite a chamada para a função `C_Initialize()`. Use apenas se a implementação PKCS#11 tiver sido inicializada anteriormente com uma chamada `C_Initialize()`.
`showInfo` | Valor booleano, padrão: `false` | Se `true`, exibe informações do provedor durante a inicialização. As informações do provedor incluem o nome do provedor e os mecanismos PKCS#11 suportados.
`slot` | ID do Slot | Especifica o ID do slot ao qual esta instância do provedor deve ser associada. Por exemplo, você usaria `1` para o slot com o ID `1` sob PKCS#11. No máximo um de `slot` ou `slotListIndex` pode ser especificado. Se nenhum for especificado, o padrão é um `slotListIndex` de `0`.
`slotListIndex` | Índice do Slot | Especifica o índice do slot ao qual esta instância do provedor deve ser associada. É o índice na lista de todos os slots retornados pela função PKCS#11 `C_GetSlotList`. Por exemplo, `0` indica o primeiro slot na lista. No máximo um de `slot` ou `slotListIndex` pode ser especificado. Se nenhum for especificado, o padrão é um `slotListIndex` de `0`.
`useEcX963Encoding` | Valor booleano, padrão: `false` | Indica que a codificação X9.63 para pontos EC é usada (`true`) ou que a codificação é encapsulada em um ASN.1 OctetString (`false`).

Configuração de Atributos

A opção `attributes` permite especificar atributos PKCS#11 adicionais que devem ser definidos ao criar objetos de chave PKCS#11. Por padrão, o provedor SunPKCS11 especifica apenas atributos PKCS#11 obrigatórios ao criar objetos. Por exemplo, para chaves públicas RSA, ele especifica o tipo e algoritmo da chave (CKA_CLASS e CKA_KEY_TYPE) e os valores da chave para chaves públicas RSA (CKA_MODULUS e CKA_PUBLIC_EXPONENT). A biblioteca PKCS#11 que você está usando atribuirá valores padrão específicos da implementação aos outros atributos de uma chave pública RSA, por exemplo, que a chave pode ser usada para criptografar e verificar mensagens (CKA_ENCRYPT e CKA_VERIFY = true).

A opção `attributes` pode ser usada se você não gostar dos valores padrão que sua implementação PKCS#11 atribui ou se sua implementação PKCS#11 não suporta padrões e exige que um valor seja especificado explicitamente. Observe que especificar atributos que sua implementação PKCS#11 não suporta ou que são inválidos para o tipo de chave em questão pode fazer com que a operação falhe em tempo de execução.

A opção pode ser especificada zero ou mais vezes. As opções são processadas na ordem especificada no arquivo de configuração. A opção `attributes` tem o formato:
```
    attributes(operation, keytype, keyalgorithm) = {
      name1 = value1
      [...]
    }
```

Os valores válidos para `operation` são:

*   `generate`, para chaves geradas via KeyPairGenerator ou KeyGenerator
*   `import`, para chaves criadas via KeyFactory ou SecretKeyFactory. Isso também se aplica a chaves de software Java automaticamente convertidas em objetos de chave PKCS#11 quando são passadas para o método de inicialização de uma operação criptográfica, por exemplo `Signature.initSign()`.
*   `*`, para chaves criadas usando uma operação de geração ou criação.

Os valores válidos para `keytype` são `CKO_PUBLIC_KEY`, `CKO_PRIVATE_KEY` e `CKO_SECRET_KEY`, para chaves públicas, privadas e secretas, respectivamente, e `*` para corresponder a qualquer tipo de chave.

Os valores válidos para `keyalgorithm` são uma das constantes `CKK_xxx` da especificação PKCS#11, ou `*` para corresponder a chaves de qualquer algoritmo. Consulte [SunPKCS11 Provider Supported Algorithms](<#/doc/guides/security/pkcs11-reference-guide1>).

Os nomes e valores dos atributos são especificados como uma lista de um ou mais pares nome-valor. `name` deve ser uma constante `CKA_xxx` da especificação PKCS#11, por exemplo `CKA_SENSITIVE`. `value` pode ser um dos seguintes:

*   Um valor booleano, `true` ou `false`
*   Um inteiro, em formato decimal (padrão) ou em formato hexadecimal se começar com `0x`.
*   `null`, indicando que este atributo não deve ser especificado ao criar objetos.

Se a opção `attributes` for especificada várias vezes, as entradas são processadas na ordem especificada com os atributos agregados e atributos posteriores substituindo os anteriores. Por exemplo, considere o seguinte trecho do arquivo de configuração:
```
    attributes(*,CKO_PRIVATE_KEY,*) = {
      CKA_SIGN = true
    }
    
    attributes(*,CKO_PRIVATE_KEY,CKK_DH) = {
      CKA_SIGN = null
    }
    
    attributes(*,CKO_PRIVATE_KEY,CKK_RSA) = {
      CKA_DECRYPT = true
    }
```

A primeira entrada diz para especificar `CKA_SIGN = true` para todas as chaves privadas. A segunda opção substitui isso por `null` para chaves privadas Diffie-Hellman, então o atributo `CKA_SIGN` não será especificado para elas. Finalmente, a terceira opção diz para também especificar `CKA_DECRYPT = true` para chaves privadas RSA. Isso significa que as chaves privadas RSA terão `CKA_SIGN = true` e `CKA_DECRYPT = true` definidos.

Existe também uma forma especial da opção `attributes`. Você pode escrever `attributes = compatibility` no arquivo de configuração. Isso é um atalho para um conjunto completo de declarações de atributos. Elas são projetadas para fornecer máxima compatibilidade com aplicações Java existentes, que podem esperar, por exemplo, que todos os componentes da chave sejam acessíveis e que as chaves secretas sejam utilizáveis tanto para criptografia quanto para descriptografia. A linha de atributos `compatibility` pode ser usada em conjunto com outras linhas `attributes`, caso em que as mesmas regras de agregação e substituição se aplicam conforme descrito anteriormente.

### Acessando Network Security Services (NSS)

[Network Security Services (NSS)](<https://developer.mozilla.org/en-US/docs/Mozilla/Projects/NSS>) é um conjunto de bibliotecas de segurança de código aberto cujas APIs criptográficas são baseadas em PKCS#11, mas inclui recursos especiais que estão fora do padrão PKCS#11. O provedor SunPKCS11 inclui código para interagir com esses recursos específicos do NSS, incluindo várias diretivas de configuração específicas do NSS.

Para melhores resultados, recomendamos que você use a versão mais recente do NSS disponível. Deve ser pelo menos a versão 3.12.

O provedor SunPKCS11 usa código específico do NSS quando qualquer uma das diretivas de configuração `nss` descritas na [Table 5-2](<#/doc/guides/security/pkcs11-reference-guide1>) são usadas. Nesse caso, os comandos de configuração regulares `library`, `slot` e `slotListIndex` não podem ser usados.

Tabela 5-2 Atributos e Valores NSS

Atributo | Valor | Descrição
---|---|---
`nssDbMode` | Um de `readWrite`, `readOnly`, e `noDb`, padrão: `readWrite` | Esta diretiva determina como o banco de dados NSS é acessado. No modo de leitura-escrita, o acesso total é possível, mas apenas um processo por vez deve estar acessando os bancos de dados. O modo somente leitura não permite modificações nos arquivos. O modo `noDb` permite que o NSS seja usado sem arquivos de banco de dados puramente como um provedor criptográfico. Não é possível criar chaves persistentes usando o PKCS11 KeyStore.
`nssLibraryDirectory` | Diretório contendo as bibliotecas NSS e Netscape Portable Runtime (NSPR) (que inclui `libnss3.so`) | Este é o caminho completo do diretório contendo as bibliotecas NSS e NSPR. Ele deve ser especificado, a menos que o NSS já tenha sido carregado e inicializado por outro componente em execução no mesmo processo que a JVM Java. Se este valor for definido, então `nssUseSecmod` é definido como `true`. Nota: Dependendo da sua plataforma, você pode ter que definir a variável de ambiente `LD_LIBRARY_PATH` (Linux), `PATH` (Windows), ou `DYLD_LIBRARY_PATH` (macOS) para incluir este diretório para permitir que o sistema operacional localize as bibliotecas dependentes.
`nssModule` | Um de `keystore`, `crypto`, `fips`, e `trustanchors` | O NSS disponibiliza sua funcionalidade usando várias bibliotecas e slots diferentes. Esta diretiva determina qual desses módulos é acessado por esta instância do SunPKCS11. O módulo `crypto` é o padrão no modo `noDb`. Ele suporta operações criptográficas sem login, mas sem chaves persistentes. O módulo `fips` é o padrão se o `secmod.db` do NSS tiver sido configurado para o modo compatível com FIPS-140. Neste modo, o NSS restringe os algoritmos disponíveis e os atributos PKCS#11 com os quais as chaves podem ser criadas. O módulo `keystore` é o padrão em outras configurações. Ele suporta chaves persistentes usando o PKCS11 KeyStore, que são armazenadas nos arquivos DB do NSS. Este módulo requer login. O módulo `trustanchors` permite o acesso a certificados de âncora de confiança do NSS via PKCS11 KeyStore, se o `secmod.db` tiver sido configurado para incluir a biblioteca de âncora de confiança. Se este valor for definido, então `nssUseSecmod` é definido como `true`.
`nssNetscapeDbWorkaround` | Valor booleano, padrão: `true` | Se `true`, o P11KeyStore especifica o atributo `CKA_NETSCAPE_DB` ao criar chaves privadas. Esta configuração é válida apenas se `nssUseSecmod` for `true`.
`nssOptimizeSpace` | Valor booleano, padrão: `false` | Indica que o NSS favorece o desempenho (se `false`) ou o uso de memória (se `true`).
`nssSecmodDirectory` | O caminho completo do diretório contendo a configuração do NSS e as informações da chave (`secmod.db`, `key3.db`, e `cert8.db`) | Esta diretiva deve ser especificada, a menos que o NSS já tenha sido inicializado por outro componente (consulte `nssLibraryDirectory`) ou o NSS seja usado sem arquivos de banco de dados (consulte `nssDbMode`, modo `noDb`). Se este valor for definido, então `nssUseSecmod` é definido como `true`.
`nssUseSecmod` | Valor booleano | Se `true`, o modo secmod do NSS é usado. Ele é implicitamente definido como `true` se `nssLibraryDirectory`, `nssSecmodDirectory`, ou `nssModule` for especificado.

Exemplo 5-1 Arquivos de Configuração SunPKCS11 para NSS

NSS como um provedor de criptografia puro
```
    name = NSScrypto
    nssLibraryDirectory = /opt/tests/nss/lib
    nssDbMode = noDb
    attributes = compatibility                
```

NSS como um token criptográfico compatível com FIPS 140
```
    name = NSSfips
    nssLibraryDirectory = /opt/tests/nss/lib
    nssSecmodDirectory = /opt/tests/nss/fipsdb
    nssModule = fips                    
```

### Solução de Problemas PKCS#11

Pode haver problemas com PKCS#11 que exigem depuração. Para exibir informações de depuração sobre Biblioteca, Slots, Token e Mecanismo, adicione `showInfo=true` no arquivo de configuração do provedor SunPKCS11, que você especificou estaticamente ou dinamicamente conforme descrito em [SunPKCS11 Configuration](<#/doc/guides/security/pkcs11-reference-guide1>).

Para informações de depuração adicionais, os usuários podem iniciar ou reiniciar os processos Java com uma das seguintes opções:

*   Para informações gerais de depuração do provedor SunPKCS11:

`-Djava.security.debug=sunpkcs11`

*   Para informações de depuração específicas do keystore PKCS#11:

`-Djava.security.debug=pkcs11keystore`

### Desabilitando Provedores PKCS#11 e/ou Mecanismos PKCS#11 Individuais

Como parte do processo de solução de problemas, pode ser útil desabilitar temporariamente um provedor PKCS#11 ou o mecanismo específico de um determinado provedor.

Observe que desabilitar um provedor PKCS#11 é apenas uma medida temporária. Ao desabilitar o provedor PKCS#11, o provedor não estará mais disponível, o que pode fazer com que as aplicações quebrem ou tenham um impacto no desempenho. Uma vez identificado o problema, apenas esse mecanismo específico deve permanecer desabilitado.

Desabilitando Provedores PKCS#11

Siga estas etapas para desabilitar um provedor PKCS#11 para todos os processos Java executados com uma instalação Java específica:

1.  Certifique-se de ter instalado o provedor PKCS#11 conforme descrito em [SunPKCS11 Configuration](<#/doc/guides/security/pkcs11-reference-guide1>). Estas etapas assumem o seguinte:

    *   O nome do seu provedor PKCS#11 é `MyOwn`.

    *   O nome do seu arquivo de configuração é `java-home/conf/security/myown.cfg` e contém o seguinte:
```
 name = MyOwn
           description = A PKCS11 provider accessing a specific PKCS11 binary implementation
           library = Pathname of MyOwn PKCS11 implementation
```

    *   Você modificou o arquivo de propriedades de segurança Java (`java-home/conf/security/java.security`) da seguinte forma:
```
 #
           # List of providers and their preference orders:
           #
           security.provider.1=SUN
           security.provider.2=SunRsaSign
           security.provider.3=SunPKCS11 myOwn.cfg
           security.provider.4=SunEC
           security.provider.5=SunJSSE
           ...
```

2.  Para desabilitar o provedor PKCS#11 `MyOwn` estaticamente para esta instalação Java, edite o arquivo de propriedades de segurança Java e comente a linha que registra seu provedor, então renumerar a ordem de preferência dos provedores que o seguem:
```
 #
         # List of providers and their preference orders:
         #
         security.provider.1=SUN
         security.provider.2=SunRsaSign
         #security.provider.3=SunPKCS11 myOwn.cfg
         security.provider.3=SunEC
         security.provider.4=SunJSSE
         ...
```

3.  Para desabilitar o provedor PKCS#11 `MyOwn` dinamicamente para esta instalação Java, chame o seguinte em sua aplicação:
```
 Security.removeProvider("SunPKCS11-MyOwn");
```

Desabilitando Mecanismos Específicos

Quando ocorre um problema em um dos mecanismos do PKCS#11, ele pode ser resolvido desabilitando apenas esse mecanismo específico, em vez de todo o provedor PKCS#11 (não se esqueça de reabilitar o provedor PKCS#11 se ele foi desabilitado anteriormente).

Nota:

Para desabilitar apenas a implementação PKCS#11 SecureRandom, adicione SecureRandom à lista de mecanismos desabilitados no arquivo de configuração do provedor SunPKCS11, que você especificou estaticamente ou dinamicamente conforme descrito em [SunPKCS11 Configuration](<#/doc/guides/security/pkcs11-reference-guide1>):
```
    disabledMechanisms = {
        SecureRandom
    }
```

### Desenvolvedores de Aplicações

Aplicações Java podem usar as APIs JCA e JCE existentes para acessar tokens PKCS#11 através do provedor SunPKCS11.

#### Login de Token

Você pode fazer login no keystore usando um Número de Identificação Pessoal e realizar operações PKCS#11.

Certas operações PKCS#11, como acessar chaves privadas, exigem um login usando um Número de Identificação Pessoal, ou PIN, antes que as operações possam prosseguir. Os tipos mais comuns de operações que exigem login são aquelas que lidam com chaves no token. Em uma aplicação Java, tais operações frequentemente envolvem primeiro o carregamento do keystore. Ao acessar o token PKCS#11 como um keystore via a classe `java.security.KeyStore`, você pode fornecer o PIN no parâmetro de entrada de senha para o método [`load`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/KeyStore.html#load\(java.io.InputStream,char%5B%5D\)>). O PIN será então usado pelo provedor SunPKCS11 para fazer login no token. Aqui está um exemplo.
```
        char[] pin = ...; 
        KeyStore ks = KeyStore.getInstance("PKCS11");
        ks.load(null, pin); 
    
```

Isso é adequado para uma aplicação que trata tokens PKCS#11 como keystores estáticos. Para uma aplicação que deseja acomodar tokens PKCS#11 de forma mais dinâmica, como smartcards sendo inseridos e removidos, você pode usar a nova classe `KeyStore.Builder`. Aqui está um exemplo de como inicializar o builder para um keystore PKCS#11 com um manipulador de callback.
```
        KeyStore.CallbackHandlerProtection chp =
            new KeyStore.CallbackHandlerProtection(new MyGuiCallbackHandler());
        KeyStore.Builder builder =
            KeyStore.Builder.newInstance("PKCS11", null, chp);
    
```

Para o provedor SunPKCS11, o manipulador de callback deve ser capaz de satisfazer um `PasswordCallback`, que é usado para solicitar o PIN ao usuário. Sempre que a aplicação precisar de acesso ao keystore, ela usa o builder da seguinte forma.
```
        KeyStore ks = builder.getKeyStore();
        Key key = ks.getKey(alias, null);
    
```

O builder solicitará uma senha conforme necessário usando o manipulador de callback configurado anteriormente. O builder solicitará uma senha apenas para o acesso inicial. Se o usuário da aplicação continuar usando o mesmo Smartcard, o usuário não será solicitado novamente. Se o usuário remover e inserir um smartcard diferente, o builder solicitará uma senha para o novo cartão.
Dependendo do token PKCS#11, pode haver operações não relacionadas a chaves que também exigem o login no token. Aplicações que usam tais operações podem usar a classe [java.security.AuthProvider](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/AuthProvider.html>). A classe `AuthProvider` estende `java.security.Provider` e define métodos para realizar operações de login e logout em um provedor, bem como para definir um callback handler para o provedor usar.

Para o provedor SunPKCS11, o callback handler deve ser capaz de satisfazer um `PasswordCallback`, que é usado para solicitar o PIN ao usuário.

Aqui está um exemplo de como uma aplicação pode usar um `AuthProvider` para fazer login no token. (Observe que você deve configurar o provedor SunPKCS11 antes de usá-lo.)
```java
        Provider p = Security.getProvider("SunPKCS11");
        AuthProvider aprov = (AuthProvider)p.configure(<provider configuration file>);
        aprov.login(subject, new MyGuiCallbackHandler());
```

#### Chaves do Token

Objetos `Key` Java podem ou não conter material de chave real.

  * Um objeto Key de software contém o material de chave real e permite o acesso a esse material.
  * Uma chave não extraível em um token seguro (como um smartcard) é representada por um objeto Key Java que não contém o material de chave real. O objeto Key contém apenas uma referência à chave real.

Aplicações e provedores devem usar as interfaces corretas para representar esses diferentes tipos de objetos Key. Objetos Key de software (ou qualquer objeto Key que tenha acesso ao material de chave real) devem implementar as interfaces nos pacotes [java.security.interfaces](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/interfaces/package-summary.html>) e [javax.crypto.interfaces](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/crypto/interfaces/package-summary.html>) (como `DSAPrivateKey`). Objetos Key que representam chaves de token não extraíveis devem implementar apenas as interfaces genéricas relevantes nos pacotes [java.security](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/package-summary.html>) e [javax.crypto](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/crypto/package-summary.html>) (`PrivateKey`, `PublicKey` ou `SecretKey`). A identificação do algoritmo de uma chave deve ser realizada usando o método `Key.getAlgorithm()`.

Observe que um objeto Key para uma chave de token não extraível só pode ser usado pelo provedor associado a esse token.

#### Seleção Atrasada do Provedor

Métodos `getInstance()` de criptografia Java, como `Cipher.getInstance("AES")`, retornam a implementação do primeiro provedor que implementou o algoritmo solicitado. No entanto, o JDK atrasa a seleção do provedor até que o método de inicialização relevante seja chamado. O método de inicialização aceita um objeto `Key` e pode determinar, nesse ponto, qual provedor pode aceitar o objeto `Key` especificado. Isso garante que o provedor selecionado possa usar o objeto `Key` especificado. (Se uma aplicação tentar usar um objeto `Key` para uma chave de token não extraível com um provedor que aceita apenas objetos Key de software, então o provedor lança uma `InvalidKeyException`. Este é um problema para as classes `Cipher`, `KeyAgreement`, `Mac` e `Signature`.) O seguinte representa os métodos de inicialização afetados.

  * `[`Cipher`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/crypto/Cipher.html>).init(..., Key key, ...)`
  * `[`KeyAgreement`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/crypto/KeyAgreement.html>).init(Key key, ...)`
  * `[`Mac`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/crypto/Mac.html>).init(Key key, ...)`
  * `[`Signature`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/Signature.html>).initSign(PrivateKey privateKey)`

Note:

Uma vez que o provedor é selecionado, por exemplo, após a primeira chamada de inicialização, o JDK não mudará para um provedor diferente para chamadas de inicialização subsequentes. Para selecionar novamente um provedor com base em um objeto `Key` específico, chame getInstance() para obter uma nova instância e, em seguida, chame o método de inicialização desta instância com o objeto `Key` em vez de reutilizar a instância mais antiga e já inicializada.

Embora esta seleção atrasada do provedor esteja oculta da aplicação, ela afeta o comportamento do método `getProvider()` para `Cipher`, `KeyAgreement`, `Mac` e `Signature`. Se `getProvider()` for chamado antes que a operação de inicialização tenha ocorrido (e, portanto, antes que a seleção do provedor tenha ocorrido), então o primeiro provedor que suporta o algoritmo solicitado é retornado. Este pode não ser o mesmo provedor que o selecionado após a chamada do método de inicialização. Se `getProvider()` for chamado após a operação de inicialização ter ocorrido, então o provedor selecionado real é retornado. Recomenda-se que as aplicações chamem `getProvider()` somente depois de terem chamado o método de inicialização relevante.

Além de `getProvider()`, os seguintes métodos adicionais são afetados de forma semelhante.

  * `Cipher.getBlockSize`
  * `Cipher.getExemptionMechanism`
  * `Cipher.getIV`
  * `Cipher.getOutputSize`
  * `Cipher.getParameters`
  * `Mac.getMacLength`
  * `Signature.getParameters`
  * `Signature.setParameter`

#### JAAS KeyStoreLoginModule

O JDK vem com um módulo de login de keystore JAAS, [KeyStoreLoginModule](<https://docs.oracle.com/en/java/javase/25/docs/api/jdk.security.auth/com/sun/security/auth/module/KeyStoreLoginModule.html>), que permite que uma aplicação se autentique usando sua identidade em um keystore especificado. Após a autenticação, a aplicação adquiriria suas informações de principal e credenciais (certificado e chave privada) do keystore. Ao usar este módulo de login e configurá-lo para usar um token PKCS#11 como um keystore, a aplicação pode adquirir essas informações de um token PKCS#11.

Use as seguintes opções para configurar o `KeyStoreLoginModule` para usar um token PKCS#11 como o keystore.

  * `keyStoreURL="NONE"`
  * `keyStoreType="PKCS11"`
  * `keyStorePasswordURL=some_pin_url`

onde

some_pin_url
    O local do PIN. Se a opção `keyStorePasswordURL` for omitida, o módulo de login obterá o PIN através do callback handler da aplicação, fornecendo-lhe um `PasswordCallback`. Aqui está um exemplo de um arquivo de configuração que usa um token PKCS#11 como um keystore.
```
    other {
        com.sun.security.auth.module.KeyStoreLoginModule required
            keyStoreURL="NONE"
      keyStoreType="PKCS11"
      keyStorePasswordURL="file:/home/joe/scpin";
    };
    
```

Se mais de um provedor SunPKCS11 tiver sido configurado dinamicamente ou no arquivo de propriedades de segurança `java.security`, você pode usar a opção `keyStoreProvider` para direcionar uma instância de provedor específica. O argumento para esta opção é o nome do provedor. Para o provedor SunPKCS11, o nome do provedor tem a forma `SunPKCS11-TokenName`, onde `TokenName` é o sufixo do nome com o qual a instância do provedor foi configurada, conforme detalhado na [Tabela 5-1](<#/doc/guides/security/pkcs11-reference-guide1>). Por exemplo, o seguinte arquivo de configuração nomeia a instância do provedor PKCS#11 com o sufixo de nome `SmartCard`.
```
    other {
        com.sun.security.auth.module.KeyStoreLoginModule required
            keyStoreURL="NONE"
      keyStoreType="PKCS11"
      keyStorePasswordURL="file:/home/joe/scpin"
      keyStoreProvider="SunPKCS11-SmartCard";
    };
    
```

Alguns tokens PKCS#11 suportam login via um caminho de autenticação protegido. Por exemplo, um smartcard pode ter um PIN-pad dedicado para inserir o PIN. Dispositivos biométricos também terão seus próprios meios para obter informações de autenticação. Se o token PKCS#11 tiver um caminho de autenticação protegido, use a opção `protected=true` e omita a opção `keyStorePasswordURL`. Aqui está um exemplo de um arquivo de configuração para tal token.
```
    other {
        com.sun.security.auth.module.KeyStoreLoginModule required
            keyStoreURL="NONE"
      keyStoreType="PKCS11"
      protected=true;
    };
    
```

#### Tokens como Keystore e Trust Store JSSE

Para usar tokens PKCS#11 como keystores ou trust stores JSSE, a aplicação JSSE pode usar as APIs descritas em [Login do Token](<#/doc/guides/security/pkcs11-reference-guide1>) para instanciar um KeyStore que é suportado por um token PKCS#11 e passá-lo para seu gerenciador de chaves e gerenciador de confiança. A aplicação JSSE terá então acesso às chaves no token.

O JSSE também suporta a configuração do uso de keystores e trust stores via propriedades de sistema, conforme descrito no [Guia de Referência do Java Secure Socket Extension (JSSE)](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>). Para usar um token PKCS#11 como um keystore ou trust store, defina as propriedades de sistema `javax.net.ssl.keyStoreType` e `javax.net.ssl.trustStoreType`, respectivamente, como "PKCS11", e defina as propriedades de sistema `javax.net.ssl.keyStore` e `javax.net.ssl.trustStore`, respectivamente, como `NONE`. Para especificar o uso de uma instância de provedor específica, use as propriedades de sistema `javax.net.ssl.keyStoreProvider` e `javax.net.ssl.trustStoreProvider` (por exemplo, "SunPKCS11-SmartCard").

### Usando keytool e jarsigner com Tokens PKCS#11

Se o provedor SunPKCS11 tiver sido configurado no arquivo de propriedades de segurança `java.security` (localizado no diretório `$JAVA_HOME/conf/security` do runtime Java), então keytool e jarsigner podem ser usados para operar no token PKCS#11 especificando as seguintes opções.

  * `-keystore NONE`
  * `-storetype PKCS11`

Aqui um exemplo de um comando para listar o conteúdo do token PKCS#11 configurado.
```
    keytool -keystore NONE -storetype PKCS11 -list
```

O PIN pode ser especificado usando a opção `-storepass`. Se nenhum tiver sido especificado, então `keytool` e `jarsigner` solicitarão o PIN do token. Se o token tiver um caminho de autenticação protegido (como um PIN-pad dedicado ou um leitor biométrico), então a opção `-protected` deve ser especificada, e nenhuma opção de senha pode ser especificada.

Se mais de um provedor SunPKCS11 tiver sido configurado no arquivo de propriedades de segurança `java.security`, você pode usar a opção `-providerName` para direcionar uma instância de provedor específica. O argumento para esta opção é o nome do provedor.

  * `-providerName providerName`

Para o provedor SunPKCS11, `providerName` tem a forma `SunPKCS11-TokenName` onde:

TokenName
    O sufixo do nome com o qual a instância do provedor foi configurada, conforme detalhado na [Tabela 5-1](<#/doc/guides/security/pkcs11-reference-guide1>). Por exemplo, o seguinte comando lista o conteúdo da instância do provedor de keystore PKCS#11 com o sufixo de nome `SmartCard`.
```
    keytool -keystore NONE -storetype PKCS11 \
        -providerName SunPKCS11-SmartCard \
        -list                        
```

Se o provedor SunPKCS11 não tiver sido configurado no arquivo de propriedades de segurança `java.security`, você pode usar as seguintes opções para instruir `keytool` e `jarsigner` a instalar o provedor dinamicamente.

  * `-providerClass sun.security.pkcs11.SunPKCS11`
  * `-providerArg ConfigFilePath`

ConfigFilePath
    O caminho para o arquivo de configuração do token. Aqui está um exemplo de um comando para listar um keystore PKCS#11 quando o provedor SunPKCS11 não foi configurado no arquivo `java.security`.
```
    keytool -keystore NONE -storetype PKCS11 \
         -providerClass sun.security.pkcs11.SunPKCS11 \
         -providerArg /foo/bar/token.config \
         -list                        
```

Note:

Às vezes, o token de hardware é muito pequeno para armazenar os certificados. Você pode usar a opção `-certchain` da ferramenta `jarsigner` para carregá-los de um arquivo externo.

Assinando Arquivo JAR com a API jdk.security.jarsigner e Token PKCS#11

Para assinar um arquivo JAR com a API [jdk.security.jarsigner](<https://docs.oracle.com/en/java/javase/25/docs/api/jdk.jartool/jdk/security/jarsigner/package-summary.html>) e um token PKCS#11 como um keystore, siga estes passos:

  1. Acesse o keystore do token PKCS#11 conforme descrito em [Login do Token](<#/doc/guides/security/pkcs11-reference-guide1>):
```java
 char[] pin = ...; 
             KeyStore ks = KeyStore.getInstance("PKCS11");
             ks.load(null, pin); 
             KeyStore ks = builder.getKeyStore();
             Key key = ks.getKey(alias, null);
```

  2. Crie um objeto JarSigner com o construtor JarSigner.Builder(Keystore.PrivateKeyEntry):
```java
 JarSigner mySigner = JarSigner.Builder(key).build();
```

  3. Assine o arquivo JAR:
```java
 try (ZipFile in = new ZipFile(inputFile);
             FileOutputStream out = new FileOutputStream(outputFile)) {
                 mySigner.sign(in, out);
             }
```

### Desenvolvedores de Provedores

A classe `java.security.Provider` permite que desenvolvedores de provedores suportem mais facilmente tokens PKCS#11 e serviços criptográficos através de serviços de provedor e suporte a parâmetros.

Veja [Exemplo de Provedor](<#/doc/guides/security/pkcs11-reference-guide1>) para um exemplo de um provedor simples projetado para demonstrar serviços de provedor e suporte a parâmetros.

#### Serviços do Provedor

Para cada serviço implementado pelo provedor, deve haver uma propriedade cujo nome é o tipo de serviço (`Cipher`, `Signature`, etc), seguido por um ponto e o nome do algoritmo ao qual o serviço se aplica. O valor da propriedade deve especificar o nome totalmente qualificado da classe que implementa o serviço. Aqui está um exemplo de um provedor definindo a propriedade `KeyAgreement.DiffieHellman` para ter o valor `com.sun.crypto.provider.DHKeyAgreement`.
```
    put("KeyAgreement.DiffieHellman", "com.sun.crypto.provider.DHKeyAgreement")
    
```

A classe aninhada estática pública [Provider.Service](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/Provider.Service.html>) encapsula as propriedades de um serviço de provedor (incluindo seu tipo, atributos, nome do algoritmo e aliases do algoritmo). Provedores podem instanciar objetos `Provider.Service` e registrá-los chamando o método `Provider.putService()`. Isso é equivalente a criar uma entrada `Property` e chamar o método `Provider.put()`. Observe que as entradas `Property` legadas registradas via `Provider.put` ainda são suportadas.

Aqui está um exemplo de um provedor criando um objeto `Service` com o tipo `KeyAgreement`, para o algoritmo `DiffieHellman`, implementado pela classe `com.sun.crypto.provider.DHKeyAgreement`.
```
    Service s = new Service(this, "KeyAgreement", "DiffieHellman",
        "com.sun.crypto.provider.DHKeyAgreement", null, null);
    putService(s);
    
```

Usar objetos `Provider.Service` em vez de entradas `Property` legadas tem alguns benefícios importantes. Um benefício é que permite ao provedor ter maior flexibilidade ao [Instanciar Classes de Engine](<#/doc/guides/security/pkcs11-reference-guide1>). Outro benefício é que permite ao provedor testar o [Suporte a Parâmetros](<#/doc/guides/security/pkcs11-reference-guide1>). Esses recursos são discutidos em detalhes a seguir.

Instanciando Classes de Engine

Por padrão, o framework de Criptografia Java procura a propriedade do provedor para um serviço específico e instancia diretamente a classe de engine registrada para essa propriedade. Um provedor pode sobrescrever esse comportamento e instanciar a classe de engine para o serviço solicitado por si mesmo.

Para sobrescrever o comportamento padrão, o provedor sobrescreve o método `Provider.Service.newInstance()` para adicionar seu comportamento personalizado. Por exemplo, o provedor pode chamar um construtor personalizado, ou pode realizar a inicialização usando informações não acessíveis fora do provedor (ou que são conhecidas apenas pelo provedor).

Suporte a Parâmetros

O framework de Criptografia Java pode tentar uma verificação rápida para determinar se a implementação do serviço de um provedor pode usar um parâmetro especificado pela aplicação. Para realizar esta verificação rápida, o framework chama `Provider.Service.supportsParameter()`.

O framework se baseia neste teste rápido durante a seleção atrasada do provedor (veja [Seleção Atrasada do Provedor](<#/doc/guides/security/pkcs11-reference-guide1>)). Quando uma aplicação invoca um método de inicialização e passa a ele um objeto `Key`, o framework pergunta a um provedor subjacente se ele suporta o objeto chamando seu método `Service.supportsParameter()`. Se `supportsParameter()` retornar `false`, o framework pode remover imediatamente esse provedor da consideração. Se `supportsParameter()` retornar `true`, o framework passa o objeto `Key` para a implementação da classe de engine de inicialização desse provedor. Um provedor que requer objetos `Key` de software deve sobrescrever este método para retornar `false` quando lhe são passadas chaves não-software. Da mesma forma, um provedor para um token PKCS#11 que contém chaves não extraíveis deve retornar `true` apenas para objetos `Key` que ele criou e que, portanto, correspondem às chaves em seu respectivo token.

Note:

A implementação padrão de `supportsParameter()` retorna `true`. Isso permite que provedores existentes funcionem sem modificação. No entanto, devido a esta implementação padrão complacente, o framework deve estar preparado para capturar exceções lançadas por provedores que rejeitam o objeto `Key` dentro de suas implementações de classe de engine de inicialização. O framework trata esses casos da mesma forma que quando `supportsParameter()` retorna `false`.

#### Suporte a Parâmetros

O framework de Criptografia Java pode tentar uma verificação rápida para determinar se a implementação do serviço de um provedor pode usar um parâmetro especificado pela aplicação. Para realizar esta verificação rápida, o framework chama `Provider.Service.supportsParameter()`.

O framework se baseia neste teste rápido durante a seleção atrasada do provedor (veja [Seleção Atrasada do Provedor](<#/doc/guides/security/pkcs11-reference-guide1>)). Quando uma aplicação invoca um método de inicialização e passa a ele um objeto `Key`, o framework pergunta a um provedor subjacente se ele suporta o objeto chamando seu método `Service.supportsParameter()`. Se `supportsParameter()` retornar `false`, o framework pode remover imediatamente esse provedor da consideração. Se `supportsParameter()` retornar `true`, o framework passa o objeto `Key` para a implementação da classe de engine de inicialização desse provedor. Um provedor que requer objetos `Key` de software deve sobrescrever este método para retornar `false` quando lhe são passadas chaves não-software. Da mesma forma, um provedor para um token PKCS#11 que contém chaves não extraíveis deve retornar `true` apenas para objetos `Key` que ele criou e que, portanto, correspondem às chaves em seu respectivo token.

Note:

A implementação padrão de `supportsParameter()` retorna `true`. Isso permite que provedores existentes funcionem sem modificação. No entanto, devido a esta implementação padrão complacente, o framework deve estar preparado para capturar exceções lançadas por provedores que rejeitam o objeto `Key` dentro de suas implementações de classe de engine de inicialização. O framework trata esses casos da mesma forma que quando `supportsParameter()` retorna `false`.

### Algoritmos Suportados pelo Provedor SunPKCS11

A [Tabela 5-3](<#/doc/guides/security/pkcs11-reference-guide1>) lista os algoritmos Java suportados pelo provedor SunPKCS11 e os mecanismos PKCS#11 correspondentes necessários para suportá-los. Quando múltiplos mecanismos são listados, eles são dados na ordem de preferência e qualquer um deles é suficiente.

Note:

O SunPKCS11 pode ser instruído a ignorar mecanismos usando as diretivas de configuração `disabledMechanisms` e `enabledMechanisms` (veja [Configuração do SunPKCS11](<#/doc/guides/security/pkcs11-reference-guide1>)).

Para mecanismos de Curva Elíptica, o provedor SunPKCS11 usará apenas chaves que utilizam a escolha `namedCurve` como codificação para os parâmetros e permitirá apenas o formato de ponto não comprimido. O provedor SunPKCS11 assume que um token suporta todos os parâmetros de domínio nomeados padrão.

Note:

Para nomes de Curva Elíptica (EC), o provedor SunPKCS11 suporta qualquer nome EC que o provedor SunEC suporte, desde que o token o suporte; veja [Nomes de Curva Elíptica Suportados](<#/doc/guides/security/oracle-providers>) em [O Provedor SunEC](<#/doc/guides/security/oracle-providers>).

Algoritmos HKDF no SunPKCS11 dependem dos mecanismos nativos CKM_HKDF_DATA e CKM_HKDF_DERIVE, além dos mecanismos necessários da biblioteca PKCS#11. Se apenas um desses dois mecanismos nativos for suportado, ocorrerá uma falha em tempo de execução ao invocar o método correspondente: [KDF.deriveData(AlgorithmParameterSpec)](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/crypto/KDF.html#deriveData\(java.security.spec.AlgorithmParameterSpec\)>) para CKM_HKDF_DATA e [KDF.deriveKey(String, AlgorithmParameterSpec)](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/crypto/KDF.html#deriveKey\(java.lang.String,java.security.spec.AlgorithmParameterSpec\)>) para CKM_HKDF_DERIVE.

Note:

Se a biblioteca PKCS#11 não suportar os mecanismos nativos CKM_CONCATENATE_BASE_AND_DATA, CKM_CONCATENATE_BASE_AND_KEY e CKM_CONCATENATE_DATA_AND_BASE, ocorrerá um erro em tempo de execução quando a concatenação das formas key-data, key-key ou data-key for tentada. Veja os métodos HKDFParameterSpec.Builder.addIKM e HKDFParameterSpec.Builder.addSalt na classe [HKDFParameterSpec.Builder](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/crypto/spec/HKDFParameterSpec.Builder.html>) e na interface [HKDFParameterSpec](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/crypto/spec/HKDFParameterSpec.html>) na documentação da API JavaDoc para mais informações sobre concatenação de chaves.

Veja [PKCS #11 Cryptographic Token Interface Current Mechanisms Specification Version 3.0](<https://docs.oasis-open.org/pkcs11/pkcs11-curr/v3.0/pkcs11-curr-v3.0.html>) para mais detalhes sobre os mecanismos PKCS#11 na tabela a seguir.

Tabela 5-3 Algoritmos Java Suportados pelo Provedor SunPKCS11

Algoritmo Java | Mecanismos PKCS#11
---|---
Cipher.AES_128/CBC/NoPadding | CKM_AES_CBC
Cipher.AES_128/CTS/NoPadding | CKM_AES_CTS
Cipher.AES_128/ECB/NoPadding | CKM_AES_ECB
Cipher.AES_128/GCM/NoPadding | CKM_AES_GCM
Cipher.AES_192/CBC/NoPadding | CKM_AES_CBC
Cipher.AES_192/CTS/NoPadding | CKM_AES_CTS
Cipher.AES_192/ECB/NoPadding | CKM_AES_ECB
Cipher.AES_192/GCM/NoPadding | CKM_AES_GCM
Cipher.AES_256/CBC/NoPadding | CKM_AES_CBC
Cipher.AES_256/CTS/NoPadding | CKM_AES_CTS
Cipher.AES_256/ECB/NoPadding | CKM_AES_ECB
Cipher.AES_256/GCM/NoPadding | CKM_AES_GCM
Cipher.AES/CBC/NoPadding | CKM_AES_CBC
Cipher.AES/CBC/PKCS5Padding | CKM_AES_CBC_PAD, CKM_AES_CBC
Cipher.AES/CTR/NoPadding | CKM_AES_CTR
Cipher.AES/CTS/NoPadding | CKM_AES_CTS
Cipher.AES/ECB/NoPadding | CKM_AES_ECB
Cipher.AES/ECB/PKCS5Padding | CKM_AES_ECB
Cipher.AES/GCM/NoPadding | CKM_AES_GCM
Cipher.ARCFOUR | CKM_RC4
Cipher.Blowfish/CBC/NoPadding | CKM_BLOWFISH_CBC
Cipher.Blowfish/CBC/PKCS5Padding | CKM_BLOWFISH_CBC
Cipher.ChaCha20-Poly1305 | CKM_CHACHA20_POLY1305
Cipher.DES/CBC/NoPadding | CKM_DES_CBC
Cipher.DES/CBC/PKCS5Padding | CKM_DES_CBC_PAD, CKM_DES_CBC
Cipher.DES/ECB/NoPadding | CKM_DES_ECB
Cipher.DES/ECB/PKCS5Padding | CKM_DES_ECB
Cipher.DESede/CBC/NoPadding | CKM_DES3_CBC
Cipher.DESede/CBC/PKCS5Padding | CKM_DES3_CBC_PAD, CKM_DES3_CBC
Cipher.DESede/ECB/NoPadding | CKM_DES3_ECB
Cipher.DESede/ECB/PKCS5Padding | CKM_DES3_ECB
Cipher.PBEWithHmacSHA1AndAES_128 | CKM_AES_CBC_PAD, CKM_AES_CBC (CKM_PKCS5_PBKD2 and CKM_SHA_1_HMAC required)
Cipher.PBEWithHmacSHA224AndAES_128 | CKM_AES_CBC_PAD, CKM_AES_CBC (CKM_PKCS5_PBKD2 and CKM_SHA224_HMAC required)
Cipher.PBEWithHmacSHA256AndAES_128 | CKM_AES_CBC_PAD, CKM_AES_CBC (CKM_PKCS5_PBKD2 and CKM_SHA256_HMAC required)
Cipher.PBEWithHmacSHA384AndAES_128 | CKM_AES_CBC_PAD, CKM_AES_CBC (CKM_PKCS5_PBKD2 and CKM_SHA384_HMAC required)
Cipher.PBEWithHmacSHA512AndAES_128 | CKM_AES_CBC_PAD, CKM_AES_CBC (CKM_PKCS5_PBKD2 and CKM_SHA512_HMAC required)
Cipher.PBEWithHmacSHA1AndAES_256 | CKM_AES_CBC_PAD, CKM_AES_CBC (CKM_PKCS5_PBKD2 and CKM_SHA_1_HMAC required)
Cipher.PBEWithHmacSHA224AndAES_256 | CKM_AES_CBC_PAD, CKM_AES_CBC (CKM_PKCS5_PBKD2 and CKM_SHA224_HMAC required)
Cipher.PBEWithHmacSHA256AndAES_256 | CKM_AES_CBC_PAD, CKM_AES_CBC (CKM_PKCS5_PBKD2 and CKM_SHA256_HMAC required)
Cipher.PBEWithHmacSHA384AndAES_256 | CKM_AES_CBC_PAD, CKM_AES_CBC (CKM_PKCS5_PBKD2 and CKM_SHA384_HMAC required)
Cipher.PBEWithHmacSHA512AndAES_256 | CKM_AES_CBC_PAD, CKM_AES_CBC (CKM_PKCS5_PBKD2 and CKM_SHA512_HMAC required)
Cipher.RSA/ECB/NoPadding | CKM_RSA_X_509
Cipher.RSA/ECB/PKCS1Padding | CKM_RSA_PKCS
KeyAgreement.DiffieHellman | CKM_DH_PKCS_DERIVE
KeyAgreement.ECDH | CKM_ECDH1_DERIVE
KeyFactory.DiffieHellman | Any supported Diffie-Hellman mechanism
KeyFactory.DSA | Any supported DSA mechanism
KeyFactory.EC | Any supported EC mechanism
KeyFactory.RSA | Any supported RSA mechanism
KeyGenerator.AES | CKM_AES_KEY_GEN
KeyGenerator.ARCFOUR | CKM_RC4_KEY_GEN
KeyGenerator.Blowfish | CKM_BLOWFISH_KEY_GEN
KeyGenerator.ChaCha20 | CKM_CHACHA20_KEY_GEN
KeyGenerator.DES | CKM_DES_KEY_GEN
KeyGenerator.DESede | CKM_DES3_KEY_GEN
KeyGenerator.HmacMD5 | CKM_GENERIC_SECRET_KEY_GEN
KeyGenerator.HmacSHA1 | CKM_SHA_1_KEY_GEN, CKM_GENERIC_SECRET_KEY_GEN
KeyGenerator.HmacSHA224 | CKM_SHA224_KEY_GEN, CKM_GENERIC_SECRET_KEY_GEN
KeyGenerator.HmacSHA256 | CKM_SHA256_KEY_GEN, CKM_GENERIC_SECRET_KEY_GEN
KeyGenerator.HmacSHA3-224 | CKM_SHA3_224_KEY_GEN, CKM_GENERIC_SECRET_KEY_GEN
KeyGenerator.HmacSHA3-256 | CKM_SHA3_256_KEY_GEN, CKM_GENERIC_SECRET_KEY_GEN
KeyGenerator.HmacSHA3-384 | CKM_SHA3_384_KEY_GEN, CKM_GENERIC_SECRET_KEY_GEN
KeyGenerator.HmacSHA3-512 | CKM_SHA3_512_KEY_GEN, CKM_GENERIC_SECRET_KEY_GEN
KeyGenerator.HmacSHA384 | CKM_SHA384_KEY_GEN, CKM_GENERIC_SECRET_KEY_GEN
KeyGenerator.HmacSHA512 | CKM_SHA512_KEY_GEN, CKM_GENERIC_SECRET_KEY_GEN
KeyGenerator.HmacSHA512/224 | CKM_SHA512_224_KEY_GEN, CKM_GENERIC_SECRET_KEY_GEN
KeyGenerator.HmacSHA512/256 | CKM_SHA512_256_KEY_GEN, CKM_GENERIC_SECRET_KEY_GEN
KeyPairGenerator.DiffieHellman | CKM_DH_PKCS_KEY_PAIR_GEN
KeyPairGenerator.DSA | CKM_DSA_KEY_PAIR_GEN
KeyPairGenerator.EC | CKM_EC_KEY_PAIR_GEN
KeyPairGenerator.RSA | CKM_RSA_PKCS_KEY_PAIR_GEN
KeyStore.PKCS11 | Always available
KDF.HKDF-SHA256 | CKM_HKDF_DATA, CKM_HKDF_DERIVE (CKM_SHA256_HMAC required)
KDF.HKDF-SHA384 | CKM_HKDF_DATA, CKM_HKDF_DERIVE (CKM_SHA384_HMAC required)
KDF.HKDF-SHA512 | CKM_HKDF_DATA, CKM_HKDF_DERIVE (CKM_SHA512_HMAC required)
Mac.HmacMD5 | CKM_MD5_HMAC
Mac.HmacPBESHA1 | CKM_PBA_SHA1_WITH_SHA1_HMAC (CKM_SHA_1_HMAC required)
Mac.HmacPBESHA224 | CKM_NSS_PKCS12_PBE_SHA224_HMAC_KEY_GEN (CKM_SHA224_HMAC required)
Mac.HmacPBESHA256 | CKM_NSS_PKCS12_PBE_SHA256_HMAC_KEY_GEN (CKM_SHA256_HMAC required)
Mac.HmacPBESHA384 | CKM_NSS_PKCS12_PBE_SHA384_HMAC_KEY_GEN (CKM_SHA384_HMAC required)
Mac.HmacPBESHA512 | CKM_NSS_PKCS12_PBE_SHA512_HMAC_KEY_GEN (CKM_SHA512_HMAC required))
Mac.HmacSHA1 | CKM_SHA_1_HMAC
Mac.HmacSHA224 | CKM_SHA224_HMAC
Mac.HmacSHA256 | CKM_SHA256_HMAC
Mac.HmacSHA3-224 | CKM_SHA3_224_HMAC
Mac.HmacSHA3-256 | CKM_SHA3_256_HMAC
Mac.HmacSHA3-384 | CKM_SHA3_384_HMAC
Mac.HmacSHA3-512 | CKM_SHA3_512_HMAC
Mac.HmacSHA384 | CKM_SHA384_HMAC
Mac.HmacSHA512 | CKM_SHA512_HMAC
Mac.HmacSHA512/224 | CKM_SHA512_224_HMAC
Mac.HmacSHA512/256 | CKM_SHA512_256_HMAC
MessageDigest.MD2 | CKM_MD2
MessageDigest.MD5 | CKM_MD5
MessageDigest.SHA-224 | CKM_SHA224
MessageDigest.SHA-256 | CKM_SHA256
MessageDigest.SHA-384 | CKM_SHA384
MessageDigest.SHA-512 | CKM_SHA512
MessageDigest.SHA-512/224 | CKM_SHA512_224
MessageDigest.SHA-512/256 | CKM_SHA512_256
MessageDigest.SHA1 | CKM_SHA_1
MessageDigest.SHA3-224 | CKM_SHA3_224
MessageDigest.SHA3-256 | CKM_SHA3_256
MessageDigest.SHA3-384 | CKM_SHA3_384
MessageDigest.SHA3-512 | CKM_SHA3_512
SecretKeyFactory.AES | CKM_AES_CBC
SecretKeyFactory.ARCFOUR | CKM_RC4
SecretKeyFactory.Blowfish | CKM_BLOWFISH_CBC
SecretKeyFactory.ChaCha20 | CKM_CHACHA20_POLY1305
SecretKeyFactory.DES | CKM_DES_CBC
SecretKeyFactory.DESede | CKM_DES3_CBC
SecretKeyFactory.Generic | CKM_GENERIC_SECRET_KEY_GEN
SecretKeyFactory.PBKDF2WithHmacSHA1 | CKM_PKCS5_PBKD2 (CKM_SHA_1_HMAC required)
SecretKeyFactory.PBKDF2WithHmacSHA224 | CKM_PKCS5_PBKD2 (CKM_SHA224_HMAC required)
SecretKeyFactory.PBKDF2WithHmacSHA256 | CKM_PKCS5_PBKD2 (CKM_SHA256_HMAC required)
SecretKeyFactory.PBKDF2WithHmacSHA384 | CKM_PKCS5_PBKD2 (CKM_SHA384_HMAC required)
SecretKeyFactory.PBKDF2WithHmacSHA512 | CKM_PKCS5_PBKD2 (CKM_SHA512_HMAC required)
SecureRandom.PKCS11 | CK_TOKEN_INFO has the CKF_RNG bit set
Signature.MD2withRSA | CKM_MD2_RSA_PKCS, CKM_RSA_PKCS, CKM_RSA_X_509
Signature.MD5withRSA | CKM_MD5_RSA_PKCS, CKM_RSA_PKCS, CKM_RSA_X_509
Signature.NONEwithDSA | CKM_DSA
Signature.NONEwithECDSA | CKM_ECDSA
Signature.RSASSA-PSS | CKM_RSA_PKCS_PSS
Signature.SHA1withDSA | CKM_DSA_SHA1, CKM_DSA
Signature.SHA1withECDSA | CKM_ECDSA_SHA1, CKM_ECDSA
Signature.SHA1withRSA | CKM_SHA1_RSA_PKCS, CKM_RSA_PKCS, CKM_RSA_X_509
Signature.SHA1withRSASSA-PSS | CKM_SHA1_RSA_PKCS_PSS
Signature.SHA224withDSA | CKM_DSA_SHA224
Signature.SHA224withDSAinP1363Format | CKM_DSA_SHA224
Signature.SHA224withECDSA | CKM_ECDSA_SHA224, CKM_ECDSA
Signature.SHA224withECDSAinP1363Format | CKM_ECDSA_SHA224, CKM_ECDSA
Signature.SHA224withRSA | CKM_SHA224_RSA_PKCS, CKM_RSA_PKCS, CKM_RSA_X_509
Signature.SHA224withRSASSA-PSS | CKM_SHA224_RSA_PKCS_PSS
Signature.SHA256withDSA | CKM_DSA_SHA256
Signature.SHA256withDSAinP1363Format | CKM_DSA_SHA256
Signature.SHA256withECDSA | CKM_ECDSA_SHA256, CKM_ECDSA
Signature.SHA256withECDSAinP1363Format | CKM_ECDSA_SHA256, CKM_ECDSA
Signature.SHA256withRSA | CKM_SHA256_RSA_PKCS, CKM_RSA_PKCS, CKM_RSA_X_509
Signature.SHA256withRSASSA-PSS | CKM_SHA256_RSA_PKCS_PSS
Signature.SHA3-224withDSA | CKM_DSA_SHA3_224
Signature.SHA3-224withDSAinP1363Format | CKM_DSA_SHA3_224
Signature.SHA3-224withECDSA | CKM_ECDSA_SHA3_224, CKM_ECDSA
Signature.SHA3-224withECDSAinP1363Format | CKM_ECDSA_SHA3_224, CKM_ECDSA
Signature.SHA3-224withRSA | CKM_SHA3_224_RSA_PKCS, CKM_RSA_PKCS, CKM_RSA_X_509
Signature.SHA3-224withRSASSA-PSS | CKM_SHA3_224_RSA_PKCS_PSS
Signature.SHA3-256withDSA | CKM_DSA_SHA3_256
Signature.SHA3-256withDSAinP1363Format | CKM_DSA_SHA3_256
Signature.SHA3-256withECDSA | CKM_ECDSA_SHA3_256, CKM_ECDSA  
Signature.SHA3-256withECDSAinP1363Format | CKM_ECDSA_SHA3_256, CKM_ECDSA  
Signature.SHA3-256withRSA | CKM_SHA3_256_RSA_PKCS, CKM_RSA_PKCS, CKM_RSA_X_509  
Signature.SHA3-256withRSASSA-PSS | CKM_SHA3_256_RSA_PKCS_PSS  
Signature.SHA3-384withDSA | CKM_DSA_SHA3_384  
Signature.SHA3-384withDSAinP1363Format | CKM_DSA_SHA3_384  
Signature.SHA3-384withECDSA | CKM_ECDSA_SHA3_384, CKM_ECDSA  
Signature.SHA3-384withECDSAinP1363Format | CKM_ECDSA_SHA3_384, CKM_ECDSA  
Signature.SHA3-384withRSA | CKM_SHA3_384_RSA_PKCS, CKM_RSA_PKCS, CKM_RSA_X_509  
Signature.SHA3-384withRSASSA-PSS | CKM_SHA3_384_RSA_PKCS_PSS  
Signature.SHA3-512withDSA | CKM_DSA_SHA3_512  
Signature.SHA3-512withDSAinP1363Format | CKM_DSA_SHA3_512  
Signature.SHA3-512withECDSA | CKM_ECDSA_SHA3_512, CKM_ECDSA  
Signature.SHA3-512withECDSAinP1363Format | CKM_ECDSA_SHA3_512, CKM_ECDSA  
Signature.SHA3-512withRSA | CKM_SHA3_512_RSA_PKCS, CKM_RSA_PKCS, CKM_RSA_X_509  
Signature.SHA3-512withRSASSA-PSS | CKM_SHA3_512_RSA_PKCS_PSS  
Signature.SHA384withDSA | CKM_DSA_SHA384  
Signature.SHA384withDSAinP1363Format | CKM_DSA_SHA384  
Signature.SHA384withECDSA | CKM_ECDSA_SHA384, CKM_ECDSA  
Signature.SHA384withECDSAinP1363Format | CKM_ECDSA_SHA384, CKM_ECDSA  
Signature.SHA384withRSA | CKM_SHA384_RSA_PKCS, CKM_RSA_PKCS, CKM_RSA_X_509  
Signature.SHA384withRSASSA-PSS | CKM_SHA384_RSA_PKCS_PSS  
Signature.SHA512withDSA | CKM_DSA_SHA512  
Signature.SHA512withDSAinP1363Format | CKM_DSA_SHA512  
Signature.SHA512withECDSA | CKM_ECDSA_SHA512, CKM_ECDSA  
Signature.SHA512withECDSAinP1363Format | CKM_ECDSA_SHA512, CKM_ECDSA  
Signature.SHA512withRSA | CKM_SHA512_RSA_PKCS, CKM_RSA_PKCS, CKM_RSA_X_509  
Signature.SHA512withRSASSA-PSS | CKM_SHA512_RSA_PKCS_PSS  
  
### Requisitos do KeyStore do Provedor SunPKCS11

O seguinte descreve os requisitos impostos pela implementação do KeyStore do provedor SunPKCS11 na biblioteca nativa PKCS#11 subjacente.

Nota:

Alterações podem ser feitas em futuras versões para maximizar a interoperabilidade com o maior número possível de bibliotecas PKCS#11 existentes. 

Acesso Somente Leitura

Para mapear objetos existentes armazenados em um token PKCS#11 para entradas do KeyStore, a implementação do KeyStore do provedor SunPKCS11 executa as seguintes operações.

  1. Uma busca por todos os objetos de chave privada no token é realizada chamando `C_FindObjects[Init|Final]`. O modelo de busca inclui os seguintes atributos: 
     * CKA_TOKEN = true
     * CKA_CLASS = CKO_PRIVATE_KEY
  2. Uma busca por todos os objetos de certificado no token é realizada chamando `C_FindObjects[Init|Final]`. O modelo de busca inclui os seguintes atributos: 
     * CKA_TOKEN = true
     * CKA_CLASS = CKO_CERTIFICATE
  3. Cada objeto de chave privada é correspondido com seu certificado correspondente recuperando seus respectivos atributos CKA_ID. Um par correspondente deve compartilhar o mesmo CKA_ID único. 

Para cada par correspondente, a cadeia de certificados é construída seguindo o caminho emissor->assunto. A partir do certificado da entidade final, uma chamada para `C_FindObjects[Init|Final]` é feita com um modelo de busca que inclui os seguintes atributos: 

     * CKA_TOKEN = true
     * CKA_CLASS = CKO_CERTIFICATE
     * CKA_SUBJECT = [DN of certificate issuer]

Esta busca continua até que nenhum certificado para o emissor seja encontrado, ou até que um certificado autoassinado seja encontrado. Se mais de um certificado for encontrado, o primeiro é usado.

Uma vez que uma chave privada e um certificado tenham sido correspondidos (e sua cadeia de certificados construída), a informação é armazenada em uma entrada de chave privada com o valor CKA_LABEL do certificado da entidade final como o alias do KeyStore.

Se o certificado da entidade final não tiver CKA_LABEL, então o alias é derivado do CKA_ID. Se o CKA_ID puder ser determinado como consistindo exclusivamente de caracteres imprimíveis, então um alias String é criado decodificando os bytes CKA_ID usando o charset UTF-8. Caso contrário, um alias String hexadecimal é criado a partir dos bytes CKA_ID ("0xFFFF...", por exemplo).

Se vários certificados compartilharem o mesmo CKA_LABEL, então o alias é derivado do CKA_LABEL mais o emissor do certificado da entidade final e o número de série (`"MyCert/CN=foobar/1234"`, por exemplo). 

  4. Cada certificado que não faz parte de uma entrada de chave privada (como o certificado da entidade final) é verificado quanto à sua confiabilidade. Se o atributo CKA_TRUSTED for true, então uma entrada de certificado confiável do KeyStore é criada com o valor CKA_LABEL como o alias do KeyStore. Se o certificado não tiver CKA_LABEL, ou se vários certificados compartilharem o mesmo CKA_LABEL, então o alias é derivado conforme descrito anteriormente. 

Se o atributo CKA_TRUSTED não for suportado, nenhuma entrada de certificado confiável será criada.

  5. Qualquer objeto de chave privada ou certificado que não faça parte de uma entrada de chave privada ou entrada de certificado confiável é ignorado.
  6. Uma busca por todos os objetos de chave secreta no token é realizada chamando `C_FindObjects[Init|Final]`. O modelo de busca inclui os seguintes atributos: 
     * CKA_TOKEN = true
     * CKA_CLASS = CKO_SECRET_KEY

Uma entrada de chave secreta do KeyStore é criada para cada objeto de chave secreta, com o valor CKA_LABEL como o alias do KeyStore. Cada objeto de chave secreta deve ter um CKA_LABEL único.

Acesso de Escrita

Para criar novas entradas do KeyStore em um token PKCS#11 para entradas do KeyStore, a implementação do KeyStore do provedor SunPKCS11 executa as seguintes operações.

  1. Ao criar uma entrada do KeyStore (durante KeyStore.setEntry, por exemplo), C_CreateObject é chamado com `CKA_TOKEN=true` para criar objetos de token para o conteúdo da entrada respectiva. 

Objetos de chave privada são armazenados com `CKA_PRIVATE=true`. O alias do KeyStore (codificado em UTF8) é definido como o CKA_ID tanto para a chave privada quanto para o certificado da entidade final correspondente. O alias do KeyStore também é definido como o CKA_LABEL para o objeto de certificado da entidade final. 

Cada certificado na cadeia de uma entrada de chave privada também é armazenado. O CKA_LABEL não é definido para certificados de CA. Se um certificado de CA já estiver no token, uma duplicata não é armazenada.

Objetos de chave secreta são armazenados com `CKA_PRIVATE=true`. O alias do KeyStore é definido como o CKA_LABEL. 

  2. Se uma tentativa for feita para converter um objeto de sessão em um objeto de token (por exemplo, se KeyStore.setEntry for chamado e o objeto de chave privada na entrada especificada for um objeto de sessão), então C_CopyObject é chamado com `CKA_TOKEN=true`. 
  3. Se vários certificados no token forem encontrados compartilhando o mesmo CKA_LABEL, então as capacidades de escrita no token são desabilitadas.
  4. Como a especificação PKCS#11 não permite que aplicações regulares definam `CKA_TRUSTED=true` (somente aplicações de inicialização de token podem fazê-lo), entradas de certificado confiáveis não podem ser criadas. 

Diversos

Além das buscas listadas anteriormente, as seguintes buscas podem ser usadas pela implementação do KeyStore do provedor SunPKCS11 para executar funções internas. Especificamente, `C_FindObjects[Init|Final]` pode ser chamado com qualquer um dos seguintes modelos de atributo: 

  * 
`CKA_TOKEN    true
            CKA_CLASS    CKO_CERTIFICATE
            CKA_SUBJECT  [subject DN]
```

  * 
`CKA_TOKEN    true
            CKA_CLASS    CKO_SECRET_KEY
            CKA_LABEL    [label]
```

  * 
`CKA_TOKEN    true
            CKA_CLASS    CKO_CERTIFICATE or CKO_PRIVATE_KEY
            CKA_ID       [cka_id]
```

### Provedor de Exemplo

O seguinte é um exemplo de um provedor simples que demonstra recursos da classe Provider. 
```
    package com.foo;
    
    import java.io.*;
    import java.lang.reflect.*;
    import java.security.*;
    import javax.crypto.*;
    
    /**
     * Example provider that demonstrates some Provider class features.
     *
     *  . Implement multiple different algorithms in a single class.
     *    Previously each algorithm needed to be implemented in a separate class
     *    (e.g. one for SHA-256, one for SHA-384, etc.)
     *
     *  . Multiple concurrent instances of the provider frontend class each
     *    associated with a different backend.
     *
     *  . It uses "unextractable" keys and lets the framework know which key
     *    objects it can and cannot support
     *
     * Note that this is only a simple example provider designed to demonstrate
     * several of the new features. It is not explicitly designed for efficiency.
     */
    public final class ExampleProvider extends Provider {
    
        // Reference to the crypto backend that implements all the algorithms.
        final CryptoBackend cryptoBackend;
    
        public ExampleProvider(String name, CryptoBackend cryptoBackend) {
            super(name, 1.0, "JCA/JCE provider for " + name);
            this.cryptoBackend = cryptoBackend;
            // register the algorithms we support (SHA-256, SHA-384, DESede, and AES)
            putService(new MyService
                (this, "MessageDigest", "SHA-256", "com.foo.ExampleProvider$MyMessageDigest"));
            putService(new MyService
                (this, "MessageDigest", "SHA-384", "com.foo.ExampleProvider$MyMessageDigest"));
            putService(new MyCipherService
                (this, "Cipher", "DES", "com.foo.ExampleProvider$MyCipher"));
            putService(new MyCipherService
                (this, "Cipher", "AES", "com.foo.ExampleProvider$MyCipher"));
        }
    
        // The API of our fictitious crypto backend.
        static abstract class CryptoBackend {
            abstract byte[] digest(String algorithm, byte[] data);
            abstract byte[] encrypt(String algorithm, KeyHandle key, byte[] data);
            abstract byte[] decrypt(String algorithm, KeyHandle key, byte[] data);
            abstract KeyHandle createKey(String algorithm, byte[] keyData);
        }
    
        // The shell of the representation the crypto backend uses for keys.
        private static final class KeyHandle {
            // fill in code
        }
    
        // We have our own ServiceDescription implementation that overrides newInstance()
        // that calls the (Provider, String) constructor instead of the no-args constructor.
        private static class MyService extends Service {
    
            private static final Class[] paramTypes = {Provider.class, String.class};
    
            MyService(Provider provider, String type, String algorithm,
                    String className) {
                super(provider, type, algorithm, className, null, null);
            }
    
            public Object newInstance(Object param) throws NoSuchAlgorithmException {
                try {
                    // Get the Class object for the implementation class.
                    Class clazz;
                    Provider provider = getProvider();
                    ClassLoader loader = provider.getClass().getClassLoader();
                    if (loader == null) {
                        clazz = Class.forName(getClassName());
                    } else {
                        clazz = loader.loadClass(getClassName());
                    }
                    // Fetch the (Provider, String) constructor.
                    Constructor cons = clazz.getConstructor(paramTypes);
                    // Invoke constructor and return the SPI object.
                    Object obj = cons.newInstance(new Object[] {provider, getAlgorithm()});
                    return obj;
                } catch (Exception e) {
                    throw new NoSuchAlgorithmException("Could not instantiate service", e);
                }
            }
        }
    
        // Custom ServiceDescription class for Cipher objects. See supportsParameter().
        private static class MyCipherService extends MyService {
            MyCipherService(Provider provider, String type, String algorithm,
                    String className) {
                super(provider, type, algorithm, className);
            }
            // We override supportsParameter() to let the framework know which
            // keys we can support. We support instances of MySecretKey, if they
            // are stored in our provider backend, plus SecretKeys with a RAW encoding.
            public boolean supportsParameter(Object obj) {
                if (obj instanceof SecretKey == false) {
                    return false;
                }
                SecretKey key = (SecretKey)obj;
                if (key.getAlgorithm().equals(getAlgorithm()) == false) {
                    return false;
                }
                if (key instanceof MySecretKey) {
                    MySecretKey myKey = (MySecretKey)key;
                    return myKey.provider == getProvider();
                } else {
                    return "RAW".equals(key.getFormat());
                }
            }
        }
    
        // Our generic MessageDigest implementation. It implements all digest
        // algorithms in a single class. We only implement the bare minimum
        // of MessageDigestSpi methods.
        private static final class MyMessageDigest extends MessageDigestSpi {
            private final ExampleProvider provider;
            private final String algorithm;
            private ByteArrayOutputStream buffer;
            MyMessageDigest(Provider provider, String algorithm) {
                super();
                this.provider = (ExampleProvider)provider;
                this.algorithm = algorithm;
                engineReset();
            }
            protected void engineReset() {
                buffer = new ByteArrayOutputStream();
            }
            protected void engineUpdate(byte b) {
                buffer.write(b);
            }
            protected void engineUpdate(byte[] b, int ofs, int len) {
                buffer.write(b, ofs, len);
            }
            protected byte[] engineDigest() {
                byte[] data = buffer.toByteArray();
                byte[] digest = provider.cryptoBackend.digest(algorithm, data);
                engineReset();
                return digest;
            }
        }
    
        // our generic Cipher implementation, only partially complete. It implements
        // all cipher algorithms in a single class. We implement only as many of the
        // CipherSpi methods as required to show how it could work
        private static abstract class MyCipher extends CipherSpi {
            private final ExampleProvider provider;
            private final String algorithm;
            private int opmode;
            private MySecretKey myKey;
            private ByteArrayOutputStream buffer;
            MyCipher(Provider provider, String algorithm) {
                super();
                this.provider = (ExampleProvider)provider;
                this.algorithm = algorithm;
            }
            protected void engineInit(int opmode, Key key, SecureRandom random)
                    throws InvalidKeyException {
                this.opmode = opmode;
                myKey = MySecretKey.getKey(provider, algorithm, key);
                if (myKey == null) {
                    throw new InvalidKeyException();
                }
                buffer = new ByteArrayOutputStream();
            }
            protected byte[] engineUpdate(byte[] b, int ofs, int len) {
                buffer.write(b, ofs, len);
                return new byte[0];
            }
            protected int engineUpdate(byte[] b, int ofs, int len, byte[] out, int outOfs) {
                buffer.write(b, ofs, len);
                return 0;
            }
            protected byte[] engineDoFinal(byte[] b, int ofs, int len) {
                buffer.write(b, ofs, len);
                byte[] in = buffer.toByteArray();
                byte[] out;
                if (opmode == Cipher.ENCRYPT_MODE) {
                    out = provider.cryptoBackend.encrypt(algorithm, myKey.handle, in);
                } else {
                    out = provider.cryptoBackend.decrypt(algorithm, myKey.handle, in);
                }
                buffer = new ByteArrayOutputStream();
                return out;
            }
            // code for remaining CipherSpi methods goes here
        }
    
        // our SecretKey implementation. All our keys are stored in our crypto
        // backend, we only have an opaque handle available. There is no
        // encoded form of these keys.
        private static final class MySecretKey implements SecretKey {
    
            final String algorithm;
            final Provider provider;
            final KeyHandle handle;
    
            MySecretKey(Provider provider, String algorithm, KeyHandle handle) {
                super();
                this.provider = provider;
                this.algorithm = algorithm;
                this.handle = handle;
            }
            public String getAlgorithm() {
                return algorithm;
            }
            public String getFormat() {
                return null; // this key has no encoded form
            }
            public byte[] getEncoded() {
                return null; // this key has no encoded form
            }
            // Convert the given key to a key of the specified provider, if possible
            static MySecretKey getKey(ExampleProvider provider, String algorithm, Key key) {
                if (key instanceof SecretKey == false) {
                    return null;
                }
                // algorithm name must match
                if (!key.getAlgorithm().equals(algorithm)) {
                    return null;
                }
                // if key is already an instance of MySecretKey and is stored
                // on this provider, return it right away
                if (key instanceof MySecretKey) {
                    MySecretKey myKey = (MySecretKey)key;
                    if (myKey.provider == provider) {
                        return myKey;
                    }
                }
                // otherwise, if the input key has a RAW encoding, convert it
                if (!"RAW".equals(key.getFormat())) {
                    return null;
                }
                byte[] encoded = key.getEncoded();
                KeyHandle handle = provider.cryptoBackend.createKey(algorithm, encoded);
                return new MySecretKey(provider, algorithm, handle);
            }
        }
    }
    
```