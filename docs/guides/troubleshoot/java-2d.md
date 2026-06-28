# Java 2D

## 13 Java 2D   
  
Este capítulo fornece informações e orientações para solucionar alguns dos problemas mais comuns que podem ser encontrados na API Java 2D.

Este capítulo contém as seguintes seções:

  * [Problemas Genéricos de Desempenho](<#/doc/guides/troubleshoot/java-2d>)

  * [Problemas Relacionados a Texto](<#/doc/guides/troubleshoot/java-2d>)




Para um resumo das propriedades do Java 2D, consulte [Propriedades do Java 2D](<#/doc/guides/troubleshoot/java-2d-properties>). 

### Problemas Genéricos de Desempenho

Pode haver muitas causas para um desempenho de renderização ruim. Os tópicos a seguir identificam a causa do baixo desempenho de renderização de suas aplicações e sugerem algumas abordagens para melhorar o desempenho da renderização apenas por software. 

Este tópico contém as seguintes subseções:

  * [Primitivas de Renderização Aceleradas por Hardware](<#/doc/guides/troubleshoot/java-2d>)

  * [Rastreamento de Primitivas para Detectar e Evitar Renderização Não Acelerada](<#/doc/guides/troubleshoot/java-2d>)

  * [Causas do Baixo Desempenho de Renderização](<#/doc/guides/troubleshoot/java-2d>)

  * [Melhorar o Desempenho da Renderização Apenas por Software](<#/doc/guides/troubleshoot/java-2d>)




#### Primitivas de Renderização Aceleradas por Hardware

Para entender melhor o que pode estar causando problemas de desempenho, veja o que significa aceleração de hardware.

Em geral, a renderização acelerada por hardware pode ser dividida em duas categorias.

  * Renderização acelerada por hardware para um destino "acelerado". Exemplos de destinos de renderização que podem ser acelerados por hardware são `VolatileImage`, tela e `BufferStrategy`. Se um destino é acelerado, a renderização para uma superfície pode ser realizada pelo hardware de vídeo. Assim, se você emitir uma chamada `drawRect`, o Java 2D redireciona essa chamada para a API nativa subjacente (como GDI, DirectDraw, Direct3D ou OpenGL, ou X11), que executa a operação usando hardware. 

  * Armazenamento em cache de imagens em memória acelerada (memória de vídeo ou pixmaps) para que possam ser copiadas muito rapidamente para outra superfície acelerada. Essas imagens são conhecidas como imagens gerenciadas.




Idealmente, todas as operações realizadas em uma superfície acelerada são aceleradas por hardware. Nesse caso, a aplicação aproveita ao máximo o que é oferecido pela plataforma.

Infelizmente, em muitos casos, os pipelines padrão não conseguem usar o hardware para renderização. Isso pode acontecer devido às limitações do pipeline ou da API nativa subjacente. Por exemplo, a maioria dos servidores X não suporta a renderização de primitivas antialiased ou alpha compositing.

Uma causa de problemas de desempenho é quando as operações realizadas não são aceleradas por hardware. Mesmo em casos em que uma superfície de destino é acelerada, algumas primitivas podem não ser.

É importante saber como detectar os casos em que a aceleração de hardware não está sendo usada. Saber disso pode ajudar a melhorar o desempenho.

#### Rastreamento de Primitivas para Detectar e Evitar Renderização Não Acelerada

Para detectar uma renderização não acelerada, você pode usar o rastreamento de primitivas do Java 2D.

Execute sua aplicação com `-Dsun.java2d.trace=count`. Quando a aplicação é encerrada, uma lista de primitivas e suas contagens é impressa no console. 

Sempre que você vir um `MaskBlit` ou qualquer uma das primitivas `General*`, isso geralmente significa que parte da sua renderização está passando por loops de software. Aqui está a saída da execução de `drawImage` em uma `BufferedImage` translúcida para uma `VolatileImage` no Linux: 
```
    sun.java2d.loops.Blit$GeneralMaskBlit::Blit(IntArgb, SrcOverNoEa, "Integer BGR Pixmap")sun.java2d.loops.MaskBlit::MaskBlit(IntArgb, SrcOver, IntBgr)
    
```

Aqui estão algumas das primitivas não aceleradas comuns nos pipelines padrão e suas assinaturas na saída de rastreamento. 

Nota:

A maior parte deste rastreamento foi feita no Linux; você pode ver algumas diferenças dependendo da sua plataforma e configuração. 

  * Imagens translúcidas (imagens com ColorModel.getTranslucency() retornando `Translucency.TRANSLUCENT`), ou imagens com `AlphaCompositing`. Exemplo de saída de rastreamento de primitiva:
`sun.java2d.loops.Blit$GeneralMaskBlit::Blit(IntArgb,SrcOverNoEa, "Integer BGR Pixmap")sun.java2d.loops.MaskBlit::MaskBlit(IntArgb, SrcOver, IntBgr)
        
```

  * Uso de antialiasing (definindo a dica de antialiasing). Exemplo de saída de rastreamento de primitiva:
`sun.java2d.loops.MaskFill::MaskFill(AnyColor, Src, IntBgr)
        
```

  * Renderização de texto antialiased (definindo a dica de antialiasing de texto). A saída de exemplo pode ser uma das seguintes:

    * 
`sun.java2d.loops.DrawGlyphListAA::DrawGlyphListAA(OpaqueColor, SrcNoEa, AnyInt)
          
```

    * 
`sun.java2d.loops.DrawGlyphListLCD::DrawGlyphListLCD(AnyColor, SrcNoEa, IntBgr)
          
```

  * Alpha compositing, seja renderizando com cor translúcida (uma cor com um valor alfa que não é `0xff`) ou definindo um modo `AlphaCompositing` não padrão com `Graphics2D.setComposite()`:
`sun.java2d.loops.Blit$GeneralMaskBlit::Blit(IntArgb, SrcOver, IntRgb)sun.java2d.loops.MaskBlit::MaskBlit(IntArgb, SrcOver, IntRgb)
        ]
```

  * Transformações não triviais (se a transformação for mais do que apenas translação). Renderizando uma imagem opaca transformada para uma `VolatileImage`:
`sun.java2d.loops.TransformHelper::TransformHelper(IntBgr, SrcNoEa, IntArgbPre)
        
```

  * Renderizando uma linha rotacionada:
`sun.java2d.loops.DrawPath::DrawPath(AnyColor, SrcNoEa, AnyInt)
        
```

Execute sua aplicação com rastreamento e certifique-se de não usar primitivas não aceleradas, a menos que sejam necessárias.




#### Causas do Baixo Desempenho de Renderização

Algumas das possíveis causas de baixo desempenho de renderização e possíveis alternativas são descritas a seguir:

  * Mistura de renderização acelerada e não acelerada:

Uma situação em que apenas parte das primitivas renderizadas por uma aplicação pode ser acelerada por um pipeline específico ao renderizar para uma superfície acelerada pode causar thrashing, pois os pipelines tentarão constantemente se ajustar para um melhor desempenho de renderização, mas com pouco sucesso.

Se for sabido de antemão que a maioria das primitivas de renderização não será acelerada, então pode ser melhor renderizar para uma `BufferedImage` e depois copiá-la para o back buffer ou para a tela, ou mudar para um pipeline não acelerado por hardware usando uma das flags discutidas. 

Nota:

Essa abordagem pode limitar a capacidade da sua aplicação de aproveitar futuras melhorias no uso da aceleração de hardware pelo Java 2D.

Por exemplo, se sua aplicação é frequentemente usada em casos de servidor X remoto, mas usa intensivamente antialiasing, alpha compositing e assim por diante, o desempenho pode ser severamente degradado. Para evitar isso, desabilite o uso de pixmaps definindo a propriedade `-Dsun.java2d.pmoffscreen=false` seja passando-a para o runtime Java, ou definindo-a programaticamente usando a API System.setProperty(). O pipeline Xrender padrão suporta texto anti-aliased e modos de compositing padrão mesmo em X11 remoto, então, dependendo da sua aplicação, os pixmaps ainda podem ter um desempenho melhor. Você deve testar isso para verificar. 

Nota:

Esta propriedade deve ser definida antes de qualquer operação relacionada à GUI, pois é lida apenas uma vez. 

  * Primitivas de renderização não otimizadas:

É preferível usar a primitiva mais simples possível para alcançar o efeito visual desejado.

Por exemplo, use Graphics.drawLine() em vez de new Line2D().draw(). O resultado parece o mesmo. No entanto, a segunda operação é muito mais intensiva em termos computacionais porque é renderizada como uma forma genérica, o que é tipicamente muito mais caro de renderizar. As formas aparecem de diferentes maneiras no rastreamento de primitivas, dependendo das configurações de antialiasing e do pipeline específico, mas muito provavelmente aparecerão como muitas primitivas `*FillSpans` ou `DrawPath`. 

Outro exemplo de atributos complicados é `GradientPaint`. Embora possa ser acelerado por hardware por alguns dos pipelines não padrão (como OpenGL), não é acelerado por hardware pelos pipelines padrão. Portanto, você pode restringir o uso de `GradientPaint` se isso causar problemas de desempenho. 

  * Superfície de destino baseada em heap `BufferedImage`:

A renderização para uma `BufferedImage` quase sempre usa loops de software. 

Para garantir que a renderização tenha a oportunidade de ser acelerada por hardware, escolha um objeto `BufferStrategy` ou `VolatileImage` como destino de renderização. 

  * Derrotar o mecanismo de aceleração embutido:

Java 2D tenta acelerar certos tipos de imagens. O conteúdo das imagens pode ser armazenado em cache na memória de vídeo para cópia mais rápida para destinos acelerados, como `VolatileImages`. Esses mecanismos podem ser inadvertidamente desativados pela aplicação. 

  * Obter acesso direto aos pixels com `getDataBuffer()`:

Se uma aplicação obtiver acesso aos pixels de `BufferedImage` usando a API getRaster().getDataBuffer(), o Java 2D não poderá garantir que os dados no cache estejam atualizados, então desativará qualquer tentativa de aceleração desse tipo de imagem. 

Para evitar isso, não chame getDataBuffer(). Em vez disso, trabalhe com `WriteableRaster`, que pode ser obtido com o método BufferedImage.getRaster(). 

Se você precisar modificar os pixels diretamente, pode armazenar manualmente sua imagem em cache na memória de vídeo, mantendo a cópia em cache de sua imagem em uma `VolatileImage` e atualizando os dados em cache quando a imagem original for tocada. 

  * Renderizar para um sprite antes de cada cópia:

Se uma aplicação renderiza para uma imagem antes de copiá-la para uma superfície acelerada (`VolatileImage`, `BufferStrategy`), a imagem não pode aproveitar o fato de estar em cache na memória acelerada. Isso ocorre porque a cópia em cache deve ser atualizada toda vez que a imagem original é atualizada, e, portanto, apenas a superfície padrão baseada em memória do sistema é usada, e isso significa nenhuma aceleração. 

  * Recursos de memória acelerada esgotados:

Se a aplicação usa muitas imagens, ela pode esgotar a memória acelerada disponível. Se esta for a causa de problemas de desempenho para sua aplicação, você pode precisar gerenciar os recursos.

A seguinte API pode ser usada para solicitar a quantidade de memória acelerada disponível: GraphicsDevice.getAvailableAcceleratedMemory(). 

Além disso, a seguinte API pode ser usada para determinar se sua imagem está sendo acelerada: Image.getCapabilities(). 

Se você determinou que sua aplicação está esgotando os recursos, pode resolver o problema não mantendo imagens que não precisa mais. Por exemplo, se seu jogo avançou para o próximo nível, libere todas as imagens dos níveis anteriores. Você também pode liberar recursos acelerados associados a uma imagem usando a API Image.flush(). 

Você também pode usar a API de prioridade de aceleração Image.getAccelerationPriority() e setAccelerationPriority() para especificar a prioridade de aceleração para suas imagens. É uma boa ideia garantir que pelo menos seu back-buffer seja acelerado, então crie-o primeiro, e com prioridade de aceleração de 1 (padrão). Você também pode proibir que certas imagens sejam aceleradas, se necessário, definindo a prioridade de aceleração para 0.0. 




#### Melhorar o Desempenho da Renderização Apenas por Software

Se sua aplicação depende de renderização apenas por software (renderizando apenas para uma `BufferedImage`, ou alterando o pipeline padrão para um não acelerado), ou mesmo se ela faz renderização mista, as seguintes são algumas abordagens para melhorar o desempenho: 

  1. Tipos de imagem ou operações com suporte otimizado: 

Devido a restrições gerais de tamanho da plataforma, o Java 2D possui um número limitado de rotinas otimizadas para converter de um formato de imagem para outro. Em situações onde um loop direto otimizado não pode ser encontrado, o Java 2D fará a conversão através de um formato de imagem intermediário (`IntArgb`). Isso resulta em degradação de desempenho. 

O rastreamento de primitivas do Java 2D pode ser usado para detectar tais situações.

Para cada chamada `drawImage`, haverá duas primitivas: a primeira convertendo a imagem do formato de origem para um formato `IntArgb` intermediário e a segunda convertendo do `IntArgb` intermediário para o formato de destino. 

Aqui estão duas maneiras de evitar tais situações:

     * Use um formato de imagem diferente, se possível.

     * Converta sua imagem para uma imagem intermediária de um dos formatos mais bem suportados, como `INT_RGB` ou `INT_ARGB`. Dessa forma, a conversão do formato de imagem personalizado ocorrerá apenas uma vez, em vez de a cada cópia. 

  2. Transparência vs translucidez: 

Considere usar imagens transparentes de 1 bit (`BITMASK`) para seus sprites em vez de imagens com translucidez total (como `INT_ARGB`), se possível. 

Processar imagens com alpha total é mais intensivo em CPU.

Você pode obter uma imagem transparente de 1 bit usando uma chamada para GraphicsConfiguration.createCompatibleImage(w,h, Transparency.BITMASK). 




### Problemas Relacionados a Texto

Esta seção descreve possíveis problemas e falhas relacionados à renderização de texto e oferece dicas para superá-los.

Esta seção contém as seguintes subseções:

  * Rastreamento de Carregamento de Fontes

  * Diferenças na Aparência do Texto

  * Métricas de Fonte




#### Rastreamento de Carregamento de Fontes

Definir a propriedade `-Dsun.java2d.debugfonts=true` gera informações sobre as fontes carregadas pelo Java 2D. Você pode ver quais fontes o Java 2D encontra, inferir quais ele usa e ver informações sobre as fontes que ele rejeita. Esta propriedade gera uma saída semelhante à seguinte: 
```
    INFO: Registered file C:\WINDOWS\Fonts\WINGDING.TTF as font ** TrueType Font: Family=Wingdings
     Name=Wingdings style=0 fileName=C:\WINDOWS\Fonts\WINGDING.TTF rank=2
    Aug 16, 2006 10:59:06 PM sun.font.FontManager initialiseDeferredFont
    INFO: Opening deferred font file SYMBOL.TTF
    Aug 16, 2006 10:59:06 PM sun.font.FontManager addToFontList
    INFO: Add to Family Symbol, Font Symbol rank=2
    Aug 16, 2006 10:59:06 PM sun.font.FontManager registerFontFile
    INFO: Registered file C:\WINDOWS\Fonts\SYMBOL.TTF as font ** TrueType Font: Family=Symbol
     Name=Symbol style=0 fileName=C:\WINDOWS\Fonts\SYMBOL.TTF rank=2
    Aug 16, 2006 10:59:06 PM sun.font.FontManager findFont2D
    INFO: Search for font: Dialog
    Aug 16, 2006 10:59:06 PM sun.font.FontManager initialiseDeferredFont
    INFO: Opening deferred font file ARIALBD.TTF
    Aug 16, 2006 10:59:06 PM sun.font.FontManager addToFontList
    INFO: Add to Family Arial, Font Arial Bold rank=2
    Aug 16, 2006 10:59:06 PM sun.font.FontManager registerFontFile
    INFO: Registered file C:\WINDOWS\Fonts\ARIALBD.TTF as font ** TrueType Font: Family=Arial
     Name=Arial Bold style=1 fileName=C:\WINDOWS\Fonts\ARIALBD.TTF rank=2
    Aug 16, 2006 10:59:06 PM sun.font.FontManager initialiseDeferredFont
    INFO: Opening deferred font file WINGDING.TTF
    Aug 16, 2006 10:59:06 PM sun.font.FontManager initialiseDeferredFont
    INFO: Opening deferred font file SYMBOL.TTF
    Aug 16, 2006 10:59:06 PM sun.font.FontManager findFont2D
    INFO: Search for font: Dialog
    Aug 16, 2006 10:59:06 PM sun.font.FontManager initialiseDeferredFont
    INFO: Opening deferred font file ARIAL.TTF
    Aug 16, 2006 10:59:06 PM sun.font.FontManager addToFontList
    INFO: Add to Family Arial, Font Arial rank=2
    Aug 16, 2006 10:59:06 PM sun.font.FontManager registerFontFile
    INFO: Registered file C:\WINDOWS\Fonts\ARIAL.TTF as font ** TrueType Font: Family=Arial
     Name=Arial style=0 fileName=C:\WINDOWS\Fonts\ARIAL.TTF rank=2
    Aug 16, 2006 10:59:06 PM sun.font.FontManager initialiseDeferredFont
    INFO: Opening deferred font file WINGDING.TTF
    Aug 16, 2006 10:59:06 PM sun.font.FontManager initialiseDeferredFont
    INFO: Opening deferred font file SYMBOL.TTF
    
```

#### Diferenças na Aparência do Texto

Diferenças na aparência do texto em aplicações Java em comparação com aplicações nativas podem ser devido ao uso de diferentes rasterizadores de fonte. Aplicações Java tipicamente usam o rasterizador de fonte do sistema operacional, o mesmo que as aplicações nativas usam. No entanto, aplicações Java podem usar FreeType, uma biblioteca de software para renderizar fontes, que foi instalada ou incluída em um sistema operacional. Por exemplo, FreeType pode ser usado no Windows para texto em escala de cinza ou no macOS para fontes Type 1 que não são suportadas pelo rasterizador de fonte do macOS. No entanto, observe que o Windows possui múltiplos rasterizadores de fonte. Consequentemente, a renderização de texto pode variar entre aplicações nativas. Além disso, todas as plataformas têm algum grau de configurabilidade na rasterização da plataforma, o que pode levar a pequenas diferenças na aparência do texto.

Outras fontes de diferença incluem:

  * Se o posicionamento de subpixel está em uso, pois isso afeta o posicionamento preciso dos glyphs; veja java.awt.RenderingHints.KEY_FRACTIONALMETRICS. 
  * No Linux, o Swing pode escolher diferentes configurações de anti-aliasing.



Existem várias razões prováveis para este comportamento:

  * Antialiasing em uma conexão X11 remota não é habilitado por padrão por razões de desempenho.
  * Fontes CJK que usam bitmaps incorporados podem renderizar usando os bitmaps em vez de texto subpixel.

  * Algumas variantes de desktops não suportados não reportam suas configurações de suavização de fonte corretamente. Por exemplo, o KDE não é suportado, mas geralmente deveria funcionar; no entanto, algum problema parece impedir que o JDK detecte a configuração.




O tamanho da fonte na linguagem Java é sempre expresso com 72 dpi. Um SO nativo pode usar um dpi de tela diferente, e, portanto, um ajuste deve ser feito. O tamanho da fonte Java correspondente pode ser calculado como `Toolkit.getScreenResolution()` dividido por 72 multiplicado pelo tamanho da fonte nativa. 

Em todos os look-and-feel nativos do Swing, como o look-and-feel do Windows ou o look-and-feel GTK para o sistema operacional Linux, os componentes Swing realizam esse ajuste automaticamente.

Em sistemas operacionais que não sejam Windows, a recomendação geral é usar fontes TrueType em vez de fontes Type1. A maneira mais fácil de descobrir o tipo de fonte é olhar a extensão do arquivo: as extensões `pfa` e `pfb` indicam fontes Type1, e `ttf`, `ttc` e `tte` representam fontes TrueType. 

#### Métricas de Fonte

Se você descobrir que os limites do texto são diferentes do que você espera, certifique-se de estar usando a maneira apropriada para calculá-los. Por exemplo, a altura obtida de um `FontMetrics` não é específica para um pedaço de texto particular, e o `stringWidth` indica o avanço lógico, o que não é o mesmo que a largura. Para mais detalhes, consulte as perguntas sobre Fontes e Texto no FAQ do Java 2D.