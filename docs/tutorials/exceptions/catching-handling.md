# Capturando e Tratando Exceções

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Exceções ](<#/doc/tutorials/exceptions>) > Capturando e Tratando Exceções

**Anterior na Série**

[O Que É Uma Exceção?](<#/doc/tutorials/exceptions/what-is-an-exception>)

➜

**Tutorial Atual**

Capturando e Tratando Exceções

➜

**Próximo na Série**

[Lançando Exceções](<#/doc/tutorials/exceptions/throwing>)

**Anterior na Série:** [O Que É Uma Exceção?](<#/doc/tutorials/exceptions/what-is-an-exception>)

**Próximo na Série:** [Lançando Exceções](<#/doc/tutorials/exceptions/throwing>)

# Capturando e Tratando Exceções

## Capturando e Tratando Exceções

Esta seção descreve como usar os três componentes do manipulador de exceções — os blocos `try`, `catch` e `finally` — para escrever um manipulador de exceções. Em seguida, a instrução try-with-resources, introduzida no Java SE 7, é explicada. A instrução try-with-resources é particularmente adequada para situações que utilizam recursos [`Closeable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/Closeable.html>), como streams.

Se você está ansioso para praticar os padrões mais comuns de tratamento de exceções, pode pular diretamente para o final desta página: [Praticando o Tratamento de Exceções](<#/doc/tutorials/exceptions/catching-handling>)

A última parte desta seção apresenta um exemplo e analisa o que ocorre durante vários cenários.

O exemplo a seguir define e implementa uma classe chamada `ListOfNumbers`. Quando construída, `ListOfNumbers` cria um [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) que contém 10 elementos [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>) com valores sequenciais de 0 a 9. A classe `ListOfNumbers` também define um método chamado `writeList()`, que escreve a lista de números em um arquivo de texto chamado `OutFile.txt`. Este exemplo usa classes de saída definidas em [`java.io`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/package-summary.html>), que são abordadas na seção [Java I/O](<#/doc/tutorials/java-io>).

A primeira linha do método `writeList()` é uma chamada a um construtor. O construtor inicializa um print writer, que inicializa um file writer em um arquivo. Se o arquivo não puder ser aberto, o construtor de `FileWriter` lança uma [`IOException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/IOException.html>).

Então, na linha dentro do loop `for`, há uma chamada ao método [`list.get(i)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html#get\(int\)>), que lança uma [`IndexOutOfBoundsException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/IndexOutOfBoundsException.html>) se o valor de seu argumento for muito pequeno ou muito grande. Se houver _N_ elementos na lista, então _i_ precisa ser maior ou igual a 0, e menor que _N_.

Se você tentar compilar a classe `ListOfNumbers`, o compilador imprime uma mensagem de erro sobre a exceção lançada pelo construtor [`FileWriter`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/FileWriter.html>). No entanto, ele não exibe uma mensagem de erro sobre a exceção lançada por `get()`. A razão é que a exceção lançada pelo construtor, [`IOException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/IOException.html>), é uma exceção verificada (checked exception), e a lançada pelo método `get()`, [`IndexOutOfBoundsException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/IndexOutOfBoundsException.html>), é uma exceção não verificada (unchecked exception).

Agora que você está familiarizado com a classe `ListOfNumbers` e onde as exceções podem ser lançadas dentro dela, você está pronto para escrever manipuladores de exceções para capturar e tratar essas exceções.

## O Bloco Try

O primeiro passo na construção de um manipulador de exceções é envolver o código que pode lançar uma exceção dentro de um bloco `try`. Em geral, um bloco `try` se parece com o seguinte:

```java
try {
    code
}
catch (ExceptionType name) {
    // Handle one type of exception
}
catch (ExceptionType name) {
    // Handle another type of exception
}
finally {
    // code to be executed regardless of exception
}
```

O segmento no exemplo rotulado `code` contém uma ou mais linhas de código válidas que podem lançar uma exceção. (Os blocos `catch` e `finally` são explicados nas próximas duas subseções.)

Para construir um manipulador de exceções para o método `writeList()` da classe `ListOfNumbers`, envolva as instruções que lançam exceções do método `writeList()` dentro de um bloco `try`. Há mais de uma maneira de fazer isso. Você pode colocar cada linha de código que pode lançar uma exceção dentro de seu próprio bloco `try` e fornecer manipuladores de exceções separados para cada uma. Ou, você pode colocar todo o código de `writeList()` dentro de um único bloco `try` e associar vários manipuladores a ele. A listagem a seguir usa um bloco `try` para o método inteiro porque o código em questão é muito curto.

```java
public void writeList() {
    PrintWriter out = null;
    try {
        System.out.println("Entering try statement");
        out = new PrintWriter(new FileWriter("OutFile.txt"));
        for (int i = 0; i < SIZE; i++) {
            out.println("Value at: " + i + " = " + list.get(i));
        }
    }
    catch (IndexOutOfBoundsException e) {
        System.err.println("Caught IndexOutOfBoundsException: " + e.getMessage());
    }
    catch (IOException e) {
        System.err.println("Caught IOException: " + e.getMessage());
    }
    finally {
        if (out != null) {
            System.out.println("Closing PrintWriter");
            out.close();
        } else {
            System.out.println("PrintWriter not open");
        }
    }
}
```

Se uma exceção ocorrer dentro do bloco `try`, essa exceção é tratada por um manipulador de exceções associado a ele. Para associar um manipulador de exceções a um bloco `try`, você deve colocar um bloco `catch` depois dele; a próxima seção, Os Blocos Catch, mostra como.

## Os Blocos Catch

Você associa manipuladores de exceções a um bloco `try` fornecendo um ou mais blocos `catch` diretamente após o bloco `try`. Nenhum código pode estar entre o final do bloco `try` e o início do primeiro bloco `catch`.

Observe que, nesse caso, uma exceção capturada não pode ser capturada por nenhuma exceção anterior. Por exemplo, não é possível escrever o seguinte. [`IOException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/IOException.html>) é um supertipo de [`FileNotFoundException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/FileNotFoundException.html>), então nenhuma exceção pode ser capturada pelo segundo `catch`. Se você escrever este código, o compilador gerará um erro, informando que a [`FileNotFoundException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/FileNotFoundException.html>) já foi capturada.

```java
try {
    // ...
} catch (IOException ioe) {
    // ...
} catch (FileNotFoundException fnfe) { // Compile-time error
    // ...
}
```

Cada bloco `catch` é um manipulador de exceções que trata o tipo de exceção indicado por seu argumento. O tipo de argumento, `ExceptionType`, declara o tipo de exceção que o manipulador pode tratar e deve ser o nome de uma classe que herda da classe [`Throwable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Throwable.html>). O manipulador pode se referir à exceção com um nome: `ioe` e `fnfe` no exemplo anterior. Observe que, a partir do JDK 22, você também pode dar a variável não nomeada aos seus manipuladores.

O bloco `catch` contém código que é executado se e quando o manipulador de exceções é invocado. O sistema de tempo de execução invoca o manipulador de exceções quando o manipulador é o primeiro na pilha de chamadas cujo `ExceptionType` corresponde ao tipo da exceção lançada. O sistema considera uma correspondência se o objeto lançado puder ser legalmente atribuído ao argumento do manipulador de exceções.

Os seguintes são dois manipuladores de exceções para o método `writeList()`:

```java
catch (IndexOutOfBoundsException e) {
    System.err.println("Caught IndexOutOfBoundsException: " + e.getMessage());
}
catch (IOException e) {
    System.err.println("Caught IOException: " + e.getMessage());
}
```

Manipuladores de exceções podem fazer mais do que apenas imprimir mensagens de erro ou interromper o programa. Eles podem fazer recuperação de erros, solicitar ao usuário que tome uma decisão ou propagar o erro para um manipulador de nível superior usando exceções encadeadas, conforme descrito na seção [Exceções Encadeadas](<#/doc/tutorials/exceptions/throwing>).

## Captura Múltipla de Exceções

Você pode capturar mais de um tipo de exceção com um único manipulador de exceções, usando o padrão de captura múltipla.

No Java SE 7 e posterior, um único bloco `catch` pode tratar mais de um tipo de exceção. Este recurso pode reduzir a duplicação de código e diminuir a tentação de capturar uma exceção excessivamente ampla.

Na cláusula `catch`, especifique os tipos de exceções que o bloco pode tratar e separe cada tipo de exceção com uma barra vertical (`|`):

```java
catch (IOException | IndexOutOfBoundsException ex) {
    System.err.println("Caught IOException or IndexOutOfBoundsException: " + ex.getMessage());
}
```

Nota: Se um bloco `catch` trata mais de um tipo de exceção, então o parâmetro `catch` é implicitamente `final`. Neste exemplo, o parâmetro `catch` `ex` é `final` e, portanto, você não pode atribuir nenhum valor a ele dentro do bloco `catch`.

Observe também que o compilador impõe restrições às exceções que você captura com esta sintaxe. Ou seja, essas exceções não podem estender umas às outras, em nenhuma ordem. Assim, o código a seguir não compila, com uma mensagem de erro _Types in multi-catch must be disjoint_.

```java
catch (IOException | FileNotFoundException ex) { // Compile-time error
    // ...
}
```

## O Bloco Finally

O bloco `finally` sempre é executado quando o bloco `try` é encerrado. Isso garante que o bloco `finally` seja executado mesmo que ocorra uma exceção inesperada. Mas `finally` é útil para mais do que apenas tratamento de exceções — ele permite que o programador evite que o código de limpeza seja acidentalmente ignorado por um `return`, `continue` ou `break`. Colocar o código de limpeza em um bloco `finally` é sempre uma boa prática, mesmo quando nenhuma exceção é antecipada.

> Nota: Se a JVM for encerrada enquanto o código `try` ou `catch` estiver sendo executado, o bloco `finally` pode não ser executado.

O bloco `try` do método `writeList()` com o qual você tem trabalhado aqui abre um [`PrintWriter`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/PrintWriter.html>). O programa deve fechar essa stream antes de sair do método `writeList()`. Isso representa um problema um tanto complicado porque o bloco `try` de `writeList()` pode ser encerrado de uma de três maneiras.

1.  A nova instrução [`FileWriter`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/FileWriter.html>) falha e lança uma [`IOException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/IOException.html>).
2.  A instrução [`list.get(i)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html#get\(int\)>) falha e lança uma [`IndexOutOfBoundsException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/IndexOutOfBoundsException.html>).
3.  Tudo é bem-sucedido e o bloco `try` é encerrado normalmente.

O sistema de tempo de execução sempre executa as instruções dentro do bloco `finally`, independentemente do que aconteça dentro do bloco `try`. Portanto, é o lugar perfeito para realizar a limpeza.

O seguinte bloco `finally` para o método `writeList()` limpa e então fecha o [`PrintWriter`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/PrintWriter.html>).

```java
finally {
    if (out != null) {
        System.out.println("Closing PrintWriter");
        out.close();
    } else {
        System.out.println("PrintWriter not open");
    }
}
```

> Importante: O bloco `finally` é uma ferramenta chave para prevenir vazamentos de recursos. Ao fechar um arquivo ou recuperar recursos de outra forma, coloque o código em um bloco `finally` para garantir que o recurso seja sempre recuperado.
>
> Considere usar a instrução try-with-resources nessas situações, que libera automaticamente os recursos do sistema quando não são mais necessários. Você pode verificar a seção [A Instrução try-with-resources](<#/doc/tutorials/exceptions/catching-handling>) para saber mais sobre a instrução try-with-resources.

## Exceções Lançadas de um Bloco Finally

Você pode se deparar com a seguinte situação.

1.  Você executa um bloco `try`, e uma exceção é lançada, interrompendo a execução deste bloco.
2.  Você então executa seu bloco `finally`. Mas então, outra exceção é lançada dentro do seu bloco `finally`.

Isso pode acontecer se o bloco `finally` tentar fechar um recurso, e uma exceção for lançada pela chamada a `close()`.

Nesse caso, a exceção lançada em seu bloco `finally` é a que é propagada para o código chamador. A exceção lançada no bloco `try` é descartada e esquecida.

Você pode ver isso no exemplo a seguir.

```java
class MyResource implements AutoCloseable {
    public void close() throws Exception {
        System.out.println("Closing MyResource");
        throw new Exception("Exception from close()");
    }
}

public class ExceptionInFinally {
    public static void main(String[] args) {
        try {
            MyResource resource = new MyResource();
            try {
                System.out.println("Entering try block");
                throw new Exception("Exception from try block");
            } finally {
                resource.close();
            }
        } catch (Exception e) {
            System.err.println("Caught exception: " + e.getMessage());
        }
    }
}
```

Executar o código anterior imprime o seguinte.

```
Entering try block
Closing MyResource
Caught exception: Exception from close()
```

Você verá na próxima seção [A Instrução Try-with-resources](<#/doc/tutorials/exceptions/catching-handling>) como você pode obter todas as exceções lançadas por este código, incluindo a lançada do bloco `try`.

## A Instrução Try-with-resources

### Fechando Recursos e Tratando Exceções

A instrução try-with-resources é uma instrução `try` que declara um ou mais recursos. Um recurso é um objeto que deve ser fechado depois que o programa termina de usá-lo. A instrução try-with-resources garante que cada recurso seja fechado no final da instrução.

Qualquer objeto que implemente [`java.lang.AutoCloseable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/AutoCloseable.html>) pode ser usado como um recurso. Observe que isso inclui todos os objetos que implementam [`java.io.Closeable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/Closeable.html>), pois [`java.io.Closeable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/Closeable.html>) estende [`java.lang.AutoCloseable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/AutoCloseable.html>). Você pode facilmente criar seus próprios recursos para sua aplicação, já que a interface [`java.lang.AutoCloseable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/AutoCloseable.html>) tem apenas um método: [`close()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/AutoCloseable.html#close\(\)>).

Os recursos declarados no bloco `try()` precisam ser `final`, mas o compilador os tornará `final` para você se você não os declarar como tal. Você também pode usar variáveis existentes como recursos, desde que sejam `final` ou efetivamente `final`, e atribuídas antes da instrução try-with-resources. Essas variáveis ainda precisam implementar [`java.lang.AutoCloseable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/AutoCloseable.html>).

O exemplo a seguir lê a primeira linha de um arquivo. Ele usa uma instância de [`BufferedReader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/BufferedReader.html>) para ler dados do arquivo. [`BufferedReader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/BufferedReader.html>) é um recurso que deve ser fechado depois que o programa termina de usá-lo:

```java
static String readFirstLineFromFile(String path) throws IOException {
    try (BufferedReader br = new BufferedReader(new FileReader(path))) {
        return br.readLine();
    }
}
```

Neste exemplo, o recurso declarado na instrução try-with-resources é um [`BufferedReader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/BufferedReader.html>). A instrução de declaração aparece entre parênteses imediatamente após a palavra-chave `try`. A classe [`BufferedReader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/BufferedReader.html>), no Java SE 7 e posterior, implementa a interface [`java.lang.AutoCloseable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/AutoCloseable.html>), então você pode usá-la nesta instrução try-with-resources.

Como a instância de [`BufferedReader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/BufferedReader.html>) é declarada em uma instrução try-with-resources, ela será fechada independentemente de a instrução `try` ser concluída normalmente ou abruptamente. O método [`BufferedReader.readLine()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/BufferedReader.html#readLine\(\)>) pode lançar uma [`IOException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/IOException.html>).

Antes do Java SE 7, você pode usar um bloco `finally` para garantir que um recurso seja fechado independentemente de a instrução `try` ser concluída normalmente ou abruptamente. O exemplo a seguir usa um bloco `finally` em vez de uma instrução try-with-resources:

```java
static String readFirstLineFromFileWithFinallyBlock(String path) throws IOException {
    BufferedReader br = new BufferedReader(new FileReader(path));
    try {
        return br.readLine();
    } finally {
        br.close();
    }
}
```

No entanto, como você viu na seção anterior, se os métodos [`readLine()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/BufferedReader.html#readLine\(\)>) e `close()` ambos lançarem exceções, então o método `readFirstLineFromFileWithFinallyBlock()` lança a exceção lançada do bloco `finally`; a exceção lançada do bloco `try` é descartada e esquecida.

Em contraste, se exceções forem lançadas tanto do bloco `try()` quanto da instrução try-with-resources, então o método lança a exceção lançada do bloco `try()`. A exceção do bloco `finally` é adicionada à primeira exceção como uma exceção _suprimida_.

Você pode ver isso no exemplo a seguir, onde o recurso falso sempre lança uma exceção quando fechado. Como ele implementa [`AutoCloseable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/AutoCloseable.html>), você pode usá-lo em uma instrução try-with-resources.

```java
class MyResource implements AutoCloseable {
    public void close() throws Exception {
        System.out.println("Closing MyResource");
        throw new Exception("Exception from close()");
    }
}

public class ExceptionInTryWithResources {
    public static void main(String[] args) {
        try (MyResource resource = new MyResource()) {
            System.out.println("Entering try-with-resources block");
            throw new Exception("Exception from try block");
        } catch (Exception e) {
            System.err.println("Caught exception: " + e.getMessage());
            for (Throwable t : e.getSuppressed()) {
                System.err.println("Suppressed exception: " + t.getMessage());
            }
        }
    }
}
```

Executar o código anterior lhe dá o seguinte resultado. Agora a exceção propagada para o código chamador é a do bloco `try`. As exceções lançadas do bloco `finally` (pode haver mais de uma) são adicionadas a ela como exceções suprimidas.

```
Entering try-with-resources block
Closing MyResource
Caught exception: Exception from try block
Suppressed exception: Exception from close()
```

### Abrindo Vários Recursos

Você pode declarar um ou mais recursos em uma instrução try-with-resources. O exemplo a seguir recupera os nomes dos arquivos empacotados no arquivo zip `zipFileName` e cria um arquivo de texto que contém os nomes desses arquivos:

```java
public static void writeToFileZipFileContents(String zipFileName,
                                            String outputFileName)
                                            throws java.io.IOException {

    java.nio.charset.Charset charset = java.nio.charset.StandardCharsets.US_ASCII;
    java.nio.file.Path outputFilePath = java.nio.file.Paths.get(outputFileName);

    // Open zip file and create output file with
    // try-with-resources statement

    try (java.util.zip.ZipFile zf = new java.util.zip.ZipFile(zipFileName);
         java.io.BufferedWriter writer = java.nio.file.Files.newBufferedWriter(outputFilePath, charset)) {
        // Iterate over entries in the zip file
        for (java.util.Enumeration entries = zf.entries(); entries.hasMoreElements();) {
            // Get the entry name and write it to the output file
            String zipEntryName = ((java.util.zip.ZipEntry)entries.nextElement()).getName();
            writer.write(zipEntryName, 0, zipEntryName.length());
            writer.newLine();
        }
    }
}
```

Neste exemplo, a instrução try-with-resources contém duas declarações que são separadas por um ponto e vírgula: [`ZipFile`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/zip/ZipFile.html>) e [`BufferedWriter`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/BufferedWriter.html>). Quando o bloco de código que o segue diretamente termina, seja normalmente ou devido a uma exceção, os métodos [`close()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/BufferedWriter.html#close\(\)>) dos objetos [`BufferedWriter`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/BufferedWriter.html>) e [`ZipFile`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/zip/ZipFile.html>) são chamados automaticamente nesta ordem. Observe que os métodos `close()` dos recursos são chamados na ordem inversa de sua criação.

O exemplo a seguir usa uma instrução try-with-resources para fechar automaticamente um objeto [`java.sql.Statement`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.sql/java/sql/Statement.html>):

```java
public static void viewTable(Connection con) throws SQLException {

    String query = "select COF_NAME, SUP_ID, PRICE, SALES, TOTAL from COFFEES";

    try (Statement stmt = con.createStatement()) {
        ResultSet rs = stmt.executeQuery(query);
        while (rs.next()) {
            String coffeeName = rs.getString("COF_NAME");
            int supplierID = rs.getInt("SUP_ID");
            float price = rs.getFloat("PRICE");
            int sales = rs.getInt("SALES");
            int total = rs.getInt("TOTAL");
            System.out.println(coffeeName + ", " + supplierID + ", " + price + ", " + sales + ", " + total);
        }
    } catch (SQLException e) {
        JDBCTutorialUtilities.printSQLException(e);
    }
}
```

O recurso [`java.sql.Statement`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.sql/java/sql/Statement.html>) usado neste exemplo faz parte da API JDBC 4.1 e posterior.

Nota: Uma instrução try-with-resources pode ter blocos `catch` e `finally` assim como uma instrução `try` comum. Em uma instrução try-with-resources, qualquer bloco `catch` ou `finally` é executado após os métodos [`close()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/AutoCloseable.html#close\(\)>) dos recursos declarados terem sido chamados. Observe que algumas dessas chamadas podem falhar, levando a um recurso não fechado.
## Exceções Suprimidas

Uma exceção pode ser lançada a partir do bloco de código associado à instrução try-with-resources. No exemplo `writeToFileZipFileContents()`, uma exceção pode ser lançada do bloco `try`, e até duas exceções podem ser lançadas da instrução try-with-resources quando ela tenta fechar os objetos [`ZipFile`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/zip/ZipFile.html>) e [`BufferedWriter`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/BufferedWriter.html>). Se uma exceção for lançada do bloco `try` e uma ou mais exceções forem lançadas da instrução try-with-resources, então essas exceções lançadas da instrução try-with-resources são suprimidas, e a exceção lançada pelo bloco é a que é lançada pelo método `writeToFileZipFileContents()`. Você pode recuperar essas exceções suprimidas chamando o método [`Throwable.getSuppressed()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Throwable.html#getSuppressed\(\)>) da exceção lançada pelo bloco `try`.

## Classes que Implementam a Interface AutoCloseable ou Closeable

Consulte o Javadoc das interfaces [`AutoCloseable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/AutoCloseable.html>) e [`Closeable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/Closeable.html>) para uma lista de classes que implementam qualquer uma dessas interfaces. A interface [`Closeable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/Closeable.html>) estende a interface [`AutoCloseable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/AutoCloseable.html>). O método [`close()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/Closeable.html#close\(\)>) da interface [`Closeable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/Closeable.html>) lança exceções do tipo [`IOException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/IOException.html>), enquanto o método [`close()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/AutoCloseable.html#close\(\)>) da interface [`AutoCloseable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/AutoCloseable.html>) lança exceções do tipo [`Exception`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Exception.html>). Consequentemente, subclasses da interface [`AutoCloseable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/AutoCloseable.html>) podem sobrescrever este comportamento do método [`close()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/AutoCloseable.html#close\(\)>) para lançar exceções especializadas, como [`IOException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/IOException.html>), ou nenhuma exceção.

## Juntando Tudo

As seções anteriores descreveram como construir os blocos de código `try`, `catch` e `finally` para o método `writeList()` na classe `ListOfNumbers`. Agora, vamos analisar o código e investigar o que pode acontecer.

Quando todos os componentes são reunidos, o método `writeList()` se parece com o seguinte.

Como mencionado anteriormente, o bloco `try` deste método tem três possibilidades de saída diferentes; aqui estão duas delas.

  1. O código na instrução `try` falha e lança uma exceção. Isso pode ser uma [`IOException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/IOException.html>) causada pela nova instrução [`FileWriter`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/FileWriter.html>) ou uma [`IndexOutOfBoundsException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/IndexOutOfBoundsException.html>) causada por um valor de índice incorreto no loop `for`.
  2. Tudo é bem-sucedido e a instrução `try` é encerrada normalmente.

Vamos ver o que acontece no método `writeList()` durante essas duas possibilidades de saída.

### Cenário 1: Uma Exceção Ocorre

A instrução que cria um [`FileWriter`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/FileWriter.html>) pode falhar por uma série de razões. Por exemplo, o construtor para o [`FileWriter`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/FileWriter.html>) lança uma [`IOException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/IOException.html>) se o programa não puder criar ou escrever no arquivo indicado.

Quando [`FileWriter`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/FileWriter.html>) lança uma [`IOException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/IOException.html>), o sistema de tempo de execução interrompe imediatamente a execução do bloco `try`; chamadas de método em execução não são concluídas. O sistema de tempo de execução então começa a procurar no topo da pilha de chamadas de método por um manipulador de exceção apropriado. Neste exemplo, quando a [`IOException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/IOException.html>) ocorre, o construtor [`FileWriter`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/FileWriter.html>) está no topo da pilha de chamadas. No entanto, o construtor [`FileWriter`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/FileWriter.html>) não possui um manipulador de exceção apropriado, então o sistema de tempo de execução verifica o próximo método — o método `writeList()` — na pilha de chamadas de método. O método `writeList()` tem dois manipuladores de exceção: um para [`IOException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/IOException.html>) e outro para [`IndexOutOfBoundsException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/IndexOutOfBoundsException.html>).

O sistema de tempo de execução verifica os manipuladores de `writeList()` na ordem em que aparecem após a instrução `try`. O argumento para o primeiro manipulador de exceção é [`IndexOutOfBoundsException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/IndexOutOfBoundsException.html>). Isso não corresponde ao tipo de exceção lançada, então o sistema de tempo de execução verifica o próximo manipulador de exceção — [`IOException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/IOException.html>). Isso corresponde ao tipo de exceção que foi lançada, então o sistema de tempo de execução encerra sua busca por um manipulador de exceção apropriado. Agora que o tempo de execução encontrou um manipulador apropriado, o código nesse bloco `catch` é executado.

Após a execução do manipulador de exceção, o sistema de tempo de execução passa o controle para o bloco `finally`. O código no bloco `finally` é executado independentemente da exceção capturada acima dele. Neste cenário, o [`FileWriter`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/FileWriter.html>) nunca foi aberto e não precisa ser fechado. Após o bloco `finally` terminar a execução, o programa continua com a primeira instrução após o bloco `finally`.

Aqui está a saída completa do programa `ListOfNumbers` que aparece quando uma [`IOException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/IOException.html>) é lançada.

### Cenário 2: O Bloco try É Encerrado Normalmente

Neste cenário, todas as instruções dentro do escopo do bloco `try` são executadas com sucesso e não lançam exceções. A execução sai do final do bloco `try`, e o sistema de tempo de execução passa o controle para o bloco `finally`. Como tudo foi bem-sucedido, o [`PrintWriter`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/PrintWriter.html>) está aberto quando o controle atinge o bloco `finally`, que fecha o [`PrintWriter`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/PrintWriter.html>). Novamente, após o bloco `finally` terminar a execução, o programa continua com a primeira instrução após o bloco `finally`.

Aqui está a saída do programa `ListOfNumbers` quando nenhuma exceção é lançada.

## Praticando o Tratamento de Exceções

### Praticando Try-Catch Básico

O exemplo a seguir mostra como você pode capturar uma exceção simples.

Executar o código anterior imprime o seguinte. Como você pode ver, a exceção interrompeu o fluxo de execução do código no bloco `try`, e a mensagem `You should not see this message` de fato não é impressa.

### Praticando a Captura de Várias Exceções

Você pode ter vários blocos `catch` seguindo um único bloco `try`. Esses blocos podem capturar diferentes exceções, que você pode processar de maneiras distintas.

Executar o código anterior imprime o seguinte.

### Praticando Multi-Catch

Se a forma como você processa suas exceções é a mesma para diferentes tipos de exceção, então você pode usar a sintaxe multi-catch.

Executar o código anterior imprime o seguinte.

### Praticando Try-Catch-Finally

Você pode adicionar um bloco `finally` após um bloco `try` e seus blocos `catch`. O código do bloco `finally` é sempre executado, quer uma exceção tenha sido lançada ou não. Neste primeiro exemplo, uma exceção é lançada.

Executar o código anterior imprime o seguinte.

E neste segundo exemplo nenhuma exceção é lançada, mas o bloco `finally` ainda é chamado.

Executar o código anterior imprime o seguinte.

### Neste tutorial

Capturando e Manipulando Exceções O Bloco Try Os Blocos Catch Captura Múltipla de Exceções O Bloco Finally Exceções Lançadas de um Bloco Finally A Instrução Try-with-resources Exceções Suprimidas Classes que Implementam a Interface AutoCloseable ou Closeable Juntando Tudo Praticando o Tratamento de Exceções

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[O Que É Uma Exceção?](<#/doc/tutorials/exceptions/what-is-an-exception>)

➜

**Tutorial Atual**

Capturando e Manipulando Exceções

➜

**Próximo na Série**

[Lançando Exceções](<#/doc/tutorials/exceptions/throwing>)

**Anterior na Série:** [O Que É Uma Exceção?](<#/doc/tutorials/exceptions/what-is-an-exception>)

**Próximo na Série:** [Lançando Exceções](<#/doc/tutorials/exceptions/throwing>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Exceções ](<#/doc/tutorials/exceptions>) > Capturando e Manipulando Exceções