# Por que usar a API?

## Parte I Por que usar a API?

Use a Flight Recorder API para um monitoramento de aplicação mais abrangente; você pode analisar com maior detalhe eventos gerados por aplicações, pela JVM e pelo sistema operacional. Além disso, você pode criar seus próprios eventos, registrar seus próprios dados e visualizar e analisar as gravações.

Por exemplo, você pode criar eventos e gravações para os seguintes cenários:

  * Para identificar requisições HTTP GET lentas: Uma aplicação cliente envia uma requisição a um servidor web e leva muito tempo para que a requisição seja processada. Para solucionar este problema, você pode criar um evento que é acionado se a requisição levar mais de cinco segundos para ser processada. Você também pode correlacionar essas requisições com eventos da JVM, como garbage collection ou contenção de threads, que podem impactar o desempenho do servidor web.

  * Para rastrear queries SQL de execução lenta: Algumas queries SQL levam muito tempo para serem executadas em um servidor de banco de dados. Para identificar o problema, você pode criar um evento para registrar todas as queries SQL e, em seguida, analisar as gravações para rastrear as queries de execução mais lenta.

Flight Recorder API ou Java Logging API?

A Java Logging API (veja o pacote [java.util.logging](<https://docs.oracle.com/en/java/javase/25/docs/api/java.logging/java/util/logging/package-summary.html>)) captura informações como falhas de segurança, erros de configuração, gargalos de desempenho e bugs na aplicação ou plataforma. No entanto, comparada com a Java Logging API, a Flight Recorder API fornece mais informações na gravação que gera (e nos eventos que registra), mais informações sobre o contexto em que um evento ocorre e mais controle sobre o tempo dos eventos.