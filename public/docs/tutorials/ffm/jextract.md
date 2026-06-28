# Gerar Bindings Java com Jextract

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A Foreign Function and Memory API ](<#/doc/tutorials/ffm>) > Gerar Bindings Java com Jextract

**Anterior na Série**

[Solucionar Problemas em Chamadas para Funções de Bibliotecas Nativas](<#/doc/tutorials/ffm/troubleshoot>)

➜

**Tutorial Atual**

Gerar Bindings Java com Jextract

➜

Este é o fim da série!

**Anterior na Série:** [Solucionar Problemas em Chamadas para Funções de Bibliotecas Nativas](<#/doc/tutorials/ffm/troubleshoot>)

# Gerar Bindings Java com Jextract

## Introdução

Ao desenvolver aplicações Java, podem existir casos de uso em que elas exigem acesso a bibliotecas e memória de terceiros escritas em outras linguagens de programação. O Project Panama foi projetado para atender à demanda por um melhor suporte ao desenvolvedor no acesso a bibliotecas nativas, particularmente para aquelas desenvolvidas com C/C++. A interação entre a JVM e as APIs "estrangeiras" (não-Java) foi simplificada com a [Foreign Function and Memory API (FFM API)](<https://openjdk.org/jeps/454>). A FFM API se tornou um recurso final no JDK 22 e adiciona suporte para acesso à memória estrangeira, bem como para chamadas de funções estrangeiras.

A ferramenta [`jextract`](<https://jdk.java.net/jextract/>) analisa arquivos de cabeçalho (`.h`) de bibliotecas nativas e gera código Java, chamado bindings, que internamente usa a Foreign Function and Memory API. Graças à saída do [`jextract`](<https://jdk.java.net/jextract/>), você pode usar diretamente um modelo Java das bibliotecas nativas de seu interesse.

Este tutorial o guiará sobre como obter e executar a ferramenta [`jextract`](<https://jdk.java.net/jextract/>), mas também sobre como usar o código Java que ela gera.

## Obter jextract

Binários pré-construídos para `jextract` são lançados periodicamente [aqui](<https://jdk.java.net/jextract/>). Esses binários são construídos a partir do branch master do [repositório jextract](<https://github.com/openjdk/jextract>) e visam o acesso à memória estrangeira e a function API no JDK mais recente.

Baixe o binário adequado ao seu sistema operacional e você poderá começar a usá-lo. Alternativamente, você pode construir o `jextract` a partir das fontes mais recentes seguindo as instruções dentro [de seu repositório](<https://github.com/openjdk/jextract/tree/master?tab=readme-ov-file#building>).

> ⚠️ Se você estiver usando macOS Catalina ou posterior, pode ser necessário remover o atributo de quarentena dos bits antes de poder usar os binários do jextract. Execute o seguinte comando para conseguir isso:

```bash
xattr -d com.apple.quarantine /path/to/jextract/bin/jextract
```

## Opções de Linha de Comando

`-D` ou `--define-macro <macro>=<value>`

Define `<macro>` para `<value>` (ou 1 se `<value>` for omitido).

`--header-class-name <name>`

Designa o nome da classe de cabeçalho gerada. Se esta opção não for especificada, o nome da classe de cabeçalho é derivado do nome do arquivo de cabeçalho. Por exemplo, a classe "foo_h" para o cabeçalho "foo.h". Se vários cabeçalhos forem especificados, esta opção é obrigatória.

`-t, --target-package <package>`

Define o nome do pacote de destino para as classes geradas. Se esta opção não for especificada, um pacote sem nome é usado.

`-I, --include-dir <dir>`

Adiciona um diretório aos caminhos de busca de inclusão. Os caminhos de busca de inclusão são pesquisados em ordem. Por exemplo, se `-I foo -I bar` for especificado, os arquivos de cabeçalho serão pesquisados em "foo" primeiro, depois (se nada for encontrado) em "bar".

`-l, --library <name \| path>`

Especifica uma shared library que deve ser carregada pela classe de cabeçalho gerada. Se começar com `:`, o que se segue é interpretado como um library path. Caso contrário, `<libspec>` denota um library name. Exemplos:

*   `-l GL`,
*   `-l :libGL.so.1`
*   `-l :/usr/lib/libGL.so.1`.

`--use-system-load-library`

As bibliotecas especificadas usando `-l` são carregadas na busca de símbolos do carregador (usando `System::loadLibrary` ou `System::load`). Esta opção é útil se as bibliotecas devem ser carregadas de um dos caminhos em `java.library.path`.

`--output <path>`

Define onde colocar os arquivos gerados.

`--dump-includes <file>`

Despeja os símbolos incluídos no arquivo especificado.

Para filtrar elementos específicos, o `jextract` pode gerar um dump de todos os símbolos encontrados em um arquivo de cabeçalho. Este dump pode ser manipulado e então usado como um arquivo de argumento (com a sintaxe `@argfile`) para gerar bindings apenas para um subconjunto de símbolos vistos pelo `jextract`.

`--include-[function,constant,struct,union,typedef,var]<String>`

Inclui um símbolo do nome e tipo fornecidos nos bindings gerados. Quando uma dessas opções é especificada, qualquer símbolo que não seja correspondido por nenhum filtro especificado é omitido dos bindings gerados.

`--version`

Imprime informações da versão da ferramenta, o JDK para o qual foi construída, a versão do clang e sai.

## Como Executar jextract

Vamos pegar o seguinte exemplo: renderizar um teapot usando funções de [freeglut](<https://freeglut.sourceforge.net/>) (para Windows use o [pacote freeglut MSVC](<https://www.transmissionzero.co.uk/software/freeglut-devel/>)). `freeglut` é uma alternativa open-source à biblioteca `OpenGL Utility Toolkit (GLUT)`.

> ⚠️ Se você estiver usando macOS Catalina ou posterior, você também deve instalar [mesa-glu](<https://cgit.freedesktop.org/mesa/glu>), uma biblioteca open-source que fornece funções utilitárias adicionais para complementar a especificação principal do OpenGL:

```bash
brew install mesa-glu
```

Tipicamente, uma native library possui um diretório `include` que contém todos os arquivos de cabeçalho que definem a interface da biblioteca, com um arquivo de cabeçalho principal. A biblioteca `freeglut` localizada em `/path/to/freeglut/` possui um diretório `path/to/freeglut/version/include` onde os arquivos de cabeçalho são armazenados.

Vamos abrir uma janela de terminal no diretório raiz do projeto Java em que você está trabalhando, que possui um diretório de origem `src` correspondente ao pacote raiz, e executar o `jextract` para transformar o cabeçalho principal do `freeglut` em código Java:

```bash
jextract --output src \
    -l :/opt/homebrew/Cellar/freeglut/3.6.0/lib/libglut.3.dylib \
    -I /opt/homebrew/Cellar/freeglut \
    -I /opt/homebrew/Cellar/mesa \
    -I /opt/homebrew/Cellar/mesa-glu \
    -t org.freeglut \
    /opt/homebrew/Cellar/freeglut/3.6.0/include/GL/freeglut.h
```

Este comando transformará o arquivo de cabeçalho `/opt/homebrew/Cellar/freeglut/3.6.0/include/GL/freeglut.h` em classes Java correspondentes, levando em consideração as seguintes opções:

*   `--output src` para armazenar a saída no diretório raiz `src`;
*   `-l :/opt/homebrew/Cellar/freeglut/3.6.0/lib/libglut.3.dylib` instrui o `jextract` que os bindings gerados devem carregar do library path `/opt/homebrew/Cellar/freeglut/3.6.0/lib/libglut.3.dylib`;
*   `-I /opt/homebrew/Cellar/freeglut`, ` -I /opt/homebrew/Cellar/mesa`, `-I /opt/homebrew/Cellar/mesa-glu` especificam os diretórios de busca de arquivos de cabeçalho. Esses locais são usados para encontrar arquivos de cabeçalho incluídos via `#include` no arquivo de cabeçalho principal;
*   ` -t org.freeglut` especifica o pacote de destino ao qual as classes e interfaces geradas pertencerão. (`jextract` criará automaticamente a estrutura de pacotes sob o diretório `src` especificado via `--output`);
*   `/opt/homebrew/Cellar/freeglut/3.6.0/include/GL/freeglut.h` é o arquivo de cabeçalho principal da native library para a qual você deseja gerar bindings.

O comando equivalente no Windows é similar:

```bash
jextract --output src ^
    -l :C:\freeglut\bin\freeglut.dll ^
    -I C:\freeglut\include ^
    -t org.freeglut ^
    C:\freeglut\include\GL\freeglut.h
```

### Filtragem

Algumas bibliotecas são incrivelmente grandes (como `Windows.h`), e você pode não precisar de todo o código gerado pelo `jextract`. Para tais situações, você pode usar as opções de linha de comando `--include-XYZ` do `jextract` para gerar classes apenas para os elementos que você especificar.

Para saber quais símbolos você pode filtrar, o `jextract` pode gerar um dump de todos os símbolos encontrados em um arquivo de cabeçalho:

```bash
jextract --dump-includes glut.symbols /opt/homebrew/Cellar/freeglut/3.6.0/include/GL/freeglut.h
```

Obtemos um arquivo `glut.symbols` contendo quase 5000 linhas como a seguinte:

```c
// freeglut.h:103:10: #include <GL/gl.h>
```

Você pode editá-lo para conter apenas os símbolos de que precisa e, em seguida, usá-lo como um arquivo de argumento (usando a sintaxe `@argfile`) para gerar bindings apenas para um subconjunto de símbolos vistos pelo `jextract`:

```bash
jextract @glut.symbols --output src \
    -l :/opt/homebrew/Cellar/freeglut/3.6.0/lib/libglut.3.dylib \
    -I /opt/homebrew/Cellar/freeglut \
    -I /opt/homebrew/Cellar/mesa \
    -I /opt/homebrew/Cellar/mesa-glu \
    -t org.freeglut \
    /opt/homebrew/Cellar/freeglut/3.6.0/include/GL/freeglut.h
```

> ⚠️ Se você remover uma declaração que é necessária por outra estrutura incluída, o `jextract` reportará a dependência ausente e terminará sem gerar nenhum binding:

```
Error: Missing declaration for 'GLenum'
```

## Integrar Código Gerado por jextract

A maioria dos métodos que o `jextract` gera são static, e são projetados para serem importados usando `import static`. Para acessar o código que o `jextract` gera para o arquivo de cabeçalho `freeglut.h`, apenas as duas importações wildcard a seguir são necessárias:

```java
import static org.freeglut.freeglut_h.*;
import org.freeglut.*;
```

A declaração `import static org.freeglut.freeglut_h.*;` importará todas as funções e campos static da classe que o `jextract` gera para o arquivo de cabeçalho principal da biblioteca. Isso inclui métodos para acessar funções, variáveis globais, macros, enums, typedefs primitivos e layouts para tipos C embutidos. A declaração `import org.freeglut.*;` importa todas as outras classes geradas pelo `jextract`, que podem incluir:

*   classes representando structs ou unions,
*   tipos de função,
*   e typedefs de struct ou union.

Agora vamos escrever o código `Teapot.java`. Para acelerar as coisas, vamos nos inspirar na variante nativa `Teapot.c` do código:

```c
#include <GL/freeglut.h>

void display() {
    glClear(GL_COLOR_BUFFER_BIT);
    glColor3f(0.0, 1.0, 0.0);
    glutWireTeapot(0.5);
    glFlush();
}

void init() {
    glClearColor(0.0, 0.0, 0.0, 0.0);
    glMatrixMode(GL_PROJECTION);
    glLoadIdentity();
    glOrtho(-1.0, 1.0, -1.0, 1.0, -1.0, 1.0);
}

int main(int argc, char** argv) {
    glutInit(&argc, argv);
    glutCreateWindow("Teapot");
    init();
    glutDisplayFunc(display);
    glutMainLoop();
    return 0;
}
```

Podemos manter o método `display` em Java e mudar `init` para um construtor:

```java
import java.lang.foreign.*;
import static java.lang.foreign.ValueLayout.*;

import static org.freeglut.freeglut_h.*;
import org.freeglut.*;

public class Teapot {
    static void display() {
        glClear(GL_COLOR_BUFFER_BIT);
        glColor3f(0.0f, 1.0f, 0.0f);
        glutWireTeapot(0.5);
        glFlush();
    }

    Teapot(Arena arena) {
        glClearColor(0.0f, 0.0f, 0.0f, 0.0f);
        glMatrixMode(GL_PROJECTION);
        glLoadIdentity();
        glOrtho(-1.0, 1.0, -1.0, 1.0, -1.0, 1.0);
    }

    public static void main(String[] args) {
        try (Arena arena = Arena.ofConfined()) {
            var argc = arena.allocateFrom(C_INT, 0);
            var argv = MemorySegment.NULL;
            glutInit(argc, argv);
            var title = arena.allocateFrom(C_POINTER, arena.allocateFrom(C_CHAR, "Teapot"));
            glutCreateWindow(title);
            new Teapot(arena);
            glutDisplayFunc(display$mh());
            glutMainLoop();
        }
    }
}
```

Este exemplo usa [`Arena.ofConfined()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/foreign/Arena.html#ofConfined\(\)>), uma [`Arena`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/foreign/Arena.html>) confinada porque a aplicação tem um lifetime determinado. O escopo de uma arena confinada está ativo desde o momento em que é criada até o momento em que é fechada. Uma arena confinada tem uma owner thread e essa é a thread que a criou. Apenas a owner thread pode acessar os memory segments alocados em uma arena confinada. Se você tentar fechar uma arena confinada com uma thread diferente da owner thread, você receberá uma exception.

O memory segment `argc` é alocado com a arena invocando [`Arena.allocateFrom(OfInt,int)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/foreign/Arena.html#allocateFrom\(ValueLayout.OfInt,int\)>) e é inicializado nesta linha: `var argc = arena.allocateFrom(C_INT, 0);`. `C_INT` é uma constante gerada pelo `jextract`, que tem o valor [`ValueLayout.JAVA_INT`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/foreign/ValueLayout.html#JAVA_INT>), e `0` é o valor usado para inicializar o memory segment.

Na variante C do código, `glutInit` usa as variáveis `argc` e `argv` não modificadas da função `main`. `argc` significa o número de strings apontadas por `argv`. A variante Java não pretende processar argumentos de linha de comando definindo o valor de `argc` como 0, então o método `glutInit` reutiliza o memory segment `argc` enquanto o restante do método `main` é mantido o mais similar possível à sua variante nativa:

```java
            var argc = arena.allocateFrom(C_INT, 0);
            var argv = MemorySegment.NULL;
            glutInit(argc, argv);
```

Como o código gerado para `glutCreateWindow` requer um [`MemorySegment`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/foreign/MemorySegment.html>), você o aloca com a arena previamente inicializada e armazena o título da janela na off-heap memory associada ao memory segment:

```java
            var title = arena.allocateFrom(C_POINTER, arena.allocateFrom(C_CHAR, "Teapot"));
            glutCreateWindow(title);
```

Finalmente, você pode criar um teapot chamando o construtor `Teapot.java` com a arena e, em seguida, invocar o display callback para a janela atual.

```java
            new Teapot(arena);
            glutDisplayFunc(display$mh());
            glutMainLoop();
```

Para executar o exemplo `Teapot.java`, você deve primeiro compilar o código gerado pelo `freeglut`:

```bash
javac -d mods --enable-preview --source 22 src/org/freeglut/*.java src/Teapot.java
```

Em seguida, vamos iniciar o programa `Teapot.java`:

```bash
java --enable-preview --enable-native-access=ALL-UNNAMED -Djava.library.path=/opt/homebrew/Cellar/freeglut/3.6.0/lib -p mods -m Teapot
```

Você deve ver um teapot verde:

[](<https://dev.java/assets/images/tools/jextract/teapot.png>)

### Rastreamento

Ao depurar uma aplicação, é útil inspecionar os parâmetros passados para uma native call. O código gerado pelo `jextract` suporta o rastreamento de native calls, o que significa que os parâmetros passados para native calls podem ser impressos na standard output.

Para habilitar o suporte a rastreamento, basta passar a flag `-Djextract.trace.downcalls=true` como um VM argument ao iniciar sua aplicação:

```bash
java --enable-preview --enable-native-access=ALL-UNNAMED -Djava.library.path=/opt/homebrew/Cellar/freeglut/3.6.0/lib -Djextract.trace.downcalls=true -p mods -m Teapot
```

Abaixo você pode observar um trecho da saída do comando anterior:

```
[jextract] downcall: glutInit(MemorySegment, MemorySegment)
```

## Suporte a Linguagens de Programação

A Foreign Function and Memory API e o `jextract` suportam arquivos de cabeçalho C, mas outras linguagens possuem interoperabilidade C. Você ainda pode usar o `jextract` para integrar com bibliotecas escritas nessas linguagens através de uma camada C intermediária. Confira a tabela abaixo para entender quais outras linguagens podem funcionar com o `jextract` e como fazer isso:

| Linguagem | Método de acesso |
| :-------- | :--------------- |
| C++       | C++ permite declarar C methods usando a sintaxe `extern "C"`, e muitas C++ libraries possuem uma C interface. O Jextract pode consumir tal C interface, que pode então ser usada para acessar a biblioteca em questão. |
| Rust      | O ecossistema Rust possui uma ferramenta chamada `cbindgen` que pode ser usada para gerar uma C interface para uma Rust library. Tal C interface gerada pode então ser consumida pelo jextract, e ser usada para acessar a biblioteca em questão. |

## Links Úteis

*   Repositório Jextract: <https://github.com/openjdk/jextract>
*   Guia Jextract: <https://github.com/openjdk/jextract/blob/master/doc/GUIDE.md>
*   Binários Jextract: <https://jdk.java.net/jextract/>
*   Estado do jextract: <https://cr.openjdk.org/~mcimadamore/panama/jextract_changes.html>
*   Estado do suporte à memória estrangeira: <https://github.com/openjdk/panama-foreign/blob/f75fbac0dd2f8a7861cd349872a27b86ddb53f35/doc/panama_memaccess.md>
*   Estado do suporte a funções estrangeiras: <https://github.com/openjdk/panama-foreign/blob/f75fbac0dd2f8a7861cd349872a27b86ddb53f35/doc/panama_ffi.md>

### Neste tutorial

Introdução Obter jextract Opções de Linha de Comando Como Executar jextract Integrar Código Gerado por jextract Suporte a Linguagens de Programação Links Úteis

Última atualização: 28 de dezembro de 2024

**Anterior na Série**

[Solucionar Problemas em Chamadas para Funções de Bibliotecas Nativas](<#/doc/tutorials/ffm/troubleshoot>)

➜

**Tutorial Atual**

Gerar Bindings Java com Jextract

➜

Este é o fim da série!

**Anterior na Série:** [Solucionar Problemas em Chamadas para Funções de Bibliotecas Nativas](<#/doc/tutorials/ffm/troubleshoot>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A Foreign Function and Memory API ](<#/doc/tutorials/ffm>) > Gerar Bindings Java com Jextract