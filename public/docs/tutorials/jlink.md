# Criando Imagens de Runtime e de Aplicação com JLink

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > Criando Imagens de Runtime e de Aplicação com JLink

# Criando Imagens de Runtime e de Aplicação com JLink

Com a ferramenta de linha de comando `jlink`, você pode selecionar vários [módulos](<#/doc/tutorials/modules/intro>), módulos de plataforma, bem como aqueles que compõem sua aplicação, e vinculá-los em uma imagem de runtime. Tal imagem de runtime age como o JDK [que você pode baixar](</download>), mas contém apenas os módulos que você escolheu e as dependências de que eles precisam para funcionar. Se estes incluírem seu projeto, o resultado é um entregável autocontido de sua aplicação, o que significa que ele não depende de um JDK estar instalado no sistema de destino. Durante a fase de vinculação, o `jlink` pode otimizar ainda mais o tamanho da imagem e melhorar o desempenho da VM, particularmente o tempo de inicialização.

Embora não importe muito para o `jlink`, é útil distinguir entre a criação de _imagens de runtime_, um subconjunto do JDK, e _imagens de aplicação_, que também contêm módulos específicos do projeto, então seguiremos essa ordem.

**Nota:** `jlink` "apenas" vincula bytecode - ele _não_ o compila para código de máquina, então esta não é uma compilação ahead-of-time.

## Criando Imagens de Runtime

Para criar uma imagem, o `jlink` precisa de duas informações, cada uma especificada com uma opção de linha de comando:

  * quais módulos iniciar / `--add-modules`
  * em qual pasta criar a imagem / `--output`

Dadas essas opções de linha de comando, o `jlink` [resolve módulos](<#/doc/tutorials/modules/intro>), começando pelos listados com `--add-modules`. Mas ele tem algumas peculiaridades:

  * [serviços](<#/doc/tutorials/modules/services>) não são vinculados por padrão - veremos mais abaixo o que fazer a respeito
  * [dependências opcionais](<#/doc/tutorials/modules/optional-dependencies>) não são resolvidas - elas precisam ser adicionadas manualmente
  * [módulos automáticos](<#/doc/tutorials/modules/automatic-module>) não são permitidos - discutiremos isso quando chegarmos às imagens de aplicação

A menos que problemas como módulos ausentes ou duplicados sejam encontrados, os módulos resolvidos (módulos raiz mais dependências transitivas) acabam na nova imagem de runtime.

### O Runtime Mais Pequeno

Vamos dar uma olhada nisso. A imagem de runtime mais simples possível contém apenas o módulo base:

```
jlink --add-modules java.base --output runtime-image
```

## Criando Imagens de Aplicação

Como mencionado anteriormente, o `jlink` não distingue entre módulos do JDK e outros, então você pode usar uma abordagem semelhante para criar uma imagem contendo uma aplicação inteira, o que significa que ela contém módulos de aplicação (o próprio aplicativo mais suas dependências) e os módulos de plataforma necessários para suportá-los. Para criar tal imagem, você precisa:

  * usar `--module-path` para informar ao `jlink` onde encontrar os módulos da aplicação
  * usar `--add-modules` com o módulo principal da aplicação e outros conforme necessário, por exemplo, serviços (veja abaixo) ou dependências opcionais

Juntos, os módulos de plataforma e de aplicação que a imagem contém são conhecidos como _módulos de sistema_. Observe que o `jlink` opera apenas em módulos explícitos, então uma aplicação que depende de [módulos automáticos](<#/doc/tutorials/modules/automatic-module>) não pode ser vinculada a uma imagem.

### O Caminho de Módulo Opcional

Como exemplo, vamos assumir que os módulos da aplicação podem ser encontrados em uma pasta `mods` e seu módulo principal é chamado `com.example.app`. Então o seguinte comando cria uma imagem na pasta `app-image`:

```
jlink --module-path mods --add-modules com.example.app --output app-image
```

Como a imagem contém a aplicação inteira, você não precisa usar o module path ao iniciá-la:

```
app-image/bin/java --module com.example.app
```

Embora você não precise usar o module path, você pode. Nesse caso, os módulos do sistema sempre sombrearão módulos com o mesmo nome no module path - será como se aqueles no module path não existissem. Assim, você não pode usar o module path para substituir módulos do sistema, mas pode adicionar módulos adicionais à aplicação. Provavelmente, serão provedores de serviço, o que permite que você distribua uma imagem com sua aplicação, permitindo que os usuários a estendam facilmente localmente.

### Gerando um Launcher Nativo

Módulos de aplicação podem incluir um launcher personalizado, que é um script executável (shell em sistemas operacionais baseados em Unix, batch no Windows) na pasta `bin` da imagem, pré-configurado para iniciar a JVM com um módulo e uma classe principal concretos. Para criar um launcher, use a opção `--launcher $NAME=$MODULE/$MAIN-CLASS`:

  * `$NAME` é o nome do arquivo que você escolhe para o executável
  * `$MODULE` é o nome do módulo a ser iniciado
  * `$MAIN-CLASS` é o nome da classe principal do módulo

Os dois últimos são o que você normalmente colocaria após `java --module`. E, assim como lá, se o módulo definir uma classe principal, você pode omitir `/$MAIN-CLASS`.

Expandindo o exemplo acima, é assim que se cria um launcher chamado `app`:

```
jlink --module-path mods --add-modules com.example.app --output app-image --launcher app=com.example.app
```

Usar um launcher, no entanto, tem uma desvantagem: todas as opções que você tentar aplicar à JVM de inicialização serão interpretadas como se você as tivesse colocado após a opção `--module`, tornando-as argumentos de programa. Isso significa que, ao usar um launcher, você não pode configurar o comando `java` ad-hoc, por exemplo, para adicionar serviços adicionais como discutimos anteriormente. Uma maneira de contornar isso é editar o script e colocar tais opções na variável de ambiente `JLINK_VM_OPTIONS`. Outra é recorrer ao próprio comando `java`, que ainda está disponível na imagem.

## Incluindo Serviços

Para permitir a criação de imagens de runtime pequenas e deliberadamente montadas, o `jlink`, por padrão, não realiza [vinculação de serviço](<#/doc/tutorials/modules/services>) ao criar uma imagem. Em vez disso, os módulos provedores de serviço devem ser incluídos manualmente, listando-os em `--add-modules`. Para descobrir quais módulos fornecem um serviço específico, use a opção `--suggest-providers $SERVICE`, que lista todos os módulos no runtime ou no module path que fornecem uma implementação de `$SERVICE`. Como alternativa à adição de serviços individuais, a opção `--bind-services` pode ser usada para incluir todos os módulos que fornecem um serviço que é usado por outro módulo resolvido.

Vamos pegar charsets como ISO-8859-1, UTF-8 ou UTF-16 como exemplo. O módulo base conhece os que você precisa diariamente, mas há um módulo de plataforma específico que contém alguns outros: _jdk.charsets_. O módulo base e _jdk.charsets_ são desacoplados via serviços - aqui estão as partes relevantes de suas declarações de módulo:

```java
module java.base {
    uses java.nio.charset.Charset;
    // ...
}
module jdk.charsets {
    provides java.nio.charset.Charset with
        sun.nio.cs.ext.ExtendedCharsets.ISO2022_JP,
        sun.nio.cs.ext.ExtendedCharsets.JIS_X_0201,
        // ...
        sun.nio.cs.UTF_32.LittleEndian;
    // ...
}
```

Quando o sistema de módulos resolve módulos durante uma inicialização regular, a vinculação de serviço incluirá _jdk.charsets_ e, assim, seus charsets estarão sempre disponíveis ao iniciar a partir de um JDK padrão. Mas ao criar uma imagem de runtime com `jlink`, isso não acontece por padrão, então tais imagens não conterão o módulo de charsets. Se você determinou que precisa deles, pode simplesmente incluir o módulo na imagem com `--add-modules`:

```
jlink --add-modules java.base,jdk.charsets --output runtime-image
```

## Gerando Imagens Entre Sistemas Operacionais

Embora o bytecode que sua aplicação e JARs de biblioteca contêm seja independente de qualquer sistema operacional (SO), ele precisa de uma Java Virtual Machine específica do SO para executá-los - é por isso que você baixa JDKs especificamente para Linux, macOS ou Windows (por exemplo). E como é daí que o `jlink` extrai os módulos de plataforma, as imagens de runtime e de aplicação que ele cria estão sempre vinculadas a um sistema operacional concreto. Felizmente, não precisa ser o sistema operacional no qual você está executando o `jlink`.

Se você baixar e descompactar um JDK para um sistema operacional diferente, poderá colocar sua pasta `jmods` no module path ao executar a versão do `jlink` do JDK do seu sistema. O linker então determinará que a imagem deve ser criada para aquele outro SO e, portanto, criará uma que funcione nele (mas, é claro, não em outro). Assim, dados os JDKs para todos os sistemas operacionais que sua aplicação suporta, você pode gerar imagens de runtime ou de aplicação para cada um deles na mesma máquina. Para que isso funcione sem problemas, é recomendado referenciar módulos apenas da mesma versão exata do JDK que o binário `jlink`, então, por exemplo, se o `jlink` tiver a versão 16.0.2, certifique-se de que ele carregue módulos de plataforma do JDK 16.0.2.

Vamos voltar à imagem de aplicação que criamos anteriormente e assumir que ela é construída em um servidor de compilação Linux. Então, é assim que se cria uma imagem de aplicação para Windows:

```
jlink --module-path mods;path/to/windows-jdk-16.0.2/jmods --add-modules com.example.app --output app-image-windows
```

Para verificar se esta imagem é específica para Windows, verifique `app-image/bin`, que contém um `java.exe`.

## Otimizando a Imagem

Depois de aprender como gerar uma imagem para ou com sua aplicação, você pode otimizá-la. A maioria das otimizações reduz o tamanho da imagem e algumas melhoram um pouco os tempos de inicialização. Consulte [a referência do `jlink`](<#/doc/tutorials/jvm/tools/core/jlink>) para uma lista completa de opções com as quais você pode experimentar. Quaisquer que sejam as opções que você aplicar, não se esqueça de testar minuciosamente a imagem resultante e medir as melhorias reais.

### Neste tutorial

Criando Imagens de Runtime
Criando Imagens de Aplicação
Incluindo Serviços
Gerando Imagens Entre Sistemas Operacionais
Otimizando a Imagem

Última revisão: 3 de novembro de 2021

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > Criando Imagens de Runtime e de Aplicação com JLink

[Voltar para a Lista de Tutoriais](<#/doc/tutorials/learn>)