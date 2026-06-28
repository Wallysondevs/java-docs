# O Comando jnativescan

## Nome

jnativescan - ferramenta de análise estática que verifica um ou mais arquivos jar em busca de usos de funcionalidades nativas, como chamadas de métodos restritos ou declarações de métodos `native`.

## Sinopse

`jnativescan` [_opções_]

_opções_
     Veja Opções para o Comando jnativescan

## Descrição

A ferramenta `jnative` é uma ferramenta de análise estática fornecida pelo JDK que verifica um arquivo JAR em busca de usos de funcionalidades nativas, como chamadas de métodos restritos ou declarações de métodos `native`.

`jnativescan` aceita uma configuração de runtime class path e module path, bem como um conjunto de módulos raiz e uma release alvo. Ele verifica os jars nos class paths e module paths, e relata os usos de funcionalidades nativas tanto em uma estrutura de árvore, que também identifica as classes e métodos chamadores, quanto como uma lista de nomes de módulos quando a flag `--print-native-access` é especificada.

## Opções para o Comando jnativescan

As seguintes opções estão disponíveis:

`--class-path` _path_
     Usado para especificar uma lista de paths apontando para arquivos jar a serem verificados.

Todos os arquivos jar especificados através desta lista serão verificados. Se um arquivo jar contiver um atributo `Class-Path` em seu manifest, os arquivos jar listados lá também serão verificados. Arquivos jar listados no atributo `Class-Path` do manifest que não puderem ser encontrados são ignorados. Todos os arquivos jar encontrados são tratados como se pertencessem ao unnamed module.

`--module-path` _path_
    

Usado para especificar uma lista de paths apontando para arquivos jar ou diretórios contendo arquivos jar, que a ferramenta pode usar para encontrar módulos que precisam ser verificados. A lista de arquivos jar que serão verificados depende da opção `--add-modules`.

Para ambas as opções `--class-path` e `--module-path`, _path_ deve ser um search path que consiste em um ou mais arquivos jar, separados pelo separador de path específico do sistema. Por exemplo:

  * **Linux e macOS:**

> `--class-path /some/foo.jar:/another/different/bar.jar`

**Nota:**

No Windows, use um ponto e vírgula (`;`) como separador em vez de dois pontos (`:`).

  * **Windows:**

> `--class-path C:\some\foo.jar;C:\another\different\bar.jar`

`--add-modules` _module[,module...]_
     Usado para especificar uma lista de nomes de módulos separados por vírgulas que indicam os módulos raiz a serem verificados. Todos os módulos raiz serão verificados, assim como quaisquer módulos dos quais eles dependam. Isso inclui dependências em implementações de serviço especificadas através da diretiva `uses` no arquivo `module-info` de um módulo. Todos os módulos encontrados no module path que fornecem uma implementação de tal serviço também serão verificados.
`--release` _version_
     Usado para especificar a release do Java SE que define o conjunto de métodos restritos a serem verificados. Para arquivos jar multi-release, esta opção também indica a versão do arquivo de classe que deve ser carregada do jar. Esta opção deve ser definida para a versão do runtime sob a qual a aplicação eventualmente se destina a ser executada. Se esta flag for omitida, a versão do `jnativescan` é usada como versão de release, que é a mesma versão do JDK ao qual a ferramenta pertence.
`--print-native-access`
     Imprime uma lista de nomes de módulos separados por vírgulas que usam funcionalidades nativas, em vez da estrutura de árvore padrão.
`--help` ou `-h`
     Imprime uma mensagem de ajuda completa.
`--version`
     Imprime a string de versão abreviada da ferramenta.

## Exemplo de uso do `jnativescan`

`jnativescan` aceita uma configuração de runtime na forma de um class path, module path, conjunto de módulos raiz e uma versão de release alvo. Para o class path, a ferramenta verificará todos os arquivos jar, incluindo aqueles encontrados recursivamente através do atributo `Class-Path` do manifest. Para o module path, a ferramenta verifica todos os módulos raiz especificados através de `--add-modules`, e qualquer dependência (transitiva) dos módulos raiz, incluindo quaisquer módulos que contenham implementações de serviço que são usadas por um módulo verificado.

Por padrão, a ferramenta imprime quais jars, classes e métodos usam funcionalidades nativas, em uma estrutura de árvore. A seguir, um exemplo de saída:
```
    $ jnativescan --class-path app.jar
    app.jar (ALL-UNNAMED):
      foo.Main:
        foo.Main::main(String[])void references restricted methods:
          java.lang.foreign.MemorySegment::reinterpret(long)MemorySegment
        foo.Main::nativeMethod()void is a native method declaration
```

`app.jar (ALL-UNNAMED)` é o path para o arquivo jar, com o nome do módulo entre parênteses atrás dele. Como neste caso o arquivo jar aparece no class path, `ALL-UNNAMED` é impresso para indicar o unnamed module. A segunda linha da saída, `foo.Main`, indica que métodos usando funcionalidades nativas foram encontrados na classe `foo.Main`. A próxima linha:
```
        foo.Main::main(String[])void references restricted methods:
```

Indica que o método `main(String[])` na classe `foo.Main` referencia um método restrito, que é listado na linha seguinte como:
```
          java.lang.foreign.MemorySegment::reinterpret(long)MemorySegment
```

Por fim, o texto:
```
        foo.Main::nativeMethod()void is a native method declaration
```

Indica que a classe `foo.Main` contém uma declaração de um método `native` chamado `nativeMethod`.

Se adicionarmos `--print-native-access` à linha de comando de exemplo, obtemos em vez disso uma lista dos nomes dos módulos que contêm acessos a funcionalidades nativas:
```
    $ jnativescan --class-path app.jar --print-native-access
    ALL-UNNAMED
```

Neste caso, a saída consiste apenas em `ALL-UNNAMED`, o que indica que um arquivo jar no class path, ou seja, no unnamed module, contém um acesso a funcionalidades nativas.