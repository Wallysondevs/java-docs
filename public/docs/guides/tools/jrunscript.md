# O Comando jrunscript

## Nome

jrunscript - executa um shell de script de linha de comando que suporta modos interativo e em lote

## Sinopse

**Nota:**

Esta ferramenta é **experimental** e não suportada. Ela está obsoleta e será removida em uma versão futura.

`jrunscript` [_options_] [_arguments_]

_options_
     Isso representa as opções de linha de comando do `jrunscript` que podem ser usadas. Consulte Opções para o Comando jrunscript.
_arguments_
     Argumentos, quando usados, seguem imediatamente após as opções ou o nome do comando. Consulte Argumentos.

## Descrição

O comando `jrunscript` é um shell de script de linha de comando independente de linguagem. O comando `jrunscript` suporta tanto um modo interativo (leitura-avaliação-impressão) quanto um modo em lote (opção `-f`) de execução de script. Por padrão, JavaScript é a linguagem usada, mas a opção `-l` pode ser usada para especificar uma linguagem diferente. Ao usar a comunicação de Java para linguagem de script, o comando `jrunscript` suporta um estilo de programação exploratório.

Se JavaScript for usado, antes de avaliar um script definido pelo usuário, o comando `jrunscript` inicializa certas funções e objetos embutidos, que estão documentados na Especificação da API para funções embutidas JavaScript do `jrunscript`.

## Opções para o Comando jrunscript

`-cp` _path_ ou `-classpath` _path_
     Indica onde estão quaisquer arquivos de classe que o script precisa acessar.
`-D` _name_`=`_value_
     Define uma propriedade de sistema Java.
`-J` _flag_
     Passa _flag_ diretamente para a Java Virtual Machine onde o comando `jrunscript` está sendo executado.
`-l` _language_
     Usa a linguagem de script especificada. Por padrão, JavaScript é usado. Para usar outras linguagens de script, você deve especificar o arquivo JAR do motor de script correspondente com a opção `-cp` ou `-classpath`.
`-e` _script_
     Avalia o script especificado. Esta opção pode ser usada para executar scripts de uma linha que são especificados completamente na linha de comando.
`-encoding` _encoding_
     Especifica a codificação de caracteres usada para ler arquivos de script.
`-f` _script-file_
     Avalia o arquivo de script especificado (modo em lote).
`-f -`
     Entra no modo interativo para ler e avaliar um script da entrada padrão.
`-help` ou `-?`
     Exibe uma mensagem de ajuda e sai.
`-q`
     Lista todos os motores de script disponíveis e sai.

## Argumentos

Se argumentos estiverem presentes e se nenhuma opção `-e` ou `-f` for usada, então o primeiro argumento é o arquivo de script e o restante dos argumentos, se houver, são passados como argumentos de script. Se argumentos e a opção `-e` ou `-f` forem usados, então todos os argumentos são passados como argumentos de script. Se os argumentos `-e` e `-f` estiverem ausentes, então o modo interativo é usado.

## Exemplo de Execução de Scripts Inline

> `jrunscript -e "print('hello world')"`

> `jrunscript -e "cat('http://www.example.com')"`

## Exemplo de Uso de Linguagem Especificada e Avaliação do Arquivo de Script

> `jrunscript -l js -f test.js`

## Exemplo de Modo Interativo
```
    jrunscript
    js> print('Hello World\n');
    Hello World
    js> 34 + 55
    89.0
    js> t = new java.lang.Thread(function() { print('Hello World\n'); })
    Thread[Thread-0,5,main]
    js> t.start()
    js> Hello World
    
    js>
```

## Executar Arquivo de Script com Argumentos de Script

Neste exemplo, o arquivo `test.js` é o arquivo de script. Os argumentos `arg1`, `arg2` e `arg3` são passados para o script. O script pode acessar esses argumentos com um array de argumentos.

> `jrunscript test.js arg1 arg2 arg3`