# Estrutura de Diretórios Instalados do JDK

## 7 Estrutura de Diretórios Instalados do JDK

A imagem de tempo de execução modular do JDK 25 contém as seguintes pastas:

Nota:

No macOS, o caminho de instalação do JDK é `/Library/Java/JavaVirtualMachines/jdk-interim.update.patch.jdk/Contents/Home`.

`/jdk-interim.update.patch.jdk`
    

O diretório raiz da instalação do software JDK. Este diretório também contém os arquivos Copyright, README e Release.

`/jdk-interim.update.patch.jdk/Contents/Home/`
    

O diretório raiz da instalação do software JDK no macOS.

`/jdk-interim.update.patch.jdk/bin`
    

Os executáveis e lançadores de linha de comando que são definidos pelos módulos vinculados à imagem.

`/jdk-interim.update.patch.jdk/conf`
    

Os arquivos `.properties`, `.policy` e outros arquivos de configuração destinados a serem editados por desenvolvedores, implantadores e usuários finais.

`/jdk-interim.update.patch.jdk/lib`
    

Os detalhes de implementação privada do sistema de tempo de execução. Esses arquivos não são destinados a uso externo e não devem ser modificados.

O diretório `lib` no macOS ou o diretório `lib/$ARCH` no Linux contém as bibliotecas nativas vinculadas dinamicamente do sistema de tempo de execução.

`/jdk-interim.update.patch.jdk/jmods`
    

As definições de módulo compiladas.

`/jdk-interim.update.patch.jdk/legal`
    

Os arquivos de direitos autorais e licença para cada módulo.

`/jdk-interim.update.patch.jdk/lib/src.zip`
    

O arquivo que contém o código-fonte para a plataforma Java.

`/jdk-interim.update.patch.jdk/include`
    

Os arquivos de cabeçalho da linguagem C que suportam a programação de código nativo com a Java Native Interface e a Java Virtual Machine (JVM) Debugger Interface.

Nota:

A instalação de uma versão de atualização do JDK substituirá a versão existente da mesma versão de recurso. Por exemplo, ao instalar o JDK 25.0.1 após instalar o JDK 25, o instalador desinstala o JDK 25 e instala o JDK 25.0.1. No entanto, você pode instalar o JDK 25 e o JDK 11 simultaneamente. No local de instalação do JDK, os diretórios `jdk-25` e `jdk-11` são criados.