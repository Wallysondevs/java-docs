# APIs Removidas

## 4 APIs Removidas

Esta seção fornece detalhes sobre as APIs do Java SE que foram removidas nas versões do JDK 11 até o JDK 25.

Execute `jdeprscan --release 25 -l --for-removal` para obter a lista de APIs que estão marcadas para remoção no JDK 25.

Nota:

A ferramenta jdeprscan está disponível desde o JDK 9. Se você deseja imprimir a lista de APIs descontinuadas de versões anteriores do JDK, substitua o número da versão pela versão correspondente.

### APIs Removidas no Java SE 25

Métodos
```
    javax.swing.plaf.synth.SynthLookAndFeel.load 
    
```

Construtores
```
    javax.swing.plaf.basic.BasicSliderUI.BasicSliderUI.<init>()
```

### APIs Removidas no Java SE 24

Campos
```
    java.awt.Window.warningString 
    javax.naming.Context.APPLET
```

### APIs Removidas no Java SE 23

Classes
```
    javax.management.loading.MLet
    javax.management.loading.MLetContent
    javax.management.loading.MLetMBean
    javax.management.loading.PrivateMLet
    
```

Métodos 
```
    java.lang.Thread.resume
    java.lang.Thread.suspend
    java.lang.ThreadGroup.resume
    java.lang.ThreadGroup.stop
    java.lang.ThreadGroup.suspend
    
```

### APIs Removidas no Java SE 22

Métodos
```
    java.lang.Thread.countStackFrames
```

### APIs Removidas no Java SE 21

Classes 
```
    java.lang.Compiler
    javax.management.remote.rmi.RMIIIOPServerImpl
```

Métodos
```
    java.lang.ThreadGroup.allowThreadSuspension(boolean)
```

### APIs Removidas no Java SE 20

Nenhuma API foi removida nesta versão.

### APIs Removidas no Java SE 19

Nenhuma API foi removida nesta versão.

### APIs Removidas no Java SE 18

Métodos
```
     
              java.awt.color.ICC_Profile.finalize()
              java.awt.image.ColorModel.finalize()
              java.awt.image.IndexColorModel.finalize()
               
```

### APIs Removidas no Java SE 17

Pacotes
```
    java.rmi.activation ()          
    
```

Classes
```
              java.rmi.activation.Activatable () 
              java.rmi.activation.ActivationDesc () 
              java.rmi.activation.ActivationGroup () 
              java.rmi.activation.ActivationGroup_Stub () 
              java.rmi.activation.ActivationGroupDesc () 
              java.rmi.activation.ActivationGroupID () 
              java.rmi.activation.ActivationID () 
              java.rmi.activation.ActivationInstantiator () 
              java.rmi.activation.ActivationMonitor () 
              java.rmi.activation.ActivationSystem () 
              java.rmi.activation.Activator () 
```

### API Removida no Java SE 16

Construtor
```
    javax.tools.ToolProvider.<init>()          
    
```

### APIs Removidas no Java SE 15

As seguintes APIs foram removidas no Java SE 15.

Campos
```
    java.management.rmi.RMIConnectorServer.CREDENTIAL_TYPES      
    
```

Construtores
```
    java.lang.invoke.ConstantBootstraps.<init> 
        java.lang.reflect.Modifier.<init>          
    
```

### APIs Removidas no Java SE 14

As seguintes APIs foram removidas no Java SE 14.

Pacotes
```
    java.security.acl      
    
```

Interfaces
```
    java.security.acl.Acl
    java.security.acl.AclEntry
    java.security.acl.Group
    java.security.acl.Owner
    java.security.acl.Permission
    java.util.jar.Pack200.Packer    
    java.util.jar.Pack200.Unpacker            
    
```

Classes
```
    java.util.jar.Pack200      
    
```

### APIs Removidas no Java SE 13

As seguintes APIs foram removidas no Java SE 13. Ambas as APIs foram descontinuadas e marcadas para remoção com o JDK 9. Ambas foram substituídas por mecanismos de rastreamento específicos da JVM. Consulte a especificação [JVMTM Tool Interface](<https://docs.oracle.com/en/java/javase/25/docs/specs/jvmti.html>).
```
    java.lang.Runtime.traceInstructions(boolean)      
    java.lang.Runtime.traceMethodCalls(boolean)
```

### APIs Removidas no Java SE 12

As seguintes APIs foram removidas no Java SE 12.
```
                java.io.FileInputStream.finalize()      
                java.io.FileOutputStream.finalize()       
                java.util.zip.Deflater.finalize()       
                java.util.zip.Inflater.finalize()      
                java.util.zip.ZipFile.finalize()      
```

### APIs Removidas no JDK 11

As seguintes APIs foram removidas no JDK 11. Muitas dessas APIs foram descontinuadas em versões anteriores e foram substituídas por APIs mais recentes.
```
    javax.security.auth.Policy 
    java.lang.Runtime.runFinalizersOnExit(boolean)
    java.lang.SecurityManager.checkAwtEventQueueAccess() 
    java.lang.SecurityManager.checkMemberAccess(java.lang.Class,int)
    java.lang.SecurityManager.checkSystemClipboardAccess()
    java.lang.SecurityManager.checkTopLevelWindow(java.lang.Object)
    java.lang.System.runFinalizersOnExit(boolean)
    java.lang.Thread.destroy()
    java.lang.Thread.stop(java.lang.Throwable)
    
```

### APIs Removidas no JDK 10

As seguintes APIs DOM comuns foram removidas no JDK 10.
```
    com.sun.java.browser.plugin2.DOM
```
```
    sun.plugin.dom.DOMObject
```

### APIs Removidas no JDK 9

A seguir estão algumas APIs importantes que foram removidas das versões JDK 10 e JDK 9.

#### APIs java.* Removidas

A equipe Java está comprometida com a compatibilidade retroativa. Se um aplicativo é executado no JDK 8, ele será executado no JDK 9 e versões posteriores, desde que utilize APIs que são suportadas e destinadas ao uso externo.

Isso inclui:

  * Padrão JCP, java.*, javax.*
  * APIs específicas do JDK, algumas com.sun.*, algumas jdk.*

APIs suportadas podem ser removidas do JDK, mas apenas com aviso prévio. Descubra se seu código está usando APIs descontinuadas executando a ferramenta de análise estática [jdeprscan](<#/>).

As APIs java.* que foram removidas no JDK 9 incluem os métodos previamente descontinuados dos pacotes java.util.logging.LogManager e java.util.jar.Pack200:
```
    java.util.logging.LogManager.addPropertyChangeListener
    java.util.logging.LogManager.removePropertyChangeListener
    java.util.jar.Pack200.Packer.addPropertyChangeListener
    java.util.jar.Pack200.Packer.removePropertyChangeListener
    java.util.jar.Pack200.Unpacker.addPropertyChangeListener
    java.util.jar.Pack200.Unpacker.removePropertyChangeListener
```

#### Remoção e Futura Remoção de APIs sun.misc e sun.reflect

Ao contrário das APIs java.*, quase todas as APIs sun.* não são suportadas, são APIs internas do JDK e podem ser removidas a qualquer momento.

Algumas APIs sun.* foram removidas no JDK 9. Notavelmente, sun.misc.BASE64Encoder e sun.misc.BASE64Decoder foram removidas. Em vez disso, use a classe suportada [java.util.Base64](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/Base64.html>), que foi adicionada no JDK 8.

Se você usa essas APIs, pode ser interessante migrar para suas substituições suportadas:

  * sun.misc.Unsafe

A funcionalidade de muitos dos métodos nesta classe está disponível usando variable handles, consulte [JEP 193: Variable Handles](<http://openjdk.java.net/jeps/193>).

  * sun.reflect.Reflection::getCallerClass(int)

Em vez disso, use a API de stack-walking, consulte [JEP 259: Stack-Walking API](<http://openjdk.java.net/jeps/259>).

Consulte [JEP 260: Encapsulate Most Internal APIs](<http://openjdk.java.net/jeps/260>).

#### java.awt.peer Não Acessível

Os pacotes java.awt.peer e java.awt.dnd.peer não são acessíveis, a partir do JDK 9. Os pacotes nunca fizeram parte da API do Java SE, apesar de estarem no namespace java.*.

Todos os métodos na API do Java SE que se referem a tipos definidos nesses pacotes foram removidos do JDK 9. O código que chama um método que anteriormente aceitava ou retornava um tipo definido nesses pacotes não compila ou executa mais.

Existem dois usos comuns das classes java.awt.peer. Você deve substituí-los da seguinte forma:

  * Para verificar se um peer já foi definido:
`if (component.getPeer() != null) { .. }
```

Substitua isso por Component.isDisplayable() da API do JDK 1.1:
`public boolean isDisplayable() {
        	return getPeer() != null;
```

  * Para testar se um componente é lightweight:
`if (component.getPeer() instanceof LightweightPeer) ..
```

Substitua isso por Component.isLightweight() da API do JDK 1.2:
`public boolean isLightweight() {
        	return getPeer() instanceof LightweightPeer;
```

#### Pacote com.sun.image.codec.jpeg Removido

O pacote não padrão com.sun.image.codec.jpeg foi removido. Use a Java Image I/O API em vez disso.

O pacote com.sun.image.codec.jpeg foi adicionado no JDK 1.2 como uma forma não padrão de controlar o carregamento e salvamento de arquivos de imagem no formato JPEG. Ele nunca fez parte da especificação da plataforma.

No JDK 1.4, a Java Image I/O API foi adicionada como uma API padrão, residindo no pacote javax.imageio. Ela fornece um mecanismo padrão para controlar o carregamento e salvamento de formatos de imagem amostrados e exige que todas as implementações compatíveis do Java SE suportem JPEG com base na especificação da Java Image I/O.

#### Suporte a Ferramentas para Perfis Compactos Removido

A partir do JDK 9, você pode optar por construir e executar seu aplicativo contra qualquer subconjunto dos módulos na imagem de tempo de execução do Java, sem precisar depender de perfis predefinidos.

Perfis, introduzidos no Java SE 8, definem subconjuntos da API da Plataforma Java SE que podem reduzir o tamanho estático do tempo de execução do Java em dispositivos com capacidade de armazenamento limitada. As ferramentas no JDK 8 suportam três perfis: `compact1`, `compact2` e `compact3`. Para a composição da API de cada perfil, consulte [Detailed Profile Composition](<https://docs.oracle.com/javase/8/docs/technotes/guides/compactprofiles/compactprofiles.html>) e [API Reference](<https://docs.oracle.com/javase/8/docs/api/overview-summary.html>) na documentação do JDK 8.

No JDK 8, você usa a opção `-profile` para especificar o perfil ao executar os comandos `javac` e `java`. A partir do JDK 9, a opção `-profile` é suportada por `javac` apenas em conjunto com a opção `--release 8`, e não é suportada por `java`.

O JDK 9 e versões posteriores permitem que você escolha os módulos que são usados em tempo de compilação e execução. Ao especificar módulos com a nova opção `--limit-modules`, você pode obter as mesmas APIs que estão nos perfis compactos. Esta opção é suportada pelos comandos `javac` e `java`, como mostrado nos exemplos a seguir:
```
    javac --limit-modules java.base,java.logging MyApp.java
    
```
```
    java --limit-modules java.base,java.logging MyApp
    
```

Os pacotes especificados para cada perfil no Java SE 8 são exportados, coletivamente, pelos seguintes conjuntos de módulos:

  * Para o perfil `compact1`: java.base, java.logging, java.scripting

  * Para o perfil `compact2`: java.base, java.logging, java.scripting, java.rmi, java.sql, java.xml

  * Para o perfil `compact3`: java.base, java.logging, java.scripting, java.rmi, java.sql, java.xml, java.compiler, java.instrument, java.management, java.naming, java.prefs, java.security.jgss, java.security.sasl, java.sql.rowset, java.xml.crypto

Você pode usar a ferramenta `jdeps` para fazer uma análise estática dos pacotes Java que estão sendo usados em seu código-fonte. Isso lhe dá o conjunto de módulos que você precisa para executar seu aplicativo. Se você estivesse usando o perfil `compact3`, por exemplo, então você pode ver que não precisa incluir todo esse conjunto de módulos ao construir seu aplicativo. Consulte [`jdeps`](<#/>) em Java Development Kit Tool Specifications.

Consulte [JEP 200: The Modular JDK](<http://openjdk.java.net/jeps/200>).