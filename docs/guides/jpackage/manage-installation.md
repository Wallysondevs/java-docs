# Gerenciar a Instalação da Sua Aplicação

## 4 Gerenciar a Instalação da Sua Aplicação

Você tem algum controle sobre como sua aplicação é instalada e iniciada no sistema do usuário. Usando as opções fornecidas pela ferramenta de empacotamento, você pode especificar coisas como a licença a ser aceita, onde instalar a aplicação e se um console é necessário.

Tópicos:

  * [Incluir uma Licença](<#/doc/guides/jpackage/manage-installation>)

  * [Definir o Diretório de Instalação](<#/doc/guides/jpackage/manage-installation>)

  * [Criar um Atalho](<#/doc/guides/jpackage/manage-installation>)

  * [Adicionar a Aplicação a um Menu](<#/doc/guides/jpackage/manage-installation>)

  * [Iniciar no Console](<#/doc/guides/jpackage/manage-installation>)

### Incluir uma Licença

Se você tem termos e condições que deseja que os usuários aceitem para instalar sua aplicação no Windows ou macOS, use a opção `--license-file` ao empacotar sua aplicação.

Se o diretório que contém sua aplicação também inclui um arquivo de licença, esse arquivo é instalado na máquina do usuário junto com a aplicação. Se você deseja exigir que o usuário aceite a licença antes de instalar no Windows ou macOS, use a opção `--license-file`. Esteja ciente de que, se você fornecer um arquivo de licença que não esteja no diretório da aplicação, a licença será mostrada ao usuário durante a instalação, mas o arquivo não será instalado com a aplicação. Além disso, para instalações silenciosas e outros tipos de instalações, o arquivo de licença não é exibido.

O comando a seguir adiciona o arquivo de licença `myApps/myLicense.txt` ao pacote para a aplicação Dynamic Tree.
```
    jpackage --type exe --name DynamicTreeDemo --input myApps \
       --main-jar DynamicTree.jar --license-file myApps/myLicense.txt
```

### Criar um Atalho

Para que um atalho seja criado quando os usuários instalarem sua aplicação, use a opção `--linux-shortcut` ou `--win-shortcut` ao empacotar sua aplicação. Para mostrar um ícone personalizado para sua aplicação, use a opção `--icon`.

Atalhos são suportados para plataformas Linux e Windows. Se você não fornecer um ícone, um ícone padrão será usado. Se você fornecer um ícone personalizado no Linux, um atalho será criado automaticamente e a opção `--linux-shortcut` não será necessária. Ícones personalizados devem estar em um formato que atenda aos requisitos da plataforma.

O comando a seguir cria um atalho com o ícone padrão para a aplicação Dynamic Tree quando ela é instalada no Linux.
```
    jpackage --name DynamicTreeDemo --input myApps --main-jar DynamicTree.jar \
       --linux-shortcut
```

O comando a seguir cria um atalho na área de trabalho com um ícone personalizado para a aplicação Dynamic Tree quando ela é instalada no Windows.
```
    jpackage --name DynamicTreeDemo --input myApps --main-jar DynamicTree.jar \
       --icon DTDemo.ico --win-shortcut
```

### Definir o Diretório de Instalação

Se você deseja que o nome do diretório de instalação seja diferente do nome do pacote, use a opção `--install-dir`. No Windows, você pode permitir que o usuário escolha onde instalar sua aplicação usando a opção `--win-dir-chooser`.

Sua aplicação é instalada no diretório de instalação padrão específico da plataforma, descrito em [Padrões para Opções Não Especificadas](<#/doc/guides/jpackage/basic-packaging>). O nome do diretório para a aplicação assume o nome do pacote por padrão, mas isso pode ser alterado com a opção `--install-dir` ao empacotar a aplicação.

No Windows, você também tem a opção de permitir que o usuário escolha o local de instalação. A caixa de diálogo exibida assume por padrão um diretório com o nome do pacote.

O comando a seguir instala a aplicação Dynamic Tree em `c:\Program Files\DTDemo` em vez de `c:\Program Files\DynamicTreeDemo`.
```
    jpackage --type exe --name DynamicTreeDemo --input myApps \
       --main-jar DynamicTree.jar --install-dir DTDemo
```

O comando a seguir permite que o usuário escolha o diretório onde a aplicação será instalada.
```
    jpackage --type exe --name DynamicTreeDemo --input myApps \
       --main-jar DynamicTree.jar --win-dir-chooser
```

### Adicionar a Aplicação a um Menu

Para permitir que os usuários acessem sua aplicação a partir de um menu, use a opção `--linux-menu-group`, ou as opções `--win-menu` e `--win-menu-group` ao empacotar sua aplicação.

Na plataforma Linux, se a opção `--linux-menu-group` não for usada, sua aplicação é adicionada ao grupo "Unknown" em um menu específico do gerenciador de janelas em uso.

Na plataforma Windows, você pode ter sua aplicação adicionada ao menu Iniciar no grupo de sua escolha. Se o grupo não existir, ele é criado. Se você não fornecer um nome de grupo, a aplicação é adicionada ao grupo "Unknown". A opção `--win-menu-group` só faz sentido se a opção `--win-menu` for usada.

O comando a seguir adiciona a aplicação Dynamic Tree ao menu Iniciar do Windows no grupo "Small, Inc". Aspas são necessárias apenas se o nome incluir espaços.
```
    jpackage --type exe --name DynamicTreeDemo --input myApps \
       --main-jar DynamicTree.jar --win-menu --win-menu-group "Small, Inc"
```

No macOS, a aplicação é exibida na barra de menu. O nome exibido assume por padrão o nome do pacote. O comando a seguir usa a opção `--mac-package-name` para exibir DTDemo na barra de menu.
```
    jpackage --name DynamicTreeDemo --input myApps --main-jar DynamicTree.jar \
       --mac-package-name DTDemo
```

### Iniciar no Console

Se sua aplicação é executada a partir da linha de comando ou requer interação com o console, use a opção `--win-console` para informar ao Windows para iniciar a aplicação em uma janela de console.

O comando a seguir informa ao Windows para iniciar a aplicação Hello World com uma janela de console.
```
    jpackage --input mySamples\hwapp --main-jar HelloWorld.jar --win-console
```