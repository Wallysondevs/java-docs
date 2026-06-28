# Empacotamento Básico

## 2 Empacotamento Básico

Se sua aplicação não requer customizações ou suporte para funcionalidades como múltiplos inicializadores ou associações de arquivo, então apenas algumas opções são necessárias para o empacotamento.

A forma mais simples de empacotamento requer a localização da aplicação a ser empacotada e o nome do JAR ou módulo que contém a classe principal.

  * O exemplo a seguir empacota uma aplicação não modular:
`jpackage --input app-directory --main-jar jar-file [--main-class main-class]
```

`app-directory` é o nome do diretório que contém os arquivos da sua aplicação. O caminho pode ser absoluto ou relativo ao diretório atual. `jar-file` é o nome do arquivo JAR que contém a classe principal para a aplicação. `main-class` é o nome da classe principal e é exigido apenas se a classe principal não for identificada no arquivo `MANIFEST.MF`. Padrões da ferramenta e da plataforma são usados conforme necessário para completar o pacote.

  * O exemplo a seguir empacota uma aplicação modular:
`jpackage --module-path module-path --module main-module[/class]
```

`module-path` é o caminho para um diretório de módulos ou para um arquivo JAR modular. O caminho pode ser absoluto ou relativo ao diretório atual. Para mais de um caminho, separe os caminhos com dois pontos (:) no Linux e macOS ou um ponto e vírgula (;) no Windows, ou use múltiplas instâncias da opção `--module-path`. `main-module/class` é o nome do módulo que contém a classe principal e o nome da classe principal para a aplicação. O nome da classe principal é exigido apenas se o módulo principal não identificar a classe principal. Padrões da ferramenta e da plataforma são usados conforme necessário para completar o pacote.

Tópicos:

  * [Padrões para Opções Não Especificadas](<#/doc/guides/jpackage/basic-packaging>)

  * [Empacotar uma Aplicação Não Modular](<#/doc/guides/jpackage/basic-packaging>)

  * [Empacotar uma Aplicação Modular](<#/doc/guides/jpackage/basic-packaging>)

  * [Identificar Sua Aplicação com Metadados do Pacote](<#/doc/guides/jpackage/basic-packaging>)

### Padrões para Opções Não Especificadas

Opções estão disponíveis para controlar o nome da aplicação, o tipo de pacote criado, o local de instalação e outras características do pacote. Se uma opção não for fornecida, um valor padrão é usado.

Os seguintes padrões se aplicam às opções que não são especificadas ao executar `jpackage`:

  * O tipo de pacote é dependente da plataforma:

    * No Linux, o padrão é `deb` para Debian Linux e `rpm` para outras versões do Linux.
    * No macOS, o padrão é `dmg`.
    * No Windows, o padrão é `exe`.

Para gerar um tipo diferente de pacote, use a opção `--type`.

  * O pacote gerado é gravado no diretório de trabalho atual. Para gravar o pacote em um local diferente, use a opção `--dest`.

  * O nome do pacote é gerado a partir do nome da aplicação e da versão da aplicação. Se nenhum nome de aplicação for fornecido, o nome do JAR ou módulo principal é usado, seguido pela versão, que por padrão é 1.0, por exemplo `HelloWorld-1.0.exe`. Para alterar o nome da aplicação, use a opção `--name`. Para alterar a versão, use a opção `--app-version`.

  * O runtime Java é gerado durante o processo de empacotamento usando o comando `jlink`. As opções `--add-modules` e `--jlink-options` podem ser usadas para adicionar itens ao runtime como parte do processo de empacotamento. Para empacotar um runtime customizado, use a opção `--runtime-image`.

  * O diretório de instalação é específico da plataforma:
    * No Linux, o padrão é `/opt/application-name`
    * No macOS, o padrão é `/Applications/application-name`
    * No Windows, o padrão é `c:\Program Files\application-name`; se a opção `--win-per-user-install` for usada, o padrão é `C:\Users\user-name\AppData\Local\application-name`

O nome do diretório da aplicação assume o nome da aplicação por padrão. Para dar um nome diferente ao diretório, use a opção `--install-dir`.

  * O nome do inicializador da aplicação assume o nome da aplicação por padrão. Se sua aplicação tiver mais de um inicializador, use a opção `--add-launcher` para identificá-los.

  * Nenhum argumento de linha de comando padrão ou opções de runtime Java são passados para a aplicação quando ela é iniciada. O usuário pode passar argumentos da aplicação pela linha de comando ao iniciar a aplicação, mas não opções de runtime Java.

  * Um ícone padrão para a aplicação é usado. Para um ícone diferente, use a opção `--icon`.

  * Para Linux, o nome do pacote assume o nome da aplicação por padrão. Para dar um nome diferente ao pacote, use a opção `--linux-package-name`.

  * Para macOS:

    * O identificador da aplicação assume o nome da classe principal por padrão. Para usar um identificador diferente, use a opção `--mac-package-identifier`.

    * O nome da aplicação exibido na barra de menu assume o nome da classe principal da aplicação por padrão. Para usar um nome diferente, use a opção `--mac-package-name`.

### Empacotar uma Aplicação Não Modular

Um pacote de aplicação não modular pode ser empacotado fornecendo apenas a localização dos arquivos a serem empacotados e o nome do arquivo JAR principal. Padrões são usados para outras opções que descrevem o pacote e a aplicação.

O comando a seguir, quando executado em um sistema Windows, empacota a aplicação não modular no diretório `mySamples\hwapp` com a classe principal no arquivo `HelloWorld.jar`.
```
    jpackage --input mySamples\hwapp --main-jar HelloWorld.jar
```

Como nenhuma outra opção é usada, os seguintes padrões são aplicados:

  * O tipo de pacote padrão gerado é `exe`.

  * O nome do pacote gerado é `HelloWorld-1.0.exe`.

  * O pacote é gravado no diretório atual.

  * O runtime empacotado com a aplicação é gerado como parte do processo de empacotamento.

  * A aplicação é instalada no diretório `c:\Program Files\HelloWorld`.

  * O nome do inicializador é `HelloWorld.exe`.

  * O ícone padrão é usado para a aplicação.

  * Nenhum atalho é criado, e a aplicação não é adicionada a nenhum menu. O usuário deve ir ao diretório onde a aplicação está instalada para executá-la.

  * Nenhum argumento padrão ou opções de runtime Java são passados para a aplicação quando ela é iniciada.

### Empacotar uma Aplicação Modular

Um pacote de aplicação modular pode ser empacotado fornecendo apenas a localização dos módulos a serem empacotados e o nome do módulo principal. Padrões são usados para outras opções que descrevem o pacote e a aplicação.

O comando a seguir, quando executado em um sistema Debian Linux, empacota a aplicação modular no diretório `myModApps` com a classe principal no módulo `modhw/modhw.HelloWorldMod`
```
    jpackage --module-path myModApps --module modhw/modhw.HelloWorldMod
```

Como nenhuma outra opção é usada, os seguintes padrões são aplicados:

  * O tipo de pacote padrão gerado é `deb` para sistemas Debian

  * O nome do pacote gerado é `HelloWorldMod-1.0.deb`.

  * O pacote é gravado no diretório atual.

  * O runtime empacotado com a aplicação é gerado como parte do processo de empacotamento.

  * A aplicação é instalada no diretório `/opt/HelloWorldMod`.

  * O nome do inicializador é `HelloWorldMod`.

  * O ícone padrão é usado para a aplicação.

  * Nenhum atalho é criado, e a aplicação não é adicionada a nenhum menu. O usuário deve ir ao diretório onde a aplicação está instalada para executá-la.

  * Nenhum argumento padrão ou opções de runtime Java são passados para a aplicação quando ela é iniciada.

### Identifique Sua Aplicação com Metadados do Pacote

Ao criar o pacote, você pode querer fornecer informações sobre a aplicação, como uma descrição, o nome do fornecedor ou talvez uma declaração de direitos autorais.

Para adicionar informações sobre sua aplicação ao pacote, use as opções `jpackage` relevantes para definir os metadados do pacote. Os exemplos a seguir são para um sistema Windows.

  * Defina o nome da aplicação.

Use a opção `--name` para dar à aplicação o nome que você deseja que os usuários vejam. Se nenhum nome for fornecido, ele assume o nome do arquivo JAR ou módulo principal por padrão.

O comando a seguir cria um pacote para a aplicação Dynamic Tree nomeado `DynamicTreeDemo-1.0.exe`:
`jpackage --name DynamicTreeDemo --input myApps \
           --main-jar DynamicTree.jar
```

  * Defina a versão da aplicação.

Use a opção `--app-version` para identificar a versão da sua aplicação. Se nenhuma versão da aplicação for especificada, a versão assume 1.0 por padrão.

O comando a seguir customiza a parte da versão do nome do pacote e cria o pacote `DynamicTreeDemo-2.0.exe`:
`jpackage --name DynamicTreeDemo --app-version 2.0 \
           --input myApps --main-jar DynamicTree.jar
```

  * Descreva a aplicação.

Use a opção `--description` para incluir uma breve descrição da sua aplicação. Nenhuma descrição padrão é fornecida.

O comando a seguir descreve a aplicação Dynamic Tree para os usuários; observe que as aspas são necessárias se a descrição incluir espaços:
`jpackage --dest packages --name DynamicTreeDemo \
           --app-version 2.0 --input myApps --main-jar DynamicTree.jar \
           --description "Demo application for testing functionality"
```

  * Defina o fornecedor da aplicação.

Use a opção `--vendor` para identificar você ou sua empresa como o criador da sua aplicação. Nenhum fornecedor padrão é fornecido.

O comando a seguir identifica o fornecedor da aplicação Dynamic Tree como Small, Inc; observe que as aspas são necessárias se o nome do fornecedor incluir espaços:
`jpackage --dest packages --name DynamicTreeDemo \
           --app-version 2.0 --input myApps --main-jar DynamicTree.jar \
           --description "Demo application for testing functionality" \
           --vendor "Small, Inc"
```

  * Defina os direitos autorais da aplicação.

Use a opção `--copyright` para fornecer direitos autorais para sua aplicação. Nenhum direito autoral padrão é fornecido.

O comando a seguir fornece um exemplo de declaração de direitos autorais para a aplicação Dynamic Tree; observe que as aspas são necessárias se os direitos autorais incluírem espaços:
`jpackage --dest packages --name DynamicTreeDemo \
           --app-version 2.0 --input myApps --main-jar DynamicTree.jar \
           --description "Demo application for testing functionality" \
           --vendor "Small, Inc" --copyright "Copyright 2020, All rights reserved"
```