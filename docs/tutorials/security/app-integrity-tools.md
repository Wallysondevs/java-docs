# Aproveitando Ferramentas e Atualizações do JDK para Ajudar a Proteger Aplicações Java

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Fundamentos de Segurança usando Bibliotecas JDK ](<#/doc/tutorials/security>) > Aproveitando Ferramentas e Atualizações do JDK para Ajudar a Proteger Aplicações Java

**Anterior na Série**

[Monitorando a Segurança de Aplicações Java com Ferramentas JDK e Eventos JFR](<#/doc/tutorials/security/monitor>)

➜

**Tutorial Atual**

Aproveitando Ferramentas e Atualizações do JDK para Ajudar a Proteger Aplicações Java

➜

Este é o fim da série!

**Anterior na Série:** [Monitorando a Segurança de Aplicações Java com Ferramentas JDK e Eventos JFR](<#/doc/tutorials/security/monitor>)

# Aproveitando Ferramentas e Atualizações do JDK para Ajudar a Proteger Aplicações Java

O JDK vem com um conjunto de ferramentas e capacidades integradas que podem ajudar os administradores de sistema a manter as instalações Java seguras. Embora essas ferramentas e capacidades sejam frequentemente bem conhecidas por desenvolvedores Java experientes, elas podem nem sempre ser familiares para administradores encarregados de proteger aplicações Java.

Nesta publicação, abordaremos algumas ferramentas e capacidades integradas, fornecendo referências para recursos adicionais. Os administradores podem explorar estas informações para se preparar para situações em que possam ter que reavaliar e aplicar medidas para melhorar a postura de segurança de suas aplicações Java.

Em resumo, este artigo fornece conselhos gerais para manter as aplicações Java seguras, em vez de conselhos para mitigar uma vulnerabilidade específica.

## Ferramentas de Linha de Comando do JDK para identificar classes sendo usadas por uma aplicação

Ao proteger uma aplicação Java, é comum primeiro determinar se uma classe específica está sendo usada. O JDK inclui ferramentas que podem ajudar nesta tarefa.

### ferramenta jcmd

A ferramenta `jcmd` pode ser usada para recuperar as propriedades de sistema de uma aplicação em execução, executando `jcmd $pid VM.system_properties`, onde `$pid` representa o ID do processo da aplicação Java a ser examinada. Se, ao usar `jcmd`, você encontrar um nome de biblioteca potencialmente interessante em um local no classpath, a biblioteca poderá ser examinada mais a fundo para, por exemplo, determinar sua versão.

_Figura 1: Exemplo de saída de jcmd VM.system_properties (classpath destacado para ênfase)_

No JDK 9 e versões posteriores, `jcmd` pode imprimir uma listagem hierárquica de todas as classes carregadas por uma aplicação Java em execução na mesma máquina, usando o subcomando VM.class_hierarchy, invocando `jcmd $pid VM.class_hierarchy`.

_Figura 2: Exemplo de saída de jcmd VM.class_hierarchy_

No JDK 7 e posterior, o subcomando `GC.class_histogram` pode ser usado para obter uma listagem de todas as classes instanciadas (e seu uso de memória), invocando `jcmd $pid GC.class_histogram`.

_Figura 3: Exemplo de saída de jcmd GC.class_histogram (destacado para ênfase)_

Os administradores podem examinar a saída de `jcmd` em busca de pacotes de interesse, como `com.example.foo.bar`, para estabelecer se uma aplicação Java em execução carregou ou instanciou classes de pacotes com esses nomes.

Pacotes e classes que ainda não foram carregados ou instanciados não apareceriam na saída de `jcmd`. Nesse caso, sua ausência na saída de `jcmd` por si só não deve ser interpretada como um indicativo de que não podem ser carregados pela aplicação em um momento posterior, desde que sua configuração e dependências o permitam.

Com o JDK 9 e posterior, não é necessário examinar o histograma de classes do GC para uma classe suspeita, pois uma classe não pode ser instanciada sem primeiro ser carregada. Você deve usar a versão de `jcmd` de um JDK que corresponda ao JDK usado para executar o processo que você está inspecionando. Mais informações sobre o uso da ferramenta `jcmd` estão disponíveis no [guia de solução de problemas do JDK](<https://docs.oracle.com/en/java/javase/21/troubleshoot/diagnostic-tools.html#GUID-42A18B29-B4AD-4831-B846-2CDBA55F2254>).

#### Resumo

Comando | Suportado desde | Descrição | Ação
---|---|---|---
`jcmd <pid> VM.system_properties` | JDK 7 | Imprime todas as propriedades de sistema definidas para o JDK | Examinar classpath para bibliotecas específicas
`jcmd <pid> GC.class_histogram` | JDK 7 | Cria e imprime um histograma de classes | Examinar classes instanciadas
`jcmd <pid> VM.class_hierarchy` | JDK 9 | Imprime a hierarquia de classes | Examinar classes carregadas

### jdeps

Classes e pacotes podem ser carregados como dependências em tempo de execução. A partir do JDK 8, desenvolvedores e administradores de sistema podem usar `jdeps` para analisar bibliotecas e classes Java estaticamente para aprender mais sobre suas dependências em nível de pacote ou de classe.

Desenvolvedores podem usar jdeps para examinar bibliotecas JAR individuais, procurando por dependências em pacotes específicos usando a opção `-p`, por exemplo, `jdeps -p com.example.foo.bar some.jar` listará os pacotes em some.jar que dependem do pacote especificado por `-p`. `jdeps` também pode filtrar dependências de pacotes usando expressões regulares. Isso permite que desenvolvedores e administradores procurem por nomes de pacotes parciais para, por exemplo, encontrar shaded libraries.

Mais informações sobre o uso de jdeps podem ser encontradas na [página de manual correspondente](<https://docs.oracle.com/en/java/javase/26/docs/specs/man/jdeps.html#options-to-filter-classes-to-be-analyzed>).

#### Resumo

Comando | Suportado desde | Descrição | Ação
---|---|---|---
`jdeps -package <package-name> <jar>` | JDK 8 | Analisa estaticamente bibliotecas e classes Java | Examinar dependências em nível de pacote ou de classe

## Opções de Configuração em Tempo de Execução

### Propriedades de sistema, variáveis de ambiente e opções de linha de comando

Outra razão importante para manter seus runtimes Java atualizados é porque a Oracle aprimora continuamente as capacidades de runtime e fornece mitigações alinhadas às melhores práticas, conforme documentado nas [notas de lançamento do JDK](<https://www.oracle.com/java/technologies/javase/jdk-relnotes-index.html>).

As melhores práticas de segurança incentivam os usuários a desabilitar capacidades não exigidas por suas aplicações e a configurar seus sistemas para restringir as capacidades necessárias o máximo possível.

Por exemplo, várias opções para desabilitar ou restringir o uso da Java Naming and Directory Interface (JNDI) foram introduzidas desde janeiro de 2017 (em 8u121, 7u131 e 6u141), quando o [carregamento remoto de classes via JNDI object factories foi desabilitado por padrão](<https://www.oracle.com/java/technologies/javase/8u121-relnotes.html#notes-8u121>). Restrições adicionais são habilitadas por padrão desde outubro de 2018 (11.0.1, 8u191, 7u201 e 6u211).

Se uma aplicação estiver usando JNDI e não precisar de factories para criar quaisquer objetos Java LDAP, os administradores devem usar a variável de ambiente `JAVA_TOOL_OPTIONS` na inicialização para passar as opções de linha de comando do runtime Java: `-Djdk.jndi.object.factoriesFilter=!* and -Dcom.sun.jndi.ldap.object.trustSerialData=false`. Essas propriedades estão disponíveis no Oracle Java 17, 11.0.11, 8u291 e 7u301 e posteriores (desde abril de 2021).

Uma descrição detalhada dessas propriedades está disponível na [documentação](<https://docs.oracle.com/en/java/javase/26/docs/api/java.naming/module-summary.html>) da API Java SE:

  * `jdk.jndi.object.factoriesFilter`: Esta propriedade de sistema e segurança permite que um filtro serial seja especificado, controlando o conjunto de classes de object factory permitidas para instanciar objetos a partir de referências de objeto retornadas por sistemas de nomeação/diretório. A classe factory nomeada pela instância de referência é comparada a este filtro durante a reconstrução da referência remota. A propriedade de filtro suporta sintaxe de filtro baseada em padrões com o formato especificado por [JEP 290: Filter Incoming Serialization Data](<https://openjdk.java.net/jeps/290>). Esta propriedade se aplica tanto às implementações de provedor JNDI/RMI quanto JNDI/LDAP integradas. O valor padrão permite que qualquer classe de object factory especificada na referência recrie o objeto referenciado.
  * `com.sun.jndi.ldap.object.trustSerialData`: Esta propriedade de sistema permite o controle da desserialização de objetos Java do atributo LDAP `javaSerializedData`. Para evitar a desserialização de objetos Java do atributo, a propriedade de sistema pode ser definida como `false`. Por padrão, a desserialização de objetos Java do atributo `javaSerializedData` é permitida.

Mais informações sobre o uso da variável de ambiente `JAVA_TOOL_OPTIONS` podem ser encontradas no [guia de solução de problemas correspondente](<https://docs.oracle.com/javase/8/docs/technotes/guides/troubleshoot/envvars002.html>).

Se sua aplicação usa serialização, a Oracle recomenda usar um filtro de serialização, conforme descrito em [JEP 290: Filter Incoming Serialization Data](<https://openjdk.java.net/jeps/290>) e [JEP 415: Context-Specific Deserialization Filters](<https://openjdk.java.net/jeps/415>), para limitar as classes que podem ser desserializadas. Filtrar fluxos de dados de serialização de objetos de entrada melhora significativamente a segurança e a robustez de uma aplicação.

#### Resumo das Opções de Configuração

Comando | Suportado desde | Descrição | Ação
---|---|---|---
`jdk.jndi.object.factoriesFilter` | 17, 11.0.11, 8u291, e 7u301 | Controla o conjunto de classes de object factory permitidas para instanciar objetos a partir de referências de objeto retornadas por sistemas de nomeação/diretório. | `-Djdk.jndi.object.factoriesFilter=!*` Desabilita o uso de qualquer object factory para JNDI
`com.sun.jndi.ldap.object.trustSerialData` | 17, 11.0.11, 8u291, e 7u301 | Permite o controle da desserialização de objetos Java do atributo LDAP `javaSerializedData`. | `-Dcom.sun.jndi.ldap.object.trustSerialData=false` Impede a desserialização do atributo LDAP
`jdk.serialFilter` | 9, 8u121, e 7u131 | Filtra fluxos de dados de serialização de objetos de entrada para melhorar tanto a segurança quanto a robustez. | [Guia e Exemplos do JDK 21](<https://docs.oracle.com/en/java/javase/21/core/serialization-filtering1.html#GUID-91735293-E38E-4A81-85DC-719AFEB36026>)
[Guia e Exemplos do JDK 17](<https://docs.oracle.com/en/java/javase/17/core/serialization-filtering1.html#GUID-91735293-E38E-4A81-85DC-719AFEB36026>)
[Guia e Exemplos do JDK 11](<https://docs.oracle.com/en/java/javase/11/core/serialization-filtering1.html#GUID-3ECB288D-E5BD-4412-892F-E9BB11D4C98A>)
[Guia e Exemplos do JDK 7 e 8](<https://docs.oracle.com/javase/8/docs/technotes/guides/serialization/filters/serialization-filtering.html>)

### Criando um runtime dedicado para omitir funcionalidades desnecessárias usando jlink

Finalmente, a partir do JDK 9, os desenvolvedores podem aproveitar a ferramenta `jlink` para gerar uma imagem de runtime JDK personalizada para sua aplicação, que fornece apenas a funcionalidade do JDK exigida por seu código e suas bibliotecas dependentes. Se uma aplicação não possui uma GUI, por exemplo, e, portanto, não precisa das APIs de desktop e suas implementações, uma imagem de runtime JDK pode ser gerada que não contenha o módulo `java.desktop`, reduzindo o tamanho combinado do download, bem como a superfície de ataque potencial para a aplicação.

Para continuar com nosso exemplo anterior, se alguém quisesse criar um runtime que não usasse JNDI, poderia criar um runtime personalizado que não incluísse o módulo `java.naming`, onde essa funcionalidade está localizada. O conjunto de todos os módulos em uma imagem de runtime JDK pode ser encontrado usando o comando `java --list-modules`.

_Figura 4: Exemplo de saída parcial de java --list-modules usando jdk 11.0.13_

Os desenvolvedores podem criar uma imagem de runtime JDK personalizada usando `jlink`, fornecendo uma lista explícita de módulos a serem contidos na imagem de runtime. O conjunto de módulos a serem incluídos em uma imagem depende dos requisitos e das dependências de módulo do JDK da aplicação para a qual a imagem está sendo criada. Este último pode ser determinado usando `jdeps`.

A partir do JDK 11, `jdeps` fornece a opção `–print-module-deps`, que oferece uma lista de módulos JDK (e outros) separados por vírgulas, que pode ser passada para `jlink` com a opção `–add-modules` para criar uma imagem de runtime personalizada contendo apenas esses módulos e suas dependências transitivas.

Um exemplo trivial usando `jlink` para gerar uma imagem de runtime personalizada contendo apenas alguns módulos pode ser encontrado abaixo. Outros runtimes JDK personalizados podem conter um subconjunto substancialmente maior dos módulos JDK, bem como arquivos adicionais, como suporte para diferentes locais ou diferentes implementações de provedores de serviço, dos quais seu código depende em última instância. Nem todas essas dependências do JDK podem ser determinadas apenas pela análise estática de bytecode realizada por `jdeps`. Os desenvolvedores devem examinar cuidadosamente seus runtimes JDK personalizados para garantir que toda a funcionalidade do JDK exigida por sua aplicação esteja presente, executando `java –list-modules` a partir da imagem de runtime personalizada gerada.

Imagens de runtime JDK personalizadas criadas através de `jlink` são um subconjunto bem definido do JDK. Os administradores de sistema devem aplicar o mesmo tipo de teste de integração às imagens de runtime JDK personalizadas como fariam a uma atualização regular do JDK.

Você pode aprender mais sobre o uso do comando `jlink` para criar imagens de runtime JDK personalizadas em sua [página de manual](<https://docs.oracle.com/en/java/javase/26/docs/specs/man/jlink.html>).

Se a criação de uma imagem de runtime JDK personalizada não for uma opção, os administradores de sistema podem usar a opção Java `–limit-modules` em tempo de execução para limitar o conjunto de módulos JDK que podem ser observados por uma aplicação. O JDK 9 introduziu esta opção Java como parte do [JEP 261: Module System](<https://openjdk.java.net/jeps/261>). Ele permite especificar o conjunto preciso de módulos JDK, incluindo suas dependências, que estarão disponíveis para uma aplicação em tempo de execução, em vez da API Java SE completa.

Executar código que espera poder usar APIs em um runtime que não as disponibiliza pode levar a exceções em tempo de execução. Ao usar imagens de runtimes personalizados geradas com `jlink`, ou ao usar flags para limitar a observabilidade dos módulos JDK, é importante que desenvolvedores e administradores executem testes de integração, assim como fariam ao aplicar uma atualização do JDK.

### Neste tutorial

Ferramentas JDK para Identificar o Uso de Classes
Opções de Configuração em Tempo de Execução

Última revisão: 10 de junho de 2024

**Anterior na Série**

[Monitorando a Segurança de Aplicações Java com Ferramentas JDK e Eventos JFR](<#/doc/tutorials/security/monitor>)

➜

**Tutorial Atual**

Aproveitando Ferramentas e Atualizações do JDK para Ajudar a Proteger Aplicações Java

➜

Este é o fim da série!

**Anterior na Série:** [Monitorando a Segurança de Aplicações Java com Ferramentas JDK e Eventos JFR](<#/doc/tutorials/security/monitor>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Fundamentos de Segurança usando Bibliotecas JDK ](<#/doc/tutorials/security>) > Aproveitando Ferramentas e Atualizações do JDK para Ajudar a Proteger Aplicações Java