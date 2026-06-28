# Monitorando a Segurança de Aplicações Java com ferramentas JDK e Eventos JFR

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Fundamentos de Segurança usando Bibliotecas JDK ](<#/doc/tutorials/security>) > Monitorando a Segurança de Aplicações Java com ferramentas JDK e Eventos JFR

**Anterior na Série**

[Fundamentos de Assinaturas Digitais e Certificados em Java](<#/doc/tutorials/security/digital-signature>)

➜

**Tutorial Atual**

Monitorando a Segurança de Aplicações Java com ferramentas JDK e Eventos JFR

➜

**Próximo na Série**

[Aproveitando Ferramentas e Atualizações do JDK para Ajudar a Proteger Aplicações Java](<#/doc/tutorials/security/app-integrity-tools>)

**Anterior na Série:** [Fundamentos de Assinaturas Digitais e Certificados em Java](<#/doc/tutorials/security/digital-signature>)

**Próximo na Série:** [Aproveitando Ferramentas e Atualizações do JDK para Ajudar a Proteger Aplicações Java](<#/doc/tutorials/security/app-integrity-tools>)

# Monitorando a Segurança de Aplicações Java com ferramentas JDK e Eventos JFR

## Visão Geral dos Eventos de Segurança JFR

Monitorar a configuração de segurança subjacente da sua aplicação Java oferece insights sobre sua força geral em relação aos padrões criptográficos. O JDK 12 introduziu quatro Eventos de Segurança do JDK Flight Recorder (JFR), desabilitados por padrão nos arquivos de configuração JFR `default.jfc` e `profile.jfc`:

  * `jdk.SecurityPropertyModification` para registrar chamadas do método `Security.setProperty(String key, String value)`
  * `jdk.TLSHandshake` para acompanhar a atividade de handshake TLS
  * `jdk.X509Validation` para registrar detalhes de certificados X.509 negociados em validações X.509 bem-sucedidas
  * `jdk.X509Certificate` para registrar detalhes de Certificados X.509.

Esses eventos também foram retroportados para as versões de atualização Oracle JDK 11.0.5 e 8u231. Você pode habilitar esses eventos modificando os arquivos de configuração JFR ou através de opções JFR padrão. Dê uma olhada na [série JDK Flight Recorder](<#/doc/tutorials/jvm/jfr>) e aprenda como configurá-lo para capturar eventos relevantes da JVM.

Outros dois eventos criptográficos JFR oferecem insights sobre as propriedades de segurança iniciais do JDK (`jdk.InitialSecurityProperty`) e a quantidade de invocações de métodos do provedor de serviço (`jdk.SecurityProviderService`). O lançamento do JDK 20 anunciou o novo `jdk.InitialSecurityProperty` e ele foi retroportado para as versões de atualização Oracle JDK 17.0.7 e 11.0.20. O evento `jdk.SecurityProviderService` também está disponível desde o lançamento do JDK 20, mas também na base de código das versões de atualização JDK 17.0.8, 11.0.22 e 8u391.

Este tutorial tem como objetivo mostrar como utilizar esses Eventos de Segurança JFR e outras ferramentas JDK (keytool, JDK Flight Recorder, JDK Mission Control) para monitorar a segurança da sua aplicação Java.

## Observando Propriedades de Segurança do JDK

O `jdk.InitialSecurityProperty` foi introduzido no JDK 20 para registrar detalhes das propriedades de segurança iniciais quando carregadas através da classe [`java.security.Security`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/security/Security.html>). Você também pode imprimir as propriedades de segurança iniciais para o fluxo de erro padrão se definir a propriedade de sistema `java.security.debug=properties`:

O evento `jdk.InitialSecurityProperty` é habilitado por padrão nos arquivos de configuração JFR `default.jfc` e `profile.jfc`. Se você habilitar o evento `jdk.SecurityPropertyModification` e mantiver `jdk.InitialSecurityProperty` habilitado, você pode usar uma gravação JFR para monitorar as configurações iniciais de todas as propriedades de segurança e quaisquer alterações subsequentes. Existem várias maneiras de obter uma visão completa das alterações nas propriedades de segurança do JDK, incluindo as invocações do provedor de serviço:

  * Tenha também `jdk.SecurityPropertyModification` e `jdk.SecurityProviderService` habilitados na configuração JFR

  * Adicione a flag `-XX:StartFlightRecording` com configurações padrão, enquanto `jdk.SecurityPropertyModification` e `jdk.SecurityProviderService` estiverem habilitados

  * Inicie uma gravação JFR a partir do JDK Mission Control (JMC) estabelecendo uma conexão com uma JVM em execução e configurando os eventos. Vá para o menu do JDK Mission Control (JMC), selecione `File > Connection... > [Selecione uma JVM em execução] > Start Flight Recording` e configure cada evento de Segurança do JDK.

[](<https://dev.java/assets/images/security/flight_recording_jmc.png>)

Você pode iniciar uma gravação a partir do JDK Mission Control (JMC) ou na linha de comando por:

  * executando java com `-XX:StartFlightRecording` ou
  * executar um comando de diagnóstico via ferramenta `jcmd`

Depois de ter um arquivo de gravação ".jfr", você pode imprimir os eventos usando a ferramenta jfr do JDK:

Ao analisar a saída deste comando, você pode observar as alterações que ocorreram para cada propriedade de segurança entre seus valores iniciais capturados por `jdk.InitialSecurityProperty` e as alterações do evento `jdk.SecurityPropertyModification`. Por exemplo, o `jdk.InitialSecurityProperty` capturou `keystore.type` como inicialmente definido para `pkcs12`, e mais tarde `jdk.SecurityPropertyModification` registrou seu valor para `jks`.

Você também pode inspecionar e visualizar a evolução dos eventos capturados no JDK Mission Control carregando o arquivo de gravação e navegando até a seção `Event Browser > Java Development Kit > Security`:

[](<https://dev.java/assets/images/security/jmc_view_jfr_recording.png>)

Além da exibição em tabela dos eventos, o JMC oferece insights de análise de desempenho através de suas visualizações:

  * A visualização Flame renderiza o rastreamento de pilha agregado coletado pelos eventos JFR.
  * A visualização Graph renderiza rastreamentos de pilha agregados com contagem cumulativa. Ela apresenta o rastreamento de pilha em um formato gráfico, o que ajuda a identificar o caminho do método até sua raiz.
  * A visualização Heatmap fornece uma representação visual dos eventos ocorridos durante um período de tempo específico dentro do rastreamento de pilha.
  * A visualização Dependency apresenta a agregação de eventos usando agrupamento hierárquico de arestas e ajuda a visualizar as dependências entre pacotes.

Se você está se perguntando qual versão do protocolo Transport Layer Security (TLS) sua aplicação Java está usando, isso depende de como seu JDK e suas aplicações estão configurados. Nas versões mais recentes do JDK, `TLSv1.3` e `TLSv1.2` são as opções padrão.

Determinar precisamente qual versão do protocolo TLS uma aplicação usa é mais direto coletando dados em tempo de execução. Várias ferramentas e opções de logger estão disponíveis e a próxima seção discutirá algumas delas.

## Monitorando o Protocolo TLS

Para capturar informações do protocolo TLS, pode-se anexar uma ferramenta de análise de protocolo de rede à interface de rede onde a JVM em execução se comunica, e obter informações sobre todo o tráfego de rede. Procure pelo registro "Server Hello" e o valor da versão correspondente para determinar a versão TLS usada em um determinado socket.

Mas uma maneira mais amigável para desenvolvedores Java de verificar a versão do protocolo TLS é inspecionando os logs de depuração do JDK. Se você habilitar a propriedade de sistema `javax.net.debug` para `ssl:handshake` (ou seja, `-Djavax.net.debug=ssl:handshake`), você obterá o valor do protocolo da versão TLS. Abaixo está um exemplo de uma captura de `ServerHello` em um lançamento recente do JDK 21:

A saída acima mostra que `TLSv1.3` está em uso para esta conexão específica (`"selected version": [TLSv1.3]`).

A longo prazo, inspecionar logs pode ser uma tarefa tediosa, então uma opção valiosa para capturar informações essenciais de TLS é através do JDK Flight Recorder. O evento `jdk.TLSHandshake` captura informações essenciais sobre cada handshake TLS realizado pelo JDK. Para habilitá-lo, você pode fazer o seguinte:

  * Simplesmente mude as opções de `jdk.TLSHandshake` para `true` em seu arquivo de configuração JFR:

  * Execute o comando `jfr configure` em uma janela de terminal

  * Adicione a flag `-XX:StartFlightRecording` com configurações padrão, enquanto `jdk.TLSHandshake` também estiver habilitado:

  * Inicie uma gravação JFR a partir do JDK Mission Control (JMC) estabelecendo uma conexão com uma JVM em execução e configurando o evento. Vá para o menu do JDK Mission Control (JMC), selecione `File > Connection... > [Selecione uma JVM em execução] > Start Flight Recording` e configure o evento `jdk.TLSHandshake`.

Você pode iniciar uma gravação a partir do JDK Mission Control (JMC) ou na linha de comando por:

  * executando java com `-XX:StartFlightRecording` ou
  * executar um comando de diagnóstico via ferramenta `jcmd`

Assim que você obtiver uma gravação, você pode analisar os dados do evento `TLSHandshake` com jfr ou no JDK Mission Control. Por exemplo, executar o seguinte comando `jfr print` mostrará a atividade de handshake TLS:

Você pode observar na saída os seguintes campos de evento:

  * Nome do host do par
  * Porta do par
  * Versão do protocolo TLS negociada
  * Suite de cifras TLS negociada
  * ID do certificado do cliente par

Enquanto Transport Layer Security (TLS) é um protocolo criptográfico projetado para suportar comunicações seguras em uma rede de computadores, certificados digitais garantem que os dados sejam transmitidos de forma privada e sem modificações, perda ou roubo. A próxima seção discute como você pode registrar e analisar detalhes de certificados X.509.

## Analisando certificados X.509

Certificados X.509 são amplamente implantados em aplicações JDK para suportar autenticação e outras funcionalidades em sistemas de segurança. Um certificado X.509 possui um conjunto de campos definidos de acordo com [RFC 1422] e incluem:

  1. versão
  2. número de série
  3. assinatura (ID do algoritmo e parâmetros)
  4. nome do emissor
  5. período de validade
  6. nome do sujeito
  7. chave pública do sujeito (e ID do algoritmo associado)

Os valores desses campos impactam a configuração de segurança subjacente nos ambientes onde são usados. Por exemplo, o período de validade de um certificado é uma peça essencial de dados, pois certificados expirados podem causar inatividade da aplicação a partir de uma data específica.

Do ponto de vista da análise estática, você pode usar o `keytool` para consultar certificados. Por exemplo, você pode visualizar detalhes verbosos sobre cada certificado dentro do truststore padrão do JDK (`$JDK_HOME/lib/security/cacerts` no JDK 9 e posterior) executando o seguinte comando:

O cenário acima é simples, mas como você pode recuperar detalhes de certificados que estão realmente em uso para uma aplicação Java?

Configurando as propriedades de sistema de depuração `-Djava.security.debug=certpath` e `-Djavax.net.debug=all` para imprimir informações verbosas de certificados X.509 durante a vida útil de uma aplicação Java.

Abaixo você pode ver uma saída de exemplo de certificados X.509 impressos durante tentativas de validação de caminho de certificado:

No entanto, o log verboso retarda os sistemas devido ao tempo necessário para coletar informações adicionais ou exibir detalhes adicionais. Você pode capturar elegantemente dados relevantes sobre certificados X.509 usando dois eventos de segurança do JDK Flight Recorder:

  * `jdk.X509Validation` que registra detalhes de certificados X.509 negociados em validações X.509 bem-sucedidas.
  * `jdk.X509Certificate` que captura informações sobre cada certificado X.509 gerado pelas bibliotecas de segurança do JDK.

Você tem várias opções para habilitar esses eventos:

  * Simplesmente mude as opções de `jdk.X509Certificate` para `true` em seu arquivo de configuração JFR:

  * Execute o comando `jfr configure` em uma janela de terminal

  * Adicione a flag `-XX:StartFlightRecording` com configurações padrão, enquanto `jdk.X509Certificate` e `jdk.X509Validation` também estiverem habilitados:

  * Inicie uma gravação JFR a partir do JDK Mission Control (JMC) estabelecendo uma conexão com uma JVM em execução e configurando o evento. Vá para o menu do JDK Mission Control (JMC), selecione `File > Connection... > [Selecione uma JVM em execução] > Start Flight Recording` e configure os eventos `jdk.X509Certificate` e `jdk.X509Validation`.

Você pode iniciar uma gravação a partir do JDK Mission Control (JMC) ou na linha de comando por:

  * executando java com `-XX:StartFlightRecording` ou
  * executar um comando de diagnóstico via ferramenta `jcmd`

Por exemplo, executar o seguinte comando mostrará detalhes registrados sobre Certificados X.509:

O JDK Flight Recorder fornece dados ricos e estruturados, como rastreamentos de pilha e valores com carimbo de data/hora, e suporte a API para fluxos de eventos. Até o JDK 16, os desenvolvedores podiam monitorar um processo Java em um host remoto e controlar o que é gravado via JDK Mission Control. O JDK Mission Control busca dados de gravação e configura eventos em uma máquina remota usando [`FlightRecorderMXBean`](<https://docs.oracle.com/en/java/javase/26/docs/api/jdk.management.jfr/jdk/management/jfr/FlightRecorderMXBean.html>).

A partir do JDK 16, você pode transferir eventos gravados programaticamente pela rede à medida que ocorrem usando um [`MBeanServerConnection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.management/javax/management/MBeanServerConnection.html>):

Portanto, utilize as ferramentas e APIs do JDK disponíveis com sua versão do JDK e analise as configurações de segurança e os dados de certificado em tempo de execução para manter sua aplicação segura!

## Links Úteis:

  * [Roteiro Criptográfico do Oracle JDK](<https://www.java.com/en/jre-jdk-cryptoroadmap.html>)
  * [Especificação de Nomes de Algoritmos Padrão de Segurança Java](<https://docs.oracle.com/en/java/javase/26/docs/specs/security/standard-names.html>)
  * [RFC1422](<https://www.ietf.org/rfc/rfc1422.html>)

## Mais Aprendizado

### Neste tutorial

Visão Geral dos Eventos de Segurança JFR Observando Propriedades de Segurança do JDK Monitorando o Protocolo TLS Analisando certificados X.509 Links Úteis Mais Aprendizado

Última atualização: 1º de dezembro de 2023

**Anterior na Série**

[Fundamentos de Assinaturas Digitais e Certificados em Java](<#/doc/tutorials/security/digital-signature>)

➜

**Tutorial Atual**

Monitorando a Segurança de Aplicações Java com ferramentas JDK e Eventos JFR

➜

**Próximo na Série**

[Aproveitando Ferramentas e Atualizações do JDK para Ajudar a Proteger Aplicações Java](<#/doc/tutorials/security/app-integrity-tools>)

**Anterior na Série:** [Fundamentos de Assinaturas Digitais e Certificados em Java](<#/doc/tutorials/security/digital-signature>)

**Próximo na Série:** [Aproveitando Ferramentas e Atualizações do JDK para Ajudar a Proteger Aplicações Java](<#/doc/tutorials/security/app-integrity-tools>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Fundamentos de Segurança usando Bibliotecas JDK ](<#/doc/tutorials/security>) > Monitorando a Segurança de Aplicações Java com ferramentas JDK e Eventos JFR