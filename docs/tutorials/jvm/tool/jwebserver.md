# JWebserver - Inicie o Servidor Web Simples do Java

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > JWebserver - Inicie o Servidor Web Simples do Java

# JWebserver - Inicie o Servidor Web Simples do Java

## Apresentando o jwebserver

[jwebserver](<https://docs.oracle.com/en/java/javase/26/docs/specs/man/jwebserver.html>) - uma ferramenta que oferece um servidor HTTP mínimo, servindo uma única hierarquia de diretórios, e destinada a prototipagem, testes e depuração.

## Sinopse

`options` Veja as opções para o `jwebserver` abaixo.

As seguintes opções estão disponíveis:

`--bind-address addr` ou `—b addr` Especifica o endereço para vincular. O endereço padrão é `127.0.0.1` ou `::1` (loopback). Caso precise de todas as interfaces, você pode usar `-b 0.0.0.0` ou `-b ::`.

`--directory dir` ou `—d dir` Especifica o diretório a ser servido. O valor padrão é o diretório atual.

`--help` ou `—h` Imprime uma mensagem de ajuda completa.

`--output level` ou `—o level` Especifica o formato de saída e pode ser um de `none | info | verbose`. O valor padrão é `info`.

`--port port` ou `-p port` Especifica a porta para escutar. O valor da porta padrão é 8000.

`--version` Imprime a string de versão abreviada da ferramenta.

## Descrição

`jwebserver` é uma ferramenta do JDK que fornece um servidor HTTP mínimo que você pode usar para prototipagem, testes e depuração. A ferramenta serve apenas arquivos estáticos e examina uma única hierarquia de diretórios sobre HTTP/1.1; conteúdo dinâmico e outras versões HTTP não são suportados. O módulo `jdk.httpserver` contém `jwebserver` e pode ser iniciado alternativamente com `java -m jdk.httpserver` porque é baseado na implementação do servidor web no pacote `com.sun.net.httpserver`. A classe [SimpleFileServer](<https://docs.oracle.com/en/java/javase/26/docs/api/jdk.httpserver/com/sun/net/httpserver/SimpleFileServer.html>) oferece uma maneira programática de recuperar o servidor e seus componentes para reutilização e extensão. Consulte a seção [trabalhando com a API do Servidor Web Simples](<#/doc/tutorials/jvm/tool/jwebserver>).

Os métodos de requisição servidos são apenas `HEAD` e `GET` idempotentes. Se você tentar quaisquer outras requisições, receberá uma resposta `501 - Not Implemented` ou `405 - Not Allowed`. A ferramenta mapeia requisições GET para o diretório que está sendo servido, da seguinte forma:

  * Caso o recurso solicitado seja um arquivo, seu conteúdo é servido.
  * Se o recurso solicitado for um diretório que contém um arquivo de índice, o conteúdo desse arquivo de índice é servido.
  * Caso contrário, a resposta conterá os nomes de todos os arquivos e subdiretórios do diretório. Links simbólicos e arquivos ocultos não são listados ou servidos.

`jwebserver` tem tipos MIME configurados automaticamente, usando uma tabela embutida. Por exemplo, arquivos `.html` são servidos como `text/html` e arquivos `.java` são servidos como `text/plain`.

## Exemplos de Linha de Comando

`jwebserver` pode ajudar você com:

  * Testes de desenvolvimento web, quando você precisa de um servidor de teste local para simular uma configuração cliente-servidor.

  * Testes de web-service ou aplicação, onde você usa arquivos estáticos como stubs de API em uma estrutura de diretórios para espelhar URLs RESTful e conter dados fictícios.

[](<https://dev.java/assets/images/tools/jwebserver/serve-static-endpoint.png>)

  * Navegação informal e compartilhamento de arquivos entre sistemas para, por exemplo, pesquisar um diretório em um servidor remoto a partir de sua máquina local.

Embora a ferramenta de linha de comando seja útil, você também pode usar o Servidor Web Simples (ou seja, servidor, handler e filtro) com código existente através de sua API.

## Trabalhando com a API do Servidor Web Simples

Além da ferramenta de linha de comando `jwebserver`, o Servidor Web Simples fornece uma API para que você possa criar e personalizar programaticamente o servidor e seus componentes. Anteriormente, você observou como o comando `jwebserver` serve os arquivos do diretório de trabalho atual. No entanto, o que você às vezes precisa é que a estrutura de diretórios simule padrões de resposta esperados e não preserve fisicamente os mocks. Você pode conseguir esse comportamento usando o sistema de arquivos em memória `Jimfs` do Google para criar recursos em memória e servi-los com o Servidor Web Simples:

```java
import com.google.common.jimfs.Configuration;
import com.google.common.jimfs.Jimfs;
import com.sun.net.httpserver.SimpleFileServer;
import java.io.IOException;
import java.nio.file.FileSystem;
import java.nio.file.Files;
import java.nio.file.Path;

public class InMemoryFileServer {

    public static void main(String[] args) throws IOException {
        // Create an in-memory file system
        FileSystem jimfs = Jimfs.newFileSystem(Configuration.unix());
        Path dir = jimfs.getPath("/in-memory-data");
        Files.createDirectory(dir);

        // Create a JSON file in memory
        Path jsonFile = dir.resolve("data.json");
        String jsonContent = "{\"message\": \"Hello from in-memory server!\"}";
        Files.writeString(jsonFile, jsonContent);

        // Start the SimpleFileServer to serve the in-memory directory
        SimpleFileServer.createFileServer(dir, 8000);
        System.out.println("Serving in-memory files on http://localhost:8000");
        System.out.println("Access http://localhost:8000/data.json");
    }
}
```

Execute o trecho de código anterior na linha de comando via:

```bash
javac -d out --module-path lib/jimfs-1.3.0.jar InMemoryFileServer.java
java --module-path lib/jimfs-1.3.0.jar -cp out InMemoryFileServer
```

O exemplo acima serve uma resposta JSON armazenada na memória do servidor, economizando assim espaço em disco enquanto fornece o necessário para [API stubbing](<http://wiremock.org/docs/stubbing/>). Você pode encontrar outra maneira de servir ativos em memória no [artigo de Christian Stein](<https://inside.java/2023/11/06/in-memory-http-server-handler/>) onde ele está implementando `com.sun.net.httpserver.HttpHandler` para servir ativos em memória. Mais exemplos programáticos sobre o uso da API do Servidor Web Simples estão disponíveis no [artigo de Julia Boes em https://inside.java](<https://inside.java/2021/12/06/working-with-the-simple-web-server>).

## Links Úteis

  * In-memory HttpServer Handler: <https://inside.java/2023/11/06/in-memory-http-server-handler/>
  * Working with the Simple Web Server: <https://inside.java/2021/12/06/working-with-the-simple-web-server>

## Mais Aprendizado

### Neste tutorial

Apresentando o jwebserver Sinopse Descrição Exemplos de Linha de Comando Trabalhando com a API do Servidor Web Simples Links Úteis Mais Aprendizado

Última atualização: 4 de janeiro de 2024

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > JWebserver - Inicie o Servidor Web Simples do Java