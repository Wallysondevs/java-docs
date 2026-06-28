# Convertendo foreach com if

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Refatorando do Estilo Imperativo para o Funcional ](<#/doc/tutorials/refactoring-to-functional-style>) > Convertendo foreach com if

**Anterior na Série**

[Convertendo Loops com Passos](<#/doc/tutorials/refactoring-to-functional-style/loopswithsteps>)

➜

**Tutorial Atual**

Convertendo foreach com if

➜

**Próximo na Série**

[Convertendo Iteração com transformação](<#/doc/tutorials/refactoring-to-functional-style/iteartionwithtransformation>)

**Anterior na Série:** [Convertendo Loops com Passos](<#/doc/tutorials/refactoring-to-functional-style/loopswithsteps>)

**Próximo na Série:** [Convertendo Iteração com transformação](<#/doc/tutorials/refactoring-to-functional-style/iteartionwithtransformation>)

# Convertendo foreach com if

Esta página foi contribuída por [Venkat Subramaniam](</author/VenkatSubramaniam>) sob a [UPL](<https://oss.oracle.com/licenses/upl/>)

## Iterando com foreach

Nos artigos anteriores desta [série de tutoriais](<#/doc/tutorials/refactoring-to-functional-style>), analisamos a conversão de loops escritos no estilo imperativo para o estilo funcional. Neste artigo, veremos como converter uma iteração no estilo imperativo usando `foreach` para o estilo funcional. Além disso, também veremos como selecionar elementos específicos usando `if` e transformá-los para o estilo funcional.

O Java 5 introduziu a muito popular sintaxe `foreach`. Por exemplo, para iterar sobre uma coleção de `String`s representando nomes, escreveríamos algo como `for(String name: names)`. Por baixo dos panos, o `foreach` é convertido, no nível do bytecode, para usar um `Iterator` — enquanto o iterador nos diz que há outro elemento, ele busca o próximo elemento para processamento. Em outras palavras, o `foreach` é um açúcar sintático conciso e agradável para iteração com um loop `while` sobre os elementos fornecidos por um `Iterator`. Podemos converter um `foreach` para o estilo funcional com bastante facilidade. Vamos ver como.

## Do Estilo Imperativo para o Funcional

Aqui está um exemplo de iteração, usando `foreach`, sobre uma coleção de nomes:

A cada passo da iteração, a variável `name` é vinculada a um novo valor, à medida que a iteração avança de um elemento para o próximo na coleção dada. Converter o `foreach` no estilo imperativo para o estilo funcional é um uso direto do método iterador interno `forEach`. É chamado de iterador interno porque o avanço para o próximo elemento é tratado interna e automaticamente, em vez de externa ou explicitamente.

Vamos refatorar o loop para usar o estilo funcional.

Isso foi bastante direto, o loop `for` se transformou em uma chamada ao método `forEach()` na coleção. A cada passo da iteração, a lambda fornecida ao `forEach()` como argumento é invocada com o próximo elemento da coleção.

Uma pequena variação desta iteração, usando `stream()`, é mostrada a seguir.

O método `forEach()` está disponível tanto em uma `Collection<T>` quanto em um `Stream<T>`. Funções como `filter()`, que usaremos em breve, estão disponíveis apenas em um `Stream<T>` e não na `Collection`. Isso é intencional para fornecer eficiência quando múltiplas operações intermediárias podem preceder a operação terminal como `forEach()`, `findFirst()`, etc.

## Selecionando elementos específicos com if

Suponha que, no meio da iteração, queremos selecionar alguns valores da coleção com base em alguma condição. Por exemplo, e se quisermos imprimir apenas nomes com 4 caracteres? No estilo imperativo, poderíamos fazer o seguinte:

Para o estilo funcional, o método `filter` de `Stream` se torna um substituto direto do `if` no estilo imperativo. O método `filter` permitirá que um elemento na coleção passe para a próxima etapa no pipeline funcional se o predicado, passado como uma lambda para o método `filter()`, for avaliado como `true`; caso contrário, o valor é descartado de processamentos futuros.

Vamos converter o código anterior para o estilo funcional:

O método `filter()` age como um portão, ele se abre para deixar alguns elementos passarem e se fecha para rejeitar ou descartar alguns elementos, à medida que a iteração avança.

Vimos nos artigos anteriores o equivalente no estilo funcional para os loops `for` tradicionais. Neste artigo, vimos como o `foreach` no estilo imperativo do Java 5 se transforma em uma sintaxe elegante no estilo funcional. Além disso, a condição `if` dentro de um loop no estilo imperativo se traduz em uma chamada ao método `filter()` da API `Stream`.

## Mapeamentos

Onde quer que você veja um loop `foreach`, use o método `forEach()` diretamente na coleção. Se o corpo do `foreach` tiver uma instrução `if` para selecionar seletivamente algum valor, então use a API `stream()` com a chamada ao método `filter()`.

### Neste tutorial

Iterando com foreach Do Estilo Imperativo para o Funcional Selecionando elementos com if Mapeamentos

Última atualização: 14 de novembro de 2023

**Anterior na Série**

[Convertendo Loops com Passos](<#/doc/tutorials/refactoring-to-functional-style/loopswithsteps>)

➜

**Tutorial Atual**

Convertendo foreach com if

➜

**Próximo na Série**

[Convertendo Iteração com transformação](<#/doc/tutorials/refactoring-to-functional-style/iteartionwithtransformation>)

**Anterior na Série:** [Convertendo Loops com Passos](<#/doc/tutorials/refactoring-to-functional-style/loopswithsteps>)

**Próximo na Série:** [Convertendo Iteração com transformação](<#/doc/tutorials/refactoring-to-functional-style/iteartionwithtransformation>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Refatorando do Estilo Imperativo para o Funcional ](<#/doc/tutorials/refactoring-to-functional-style>) > Convertendo foreach com if