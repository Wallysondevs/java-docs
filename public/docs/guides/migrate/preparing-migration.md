# Preparando para a Migração

## 6 Preparando para a Migração

Dica:

Avalie o Esforço de Migração com a Análise de Migração Java

A Oracle oferece aos assinantes do Java SE e usuários do Oracle Cloud Infrastructure (OCI) o [recurso de Análise de Migração Java no Java Management Service](<https://docs.oracle.com/en-us/iaas/jms/doc/java-migration-analysis.html>). Este recurso realiza uma análise abrangente do esforço envolvido na migração para uma nova versão do JDK. Ele gera relatórios detalhados destacando o esforço necessário e as áreas que precisam de modificação para migrar de uma versão mais antiga do JDK para uma mais recente. Durante o processo de migração, você pode utilizar os relatórios de análise da Análise de Migração para identificar classes e APIs que exigem alterações. Os relatórios especificam os números de linha no código-fonte onde as modificações são necessárias e destacam as alterações obrigatórias e recomendadas.

As seções a seguir o ajudarão a migrar seu aplicativo com sucesso:

  * [Baixe o JDK Mais Recente](<#/doc/guides/migrate/preparing-migration>)

  * [Execute Seu Programa Antes de Recompilar](<#/doc/guides/migrate/preparing-migration>)

  * [Atualize Bibliotecas de Terceiros](<#/doc/guides/migrate/preparing-migration>)

  * [Compile Seu Aplicativo se Necessário](<#/doc/guides/migrate/preparing-migration>)

  * [Execute jdeps em Seu Código](<#/doc/guides/migrate/preparing-migration>)

### Baixe o JDK Mais Recente

Baixe e instale a versão mais recente do JDK em [Java SE Downloads](<https://www.oracle.com/javadownload>).

### Execute Seu Programa Antes de Recompilar

Tente executar seu aplicativo na versão mais recente do JDK (JDK 25). A maioria do código e das bibliotecas deve funcionar no JDK 25 sem alterações, mas pode haver algumas bibliotecas que precisam ser atualizadas.

Nota:

A migração é um processo iterativo. Você provavelmente achará melhor tentar executar seu programa (esta tarefa) primeiro e, em seguida, concluir estas três tarefas em paralelo:

  * [Atualize Bibliotecas de Terceiros](<#/doc/guides/migrate/preparing-migration>)

  * [Compile Seu Aplicativo se Necessário](<#/doc/guides/migrate/preparing-migration>)

  * [Execute jdeps em Seu Código](<#/doc/guides/migrate/preparing-migration>)

Ao executar seu aplicativo, procure por avisos da JVM sobre opções de VM obsoletas. Se a VM falhar ao iniciar, procure por [Opções de GC Removidas](<#/doc/guides/migrate/migrating-jdk-8-later-jdk-releases>).

Se seu aplicativo iniciar com sucesso, examine cuidadosamente seus testes e certifique-se de que o comportamento é o mesmo da versão do JDK que você tem usado. Por exemplo, alguns dos primeiros usuários notaram que suas datas e moedas são formatadas de forma diferente. Consulte [Esteja Ciente das Alterações nos Dados de Localidade](<#/doc/guides/migrate/migrating-jdk-8-later-jdk-releases>).

Para fazer seu código funcionar na versão mais recente do JDK, entenda os novos recursos e alterações em cada versão do JDK. Consulte [Alterações Significativas no JDK](<#/doc/guides/migrate/significant-changes-jdk-release>).

Mesmo que seu programa pareça ser executado com sucesso, você deve concluir o restante das etapas neste guia e revisar a lista de problemas.

### Atualize Bibliotecas de Terceiros

Para cada ferramenta e biblioteca de terceiros que você usa, pode ser necessário ter uma versão atualizada que suporte a versão mais recente do JDK.

Verifique os sites de suas bibliotecas de terceiros e de seus fornecedores de ferramentas para uma versão de cada biblioteca ou ferramenta que seja projetada para funcionar no JDK mais recente. Se existir uma, baixe e instale a nova versão.

Se você usa Maven ou Gradle para construir seu aplicativo, certifique-se de atualizar para uma versão recente que suporte a versão mais recente do JDK.

Se você usa uma IDE para desenvolver seus aplicativos, isso pode ajudar na migração do código existente. As IDEs NetBeans, Eclipse e IntelliJ têm versões disponíveis que incluem suporte para o JDK mais recente.

Você pode ver o status dos testes de muitos projetos de Software Livre e de Código Aberto (FOSS) com builds do OpenJDK em [Quality Outreach](<https://wiki.openjdk.java.net/display/quality/Quality+Outreach>) na wiki do OpenJDK.

### Compile Seu Aplicativo se Necessário

Compilar seu código com o compilador JDK mais recente facilitará a migração para futuras versões, pois o código pode depender de APIs e recursos que foram identificados como problemáticos. No entanto, não é estritamente necessário.

Se você precisar compilar seu código com compiladores JDK 11 e posteriores, observe o seguinte:

  * Use a nova flag `--release` em vez das opções `-source` e `-target`. Consulte [javac](<https://docs.oracle.com/en/java/javase/25/docs/specs/man/javac.html>) nas Especificações da Ferramenta do Java Development Kit.

Os valores suportados de `--release` são a versão atual do Java SE e um número limitado de versões anteriores, detalhados na ajuda da linha de comando.

O `javac` pode reconhecer e processar arquivos de classe de todos os JDKs anteriores, desde os arquivos de classe do JDK 1.0.2.

Consulte [JEP 182: Política para Descontinuar as Opções javac -source e -target](<http://openjdk.java.net/jeps/182>).

  * Se você usa as opções `-source` e `-target` com `javac`, verifique os valores que você utiliza.

Os valores suportados de `-source/-target` são 25 (o padrão) até 9. O valor 8 está descontinuado e causa um aviso.

No JDK 8, os valores `-source` e `-target` de 1.7/7 e anteriores foram descontinuados e causaram um aviso. No JDK 9 e superior, esses valores causam um erro.
```
>javac -source 7 -target 7 Sample.java 
        warning: [options] bootstrap class path is not set in conjunction with -source 7
          not setting the bootstrap class path may lead to class files that cannot run on JDK 8
            --release 7 is recommended instead of -source 7 -target 7 because it sets the bootstrap class path automatically
        error: Source option 7 is no longer supported. Use 8 or later.
        error: Target option 7 is no longer supported. Use 8 or later.
```

Nota:

Ao usar `--release`, você não pode usar também as opções `--source`/`-source` ou `--target`/ `-target`.

  * Se você usa o caractere de sublinhado `(_)` como um identificador de um caractere no código-fonte, seu código não compilará no JDK 11 e versões posteriores. Ele gera um aviso no JDK 8 e um erro, a partir do JDK 9.

Como exemplo:
```java
static Object _ = new Object();
```

Este código gera a seguinte mensagem de erro do compilador:
```
MyClass.java:2: error: as of release 9, '_' is a keyword, and may not be used as a legal identifier.
        
```

  * APIs internas críticas do JDK, como sun.misc.Unsafe, ainda são acessíveis no JDK 11 e posteriores, mas a maioria das APIs internas do JDK não são acessíveis em tempo de compilação. Você pode receber erros de compilação que indicam que seu aplicativo ou suas bibliotecas dependem de APIs internas.

Para identificar as dependências, execute a ferramenta Java Dependency Analysis. Consulte [Execute jdeps em Seu Código](<#/doc/guides/migrate/preparing-migration>). Se possível, atualize seu código para usar as APIs de substituição suportadas.

Você pode usar as opções `[--add-exports Option](<#/doc/guides/migrate/migrating-jdk-8-later-jdk-releases>)` e `[--add-opens Option](<#/doc/guides/migrate/migrating-jdk-8-later-jdk-releases>)` como uma solução temporária para compilar código-fonte com referências a classes internas do JDK. Consulte [JEP 261: Module System](<https://openjdk.java.net/jeps/261>) e [Strong Encapsulation in the JDK](<#/doc/guides/migrate/migrating-jdk-8-later-jdk-releases>) para mais informações sobre essas opções.

  * Você pode ver mais avisos de descontinuação do que anteriormente.

### Execute jdeps em Seu Código

Execute a ferramenta `jdeps` em seu aplicativo para ver de quais pacotes e classes seus aplicativos e bibliotecas dependem. Se você usa APIs internas, o `jdeps` pode sugerir substituições para ajudá-lo a atualizar seu código.

Para procurar dependências em APIs internas do JDK, execute `jdeps` com a opção `-jdkinternals`. Por exemplo, se você executar `jdeps` em uma classe que chama `sun.misc.BASE64Encoder`, você verá:
```
    >jdeps -jdkinternals Sample.class
    Sample.class -> JDK removed internal API
       Sample  -> sun.misc.BASE64Encoder  JDK internal API (JDK removed internal API)
    
    Warning: JDK internal APIs are unsupported and private to JDK implementation that are
    subject to be removed or changed incompatibly and could break your application.
    Please modify your code to eliminate dependency on any JDK internal APIs.
    For the most recent update on JDK internal API replacements, please check:
    https://wiki.openjdk.java.net/display/JDK8/Java+Dependency+Analysis+Tool
    
    JDK Internal API                         Suggested Replacement
    ----------------                         ---------------------
    sun.misc.BASE64Encoder                   Use java.util.Base64 @since 1.8
```

Se você usa Maven, há um plugin `jdeps` disponível.

Para a sintaxe de `jdeps`, consulte `[jdeps](<https://docs.oracle.com/en/java/javase/25/docs/specs/man/jdeps.html>)` nas Especificações da Ferramenta do Java Development Kit.

Tenha em mente que `jdeps` é uma ferramenta de análise estática, e a análise estática de código pode não fornecer uma lista completa de dependências. Se o código usa reflection para chamar uma API interna, o `jdeps` não o avisará.