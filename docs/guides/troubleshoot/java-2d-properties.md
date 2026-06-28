# Propriedades Java 2D

## B Propriedades Java 2D

Este apêndice apresenta propriedades que podem ser úteis na solução de problemas do Java 2D.

Este apêndice contém as seguintes seções:

  * [Propriedades Java 2D Comuns a Todas as Plataformas](<#/doc/guides/troubleshoot/java-2d-properties>)
  * [Propriedades Java 2D no Linux](<#/doc/guides/troubleshoot/java-2d-properties>)

  * [Propriedades Java 2D no Windows](<#/doc/guides/troubleshoot/java-2d-properties>)

  * [Propriedades Java 2D no macOS](<#/doc/guides/troubleshoot/java-2d-properties>)

### Propriedades Java 2D Comuns a Todas as Plataformas

Em telas de alta DPI, a API Java 2D escala automaticamente para corresponder à tela da seguinte forma:

  * Windows: Todo o dimensionamento das janelas é aplicado exatamente.
  * Linux (X11): O dimensionamento é aplicado apenas se a escala da área de trabalho for 2 ou maior, arredondado para baixo.
  * macOS: O dimensionamento é aplicado se o macOS detectar que uma tela Retina está em uso (escala de 2×) arredondado para baixo; observe que no macOS, o dimensionamento afeta apenas o buffer off-screen.

Os tamanhos físicos das janelas (em polegadas e centímetros do mundo real) não são afetados.

Para desabilitar o dimensionamento de alta DPI, especifique a seguinte propriedade:

`-Dsun.java2d.uiScale.enabled=false`

Alternativamente, especifique o fator de dimensionamento (que está sujeito a limitações da plataforma):

`-Dsun.java2d.uiScale=1.0`

Você pode especificar o fator de dimensionamento com uma variável de ambiente; por exemplo, o seguinte define um fator de dimensionamento de 2:

`J2D_UISCALE=2.0`

### Propriedades Java 2D no Linux

A seguir, são listadas algumas propriedades úteis do Java 2D no Linux.

Nota:

Os valores padrão para as propriedades Java 2D no Linux geralmente resultam no melhor desempenho. Altere-os apenas se necessário.

O pipeline Xrender é o pipeline padrão para Linux. Altere este padrão da seguinte forma:

  * `-Dsun.java2d.xrender=false` - desabilita o pipeline Xrender e retorna ao pipeline X11 básico
  * `-Dsun.java2d.opengl=true` - tenta habilitar o pipeline OpenGL

Por padrão, ao usar um pipeline baseado em X11, a Extensão de Memória Compartilhada MIT (MIT-SHM) é usada se disponível. Para não usar MIT-SHM, defina a seguinte variável de ambiente da seguinte forma:

`set NO_J2D_MITSHM=true`

Para desabilitar pixmaps off-screen em uma exibição remota X11, especifique a seguinte propriedade:

`-Dsun.java2d.pmoffscreen=false`

Nota:

Isso era importante ao usar X11 como pipeline; no entanto, como o Xrender (o pipeline padrão) pode compor para um pixmap remoto, isso provavelmente não é necessário para a maioria das aplicações e pode até ser inútil.

Controle o uso de pixmaps compartilhados e de servidor especificando o valor da variável de ambiente `J2D_PIXMAPS` da seguinte forma:

  * `J2D_PIXMAPS unset` - usa ambos os tipos conforme apropriado
  * `J2D_PIXMAPS=shared` - usa apenas pixmaps de memória compartilhada
  * `J2D_PIXMAPS=server` - usa apenas pixmaps do lado do servidor

Nota:

Em geral, definir qualquer uma das opções relacionadas a pixmaps é uma questão de experimentação cuidadosa e só deve ser adotada se houver um benefício medido claro.

Controle o visual X padrão especificando o valor da variável de ambiente `FORCEDEFVIS` da seguinte forma:

  * `FORCEDEFVIS unset` - usa o melhor visual disponível
  * `FORCEDEFVIS <hexadecimal value>` - usa o visual válido cujo ID é o valor hexadecimal

### Propriedades Java 2D no Windows

A seguir, são listadas algumas propriedades úteis do Java 2D no Windows.

O pipeline D3D é o pipeline padrão para Windows. Altere este padrão especificando um valor da propriedade de sistema `sun.java2d.d3d` ou `sun.java2d.opengl` ou da variável de ambiente `J2D_D3D` ou `J2D_D3D_NO_HWCHECK`:

  * `-Dsun.java2d.d3d=false` - desabilita o uso do pipeline Direct3D; GDI é usado em vez disso
  * `-Dsun.java2d.opengl=true` - tenta habilitar o pipeline OpenGL
  * `J2D_D3D=true` - habilita o uso do pipeline Direct3D (sujeito a verificações de hardware)
  * `J2D_D3D=false` - desabilita o uso do pipeline Direct3D
  * `J2D_D3D_NO_HWCHECK=true` - desabilita a verificação de chips gráficos e drivers D3D com problemas conhecidos

Nota:

No JDK 8, você pode definir a propriedade de sistema `sun.java2d.dpiaware` para `true` ou `false`:

  * `-Dsun.java2d.dpiaware=true` - o JDK renderiza gráficos com base na escala da área de trabalho
  * `-Dsun.java2d.dpiaware=false` - o sistema operacional renderiza gráficos em aplicações Java com base na escala da área de trabalho

Por padrão, o JDK renderiza gráficos se a escala da área de trabalho for inferior a 150%; caso contrário, o Windows renderiza gráficos em aplicações Java. Isso pode resultar em renderização borrada se a escala da área de trabalho for de 150% ou mais, porque o JDK não renderizará mais texto, geometria ou imagens multirresolução na resolução ideal. O JDK compensa parcialmente este caso usando renderização de texto em tons de cinza, e não ClearType, em aplicações Swing.

Se sua aplicação rodando em um ambiente JDK 8 estiver muito borrada quando a escala da área de trabalho for de 150% ou mais e você preferir uma renderização mais nítida, mas menor, então defina `sun.java2d.dpiaware` como `true` ou, alternativamente, altere a escala da sua área de trabalho para um valor menor, como 100% ou 125%.

No entanto, no JDK 9 e posterior, definir a propriedade de sistema `sun.java2d.dpiaware` como `false` não tem efeito. O launcher e o compilador Java (`java.exe`, `javaw.exe`) contêm uma entrada de manifesto de alta DPI (`<dpiAware>`) que é definida como `true`, a qual não pode ser desabilitada via código. Apenas um launcher Java nativo personalizado que não defina essas entradas de manifesto pode usar esta opção.

### Propriedades Java 2D no macOS

A tabela a seguir descreve algumas propriedades úteis do Java 2D no macOS.

Tabela B-1 Propriedades Java 2D no macOS

System Property | Default Value | Description
---|---|---
`sun.java2d.metal` | JDK 19 and later: `true`JDK 17 and 18: `false` | Se `true`, então Metal é o pipeline de renderização Java 2D padrão.
`sun.java2d.opengl` | JDK 19 and later: `false`JDK 18 and earlier: `true` | Se `true`, então OpenGL é o pipeline de renderização Java 2D padrão.