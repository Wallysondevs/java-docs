# Ferramentas e Componentes Removidos

## 5 Ferramentas e Componentes Removidos

A seção a seguir lista ferramentas e componentes que foram removidos ou descontinuados no JDK.

### Recursos e Opções Removidos e Descontinuados no JDK 25

Os seguintes recursos e opções foram removidos no JDK 25:

  * [Construtores de java.net.Socket Não Podem Mais Ser Usados para Criar um Datagram Socket](<https://www.oracle.com/java/technologies/javase/25-relnote-issues.html#JDK-8356154>)
  * [Remoção de Propriedades de Sistema JMX Antigas](<https://www.oracle.com/java/technologies/javase/25-relnote-issues.html#JDK-8344966>)
  * [Remoção da Amostragem de PerfData](<https://www.oracle.com/java/technologies/javase/25-relnote-issues.html#JDK-8241678>)
  * [Remoção de Contadores de Desempenho sun.rt._sync*](<https://www.oracle.com/java/technologies/javase/25-relnote-issues.html#JDK-8348829>)
  * [Certificado Raiz Baltimore CyberTrust Removido Após Data de Expiração](<https://www.oracle.com/java/technologies/javase/25-relnote-issues.html#JDK-8303770>)
  * [Dois Certificados Raiz Camerfirma Removidos](<https://www.oracle.com/java/technologies/javase/25-relnote-issues.html#JDK-8350498>)
  * [Remoção das Implementações de SecretKeyFactory Relacionadas a PBE do Provedor SunPKCS11](<https://www.oracle.com/java/technologies/javase/25-relnote-issues.html#JDK-8348732>)

Os seguintes recursos e opções foram descontinuados para remoção, o que pode causar problemas de compatibilidade durante a migração:

  * [Descontinuar o Mecanismo de Lançamento VFORK da Implementação de Processos (linux)](<https://www.oracle.com/java/technologies/javase/25-relnote-issues.html#JDK-8357179>)
  * [Descontinuar o Uso da Propriedade de Sistema java.locale.useOldISOCodes](<https://www.oracle.com/java/technologies/javase/25-relnote-issues.html#JDK-8353118>)
  * [Descontinuar a Troca de XML em JMX DescriptorSupport para Remoção](<https://www.oracle.com/java/technologies/javase/25-relnote-issues.html#JDK-8347433>)
  * [A Opção UseCompressedClassPointers Foi Descontinuada](<https://www.oracle.com/java/technologies/javase/25-relnote-issues.html#JDK-8350753>)
  * [Várias Classes de Permissão Descontinuadas para Remoção](<https://www.oracle.com/java/technologies/javase/25-relnote-issues.html#JDK-8348967>)

### Recursos e Opções Removidos e Descontinuados no JDK 24

Os seguintes recursos e opções foram removidos no JDK 24:

  * [Remover o Modo Não-Geracional](<https://openjdk.org/jeps/490>)
  * [O Suporte a GTK2 para Desktop Linux Foi Removido](<https://www.oracle.com/java/technologies/javase/24-relnote-issues.html#JDK-8329471>)
  * [Remover Comportamento Compatível com JDK1.1 para Fusos Horários "EST", "MST" e "HST"](<https://www.oracle.com/java/technologies/javase/24-relnote-issues.html#JDK-8340477>)
  * [A Constante javax.naming.Context.APPLET Foi Removida](<https://www.oracle.com/java/technologies/javase/24-relnote-issues.html#JDK-8340359>)
  * [A Propriedade de Ambiente JNDI java.naming.rmi.security.manager Foi Removida](<https://www.oracle.com/java/technologies/javase/24-relnote-issues.html#JDK-8344299>)
  * [O Download Remoto de Código JNDI Foi Permanentemente Desabilitado](<https://www.oracle.com/java/technologies/javase/24-relnote-issues.html#JDK-8338536>)
  * [Remoção da Lógica de Compatibilidade de serialVersionUID do JMX](<https://www.oracle.com/java/technologies/javase/24-relnote-issues.html#JDK-8334165>)
  * [As Opções de Linha de Comando java -t, -tm, -Xfuture, -checksource, -cs e -noasyncgc Foram Removidas](<https://www.oracle.com/java/technologies/javase/24-relnote-issues.html#JDK-8339918>)

Os seguintes recursos e opções foram descontinuados para remoção, o que pode causar problemas de compatibilidade durante a migração:

  * [java.util.zip.ZipError Foi Descontinuado para Remoção](<https://www.oracle.com/java/technologies/javase/24-relnote-issues.html#JDK-8336843>)
  * [jstatd Foi Descontinuado para Remoção](<https://www.oracle.com/java/technologies/javase/24-relnote-issues.html#JDK-8327793>)
  * [A Ferramenta jrunscript Foi Descontinuada para Remoção](<https://www.oracle.com/java/technologies/javase/24-relnote-issues.html#JDK-8341134>)
  * [O Módulo jdk.jsobject Foi Descontinuado para Remoção](<https://www.oracle.com/java/technologies/javase/24-relnote-issues.html#JDK-8311530>)
  * [A Flag LockingMode e os Modos LM_LEGACY e LM_MONITOR Foram Descontinuados](<https://www.oracle.com/java/technologies/javase/24-relnote-issues.html#JDK-8334299>)
  * [jhsdb debugd Foi Descontinuado para Remoção](<https://www.oracle.com/java/technologies/javase/24-relnote-issues.html#JDK-8338894>)
  * [As Opções de Linha de Comando java -verbosegc, -noclassgc, -verify, -verifyremote, -ss, -ms e -mx Foram Descontinuadas para Remoção](<https://www.oracle.com/java/technologies/javase/24-relnote-issues.html#JDK-8286851>)

### Recursos e Opções Removidos e Descontinuados no JDK 23

Os seguintes recursos e opções foram removidos no JDK 23:

  * [Dados de Localidade Legados](<https://www.oracle.com/java/technologies/javase/23-relnote-issues.html#JDK-8174269>): Os dados de localidade legados do `JRE` foram removidos no JDK 23. Se suas aplicações estiverem usando `JRE` ou `COMPAT` na propriedade de sistema `java.locale.providers`, migre-as para usar dados de localidade CLDR baseados no [Common Locale Data Registry](<https://cldr.unicode.org/>) do Unicode Consortium. Consulte [Be Aware of Changes to Locale Data](<#/doc/guides/migrate/migrating-jdk-8-later-jdk-releases>) e [JEP 252: Use CLDR Locale Data by Default](<https://openjdk.org/jeps/252>).
  * [Thread.suspend/resume e ThreadGroup.suspend/resume](<https://www.oracle.com/java/technologies/javase/23-relnote-issues.html#JDK-8320532>)
  * [ThreadGroup.stop](<https://www.oracle.com/java/technologies/javase/23-relnote-issues.html#JDK-8320786>)
  * [Modos de Acesso Alinhados para MethodHandles::byteArrayViewVarHandle, byteBufferViewVarHandle e Métodos Relacionados](<https://www.oracle.com/java/technologies/javase/23-relnote-issues.html#JDK-8318966>)
  * [Módulo jdk.random](<https://www.oracle.com/java/technologies/javase/23-relnote-issues.html#JDK-8330005>)
  * [Delegação de Assunto JMX](<https://www.oracle.com/java/technologies/javase/23-relnote-issues.html#JDK-8326666>)
  * [Recurso de Applet de Gerenciamento JMX (m-let)](<https://www.oracle.com/java/technologies/javase/23-relnote-issues.html#JDK-8318707>)
  * [Opção -Xnoagent do Lançador java](<https://www.oracle.com/java/technologies/javase/23-relnote-issues.html#JDK-8312150>)
  * [RegisterFinalizersAtInit Foi Obsoleto](<https://www.oracle.com/java/technologies/javase/23-relnote-issues.html#JDK-8320522>)
  * [Integração de Desktop de Instaladores Linux](<https://www.oracle.com/java/technologies/javase/23-relnote-issues.html#JDK-8322234>)

Os seguintes recursos e opções foram descontinuados para remoção, o que pode causar problemas de compatibilidade durante a migração:

  * [Métodos de Acesso à Memória em `sun.misc.Unsafe`](<https://www.oracle.com/java/technologies/javase/23-relnote-issues.html#471>): os métodos de acesso à memória em `sun.misc.Unsafe` foram descontinuados para remoção em futuras versões. Recomenda-se migrar de `sun.misc.Unsafe` para as APIs padrão, como a VarHandle API ([JEP 193](<https://openjdk.org/jeps/193>), JDK 9) e a Foreign Function & Memory API ([JEP 454](<https://openjdk.org/jeps/454>), JDK 22).

Consulte [JEP 471: Deprecate the Memory-Access Methods in sun.misc.Unsafe for Removal](<https://openjdk.org/jeps/471>).

  * [Pacote `java.beans.beancontext`](<https://www.oracle.com/java/technologies/javase/23-relnote-issues.html#JDK-8321428>)
  * [A Função JVM TI `GetObjectMonitorUsage` Não Suporta Mais Threads Virtuais](<https://www.oracle.com/java/technologies/javase/23-relnote-issues.html#JDK-8328083>)
  * [Opção de VM `PreserveAllAnnotations`](<https://www.oracle.com/java/technologies/javase/23-relnote-issues.html#JDK-8329636>)
  * [Flag `DontYieldALot`](<https://www.oracle.com/java/technologies/javase/23-relnote-issues.html#JDK-8331021>)
  * [`-XX:+UseEmptySlotsInSupers`](<https://www.oracle.com/java/technologies/javase/23-relnote-issues.html#JDK-8330607>)
  * [Opção de VM `UseNotificationThread`](<https://www.oracle.com/java/technologies/javase/23-relnote-issues.html#JDK-8329113>)

### Recursos e Opções Removidos e Descontinuados no JDK 22

Os seguintes recursos e opções foram removidos no JDK 22:

  * [sun.misc.Unsafe.shouldBeInitialized e ensureClassInitialized](<https://www.oracle.com/java/technologies/javase/22-relnote-issues.html#JDK-8316160>)
  * [Thread.countStackFrames](<https://www.oracle.com/java/technologies/javase/22-relnote-issues.html#JDK-8309196>)
  * [A Antiga Implementação de Core Reflection](<https://www.oracle.com/java/technologies/javase/22-relnote-issues.html#JDK-8305104>)
  * [Opção Jdeps -profile e -P](<https://www.oracle.com/java/technologies/javase/22-relnote-issues.html#JDK-8310460>)

Os seguintes recursos e opções foram descontinuados para remoção, o que pode causar problemas de compatibilidade durante a migração:

  * [Métodos sun.misc.Unsafe park/unpark, getLoadAverage, xxxFence](<https://www.oracle.com/java/technologies/javase/22-relnote-issues.html#JDK-8315938>)
  * [Opção -Xnoagent](<https://www.oracle.com/java/technologies/javase/22-relnote-issues.html#JDK-8312072>)
  * [Descontinuação do módulo jdk.crypto.ec](<https://www.oracle.com/java/technologies/javase/22-relnote-issues.html#JDK-8308398>)
  * [Opções -Xdebug e -debug](<https://www.oracle.com/java/technologies/javase/22-relnote-issues.html#JDK-8227229>)

### Recursos e Opções Removidos e Descontinuados no JDK 21

Os seguintes recursos e opções foram removidos no JDK 21:

  * [Certificado Raiz RootCA1 do SECOM Trust System](<https://www.oracle.com/java/technologies/javase/21-relnote-issues.html#JDK-8295894>)
  * [Cache de Caminho Canônico de java.io.File](<https://www.oracle.com/java/technologies/javase/21-relnote-issues.html#JDK-8300977>)
  * [ThreadGroup.allowThreadSuspension](<https://www.oracle.com/java/technologies/javase/21-relnote-issues.html#JDK-8297295>)
  * [Propriedade de Sistema java.compiler](<https://www.oracle.com/java/technologies/javase/21-relnote-issues.html#JDK-8041676>)
  * [Classe java.lang.Compiler](<https://www.oracle.com/java/technologies/javase/21-relnote-issues.html#JDK-8205129>)
  * [Recurso de Índice JAR](<https://www.oracle.com/java/technologies/javase/21-relnote-issues.html#JDK-8302819>)
  * [javax.management.remote.rmi.RMIIIOPServerImpl](<https://www.oracle.com/java/technologies/javase/21-relnote-issues.html#JDK-8307244>)
  * [Cache de Cartão Quente G1](<https://www.oracle.com/java/technologies/javase/21-relnote-issues.html#JDK-8225409>)

Os seguintes recursos e opções foram descontinuados para remoção, o que pode causar problemas de compatibilidade durante a migração:

  * [GTK2](<https://www.oracle.com/java/technologies/javase/21-relnote-issues.html#JDK-8280031>)
  * [com.sun.nio.file.SensitivityWatchEventModifier](<https://www.oracle.com/java/technologies/javase/21-relnote-issues.html#JDK-8303175>)
  * [Emitir Aviso para Remoção do Provedor COMPAT](<https://www.oracle.com/java/technologies/javase/21-relnote-issues.html#JDK-8304982>)
  * [Delegação de Assunto JMX e o Método JMXConnector.getMBeanServerConnection(Subject)](<https://www.oracle.com/java/technologies/javase/21-relnote-issues.html#JDK-8298966>)

### Recursos e Opções Descontinuados no JDK 20

Os seguintes recursos e opções foram descontinuados no JDK 20, o que pode causar problemas de compatibilidade durante a migração:

  * [Thread.suspend/resume Alterado para Lançar UnsupportedOperationException](<https://www.oracle.com/java/technologies/javase/20-relnote-issues.html#JDK-8249627>)
  * [Thread.Stop Alterado para Lançar UnsupportedOperationException](<https://www.oracle.com/java/technologies/javase/20-relnote-issues.html#JDK-8289610>)
  * [Construtores de java.net.URL Foram Descontinuados](<https://www.oracle.com/java/technologies/javase/20-relnote-issues.html#JDK-8294241>)
  * [Descontinuar Applets de Gerenciamento JMX para Remoção](<https://www.oracle.com/java/technologies/javase/20-relnote-issues.html#JDK-8297794>)

### Recursos e Opções Descontinuados no JDK 19

Os seguintes recursos e opções foram descontinuados no JDK 19, o que pode causar problemas de compatibilidade durante a migração:

  * [java.lang.ThreadGroup Foi Degradado](<https://www.oracle.com/java/technologies/javase/19-relnote-issues.html#JDK-8284161>)
  * [Descontinuação dos Construtores da Classe Locale](<https://www.oracle.com/java/technologies/javase/19-relnote-issues.html#JDK-8282819>)
  * [O Construtor PSSParameterSpec(int) e a Constante Estática DEFAULT Foram Descontinuados](<https://www.oracle.com/java/technologies/javase/19-relnote-issues.html#JDK-8254935>)
  * [A Constante Estática OAEPParameterSpec.DEFAULT Foi Descontinuada](<https://www.oracle.com/java/technologies/javase/19-relnote-issues.html#JDK-8284553>)

### Ferramentas e Componentes Removidos e Descontinuados no JDK 18

Descontinuar a Finalização para Remoção

O mecanismo de finalização foi descontinuado para remoção em uma versão futura. Os métodos `finalize` nas APIs Java padrão, como `Object.finalize()` e `Enum.finalize()`, também foram descontinuados para remoção em uma versão futura, juntamente com métodos relacionados à finalização, como `Runtime.runFinalization()` e `System.runFinalization()`.

A finalização permanece habilitada por padrão por enquanto, mas pode ser desabilitada para facilitar testes antecipados. Em uma versão futura, ela será desabilitada por padrão, e em uma versão posterior, será removida. Consulte [JEP 421: Deprecate Finalization for Removal](<https://openjdk.java.net/jeps/421>) e [Finalization Deprecated for Removal](<#/doc/guides/migrate/migrating-jdk-8-later-jdk-releases>).

### Ferramentas e Componentes Removidos e Descontinuados no JDK 17

Descontinuar a API Applet para Remoção

A API Applet foi descontinuada para remoção, pois todos os fornecedores de navegadores web removeram o suporte para plug-ins de navegador Java ou anunciaram planos para fazê-lo. Consulte [JEP 398: Deprecate the Applet API for Removal](<https://openjdk.java.net/jeps/398>).

Ativação RMI Removida

O mecanismo de Ativação de Remote Method Invocation (RMI) foi removido. No entanto, o restante do RMI foi preservado. Consulte [JEP 407: Remove RMI Activation](<https://openjdk.java.net/jeps/407>).

### Ferramentas e Componentes Removidos e Descontinuados no JDK 16

Remoção dos Recursos Experimentais AOT e Graal JIT

A ferramenta experimental de compilação Java Ahead-of-Time `jaotc` e o compilador Graal JIT baseado em Java foram removidos. Consulte [Removal of experimental features AOT and Graal JIT](<https://bugs.java.com/bugdatabase/view_bug.do?bug_id=JDK-8255616>).

Certificados Raiz com Chaves de 1024 bits Removidos

Os certificados raiz com chaves públicas RSA de 1024 bits fracas foram removidos do keystore `cacerts`. Para detalhes, consulte [Remove root certificates with 1024-bit keys](<https://bugs.java.com/bugdatabase/view_bug.do?bug_id=JDK-8243559>).

Remoção de Curvas Elípticas Legadas

O provedor SunEC não suporta mais as seguintes curvas elípticas que foram descontinuadas no JDK 14.
```
    secp112r1, secp112r2, secp128r1, secp128r2, secp160k1, secp160r1, secp160r2, 
    secp192k1, secp192r1, secp224k1, secp224r1, secp256k1, sect1
```
Para continuar usando qualquer uma dessas curvas, encontre alternativas de terceiros. Consulte [Remove the legacy elliptic curves](<https://bugs.java.com/bugdatabase/view_bug.do?bug_id=JDK-8235710>).

Flags de Rastreamento Descontinuadas São Obsoletas e Devem Ser Substituídas por Equivalentes de Logging Unificado

Quando o Unified Logging foi adicionado no Java 9, várias flags de rastreamento foram descontinuadas e mapeadas para seus equivalentes de logging unificado. Essas flags agora são obsoletas e você deve substituir explicitamente o uso dessas flags por seus equivalentes de logging unificado.

| Flag de Rastreamento Obsoleta | Substituição de Logging Unificado |
|---|---|
| `-XX:+TraceClassLoading` | `-Xlog:class+load=info` |
| `-XX:+TraceClassUnloading` | `-Xlog:class+unload=info` |
| `-XX:+TraceExceptions` | `-Xlog:exceptions=info` |

Consulte [Obsolete the long term deprecated and aliased Trace flags](<https://bugs.java.com/bugdatabase/view_bug.do?bug_id=JDK-8256718>).

### Ferramentas e Componentes Removidos e Descontinuados no JDK 15

Remoção do Motor JavaScript Nashorn

O motor de script JavaScript Nashorn e suas APIs, e a ferramenta `jjs` foram removidos no JDK 15. O motor, as APIs e a ferramenta foram descontinuados para remoção no Java 11. Consulte [JEP 372: Remove the Nashorn JavaScript Engine](<https://openjdk.java.net/jeps/372>).

Remoção da Ferramenta Compilador de Stub Estático RMI (rmic)

A ferramenta rmic foi descontinuada para remoção no JDK 13. Consulte [Remove rmic from the set of supported tools](<https://bugs.openjdk.java.net/browse/JDK-8225319>).

Desabilitar e Descontinuar o Biased Locking

O biased locking está desabilitado por padrão e todas as opções de linha de comando relacionadas foram descontinuadas. Consulte [JEP 374: Disable and Deprecate Biased Locking](<https://openjdk.java.net/jeps/374>).

Descontinuar a Ativação RMI para Remoção

O mecanismo de Ativação RMI foi descontinuado e pode ser removido em uma versão futura da plataforma. Consulte [JEP 385: Deprecate RMI Activation for Removal](<https://openjdk.java.net/jeps/385>).

### Recursos e Componentes Removidos no JDK 14

Remover o Garbage Collector Concurrent Mark Sweep (CMS)

O garbage collector CMS foi removido. Consulte [JEP 363: Remove the Concurrent Mark Sweep (CMS) Garbage Collector](<https://openjdk.java.net/jeps/363>).

Remoção das Ferramentas e API Pack200

As ferramentas e a API Pack200 foram descontinuadas no JDK 11 e removidas no JDK 14.

As ferramentas `pack200` e `unpack200`, e `Pack200` no pacote `java.util.jar.Pack200` foram removidas.

Consulte [JEP 367: Remove the Pack200 Tools and API](<https://openjdk.java.net/jeps/367>).

### Ferramentas e Componentes Removidos no JDK 13

Remoção de Recursos Antigos da Ferramenta `javadoc`

Os quatro recursos a seguir foram removidos da ferramenta javadoc:

  * Suporte para geração de documentação de API usando HTML 4
  * Suporte para a antiga API javadoc
  * Suporte para geração de documentação usando frames HTML
  * Suporte para as opções `--no-module-directories`

Para detalhes sobre os recursos removidos do `javadoc`, consulte [JDK-8215608 : Remove old javadoc features](<https://bugs.java.com/bugdatabase/view_bug.do?xd_co_f=d31f1e56-2e52-4583-9188-1fcb8e55718d&bug_id=JDK-8215608>).

Consulte [Removed Features and Options of JDK 13 Release Notes](<https://www.oracle.com/java/technologies/javase/13-relnote-issues.html#Removed>) para a lista de ferramentas e componentes removidos.

### Ferramentas e Componentes Removidos no JDK 12

Para saber mais sobre as ferramentas e componentes removidos no JDK 12, consulte [Removed Features and Options in JDK 12](<https://www.oracle.com/java/technologies/javase/12-relnote-issues.html#Removed>).

### Ferramentas e Componentes Removidos no JDK 11

Remoção da Pilha de Implantação

As tecnologias de implantação Java foram descontinuadas no JDK 9 e removidas no JDK 11.

A funcionalidade de applet Java e Web Start, incluindo o plug-in Java, o Java Applet Viewer, o Painel de Controle Java e o Java Web Start, juntamente com a ferramenta `javaws`, foram removidos no JDK 11.

Consulte [Remove Java Deployment Technologies](<https://www.oracle.com/java/technologies/javase/11-relnote-issues.html#JDK-8185077>).

Remoção dos Módulos Java EE e CORBA

No JDK 11, os módulos Java EE e CORBA foram removidos. Esses módulos foram descontinuados para remoção no JDK 9.

Os módulos removidos foram:

  * java.xml.ws: Java API for XML Web Services (JAX-WS), Web Services Metadata for the Java Platform, e SOAP with Attachments for Java (SAAJ)
  * java.xml.bind: Java Architecture for XML Binding (JAXB)
  * java.xml.ws.annotation: O subconjunto das Common Annotations JSR-250 definido por Java SE para suportar serviços web
  * java.corba: CORBA
  * java.transaction: O subconjunto da Java Transaction API definido por Java SE para suportar CORBA Object Transaction Services
  * java.activation: JavaBeans Activation Framework
  * java.se.ee: Módulo agregador para os seis módulos acima
  * jdk.xml.ws: Ferramentas para JAX-WS
  * jdk.xml.bind: Ferramentas para JAXB

O código existente com referências a classes nessas APIs não compilará sem alterações na build. Da mesma forma, o código no classpath com referências a classes nessas APIs falhará com `NoDefClassFoundError` ou `ClassNotFoundException`, a menos que sejam feitas alterações na forma como a aplicação é implantada.

Consulte [JEP 320: Remove the Java EE and CORBA Modules](<http://openjdk.java.net/jeps/320>) para obter mais informações sobre possíveis substituições para os módulos.

Nota:

Você pode baixar JAXB e JAX-WS do Maven.

Remoção de Ferramentas e Componentes

Ferramentas Principais

  * `appletviewer`

Consulte [JDK-8200146 : Remove the appletviewer launcher](<https://bugs.openjdk.java.net/browse/JDK-8200146>).

Ferramentas CORBA

  * `idlj`
  * `orbd`
  * `servertool`
  * `tnamesrv`

Além disso, o `rmic` (o compilador RMI) não suporta mais as opções `-idl` ou `-iiop`. Consulte [JDK 11 Release Notes](<https://www.oracle.com/java/technologies/javase/11-relnotes.html>).

Ferramentas de Serviços Web Java

  * `schemagen`
  * `wsgen`
  * `wsimport`
  * `xjc`

Ferramentas de Implantação Java

  * `javapackager`
  * `javaws`

Consulte [Removal of JavaFX from JDK](<https://www.oracle.com/java/technologies/javase/11-relnotes.html#JDK-8198527>).

Ferramentas de Monitoramento

  * `jmc`: No JDK 11, o JMC está disponível como um pacote autônomo e não é empacotado no JDK.

Consulte [Removal of JMC from JDK](<https://www.oracle.com/java/technologies/javase/11-relnote-issues.html#JDK-8202347>) e [Java Mission Control](<https://blogs.oracle.com/java-platform-group/java-mission-control-now-serving-openjdk-binaries-too>).

JVM-MANAGEMENT-MIB.mib

A especificação para monitoramento e gerenciamento da JVM via SNMP `JVM-MANAGEMENT-MIB.mib` foi removida. Consulte [Removal of JVM-MANAGEMENT-MIB.mib](<https://bugs.openjdk.java.net/browse/JDK-8206211>).

Agente SNMP

O módulo `jdk.snmp` foi removido. Consulte [Removal of SNMP Agent](<https://bugs.openjdk.java.net/browse/JDK-8071367>).

Remoções Específicas do Desktop Oracle

  * O rasterizador de fontes T2K do Oracle JDK foi removido.
  * Fontes Lucida: O Oracle JDK não inclui mais nenhuma fonte e depende inteiramente das fontes instaladas no sistema operacional. Consulte [Removal of Lucida Fonts from Oracle JDK](<https://www.oracle.com/java/technologies/javase/11-relnote-issues.html#JDK-8191522>).

### Ferramentas e Componentes Removidos no JDK 9 e JDK 10

Esta lista inclui ferramentas e componentes que não são mais empacotados com o JDK.

#### Ferramenta de Geração de Cabeçalho Nativo Removida (javah)

A ferramenta `javah` foi substituída por funcionalidade superior no `javac`. Ela foi removida no JDK 10.

Desde o JDK 8, o `javac` oferece a capacidade de escrever arquivos de cabeçalho nativos no momento em que o código-fonte Java é compilado, eliminando assim a necessidade de uma ferramenta separada.

Em vez de `javah`, use
```
    javac -h
```

#### JavaDB Removido

O JavaDB, que era uma reformulação do Apache Derby, não está mais incluído no JDK.

O JavaDB era empacotado com o JDK 7 e JDK 8. Ele era encontrado no diretório `db` do diretório de instalação do JDK.

Você pode baixar e instalar o Apache Derby em [Apache Derby Downloads](<https://db.apache.org/derby/derby_downloads.html>).

#### Agente hprof do JVM TI Removido

A biblioteca do agente `hprof` foi removida.

O agente `hprof` foi escrito como código de demonstração para a [JVM Tool Interface](<https://docs.oracle.com/javase/8/docs/technotes/guides/jvmti/index.html>) e não foi projetado para ser uma ferramenta de produção. Os recursos úteis do agente `hprof` foram substituídos por alternativas melhores, incluindo algumas que estão incluídas no JDK.

Para criar heap dumps no formato `hprof`, use um comando de diagnóstico (`jcmd`) ou a ferramenta `jmap`:

  * Comando de diagnóstico: `jcmd <pid> GC.heap_dump`. Consulte `[jcmd](<#/>)`.
  * jmap: `jmap -dump`. Consulte `[jmap](<#/>)`.

Para recursos de profiler de CPU, use o Java Flight Recorder, que é empacotado com o JDK.

Consulte [JEP 240: Remove the JVM TI hprof Agent](<http://openjdk.java.net/jeps/240>).

#### Ferramenta jhat Removida

A ferramenta `jhat` era uma ferramenta experimental e não suportada de visualização de heap adicionada no JDK 6. Visualizadores e analisadores de heap superiores estão disponíveis há muitos anos.

#### Lançadores java-rmi.exe e java-rmi.cgi Removidos

Os lançadores `java-rmi.exe` do Windows e `java-rmi.cgi` do Linux e Solaris foram removidos.

`java-rmi.cgi` estava em `$JAVA_HOME/bin` no Linux.

`java-rmi.exe` estava em `$JAVA_HOME/bin` no Windows.

Esses lançadores foram adicionados ao JDK para facilitar o uso do mecanismo de proxy RMI CGI, que foi descontinuado no JDK 8.

A alternativa de usar um servlet para proxy RMI sobre HTTP está disponível, e até mesmo preferida, há vários anos. Consulte [Java RMI and Object Serialization.](<https://docs.oracle.com/javase/8/docs/technotes/guides/rmi/faq.html#servlet>)

#### Suporte para o Transporte IIOP Removido do JMX RMIConnector

O suporte ao transporte IIOP do JMX RMI Connector, juntamente com suas classes de suporte, foi removido do JDK.

No JDK 8, o suporte ao transporte IIOP foi rebaixado de obrigatório para opcional. Este foi o primeiro passo em um esforço de várias versões para remover o suporte ao transporte IIOP da JMX Remote API. No JDK 9, o suporte ao IIOP foi completamente removido.

As alterações na API pública incluem:

  * A classe `javax.management.remote.rmi.RMIIIOPServerImpl` foi descontinuada. Após a invocação, todos os seus métodos e construtores lançam `java.lang.UnsupportedOperationException` com uma mensagem explicativa.

  * Duas classes, `org.omg.stub.javax.management.rmi._RMIConnection_Stub` e `org.omg.stub.javax.management.rmi._RMIConnection_Tie`, não são geradas.

#### VM Cliente Windows de 32 bits Descontinuada

A VM cliente Windows de 32 bits não está mais disponível. Apenas uma VM de servidor é oferecida.

O JDK 8 e versões anteriores ofereciam tanto uma JVM cliente quanto uma JVM servidor para sistemas Windows de 32 bits. O JDK 9 e versões posteriores oferecem apenas uma JVM servidor, que é ajustada para maximizar a velocidade operacional de pico.

#### Java VisualVM Removido

O Java VisualVM é uma ferramenta que fornece informações sobre o código em execução em uma Java Virtual Machine. A ferramenta `jvisualvm` era fornecida com o JDK 6, JDK 7 e JDK 8.

O Java VisualVM não é mais empacotado com o JDK, mas você pode obtê-lo no [site do projeto de código aberto VisualVM](<https://visualvm.github.io/>).

#### Ferramenta native2ascii Removida

A ferramenta `native2ascii` foi removida do JDK. Como o JDK 9 e versões posteriores suportam bundles de recursos de propriedades baseados em UTF-8, a ferramenta de conversão para bundles de recursos de propriedades baseados em UTF-8 para ISO-8859-1 não é mais necessária.

Consulte [UTF-8 Properties Files](<https://docs.oracle.com/javase/10/intl/internationalization-enhancements-jdk-9.htm#JSINT-GUID-974CF488-23E8-4963-A322-82006A7A14C7>) no Guia de Internacionalização do Java Platform, Standard Edition.