# O Comando jdeprscan

## Nome

jdeprscan - ferramenta de análise estática que verifica um arquivo JAR (ou alguma outra agregação de arquivos de classe) em busca de usos de elementos de API descontinuados.

## Sinopse

`jdeprscan` [_options_] {_dir_ |_jar_ |_class_}

_options_
     Veja Opções para o Comando jdeprscan
_dir_ |_jar_ |_class_
    

O comando `jdeprscan` verifica cada argumento em busca de usos de APIs descontinuadas. Os argumentos podem ser:

  * _dir_ : Diretório

  * _jar_ : Arquivo JAR

  * _class_ : Nome da classe ou arquivo de classe




O nome da classe deve usar um ponto (`.`) como separador. Por exemplo:

`java.lang.Thread`

Para classes aninhadas, o caractere separador cifrão `$` deve ser usado. Por exemplo:

`java.lang.Thread$State`

Um arquivo de classe também pode ser nomeado. Por exemplo:

`build/classes/java/lang/Thread$State.class`

## Descrição

A ferramenta `jdeprscan` é uma ferramenta de análise estática fornecida pelo JDK que verifica um arquivo JAR ou alguma outra agregação de arquivos de classe em busca de usos de elementos de API descontinuados. As APIs descontinuadas identificadas pela ferramenta `jdeprscan` são apenas aquelas definidas pelo Java SE. APIs descontinuadas definidas por bibliotecas de terceiros não são relatadas.

Para verificar um arquivo JAR ou um conjunto de arquivos de classe, você deve primeiro garantir que todas as classes das quais as classes verificadas dependem estejam presentes no classpath. Defina o classpath usando a opção `--class-path` descrita em Opções para o Comando jdeprscan. Tipicamente, você usaria o mesmo classpath que usa ao invocar sua aplicação.

Se o `jdeprscan` não conseguir encontrar todas as classes dependentes, ele gerará uma mensagem de erro para cada classe que estiver faltando. Essas mensagens de erro são tipicamente na forma:

> `error: cannot find class ...`

Se esses erros ocorrerem, você deve ajustar o classpath para que ele inclua todas as classes dependentes.

## Opções para o Comando jdeprscan

As seguintes opções estão disponíveis:

`--class-path` _path_
    

Fornece um caminho de busca para a resolução de classes dependentes.

_path_ pode ser um caminho de busca que consiste em um ou mais diretórios separados pelo separador de caminho específico do sistema. Por exemplo:

  * **Linux e macOS:**

> `--class-path /some/directory:/another/different/dir`




**Nota:**

No Windows, use um ponto e vírgula (`;`) como separador em vez de dois pontos (`:`).

  * **Windows:**

> `--class-path \some\directory;\another\different\dir`



`--for-removal`
     Limita a verificação ou listagem a APIs que estão descontinuadas para remoção. Não pode ser usado com um valor de release de 6, 7 ou 8. 
`--full-version`
     Imprime a string de versão completa da ferramenta. 
`--help` ou `-h`
     Imprime uma mensagem de ajuda completa. 
`--list` ou `-l`
     Imprime o conjunto de APIs descontinuadas. Nenhuma verificação é feita, portanto, nenhum argumento de diretório, jar ou classe deve ser fornecido. 
`--release` `6`|`7`|`8`|`9`
     Especifica o release do Java SE que fornece o conjunto de APIs descontinuadas para verificação. 
`--verbose` ou `-v`
     Habilita a saída de mensagens adicionais durante o processamento. 
`--version`
     Imprime a string de versão abreviada da ferramenta. 

## Exemplo de Saída do jdeprscan

O arquivo JAR para esta biblioteca terá um nome semelhante a `commons-math3-3.6.1.jar`. Para verificar este arquivo JAR em busca do uso de APIs descontinuadas, execute o seguinte comando:

> `jdeprscan commons-math3-3.6.1.jar`

Este comando produz várias linhas de saída. Por exemplo, uma linha de saída pode ser:
```
    class org/apache/commons/math3/util/MathUtils uses deprecated method java/lang/Double::<init>(D)V
```

**Nota:**

O nome da classe é especificado usando o nome binário separado por barras, conforme descrito em JVMS 4.2.1. Esta é a forma usada internamente em arquivos de classe.

A API descontinuada que ele usa é um método na classe `java.lang.Double`.

O nome do método descontinuado é `<init>`, que é um nome especial que significa que o método é, na verdade, um construtor. Outro nome especial é `<clinit>`, que indica um inicializador estático de classe.

Outros métodos são listados apenas pelo nome do método. Seguindo o nome do método, está a lista de argumentos e o tipo de retorno:

> `(D)V`

Isso indica que ele recebe apenas um valor double (um tipo primitivo) e retorna void. Os tipos de argumento e retorno podem se tornar crípticos. Por exemplo, outra linha de saída pode ser:
```
    class org/apache/commons/math3/util/Precision uses deprecated method java/math/BigDecimal::setScale(II)Ljava/math/BigDecimal;
```

Nesta linha de saída, o método descontinuado está na classe `java.math.BigDecimal`, e o método é `setScale()`. Neste caso, `(II)` significa que ele recebe dois argumentos `int`. O `Ljava/math/BigDecimal;` após os parênteses significa que ele retorna uma referência para `java.math.BigDecimal`.

## A Análise do jdeprscan Pode Ser Específica da Versão

Você pode usar o `jdeprscan` em relação aos três releases anteriores do JDK. Por exemplo, se você estiver executando o JDK 9, poderá verificar em relação ao JDK 8, 7 e 6.

Como exemplo, observe este trecho de código:
```
    public class Deprecations {
       SecurityManager sm = new RMISecurityManager();    // deprecated in 8
       Boolean b2 = new Boolean(true);          // deprecated in 9
    }
```

A classe completa compila sem avisos no JDK 7.

Se você executar o `jdeprscan` em um sistema com JDK 9, verá:
```
    $ jdeprscan --class-path classes --release 7 example.Deprecations
    (no output)
```

Execute o `jdeprscan` com um valor de release de 8:
```
    $ jdeprscan --class-path classes --release 8 example.Deprecations
    class example/Deprecations uses type java/rmi/RMISecurityManager deprecated
    class example/Deprecations uses method in type java/rmi/RMISecurityManager deprecated
```

Execute o `jdeprscan` no JDK 9:
```
    $ jdeprscan --class-path classes example.Deprecations
    class example/Deprecations uses type java/rmi/RMISecurityManager deprecated
    class example/Deprecations uses method in type java/rmi/RMISecurityManager deprecated
    class example/Deprecations uses method java/lang/Boolean <init> (Z)V deprecated
```