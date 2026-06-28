# Variáveis de Ambiente e Propriedades do Sistema

## C Variáveis de Ambiente e Propriedades do Sistema
  
Este apêndice descreve variáveis de ambiente e propriedades do sistema que podem ser úteis para solucionar problemas com a Java HotSpot VM.

[Enviar um Relatório de Bug](<#/doc/guides/troubleshoot/submit-bug-report>) contém informações sobre a coleta de variáveis de ambiente em [Variáveis de Ambiente](<#/doc/guides/troubleshoot/submit-bug-report>). 

Este apêndice contém as seguintes seções:

  * [A Variável de Ambiente JAVA_TOOL_OPTIONS](<#/doc/guides/troubleshoot/environment-variables-and-system-properties>)

  * [A Propriedade do Sistema java.security.debug](<#/doc/guides/troubleshoot/environment-variables-and-system-properties>)

### A Variável de Ambiente JAVA_TOOL_OPTIONS

Em muitos ambientes, a linha de comando não é facilmente acessível para iniciar a aplicação com as opções de linha de comando necessárias.

Isso geralmente acontece com aplicações que usam VMs embarcadas (o que significa que elas usam a API de Invocação da Java Native Interface (JNI) para iniciar a VM), ou onde a inicialização está profundamente aninhada em scripts. Nesses ambientes, a variável de ambiente `JAVA_TOOL_OPTIONS` pode ser útil para aumentar uma linha de comando. 

Nota:

Em alguns casos, esta opção é desabilitada por razões de segurança. 

Esta variável de ambiente permite especificar a inicialização de ferramentas, especificamente o lançamento de agentes nativos ou da linguagem de programação Java usando as opções `-agentlib` ou `-javaagent`. 

Esta variável também pode ser usada para aumentar a linha de comando com outras opções para fins de diagnóstico. Por exemplo, você pode fornecer a opção `-XX:OnError` para especificar um script ou comando a ser executado quando um erro fatal ocorrer. 

Como esta variável de ambiente é examinada no momento em que a função `JNI_CreateJavaVM` é chamada, ela não pode ser usada para aumentar a linha de comando com opções que normalmente seriam tratadas pelo launcher, por exemplo, seleção de VM usando a opção `-client` ou a opção `-server`. 

### A Propriedade do Sistema java.security.debug

Esta propriedade do sistema controla se o sistema de segurança do runtime Java imprime mensagens de rastreamento durante a execução.

Esta opção pode ser útil ao diagnosticar problemas envolvendo as bibliotecas de segurança no JDK.

Para saber mais sobre a propriedade do sistema `java.security.debug`, consulte [Solução de Problemas de Segurança](<#/>) no Guia do Desenvolvedor de Segurança da Java Platform, Standard Edition.