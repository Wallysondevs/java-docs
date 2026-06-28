# Atribuição Definida

[Java SE](<https://docs.oracle.com/en/java/javase/25/>) > [Java SE Specifications](<#/>) > [Java Language Specification](<#/doc/jls/jls-01>)

Capítulo 16. Atribuição Definida
---
[Anterior](<#/doc/jls/jls-15>) | | [Próximo](<#/doc/jls/jls-17>)
  
* * *

# Capítulo 16. Atribuição Definida

**Sumário**

[16.1. Atribuição Definida e Expressões](<#/doc/jls/jls-16>)
    

[16.1.1. Expressões Constantes Booleanas](<#/doc/jls/jls-16>)
[16.1.2. Operador Condicional-E `&&`](<#/doc/jls/jls-16>)
[16.1.3. Operador Condicional-Ou `||`](<#/doc/jls/jls-16>)
[16.1.4. Operador de Complemento Lógico `!`](<#/doc/jls/jls-16>)
[16.1.5. Operador Condicional `? :`](<#/doc/jls/jls-16>)
[16.1.6. Expressões `switch`](<#/doc/jls/jls-16>)
[16.1.7. Outras Expressões do Tipo `boolean`](<#/doc/jls/jls-16>)
[16.1.8. Expressões de Atribuição](<#/doc/jls/jls-16>)
[16.1.9. Operadores `++` e `--`](<#/doc/jls/jls-16>)
[16.1.10. Outras Expressões](<#/doc/jls/jls-16>)
[16.2. Atribuição Definida e Declarações](<#/doc/jls/jls-16>)
    

[16.2.1. Declarações Vazias](<#/doc/jls/jls-16>)
[16.2.2. Blocos](<#/doc/jls/jls-16>)
[16.2.3. Declarações de Classes e Interfaces Locais](<#/doc/jls/jls-16>)
[16.2.4. Declarações de Variáveis Locais](<#/doc/jls/jls-16>)
[16.2.5. Declarações Rotuladas](<#/doc/jls/jls-16>)
[16.2.6. Declarações de Expressão](<#/doc/jls/jls-16>)
[16.2.7. Declarações `if`](<#/doc/jls/jls-16>)
[16.2.8. Declarações `assert`](<#/doc/jls/jls-16>)
[16.2.9. Declarações `switch`](<#/doc/jls/jls-16>)
[16.2.10. Declarações `while`](<#/doc/jls/jls-16>)
[16.2.11. Declarações `do`](<#/doc/jls/jls-16>)
[16.2.12. Declarações `for`](<#/doc/jls/jls-16>)
    

[16.2.12.1. Parte de Inicialização da Declaração `for`](<#/doc/jls/jls-16>)
[16.2.12.2. Parte de Incremento da Declaração `for`](<#/doc/jls/jls-16>)
[16.2.13. Declarações `break`, `yield`, `continue`, `return` e `throw`](<#/doc/jls/jls-16>)
[16.2.14. Declarações `synchronized`](<#/doc/jls/jls-16>)
[16.2.15. Declarações `try`](<#/doc/jls/jls-16>)
[16.3. Atribuição Definida e Parâmetros](<#/doc/jls/jls-16>)
[16.4. Atribuição Definida e Inicializadores de Array](<#/doc/jls/jls-16>)
[16.5. Atribuição Definida e Constantes Enum](<#/doc/jls/jls-16>)
[16.6. Atribuição Definida e Classes Anônimas](<#/doc/jls/jls-16>)
[16.7. Atribuição Definida e Classes e Interfaces Membro](<#/doc/jls/jls-16>)
[16.8. Atribuição Definida e Inicializadores Estáticos](<#/doc/jls/jls-16>)
[16.9. Atribuição Definida, Construtores e Inicializadores de Instância](<#/doc/jls/jls-16>)

Toda variável local declarada por uma declaração ([§14.4.2](<#/doc/jls/jls-14>), [§14.14.1](<#/doc/jls/jls-14>), [§14.14.2](<#/doc/jls/jls-14>), [§14.20.3](<#/doc/jls/jls-14>)) e todo campo `final` em branco ([§4.12.4](<#/doc/jls/jls-04>), [§8.3.1.2](<#/doc/jls/jls-08>)) deve ter um valor _definitivamente atribuído_ quando qualquer acesso ao seu valor ocorre.

Um acesso ao seu valor consiste no nome simples da variável (ou, para um campo, o nome simples do campo qualificado por `this`) ocorrendo em qualquer lugar de uma expressão, exceto como o operando esquerdo do operador de atribuição simples `=` ([§15.26.1](<#/doc/jls/jls-15>)).

Para cada acesso de uma variável local `x` declarada por uma declaração, ou campo `final` em branco `x`, `x` deve ser definitivamente atribuído antes do acesso, ou um erro em tempo de compilação ocorre.

Similarmente, toda variável `final` em branco deve ser atribuída no máximo uma vez; ela deve estar _definitivamente não atribuída_ quando uma atribuição a ela ocorre.

Tal atribuição é definida como ocorrendo se e somente se o nome simples da variável (ou, para um campo, seu nome simples qualificado por `this`) ocorre no lado esquerdo de um operador de atribuição.

Para cada atribuição a uma variável `final` em branco, a variável deve estar definitivamente não atribuída antes da atribuição, ou um erro em tempo de compilação ocorre.

Similarmente, para cada invocação de construtor alternativo ([§8.8.7.1](<#/doc/jls/jls-08>)) ocorrendo em um construtor de uma classe C, toda variável de instância `final` em branco de C declarada em C deve estar definitivamente não atribuída após a lista de argumentos da invocação do construtor alternativo, ou um erro em tempo de compilação ocorre.

Note que variáveis locais declaradas por um padrão ([§14.30](<#/doc/jls/jls-14>)) não estão sujeitas às regras de atribuição definida. Toda variável local declarada por um padrão é inicializada pelo processo de correspondência de padrões e, portanto, sempre tem um valor quando acessada.

O restante deste capítulo é dedicado a uma explicação precisa das palavras "definitivamente atribuído antes" e "definitivamente não atribuído antes".

A ideia por trás da atribuição definida é que uma atribuição à variável local declarada por uma declaração ou campo `final` em branco deve ocorrer em todo caminho de execução possível até o acesso. Similarmente, a ideia por trás da não atribuição definida é que nenhuma outra atribuição à variável `final` em branco é permitida em qualquer caminho de execução possível até uma atribuição.

A análise leva em consideração a estrutura das declarações e expressões; ela também fornece um tratamento especial para os operadores de expressão `&&`, `||`, `!`, e `? :`, e para expressões constantes com valor booleano.

Exceto pelo tratamento especial dos operadores booleanos condicionais `&&`, `||`, e `? :` e das expressões constantes com valor booleano, os valores das expressões não são levados em consideração na análise de fluxo.

**Exemplo 16-1. Atribuição Definida Considera a Estrutura de Declarações e Expressões**

Um compilador Java reconhece que `k` é definitivamente atribuído antes de seu acesso (como um argumento de uma invocação de método) no código:
```java
    {
        int k;
        if (v > 0 && (k = System.in.read()) >= 0)
            System.out.println(k);
    }
```

porque o acesso ocorre somente se o valor da expressão:
```java
    v > 0 && (k = System.in.read()) >= 0
```

é `true`, e o valor pode ser `true` somente se a atribuição a `k` for executada (mais precisamente, avaliada).

Similarmente, um compilador Java reconhecerá que no código:
```java
    {
        int k;
        while (true) {
            k = n;
            if (k >= 5) break;
            n = 6;
        }
        System.out.println(k);
    }
```

a variável `k` é definitivamente atribuída pela declaração `while` porque a expressão de condição `true` nunca tem o valor `false`, então somente a declaração `break` pode fazer com que a declaração `while` seja concluída normalmente, e `k` é definitivamente atribuída antes da declaração `break`.

Por outro lado, o código:
```java
    {
        int k;
        while (n < 4) {
            k = n;
            if (k >= 5) break;
            n = 6;
        }
        System.out.println(k);  /* k is not "definitely assigned"
                                   before this statement */
    }
```

deve ser rejeitado por um compilador Java, porque neste caso a declaração `while` não tem garantia de executar seu corpo no que diz respeito às regras de atribuição definida.

**Exemplo 16-2. Atribuição Definida Não Considera Valores de Expressões**

Um compilador Java deve produzir um erro em tempo de compilação para o código:
```java
    {
        int k;
        int n = 5;
        if (n > 2)
            k = 3;
        System.out.println(k);  /* k is not "definitely assigned"
                                   before this statement */
    }
```

mesmo que o valor de `n` seja conhecido em tempo de compilação, e em princípio possa ser conhecido em tempo de compilação que a atribuição a `k` sempre será executada (mais precisamente, avaliada). Um compilador Java deve operar de acordo com as regras estabelecidas nesta seção. As regras reconhecem apenas expressões constantes; neste exemplo, a expressão `n > 2` não é uma expressão constante conforme definido em [§15.29](<#/doc/jls/jls-15>).

Como outro exemplo, um compilador Java aceitará o código:
```java
    void flow(boolean flag) {
        int k;
        if (flag)
            k = 3;
        else
            k = 4;
        System.out.println(k);
    }
```

no que diz respeito à atribuição definida de `k`, porque as regras descritas nesta seção permitem que ele determine que `k` é atribuído independentemente de `flag` ser `true` ou `false`. Mas as regras não aceitam a variação:
```java
    void flow(boolean flag) {
        int k;
        if (flag)
            k = 3;
        if (!flag)
            k = 4;
        System.out.println(k);  /* k is not "definitely assigned"
                                   before this statement */
    }
```

e, portanto, compilar este programa deve causar um erro em tempo de compilação.

**Exemplo 16-3. Não Atribuição Definida**

Um compilador Java aceitará o código:
```java
    void unflow(boolean flag) {
        final int k;
        if (flag) {
            k = 3;
            System.out.println(k);
        }
        else {
            k = 4;
            System.out.println(k);
        }
    }
```

no que diz respeito à não atribuição definida de `k`, porque as regras descritas nesta seção permitem que ele determine que `k` é atribuído no máximo uma vez (na verdade, exatamente uma vez) independentemente de `flag` ser `true` ou `false`. Mas as regras não aceitam a variação:
```java
    void unflow(boolean flag) {
        final int k;
        if (flag) {
            k = 3;
            System.out.println(k);
        }
        if (!flag) {
            k = 4;
            System.out.println(k);  /* k is not "definitely unassigned"
                                       before this statement */
        }
    }
```

e, portanto, compilar este programa deve causar um erro em tempo de compilação.

A fim de especificar precisamente todos os casos de atribuição definida, as regras nesta seção definem vários termos técnicos:

  * se uma variável é _definitivamente atribuída antes_ de uma declaração ou expressão

  * se uma variável é _definitivamente não atribuída antes_ de uma declaração ou expressão

  * se uma variável é _definitivamente atribuída depois_ de uma declaração ou expressão

  * se uma variável é _definitivamente não atribuída depois_ de uma declaração ou expressão

Para expressões com valor booleano, as duas últimas são refinadas em quatro casos:

  * se uma variável é _definitivamente atribuída depois_ da expressão _quando verdadeira_

  * se uma variável é _definitivamente não atribuída depois_ da expressão _quando verdadeira_

  * se uma variável é _definitivamente atribuída depois_ da expressão _quando falsa_

  * se uma variável é _definitivamente não atribuída_ depois da expressão _quando falsa_

Aqui, _quando verdadeira_ e _quando falsa_ referem-se ao valor da expressão.

Por exemplo, a variável local `k` é definitivamente atribuída a um valor após a avaliação da expressão:
```java
    a && ((k=m) > 5)
```

quando a expressão é `true` mas não quando a expressão é `false` (porque se `a` for falso, então a atribuição a `k` não é necessariamente executada (mais precisamente, avaliada)).

A frase "V é definitivamente atribuído depois de X" (onde V é uma variável local e X é uma declaração ou expressão) significa "V é definitivamente atribuído depois de X se X for concluído normalmente". Se X for concluído abruptamente, a atribuição pode não ter ocorrido, e as regras aqui estabelecidas levam isso em consideração.

Uma consequência peculiar desta definição é que "V é definitivamente atribuído depois de `break;`" é sempre verdadeiro! Como uma declaração `break` nunca é concluída normalmente, é trivialmente verdadeiro que V recebeu um valor se a declaração `break` for concluída normalmente.

A declaração "V é definitivamente não atribuído depois de X" (onde V é uma variável e X é uma declaração ou expressão) significa "V é definitivamente não atribuído depois de X se X for concluído normalmente".

Uma consequência ainda mais peculiar desta definição é que "V é definitivamente não atribuído depois de `break;`" é sempre verdadeiro! Como uma declaração `break` nunca é concluída normalmente, é trivialmente verdadeiro que V não recebeu um valor se a declaração `break` for concluída normalmente. (Aliás, também é trivialmente verdadeiro que a lua é feita de queijo verde se a declaração `break` for concluída normalmente.)

No total, existem quatro possibilidades para uma variável V depois que uma declaração ou expressão foi executada:

  * V é definitivamente atribuído e não é definitivamente não atribuído.

(As regras de análise de fluxo provam que uma atribuição a V ocorreu.)

  * V é definitivamente não atribuído e não é definitivamente atribuído.

(As regras de análise de fluxo provam que uma atribuição a V não ocorreu.)

  * V não é definitivamente atribuído e não é definitivamente não atribuído.

(As regras não podem provar se uma atribuição a V ocorreu ou não.)

  * V é definitivamente atribuído e é definitivamente não atribuído.

(É impossível que a declaração ou expressão seja concluída normalmente.)

Para encurtar as regras, a abreviação usual "iff" é usada para significar "se e somente se". Também usamos uma convenção de abreviação: se uma regra contém uma ou mais ocorrências de "[un]assigned", então ela representa duas regras, uma com cada ocorrência de "[un]assigned" substituída por "definitivamente atribuído" e outra com cada ocorrência de "[un]assigned" substituída por "definitivamente não atribuído".

Por exemplo:

  * V é [não] atribuído depois de uma declaração vazia iff é [não] atribuído antes da declaração vazia.

deve ser entendido como representando duas regras:

  * V é definitivamente atribuído depois de uma declaração vazia iff é definitivamente atribuído antes da declaração vazia.

  * V é definitivamente não atribuído depois de uma declaração vazia iff é definitivamente não atribuído antes da declaração vazia.

Ao longo do restante deste capítulo, a menos que explicitamente declarado de outra forma, escreveremos V para representar uma variável local declarada por uma declaração ou campo `final` em branco que está no escopo ([§6.3](<#/doc/jls/jls-06>)). Da mesma forma, usaremos `a`, `b`, `c` e `e` para representar expressões, e S e T para representar declarações. Usaremos a frase "`a` é V" para significar que `a` é o nome simples da variável V, ou o nome simples de V qualificado por `this` (ignorando parênteses). Usaremos a frase "`a` não é V" para significar a negação de "`a` é V".

A análise de não atribuição definida de declarações de loop levanta um problema especial. Considere a declaração `while (`e`) S`. A fim de determinar se V é definitivamente não atribuído dentro de alguma subexpressão de `e`, precisamos determinar se V é definitivamente não atribuído antes de `e`. Poder-se-ia argumentar, por analogia com a regra para atribuição definida ([§16.2.10](<#/doc/jls/jls-16>)), que V é definitivamente não atribuído antes de `e` iff é definitivamente não atribuído antes da declaração `while`. No entanto, tal regra é inadequada para nossos propósitos. Se `e` for avaliado como `true`, a declaração S será executada. Mais tarde, se V for atribuído por S, então nas iterações seguintes V já terá sido atribuído quando `e` for avaliado. Sob a regra sugerida acima, seria possível atribuir V várias vezes, o que é exatamente o que procuramos evitar ao introduzir estas regras.

Uma regra revisada seria: "V é definitivamente não atribuído antes de `e` iff é definitivamente não atribuído antes da declaração `while` e definitivamente não atribuído depois de S". No entanto, quando formulamos a regra para S, encontramos: "V é definitivamente não atribuído antes de S iff é definitivamente não atribuído depois de `e` quando verdadeiro". Isso leva a uma circularidade. Na verdade, V é definitivamente não atribuído _antes_ da condição de loop `e` somente se não for atribuído _depois_ do loop como um todo!

Quebramos este círculo vicioso usando uma análise hipotética da condição e do corpo do loop. Por exemplo, se assumirmos que V é definitivamente não atribuído antes de `e` (independentemente de V realmente ser definitivamente não atribuído antes de `e`), e pudermos então provar que V foi definitivamente não atribuído depois de `e`, então sabemos que `e` não atribui V. Isso é declarado mais formalmente como:

Assumindo que V é definitivamente não atribuído antes de `e`, V é definitivamente não atribuído depois de `e`.

Variações da análise acima são usadas para definir regras de não atribuição definida bem fundamentadas para todas as declarações de loop na linguagem de programação Java.

## 16.1. Atribuição Definida e Expressões

### 16.1.1. Expressões Constantes Booleanas

  * V é [não] atribuído depois de qualquer expressão constante ([§15.29](<#/doc/jls/jls-15>)) cujo valor é `true` quando falso.

  * V é [não] atribuído depois de qualquer expressão constante cujo valor é `false` quando verdadeiro.

  * V é [não] atribuído depois de qualquer expressão constante cujo valor é `true` quando verdadeiro iff V é [não] atribuído antes da expressão constante.

  * V é [não] atribuído depois de qualquer expressão constante cujo valor é `false` quando falso iff V é [não] atribuído antes da expressão constante.

  * V é [não] atribuído depois de uma expressão constante com valor booleano `e` iff V é [não] atribuído depois de `e` quando verdadeiro e V é [não] atribuído depois de `e` quando falso.

Isso é equivalente a dizer que V é [não] atribuído depois de `e` iff V é [não] atribuído antes de `e`.

Como uma expressão constante cujo valor é `true` nunca tem o valor `false`, e uma expressão constante cujo valor é `false` nunca tem o valor `true`, as duas primeiras regras são trivialmente satisfeitas. Elas são úteis na análise de expressões envolvendo os operadores `&&` ([§16.1.2](<#/doc/jls/jls-16>)), `||` ([§16.1.3](<#/doc/jls/jls-16>)), `!` ([§16.1.4](<#/doc/jls/jls-16>)), e `? :` ([§16.1.5](<#/doc/jls/jls-16>)).

### 16.1.2. Operador Condicional-E `&&`

  * V é [não] atribuído depois de `a` `&&` `b` ([§15.23](<#/doc/jls/jls-15>)) quando verdadeiro iff V é [não] atribuído depois de `b` quando verdadeiro.

  * V é [não] atribuído depois de `a` `&&` `b` quando falso iff V é [não] atribuído depois de `a` quando falso e V é [não] atribuído depois de `b` quando falso.

  * V é [não] atribuído antes de `a` iff V é [não] atribuído antes de `a` `&&` `b`.

  * V é [não] atribuído antes de `b` iff V é [não] atribuído depois de `a` quando verdadeiro.

  * V é [não] atribuído depois de `a` `&&` `b` iff V é [não] atribuído depois de `a` `&&` `b` quando verdadeiro e V é [não] atribuído depois de `a` `&&` `b` quando falso.

### 16.1.3. Operador Condicional-Ou `||`

  * V é [não] atribuído depois de `a` `||` `b` ([§15.24](<#/doc/jls/jls-15>)) quando verdadeiro iff V é [não] atribuído depois de `a` quando verdadeiro e V é [não] atribuído depois de `b` quando verdadeiro.

  * V é [não] atribuído depois de `a` `||` `b` quando falso iff V é [não] atribuído depois de `b` quando falso.

  * V é [não] atribuído antes de `a` iff V é [não] atribuído antes de `a` `||` `b`.

  * V é [não] atribuído antes de `b` iff V é [não] atribuído depois de `a` quando falso.

  * V é [não] atribuído depois de `a` `||` `b` iff V é [não] atribuído depois de `a` `||` `b` quando verdadeiro e V é [não] atribuído depois de `a` `||` `b` quando falso.

### 16.1.4. Operador de Complemento Lógico `!`

  * V é [não] atribuído depois de `!`a` ([§15.15.6](<#/doc/jls/jls-15>)) quando verdadeiro iff V é [não] atribuído depois de `a` quando falso.

  * V é [não] atribuído depois de `!`a` quando falso iff V é [não] atribuído depois de `a` quando verdadeiro.

  * V é [não] atribuído antes de `a` iff V é [não] atribuído antes de `!`a`.

  * V é [não] atribuído depois de `!`a` iff V é [não] atribuído depois de `!`a` quando verdadeiro e V é [não] atribuído depois de `!`a` quando falso.

Isso é equivalente a dizer que V é [não] atribuído depois de `!`a` iff V é [não] atribuído depois de `a`.

### 16.1.5. Operador Condicional `? :`

Suponha que `b` e `c` sejam expressões com valor booleano.

  * V é [não] atribuído depois de `a` `?` `b` `:` `c` ([§15.25](<#/doc/jls/jls-15>)) quando verdadeiro iff V é [não] atribuído depois de `b` quando verdadeiro e V é [não] atribuído depois de `c` quando verdadeiro.

  * V é [não] atribuído depois de `a` `?` `b` `:` `c` quando falso iff V é [não] atribuído depois de `b` quando falso e V é [não] atribuído depois de `c` quando falso.

  * V é [não] atribuído antes de `a` iff V é [não] atribuído antes de `a` `?` `b` `:` `c`.

  * V é [não] atribuído antes de `b` iff V é [não] atribuído depois de `a` quando verdadeiro.

  * V é [não] atribuído antes de `c` iff V é [não] atribuído depois de `a` quando falso.

  * V é [não] atribuído depois de `a` `?` `b` `:` `c` iff V é [não] atribuído depois de `a` `?` `b` `:` `c` quando verdadeiro e V é [não] atribuído depois de `a` `?` `b` `:` `c` quando falso.

Suponha que `b` e `c` sejam expressões que não têm valor booleano.

  * V é [não] atribuído depois de `a` `?` `b` `:` `c` iff V é [não] atribuído depois de `b` e V é [não] atribuído depois de `c`.

  * V é [não] atribuído antes de `a` iff V é [não] atribuído antes de `a` `?` `b` `:` `c`.

  * V é [não] atribuído antes de `b` iff V é [não] atribuído depois de `a` quando verdadeiro.

  * V é [não] atribuído antes de `c` iff V é [não] atribuído depois de `a` quando falso.

### 16.1.6. Expressões `switch`

Suponha que uma expressão `switch` ([§15.28](<#/doc/jls/jls-15>)) tenha expressões de resultado `e1`, ..., `en`, todas com valor booleano.

As seguintes regras se aplicam somente se o bloco `switch` da expressão `switch` consistir em grupos de declarações rotuladas `switch` ([§14.11.1](<#/doc/jls/jls-14>)):

  * V é definitivamente atribuído depois de uma expressão `switch` quando verdadeiro iff para cada declaração `yield` com expressão `e` ([§14.21](<#/doc/jls/jls-14>)) no bloco `switch` que pode sair da expressão `switch`, V é definitivamente atribuído depois de `e` quando verdadeiro.

  * V é definitivamente atribuído depois de uma expressão `switch` quando falso iff para cada declaração `yield` com expressão `e` no bloco `switch` que pode sair da expressão `switch`, V é definitivamente atribuído depois de `e` quando falso.

  * V é definitivamente não atribuído depois de uma expressão `switch` quando verdadeiro iff para cada declaração `yield` com expressão `e` no bloco `switch` que pode sair da expressão `switch`, V é definitivamente não atribuído antes da declaração `yield` e V é definitivamente não atribuído depois de `e` quando verdadeiro.

  * V é definitivamente não atribuído depois de uma expressão `switch` quando falso iff para cada declaração `yield` com expressão `e` no bloco `switch` que pode sair da expressão `switch`, V é definitivamente não atribuído antes da declaração `yield` e V é definitivamente não atribuído depois de `e` quando falso.

  * V é [não] atribuído antes da expressão seletora iff V é [não] atribuído antes da expressão `switch`.

  * V é [não] atribuído antes da primeira declaração do primeiro grupo de declarações rotuladas `switch` no bloco `switch` iff V é [não] atribuído depois da expressão seletora.

  * V é [não] atribuído antes da primeira declaração de qualquer grupo de declarações rotuladas `switch` que não seja o primeiro iff V é [não] atribuído depois da expressão seletora e V é [não] atribuído depois da declaração precedente.

As seguintes regras se aplicam somente se o bloco `switch` da expressão `switch` consistir em regras `switch` ([§14.11.1](<#/doc/jls/jls-14>)):

  * V é definitivamente atribuído depois de uma expressão `switch` quando verdadeiro iff para cada regra `switch`, uma das seguintes é verdadeira:

    * Ela introduz uma expressão de regra `switch` `e` e V é definitivamente atribuído depois de `e` quando verdadeiro.

    * Ela introduz um bloco de regra `switch` B e para cada declaração `yield` com expressão `e` contida em B que pode sair da expressão `switch`, V é definitivamente atribuído depois de `e` quando verdadeiro.

    * Ela introduz uma declaração `throw` de regra `switch`.

  * V é definitivamente atribuído depois de uma expressão `switch` quando falso iff para cada regra `switch`, uma das seguintes é verdadeira:

    * Ela introduz uma expressão de regra `switch` `e` e V é definitivamente atribuído depois de `e` quando falso.

    * Ela introduz um bloco de regra `switch` B e para cada declaração `yield` com expressão `e` contida em B que pode sair da expressão `switch`, V é definitivamente atribuído depois de `e` quando falso.

    * Ela introduz uma declaração `throw` de regra `switch`.

  * V é definitivamente não atribuído depois de uma expressão `switch` quando verdadeiro iff para cada regra `switch`, uma das seguintes é verdadeira:

    * Ela introduz uma expressão de regra `switch` `e` e V é definitivamente não atribuído depois de `e` quando verdadeiro.

    * Ela introduz um bloco de regra `switch` B e para cada declaração `yield` com expressão `e` contida em B que pode sair da expressão `switch`, V é definitivamente não atribuído antes da declaração `yield` e V é definitivamente não atribuído depois de `e` quando verdadeiro.

    * Ela introduz uma declaração `throw` de regra `switch`.

  * V é definitivamente não atribuído depois de uma expressão `switch` quando falso iff para cada regra `switch`, uma das seguintes é verdadeira:

    * Ela introduz uma expressão de regra `switch` `e` e V é definitivamente não atribuído depois de `e` quando falso.

    * Ela introduz um bloco de regra `switch` B e para cada declaração `yield` com expressão `e` contida em B que pode sair da expressão `switch`, V é definitivamente não atribuído antes da declaração `yield` e V é definitivamente não atribuído depois de `e` quando falso.

    * Ela introduz uma declaração `throw` de regra `switch`.

  * V é [não] atribuído antes de qualquer expressão de regra `switch` ou declaração de regra `switch` no bloco `switch` iff V é [não] atribuído depois da expressão seletora.

Suponha que uma expressão `switch` tenha expressões de resultado `e1`, ..., `en`, nem todas com valor booleano.

  * V é [não] atribuído depois de uma expressão `switch` iff todas as seguintes são verdadeiras:

    * V é [não] atribuído antes de cada declaração `yield` que pode sair da expressão `switch`.

    * Para cada regra `switch` no bloco `switch`, V é [não] atribuído depois da expressão de regra `switch`, bloco de regra `switch`, ou declaração `throw` de regra `switch` introduzida pela regra `switch`.

  * V é [não] atribuído antes da expressão seletora de uma expressão `switch` iff V é [não] atribuído antes da expressão `switch`.

  * V é [não] atribuído antes da expressão de regra `switch`, bloco de regra `switch`, ou declaração `throw` de regra `switch` introduzida por uma regra `switch` no bloco `switch` iff V é [não] atribuído depois da expressão seletora da expressão `switch`.

  * V é [não] atribuído antes da primeira declaração de bloco de um grupo de declarações rotuladas `switch` no bloco `switch` iff ambas as seguintes são verdadeiras:

    * V é [não] atribuído depois da expressão seletora da expressão `switch`.

    * Se o grupo de declarações rotuladas `switch` não for o primeiro no bloco `switch`, V é [não] atribuído depois da última declaração de bloco do grupo de declarações rotuladas `switch` precedente.

  * V é [não] atribuído antes de uma declaração de bloco que não é a primeira de um grupo de declarações rotuladas `switch` no bloco `switch` iff V é [não] atribuído depois da declaração de bloco precedente.

A seguinte regra se aplica a todas as expressões `switch`:

  * V é [não] atribuído antes de qualquer guarda associada ao bloco `switch` de uma expressão `switch` iff V é [não] atribuído depois da expressão seletora.

### 16.1.7. Outras Expressões do Tipo `boolean`

Suponha que `e` seja uma expressão do tipo `boolean` e não seja uma expressão constante booleana, expressão de complemento lógico `!`a`, expressão condicional-e `a` `&&` `b`, expressão condicional-ou `a` `||` `b`, ou expressão condicional `a` `?` `b` `:` `c`.

  * V é [não] atribuído depois de `e` quando verdadeiro iff V é [não] atribuído depois de `e`.

  * V é [não] atribuído depois de `e` quando falso iff V é [não] atribuído depois de `e`.

### 16.1.8. Expressões de Atribuição

Considere uma expressão de atribuição `a` `=` `b`, `a` `+=` `b`, `a` `-=` `b`, `a` `*=` `b`, `a` `/=` `b`, `a` `%=` `b`, `a` `<<=` `b`, `a` `>>=` `b`, `a` `>>>=` `b`, `a` `&=` `b`, `a` `|=` `b`, ou `a` `^=` `b` ([§15.26](<#/doc/jls/jls-15>)).

  * V é definitivamente atribuído depois da expressão de atribuição iff uma das seguintes é verdadeira:

    * `a` é V, ou

    * V é definitivamente atribuído depois de `b`.

  * V é definitivamente não atribuído depois da expressão de atribuição iff `a` não é V e V é definitivamente não atribuído depois de `b`.

  * V é [não] atribuído antes de `a` iff V é [não] atribuído antes da expressão de atribuição.

  * V é [não] atribuído antes de `b` iff V é [não] atribuído depois de `a`.

Note que se `a` é V e V não é definitivamente atribuído antes de uma atribuição composta como `a` `&=` `b`, então um erro em tempo de compilação ocorrerá necessariamente. A primeira regra para atribuição definida declarada acima inclui a disjunção "`a` é V" mesmo para expressões de atribuição composta, não apenas atribuições simples, para que V seja considerado definitivamente atribuído em pontos posteriores do código. Incluir a disjunção "`a` é V" não afeta a decisão binária sobre se um programa é aceitável ou resultará em um erro em tempo de compilação, mas afeta quantos pontos diferentes no código podem ser considerados errôneos e, portanto, na prática, pode melhorar a qualidade do relatório de erros. Uma observação semelhante se aplica à inclusão da conjunção "`a` não é V" na primeira regra para não atribuição definida declarada acima.

### 16.1.9. Operadores `++` e `--`

  * V é definitivamente atribuído depois de `++`a` ([§15.15.1](<#/doc/jls/jls-15>)), `--`a` ([§15.15.2](<#/doc/jls/jls-15>)), `a`++` ([§15.14.2](<#/doc/jls/jls-15>)), ou `a`--` ([§15.14.3](<#/doc/jls/jls-15>)) iff `a` é V ou V é definitivamente atribuído depois da expressão operando.

  * V é definitivamente não atribuído depois de `++`a`, `--`a`, `a`++`, ou `a`--` iff `a` não é V e V é definitivamente não atribuído depois da expressão operando.

  * V é [não] atribuído antes de `a` iff V é [não] atribuído antes de `++`a`, `--`a`, `a`++`, ou `a`--`.

### 16.1.10. Outras Expressões

Se uma expressão não for uma expressão constante booleana, e não for uma expressão de pré-incremento `++`a`, expressão de pré-decremento `--`a`, expressão de pós-incremento `a`++`, expressão de pós-decremento `a`--`, expressão de complemento lógico `!`a`, expressão condicional-e `a` `&&` `b`, expressão condicional-ou `a` `||` `b`, expressão condicional `a` `?` `b` `:` `c`, expressão de atribuição, ou expressão lambda, então as seguintes regras se aplicam:

  * Se a expressão não tiver subexpressões, V é [não] atribuído depois da expressão iff V é [não] atribuído antes da expressão.

Este caso se aplica a literais, nomes, `this` (qualificado e não qualificado), expressões de criação de instância de classe não qualificadas sem argumentos, expressões de criação de array com inicializadores que não contêm expressões, expressões de acesso a campo de superclasse, expressões de invocação de método não qualificadas e qualificadas por tipo sem argumentos, expressões de invocação de método de superclasse sem argumentos, e expressões de referência de método de superclasse e qualificadas por tipo.

  * Se a expressão tiver subexpressões, V é [não] atribuído depois da expressão iff V é [não] atribuído depois de sua subexpressão imediata mais à direita.

Há um raciocínio sutil por trás da afirmação de que uma variável V pode ser conhecida como definitivamente não atribuída após uma expressão de invocação de método. Tomada por si só, em seu valor de face e sem qualificação, tal afirmação nem sempre é verdadeira, porque um método invocado pode realizar atribuições. Mas deve-se lembrar que, para os propósitos da linguagem de programação Java, o conceito de não atribuição definida é aplicado apenas a variáveis `final` em branco. Se V é uma variável local `final` em branco, então somente o método ao qual sua declaração pertence pode realizar atribuições a V. Se V é um campo `final` em branco, então somente um construtor ou um inicializador para a classe que contém a declaração para V pode realizar atribuições a V; nenhum método pode realizar atribuições a V. Finalmente, invocações explícitas de construtor ([§8.8.7.1](<#/doc/jls/jls-08>)) são tratadas de forma especial ([§16.9](<#/doc/jls/jls-16>)); embora sejam sintaticamente semelhantes a declarações de expressão contendo invocações de método, elas não são declarações de expressão e, portanto, as regras desta seção não se aplicam a invocações explícitas de construtor.
Se uma expressão é uma expressão lambda, então as seguintes regras se aplicam:

  * V é [não]atribuída após a expressão se e somente se V é [não]atribuída antes da expressão.

  * V é definitivamente atribuída antes da expressão ou bloco que é o corpo lambda ([§15.27.2](<#/doc/jls/jls-15>)) se e somente se V é definitivamente atribuída antes da expressão lambda.

Nenhuma regra permite que V seja definitivamente não atribuída antes de um corpo lambda. Isso é intencional: uma variável que era definitivamente não atribuída antes do corpo lambda pode acabar sendo atribuída posteriormente, então não podemos concluir que a variável será não atribuída quando o corpo for executado.

Para qualquer subexpressão imediata `y` de uma expressão `x`, onde `x` não é uma expressão lambda, V é [não]atribuída antes de `y` se e somente se uma das seguintes for verdadeira:

  * `y` é a subexpressão imediata mais à esquerda de `x` e V é [não]atribuída antes de `x`.

  * `y` é o operando direito de um operador binário e V é [não]atribuída após o operando esquerdo.

  * `x` é um acesso a array, `y` é a subexpressão dentro dos colchetes, e V é [não]atribuída após a subexpressão antes dos colchetes.

  * `x` é uma expressão de invocação de método primária, `y` é a primeira expressão de argumento na expressão de invocação de método, e V é [não]atribuída após a expressão primária que calcula o objeto alvo.

  * `x` é uma expressão de invocação de método ou uma expressão de criação de instância de classe; `y` é uma expressão de argumento, mas não a primeira; e V é [não]atribuída após a expressão de argumento à esquerda de `y`.

  * `x` é uma expressão de criação de instância de classe qualificada, `y` é a primeira expressão de argumento na expressão de criação de instância de classe, e V é [não]atribuída após a expressão primária que calcula o objeto qualificador.

  * `x` é uma expressão de criação de array; `y` é uma expressão de dimensão, mas não a primeira; e V é [não]atribuída após a expressão de dimensão à esquerda de `y`.

  * `x` é uma expressão de criação de array inicializada via um inicializador de array; `y` é o inicializador de array em `x`; e V é [não]atribuída após a expressão de dimensão à esquerda de `y`.

## 16.2. Atribuição Definida e Declarações

### 16.2.1. Declarações Vazias

  * V é [não]atribuída após uma declaração vazia ([§14.6](<#/doc/jls/jls-14>)) se e somente se ela é [não]atribuída antes da declaração vazia.

### 16.2.2. Blocos

  * Um campo membro `final` em branco V é definitivamente atribuído (e, além disso, não é definitivamente não atribuído) antes do bloco ([§14.2](<#/doc/jls/jls-14>)) que é o corpo de qualquer método no escopo de V e antes da declaração de qualquer classe declarada dentro do escopo de V.

  * Uma variável local V declarada por uma declaração S é definitivamente não atribuída (e, além disso, não é definitivamente atribuída) antes do bloco que é o corpo do método, inicializador de instância ou inicializador estático que contém S.

  * Seja C uma classe declarada dentro do escopo de V. Então V é definitivamente atribuída antes do bloco que é o corpo de qualquer método, inicializador de instância ou inicializador estático declarado em C se e somente se V é definitivamente atribuída antes da declaração de C.

Note que não há regras que nos permitam concluir que V é definitivamente não atribuída antes do bloco que é o corpo de qualquer método, inicializador de instância ou inicializador estático declarado em C. Podemos informalmente concluir que V não é definitivamente não atribuída antes do bloco que é o corpo de qualquer método, inicializador de instância ou inicializador estático declarado em C, mas não há necessidade de tal regra ser explicitamente declarada.

  * V é [não]atribuída após um bloco vazio se e somente se V é [não]atribuída antes do bloco vazio.

  * V é [não]atribuída após um bloco não vazio se e somente se V é [não]atribuída após a última declaração no bloco.

  * V é [não]atribuída antes da primeira declaração do bloco se e somente se V é [não]atribuída antes do bloco.

  * V é [não]atribuída antes de qualquer outra declaração S do bloco se e somente se V é [não]atribuída após a declaração imediatamente anterior a S no bloco.

Dizemos que V é definitivamente não atribuída em todo um bloco B se e somente se:

  * V é definitivamente não atribuída antes de B.

  * V é definitivamente atribuída após `e` em toda expressão de atribuição V `=` `e`, V `+=` `e`, V `-=` `e`, V `*=` `e`, V `/=` `e`, V `%=` `e`, V `<<=` `e`, V `>>=` `e`, V `>>>=` `e`, V `&=` `e`, V `|=` `e`, ou V `^=` `e` que ocorre em B.

  * V é definitivamente atribuída antes de toda expressão `++`V, `--`V, V`++`, ou V`--` que ocorre em B.

Essas condições são contraintuitivas e exigem alguma explicação. Considere uma atribuição simples V `=` `e`. Se V é definitivamente atribuída após `e`, então ou:

  * A atribuição ocorre em código morto, e V é definitivamente atribuída de forma vazia. Neste caso, a atribuição não ocorrerá de fato, e podemos assumir que V não está sendo atribuída pela expressão de atribuição. Ou:

  * V já foi atribuída por uma expressão anterior a `e`. Neste caso, a atribuição atual causará um erro em tempo de compilação.

Assim, podemos concluir que se as condições forem satisfeitas por um programa que não causa erro em tempo de compilação, então quaisquer atribuições a V em B não ocorrerão de fato em tempo de execução.

### 16.2.3. Declarações de Classes e Interfaces Locais

  * V é [não]atribuída após uma declaração de classe ou interface local ([§14.3](<#/doc/jls/jls-14>)) se e somente se V é [não]atribuída antes da declaração de classe ou interface local.

### 16.2.4. Declarações de Variáveis Locais

  * V é [não]atribuída após uma declaração de variável local ([§14.4.2](<#/doc/jls/jls-14>)) que não contém inicializadores de variável se e somente se V é [não]atribuída antes da declaração de variável local.

  * V é definitivamente atribuída após uma declaração de variável local que contém pelo menos um inicializador de variável se e somente se V é definitivamente atribuída após o último inicializador de variável na declaração de variável local ou o último inicializador de variável na declaração está no declarador que declara V.

  * V é definitivamente não atribuída após uma declaração de variável local que contém pelo menos um inicializador de variável se e somente se V é definitivamente não atribuída após o último inicializador de variável na declaração de variável local e o último inicializador de variável na declaração não está no declarador que declara V.

  * V é [não]atribuída antes do primeiro inicializador de variável em uma declaração de variável local se e somente se V é [não]atribuída antes da declaração de variável local.

  * V é definitivamente atribuída antes de qualquer inicializador de variável `e` diferente do primeiro na declaração de variável local se e somente se V é definitivamente atribuída após o inicializador de variável à esquerda de `e` ou a expressão inicializadora à esquerda de `e` está no declarador que declara V.

  * V é definitivamente não atribuída antes de qualquer inicializador de variável `e` diferente do primeiro na declaração de variável local se e somente se V é definitivamente não atribuída após o inicializador de variável à esquerda de `e` e a expressão inicializadora à esquerda de `e` não está no declarador que declara V.

### 16.2.5. Declarações Rotuladas

  * V é [não]atribuída após uma declaração rotulada `L` `:` S (onde `L` é um rótulo) ([§14.7](<#/doc/jls/jls-14>)) se e somente se V é [não]atribuída após S e V é [não]atribuída antes de toda declaração `break` que pode sair da declaração rotulada `L` `:` S.

  * V é [não]atribuída antes de S se e somente se V é [não]atribuída antes de `L` `:` S.

### 16.2.6. Declarações de Expressão

  * V é [não]atribuída após uma declaração de expressão `e`;` ([§14.8](<#/doc/jls/jls-14>)) se e somente se ela é [não]atribuída após `e`.

  * V é [não]atribuída antes de `e` se e somente se ela é [não]atribuída antes de `e`;`.

### 16.2.7. Declarações `if`

As seguintes regras se aplicam a uma declaração `if (`e`) S` ([§14.9.1](<#/doc/jls/jls-14>)):

  * V é [não]atribuída após `if (`e`) S` se e somente se V é [não]atribuída após S e V é [não]atribuída após `e` quando falso.

  * V é [não]atribuída antes de `e` se e somente se V é [não]atribuída antes de `if (`e`) S`.

  * V é [não]atribuída antes de S se e somente se V é [não]atribuída após `e` quando verdadeiro.

As seguintes regras se aplicam a uma declaração `if (e) S else T` ([§14.9.2](<#/doc/jls/jls-14>)):

  * V é [não]atribuída após `if (`e`) S else T` se e somente se V é [não]atribuída após S e V é [não]atribuída após T.

  * V é [não]atribuída antes de `e` se e somente se V é [não]atribuída antes de `if (`e`) S else T`.

  * V é [não]atribuída antes de S se e somente se V é [não]atribuída após `e` quando verdadeiro.

  * V é [não]atribuída antes de T se e somente se V é [não]atribuída após `e` quando falso.

### 16.2.8. Declarações `assert`

As seguintes regras se aplicam tanto a uma declaração `assert `e1` quanto a uma declaração `assert `e1` : `e2` ([§14.10](<#/doc/jls/jls-14>)):

  * V é [não]atribuída antes de `e1` se e somente se V é [não]atribuída antes da declaração `assert`.

  * V é definitivamente atribuída após a declaração `assert` se e somente se V é definitivamente atribuída antes da declaração `assert`.

  * V é definitivamente não atribuída após a declaração `assert` se e somente se V é definitivamente não atribuída antes da declaração `assert` e V é definitivamente não atribuída após `e1` quando verdadeiro.

A seguinte regra se aplica a uma declaração `assert `e1` : `e2`:

  * V é [não]atribuída antes de `e2` se e somente se V é [não]atribuída após `e1` quando falso.

### 16.2.9. Declarações `switch`

  * V é [não]atribuída após uma declaração `switch` ([§14.11](<#/doc/jls/jls-14>)) se e somente se todas as seguintes forem verdadeiras:

    * V é [não]atribuída antes de toda declaração `break` ([§14.15](<#/doc/jls/jls-14>)) que pode sair da declaração `switch`.

    * Para cada regra `switch` ([§14.11.1](<#/doc/jls/jls-14>)) no bloco `switch`, V é [não]atribuída após a expressão da regra `switch`, bloco da regra `switch`, ou declaração `throw` da regra `switch` introduzida pela regra `switch`.

    * Se houver um grupo de declarações rotuladas `switch` no bloco `switch`, então V é [não]atribuída após a última declaração de bloco do último grupo de declarações rotuladas `switch`.

    * Se a declaração `switch` não é exaustiva ([§14.11.1.1](<#/doc/jls/jls-14>)), ou se o bloco `switch` termina com um rótulo `switch` seguido pelo separador `}`, então V é [não]atribuída após a expressão seletora.

  * V é [não]atribuída antes da expressão seletora de uma declaração `switch` se e somente se V é [não]atribuída antes da declaração `switch`.

  * V é [não]atribuída antes de qualquer guarda associada ao bloco `switch` de uma declaração `switch` se e somente se V é [não]atribuída após a expressão seletora.

  * V é [não]atribuída antes da expressão da regra `switch`, bloco da regra `switch`, ou declaração `throw` da regra `switch` introduzida por uma regra `switch` no bloco `switch` se e somente se V é [não]atribuída após a expressão seletora da declaração `switch`.

  * V é [não]atribuída antes da primeira declaração de bloco de um grupo de declarações rotuladas `switch` no bloco `switch` se e somente se ambas as seguintes forem verdadeiras:

    * V é [não]atribuída após a expressão seletora da declaração `switch`.

    * Se o grupo de declarações rotuladas `switch` não é o primeiro no bloco `switch`, V é [não]atribuída após a última declaração de bloco do grupo de declarações rotuladas `switch` precedente.

  * V é [não]atribuída antes de uma declaração de bloco que não é a primeira de um grupo de declarações rotuladas `switch` no bloco `switch` se e somente se V é [não]atribuída após a declaração de bloco precedente.

### 16.2.10. Declarações `while`

  * V é [não]atribuída após `while (`e`) S` ([§14.12](<#/doc/jls/jls-14>)) se e somente se V é [não]atribuída após `e` quando falso e V é [não]atribuída antes de toda declaração `break` para a qual a declaração `while` é o alvo do `break`.

  * V é definitivamente atribuída antes de `e` se e somente se V é definitivamente atribuída antes da declaração `while`.

  * V é definitivamente não atribuída antes de `e` se e somente se todas as seguintes forem verdadeiras:

    * V é definitivamente não atribuída antes da declaração `while`.

    * Assumindo que V é definitivamente não atribuída antes de `e`, V é definitivamente não atribuída após S.

    * Assumindo que V é definitivamente não atribuída antes de `e`, V é definitivamente não atribuída antes de toda declaração `continue` para a qual a declaração `while` é o alvo do `continue`.

  * V é [não]atribuída antes de S se e somente se V é [não]atribuída após `e` quando verdadeiro.

### 16.2.11. Declarações `do`

  * V é [não]atribuída após `do S while (`e`);` ([§14.13](<#/doc/jls/jls-14>)) se e somente se V é [não]atribuída após `e` quando falso e V é [não]atribuída antes de toda declaração `break` para a qual a declaração `do` é o alvo do `break`.

  * V é definitivamente atribuída antes de S se e somente se V é definitivamente atribuída antes da declaração `do`.

  * V é definitivamente não atribuída antes de S se e somente se todas as seguintes forem verdadeiras:

    * V é definitivamente não atribuída antes da declaração `do`.

    * Assumindo que V é definitivamente não atribuída antes de S, V é definitivamente não atribuída após `e` quando verdadeiro.

  * V é [não]atribuída antes de `e` se e somente se V é [não]atribuída após S e V é [não]atribuída antes de toda declaração `continue` para a qual a declaração `do` é o alvo do `continue`.

### 16.2.12. Declarações `for`

As regras aqui cobrem a declaração `for` básica ([§14.14.1](<#/doc/jls/jls-14>)). Como a declaração `for` aprimorada ([§14.14.2](<#/doc/jls/jls-14>)) é definida por tradução para uma declaração `for` básica, nenhuma regra especial precisa ser fornecida para ela.

  * V é [não]atribuída após uma declaração `for` se e somente se ambas as seguintes forem verdadeiras:

    * Ou uma expressão de condição não está presente ou V é [não]atribuída após a expressão de condição quando falso.

    * V é [não]atribuída antes de toda declaração `break` para a qual a declaração `for` é o alvo do `break`.

  * V é [não]atribuída antes da parte de inicialização da declaração `for` se e somente se V é [não]atribuída antes da declaração `for`.

  * V é definitivamente atribuída antes da parte de condição da declaração `for` se e somente se V é definitivamente atribuída após a parte de inicialização da declaração `for`.

  * V é definitivamente não atribuída antes da parte de condição da declaração `for` se e somente se ambas as seguintes forem verdadeiras:

    * V é definitivamente não atribuída após a parte de inicialização da declaração `for`.

    * Assumindo que V é definitivamente não atribuída antes da parte de condição da declaração `for`, V é definitivamente não atribuída após a parte de incrementação da declaração `for`.

  * V é [não]atribuída antes da declaração contida se e somente se uma das seguintes for verdadeira:

    * Uma expressão de condição está presente e V é [não]atribuída após a expressão de condição quando verdadeiro.

    * Nenhuma expressão de condição está presente e V é [não]atribuída antes da parte de condição da declaração `for`.

  * V é [não]atribuída antes da parte de incrementação da declaração `for` se e somente se V é [não]atribuída após a declaração contida e V é [não]atribuída antes de toda declaração `continue` para a qual a declaração `for` é o alvo do `continue`.

#### 16.2.12.1. Parte de Inicialização da Declaração `for`

  * Se a parte de inicialização da declaração `for` é uma declaração de variável local, as regras de [§16.2.4](<#/doc/jls/jls-16>) se aplicam.

  * Caso contrário, se a parte de inicialização estiver vazia, então V é [não]atribuída após a parte de inicialização se e somente se V é [não]atribuída antes da parte de inicialização.

  * Caso contrário, três regras se aplicam:

    * V é [não]atribuída após a parte de inicialização se e somente se V é [não]atribuída após a última declaração de expressão na parte de inicialização.

    * V é [não]atribuída antes da primeira declaração de expressão na parte de inicialização se e somente se V é [não]atribuída antes da parte de inicialização.

    * V é [não]atribuída antes de uma declaração de expressão S diferente da primeira na parte de inicialização se e somente se V é [não]atribuída após a declaração de expressão imediatamente anterior a S.

#### 16.2.12.2. Parte de Incrementação da Declaração `for`

  * Se a parte de incrementação da declaração `for` estiver vazia, então V é [não]atribuída após a parte de incrementação se e somente se V é [não]atribuída antes da parte de incrementação.

  * Caso contrário, três regras se aplicam:

    * V é [não]atribuída após a parte de incrementação se e somente se V é [não]atribuída após a última declaração de expressão na parte de incrementação.

    * V é [não]atribuída antes da primeira expressão de declaração na parte de incrementação se e somente se V é [não]atribuída antes da parte de incrementação.

    * V é [não]atribuída antes de uma declaração de expressão S diferente da primeira na parte de incrementação se e somente se V é [não]atribuída após a declaração de expressão imediatamente anterior a S.

### 16.2.13. Declarações `break`, `yield`, `continue`, `return` e `throw`

  * Por convenção, dizemos que V é [não]atribuída após qualquer declaração `break`, `yield`, `continue`, `return` ou `throw` ([§14.15](<#/doc/jls/jls-14>), [§14.21](<#/doc/jls/jls-14>), [§14.16](<#/doc/jls/jls-14>), [§14.17](<#/doc/jls/jls-14>), [§14.18](<#/doc/jls/jls-14>)).

A noção de que uma variável é "[não]atribuída após" uma declaração ou expressão significa, na verdade, "é [não]atribuída após a declaração ou expressão ser concluída normalmente". Como uma declaração `break`, `yield`, `continue`, `return` ou `throw` nunca é concluída normalmente, ela satisfaz essa noção de forma vazia.

  * Em uma declaração `yield` com expressão `e`, ou uma declaração `return` com expressão `e`, ou uma declaração `throw` com expressão `e`, V é [não]atribuída antes de `e` se e somente se V é [não]atribuída antes da declaração `yield`, `return` ou `throw`.

### 16.2.14. Declarações `synchronized`

  * V é [não]atribuída após `synchronized (`e`) S` ([§14.19](<#/doc/jls/jls-14>)) se e somente se V é [não]atribuída após S.

  * V é [não]atribuída antes de `e` se e somente se V é [não]atribuída antes da declaração `synchronized (`e`) S`.

  * V é [não]atribuída antes de S se e somente se V é [não]atribuída após `e`.

### 16.2.15. Declarações `try`

As regras aqui cobrem as declarações `try`-`catch` e `try`-`catch`-`finally` ([§14.20.1](<#/doc/jls/jls-14>), [§14.20.2](<#/doc/jls/jls-14>)). Como a declaração `try`-with-resources ([§14.20.3](<#/doc/jls/jls-14>)) é definida por tradução para uma declaração `try`-`catch`-`finally`, nenhuma regra especial precisa ser fornecida para ela.

Estas regras se aplicam a toda declaração `try` ([§14.20](<#/doc/jls/jls-14>)), tenha ou não um bloco `finally`:

  * V é [não]atribuída antes do bloco `try` se e somente se V é [não]atribuída antes da declaração `try`.

  * V é definitivamente atribuída antes de um bloco `catch` se e somente se V é definitivamente atribuída antes do bloco `try`.

  * V é definitivamente não atribuída antes de um bloco `catch` se e somente se todas as seguintes forem verdadeiras:

    * V é definitivamente não atribuída após o bloco `try`.

    * V é definitivamente não atribuída antes de toda declaração `return` que pertence ao bloco `try`.

    * V é definitivamente não atribuída após `e` em toda declaração da forma `throw` `e` que pertence ao bloco `try`.

    * V é definitivamente não atribuída após toda declaração `assert` que ocorre no bloco `try`.

    * V é definitivamente não atribuída antes de toda declaração `break` que pertence ao bloco `try` e cujo alvo do `break` contém (ou é) a declaração `try`.

    * V é definitivamente não atribuída antes de toda declaração `continue` que pertence ao bloco `try` e cujo alvo do `continue` contém a declaração `try`.

Se uma declaração `try` não possui um bloco `finally`, então esta regra também se aplica:

  * V é [não]atribuída após a declaração `try` se e somente se V é [não]atribuída após o bloco `try` e V é [não]atribuída após todo bloco `catch` na declaração `try`.

Se uma declaração `try` possui um bloco `finally`, então estas regras também se aplicam:

  * V é definitivamente atribuída após a declaração `try` se e somente se pelo menos uma das seguintes for verdadeira:

    * V é definitivamente atribuída após o bloco `try` e V é definitivamente atribuída após todo bloco `catch` na declaração `try`.

    * V é definitivamente atribuída após o bloco `finally`.

  * V é definitivamente não atribuída após a declaração `try` se e somente se V é definitivamente não atribuída após o bloco `finally`.

  * V é definitivamente atribuída antes do bloco `finally` se e somente se V é definitivamente atribuída antes da declaração `try`.

  * V é definitivamente não atribuída antes do bloco `finally` se e somente se todas as seguintes forem verdadeiras:

    * V é definitivamente não atribuída após o bloco `try`.

    * V é definitivamente não atribuída antes de toda declaração `return` que pertence ao bloco `try`.

    * V é definitivamente não atribuída após `e` em toda declaração da forma `throw` `e` que pertence ao bloco `try`.

    * V é definitivamente não atribuída após toda declaração `assert` que ocorre no bloco `try`.

    * V é definitivamente não atribuída antes de toda declaração `break` que pertence ao bloco `try` e cujo alvo do `break` contém (ou é) a declaração `try`.

    * V é definitivamente não atribuída antes de toda declaração `continue` que pertence ao bloco `try` e cujo alvo do `continue` contém a declaração `try`.

    * V é definitivamente não atribuída após todo bloco `catch` da declaração `try`.
## 16.3. Atribuição Definida e Parâmetros

  * Um parâmetro formal V de um method ou constructor ([§8.4.1](<#/doc/jls/jls-08>), [§8.8.1](<#/doc/jls/jls-08>)) é definitivamente atribuído (e, além disso, não é definitivamente não atribuído) antes do body do method ou constructor.

  * Um parâmetro de exceção V de uma `catch` clause ([§14.20](<#/doc/jls/jls-14>)) é definitivamente atribuído (e, além disso, não é definitivamente não atribuído) antes do body da `catch` clause.

## 16.4. Atribuição Definida e Inicializadores de Array

  * V é [não] atribuído após um array initializer vazio ([§10.6](<#/doc/jls/jls-10>)) se e somente se V for [não] atribuído antes do array initializer vazio.

  * V é [não] atribuído após um array initializer não vazio se e somente se V for [não] atribuído após o último variable initializer no array initializer.

  * V é [não] atribuído antes do primeiro variable initializer do array initializer se e somente se V for [não] atribuído antes do array initializer.

  * V é [não] atribuído antes de qualquer outro variable initializer `e` do array initializer se e somente se V for [não] atribuído após o variable initializer à esquerda de `e` no array initializer.

## 16.5. Atribuição Definida e Constantes Enum

As regras que determinam quando uma variable é definitivamente atribuída ou definitivamente não atribuída antes de uma enum constant ([§8.9.1](<#/doc/jls/jls-08>)) são dadas em [§16.8](<#/doc/jls/jls-16>).

Isso ocorre porque uma enum constant é essencialmente um `static` `final` field ([§8.3.1.1](<#/doc/jls/jls-08>), [§8.3.1.2](<#/doc/jls/jls-08>)) que é inicializado com uma class instance creation expression ([§15.9](<#/doc/jls/jls-15>)).

  * V é definitivamente atribuído antes da declaration de um class body de uma enum constant sem arguments que é declarado dentro do scope de V se e somente se V for definitivamente atribuído antes da enum constant.

  * V é definitivamente atribuído antes da declaration de um class body de uma enum constant com arguments que é declarado dentro do scope de V se e somente se V for definitivamente atribuído após a última argument expression da enum constant

O status de atribuição/não atribuição definida de qualquer construct dentro do class body de uma enum constant é regido pelas regras usuais para classes.

  * V é [não] atribuído antes do primeiro argument para uma enum constant se e somente se for [não] atribuído antes da enum constant.

  * V é [não] atribuído antes de `y` (um argument de uma enum constant, mas não o primeiro) se e somente se V for [não] atribuído após o argument à esquerda de `y`.

## 16.6. Atribuição Definida e Classes Anônimas

  * V é definitivamente atribuído antes de uma anonymous class declaration ([§15.9.5](<#/doc/jls/jls-15>)) que é declarado dentro do scope de V se e somente se V for definitivamente atribuído após a class instance creation expression que declara a anonymous class.

Deve ficar claro que se uma anonymous class for implicitamente definida por uma enum constant, as regras de [§16.5](<#/doc/jls/jls-16>) se aplicam.

## 16.7. Atribuição Definida e Classes e Interfaces Membro

Seja C uma class, e seja V um blank `final` field de C. Então:

  * V é definitivamente atribuído (e, além disso, não é definitivamente não atribuído) antes da declaration de qualquer member class ou interface ([§8.5](<#/doc/jls/jls-08>), [§9.5](<#/doc/jls/jls-09>)) de C.

Seja C uma class declarada dentro do scope de V. Então:

  * V é definitivamente atribuído antes da declaration de uma member class ou interface de C se e somente se V for definitivamente atribuído antes da declaration de C.

## 16.8. Atribuição Definida e Inicializadores Estáticos

Seja C uma class declarada dentro do scope de V. Então:

  * V é definitivamente atribuído antes de uma enum constant ([§8.9.1](<#/doc/jls/jls-08>)) ou static variable initializer ([§8.3.2](<#/doc/jls/jls-08>)) de C se e somente se V for definitivamente atribuído antes da declaration de C.

Note que não há regras que nos permitam concluir que V é definitivamente não atribuído antes de um static variable initializer ou enum constant. Podemos informalmente concluir que V não é definitivamente não atribuído antes de qualquer static variable initializer de C, mas não há necessidade de tal regra ser explicitamente declarada.

Seja C uma class, e seja V um blank `static` `final` member field de C, declarado em C. Então:

  * V é definitivamente não atribuído (e, além disso, não é definitivamente atribuído) antes do enum constant, static initializer ([§8.7](<#/doc/jls/jls-08>)) ou static variable initializer mais à esquerda de C.

  * V é [não] atribuído antes de um enum constant, static initializer ou static variable initializer de C diferente do mais à esquerda se e somente se V for [não] atribuído após o enum constant, static initializer ou static variable initializer precedente de C.

Seja C uma class, e seja V um blank `static` `final` member field de C, declarado em uma superclass de C. Então:

  * V é definitivamente atribuído (e, além disso, não é definitivamente não atribuído) antes de cada enum constant de C.

  * V é definitivamente atribuído (e, além disso, não é definitivamente não atribuído) antes do block que é o body de um static initializer de C.

  * V é definitivamente atribuído (e, além disso, não é definitivamente não atribuído) antes de cada static variable initializer de C.

## 16.9. Atribuição Definida, Construtores e Inicializadores de Instância

Seja C uma class declarada dentro do scope de V. Então:

  * V é definitivamente atribuído antes de uma constructor declaration ([§8.8.7](<#/doc/jls/jls-08>)) ou instance variable initializer ([§8.3.2](<#/doc/jls/jls-08>)) de C se e somente se V for definitivamente atribuído antes da declaration de C.

Note que não há regras que nos permitam concluir que V é definitivamente não atribuído antes da constructor declaration ou instance variable initializer. Podemos informalmente concluir que V não é definitivamente não atribuído antes de qualquer constructor declaration ou instance variable initializer de C, mas não há necessidade de tal regra ser explicitamente declarada.

Seja C uma class, e seja V um blank `final` non-`static` member field de C, declarado em C. Então:

  * V é definitivamente não atribuído (e, além disso, não é definitivamente atribuído) antes da declaration de qualquer constructor em C.

  * V é definitivamente não atribuído (e, além disso, não é definitivamente atribuído) antes do instance initializer ([§8.6](<#/doc/jls/jls-08>)) ou instance variable initializer mais à esquerda de C se e somente se V for definitivamente não atribuído após cada superclass constructor invocation ([§8.8.7.1](<#/doc/jls/jls-08>)) nos constructors de C.

  * V é definitivamente atribuído (e, além disso, não é definitivamente não atribuído) antes do instance initializer ([§8.6](<#/doc/jls/jls-08>)) ou instance variable initializer mais à esquerda de C se e somente se C declarar pelo menos um constructor, cada constructor de C tiver uma explicit constructor invocation, e V for definitivamente atribuído após cada superclass constructor invocation nesses constructors.

  * V é [não] atribuído antes de um instance initializer ou instance variable initializer de C diferente do mais à esquerda se e somente se V for [não] atribuído após o instance initializer ou instance variable initializer precedente de C.

Seja C uma class, e seja V um blank `final` non-`static` member field de C, declarado em uma superclass de C. Então:

  * V é definitivamente não atribuído (e, além disso, não é definitivamente atribuído) antes da declaration de qualquer constructor em C.

  * V é definitivamente atribuído (e, além disso, não é definitivamente não atribuído) antes de cada instance initializer e instance variable initializer de C.

Seja C uma class, e seja V um blank `final` `static` member field de C. Então:

  * V é definitivamente atribuído (e, além disso, não é definitivamente não atribuído) antes de cada constructor declaration, instance initializer e instance variable initializer de C.

Seja C uma class, e seja V uma local variable declarada por um statement S contido por um constructor ou instance variable initializer de C. Então:

  * V é definitivamente não atribuído (e, além disso, não é definitivamente atribuído) antes da constructor declaration ou instance variable initializer.

As seguintes regras se aplicam dentro dos constructors ([§8.8.7](<#/doc/jls/jls-08>)) de class C:

  * V é [não] atribuído antes do prologue do constructor body ([§8.8.7](<#/doc/jls/jls-08>)) se e somente se V for [não] atribuído antes da constructor declaration.

  * V é [não] atribuído após um prologue vazio se e somente se V for [não] atribuído antes do prologue.

  * V é [não] atribuído após um prologue não vazio se e somente se V for [não] atribuído após o último statement no prologue.

  * V é [não] atribuído antes de uma constructor invocation ([§8.8.7.1](<#/doc/jls/jls-08>)) se e somente se V for [não] atribuído após o prologue.

  * V é [não] atribuído antes da argument list de uma qualified super constructor invocation se e somente se V for [não] atribuído após a qualifier expression.

  * V é [não] atribuído antes da argument list de qualquer outra constructor invocation se e somente se V for [não] atribuído antes da invocation.

  * V é [não] atribuído após a argument list de uma constructor invocation se e somente se V for [não] atribuído após a argument expression mais à direita na argument list, ou a argument list estiver vazia e V for [não] atribuído antes da argument list.

  * Um blank `final` non-`static` member field de C, declarado em uma superclass de C, é definitivamente atribuído (e, além disso, não é definitivamente não atribuído) após uma superclass constructor invocation.

  * Qualquer outra variable V é [não] atribuída após uma superclass constructor invocation se e somente se V for [não] atribuído após a argument list da invocation.

  * Um blank `final` non-`static` member field de C, declarado em C ou em uma superclass de C, é definitivamente atribuído (e, além disso, não é definitivamente não atribuído) após uma alternate constructor invocation.

  * Qualquer outra variable V é [não] atribuída após uma alternate constructor invocation se e somente se V for [não] atribuído após a argument list da invocation.

  * Para o epilogue de um constructor body sem explicit constructor invocation:

    * Um blank `final` non-`static` member field V de C, declarado em C, é [não] atribuído antes do epilogue se e somente se V for [não] atribuído após a instance initialization ou instance variable initializer mais à direita de C, ou C não declarar nenhum instance initializer ou instance variable initializer, e V for [não] atribuído após o prologue do constructor body.

    * Um blank `final` non-`static` member field de C, declarado em uma superclass de C, é definitivamente atribuído (e, além disso, não é definitivamente não atribuído) antes do epilogue.

    * Qualquer outra variable V é [não] atribuída antes do epilogue se e somente se V for [não] atribuído após o prologue do constructor body.

  * Para o epilogue de um constructor body com uma superclass constructor invocation:

    * Um blank `final` non-`static` member field V de C, declarado em C, é [não] atribuído antes do epilogue se e somente se V for [não] atribuído após a instance initialization ou instance variable initializer mais à direita de C, ou C não declarar nenhum instance initializer ou instance variable initializer, e V for [não] atribuído após a superclass constructor invocation.

    * Qualquer outra variable V é [não] atribuída antes do epilogue se e somente se V for [não] atribuído após a superclass constructor invocation.

  * Para o epilogue de um constructor body com uma alternate constructor invocation, V é [não] atribuído antes do epilogue se e somente se V for [não] atribuído após a alternate constructor invocation.

  * V é [não] atribuído após um epilogue vazio se e somente se V for [não] atribuído antes do epilogue.

  * V é [não] atribuído após um epilogue não vazio se e somente se V for [não] atribuído após o último statement no epilogue.

  * V é [não] atribuído antes do primeiro statement do prologue ou epilogue se e somente se V for [não] atribuído antes do prologue ou epilogue, respectivamente.

  * V é [não] atribuído antes de qualquer outro statement S no prologue ou epilogue se e somente se V for [não] atribuído após o statement imediatamente precedente a S no prologue ou epilogue.

  * V é [não] atribuído antes da qualifier expression de uma super constructor invocation se e somente se V for [não] atribuído antes da super constructor invocation.

  * V é [não] atribuído antes da argument expression mais à esquerda de uma explicit constructor invocation se e somente se V for [não] atribuído antes da argument list.

  * V é [não] atribuído antes de qualquer outra argument expression `x` de uma explicit constructor invocation se e somente se V for [não] atribuído após a argument expression à esquerda de `x`.

* * *

[Anterior](<#/doc/jls/jls-15>) | | [Próximo](<#/doc/jls/jls-17>)
---|---|---
Capítulo 15. Expressões | [Início](<#/doc/jls/jls-01>) | Capítulo 17. Threads e Locks

* * *

[ Aviso Legal ](<#/>)