# Depuração em Java

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > Depuração em Java

# Depuração em Java

Esta página foi contribuída por [Jeanne Boyarsky](</author/JeanneBoyarsky>) sob a [UPL](<https://oss.oracle.com/licenses/upl/>)

## O que é depuração?

Todos nós escrevemos código perfeito que funciona na primeira tentativa, certo? Ha! Brincadeira. Frequentemente, temos que encontrar e corrigir erros em nosso código. Esse processo é chamado de depuração.

Você deve estar se perguntando por que é chamado de "debugging" (depuração). O termo se popularizou na década de 1940 depois que a Almirante Grace Hopper encontrou uma mariposa dentro de um computador (lembre-se que os computadores eram gigantes naquela época, então um inseto real poderia entrar). Embora você não precise lidar com animais em seu código, teremos que lidar com erros e problemas que nos referimos como bugs. Você também pode ouvi-los serem chamados de defeitos, embora isso geralmente aconteça depois que você já fez o commit do código. Independentemente do nome do problema, você ainda precisa encontrar esse problema e isso é depuração!

Um debugger é uma ferramenta em sua IDE (ambiente de desenvolvimento integrado) que permite ver os valores de diferentes variáveis em diferentes pontos do programa. É como uma lupa realmente poderosa. Embora alguns detalhes variem entre Eclipse/IntelliJ/NetBeans/VS Code, os conceitos são os mesmos.

Ao executar seu código, você pode optar por iniciá-lo no modo regular/execução ou no modo de depuração. Isso permite que você decida quando deseja depurar.

## Por que não usar Println?

Ao aprender a programar pela primeira vez, frequentemente escrevemos código assim para ver o que está acontecendo:

Não há nada de errado em usar `println` (desde que você não faça o commit). No entanto, pode rapidamente se tornar incontrolável em um programa mais complicado, especialmente se você tiver várias coisas para acompanhar ou muitos loops. Também pode ser difícil de encontrar quando há muitos logs na aplicação. (Usei as estrelas e minhas iniciais para mitigar isso, mas ainda assim pode passar do ponto em que `println` é útil.)

Mesmo que `println()` atenda às suas necessidades no momento, não será para sempre. Aprender a usar um debugger ajuda a evitar o problema de você usar `println` apenas porque é tudo o que você conhece.

## Por que não usar testes de unidade?

Testes de unidade são a escrita de código para testar pequenas partes do código com o clique de um botão. Não há nada de errado com testes de unidade. Testes de unidade são ótimos. Eles documentam o comportamento esperado. Eles informam se um valor inesperado é retornado. Eles ajudam você a entender o comportamento do código. E, às vezes, podem até dar grandes pistas sobre o que está errado com o código. No entanto, eles não dizem o que está acontecendo dentro do código quebrado quando ele não está retornando o valor correto. Para isso, você usa um debugger com o teste de unidade para ver o que está acontecendo dentro do método. E, uma vez que você corrige seu código, os testes de unidade podem ajudar a evitar que novos bugs sejam introduzidos!

## O que é um breakpoint?

Eu implementei (incorretamente) o método mágico. Ele deveria multiplicar seis por sete e obter 42. No entanto, não é isso que acontece. Após (não) muita investigação, estou perplexo e percebo que quero saber quais são os valores de `part1` e `part2` na linha 5.

É para isso que serve um breakpoint. Ele me permite dizer ao debugger para pausar o programa ali e me deixar investigar. Como eu defino um breakpoint, você pergunta? Na barra esquerda perto do seu código, você pode clicar duas vezes (ou clicar com o botão direito e escolher ativar o breakpoint). Um pequeno círculo aparecerá mostrando o breakpoint que eu defini.

É importante executar o programa no modo de depuração para que os breakpoints tenham efeito. (Lembre-se, se você não executar no modo de depuração, todos os breakpoints serão ignorados.) Quando o debugger para na linha 5, vejo que `part2` é o sete que eu esperava. No entanto, `part1` é cinco, não seis. Encontrei o bug! Graças ao debugger que me permitiu definir um breakpoint.

## Como os debuggers podem ser usados?

Existem várias razões pelas quais você pode querer usar um debugger. Três das mais comuns são:

1.  Corrigir código quebrado - O debugger permite que você veja os valores das variáveis enquanto o código é executado. Isso permite que você veja onde ele para de se comportar como esperado.
2.  Entender código desconhecido - Observar os valores de cada variável enquanto o código é executado pode ajudá-lo a entendê-lo melhor.
3.  Rastrear o caminho do código - Ao parar em um breakpoint, o debugger mostra quais classes/métodos foram chamados para chegar até ali. Você pode até clicar neles para ver quais são as variáveis no escopo nesses pontos.

## Fundamentos do Debugger

Existem quatro comandos básicos do debugger para controlar o fluxo de execução assim que o debugger para no seu primeiro breakpoint. Para cada um desses comandos, usaremos a classe `Flow` como exemplo.

1.  Step into (Entrar) - Diz ao programa para executar, mas apenas até a primeira linha da chamada do método. Suponha que eu tenha um breakpoint na linha 7. Quando eu digo ao debugger para "step into", ele vai para a linha 13.
2.  Step over (Passar por cima) - Diz ao programa para executar, mas sem parar em nenhum método. Se eu tiver um breakpoint na linha 7 e disser ao debugger para "step over", o debugger estará então na linha 8. Escolher "step over" novamente levará o debugger para a linha 9.
3.  Step out/return (Sair/Retornar) - Diz ao programa para executar até o final do método e voltar para o chamador. Se eu tiver um breakpoint na linha 13 e escolher "step out" ou "step return", o debugger estará na linha 7 com o resultado da chamada do método. (Step out e step return são a mesma coisa. Diferentes IDEs usam nomes diferentes.)
4.  Resume (Continuar) - Diz ao programa para continuar até atingir outro breakpoint ou ser concluído.

## Técnicas Avançadas

Debuggers possuem muitas técnicas avançadas. Três comuns são:

1.  Breakpoint condicional - Normalmente, o debugger para onde você pediu um breakpoint. Se você estiver em um loop ou tiver uma pista de quais valores acionam o problema, você não vai querer isso. Um breakpoint condicional permite que você adicione um pouco de código Java ao seu breakpoint para que ele pare apenas quando essa condição for verdadeira. Essa abordagem evita ter que pressionar "resume" muitas vezes até chegar ao valor que lhe interessa.
2.  Avaliação - Uma vez que você chega ao seu breakpoint, você pode escrever código Java para determinar o estado das coisas. Por exemplo, você pode chamar métodos nas variáveis disponíveis.
3.  Alteração de dados - Você pode alterar manualmente o valor de uma variável no debugger e deixar o código continuar a ser executado. Ele usará seu novo valor atualizado em vez do original. Isso permite que você explore o impacto de uma possível correção.

## Documentação

Agora que você conhece os conceitos de uso de um debugger, é hora de consultar a documentação da sua IDE! Preste atenção aos atalhos de teclado e onde cada botão está localizado.

1.  [Eclipse](<https://www.eclipse.org/community/eclipse_newsletter/2017/june/article1.php>)
2.  [IntelliJ](<https://www.jetbrains.com/help/idea/debug-your-first-java-application.html>)
3.  [NetBeans](<https://netbeans.apache.org/tutorial/main/kb/docs/java/debug-visual/>)
4.  [VS Code](<https://code.visualstudio.com/docs/java/java-debugging>)

### Neste tutorial

O que é depuração? Por que não usar println? Por que não usar testes de unidade? O que é um breakpoint? Como os debuggers podem ser usados? Fundamentos do debugger Técnicas avançadas Documentação

Última atualização: 5 de novembro de 2023

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > Depuração em Java

[Voltar para a Lista de Tutoriais](<#/doc/tutorials/learn>)