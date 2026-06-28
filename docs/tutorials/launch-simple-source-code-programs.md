# Lançando Programas Simples de Código-Fonte

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > Lançando Programas Simples de Código-Fonte

# Lançando Programas Simples de Código-Fonte

## Execução de Programa Simples de Código-Fonte

No JDK 11, o Java introduziu a capacidade de lançar um programa de código-fonte de arquivo único com o `java` launcher, agora multi-arquivo a partir do JDK 22, sem a necessidade de compilar explicitamente o código-fonte primeiro. Isso funciona com o `java` launcher invocando automaticamente o compilador e armazenando o código compilado na memória. Esta pode ser uma ótima maneira de aprender a usar Java ou explorar novos recursos na API Java, sem ter que passar pela complicação de compilar e depois executar o código. Existem várias maneiras de usar esse recurso, bem como algumas limitações e pontos a serem considerados.

## Executando Seu Primeiro Programa de Código-Fonte de Arquivo Único

Para executar um programa de código-fonte de arquivo único, a primeira classe definida no arquivo-fonte deve conter `public static void main(String[])` como em `HelloWorld` abaixo:

```java
class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

Na linha de comando, `HelloWorld` pode ser lançado com (assumindo que o nome do arquivo também é `HelloWorld.java`):

```bash
java HelloWorld.java
```

### Passando Argumentos

Argumentos também podem ser passados como em uma classe normalmente compilada, então no exemplo abaixo:

```java
class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, " + args[0] + "!");
    }
}
```

Passar um argumento pode ser feito assim:

```bash
java HelloWorld.java Java
```

## Múltiplas Classes no Mesmo Arquivo

Múltiplas classes podem ser definidas dentro do mesmo arquivo-fonte, se necessário para fins de encapsulamento, como neste exemplo:

```java
class HelloWorld {
    public static void main(String[] args) {
        Greeter greeter = new Greeter("World");
        greeter.sayHello();
    }
}

class Greeter {
    private String name;

    public Greeter(String name) {
        this.name = name;
    }

    public void sayHello() {
        System.out.println("Hello, " + name + "!");
    }
}
```

Quando executado:

```bash
java HelloWorld.java
```

Terá como saída:

```
Hello, World!
```

## Lançando um Programa Multi-Arquivo

Desde o lançamento do JDK 22, que incluiu [JEP 458: Launch Multi-File Source-Code Programs](<https://openjdk.org/jeps/458>), o `java` launcher agora pode lançar um programa de código-fonte multi-arquivo. Isso proporciona uma transição mais gradual de programas triviais de arquivo único para programas mais complexos.

O `java` launcher agora localizará, compilará e carregará automaticamente programas de código-fonte multi-arquivo, desde que a localização dos arquivos-fonte corresponda à estrutura de pacotes das classes que estão sendo importadas. Veja este exemplo:

```java
// Main.java
import model.Person;
import service.PersonService;

public class Main {
    public static void main(String[] args) {
        Person person = new Person("Alice");
        PersonService service = new PersonService();
        service.greet(person);
    }
}

// model/Person.java
package model;

public record Person(String name) {}

// service/PersonService.java
package service;

import model.Person;

public class PersonService {
    public void greet(Person person) {
        System.out.println("Hello from service, " + person.name() + "!");
    }
}
```

As classes `model.Person` e `service.PersonService` precisariam existir nos subdiretórios `model` e `service`, respectivamente, de onde a classe `Main` está localizada. Se estiverem presentes, o `java` launcher as compilará e executará, juntamente com a classe `Main`.

## Referenciando Classes JDK e Classes Não-JDK

Uma classe que faz parte do core JDK não precisa ser adicionada ao classpath para ser executada. Assim, este exemplo, referenciando as classes `Scanner` e `MatchResult`, pode ser executado simplesmente com o `java` launcher:

```java
import java.util.Scanner;
import java.util.regex.MatchResult;

class Scan {
    public static void main(String[] args) {
        String text = "Hello 123 World 456";
        Scanner scanner = new Scanner(text);
        scanner.findInLine("(\\w+) (\\d+)");
        MatchResult result = scanner.match();
        System.out.println("Found: " + result.group(1) + ", " + result.group(2));
        scanner.close();
    }
}
```

Para lançar:

```bash
java Scan.java
```

No entanto, o exemplo abaixo, referenciando `RandomUtils`, parte do [Apache Commons Lang](<https://commons.apache.org/proper/commons-lang/>), precisará ter o `commons-lang.jar` adicionado ao classpath no lançamento:

```java
import org.apache.commons.lang3.RandomUtils;

class RandomNumberGenerator {
    public static void main(String[] args) {
        System.out.println("Random number: " + RandomUtils.nextInt(0, 100));
    }
}
```

Para lançar:

```bash
java -classpath commons-lang3-3.14.0.jar RandomNumberGenerator.java
```

## Executando como um Arquivo Shebang

Em um sistema operacional tipo Unix, uma aplicação de código-fonte de arquivo único também pode ser lançada como um arquivo shebang, como um script. Dentro de um arquivo-fonte Java, como a primeira linha do arquivo, adicione `path/to/java/home --source <version>` como no exemplo abaixo:

```java
#!/usr/bin/env java --source 21
class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, " + args[0] + "!");
    }
}
```

O arquivo não pode ter `.java` como sua extensão, e também deve ser executável `chmod +x`. Com isso, ele pode ser lançado com:

```bash
./HelloWorld Java
```

Se você não passar nenhum argumento, receberá uma [`ArrayIndexOutOfBoundsException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/ArrayIndexOutOfBoundsException.html>).

### Neste tutorial

*   Execução de Programa de Código-Fonte de Arquivo Único
*   Executando Seu Primeiro Programa de Código-Fonte de Arquivo Único
*   Múltiplas Classes no Mesmo Arquivo
*   Execução de Programa de Código-Fonte Multi-Arquivo
*   Referenciando Classes JDK e Classes Não-JDK
*   Executando como um Arquivo Shebang

Última atualização: 23 de dezembro de 2025

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > Lançando Programas Simples de Código-Fonte

[Voltar para a Lista de Tutoriais](<#/doc/tutorials/learn>)