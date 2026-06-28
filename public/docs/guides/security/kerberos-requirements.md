# Requisitos do Kerberos

## Requisitos do Kerberos

O Kerberos Versão 5 é usado tanto para os aspectos de autenticação quanto de comunicação segura das aplicações cliente e servidor desenvolvidas neste tutorial. Presume-se que o leitor já esteja familiarizado com o Kerberos. Consulte a [documentação de referência do Kerberos](<http://web.MIT.edu/kerberos/www/index.html>).

O framework JAAS, e o mecanismo Kerberos exigido pelos métodos Java GSS-API, são integrados aos JDKs de todos os fornecedores. O LoginModule Kerberos necessário para a autenticação JAAS neste tutorial pode não estar disponível em todos os JDKs de todos os fornecedores. Usaremos o LoginModule para Kerberos fornecido pelo JDK da Oracle.

Para executar os programas de exemplo, você precisará ter acesso a uma instalação Kerberos. Conforme descrito nas seções a seguir, você também pode precisar de um arquivo de configuração Kerberos `krb5.conf` e uma indicação de onde esse arquivo está localizado.

Assim como em todas as instalações Kerberos, um Kerberos Key Distribution Center (KDC) é necessário. Ele precisa conter o nome de usuário e a senha que você usará para se autenticar no Kerberos.

Nota:

Uma implementação de KDC faz parte de uma instalação Kerberos e não faz parte do JDK.

Assim como na maioria das instalações Kerberos, um arquivo de configuração Kerberos `krb5.conf` é consultado para determinar coisas como o realm padrão e o KDC. Se você estiver usando uma implementação Kerberos que não inclui um arquivo `krb5.conf` (como uma do Windows), você precisará criar um ou usar propriedades de sistema conforme descrito em [Configurando Propriedades para Indicar o Realm Padrão e o KDC](<#/doc/guides/security/kerberos-requirements>).

### Configurando Propriedades para Indicar o Realm Padrão e o KDC

Tipicamente, o realm padrão e o KDC para esse realm são indicados no arquivo de configuração Kerberos `krb5.conf`. No entanto, se desejar, você pode especificar esses valores definindo as seguintes propriedades de sistema para indicar o realm e o KDC, respectivamente:
```
    java.security.krb5.realm
    java.security.krb5.kdc
```

Se você definir uma dessas propriedades, deverá definir ambas.

Observe também que, se você definir essas propriedades, nenhuma autenticação cross-realm será possível, a menos que um arquivo `krb5.conf` também seja fornecido, do qual as informações adicionais necessárias para a autenticação cross-realm possam ser obtidas.

Se você definir valores para essas propriedades, eles substituirão os valores padrão de realm e KDC especificados em `krb5.conf` (se tal arquivo for encontrado). O arquivo `krb5.conf` ainda é consultado se forem necessários valores para itens diferentes do realm padrão e do KDC. Se nenhum arquivo `krb5.conf` for encontrado, os valores padrão usados para esses itens são específicos da implementação.

### Localizando o Arquivo de Configuração krb5.conf

As informações essenciais de configuração do Kerberos são o realm padrão e o KDC padrão. Conforme mostrado em [Configurando Propriedades para Indicar o Realm Padrão e o KDC](<#/doc/guides/security/kerberos-requirements>), se você definir propriedades para indicar esses valores, eles não serão obtidos de um arquivo de configuração `krb5.conf`.

Se essas propriedades não tiverem valores definidos, ou se outras informações de configuração do Kerberos forem necessárias, uma tentativa é feita para encontrar as informações necessárias em um arquivo `krb5.conf`. O algoritmo para localizar o arquivo `krb5.conf` é o seguinte:

  * Se a propriedade de sistema `java.security.krb5.conf` estiver definida, seu valor é assumido como especificando o caminho e o nome do arquivo.

  * Se o valor dessa propriedade de sistema não estiver definido, o arquivo de configuração é procurado no diretório

    * `<java-home>\conf\security` (Windows)
    * `<java-home>/conf/security` (Linux e macOS)

Aqui `<java-home>` refere-se ao diretório onde o JDK está instalado.

  * Se o arquivo ainda não for encontrado, uma tentativa é feita para localizá-lo da seguinte forma:

    * `C:\Windows\krb5.ini` (Windows)
    * `/etc/krb5.conf` (Linux)
    * `~/Library/Preferences/edu.mit.Kerberos`, `/Library/Preferences/edu.mit.Kerberos`, ou `/etc/krb5.conf` (macOS)
  * Se o arquivo ainda não for encontrado, e a informação de configuração procurada não for o realm padrão e o KDC, então padrões específicos da implementação são usados. Se, por outro lado, a informação de configuração procurada for o realm padrão e o KDC porque eles não foram especificados nas propriedades de sistema, e o arquivo `krb5.conf` também não for encontrado, então uma exceção é lançada.

  * No Windows, se um arquivo `krb5.conf` não puder ser encontrado ou não contiver configurações para o realm padrão e seu KDC, então as variáveis de ambiente `USERDNSDOMAIN` e `LOGONSERVER` são usadas como o realm padrão e seu KDC.

### Convenções de Nomenclatura para Nomes de Realm e Nomes de Host

Por convenção, todos os nomes de realm Kerberos são em maiúsculas e todos os nomes de host e domínio DNS são em minúsculas. No Windows, os domínios também são realms Kerberos; no entanto, o nome do realm é sempre a versão em maiúsculas do nome do domínio.

Os nomes de host não diferenciam maiúsculas de minúsculas e, por convenção, são todos em minúsculas. Eles devem ser resolvidos para o mesmo nome de host no cliente e no servidor por seus respectivos serviços de nomenclatura.

No entanto, no banco de dados Kerberos, os nomes de host diferenciam maiúsculas de minúsculas. Em todos os principais de serviço Kerberos baseados em host no KDC, os nomes de host diferenciam maiúsculas de minúsculas. Os nomes de host usados nos nomes principais de serviço Kerberos devem corresponder exatamente aos nomes de host retornados pelo serviço de nomenclatura. Por exemplo, se o serviço de nomenclatura retornar um nome de host DNS totalmente qualificado em minúsculas, como `raven.example.com`, então o administrador deve usar o mesmo nome de host DNS totalmente qualificado em minúsculas ao criar nomes principais baseados em host no KDC: `host/raven.example.com`.

### Autenticação Cross-Realm

Na autenticação cross-realm, um principal em um realm pode se autenticar em principais em outro realm.

No Kerberos, a autenticação cross-realm é implementada compartilhando uma chave de criptografia entre dois realms. Os KDCs em dois realms diferentes compartilham um segredo cross-realm especial; este segredo é usado para provar a identidade ao cruzar a fronteira entre os realms.

A chave compartilhada é a chave do principal do Ticket Granting Service. Aqui está um principal típico do Ticket Granting Service para um único realm:
```
    ktbtgt/EXAMPLE.COM@EXAMPLE.COM

```

Na autenticação cross-realm, dois principais são criados em cada realm participante. Para dois realms, `ENG.EAST.EXAMPLE.COM` e `SALES.WEST.EXAMPLE.COM`, esses principais seriam:
```
    krbtgt/ENG.EAST.EXAMPLE.COM@SALES.WEST.EXAMPLE.COM
    krbtgt/SALES.WEST.EXAMPLE.COM@ENG.EAST.EXAMPLE.COM

```

Esses principais, conhecidos como principais de Servidor de Concessão de Tickets remoto, devem ser criados em ambos os realms.

Para um KDC Windows, a conta `krbtgt` é criada automaticamente quando um domínio Windows é criado. Esta conta não pode ser excluída e renomeada.