# Convertendo Loops com Passos

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Refatorando do Estilo Imperativo para o Funcional ](<#/doc/tutorials/refactoring-to-functional-style>) > Convertendo Loops com Passos

**Anterior na Série**

[Convertendo Loops Simples](<#/doc/tutorials/refactoring-to-functional-style/simpleloops>)

➜

**Tutorial Atual**

Convertendo Loops com Passos

➜

**Próximo na Série**

[Convertendo foreach com if](<#/doc/tutorials/refactoring-to-functional-style/foreachwithif>)

**Anterior na Série:** [Convertendo Loops Simples](<#/doc/tutorials/refactoring-to-functional-style/simpleloops>)

**Próximo na Série:** [Convertendo foreach com if](<#/doc/tutorials/refactoring-to-functional-style/foreachwithif>)

# Convertendo Loops com Passos

Esta página foi contribuída por [Venkat Subramaniam](</author/VenkatSubramaniam>) sob a [UPL](<https://oss.oracle.com/licenses/upl/>)

## Iterando com Passos

No artigo anterior desta [série de tutoriais](<#/doc/tutorials/refactoring-to-functional-style>), vimos como converter loops simples escritos no estilo imperativo para o estilo funcional. Neste artigo, veremos como lidar com loops um pouco mais complexos — quando precisamos pular alguns valores em um intervalo.

Ao iterar sobre um intervalo de valores, um de cada vez, o método `range()` de `IntStream` foi útil para implementar no estilo funcional. Este método retorna um stream que gerará um valor por vez para valores dentro do intervalo especificado. À primeira vista, para pular alguns valores, podemos ser tentados a usar o método `filter()` no stream. No entanto, há uma solução mais simples, o método `iterate()` de `IntStream`.

## Do Estilo Imperativo para o Funcional

Aqui está um loop que usa passos para pular alguns valores no intervalo desejado:

```java
for (int i = 0; i < 15; i += 3) {
    System.out.println(i);
}
```

O valor da variável de índice `i` começa em `0` e é então incrementado por `3` à medida que a iteração avança. Quando você se depara com um loop como esse, onde a iteração não é sobre cada valor em um intervalo, mas alguns valores são pulados, considere usar o método `iterate()` de `IntStream`.

Antes de refatorar o código, vamos dar uma olhada mais de perto no loop `for()` do código anterior, mas com um par de óculos imaginários que nos permitem ver usos potenciais para lambdas.

O primeiro argumento passado para o loop `for` é o valor inicial ou a seed para a iteração e pode permanecer como está. O segundo argumento é um predicado que indica que o valor da variável de índice, `i`, não deve exceder o valor de `15`. Podemos substituir isso no estilo funcional por um `IntPredicate`. O terceiro argumento é o incremento do valor da variável de índice e isso, no estilo funcional, é simplesmente um `IntUnaryOperator`. A interface `IntStream` possui um método `static` chamado `iterate()` que representa bem o código imaginário: `iterate(int seed, IntPredicate hasNext, IntUnaryOperator next)`.

Vamos refatorar o loop para usar o estilo funcional.

```java
IntStream.iterate(0, i -> i < 15, i -> i + 3)
         .forEach(System.out::println);
```

Isso foi bastante direto, os `;`s se tornaram `,`s, fizemos uso de duas lambdas: uma para o `IntPredicate` e a outra para o `IntUnaryOperator`.

Além de pular valores, frequentemente usamos um loop ilimitado e isso nos traz um pouco mais de complexidade, mas nada que as APIs funcionais do Java não possam lidar, como veremos a seguir.

## Iteração Ilimitada com um break

Vamos dar uma olhada no seguinte loop de estilo imperativo que, além do passo, é ilimitado e usa a instrução `break`.

```java
for (int i = 0; ; i += 3) {
    if (i > 20) {
        break;
    }
    System.out.println(i);
}
```

A condição de término `i < 15` desapareceu e o loop é ilimitado, como indicado pelos `;;`s repetidos. Dentro do loop, no entanto, temos a instrução `break` para sair da iteração se o valor de `i` for maior que `20`.

Para o estilo funcional, podemos nos livrar do segundo argumento, o `IntPredicate` da chamada do método `iterate()`, mas isso transformará a iteração em um stream infinito. O equivalente em programação funcional do `break` de estilo imperativo é o método `takeWhile()`. Este método encerrará o iterador interno, o stream, se o `IntPredicate` passado para ele for avaliado como `false`. Vamos refatorar o `for` ilimitado de estilo imperativo anterior com `break` para o estilo funcional.

```java
IntStream.iterate(0, i -> i + 3)
         .takeWhile(i -> i <= 20)
         .forEach(System.out::println);
```

O método `iterate()` é sobrecarregado e vem em duas versões, uma com o `IntPredicate` e outra sem. Utilizamos a versão sem o predicado para criar um stream infinito que gera valores a partir da seed ou do valor inicial. O `IntUnaryOperator` passado como segundo argumento determina os passos. Assim, no exemplo de código fornecido, o stream gerará os valores `0`, `3`, `6`, e assim por diante. Como queremos limitar a iteração para que o índice não exceda o valor de `20`, usamos o `takeWhile()`. O predicado passado para `takeWhile()` indica que a iteração pode continuar enquanto o valor do parâmetro fornecido, o índice `i`, não exceder o valor de `20`.

Vimos no artigo anterior que `range()` e `rangeClosed()` são substituições diretas para o loop `for` simples. Se o loop se tornar um pouco mais complexo, não se preocupe, o Java te ajuda, você pode usar o método `iterate()` de `IntStream` e, opcionalmente, o `takeWhile()` se o loop for terminado usando `break`.

## Mapeamentos

Onde quer que você veja um loop `for` com passo, use o método `iterate()` com três argumentos: uma seed ou o valor inicial, um `IntPredicate` para a condição de término e um `IntUnaryOperator` para os passos. Se o seu loop usar a instrução `break`, então remova o `IntPredicate` da chamada do método `iterate()` e, em vez disso, use o método `takeWhile()`. O `takeWhile()` é o equivalente funcional do `break` de estilo imperativo.

### Neste tutorial

Iterando com Passos Do Estilo Imperativo para o Funcional Iteração Ilimitada com um break Mapeamentos

Última atualização: 6 de julho de 2023

**Anterior na Série**

[Convertendo Loops Simples](<#/doc/tutorials/refactoring-to-functional-style/simpleloops>)

➜

**Tutorial Atual**

Convertendo Loops com Passos

➜

**Próximo na Série**

[Convertendo foreach com if](<#/doc/tutorials/refactoring-to-functional-style/foreachwithif>)

**Anterior na Série:** [Convertendo Loops Simples](<#/doc/tutorials/refactoring-to-functional-style/simpleloops>)

**Próximo na Série:** [Convertendo foreach com if](<#/doc/tutorials/refactoring-to-functional-style/foreachwithif>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Refatorando do Estilo Imperativo para o Funcional ](<#/doc/tutorials/refactoring-to-functional-style>) > Convertendo Loops com Passos