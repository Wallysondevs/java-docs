# Seleção e Propriedades de Renderização do Pipeline Java 2D

## 12 Seleção e Propriedades de Renderização do Pipeline Java 2D

Java 2D fornece um conjunto de pipelines, que podem ser grosseiramente definidos como diferentes maneiras de renderizar primitivas gráficas para uma superfície de plataforma.

Como o JDK usa APIs específicas da plataforma para renderizar gráficos, os pipelines disponíveis variam de acordo com a plataforma.

Para selecionar um pipeline, use a seguinte opção de linha de comando:

`-Dsun.java2d.<pipeline_name>=True|true|false`

  * A variável `<pipeline_name>` é o nome do pipeline; veja as seções a seguir para possíveis nomes de pipeline.

  * O valor capitalizado `True` habilita o modo verboso que imprime uma mensagem indicando se o pipeline está habilitado ou não. Observe que o modo verboso não será habilitado se você selecionar dois pipelines (o que não é recomendado) e o escolhido não tiver sido habilitado com a opção verbosa.

  * O valor não capitalizado `true` seleciona o pipeline, mas não habilita o modo verboso.

  * O valor `false` significa que este pipeline não deve ser escolhido. No entanto, um pipeline deve estar sempre habilitado. Isso significa que se você especificar `false` para todos os pipelines, um pipeline será escolhido. Além disso, em algumas plataformas, alguns pipelines não podem ser "selecionados". Você pode desmarcar apenas outros pipelines.

Cada plataforma possui um pipeline padrão preferencial, que é selecionado automaticamente se puder ser habilitado. Caso contrário, um pipeline mais básico é selecionado, se existir. Se nenhum pipeline puder ser habilitado, nenhuma janela poderá ser criada; isso é chamado de modo headless. Observe que isso não deve acontecer em uma plataforma suportada, desde que o JDK esteja sendo executado em um ambiente com um display e tenha permissões para acessá-lo.

Tópicos

  * [Pipelines Linux](<#/doc/guides/troubleshoot/java-2d-pipeline-rendering-selection-and-properties>)
  * [Pipelines Windows](<#/doc/guides/troubleshoot/java-2d-pipeline-rendering-selection-and-properties>)
  * [Pipelines macOS](<#/doc/guides/troubleshoot/java-2d-pipeline-rendering-selection-and-properties>)
  * [Diagnóstico Multiplataforma do Pipeline Java 2D](<#/doc/guides/troubleshoot/java-2d-pipeline-rendering-selection-and-properties>)

### Pipelines Linux

Existem três pipelines disponíveis

  * `x11`: Este usa primitivas X11 centrais para renderização sempre que possível. No entanto, se a renderização anti-aliasing for necessária, a maior parte do desenho real é feita em um pixmap MIT-Shared Memory Extensions, que é então blitted (que é o processo de combinar bitmaps em um com uma função booleana) para a tela.
  * `xrender`: Uma extensão X11 que permite uma renderização muito mais direta na superfície X. Isso é melhor na maioria dos casos; em particular, melhora especialmente o desempenho da renderização anti-aliasing em displays X remotos.
  * `opengl`: Este usa o pipeline de função fixa OpenGL. Isso pode melhorar o desempenho se drivers acelerados estiverem disponíveis.

O pipeline padrão é `xrender`. Se todos os pipelines estiverem desabilitados, então `xrender` é selecionado. Se todos os pipelines estiverem habilitados, a ordem de preferência é a seguinte: `opengl`, `xrender` e depois `x11`.

### Pipelines Windows

Existem três pipelines disponíveis:

  * `gdi`: Este é essencialmente um pipeline somente de software que usa apenas o blitting de bitmap básico da interface de dispositivo gráfico (GDI) do Windows. Este pipeline é "sem nome", o que significa que não pode ser selecionado ou desmarcado usando seu nome.
  * `d3d`: O nome deste pipeline é uma abreviação de Direct3D. É preferido onde disponível; no entanto, está desabilitado em placas gráficas Intel devido a problemas de renderização. Além disso, este pipeline usa o Direct3D versão 9, que é uma versão relativamente antiga.
  * `opengl`: Este usa o pipeline de função fixa OpenGL. Este pipeline não é recomendado, exceto para ambientes de hardware e software completamente controlados, devido a artefatos de renderização causados por drivers OpenGL.

O pipeline padrão é `d3d`. Se todos os pipelines estiverem desabilitados, então `gdi` (o pipeline sem nome) é selecionado. Se todos os pipelines estiverem habilitados, a ordem de preferência é a seguinte: `opengl`, `d3d` e depois `gdi`.

Propriedades de Sistema Relacionadas aos Pipelines Windows

Para desabilitar o pipeline `d3d`, defina a propriedade de sistema `sun.java2d.d3d` como `false`, conforme descrito em [Propriedades Java 2D no Windows](<#/doc/guides/troubleshoot/java-2d-properties>):

`-Dsun.java2d.d3d=false`

Se você não puder definir propriedades de sistema na linha de comando, poderá desabilitar implicitamente o pipeline `d3d` definindo a variável de ambiente `J2D_D3D` como `false`. Observe que solicitar explicitamente o `d3d` nem sempre o habilitará se a placa gráfica detectada estiver em uma lista desabilitada. Para contornar isso e forçar a seleção do `d3d`, defina a variável de ambiente `J2D_D3D_NO_HWCHECK` como `true`. Observe que você pode encontrar artefatos de renderização neste caso.

### Pipelines macOS

Existem dois pipelines disponíveis:

  * `metal`: Este usa o substituto da Apple para OpenGL.
  * `opengl`: Este usa o pipeline de função fixa OpenGL.

O pipeline padrão é `metal`. Se todos os pipelines estiverem desabilitados, então `metal` é selecionado. Se todos os pipelines estiverem habilitados, a ordem de preferência é a seguinte: `metal` e depois `opengl`. Consequentemente, as duas opções de linha de comando a seguir selecionam o pipeline `opengl` no macOS:

  * `-Dsun.java2d.opengl=true`
  * `-Dsun.java2d.metal=false`

### Diagnóstico Multiplataforma do Pipeline Java 2D

Obtenha informações detalhadas sobre os procedimentos de inicialização dos pipelines acelerados (D3D, OpenGL e Metal) definindo um valor entre `1` e `5` para a variável de ambiente `J2D_TRACE_LEVEL`; um valor de `5` fornece as informações mais detalhadas. Este diagnóstico é apenas para o procedimento de inicialização.

### Pipeline OpenGL no Linux e Windows

O pipeline OpenGL está disponível no Linux e Windows.

Este pipeline alternativo usa a API OpenGL multiplataforma e acelerada por hardware ao renderizar para `VolatileImages`, para back buffers criados com a API `BufferStrategy` e para a tela.

Este pipeline pode oferecer grandes vantagens de desempenho sobre os pipelines padrão (X11 ou GDI/DirectDraw) para certas aplicações. Considere habilitar o pipeline para sua aplicação se ela fizer uso intenso de operações de renderização como composição alfa, antialiasing e transformações.

A seguir estão casos de uso para solucionar problemas no pipeline OpenGL.

  * [Habilitar Pipeline OpenGL](<#/doc/guides/troubleshoot/java-2d-pipeline-rendering-selection-and-properties>)

  * [Requisitos Mínimos](<#/doc/guides/troubleshoot/java-2d-pipeline-rendering-selection-and-properties>)

  * [Diagnosticar Problemas de Inicialização](<#/doc/guides/troubleshoot/java-2d-pipeline-rendering-selection-and-properties>)

  * [Diagnosticar Problemas de Renderização e Desempenho](<#/doc/guides/troubleshoot/java-2d-pipeline-rendering-selection-and-properties>)

  * [Drivers OpenGL Mais Recentes](<#/doc/guides/troubleshoot/java-2d-pipeline-rendering-selection-and-properties>)

#### Habilitar Pipeline OpenGL

O pipeline OpenGL está desabilitado por padrão.

Para tentar habilitar o pipeline OpenGL, forneça a seguinte opção para a JVM:

`-Dsun.java2d.opengl=True`

Para receber saída verbosa no console sobre se o pipeline OpenGL foi inicializado com sucesso para uma tela específica, defina a opção como `True` (observe o T maiúsculo).

#### Requisitos Mínimos

O pipeline OpenGL não será habilitado se o hardware ou os drivers não atenderem aos requisitos mínimos.

Se um dos seguintes requisitos não for atendido, o Java 2D retornará e usará o pipeline padrão (X11 no Linux ou GDI/DirectDraw no Windows), o que significa que sua aplicação continuará a funcionar corretamente, mas sem a aceleração OpenGL.

Os requisitos mínimos para o sistema operacional Linux são os seguintes:

  * Bibliotecas OpenGL/GLX aceleradas por hardware instaladas e configuradas corretamente

  * OpenGL version 1.2 or higher

  * GLX version 1.3 or higher

  * Pelo menos um visual TrueColor com um depth buffer disponível

Os requisitos mínimos para o sistema operacional Windows são os seguintes:

  * Drivers acelerados por hardware que suportam as extensões `WGL_ARB_pbuffer`, `WGL_ARB_render_texture` e `WGL_ARB_pixel_format`

  * OpenGL version 1.2 or higher

  * Pelo menos um formato de pixel com um depth buffer disponível

#### Diagnosticar Problemas de Inicialização

Você pode obter informações detalhadas sobre os procedimentos de inicialização do pipeline Java 2D baseado em OpenGL usando a variável de ambiente `J2D_TRACE_LEVEL`.

Como mencionado anteriormente, o pipeline OpenGL pode não ser habilitado em certas máquinas por várias razões. Por exemplo, os drivers podem não estar instalados corretamente e podem reportar um número de versão insuficiente. Alternativamente, sua máquina pode ter uma placa gráfica mais antiga que não suporta a versão ou extensões OpenGL apropriadas.

Você pode obter informações detalhadas sobre os procedimentos de inicialização do pipeline Java 2D baseado em OpenGL usando a variável de ambiente `J2D_TRACE_LEVEL`, conforme mostrado nos exemplos a seguir.

Defina a variável de ambiente `J2D_TRACE_LEVEL` no Windows.
```
    # set J2D_TRACE_LEVEL=4
    # java -Dsun.java2d.opengl=True YourApp
```

Defina a variável de ambiente `J2D_TRACE_LEVEL` no Linux.
```
    # export J2D_TRACE_LEVEL=4
    # java -Dsun.java2d.opengl=True YourApp
```

A saída será diferente dependendo da sua plataforma e do hardware gráfico instalado, mas pode fornecer algumas informações sobre as razões pelas quais o pipeline OpenGL não está sendo habilitado com sucesso para sua configuração.

Nota:

Esta saída é especialmente útil ao registrar relatórios de bugs destinados à equipe Java 2D.

#### Diagnosticar Problemas de Renderização e Desempenho

Como o pipeline OpenGL depende tanto do hardware gráfico e dos drivers subjacentes, às vezes pode ser difícil determinar se os problemas de renderização ou desempenho estão sendo causados pelo Java 2D ou pelos drivers OpenGL.

A extensão `GL_EXT_framebuffer_object` oferece melhor desempenho para renderização e consumo reduzido de VRAM ao usar `VolatileImages`. Este caminho de código "FBO" é habilitado por padrão quando o pipeline OpenGL está habilitado, mas somente se seu hardware gráfico e driver suportarem esta extensão OpenGL. Esta extensão está geralmente disponível nas séries Nvidia GeForce/Quadro FX e posteriores, e nas ATI Radeon 9500 e posteriores. Se você suspeitar que o caminho de código "FBO" está causando problemas em sua aplicação, você pode desabilitá-lo definindo a seguinte propriedade de sistema:

`-Dsun.java2d.opengl.fbobject=false`

Definir esta propriedade fará com que o Java 2D retorne ao caminho de código mais antigo baseado em `pbuffer`.

Se você descobrir que uma determinada operação Java 2D causa resultados visuais diferentes com o pipeline OpenGL habilitado do que sem ele, isso provavelmente indica um bug no driver gráfico. Da mesma forma, se o desempenho da renderização Java 2D for significativamente pior com o pipeline OpenGL habilitado do que sem ele, é muito provável que seja causado por um problema de driver ou hardware.

Em ambos os casos, registre um relatório de bug detalhado através dos canais normais de relatório de bugs. Consulte [Enviar um Relatório de Bug](<#/doc/guides/troubleshoot/submit-bug-report>). Ao registrar relatórios de bugs, seja o mais detalhado possível e inclua as seguintes informações:

  * Sistema operacional (por exemplo, Ubuntu Linux 6.06, Windows XP SP2)
  * Nome do fabricante do hardware gráfico e dispositivo (por exemplo, Nvidia GeForce 2 MX 440)
  * Versão exata do driver (por exemplo, ATI Catalyst 6.8, Nvidia 91.33)
  * Saída quando `J2D_TRACE_LEVEL=4` é especificado na linha de comando (conforme descrito na seção anterior)
  * A saída do comando `glxinfo` se você estiver no Linux

#### Drivers OpenGL Mais Recentes

Como o pipeline OpenGL depende muito da API OpenGL e do hardware gráfico e drivers subjacentes, é muito importante garantir que você tenha os drivers gráficos mais recentes instalados em sua máquina. Os drivers podem ser baixados do site do fabricante da sua placa gráfica, conforme mostrado na tabela a seguir.

Fabricante | Plataformas | Placas Conhecidas por Funcionar
---|---|---
[AMD/ATI](<https://www.amd.com/en/support>) | Linux, Windows | Radeon 8500 and later, FireGL series
[Nvidia](<http://nvidia.com>) | Linux, Windows | GeForce 2 series and later, Quadro FX series and later
[Xi Graphics](<http://xig.com>) | Linux | Várias (verifique com a Xi Graphics)