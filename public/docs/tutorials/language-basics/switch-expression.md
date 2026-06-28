# Ramificação com Switch Expressions

[Home](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Conceitos Básicos da Linguagem Java ](<#/doc/tutorials/language-basics>) > Ramificação com Switch Expressions

**Anterior na Série**

[Ramificação com Switch Statements](<#/doc/tutorials/language-basics/switch-statement>)

➜

**Tutorial Atual**

Ramificação com Switch Expressions

➜

Este é o fim da série!

**Anterior na Série:** [Ramificação com Switch Statements](<#/doc/tutorials/language-basics/switch-statement>)

# Ramificação com Switch Expressions

## Modificando a Sintaxe do Switch

No Java SE 14, você pode usar outra sintaxe mais conveniente para a palavra-chave `switch`: a `switch` expression.

Várias coisas motivaram esta nova sintaxe.

1.  O comportamento padrão do fluxo de controle entre os rótulos `switch` é o `fall through`. Esta sintaxe é propensa a erros e leva a bugs em aplicações.
2.  O `switch` block é tratado como um único bloco. Isso pode ser um impedimento no caso em que você precisa definir uma variável apenas em um `case` particular.
3.  O `switch` statement é uma instrução. Nos exemplos das seções anteriores, uma variável recebe um valor em cada `case`. Torná-lo uma `expression` poderia levar a um código melhor e mais legível.

A sintaxe abordada na seção anterior, conhecida como _switch statement_, ainda está disponível no Java SE 14 e sua semântica não mudou. A partir do Java SE 14, uma nova sintaxe para o `switch` está disponível: a _switch expression_.

Esta sintaxe modifica a sintaxe do rótulo `switch`. Suponha que você tenha o seguinte _switch statement_ em sua aplicação.

Com a sintaxe da _switch expression_, você pode agora escrevê-lo da seguinte forma.

A sintaxe do rótulo `switch` agora é `case L ->`. Apenas o código à direita do rótulo é executado se o rótulo for correspondido. Este código pode ser uma única `expression`, um bloco, ou uma `throw statement`. Como este código é um bloco, você pode definir variáveis nele que são locais para este bloco particular.

Esta sintaxe também suporta múltiplas constantes por `case`, separadas por vírgulas, como mostrado no exemplo anterior.

## Produzindo um Valor

Este `switch` statement pode ser usado como uma `expression`. Por exemplo, o exemplo da seção anterior pode ser reescrito com um `switch` statement da seguinte forma.

Se houver apenas uma instrução no bloco `case`, o valor produzido por esta instrução é retornado pela `switch` expression.

A sintaxe no caso de um bloco de código é um pouco diferente. Tradicionalmente, a palavra-chave `return` é usada para denotar o valor produzido por um bloco de código. Infelizmente, esta sintaxe leva à ambiguidade no caso do `switch` statement. Consideremos o seguinte exemplo. Este código não compila, está apenas como exemplo.

```java
int quarter = 0;
String result = switch (quarter) {
    case 0 -> {
        System.out.println("First quarter");
        return "Q1"; // Ambiguous return
    }
    case 1 -> "Q2";
    case 2 -> "Q3";
    case 3 -> "Q4";
    default -> "Unknown";
};
```

O bloco de código executado no caso em que `quarter` é igual a 0 precisa retornar um valor. Ele usa a palavra-chave `return` para denotar este valor. Se você olhar de perto este código, verá que existem duas `return` statements: uma no bloco `case` e outra no bloco do método. É aqui que reside a ambiguidade: pode-se perguntar qual é a semântica do primeiro `return`. Isso significa que o programa sai do método com este valor? Ou ele sai do `switch` statement? Tais ambiguidades levam a uma legibilidade ruim e a um código propenso a erros.

Uma nova sintaxe foi criada para resolver esta ambiguidade: a `yield` statement. O código do exemplo anterior deve ser escrito da seguinte forma.

```java
int quarter = 0;
String result = switch (quarter) {
    case 0 -> {
        System.out.println("First quarter");
        yield "Q1";
    }
    case 1 -> "Q2";
    case 2 -> "Q3";
    case 3 -> "Q4";
    default -> "Unknown";
};
```

A `yield` statement é uma instrução que pode ser usada em qualquer bloco `case` de um `switch` statement. Ela vem com um valor, que se torna o valor do `switch` statement que a envolve.

## Adicionando uma Cláusula Default

As cláusulas `default` permitem que seu código lide com casos em que o valor do seletor não corresponde a nenhuma constante `case`.

Os `case`s de uma `switch` expression devem ser exaustivos. Para todos os valores possíveis, deve haver um rótulo `switch` correspondente. Os `switch` statements não são obrigados a ser exaustivos. Se o alvo do seletor não corresponder a nenhum rótulo `switch`, este `switch` statement não fará nada, silenciosamente. Isso pode ser um lugar para bugs se esconderem em sua aplicação, algo que você deseja evitar.

Na maioria dos casos, a exaustividade pode ser alcançada usando uma cláusula `default`; no entanto, no caso de uma `enum` `switch` expression que cobre todas as constantes conhecidas, você não precisa adicionar esta cláusula `default`.

Ainda há um caso que precisa ser tratado. O que aconteceria se alguém adicionasse um valor enumerado em uma enumeração, mas esquecesse de atualizar os `switch` statements nesta enumeração? Para lidar com este caso, o compilador adiciona uma cláusula `default` para você em `switch` statements exaustivos. Esta cláusula `default` nunca será executada em casos normais. Ela só será executada se um valor enumerado tiver sido adicionado, e lançará um `IncompatibleClassChangeError`.

O tratamento da exaustividade é um recurso das `switch` expressions que não é fornecido pelos `switch` statements tradicionais e que é usado em outros casos além do `switch` em valores enumerados.

## Escrevendo Colon Case em Switch Expressions

Uma `switch` expression também pode usar um bloco `case` tradicional com `case L:`. Neste caso, a semântica de `fall through` se aplica. Os valores são produzidos usando a `yield` statement.

## Lidando com Valores Nulos

Até agora, os `switch` statements não aceitam valores de seletor `null`. Se você tentar um `switch` em um valor `null`, você receberá uma `NullPointerException`.

O Java SE 17 possui um recurso de pré-visualização que aprimora as `switch` expressions para permitir valores `null`, então você pode esperar que esta situação mude.

### Neste tutorial

Modificando a Sintaxe do Switch Produzindo um Valor Adicionando uma Cláusula Default Escrevendo Colon Case em Switch Expressions Lidando com Valores Nulos

Última atualização: 22 de setembro de 2021

**Anterior na Série**

[Ramificação com Switch Statements](<#/doc/tutorials/language-basics/switch-statement>)

➜

**Tutorial Atual**

Ramificação com Switch Expressions

➜

Este é o fim da série!

**Anterior na Série:** [Ramificação com Switch Statements](<#/doc/tutorials/language-basics/switch-statement>)

[Home](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Conceitos Básicos da Linguagem Java ](<#/doc/tutorials/language-basics>) > Ramificação com Switch Expressions