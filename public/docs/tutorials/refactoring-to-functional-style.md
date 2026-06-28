# Refatorando do Estilo Imperativo para o Estilo Funcional

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > Refatorando do Estilo Imperativo para o Estilo Funcional

# Refatorando do Estilo Imperativo para o Estilo Funcional

Esta página foi contribuída por [Venkat Subramaniam](</author/VenkatSubramaniam>) sob a [UPL](<https://oss.oracle.com/licenses/upl/>)

Esta parte do tutorial ajuda você a aprender o equivalente em estilo funcional do código em estilo imperativo que frequentemente encontramos. À medida que você avança em seus projetos, onde quer que faça sentido, você pode mudar o código em estilo imperativo para o código em estilo funcional usando os mapeamentos que você aprende neste tutorial.

Nesta série, abordamos as seguintes conversões do estilo imperativo para o estilo funcional:

Tutorial | Estilo Imperativo | Equivalente em Estilo Funcional
---|---|---
[Convertendo Loops Simples](<#/doc/tutorials/refactoring-to-functional-style/simpleloops>) | `for()` | `range()` ou `rangeClosed()`
[Convertendo Loops com Passos](<#/doc/tutorials/refactoring-to-functional-style/loopswithsteps>) | `for(...i = i + ...)` | `iterate()` com `takeWhile()`
[Convertendo foreach com if](<#/doc/tutorials/refactoring-to-functional-style/foreachwithif>) | `foreach(...) { if... }` | `stream()` com `filter()`
[Convertendo Iteração com transformação](<#/doc/tutorials/refactoring-to-functional-style/iteartionwithtransformation>) | `foreach(...) { ...transformation... }` | `stream()` com `map()`
[Convertendo para Streams](<#/doc/tutorials/refactoring-to-functional-style/convertingtostreams>) | `Operação de leitura de arquivo` | `Files.lines()`

1.  [Convertendo Loops Simples](<#/doc/tutorials/refactoring-to-functional-style/simpleloops>)

    Convertendo Loops Imperativos Simples para o Estilo Funcional.

2.  [Convertendo Loops com Passos](<#/doc/tutorials/refactoring-to-functional-style/loopswithsteps>)

    Convertendo Loops Imperativos com Passos para o Estilo Funcional.

3.  [Convertendo foreach com if](<#/doc/tutorials/refactoring-to-functional-style/foreachwithif>)

    Convertendo Iteração Imperativa usando foreach com if para o Estilo Funcional.

4.  [Convertendo Iteração com transformação](<#/doc/tutorials/refactoring-to-functional-style/iteartionwithtransformation>)

    Convertendo Iteração Imperativa com transformação para o Estilo Funcional.

5.  [Convertendo Fontes de Dados para Streams](<#/doc/tutorials/refactoring-to-functional-style/convertingtostreams>)

    Convertendo Fontes de Dados para Streams.

[Voltar para a Lista de Tutoriais](<#/doc/tutorials/learn>)