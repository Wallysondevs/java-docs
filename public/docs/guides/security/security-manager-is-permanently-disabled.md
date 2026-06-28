# O Security Manager Está Permanentemente Desabilitado

## O Security Manager Está Permanentemente Desabilitado
  
A partir do JDK 24, o Security Manager está permanentemente desabilitado.

A seguir, um resumo das mudanças feitas no JDK como resultado da desabilitação permanente do Security Manager:

  * Você não pode habilitar o Security Manager na inicialização, nem pode instalar um Security Manager personalizado durante o tempo de execução. Consulte [Habilitar o Security Manager é um Erro](<#/doc/guides/security/security-manager-is-permanently-disabled>). 
  * Métodos que fazem parte da API do Security Manager foram degradados para retornar `null` ou `false`, passar a requisição do chamador, ou lançar incondicionalmente uma SecurityException ou UnsupportedOperationException. Consulte [Alterações na API do Security Manager](<#/doc/guides/security/security-manager-is-permanently-disabled>). 
  * Muitas outras APIs foram alteradas, em particular, aquelas que lançam uma SecurityException. Consulte [Outras Alterações em APIs](<#/doc/guides/security/security-manager-is-permanently-disabled>). 
  * Propriedades de sistema e propriedades de segurança específicas do Security Manager são ignoradas. Consulte [Propriedades de Sistema e Segurança Afetadas](<#/doc/guides/security/security-manager-is-permanently-disabled>). 
  * O arquivo de política do sistema, `$JAVA_HOME/conf/security/java.policy`, foi removido. 
  * Alterações não diretamente relacionadas ao comportamento da API, propriedades de sistema ou segurança, ou alterações nos arquivos do JDK estão listadas em [Outras Alterações](<#/doc/guides/security/security-manager-is-permanently-disabled>). 



A API do Security Manager será removida em uma futura versão do JDK.

Consulte [Migrando do Security Manager](<#/doc/guides/security/security-manager-is-permanently-disabled>) para dicas sobre como verificar se sua aplicação requer um Security Manager e como migrar dele. 

Consulte [JEP 486: Desabilitar Permanentemente o Security Manager](<https://openjdk.org/jeps/486>) para mais informações, incluindo uma explicação do porquê o Security Manager está permanentemente desabilitado e será removido em uma futura versão. 

Habilitar o Security Manager é um Erro

Você não pode habilitar o Security Manager nem instalar um Security Manager personalizado na inicialização, por exemplo:

  * `java -Djava.security.manager -jar app.jar`
  * `java -Djava.security.manager="" -jar app.jar`
  * `java -Djava.security.manager=allow -jar app.jar`
  * `java -Djava.security.manager=default -jar app.jar`
  * `java -Djava.security.manager=com.example.CustomSecurityManager -jar app.jar`



Tentar fazer isso faz com que a JVM reporte o erro e saia, por exemplo:
```
    Error occurred during initialization of VM
    java.lang.Error: A command line option has attempted to allow or enable the
            Security Manager. Enabling a Security Manager is not supported.
            at java.lang.System.initPhase3(java.base@24/System.java:2067)
```

Você não pode suprimir esta mensagem de erro nem alterá-la para um aviso.

Você também não pode instalar um Security Manager em tempo de execução chamando System.setSecurityManager(SecurityManager). Tentar fazer isso faz com que a JVM lance uma UnsupportedOperationException com a seguinte mensagem: 
```
    Setting a Security Manager is not supported
```

Alterações na API do Security Manager

A API do Security Manager consiste no seguinte:

  * Métodos na classe java.lang.SecurityManager 
  * Métodos nas classes AccessController, AccessControlContext, Policy e ProtectionDomain do pacote java.security 
  * Os métodos getSecurityManager e setSecurityManager na classe java.lang.System 



Como resultado da desabilitação permanente do Security Manager, esses métodos, conforme apropriado, retornam `null` ou `false`, passam a requisição do chamador, ou lançam incondicionalmente uma SecurityException ou UnsupportedOperationException. 

A remoção da API do Security Manager está planejada para uma futura versão.

A tabela a seguir lista as alterações na API do Security Manager em detalhes:

Tabela 1-4 APIs Afetadas pela Desabilitação Permanente do Security Manager

Classe | APIs Afetadas  
---|---  
java.lang.SecurityManager | Os métodos check* sempre lançam uma SecurityException. O método getSecurityContext retorna um AccessControlContext que não concede permissões. Em particular, o método checkPermission lança uma AccessControlException e o método getDomainCombiner retorna `null`.   
java.lang.System | O método setSecurityManager sempre lança uma UnsupportedOperationException. O método getSecurityManager sempre retorna `null`.   
java.lang.ClassLoader | O domínio padrão atribuído às classes pelo método defineClass(String, byte[], int, int) é o mesmo de antes, mas não lhe são concedidas permissões. Em particular, o método ProtectionDomain.getPermissions() sempre retorna `null`.   
java.security.AccessController | Os métodos doPrivileged (6 variantes) e os métodos doPrivilegedWithCombiner (4 variantes) executam a ação imediatamente e se comportam como se um Security Manager não tivesse sido habilitado. O método checkPermission sempre lança uma AccessControlException. O método getContext retorna um AccessControlContext que não concede permissões. Em particular, o método checkPermission lança uma AccessControlException, e o método getDomainCombiner retorna null.   
java.security.AccessControlContext | O método checkPermission sempre lança uma SecurityException.   
java.security.Permission | O método checkGuard sempre lança uma SecurityException.   
java.security.ProtectionDomain | Um ProtectionDomain não receberá nenhuma permissão da política atual porque a política atual é sempre um objeto Policy que não concede permissões.   
java.security.Policy | O método setPolicy sempre lança uma UnsupportedOperationException. O método getPolicy retorna um objeto Policy que não concede permissões. Em particular, o método getParameters retorna `null`, o método getPermissions retorna uma PermissionCollection vazia e somente leitura, e o método implies retorna `false`.   
javax.security.auth.Subject | O método getSubject sempre lança uma UnsupportedOperationException. Os métodos doAs (2 variantes) e os métodos doAsPrivileged (2 variantes) iniciam a ação e vinculam o subject ao período de execução. Consulte [Migrando dos Métodos Subject.getSubject e Subject.doAs, Depreciados para Remoção, para os Métodos Subject.current e Subject.callAs](<#/doc/guides/security/migrating-from-deprecated-removal-subject-getsubject-subject-doas-methods-subject-current-subject-callas-methods>).   
java.rmi.RMISecurityManager | Todas as alterações na classe java.lang.SecurityManager também se aplicam a esta subclasse.   
java.rmi.server.RMIClassLoader | O método getSecurityContext sempre retorna null.   
  
Outras Alterações em APIs

  * Muitos métodos e construtores eram especificados para lançar uma SecurityException se um Security Manager estivesse habilitado e as permissões apropriadas não tivessem sido concedidas. Esses métodos não lançam mais uma SecurityException. Eles operam como se um Security Manager não tivesse sido habilitado. 
  * Os seguintes métodos não fazem nada: java.lang.Thread.checkAccess(), java.lang.ThreadGroup.checkAccess(), e java.util.logging.LogManager.checkAccess(). 



Propriedades de Sistema e Segurança Afetadas

  * As seguintes propriedades de sistema não são suportadas: `java.security.policy`, `jdk.security.filePermCompat`, `sun.security.policy.utf8`, `sun.security.policy.numcaches`, e `sun.net.maxDatagramSockets`. 
  * As opções `access` e `policy` da propriedade de sistema `java.security.debug` foram removidas. 
  * As seguintes propriedades de segurança não são suportadas: `policy.provider`, `policy.url.n`, `policy.ignoreIdentityScope`, `package.access`, e `package.definition`. 



Outras Alterações

O mecanismo de Download Remoto de Código RMI foi removido. A classe java.rmi.server.RMIClassLoader possui uma interface de provedor de serviço (SPI) que pode ser configurada através de uma propriedade de sistema. Consulte [RMIClassLoader.getDefaultProviderInstance()](<https://docs.oracle.com/en/java/javase/25/docs/api/java.rmi/java/rmi/server/RMIClassLoader.html#getDefaultProviderInstance\(\)>) para informações sobre a implementação SPI padrão. O provedor padrão anteriormente suportava um recurso chamado Download Remoto de Código, que permitia a um cliente RMI carregar classes de uma codebase especificada por um servidor RMI, e vice-versa. O Download Remoto de Código era habilitado apenas quando um Security Manager estava habilitado. Com o Security Manager permanentemente desabilitado, o mecanismo de Download Remoto de Código é removido. Como solução alternativa, você pode realizar o carregamento de classes da codebase em sua própria implementação SPI. 

Migrando do Security Manager

Consulte [Como Determinar se uma Aplicação Habilita o Security Manager](<#/doc/guides/security/security-manager-is-permanently-disabled>) para verificar se sua aplicação está usando um Security Manager. 

Se você determinar que sua aplicação habilita o Security Manager, considere substituí-lo por tecnologias fora do JDK, como as seguintes:

  * Contêineres, que são uma forma leve e portátil de tecnologia de virtualização, permitem que aplicações e suas dependências sejam empacotadas e executadas consistentemente em diferentes ambientes.
  * Hypervisors, também chamados de Monitores de Máquina Virtual (VMMs), permitem que múltiplos sistemas operacionais compartilhem os recursos de hardware oferecidos por um único computador host.
  * Mecanismos de sistema operacional, como o macOS App Sandbox ou o recurso de computação segura (seccomp) do Linux.



Assim como o Security Manager, essas tecnologias podem restringir como as aplicações usam recursos locais e remotos. Por exemplo, elas podem impedir que o código acesse a rede para exfiltrar dados.

Um pequeno número de bibliotecas foi projetado para usar o Security Manager se ele estiver habilitado. Algumas delas também podem usar partes avançadas da API do Security Manager para implementar um ambiente de execução personalizado. Consulte [Conselhos para Mantenedores de Bibliotecas que Suportam o Security Manager](<#/doc/guides/security/security-manager-is-permanently-disabled>). 

Um pequeno número de aplicações usa o Security Manager não para impor uma política de segurança, mas sim como um meio de interceptar chamadas para a API da Plataforma Java. Se sua aplicação requer interceptação, você pode usar técnicas alternativas como modificação de código-fonte, análise e reescrita de código estático, e reescrita dinâmica de código baseada em agente no momento do carregamento da classe. Consulte [Um Agente que Bloqueia o Código de Chamar System.exit(int)](<#/doc/guides/security/security-manager-is-permanently-disabled>) para um exemplo de um agente que usa reescrita dinâmica de código. 

Como Determinar se uma Aplicação Habilita o Security Manager

Experimente as seguintes técnicas para determinar se uma aplicação habilita o Security Manager:

  * Verifique scripts ou documentação para ver se a aplicação é iniciada com o Security Manager permitido ou habilitado através de opções de linha de comando, ou se requer que arquivos de política sejam instalados e configurados.
  * Execute a aplicação em uma versão do JDK de 17 a 23 e procure por mensagens no console avisando que o Security Manager será depreciado e removido em uma futura versão. Consulte a seção [Emitir avisos](<https://openjdk.org/jeps/411#Issue-warnings>) em JEP 411: Depreciar o Security Manager para Remoção. 
  * Execute a aplicação em uma versão do JDK de 17 a 23 com a opção de linha de comando `-Djava.security.manager=disallow`. Se a aplicação instalar um Security Manager personalizado através do método System.setSecurityManager(SecurityManager), a JVM lançará uma UnsupportedOperationException. 
  * Use a ferramenta [`jdeprscan`](<https://docs.oracle.com/en/java/javase/25/docs/specs/man/jdeprscan.html>) de uma versão do JDK de 17 a 23 para procurar por usos de APIs depreciadas do Security Manager, como System.setSecurityManager(SecurityManager) ou java.security.Policy.setPolicy(Policy). 



Conselhos para Mantenedores de Bibliotecas que Suportam o Security Manager

Um pequeno número de bibliotecas foi projetado para usar o Security Manager se ele estiver habilitado. Essas bibliotecas geralmente empregam dois idiomas:

  * Chamando System.getSecurityManager() para verificar se um Security Manager está habilitado e, em caso afirmativo, chamando um dos métodos SecurityManager.checkPermission para verificar se uma operação deve ser concedida ou negada: 
``` SecurityManager sm = System.getSecurityManager();
        if (sm != null) {
            sm.checkPermission(...);
        }
```

  * Chamando um dos métodos AccessController.doPrivileged para executar código com permissões diferentes do código chamador: 
``` SomeReturnValue v = AccessController.doPrivileged(() -> {
            // ...
            return theResult;
        });
```




No JDK 24 e posterior, onde um Security Manager nunca é habilitado, o método System.getSecurityManager() e os métodos AccessController.doPrivileged se comportam como nas versões anteriores do JDK quando um Security Manager não estava habilitado: 

  * System.getSecurityManager() retorna `null`
  * Os seis métodos AccessController.doPrivileged executam a ação fornecida imediatamente 



Consequentemente, o pequeno número de bibliotecas que chamam esses métodos será executado no JDK 24 e posterior sem alterações. No entanto, recomendamos fortemente que novas versões dessas bibliotecas não chamem esses métodos, que serão removidos em uma futura versão.

Um número muito pequeno de bibliotecas usa partes avançadas da API do Security Manager para implementar um ambiente de execução personalizado. Por exemplo, uma biblioteca pode chamar AccessController.checkPermission(Permission) para impor seu próprio modelo de permissão ou chamar Policy.setPolicy(Policy) para fazer com que Security Managers personalizados tratem certos recursos como proibidos. 

No JDK 24 e posterior, esses métodos sempre implementam um ambiente de execução que proíbe o acesso a todos os recursos. Como resultado, os métodos se comportam de forma diferente do que nas versões anteriores do JDK: 

  * O método AccessController.checkPermission(Permission) sempre lança AccessControlException
  * O método Policy.setPolicy(Policy) sempre lança UnsupportedOperationException
  * Os métodos SecurityManager.check* sempre lançam SecurityException



Um Agente que Bloqueia o Código de Chamar System.exit(int)

Um agente é um programa Java que pode alterar o código de uma aplicação enquanto ela está em execução. Agentes conseguem isso transformando os bytecodes de métodos quando as classes são carregadas, ou redefinindo classes depois de terem sido carregadas. Consulte o pacote [java.lang.instrument](<https://docs.oracle.com/en/java/javase/25/docs/api/java.instrument/java/lang/instrument/package-summary.html>) para mais informações sobre agentes. 

O exemplo [Exemplo 1-1](<#/doc/guides/security/security-manager-is-permanently-disabled>) é um agente que bloqueia o código de chamar System.exit(int). O agente declara um método `premain` que é executado pela JVM antes do método `main` da aplicação. Este método registra um transformador que transforma arquivos de classe à medida que são carregados do classpath ou module path. O transformador reescreve cada chamada para System.exit(int) para `throw new RuntimeException("System.exit not allowed")`. 

O transformador lê e escreve bytecodes em arquivos de classe usando a [Class-File API](<#/>). 

Exemplo 1-1 BlockSystemExitAgent.java
```
    import java.lang.classfile.*;
    import java.lang.classfile.instruction.InvokeInstruction;
    import java.lang.constant.ClassDesc;
    import java.lang.constant.MethodTypeDesc;
    import java.lang.instrument.ClassFileTransformer;
    import java.lang.instrument.Instrumentation;
    import java.security.ProtectionDomain;
    import java.util.concurrent.atomic.AtomicBoolean;
    import java.util.function.Predicate;
    
    public class BlockSystemExitAgent {
        /*
         * Before the application starts, register a transformer of class files.
         */
        public static void premain(String agentArgs, Instrumentation inst) {
            var transformer = new ClassFileTransformer() {
                @Override
                public byte[] transform(ClassLoader      loader,
                                        String           className,
                                        Class<?>         classBeingRedefined,
                                        ProtectionDomain protectionDomain,
                                        byte[]           classBytes) {
                    if (loader != null && loader != ClassLoader.getPlatformClassLoader()) {
                        return blockSystemExit(classBytes);
                    } else {
                        return null;
                    }
                }
            };
            inst.addTransformer(transformer, true);
        }
    
        /*
         * Rewrite every invokestatic of System.exit(int) to an athrow of RuntimeException.
         */
        private static byte[] blockSystemExit(byte[] classBytes) {
            var modified = new AtomicBoolean();
            ClassFile cf = ClassFile.of(ClassFile.DebugElementsOption.DROP_DEBUG);
            ClassModel classModel = cf.parse(classBytes);
    
            Predicate<MethodModel> invokesSystemExit =
                methodModel -> methodModel.code()
                                          .map(codeModel ->
                                                 codeModel.elementStream()
                                                          .anyMatch(BlockSystemExitAgent::isInvocationOfSystemExit))
                                          .orElse(false);
    
            CodeTransform rewriteSystemExit =
                (codeBuilder, codeElement) -> {
                    if (isInvocationOfSystemExit(codeElement)) {
                        var runtimeException = ClassDesc.of("java.lang.RuntimeException");
                        codeBuilder.new_(runtimeException)                    
                                   .dup()
                                   .ldc("System.exit not allowed")
                                   .invokespecial(runtimeException,
                                       "<init>",
                                       MethodTypeDesc.ofDescriptor("(Ljava/lang/String;)V"),
                                       false)
                                   .athrow();
                        modified.set(true);
                    } else {
                        codeBuilder.with(codeElement);
                    }
                };
    
            ClassTransform ct = ClassTransform.transformingMethodBodies(invokesSystemExit, rewriteSystemExit);
            byte[] newClassBytes = cf.transformClass(classModel, ct);
            if (modified.get()) {
                return newClassBytes;
            } else {
                return null;
            }
        }
    
        private static boolean isInvocationOfSystemExit(CodeElement codeElement) {
            return codeElement instanceof InvokeInstruction i
                    && i.opcode() == Opcode.INVOKESTATIC
                    && "java/lang/System".equals(i.owner().asInternalName())
                    && "exit".equals(i.name().stringValue())
                    && "(I)V".equals(i.type().stringValue());
        }
    }
```

Para usar `BlockSystemExitAgent`, você deve empacotá-lo em um arquivo JAR e especificá-lo com a opção `-javaagent` ao iniciar uma aplicação. 

Siga estes passos para compilar, empacotar e usar `BlockSystemExitAgent`: 

  1. Compile `BlockSystemExitAgent` no diretório `agentclasses`: 
```
 $ javac -d agentclasses BlockSystemExitAgent.java
```

  2. Crie um manifesto de arquivo JAR em `agent.mf`: 
```
 $ cat > agent.mf << EOF
         Premain-Class: BlockSystemExitAgent
         Can-Retransform-Classes: true
         EOF
```

  3. Crie o arquivo JAR do agente. Observe que há um ponto após `-C agentclasses`: 
```
 $ jar --create --file=BlockSystemExitAgent.jar --manifest=agent.mf -C agentclasses .
```

  4. Execute sua aplicação (que está empacotada em `app.jar` neste exemplo) com o arquivo JAR do agente: 
```
 $ java -javaagent:BlockSystemExitAgent.jar -jar app.jar
```