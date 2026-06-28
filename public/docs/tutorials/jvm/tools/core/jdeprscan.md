# Jdeprscan - Scanner de Elementos de API Depreciados

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ As Ferramentas Essenciais do JDK ](<#/doc/tutorials/jvm/tools/core>) > Jdeprscan - Scanner de Elementos de API Depreciados

**Anterior na Série**

[Jdeps - Analise as Dependências das Suas Classes Java](<#/doc/tutorials/jvm/tools/core/jdeps>)

➜

**Tutorial Atual**

Jdeprscan - Scanner de Elementos de API Depreciados

➜

Este é o fim da série!

**Anterior na Série:** [Jdeps - Analise as Dependências das Suas Classes Java](<#/doc/tutorials/jvm/tools/core/jdeps>)

# Jdeprscan - Scanner de Elementos de API Depreciados

## Apresentando o jdeprscan

[jdeprscan](<https://docs.oracle.com/en/java/javase/26/docs/specs/man/jdeprscan.html>) - ferramenta de análise estática que escaneia um arquivo JAR (ou outra agregação de arquivos de classe) em busca de usos de elementos de API depreciados.

## Sinopse

`options` Veja as opções para o `jdeprscan` abaixo

`dir|jar|class` O comando `jdeprscan` escaneia cada argumento em busca de usos de APIs depreciadas. Os argumentos podem ser:

  * dir: Diretório

  * jar: Arquivo JAR

  * class: Nome da classe ou arquivo de classe

O nome da classe deve usar um ponto `.` como separador. Por exemplo:

`java.lang.Thread`

Para classes aninhadas, o caractere separador cifrão $ deve ser usado. Por exemplo:

`java.lang.Thread$State`

Um arquivo de classe também pode ser nomeado. Por exemplo:

`build/classes/java/lang/Thread$State.class`

## Descrição

A ferramenta `jdeprscan` é uma ferramenta de análise estática fornecida pelo JDK que escaneia um arquivo JAR ou outra agregação de arquivos de classe em busca de usos de elementos de API depreciados. A ferramenta `jdeprscan` identifica apenas as APIs depreciadas definidas pelo Java SE. APIs depreciadas definidas por bibliotecas de terceiros não são reportadas.

Para escanear um arquivo JAR ou um conjunto de arquivos de classe, você deve primeiro garantir que todas as classes das quais as classes escaneadas dependem estejam presentes no classpath. Defina o classpath usando a opção `--class-path` descrita em Opções para o Comando `jdeprscan`. Tipicamente, você usaria o mesmo classpath que usa ao invocar sua aplicação.

Se o `jdeprscan` não conseguir encontrar todas as classes dependentes, ele gerará uma mensagem de erro para cada classe ausente. Essas mensagens de erro são tipicamente na forma de:

## Opções

As seguintes opções estão disponíveis:

`--class-path path` Fornece um caminho de busca para a resolução de classes dependentes.

path pode ser um caminho de busca que consiste em um ou mais diretórios separados pelo separador de caminho específico do sistema. Por exemplo:

**Linux e macOS:**

**Windows:**

`--for-removal` Limita o escaneamento ou listagem a APIs que estão depreciadas para remoção. Não pode ser usado com um valor de release de 6, 7 ou 8.

`--full-version` Imprime a string de versão completa da ferramenta.

`--help` ou `—h` Imprime uma mensagem de ajuda completa.

`--list` ou `—l` Imprime o conjunto de APIs depreciadas. Nenhuma varredura é feita, portanto, nenhum argumento de diretório, jar ou classe deve ser fornecido.

`--release 15|16` Especifica a versão do Java SE que fornece o conjunto de APIs depreciadas para varredura.

`--verbose` ou `—v` Habilita a saída de mensagens adicionais durante o processamento.

`--version` Imprime a string de versão abreviada da ferramenta.

## Exemplos

O arquivo JAR para esta biblioteca será nomeado de forma semelhante a `commons-math3-3.6.1.jar`. Para escanear este arquivo JAR em busca do uso de APIs depreciadas, execute o seguinte comando:

`jdeprscan commons-math3-3.6.1.jar`

Este comando produz várias linhas de saída. Por exemplo, uma linha de saída pode ser:

`class commons.math3.util.Precision uses deprecated method java/lang/Double.<init>(D)V`

A API depreciada que ele usa é um método na classe `java.lang.Double`.

O nome do método depreciado é `<init>`, que é um nome especial que significa que o método é, na verdade, um construtor. Outro nome especial é `<clinit>`, que indica um inicializador estático de classe.

Outros métodos são listados apenas pelo seu nome de método. Após o nome do método, há a lista de argumentos e o tipo de retorno:

`(D)V`

Isso indica que ele recebe apenas um valor double (um primitivo) e retorna void. Os tipos de argumento e retorno podem se tornar crípticos. Por exemplo, outra linha de saída pode ser:

`class commons.math3.util.Precision uses deprecated method java/math/BigDecimal.setScale(II)Ljava/math/BigDecimal;`

Nesta linha de saída, o método depreciado está na classe `java.math.BigDecimal`, e o método é `setScale()`. Neste caso, o `II` significa que ele recebe dois argumentos int. O `Ljava/math/BigDecimal;` após os parênteses significa que ele retorna uma referência para `java.math.BigDecimal`.

Você pode usar o `jdeprscan` em relação às três versões anteriores do JDK. Por exemplo, se você estiver executando o JDK 16, poderá verificar em relação a todos os JDKs anteriores.

Como exemplo, observe este trecho de código:

```java
public class DeprecatedMethod {
    public static void main(String[] args) {
        Double d = new Double(1.0);
        System.out.println(d);
    }
}
```

Execute `jdeprscan` no JDK 9:

```bash
javac DeprecatedMethod.java
jdeprscan --release 9 DeprecatedMethod.class
```

### Neste tutorial

*   Apresentando o jdeprscan
*   Sinopse
*   Descrição
*   Opções
*   Exemplos

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Jdeps - Analise as Dependências das Suas Classes Java](<#/doc/tutorials/jvm/tools/core/jdeps>)

➜

**Tutorial Atual**

Jdeprscan - Scanner de Elementos de API Depreciados

➜

Este é o fim da série!

**Anterior na Série:** [Jdeps - Analise as Dependências das Suas Classes Java](<#/doc/tutorials/jvm/tools/core/jdeps>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ As Ferramentas Essenciais do JDK ](<#/doc/tutorials/jvm/tools/core>) > Jdeprscan - Scanner de Elementos de API Depreciados