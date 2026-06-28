# Instalação do JDK em Plataformas Linux

## 3 Instalação do JDK em Plataformas Linux

Este tópico descreve os procedimentos de instalação do JDK na plataforma Linux, juntamente com os requisitos do sistema.

Este tópico inclui as seguintes seções:

  * [Notas Gerais Sobre a Instalação do JDK em Plataformas Linux a Partir de Arquivos de Arquivo](<#/doc/guides/install/installation-jdk-linux-platforms>)

  * [Notas Gerais Sobre a Instalação do JDK em Plataformas Linux a Partir de Pacotes RPM](<#/doc/guides/install/installation-jdk-linux-platforms>)

  * [Requisitos do Sistema para Instalar o JDK em Plataformas Linux](<#/doc/guides/install/installation-jdk-linux-platforms>)

  * [Instalando o JDK no Linux a Partir de Arquivos de Arquivo, Pacotes Debian, Pacotes RPM e Repositórios Oracle Linux](<#/doc/guides/install/installation-jdk-linux-platforms>)

### Notas Gerais Sobre a Instalação do JDK em Plataformas Linux a Partir de Arquivos de Arquivo

Este tópico descreve informações gerais sobre a instalação do JDK 25 em plataformas Linux.

A instalação do JDK cria automaticamente um diretório chamado `jdk-feature.interim.update.patch` onde `feature (25),interim, update,` e `patch` representam os valores correspondentes das informações de versão.

Acesso Root

Se você instalar o JDK em um local específico, como `/opt`, você deve fazer login com credenciais de root para obter as permissões necessárias. Se você não tiver acesso root, instale o JDK em seu diretório home ou em um subdiretório para o qual você tenha permissões de escrita.

Sobrescrevendo Arquivos

Se você instalar o software em um diretório que contém um subdiretório chamado `jdk-25.interim.update.patch`, o novo software sobrescreverá arquivos com o mesmo nome nesse diretório. Certifique-se de renomear o diretório antigo se ele contiver arquivos que você gostaria de manter.

Preferências do Sistema

A instalação do JDK a partir de arquivos de arquivo não configura o armazenamento de apoio para o nó do sistema da Java Preferences API (pacote Java `java.util.prefs`). Se esta funcionalidade do JDK for necessária, você precisará configurá-la manualmente, garantindo que o diretório `/etc/.java/.systemPrefs` ou `jdk-25.interim.update.patch/.systemPrefs` exista.

### Notas Gerais Sobre a Instalação do JDK em Plataformas Linux a Partir de Pacotes RPM

Este tópico descreve informações gerais sobre a instalação do JDK 25 a partir de pacotes RPM em plataformas Linux.

Você pode instalar apenas uma versão do JDK da mesma feature release. Se você tentar instalar a versão mais recente da mesma feature release enquanto a versão mais antiga existir, o instalador desinstalará a versão mais antiga e instalará a nova versão. Por exemplo, você não pode instalar `jdk-25` e `jdk-25.0.1` simultaneamente. Se você tentar instalar `jdk-25.0.1` após `jdk-25` ter sido instalado, o instalador desinstalará `jdk-25` e instalará `jdk-25.0.1`.

Cada release de atualização será instalada em um diretório separado, como o diretório `/usr/lib/jvm/jdk-<VERSION>-oracle-<ARCH>`, onde &lt;VERSION&gt; é uma string de versão completa (exemplo: 23, 23.0.1), `<ARCH>` é igual a `x64` ou `aarch64`. Além disso, um link simbólico `/usr/java/jdk-25` que aponta para o diretório de instalação é criado para compatibilidade retroativa.

Nota:

Se você instalar uma versão mais antiga de um JDK quando a versão mais recente da mesma família de features já existir, um erro será exibido, solicitando que você desinstale uma versão mais recente do JDK se uma versão mais antiga precisar ser instalada.

Acesso Root

Você deve fazer login com credenciais de root para instalar ou atualizar o JDK.

Preferências do Sistema

Por padrão, o script de instalação configura o sistema de forma que o armazenamento de apoio para o nó do sistema da Java Preferences API (pacote Java `java.util.prefs`) seja configurado no diretório `/etc/.java/.systemPrefs`.

Integração do Sistema

A instalação do JDK é integrada com o framework de alternativas. Após a instalação, o framework de alternativas é atualizado para refletir os binários do JDK recém-instalado. Comandos Java como `java`, `javac`, `javadoc` e `javap` podem ser chamados a partir da linha de comando.

Usando o comando `java -version`, você pode confirmar a versão padrão (recém-instalada) do JDK.

Além disso, você pode verificar qual pacote RPM específico fornece os arquivos `java`:
```
    $ rpm -q --whatprovides java
```

### Requisitos do Sistema para Instalar o JDK em Plataformas Linux

Consulte [Configurações de Sistemas Certificados Oracle JDK](<https://www.oracle.com/java/technologies/javase/products-doc-jdk25certconfig.html>) para obter informações sobre plataformas, sistemas operacionais e navegadores suportados.

### Instalando o JDK no Linux a Partir de Arquivos de Arquivo, Pacotes Debian, Pacotes RPM e Repositórios Oracle Linux

Você pode instalar o JDK em uma plataforma Linux a partir de arquivos de arquivo, pacotes debian, arquivos de pacotes Red Hat Package Manager (RPM) para download, ou pacotes RPM de repositórios Oracle Linux (OL).

A instalação pode ser realizada usando um dos seguintes processos:

  * A partir de arquivos de arquivo (`.tar.gz`): Isso permite que você instale uma versão privada do JDK para o usuário atual em qualquer local, sem afetar outras instalações do JDK. No entanto, pode envolver etapas manuais para fazer algumas das features funcionarem. Consulte a tabela a seguir para as opções disponíveis para download e instalação do JDK a partir de arquivos de arquivo. Os pacotes estão disponíveis para sistemas Linux x64 e Linux aarch64 (ARM de 64 bits). Instale o pacote necessário.

  * A partir de pacotes Debian (`.deb`): Isso permite que você realize uma instalação do JDK em todo o sistema em plataformas Linux baseadas em Debian, e requer acesso root.
  * A partir de pacotes RPM para download (`.rpm`): Isso permite que você realize uma instalação do JDK em todo o sistema em plataformas Linux baseadas em RPM para todos os usuários, e requer acesso root. Consulte a tabela a seguir para as opções disponíveis para download e instalação do JDK a partir de pacotes RPM para Linux x64 e Linux aarch64 (ARM de 64 bits).

  * A partir de repositórios Oracle Linux: Isso permite que você realize uma instalação do JDK em todo o sistema em plataformas OL a partir do OL7 para todos os usuários, e requer acesso root. Os pacotes JDK RPM nos repositórios Oracle Linux RPM estão disponíveis para plataformas OL x64 e aarch64 (ARM de 64 bits). O download explícito de pacotes JDK RPM não é necessário, o gerenciador de pacotes fará isso automaticamente para você.

Os pacotes JDK RPM para plataformas Linux Genéricas e plataformas Oracle Linux diferem. A tabela a seguir lista as diferenças:

Tabela 3-1 Diferença entre plataformas Linux Genéricas e OL

Feature | Pacote JDK RPM para Download para Plataformas Linux Genéricas | Pacote JDK RPM para Plataformas Oracle Linux
---|---|---
Plataformas Linux Suportadas | Qualquer plataforma Linux baseada em RPM. Por exemplo, Red Hat, SuSE | Plataformas OL a partir do OL7
Nome do Pacote | A imagem do JDK é empacotada em um único pacote chamado `jdk-25` | A imagem do JDK é dividida em dois pacotes: `jdk-25-headless` e `jdk-25-headful`.

  * `jdk-25-headless` é um Java Runtime headless para executar aplicações sem GUI.
  * `jdk-25-headful` é um Java Runtime e Ferramentas de Desenvolvimento headful para desenvolver e executar todos os tipos de aplicações.

O pacote `jdk-25-headful` requer o pacote `jdk-25-headless`. Quando esses pacotes são instalados juntos, eles fornecem a mesma funcionalidade que o pacote `jdk-25` para Plataformas Linux Genéricas.
Nome do diretório de instalação | `/usr/lib/jvm/jdk-25-oracle-<ARCH>` | `/usr/lib/jvm/jdk-25-oracle-<ARCH>`
Disponível para download em [Java SE Downloads](<https://www.oracle.com/java/technologies/downloads/>) | Sim | Não. Os pacotes são hospedados em repositórios Oracle Linux RPM.
Integração com o framework de alternativas | O pacote `jdk-25` registra os grupos `java` e `javac` com o framework de alternativas. | O pacote `jdk-25-headless` registra o grupo `java` com o framework de alternativas. O pacote `jdk-25-headful` registra o grupo `javac` com o framework de alternativas.
Instalará automaticamente os pacotes de terceiros necessários? | Não. Você precisa instalar manualmente os pacotes necessários. | Sim. Todos os pacotes necessários serão instalados automaticamente.

Baixando o Instalador do JDK

Acesse a página [Java SE Downloads](<https://www.oracle.com/java/technologies/downloads/>) e clique em Aceitar Acordo de Licença. No menu Download, clique no link Download correspondente à sua necessidade.

A tabela a seguir lista as opções e instruções para baixar e instalar a release do JDK 25 em uma plataforma Linux:

Arquivo de Download | Instruções | Arquitetura (Tipo de CPU) | Quem Pode Instalar
---|---|---|---
Para sistemas Linux x64: `jdk-25.interim.update.patch_linux-x64.tar.gz` | [Instalando o JDK de 64 bits em Plataformas Linux](<#/doc/guides/install/installation-jdk-linux-platforms>) | Intel - 64 bits | Qualquer um
Para sistemas Linux aarch64 (ARM de 64 bits): `jdk-25.interim.update.patch_linux-aarch64.tar.gz` | [Instalando o JDK de 64 bits em Plataformas Linux](<#/doc/guides/install/installation-jdk-linux-platforms>) | ARM - 64 bits | Qualquer um
Para sistemas Linux x64: `jdk-25.interim.update.patch_linux-x64.deb` | [Instalando o Pacote JDK de 64 bits em Plataformas Linux Baseadas em Debian](<#/doc/guides/install/installation-jdk-linux-platforms>) | Intel - Linux de 64 bits baseado em RPM | Root
Para sistemas Linux x64: `jdk-25.interim.update.patch_linux-x64.rpm` | [Instalando o JDK de 64 bits em Plataformas Linux Baseadas em RPM](<#/doc/guides/install/installation-jdk-linux-platforms>) | Intel - Linux de 64 bits baseado em RPM | Root
Para sistemas Linux aarch64 (ARM de 64 bits): `jdk-25.interim.update.patch_linux-aarch64.rpm` | [Instalando o JDK de 64 bits em Plataformas Linux Baseadas em RPM](<#/doc/guides/install/installation-jdk-linux-platforms>) | ARM - Linux de 64 bits baseado em RPM | Root

#### Instalando o JDK de 64 bits em Plataformas Linux

Você pode instalar o JDK para Linux de 64 bits a partir de um arquivo de arquivo (`.tar.gz`). O arquivo de arquivo `.tar.gz` (também chamado de tarball) é um arquivo que pode ser descompactado e extraído em uma única etapa.

Para instalar o JDK de 64 bits em uma plataforma Linux:

  1. Baixe o arquivo necessário:

     * Para sistemas Linux x64: `jdk-25.interim.update.patch_linux-x64_bin.tar.gz`. Por exemplo `jdk-25_linux-x64_bin.tar.gz`
     * Para sistemas Linux aarch64 (ARM de 64 bits): `jdk-25.interim.update.patch_linux-aarch64_bin.tar.gz`. Por exemplo, `jdk-25_linux-aarch64_bin.tar.gz`

Antes de baixar um arquivo, você deve aceitar o acordo de licença. Qualquer pessoa (não apenas usuários root) pode instalar o arquivo de arquivo em qualquer local com acesso de escrita.

  2. Mude o diretório para o local onde você deseja instalar o JDK, então mova o arquivo de arquivo `.tar.gz` para o diretório atual.
  3. Descompacte o tarball e instale o JDK baixado:

`$ tar zxvf jdk-25_linux-x64_bin.tar.gz`

OU

`$ tar zxvf jdk-25_linux-aarch64_bin.tar.gz`

Os arquivos do Java Development Kit são instalados em um diretório chamado `jdk-25.interim.update.patch`.

  4. Exclua o arquivo `.tar.gz` se quiser economizar espaço em disco.

#### Instalando o Pacote JDK de 64 bits em Plataformas Linux Baseadas em Debian

Você pode instalar o pacote Debian do JDK para Linux de 64 bits a partir do arquivo (`.deb`).

Para instalar o pacote Debian do JDK de 64 bits em uma plataforma Linux:

  1. Baixe o arquivo necessário:

`jdk-25.interim.update.patch_linux-x64_bin.deb`. Por exemplo `jdk-25_linux-x64_bin.deb`

Antes de baixar um arquivo, você deve aceitar o acordo de licença. Qualquer pessoa (não apenas usuários root) pode instalar o arquivo de arquivo em qualquer local com acesso de escrita.

  2. Instale o pacote usando o seguinte comando:

`$ sudo dpkg -i jdk-25_linux-x64_bin.deb`

Os arquivos do Java Development Kit são instalados no diretório `/usr/lib/jvm/jdk-<VERSION>-oracle-<ARCH>`. Por exemplo, as releases do JDK 25 para x64 serão instaladas no diretório `/usr/lib/jvm/jdk-25-oracle-x64`.

  3. Exclua o arquivo `.deb` se quiser economizar espaço em disco.

#### Instalando o JDK de 64 bits em Plataformas Linux Baseadas em RPM

Você pode instalar o JDK em plataformas Linux de 64 bits baseadas em RPM, como Red Hat e SuSE, usando um arquivo de pacote RPM para download (`.rpm`) no local do sistema.

Nota:

Você também pode instalar o JDK usando um arquivo de pacote RPM para download em um sistema OL, mas a maneira preferida de instalar o JDK em sistemas OL é a partir dos repositórios Oracle Linux RPM.

Certifique-se de ter acesso de usuário root. Você pode fazer isso executando o comando `su` e digitando a senha de superusuário.

Para instalar o JDK de 64 bits em uma plataforma Linux baseada em RPM:

  1. Baixe o arquivo necessário:

     * Para sistemas x64: `jdk-25.interim.update.patch_linux-x64_bin.rpm`. Por exemplo, `jdk-25_linux-x64_bin.rpm`
     * Para sistemas aarch64 (ARM de 64 bits): `jdk-25.interim.update.patch_linux-aarch64_bin.rpm`. Por exemplo, `jdk-25_linux-aarch64_bin.rpm`

Antes de baixar um arquivo, você deve aceitar o acordo de licença.

  2. Instale o pacote necessário usando o seguinte comando:

`$ sudo rpm -ivh jdk-25_linux-x64_bin.rpm`

OU

`$ sudo rpm -ivh jdk-25_linux-aarch64_bin.rpm`

Atualize o pacote necessário usando o seguinte comando:

`$ sudo rpm -Uvh jdk-25_linux-x64_bin.rpm`

OU

`$ sudo rpm -Uvh jdk-25_linux-aarch64_bin.rpm`

Nota:

O JDK 25 pode coexistir com outras feature releases do JDK. Para cada release de versão, um diretório separado é criado, sendo o diretório padrão `/usr/lib/jvm/jdk-<VERSION>-oracle-<ARCH>`. Por exemplo, as releases do JDK 25 para x64 serão instaladas no diretório `/usr/lib/jvm/jdk-25-oracle-x64`.

  3. Exclua o arquivo `.rpm` se quiser economizar espaço em disco.

Não é necessário reiniciar.

##### Instalação da Chave Pública em Plataformas Linux Baseadas em RPM

A partir da versão 8 do JDK, os RPMs do JDK são assinados com chaves OL. RPMs instalados em distribuições Linux diferentes de OL podem exibir uma mensagem de aviso indicando que a validação de segurança do pacote falhou. Isso indica que a chave pública usada para assinar este RPM precisa ser instalada no sistema.

Uma mensagem de aviso de exemplo e as etapas de instalação da chave pública são as seguintes:

Mensagem de Aviso de Exemplo
```
    jdk-25_linux-aarch64_bin.rpm: Header V3 RSA/SHA256 Signature, key
            ID ec551f03: NOKEY
```

Etapas de Instalação

  1. Baixe o arquivo de chave de <https://yum.oracle.com/RPM-GPG-KEY-oracle-ol9> usando o seguinte comando:
`wget https://yum.oracle.com/RPM-GPG-KEY-oracle-ol9
```

  2. Instale a chave usando o seguinte comando:
`sudo rpm --import RPM-GPG-KEY-oracle-ol9
```

Nota:

A instalação da chave pública precisa ser feita apenas uma vez. A instalação da chave é persistente entre reinicializações.

#### Instalando o JDK de 64 bits em Plataformas Oracle Linux

Existem dois pacotes JDK RPM específicos para OL, `jdk-25-headless` e `jdk-25-headful`. Quando esses pacotes são instalados juntos, eles fornecem funcionalidade completa do JDK.

Instale o pacote `jdk-25-headless` se você precisar apenas do Java Runtime headless para executar aplicações sem GUI.

Instale o pacote `jdk-25-headful` se você precisar da funcionalidade completa do JDK para executar qualquer aplicação Java e para desenvolvimento.

Nota:

O pacote `jdk-25-headful` depende de `jdk-25-headless`, portanto, a instalação do pacote `jdk-25-headful` resultará na instalação automática de `jdk-25-headless`, caso ainda não esteja instalado.

Para instalar o JDK headless de 64 bits em uma plataforma Oracle Linux, use o comando `dnf` ou `yum`:

`sudo dnf install jdk-25-headless`

OU

`sudo yum install jdk-25-headless`

Para instalar o JDK headful de 64 bits em uma plataforma Oracle Linux, use o seguinte comando:

`sudo dnf install jdk-25-headful`

OU

`sudo yum install jdk-25-headful`