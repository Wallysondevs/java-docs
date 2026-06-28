[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Módulos ](<#/doc/tutorials/modules>) > Código no Class Path - o Módulo Não Nomeado

**Anterior na Série**

[Desacoplando Módulos com Services](<#/doc/tutorials/modules/services>)

➜

**Tutorial Atual**

Código no Class Path - o Módulo Não Nomeado

➜

**Próximo na Série**

[Modularização Incremental com Automatic Modules](<#/doc/tutorials/modules/automatic-module>)

**Anterior na Série:** [Desacoplando Módulos com Services](<#/doc/tutorials/modules/services>)

**Próximo na Série:** [Modularização Incremental com Automatic Modules](<#/doc/tutorials/modules/automatic-module>)

# Código no Class Path - o Módulo Não Nomeado

O module system deseja que tudo seja um module, para que possa aplicar suas regras uniformemente, mas, ao mesmo tempo, criar modules não é obrigatório (e torná-lo assim não seria compatível com versões anteriores). O mecanismo que concilia esses dois requisitos aparentemente contraditórios é o unnamed module. Ele contém todas as classes do classpath e tem algumas regras especiais aplicadas a ele, mas, uma vez feito isso, funciona como qualquer outro module.

Isso significa que, se você iniciar seu código a partir do classpath, o unnamed module estará em ação. E, a menos que sua aplicação seja bastante pequena, ela provavelmente exigirá uma modularização incremental, que envolve a mistura de JARs e modules, classpath e module path. Isso torna importante entender como funciona o "modo classpath" do module system.

**Nota** : Você precisa conhecer [os fundamentos do module system](<#/doc/tutorials/modules/intro>) para aproveitar ao máximo este artigo.

## O Módulo Não Nomeado

O unnamed module contém todas as "classes não modulares", que são

  * em tempo de compilação, as classes que estão sendo compiladas se não incluírem um module descriptor
  * em tempo de compilação e execução, todas as classes carregadas do classpath

Todos os modules têm três propriedades centrais e isso também é verdade para o unnamed module:

  * um nome: o unnamed module não tem nenhum (faz sentido, certo?), o que significa que nenhum outro module pode mencioná-lo em sua declaração (por exemplo, para requerê-lo)
  * dependências: o unnamed module lê todos os outros modules que entram no grafo
  * exports: o unnamed module exporta todos os seus packages e também [os abre para reflection](<#/doc/tutorials/modules/opening-for-reflection>)

É em contraste com o unnamed module que todos os outros modules são considerados _nomeados_ . [Services](<#/doc/tutorials/modules/services>) fornecidos em `META-INF/services` são disponibilizados para o `ServiceLoader`.

Embora não seja exatamente direto, o conceito do unnamed module faz sentido. Aqui você tem o grafo de modules ordenado e ali, um pouco de lado, você tem o caos do classpath, agrupado em seu próprio module de livre acesso com algumas propriedades especiais.

## O Caos do Class Path

O principal objetivo do unnamed module é capturar o conteúdo do classpath e fazê-lo funcionar no module system. Como nunca houve limites entre JARs no classpath, não faz sentido estabelecê-los agora e, portanto, há um único unnamed module para todo o classpath. Dentro dele, assim como no classpath, todas as classes públicas são acessíveis umas às outras e os packages podem ser divididos entre JARs.

O papel distinto do unnamed module e seu foco na compatibilidade com versões anteriores lhe conferem algumas propriedades especiais. Uma delas foi o acesso intermitente a [APIs fortemente encapsuladas no Java 9 a 16](<#/doc/tutorials/modules/strong-encapsulation>). Outra é que ele não está exposto a muitas verificações aplicadas a modules nomeados. Como consequência, packages divididos entre ele e outros modules não são descobertos e a porção do classpath simplesmente não está disponível. (Isso significa que você pode obter erros para classes ausentes que estão realmente presentes no classpath se o mesmo package também existir em um module nomeado.)

Um detalhe um pouco contraintuitivo e fácil de entender errado é o que exatamente constitui o unnamed module. Parece óbvio que JARs modulares se tornam modules e, portanto, JARs simples vão para o unnamed module, certo? Mas não é o caso, o unnamed module é responsável por _todos os JARs no classpath_ , modulares ou não. Consequentemente, JARs modulares não são obrigados a serem carregados como modules! Então, se uma biblioteca começa a entregar JARs modulares, seus usuários não são de forma alguma forçados a usá-los como modules. Eles podem, em vez disso, deixá-los no classpath, onde seu código é empacotado no unnamed module. Isso permite que o ecossistema se modularize quase independentemente um do outro.

Para experimentar isso, você pode colocar as duas linhas de código a seguir em uma classe que você empacota como um JAR modular:

```java
System.out.println("Module name: " + getClass().getModule().getName());
```

Quando iniciado a partir do classpath, a saída é `Module name: null`, indicando que a classe foi parar no unnamed module. Quando iniciado a partir do module path, você obtém o esperado `Module name: $MODULE`, onde `$MODULE` é o nome que você deu ao module.

## Resolução de Módulos para o Módulo Não Nomeado

Um aspecto importante da relação do unnamed module com o restante do grafo de modules é quais outros modules ele pode ler. Conforme descrito, são todos os que entram no grafo. Mas quais modules são esses? Lembre-se dos [fundamentos do module system](<#/doc/tutorials/modules/intro>) que a resolução de modules constrói um grafo de modules começando com os root modules (particularmente o module inicial) e então adicionando iterativamente todas as suas dependências diretas e transitivas. Como isso funcionaria se o código em compilação ou o método `main` da aplicação estivesse no unnamed module, como é o caso ao iniciar uma aplicação a partir do classpath? Afinal, JARs simples não expressam nenhuma dependência.

Se o module inicial for o não nomeado, a resolução de modules começa em um conjunto predefinido de root modules. Como regra geral, estes são os modules encontrados no runtime, mas a regra real é um pouco mais detalhada:

  * O conjunto preciso de modules _java.*_ que se tornam root depende da presença do module _java.se_ (ou seja, o module que representa toda a API Java SE; ele está presente em imagens JRE completas, mas pode estar ausente de imagens runtime personalizadas criadas com `jlink`):
    * Se _java.se_ for observável, ele se torna root.
    * Se não for, todo module _java.*_ que exporta pelo menos um package [sem qualificação](<#/doc/tutorials/modules/qualified-exports-opens>) se torna root.
  * Além dos modules _java.*_ , todo outro module no runtime que não é um module incubador e exporta pelo menos um package sem qualificação se torna um root module. Isso é particularmente relevante para modules _jdk.*_ .
  * Modules [listados com `--add-modules`](<#/doc/tutorials/modules/add-modules-reads>) são sempre root modules.

Observe que, com o unnamed module como o inicial, o conjunto de root modules é sempre um subconjunto dos modules contidos na imagem runtime. Modules presentes no module path nunca serão resolvidos a menos que sejam adicionados explicitamente com `--add-modules`. Se você criou manualmente o module path para conter exatamente os modules de que precisa, talvez queira adicionar todos eles com `--add-modules ALL-MODULE-PATH`, conforme explicado [neste artigo](<#/doc/tutorials/modules/add-modules-reads>).

## Dependendo do Módulo Não Nomeado

Um dos principais objetivos do module system é a configuração confiável: Um module deve expressar suas dependências e o module system deve ser capaz de garantir sua presença. Discutimos isso para modules explícitos com um module descriptor, mas o que aconteceria se tentássemos expandir a configuração confiável para o classpath?

### Um Experimento Mental

Imagine que modules pudessem depender do conteúdo do classpath, talvez com algo como `requires class-path` em seu descriptor. Que garantias o module system poderia dar para tal dependência? Acontece que, quase nenhuma. Enquanto houver pelo menos uma classe no classpath, o module system teria que assumir que a dependência está satisfeita. Isso não seria muito útil. Pior ainda, minaria seriamente a configuração confiável porque você poderia acabar dependendo de um module que `requires class-path`. Mas isso contém quase nenhuma informação - o que _exatamente_ precisa ir para o classpath?

Levando essa hipótese ainda mais longe, imagine dois modules _com.example.framework_ e _com.example.library_ dependendo do mesmo terceiro module, digamos SLF4J. Um declarou a dependência antes que o SLF4J fosse modularizado e, portanto, `requires class-path`, o outro declarou sua dependência em um SLF4J modularizado e, portanto, `requires org.slf4j`. Agora, em qual path qualquer pessoa dependendo de _com.example.framework_ e _com.example.library_ colocaria o JAR do SLF4J? Qualquer que fosse a escolha, o module system teria que determinar que uma das duas dependências transitivas não foi satisfeita.

Pensar nisso leva à conclusão de que depender de conteúdo arbitrário do classpath não é uma boa ideia se você deseja modules confiáveis. E por essa exata razão não existe `requires class-path`.

### Portanto, Não Nomeado

Então, como expressar melhor que o module que acaba contendo o conteúdo do classpath não pode ser dependido? Em um module system que usa nomes para referenciar outros modules? Não dar um nome a esse module, tornando-o _não nomeado_ , por assim dizer, parece razoável. E aí está: O unnamed module não tem nome porque nenhum module deve jamais referenciá-lo em uma diretiva `requires` - ou qualquer outra diretiva, aliás. Sem `requires`, não há aresta de legibilidade, e sem essa aresta, o código no unnamed module é inacessível para os modules.

Em resumo, para que um module explícito dependa de um artefato, esse artefato precisa estar no module path. Isso pode muito bem significar que você coloca JARs simples no module path, o que os transforma em automatic modules - um conceito que exploraremos a seguir.

### Neste tutorial

O Módulo Não Nomeado O Caos do Class Path Resolução de Módulos para o Módulo Não Nomeado Dependendo do Módulo Não Nomeado

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Desacoplando Módulos com Services](<#/doc/tutorials/modules/services>)

➜

**Tutorial Atual**

Código no Class Path - o Módulo Não Nomeado

➜

**Próximo na Série**

[Modularização Incremental com Automatic Modules](<#/doc/tutorials/modules/automatic-module>)

**Anterior na Série:** [Desacoplando Módulos com Services](<#/doc/tutorials/modules/services>)

**Próximo na Série:** [Modularização Incremental com Automatic Modules](<#/doc/tutorials/modules/automatic-module>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Módulos ](<#/doc/tutorials/modules>) > Código no Class Path - o Módulo Não Nomeado