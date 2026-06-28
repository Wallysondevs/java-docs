# Introdução ao JDK Flight Recorder

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ JDK Flight Recorder ](<#/doc/tutorials/jvm/jfr>) > Introdução ao JDK Flight Recorder

**Tutorial Atual**

Introdução ao JDK Flight Recorder

➜

**Próximo na Série**

[Começando com o JDK Flight Recorder](<#/doc/tutorials/jvm/jfr/getting-started>)

**Próximo na Série:** [Começando com o JDK Flight Recorder](<#/doc/tutorials/jvm/jfr/getting-started>)

# Introdução ao JDK Flight Recorder

JDK Flight Recorder, JFR, é um framework de observabilidade e monitoramento integrado à HotSpot JVM que pode ser usado para depurar e perfilar aplicações. O JFR permite que os usuários depurem e perfilam suas aplicações, ajudando a encontrar bugs intermitentes ou difíceis de detectar, melhorias de desempenho e muito mais. Esta série irá guiá-lo pelas principais funcionalidades, APIs e conceitos do JDK Flight Recorder.

## Principais Funcionalidades do JDK Flight Recorder

Assim como o jogo de tabuleiro [Go](<https://en.wikipedia.org/wiki/Go_\(game\)>), o JFR pode ser relativamente fácil de aprender, podendo ser ativado com um único argumento da JVM `-XX:StartFlightRecording`, mas também como o Go, difícil de dominar. Esta seção ajudará a familiarizar usuários novos, e até mesmo experientes, do JFR com algumas das principais funcionalidades e terminologias para fornecer contexto para o restante desta série.

### Integrado à HotSpot JVM

Como mencionado na introdução, o JFR é construído diretamente na HotSpot JVM. Todas as aplicações rodando na HotSpot JVM, ou em uma JVM derivada da HotSpot, terão acesso ao JFR sem quaisquer etapas de configuração ou necessidade de baixar um binário ou biblioteca separada. Isso reduz bastante a barreira de entrada para usar o JFR, pois revisões de segurança extensivas ou avaliações de produto não são necessárias.

### Gratuito para Usar em Produção

Para usuários que executam o JDK 11 ou posterior, o JFR pode ser usado em produção sem uma licença comercial. Essa mudança fez parte do processo de tornar o JFR de código aberto e contribuí-lo para a comunidade, conforme abordado em [JEP 328: Flight Recorder](<https://openjdk.org/jeps/328>). Também com essa mudança, o JFR foi renomeado de Java Flight Recorder para JDK Flight Recorder. Portanto, embora usar "Java Flight Recorder" seja uma referência desatualizada, ela se refere à mesma tecnologia.

### Baixa Sobrecarga e Capacidade Always-On

O JFR recebe seu nome de [um gravador de voo de avião](<https://en.wikipedia.org/wiki/Flight_recorder>). E como um gravador de voo de avião, o JFR tem uma baixa sobrecarga de ~1% com as configurações padrão, e deve permanecer abaixo de 2% com as configurações de perfil. Permitindo que seja usado em produção sem a preocupação de que impactará negativamente o desempenho de uma aplicação. O JFR também é capaz de ser always-on. O JFR gravará o conteúdo capturado em arquivos temporários, ou apenas os armazenará na memória, e à medida que os limites configuráveis de retenção de dados forem atingidos, sobrescreverá o conteúdo mais antigo.

### Framework de Observabilidade e Monitoramento Baseado em Eventos

Os dados que o JFR coleta são chamados de eventos. Eventos são elementos de dados autodescritivos que são propagados a partir da execução de código na JVM e de aplicações rodando na JVM. Os usuários podem configurar como o JFR coleta eventos e até mesmo definir seus próprios eventos para coletar dados adicionais sobre suas aplicações.

### Neste tutorial

Principais Funcionalidades do JDK Flight Recorder

Última atualização: 14 de setembro de 2021

**Tutorial Atual**

Introdução ao JDK Flight Recorder

➜

**Próximo na Série**

[Começando com o JDK Flight Recorder](<#/doc/tutorials/jvm/jfr/getting-started>)

**Próximo na Série:** [Começando com o JDK Flight Recorder](<#/doc/tutorials/jvm/jfr/getting-started>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ JDK Flight Recorder ](<#/doc/tutorials/jvm/jfr>) > Introdução ao JDK Flight Recorder