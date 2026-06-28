# O Comando jwebserver

## Nome

jwebserver - inicia o Servidor Web Simples Java

## Sinopse

`jwebserver` [_options_]

_options_
     Opções de linha de comando. Para uma descrição detalhada das opções, consulte Opções.

## Descrição

A ferramenta `jwebserver` fornece um servidor HTTP mínimo, projetado para ser usado em prototipagem, testes e depuração. Ele serve uma única hierarquia de diretórios e apenas arquivos estáticos. Apenas HTTP/1.1 é suportado; HTTP/2 e HTTPS não são suportados.

Apenas requisições HEAD e GET idempotentes são atendidas. Quaisquer outras requisições recebem uma resposta `501 - Not Implemented` ou `405 - Not Allowed`. As requisições GET são mapeadas para o diretório sendo servido, da seguinte forma:

  * Se o recurso solicitado for um arquivo, seu conteúdo é servido.
  * Se o recurso solicitado for um diretório que contém um arquivo de índice, o conteúdo do arquivo de índice é servido.
  * Caso contrário, os nomes de todos os arquivos e subdiretórios do diretório são listados. Links simbólicos e arquivos ocultos não são listados ou servidos.

Os tipos MIME são configurados automaticamente, usando a tabela embutida. Por exemplo, arquivos `.html` são servidos como `text/html` e arquivos `.java` são servidos como `text/plain`.

`jwebserver` está localizado no módulo jdk.httpserver e pode ser iniciado alternativamente com `java -m jdk.httpserver`. Ele é baseado na implementação do servidor web no pacote `com.sun.net.httpserver`. A classe `com.sun.net.httpserver.SimpleFileServer` fornece uma maneira programática de recuperar o servidor e seus componentes para reutilização e extensão.

## Uso
```
    jwebserver [-b bind address] [-p port] [-d directory]
               [-o none|info|verbose] [-h to show options]
               [-version to show version information]
```

## Opções

`-h` ou `-?` ou `--help`
     Imprime a mensagem de ajuda e sai.
`-b` _addr_ ou `--bind-address` _addr_
     Especifica o endereço para vincular. Padrão: 127.0.0.1 ou ::1 (loopback). Para todas as interfaces, use `-b 0.0.0.0` ou `-b ::`.
`-d` _dir_ ou `--directory` _dir_
     Especifica o diretório a ser servido. Padrão: diretório atual.
`-o` _level_ ou `--output` _level_
     Especifica o formato de saída. `none` | `info` | `verbose`. Padrão: `info`.
`-p` _port_ ou `--port` _port_
     Especifica a porta para escutar. Padrão: 8000.
`-version` ou `--version`
     Imprime as informações de versão e sai.

Para parar o servidor, pressione `Ctrl + C`.

## Iniciando o Servidor

O comando a seguir inicia o Servidor Web Simples:
```
    $ jwebserver
```

Se a inicialização for bem-sucedida, o servidor imprime uma mensagem para `System.out` listando o endereço local e o caminho absoluto do diretório que está sendo servido. Por exemplo:
```
    $ jwebserver
    Binding to loopback by default. For all interfaces use "-b 0.0.0.0" or "-b ::".
    Serving /cwd and subdirectories on 127.0.0.1 port 8000
    URL http://127.0.0.1:8000/
```

## Configuração

Por padrão, o servidor é executado em primeiro plano e se vincula ao endereço de loopback e à porta 8000. Isso pode ser alterado com as opções `-b` e `-p`. Por exemplo, para vincular o Servidor Web Simples a todas as interfaces, use:
```
    $ jwebserver -b 0.0.0.0
    Serving /cwd and subdirectories on 0.0.0.0 (all interfaces) port 8000
    URL http://123.456.7.891:8000/
```

Observe que isso torna o servidor web acessível a todos os hosts na rede. _Não faça isso a menos que tenha certeza de que o servidor não pode vazar nenhuma informação sensível._

Como outro exemplo, use o seguinte comando para executar na porta 9000:
```
    $ jwebserver -p 9000
```

Por padrão, os arquivos do diretório atual são servidos. Um diretório diferente pode ser especificado com a opção `-d`.

Por padrão, cada requisição é registrada no console. A saída se parece com isto:
```
    127.0.0.1 - - [10/Feb/2021:14:34:11 +0000] "GET /some/subdirectory/ HTTP/1.1" 200 -
```

A saída de log pode ser alterada com a opção `-o`. A configuração padrão é `info`. A configuração `verbose` inclui adicionalmente os cabeçalhos de requisição e resposta, bem como o caminho absoluto do recurso solicitado.

## Parando o Servidor

Uma vez iniciado com sucesso, o servidor é executado até ser parado. Em plataformas Unix, o servidor pode ser parado enviando-lhe um sinal `SIGINT` (`Ctrl+C` em uma janela de terminal).

## Opção de Ajuda

A opção `-h` exibe uma mensagem de ajuda descrevendo o uso e as opções do `jwebserver`.