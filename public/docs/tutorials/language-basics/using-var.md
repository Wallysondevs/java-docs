# Usando o Identificador de Tipo Var

[Home](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Fundamentos da Linguagem Java ](<#/doc/tutorials/language-basics>) > Usando o Identificador de Tipo Var

**Anterior na Série**

[Criando Arrays em Seus Programas](<#/doc/tutorials/language-basics/arrays>)

➜

**Tutorial Atual**

Usando o Identificador de Tipo Var

➜

**Próximo na Série**

[Usando Operadores em Seus Programas](<#/doc/tutorials/language-basics/using-operators>)

**Anterior na Série:** [Criando Arrays em Seus Programas](<#/doc/tutorials/language-basics/arrays>)

**Próximo na Série:** [Usando Operadores em Seus Programas](<#/doc/tutorials/language-basics/using-operators>)

# Usando o Identificador de Tipo Var

## A Palavra-Chave Var

A partir do Java SE 10, você pode usar o identificador de tipo `var` para declarar uma variável local. Ao fazer isso, você permite que o compilador decida qual é o tipo real da variável que você cria. Uma vez criado, este tipo não pode ser alterado.

Considere o exemplo a seguir.

```java
public class VarExample {
    public static void main(String[] args) {
        String message = "Hello, World!";
        Path path = Paths.get("/tmp/foo");
        InputStream stream = new FileInputStream("file.txt");
    }
}
```

Nesse caso, ter que declarar os tipos explícitos das três variáveis `message`, `path` e `stream` é redundante.

Com o identificador de tipo `var`, o código anterior pode ser escrito da seguinte forma:

```java
public class VarExample {
    public static void main(String[] args) {
        var message = "Hello, World!";
        var path = Paths.get("/tmp/foo");
        var stream = new FileInputStream("file.txt");
    }
}
```

## Exemplos com Var

O exemplo a seguir mostra como você pode usar o identificador de tipo `var` para tornar seu código mais simples de ler. Aqui, a variável `strings` recebe o tipo [`List<String>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>) e a variável `element` o tipo [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>).

```java
public class VarExample {
    public static void main(String[] args) {
        var strings = List.of("a", "b", "c");
        for (var element : strings) {
            System.out.println(element);
        }
    }
}
```

Neste exemplo, a variável `path` é do tipo [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>), e a variável `stream` é do tipo [`InputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/InputStream.html>).

```java
public class VarExample {
    public static void main(String[] args) throws IOException {
        var path = Paths.get("file.txt");
        try (var stream = Files.newInputStream(path)) {
            // Use the stream
        }
    }
}
```

Observe que nos dois exemplos anteriores, você usou `var` para declarar uma variável em uma instrução for e em uma instrução try-with-resources. Essas duas instruções são abordadas posteriormente neste tutorial.

## Restrições no Uso de Var

Existem restrições no uso do identificador de tipo `var`.

1.  Você só pode usá-lo para _variáveis locais_ declaradas em métodos, construtores e blocos inicializadores.
2.  `var` não pode ser usado para campos, nem para parâmetros de método ou construtor.
3.  O compilador deve ser capaz de escolher um tipo quando a variável é declarada. Como `null` não tem tipo, a variável deve ter um inicializador.

Seguindo as restrições, a seguinte classe não compila, porque usar `var` como identificador de tipo não é possível para um campo ou um parâmetro de método.

```java
public class VarExample {
    // var field = "Hello"; // Error: 'var' is not allowed here
    public void myMethod(var param) { // Error: 'var' is not allowed here
        // ...
    }
}
```

O mesmo vale para o seguinte código.

```java
public class VarExample {
    public static void main(String[] args) {
        var greetings; // Error: Cannot infer type for local variable 'greetings'
        greetings = "Hello";
    }
}
```

Nesse caso, o compilador não consegue adivinhar o tipo real de `greetings` porque falta um inicializador. Portanto, este código também não compila.

### Neste tutorial

A Palavra-Chave Var Exemplos com Var Restrições no Uso de Var

Última atualização: 23 de setembro de 2021

**Anterior na Série**

[Criando Arrays em Seus Programas](<#/doc/tutorials/language-basics/arrays>)

➜

**Tutorial Atual**

Usando o Identificador de Tipo Var

➜

**Próximo na Série**

[Usando Operadores em Seus Programas](<#/doc/tutorials/language-basics/using-operators>)

**Anterior na Série:** [Criando Arrays em Seus Programas](<#/doc/tutorials/language-basics/arrays>)

**Próximo na Série:** [Usando Operadores em Seus Programas](<#/doc/tutorials/language-basics/using-operators>)

[Home](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Fundamentos da Linguagem Java ](<#/doc/tutorials/language-basics>) > Usando o Identificador de Tipo Var