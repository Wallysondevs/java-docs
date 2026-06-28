# Migrando do JDK 8 para Versões Posteriores do JDK

## 7 Migrando do JDK 8 para Versões Posteriores do JDK

Houve mudanças significativas entre o JDK 8 e as versões posteriores do JDK.

Cada nova versão do Java SE introduz algumas incompatibilidades binárias, de código-fonte e comportamentais com as versões anteriores. A modularização da Plataforma Java SE que ocorreu no JDK 9 e posteriores trouxe muitos benefícios, mas também muitas mudanças. O código que usa apenas APIs oficiais da Plataforma Java SE e APIs específicas do JDK suportadas deve continuar funcionando sem alterações. O código que usa APIs internas do JDK deve continuar sendo executado, mas deve ser migrado para usar as APIs suportadas.

Algumas APIs foram tornadas inacessíveis, removidas ou tiveram seu comportamento padrão alterado. Você pode encontrar problemas ao compilar ou executar sua aplicação. Consulte [Ferramentas e Componentes Removidos](<#/doc/guides/migrate/removed-tools-and-components>) e [Atualizações de Segurança](<#/doc/guides/migrate/security-updates>).

As seções a seguir descrevem as mudanças no pacote JDK das quais você deve estar ciente ao migrar suas aplicações JDK 8 para versões posteriores do JDK.

Veja a lista de mudanças que você pode encontrar ao executar sua aplicação.

  * [Mudanças na Internacionalização](<#/doc/guides/migrate/migrating-jdk-8-later-jdk-releases>)

  * [Encapsulamento Forte no JDK](<#/doc/guides/migrate/migrating-jdk-8-later-jdk-releases>)

  * [Novo Esquema de String de Versão](<#/doc/guides/migrate/migrating-jdk-8-later-jdk-releases>)

  * [Mudanças na Imagem Instalada do JDK/JRE](<#/doc/guides/migrate/migrating-jdk-8-later-jdk-releases>)

  * [Implantação](<#/doc/guides/migrate/migrating-jdk-8-later-jdk-releases>)

  * [Mudanças na Coleta de Lixo](<#/doc/guides/migrate/migrating-jdk-8-later-jdk-releases>)

  * [Executando Applets Java](<#/doc/guides/migrate/migrating-jdk-8-later-jdk-releases>)

  * [Mudança de Comportamento na Correspondência de Expressões Regulares](<#/doc/guides/migrate/migrating-jdk-8-later-jdk-releases>)

  * [Plano para Remoção do Security Manager](<#/doc/guides/migrate/migrating-jdk-8-later-jdk-releases>)

  * [Finalização Descontinuada para Remoção](<#/doc/guides/migrate/migrating-jdk-8-later-jdk-releases>)

  * [Restrições e Avisos ao Acessar Código Nativo](<#/doc/guides/migrate/migrating-jdk-8-later-jdk-releases>)

Quando sua aplicação estiver sendo executada com sucesso na versão mais recente do JDK, revise [Próximos Passos](<#/doc/guides/migrate/next-steps>), o que o ajudará a evitar problemas com futuras versões.

### Mudanças na Internacionalização

Consulte [Java Platform, Standard Edition Internationalization Guide](<#/>) para obter mais informações sobre APIs de internacionalização e recursos da Plataforma Java SE.

#### Esteja Ciente do Charset Padrão

No JDK 18 e posteriores, UTF-8 é o charset padrão usado pelas APIs Java SE em todos os sistemas operacionais. Consulte [JEP 400: UTF-8 por Padrão](<https://openjdk.org/jeps/400>). Em contraste, no JDK 17 e versões anteriores, o charset padrão é determinado quando o tempo de execução Java inicia, ou seja, no macOS, o charset padrão costumava ser UTF-8, exceto na localidade POSIX C. Em outros sistemas operacionais, costumava depender da localidade do usuário e da codificação padrão.

Por exemplo, no Windows, é um charset baseado em codepage, como `windows-1252` ou `windows-31j`. O método `java.nio.charsets.Charset.defaultCharset()` retorna o charset padrão.

Execute o seguinte comando para determinar o charset que costumava ser o charset padrão no JDK 17 ou versões anteriores:
```
    java -XshowSettings:properties -version 2>&1 | grep native.encoding
```

Se a codificação detectada for diferente de UTF-8, a aplicação em execução em seu ambiente pode ser afetada.

Alterando o Charset Padrão do JDK

Se seu ambiente for afetado, use a propriedade de sistema `file.encoding` para investigar mais a fundo. Defina seu valor na linha de comando para um dos seguintes:

  * `UTF-8`: O charset padrão é UTF-8.
  * `COMPAT`: O charset padrão é determinado como no JDK 17 e versões anteriores.

Outros valores para `file.encoding` não são suportados.

Nota:

  * Execute o comando `java -Dfile.encoding=UTF-8 <your application>` com o JDK existente. Isso fornecerá o mesmo ambiente que o JDK 18 e posteriores. Verifique se há alguma diferença.
  * Execute o comando `-Dfile.encoding=COMPAT <your application>` no JDK 18 e posteriores para obter o comportamento anterior e verifique se há alguma diferença.

Para mais detalhes, consulte [Default Charset](<#/>) no Java Platform, Standard Edition Internationalization Guide.

#### Esteja Ciente das Mudanças nos Dados de Localidade

No JDK 9 e posteriores, o JDK usa dados de localidade no Common Locale Data Repository (CLDR) para formatar datas, horas, moedas, idiomas, países e fusos horários nas APIs padrão do Java. O CLDR, que é mantido pelo Unicode Consortium, fornece dados de localidade de maior qualidade do que os dados de localidade legados no JDK 8.

Aplicações que usam APIs sensíveis à localidade, como `java.time.LocalDate` e `java.util.Currency`, podem ver resultados diferentes, e possivelmente exceções, ao formatar e analisar datas, horas, moedas e dados relacionados no JDK 9 e posteriores.

Antes de implantar no JDK 9 ou posterior, onde os dados de localidade CLDR são usados por padrão, é altamente recomendável verificar problemas de compatibilidade executando suas aplicações no JDK 8 com o provedor CLDR selecionado. Faça isso iniciando o tempo de execução Java 8 da seguinte forma para que os dados de localidade CLDR tenham prioridade sobre os dados de localidade legados:
```
    $ java -Djava.locale.providers=CLDR,JRE ...
```

Os dados de localidade legados estão incluídos nas versões do JDK 9 a 22, apesar dos dados de localidade CLDR serem o padrão. Nessas versões, você pode forçar as APIs sensíveis à localidade a usar dados de localidade legados especificando `JRE` antes de `CLDR` no valor de `java.locale.providers` da seguinte forma:
```
    $ java -Djava.locale.providers=JRE,CLDR ...
```

O JDK tem removido gradualmente o suporte a dados de localidade legados:

  * No JDK 21, se o valor `JRE` (ou seu alias, `COMPAT`) for especificado na propriedade de sistema `java.locale.providers` na inicialização, o tempo de execução Java emitirá um aviso indicando que os dados de localidade legados serão removidos em uma versão futura.
  * No JDK 23, os dados de localidade legados não são mais incluídos. Como resultado, especificar `JRE` (ou seu alias, `COMPAT`) na propriedade de sistema `java.locale.providers` não tem efeito.

Projetos que ainda usam dados de localidade legados são altamente encorajados a mudar para o Unicode CLDR o mais rápido possível. Consulte [CLDR Locale Data Enabled by Default](<#/>) no Java Platform, Standard Edition Internationalization Guide.

Se isso não for viável, use uma das seguintes alternativas:

  * [Modifique Seu Código para Sempre Formatar e Analisar Strings Com os Mesmos Padrões Que Aqueles em Dados de Localidade Legados](<#/doc/guides/migrate/migrating-jdk-8-later-jdk-releases>)
  * [Crie um Provedor de Dados de Localidade Personalizado e Inclua-o na Aplicação](<#/doc/guides/migrate/migrating-jdk-8-later-jdk-releases>)

Modifique Seu Código para Sempre Formatar e Analisar Strings Com os Mesmos Padrões Que Aqueles em Dados de Localidade Legados

Por exemplo, suponha que seu código use a API `SimpleDateFormat` sensível à localidade para formatar objetos Date. No JDK 8, o código pode ter obtido um `SimpleDateFormat` da seguinte forma:
```
    SimpleDateFormat fmt
        = (SimpleDateFormat)DateFormat.getDateInstance(DateFormat.MEDIUM, Locale.UK);
    // prints "19-Mar-2024" on JDK 8 but "19 Mar 2024" on JDK 9
    System.out.println(fmt.format(new Date()));
```

Você poderia modificar o código para criar um `SimpleDateFormat` diretamente, passando o padrão desejado (componentes de data separados por hífens) para o construtor de `SimpleDateFormat`:
```
    SimpleDateFormat fmt = new SimpleDateFormat("dd-MMM-yyyy", Locale.UK); 
    // prints "19-Mar-2024", even on JDK 9 
    System.out.println(fmt.format(new Date()));
```

Esta solução pode funcionar bem para aplicações pequenas, ou para aplicações grandes que armazenam formatos em variáveis singleton cujo uso é rigorosamente imposto em toda a base de código.

Crie um Provedor de Dados de Localidade Personalizado e Inclua-o na Aplicação

Um provedor de localidade personalizado pode substituir o provedor `CLDR` para que as APIs sensíveis à localidade, ao formatar e analisar strings, deem prioridade aos padrões definidos pelo provedor de localidade personalizado.

Nota:

Esta opção é complexa porque envolve mudanças na forma como a aplicação é empacotada e implantada. Antes de considerar esta opção, investigue a opção anterior, [Modifique Seu Código para Sempre Formatar e Analisar Strings Com os Mesmos Padrões Que Aqueles em Dados de Localidade Legados](<#/doc/guides/migrate/migrating-jdk-8-later-jdk-releases>). Esta opção é mais localizada.

Por exemplo, aqui está um provedor de dados de localidade personalizado que pode ser usado no JDK 9 e posteriores para restabelecer o padrão separado por hífens para datas do Reino Unido do JDK 8:
```
    package com.example.localization;
    import java.text.*;
    import java.text.spi.*;
    import java.util.*;
    
    public class HyphenatedUKDates extends DateFormatProvider {
    
         @Override
         public Locale[] getAvailableLocales() {
             return new Locale[]{Locale.UK};
         }
    
         @Override
         public DateFormat getDateInstance(int style, Locale locale) {
             assert locale.equals(Locale.UK);
             switch (style) {
                 case DateFormat.FULL:
                     return new SimpleDateFormat("EEEE, d MMMM yyyy");
                 case DateFormat.LONG:
                     return new SimpleDateFormat("dd MMMM yyyy");
                 case DateFormat.MEDIUM:
                     return new SimpleDateFormat("dd-MMM-yyyy");
                 case DateFormat.SHORT:
                     return new SimpleDateFormat("dd/MM/yy");
                 default:
                     throw new IllegalArgumentException("style not supported");
             }
         }
    
         @Override
         public DateFormat getDateTimeInstance(int dateStyle, int timeStyle,
                                               Locale locale)
         {
             ...
         }
    
         @Override
         public DateFormat getTimeInstance(int style, Locale locale) {
             ...
         }
    
    }
```

O seguinte é outro exemplo. O nome abreviado do mês para setembro difere entre `CLDR` e `COMPAT` na localidade do Reino Unido. A seguinte implementação SPI aborda esta incompatibilidade:
```
    package spi;
    
    import java.text.DateFormatSymbols;
    import java.text.spi.DateFormatSymbolsProvider;
    import java.util.Locale;
    
    public class ShortMonthModifier extends DateFormatSymbolsProvider {
    
        @Override
        public DateFormatSymbols getInstance(Locale locale) {
            assert locale.equals(Locale.UK);
            return new DateFormatSymbols() {
                @Override
                public String[] getShortMonths() {
                    var ret = new DateFormatSymbols(Locale.UK).getShortMonths().clone();
                    ret[Calendar.SEPTEMBER] = "Sep";
                    return ret;
                }
            };
        }
    
        @Override
        public Locale[] getAvailableLocales() {
            return new Locale[]{Locale.UK};
        }
    }
```

Depois de implementar um provedor de dados de localidade personalizado, empacote-o conforme descrito na seção [Packaging of Locale Sensitive Service Provider Implementations](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/spi/LocaleServiceProvider.html#packaging-of-locale-sensitive-service-provider-implementations-heading>) na documentação da API JavaDoc de LocaleServiceProvider. Em seguida, coloque-o no classpath e execute suas aplicações com a opção de linha de comando `-Djava.locale.providers=SPI,CLDR`.

Consulte [JEP 252: Use CLDR Locale Data by Default](<http://openjdk.java.net/jeps/252>).

### Encapsulamento Forte no JDK

Algumas ferramentas e bibliotecas usam reflexão para acessar partes do JDK que são destinadas apenas para uso interno. Este uso de reflexão impacta negativamente a segurança e a manutenibilidade do JDK. Para auxiliar na migração, o JDK 9 ao JDK 16 permitiu que esta reflexão continuasse, mas emitia avisos sobre acesso reflexivo ilegal. No entanto, o JDK 17 e posteriores são fortemente encapsulados, então esta reflexão não é mais permitida por padrão. O código que acessa campos e métodos não públicos de APIs `java.*` lançará uma `InaccessibleObjectException`.

Nota:

O encapsulamento forte se aplica às APIs `java.*` no JDK. Os pacotes `sun.misc` e `sun.reflect` não são fortemente encapsulados. Eles estão disponíveis para reflexão por bibliotecas e ferramentas em todas as versões do JDK, incluindo o JDK 25. Isso inclui a classe `sun.misc.Unsafe`.

Embora a classe `sun.misc.Unsafe` ainda esteja disponível, seus métodos não são suportados e a maioria foi substituída por APIs padrão. Como resultado, os métodos substituídos foram descontinuados para remoção no JDK 23. Invocá-los no JDK 24 ou superior causa um aviso em tempo de execução. Consulte [JEP 498: Warn upon Use of Memory-Access Methods in sun.misc.Unsafe](<https://openjdk.org/jeps/498>).

A opção de launcher `java` `--illegal-access` permitia a reflexão para internos do JDK no JDK 9 ao JDK 16. Você poderia especificar os seguintes parâmetros:

  * `--illegal-access=permit`: Permite que o código no classpath reflita sobre os internos dos pacotes `java.*` que existiam no JDK 8. A primeira operação de acesso reflexivo a qualquer um desses elementos causa a emissão de um aviso, mas nenhum aviso é emitido após esse ponto.
  * `--illegal-access=warn`: Causa a emissão de uma mensagem de aviso para cada operação de acesso reflexivo ilegal.
  * `--illegal-access=debug`: Causa a exibição de uma mensagem de aviso e um stack trace para cada operação de acesso reflexivo ilegal.
  * `--illegal-access=deny`: Desabilita todas as operações de acesso reflexivo ilegal, exceto aquelas habilitadas por outras opções de linha de comando, como `--add-opens`.

Muitas ferramentas e bibliotecas foram atualizadas para evitar depender de internos do JDK e, em vez disso, usar APIs Java padrão que foram introduzidas entre o JDK 8 e 17. Isso significa que a opção de launcher `--illegal-access` está obsoleta no JDK 17. Qualquer uso desta opção de launcher no JDK 17, seja com `permit`, `warn`, `debug` ou `deny`, não terá efeito além de emitir uma mensagem de aviso.

Se você não conseguir obter ou implantar versões mais recentes de ferramentas e bibliotecas, existem duas opções de linha de comando que permitem conceder acesso a APIs internas específicas para versões mais antigas de ferramentas e bibliotecas:

  * [`--add-exports Option`](<#/doc/guides/migrate/migrating-jdk-8-later-jdk-releases>): Se você tem uma ferramenta ou biblioteca mais antiga que precisa usar uma API interna que foi fortemente encapsulada, use a opção de tempo de execução `--add-exports`. Você também pode usar `--add-exports` em tempo de compilação para acessar as APIs internas.
  * [`--add-opens Option`](<#/doc/guides/migrate/migrating-jdk-8-later-jdk-releases>): Se você tem uma ferramenta ou biblioteca mais antiga que precisa acessar campos e métodos não públicos de APIs `java.*` por reflexão, use a opção `--add-opens`.

Consulte [JEP 403: Strongly Encapsulate JDK Internals by Default](<http://openjdk.java.net/jeps/403>).

#### `--add-exports Option`

Se você tem uma ferramenta ou biblioteca mais antiga que precisa usar uma API interna que foi fortemente encapsulada, use a opção de tempo de execução `--add-exports`. Você também pode usar `--add-exports` em tempo de compilação para acessar as APIs internas.

A sintaxe da opção `--add-exports` é:
```
    --add-exports <source-module>/<package>=<target-module>(,<target-module>)*
```

onde `<source-module>` e `<target-module>` são nomes de módulos e `<package>` é o nome de um pacote.

A opção `--add-exports` permite que o código no módulo de destino acesse tipos no pacote nomeado do módulo de origem se o módulo de destino ler o módulo de origem.

Como um caso especial, se o `<target-module>` for `ALL-UNNAMED`, então o pacote de origem é exportado para todos os módulos sem nome, quer existam inicialmente ou sejam criados posteriormente. Por exemplo:
```
    --add-exports java.management/sun.management=ALL-UNNAMED
```

Este exemplo permite que o código em todos os módulos sem nome (código no classpath) acesse os membros públicos de tipos públicos em `java.management/sun.management`.

Nota:

Se o código no classpath usar a API de reflexão (setAccessible(true)) para tentar acessar campos e métodos não públicos de APIs `java.*`, o código falhará. O JDK 17 não permite isso por padrão. No entanto, você pode usar a opção `--add-opens` para permitir isso. Consulte a seção [`--add-opens Option`](<#/doc/guides/migrate/migrating-jdk-8-later-jdk-releases>) para mais informações.

Se uma aplicação `oldApp` que é executada no classpath deve usar o pacote não exportado `com.sun.jmx.remote.internal` do módulo `java.management`, então o acesso que ela requer pode ser concedido desta forma:
```
    --add-exports java.management/com.sun.jmx.remote.internal=ALL-UNNAMED
```

Você também pode usar o atributo de manifesto de arquivo JAR `Add-Exports`:
```
    Add-Exports:java.management/sun.management
```

Use a opção `--add-exports` com cuidado. Você pode usá-la para obter acesso a uma API interna de um módulo de biblioteca, ou mesmo do próprio JDK, mas o faz por sua conta e risco. Se essa API interna mudar ou for removida, sua biblioteca ou aplicação falhará.

Consulte [JEP 261: Module System](<http://openjdk.java.net/jeps/261>).

#### `--add-opens Option`

Algumas ferramentas e bibliotecas usam a API de reflexão (setAccessible(true)) para tentar acessar campos e métodos não públicos de APIs `java.*`. Isso não é mais possível por padrão no JDK 17, mas você pode usar a opção `--add-opens` na linha de comando para habilitá-lo para ferramentas e bibliotecas específicas.

A sintaxe para `--add-opens` é:
```
    --add-opens <module>/<package>=<target-module>(,<target-module>)*
```

Esta opção permite que `<module>` abra `<package>` para `<target-module>`, independentemente da declaração do módulo.

Como um caso especial, se o `<target-module>` for `ALL-UNNAMED`, então o pacote de origem é exportado para todos os módulos sem nome, quer existam inicialmente ou sejam criados posteriormente. Por exemplo:
```
    --add-opens java.management/sun.management=ALL-UNNAMED
```

Este exemplo permite que todo o código no classpath acesse membros não públicos de tipos públicos no pacote `java.management/sun.management`.

Nota:

Em um arquivo JNLP para Java Web Start, você deve incluir um sinal de igual entre `--add-opens` e seu valor.
```
    <j2se version="10" java-vm-args="--add-opens=<module>/<package>=ALL-UNNAMED"  />
```

O sinal de igual entre `--add-opens` e seu valor é opcional na linha de comando.

### Novo Esquema de String de Versão

O JDK 10 introduziu algumas pequenas mudanças, para melhor acomodar o modelo de lançamento baseado em tempo, no esquema de string de versão introduzido no JDK 9. O JDK 11 e posteriores mantêm o formato de string de versão que foi introduzido no JDK 10.

Se seu código depende do formato da string de versão para distinguir versões de atualização principal, secundária, de segurança e de patch, você pode precisar atualizá-lo.

O formato da nova string de versão é:

`$FEATURE.$INTERIM.$UPDATE.$PATCH`

Uma API Java simples para analisar, validar e comparar strings de versão foi adicionada. Consulte [java.lang.Runtime.Version](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/Runtime.Version.html>).

Consulte [Version String Format](<#/>) no Java Platform, Standard Edition Installation Guide.

Para as mudanças na string de versão introduzidas no JDK 9, consulte [JEP 223: New Version-String Scheme](<http://openjdk.java.net/jeps/223>).

Para as mudanças na string de versão introduzidas no JDK 10, consulte [JEP 322: Time-Based Release Versioning](<http://openjdk.java.net/jeps/322>).

### Mudanças na Imagem Instalada do JDK/JRE

Mudanças significativas foram feitas no JDK e JRE.

#### Layout do JDK e JRE Alterado

Depois de instalar o JDK, se você observar o sistema de arquivos, notará que o layout do diretório é diferente do das versões anteriores ao JDK 9.

JDK 11 e Posteriores

O JDK 11 e posteriores não possuem a imagem JRE. Consulte [Installed Directory Structure of JDK](<#/>) no Java Platform, Standard Edition Installation Guide.

JDK 9 e JDK 10

Versões anteriores tinham dois tipos de imagens de tempo de execução: o JRE, que era uma implementação completa da Plataforma Java SE, e o JDK, que incluía todo o JRE em um diretório `jre/`, além de ferramentas e bibliotecas de desenvolvimento.

No JDK 9 e JDK 10, o JDK e o JRE são dois tipos de imagens de tempo de execução modulares contendo os seguintes diretórios:

  * `bin`: contém executáveis binários.

  * `conf`: contém arquivos `.properties`, `.policy` e outros tipos de arquivos destinados a serem editados por desenvolvedores, implantadores e usuários finais. Esses arquivos eram anteriormente encontrados no diretório `lib` ou em seus subdiretórios.

  * `lib`: contém bibliotecas vinculadas dinamicamente e a implementação interna completa do JDK.

No JDK 9 e JDK 10, ainda existem downloads separados de JDK e JRE, mas cada um tem a mesma estrutura de diretórios. A imagem do JDK contém as ferramentas e bibliotecas extras que historicamente foram encontradas no JDK. Não há diretórios wrapper `jdk/` versus `jre/`, e os binários (como o comando `java`) não são duplicados.

Consulte [JEP 220: Modular Run-Time Images](<http://openjdk.java.net/jeps/220>).

#### Novas Implementações de Class Loader

O JDK 9 e versões posteriores mantêm a hierarquia de class loaders que existia desde a versão 1.2. No entanto, as seguintes mudanças foram feitas para implementar o sistema de módulos:

  * O class loader da aplicação não é mais uma instância de URLClassLoader, mas sim de uma classe interna. É o loader padrão para classes em módulos que não são módulos Java SE nem JDK.

  * O class loader de extensão foi renomeado; agora é o platform class loader. Todas as classes na Plataforma Java SE têm garantia de serem visíveis através do platform class loader.

Só porque uma classe é visível através do platform class loader não significa que a classe é realmente definida pelo platform class loader. Algumas classes na Plataforma Java SE são definidas pelo platform class loader, enquanto outras são definidas pelo bootstrap class loader. As aplicações não devem depender de qual class loader define qual classe da plataforma.

As mudanças que foram implementadas no JDK 9 podem impactar o código que cria class loaders com `null` (ou seja, o bootstrap class loader) como o class loader pai e assume que todas as classes da plataforma são visíveis para o pai. Tal código pode precisar ser alterado para usar o platform class loader como o pai (consulte [ClassLoader.getPlatformClassLoader](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/ClassLoader.html#getPlatformClassLoader\(\)>)).

O platform class loader não é uma instância de URLClassLoader, mas sim de uma classe interna.

  * O bootstrap class loader ainda é embutido na Java Virtual Machine e representado por `null` na API ClassLoader. Ele define as classes em um punhado de módulos críticos, como java.base. Como resultado, ele define muito menos classes do que no JDK 8, então aplicações que são implantadas com `-Xbootclasspath/a` ou que criam class loaders com `null` como o pai podem precisar ser alteradas conforme descrito anteriormente.

#### `rt.jar` e `tools.jar` Removidos

Arquivos de classe e recurso anteriormente armazenados em `lib/rt.jar`, `lib/tools.jar`, `lib/dt.jar` e vários outros arquivos JAR internos são armazenados em um formato mais eficiente em arquivos específicos da implementação no diretório `lib`.

A remoção de `rt.jar` e arquivos semelhantes leva a problemas nestas áreas:

  * A partir do JDK 9, [ClassLoader.getSystemResource](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/ClassLoader.html#getSystemResource\(java.lang.String\)>) não retorna uma URL apontando para um arquivo JAR (porque não há arquivos JAR). Em vez disso, ele retorna uma URL `jrt`, que nomeia os módulos, classes e recursos armazenados em uma imagem de tempo de execução sem revelar a estrutura interna ou o formato da imagem.

Por exemplo:
`ClassLoader.getSystemResource("java/lang/Class.class");
```

Quando executado no JDK 8, este método retorna uma URL JAR do formulário:
`jar:file:/usr/local/jdk8/jre/lib/rt.jar!/java/lang/Class.class
```

que incorpora uma URL de arquivo para nomear o arquivo JAR real dentro da imagem de tempo de execução.

Uma imagem modular não contém nenhum arquivo JAR, então URLs desta forma não fazem sentido. No JDK 9 e versões posteriores, este método retorna:
`jrt:/java.base/java/lang/Class.class
```

  * A API java.security.CodeSource e os arquivos de política de segurança usam URLs para nomear os locais de bases de código que devem receber permissões específicas. Consulte Policy File Syntax no Java Platform, Standard Edition Security Developer's Guide. Componentes do sistema de tempo de execução que exigem permissões específicas são atualmente identificados no arquivo `conf/security/java.policy` usando URLs de arquivo.

  * Versões mais antigas de IDEs e outras ferramentas de desenvolvimento exigem a capacidade de enumerar os arquivos de classe e recurso armazenados em uma imagem de tempo de execução, e de ler seus conteúdos diretamente abrindo e lendo `rt.jar` e arquivos semelhantes. Isso não é possível com uma imagem modular.

#### Mecanismo de Extensão Removido

No JDK 8 e anteriores, o mecanismo de extensão possibilitava que o ambiente de tempo de execução encontrasse e carregasse classes de extensão sem nomeá-las especificamente no classpath. A partir do JDK 9, se você precisar usar as classes de extensão, certifique-se de que os arquivos JAR estejam no classpath.

No JDK 9 e JDK 10, o compilador `javac` e o launcher `java` sairão se a propriedade de sistema `java.ext.dirs` estiver definida, ou se o diretório `lib/ext` existir. Para verificar adicionalmente o diretório systemwide específico da plataforma, especifique a opção de linha de comando `-XX:+CheckEndorsedAndExtDirs`. Isso faz com que o mesmo comportamento de saída ocorra se o diretório existir e não estiver vazio. O class loader de extensão é mantido no JDK 9 (e versões posteriores) e é especificado como o platform class loader (consulte getPlatformClassLoader). No entanto, no JDK 11, esta opção está obsoleta e um aviso é emitido quando ela é usada.

O seguinte erro significa que seu sistema está configurado para usar o mecanismo de extensão:
```
    <JAVA_HOME>/lib/ext exists, extensions mechanism no longer supported; Use -classpath instead.
    .Error: Could not create the Java Virtual Machine.
    Error: A fatal exception has occurred. Program will exit.
```

Você verá um erro semelhante se a propriedade de sistema `java.ext.dirs` estiver definida.

Para corrigir este erro, remova o diretório `ext/` ou a propriedade de sistema `java.ext.dirs`.

Consulte JEP 220: Modular Run-Time Images.

#### Mecanismo de Substituição de Padrões Endossados Removido

A propriedade de sistema `java.endorsed.dirs` e o diretório `lib/endorsed` não estão mais presentes. O compilador `javac` e o launcher `java` sairão se qualquer um for detectado.
A partir do JDK 9, você pode usar módulos atualizáveis ou colocar os arquivos JAR no classpath.

Este mecanismo foi projetado para que servidores de aplicação pudessem sobrescrever componentes usados no JDK. Pacotes a serem atualizados seriam colocados em arquivos JAR, e a propriedade de sistema `java.endorsed.dirs` informaria ao ambiente de tempo de execução Java onde encontrá-los. Se um valor para esta propriedade não fosse especificado, então o padrão de `$JAVA_HOME/lib/endorsed` seria usado.

No JDK 8, você pode usar o argumento de linha de comando `-XX:+CheckEndorsedAndExtDirs` para verificar a existência de tais diretórios em qualquer lugar do sistema.

No JDK 9 e versões posteriores, o compilador `javac` e o launcher `java` serão encerrados se a propriedade de sistema `java.endorsed.dirs` estiver definida, ou se o diretório `lib/endorsed` existir.

O erro a seguir significa que seu sistema está configurado para usar o mecanismo de sobrescrita de padrões endossados:
```
    <JAVA_HOME>/lib/endorsed is not supported. Endorsed standards and standalone APIs
    in modular form will be supported via the concept of upgradeable modules.
    Error: Could not create the Java Virtual Machine.
    Error: A fatal exception has occurred. Program will exit.
```

Você verá um erro semelhante se a propriedade de sistema `java.endorsed.dirs` estiver definida.

Para corrigir este erro, remova o diretório `lib/endorsed`, ou desdefina a propriedade de sistema `java.endorsed.dirs`.

Consulte JEP 220: Imagens de Tempo de Execução Modulares.

#### Recursos Específicos do macOS Removidos

Esta seção inclui recursos específicos do macOS que foram removidos, a partir do JDK 9.

##### Recursos de Desktop Específicos da Plataforma

A classe `java.awt.Desktop` contém substituições para as APIs nos pacotes específicos da Apple `com.apple.eawt` e `com.apple.eio`. As novas APIs substituem as APIs do macOS e são independentes de plataforma.

As APIs nos pacotes `com.apple.eawt` e `com.apple.eio` são encapsuladas, então você não poderá compilar contra elas no JDK 9 ou versões posteriores. No entanto, elas permanecem acessíveis em tempo de execução, então o código existente que foi compilado para versões antigas continua a funcionar. Eventualmente, bibliotecas ou aplicações que usam as classes internas nos pacotes `apple` e `com.apple` e seus subpacotes precisarão migrar para a nova API.

Os pacotes `com.apple.concurrent` e `apple.applescript` foram removidos sem qualquer substituição.

Consulte JEP 272: Recursos de Desktop Específicos da Plataforma.

##### Engine AppleScript Removido

O engine AppleScript, uma implementação `javax.script` específica da plataforma, foi removido sem qualquer substituição no JDK.

O engine AppleScript tem sido, em grande parte, inutilizável em versões recentes. A funcionalidade funcionava apenas no JDK 7 ou JDK 8 em sistemas que já possuíam a versão da Apple do arquivo `AppleScriptEngine.jar` no sistema.

#### Alterações nas Chaves do Registro do Windows

O instalador do Java 11 e versões posteriores cria chaves do registro do Windows ao instalar o JDK. Para o JDK 18, o instalador cria as seguintes chaves do registro do Windows:

  * `HKEY_LOCAL_MACHINE\SOFTWARE\JavaSoft\JDK`

  * `HKEY_LOCAL_MACHINE\SOFTWARE\JavaSoft\JDK\18`

Se duas versões do JDK estiverem instaladas, então duas chaves de registro do Windows diferentes são criadas. Por exemplo, se o JDK 17.0.1 for instalado com o JDK 18, o instalador cria outra chave de registro do Windows conforme mostrado:

  * `HKEY_LOCAL_MACHINE\SOFTWARE\JavaSoft\JDK`

  * `HKEY_LOCAL_MACHINE\SOFTWARE\JavaSoft\JDK\18`

  * `HKEY_LOCAL_MACHINE\SOFTWARE\JavaSoft\JDK\17.0.1`

### Implantação

As tecnologias de implantação Java foram descontinuadas no JDK 9 e removidas no JDK 11.

Use a ferramenta `jlink` introduzida com o JDK 9 para empacotar e implantar runtimes dedicados, em vez de depender de um JRE de sistema pré-instalado.

#### Seleção de Versão do JRE em Tempo de Lançamento Removida

A capacidade de solicitar uma versão do JRE que não seja o JRE sendo lançado em tempo de lançamento é removida, a partir do JDK 9.

Aplicações modernas são tipicamente implantadas usando Java Web Start (JNLP), sistemas de empacotamento de SO nativos ou instaladores ativos. Essas tecnologias possuem seus próprios métodos para gerenciar os JREs necessários, encontrando ou baixando e atualizando o JRE exigido, conforme necessário. Isso torna a seleção de versão do JRE em tempo de lançamento do launcher obsoleta.

Nas versões anteriores, você podia especificar qual versão do JRE (ou faixa de versões) usar ao iniciar uma aplicação. A seleção de versão era possível tanto por meio de uma opção de linha de comando quanto por uma entrada de manifesto no arquivo JAR da aplicação.

A partir do JDK 9, o launcher `java` é modificado da seguinte forma:

  * Emite uma mensagem de erro e encerra se a opção `-version:` for fornecida na linha de comando.
  * Emite uma mensagem de aviso e continua se a entrada de manifesto `JRE-Version` for encontrada em um arquivo JAR.

Consulte JEP 231: Remover Seleção de Versão do JRE em Tempo de Lançamento.

#### Suporte Removido para Applets Serializados

A partir do JDK 9, a capacidade de implantar um applet como um objeto serializado não é suportada. Com a compressão moderna e o desempenho da JVM, não há benefício em implantar um applet dessa maneira.

O atributo `object` da tag `applet` e as tags de parâmetro de applet `object` e `java object` são ignorados ao iniciar um applet.

Em vez de serializar applets, use estratégias de implantação padrão.

#### Atualização da Especificação JNLP

O JNLP (Java Network Launch Protocol) foi atualizado para remover inconsistências, facilitar a manutenção do código e aprimorar a segurança.

No JDK 9, o JNLP foi atualizado da seguinte forma:

  1. `&amp;` em vez de `&` em arquivos JNLP.

A sintaxe do arquivo JNLP está em conformidade com a especificação XML e todos os arquivos JNLP devem ser capazes de ser analisados por parsers XML padrão.

Arquivos JNLP permitem especificar comparações complexas. Anteriormente, isso era feito usando o e comercial (`&`), mas isso não é suportado em XML padrão. Se você estiver usando `&` para criar comparações complexas, então substitua-o por `&amp;` em seu arquivo JNLP. `&amp;` é compatível com todas as versões do JNLP.

  2. Comparando tipos de elementos de versão numéricos com tipos de elementos de versão não numéricos.

Anteriormente, quando um elemento de versão `int` era comparado com outro elemento de versão que não podia ser analisado como um `int`, os elementos de versão eram comparados lexicograficamente pelo valor ASCII.

Se o elemento que pode ser analisado como um `int` for uma string mais curta que o outro elemento, ele será preenchido com zeros à esquerda antes de ser comparado lexicograficamente pelo valor ASCII. Isso garante que não haverá circularidade.

No caso em que tanto comparações de versão quanto um servlet JNLP são usados, você deve usar apenas valores numéricos para representar as versões.

  3. Extensões de componentes com recursos aninhados em elementos `java` (ou `j2se`).

Isso é permitido na especificação. Era suportado anteriormente, mas esse suporte não estava refletido na especificação.

  4. Extensão FX XML.

A especificação JNLP foi aprimorada para adicionar um atributo `type` ao elemento `application-desc`, e adicionar o subelemento `param` em `application-desc` (como já existe em `applet-desc`).

Isso não causa problemas com aplicações existentes porque a forma anterior de especificar uma aplicação JavaFX ainda é suportada.

Consulte as atualizações da especificação JNLP em JSR-056.

### Alterações na Coleta de Lixo

Esta seção descreve as alterações na coleta de lixo a partir do JDK 9.

#### Tornar G1 o Coletor de Lixo Padrão

O Garbage-First Garbage Collector (G1 GC) é o coletor de lixo padrão no JDK 9 e versões posteriores.

Um coletor de baixa pausa como o G1 GC deve proporcionar uma experiência geral melhor, para a maioria dos usuários, do que um coletor orientado a throughput como o Parallel GC, que é o padrão do JDK 8.

Consulte Padrões Ergonômicos para G1 GC e Padrões Ajustáveis no Guia de Ajuste da Coleta de Lixo da Java Platform, Standard Edition HotSpot Virtual Machine para mais informações sobre o ajuste do G1 GC.

#### Opções de GC Removidas

As seguintes combinações de GC farão com que sua aplicação falhe ao iniciar no JDK 9 e versões posteriores:

  * `DefNew + CMS`
  * `ParNew + SerialOld`
  * `Incremental CMS`

O modo foreground para CMS também foi removido. As flags de linha de comando que foram removidas são `-Xincgc`, `-XX:+CMSIncrementalMode`,` -XX:+CMSCompactAtFullCollection`, `-XX:+CMSFullGCsBeforeCompaction`, e` -XX:+UseCMSCollectionPassing`.

A flag de linha de comando `-XX:+UseParNewGC` não tem mais efeito. A flag `ParNew` pode ser usada apenas com CMS e CMS requer `ParNew`. Assim, a flag `-XX:+UseParNewGC` foi descontinuada e é elegível para remoção em uma versão futura.

Consulte JEP 214: Remover Combinações de GC Descontinuadas no JDK 8.

Nota:

O coletor de lixo CMS foi removido. Consulte JEP 363: Remover o Coletor de Lixo Concurrent Mark Sweep (CMS).

Geração Permanente Removida

A geração permanente foi removida no JDK 8, e as opções de VM relacionadas causam a impressão de um aviso. Você deve remover essas opções de seus scripts:

  * `-XX:MaxPermSize=size`

  * `-XX:PermSize=size`

No JDK 9 e versões posteriores, a JVM exibe um aviso como este:
```
    Java HotSpot(TM) 64-Bit Server VM warning: Ignoring option MaxPermSize; support was removed in 8.0
```

Ferramentas que estão cientes da geração permanente podem precisar ser atualizadas.

Consulte JEP 122: Remover a Geração Permanente e Notas de Lançamento do JDK 9 - APIs, Recursos e Opções Removidos.

#### Alterações na Saída de Log do GC

O logging da coleta de lixo (GC) usa o framework de logging unificado da JVM, e há algumas diferenças entre os logs novos e os antigos. Quaisquer parsers de log de GC com os quais você esteja trabalhando provavelmente precisarão ser alterados.

Você também pode precisar atualizar suas opções de logging da JVM. Todo o logging relacionado ao GC deve usar a tag `gc` (por exemplo, `—Xlog:gc`), geralmente em combinação com outras tags. As opções `—XX:+PrintGCDetails` e `-XX:+PrintGC` foram descontinuadas.

Consulte Habilitar Logging com o Framework de Logging Unificado da JVM nas Especificações da Ferramenta do Java Development Kit e JEP 271: Logging Unificado do GC.

### Executando Applets Java

Se você ainda depende de applets, pode ser possível iniciá-los em sistemas Windows usando o JRE 8 com o Microsoft Edge no modo Internet Explorer. Consulte Microsoft Edge + modo Internet Explorer: Guia de Introdução.

A partir de setembro de 2021, o Plugin Java necessário para iniciar Applets permanece atualizado no Windows no Java 8, mas pode ser removido a qualquer momento em uma futura versão de atualização.

Clientes Oracle podem encontrar mais informações em My.Oracle.Support Nota 251148.1 - Fim do Suporte ao Plugin Java SE 8 (requer login).

### Mudança de Comportamento na Correspondência de Expressões Regulares

A classe `java.util.regex.Pattern` define classes de caracteres em expressões regulares com colchetes. Por exemplo, `[abc]` corresponde a `a,b`, ou `c`. Classes de caracteres negadas são definidas com um acento circunflexo imediatamente após o colchete de abertura. Por exemplo, `[^abc]` corresponde a qualquer caractere, exceto `a,b`, ou `c`.

No JDK 8 e anteriores, as classes de caracteres negadas não negavam classes de caracteres aninhadas. Por exemplo, `[^a-b[c-d]e-f]` corresponde a `c`, mas não corresponde a `a` ou `e`, pois eles não estão dentro da classe aninhada. Os operadores são aplicados um após o outro. Neste exemplo, o operador de negação `^` é aplicado antes do aninhamento. No JDK 8 e anteriores, o operador `^` era aplicado apenas aos caracteres mais externos na classe de caracteres, mas não às classes de caracteres aninhadas. Este comportamento era confuso e difícil de entender.

No entanto, no JDK 9 e posteriores, o operador de negação foi aplicado a todas as classes de caracteres aninhadas. Por exemplo, `[^a-b[c-d]e-f]` não corresponde a `c`.

Para explicar melhor, considere a seguinte expressão regular:
```
    [^a-d&&c-f]
```

No JDK 8, o operador `^` é aplicado primeiro, portanto, este exemplo é interpretado como `[^a-d]` intersectado com `[c-f]`. Isso corresponde a `e` e `f`, mas não a `a`, `b`, `c` ou `d`.

No JDK 9 e posteriores, o operador `&&` é aplicado primeiro, portanto, este exemplo é interpretado como o complemento de `[a-d]&&[c-f]`. Isso corresponde a `a`, `b`, `e` e `f`, mas não a `c` ou `d`.

Como boa prática, procure por expressões regulares que usam classes de caracteres com alguma combinação de negação, interseção e classes aninhadas. Essas expressões regulares podem precisar ser ajustadas para considerar o comportamento alterado.

### Plano para a Remoção do Security Manager

No JDK 17, o Security Manager e as APIs relacionadas a ele foram descontinuados e estão sujeitos a remoção em uma versão futura. Não há substituto para o Security Manager. Consulte JEP 411: Descontinuar o Security Manager para Remoção para discussão e alternativas.

No JDK 24, o Security Manager foi permanentemente desabilitado. A API do Security Manager será removida em uma versão futura. Consulte JEP 486: Desabilitar Permanentemente o Security Manager e O Security Manager Está Permanentemente Desabilitado no Guia do Desenvolvedor de Segurança da Java Platform, Standard Edition.

### Finalização Descontinuada para Remoção

A finalização foi descontinuada para remoção no JDK 18.

O uso da finalização é desencorajado. Pode levar a problemas de segurança, desempenho e confiabilidade. Consulte JEP 421: Descontinuar a Finalização para Remoção.

Para informações sobre como detectar e migrar da finalização, consulte:

  * Finalização e Referências Fracas, Suaves e Fantasma no Guia de Ajuste da Coleta de Lixo da Java Platform, Standard Edition HotSpot Virtual Machine
  * Monitorando os Objetos Pendentes de Finalização no Guia de Solução de Problemas da Java Platform, Standard Edition

### Restrições e Avisos ao Acessar Código Nativo

A plataforma Java contém duas interfaces que permitem que o código Java e o código nativo interoperem entre si:

  * A Java Native Interface (JNI) permite que o código Java executado dentro de uma Java Virtual Machine (VM) interopere com aplicações e bibliotecas escritas em outras linguagens de programação, como C, C++ e assembly.
  * A Foreign Function and Memory (FFM) API permite que o código Java invoque funções estrangeiras e acesse com segurança memória estrangeira. Uma função estrangeira é um código fora da JVM. Memória estrangeira é memória não gerenciada pela JVM. A FFM API é a alternativa preferida à JNI porque mitiga melhor os riscos de interagir com código nativo.

Tanto na JNI quanto na FFM API, para chamar código nativo, você deve primeiro carregar uma biblioteca nativa e então vincular um construto Java a uma função na biblioteca. Os métodos e funções envolvidos nessas etapas de carregamento e vinculação são restritos. Se usados incorretamente, eles podem travar a JVM e podem silenciosamente resultar em corrupção de memória. Essas restrições são chamadas de restrições de acesso nativo. A FFM API exige que você habilite o acesso nativo especificando uma opção de linha de comando se uma aplicação chamar qualquer um de seus métodos que possuam restrições de acesso nativo. No JDK 24 e posteriores, a JNI também exigirá que você especifique a mesma opção de linha de comando se você chamar qualquer uma de suas funções ou métodos que possuam restrições de acesso nativo.

O código que usa JNI é afetado por restrições de acesso nativo se alguma das seguintes condições for verdadeira:

  * Ele chama System::loadLibrary, System::load, Runtime::loadLibrary, ou Runtime::load.

Esses métodos carregam bibliotecas nativas, o que é arriscado porque podem fazer com que o código nativo seja executado. Se uma biblioteca nativa definir funções de inicialização, o sistema operacional as executa ao carregar a biblioteca. Essas funções contêm código nativo arbitrário. Além disso, se uma biblioteca nativa definir uma função JNI_OnLoad, o tempo de execução Java a invoca ao carregar a biblioteca. Esta função também contém código nativo arbitrário.

  * Ele declara um método `native`.

Quando um método `native` é chamado pela primeira vez, ele é automaticamente vinculado a uma função correspondente em uma biblioteca nativa. (Consulte Resolvendo Nomes de Métodos Nativos.) Esta etapa de vinculação, que é chamada de binding, é uma operação restrita. A JNI não pode verificar se o método nativo é compatível com a função vinculada na biblioteca nativa.

O código que usa a FFM API é afetado por restrições de acesso nativo se usar um método restrito. Consulte Métodos Restritos.

Habilitando Acesso Nativo

Para habilitar o acesso nativo para módulos específicos no module path, especifique uma lista de nomes de módulos separados por vírgulas:
```
    java --enable-native-access=M1,M2,... MyApp
```

Para habilitar o acesso nativo para todo o código no classpath, o que permite o acesso a métodos e funções restritos da JNI e FFM API, use a seguinte opção de linha de comando:
```
    java --enable-native-access=ALL-UNNAMED MyApp
```

Você também pode especificar a opção `--enable-native-access` da seguinte forma:

  * Defina-o na variável de ambiente JDK_JAVA_OPTIONS. Consulte Usando a Variável de Ambiente do Launcher JDK_JAVA_OPTIONS.
  * Especifique-o em um arquivo de argumento de linha de comando. Consulte Arquivos de Argumentos de Linha de Comando java.
  * Adicione `Enable-Native-Access: ALL-UNNAMED` ao manifesto de um arquivo JAR executável. Consulte Manifesto JAR.
  * Se você criou um runtime personalizado para sua aplicação, especifique-o no comando `jlink` através do plugin `--add-options`. Execute o comando `jlink -list-plugins` para uma lista de plugins disponíveis.
  * Se seu código cria módulos dinamicamente, habilite o acesso nativo para eles com o método  ModuleLayer.Controller::enableNativeAccess, que é ele próprio um método restrito da FFM API. O código pode verificar dinamicamente se seu módulo tem acesso nativo com o método  Module::isNativeAccessEnabled.
  * A JNI Invocation API permite que uma aplicação nativa incorpore uma JVM em seu próprio processo. Uma aplicação nativa que usa a JNI Invocation API pode habilitar o acesso nativo para módulos na JVM incorporada especificando a opção \--enable-native-access ao criar a JVM. Consulte a função JNI_CreateJavaVM.

Habilitando o Acesso Nativo de Forma Mais Seletiva

A opção `--enable-native-access=ALL-UNNAMED` remove as restrições de acesso nativo para todas as classes no classpath. Recomenda-se que você habilite o acesso nativo de forma mais seletiva movendo os arquivos JAR que usam a JNI ou a FFM API para o module path. Isso permite que o acesso nativo seja habilitado especificamente para esses arquivos JAR, e não para todo o classpath. Você pode mover um arquivo JAR do classpath para o module path sem que ele seja modularizado. O runtime Java o tratará como um módulo automático cujo nome é baseado em seu nome de arquivo. Consulte Modularização Incremental com Módulos Automáticos.

Controlando o Efeito das Restrições de Acesso Nativo

Se o acesso nativo não estiver habilitado para um módulo, então é ilegal para o código nesse módulo realizar uma operação restrita, em particular, chamar qualquer função ou método restrito da JNI ou da FFM API. No JDK 24 e posteriores, você pode especificar o que acontece quando tal módulo realiza uma operação restrita definindo a opção de linha de comando `--illegal-native-access` para um dos seguintes valores:

  * allow: Permite que a operação restrita prossiga.
  * warn: Permite que a operação restrita prossiga e emite um aviso na primeira vez que um acesso nativo ilegal ocorre em um módulo específico. No máximo um aviso por módulo é emitido. Este é o valor padrão no JDK 24 e posteriores.
  * deny: Lança uma IllegalCallerException para cada operação de acesso nativo ilegal. Este será o valor padrão em uma versão futura do JDK.

Recomenda-se que você execute o código existente com \--illegal-native-access=deny para identificar o código que requer acesso nativo.

Identificando o Uso de Código Nativo

Os eventos JFR `jdk.NativeLibraryLoad` e `jdk.NativeLibraryUnload` rastreiam o carregamento e descarregamento de bibliotecas nativas.

A ferramenta `jnativescan` ajuda a identificar bibliotecas que usam a JNI. Ela escaneia estaticamente o código em um module path ou classpath fornecido e relata usos de métodos restritos e declarações de métodos `native`.