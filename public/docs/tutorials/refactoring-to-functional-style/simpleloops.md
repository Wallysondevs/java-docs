# Convertendo Loops Simples

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Refatorando do Estilo Imperativo para o Funcional ](<#/doc/tutorials/refactoring-to-functional-style>) > Convertendo Loops Simples

**Tutorial Atual**

Convertendo Loops Simples

➜

**Próximo na Série**

[Convertendo Loops com Passos](<#/doc/tutorials/refactoring-to-functional-style/loopswithsteps>)

**Próximo na Série:** [Convertendo Loops com Passos](<#/doc/tutorials/refactoring-to-functional-style/loopswithsteps>)

# Convertendo Loops Simples

Esta página foi contribuída por [Venkat Subramaniam](</author/VenkatSubramaniam>) sob a [UPL](<https://oss.oracle.com/licenses/upl/>)

## Estilos Imperativo vs. Funcional

As versões mais antigas do Java suportavam o paradigma Orientado a Objetos misturado com o estilo de programação imperativo. A partir do Java 8, você também pode misturar o estilo de programação funcional em seu código. Se sua base de código foi iniciada durante o Java 7 ou em épocas anteriores, ou posteriormente por programadores mais familiarizados com versões mais antigas do Java, ela estará repleta de código no estilo imperativo.

O estilo imperativo é onde dizemos o que fazer e também como fazer. O estilo funcional é de natureza declarativa, onde dizemos o que fazer e delegamos o como ou os detalhes às bibliotecas subjacentes. O código no estilo imperativo pode ser mais fácil de escrever, já que a maioria de nós está muito familiarizada com ele. No entanto, o código se torna verboso, complexo e difícil de ler. O estilo funcional pode ser difícil no início, principalmente porque a maioria dos programadores está menos familiarizada com ele. Em geral, é mais fácil de ler, entender e alterar. Com a prática, também se torna mais fácil de escrever.

Nesta [série de tutoriais](<#/doc/tutorials/refactoring-to-functional-style>), examinaremos vários códigos comuns no estilo imperativo e encontraremos um mapeamento ou um código equivalente no estilo funcional que podemos usar em vez disso. Ao trabalhar com sua base de código, quando estiver pronto para corrigir um bug ou fazer uma melhoria, você pode achar útil refatorar parte do código no estilo imperativo para o estilo funcional. Você pode usar este tutorial como um guia para encontrar os mapeamentos do estilo imperativo para o funcional em algumas situações comuns.

Neste tutorial, focaremos em loops simples.

## Loops for Simples

Vamos começar com o loop `for` tradicional onde realizamos uma ação para valores de um índice em um determinado intervalo.

```java
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}
```

No código acima, a essência é o intervalo, de `0` a um a menos que `5`. A cerimônia, o "ruído", do **como**, é a sintaxe mais a operação de incremento na variável de índice `i`. Podemos manter a essência e remover a cerimônia transformando o código para o estilo funcional.

Se você quiser usar o estilo funcional para escrever este loop `for`, pode fazê-lo com bastante facilidade e a pista está na frase antes do código: **índice sobre um intervalo**. Como estamos iterando sobre um intervalo, o método `range` de `IntStream` é o equivalente direto para isso.

```java
IntStream.range(0, 5)
         .forEach(i -> System.out.println(i));
```

Você pode tornar isso ainda mais conciso usando uma referência de método para o método `println`.

```java
IntStream.range(0, 5)
         .forEach(System.out::println);
```

O código no estilo funcional é mais conciso, mais fácil de ler e a intenção é mais clara nesta versão do que na versão imperativa.

E se o seu loop `for` incluir o valor final, como no código a seguir, você pode se perguntar.

```java
for (int i = 0; i <= 5; i++) {
    System.out.println(i);
}
```

A interface `IntStream` te atende, ela possui um método `rangeClosed` exatamente para este propósito.

```java
IntStream.rangeClosed(0, 5)
         .forEach(System.out::println);
```

O método `rangeClosed` é útil para iterar do valor inicial até incluir o valor final.

Quer você use o método `range` ou o método `rangeClosed`, você obtém um stream de valores `int` sobre os quais você pode usar o iterador interno para realizar ações. Mais adiante nesta série, veremos operações além de `forEach`.

Nos exemplos de código anteriores, o iterador interno removeu o fardo da iteração de seus ombros. O stream se encarrega de percorrer o intervalo de valores, um de cada vez. Você só precisa se concentrar no que fazer para cada elemento, à medida que eles são fornecidos a você, no método `forEach`. Em nossos exemplos, nós apenas imprimimos o valor fornecido. Você pode fazer praticamente qualquer operação que desejar, como salvar as informações em um banco de dados, enviá-las para um serviço remoto, etc.

Ao contrário do iterador externo fornecido pelo loop `for`, o código que usa o iterador interno é mais conciso, tem menos "ruído", evita a necessidade de mutar explicitamente a variável de índice, é mais fácil de ler, mais fácil de modificar e mais agradável de trabalhar.

Prossiga procurando oportunidades em sua própria base de código onde você vê o loop `for` tradicional e modifique-o para usar o método `range` ou `rangeClosed` do `IntStream`. Certifique-se de verificar se o código funciona como esperado após a alteração, de preferência executando testes automatizados que você já possa ter.

## Mapeamentos

Onde quer que você veja um loop `for` simples, você pode usar o método `range` ou `rangeClosed` de `IntStream`. Use o método `range` se quiser iterar até, mas não incluindo, o valor final. Use o `rangeClosed` para incluir o valor final também em sua iteração.

### Neste tutorial

Estilos Imperativo vs. Funcional
Loops for Simples
Mapeamentos

Última atualização: 6 de julho de 2023

**Tutorial Atual**

Convertendo Loops Simples

➜

**Próximo na Série**

[Convertendo Loops com Passos](<#/doc/tutorials/refactoring-to-functional-style/loopswithsteps>)

**Próximo na Série:** [Convertendo Loops com Passos](<#/doc/tutorials/refactoring-to-functional-style/loopswithsteps>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Refatorando do Estilo Imperativo para o Funcional ](<#/doc/tutorials/refactoring-to-functional-style>) > Convertendo Loops Simples