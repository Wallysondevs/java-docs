# Expressões

[Java SE](<https://docs.oracle.com/en/java/javase/25/>) > [Java SE Specifications](<#/>) > [Java Language Specification](<#/doc/jls/jls-01>)

Capítulo 15. Expressões  
---  
[Prev](<#/doc/jls/jls-14>)  |   |  [Next](<#/doc/jls/jls-16>)  
  
* * *

# Capítulo 15. Expressões 

**Sumário**

[15.1. Avaliação, Denotação e Resultado](<#/doc/jls/jls-15>)
[15.2. Formas de Expressões](<#/doc/jls/jls-15>)
[15.3. Tipo de uma Expressão](<#/doc/jls/jls-15>)
[15.4. Expressões de Ponto Flutuante](<#/doc/jls/jls-15>)
[15.5. Expressões e Verificações em Tempo de Execução](<#/doc/jls/jls-15>)
[15.6. Conclusão Normal e Abrupta da Avaliação](<#/doc/jls/jls-15>)
[15.7. Ordem de Avaliação](<#/doc/jls/jls-15>)
    

[15.7.1. Avaliar Primeiro o Operando da Esquerda](<#/doc/jls/jls-15>)
[15.7.2. Avaliar Operandos Antes da Operação](<#/doc/jls/jls-15>)
[15.7.3. A Avaliação Respeita Parênteses e Precedência](<#/doc/jls/jls-15>)
[15.7.4. Listas de Argumentos são Avaliadas da Esquerda para a Direita](<#/doc/jls/jls-15>)
[15.7.5. Ordem de Avaliação para Outras Expressões](<#/doc/jls/jls-15>)
[15.8. Expressões Primárias](<#/doc/jls/jls-15>)
    

[15.8.1. Literais Léxicos](<#/doc/jls/jls-15>)
[15.8.2. Literais de Classe](<#/doc/jls/jls-15>)
[15.8.3. `this`](<#/doc/jls/jls-15>)
[15.8.4. `this` Qualificado](<#/doc/jls/jls-15>)
[15.8.5. Expressões Entre Parênteses](<#/doc/jls/jls-15>)
[15.9. Expressões de Criação de Instância de Classe](<#/doc/jls/jls-15>)
    

[15.9.1. Determinando a Classe Sendo Instanciada](<#/doc/jls/jls-15>)
[15.9.2. Determinando Instâncias Envolventes](<#/doc/jls/jls-15>)
[15.9.3. Escolhendo o Construtor e Seus Argumentos](<#/doc/jls/jls-15>)
[15.9.4. Avaliação em Tempo de Execução de Expressões de Criação de Instância de Classe](<#/doc/jls/jls-15>)
[15.9.5. Declarações de Classe Anônima](<#/doc/jls/jls-15>)
    

[15.9.5.1. Construtores Anônimos](<#/doc/jls/jls-15>)
[15.10. Expressões de Criação e Acesso a Arrays](<#/doc/jls/jls-15>)
    

[15.10.1. Expressões de Criação de Array](<#/doc/jls/jls-15>)
[15.10.2. Avaliação em Tempo de Execução de Expressões de Criação de Array](<#/doc/jls/jls-15>)
[15.10.3. Expressões de Acesso a Array](<#/doc/jls/jls-15>)
[15.10.4. Avaliação em Tempo de Execução de Expressões de Acesso a Array](<#/doc/jls/jls-15>)
[15.11. Expressões de Acesso a Campo](<#/doc/jls/jls-15>)
    

[15.11.1. Acesso a Campo Usando um Primário](<#/doc/jls/jls-15>)
[15.11.2. Acessando Membros da Superclasse usando `super`](<#/doc/jls/jls-15>)
[15.12. Expressões de Invocação de Método](<#/doc/jls/jls-15>)
    

[15.12.1. Etapa 1 em Tempo de Compilação: Determinar Tipo a Pesquisar](<#/doc/jls/jls-15>)
[15.12.2. Etapa 2 em Tempo de Compilação: Determinar Assinatura do Método](<#/doc/jls/jls-15>)
    

[15.12.2.1. Identificar Métodos Potencialmente Aplicáveis](<#/doc/jls/jls-15>)
[15.12.2.2. Fase 1: Identificar Métodos de Aridade Correspondente Aplicáveis por Invocação Estrita](<#/doc/jls/jls-15>)
[15.12.2.3. Fase 2: Identificar Métodos de Aridade Correspondente Aplicáveis por Invocação Flexível](<#/doc/jls/jls-15>)
[15.12.2.4. Fase 3: Identificar Métodos Aplicáveis por Invocação de Aridade Variável](<#/doc/jls/jls-15>)
[15.12.2.5. Escolhendo o Método Mais Específico](<#/doc/jls/jls-15>)
[15.12.2.6. Tipo de Invocação de Método](<#/doc/jls/jls-15>)
[15.12.3. Etapa 3 em Tempo de Compilação: O Método Escolhido é Apropriado?](<#/doc/jls/jls-15>)
[15.12.4. Avaliação em Tempo de Execução de Invocação de Método](<#/doc/jls/jls-15>)
    

[15.12.4.1. Calcular Referência Alvo (Se Necessário)](<#/doc/jls/jls-15>)
[15.12.4.2. Avaliar Argumentos](<#/doc/jls/jls-15>)
[15.12.4.3. Verificar Acessibilidade de Tipo e Método](<#/doc/jls/jls-15>)
[15.12.4.4. Localizar Método a Invocar](<#/doc/jls/jls-15>)
[15.12.4.5. Criar Frame, Sincronizar, Transferir Controle](<#/doc/jls/jls-15>)
[15.13. Expressões de Referência de Método](<#/doc/jls/jls-15>)
    

[15.13.1. Declaração em Tempo de Compilação de uma Referência de Método](<#/doc/jls/jls-15>)
[15.13.2. Tipo de uma Referência de Método](<#/doc/jls/jls-15>)
[15.13.3. Avaliação em Tempo de Execução de Referências de Método](<#/doc/jls/jls-15>)
[15.14. Expressões Pós-fixas](<#/doc/jls/jls-15>)
    

[15.14.1. Nomes de Expressão](<#/doc/jls/jls-15>)
[15.14.2. Operador de Incremento Pós-fixo `++`](<#/doc/jls/jls-15>)
[15.14.3. Operador de Decremento Pós-fixo `--`](<#/doc/jls/jls-15>)
[15.15. Operadores Unários](<#/doc/jls/jls-15>)
    

[15.15.1. Operador de Incremento Pré-fixo `++`](<#/doc/jls/jls-15>)
[15.15.2. Operador de Decremento Pré-fixo `--`](<#/doc/jls/jls-15>)
[15.15.3. Operador Unário de Mais `+`](<#/doc/jls/jls-15>)
[15.15.4. Operador Unário de Menos `-`](<#/doc/jls/jls-15>)
[15.15.5. Operador de Complemento Bit a Bit `~`](<#/doc/jls/jls-15>)
[15.15.6. Operador de Complemento Lógico `!`](<#/doc/jls/jls-15>)
[15.16. Expressões de Cast](<#/doc/jls/jls-15>)
[15.17. Operadores Multiplicativos](<#/doc/jls/jls-15>)
    

[15.17.1. Operador de Multiplicação `*`](<#/doc/jls/jls-15>)
[15.17.2. Operador de Divisão `/`](<#/doc/jls/jls-15>)
[15.17.3. Operador de Resto `%`](<#/doc/jls/jls-15>)
[15.18. Operadores Aditivos](<#/doc/jls/jls-15>)
    

[15.18.1. Operador de Concatenação de String `+`](<#/doc/jls/jls-15>)
[15.18.2. Operadores Aditivos (`+` e `-`) para Tipos Numéricos](<#/doc/jls/jls-15>)
[15.19. Operadores de Deslocamento](<#/doc/jls/jls-15>)
[15.20. Operadores Relacionais](<#/doc/jls/jls-15>)
    

[15.20.1. Operadores de Comparação Numérica `<`, `<=`, `>`, e `>=`](<#/doc/jls/jls-15>)
[15.20.2. O Operador `instanceof`](<#/doc/jls/jls-15>)
[15.21. Operadores de Igualdade](<#/doc/jls/jls-15>)
    

[15.21.1. Operadores de Igualdade Numérica `==` e `!=`](<#/doc/jls/jls-15>)
[15.21.2. Operadores de Igualdade Booleana `==` e `!=`](<#/doc/jls/jls-15>)
[15.21.3. Operadores de Igualdade de Referência `==` e `!=`](<#/doc/jls/jls-15>)
[15.22. Operadores Bit a Bit e Lógicos](<#/doc/jls/jls-15>)
    

[15.22.1. Operadores Bit a Bit Inteiros `&`, `^`, e `|`](<#/doc/jls/jls-15>)
[15.22.2. Operadores Lógicos Booleanos `&`, `^`, e `|`](<#/doc/jls/jls-15>)
[15.23. Operador Condicional-E `&&`](<#/doc/jls/jls-15>)
[15.24. Operador Condicional-Ou `||`](<#/doc/jls/jls-15>)
[15.25. Operador Condicional `? :`](<#/doc/jls/jls-15>)
    

[15.25.1. Expressões Condicionais Booleanas](<#/doc/jls/jls-15>)
[15.25.2. Expressões Condicionais Numéricas](<#/doc/jls/jls-15>)
[15.25.3. Expressões Condicionais de Referência](<#/doc/jls/jls-15>)
[15.26. Operadores de Atribuição](<#/doc/jls/jls-15>)
    

[15.26.1. Operador de Atribuição Simples `=`](<#/doc/jls/jls-15>)
[15.26.2. Operadores de Atribuição Composta](<#/doc/jls/jls-15>)
[15.27. Expressões Lambda](<#/doc/jls/jls-15>)
    

[15.27.1. Parâmetros Lambda](<#/doc/jls/jls-15>)
[15.27.2. Corpo Lambda](<#/doc/jls/jls-15>)
[15.27.3. Tipo de uma Expressão Lambda](<#/doc/jls/jls-15>)
[15.27.4. Avaliação em Tempo de Execução de Expressões Lambda](<#/doc/jls/jls-15>)
[15.28. Expressões `switch`](<#/doc/jls/jls-15>)
    

[15.28.1. O Bloco `switch` de uma Expressão `switch`](<#/doc/jls/jls-15>)
[15.28.2. Avaliação em Tempo de Execução de Expressões `switch`](<#/doc/jls/jls-15>)
[15.29. Expressões Constantes](<#/doc/jls/jls-15>)

Grande parte do trabalho em um programa é feita pela avaliação de _expressões_, seja por seus efeitos colaterais, como atribuições a variáveis, ou por seus valores, que podem ser usados como argumentos ou operandos em expressões maiores, ou para afetar a sequência de execução em instruções, ou ambos. 

Este capítulo especifica os significados das expressões e as regras para sua avaliação. 

## 15.1. Avaliação, Denotação e Resultado 

Quando uma expressão em um programa é _avaliada_ (_executada_), o resultado denota uma de três coisas: 

  * Uma variável ([§4.12](<#/doc/jls/jls-04>)) (em C, isso seria chamado de um _lvalue_) 

  * Um valor ([§4.2](<#/doc/jls/jls-04>), [§4.3](<#/doc/jls/jls-04>)) 

  * Nada (a expressão é dita ser `void`) 




Se uma expressão denota uma variável, e um valor é necessário para uso em avaliações futuras, então o valor dessa variável é usado. Neste contexto, se a expressão denota uma variável ou um valor, podemos simplesmente falar do _valor_ da expressão. 

Uma expressão não denota nada se e somente se for uma invocação de método ([§15.12](<#/doc/jls/jls-15>)) que invoca um método que não retorna um valor, ou seja, um método declarado `void` ([§8.4](<#/doc/jls/jls-08>)). Tal expressão pode ser usada apenas como uma instrução de expressão ([§14.8](<#/doc/jls/jls-14>)) ou como a única expressão de um corpo lambda ([§15.27.2](<#/doc/jls/jls-15>)), porque todos os outros contextos em que uma expressão pode aparecer exigem que a expressão denote algo. Uma instrução de expressão ou corpo lambda que é uma invocação de método também pode invocar um método que produz um resultado; neste caso, o valor retornado pelo método é silenciosamente descartado. 

A avaliação de uma expressão pode produzir efeitos colaterais, porque as expressões podem conter atribuições embutidas, operadores de incremento, operadores de decremento, invocações de método e, em expressões `switch`, instruções arbitrárias. 

Uma expressão ocorre em um dos seguintes casos: 

  * A declaração de alguma classe ou interface que está sendo declarada: em um inicializador de campo, em um inicializador estático, em um inicializador de instância, em uma declaração de construtor, em uma declaração de método ou em uma anotação. 

  * Uma anotação na declaração de um módulo, um pacote ou uma classe ou interface de nível superior. 




## 15.2. Formas de Expressões 

As expressões podem ser amplamente categorizadas em uma das seguintes formas sintáticas: 

  * Nomes de expressão ([§6.5.6](<#/doc/jls/jls-06>)) 

  * Expressões primárias ([§15.8](<#/doc/jls/jls-15>) - [§15.13](<#/doc/jls/jls-15>)) 

  * Expressões de operador unário ([§15.14](<#/doc/jls/jls-15>) - [§15.16](<#/doc/jls/jls-15>)) 

  * Expressões de operador binário ([§15.17](<#/doc/jls/jls-15>) - [§15.24](<#/doc/jls/jls-15>), e [§15.26](<#/doc/jls/jls-15>)) 

  * Expressões de operador ternário ([§15.25](<#/doc/jls/jls-15>)) 

  * Expressões lambda ([§15.27](<#/doc/jls/jls-15>)) 

  * Expressões `switch` ([§15.28](<#/doc/jls/jls-15>)) 




A precedência entre operadores é gerenciada por uma hierarquia de produções gramaticais. O operador de menor precedência é a seta de uma expressão lambda (`->`), seguido pelos operadores de atribuição. Assim, todas as expressões são sintaticamente incluídas nos não-terminais _LambdaExpression_ e _AssignmentExpression_: 

Expression:

[LambdaExpression](<#/doc/jls/jls-15>)   
[AssignmentExpression](<#/doc/jls/jls-15>)

Quando algumas expressões aparecem em certos contextos, elas são consideradas _poly expressions_. As seguintes formas de expressões podem ser poly expressions: 

  * Expressões entre parênteses ([§15.8.5](<#/doc/jls/jls-15>)) 

  * Expressões de criação de instância de classe ([§15.9](<#/doc/jls/jls-15>)) 

  * Expressões de invocação de método ([§15.12](<#/doc/jls/jls-15>)) 

  * Expressões de referência de método ([§15.13](<#/doc/jls/jls-15>)) 

  * Expressões condicionais ([§15.25](<#/doc/jls/jls-15>)) 

  * Expressões lambda ([§15.27](<#/doc/jls/jls-15>)) 

  * Expressões `switch` ([§15.28](<#/doc/jls/jls-15>)) 




As regras que determinam se uma expressão de uma dessas formas é uma poly expression são dadas nas seções individuais que especificam essas formas de expressões. 

Expressões que não são poly expressions são _standalone expressions_. Standalone expressions são expressões das formas acima quando determinado que não são poly expressions, bem como todas as expressões de todas as outras formas. Expressões de todas as outras formas são ditas ter uma _forma standalone_. 

Algumas expressões têm um valor que pode ser determinado em tempo de compilação. Estas são _constant expressions_ ([§15.29](<#/doc/jls/jls-15>)). 

## 15.3. Tipo de uma Expressão 

Se uma expressão denota uma variável ou um valor, então a expressão tem um tipo conhecido em tempo de compilação. O tipo de uma standalone expression pode ser determinado inteiramente a partir do conteúdo da expressão; em contraste, o tipo de uma poly expression pode ser influenciado pelo tipo alvo da expressão ([§5 (_Conversões e Contextos_)](<#/doc/jls/jls-05>)). As regras para determinar o tipo de uma expressão são explicadas separadamente abaixo para cada tipo de expressão. 

O valor de uma expressão é compatível com atribuição ([§5.2](<#/doc/jls/jls-05>)) com o tipo da expressão, a menos que ocorra poluição de heap ([§4.12.2](<#/doc/jls/jls-04>)). 

Da mesma forma, o valor armazenado em uma variável é sempre compatível com o tipo da variável, a menos que ocorra poluição de heap. 

Em outras palavras, o valor de uma expressão cujo tipo é T é sempre adequado para atribuição a uma variável do tipo T. 

Note que se o tipo de uma expressão é um tipo de classe que nomeia a classe C, então a declaração da classe C como `final` ou `sealed` ([§8.1.1.2](<#/doc/jls/jls-08>)) tem implicações para o valor da expressão: 

  * Se C é `final`, então a expressão tem garantidamente um valor que é (i) a referência `null`, ou (ii) um objeto cuja classe é a própria C, porque classes `final` não têm subclasses. 

  * Se C é `sealed`, então a expressão tem garantidamente um valor que é (i) a referência `null`, (ii) um objeto cuja classe é a própria C, ou (iii) compatível com atribuição com uma das subclasses diretas permitidas de C ([§8.1.6](<#/doc/jls/jls-08>)). 

  * Se C é livremente extensível, então a expressão tem garantidamente um valor que é (i) a referência `null`, (ii) um objeto cuja classe é a própria C, ou (iii) compatível com atribuição com C. 




## 15.4. Expressões de Ponto Flutuante 

Uma expressão de ponto flutuante é uma expressão cujo tipo é `float` ou `double` ([§4.2.3](<#/doc/jls/jls-04>)). Expressões de ponto flutuante do tipo `float` denotam valores que correspondem exatamente aos valores representáveis no formato IEEE 754 binary32 de 32 bits. Expressões de ponto flutuante do tipo `double` denotam valores que correspondem exatamente aos valores representáveis no formato IEEE 754 binary64 de 64 bits. 

Muitos dos operadores de comparação e numéricos da linguagem de programação Java que podem ser usados para formar expressões de ponto flutuante correspondem às operações IEEE 754, assim como as conversões que atuam em valores de ponto flutuante ([Tabela 15.4-A](<#/doc/jls/jls-15>)). 

**Tabela 15.4-A. Correspondência com operações IEEE 754**

Operador/Conversão | Operação IEEE 754  
---|---  
Os operadores de comparação numérica `<`, `<=`, `>`, e `>=` ([§15.20.1](<#/doc/jls/jls-15>))  | compareQuietLess, compareQuietLessEqual, compareQuietGreater, compareQuietGreaterEqual   
Os operadores de igualdade numérica `==` e `!=` ([§15.21.1](<#/doc/jls/jls-15>))  | compareQuietEqual, compareQuietNotEqual  
O operador unário de menos `-` ([§15.15.4](<#/doc/jls/jls-15>))  | negate  
Os operadores multiplicativos `*` e `/` ([§15.17.1](<#/doc/jls/jls-15>), [§15.17.2](<#/doc/jls/jls-15>))  | multiplication, division  
Os operadores aditivos `+` e `-` ([§15.18.2](<#/doc/jls/jls-15>))  | addition, subtraction  
Conversão primitiva de ampliação de um tipo integral ([§5.1.2](<#/doc/jls/jls-05>))  | convertFromInt  
Conversão primitiva de estreitamento para um tipo integral ([§5.1.3](<#/doc/jls/jls-05>))  | convertToIntegerTowardZero  
Conversão entre `float` e `double` | convertFormat  
  
  


O operador de resto de ponto flutuante `%` ([§15.17.3](<#/doc/jls/jls-15>)) não corresponde à operação de resto IEEE 754. 

Algumas operações IEEE 754 sem operadores correspondentes na linguagem de programação Java são fornecidas por meio de métodos nas classes `Math` e `StrictMath`, incluindo o método `sqrt` para a operação squareRoot IEEE 754, o método `fma` para a operação fusedMultiplyAdd IEEE 754, e o método `IEEEremainder` para a operação de resto IEEE 754. 

A linguagem de programação Java exige suporte a números de ponto flutuante _subnormais_ IEEE 754 e _gradual underflow_, o que facilita a prova de propriedades desejáveis de algoritmos numéricos específicos. As operações de ponto flutuante não "descartam para zero" se o resultado calculado for um número subnormal. 

O resultado de um operador de ponto flutuante da linguagem de programação Java deve corresponder ao resultado da operação IEEE 754 correspondente nos mesmos operandos. Para resultados finitos, isso implica que o sinal, a mantissa e o expoente do resultado de ponto flutuante devem ser todos aqueles especificados pelo IEEE 754. 

A exigência de correspondência de sinal, mantissa e expoente impede algumas transformações que poderiam ser permitidas se o comportamento de ponto flutuante fosse menos precisamente especificado. Por exemplo, `-x` geralmente não pode ser substituído por `(0.0 - x)` porque o sinal do resultado será diferente se `x` for `-0.0`. Além disso, outras transformações que podem alterar o valor, como substituir `(a * b + c)` por uma chamada a um método de biblioteca de multiplicação-acumulação fundida, não são permitidas a menos que o resultado possa ser provado ser idêntico. 

Não há circunstâncias em que a avaliação de uma expressão de ponto flutuante possa usar resultados intermediários que tenham mais precisão ou mais faixa de expoente do que o indicado pelo tipo da expressão. 

Uma operação de ponto flutuante que estoura (overflow) produz um infinito com sinal. 

Uma operação de ponto flutuante que subflui (underflow) produz um valor subnormal ou um zero com sinal. 

Uma operação de ponto flutuante que não tem um resultado matematicamente definido único produz NaN. 

Todas as operações numéricas com NaN como operando produzem NaN como resultado. 

Como NaN não é ordenado, qualquer operação de comparação numérica envolvendo um ou dois NaNs retorna `false`, qualquer comparação `==` envolvendo NaN retorna `false`, e qualquer comparação `!=` envolvendo NaN retorna `true`. 

A aritmética de ponto flutuante é uma aproximação da aritmética real. Embora existam infinitos números reais, um formato de ponto flutuante específico possui apenas um número finito de valores. Na linguagem de programação Java, uma _política de arredondamento_ é uma função usada para mapear um número real para um valor de ponto flutuante em um determinado formato. Para números reais na faixa representável de um formato de ponto flutuante, um segmento contínuo da linha de números reais é mapeado para um único valor de ponto flutuante. O número real cujo valor é numericamente igual a um valor de ponto flutuante é mapeado para esse valor de ponto flutuante; por exemplo, o número real 1.5 é mapeado para o valor de ponto flutuante 1.5 em um determinado formato. A linguagem de programação Java define duas políticas de arredondamento, como segue: 

  * A política de arredondamento _round to nearest_ se aplica a todos os operadores de ponto flutuante, exceto (i) conversão para um valor inteiro e (ii) resto de ponto flutuante. Sob a política de arredondamento round to nearest, resultados inexatos devem ser arredondados para o valor representável mais próximo do resultado infinitamente preciso; se os dois valores representáveis mais próximos estiverem igualmente próximos, então o valor cujo bit menos significativo é zero é escolhido. 

A política de arredondamento round to nearest corresponde ao atributo de direção de arredondamento padrão para aritmética binária no IEEE 754, _roundTiesToEven_. 

O atributo de direção de arredondamento _roundTiesToEven_ era conhecido como o modo de arredondamento "round to nearest" na versão de 1985 do Padrão IEEE 754. A política de arredondamento na linguagem de programação Java é nomeada em homenagem a este modo de arredondamento. 

  * A política de arredondamento _round toward zero_ se aplica a (i) conversão de um valor de ponto flutuante para um valor inteiro ([§5.1.3](<#/doc/jls/jls-05>)) e (ii) resto de ponto flutuante ([§15.17.3](<#/doc/jls/jls-15>)). Sob a política de arredondamento round toward zero, resultados inexatos são arredondados para o valor representável mais próximo que não é maior em magnitude do que o resultado infinitamente preciso. Para conversão para inteiro, a política de arredondamento round toward zero é equivalente ao truncamento onde os bits fracionários da mantissa são descartados. 

A política de arredondamento round toward zero corresponde ao atributo de direção de arredondamento _roundTowardZero_ para aritmética binária no IEEE 754. 

O atributo de direção de arredondamento _roundTowardZero_ era conhecido como o modo de arredondamento "round toward zero" na versão de 1985 do Padrão IEEE 754. A política de arredondamento na linguagem de programação Java é nomeada em homenagem a este modo de arredondamento. 




A linguagem de programação Java exige que cada operador de ponto flutuante arredonde seu resultado de ponto flutuante para a precisão do resultado. A política de arredondamento usada para cada operador de ponto flutuante é round to nearest ou round toward zero, conforme especificado acima. 

Java 1.0 e 1.1 exigiam avaliação _estrita_ de expressões de ponto flutuante. Avaliação estrita significa que cada operando `float` corresponde a um valor representável no formato IEEE 754 binary32, cada operando `double` corresponde a um valor representável no formato IEEE 754 binary64, e cada operador de ponto flutuante com uma operação IEEE 754 correspondente corresponde ao resultado IEEE 754 para os mesmos operandos. 

A avaliação estrita fornece resultados previsíveis, mas causou problemas de desempenho nas implementações da Java Virtual Machine para algumas famílias de processadores comuns na era Java 1.0/1.1. Consequentemente, no Java 1.2 até o Java SE 16, a Plataforma Java SE permitiu que uma implementação da Java Virtual Machine tivesse um ou dois _conjuntos de valores_ associados a cada tipo de ponto flutuante. O tipo `float` foi associado ao _conjunto de valores float_ e ao _conjunto de valores float com expoente estendido_, enquanto o tipo `double` foi associado ao _conjunto de valores double_ e ao _conjunto de valores double com expoente estendido_. O conjunto de valores float correspondia aos valores representáveis no formato IEEE 754 binary32; o conjunto de valores float com expoente estendido tinha o mesmo número de bits de precisão, mas uma faixa de expoente maior. Similarmente, o conjunto de valores double correspondia aos valores representáveis no formato IEEE 754 binary64; o conjunto de valores double com expoente estendido tinha o mesmo número de bits de precisão, mas uma faixa de expoente maior. Permitir o uso dos conjuntos de valores com expoente estendido por padrão amenizou os problemas de desempenho em algumas famílias de processadores. 

Para compatibilidade, o Java 1.2 permitiu que o programador proibisse uma implementação de usar os conjuntos de valores com expoente estendido. O programador expressava isso colocando o modificador `strictfp` na declaração de uma classe, interface ou método. `strictfp` restringia a semântica de ponto flutuante de quaisquer expressões contidas para usar o conjunto de valores float para expressões `float` e o conjunto de valores double para expressões `double`, garantindo que os resultados de tais expressões fossem totalmente previsíveis. O código modificado por `strictfp` tinha, portanto, a mesma semântica de ponto flutuante especificada no Java 1.0 e 1.1. 

No Java SE 17 e posterior, a Plataforma Java SE sempre exige avaliação estrita de expressões de ponto flutuante. Membros mais recentes das famílias de processadores que tinham problemas de desempenho ao implementar a avaliação estrita não têm mais essa dificuldade. Esta especificação não associa mais `float` e `double` aos quatro conjuntos de valores descritos acima, e o modificador `strictfp` não afeta mais a avaliação de expressões de ponto flutuante. Para compatibilidade, `strictfp` permanece uma palavra-chave no Java SE 25 ([§3.8](<#/doc/jls/jls-03>)) e continua a ter restrições em seu uso ([§8.4.3](<#/doc/jls/jls-08>), [§9.4](<#/doc/jls/jls-09>)), embora os compiladores Java sejam encorajados a alertar o programador sobre seu status obsoleto. Futuras versões da linguagem de programação Java podem redefinir ou remover a palavra-chave `strictfp`. 

## 15.5. Expressões e Verificações em Tempo de Execução

Se o tipo de uma expressão é um tipo primitivo, então o valor da expressão é desse mesmo tipo primitivo.

Se o tipo de uma expressão é um tipo de referência, então a classe do objeto referenciado, ou mesmo se o valor é uma referência a um objeto em vez de `null`, não é necessariamente conhecida em tempo de compilação. Existem alguns lugares na linguagem de programação Java onde a classe real de um objeto referenciado afeta a execução do programa de uma maneira que não pode ser deduzida do tipo da expressão. São eles:

  * Invocação de método ([§15.12](<#/doc/jls/jls-15>)). O método particular usado para uma invocação `o.m(...)` é escolhido com base nos métodos que fazem parte da classe ou interface que é o tipo de `o`. Para métodos de instância, a classe do objeto referenciado pelo valor em tempo de execução de `o` participa porque uma subclasse pode sobrescrever um método específico já declarado em uma classe pai, de modo que este método sobrescrito seja invocado. (O método sobrescrito pode ou não optar por invocar ainda mais o método `m` original sobrescrito.)

  * O operador `instanceof` ([§15.20.2](<#/doc/jls/jls-15>)). Uma expressão cujo tipo é um tipo de referência pode ser testada usando `instanceof` para descobrir se a classe do objeto referenciado pelo valor em tempo de execução da expressão pode ser convertida para algum outro tipo de referência.

  * Conversão de tipo (Casting) ([§15.16](<#/doc/jls/jls-15>)). A classe do objeto referenciado pelo valor em tempo de execução da expressão operando pode não ser compatível com o tipo especificado pelo operador de cast. Para tipos de referência, isso pode exigir uma verificação em tempo de execução que lança uma exceção se a classe do objeto referenciado, conforme determinado em tempo de execução, não puder ser convertida para o tipo de destino.

  * Atribuição a um componente de array de tipo de referência ([§10.5](<#/doc/jls/jls-10>), [§15.13](<#/doc/jls/jls-15>), [§15.26.1](<#/doc/jls/jls-15>)). As regras de verificação de tipo permitem que o tipo de array S`[]` seja tratado como um subtipo de T`[]` se S for um subtipo de T, mas isso requer uma verificação em tempo de execução para atribuição a um componente de array, semelhante à verificação realizada para um cast.

  * Tratamento de exceções ([§14.20](<#/doc/jls/jls-14>)). Uma exceção é capturada por uma cláusula `catch` somente se a classe do objeto de exceção lançado for uma `instanceof` do tipo do parâmetro formal da cláusula `catch`.

Situações em que a classe de um objeto não é conhecida estaticamente podem levar a erros de tipo em tempo de execução.

Além disso, há situações em que o tipo conhecido estaticamente pode não ser preciso em tempo de execução. Tais situações podem surgir em um programa que gera avisos de compilação não verificados (unchecked warnings). Tais avisos são dados em resposta a operações que não podem ser garantidas estaticamente como seguras, e não podem ser imediatamente submetidas a verificação dinâmica porque envolvem tipos não reificáveis ([§4.7](<#/doc/jls/jls-04>)). Como resultado, verificações dinâmicas mais tarde no curso da execução do programa podem detectar inconsistências e resultar em erros de tipo em tempo de execução.

Um erro de tipo em tempo de execução pode ocorrer apenas nestas situações:

  * Em um cast, quando a classe real do objeto referenciado pelo valor da expressão operando não é compatível com o tipo de destino especificado pelo operador de cast ([§5.5](<#/doc/jls/jls-05>), [§15.16](<#/doc/jls/jls-15>)); neste caso, uma `ClassCastException` é lançada.

  * Em um cast gerado automaticamente introduzido para garantir a validade de uma operação em um tipo não reificável ([§4.7](<#/doc/jls/jls-04>)).

  * Em uma atribuição a um componente de array de tipo de referência, quando a classe real do objeto referenciado pelo valor a ser atribuído não é compatível com o tipo de componente real em tempo de execução do array ([§10.5](<#/doc/jls/jls-10>), [§15.13](<#/doc/jls/jls-15>), [§15.26.1](<#/doc/jls/jls-15>)); neste caso, uma `ArrayStoreException` é lançada.

  * Quando uma exceção não é capturada por nenhuma cláusula `catch` de uma instrução `try` ([§14.20](<#/doc/jls/jls-14>)); neste caso, o thread de controle que encontrou a exceção primeiro tenta invocar um manipulador de exceção não capturada ([§11.3](<#/doc/jls/jls-11>)) e então termina.

## 15.6. Conclusão Normal e Abrupta da Avaliação

Toda expressão tem um modo normal de avaliação no qual certas etapas computacionais são realizadas. As seções a seguir descrevem o modo normal de avaliação para cada tipo de expressão.

Se todas as etapas forem realizadas sem que uma exceção seja lançada, diz-se que a expressão _completa normalmente_.

Se, no entanto, a avaliação de uma expressão lança uma exceção, então diz-se que a expressão _completa abruptamente_. Uma conclusão abrupta sempre tem uma razão associada, que é sempre um `throw` com um determinado valor.

Exceções em tempo de execução são lançadas pelos operadores predefinidos da seguinte forma:

  * Uma expressão de criação de instância de classe ([§15.9.4](<#/doc/jls/jls-15>)), expressão de criação de array ([§15.10.2](<#/doc/jls/jls-15>)), expressão de referência de método ([§15.13.3](<#/doc/jls/jls-15>)), expressão de inicializador de array ([§10.6](<#/doc/jls/jls-10>)), expressão de operador de concatenação de string ([§15.18.1](<#/doc/jls/jls-15>)), ou expressão lambda ([§15.27.4](<#/doc/jls/jls-15>)) lança um `OutOfMemoryError` se não houver memória suficiente disponível.

  * Uma expressão de criação de array ([§15.10.2](<#/doc/jls/jls-15>)) lança uma `NegativeArraySizeException` se o valor de qualquer expressão de dimensão for menor que zero.

  * Uma expressão de acesso a array ([§15.10.4](<#/doc/jls/jls-15>)) lança uma `NullPointerException` se o valor da expressão de referência de array for `null`.

  * Uma expressão de acesso a array ([§15.10.4](<#/doc/jls/jls-15>)) lança uma `ArrayIndexOutOfBoundsException` se o valor da expressão de índice de array for negativo ou maior ou igual ao `length` do array.

  * Uma expressão de acesso a campo ([§15.11](<#/doc/jls/jls-15>)) lança uma `NullPointerException` se o valor da expressão de referência de objeto for `null`.

  * Uma expressão de invocação de método ([§15.12](<#/doc/jls/jls-15>)) que invoca um método de instância lança uma `NullPointerException` se a referência de destino for `null`.

  * Uma expressão de cast ([§15.16](<#/doc/jls/jls-15>)) lança uma `ClassCastException` se um cast for considerado impermissível em tempo de execução.

  * Um operador de divisão inteira ([§15.17.2](<#/doc/jls/jls-15>)) ou de resto inteiro ([§15.17.3](<#/doc/jls/jls-15>)) lança uma `ArithmeticException` se o valor da expressão do operando da direita for zero.

  * Uma atribuição a um componente de array de tipo de referência ([§15.26.1](<#/doc/jls/jls-15>)), uma expressão de invocação de método ([§15.12](<#/doc/jls/jls-15>)), ou um operador de incremento prefixado ou posfixado ([§15.14.2](<#/doc/jls/jls-15>), [§15.15.1](<#/doc/jls/jls-15>)) ou decremento ([§15.14.3](<#/doc/jls/jls-15>), [§15.15.2](<#/doc/jls/jls-15>)) podem todos lançar um `OutOfMemoryError` como resultado da conversão boxing ([§5.1.7](<#/doc/jls/jls-05>)).

  * Uma atribuição a um componente de array de tipo de referência ([§15.26.1](<#/doc/jls/jls-15>)) lança uma `ArrayStoreException` quando o valor a ser atribuído não é compatível com o tipo de componente do array ([§10.5](<#/doc/jls/jls-10>)).

  * Uma expressão `switch` ([§15.28](<#/doc/jls/jls-15>)) ou instrução `switch` aprimorada ([§14.11.2](<#/doc/jls/jls-14>)) lança uma `MatchException` se nenhum rótulo `switch` se aplica ao valor da expressão seletora.

Uma expressão de invocação de método também pode resultar no lançamento de uma exceção se ocorrer uma exceção que faça com que a execução do corpo do método seja concluída abruptamente.

Uma expressão de criação de instância de classe também pode resultar no lançamento de uma exceção se ocorrer uma exceção que faça com que a execução do construtor seja concluída abruptamente.

Vários erros de vinculação e de máquina virtual também podem ocorrer durante a avaliação de uma expressão. Por sua natureza, tais erros são difíceis de prever e difíceis de tratar.

Se uma exceção ocorre, então a avaliação de uma ou mais expressões pode ser terminada antes que todas as etapas de seu modo normal de avaliação estejam completas; diz-se que tais expressões completam abruptamente.

Se a avaliação de uma expressão requer a avaliação de uma subexpressão, então a conclusão abrupta da subexpressão sempre causa a conclusão abrupta imediata da própria expressão, com a mesma razão, e todas as etapas subsequentes no modo normal de avaliação não são realizadas.

Os termos "completar normalmente" e "completar abruptamente" também são aplicados à execução de instruções ([§14.1](<#/doc/jls/jls-14>)). Uma instrução pode completar abruptamente por uma variedade de razões, não apenas porque uma exceção é lançada.

## 15.7. Ordem de Avaliação

A linguagem de programação Java garante que os operandos dos operadores pareçam ser avaliados em uma _ordem de avaliação_ específica, ou seja, da esquerda para a direita.

Recomenda-se que o código não dependa crucialmente desta especificação. O código geralmente é mais claro quando cada expressão contém no máximo um efeito colateral, como sua operação mais externa, e quando o código não depende exatamente de qual exceção surge como consequência da avaliação das expressões da esquerda para a direita.

### 15.7.1. Avaliar Primeiro o Operando da Esquerda

O operando da esquerda de um operador binário parece ser totalmente avaliado antes que qualquer parte do operando da direita seja avaliada.

Se o operador é um operador de atribuição composta ([§15.26.2](<#/doc/jls/jls-15>)), então a avaliação do operando da esquerda inclui tanto lembrar a variável que o operando da esquerda denota quanto buscar e salvar o valor dessa variável para uso na operação binária implícita.

Se a avaliação do operando da esquerda de um operador binário completa abruptamente, nenhuma parte do operando da direita parece ter sido avaliada.

**Exemplo 15.7.1-1. O Operando da Esquerda é Avaliado Primeiro**

No programa a seguir, o operador `*` tem um operando da esquerda que contém uma atribuição a uma variável e um operando da direita que contém uma referência à mesma variável. O valor produzido pela referência refletirá o fato de que a atribuição ocorreu primeiro.
```
    class Test1 {
        public static void main(String[] args) {
            int i = 2;
            int j = (i=3) * i;
            System.out.println(j);
        }
    }
    
```

Este programa produz a saída:
```
    9
    
```

Não é permitido que a avaliação do operador `*` produza `6` em vez de `9`.

**Exemplo 15.7.1-2. Operando Implícito da Esquerda em Operador de Atribuição Composta**

No programa a seguir, as duas instruções de atribuição buscam e lembram o valor do operando da esquerda, que é `9`, antes que o operando da direita do operador de adição seja avaliado, momento em que a variável é definida como `3`.
```
    class Test2 {
        public static void main(String[] args) {
            int a = 9;
            a += (a = 3);  // first example
            System.out.println(a);
            int b = 9;
            b = b + (b = 3);  // second example
            System.out.println(b);
        }
    }
    
```

Este programa produz a saída:
```
    12
    12
    
```

Não é permitido que nenhuma das atribuições (composta para `a`, simples para `b`) produza o resultado `6`.

Veja também o exemplo em [§15.26.2](<#/doc/jls/jls-15>).

**Exemplo 15.7.1-3. Conclusão Abrupta da Avaliação do Operando da Esquerda**
```
    class Test3 {
        public static void main(String[] args) {
            int j = 1;
            try {
                int i = forgetIt() / (j = 2);
            } catch (Exception e) {
                System.out.println(e);
                System.out.println("Now j = " + j);
            }
        }
        static int forgetIt() throws Exception {
            throw new Exception("I'm outta here!");
        }
    }
    
```

Este programa produz a saída:
```
    java.lang.Exception: I'm outta here!
    Now j = 1
    
```

Ou seja, o operando da esquerda `forgetIt()` do operador `/` lança uma exceção antes que o operando da direita seja avaliado e sua atribuição embutida de `2` a `j` ocorra.

### 15.7.2. Avaliar Operandos antes da Operação

A linguagem de programação Java garante que cada operando de um operador (exceto os operadores condicionais `&&`, `||` e `? :`) pareça ser totalmente avaliado antes que qualquer parte da própria operação seja realizada.

Se o operador binário é uma divisão inteira `/` ([§15.17.2](<#/doc/jls/jls-15>)) ou resto inteiro `%` ([§15.17.3](<#/doc/jls/jls-15>)), então sua execução pode lançar uma `ArithmeticException`, mas esta exceção é lançada somente depois que ambos os operandos do operador binário foram avaliados e somente se essas avaliações completaram normalmente.

**Exemplo 15.7.2-1. Avaliação de Operandos Antes da Operação**
```
    class Test {
        public static void main(String[] args) {
            int divisor = 0;
            try {
                int i = 1 / (divisor * loseBig());
            } catch (Exception e) {
                System.out.println(e);
            }
        }
        static int loseBig() throws Exception {
            throw new Exception("Shuffle off to Buffalo!");
        }
    }
    
```

Este programa produz a saída:
```
    java.lang.Exception: Shuffle off to Buffalo!
    
```

e não:
```
    java.lang.ArithmeticException: / by zero
    
```

já que nenhuma parte da operação de divisão, incluindo a sinalização de uma exceção de divisão por zero, pode parecer ocorrer antes que a invocação de `loseBig` seja concluída, mesmo que a implementação possa detectar ou inferir que a operação de divisão certamente resultaria em uma exceção de divisão por zero.

### 15.7.3. A Avaliação Respeita Parênteses e Precedência

A linguagem de programação Java respeita a ordem de avaliação indicada explicitamente por parênteses e implicitamente pela precedência do operador.

Uma implementação da linguagem de programação Java não pode tirar vantagem de identidades algébricas, como a lei associativa, para reescrever expressões em uma ordem computacional mais conveniente, a menos que possa ser provado que a expressão de substituição é equivalente em valor e em seus efeitos colaterais observáveis, mesmo na presença de múltiplos threads de execução (usando o modelo de execução de threads em [§17 (_Threads and Locks_)](<#/doc/jls/jls-17>)), para todos os possíveis valores computacionais que possam estar envolvidos.

No caso de cálculos de ponto flutuante, esta regra também se aplica para valores de infinito e não-número (NaN).

Por exemplo, `!(x<y)` não pode ser reescrito como `x>=y`, porque essas expressões têm valores diferentes se `x` ou `y` for NaN ou ambos forem NaN.

Especificamente, cálculos de ponto flutuante que parecem ser matematicamente associativos provavelmente não são computacionalmente associativos. Tais cálculos não devem ser reordenados ingenuamente.

Por exemplo, não é correto para um compilador Java reescrever `4.0*x*0.5` como `2.0*x`; embora o arredondamento não seja um problema aqui, existem grandes valores de `x` para os quais a primeira expressão produz infinito (devido a overflow), mas a segunda expressão produz um resultado finito.

Assim, por exemplo, o programa de teste:
```
    class Test {
        public static void main(String[] args) {
            double d = 8E307;
            System.out.println(4.0 * d * 0.5);
            System.out.println(2.0 * d);
        }
    }
    
    
```

imprime:
```
    Infinity
    1.6E308
    
```

porque a primeira expressão transborda (overflow) e a segunda não.

Em contraste, a adição e multiplicação de inteiros _são_ comprovadamente associativas na linguagem de programação Java.

Por exemplo, `a+b+c`, onde `a`, `b` e `c` são variáveis locais (esta suposição simplificadora evita problemas envolvendo múltiplos threads e variáveis `volatile`), sempre produzirá a mesma resposta, seja avaliado como `(a+b)+c` ou `a+(b+c)`; se a expressão `b+c` ocorrer nas proximidades do código, um compilador Java inteligente pode ser capaz de usar esta subexpressão comum.

### 15.7.4. Listas de Argumentos são Avaliadas da Esquerda para a Direita

Em uma invocação de método ou construtor ou expressão de criação de instância de classe, as expressões de argumento podem aparecer entre parênteses, separadas por vírgulas. Cada expressão de argumento parece ser totalmente avaliada antes que qualquer parte de qualquer expressão de argumento à sua direita seja avaliada.

Se a avaliação de uma expressão de argumento completa abruptamente, nenhuma parte de qualquer expressão de argumento à sua direita parece ter sido avaliada.

**Exemplo 15.7.4-1. Ordem de Avaliação na Invocação de Método**
```
    class Test1 {
        public static void main(String[] args) {
            String s = "going, ";
            print3(s, s, s = "gone");
        }
        static void print3(String a, String b, String c) {
            System.out.println(a + b + c);
        }
    }
    
```

Este programa produz a saída:
```
    going, going, gone
    
```

porque a atribuição da string "`gone`" a `s` ocorre depois que os dois primeiros argumentos para `print3` foram avaliados.

**Exemplo 15.7.4-2. Conclusão Abrupta da Expressão de Argumento**
```
    class Test2 {
        static int id;
        public static void main(String[] args) {
            try {
                test(id = 1, oops(), id = 3);
            } catch (Exception e) {
                System.out.println(e + ", id=" + id);
            }
        }
        static int test(int a, int b, int c) {
            return a + b + c;
        }
        static int oops() throws Exception {
            throw new Exception("oops");
        }
    }
    
```

Este programa produz a saída:
```
    java.lang.Exception: oops, id=1
    
```

porque a atribuição de `3` a `id` não é executada.

### 15.7.5. Ordem de Avaliação para Outras Expressões

A ordem de avaliação para algumas expressões não é completamente coberta por estas regras gerais, porque essas expressões podem levantar condições excepcionais em momentos que devem ser especificados. Veja as explicações detalhadas da ordem de avaliação para os seguintes tipos de expressões:

  * expressões de criação de instância de classe ([§15.9.4](<#/doc/jls/jls-15>))

  * expressões de criação de array ([§15.10.2](<#/doc/jls/jls-15>))

  * expressões de acesso a array ([§15.10.4](<#/doc/jls/jls-15>))

  * expressões de invocação de método ([§15.12.4](<#/doc/jls/jls-15>))

  * expressões de referência de método ([§15.13.3](<#/doc/jls/jls-15>))

  * atribuições envolvendo componentes de array ([§15.26](<#/doc/jls/jls-15>))

  * expressões lambda ([§15.27.4](<#/doc/jls/jls-15>))
## 15.8. Expressões Primárias

Expressões primárias incluem a maioria dos tipos mais simples de expressões, a partir das quais todas as outras são construídas: literais, criações de objetos, acessos a campos, invocações de métodos, referências a métodos e acessos a arrays. Uma expressão entre parênteses também é tratada sintaticamente como uma expressão primária.

Primary:

[PrimaryNoNewArray](<#/doc/jls/jls-15>)   
[ArrayCreationExpression](<#/doc/jls/jls-15>)

PrimaryNoNewArray:

[Literal](<#/doc/jls/jls-03>)   
[ClassLiteral](<#/doc/jls/jls-15>)   
`this`   
[TypeName](<#/doc/jls/jls-06>) `.` `this`   
`(` [Expression](<#/doc/jls/jls-15>) `)`   
[ClassInstanceCreationExpression](<#/doc/jls/jls-15>)   
[FieldAccess](<#/doc/jls/jls-15>)   
[ArrayAccess](<#/doc/jls/jls-15>)   
[MethodInvocation](<#/doc/jls/jls-15>)   
[MethodReference](<#/doc/jls/jls-15>)

Esta parte da gramática da linguagem de programação Java é incomum, de duas maneiras. Primeiro, poder-se-ia esperar que nomes simples, como nomes de variáveis locais e parâmetros de métodos, fossem expressões primárias. Por razões técnicas, os nomes são agrupados com expressões primárias um pouco mais tarde, quando as expressões postfix são introduzidas ([§15.14](<#/doc/jls/jls-15>)).

As razões técnicas têm a ver com permitir a análise sintática da esquerda para a direita de programas Java com apenas um token de lookahead. Considere as expressões `(z[3])` e `(z[])`. A primeira é um acesso a array entre parênteses ([§15.10.3](<#/doc/jls/jls-15>)) e a segunda é o início de um cast ([§15.16](<#/doc/jls/jls-15>)). No ponto em que o símbolo de lookahead é `[`, uma análise da esquerda para a direita teria reduzido o `z` ao não-terminal _Name_. No contexto de um cast, preferimos não ter que reduzir o nome a um _Primary_, mas se _Name_ fosse uma das alternativas para _Primary_, então não poderíamos saber se deveríamos fazer a redução (ou seja, não poderíamos determinar se a situação atual se tornaria um acesso a array entre parênteses ou um cast) sem olhar dois tokens à frente, para o token seguinte ao `[`. A gramática apresentada aqui evita o problema mantendo _Name_ e _Primary_ separados e permitindo qualquer um deles em certas outras regras de sintaxe (aquelas para _ClassInstanceCreationExpression_, _MethodInvocation_, _ArrayAccess_ e _PostfixExpression_, embora não _FieldAccess_ porque ele usa um identificador diretamente). Esta estratégia efetivamente adia a questão de saber se um _Name_ deve ser tratado como um _Primary_ até que mais contexto possa ser examinado.

A segunda característica incomum evita uma ambiguidade gramatical potencial na expressão "`new int[3][3]`" que em Java sempre significa uma única criação de um array multidimensional, mas que, sem a devida sutileza gramatical, também poderia ser interpretada como significando o mesmo que "`(new int[3])[3]`".

Esta ambiguidade é eliminada dividindo a definição esperada de _Primary_ em _Primary_ e _PrimaryNoNewArray_. (Isso pode ser comparado à divisão de _Statement_ em _Statement_ e _StatementNoShortIf_ ([§14.5](<#/doc/jls/jls-14>)) para evitar o problema do "dangling else".)

### 15.8.1. Literais Léxicos

Um literal ([§3.10](<#/doc/jls/jls-03>)) denota um valor fixo e imutável.

A seguinte produção de [§3.10](<#/doc/jls/jls-03>) é mostrada aqui para conveniência:

Literal:

[IntegerLiteral](<#/doc/jls/jls-03>)   
[FloatingPointLiteral](<#/doc/jls/jls-03>)   
[BooleanLiteral](<#/doc/jls/jls-03>)   
[CharacterLiteral](<#/doc/jls/jls-03>)   
[StringLiteral](<#/doc/jls/jls-03>)   
[TextBlock](<#/doc/jls/jls-03>)   
[NullLiteral](<#/doc/jls/jls-03>)

O tipo de um literal é determinado da seguinte forma:

  * O tipo de um literal inteiro ([§3.10.1](<#/doc/jls/jls-03>)) que termina com `L` ou `l` (ele) é `long` ([§4.2.1](<#/doc/jls/jls-04>)).

O tipo de qualquer outro literal inteiro é `int` ([§4.2.1](<#/doc/jls/jls-04>)).

  * O tipo de um literal de ponto flutuante ([§3.10.2](<#/doc/jls/jls-03>)) que termina com `F` ou `f` é `float` ([§4.2.3](<#/doc/jls/jls-04>)).

O tipo de qualquer outro literal de ponto flutuante é `double` ([§4.2.3](<#/doc/jls/jls-04>)).

  * O tipo de um literal booleano ([§3.10.3](<#/doc/jls/jls-03>)) é `boolean` ([§4.2.5](<#/doc/jls/jls-04>)).

  * O tipo de um literal de caractere ([§3.10.4](<#/doc/jls/jls-03>)) é `char` ([§4.2.1](<#/doc/jls/jls-04>)).

  * O tipo de um literal de string ([§3.10.5](<#/doc/jls/jls-03>)) ou de um bloco de texto ([§3.10.6](<#/doc/jls/jls-03>)) é `String` ([§4.3.3](<#/doc/jls/jls-04>)).

  * O tipo do literal nulo `null` ([§3.10.8](<#/doc/jls/jls-03>)) é o tipo nulo ([§4.1](<#/doc/jls/jls-04>)); seu valor é a referência nula.

A avaliação de um literal lexical sempre é concluída normalmente.

### 15.8.2. Literais de Classe

Um _literal de classe_ é uma expressão que consiste no nome de uma classe, interface, tipo de array ou tipo primitivo, ou no pseudo-tipo `void`, seguido por um '`.`' e o token `class`.

ClassLiteral:

[TypeName](<#/doc/jls/jls-06>) {`[` `]`} `.` `class`   
[NumericType](<#/doc/jls/jls-04>) {`[` `]`} `.` `class`   
`boolean` {`[` `]`} `.` `class`   
`void` `.` `class`

O _TypeName_ deve denotar uma classe ou interface que seja acessível ([§6.6](<#/doc/jls/jls-06>)). É um erro em tempo de compilação se o _TypeName_ denotar uma classe ou interface que não seja acessível, ou denotar uma variável de tipo.

O tipo de C`.`class`, onde C é o nome de uma classe, interface ou tipo de array ([§4.3](<#/doc/jls/jls-04>)), é `Class`<`C`>`.

O tipo de p`.`class`, onde p é o nome de um tipo primitivo ([§4.2](<#/doc/jls/jls-04>)), é `Class`<`B`>`, onde B é o tipo de uma expressão do tipo p após a conversão boxing ([§5.1.7](<#/doc/jls/jls-05>)).

O tipo de `void`.`class` ([§8.4.5](<#/doc/jls/jls-08>)) é `Class`<`Void`>`.

Um literal de classe avalia para o objeto `Class` da classe, interface, tipo de array ou tipo primitivo nomeado (ou para `void`), conforme definido pelo class loader definidor ([§12.2](<#/doc/jls/jls-12>)) da classe da instância atual.

### 15.8.3. `this`

A palavra-chave `this` pode ser usada como uma expressão nos seguintes contextos:

  * no corpo de um método de instância de uma classe ([§8.4.3.2](<#/doc/jls/jls-08>))

  * no corpo de um construtor de uma classe ([§8.8.7](<#/doc/jls/jls-08>))

  * em um inicializador de instância de uma classe ([§8.6](<#/doc/jls/jls-08>))

  * no inicializador de uma variável de instância de uma classe ([§8.3.2](<#/doc/jls/jls-08>))

  * no corpo de um método de instância de uma interface, ou seja, um método default ou um método de interface `private` não-`static` ([§9.4](<#/doc/jls/jls-09>))

Quando usada como uma expressão, a palavra-chave `this` denota um valor que é uma referência ou para o objeto para o qual o método de instância foi invocado ([§15.12](<#/doc/jls/jls-15>)), ou para o objeto que está sendo construído. O valor denotado por `this` em um corpo lambda ([§15.27.2](<#/doc/jls/jls-15>)) é o mesmo que o valor denotado por `this` no contexto circundante.

A palavra-chave `this` também é usada em invocações de construtores ([§8.8.7.1](<#/doc/jls/jls-08>)), e para denotar o parâmetro receptor de um método ou construtor ([§8.4](<#/doc/jls/jls-08>)).

É um erro em tempo de compilação se uma expressão `this` ocorrer em um contexto static ([§8.1.3](<#/doc/jls/jls-08>)).

Seja C a declaração de classe ou interface envolvente mais interna de uma expressão `this`.

É um erro em tempo de compilação se uma expressão `this` ocorrer em um contexto de construção inicial ([§8.8.7](<#/doc/jls/jls-08>)) de C, a menos que apareça como o qualificador de uma expressão de acesso a campo ([§15.11](<#/doc/jls/jls-15>)) que seja o operando esquerdo de uma expressão de atribuição simples ([§15.26](<#/doc/jls/jls-15>)), e a expressão de atribuição simples não esteja envolvida em uma expressão lambda ou declaração de classe interna que esteja contida no contexto de construção inicial de C.

Se C for genérica, com parâmetros de tipo F1,...,Fn, o tipo de `this` é C`<`F1,...,Fn`>`. Caso contrário, o tipo de `this` é C.

Em tempo de execução, a classe do objeto real referenciado pode ser C ou uma subclasse de C ([§8.1.5](<#/doc/jls/jls-08>)).

**Exemplo 15.8.3-1. A Expressão `this`
```java
    class IntVector {
        int[] v;
        boolean equals(IntVector other) {
            if (this == other)
                return true;
            if (v.length != other.v.length)
                return false;
            for (int i = 0; i < v.length; i++) {
                if (v[i] != other.v[i]) return false;
            }
            return true;
        }
    }
```

Aqui, a classe `IntVector` implementa um método `equals`, que compara dois vetores. Se o outro vetor for o mesmo objeto vetor para o qual o método `equals` foi invocado, então a verificação pode pular as comparações de comprimento e valor. O método `equals` implementa esta verificação comparando a referência ao outro objeto com `this`.

### 15.8.4. `this` Qualificado

Qualquer instância lexicamente envolvente ([§8.1.3](<#/doc/jls/jls-08>)) pode ser referenciada qualificando explicitamente a palavra-chave `this`.

Seja _n_ um inteiro tal que _TypeName_ denota a _n_-ésima declaração de classe ou interface lexicamente envolvente da classe ou interface cuja declaração envolve imediatamente a expressão `this` qualificada.

O valor de uma expressão `this` qualificada _TypeName_`.`this` é a _n_-ésima instância lexicamente envolvente de `this`.

Se _TypeName_ denotar uma classe genérica, com parâmetros de tipo F1,...,Fn, o tipo da expressão `this` qualificada é _TypeName_`<`F1,...,Fn`>`. Caso contrário, o tipo da expressão `this` qualificada é _TypeName_.

É um erro em tempo de compilação se uma expressão `this` qualificada ocorrer em um contexto static ([§8.1.3](<#/doc/jls/jls-08>)).

É um erro em tempo de compilação se uma expressão `this` qualificada ocorrer em um contexto de construção inicial ([§8.8.7](<#/doc/jls/jls-08>)) da classe nomeada por _TypeName_, a menos que apareça como o qualificador de uma expressão de acesso a campo ([§15.11](<#/doc/jls/jls-15>)) que seja o operando esquerdo de uma expressão de atribuição simples ([§15.26](<#/doc/jls/jls-15>)), e a expressão de atribuição simples não esteja envolvida em uma expressão lambda ou declaração de classe interna que esteja contida no contexto de construção inicial da classe nomeada por _TypeName_.

É um erro em tempo de compilação se a classe ou interface cuja declaração envolve imediatamente uma expressão `this` qualificada não for uma classe interna de _TypeName_ ou o próprio _TypeName_.

### 15.8.5. Expressões Entre Parênteses

Uma expressão entre parênteses é uma expressão primária cujo tipo é o tipo da expressão contida e cujo valor em tempo de execução é o valor da expressão contida. Se a expressão contida denotar uma variável, então a expressão entre parênteses também denota essa variável.

O uso de parênteses afeta apenas a _ordem_ de avaliação, exceto por um caso particular em que `(-2147483648)` e `(-9223372036854775808L)` são legais, mas `-(2147483648)` e `-(9223372036854775808L)` são ilegais.

Isso ocorre porque os literais decimais `2147483648` e `9223372036854775808L` são permitidos apenas como um operando do operador de menos unário ([§3.10.1](<#/doc/jls/jls-03>)).

Em particular, a presença ou ausência de parênteses em torno de uma expressão não afeta se uma variável é definitivamente atribuída, definitivamente atribuída quando `true`, definitivamente atribuída quando `false`, definitivamente não atribuída, definitivamente não atribuída quando `true`, ou definitivamente não atribuída quando `false` ([§16 (_Atribuição Definida_)](<#/doc/jls/jls-16>)).

Se uma expressão entre parênteses aparecer em um contexto de um tipo particular com tipo alvo T ([§5 (_Conversões e Contextos_)](<#/doc/jls/jls-05>)), sua expressão contida aparece similarmente em um contexto do mesmo tipo com tipo alvo T.

Se a expressão contida for uma poly expression ([§15.2](<#/doc/jls/jls-15>)), a expressão entre parênteses também é uma poly expression. Caso contrário, é uma expressão autônoma.

Uma poly expression entre parênteses é compatível com um tipo alvo T se sua expressão contida for compatível com T.

## 15.9. Expressões de Criação de Instância de Classe

Uma expressão de criação de instância de classe é usada para criar novos objetos que são instâncias de classes.

ClassInstanceCreationExpression:

[UnqualifiedClassInstanceCreationExpression](<#/doc/jls/jls-15>)   
[ExpressionName](<#/doc/jls/jls-06>) `.` [UnqualifiedClassInstanceCreationExpression](<#/doc/jls/jls-15>)   
[Primary](<#/doc/jls/jls-15>) `.` [UnqualifiedClassInstanceCreationExpression](<#/doc/jls/jls-15>)

UnqualifiedClassInstanceCreationExpression:

`new` [[TypeArguments](<#/doc/jls/jls-04>)] [ClassOrInterfaceTypeToInstantiate](<#/doc/jls/jls-15>) `(` [[ArgumentList](<#/doc/jls/jls-15>)] `)` [[ClassBody](<#/doc/jls/jls-08>)] 

ClassOrInterfaceTypeToInstantiate:

{[Annotation](<#/doc/jls/jls-09>)} [Identifier](<#/doc/jls/jls-03>) {`.` {[Annotation](<#/doc/jls/jls-09>)} [Identifier](<#/doc/jls/jls-03>)} [[TypeArgumentsOrDiamond](<#/doc/jls/jls-15>)] 

TypeArgumentsOrDiamond:

[TypeArguments](<#/doc/jls/jls-04>)   
`<>`

A seguinte produção de [§15.12](<#/doc/jls/jls-15>) é mostrada aqui para conveniência:

ArgumentList:

[Expression](<#/doc/jls/jls-15>) {`,` [Expression](<#/doc/jls/jls-15>)} 

Uma expressão de criação de instância de classe especifica uma classe a ser instanciada, possivelmente seguida por argumentos de tipo ([§4.5.1](<#/doc/jls/jls-04>)) ou um _diamond_ (`<>`) se a classe sendo instanciada for genérica ([§8.1.2](<#/doc/jls/jls-08>)), seguido por uma lista (possivelmente vazia) de argumentos de valor reais para o construtor.

Se a lista de argumentos de tipo para a classe estiver vazia -- a forma diamond `<>` -- os argumentos de tipo da classe são inferidos. É legal, embora fortemente desencorajado por uma questão de estilo, ter espaço em branco entre o "`<`" e o "`>`" de um diamond.

Se o construtor for genérico ([§8.8.4](<#/doc/jls/jls-08>)), os argumentos de tipo para o construtor podem, similarmente, ser inferidos ou passados explicitamente. Se passados explicitamente, os argumentos de tipo para o construtor seguem imediatamente a palavra-chave `new`.

É um erro em tempo de compilação se uma expressão de criação de instância de classe fornecer argumentos de tipo para um construtor, mas usar a forma diamond para argumentos de tipo para a classe.

Esta regra é introduzida porque a inferência dos argumentos de tipo de uma classe genérica pode influenciar as restrições nos argumentos de tipo de um construtor genérico.

Se _TypeArguments_ estiver presente imediatamente após `new`, ou imediatamente antes de `(`, então é um erro em tempo de compilação se qualquer um dos argumentos de tipo for um wildcard ([§4.5.1](<#/doc/jls/jls-04>)).

Os tipos de exceção que uma expressão de criação de instância de classe pode lançar são especificados em [§11.2.1](<#/doc/jls/jls-11>).

Expressões de criação de instância de classe têm duas formas:

  * _Expressões de criação de instância de classe não qualificadas_ começam com a palavra-chave `new`.

Uma expressão de criação de instância de classe não qualificada pode ser usada para criar uma instância de uma classe, independentemente de a classe ser de nível superior ([§7.6](<#/doc/jls/jls-07>)), membro ([§8.5](<#/doc/jls/jls-08>), [§9.5](<#/doc/jls/jls-09>)), local ([§14.3](<#/doc/jls/jls-14>)), ou anônima ([§15.9.5](<#/doc/jls/jls-15>)).

  * _Expressões de criação de instância de classe qualificadas_ começam com uma expressão _Primary_ ou um _ExpressionName_.

Uma expressão de criação de instância de classe qualificada permite a criação de instâncias de classes membro internas e suas subclasses anônimas.

Ambas as expressões de criação de instância de classe não qualificadas e qualificadas podem opcionalmente terminar com um corpo de classe. Tal expressão de criação de instância de classe declara uma _classe anônima_ ([§15.9.5](<#/doc/jls/jls-15>)) e cria uma instância dela.

Uma expressão de criação de instância de classe é uma poly expression ([§15.2](<#/doc/jls/jls-15>)) se usar a forma diamond para argumentos de tipo para a classe, e aparecer em um contexto de atribuição ou um contexto de invocação ([§5.2](<#/doc/jls/jls-05>), [§5.3](<#/doc/jls/jls-05>)). Caso contrário, é uma expressão autônoma.

Dizemos que uma classe é _instanciada_ quando uma instância da classe é criada por uma expressão de criação de instância de classe. A instanciação de classe envolve a determinação da classe a ser instanciada ([§15.9.1](<#/doc/jls/jls-15>)), as instâncias envolventes (se houver) da instância recém-criada ([§15.9.2](<#/doc/jls/jls-15>)), e o construtor a ser invocado para criar a nova instância ([§15.9.3](<#/doc/jls/jls-15>)).

### 15.9.1. Determinando a Classe Sendo Instanciada

Se _ClassOrInterfaceTypeToInstantiate_ terminar com _TypeArguments_ (em vez de `<>`), então _ClassOrInterfaceTypeToInstantiate_ deve denotar um tipo parametrizado bem formado ([§4.5](<#/doc/jls/jls-04>)), ou ocorre um erro em tempo de compilação.

Se _ClassOrInterfaceTypeToInstantiate_ terminar com `<>`, mas a classe ou interface denotada pelo _Identifier_ em _ClassOrInterfaceTypeToInstantiate_ não for genérica, então ocorre um erro em tempo de compilação.

Se a expressão de criação de instância de classe terminar em um corpo de classe, então a classe que está sendo instanciada é uma classe anônima. Então:

  * Se a expressão de criação de instância de classe for não qualificada, então:

O _Identifier_ em _ClassOrInterfaceTypeToInstantiate_ deve denotar uma classe que seja acessível, livremente extensível ([§8.1.1.2](<#/doc/jls/jls-08>)), e não uma classe enum, ou uma interface que seja acessível e livremente extensível ([§9.1.1.4](<#/doc/jls/jls-09>)). Caso contrário, ocorre um erro em tempo de compilação.

Se o _Identifier_ em _ClassOrInterfaceTypeToInstantiate_ denotar uma classe, C, então uma subclasse direta anônima de C é declarada. Se _TypeArguments_ estiver presente, então C tem argumentos de tipo dados por _TypeArguments_; se `<>` estiver presente, então C terá seus argumentos de tipo inferidos em [§15.9.3](<#/doc/jls/jls-15>); caso contrário, C não tem argumentos de tipo. O corpo da subclasse é o _ClassBody_ dado na expressão de criação de instância de classe. A classe que está sendo instanciada é a subclasse anônima.

Se o _Identifier_ em _ClassOrInterfaceTypeToInstantiate_ denotar uma interface, I, então uma subclasse direta anônima de `Object` que implementa I é declarada. Se _TypeArguments_ estiver presente, então I tem argumentos de tipo dados por _TypeArguments_; se `<>` estiver presente, então I terá seus argumentos de tipo inferidos em [§15.9.3](<#/doc/jls/jls-15>); caso contrário, I não tem argumentos de tipo. O corpo da subclasse é o _ClassBody_ dado na expressão de criação de instância de classe. A classe que está sendo instanciada é a subclasse anônima.

  * Se a expressão de criação de instância de classe for qualificada, então:

O _Identifier_ em _ClassOrInterfaceTypeToInstantiate_ deve denotar inequivocamente uma classe interna que seja acessível, livremente extensível, não uma classe enum, e um membro do tipo em tempo de compilação da expressão _Primary_ ou do _ExpressionName_. Caso contrário, ocorre um erro em tempo de compilação.

Se o _Identifier_ em _ClassOrInterfaceTypeToInstantiate_ denotar uma classe, C. Uma subclasse direta anônima de C é declarada. Se _TypeArguments_ estiver presente, então C tem argumentos de tipo dados por _TypeArguments_; se `<>` estiver presente, então C terá seus argumentos de tipo inferidos em [§15.9.3](<#/doc/jls/jls-15>); caso contrário, C não tem argumentos de tipo. O corpo da subclasse é o _ClassBody_ dado na expressão de criação de instância de classe. A classe que está sendo instanciada é a subclasse anônima.

Se uma expressão de criação de instância de classe não declarar uma classe anônima, então:

  * Se a expressão de criação de instância de classe for não qualificada, então:

O _Identifier_ em _ClassOrInterfaceTypeToInstantiate_ deve denotar uma classe que seja acessível, não-`abstract`, e não uma classe enum. Caso contrário, ocorre um erro em tempo de compilação.

A classe que está sendo instanciada é especificada pelo _Identifier_ em _ClassOrInterfaceTypeToInstantiate_. Se _TypeArguments_ estiver presente, então a classe tem argumentos de tipo dados por _TypeArguments_; se `<>` estiver presente, então a classe terá seus argumentos de tipo inferidos em [§15.9.3](<#/doc/jls/jls-15>); caso contrário, a classe não tem argumentos de tipo.

  * Se a expressão de criação de instância de classe for qualificada, então:

O _ClassOrInterfaceTypeToInstantiate_ deve denotar inequivocamente uma classe interna que seja acessível, não-`abstract`, não uma classe enum, e um membro do tipo em tempo de compilação da expressão _Primary_ ou do _ExpressionName_.

A classe que está sendo instanciada é especificada pelo _Identifier_ em _ClassOrInterfaceTypeToInstantiate_. Se _TypeArguments_ estiver presente, então a classe tem argumentos de tipo dados por _TypeArguments_; se `<>` estiver presente, então a classe terá seus argumentos de tipo inferidos em [§15.9.3](<#/doc/jls/jls-15>); caso contrário, a classe não tem argumentos de tipo.

### 15.9.2. Determinando Instâncias Envolventes

Seja C a classe que está sendo instanciada, e seja `i` a instância que está sendo criada. Se C for uma classe interna, então `i` pode ter uma _instância imediatamente envolvente_ ([§8.1.3](<#/doc/jls/jls-08>)), determinada da seguinte forma:

  * Se C for uma classe anônima, então:

    * Se a expressão de criação de instância de classe ocorrer em um contexto static, então `i` não tem instância imediatamente envolvente.

Se a superclasse direta de C for uma classe local interna `L` que ocorre em um contexto static, então seja S a declaração de método `static`, declaração de campo `static` ou inicializador static mais próximo que envolve a declaração de `L`. Se a declaração de método `static`, declaração de campo `static` ou inicializador static mais próximo que envolve a expressão de criação de instância de classe não for S, então ocorre um erro em tempo de compilação.

    * Caso contrário, a instância imediatamente envolvente de `i` é `this`.

  * Se C for uma classe local interna, então:

    * Se C ocorrer em um contexto static, então `i` não tem instância imediatamente envolvente.

Seja S a declaração de método `static`, declaração de campo `static` ou inicializador static mais próximo que envolve a declaração de C. Se a declaração de método `static`, declaração de campo `static` ou inicializador static mais próximo que envolve a expressão de criação de instância de classe não for S, então ocorre um erro em tempo de compilação.

    * Caso contrário, se a expressão de criação de instância de classe ocorrer em um contexto static, então ocorre um erro em tempo de compilação.

    * Caso contrário, seja O a declaração de classe ou interface imediatamente envolvente de C, e seja U a declaração de classe ou interface imediatamente envolvente da expressão de criação de instância de classe.

Se U não for uma classe interna de O ou o próprio O, então ocorre um erro em tempo de compilação.

Seja _n_ um inteiro tal que O é a _n_-ésima declaração de classe ou interface lexicamente envolvente de U.

A instância imediatamente envolvente de `i` é a _n_-ésima instância lexicamente envolvente de `this`.

  * Se C for uma classe membro interna, então:

    * Se a expressão de criação de instância de classe for não qualificada, então:

      * Se a expressão de criação de instância de classe ocorrer em um contexto static, então ocorre um erro em tempo de compilação.

      * Caso contrário, se C não for membro de nenhuma classe cuja declaração envolve lexicamente a expressão de criação de instância de classe, então ocorre um erro em tempo de compilação.

      * Caso contrário, seja O a declaração de classe envolvente mais interna da qual C é membro, e seja U a declaração de classe ou interface imediatamente envolvente da expressão de criação de instância de classe.

Se U não for uma classe interna de O ou o próprio O, então ocorre um erro em tempo de compilação.

Se a expressão de criação de instância de classe ocorrer no contexto de construção inicial ([§8.8.7](<#/doc/jls/jls-08>)) de O, então ocorre um erro em tempo de compilação.

Seja _n_ um inteiro tal que O é a _n_-ésima declaração de classe ou interface lexicamente envolvente de U.

A instância imediatamente envolvente de `i` é a _n_-ésima instância lexicamente envolvente de `this`.

    * Se a expressão de criação de instância de classe for qualificada, então a instância imediatamente envolvente de `i` é o objeto que é o valor da expressão _Primary_ ou do _ExpressionName_.

Se C for uma classe anônima, e sua superclasse direta S for uma classe interna, então `i` pode ter uma _instância imediatamente envolvente em relação a S_, determinada da seguinte forma:

  * Se S for uma classe local interna, então:

    * Se S ocorrer em um contexto static, então `i` não tem instância imediatamente envolvente em relação a S.

    * Caso contrário, se a expressão de criação de instância de classe ocorrer em um contexto static, então ocorre um erro em tempo de compilação.

    * Caso contrário, seja O a declaração de classe ou interface imediatamente envolvente de S, e seja U a declaração de classe ou interface imediatamente envolvente da expressão de criação de instância de classe.

Se U não for uma classe interna de O ou o próprio O, então ocorre um erro em tempo de compilação.

Seja _n_ um inteiro tal que O é a _n_-ésima declaração de classe ou interface lexicamente envolvente de U.

A instância imediatamente envolvente de `i` em relação a S é a _n_-ésima instância lexicamente envolvente de `this`.

  * Se S for uma classe membro interna, então:

    * Se a expressão de criação de instância de classe for não qualificada, então:

      * Se a expressão de criação de instância de classe ocorrer em um contexto static, então ocorre um erro em tempo de compilação.

      * Caso contrário, se S não for membro de nenhuma classe cuja declaração envolve a expressão de criação de instância de classe, então ocorre um erro em tempo de compilação.

      * Caso contrário, seja O a declaração de classe envolvente mais interna da qual S é membro, e seja U a declaração de classe ou interface imediatamente envolvente da expressão de criação de instância de classe.

Se U não for uma classe interna de O ou o próprio O, então ocorre um erro em tempo de compilação.

Se a expressão de criação de instância de classe ocorrer no contexto de construção inicial de O, então ocorre um erro em tempo de compilação.

Seja _n_ um inteiro tal que O é a _n_-ésima declaração de classe ou interface lexicamente envolvente de U.

A instância imediatamente envolvente de `i` em relação a S é a _n_-ésima instância lexicamente envolvente de `this`.

      * Caso contrário, ocorre um erro em tempo de compilação.

    * Se a expressão de criação de instância de classe for qualificada, então a instância imediatamente envolvente de `i` em relação a S é o objeto que é o valor da expressão _Primary_ ou do _ExpressionName_.

### 15.9.3. Escolhendo o Construtor e Seus Argumentos

Seja C a classe que está sendo instanciada. Para criar uma instância de C, `i`, um construtor de C é escolhido em tempo de compilação pelas seguintes regras.

Primeiro, os argumentos reais para a invocação do construtor são determinados:

  * Se C for uma classe anônima com superclasse direta S, então:

    * Se S não for uma classe interna, ou se S for uma classe local que ocorre em um contexto static, então os argumentos para o construtor são os argumentos na lista de argumentos da expressão de criação de instância de classe, se houver, na ordem em que aparecem na expressão.

    * Caso contrário, o primeiro argumento para o construtor é a instância imediatamente envolvente de `i` em relação a S ([§15.9.2](<#/doc/jls/jls-15>)), e os argumentos subsequentes para o construtor são os argumentos na lista de argumentos da expressão de criação de instância de classe, se houver, na ordem em que aparecem na expressão de criação de instância de classe.

  * Se C for uma classe local ou uma classe membro interna `private`, então os argumentos para o construtor são os argumentos na lista de argumentos da expressão de criação de instância de classe, se houver, na ordem em que aparecem na expressão de criação de instância de classe.

  * Se C for uma classe membro interna não-`private`, então o primeiro argumento para o construtor é a instância imediatamente envolvente de `i` ([§8.8.1](<#/doc/jls/jls-08>), [§15.9.2](<#/doc/jls/jls-15>)), e os argumentos subsequentes para seu construtor são os argumentos na lista de argumentos da expressão de criação de instância de classe, se houver, na ordem em que aparecem na expressão de criação de instância de classe.

  * Caso contrário, os argumentos para o construtor são os argumentos na lista de argumentos da expressão de criação de instância de classe, se houver, na ordem em que aparecem na expressão.

Segundo, um construtor de C e a cláusula `throws` correspondente e o tipo de retorno são determinados:

  * Se a expressão de criação de instância de classe não usar `<>`, então:
* Se C não é uma classe anônima, então:

Seja T o tipo denotado por C seguido por quaisquer argumentos de tipo de classe na expressão. O processo especificado em [§15.12.2](<#/doc/jls/jls-15>), modificado para lidar com construtores, é usado para escolher um dos construtores de T e determinar sua cláusula `throws`.

Se não houver um construtor único mais específico em T que seja aplicável e acessível ([§6.6](<#/doc/jls/jls-06>)), então ocorre um erro em tempo de compilação (assim como em invocações de método).

Caso contrário, o tipo de retorno correspondente ao construtor escolhido é T.

* Se C é uma classe anônima, então:

O processo especificado em [§15.12.2](<#/doc/jls/jls-15>), modificado para lidar com construtores, é usado para escolher um dos construtores do tipo da superclasse direta de C e determinar sua cláusula `throws`.

Se não houver um construtor único mais específico no tipo da superclasse direta de C que seja aplicável e acessível, então ocorre um erro em tempo de compilação (assim como em invocações de método).

Caso contrário, o construtor anônimo de C é escolhido como o construtor de C ([§15.9.5.1](<#/doc/jls/jls-15>)). Seu corpo consiste em uma invocação explícita de construtor ([§8.8.7.1](<#/doc/jls/jls-08>)) do construtor escolhido no tipo da superclasse direta de C.

A cláusula `throws` do construtor escolhido inclui as exceções na cláusula `throws` do construtor escolhido no tipo da superclasse direta de C.

O tipo de retorno correspondente ao construtor escolhido é o tipo de classe anônima.

* Se a expressão de criação de instância de classe usa `<>`, então:

Se C não é uma classe anônima, seja D o mesmo que C. Se C é uma classe anônima, seja D a superclasse ou superinterface de C nomeada pela expressão de criação de instância de classe.

Se D é uma classe, sejam `c1`, ..., `cn` os construtores da classe D. Se D é uma interface, sejam `c1`, ..., `cn` uma lista singleton (_n_ = 1) contendo o construtor sem argumentos da classe `Object`.

Uma lista de métodos `m1`, ..., `mn` é definida para fins de resolução de sobrecarga e inferência de argumentos de tipo. Para todo _j_ (1 ≤ _j_ ≤ _n_), `mj` é definido em termos de `cj` da seguinte forma:

* Uma substituição θ`j` é primeiro definida para instanciar os tipos em `cj`.

Sejam F1, ..., Fp os parâmetros de tipo de D, e sejam G1, ..., Gq os parâmetros de tipo (se houver) de `cj`. Sejam X1, ..., Xp e Y1, ..., Yq variáveis de tipo com nomes distintos que não estão no escopo no corpo de D.

θ`j` é `[F1:=X1, ..., Fp:=Xp, G1:=Y1, ..., Gq:=Yq]`.

* Os parâmetros de tipo de `mj` são X1, ..., Xp, Y1, ..., Yq. O limite de cada parâmetro de tipo, se houver, é θ`j` aplicado ao limite de parâmetro de tipo correspondente em D ou `cj`.

* O tipo de retorno de `mj` é θ`j` aplicado a D`<`F1, ..., Fp`>`.

* A lista (possivelmente vazia) de tipos de argumento de `mj` é θ`j` aplicada aos tipos de argumento de `cj`.

* A lista (possivelmente vazia) de tipos lançados de `mj` é θ`j` aplicada aos tipos lançados de `cj`.

* Os modificadores de `mj` são os de `cj`.

* O nome de `mj` é `#m`, um nome gerado automaticamente que é distinto de todos os nomes de construtores e métodos em D e é compartilhado por `m1`, ..., `mn`.

* O corpo de `mj` é irrelevante.

Para escolher um construtor, consideramos temporariamente `m1`, ..., `mn` como membros de D. Um de `m1`, ..., `mn` é escolhido, conforme determinado pelas expressões de argumento da expressão de criação de instância de classe, usando o processo especificado em [§15.12.2](<#/doc/jls/jls-15>).

Se não houver um método único mais específico que seja aplicável e acessível, então ocorre um erro em tempo de compilação.

Caso contrário, onde `mj` é o método escolhido:

* Se C não é uma classe anônima, então `cj` é escolhido como o construtor de C.

A cláusula `throws` do construtor escolhido é a mesma que a cláusula `throws` determinada para `mj`.

O tipo de retorno correspondente ao construtor escolhido é o tipo de retorno determinado para `mj` ([§15.12.2.6](<#/doc/jls/jls-15>)).

* Se C é uma classe anônima, então o construtor anônimo de C é escolhido como o construtor de C. Seu corpo consiste em uma invocação explícita de construtor ([§8.8.7.1](<#/doc/jls/jls-08>)) de `cj`.

A cláusula `throws` do construtor escolhido inclui as exceções na cláusula `throws` determinada para `mj`.

O tipo de retorno correspondente ao construtor escolhido é o tipo de classe anônima.

Se a expressão de criação de instância de classe é uma poly expression, então sua compatibilidade com um tipo alvo é determinada por [§18.5.2.1](<#/doc/jls/jls-18>), usando `mj` como o método selecionado `m`.

O teste de compatibilidade com um tipo alvo pode ocorrer várias vezes antes de uma determinação final do tipo alvo da expressão de criação de instância de classe e do tipo de retorno correspondente ao construtor escolhido. Por exemplo, uma expressão de invocação de método envolvente pode exigir o teste da expressão de criação de instância de classe para compatibilidade com os tipos de parâmetros formais de diferentes métodos.

Se C é uma classe anônima, então seu tipo de superclasse direta ou tipo de superinterface direta é o tipo de retorno determinado para `mj` ([§15.12.2.6](<#/doc/jls/jls-15>)).

É um erro em tempo de compilação se o tipo de superclasse direta ou tipo de superinterface direta, ou qualquer subexpressão nele ("subexpressão" inclui argumentos de tipo de tipos parametrizados, limites de argumentos de tipo curinga e tipos de elemento de tipos de array, mas exclui limites de variáveis de tipo), tiver uma das seguintes formas:

* Uma variável de tipo que não foi declarada como um parâmetro de tipo (como uma variável de tipo produzida por conversão de captura).

* Um tipo de interseção.

* Um tipo de classe ou interface, onde a declaração da classe ou interface não é acessível a partir da classe ou interface na qual a expressão de criação de instância de classe aparece.

É um erro em tempo de compilação se um argumento para uma expressão de criação de instância de classe não for compatível com seu tipo alvo, conforme derivado do tipo de invocação ([§15.12.2.6](<#/doc/jls/jls-15>)).

Se a declaração em tempo de compilação for aplicável por invocação de aridade variável ([§15.12.2.4](<#/doc/jls/jls-15>)), então, onde o último tipo de parâmetro formal do tipo de invocação do construtor é Fn`[]`, é um erro em tempo de compilação se o tipo que é a *erasure* de Fn não for acessível no ponto de invocação.

O tipo da expressão de criação de instância de classe é o tipo de retorno correspondente ao construtor escolhido, conforme definido acima.

### 15.9.4. Avaliação em Tempo de Execução de Expressões de Criação de Instância de Classe

Em tempo de execução, a avaliação de uma expressão de criação de instância de classe é a seguinte.

Primeiro, se a expressão de criação de instância de classe é uma expressão de criação de instância de classe qualificada, a expressão primária qualificadora é avaliada. Se a expressão qualificadora avalia para `null`, uma `NullPointerException` é lançada, e a expressão de criação de instância de classe é concluída abruptamente. Se a expressão qualificadora é concluída abruptamente, a expressão de criação de instância de classe é concluída abruptamente pela mesma razão.

Em seguida, o espaço é alocado para a nova instância de classe. Se não houver espaço suficiente para alocar o objeto, a avaliação da expressão de criação de instância de classe é concluída abruptamente lançando um `OutOfMemoryError`.

O novo objeto contém novas instâncias de todos os campos declarados na classe especificada e em todas as suas superclasses. À medida que cada nova instância de campo é criada, ela é inicializada com seu valor padrão ([§4.12.5](<#/doc/jls/jls-04>)).

Em seguida, os argumentos reais para o construtor são avaliados, da esquerda para a direita. Se qualquer uma das avaliações de argumento for concluída abruptamente, quaisquer expressões de argumento à sua direita não são avaliadas, e a expressão de criação de instância de classe é concluída abruptamente pela mesma razão.

Em seguida, o construtor selecionado da classe especificada é invocado. Isso resulta na invocação de pelo menos um construtor para cada superclasse da classe. Este processo pode ser direcionado por invocações explícitas de construtor ([§8.8.7.1](<#/doc/jls/jls-08>)) e é especificado em detalhes em [§12.5](<#/doc/jls/jls-12>).

O valor de uma expressão de criação de instância de classe é uma referência ao objeto recém-criado da classe especificada. Toda vez que a expressão é avaliada, um novo objeto é criado.

**Exemplo 15.9.4-1. Ordem de Avaliação e Detecção de Falta de Memória**

Se a avaliação de uma expressão de criação de instância de classe encontrar que não há memória suficiente para realizar a operação de criação, então um `OutOfMemoryError` é lançado. Esta verificação ocorre antes que quaisquer expressões de argumento sejam avaliadas.

Assim, por exemplo, o programa de teste:
```java
    class List {
        int value;
        List next;
        static List head = new List(0);
        List(int n) { value = n; next = head; head = this; }
    }
    class Test {
        public static void main(String[] args) {
            int id = 0, oldid = 0;
            try {
                for (;;) {
                    ++id;
                    new List(oldid = id);
                }
            } catch (Error e) {
                List.head = null;
                System.out.println(e.getClass() + ", " + (oldid==id));
            }
        }
    }
    
```

imprime:
```
    class java.lang.OutOfMemoryError, false
    
```

porque a condição de falta de memória é detectada antes que a expressão de argumento `oldid = id` seja avaliada.

Compare isso com o tratamento de expressões de criação de array, para as quais a condição de falta de memória é detectada após a avaliação das expressões de dimensão ([§15.10.2](<#/doc/jls/jls-15>)).

### 15.9.5. Declarações de Classes Anônimas

Uma classe anônima é implicitamente declarada por uma expressão de criação de instância de classe ou por uma constante enum que termina com um corpo de classe ([§8.9.1](<#/doc/jls/jls-08>)).

Uma classe anônima nunca é `abstract` ([§8.1.1.1](<#/doc/jls/jls-08>)).

Uma classe anônima nunca é `sealed` ([§8.1.1.2](<#/doc/jls/jls-08>)), e portanto não possui subclasses diretas permitidas ([§8.1.6](<#/doc/jls/jls-08>)).

Uma classe anônima declarada por uma expressão de criação de instância de classe nunca é `final` ([§8.1.1.2](<#/doc/jls/jls-08>)).

Uma classe anônima declarada por uma constante enum é sempre `final`.

Uma classe anônima sendo não-`final` é relevante em *casting*, em particular na conversão de referência de estreitamento permitida para o operador de *cast* ([§5.5](<#/doc/jls/jls-05>)). Por outro lado, não é relevante para a subclasse, porque é impossível declarar uma subclasse de uma classe anônima (uma classe anônima não pode ser nomeada por uma cláusula `extends`) apesar de a classe anônima ser não-`final`.

Uma classe anônima é sempre uma classe interna ([§8.1.3](<#/doc/jls/jls-08>)).

Assim como uma classe ou interface local ([§14.3](<#/doc/jls/jls-14>)), uma classe anônima não é membro de nenhum pacote, classe ou interface ([§7.1](<#/doc/jls/jls-07>), [§8.5](<#/doc/jls/jls-08>)).

O tipo de superclasse direta ou tipo de superinterface direta de uma classe anônima declarada por uma expressão de criação de instância de classe é dado pela expressão ([§15.9.1](<#/doc/jls/jls-15>)), com argumentos de tipo inferidos conforme necessário ao escolher um construtor ([§15.9.3](<#/doc/jls/jls-15>)). Se um tipo de superinterface direta for fornecido, o tipo de superclasse direta é `Object`.

O tipo de superclasse direta de uma classe anônima declarada por uma constante enum é o tipo da classe enum declarante.

O _ClassBody_ da expressão de criação de instância de classe ou constante enum declara campos ([§8.3](<#/doc/jls/jls-08>)), métodos ([§8.4](<#/doc/jls/jls-08>)), classes membro ([§8.5](<#/doc/jls/jls-08>)), interfaces membro ([§9.1.1.3](<#/doc/jls/jls-09>)), inicializadores de instância ([§8.6](<#/doc/jls/jls-08>)), e inicializadores estáticos ([§8.7](<#/doc/jls/jls-08>)) da classe anônima. O construtor de uma classe anônima é sempre implícito ([§15.9.5.1](<#/doc/jls/jls-15>)).

Se uma expressão de criação de instância de classe com um _ClassBody_ usa um diamante (`<>`) para os argumentos de tipo da classe a ser instanciada, então para todos os métodos não-`private` declarados no _ClassBody_, é como se a declaração do método fosse anotada com `@Override` ([§9.6.4.4](<#/doc/jls/jls-09>)).

Quando `<>` é usado, os argumentos de tipo inferidos podem não ser os antecipados pelo programador. Consequentemente, o supertipo da classe anônima pode não ser o antecipado, e os métodos declarados na classe anônima podem não sobrescrever os métodos do supertipo conforme pretendido. Tratar tais métodos como se fossem anotados com `@Override` (se não forem explicitamente anotados com `@Override`) ajuda a evitar programas silenciosamente incorretos.

#### 15.9.5.1. Construtores Anônimos

Uma classe anônima não pode ter um construtor explicitamente declarado. Em vez disso, um construtor anônimo é implicitamente declarado para uma classe anônima. A forma do construtor anônimo para uma classe anônima C com superclasse direta S é a seguinte:

* Se S não é uma classe interna, ou se S é uma classe local que ocorre em um contexto estático, então o construtor anônimo tem um parâmetro formal para cada argumento real para a expressão de criação de instância de classe ou constante enum que declara C.

Os argumentos reais para a expressão de criação de instância de classe ou constante enum são usados para determinar um construtor `x` de S, conforme especificado em [§15.9.3](<#/doc/jls/jls-15>). O tipo de cada parâmetro formal do construtor anônimo é tornado idêntico ao parâmetro formal correspondente de `x`.

O corpo do construtor anônimo consiste em uma invocação explícita de construtor ([§8.8.7.1](<#/doc/jls/jls-08>)) na forma `super(...)`, onde os argumentos reais são os parâmetros formais do construtor anônimo, na ordem em que foram declarados. O construtor da superclasse a ser invocado é `x`.

* Caso contrário, o primeiro parâmetro formal do construtor anônimo representa o valor da instância imediatamente envolvente de `i` em relação a S ([§15.9.2](<#/doc/jls/jls-15>)). O tipo deste parâmetro é o tipo de classe que imediatamente envolve a declaração de S.

O construtor anônimo tem um parâmetro formal adicional para cada argumento real para a expressão de criação de instância de classe que declarou a classe anônima. O _n_-ésimo parâmetro formal corresponde ao _n-1_-ésimo argumento real.

Os argumentos reais para a expressão de criação de instância de classe são usados para determinar um construtor `x` de S, conforme especificado em [§15.9.3](<#/doc/jls/jls-15>). O tipo de cada parâmetro formal do construtor anônimo é tornado idêntico ao parâmetro formal correspondente de `x`.

O corpo do construtor anônimo consiste em uma invocação explícita de construtor na forma `o.super(...)`, onde `o` é o primeiro parâmetro formal do construtor anônimo, e os argumentos reais são os parâmetros formais subsequentes do construtor, na ordem em que foram declarados. O construtor da superclasse a ser invocado é `x`.

Em todos os casos, a cláusula `throws` de um construtor anônimo lista todas as exceções verificadas lançadas pela invocação explícita de construtor contida no construtor anônimo, conforme especificado em [§15.9.3](<#/doc/jls/jls-15>), e todas as exceções verificadas lançadas por quaisquer inicializadores de instância ou inicializadores de variáveis de instância da classe anônima.

Note que é possível que a assinatura do construtor anônimo se refira a um tipo inacessível (por exemplo, se tal tipo ocorreu na assinatura do construtor da superclasse `x`). Isso não causa, por si só, quaisquer erros em tempo de compilação ou em tempo de execução.

## 15.10. Expressões de Criação e Acesso a Arrays

### 15.10.1. Expressões de Criação de Array

Uma expressão de criação de array é usada para criar novos arrays ([§10 (_Arrays_)](<#/doc/jls/jls-10>)).

ArrayCreationExpression:

[ArrayCreationExpressionWithoutInitializer](<#/doc/jls/jls-15>)
[ArrayCreationExpressionWithInitializer](<#/doc/jls/jls-15>)

ArrayCreationExpressionWithoutInitializer:

`new` [PrimitiveType](<#/doc/jls/jls-04>) [DimExprs](<#/doc/jls/jls-15>) [[Dims](<#/doc/jls/jls-04>)]
`new` [ClassOrInterfaceType](<#/doc/jls/jls-04>) [DimExprs](<#/doc/jls/jls-15>) [[Dims](<#/doc/jls/jls-04>)]

ArrayCreationExpressionWithInitializer:

`new` [PrimitiveType](<#/doc/jls/jls-04>) [Dims](<#/doc/jls/jls-04>) [ArrayInitializer](<#/doc/jls/jls-10>)
`new` [ClassOrInterfaceType](<#/doc/jls/jls-04>) [Dims](<#/doc/jls/jls-04>) [ArrayInitializer](<#/doc/jls/jls-10>)

DimExprs:

[DimExpr](<#/doc/jls/jls-15>) {[DimExpr](<#/doc/jls/jls-15>)}

DimExpr:

{[Annotation](<#/doc/jls/jls-09>)} `[` [Expression](<#/doc/jls/jls-15>) `]`

A seguinte produção de [§4.3](<#/doc/jls/jls-04>) é mostrada aqui por conveniência:

Dims:

{[Annotation](<#/doc/jls/jls-09>)} `[` `]` {{[Annotation](<#/doc/jls/jls-09>)} `[` `]`}

Uma expressão de criação de array cria um objeto que é um novo array cujos elementos são do tipo especificado pelo _PrimitiveType_ ou _ClassOrInterfaceType_.

É um erro em tempo de compilação se o _ClassOrInterfaceType_ não denotar um tipo reificável ([§4.7](<#/doc/jls/jls-04>)). Caso contrário, o _ClassOrInterfaceType_ pode nomear qualquer tipo de referência nomeado, mesmo um tipo de classe `abstract` ([§8.1.1.1](<#/doc/jls/jls-08>)) ou um tipo de interface.

As regras acima implicam que o tipo de elemento em uma expressão de criação de array não pode ser um tipo parametrizado, a menos que todos os argumentos de tipo para o tipo parametrizado sejam curingas ilimitados.

O tipo de cada expressão de dimensão dentro de um _DimExpr_ deve ser um tipo que seja conversível ([§5.1.8](<#/doc/jls/jls-05>)) para um tipo integral, ou ocorre um erro em tempo de compilação.

Cada expressão de dimensão passa por promoção numérica unária ([§5.6](<#/doc/jls/jls-05>)). O tipo promovido deve ser `int`, ou ocorre um erro em tempo de compilação.

O tipo da expressão de criação de array é um tipo de array que pode ser denotado por uma cópia da expressão de criação de array da qual a palavra-chave `new` e cada expressão _DimExpr_ e inicializador de array foram excluídos.

Por exemplo, o tipo da expressão de criação:
```java
    new double[3][3][]
    
```

é:
```java
    double[][][]
    
```

### 15.10.2. Avaliação em Tempo de Execução de Expressões de Criação de Array

Em tempo de execução, a avaliação de uma expressão de criação de array se comporta da seguinte forma:

* Se não houver expressões de dimensão, então deve haver um inicializador de array. Um array recém-alocado será inicializado com os valores fornecidos pelo inicializador de array conforme descrito em [§10.6](<#/doc/jls/jls-10>). O valor do inicializador de array torna-se o valor da expressão de criação de array.

* Caso contrário, não há inicializador de array, e:

* Primeiro, as expressões de dimensão são avaliadas, da esquerda para a direita. Se qualquer uma das avaliações de expressão for concluída abruptamente, as expressões à sua direita não são avaliadas.

* Em seguida, os valores das expressões de dimensão são verificados. Se o valor de qualquer expressão _DimExpr_ for menor que zero, então uma `NegativeArraySizeException` é lançada.

* Em seguida, o espaço é alocado para o novo array. Se não houver espaço suficiente para alocar o array, a avaliação da expressão de criação de array é concluída abruptamente lançando um `OutOfMemoryError`.

* Então, se um único _DimExpr_ aparece, um array unidimensional é criado com o comprimento especificado, e cada componente do array é inicializado com seu valor padrão ([§4.12.5](<#/doc/jls/jls-04>)).

* Caso contrário, se _n_ expressões _DimExpr_ aparecem, então a criação do array executa efetivamente um conjunto de loops aninhados de profundidade _n_`-1` para criar os arrays de arrays implícitos.

Um array multidimensional não precisa ter arrays do mesmo comprimento em cada nível.

**Exemplo 15.10.2-1. Avaliação de Criação de Array**

Em uma expressão de criação de array com uma ou mais expressões de dimensão, cada expressão de dimensão é totalmente avaliada antes de qualquer parte de qualquer expressão de dimensão à sua direita. Assim:
```java
    class Test1 {
        public static void main(String[] args) {
            int     i  = 4;
            int[][] ia = new int[i][i=3];
            System.out.println(
                "[" + ia.length + "," + ia[0].length + "]");
        }
    }
    
    
```

imprime:
```
    [4,3]
    
```

porque a primeira dimensão é calculada como `4` antes que a segunda expressão de dimensão defina `i` para `3`.

Se a avaliação de uma expressão de dimensão for concluída abruptamente, nenhuma parte de qualquer expressão de dimensão à sua direita parecerá ter sido avaliada. Assim:
```java
    class Test2 {
        public static void main(String[] args) {
            int[][] a = { { 00, 01 }, { 10, 11 } };
            int i = 99;
            try {
                a[val()][i = 1]++;
            } catch (Exception e) {
                System.out.println(e + ", i=" + i);
            }
        }
        static int val() throws Exception {
            throw new Exception("unimplemented");
        }
    }
    
```

imprime:
```
    java.lang.Exception: unimplemented, i=99
    
```

porque a atribuição embutida que define `i` para `1` nunca é executada.

**Exemplo 15.10.2-2. Criação de Array Multidimensional**

A declaração:
```java
    float[][] matrix = new float[3][3];
    
```

é equivalente em comportamento a:
```java
    float[][] matrix = new float[3][];
    for (int d = 0; d < matrix.length; d++)
        matrix[d] = new float[3];
    
```

e:
```java
    Age[][][][][] Aquarius = new Age[6][10][8][12][];
    
```

é equivalente a:
```java
    Age[][][][][] Aquarius = new Age[6][][][][];
    for (int d1 = 0; d1 < Aquarius.length; d1++) {
        Aquarius[d1] = new Age[10][][][];
        for (int d2 = 0; d2 < Aquarius[d1].length; d2++) {
            Aquarius[d1][d2] = new Age[8][][];
            for (int d3 = 0; d3 < Aquarius[d1][d2].length; d3++) {
                Aquarius[d1][d2][d3] = new Age[12][];
            }
        }
    }
    
```

com `d`, `d1`, `d2` e `d3` substituídos por nomes que ainda não foram declarados localmente. Assim, uma única expressão `new` realmente cria um array de comprimento 6, 6 arrays de comprimento 10, 6x10 = 60 arrays de comprimento 8, e 6x10x8 = 480 arrays de comprimento 12. Este exemplo deixa a quinta dimensão, que seriam arrays contendo os elementos reais do array (referências a objetos `Age`), inicializada apenas com referências nulas. Esses arrays podem ser preenchidos posteriormente por outro código, como:
```java
    Age[] Hair = { new Age("quartz"), new Age("topaz") };
    Aquarius[1][9][6][9] = Hair;
    
```

Uma matriz triangular pode ser criada por:
```java
    float[][] triang = new float[100][];
    for (int i = 0; i < triang.length; i++)
        triang[i] = new float[i+1];
    
```

Se a avaliação de uma expressão de criação de array encontrar que não há memória suficiente para realizar a operação de criação, então um `OutOfMemoryError` é lançado. Se a expressão de criação de array não tiver um inicializador de array, então esta verificação ocorre somente após a avaliação de todas as expressões de dimensão ter sido concluída normalmente. Se a expressão de criação de array tiver um inicializador de array, então um `OutOfMemoryError` pode ocorrer quando um objeto de tipo de referência é alocado durante a avaliação de uma expressão de inicializador de variável, ou quando o espaço é alocado para um array para armazenar os valores de um inicializador de array (possivelmente aninhado).

**Exemplo 15.10.2-3. `OutOfMemoryError` e Avaliação de Expressão de Dimensão**
```java
    class Test3 {
        public static void main(String[] args) {
            int len = 0, oldlen = 0;
            Object[] a = new Object[0];
            try {
                for (;;) {
                    ++len;
                    Object[] temp = new Object[oldlen = len];
                    temp[0] = a;
                    a = temp;
                }
            } catch (Error e) {
                System.out.println(e + ", " + (oldlen==len));
            }
        }
    }
    
```

Este programa produz a saída:
```
    java.lang.OutOfMemoryError, true
    
```

porque a condição de falta de memória é detectada após a avaliação da expressão de dimensão `oldlen = len`.

Compare isso com expressões de criação de instância de classe ([§15.9](<#/doc/jls/jls-15>)), que detectam a condição de falta de memória antes de avaliar as expressões de argumento ([§15.9.4](<#/doc/jls/jls-15>)).

### 15.10.3. Expressões de Acesso a Arrays

Uma expressão de acesso a array se refere a uma variável que é um componente de um array.

ArrayAccess:

[ExpressionName](<#/doc/jls/jls-06>) `[` [Expression](<#/doc/jls/jls-15>) `]`
[PrimaryNoNewArray](<#/doc/jls/jls-15>) `[` [Expression](<#/doc/jls/jls-15>) `]`
[ArrayCreationExpressionWithInitializer](<#/doc/jls/jls-15>) `[` [Expression](<#/doc/jls/jls-15>) `]`

Uma expressão de acesso a array contém duas subexpressões, a _expressão de referência de array_ (antes do colchete esquerdo) e a _expressão de índice_ (dentro dos colchetes).

Note que a expressão de referência de array pode ser um nome ou qualquer expressão primária que não seja uma expressão de criação de array, a menos que a expressão de criação de array tenha um inicializador de array ([§15.10.1](<#/doc/jls/jls-15>)).

O tipo da expressão de referência de array deve ser um tipo de array (chame-o de T`[]`, um array cujos componentes são do tipo T), ou ocorre um erro em tempo de compilação.

A expressão de índice passa por promoção numérica unária ([§5.6](<#/doc/jls/jls-05>)). O tipo promovido deve ser `int`, ou ocorre um erro em tempo de compilação.

O tipo da expressão de acesso a array é o resultado da aplicação da conversão de captura ([§5.1.10](<#/doc/jls/jls-05>)) a T.

O resultado de uma expressão de acesso a array é uma variável do tipo T, ou seja, a variável dentro do array selecionada pelo valor da expressão de índice.

Esta variável resultante, que é um componente do array, nunca é considerada `final`, mesmo que a expressão de referência de array denotasse uma variável `final`.

### 15.10.4. Avaliação em Tempo de Execução de Expressões de Acesso a Arrays

Em tempo de execução, a avaliação de uma expressão de acesso a array se comporta da seguinte forma:

* Primeiro, a expressão de referência de array é avaliada. Se esta avaliação for concluída abruptamente, então o acesso ao array é concluído abruptamente pela mesma razão e a expressão de índice não é avaliada.

* Caso contrário, a expressão de índice é avaliada. Se esta avaliação for concluída abruptamente, então o acesso ao array é concluído abruptamente pela mesma razão.

* Caso contrário, se o valor da expressão de referência de array for `null`, então uma `NullPointerException` é lançada.

* Caso contrário, o valor da expressão de referência de array realmente se refere a um array. Se o valor da expressão de índice for menor que zero, ou maior ou igual ao `length` do array, então uma `ArrayIndexOutOfBoundsException` é lançada.

* Caso contrário, o resultado do acesso ao array é a variável do tipo T, dentro do array, selecionada pelo valor da expressão de índice.

**Exemplo 15.10.4-1. Referência de Array é Avaliada Primeiro**

Em um acesso a array, a expressão à esquerda dos colchetes parece ser totalmente avaliada antes que qualquer parte da expressão dentro dos colchetes seja avaliada. Por exemplo, na expressão (admitidamente monstruosa) `a[(a=b)[3]]`, a expressão `a` é totalmente avaliada antes da expressão `(a=b)[3]`; isso significa que o valor original de `a` é obtido e lembrado enquanto a expressão `(a=b)[3]` é avaliada. Este array referenciado pelo valor original de `a` é então indexado por um valor que é o elemento `3` de outro array (possivelmente o mesmo array) que foi referenciado por `b` e agora também é referenciado por `a`.

Assim, o programa:
```java
    class Test1 {
        public static void main(String[] args) {
            int[] a = { 11, 12, 13, 14 };
            int[] b = { 0, 1, 2, 3 };
            System.out.println(a[(a=b)[3]]);
        }
    }
    
```

imprime:
```
    14
    
```

porque o valor da expressão monstruosa é equivalente a `a[b[3]]` ou `a[3]` ou `14`.

**Exemplo 15.10.4-2. Conclusão Abrupta da Avaliação da Referência de Array**

Se a avaliação da expressão à esquerda dos colchetes for concluída abruptamente, nenhuma parte da expressão dentro dos colchetes parecerá ter sido avaliada. Assim, o programa:
```java
    class Test2 {
        public static void main(String[] args) {
            int index = 1;
            try {
                skedaddle()[index=2]++;
            } catch (Exception e) {
                System.out.println(e + ", index=" + index);
            }
        }
        static int[] skedaddle() throws Exception {
            throw new Exception("Ciao");
        }
    }
    
```

imprime:
```
    java.lang.Exception: Ciao, index=1
    
```

porque a atribuição embutida de `2` a `index` nunca ocorre.

**Exemplo 15.10.4-3. Referência de Array `null`

Se a expressão de referência de array produzir `null` em vez de uma referência a um array, então uma `NullPointerException` é lançada em tempo de execução, mas somente depois que todas as partes da expressão de acesso a array tiverem sido avaliadas e somente se essas avaliações forem concluídas normalmente. Assim, o programa:
```java
    class Test3 {
        public static void main(String[] args) {
            int index = 1;
            try {
                nada()[index=2]++;
            } catch (Exception e) {
                System.out.println(e + ", index=" + index);
            }
        }
        static int[] nada() { return null; }
    }
    
```

imprime:
```
    java.lang.NullPointerException, index=2
```
porque a atribuição embutida de `2` a `index` ocorre antes da verificação de uma expressão de referência de array `null`. Como um exemplo relacionado, o programa:
```java
    class Test4 {
        public static void main(String[] args) {
            int[] a = null;
            try {
                int i = a[vamoose()];
                System.out.println(i);
            } catch (Exception e) {
                System.out.println(e);
            }
        }
        static int vamoose() throws Exception {
            throw new Exception("Twenty-three skidoo!");
        }
    }
    
```
sempre imprime:
```
    java.lang.Exception: Twenty-three skidoo!
    
```
Uma `NullPointerException` nunca ocorre, porque a expressão de índice deve ser completamente avaliada antes que qualquer outra parte do acesso ao array ocorra, e isso inclui a verificação se o valor da expressão de referência do array é `null`.

## 15.11. Expressões de Acesso a Campos

Uma expressão de acesso a campo pode acessar um campo de um objeto ou array, uma referência ao qual é o valor de uma expressão ou da palavra-chave especial `super`.

FieldAccess:

[Primary](<#/doc/jls/jls-15>) `.` [Identifier](<#/doc/jls/jls-03>)
`super` `.` [Identifier](<#/doc/jls/jls-03>)
[TypeName](<#/doc/jls/jls-06>) `.` `super` `.` [Identifier](<#/doc/jls/jls-03>)

O significado de uma expressão de acesso a campo é determinado usando as mesmas regras que para nomes qualificados ([§6.5.6.2](<#/doc/jls/jls-06>)), mas limitado pelo fato de que uma expressão não pode denotar um pacote, tipo de classe ou tipo de interface.

Também é possível referir-se a um campo da instância atual ou da classe atual usando um nome simples ([§6.5.6.1](<#/doc/jls/jls-06>)).

### 15.11.1. Acesso a Campo Usando um Primary

O tipo do _Primary_ deve ser um tipo de referência T, ou ocorre um erro em tempo de compilação.

O significado da expressão de acesso a campo é determinado da seguinte forma:

  * Se o identificador nomeia vários campos membro acessíveis ([§6.6](<#/doc/jls/jls-06>)) no tipo T, então o acesso ao campo é ambíguo e ocorre um erro em tempo de compilação.

  * Se o identificador não nomeia um campo membro acessível no tipo T, então o acesso ao campo é indefinido e ocorre um erro em tempo de compilação.

  * Caso contrário, o identificador nomeia um único campo membro acessível no tipo T, e o tipo da expressão de acesso a campo é o tipo do campo membro após a conversão de captura ([§5.1.10](<#/doc/jls/jls-05>)).

Em tempo de execução, o resultado da expressão de acesso a campo é calculado da seguinte forma: (assumindo que o programa está correto em relação à análise de atribuição definida, ou seja, toda variável `final` em branco é definitivamente atribuída antes do acesso)

  * Se o campo é `static`:

    * A expressão _Primary_ é avaliada, e o resultado é descartado. Se a avaliação da expressão _Primary_ for concluída abruptamente, a expressão de acesso a campo é concluída abruptamente pela mesma razão.

    * Se o campo é um campo `final` não em branco, então o resultado é o valor da variável de classe especificada na classe ou interface que é o tipo da expressão _Primary_.

    * Se o campo não é `final`, ou é um `final` em branco e o acesso ao campo ocorre em um inicializador de variável de classe ([§8.3.2](<#/doc/jls/jls-08>)) ou inicializador estático ([§8.7](<#/doc/jls/jls-08>)), então o resultado é uma variável, ou seja, a variável de classe especificada na classe que é o tipo da expressão _Primary_.

  * Se o campo não é `static`:

    * A expressão _Primary_ é avaliada. Se a avaliação da expressão _Primary_ for concluída abruptamente, a expressão de acesso a campo é concluída abruptamente pela mesma razão.

    * Se o valor do _Primary_ é `null`, então uma `NullPointerException` é lançada.

    * Se o campo é um `final` não em branco, então o resultado é o valor do campo membro nomeado no tipo T encontrado no objeto referenciado pelo valor do _Primary_.

    * Se o campo não é `final`, ou é um `final` em branco e o acesso ao campo ocorre em um inicializador de variável de instância ([§8.3.2](<#/doc/jls/jls-08>)), inicializador de instância ([§8.6](<#/doc/jls/jls-08>)), ou construtor ([§8.8](<#/doc/jls/jls-08>)), então o resultado é uma variável, ou seja, o campo membro nomeado no tipo T encontrado no objeto referenciado pelo valor do _Primary_.

Note que apenas o tipo da expressão _Primary_, e não a classe do objeto real referenciado em tempo de execução, é usado para determinar qual campo usar.

**Exemplo 15.11.1-1. Ligação Estática para Acesso a Campo**
```java
    class S           { int x = 0; }
    class T extends S { int x = 1; }
    class Test1 {
        public static void main(String[] args) {
            T t = new T();
            System.out.println("t.x=" + t.x + when("t", t));
            S s = new S();
            System.out.println("s.x=" + s.x + when("s", s));
            s = t;
            System.out.println("s.x=" + s.x + when("s", s));
        }
        static String when(String name, Object t) {
            return " when " + name + " holds a "
                            + t.getClass() + " at run time.";
        }
    }
    
```
Este programa produz a seguinte saída:
```
    t.x=1 when t holds a class T at run time.
    s.x=0 when s holds a class S at run time.
    s.x=0 when s holds a class T at run time.
    
```
A última linha mostra que, de fato, o campo acessado não depende da classe em tempo de execução do objeto referenciado; mesmo que `s` contenha uma referência a um objeto da classe `T`, a expressão `s.x` refere-se ao campo `x` da classe `S`, porque o tipo da expressão `s` é `S`. Objetos da classe `T` contêm dois campos chamados `x`, um para a classe `T` e outro para sua superclasse `S`.

Essa falta de pesquisa dinâmica para acessos a campos permite que os programas sejam executados eficientemente com implementações diretas. O poder da ligação tardia (late binding) e da sobrescrita (overriding) está disponível, mas apenas quando métodos de instância são usados. Considere o mesmo exemplo usando métodos de instância para acessar os campos:
```java
    class S           { int x = 0; int z() { return x; } }
    class T extends S { int x = 1; int z() { return x; } }
    class Test2 {
        public static void main(String[] args) {
            T t = new T();
            System.out.println("t.z()=" + t.z() + when("t", t));
            S s = new S();
            System.out.println("s.z()=" + s.z() + when("s", s));
            s = t;
            System.out.println("s.z()=" + s.z() + when("s", s));
        }
        static String when(String name, Object t) {
            return " when " + name + " holds a "
                            + t.getClass() + " at run time.";
        }
    }
    
```
Agora a saída é:
```
    t.z()=1 when t holds a class T at run time.
    s.z()=0 when s holds a class S at run time.
    s.z()=1 when s holds a class T at run time.
    
```
A última linha mostra que, de fato, o método acessado _depende_ da classe em tempo de execução do objeto referenciado; quando `s` contém uma referência a um objeto da classe `T`, a expressão `s.z()` refere-se ao método `z` da classe `T`, apesar do fato de que o tipo da expressão `s` é `S`. O método `z` da classe `T` sobrescreve o método `z` da classe `S`.

**Exemplo 15.11.1-2. Variável Receptora é Irrelevante para Acesso a Campo `static`

O programa a seguir demonstra que uma referência nula pode ser usada para acessar uma variável de classe (`static`) sem causar uma exceção:
```java
    class Test3 {
        static String mountain = "Chocorua";
        static Test3 favorite(){
            System.out.print("Mount ");
            return null;
        }
        public static void main(String[] args) {
            System.out.println(favorite().mountain);
        }
    }
    
```
Ele compila, executa e imprime:
```
    Mount Chocorua
    
```
Embora o resultado de `favorite()` seja `null`, uma `NullPointerException` não é lançada. O fato de que "`Mount `" é impresso demonstra que a expressão _Primary_ é de fato totalmente avaliada em tempo de execução, apesar do fato de que apenas seu tipo, e não seu valor, é usado para determinar qual campo acessar (porque o campo `mountain` é `static`).

### 15.11.2. Acessando Membros da Superclasse usando `super`

A forma `super`.`_Identifier_ refere-se ao campo nomeado _Identifier_ do objeto atual, mas com o objeto atual visto como uma instância da superclasse da classe atual.

A forma T`.`super`.`_Identifier_ refere-se ao campo nomeado _Identifier_ da instância lexicamente envolvente correspondente a T, mas com essa instância vista como uma instância da superclasse de T.

As formas que usam a palavra-chave `super` podem ser usadas nos locais dentro de uma declaração de classe que permitem a palavra-chave `this` como uma expressão ([§15.8.3](<#/doc/jls/jls-15>)).

É um erro em tempo de compilação se uma expressão de acesso a campo usando a palavra-chave `super` ocorre em um contexto estático ([§8.1.3](<#/doc/jls/jls-08>)) ou em um contexto de construção inicial ([§8.8.7](<#/doc/jls/jls-08>)) da classe atual.

Para uma expressão de acesso a campo da forma `super`.`_Identifier_ :

  * É um erro em tempo de compilação se a declaração de classe ou interface imediatamente envolvente da expressão de acesso a campo é a classe `Object` ou uma interface.

Para uma expressão de acesso a campo da forma T`.`super`.`_Identifier_ :

  * É um erro em tempo de compilação se T é a classe `Object` ou uma interface.

  * Seja U a declaração de classe ou interface imediatamente envolvente da expressão de acesso a campo. É um erro em tempo de compilação se U não é uma classe interna de T ou o próprio T.

Suponha que uma expressão de acesso a campo `super`.`f` aparece dentro da classe C, e a superclasse imediata de C é a classe S. Se `f` em S é acessível da classe C ([§6.6](<#/doc/jls/jls-06>)), então `super`.`f` é tratado como se fosse a expressão `this`.`f` no corpo da classe S. Caso contrário, ocorre um erro em tempo de compilação.

Assim, `super`.`f` pode acessar o campo `f` que é acessível na classe S, mesmo que esse campo esteja oculto por uma declaração de um campo `f` na classe C.

Suponha que uma expressão de acesso a campo T`.`super`.`f` aparece dentro da classe C, e a superclasse imediata da classe denotada por T é uma classe cujo nome totalmente qualificado é S. Se `f` em S é acessível de C, então T`.`super`.`f` é tratado como se fosse a expressão `this`.`f` no corpo da classe S. Caso contrário, ocorre um erro em tempo de compilação.

Assim, T`.`super`.`f` pode acessar o campo `f` que é acessível na classe S, mesmo que esse campo esteja oculto por uma declaração de um campo `f` na classe T.

**Exemplo 15.11.2-1. A Expressão `super`
```java
    interface I           { int x = 0; }
    class T1 implements I { int x = 1; }
    class T2 extends T1   { int x = 2; }
    class T3 extends T2 {
        int x = 3;
        void test() {
            System.out.println("x=\t\t"          + x);
            System.out.println("super.x=\t\t"    + super.x);
            System.out.println("((T2)this).x=\t" + ((T2)this).x);
            System.out.println("((T1)this).x=\t" + ((T1)this).x);
            System.out.println("((I)this).x=\t"  + ((I)this).x);
        }
    }
    class Test {
        public static void main(String[] args) {
            new T3().test();
        }
    }
    
```
Este programa produz a seguinte saída:
```
    x=              3
    super.x=        2
    ((T2)this).x=   2
    ((T1)this).x=   1
    ((I)this).x=    0
    
```
Dentro da classe `T3`, a expressão `super.x` tem o mesmo efeito que `((T2)this).x` quando `x` tem acesso de pacote. Note que `super.x` não é especificado em termos de um cast, devido a dificuldades relacionadas ao acesso a membros `protected` da superclasse.

## 15.12. Expressões de Invocação de Método

Uma expressão de invocação de método é usada para invocar um método de classe ou de instância.

MethodInvocation:

[MethodName](<#/doc/jls/jls-06>) `(` [[ArgumentList](<#/doc/jls/jls-15>)] `)`
[TypeName](<#/doc/jls/jls-06>) `.` [[TypeArguments](<#/doc/jls/jls-04>)] [Identifier](<#/doc/jls/jls-03>) `(` [[ArgumentList](<#/doc/jls/jls-15>)] `)`
[ExpressionName](<#/doc/jls/jls-06>) `.` [[TypeArguments](<#/doc/jls/jls-04>)] [Identifier](<#/doc/jls/jls-03>) `(` [[ArgumentList](<#/doc/jls/jls-15>)] `)`
[Primary](<#/doc/jls/jls-15>) `.` [[TypeArguments](<#/doc/jls/jls-04>)] [Identifier](<#/doc/jls/jls-03>) `(` [[ArgumentList](<#/doc/jls/jls-15>)] `)`
`super` `.` [[TypeArguments](<#/doc/jls/jls-04>)] [Identifier](<#/doc/jls/jls-03>) `(` [[ArgumentList](<#/doc/jls/jls-15>)] `)`
[TypeName](<#/doc/jls/jls-06>) `.` `super` `.` [[TypeArguments](<#/doc/jls/jls-04>)] [Identifier](<#/doc/jls/jls-03>) `(` [[ArgumentList](<#/doc/jls/jls-15>)] `)`

ArgumentList:

[Expression](<#/doc/jls/jls-15>) {`,` [Expression](<#/doc/jls/jls-15>)}

Resolver um nome de método em tempo de compilação é mais complicado do que resolver um nome de campo devido à possibilidade de sobrecarga de método. Invocar um método em tempo de execução também é mais complicado do que acessar um campo devido à possibilidade de sobrescrita de método de instância.

Determinar o método que será invocado por uma expressão de invocação de método envolve várias etapas. As três seções a seguir descrevem o processamento em tempo de compilação de uma invocação de método. A determinação do tipo da expressão de invocação de método é especificada em [§15.12.3](<#/doc/jls/jls-15>).

Os tipos de exceção que uma expressão de invocação de método pode lançar são especificados em [§11.2.1](<#/doc/jls/jls-11>).

É um erro em tempo de compilação se o nome à esquerda do "`.`" mais à direita que ocorre antes do `(` em um _MethodInvocation_ não pode ser classificado como um _TypeName_ ou um _ExpressionName_ ([§6.5.2](<#/doc/jls/jls-06>)).

Se _TypeArguments_ está presente à esquerda de _Identifier_, então é um erro em tempo de compilação se qualquer um dos argumentos de tipo são curingas ([§4.5.1](<#/doc/jls/jls-04>)).

Uma expressão de invocação de método é uma poly expression se todas as seguintes condições forem verdadeiras:

  * A invocação aparece em um contexto de atribuição ou um contexto de invocação ([§5.2](<#/doc/jls/jls-05>), [§5.3](<#/doc/jls/jls-05>)).

  * Se a invocação é qualificada (ou seja, qualquer forma de _MethodInvocation_ exceto a primeira), então a invocação omite _TypeArguments_ à esquerda do _Identifier_.

  * O método a ser invocado, conforme determinado pelas subseções a seguir, é genérico ([§8.4.4](<#/doc/jls/jls-08>)) e tem um tipo de retorno que menciona pelo menos um dos parâmetros de tipo do método.

Caso contrário, a expressão de invocação de método é uma expressão autônoma.

### 15.12.1. Etapa 1 em Tempo de Compilação: Determinar o Tipo a Ser Pesquisado

O primeiro passo no processamento de uma invocação de método em tempo de compilação é descobrir o nome do método a ser invocado e qual tipo pesquisar por definições de métodos com esse nome.

O nome do método é especificado pelo _MethodName_ ou _Identifier_ que precede imediatamente o parêntese esquerdo do _MethodInvocation_.

Para o tipo a ser pesquisado, há seis casos a considerar, dependendo da forma que precede o parêntese esquerdo do _MethodInvocation_ :

  * Se a forma é _MethodName_, ou seja, apenas um _Identifier_, então:

Se o _Identifier_ aparece no escopo de uma declaração de método com esse nome ([§6.3](<#/doc/jls/jls-06>), [§6.4.1](<#/doc/jls/jls-06>)), então:

    * Se houver uma declaração de classe ou interface envolvente da qual esse método é um membro, seja E a declaração de classe ou interface mais interna. O tipo a ser pesquisado é o tipo de E`.`this` ([§15.8.4](<#/doc/jls/jls-15>)).

Esta política de busca é chamada de "regra do pente". Ela efetivamente procura por métodos na hierarquia de superclasses de uma classe aninhada antes de procurar por métodos em uma classe envolvente e sua hierarquia de superclasses. Veja [§6.5.7.1](<#/doc/jls/jls-06>) para um exemplo.

    * Caso contrário, a declaração do método pode estar no escopo devido a uma ou mais declarações de importação estática única ou importação estática sob demanda. Não há tipo a ser pesquisado, pois o método a ser invocado é determinado posteriormente ([§15.12.2.1](<#/doc/jls/jls-15>)).

  * Se a forma é _TypeName_ `.` _[TypeArguments]_ _Identifier_, então o tipo a ser pesquisado é o tipo (possivelmente raw) denotado por _TypeName_.

  * Se a forma é _ExpressionName_ `.` _[TypeArguments]_ _Identifier_, então o tipo a ser pesquisado é o tipo declarado T da variável denotada por _ExpressionName_ se T é um tipo de classe ou interface, ou o limite superior de T se T é uma variável de tipo.

  * Se a forma é _Primary_ `.` _[TypeArguments]_ _Identifier_, então seja T o tipo da expressão _Primary_. O tipo a ser pesquisado é T se T é um tipo de classe ou interface, ou o limite superior de T se T é uma variável de tipo.

É um erro em tempo de compilação se T não é um tipo de referência.

  * Se a forma é `super` `.` _[TypeArguments]_ _Identifier_, então o tipo a ser pesquisado é o tipo da superclasse direta da classe cuja declaração contém a invocação do método.

Seja E a declaração de classe ou interface imediatamente envolvente da invocação do método. É um erro em tempo de compilação se E é a classe `Object` ou uma interface.

  * Se a forma é _TypeName_ `.` `super` `.` _[TypeArguments]_ _Identifier_, então:

    * É um erro em tempo de compilação se _TypeName_ não denota nem uma classe nem uma interface.

    * Se _TypeName_ denota uma classe, C, então o tipo a ser pesquisado é o tipo da superclasse direta de C.

É um erro em tempo de compilação se C não é uma declaração de classe lexicamente envolvente da invocação do método, ou se C é a classe `Object`.

Seja E a declaração de classe ou interface imediatamente envolvente da invocação do método. É um erro em tempo de compilação se E é a classe `Object`.

    * Caso contrário, _TypeName_ denota uma interface, I.

Seja E a declaração de classe ou interface imediatamente envolvente da invocação do método. É um erro em tempo de compilação se I não é uma superinterface direta de E, ou se existe alguma outra superclasse direta ou superinterface direta de E, J, tal que J é uma subclasse ou subinterface de I.

O tipo a ser pesquisado é o tipo de I que é um tipo de superinterface direta de E.

A sintaxe _TypeName_ `.` `super` é sobrecarregada: tradicionalmente, o _TypeName_ refere-se a uma declaração de classe lexicamente envolvente, e o alvo é a superclasse desta classe, como se a invocação fosse um `super` não qualificado na declaração de classe lexicamente envolvente.
```java
    class Superclass {
        void foo() { System.out.println("Hi"); }
    }
    
    class Subclass1 extends Superclass {
        void foo() { throw new UnsupportedOperationException(); }
    
        Runnable tweak = new Runnable() {
            void run() {
                Subclass1.super.foo();  // Gets the 'println' behavior
            }
        };
    }
    
```
Para suportar a invocação de métodos default em superinterfaces, o _TypeName_ também pode se referir a uma superinterface direta da classe ou interface atual, e o alvo é essa superinterface.
```java
    interface Superinterface {
        default void foo() { System.out.println("Hi"); }
    }
    
    class Subclass2 implements Superinterface {
        void foo() { throw new UnsupportedOperationException(); }
    
        void tweak() {
            Superinterface.super.foo();  // Gets the 'println' behavior
        }
    }
    
```
Nenhuma sintaxe suporta uma combinação dessas formas, ou seja, invocar um método de superinterface de uma declaração de classe lexicamente envolvente, como se a invocação fosse da forma _InterfaceName_ `.` `super` na declaração de classe lexicamente envolvente.
```java
    class Subclass3 implements Superinterface {
        void foo() { throw new UnsupportedOperationException(); }
    
        Runnable tweak = new Runnable() {
            void run() {
                Subclass3.Superinterface.super.foo();  // Illegal
            }
        };
    }
    
```
Uma solução alternativa é introduzir um método `private` na declaração de classe lexicamente envolvente, que realiza a chamada `super` da interface.

### 15.12.2. Etapa 2 em Tempo de Compilação: Determinar a Assinatura do Método

A segunda etapa pesquisa o tipo determinado na etapa anterior por métodos membro. Esta etapa usa o nome do método e as expressões de argumento para localizar métodos que são tanto _acessíveis_ quanto _aplicáveis_, ou seja, declarações que podem ser invocadas corretamente com os argumentos fornecidos.

Pode haver mais de um método desse tipo, caso em que o _mais específico_ é escolhido. O descritor (assinatura mais tipo de retorno) do método mais específico é o usado em tempo de execução para realizar o despacho do método.

Certas expressões de argumento que contêm expressões lambda implicitamente tipadas ([§15.27.1](<#/doc/jls/jls-15>)) ou referências de método inexatas ([§15.13.1](<#/doc/jls/jls-15>)) são ignoradas pelos testes de aplicabilidade, porque seu significado não pode ser determinado até que o tipo alvo da invocação seja selecionado. Por outro lado, são apenas as expressões de argumento - _não_ o tipo alvo da invocação - que influenciam os testes de aplicabilidade, mesmo que a expressão de invocação de método seja uma poly expression.

O processo de determinação da aplicabilidade começa determinando os métodos _potencialmente aplicáveis_ ([§15.12.2.1](<#/doc/jls/jls-15>)). Em seguida, para garantir a compatibilidade com a linguagem de programação Java anterior ao Java SE 5.0, o processo continua em três fases:

  1. A primeira fase realiza a resolução de sobrecarga sem permitir a conversão de boxing ou unboxing, ou o uso de invocação de método de aridade variável. Se nenhum método aplicável for encontrado durante esta fase, o processamento continua para a segunda fase.

Isso garante que quaisquer chamadas que eram válidas na linguagem de programação Java antes do Java SE 5.0 não sejam consideradas ambíguas como resultado da introdução de métodos de aridade variável, boxing implícito e/ou unboxing. No entanto, a declaração de um método de aridade variável ([§8.4.1](<#/doc/jls/jls-08>)) pode alterar o método escolhido para uma dada expressão de invocação de método, porque um método de aridade variável é tratado como um método de aridade fixa na primeira fase. Por exemplo, declarar `m(Object...)` em uma classe que já declara `m(Object)` faz com que `m(Object)` não seja mais escolhido para algumas expressões de invocação (como `m(null)`), pois `m(Object[])` é mais específico.

  2. A segunda fase realiza a resolução de sobrecarga permitindo boxing e unboxing, mas ainda impede o uso de invocação de método de aridade variável. Se nenhum método aplicável for encontrado durante esta fase, o processamento continua para a terceira fase.

Isso garante que um método nunca seja escolhido através de invocação de método de aridade variável se ele for aplicável através de invocação de método de aridade fixa.

  3. A terceira fase permite que a sobrecarga seja combinada com métodos de aridade variável, boxing e unboxing.

Um método é _aplicável_ se for aplicável por uma das invocações estritas (a primeira fase, [§15.12.2.2](<#/doc/jls/jls-15>)), invocação flexível (a segunda fase, [§15.12.2.3](<#/doc/jls/jls-15>)), ou invocação de aridade variável (a terceira fase, [§15.12.2.4](<#/doc/jls/jls-15>)). Decidir se um método é aplicável exigirá, no caso de métodos genéricos ([§8.4.4](<#/doc/jls/jls-08>)), uma análise dos argumentos de tipo. Os argumentos de tipo podem ser passados explicitamente ou implicitamente; se forem passados implicitamente, então os limites dos argumentos de tipo devem ser inferidos das expressões de argumento ([§18 (_Inferência de Tipo_)](<#/doc/jls/jls-18>)).

Se vários métodos aplicáveis foram identificados durante uma das três fases de teste de aplicabilidade, então o mais específico é escolhido, conforme especificado em [§15.12.2.5](<#/doc/jls/jls-15>).

Para verificar a aplicabilidade, os tipos dos argumentos de uma invocação não podem, em geral, ser entradas para a análise. Isso ocorre porque:

  * Os argumentos para uma invocação de método podem ser poly expressions.

  * Poly expressions não podem ser tipadas na ausência de um tipo alvo.

  * A resolução de sobrecarga deve ser concluída antes que os tipos alvo dos argumentos sejam conhecidos.

Em vez disso, a entrada para a verificação de aplicabilidade é uma lista dos próprios argumentos. Os argumentos _podem_ ser verificados quanto à compatibilidade com tipos alvo potenciais, mesmo que os tipos finais dos argumentos sejam desconhecidos.

Note que a resolução de sobrecarga é independente de um tipo alvo. Isso ocorre por duas razões:

  * Primeiro, isso torna o modelo do usuário mais acessível e menos propenso a erros. O significado de um nome de método (ou seja, a declaração correspondente ao nome) é muito fundamental para o significado de um programa para depender de dicas contextuais sutis. (Em contraste, outras poly expressions podem ter comportamentos diferentes dependendo de um tipo alvo; mas a variação no comportamento é sempre limitada e essencialmente equivalente, enquanto nenhuma garantia pode ser feita sobre o comportamento de um conjunto arbitrário de métodos que compartilham um nome e aridade.)

  * Segundo, permite que outras propriedades - como se o método é ou não uma poly expression ([§15.12](<#/doc/jls/jls-15>)) ou como categorizar uma expressão condicional ([§15.25](<#/doc/jls/jls-15>)) - dependam do significado do nome do método, mesmo antes que um tipo alvo seja conhecido.

**Exemplo 15.12.2-1. Aplicabilidade de Método**
```java
    class Doubler {
                static int two()      { return two(1); }
        private static int two(int i) { return 2*i;    }
    }
    class Test extends Doubler {
        static long two(long j) { return j+j; }
    
        public static void main(String[] args) {
            System.out.println(two(3));
            System.out.println(Doubler.two(3)); // compile-time error
        }
    }
    
```
Para a invocação do método `two(1)` dentro da classe `Doubler`, existem dois métodos acessíveis chamados `two`, mas apenas o segundo é aplicável, e é esse que é invocado em tempo de execução.

Para a invocação do método `two(3)` dentro da classe `Test`, existem dois métodos aplicáveis, mas apenas o da classe `Test` é acessível, e é esse que será invocado em tempo de execução (o argumento `3` é convertido para o tipo `long`).

Para a invocação do método `Doubler.two(3)`, a classe `Doubler`, e não a classe `Test`, é pesquisada por métodos chamados `two`; o único método aplicável não é acessível, e então esta invocação de método causa um erro em tempo de compilação.

Outro exemplo é:
```java
    class ColoredPoint {
        int x, y;
        byte color;
        void setColor(byte color) { this.color = color; }
    }
    class Test {
        public static void main(String[] args) {
            ColoredPoint cp = new ColoredPoint();
            byte color = 37;
            cp.setColor(color);
            cp.setColor(37);  // compile-time error
        }
    }
    
```
Aqui, ocorre um erro em tempo de compilação para a segunda invocação de `setColor`, porque nenhum método aplicável pode ser encontrado em tempo de compilação. O tipo do literal `37` é `int`, e `int` não pode ser convertido para `byte` por conversão de invocação. A conversão de atribuição, que é usada na inicialização da variável `color`, realiza uma conversão implícita da constante do tipo `int` para `byte`, o que é permitido porque o valor `37` é pequeno o suficiente para ser representado no tipo `byte`; mas tal conversão não é permitida para conversão de invocação.

Se o método `setColor` tivesse sido declarado para aceitar um `int` em vez de um `byte`, então ambas as invocações de método estariam corretas; a primeira invocação seria permitida porque a conversão de invocação permite uma conversão de alargamento de `byte` para `int`. No entanto, um cast de estreitamento seria então necessário no corpo de `setColor`:
```java
    void setColor(int color) { this.color = (byte)color; }
    
```
Aqui está um exemplo de ambiguidade de sobrecarga. Considere o programa:
```java
    class Point { int x, y; }
    class ColoredPoint extends Point { int color; }
    class Test {
        static void test(ColoredPoint p, Point q) {
            System.out.println("(ColoredPoint, Point)");
        }
        static void test(Point p, ColoredPoint q) {
            System.out.println("(Point, ColoredPoint)");
        }
        public static void main(String[] args) {
            ColoredPoint cp = new ColoredPoint();
            test(cp, cp);  // compile-time error
        }
    }
    
```
Este exemplo produz um erro em tempo de compilação. O problema é que existem duas declarações de `test` que são aplicáveis e acessíveis, e nenhuma é mais específica que a outra. Portanto, a invocação do método é ambígua.

Se uma terceira definição de `test` fosse adicionada:
```java
    static void test(ColoredPoint p, ColoredPoint q) {
        System.out.println("(ColoredPoint, ColoredPoint)");
    }
    
```
então seria mais específica que as outras duas, e a invocação do método não seria mais ambígua.

**Exemplo 15.12.2-2. Tipo de Retorno Não Considerado Durante a Seleção de Método**
```java
    class Point { int x, y; }
    class ColoredPoint extends Point { int color; }
    class Test {
        static int test(ColoredPoint p) {
            return p.color;
        }
        static String test(Point p) {
            return "Point";
        }
        public static void main(String[] args) {
            ColoredPoint cp = new ColoredPoint();
            String s = test(cp);  // compile-time error
        }
    }
    
```
Aqui, a declaração mais específica do método `test` é aquela que aceita um parâmetro do tipo `ColoredPoint`. Como o tipo de resultado do método é `int`, ocorre um erro em tempo de compilação porque um `int` não pode ser convertido para uma `String` por conversão de atribuição. Este exemplo mostra que os tipos de resultado dos métodos não participam da resolução de métodos sobrecarregados, de modo que o segundo método `test`, que retorna uma `String`, não é escolhido, mesmo que tenha um tipo de resultado que permitiria que o programa de exemplo compilasse sem erro.

**Exemplo 15.12.2-3. Escolhendo o Método Mais Específico**

O método mais específico é escolhido em tempo de compilação; seu descritor determina qual método é realmente executado em tempo de execução. Se um novo método for adicionado a uma classe, o código-fonte que foi compilado com a definição antiga da classe pode não usar o novo método, mesmo que uma recompilação fizesse com que este método fosse escolhido.
Então, por exemplo, considere duas unidades de compilação, uma para a classe `Point`:
```java
    package points;
    public class Point {
        public int x, y;
        public Point(int x, int y) { this.x = x; this.y = y; }
        public String toString() { return toString(""); }
        public String toString(String s) {
            return "(" + x + "," + y + s + ")";
        }
    }
    
```

e uma para a classe `ColoredPoint`:
```java
    package points;
    public class ColoredPoint extends Point {
        public static final int
            RED = 0, GREEN = 1, BLUE = 2;
        public static String[] COLORS =
            { "red", "green", "blue" };
    
        public byte color;
        public ColoredPoint(int x, int y, int color) {
            super(x, y);
            this.color = (byte)color;
        }
    
        /** Copy all relevant fields of the argument into
            this ColoredPoint object. */
        public void adopt(Point p) { x = p.x; y = p.y; }
    
        public String toString() {
            String s = "," + COLORS[color];
            return super.toString(s);
        }
    }
    
```

Agora considere uma terceira unidade de compilação que usa `ColoredPoint`:
```java
    import points.*;
    class Test {
        public static void main(String[] args) {
            ColoredPoint cp =
                new ColoredPoint(6, 6, ColoredPoint.RED);
            ColoredPoint cp2 =
                new ColoredPoint(3, 3, ColoredPoint.GREEN);
            cp.adopt(cp2);
            System.out.println("cp: " + cp);
        }
    }
    
```

A saída é:
```
    cp: (3,3,red)
    
```

O programador que codificou a classe `Test` esperava ver a palavra `green`, porque o argumento real, um `ColoredPoint`, tem um campo `color`, e `color` pareceria ser um "campo relevante". (Claro, a documentação para o pacote `points` deveria ter sido muito mais precisa!)

Observe, a propósito, que o método mais específico (na verdade, o único método aplicável) para a invocação do método `adopt` tem uma assinatura que indica um método de um parâmetro, e o parâmetro é do tipo `Point`. Esta assinatura se torna parte da representação binária da classe `Test` produzida pelo compilador Java e é usada pela invocação do método em tempo de execução.

Suponha que o programador relatou este erro de software e o mantenedor do pacote `points` decidiu, após a devida deliberação, corrigi-lo adicionando um método à classe `ColoredPoint`:
```java
    
    public void adopt(ColoredPoint p) {
        adopt((Point)p);
        color = p.color;
    }
    
    
```

Se o programador então executar o arquivo binário antigo para `Test` com o novo arquivo binário para `ColoredPoint`, a saída ainda será:
```
    cp: (3,3,red)
    
```

porque o arquivo binário antigo para `Test` ainda tem o descritor "um parâmetro, cujo tipo é `Point`; `void`" associado à chamada de método `cp.adopt(cp2)`. Se o código-fonte para `Test` for recompilado, o compilador Java então descobrirá que agora existem dois métodos `adopt` aplicáveis, e que a assinatura para o mais específico é "um parâmetro, cujo tipo é `ColoredPoint`; `void`"; executar o programa então produzirá a saída desejada:
```
    cp: (3,3,green)
    
```

Com previsão sobre tais problemas, o mantenedor do pacote `points` poderia corrigir a classe `ColoredPoint` para funcionar tanto com código recém-compilado quanto com código antigo, adicionando código defensivo ao método `adopt` antigo para o bem do código antigo que ainda o invoca com argumentos `ColoredPoint`:
```java
    
    public void adopt(Point p) {
        if (p instanceof ColoredPoint)
            color = ((ColoredPoint)p).color;
        x = p.x; y = p.y;
    }
    
    
```

Idealmente, o código-fonte deve ser recompilado sempre que o código do qual ele depende for alterado. No entanto, em um ambiente onde diferentes classes são mantidas por diferentes organizações, isso nem sempre é viável. A programação defensiva com atenção cuidadosa aos problemas de evolução de classes pode tornar o código atualizado muito mais robusto. Veja [§13 (_Compatibilidade Binária_)](<#/doc/jls/jls-13>) para uma discussão detalhada sobre compatibilidade binária e evolução de tipos.

#### 15.12.2.1. Identificar Métodos Potencialmente Aplicáveis

O tipo determinado pela etapa 1 de tempo de compilação ([§15.12.1](<#/doc/jls/jls-15>)) é pesquisado por todos os métodos membros que são potencialmente aplicáveis a esta invocação de método; membros herdados de superclasses e superinterfaces são incluídos nesta pesquisa.

Além disso, se a forma da expressão de invocação de método for _MethodName_ - ou seja, um único _Identifier_ - então a pesquisa por métodos potencialmente aplicáveis também examina todos os métodos membros que são importados por declarações single-static-import e declarações static-import-on-demand da unidade de compilação onde a invocação de método ocorre ([§7.5.3](<#/doc/jls/jls-07>), [§7.5.4](<#/doc/jls/jls-07>)) e que não são sombreados no ponto onde a invocação de método aparece.

Um método membro é _potencialmente aplicável_ a uma invocação de método se e somente se todas as seguintes condições forem verdadeiras:

  * O nome do membro é idêntico ao nome do método na invocação do método.

  * O membro é acessível ([§6.6](<#/doc/jls/jls-06>)) à classe ou interface na qual a invocação do método aparece.

Se um método membro é acessível em uma invocação de método depende do modificador de acesso (`public`, `protected`, nenhum modificador (acesso de pacote), ou `private`) na declaração do membro, e da herança do membro pela classe ou interface determinada pela etapa 1 de tempo de compilação, e de onde a invocação do método aparece.

  * Se o membro é um método de aridade fixa com aridade _n_, a aridade da invocação do método é igual a _n_, e para todo _i_ (1 ≤ _i_ ≤ _n_), o _i_-ésimo argumento da invocação do método é _potencialmente compatível_, conforme definido abaixo, com o tipo do _i_-ésimo parâmetro do método.

  * Se o membro é um método de aridade variável com aridade _n_, então para todo _i_ (1 ≤ _i_ ≤ _n_ -1), o _i_-ésimo argumento da invocação do método é _potencialmente compatível_ com o tipo do _i_-ésimo parâmetro do método; e, onde o _n_-ésimo parâmetro do método tem tipo T`[]`, uma das seguintes condições é verdadeira:

    * A aridade da invocação do método é igual a _n_ -1.

    * A aridade da invocação do método é igual a _n_, e o _n_-ésimo argumento da invocação do método é potencialmente compatível com T ou T`[]`.

    * A aridade da invocação do método é _m_, onde _m_ > _n_, e para todo _i_ (_n_ ≤ _i_ ≤ _m_), o _i_-ésimo argumento da invocação do método é potencialmente compatível com T.

  * Se a invocação do método inclui argumentos de tipo explícitos, e o membro é um método genérico, então o número de argumentos de tipo é igual ao número de parâmetros de tipo do método.

Esta cláusula implica que um método não genérico pode ser potencialmente aplicável a uma invocação que fornece argumentos de tipo explícitos. De fato, pode-se tornar aplicável. Em tal caso, os argumentos de tipo serão simplesmente ignorados.

Esta regra decorre de questões de compatibilidade e princípios de substituibilidade. Como interfaces ou superclasses podem ser generificadas independentemente de seus subtipos, podemos sobrescrever um método genérico com um não genérico. No entanto, o método sobrescritor (não genérico) deve ser aplicável a chamadas para o método genérico, incluindo chamadas que passam explicitamente argumentos de tipo. Caso contrário, o subtipo não seria substituível por seu supertipo generificado.

Se a pesquisa não produzir pelo menos um método que seja potencialmente aplicável, então ocorre um erro de tempo de compilação.

Uma expressão é _potencialmente compatível_ com um tipo alvo de acordo com as seguintes regras:

  * Uma expressão lambda ([§15.27](<#/doc/jls/jls-15>)) é potencialmente compatível com um tipo de interface funcional T ([§9.8](<#/doc/jls/jls-09>)) se todas as seguintes condições forem verdadeiras:

    * A aridade do tipo de função de T ([§9.9](<#/doc/jls/jls-09>)) é a mesma que a aridade da expressão lambda.

    * Se o tipo de função de T tem um retorno `void`, então o corpo lambda é uma expressão de instrução ([§14.8](<#/doc/jls/jls-14>)) ou um bloco compatível com void ([§15.27.2](<#/doc/jls/jls-15>)).

    * Se o tipo de função de T tem um tipo de retorno (não-`void`), então o corpo lambda é uma expressão ou um bloco compatível com valor ([§15.27.2](<#/doc/jls/jls-15>)).

  * Uma expressão de referência de método ([§15.13](<#/doc/jls/jls-15>)) é potencialmente compatível com um tipo de interface funcional T se, onde a aridade do tipo de função de T é _n_, existe pelo menos um método potencialmente aplicável quando a expressão de referência de método tem como alvo o tipo de função com aridade _n_ ([§15.13.1](<#/doc/jls/jls-15>)), e uma das seguintes condições é verdadeira:

    * A expressão de referência de método tem a forma _ReferenceType_ `::` _[TypeArguments]_ _Identifier_ e pelo menos um método potencialmente aplicável é (i) `static` e suporta aridade _n_, ou (ii) não `static` e suporta aridade _n_ -1.

    * A expressão de referência de método tem alguma outra forma e pelo menos um método potencialmente aplicável não é `static`.

  * Uma expressão lambda ou uma expressão de referência de método é potencialmente compatível com uma variável de tipo se a variável de tipo for um parâmetro de tipo do método candidato.

  * Uma expressão entre parênteses ([§15.8.5](<#/doc/jls/jls-15>)) é potencialmente compatível com um tipo se sua expressão contida for potencialmente compatível com esse tipo.

  * Uma expressão condicional ([§15.25](<#/doc/jls/jls-15>)) é potencialmente compatível com um tipo se cada uma de suas expressões de segundo e terceiro operando for potencialmente compatível com esse tipo.

  * Uma expressão `switch` ([§15.28](<#/doc/jls/jls-15>)) é potencialmente compatível com um tipo se todas as suas expressões de resultado forem potencialmente compatíveis com esse tipo.

  * Uma expressão de criação de instância de classe, uma expressão de invocação de método, ou uma expressão de uma forma autônoma ([§15.2](<#/doc/jls/jls-15>)) é potencialmente compatível com qualquer tipo.

A definição de aplicabilidade potencial vai além de uma verificação básica de aridade para também levar em conta a presença e a "forma" dos tipos alvo de interface funcional. Em alguns casos envolvendo inferência de argumentos de tipo, uma expressão lambda que aparece como um argumento de invocação de método não pode ser tipada corretamente até depois da resolução de sobrecarga. Essas regras permitem que a forma da expressão lambda ainda seja levada em consideração, descartando tipos alvo obviamente incorretos que poderiam, de outra forma, causar erros de ambiguidade.

#### 15.12.2.2. Fase 1: Identificar Métodos de Aridade Correspondente Aplicáveis por Invocação Estrita

Uma expressão de argumento é considerada _pertinente à aplicabilidade_ para um método potencialmente aplicável `m` a menos que tenha uma das seguintes formas:

  * Uma expressão lambda implicitamente tipada ([§15.27.1](<#/doc/jls/jls-15>)).

  * Uma expressão de referência de método inexata ([§15.13.1](<#/doc/jls/jls-15>)).

  * Se `m` é um método genérico e a invocação do método não fornece argumentos de tipo explícitos, uma expressão lambda explicitamente tipada ou uma expressão de referência de método exata para a qual o tipo alvo correspondente (derivado da assinatura de `m`) é um parâmetro de tipo de `m`.

  * Uma expressão lambda explicitamente tipada cujo corpo é uma expressão que não é pertinente à aplicabilidade.

  * Uma expressão lambda explicitamente tipada cujo corpo é um bloco, onde pelo menos uma expressão de resultado não é pertinente à aplicabilidade.

  * Uma expressão entre parênteses ([§15.8.5](<#/doc/jls/jls-15>)) cuja expressão contida não é pertinente à aplicabilidade.

  * Uma expressão condicional ([§15.25](<#/doc/jls/jls-15>)) cujo segundo ou terceiro operando não é pertinente à aplicabilidade.

Seja `m` um método potencialmente aplicável ([§15.12.2.1](<#/doc/jls/jls-15>)) com aridade _n_ e tipos de parâmetros formais F1, ..., Fn, e sejam `e1`, ..., `en` as expressões de argumento reais da invocação do método. Então:

  * Se `m` é um método genérico e a invocação do método não fornece argumentos de tipo explícitos, então a aplicabilidade do método é inferida conforme especificado em [§18.5.1](<#/doc/jls/jls-18>).

  * Se `m` é um método genérico e a invocação do método fornece argumentos de tipo explícitos, então sejam R1, ..., Rp (_p_ ≥ 1) os parâmetros de tipo de `m`, seja Bl o limite declarado de Rl (1 ≤ _l_ ≤ _p_), e sejam U1, ..., Up os argumentos de tipo explícitos fornecidos na invocação do método. Então `m` é _aplicável por invocação estrita_ se ambas as seguintes condições forem verdadeiras:

    * Para 1 ≤ _i_ ≤ _n_, se `ei` é pertinente à aplicabilidade, então `ei` é compatível em um contexto de invocação estrita com Fi`[`R1:=U1, ..., Rp:=Up`]` ([§5.3](<#/doc/jls/jls-05>)).

    * Para 1 ≤ _l_ ≤ _p_, Ul `<:` Bl`[`R1:=U1, ..., Rp:=Up`]`.

  * Se `m` não é um método genérico, então `m` é _aplicável por invocação estrita_ se, para 1 ≤ _i_ ≤ _n_, `ei` é compatível em um contexto de invocação estrita com Fi ([§5.3](<#/doc/jls/jls-05>)) ou `ei` não é pertinente à aplicabilidade.

Se nenhum método aplicável por invocação estrita for encontrado, a busca por métodos aplicáveis continua com a fase 2 ([§15.12.2.3](<#/doc/jls/jls-15>)).

Caso contrário, o método mais específico ([§15.12.2.5](<#/doc/jls/jls-15>)) é escolhido entre os métodos que são aplicáveis por invocação estrita.

O significado de uma expressão lambda implicitamente tipada ou de uma expressão de referência de método inexata é suficientemente vago antes de resolver um tipo alvo, de modo que argumentos contendo essas expressões não são considerados _pertinentes à aplicabilidade_; eles são simplesmente ignorados (exceto por sua aridade esperada) até que a resolução de sobrecarga seja concluída.

#### 15.12.2.3. Fase 2: Identificar Métodos de Aridade Correspondente Aplicáveis por Invocação Flexível

Seja `m` um método potencialmente aplicável ([§15.12.2.1](<#/doc/jls/jls-15>)) com aridade _n_ e tipos de parâmetros formais F1, ..., Fn, e sejam `e1`, ..., `en` as expressões de argumento reais da invocação do método. Então:

  * Se `m` é um método genérico e a invocação do método não fornece argumentos de tipo explícitos, então a aplicabilidade do método é inferida conforme especificado em [§18.5.1](<#/doc/jls/jls-18>).

  * Se `m` é um método genérico e a invocação do método fornece argumentos de tipo explícitos, então sejam R1, ..., Rp (_p_ ≥ 1) os parâmetros de tipo de `m`, seja Bl o limite declarado de Rl (1 ≤ _l_ ≤ _p_), e sejam U1, ..., Up os argumentos de tipo explícitos fornecidos na invocação do método. Então `m` é _aplicável por invocação flexível_ se ambas as seguintes condições forem verdadeiras:

    * Para 1 ≤ _i_ ≤ _n_, se `ei` é pertinente à aplicabilidade ([§15.12.2.2](<#/doc/jls/jls-15>)) então `ei` é compatível em um contexto de invocação flexível com Fi`[`R1:=U1, ..., Rp:=Up`]` ([§5.3](<#/doc/jls/jls-05>)).

    * Para 1 ≤ _l_ ≤ _p_, Ul `<:` Bl`[`R1:=U1, ..., Rp:=Up`]`.

  * Se `m` não é um método genérico, então `m` é _aplicável por invocação flexível_ se, para 1 ≤ _i_ ≤ _n_, `ei` é compatível em um contexto de invocação flexível com Fi ([§5.3](<#/doc/jls/jls-05>)) ou `ei` não é pertinente à aplicabilidade.

Se nenhum método aplicável por invocação flexível for encontrado, a busca por métodos aplicáveis continua com a fase 3 ([§15.12.2.4](<#/doc/jls/jls-15>)).

Caso contrário, o método mais específico ([§15.12.2.5](<#/doc/jls/jls-15>)) é escolhido entre os métodos que são aplicáveis por invocação flexível.

#### 15.12.2.4. Fase 3: Identificar Métodos Aplicáveis por Invocação de Aridade Variável

Onde um método de aridade variável tem tipos de parâmetros formais F1, ..., Fn-1, Fn`[]`, seja o _i_-ésimo _tipo de parâmetro de aridade variável_ do método definido como segue:

  * Para _i_ ≤ _n_ -1, o _i_-ésimo tipo de parâmetro de aridade variável é Fi.

  * Para _i_ ≥ _n_, o _i_-ésimo tipo de parâmetro de aridade variável é Fn.

Seja `m` um método potencialmente aplicável ([§15.12.2.1](<#/doc/jls/jls-15>)) com aridade variável, sejam T1, ..., Tk os primeiros _k_ tipos de parâmetros de aridade variável de `m`, e sejam `e1`, ..., `ek` as expressões de argumento reais da invocação do método. Então:

  * Se `m` é um método genérico e a invocação do método não fornece argumentos de tipo explícitos, então a aplicabilidade do método é inferida conforme especificado em [§18.5.1](<#/doc/jls/jls-18>).

  * Se `m` é um método genérico e a invocação do método fornece argumentos de tipo explícitos, então sejam R1, ..., Rp (_p_ ≥ 1) os parâmetros de tipo de `m`, seja Bl o limite declarado de Rl (1 ≤ _l_ ≤ _p_), e sejam U1, ..., Up os argumentos de tipo explícitos fornecidos na invocação do método. Então `m` é _aplicável por invocação de aridade variável_ se:

    * Para 1 ≤ _i_ ≤ _k_, se `ei` é pertinente à aplicabilidade ([§15.12.2.2](<#/doc/jls/jls-15>)) então `ei` é compatível em um contexto de invocação flexível com Ti`[`R1:=U1, ..., Rp:=Up`]` ([§5.3](<#/doc/jls/jls-05>)).

    * Para 1 ≤ _l_ ≤ _p_, Ul `<:` Bl`[`R1:=U1, ..., Rp:=Up`]`.

  * Se `m` não é um método genérico, então `m` é _aplicável por invocação de aridade variável_ se, para 1 ≤ _i_ ≤ _k_, `ei` é compatível em um contexto de invocação flexível com Ti ([§5.3](<#/doc/jls/jls-05>)) ou `ei` não é pertinente à aplicabilidade.

Se nenhum método aplicável por invocação de aridade variável for encontrado, então ocorre um erro de tempo de compilação.

Caso contrário, o método mais específico ([§15.12.2.5](<#/doc/jls/jls-15>)) é escolhido entre os métodos aplicáveis por invocação de aridade variável.

#### 15.12.2.5. Escolhendo o Método Mais Específico

Se mais de um método membro for acessível e aplicável a uma invocação de método, é necessário escolher um para fornecer o descritor para o despacho de método em tempo de execução. A linguagem de programação Java usa a regra de que o método _mais específico_ é escolhido.

A intuição informal é que um método é mais específico que outro se qualquer invocação tratada pelo primeiro método pudesse ser passada para o outro sem um erro de tempo de compilação. Em casos como um argumento de expressão lambda explicitamente tipado ([§15.27.1](<#/doc/jls/jls-15>)) ou uma invocação de aridade variável ([§15.12.2.4](<#/doc/jls/jls-15>)), alguma flexibilidade é permitida para adaptar uma assinatura à outra.

Um método aplicável `m1` é _mais específico_ que outro método aplicável `m2`, para uma invocação com expressões de argumento `e1`, ..., `ek`, se alguma das seguintes condições for verdadeira:

  * `m2` é genérico, e `m1` é inferido como mais específico que `m2` para as expressões de argumento `e1`, ..., `ek` por [§18.5.4](<#/doc/jls/jls-18>).

  * `m2` não é genérico, e `m1` e `m2` são aplicáveis por invocação estrita ou flexível, e onde `m1` tem tipos de parâmetros formais S1, ..., Sn e `m2` tem tipos de parâmetros formais T1, ..., Tn, o tipo Si é _mais específico_ que Ti para o argumento `ei` para todo _i_ (1 ≤ _i_ ≤ _n_, _n_ = _k_).

  * `m2` não é genérico, e `m1` e `m2` são aplicáveis por invocação de aridade variável, e onde os primeiros _k_ tipos de parâmetros de aridade variável de `m1` são S1, ..., Sk e os primeiros _k_ tipos de parâmetros de aridade variável de `m2` são T1, ..., Tk, o tipo Si é _mais específico_ que Ti para o argumento `ei` para todo _i_ (1 ≤ _i_ ≤ _k_). Adicionalmente, se `m2` tem _k_ +1 parâmetros, então o _k_ _+1_-ésimo tipo de parâmetro de aridade variável de `m1` é um subtipo do _k_ _+1_-ésimo tipo de parâmetro de aridade variável de `m2`.

As condições acima são as únicas circunstâncias sob as quais um método pode ser mais específico que outro.

Um tipo S é _mais específico_ que um tipo T para _qualquer_ expressão se S `<:` T ([§4.10](<#/doc/jls/jls-04>)).

Um tipo de interface funcional S é _mais específico_ que um tipo de interface funcional T para uma expressão `e` se todas as seguintes condições forem verdadeiras:

  * A interface de S não é uma superinterface nem uma subinterface da interface de T.

Se S ou T é um tipo de interseção, não é o caso que qualquer interface de S seja uma superinterface ou uma subinterface de qualquer interface de T. (As "interfaces de" um tipo de interseção se refere aqui ao conjunto de interfaces que aparecem como tipos de interface (possivelmente parametrizados) na interseção.)

  * Sejam MTS o tipo de função da captura de S, e MTT o tipo de função de T. MTS e MTT devem ter os mesmos parâmetros de tipo (se houver) ([§8.4.4](<#/doc/jls/jls-08>)).

  * Sejam P1, ..., Pn os tipos de parâmetros formais de MTS, adaptados aos parâmetros de tipo de MTT. Sejam P1', ..., Pn' os tipos de parâmetros formais do tipo de função de S (sem captura), adaptados aos parâmetros de tipo de MTT. Sejam Q1, ..., Qn os tipos de parâmetros formais de MTT. Então, para todo _i_ (1 ≤ _i_ ≤ _n_), Qi `<:` Pi e Qi = Pi'.

Geralmente, esta regra afirma que os tipos de parâmetros formais derivados de S e T são os mesmos. Mas no caso em que S é um tipo parametrizado por curinga, a verificação é mais complexa para permitir que variáveis de captura ocorram em tipos de parâmetros formais: primeiro, cada tipo de parâmetro formal de T deve ser um subtipo do tipo de parâmetro formal correspondente da captura de S; segundo, após mapear os curingas para seus limites ([§9.9](<#/doc/jls/jls-09>)), os tipos de parâmetros formais dos tipos de função resultantes são os mesmos.

  * Seja RS o tipo de retorno de MTS, adaptado aos parâmetros de tipo de MTT, e seja RT o tipo de retorno de MTT. Uma das seguintes condições deve ser verdadeira:

    * `e` é uma expressão lambda explicitamente tipada ([§15.27.1](<#/doc/jls/jls-15>)), e uma das seguintes condições é verdadeira:

      * RT é `void`.

      * RS `<:` RT.

      * RS e RT são tipos de interface funcional, e há pelo menos uma expressão de resultado, e RS é mais específico que RT para cada expressão de resultado de `e`.

A expressão de resultado de uma expressão lambda com um corpo de bloco é definida em [§15.27.2](<#/doc/jls/jls-15>); a expressão de resultado de uma expressão lambda com um corpo de expressão é simplesmente o próprio corpo.

      * RS é um tipo primitivo, e RT é um tipo de referência, e há pelo menos uma expressão de resultado, e cada expressão de resultado de `e` é uma expressão autônoma ([§15.2](<#/doc/jls/jls-15>)) de um tipo primitivo.

      * RS é um tipo de referência, e RT é um tipo primitivo, e há pelo menos uma expressão de resultado, e cada expressão de resultado de `e` é uma expressão autônoma de um tipo de referência ou uma poly expression.

    * `e` é uma expressão de referência de método exata ([§15.13.1](<#/doc/jls/jls-15>)), e uma das seguintes condições é verdadeira:

      * RT é `void`.

      * RS `<:` RT.

      * RS é um tipo primitivo, RT é um tipo de referência, e a declaração de tempo de compilação para a referência de método tem um tipo de retorno que é um tipo primitivo.

      * RS é um tipo de referência, RT é um tipo primitivo, e a declaração de tempo de compilação para a referência de método tem um tipo de retorno que é um tipo de referência.

    * `e` é uma expressão entre parênteses, e uma dessas condições se aplica recursivamente à expressão contida.

    * `e` é uma expressão condicional, e, para cada um dos segundo e terceiro operandos, uma dessas condições se aplica recursivamente.

    * `e` é uma expressão `switch`, e, para cada uma de suas expressões de resultado, uma dessas condições se aplica recursivamente.

Um método `m1` é _estritamente mais específico_ que outro método `m2` se e somente se `m1` é mais específico que `m2` e `m2` não é mais específico que `m1`.

Um método é considerado _maximalmente específico_ para uma invocação de método se for acessível e aplicável e não houver outro método que seja acessível e aplicável que seja estritamente mais específico.

Se houver exatamente um método maximalmente específico, então esse método é de fato o _método mais específico_; ele é necessariamente mais específico que qualquer outro método acessível que seja aplicável. Ele é então submetido a algumas verificações adicionais em tempo de compilação, conforme especificado em [§15.12.3](<#/doc/jls/jls-15>).

É possível que nenhum método seja o mais específico, porque há dois ou mais métodos que são maximalmente específicos. Neste caso:

  * Se todos os métodos maximalmente específicos têm assinaturas override-equivalent ([§8.4.2](<#/doc/jls/jls-08>)), e _exatamente um_ dos métodos maximalmente específicos é concreto (ou seja, nem `abstract` nem default), então ele é o método mais específico.

  * Caso contrário, se todos os métodos maximalmente específicos têm assinaturas override-equivalent, e _todos_ os métodos maximalmente específicos são `abstract` ou default, e as declarações desses métodos têm os mesmos tipos de parâmetros apagados, e pelo menos um método maximalmente específico é _preferido_ de acordo com as regras abaixo, então o método mais específico é escolhido arbitrariamente entre o subconjunto dos métodos maximalmente específicos que são preferidos. O método mais específico é então considerado `abstract`.

Um método maximalmente específico é _preferido_ se tiver:

    * uma assinatura que é uma subassinatura da assinatura de cada método maximalmente específico; e

    * um tipo de retorno R (possivelmente `void`), onde R é o mesmo que o tipo de retorno de cada método maximalmente específico, ou R é um tipo de referência e é um subtipo do tipo de retorno de cada método maximalmente específico (após adaptação para quaisquer parâmetros de tipo ([§8.4.4](<#/doc/jls/jls-08>)) se os dois métodos tiverem a mesma assinatura).

Se nenhum método preferido existir de acordo com as regras acima, então um método maximalmente específico é _preferido_ se ele:

    * tiver uma assinatura que é uma subassinatura da assinatura de cada método maximalmente específico; e

    * for return-type-substitutable ([§8.4.5](<#/doc/jls/jls-08>)) para cada método maximalmente específico.

Os tipos de exceção lançados do método mais específico são derivados das cláusulas `throws` dos métodos maximalmente específicos, como segue:

    1. Se o método mais específico for genérico, as cláusulas `throws` são primeiro adaptadas aos parâmetros de tipo do método mais específico ([§8.4.4](<#/doc/jls/jls-08>)).

Se o método mais específico não for genérico, mas pelo menos um método maximalmente específico for genérico, as cláusulas `throws` são primeiro apagadas.

    2. Então, os tipos de exceção lançados incluem todo tipo E que satisfaz as seguintes restrições:

       * E é mencionado em uma das cláusulas `throws`.

       * Para cada cláusula `throws`, E é um subtipo de algum tipo nomeado nessa cláusula.

Essas regras para derivar um único tipo de método de um grupo de métodos sobrecarregados também são usadas para identificar o tipo de função de uma interface funcional ([§9.9](<#/doc/jls/jls-09>)).

  * Caso contrário, a invocação do método é _ambígua_, e ocorre um erro de tempo de compilação.

#### 15.12.2.6. Tipo de Invocação de Método

O _tipo de invocação_ de um método mais específico acessível e aplicável é um tipo de método ([§8.2](<#/doc/jls/jls-08>)) que expressa os tipos alvo dos argumentos da invocação, o resultado (tipo de retorno ou `void`) da invocação, e os tipos de exceção da invocação. Ele é determinado como segue:

  * Se o método escolhido for genérico e a invocação do método não fornecer argumentos de tipo explícitos, o tipo de invocação é inferido conforme especificado em [§18.5.2](<#/doc/jls/jls-18>).

Neste caso, se a expressão de invocação de método for uma poly expression, então sua compatibilidade com um tipo alvo é determinada por [§18.5.2.1](<#/doc/jls/jls-18>).

A verificação de compatibilidade com um tipo alvo pode ocorrer várias vezes antes de fazer uma determinação final do tipo alvo e do tipo de invocação da expressão de invocação de método. Por exemplo, uma expressão de invocação de método envolvente pode exigir a verificação da expressão de invocação de método mais profunda para compatibilidade com os tipos de parâmetros formais de diferentes métodos.

  * Se o método escolhido for genérico e a invocação do método fornecer argumentos de tipo explícitos, sejam Pi os parâmetros de tipo do método e Ti os argumentos de tipo explícitos fornecidos para a invocação do método (1 ≤ _i_ ≤ _p_). Então:

    * Se a conversão não verificada foi necessária para o método ser aplicável, então os tipos de parâmetros do tipo de invocação são obtidos aplicando a substituição `[`P1:=T1, ..., Pp:=Tp`]` aos tipos de parâmetros do tipo do método, e o tipo de retorno e os tipos lançados do tipo de invocação são dados pelo apagamento do tipo de retorno e dos tipos lançados do tipo do método.

    * Se a conversão não verificada não foi necessária para o método ser aplicável, então o tipo de invocação é obtido aplicando a substituição `[`P1:=T1, ..., Pp:=Tp`]` ao tipo do método.

  * Se o método escolhido não for genérico, então:

    * Se a conversão não verificada foi necessária para o método ser aplicável, os tipos de parâmetros do tipo de invocação são os tipos de parâmetros do tipo do método, e o tipo de retorno e os tipos lançados são dados pelos apagamentos do tipo de retorno e dos tipos lançados do tipo do método.

    * Caso contrário, se o método escolhido for o método `getClass` da classe `Object` ([§4.3.2](<#/doc/jls/jls-04>)), o tipo de invocação é o mesmo que o tipo do método, exceto que o tipo de retorno é `Class`<`?` `extends` |T|`>`, onde T é o tipo que foi pesquisado, conforme determinado por [§15.12.1](<#/doc/jls/jls-15>), e |T| denota o apagamento de T ([§4.6](<#/doc/jls/jls-04>)).

    * Caso contrário, o tipo de invocação é o mesmo que o tipo do método.

### 15.12.3. Etapa 3 de Tempo de Compilação: O Método Escolhido é Apropriado?

Se houver uma declaração de método mais específica para uma invocação de método, ela é chamada de _declaração de tempo de compilação_ para a invocação de método.

É um erro de tempo de compilação se um argumento para uma invocação de método não for compatível com seu tipo alvo, conforme derivado do tipo de invocação da declaração de tempo de compilação.

Se a declaração de tempo de compilação for aplicável por invocação de aridade variável, então onde o último tipo de parâmetro formal do tipo de invocação do método é Fn`[]`, é um erro de tempo de compilação se o tipo que é o apagamento de Fn não for acessível ([§6.6](<#/doc/jls/jls-06>)) no ponto de invocação.
Se a declaração em tempo de compilação for `void`, então a invocação do método deve ser uma expressão de nível superior (ou seja, a _Expression_ em uma instrução de expressão ou na parte _ForInit_ ou _ForUpdate_ de uma instrução `for`), ou ocorre um erro em tempo de compilação. Tal invocação de método não produz valor e, portanto, deve ser usada apenas em uma situação onde um valor não é necessário.

Além disso, se a declaração em tempo de compilação é apropriada pode depender da forma da expressão de invocação do método antes do parêntese esquerdo, como segue:

  * Se a forma for _MethodName_ \- ou seja, apenas um _Identifier_ \- e a declaração em tempo de compilação for um método de instância, então:

    * É um erro em tempo de compilação se a invocação do método ocorrer em um contexto `static` ([§8.1.3](<#/doc/jls/jls-08>)).

    * Caso contrário, seja T a classe ou interface a ser pesquisada ([§15.12.1](<#/doc/jls/jls-15>)). É um erro em tempo de compilação se a invocação do método ocorrer em um contexto de construção inicial ([§8.8.7](<#/doc/jls/jls-08>)) da classe T, ou se a declaração de classe ou interface envolvente mais interna da invocação do método não for T nem uma classe interna de T.

  * Se a forma for _TypeName_ `.` _[TypeArguments]_ _Identifier_ , então a declaração em tempo de compilação deve ser `static`, ou ocorre um erro em tempo de compilação.

  * Se a forma for _ExpressionName_ `.` _[TypeArguments]_ _Identifier_ ou _Primary_ `.` _[TypeArguments]_ _Identifier_ , então a declaração em tempo de compilação não deve ser um método `static` declarado em uma interface, ou ocorre um erro em tempo de compilação.

  * Se a forma for `super` `.` _[TypeArguments]_ _Identifier_ , então:

    * É um erro em tempo de compilação se a declaração em tempo de compilação for `abstract`.

    * É um erro em tempo de compilação se a invocação do método ocorrer em um contexto `static` ou em um contexto de construção inicial da classe atual.

  * Se a forma for _TypeName_ `.` `super` `.` _[TypeArguments]_ _Identifier_ , então:

    * É um erro em tempo de compilação se a declaração em tempo de compilação for `abstract`.

    * É um erro em tempo de compilação se a invocação do método ocorrer em um contexto `static` ou em um contexto de construção inicial da classe atual.

    * Se _TypeName_ denotar uma classe C, então se a declaração de classe ou interface imediatamente envolvente da invocação do método não for C ou uma classe interna de C, ocorre um erro em tempo de compilação.

    * Se _TypeName_ denotar uma interface, seja E a declaração de classe ou interface imediatamente envolvente da invocação do método. Ocorre um erro em tempo de compilação se existir um método, distinto da declaração em tempo de compilação, que sobrescreve ([§9.4.1](<#/doc/jls/jls-09>)) a declaração em tempo de compilação de uma superclasse direta ou superinterface direta de E.

No caso em que uma superinterface sobrescreve um método declarado em uma interface avó, esta regra impede que a interface filha "pule" a sobrescrita simplesmente adicionando a avó à sua lista de superinterfaces diretas. A maneira apropriada de acessar a funcionalidade de uma avó é através da superinterface direta, e somente se essa interface escolher expor o comportamento desejado. (Alternativamente, o programador é livre para definir uma superinterface adicional que exponha o comportamento desejado com uma invocação de método `super`.)

Os _tipos de parâmetro em tempo de compilação_ e o _resultado em tempo de compilação_ são determinados da seguinte forma:

  * Se a declaração em tempo de compilação para a invocação do método _não_ for um método polimórfico de assinatura, então:

    * Os tipos de parâmetro em tempo de compilação são os tipos dos parâmetros formais da declaração em tempo de compilação.

    * O resultado em tempo de compilação é o resultado do tipo de invocação da declaração em tempo de compilação ([§15.12.2.6](<#/doc/jls/jls-15>)).

  * Se a declaração em tempo de compilação para a invocação do método for um método polimórfico de assinatura, então:

    * Os tipos de parâmetro em tempo de compilação são os tipos das expressões de argumento reais. Uma expressão de argumento que é o literal nulo `null` ([§3.10.8](<#/doc/jls/jls-03>)) é tratada como tendo o tipo `Void`.

    * O resultado em tempo de compilação é determinado da seguinte forma:

      * Se o método polimórfico de assinatura for `void` ou tiver um tipo de retorno diferente de `Object`, o resultado em tempo de compilação é o resultado do tipo de invocação da declaração em tempo de compilação ([§15.12.2.6](<#/doc/jls/jls-15>)).

      * Caso contrário, se a expressão de invocação do método for uma instrução de expressão, o resultado em tempo de compilação é `void`.

      * Caso contrário, se a expressão de invocação do método for o operando de uma expressão de cast ([§15.16](<#/doc/jls/jls-15>)), o resultado em tempo de compilação é a eliminação de tipo (erasure) do tipo da expressão de cast ([§4.6](<#/doc/jls/jls-04>)).

      * Caso contrário, o resultado em tempo de compilação é o tipo de retorno do método polimórfico de assinatura, `Object`.

Um método é _polimórfico de assinatura_ se todas as seguintes condições forem verdadeiras:

  * É declarado na classe `java.lang.invoke.MethodHandle` ou na classe `java.lang.invoke.VarHandle`.

  * Possui um único parâmetro de aridade variável ([§8.4.1](<#/doc/jls/jls-08>)) cujo tipo declarado é `Object`[]`.

  * É `native`.

As seguintes informações em tempo de compilação são então associadas à invocação do método para uso em tempo de execução:

  * O nome do método.

  * A classe ou interface qualificadora da invocação do método ([§13.1](<#/doc/jls/jls-13>)).

  * O número de parâmetros e os tipos de parâmetro em tempo de compilação, em ordem.

  * O resultado em tempo de compilação.

  * O modo de invocação, calculado da seguinte forma:

    * Se a declaração em tempo de compilação tiver o modificador `static`, então o modo de invocação é `static`.

    * Caso contrário, se a parte da invocação do método antes do parêntese esquerdo for da forma `super` `.` _Identifier_ ou da forma _TypeName_ `.` `super` `.` _Identifier_ , então o modo de invocação é `super`.

    * Caso contrário, se a classe ou interface qualificadora da invocação do método for de fato uma interface, então o modo de invocação é `interface`.

    * Caso contrário, o modo de invocação é `virtual`.

Se o resultado do tipo de invocação da declaração em tempo de compilação não for `void`, então o tipo da expressão de invocação do método é obtido aplicando a conversão de captura ([§5.1.10](<#/doc/jls/jls-05>)) ao tipo de retorno do tipo de invocação da declaração em tempo de compilação.

### 15.12.4. Avaliação em Tempo de Execução da Invocação de Método

Em tempo de execução, a invocação de método requer cinco etapas. Primeiro, uma _referência de destino_ pode ser computada. Segundo, as expressões de argumento são avaliadas. Terceiro, a acessibilidade do método a ser invocado é verificada. Quarto, o código real para o método a ser executado é localizado. Quinto, um novo frame de ativação é criado, a sincronização é realizada se necessário, e o controle é transferido para o código do método.

#### 15.12.4.1. Computar Referência de Destino (Se Necessário)

Existem seis casos a serem considerados, dependendo da forma da invocação do método:

  * Se a forma for _MethodName_ \- ou seja, apenas um _Identifier_ \- então:

    * Se o modo de invocação for `static`, então não há referência de destino.

    * Caso contrário, seja T a declaração de tipo envolvente da qual o método é membro, e seja _n_ um inteiro tal que T é a _n_-ésima declaração de tipo lexicamente envolvente da classe cuja declaração contém imediatamente a invocação do método. A referência de destino é a _n_-ésima instância lexicamente envolvente de `this`.

É um erro em tempo de compilação se a _n_-ésima instância lexicamente envolvente de `this` não existir.

  * Se a forma for _TypeName_ `.` _[TypeArguments]_ _Identifier_ , então não há referência de destino.

  * Se a forma for _ExpressionName_ `.` _[TypeArguments]_ _Identifier_ , então:

    * Se o modo de invocação for `static`, então não há referência de destino. O _ExpressionName_ é avaliado, mas o resultado é então descartado.

    * Caso contrário, a referência de destino é o valor denotado por _ExpressionName_.

  * Se a forma for _Primary_ `.` _[TypeArguments]_ _Identifier_ envolvida, então:

    * Se o modo de invocação for `static`, então não há referência de destino. A expressão _Primary_ é avaliada, mas o resultado é então descartado.

    * Caso contrário, a expressão _Primary_ é avaliada e o resultado é usado como referência de destino.

Em ambos os casos, se a avaliação da expressão _Primary_ for concluída abruptamente, então nenhuma parte de qualquer expressão de argumento parece ter sido avaliada, e a invocação do método é concluída abruptamente pela mesma razão.

  * Se a forma for `super` `.` _[TypeArguments]_ _Identifier_ , então a referência de destino é o valor de `this`.

  * Se a forma for _TypeName_ `.` `super` `.` _[TypeArguments]_ _Identifier_ , então se _TypeName_ denotar uma classe, a referência de destino é o valor de _TypeName_`.`this`; caso contrário, a referência de destino é o valor de `this`.

**Exemplo 15.12.4.1-1. Referências de Destino e Métodos `static`

Quando uma referência de destino é computada e então descartada porque o modo de invocação é `static`, a referência não é examinada para verificar se é `null`:
```java
    class Test1 {
        static void mountain() {
            System.out.println("Monadnock");
        }
        static Test1 favorite(){
            System.out.print("Mount ");
            return null;
        }
        public static void main(String[] args) {
            favorite().mountain();
        }
    }
    
```

que imprime:
```
    Mount Monadnock
    
```

Aqui `favorite()` retorna `null`, mas nenhuma `NullPointerException` é lançada.

**Exemplo 15.12.4.1-2. Ordem de Avaliação Durante a Invocação de Método**

Como parte de uma invocação de método de instância ([§15.12](<#/doc/jls/jls-15>)), existe uma expressão que denota o objeto a ser invocado. Esta expressão parece ser totalmente avaliada antes que qualquer parte de qualquer expressão de argumento para a invocação do método seja avaliada.

Assim, por exemplo, em:
```java
    class Test2 {
        public static void main(String[] args) {
            String s = "one";
            if (s.startsWith(s = "two"))
                System.out.println("oops");
        }
    }
    
```

a ocorrência de `s` antes de "`.startsWith`" é avaliada primeiro, antes da expressão de argumento `s = "two"`. Portanto, uma referência à string `"one"` é lembrada como a referência de destino antes que a variável local `s` seja alterada para referir-se à string `"two"`. Como resultado, o método `startsWith` é invocado para o objeto de destino `"one"` com o argumento `"two"`, então o resultado da invocação é `false`, pois a string `"one"` não começa com `"two"`. Conclui-se que o programa de teste não imprime "`oops`".

#### 15.12.4.2. Avaliar Argumentos

O processo de avaliação da lista de argumentos difere, dependendo se o método sendo invocado é um método de aridade fixa ou um método de aridade variável ([§8.4.1](<#/doc/jls/jls-08>)).

Se o método sendo invocado for um método de aridade variável `m`, ele necessariamente tem _n_ > 0 parâmetros formais, e o _n_-ésimo tipo de parâmetro do tipo de invocação ([§15.12.2.6](<#/doc/jls/jls-15>)) de `m` necessariamente tem o tipo T`[]` para algum T. Seja _k_ o número de expressões de argumento reais na invocação do método: se _k_ ≠ _n_ , ou se _k_ = _n_ e o tipo da _k_-ésima expressão de argumento não for compatível por atribuição com T`[]`, então `m` foi considerado aplicável por invocação de aridade variável ([§15.12.2.4](<#/doc/jls/jls-15>)). Neste caso, a lista de argumentos (`e1`, ..., `en-1`, `en`, ..., `ek`) é avaliada como se estivesse escrita como (`e1`, ..., `en-1`, `new` |T`[]`| `{` `en`, ..., `ek` `}`), onde |T`[]`| denota a eliminação de tipo (erasure) ([§4.6](<#/doc/jls/jls-04>)) de T`[]`.

O parágrafo anterior foi elaborado para lidar com a interação de tipos parametrizados e tipos de array que ocorre em uma Java Virtual Machine com generics eliminados (erased generics). Ou seja, se o tipo de elemento T do parâmetro de array variável não for reificável, por exemplo `List<String>`, então um cuidado especial deve ser tomado com a expressão de criação de array ([§15.10](<#/doc/jls/jls-15>)) porque o tipo de elemento do array criado deve ser reificável. Ao eliminar o tipo de array da expressão final na lista de argumentos, garantimos a obtenção de um tipo de elemento reificável. Então, como a expressão de criação de array aparece em um contexto de invocação ([§5.3](<#/doc/jls/jls-05>)), uma conversão não verificada é possível do tipo de array com tipo de elemento reificável para um tipo de array com tipo de elemento não reificável, especificamente o do parâmetro de aridade variável. Um compilador Java é obrigado a emitir um aviso não verificado em tempo de compilação nesta conversão. A implementação de referência da Oracle de um compilador Java identifica este aviso não verificado como uma _criação de array genérico não verificada_ mais informativa.

As expressões de argumento (possivelmente reescritas conforme descrito acima) são agora avaliadas para produzir _valores de argumento_. Cada valor de argumento corresponde a exatamente um dos _n_ parâmetros formais do método.

As expressões de argumento, se houver, são avaliadas em ordem, da esquerda para a direita. Se a avaliação de qualquer expressão de argumento for concluída abruptamente, então nenhuma parte de qualquer expressão de argumento à sua direita parece ter sido avaliada, e a invocação do método é concluída abruptamente pela mesma razão. O resultado da avaliação da _j_-ésima expressão de argumento é o _j_-ésimo valor de argumento, para 1 ≤ _j_ ≤ _n_. A avaliação então continua, usando os valores de argumento, conforme descrito abaixo.

#### 15.12.4.3. Verificar Acessibilidade de Tipo e Método

Nesta seção:

  * Seja D a classe que contém a invocação do método.

  * Seja Q a classe ou interface qualificadora da invocação do método ([§13.1](<#/doc/jls/jls-13>)).

  * Seja `m` o nome do método conforme determinado em tempo de compilação ([§15.12.3](<#/doc/jls/jls-15>)).

Uma implementação da linguagem de programação Java deve garantir, como parte da ligação (linkage), que a classe ou interface Q seja acessível:

  * Se Q estiver no mesmo pacote que D, então Q é acessível.

  * Se Q estiver em um pacote diferente de D, e seus pacotes estiverem no mesmo módulo, e Q for `public` ou `protected`, então Q é acessível.

  * Se Q estiver em um pacote diferente de D, e seus pacotes estiverem em módulos diferentes, e o módulo de Q exportar o pacote de Q para o módulo de D, e Q for `public` ou `protected`, então Q é acessível.

Se Q for `protected`, é necessariamente uma classe ou interface aninhada, então em tempo de compilação, sua acessibilidade é afetada pela acessibilidade de classes e interfaces que envolvem sua declaração. No entanto, durante a ligação (linkage), sua acessibilidade não é afetada pela acessibilidade de classes e interfaces que envolvem sua declaração. Além disso, durante a ligação, um Q `protected` é tão acessível quanto um Q `public`. Essas discrepâncias entre o controle de acesso em tempo de compilação ([§6.6](<#/doc/jls/jls-06>)) e o controle de acesso em tempo de execução são devido a limitações na Java Virtual Machine.

A implementação também deve garantir, durante a ligação (linkage), que o método `m` ainda possa ser encontrado em Q ou em uma superclasse ou superinterface de Q. Se `m` não puder ser encontrado, então ocorre um `NoSuchMethodError` (que é uma subclasse de `IncompatibleClassChangeError`). Se `m` puder ser encontrado, então seja C a classe ou interface que declara `m`. A implementação deve garantir, durante a ligação, que a declaração de `m` em C seja acessível a D:

  * Se `m` for `public`, então `m` é acessível.

  * Se `m` for `protected`, então `m` é acessível se e somente se (i) D estiver no mesmo pacote que C, ou D for uma subclasse de C ou a própria C; e (ii) se `m` for um método de instância `protected`, então Q deve ser uma subclasse de D ou a própria D.

Este é o único lugar onde Q está envolvido nas verificações para `m`, porque um método de instância `protected` só pode ser invocado através de uma classe ou interface qualificadora que se alinha com o tipo do invocador.

  * Se `m` tiver acesso de pacote, então `m` é acessível se e somente se D estiver no mesmo pacote que C.

  * Se `m` for `private`, então `m` é acessível se e somente se D for C, ou D envolver C, ou C envolver D, ou C e D forem ambos envolvidos por uma terceira classe ou interface.

Se Q ou `m` não for acessível, então ocorre um `IllegalAccessError` ([§12.3](<#/doc/jls/jls-12>)).

Se o modo de invocação for `interface`, então a implementação deve verificar se a classe de referência de destino ainda implementa a interface especificada. Se a classe de referência de destino não implementar mais a interface, então ocorre um `IncompatibleClassChangeError`.

#### 15.12.4.4. Localizar Método para Invocar

Assim como na seção anterior ([§15.12.4.3](<#/doc/jls/jls-15>)):

  * Seja Q a classe ou interface qualificadora da invocação do método ([§13.1](<#/doc/jls/jls-13>)).

  * Seja `m` o método encontrado em Q ou em uma superclasse ou superinterface de Q. (Note que `m` era meramente o nome do método na seção anterior; aqui é a declaração real.)

  * Seja C a classe ou interface que declara `m`.

A estratégia para localizar um método a ser invocado depende do modo de invocação:

  * Se o modo de invocação for `static`, nenhuma referência de destino é necessária e a sobrescrita não é permitida. O método `m` da classe ou interface C é o que será invocado.

  * Caso contrário, um método de instância deve ser invocado e há uma referência de destino. Se a referência de destino for `null`, uma `NullPointerException` é lançada neste ponto. Caso contrário, a referência de destino é dita referir-se a um _objeto de destino_ e será usada como o valor da palavra-chave `this` no método invocado. As outras três possibilidades para o modo de invocação são então consideradas:

    * Se o modo de invocação for `super`, a sobrescrita não é permitida. O método `m` da classe ou interface C é o que será invocado. Se `m` for `abstract`, um `AbstractMethodError` é lançado.

    * Caso contrário, se o modo de invocação for `virtual`, e Q e `m` indicarem conjuntamente um método polimórfico de assinatura ([§15.12.3](<#/doc/jls/jls-15>)), então o objeto de destino é uma instância de `java.lang.invoke.MethodHandle` ou `java.lang.invoke.VarHandle`. O objeto de destino encapsula um estado que é comparado com as informações associadas à invocação do método em tempo de compilação. Detalhes desta correspondência são fornecidos em _The Java Virtual Machine Specification, Java SE 25 Edition_ e na API da Plataforma Java SE. Se a correspondência for bem-sucedida, então o método referenciado pela instância de `java.lang.invoke.MethodHandle` é direta e imediatamente invocado, ou a variável representada pela instância de `java.lang.invoke.VarHandle` é direta e imediatamente acessada, _e em ambos os casos o procedimento em[§15.12.4.5](<#/doc/jls/jls-15>) não é executado_. Se a correspondência falhar, então uma `java.lang.invoke.WrongMethodTypeException` é lançada.

    * Caso contrário, o modo de invocação é `interface` ou `virtual`.

Se o método `m` da classe ou interface C for `private`, então é o método a ser invocado.

Caso contrário, a sobrescrita pode ocorrer. Uma _pesquisa dinâmica de método_, especificada abaixo, é usada para localizar o método a ser invocado. O procedimento de pesquisa começa da classe R, a classe real em tempo de execução do objeto de destino.

Note que para o modo de invocação `interface`, R necessariamente implementa Q; para o modo de invocação `virtual`, R é necessariamente Q ou uma subclasse de Q. Se o objeto de destino for um array, então R é uma "classe" representando um tipo de array.

O procedimento para pesquisa dinâmica de método é o seguinte. Seja S a classe a ser pesquisada, começando com R. Então:

  1. Se a classe S contiver uma declaração para um método que sobrescreve o método `m` da classe ou interface C de R ([§8.4.8.1](<#/doc/jls/jls-08>)), então esse método sobrescritor é o método a ser invocado, e o procedimento termina.

  2. Caso contrário, se S tiver uma superclasse, então as etapas 1 e 2 deste procedimento de pesquisa são realizadas recursivamente usando a superclasse direta de S no lugar de S; o método a ser invocado, se houver, é o resultado da invocação recursiva deste procedimento de pesquisa.

  3. Se nenhum método for encontrado pelas duas etapas anteriores, as superinterfaces de S são pesquisadas por um método adequado.

Um conjunto de métodos candidatos é considerado com as seguintes propriedades: (i) cada método é declarado em uma superinterface (direta ou indireta) de R; (ii) cada método tem o nome e o descritor exigidos pela invocação do método; (iii) cada método é não-`static` e não-`private`; (iv) para cada método, onde a interface declarante do método é I, não há outro método satisfazendo (i) a (iii) que seja declarado em uma subinterface de I.

Se este conjunto contiver um método `default`, um desses métodos é o método a ser invocado. Caso contrário, um método `abstract` no conjunto é selecionado como o método a ser invocado.

A pesquisa dinâmica de método pode causar a ocorrência dos seguintes erros:

  * Se o método a ser invocado for `abstract`, um `AbstractMethodError` é lançado.

  * Se o método a ser invocado for `default`, e mais de um método `default` aparecer no conjunto de candidatos na etapa 3 acima, um `IncompatibleClassChangeError` é lançado.

  * Se o modo de invocação for `interface` e o método a ser invocado não for `public` nem `private`, um `IllegalAccessError` é lançado.

O procedimento acima (se terminar sem erro) encontrará um método não-`abstract` e acessível para invocar, desde que todas as classes e interfaces no programa tenham sido compiladas consistentemente. No entanto, se este não for o caso, então vários erros podem ocorrer, conforme especificado acima; detalhes adicionais sobre o comportamento da Java Virtual Machine sob estas circunstâncias são fornecidos por _The Java Virtual Machine Specification, Java SE 25 Edition_.

O processo de pesquisa dinâmica, embora descrito aqui explicitamente, será frequentemente implementado implicitamente, por exemplo, como um efeito colateral da construção e uso de tabelas de despacho de método por classe, ou da construção de outras estruturas por classe usadas para despacho eficiente.

**Exemplo 15.12.4.4-1. Sobrescrita e Invocação de Método**
```java 
    class Point {
        final int EDGE = 20;
        int x, y;
        void move(int dx, int dy) {
            x += dx; y += dy;
            if (Math.abs(x) >= EDGE || Math.abs(y) >= EDGE)
                clear();
        }
        void clear() {
            System.out.println("\tPoint clear");
            x = 0; y = 0;
        }
    }
    class ColoredPoint extends Point {
        int color;
        void clear() {
            System.out.println("\tColoredPoint clear");
            super.clear();
            color = 0;
        }
    }
    
```

Aqui, a subclasse `ColoredPoint` estende a abstração `clear` definida por sua superclasse `Point`. Ela faz isso sobrescrevendo o método `clear` com seu próprio método, que invoca o método `clear` de sua superclasse, usando a forma `super.clear()`.

Este método é então invocado sempre que o objeto de destino para uma invocação de `clear` é um `ColoredPoint`. Mesmo o método `move` em `Point` invoca o método `clear` da classe `ColoredPoint` quando a classe de `this` é `ColoredPoint`, como mostrado pela saída deste programa de teste:
```java
    class Test1 {
        public static void main(String[] args) {
            Point p = new Point();
            System.out.println("p.move(20,20):");
            p.move(20, 20);
    
            ColoredPoint cp = new ColoredPoint();
            System.out.println("cp.move(20,20):");
            cp.move(20, 20);
    
            p = new ColoredPoint();
            System.out.println("p.move(20,20), p colored:");
            p.move(20, 20);
        }
    }
    
```

que é:
```
    p.move(20,20):
            Point clear
    cp.move(20,20):
            ColoredPoint clear
            Point clear
    p.move(20,20), p colored:
            ColoredPoint clear
            Point clear
    
```

A sobrescrita é às vezes chamada de "auto-referência de ligação tardia"; neste exemplo, significa que a referência a `clear` no corpo de `Point.move` (que é na verdade uma abreviação sintática para `this.clear`) invoca um método escolhido "tardiamente" (em tempo de execução, com base na classe em tempo de execução do objeto referenciado por `this`) em vez de um método escolhido "cedo" (em tempo de compilação, baseado apenas no tipo de `this`). Isso oferece ao programador uma maneira poderosa de estender abstrações e é uma ideia chave na programação orientada a objetos.

**Exemplo 15.12.4.4-2. Invocação de Método Usando `super`

Um método de instância sobrescrito de uma superclasse pode ser acessado usando a palavra-chave `super` para acessar os membros da superclasse imediata, ignorando qualquer declaração de sobrescrita na classe que contém a invocação do método.

Ao acessar uma variável de instância, `super` significa o mesmo que um cast de `this` ([§15.11.2](<#/doc/jls/jls-15>)), mas essa equivalência não se mantém verdadeira para a invocação de método. Isso é demonstrado pelo exemplo:
```java
    class T1 {
        String s() { return "1"; }
    }
    class T2 extends T1 {
        String s() { return "2"; }
    }
    class T3 extends T2 {
        String s() { return "3"; }
        void test() {
            System.out.println("s()=\t\t"          + s());
            System.out.println("super.s()=\t"      + super.s());
            System.out.println("((T2)this).s()=\t" + ((T2)this).s());
            System.out.println("((T1)this).s()=\t" + ((T1)this).s());
        }
    }
    class Test2 {
        public static void main(String[] args) {
            T3 t3 = new T3();
            t3.test();
        }
    }
    
```

que produz a saída:
```
    s()=            3
    super.s()=      2
    ((T2)this).s()= 3
    ((T1)this).s()= 3
    
```

Os casts para os tipos `T1` e `T2` não alteram o método que é invocado, porque o método de instância a ser invocado é escolhido de acordo com a classe em tempo de execução do objeto referenciado por `this`. Um cast não altera a classe de um objeto; ele apenas verifica se a classe é compatível com o tipo especificado.

#### 15.12.4.5. Criar Frame, Sincronizar, Transferir Controle

Um método `m` em alguma classe S foi identificado como o que será invocado.

Agora um novo _frame de ativação_ é criado, contendo a referência de destino (se houver) e os valores dos argumentos (se houver), bem como espaço suficiente para as variáveis locais e a pilha para o método a ser invocado e qualquer outra informação de contabilidade que possa ser exigida pela implementação (ponteiro de pilha, contador de programa, referência ao frame de ativação anterior, e similares). Se não houver memória suficiente disponível para criar tal frame de ativação, um `StackOverflowError` é lançado.

O frame de ativação recém-criado torna-se o frame de ativação atual. O efeito disso é atribuir os valores dos argumentos às variáveis de parâmetro correspondentes recém-criadas do método, e tornar a referência de destino disponível como `this`, se houver uma referência de destino. Antes que cada valor de argumento seja atribuído à sua variável de parâmetro correspondente, ele é submetido à conversão de invocação ([§5.3](<#/doc/jls/jls-05>)).

Se a eliminação de tipo (erasure) ([§4.6](<#/doc/jls/jls-04>)) do tipo do método sendo invocado diferir em sua assinatura da eliminação de tipo (erasure) do tipo da declaração em tempo de compilação para a invocação do método ([§15.12.3](<#/doc/jls/jls-15>)), então se qualquer um dos valores dos argumentos for um objeto que não é uma instância de uma subclasse ou subinterface da eliminação de tipo (erasure) do tipo de parâmetro formal correspondente na declaração em tempo de compilação para a invocação do método, então uma `ClassCastException` é lançada.

Se o método `m` for um método `native` mas o código binário nativo e dependente da implementação necessário não tiver sido carregado ou não puder ser dinamicamente ligado, então um `UnsatisfiedLinkError` é lançado.

Se o método `m` não for `synchronized`, o controle é transferido para o corpo do método `m` a ser invocado.

Se o método `m` for `synchronized`, então um objeto deve ser bloqueado antes da transferência de controle. Nenhum progresso adicional pode ser feito até que a thread atual possa obter o bloqueio. Se houver uma referência de destino, então o objeto de destino deve ser bloqueado; caso contrário, o objeto `Class` para a classe S, a classe do método `m`, deve ser bloqueado. O controle é então transferido para o corpo do método `m` a ser invocado. O objeto é automaticamente desbloqueado quando a execução do corpo do método é concluída, seja normalmente ou abruptamente. O comportamento de bloqueio e desbloqueio é exatamente como se o corpo do método estivesse embutido em uma instrução `synchronized` ([§14.19](<#/doc/jls/jls-14>)).

**Exemplo 15.12.4.5-1. Assinatura do Método Invocado Tem Eliminação de Tipo (Erasure) Diferente da Assinatura do Método em Tempo de Compilação**

Considere as declarações:
```java
    abstract class C<T> {
        abstract T id(T x);
    }
    class D extends C<String> {
        String id(String x) { return x; }
    }
    
```

Agora, dada uma invocação:
```java
    C c = new D();
    c.id(new Object());  // fails with a ClassCastException
    
```

A eliminação de tipo (erasure) do método real sendo invocado, `D.id()`, difere em sua assinatura da declaração do método em tempo de compilação, `C.id()`. O primeiro aceita um argumento do tipo `String` enquanto o último aceita um argumento do tipo `Object`. A invocação falha com uma `ClassCastException` antes que o corpo do método seja executado.

Tais situações só podem surgir se o programa gerar um aviso não verificado em tempo de compilação ([§4.8](<#/doc/jls/jls-04>), [§5.1.6](<#/doc/jls/jls-05>), [§5.1.9](<#/doc/jls/jls-05>), [§8.4.1](<#/doc/jls/jls-08>), [§8.4.8.3](<#/doc/jls/jls-08>), [§15.13.2](<#/doc/jls/jls-15>), [§15.12.4.2](<#/doc/jls/jls-15>), [§15.27.3](<#/doc/jls/jls-15>)).

As implementações podem impor essa semântica criando _métodos ponte (bridge methods)_. No exemplo acima, o seguinte método ponte seria criado na classe `D`:
```java
    Object id(Object x) { return id((String) x); }
    
```

Este é o método que seria realmente invocado pela Java Virtual Machine em resposta à chamada `c.id(new Object())` mostrada acima, e ele executará o cast e falhará, conforme exigido.
## 15.13. Expressões de Referência de Método

Uma expressão de referência de método é usada para se referir à invocação de um método sem realmente realizar a invocação. Certas formas de expressão de referência de método também permitem que a criação de instância de classe ([§15.9](<#/doc/jls/jls-15>)) ou a criação de array ([§15.10](<#/doc/jls/jls-15>)) sejam tratadas como se fossem uma invocação de método.

MethodReference:

[ExpressionName](<#/doc/jls/jls-06>) `::` [[TypeArguments](<#/doc/jls/jls-04>)] [Identifier](<#/doc/jls/jls-03>)   
[Primary](<#/doc/jls/jls-15>) `::` [[TypeArguments](<#/doc/jls/jls-04>)] [Identifier](<#/doc/jls/jls-03>)   
[ReferenceType](<#/doc/jls/jls-04>) `::` [[TypeArguments](<#/doc/jls/jls-04>)] [Identifier](<#/doc/jls/jls-03>)   
`super` `::` [[TypeArguments](<#/doc/jls/jls-04>)] [Identifier](<#/doc/jls/jls-03>)   
[TypeName](<#/doc/jls/jls-06>) `.` `super` `::` [[TypeArguments](<#/doc/jls/jls-04>)] [Identifier](<#/doc/jls/jls-03>)   
[ClassType](<#/doc/jls/jls-04>) `::` [[TypeArguments](<#/doc/jls/jls-04>)] `new`   
[ArrayType](<#/doc/jls/jls-04>) `::` `new`

Se _TypeArguments_ estiver presente à direita de `::`, então é um erro em tempo de compilação se qualquer um dos argumentos de tipo forem wildcards ([§4.5.1](<#/doc/jls/jls-04>)).

Se uma expressão de referência de método tiver a forma _ExpressionName_ `::` _[TypeArguments]_ _Identifier_ ou _Primary_ `::` _[TypeArguments]_ _Identifier_ , é um erro em tempo de compilação se o tipo do _ExpressionName_ ou _Primary_ não for um tipo de referência.

Se uma expressão de referência de método tiver a forma `super` `::` _[TypeArguments]_ _Identifier_ , seja E a declaração de classe ou interface que imediatamente envolve a expressão de referência de método. É um erro em tempo de compilação se E for a classe `Object` ou se E for uma interface.

Se uma expressão de referência de método tiver a forma _TypeName_ `.` `super` `::` _[TypeArguments]_ _Identifier_ , então:

  * Se _TypeName_ denotar uma classe, C, então é um erro em tempo de compilação se C não for uma classe lexicamente envolvente da classe atual, ou se C for a classe `Object`.

  * Se _TypeName_ denotar uma interface, I, então seja E a declaração de classe ou interface que imediatamente envolve a expressão de referência de método. É um erro em tempo de compilação se I não for uma superinterface direta de E, ou se existir alguma outra superclasse direta ou superinterface direta de E, J, tal que J seja uma subclasse ou subinterface de I.

  * Se _TypeName_ denotar uma variável de tipo, então ocorre um erro em tempo de compilação.

Se uma expressão de referência de método tiver a forma `super` `::` _[TypeArguments]_ _Identifier_ ou _TypeName_ `.` `super` `::` _[TypeArguments]_ _Identifier_ , é um erro em tempo de compilação se a expressão ocorrer em um contexto static ([§8.1.3](<#/doc/jls/jls-08>)) ou em um contexto de construção inicial ([§8.8.7](<#/doc/jls/jls-08>)) da classe atual.

Se uma expressão de referência de método tiver a forma _ClassType_ `::` _[TypeArguments]_ `new`, então:

  * _ClassType_ deve nomear uma classe que seja acessível ([§6.6](<#/doc/jls/jls-06>)), não `abstract`, e não uma classe enum, ou ocorre um erro em tempo de compilação.

  * Se _ClassType_ denotar um tipo parametrizado ([§4.5](<#/doc/jls/jls-04>)), então é um erro em tempo de compilação se qualquer um de seus argumentos de tipo forem wildcards.

  * Se _ClassType_ denotar um raw type ([§4.8](<#/doc/jls/jls-04>)), então é um erro em tempo de compilação se _TypeArguments_ estiver presente após o `::`.

Se uma expressão de referência de método tiver a forma _ArrayType_ `::` `new`, então _ArrayType_ deve denotar um tipo que seja reifiable ([§4.7](<#/doc/jls/jls-04>)), ou ocorre um erro em tempo de compilação.

A referência de destino de um método de instância ([§15.12.4.1](<#/doc/jls/jls-15>)) pode ser fornecida pela expressão de referência de método usando um _ExpressionName_ , um _Primary_ , ou `super`, ou pode ser fornecida posteriormente quando o método for invocado. A instância imediatamente envolvente de uma nova instância de classe interna ([§15.9.2](<#/doc/jls/jls-15>)) é fornecida por uma instância lexicamente envolvente de `this` ([§8.1.3](<#/doc/jls/jls-08>)).

Quando mais de um método membro de um tipo tem o mesmo nome, ou quando uma classe tem mais de um construtor, o método ou construtor apropriado é selecionado com base no tipo de functional interface visado pela expressão de referência de método, conforme especificado em [§15.13.1](<#/doc/jls/jls-15>).

Se um método ou construtor for generic, os argumentos de tipo apropriados podem ser inferidos ou fornecidos explicitamente. Da mesma forma, os argumentos de tipo de um tipo generic mencionado pela expressão de referência de método podem ser fornecidos explicitamente ou inferidos.

Expressões de referência de método são sempre poly expressions ([§15.2](<#/doc/jls/jls-15>)).

É um erro em tempo de compilação se uma expressão de referência de método ocorrer em um programa em algum lugar diferente de um assignment context ([§5.2](<#/doc/jls/jls-05>)), um invocation context ([§5.3](<#/doc/jls/jls-05>)), ou um casting context ([§5.5](<#/doc/jls/jls-05>)).

A avaliação de uma expressão de referência de método produz uma instância de um tipo de functional interface ([§9.8](<#/doc/jls/jls-09>)). Isso _não_ causa a execução do método correspondente; em vez disso, a execução pode ocorrer em um momento posterior quando um método apropriado da functional interface for invocado.

Aqui estão algumas expressões de referência de método, primeiro sem uma referência de destino e depois com uma referência de destino:
```java
    String::length             // instance method
    System::currentTimeMillis  // static method
    List<String>::size  // explicit type arguments for generic type
    List::size          // inferred type arguments for generic type
    int[]::clone
    T::tvarMember
    
    System.out::println
    "abc"::length
    foo[x]::bar
    (test ? list.replaceAll(String::trim) : list) :: iterator
    super::toString
    
```

Aqui estão mais algumas expressões de referência de método:
```java
    String::valueOf       // overload resolution needed
    Arrays::sort          // type arguments inferred from context
    Arrays::<String>sort  // explicit type arguments
    
```

Aqui estão algumas expressões de referência de método que representam uma criação adiada de um objeto ou um array:
```java
    ArrayList<String>::new     // constructor for parameterized type
    ArrayList::new             // inferred type arguments
                               // for generic class
    Foo::<Integer>new          // explicit type arguments
                               // for generic constructor
    Bar<String>::<Integer>new  // generic class, generic constructor
    Outer.Inner::new           // inner class constructor
    int[]::new                 // array creation
    
```

Não é possível especificar uma assinatura particular para ser correspondida, por exemplo, `Arrays::sort(int[])`. Em vez disso, a functional interface fornece tipos de argumento que são usados como entrada para o algoritmo de resolução de sobrecarga ([§15.12.2](<#/doc/jls/jls-15>)). Isso deve satisfazer a grande maioria dos casos de uso; quando a rara necessidade de controle mais preciso surgir, uma lambda expression pode ser usada.

O uso da sintaxe de argumento de tipo no nome da classe antes de um delimitador (`List<String>::size`) levanta o problema de parsing de distinguir entre `<` como um colchete de argumento de tipo e `<` como um operador de "menor que". Em teoria, isso não é pior do que permitir argumentos de tipo em expressões de cast; no entanto, a diferença é que o caso de cast só surge quando um token `(` é encontrado; com a adição de expressões de referência de método, o início de _toda_ expressão é potencialmente um tipo parametrizado.

### 15.13.1. Declaração em Tempo de Compilação de uma Referência de Método

A _declaração em tempo de compilação_ de uma expressão de referência de método é o método ao qual a expressão se refere. Em casos especiais, a declaração em tempo de compilação não existe de fato, mas é um método nocional que representa uma criação de instância de classe ou uma criação de array. A escolha da declaração em tempo de compilação depende de um tipo de função visado pela expressão, assim como a declaração em tempo de compilação de uma invocação de método depende dos argumentos da invocação ([§15.12.3](<#/doc/jls/jls-15>)).

A busca por uma declaração em tempo de compilação espelha o processo para invocações de método em [§15.12.1](<#/doc/jls/jls-15>) e [§15.12.2](<#/doc/jls/jls-15>), da seguinte forma:

  * Primeiro, um tipo para buscar é determinado:

    * Se a expressão de referência de método tiver a forma _ExpressionName_ `::` _[TypeArguments]_ _Identifier_ ou _Primary_ `::` _[TypeArguments]_ _Identifier_ , o tipo a ser buscado é o tipo da expressão que precede o token `::`.

    * Se a expressão de referência de método tiver a forma _ReferenceType_ `::` _[TypeArguments]_ _Identifier_ , o tipo a ser buscado é o resultado da capture conversion ([§5.1.10](<#/doc/jls/jls-05>)) aplicada a _ReferenceType_.

    * Se a expressão de referência de método tiver a forma `super` `::` _[TypeArguments]_ _Identifier_ , o tipo a ser buscado é o tipo da superclasse da declaração de classe ou interface que imediatamente envolve a expressão de referência de método.

Seja T a declaração de classe ou interface que imediatamente envolve a expressão de referência de método. É um erro em tempo de compilação se T for a classe `Object` ou uma interface.

    * Se a expressão de referência de método tiver a forma _TypeName_ `.` `super` `::` _[TypeArguments]_ _Identifier_ , então se _TypeName_ denotar uma classe, o tipo a ser buscado é o tipo da superclasse da classe nomeada; caso contrário, _TypeName_ denota uma interface para buscar.

É um erro em tempo de compilação se _TypeName_ não for nem uma declaração de classe ou interface lexicamente envolvente da expressão de referência de método, nem uma superinterface direta da declaração de classe ou interface que imediatamente envolve a expressão de referência de método.

É um erro em tempo de compilação se _TypeName_ for a classe Object.

É um erro em tempo de compilação se _TypeName_ for uma interface, e existir alguma outra superclasse direta ou superinterface direta da declaração de classe ou interface que imediatamente envolve a expressão de referência de método, J, tal que J seja uma subclasse ou subinterface de _TypeName_.

    * Para as outras duas formas (envolvendo `::` `new`), o método referenciado é nocional e não há tipo para buscar.

  * Segundo, dado um tipo de função alvo com _n_ parâmetros, um conjunto de métodos potencialmente aplicáveis é identificado:

    * Se a expressão de referência de método tiver a forma _ReferenceType_ `::` _[TypeArguments]_ _Identifier_ , então os métodos potencialmente aplicáveis são:

      * os métodos membro do tipo a ser buscado que seriam potencialmente aplicáveis ([§15.12.2.1](<#/doc/jls/jls-15>)) para uma invocação de método que nomeia _Identifier_ , tem aridade _n_ , tem argumentos de tipo _TypeArguments_ , e aparece na mesma classe que a expressão de referência de método; mais

      * os métodos membro do tipo a ser buscado que seriam potencialmente aplicáveis para uma invocação de método que nomeia _Identifier_ , tem aridade _n_ -1, tem argumentos de tipo _TypeArguments_ , e aparece na mesma classe que a expressão de referência de método.

Duas aridades diferentes, _n_ e _n_ -1, são consideradas, para levar em conta a possibilidade de que esta forma se refira a um método `static` ou a um método de instância.

    * Se a expressão de referência de método tiver a forma _ClassType_ `::` _[TypeArguments]_ `new`, então os métodos potencialmente aplicáveis são um conjunto de métodos nocionais correspondentes aos construtores de _ClassType_.

Se _ClassType_ for um raw type, mas não for um tipo membro não-`static` de um raw type, os métodos membro nocionais candidatos são aqueles especificados em [§15.9.3](<#/doc/jls/jls-15>) para uma expressão de criação de instância de classe que usa `<>` para omitir os argumentos de tipo para uma classe. Caso contrário, os métodos membro nocionais candidatos são os construtores de _ClassType_ , tratados como se fossem métodos com tipo de retorno _ClassType_.

Entre esses candidatos, os métodos potencialmente aplicáveis são os métodos nocionais que seriam potencialmente aplicáveis para uma invocação de método que tem aridade _n_ , tem argumentos de tipo _TypeArguments_ , e aparece na mesma classe que a expressão de referência de método.

    * Se a expressão de referência de método tiver a forma _ArrayType_ `::` `new`, um único método nocional é considerado. O método tem um único parâmetro do tipo `int`, retorna o _ArrayType_ , e não tem cláusula `throws`. Se _n_ = 1, este é o único método potencialmente aplicável; caso contrário, não há métodos potencialmente aplicáveis.

    * Para todas as outras formas, os métodos potencialmente aplicáveis são os métodos membro do tipo a ser buscado que seriam potencialmente aplicáveis para uma invocação de método que nomeia _Identifier_ , tem aridade _n_ , tem argumento de tipo _TypeArguments_ , e aparece na mesma classe que a expressão de referência de método.

  * Finalmente, se não houver métodos potencialmente aplicáveis, então não há declaração em tempo de compilação.

Caso contrário, dado um tipo de função alvo com tipos de parâmetro P1, ..., Pn e um conjunto de métodos potencialmente aplicáveis, a declaração em tempo de compilação é selecionada da seguinte forma:

    * Se a expressão de referência de método tiver a forma _ReferenceType_ `::` _[TypeArguments]_ _Identifier_ , então duas buscas por um método aplicável mais específico são realizadas. Cada busca é conforme especificado em [§15.12.2.2](<#/doc/jls/jls-15>) até [§15.12.2.5](<#/doc/jls/jls-15>), com as clarificações abaixo. Cada busca produz um conjunto de métodos aplicáveis e, possivelmente, designa um método mais específico do conjunto. No caso de um erro conforme especificado em [§15.12.2.4](<#/doc/jls/jls-15>), o conjunto de métodos aplicáveis é vazio. No caso de um erro conforme especificado em [§15.12.2.5](<#/doc/jls/jls-15>), não há método mais específico.

Na primeira busca, a referência de método é tratada como se fosse uma invocação com expressões de argumento dos tipos P1, ..., Pn. Argumentos de tipo, se houver, são dados pela expressão de referência de método.

Na segunda busca, se P1, ..., Pn não for vazio e P1 for um subtipo de _ReferenceType_ , então a expressão de referência de método é tratada como se fosse uma expressão de invocação de método com expressões de argumento dos tipos P2, ..., Pn. Se _ReferenceType_ for um raw type, e existir uma parametrização deste tipo, G`<`...`>`, que seja um supertipo de P1, o tipo a ser buscado é o resultado da capture conversion ([§5.1.10](<#/doc/jls/jls-05>)) aplicada a G`<`...`>`; caso contrário, o tipo a ser buscado é o mesmo que o tipo da primeira busca. Argumentos de tipo, se houver, são dados pela expressão de referência de método.

Se a primeira busca produzir um método mais específico que seja `static`, e o conjunto de métodos aplicáveis produzido pela segunda busca não contiver métodos não-`static`, então a declaração em tempo de compilação é o método mais específico da primeira busca.

Caso contrário, se o conjunto de métodos aplicáveis produzido pela primeira busca não contiver métodos `static`, e a segunda busca produzir um método mais específico que seja não-`static`, então a declaração em tempo de compilação é o método mais específico da segunda busca.

Caso contrário, não há declaração em tempo de compilação.

    * Para todas as outras formas de expressão de referência de método, uma busca por um método aplicável mais específico é realizada. A busca é conforme especificado em [§15.12.2.2](<#/doc/jls/jls-15>) até [§15.12.2.5](<#/doc/jls/jls-15>), com as clarificações abaixo.

A referência de método é tratada como se fosse uma invocação com expressões de argumento dos tipos P1, ..., Pn; os argumentos de tipo, se houver, são dados pela expressão de referência de método.

Se a busca resultar em um erro conforme especificado em [§15.12.2.2](<#/doc/jls/jls-15>) até [§15.12.2.5](<#/doc/jls/jls-15>), ou se o método aplicável mais específico for `static`, não há declaração em tempo de compilação.

Caso contrário, a declaração em tempo de compilação é o método aplicável mais específico.

É um erro em tempo de compilação se uma expressão de referência de método tiver a forma _ReferenceType_ `::` _[TypeArguments]_ _Identifier_ , e a declaração em tempo de compilação for `static`, e _ReferenceType_ não for um nome simples ou qualificado ([§6.2](<#/doc/jls/jls-06>)).

É um erro em tempo de compilação se a expressão de referência de método tiver a forma `super` `::` _[TypeArguments]_ _Identifier_ ou _TypeName_ `.` `super` `::` _[TypeArguments]_ _Identifier_ , e a declaração em tempo de compilação for `abstract`.

É um erro em tempo de compilação se a expressão de referência de método tiver a forma `super` `::` _[TypeArguments]_ _Identifier_ ou _TypeName_ `.` `super` `::` _[TypeArguments]_ _Identifier_ , e a expressão de referência de método ocorrer em um contexto static ([§8.1.3](<#/doc/jls/jls-08>)) ou em um contexto de construção inicial ([§8.8.7](<#/doc/jls/jls-08>)) da classe atual.

É um erro em tempo de compilação se a expressão de referência de método tiver a forma _TypeName_ `.` `super` `::` _[TypeArguments]_ _Identifier_ , e _TypeName_ denotar uma classe C, e a declaração de classe ou interface que imediatamente envolve a expressão de referência de método não for C ou uma classe interna de C.

É um erro em tempo de compilação se a expressão de referência de método tiver a forma _TypeName_ `.` `super` `::` _[TypeArguments]_ _Identifier_ , e _TypeName_ denotar uma interface, e existir um método, distinto da declaração em tempo de compilação, que sobrescreve a declaração em tempo de compilação de uma superclasse direta ou superinterface direta da classe ou interface cuja declaração imediatamente envolve a expressão de referência de método ([§8.4.8](<#/doc/jls/jls-08>), [§9.4.1](<#/doc/jls/jls-09>)).

É um erro em tempo de compilação se a expressão de referência de método for da forma _ClassType_ `::` _[TypeArguments]_ `new` e um erro em tempo de compilação ocorreria ao determinar uma instância envolvente para _ClassType_ conforme especificado em [§15.9.2](<#/doc/jls/jls-15>) (tratando a expressão de referência de método como se fosse uma unqualified class instance creation expression).

Uma expressão de referência de método da forma _ReferenceType_ `::` _[TypeArguments]_ _Identifier_ pode ser interpretada de diferentes maneiras. Se _Identifier_ se refere a um método de instância, então a lambda expression implícita tem um parâmetro extra em comparação com se _Identifier_ se refere a um método `static`. É possível que _ReferenceType_ tenha ambos os tipos de métodos aplicáveis, então o algoritmo de busca descrito acima os identifica separadamente, já que existem diferentes tipos de parâmetros para cada caso.

Um exemplo de ambiguidade é:
```java
    interface Fun<T,R> { R apply(T arg); }
    
    class C {
        int size() { return 0; }
        static int size(Object arg) { return 0; }
    
        void test() {
            Fun<C, Integer> f1 = C::size;
              // Error: instance method size()
              // or static method size(Object)?
        }
    }
    
```

Esta ambiguidade não pode ser resolvida fornecendo um método de instância aplicável que seja mais específico do que um método `static` aplicável:
```java
    interface Fun<T,R> { R apply(T arg); }
    
    class C {
        int size() { return 0; }
        static int size(Object arg) { return 0; }
        int size(C arg) { return 0; }
    
        void test() {
            Fun<C, Integer> f1 = C::size;
              // Error: instance method size()
              // or static method size(Object)?
        }
    }
    
```

A busca é inteligente o suficiente para ignorar ambiguidades em que todos os métodos aplicáveis (de ambas as buscas) são métodos de instância:
```java
    interface Fun<T,R> { R apply(T arg); }
    
    class C {
        int size() { return 0; }
        int size(Object arg) { return 0; }
        int size(C arg) { return 0; }
    
        void test() {
            Fun<C, Integer> f1 = C::size;
              // OK: reference is to instance method size()
        }
    }
    
```

Por conveniência, quando o nome de um tipo generic é usado para se referir a um método de instância (onde o receptor se torna o primeiro parâmetro), o target type é usado para determinar os argumentos de tipo. Isso facilita o uso como `Pair::first` em vez de `Pair<String,Integer>::first`. Similarmente, uma referência de método como `Pair::new` é tratada como uma criação de instância "diamond" (`new Pair<>()`). Como o "diamond" é implícito, esta forma _não_ instancia um raw type; na verdade, não há como expressar uma referência ao construtor de um raw type.

Para algumas expressões de referência de método, há apenas uma declaração em tempo de compilação possível com apenas um tipo de invocação possível ([§15.12.2.6](<#/doc/jls/jls-15>)), independentemente do tipo de função alvo. Tais expressões de referência de método são ditas _exatas_. Uma expressão de referência de método que não é exata é dita _inexata_.

Uma expressão de referência de método terminando com _Identifier_ é exata se satisfizer todos os seguintes:

  * Se a expressão de referência de método tiver a forma _ReferenceType_ `::` _[TypeArguments]_ _Identifier_ , então _ReferenceType_ não denota um raw type.

  * O tipo a ser buscado tem exatamente um método membro com o nome _Identifier_ que é acessível à classe ou interface na qual a expressão de referência de método aparece.

  * Este método não é de aridade variável ([§8.4.1](<#/doc/jls/jls-08>)).

  * Se este método for generic ([§8.4.4](<#/doc/jls/jls-08>)), então a expressão de referência de método fornece _TypeArguments_.

Uma expressão de referência de método da forma _ClassType_ `::` _[TypeArguments]_ `new` é exata se satisfizer todos os seguintes:

  * O tipo denotado por _ClassType_ não é raw, ou é um tipo membro não-`static` de um raw type.

  * O tipo denotado por _ClassType_ tem exatamente um construtor que é acessível à classe ou interface na qual a expressão de referência de método aparece.

  * Este construtor não é de aridade variável.

  * Se este construtor for generic, então a expressão de referência de método fornece _TypeArguments_.

Uma expressão de referência de método da forma _ArrayType_ `::` `new` é sempre exata.

### 15.13.2. Tipo de uma Referência de Método

Uma expressão de referência de método é compatível em um assignment context, invocation context, ou casting context com um target type T se T for um tipo de functional interface ([§9.8](<#/doc/jls/jls-09>)) e a expressão for _congruente_ com o tipo de função do _ground target type_ derivado de T.

O _ground target type_ é derivado de T da seguinte forma:

  * Se T for um tipo de functional interface parametrizado por wildcard, então o ground target type é a parametrização sem wildcard ([§9.9](<#/doc/jls/jls-09>)) de T.

  * Caso contrário, o ground target type é T.

Uma expressão de referência de método é _congruente_ com um tipo de função se ambos os seguintes forem verdadeiros:

  * O tipo de função identifica uma única declaração em tempo de compilação correspondente à referência.

  * Um dos seguintes é verdadeiro:

    * O resultado do tipo de função é `void`.

    * O resultado do tipo de função é R, e o resultado de aplicar capture conversion ([§5.1.10](<#/doc/jls/jls-05>)) ao tipo de retorno do tipo de invocação ([§15.12.2.6](<#/doc/jls/jls-15>)) da declaração em tempo de compilação escolhida é R' (onde R é o target type que pode ser usado para inferir R'), e nem R nem R' são `void`, e R' é compatível com R em um assignment context.

Se uma unchecked conversion foi necessária para que a declaração em tempo de compilação fosse aplicável, e esta conversão causaria um unchecked warning em um invocation context, então um unchecked warning em tempo de compilação ocorre, a menos que seja suprimido por `@SuppressWarnings` ([§9.6.4.5](<#/doc/jls/jls-09>)).

Se uma unchecked conversion foi necessária para que o tipo de retorno R', descrito acima, fosse compatível com o tipo de retorno do tipo de função, R, e esta conversão causaria um unchecked warning em um assignment context, então um unchecked warning em tempo de compilação ocorre, a menos que seja suprimido por `@SuppressWarnings`.

Se uma expressão de referência de método for compatível com um target type T, então o tipo da expressão, U, é o ground target type derivado de T.

É um erro em tempo de compilação se qualquer classe ou interface mencionada por U ou pelo tipo de função de U não for acessível ([§6.6](<#/doc/jls/jls-06>)) da classe ou interface na qual a expressão de referência de método aparece.

Para cada método membro não-`static` `m` de U, se o tipo de função de U tiver uma subsignature da assinatura de `m`, então um método nocional cujo tipo de método é o tipo de função de U é dito sobrescrever `m`, e qualquer erro em tempo de compilação ou unchecked warning especificado em [§8.4.8.3](<#/doc/jls/jls-08>) pode ocorrer.

Para cada tipo de checked exception X listado na cláusula `throws` do tipo de invocação da declaração em tempo de compilação, X ou uma superclasse de X deve ser mencionada na cláusula `throws` do tipo de função de U, ou ocorre um erro em tempo de compilação.

A ideia chave por trás da definição de compatibilidade é que uma referência de método é compatível se e somente se a lambda expression equivalente `(x, y, z) `->` exp.<T1, T2>method(x, y, z)` for compatível. (Isso é informal, e existem questões que tornam difícil ou impossível definir formalmente a semântica em termos de tal reescrita.)

Estas regras de compatibilidade fornecem uma facilidade conveniente para converter de uma functional interface para outra:
```java
    Task t = () -> System.out.println("hi");
    Runnable r = t::invoke;
    
```

A implementação pode ser otimizada para que, quando um objeto derivado de lambda é passado e convertido para vários tipos, isso não resulte em muitos níveis de lógica de adaptação em torno do corpo central da lambda.

Ao contrário de uma lambda expression, uma referência de método pode ser congruente com um tipo de função generic (ou seja, um tipo de função que tem parâmetros de tipo). Isso ocorre porque a lambda expression precisaria ser capaz de declarar parâmetros de tipo, e nenhuma sintaxe suporta isso; enquanto para uma referência de método, tal declaração não é necessária. Por exemplo, o seguinte programa é legal:
```java
    
    interface ListFactory {
        <T> List<T> make();
    }
    
    ListFactory lf  = ArrayList::new;
    List<String> ls = lf.make();
    List<Number> ln = lf.make();
    
    
```

### 15.13.3. Avaliação em Tempo de Execução de Referências de Método

Em tempo de execução, a avaliação de uma expressão de referência de método é semelhante à avaliação de uma expressão de criação de instância de classe, na medida em que a conclusão normal produz uma referência a um objeto. A avaliação de uma expressão de referência de método é distinta da invocação do próprio método.

Primeiro, se a expressão de referência de método começar com um _ExpressionName_ ou um _Primary_ , esta subexpressão é avaliada. Se a subexpressão avaliar para `null`, uma `NullPointerException` é lançada, e a expressão de referência de método é concluída abruptamente. Se a subexpressão for concluída abruptamente, a expressão de referência de método é concluída abruptamente pela mesma razão.

Em seguida, ou uma nova instância de uma classe com as propriedades abaixo é alocada e inicializada, ou uma instância existente de uma classe com as propriedades abaixo é referenciada. Se uma nova instância for criada, mas não houver espaço suficiente para alocar o objeto, a avaliação da expressão de referência de método é concluída abruptamente lançando um `OutOfMemoryError`.

O valor de uma expressão de referência de método é uma referência a uma instância de uma classe com as seguintes propriedades:

  * A classe implementa o tipo de functional interface alvo e, se o target type for um intersection type, todos os outros tipos de interface mencionados na interseção.

  * Onde a expressão de referência de método tem tipo U, para cada método membro não-`static` `m` de U:

Se o tipo de função de U tiver uma subsignature da assinatura de `m`, então a classe declara um _invocation method_ que sobrescreve `m`. O corpo do invocation method invoca o método referenciado, cria uma instância de classe, ou cria um array, conforme descrito abaixo. Se o resultado do invocation method não for `void`, então o corpo retorna o resultado da invocação do método ou criação de objeto, após quaisquer assignment conversions necessárias ([§5.2](<#/doc/jls/jls-05>)).

Se a erasure do tipo de um método sendo sobrescrito diferir em sua assinatura da erasure do tipo de função de U, então antes da invocação do método ou criação do objeto, o corpo de um invocation method verifica se cada valor de argumento é uma instância de uma subclasse ou subinterface da erasure do tipo de parâmetro correspondente no tipo de função de U; caso contrário, uma `ClassCastException` é lançada.

  * A classe não sobrescreve nenhum outro método do tipo de functional interface ou outros tipos de interface mencionados acima, embora possa sobrescrever métodos da classe `Object`.

O corpo de um invocation method depende da forma da expressão de referência de método, da seguinte forma:

  * Se a forma for _ExpressionName_ `::` _[TypeArguments]_ _Identifier_ ou _Primary_ `::` _[TypeArguments]_ _Identifier_ , então o corpo do invocation method tem o efeito de uma expressão de invocação de método para uma declaração em tempo de compilação que é a declaração em tempo de compilação da expressão de referência de método. A avaliação em tempo de execução da expressão de invocação de método é conforme especificado em [§15.12.4.3](<#/doc/jls/jls-15>), [§15.12.4.4](<#/doc/jls/jls-15>), e [§15.12.4.5](<#/doc/jls/jls-15>), onde:

    * O invocation mode é derivado da declaração em tempo de compilação conforme especificado em [§15.12.3](<#/doc/jls/jls-15>).

    * A referência de destino é o valor de _ExpressionName_ ou _Primary_ , conforme determinado quando a expressão de referência de método foi avaliada.
* Os argumentos para a expressão de invocação de método são os parâmetros formais do método de invocação.

* Se a forma for _ReferenceType_ `::` _[TypeArguments]_ _Identifier_ , o corpo do método de invocação tem, de forma similar, o efeito de uma expressão de invocação de método para uma declaração em tempo de compilação que é a declaração em tempo de compilação da expressão de referência de método. A avaliação em tempo de execução da expressão de invocação de método é conforme especificado em [§15.12.4.3](<#/doc/jls/jls-15>), [§15.12.4.4](<#/doc/jls/jls-15>), e [§15.12.4.5](<#/doc/jls/jls-15>), onde:

    * O modo de invocação é derivado da declaração em tempo de compilação conforme especificado em [§15.12.3](<#/doc/jls/jls-15>).

    * Se a declaração em tempo de compilação for um método de instância, então a referência de destino é o primeiro parâmetro formal do método de invocação. Caso contrário, não há referência de destino.

    * Se a declaração em tempo de compilação for um método de instância, então os argumentos para a expressão de invocação de método (se houver) são o segundo e os parâmetros formais subsequentes do método de invocação. Caso contrário, os argumentos para a expressão de invocação de método são os parâmetros formais do método de invocação.

* Se a forma for `super` `::` _[TypeArguments]_ _Identifier_ ou _TypeName_ `.` `super` `::` _[TypeArguments]_ _Identifier_ , o corpo do método de invocação tem o efeito de uma expressão de invocação de método para uma declaração em tempo de compilação que é a declaração em tempo de compilação da expressão de referência de método. A avaliação em tempo de execução da expressão de invocação de método é conforme especificado em [§15.12.4.3](<#/doc/jls/jls-15>), [§15.12.4.4](<#/doc/jls/jls-15>), e [§15.12.4.5](<#/doc/jls/jls-15>), onde:

    * O modo de invocação é `super`.

    * Se a expressão de referência de método começar com um _TypeName_ que nomeia uma classe, a referência de destino é o valor de _TypeName_ `.` `this` no ponto em que a referência de método é avaliada. Caso contrário, a referência de destino é o valor de `this` no ponto em que a referência de método é avaliada.

    * Os argumentos para a expressão de invocação de método são os parâmetros formais do método de invocação.

* Se a forma for _ClassType_ `::` _[TypeArguments]_ `new`, o corpo do método de invocação tem o efeito de uma expressão de criação de instância de classe na forma `new` _[TypeArguments]_ _ClassType_(A1, ..., An), onde os argumentos A1, ..., An são os parâmetros formais do método de invocação, e onde:

    * A instância envolvente para o novo objeto, se houver, é derivada do local da expressão de referência de método, conforme especificado em [§15.9.2](<#/doc/jls/jls-15>).

    * O construtor a ser invocado é o construtor que corresponde à declaração em tempo de compilação da referência de método ([§15.13.1](<#/doc/jls/jls-15>)).

* Se a forma for _Type`[]`k_ `::` `new` (_k_ ≥ 1), então o corpo do método de invocação tem o mesmo efeito que uma expressão de criação de array na forma `new` _Type`[` size `]` `[]`k-1_, onde _size_ é o único parâmetro do método de invocação. (A notação _`[]` k_ indica uma sequência de _k_ pares de colchetes.)

Se o corpo do método de invocação tiver o efeito de uma expressão de invocação de método, então os tipos de parâmetro em tempo de compilação e o resultado em tempo de compilação da invocação de método são determinados conforme especificado em [§15.12.3](<#/doc/jls/jls-15>). Para o propósito de determinar o resultado em tempo de compilação, a expressão de invocação de método é uma instrução de expressão se o resultado do método de invocação for `void`, e a _Expression_ de uma instrução `return` se o resultado do método de invocação não for `void`.

O momento da avaliação da expressão de referência de método é mais complexo do que o das expressões lambda ([§15.27.4](<#/doc/jls/jls-15>)). Quando uma expressão de referência de método tem uma expressão (em vez de um tipo) precedendo o separador `::`, essa subexpressão é avaliada imediatamente. O resultado da avaliação é armazenado até que o método do tipo de interface funcional correspondente seja invocado; nesse ponto, o resultado é usado como referência de destino para a invocação. Isso significa que a expressão que precede o separador `::` é avaliada apenas quando o programa encontra a expressão de referência de método, e não é reavaliada em invocações subsequentes no tipo de interface funcional.

É interessante contrastar o tratamento de `null` aqui com seu tratamento durante a invocação de método. Quando uma expressão de invocação de método é avaliada, é possível que o _Primary_ que qualifica a invocação seja avaliado como `null`, mas que nenhuma `NullPointerException` seja lançada. Isso ocorre quando o método invocado é `static` (apesar da sintaxe da invocação sugerir um método de instância). Como o método aplicável para uma expressão de referência de método qualificada por um _Primary_ é proibido de ser `static` ([§15.13.1](<#/doc/jls/jls-15>)), a avaliação da expressão de referência de método é mais simples - um _Primary_ `null` sempre lança uma `NullPointerException`.

## 15.14. Expressões Postfix

Expressões postfix incluem o uso dos operadores postfix `++` e `--`. Nomes não são considerados expressões primárias ([§15.8](<#/doc/jls/jls-15>)), mas são tratados separadamente na gramática para evitar certas ambiguidades. Eles se tornam intercambiáveis apenas aqui, no nível de precedência das expressões postfix.

PostfixExpression:

[Primary](<#/doc/jls/jls-15>)
[ExpressionName](<#/doc/jls/jls-06>)
[PostIncrementExpression](<#/doc/jls/jls-15>)
[PostDecrementExpression](<#/doc/jls/jls-15>)

### 15.14.1. Nomes de Expressão

As regras para avaliar nomes de expressão são dadas em [§6.5.6](<#/doc/jls/jls-06>).

### 15.14.2. Operador de Incremento Postfix `++`

Uma expressão postfix seguida por um operador `++` é uma expressão de incremento postfix.

PostIncrementExpression:

[PostfixExpression](<#/doc/jls/jls-15>) `++`

O resultado da expressão postfix deve ser uma variável de um tipo que seja conversível ([§5.1.8](<#/doc/jls/jls-05>)) para um tipo numérico, ou ocorre um erro em tempo de compilação.

O tipo da expressão de incremento postfix é o tipo da variável. O resultado da expressão de incremento postfix não é uma variável, mas um valor.

Em tempo de execução, se a avaliação da expressão operando for concluída abruptamente, então a expressão de incremento postfix é concluída abruptamente pela mesma razão e nenhum incremento ocorre. Caso contrário, o valor `1` é adicionado ao valor da variável e a soma é armazenada de volta na variável. Antes da adição, a promoção numérica binária ([§5.6](<#/doc/jls/jls-05>)) é realizada no valor `1` e no valor da variável. Se necessário, a soma é estreitada por uma conversão primitiva de estreitamento ([§5.1.3](<#/doc/jls/jls-05>)) e/ou submetida a uma conversão boxing ([§5.1.7](<#/doc/jls/jls-05>)) para o tipo da variável antes de ser armazenada. O valor da expressão de incremento postfix é o valor da variável _antes_ que o novo valor seja armazenado.

Note que a promoção numérica binária mencionada acima pode incluir a conversão unboxing ([§5.1.8](<#/doc/jls/jls-05>)).

Uma variável que é declarada `final` não pode ser incrementada porque quando um acesso a tal variável `final` é usado como uma expressão, o resultado é um valor, não uma variável. Assim, ela não pode ser usada como operando de um operador de incremento postfix.

### 15.14.3. Operador de Decremento Postfix `--`

Uma expressão postfix seguida por um operador `--` é uma expressão de decremento postfix.

PostDecrementExpression:

[PostfixExpression](<#/doc/jls/jls-15>) `--`

O resultado da expressão postfix deve ser uma variável de um tipo que seja conversível ([§5.1.8](<#/doc/jls/jls-05>)) para um tipo numérico, ou ocorre um erro em tempo de compilação.

O tipo da expressão de decremento postfix é o tipo da variável. O resultado da expressão de decremento postfix não é uma variável, mas um valor.

Em tempo de execução, se a avaliação da expressão operando for concluída abruptamente, então a expressão de decremento postfix é concluída abruptamente pela mesma razão e nenhum decremento ocorre. Caso contrário, o valor `1` é subtraído do valor da variável e a diferença é armazenada de volta na variável. Antes da subtração, a promoção numérica binária ([§5.6](<#/doc/jls/jls-05>)) é realizada no valor `1` e no valor da variável. Se necessário, a diferença é estreitada por uma conversão primitiva de estreitamento ([§5.1.3](<#/doc/jls/jls-05>)) e/ou submetida a uma conversão boxing ([§5.1.7](<#/doc/jls/jls-05>)) para o tipo da variável antes de ser armazenada. O valor da expressão de decremento postfix é o valor da variável _antes_ que o novo valor seja armazenado.

Note que a promoção numérica binária mencionada acima pode incluir a conversão unboxing ([§5.1.8](<#/doc/jls/jls-05>)).

Uma variável que é declarada `final` não pode ser decrementada porque quando um acesso a tal variável `final` é usado como uma expressão, o resultado é um valor, não uma variável. Assim, ela não pode ser usada como operando de um operador de decremento postfix.

## 15.15. Operadores Unários

Os operadores `+`, `-`, `++`, `--`, `~`, `!`, e o operador de cast ([§15.16](<#/doc/jls/jls-15>)) são chamados de _operadores unários_. Uma expressão unária é um operador unário aplicado a um operando, ou uma expressão `switch` ([§15.28](<#/doc/jls/jls-15>)).

UnaryExpression:

[PreIncrementExpression](<#/doc/jls/jls-15>)
[PreDecrementExpression](<#/doc/jls/jls-15>)
`+` [UnaryExpression](<#/doc/jls/jls-15>)
`-` [UnaryExpression](<#/doc/jls/jls-15>)
[UnaryExpressionNotPlusMinus](<#/doc/jls/jls-15>)

PreIncrementExpression:

`++` [UnaryExpression](<#/doc/jls/jls-15>)

PreDecrementExpression:

`--` [UnaryExpression](<#/doc/jls/jls-15>)

UnaryExpressionNotPlusMinus:

[PostfixExpression](<#/doc/jls/jls-15>)
`~` [UnaryExpression](<#/doc/jls/jls-15>)
`!` [UnaryExpression](<#/doc/jls/jls-15>)
[CastExpression](<#/doc/jls/jls-15>)
[SwitchExpression](<#/doc/jls/jls-15>)

Expressões com operadores unários agrupam-se da direita para a esquerda, de modo que `-~x` significa o mesmo que `-(~x)`.

Esta parte da gramática contém alguns truques para evitar duas potenciais ambiguidades sintáticas.

A primeira ambiguidade potencial surgiria em expressões como `(p)+q`, que parece, para um programador C ou C++, que poderia ser tanto um cast para o tipo `p` de um `+` unário operando em `q`, quanto uma adição binária de duas quantidades `p` e `q`. Em C e C++, o parser lida com esse problema realizando uma quantidade limitada de análise semântica durante a análise, para que saiba se `p` é o nome de um tipo ou o nome de uma variável.

Java adota uma abordagem diferente. O resultado do operador `+` deve ser numérico, e todos os nomes de tipo envolvidos em casts em valores numéricos são palavras-chave conhecidas. Assim, se `p` for uma palavra-chave que nomeia um tipo primitivo, então `(p)+q` só pode fazer sentido como um cast de uma expressão unária. No entanto, se `p` não for uma palavra-chave que nomeia um tipo primitivo, então `(p)+q` só pode fazer sentido como uma operação aritmética binária. Observações semelhantes se aplicam ao operador `-`. A gramática divide _CastExpression_ em múltiplos casos para fazer essa distinção:

CastExpression:

`(` [PrimitiveType](<#/doc/jls/jls-04>) `)` [UnaryExpression](<#/doc/jls/jls-15>)
`(` [ReferenceType](<#/doc/jls/jls-04>) {[AdditionalBound](<#/doc/jls/jls-04>)} `)` [UnaryExpressionNotPlusMinus](<#/doc/jls/jls-15>)
`(` [ReferenceType](<#/doc/jls/jls-04>) {[AdditionalBound](<#/doc/jls/jls-04>)} `)` [LambdaExpression](<#/doc/jls/jls-15>)

O não-terminal _UnaryExpression_ inclui todos os operadores unários, mas o não-terminal _UnaryExpressionNotPlusMinus_ exclui o uso de todos os operadores unários que também poderiam ser operadores binários, que em Java são `+` e `-`.

A segunda ambiguidade potencial é que a expressão `(p)++` poderia, para um programador C ou C++, parecer ser tanto um incremento postfix de uma expressão entre parênteses quanto o início de um cast, por exemplo, em `(p)++q`. Como antes, os parsers para C e C++ sabem se `p` é o nome de um tipo ou o nome de uma variável. Mas um parser usando apenas um lookahead de um token e sem análise semântica durante a análise não seria capaz de dizer, quando `++` é o token de lookahead, se `(p)` deveria ser considerado uma expressão _Primary_ ou deixado para consideração posterior como parte de uma _CastExpression_.

Em Java, o resultado do operador `++` deve ser numérico, e todos os nomes de tipo envolvidos em casts em valores numéricos são palavras-chave conhecidas. Assim, se `p` for uma palavra-chave que nomeia um tipo primitivo, então `(p)++` só pode fazer sentido como um cast de uma expressão de incremento prefix, e é melhor que haja um operando como `q` seguindo o `++`. No entanto, se `p` não for uma palavra-chave que nomeia um tipo primitivo, então `(p)++` só pode fazer sentido como um incremento postfix de `p`. Observações semelhantes se aplicam ao operador `--`. O não-terminal _UnaryExpressionNotPlusMinus_ portanto também exclui o uso dos operadores prefix `++` e `--`.

### 15.15.1. Operador de Incremento Prefix `++`

Uma expressão unária precedida por um operador `++` é uma expressão de incremento prefix.

O resultado da expressão unária deve ser uma variável de um tipo que seja conversível ([§5.1.8](<#/doc/jls/jls-05>)) para um tipo numérico, ou ocorre um erro em tempo de compilação.

O tipo da expressão de incremento prefix é o tipo da variável. O resultado da expressão de incremento prefix não é uma variável, mas um valor.

Em tempo de execução, se a avaliação da expressão operando for concluída abruptamente, então a expressão de incremento prefix é concluída abruptamente pela mesma razão e nenhum incremento ocorre. Caso contrário, o valor `1` é adicionado ao valor da variável e a soma é armazenada de volta na variável. Antes da adição, a promoção numérica binária ([§5.6](<#/doc/jls/jls-05>)) é realizada no valor `1` e no valor da variável. Se necessário, a soma é estreitada por uma conversão primitiva de estreitamento ([§5.1.3](<#/doc/jls/jls-05>)) e/ou submetida a uma conversão boxing ([§5.1.7](<#/doc/jls/jls-05>)) para o tipo da variável antes de ser armazenada. O valor da expressão de incremento prefix é o valor da variável _depois_ que o novo valor é armazenado.

Note que a promoção numérica binária mencionada acima pode incluir a conversão unboxing ([§5.1.8](<#/doc/jls/jls-05>)).

Uma variável que é declarada `final` não pode ser incrementada porque quando um acesso a tal variável `final` é usado como uma expressão, o resultado é um valor, não uma variável. Assim, ela não pode ser usada como operando de um operador de incremento prefix.

### 15.15.2. Operador de Decremento Prefix `--`

Uma expressão unária precedida por um operador `--` é uma expressão de decremento prefix.

O resultado da expressão unária deve ser uma variável de um tipo que seja conversível ([§5.1.8](<#/doc/jls/jls-05>)) para um tipo numérico, ou ocorre um erro em tempo de compilação.

O tipo da expressão de decremento prefix é o tipo da variável. O resultado da expressão de decremento prefix não é uma variável, mas um valor.

Em tempo de execução, se a avaliação da expressão operando for concluída abruptamente, então a expressão de decremento prefix é concluída abruptamente pela mesma razão e nenhum decremento ocorre. Caso contrário, o valor `1` é subtraído do valor da variável e a diferença é armazenada de volta na variável. Antes da subtração, a promoção numérica binária ([§5.6](<#/doc/jls/jls-05>)) é realizada no valor `1` e no valor da variável. Se necessário, a diferença é estreitada por uma conversão primitiva de estreitamento ([§5.1.3](<#/doc/jls/jls-05>)) e/ou submetida a uma conversão boxing ([§5.1.7](<#/doc/jls/jls-05>)) para o tipo da variável antes de ser armazenada. O valor da expressão de decremento prefix é o valor da variável _depois_ que o novo valor é armazenado.

Note que a promoção numérica binária mencionada acima pode incluir a conversão unboxing ([§5.1.8](<#/doc/jls/jls-05>)).

Uma variável que é declarada `final` não pode ser decrementada porque quando um acesso a tal variável `final` é usado como uma expressão, o resultado é um valor, não uma variável. Assim, ela não pode ser usada como operando de um operador de decremento prefix.

### 15.15.3. Operador Unário Mais `+`

O tipo da expressão operando do operador unário `+` deve ser um tipo que seja conversível ([§5.1.8](<#/doc/jls/jls-05>)) para um tipo numérico primitivo, ou ocorre um erro em tempo de compilação.

A promoção numérica unária ([§5.6](<#/doc/jls/jls-05>)) é realizada no operando. O tipo da expressão unária mais é o tipo promovido do operando. O resultado da expressão unária mais não é uma variável, mas um valor, mesmo que o resultado da expressão operando seja uma variável.

Em tempo de execução, o valor da expressão unária mais é o valor promovido do operando.

### 15.15.4. Operador Unário Menos `-`

O tipo da expressão operando do operador unário `-` deve ser um tipo que seja conversível ([§5.1.8](<#/doc/jls/jls-05>)) para um tipo numérico primitivo, ou ocorre um erro em tempo de compilação.

A promoção numérica unária ([§5.6](<#/doc/jls/jls-05>)) é realizada no operando.

O tipo da expressão unária menos é o tipo promovido do operando.

Em tempo de execução, o valor da expressão unária menos é a negação aritmética do valor promovido do operando.

Para valores inteiros, a negação é o mesmo que a subtração de zero. A linguagem de programação Java usa a representação de complemento de dois para inteiros, e o intervalo de valores de complemento de dois não é simétrico, então a negação do `int` ou `long` negativo máximo resulta no mesmo número negativo máximo. Ocorre overflow neste caso, mas nenhuma exceção é lançada. Para todos os valores inteiros `x`, `-x` é igual a `(~x)+1`.

Para valores de ponto flutuante, a negação _não_ é o mesmo que a subtração de zero, porque se `x` for `+0.0`, então `0.0-x` é `+0.0`, mas `-x` é `-0.0`. O menos unário simplesmente inverte o sinal de um número de ponto flutuante. Casos especiais de interesse:

  * Se o operando for NaN, o resultado é NaN. (Lembre-se que NaN não tem sinal ([§4.2.3](<#/doc/jls/jls-04>)).)

A linguagem de programação Java não adotou o requisito mais rigoroso da versão 2019 do Padrão IEEE 754 de que a negação inverte o bit de sinal para todas as entradas, incluindo NaN.

  * Se o operando for um infinito, o resultado é o infinito de sinal oposto.

  * Se o operando for um zero, o resultado é o zero de sinal oposto.

### 15.15.5. Operador de Complemento Bit a Bit `~`

O tipo da expressão operando do operador unário `~` deve ser um tipo que seja conversível ([§5.1.8](<#/doc/jls/jls-05>)) para um tipo integral primitivo, ou ocorre um erro em tempo de compilação.

A promoção numérica unária ([§5.6](<#/doc/jls/jls-05>)) é realizada no operando. O tipo da expressão de complemento bit a bit unário é o tipo promovido do operando.

Em tempo de execução, o valor da expressão de complemento bit a bit unário é o complemento bit a bit do valor promovido do operando. Em todos os casos, `~x` é igual a `(-x)-1`.

### 15.15.6. Operador de Complemento Lógico `!`

O tipo da expressão operando do operador unário `!` deve ser `boolean` ou `Boolean`, ou ocorre um erro em tempo de compilação.

O tipo da expressão de complemento lógico unário é `boolean`.

Em tempo de execução, o operando é sujeito à conversão unboxing ([§5.1.8](<#/doc/jls/jls-05>)) se necessário. O valor da expressão de complemento lógico unário é `true` se o valor do operando (possivelmente convertido) for `false`, e `false` se o valor do operando (possivelmente convertido) for `true`.
## 15.16. Expressões de Conversão (Cast)

Uma expressão de conversão (cast) converte, em tempo de execução, um valor de um tipo numérico para um valor similar de outro tipo numérico; ou confirma, em tempo de compilação, que o tipo de uma expressão é `boolean`; ou verifica, em tempo de execução, que um valor de referência se refere a um objeto cuja classe é compatível com um tipo de referência especificado ou lista de tipos de referência, ou que incorpora um valor de um tipo primitivo.

CastExpression:

`(` [PrimitiveType](<#/doc/jls/jls-04>) `)` [UnaryExpression](<#/doc/jls/jls-15>)   
`(` [ReferenceType](<#/doc/jls/jls-04>) {[AdditionalBound](<#/doc/jls/jls-04>)} `)` [UnaryExpressionNotPlusMinus](<#/doc/jls/jls-15>)   
`(` [ReferenceType](<#/doc/jls/jls-04>) {[AdditionalBound](<#/doc/jls/jls-04>)} `)` [LambdaExpression](<#/doc/jls/jls-15>)   


A seguinte produção de [§4.4](<#/doc/jls/jls-04>) é mostrada aqui para conveniência:

AdditionalBound:

`&` [InterfaceType](<#/doc/jls/jls-04>)

Os parênteses e o tipo ou lista de tipos que eles contêm são por vezes chamados de _operador de conversão (cast)_.

Se o operador de conversão (cast) contiver uma lista de tipos, ou seja, um _ReferenceType_ seguido por um ou mais termos _AdditionalBound_, então tudo o que se segue deve ser verdadeiro, ou ocorrerá um erro em tempo de compilação:

  * _ReferenceType_ deve denotar um tipo de classe ou interface.

  * As eliminações de tipo (erasures) ([§4.6](<#/doc/jls/jls-04>)) de todos os tipos listados devem ser diferentes em pares.

  * Nenhum dos dois tipos listados pode ser subtipo de diferentes parametrizações da mesma interface genérica.

O tipo alvo para o contexto de conversão (casting context) ([§5.5](<#/doc/jls/jls-05>)) introduzido pela expressão de conversão (cast) é o _PrimitiveType_ ou o _ReferenceType_ (se não for seguido por termos _AdditionalBound_) que aparece no operador de conversão (cast), ou o tipo de interseção denotado pelos termos _ReferenceType_ e _AdditionalBound_ que aparecem no operador de conversão (cast).

O tipo de uma expressão de conversão (cast) é o resultado da aplicação da conversão de captura (capture conversion) ([§5.1.10](<#/doc/jls/jls-05>)) a este tipo alvo.

As conversões (casts) podem ser usadas para "marcar" explicitamente uma expressão lambda ou uma expressão de referência de método com um tipo alvo particular. Para fornecer um grau apropriado de flexibilidade, o tipo alvo pode ser uma lista de tipos denotando um tipo de interseção, desde que a interseção induza uma interface funcional (functional interface) ([§9.8](<#/doc/jls/jls-09>)).

O resultado de uma expressão de conversão (cast) não é uma variável, mas um valor, mesmo que o resultado da avaliação da expressão operando seja uma variável.

Se o tipo em tempo de compilação do operando não puder ser convertido por conversão de casting ([§5.5](<#/doc/jls/jls-05>)) para o tipo alvo especificado pelo operador de conversão (cast), então ocorrerá um erro em tempo de compilação.

Caso contrário, em tempo de execução, o valor do operando é convertido (se necessário) por conversão de casting para o tipo alvo especificado pelo operador de conversão (cast).

Uma `ClassCastException` é lançada se uma conversão (cast) for considerada impermissível em tempo de execução.

Algumas conversões (casts) resultam em erro em tempo de compilação. Algumas conversões (casts) podem ser provadas, em tempo de compilação, como sempre corretas em tempo de execução. Por exemplo, é sempre correto converter um valor de um tipo de classe para o tipo de sua superclasse; tal conversão (cast) não deve exigir nenhuma ação especial em tempo de execução. Finalmente, algumas conversões (casts) não podem ser provadas como sempre corretas ou sempre incorretas em tempo de compilação. Tais conversões (casts) exigem um teste em tempo de execução. Veja [§5.5](<#/doc/jls/jls-05>) para detalhes.

## 15.17. Operadores Multiplicativos

Os operadores `*`, `/` e `%` são chamados de _operadores multiplicativos_.

MultiplicativeExpression:

[UnaryExpression](<#/doc/jls/jls-15>)   
[MultiplicativeExpression](<#/doc/jls/jls-15>) `*` [UnaryExpression](<#/doc/jls/jls-15>)   
[MultiplicativeExpression](<#/doc/jls/jls-15>) `/` [UnaryExpression](<#/doc/jls/jls-15>)   
[MultiplicativeExpression](<#/doc/jls/jls-15>) `%` [UnaryExpression](<#/doc/jls/jls-15>)

Os operadores multiplicativos têm a mesma precedência e são sintaticamente associativos à esquerda (eles agrupam da esquerda para a direita).

O tipo de cada um dos operandos de um operador multiplicativo deve ser um tipo que seja conversível ([§5.1.8](<#/doc/jls/jls-05>)) para um tipo numérico primitivo, ou ocorrerá um erro em tempo de compilação.

A promoção numérica binária é realizada nos operandos ([§5.6](<#/doc/jls/jls-05>)).

Note que a promoção numérica binária pode incluir a conversão de unboxing ([§5.1.8](<#/doc/jls/jls-05>)).

O tipo de uma expressão multiplicativa é o tipo promovido de seus operandos.

Se o tipo promovido for `int` ou `long`, então a aritmética de inteiros é realizada.

Se o tipo promovido for `float` ou `double`, então a aritmética de ponto flutuante é realizada.

### 15.17.1. Operador de Multiplicação `*`

O operador binário `*` realiza a multiplicação, produzindo o produto de seus operandos.

A multiplicação é uma operação comutativa se as expressões dos operandos não tiverem efeitos colaterais.

A multiplicação de inteiros é associativa quando todos os operandos são do mesmo tipo.

A multiplicação de ponto flutuante não é associativa.

Se uma multiplicação de inteiros transbordar (overflow), então o resultado são os bits de baixa ordem do produto matemático, conforme representado em algum formato de complemento de dois suficientemente grande. Como resultado, se ocorrer transbordamento (overflow), o sinal do resultado pode não ser o mesmo que o sinal do produto matemático dos dois valores dos operandos.

O resultado de uma multiplicação de ponto flutuante é determinado pelas regras da aritmética IEEE 754:

  * Se qualquer operando for NaN, o resultado é NaN.

  * Se o resultado não for NaN, o sinal do resultado é positivo se ambos os operandos tiverem o mesmo sinal, e negativo se os operandos tiverem sinais diferentes.

  * A multiplicação de um infinito por zero resulta em NaN.

  * A multiplicação de um infinito por um valor finito resulta em um infinito com sinal. O sinal é determinado pela regra acima.

  * Nos casos restantes, onde nem um infinito nem NaN estão envolvidos, o produto matemático exato é calculado.

Se a magnitude do produto for muito grande para ser representada, dizemos que a operação transborda (overflows); o resultado é então um infinito com sinal apropriado.

Caso contrário, o produto é arredondado para o valor representável mais próximo usando a política de arredondamento para o mais próximo ([§15.4](<#/doc/jls/jls-15>)). A linguagem de programação Java requer suporte para underflow gradual, conforme definido pelo IEEE 754.

Apesar do fato de que transbordamento (overflow), underflow ou perda de informação podem ocorrer, a avaliação de um operador de multiplicação `*` nunca lança uma exceção em tempo de execução.

### 15.17.2. Operador de Divisão `/`

O operador binário `/` realiza a divisão, produzindo o quociente de seus operandos. O operando da esquerda é o _dividendo_ e o operando da direita é o _divisor_.

A divisão de inteiros arredonda em direção a `0`. Ou seja, o quociente produzido para os operandos _n_ e _d_ que são inteiros após a promoção numérica binária ([§5.6](<#/doc/jls/jls-05>)) é um valor inteiro _q_ cuja magnitude é a maior possível, satisfazendo |_d_ ⋅ _q_ | ≤ |_n_ |. Além disso, _q_ é positivo quando |_n_ | ≥ |_d_ | e _n_ e _d_ têm o mesmo sinal, mas _q_ é negativo quando |_n_ | ≥ |_d_ | e _n_ e _d_ têm sinais opostos.

Existe um caso especial que não satisfaz esta regra: se o dividendo for o inteiro negativo de maior magnitude possível para seu tipo, e o divisor for `-1`, então ocorre um transbordamento de inteiro (integer overflow) e o resultado é igual ao dividendo. Apesar do transbordamento (overflow), nenhuma exceção é lançada neste caso. Por outro lado, se o valor do divisor em uma divisão de inteiros for `0`, então uma `ArithmeticException` é lançada.

O resultado de uma divisão de ponto flutuante é determinado pelas regras da aritmética IEEE 754:

  * Se qualquer operando for NaN, o resultado é NaN.

  * Se o resultado não for NaN, o sinal do resultado é positivo se ambos os operandos tiverem o mesmo sinal, e negativo se os operandos tiverem sinais diferentes.

  * A divisão de um infinito por um infinito resulta em NaN.

  * A divisão de um infinito por um valor finito resulta em um infinito com sinal. O sinal é determinado pela regra acima.

  * A divisão de um valor finito por um infinito resulta em um zero com sinal. O sinal é determinado pela regra acima.

  * A divisão de zero por zero resulta em NaN; a divisão de zero por qualquer outro valor finito resulta em um zero com sinal. O sinal é determinado pela regra acima.

  * A divisão de um valor finito não zero por zero resulta em um infinito com sinal. O sinal é determinado pela regra acima.

  * Nos casos restantes, onde nem um infinito nem NaN estão envolvidos, o quociente matemático exato é calculado.

Se a magnitude do quociente for muito grande para ser representada, dizemos que a operação transborda (overflows); o resultado é então um infinito com sinal apropriado.

Caso contrário, o quociente é arredondado para o valor representável mais próximo usando a política de arredondamento para o mais próximo ([§15.4](<#/doc/jls/jls-15>)). A linguagem de programação Java requer suporte para underflow gradual, conforme definido pelo IEEE 754.

Apesar do fato de que transbordamento (overflow), underflow, divisão por zero ou perda de informação podem ocorrer, a avaliação de um operador de divisão de ponto flutuante `/` nunca lança uma exceção em tempo de execução.

### 15.17.3. Operador de Resto `%`

O operador binário `%` é dito produzir o resto de seus operandos a partir de uma divisão implícita; o operando da esquerda é o _dividendo_ e o operando da direita é o _divisor_.

Em C e C++, o operador de resto aceita apenas operandos inteiros, mas na linguagem de programação Java, ele também aceita operandos de ponto flutuante.

A operação de resto para operandos que são inteiros após a promoção numérica binária ([§5.6](<#/doc/jls/jls-05>)) produz um valor de resultado tal que `(a/b)*b+(a%b)` é igual a `a`.

Esta identidade se mantém mesmo no caso especial em que o dividendo é o inteiro negativo de maior magnitude possível para seu tipo e o divisor é `-1` (o resto é `0`).

Segue-se desta regra que o resultado da operação de resto pode ser negativo apenas se o dividendo for negativo, e pode ser positivo apenas se o dividendo for positivo. Além disso, a magnitude do resultado é sempre menor que a magnitude do divisor.

Se o valor do divisor para um operador de resto inteiro for `0`, então uma `ArithmeticException` é lançada.

**Exemplo 15.17.3-1. Operador de Resto Inteiro**
```java
    class Test1 {
        public static void main(String[] args) {
            int a = 5%3;  // 2
            int b = 5/3;  // 1
            System.out.println("5%3 produces " + a +
                               " (note that 5/3 produces " + b + ")");
    
            int c = 5%(-3);  // 2
            int d = 5/(-3);  // -1
            System.out.println("5%(-3) produces " + c +
                               " (note that 5/(-3) produces " + d + ")");
    
            int e = (-5)%3;  // -2
            int f = (-5)/3;  // -1
            System.out.println("(-5)%3 produces " + e +
                               " (note that (-5)/3 produces " + f + ")");
    
            int g = (-5)%(-3);  // -2
            int h = (-5)/(-3);  // 1
            System.out.println("(-5)%(-3) produces " + g +
                               " (note that (-5)/(-3) produces " + h + ")");
        }
    }
    
```

Este programa produz a saída:
```
    5%3 produces 2 (note that 5/3 produces 1)
    5%(-3) produces 2 (note that 5/(-3) produces -1)
    (-5)%3 produces -2 (note that (-5)/3 produces -1)
    (-5)%(-3) produces -2 (note that (-5)/(-3) produces 1)
    
```

O resultado de uma operação de resto de ponto flutuante, conforme calculado pelo operador `%`, _não_ é o mesmo que o calculado pela operação de resto no IEEE 754, devido à escolha da política de arredondamento na linguagem de programação Java ([§15.4](<#/doc/jls/jls-15>)). A operação de resto IEEE 754 calcula o resto a partir de uma divisão com arredondamento, não uma divisão com truncamento, e, portanto, seu comportamento _não_ é análogo ao do operador de resto inteiro usual. Em vez disso, a linguagem de programação Java define `%` em operandos de ponto flutuante para se comportar de maneira análoga à do operador de resto inteiro, com uma divisão implícita usando a política de arredondamento em direção a zero; isso pode ser comparado com a função de biblioteca C `fmod`. A operação de resto IEEE 754 pode ser calculada pela rotina de biblioteca `Math.IEEEremainder` ou `StrictMath.IEEEremainder`.

O resultado de uma operação de resto de ponto flutuante é determinado pelas seguintes regras, que correspondem à aritmética IEEE 754, exceto pela forma como a divisão implícita é calculada:

  * Se qualquer operando for NaN, o resultado é NaN.

  * Se o resultado não for NaN, o sinal do resultado é igual ao sinal do dividendo.

  * Se o dividendo for um infinito, ou o divisor for zero, ou ambos, o resultado é NaN.

  * Se o dividendo for finito e o divisor for um infinito, o resultado é igual ao dividendo.

  * Se o dividendo for zero e o divisor for finito, o resultado é igual ao dividendo.

  * Nos casos restantes, onde nem um infinito, nem um zero, nem NaN estão envolvidos, o resto de ponto flutuante _r_ da divisão de um dividendo _n_ por um divisor _d_ é definido pela relação matemática _r_ = _n_ \- (_d_ ⋅ _q_) onde _q_ é um inteiro que é negativo apenas se _n_ /_d_ for negativo e positivo apenas se _n_ /_d_ for positivo, e cuja magnitude é a maior possível sem exceder a magnitude do verdadeiro quociente matemático de _n_ e _d_.

A avaliação de um operador de resto de ponto flutuante `%` nunca lança uma exceção em tempo de execução, mesmo que o operando da direita seja zero. Transbordamento (overflow), underflow ou perda de precisão não podem ocorrer.

**Exemplo 15.17.3-2. Operador de Resto de Ponto Flutuante**
```java
    class Test2 {
        public static void main(String[] args) {
            double a = 5.0%3.0;  // 2.0
            System.out.println("5.0%3.0 produces " + a);
    
            double b = 5.0%(-3.0);  // 2.0
            System.out.println("5.0%(-3.0) produces " + b);
    
            double c = (-5.0)%3.0;  // -2.0
            System.out.println("(-5.0)%3.0 produces " + c);
    
            double d = (-5.0)%(-3.0);  // -2.0
            System.out.println("(-5.0)%(-3.0) produces " + d);
        }
    }
    
```

Este programa produz a saída:
```
    5.0%3.0 produces 2.0
    5.0%(-3.0) produces 2.0
    (-5.0)%3.0 produces -2.0
    (-5.0)%(-3.0) produces -2.0
    
```

## 15.18. Operadores Aditivos

Os operadores `+` e `-` são chamados de _operadores aditivos_.

AdditiveExpression:

[MultiplicativeExpression](<#/doc/jls/jls-15>)   
[AdditiveExpression](<#/doc/jls/jls-15>) `+` [MultiplicativeExpression](<#/doc/jls/jls-15>)   
[AdditiveExpression](<#/doc/jls/jls-15>) `-` [MultiplicativeExpression](<#/doc/jls/jls-15>)

Os operadores aditivos têm a mesma precedência e são sintaticamente associativos à esquerda (eles agrupam da esquerda para a direita).

Se o tipo de qualquer operando de um operador `+` for `String`, então a operação é concatenação de strings.

Caso contrário, o tipo de cada um dos operandos do operador `+` deve ser um tipo que seja conversível ([§5.1.8](<#/doc/jls/jls-05>)) para um tipo numérico primitivo, ou ocorrerá um erro em tempo de compilação.

Em todos os casos, o tipo de cada um dos operandos do operador binário `-` deve ser um tipo que seja conversível ([§5.1.8](<#/doc/jls/jls-05>)) para um tipo numérico primitivo, ou ocorrerá um erro em tempo de compilação.

### 15.18.1. Operador de Concatenação de Strings `+`

Se apenas uma expressão operando for do tipo `String`, então a conversão de string ([§5.1.11](<#/doc/jls/jls-05>)) é realizada no outro operando para produzir uma string em tempo de execução.

O resultado da concatenação de strings é uma referência a um objeto `String` que é a concatenação das duas strings operandos. Os caracteres do operando da esquerda precedem os caracteres do operando da direita na string recém-criada.

O objeto `String` é recém-criado ([§12.5](<#/doc/jls/jls-12>)) a menos que a expressão seja uma expressão constante ([§15.29](<#/doc/jls/jls-15>)).

Uma implementação pode optar por realizar a conversão e concatenação em uma única etapa para evitar a criação e descarte de um objeto `String` intermediário. Para aumentar o desempenho de concatenações de strings repetidas, um compilador Java pode usar a classe `StringBuffer` ou uma técnica similar para reduzir o número de objetos `String` intermediários que são criados pela avaliação de uma expressão.

Para tipos primitivos, uma implementação também pode otimizar a criação de um objeto wrapper, convertendo diretamente de um tipo primitivo para uma string.

**Exemplo 15.18.1-1. Concatenação de Strings**

A expressão de exemplo:
```
    "The square root of 2 is " + Math.sqrt(2)
    
```

produz o resultado:
```
    "The square root of 2 is 1.4142135623730952"
    
```

O operador `+` é sintaticamente associativo à esquerda, independentemente de ser determinado pela análise de tipo para representar concatenação de strings ou adição numérica. Em alguns casos, é necessário cuidado para obter o resultado desejado. Por exemplo, a expressão:
```
    a + b + c
    
```

é sempre considerada como significando:
```
    (a + b) + c
    
```

Portanto, o resultado da expressão:
```
    1 + 2 + " fiddlers"
    
```

é:
```
    "3 fiddlers"
    
```

mas o resultado de:
```
    "fiddlers " + 1 + 2
    
```

é:
```
    "fiddlers 12"
    
```

**Exemplo 15.18.1-2. Concatenação de Strings e Condicionais**

Neste pequeno exemplo divertido:
```java
    class Bottles {
        static void printSong(Object stuff, int n) {
            String plural = (n == 1) ? "" : "s";
      loop: while (true) {
                System.out.println(n + " bottle" + plural
                        + " of " + stuff + " on the wall,");
                System.out.println(n + " bottle" + plural
                        + " of " + stuff + ";");
                System.out.println("You take one down "
                        + "and pass it around:");
                --n;
                plural = (n == 1) ? "" : "s";
                if (n == 0)
                    break loop;
                System.out.println(n + " bottle" + plural
                        + " of " + stuff + " on the wall!");
                System.out.println();
            }
            System.out.println("No bottles of " +
                        stuff + " on the wall!");
        }
    
        public static void main(String[] args) {
            printSong("slime", 3);
        }
    }
    
```

o método `printSong` imprimirá uma versão de uma canção infantil. Valores populares para `stuff` incluem "`pop`" e "`beer`"; o valor mais popular para `n` é `100`. Aqui está a saída resultante da execução do programa:
```
    3 bottles of slime on the wall,
    3 bottles of slime;
    You take one down and pass it around:
    2 bottles of slime on the wall!
    
    2 bottles of slime on the wall,
    2 bottles of slime;
    You take one down and pass it around:
    1 bottle of slime on the wall!
    
    1 bottle of slime on the wall,
    1 bottle of slime;
    You take one down and pass it around:
    No bottles of slime on the wall!
    
```

No código, observe a cuidadosa geração condicional do singular "`bottle`" quando apropriado, em vez do plural "`bottles`"; observe também como o operador de concatenação de strings foi usado para quebrar a longa string constante:
```
    "You take one down and pass it around:"
    
```

em duas partes para evitar uma linha inconvenientemente longa no código-fonte.

### 15.18.2. Operadores Aditivos (`+` e `-`) para Tipos Numéricos

O operador binário `+` realiza a adição quando aplicado a dois operandos de tipo numérico, produzindo a soma dos operandos.

O operador binário `-` realiza a subtração, produzindo a diferença de dois operandos numéricos.

A promoção numérica binária é realizada nos operandos ([§5.6](<#/doc/jls/jls-05>)).

Note que a promoção numérica binária pode incluir a conversão de unboxing ([§5.1.8](<#/doc/jls/jls-05>)).

O tipo de uma expressão aditiva em operandos numéricos é o tipo promovido de seus operandos.

Se este tipo promovido for `int` ou `long`, então a aritmética de inteiros é realizada.

Se este tipo promovido for `float` ou `double`, então a aritmética de ponto flutuante é realizada.

A adição é uma operação comutativa se as expressões dos operandos não tiverem efeitos colaterais.

A adição de inteiros é associativa quando todos os operandos são do mesmo tipo.

A adição de ponto flutuante não é associativa.

Se uma adição de inteiros transbordar (overflow), então o resultado são os bits de baixa ordem da soma matemática, conforme representado em algum formato de complemento de dois suficientemente grande. Se ocorrer transbordamento (overflow), o sinal do resultado não é o mesmo que o sinal da soma matemática dos dois valores dos operandos.

O resultado de uma adição de ponto flutuante é determinado pelas regras da aritmética IEEE 754:

  * Se qualquer operando for NaN, o resultado é NaN.

  * A soma de dois infinitos de sinais opostos é NaN.

  * A soma de dois infinitos do mesmo sinal é o infinito desse sinal.

  * A soma de um infinito e um valor finito é igual ao operando infinito.

  * A soma de dois zeros de sinais opostos é zero positivo.

  * A soma de dois zeros do mesmo sinal é o zero desse sinal.

  * A soma de um zero e um valor finito não zero é igual ao operando não zero.

  * A soma de dois valores finitos não zero da mesma magnitude e sinais opostos é zero positivo.

  * Nos casos restantes, onde nem um infinito, nem um zero, nem NaN estão envolvidos, e os operandos têm o mesmo sinal ou têm magnitudes diferentes, a soma matemática exata é calculada.

Se a magnitude da soma for muito grande para ser representada, dizemos que a operação transborda (overflows); o resultado é então um infinito com sinal apropriado.

Caso contrário, a soma é arredondada para o valor representável mais próximo usando a política de arredondamento para o mais próximo ([§15.4](<#/doc/jls/jls-15>)). A linguagem de programação Java requer suporte para underflow gradual.

O operador binário `-` realiza a subtração quando aplicado a dois operandos de tipo numérico, produzindo a diferença de seus operandos; o operando da esquerda é o _minuendo_ e o operando da direita é o _subtraendo_.

Tanto para subtração de inteiros quanto de ponto flutuante, é sempre o caso que `a-b` produz o mesmo resultado que `a+(-b)`.

Note que, para valores inteiros, a subtração de zero é o mesmo que a negação. No entanto, para operandos de ponto flutuante, a subtração de zero _não_ é o mesmo que a negação, porque se x for `+0.0`, então `0.0-x` é `+0.0`, mas `-x` é `-0.0`.

Apesar do fato de que transbordamento (overflow), underflow ou perda de informação podem ocorrer, a avaliação de um operador aditivo numérico nunca lança uma exceção em tempo de execução.
## 15.19. Operadores de Deslocamento

Os operadores `<<` (deslocamento à esquerda), `>>` (deslocamento à direita com sinal) e `>>>` (deslocamento à direita sem sinal) são chamados de _operadores de deslocamento_. O operando da esquerda de um operador de deslocamento é o valor a ser deslocado; o operando da direita especifica a distância do deslocamento.

ShiftExpression:

[AdditiveExpression](<#/doc/jls/jls-15>)   
[ShiftExpression](<#/doc/jls/jls-15>) `<<` [AdditiveExpression](<#/doc/jls/jls-15>)   
[ShiftExpression](<#/doc/jls/jls-15>) `>>` [AdditiveExpression](<#/doc/jls/jls-15>)   
[ShiftExpression](<#/doc/jls/jls-15>) `>>>` [AdditiveExpression](<#/doc/jls/jls-15>)

Os operadores de deslocamento são sintaticamente associativos à esquerda (eles agrupam da esquerda para a direita).

A promoção numérica unária ([§5.6](<#/doc/jls/jls-05>)) é realizada em cada operando separadamente. (A promoção numérica binária _não_ é realizada nos operandos.)

É um erro em tempo de compilação se o tipo de cada um dos operandos de um operador de deslocamento, após a promoção numérica unária, não for um tipo integral primitivo.

O tipo da expressão de deslocamento é o tipo promovido do operando da esquerda.

Se o tipo promovido do operando da esquerda for `int`, então apenas os cinco bits de ordem mais baixa do operando da direita são usados como distância de deslocamento. É como se o operando da direita fosse submetido a um operador AND lógico bit a bit `&` ([§15.22.1](<#/doc/jls/jls-15>)) com o valor de máscara `0x1f` (`0b11111`). A distância de deslocamento realmente usada está, portanto, sempre no intervalo de `0` a `31`, inclusive.

Se o tipo promovido do operando da esquerda for `long`, então apenas os seis bits de ordem mais baixa do operando da direita são usados como distância de deslocamento. É como se o operando da direita fosse submetido a um operador AND lógico bit a bit `&` ([§15.22.1](<#/doc/jls/jls-15>)) com o valor de máscara `0x3f` (`0b111111`). A distância de deslocamento realmente usada está, portanto, sempre no intervalo de `0` a `63`, inclusive.

Em tempo de execução, as operações de deslocamento são realizadas na representação inteira em complemento de dois do valor do operando esquerdo.

O valor de _n_ `<<` _s_ é _n_ deslocado _s_ posições de bit para a esquerda; isso é equivalente (mesmo que ocorra overflow) à multiplicação por dois elevado à potência _s_.

O valor de _n_ `>>` _s_ é _n_ deslocado _s_ posições de bit para a direita com extensão de sinal. O valor resultante é _floor_(_n_ `/` 2 _s_). Para valores não negativos de _n_, isso é equivalente à divisão inteira truncada, conforme calculada pelo operador de divisão inteira `/`, por dois elevado à potência _s_.

O valor de _n_ `>>>` _s_ é _n_ deslocado _s_ posições de bit para a direita com extensão de zero, onde:

  * Se _n_ for positivo, então o resultado é o mesmo que o de _n_ `>>` _s_.

  * Se _n_ for negativo e o tipo do operando da esquerda for `int`, então o resultado é igual ao da expressão `(`_n_ `>>` _s_`)` `+` `(`2` `<<` `~`_s_`)`.

  * Se _n_ for negativo e o tipo do operando da esquerda for `long`, então o resultado é igual ao da expressão `(`_n_ `>>` _s_`)` `+` `(`2L` `<<` `~`_s_`)`.

O termo adicionado `(`2` `<<` `~`_s_`)` ou `(`2L` `<<` `~`_s_`)` cancela o bit de sinal propagado.

Note que, devido ao mascaramento implícito do operando da direita de um operador de deslocamento, `~`_s_ como distância de deslocamento é equivalente a `31-`_s_ ao deslocar um valor `int` e a `63-`_s_ ao deslocar um valor `long`.

## 15.20. Operadores Relacionais

Os operadores de comparação numérica `<`, `>`, `<=`, e `>=`, e o operador `instanceof`, são chamados de _operadores relacionais_.

RelationalExpression:

[ShiftExpression](<#/doc/jls/jls-15>)   
[RelationalExpression](<#/doc/jls/jls-15>) `<` [ShiftExpression](<#/doc/jls/jls-15>)   
[RelationalExpression](<#/doc/jls/jls-15>) `>` [ShiftExpression](<#/doc/jls/jls-15>)   
[RelationalExpression](<#/doc/jls/jls-15>) `<=` [ShiftExpression](<#/doc/jls/jls-15>)   
[RelationalExpression](<#/doc/jls/jls-15>) `>=` [ShiftExpression](<#/doc/jls/jls-15>)   
[InstanceofExpression](<#/doc/jls/jls-15>)

Os operadores relacionais são sintaticamente associativos à esquerda (eles agrupam da esquerda para a direita).

No entanto, este fato não é útil. Por exemplo, `a<b<c` é interpretado como `(a<b)<c`, o que é sempre um erro em tempo de compilação, porque o tipo de `a<b` é sempre `boolean` e < não é um operador para valores `boolean`.

O tipo de uma expressão relacional é sempre `boolean`.

### 15.20.1. Operadores de Comparação Numérica `<`, `<=`, `>`, e `>=`

O tipo de cada um dos operandos de um operador de comparação numérica deve ser um tipo que seja conversível ([§5.1.8](<#/doc/jls/jls-05>)) para um tipo numérico primitivo, ou ocorre um erro em tempo de compilação.

A promoção numérica binária é realizada nos operandos ([§5.6](<#/doc/jls/jls-05>)).

Note que a promoção numérica binária pode incluir a conversão de unboxing ([§5.1.8](<#/doc/jls/jls-05>)).

Se o tipo promovido dos operandos for `int` ou `long`, então a comparação de inteiros com sinal é realizada.

Se o tipo promovido for `float` ou `double`, então a comparação de ponto flutuante é realizada.

O resultado de uma comparação de ponto flutuante, conforme determinado pela especificação do padrão IEEE 754, é:

  * Se qualquer um dos operandos for NaN, então o resultado é false.

  * Todos os valores, exceto NaN, são ordenados, com o infinito negativo menor que todos os valores finitos, e o infinito positivo maior que todos os valores finitos.

  * Zero positivo e zero negativo são considerados iguais.

Por exemplo, `-0.0<0.0` é `false`, mas `-0.0<=0.0` é `true`.

Note, no entanto, que os métodos `Math.min` e `Math.max` tratam o zero negativo como sendo estritamente menor que o zero positivo.

Sujeito a estas considerações para números de ponto flutuante, as seguintes regras se aplicam para operandos inteiros ou para operandos de ponto flutuante diferentes de NaN:

  * O valor produzido pelo operador `<` é `true` se o valor do operando da esquerda for menor que o valor do operando da direita, e `false` caso contrário.

  * O valor produzido pelo operador `<=` é `true` se o valor do operando da esquerda for menor ou igual ao valor do operando da direita, e `false` caso contrário.

  * O valor produzido pelo operador `>` é `true` se o valor do operando da esquerda for maior que o valor do operando da direita, e `false` caso contrário.

  * O valor produzido pelo operador `>=` é `true` se o valor do operando da esquerda for maior ou igual ao valor do operando da direita, e `false` caso contrário.

### 15.20.2. O Operador `instanceof`

Uma expressão `instanceof` pode realizar comparação de tipo ou pattern matching.

InstanceofExpression:

[RelationalExpression](<#/doc/jls/jls-15>) `instanceof` [ReferenceType](<#/doc/jls/jls-04>)   
[RelationalExpression](<#/doc/jls/jls-15>) `instanceof` [Pattern](<#/doc/jls/jls-14>)

Se o operando à direita da palavra-chave `instanceof` for um _ReferenceType_, então a palavra-chave `instanceof` é o _operador de comparação de tipo_.

Se o operando à direita da palavra-chave `instanceof` for um _Pattern_, então a palavra-chave `instanceof` é o _operador de pattern matching_.

As seguintes regras se aplicam quando `instanceof` é o operador de comparação de tipo:

  * O tipo da expressão _RelationalExpression_ deve ser um tipo de referência ou o tipo null, ou ocorre um erro em tempo de compilação.

  * O _RelationalExpression_ deve ser compatível com o cast verificado com o _ReferenceType_ ([§5.5](<#/doc/jls/jls-05>)), ou ocorre um erro em tempo de compilação.

  * Em tempo de execução, o resultado do operador de comparação de tipo é determinado da seguinte forma:

    * Se o valor do _RelationalExpression_ for a null reference ([§4.1](<#/doc/jls/jls-04>)), então o resultado é `false`.

    * Se o valor do _RelationalExpression_ não for a null reference, então o resultado é `true` se o valor puder ser convertido para o _ReferenceType_ sem levantar uma `ClassCastException`, e `false` caso contrário.

As seguintes regras se aplicam quando `instanceof` é o operador de pattern matching:

  * O tipo da expressão _RelationalExpression_ deve ser um tipo de referência ou o tipo null, ou ocorre um erro em tempo de compilação.

  * O _Pattern_ deve ser aplicável ao tipo da expressão _RelationalExpression_ ([§14.30.3](<#/doc/jls/jls-14>)), ou ocorre um erro em tempo de compilação.

  * Em tempo de execução, o resultado do operador de pattern matching é determinado da seguinte forma:

    * Se o valor do _RelationalExpression_ for a null reference, então o resultado é `false`.

    * Se o valor do _RelationalExpression_ não for a null reference, então o resultado é `true` se o valor corresponder ao _Pattern_ ([§14.30.2](<#/doc/jls/jls-14>)), e `false` caso contrário.

Um efeito colateral de um resultado `true` é que todas as pattern variables declaradas em _Pattern_, se houver, serão inicializadas.

**Exemplo 15.20.2-1. O Operador de Comparação de Tipo**
```java
    class Point   { int x, y; }
    class Element { int atomicNumber; }
    class Test {
        public static void main(String[] args) {
            Point   p = new Point();
            Element e = new Element();
            if (e instanceof Point) {  // compile-time error
                System.out.println("I get your point!");
                p = (Point)e;  // compile-time error
            }
        }
    }
```

Este programa resulta em dois erros em tempo de compilação. O cast `(Point)e` está incorreto porque nenhuma instância de `Element` ou de qualquer uma de suas possíveis subclasses (nenhuma é mostrada aqui) poderia ser uma instância de qualquer subclasse de `Point`. A expressão `instanceof` está incorreta exatamente pela mesma razão. Se, por outro lado, a classe `Point` fosse uma subclasse de `Element` (uma noção admitidamente estranha neste exemplo):
```java
    
    class Point extends Element { int x, y; }
    
    
```

então o cast seria possível, embora exigisse uma verificação em tempo de execução, e a expressão `instanceof` seria então sensata e válida. O cast `(Point)e` nunca levantaria uma exceção porque não seria executado se o valor de `e` não pudesse ser corretamente convertido para o tipo `Point`.

Antes do Java SE 16, o operando _ReferenceType_ de um operador de comparação de tipo era exigido ser reifiable ([§4.7](<#/doc/jls/jls-04>)). Isso impedia o uso de um parameterized type a menos que todos os seus type arguments fossem wildcards. O requisito foi removido no Java SE 16 para permitir que mais parameterized types fossem usados. Por exemplo, no programa a seguir, é legal testar se o parâmetro de método `x`, com static type `List<Integer>`, tem um parameterized type mais "refinado" `ArrayList<Integer>` em tempo de execução:
```java
    import java.util.ArrayList;
    import java.util.List;
    
    class Test2 {
        public static void main(String[] args) {
            List<Integer> x = new ArrayList<Integer>();
    
            if (x instanceof ArrayList<Integer>) {  // OK
                System.out.println("ArrayList of Integers");
            }
            if (x instanceof ArrayList<String>) {  // error
                System.out.println("ArrayList of Strings");
            }
            if (x instanceof ArrayList<Object>) {  // error
                System.out.println("ArrayList of Objects");
            }
        }
    }
    
    
```

A primeira expressão `instanceof` é legal porque há uma casting conversion de `List<Integer>` para `ArrayList<Integer>`. No entanto, a segunda e a terceira expressões `instanceof` causam um erro em tempo de compilação porque não há casting conversion de `List<Integer>` para `ArrayList<String>` ou `ArrayList<Object>`.

## 15.21. Operadores de Igualdade

Os operadores `==` (igual a) e `!=` (diferente de) são chamados de _operadores de igualdade_.

EqualityExpression:

[RelationalExpression](<#/doc/jls/jls-15>)   
[EqualityExpression](<#/doc/jls/jls-15>) `==` [RelationalExpression](<#/doc/jls/jls-15>)   
[EqualityExpression](<#/doc/jls/jls-15>) `!=` [RelationalExpression](<#/doc/jls/jls-15>)

Os operadores de igualdade são sintaticamente associativos à esquerda (eles agrupam da esquerda para a direita).

No entanto, este fato é essencialmente nunca útil. Por exemplo, `a==b==c` é interpretado como `(a==b)==c`. O tipo de resultado de `a==b` é sempre `boolean`, e `c` deve, portanto, ser do tipo `boolean` ou ocorre um erro em tempo de compilação. Assim, `a==b==c` não testa se `a`, `b` e `c` são todos iguais.

Os operadores de igualdade são comutativos se as expressões dos operandos não tiverem side effects.

Os operadores de igualdade são análogos aos operadores relacionais, exceto por sua menor precedence. Assim, `a<b==c<d` é `true` sempre que `a<b` e `c<d` tiverem o mesmo truth value.

Os operadores de igualdade podem ser usados para comparar dois operandos que são conversíveis ([§5.1.8](<#/doc/jls/jls-05>)) para tipo numérico, ou dois operandos do tipo `boolean` ou `Boolean`, ou dois operandos que são cada um de tipo de referência ou do tipo null. Todos os outros casos resultam em um erro em tempo de compilação.

O tipo de uma expressão de igualdade é sempre `boolean`.

Em todos os casos, `a!=b` produz o mesmo resultado que `!(a==b)`.

### 15.21.1. Operadores de Igualdade Numérica `==` e `!=`

Se os operandos de um operador de igualdade forem ambos de tipo numérico, ou um for de tipo numérico e o outro for conversível ([§5.1.8](<#/doc/jls/jls-05>)) para tipo numérico, a promoção numérica binária é realizada nos operandos ([§5.6](<#/doc/jls/jls-05>)).

Note que a promoção numérica binária pode incluir a conversão de unboxing ([§5.1.8](<#/doc/jls/jls-05>)).

Se o tipo promovido dos operandos for `int` ou `long`, então um teste de igualdade de inteiros é realizado.

Se o tipo promovido for `float` ou `double`, então um teste de igualdade de ponto flutuante é realizado.

O teste de igualdade de ponto flutuante é realizado de acordo com as regras do padrão IEEE 754:

  * Se qualquer um dos operandos for NaN, então o resultado de `==` é `false`, mas o resultado de `!=` é `true`.

De fato, o teste `x!=x` é `true` se e somente se o valor de `x` for NaN.

Os métodos `Float.isNaN` e `Double.isNaN` também podem ser usados para testar se um valor é NaN.

  * Zero positivo e zero negativo são considerados iguais.

Por exemplo, `-0.0==0.0` é `true`.

  * Caso contrário, dois valores de ponto flutuante distintos são considerados desiguais pelos operadores de igualdade.

Em particular, existe um valor representando o infinito positivo e um valor representando o infinito negativo; cada um se compara igual apenas a si mesmo, e cada um se compara desigual a todos os outros valores.

Sujeito a estas considerações para números de ponto flutuante, as seguintes regras se aplicam para operandos inteiros ou para operandos de ponto flutuante diferentes de NaN:

  * O valor produzido pelo operador `==` é `true` se o valor do operando da esquerda for igual ao valor do operando da direita; caso contrário, o resultado é `false`.

  * O valor produzido pelo operador `!=` é `true` se o valor do operando da esquerda não for igual ao valor do operando da direita; caso contrário, o resultado é `false`.

### 15.21.2. Operadores de Igualdade Booleanos `==` e `!=`

Se os operandos de um operador de igualdade forem ambos do tipo `boolean`, ou se um operando for do tipo `boolean` e o outro for do tipo `Boolean`, então a operação é de igualdade booleana.

Os operadores de igualdade booleanos são associativos.

Se um dos operandos for do tipo `Boolean`, ele é submetido à unboxing conversion ([§5.1.8](<#/doc/jls/jls-05>)).

O resultado de `==` é `true` se os operandos (após qualquer unboxing conversion necessária) forem ambos `true` ou ambos `false`; caso contrário, o resultado é `false`.

O resultado de `!=` é `false` se os operandos forem ambos `true` ou ambos `false`; caso contrário, o resultado é `true`.

Assim, `!=` se comporta da mesma forma que `^` ([§15.22.2](<#/doc/jls/jls-15>)) quando aplicado a operandos `boolean`.

### 15.21.3. Operadores de Igualdade de Referência `==` e `!=`

Se os operandos de um operador de igualdade forem ambos de tipo de referência ou do tipo null, então a operação é de object equality.

É um erro em tempo de compilação se for impossível converter o tipo de qualquer um dos operandos para o tipo do outro por uma casting conversion ([§5.5](<#/doc/jls/jls-05>)). Os valores em tempo de execução dos dois operandos seriam necessariamente desiguais (ignorando o caso em que ambos os valores são `null`).

Em tempo de execução, o resultado de `==` é `true` se os valores dos operandos forem ambos `null` ou ambos se referirem ao mesmo objeto ou array; caso contrário, o resultado é `false`.

O resultado de `!=` é `false` se os valores dos operandos forem ambos `null` ou ambos se referirem ao mesmo objeto ou array; caso contrário, o resultado é `true`.

Embora `==` possa ser usado para comparar referências do tipo `String`, tal teste de igualdade determina se os dois operandos se referem ou não ao mesmo objeto `String`. O resultado é `false` se os operandos forem objetos `String` distintos, mesmo que contenham a mesma sequence of characters ([§3.10.5](<#/doc/jls/jls-03>), [§3.10.6](<#/doc/jls/jls-03>)). O conteúdo de duas strings `s` e `t` pode ser testado quanto à igualdade pela invocação do método `s.equals(t)`.
## 15.22. Operadores Bit a Bit e Lógicos

Os _operadores bit a bit_ e _operadores lógicos_ incluem o operador AND `&`, o operador OR exclusivo `^` e o operador OR inclusivo `|`.

AndExpression:

[EqualityExpression](<#/doc/jls/jls-15>)
[AndExpression](<#/doc/jls/jls-15>) `&` [EqualityExpression](<#/doc/jls/jls-15>)

ExclusiveOrExpression:

[AndExpression](<#/doc/jls/jls-15>)
[ExclusiveOrExpression](<#/doc/jls/jls-15>) `^` [AndExpression](<#/doc/jls/jls-15>)

InclusiveOrExpression:

[ExclusiveOrExpression](<#/doc/jls/jls-15>)
[InclusiveOrExpression](<#/doc/jls/jls-15>) `|` [ExclusiveOrExpression](<#/doc/jls/jls-15>)

Esses operadores têm precedência diferente, com `&` tendo a maior precedência e `|` a menor precedência.

Cada um desses operadores é sintaticamente associativo à esquerda (cada um agrupa da esquerda para a direita).

Cada operador é comutativo se as expressões dos operandos não tiverem efeitos colaterais.

Cada operador é associativo.

Os operadores bit a bit e lógicos podem ser usados para comparar dois operandos de tipo numérico ou dois operandos do tipo `boolean`. Todos os outros casos resultam em um erro em tempo de compilação.

### 15.22.1. Operadores Bit a Bit Inteiros `&`, `^` e `|`

Quando ambos os operandos de um operador `&`, `^` ou `|` são de um tipo que é conversível ([§5.1.8](<#/doc/jls/jls-05>)) para um tipo integral primitivo, a promoção numérica binária é primeiramente realizada nos operandos ([§5.6](<#/doc/jls/jls-05>)).

O tipo da expressão do operador bit a bit é o tipo promovido dos operandos.

Para `&`, o valor resultante é o AND bit a bit dos valores dos operandos.

Para `^`, o valor resultante é o OR exclusivo bit a bit dos valores dos operandos.

Para `|`, o valor resultante é o OR inclusivo bit a bit dos valores dos operandos.

Por exemplo, o resultado da expressão:
```
    0xff00 & 0xf0f0
```

é:
```
    0xf000
```

O resultado da expressão:
```
    0xff00 ^ 0xf0f0
```

é:
```
    0x0ff0
```

O resultado da expressão:
```
    0xff00 | 0xf0f0
```

é:
```
    0xfff0
```

### 15.22.2. Operadores Lógicos Booleanos `&`, `^` e `|`

Quando ambos os operandos de um operador `&`, `^` ou `|` são do tipo `boolean` ou `Boolean`, então o tipo da expressão do operador bit a bit é `boolean`. Em todos os casos, os operandos estão sujeitos à conversão unboxing ([§5.1.8](<#/doc/jls/jls-05>)) conforme necessário.

Para `&`, o valor resultante é `true` se ambos os valores dos operandos forem `true`; caso contrário, o resultado é `false`.

Para `^`, o valor resultante é `true` se os valores dos operandos forem diferentes; caso contrário, o resultado é `false`.

Para `|`, o valor resultante é `false` se ambos os valores dos operandos forem `false`; caso contrário, o resultado é `true`.

## 15.23. Operador AND Condicional `&&`

O operador AND condicional `&&` é como `&` ([§15.22.2](<#/doc/jls/jls-15>)), mas avalia seu operando da direita somente se o valor de seu operando da esquerda for `true`.

ConditionalAndExpression:

[InclusiveOrExpression](<#/doc/jls/jls-15>)
[ConditionalAndExpression](<#/doc/jls/jls-15>) `&&` [InclusiveOrExpression](<#/doc/jls/jls-15>)

O operador AND condicional é sintaticamente associativo à esquerda (ele agrupa da esquerda para a direita).

O operador AND condicional é totalmente associativo em relação tanto aos efeitos colaterais quanto ao valor resultante. Ou seja, para quaisquer expressões `a`, `b` e `c`, a avaliação da expressão `((`a`) `&&` (`b`)) `&&` (`c`)` produz o mesmo resultado, com os mesmos efeitos colaterais ocorrendo na mesma ordem, que a avaliação da expressão `(`a`) `&&` ((`b`) `&&` (`c`))`.

Cada operando do operador AND condicional deve ser do tipo `boolean` ou `Boolean`, ou ocorre um erro em tempo de compilação.

O tipo de uma expressão AND condicional é sempre `boolean`.

Em tempo de execução, a expressão do operando da esquerda é avaliada primeiro; se o resultado tiver o tipo `Boolean`, ele é submetido à conversão unboxing ([§5.1.8](<#/doc/jls/jls-05>)).

Se o valor resultante for `false`, o valor da expressão AND condicional é `false` e a expressão do operando da direita não é avaliada.

Se o valor do operando da esquerda for `true`, então a expressão da direita é avaliada; se o resultado tiver o tipo `Boolean`, ele é submetido à conversão unboxing ([§5.1.8](<#/doc/jls/jls-05>)). O valor resultante se torna o valor da expressão AND condicional.

Assim, `&&` calcula o mesmo resultado que `&` em operandos `boolean`. Ele difere apenas no fato de que a expressão do operando da direita é avaliada condicionalmente, em vez de sempre.

## 15.24. Operador OR Condicional `||`

O operador OR condicional `||` é como `|` ([§15.22.2](<#/doc/jls/jls-15>)), mas avalia seu operando da direita somente se o valor de seu operando da esquerda for `false`.

ConditionalOrExpression:

[ConditionalAndExpression](<#/doc/jls/jls-15>)
[ConditionalOrExpression](<#/doc/jls/jls-15>) `||` ConditionalAndExpression

O operador OR condicional é sintaticamente associativo à esquerda (ele agrupa da esquerda para a direita).

O operador OR condicional é totalmente associativo em relação tanto aos efeitos colaterais quanto ao valor resultante. Ou seja, para quaisquer expressões `a`, `b` e `c`, a avaliação da expressão `((`a`) `||` (`b`)) `||` (`c`)` produz o mesmo resultado, com os mesmos efeitos colaterais ocorrendo na mesma ordem, que a avaliação da expressão `(`a`) `||` ((`b`) `||` (`c`))`.

Cada operando do operador OR condicional deve ser do tipo `boolean` ou `Boolean`, ou ocorre um erro em tempo de compilação.

O tipo de uma expressão OR condicional é sempre `boolean`.

Em tempo de execução, a expressão do operando da esquerda é avaliada primeiro; se o resultado tiver o tipo `Boolean`, ele é submetido à conversão unboxing ([§5.1.8](<#/doc/jls/jls-05>)).

Se o valor resultante for `true`, o valor da expressão OR condicional é `true` e a expressão do operando da direita não é avaliada.

Se o valor do operando da esquerda for `false`, então a expressão da direita é avaliada; se o resultado tiver o tipo `Boolean`, ele é submetido à conversão unboxing ([§5.1.8](<#/doc/jls/jls-05>)). O valor resultante se torna o valor da expressão OR condicional.

Assim, `||` calcula o mesmo resultado que `|` em operandos `boolean` ou `Boolean`. Ele difere apenas no fato de que a expressão do operando da direita é avaliada condicionalmente, em vez de sempre.

## 15.25. Operador Condicional `? :`

O operador condicional `? :` usa o valor booleano de uma expressão para decidir qual das outras duas expressões deve ser avaliada.

ConditionalExpression:

[ConditionalOrExpression](<#/doc/jls/jls-15>)
[ConditionalOrExpression](<#/doc/jls/jls-15>) `?` [Expression](<#/doc/jls/jls-15>) `:` [ConditionalExpression](<#/doc/jls/jls-15>)
[ConditionalOrExpression](<#/doc/jls/jls-15>) `?` [Expression](<#/doc/jls/jls-15>) `:` [LambdaExpression](<#/doc/jls/jls-15>)

O operador condicional é sintaticamente associativo à direita (ele agrupa da direita para a esquerda). Assim, `a?b:c?d:e?f:g` significa o mesmo que `a?b:(c?d:(e?f:g))`.

O operador condicional tem três expressões de operando. `?` aparece entre a primeira e a segunda expressões, e `:` aparece entre a segunda e a terceira expressões.

A primeira expressão deve ser do tipo `boolean` ou `Boolean`, ou ocorre um erro em tempo de compilação.

É um erro em tempo de compilação para a segunda ou a terceira expressão de operando ser uma invocação de um método `void`.

Na verdade, pela gramática das declarações de expressão ([§14.8](<#/doc/jls/jls-14>)), não é permitido que uma expressão condicional apareça em qualquer contexto onde uma invocação de um método `void` poderia aparecer.

Existem três tipos de expressões condicionais, classificadas de acordo com a segunda e terceira expressões de operando: _expressões condicionais booleanas_, _expressões condicionais numéricas_ e _expressões condicionais de referência_. As regras de classificação são as seguintes:

  * Se ambas as segunda e terceira expressões de operando forem _expressões booleanas_, a expressão condicional é uma expressão condicional booleana.

Para fins de classificação de uma condicional, as seguintes expressões são expressões booleanas:

    * Uma expressão de forma autônoma ([§15.2](<#/doc/jls/jls-15>)) que tem o tipo `boolean` ou `Boolean`.

    * Uma expressão `boolean` entre parênteses ([§15.8.5](<#/doc/jls/jls-15>)).

    * Uma expressão de criação de instância de classe ([§15.9](<#/doc/jls/jls-15>)) para a classe `Boolean`.

    * Uma expressão de invocação de método ([§15.12](<#/doc/jls/jls-15>)) para a qual o método mais específico escolhido ([§15.12.2.5](<#/doc/jls/jls-15>)) tem tipo de retorno `boolean` ou `Boolean`.

Note que, para um método genérico, este é o tipo _antes_ de instanciar os argumentos de tipo do método.

    * Uma expressão condicional `boolean`.

    * Uma expressão `switch` ([§15.28](<#/doc/jls/jls-15>)) cujas expressões de resultado são todas expressões `boolean`.

  * Se ambas as segunda e terceira expressões de operando forem _expressões numéricas_, a expressão condicional é uma expressão condicional numérica.

Para fins de classificação de uma condicional, as seguintes expressões são expressões numéricas:

    * Uma expressão de forma autônoma ([§15.2](<#/doc/jls/jls-15>)) com um tipo que é conversível para um tipo numérico ([§4.2](<#/doc/jls/jls-04>), [§5.1.8](<#/doc/jls/jls-05>)).

    * Uma expressão numérica entre parênteses ([§15.8.5](<#/doc/jls/jls-15>)).

    * Uma expressão de criação de instância de classe ([§15.9](<#/doc/jls/jls-15>)) para uma classe que é conversível para um tipo numérico.

    * Uma expressão de invocação de método ([§15.12](<#/doc/jls/jls-15>)) para a qual o método mais específico escolhido ([§15.12.2.5](<#/doc/jls/jls-15>)) tem um tipo de retorno que é conversível para um tipo numérico.

Note que, para um método genérico, este é o tipo _antes_ de instanciar os argumentos de tipo do método.

    * Uma expressão condicional numérica.

    * Uma expressão `switch` ([§15.28](<#/doc/jls/jls-15>)) cujas expressões de resultado são todas expressões numéricas.

  * Caso contrário, a expressão condicional é uma expressão condicional de referência.

O processo para determinar o tipo de uma expressão condicional depende do tipo de expressão condicional, conforme descrito nas seções seguintes.

As tabelas a seguir resumem as regras acima, fornecendo o tipo de uma expressão condicional para todos os tipos possíveis de seus segundo e terceiro operandos. bnp(..) significa aplicar promoção numérica binária. A forma "T | bnp(..)" é usada onde um operando é uma expressão constante do tipo `int` e pode ser representável no tipo T, onde a promoção numérica binária é usada se o operando não for representável no tipo T. O tipo de operando `Object` significa qualquer tipo de referência diferente do tipo `null` e das oito classes wrapper `Boolean`, `Byte`, `Short`, `Character`, `Integer`, `Long`, `Float`, `Double`.

**Tabela 15.25-A. Tipo de expressão condicional (3º operando primitivo, Parte I)**

3º -> | `byte` | `short` | `char` | `int`
---|---|---|---|---
2º ↓ | | | |
`byte` | `byte` | `short` | bnp(`byte`,`char`) | `byte` | bnp(`byte`,`int`)
`Byte` | `byte` | `short` | bnp(`Byte`,`char`) | `byte` | bnp(`Byte`,`int`)
`short` | `short` | `short` | bnp(`short`,`char`) | `short` | bnp(`short`,`int`)
`Short` | `short` | `short` | bnp(`Short`,`char`) | `short` | bnp(`Short`,`int`)
`char` | bnp(`char`,`byte`) | bnp(`char`,`short`) | `char` | `char` | bnp(`char`,`int`)
`Character` | bnp(`Character`,`byte`) | bnp(`Character`,`short`) | `char` | `char` | bnp(`Character`,`int`)
`int` | `byte` | bnp(`int`,`byte`) | `short` | bnp(`int`,`short`) | `char` | bnp(`int`,`char`) | `int`
`Integer` | bnp(`Integer`,`byte`) | bnp(`Integer`,`short`) | bnp(`Integer`,`char`) | `int`
`long` | bnp(`long`,`byte`) | bnp(`long`,`short`) | bnp(`long`,`char`) | bnp(`long`,`int`)
`Long` | bnp(`Long`,`byte`) | bnp(`Long`,`short`) | bnp(`Long`,`char`) | bnp(`Long`,`int`)
`float` | bnp(`float`,`byte`) | bnp(`float`,`short`) | bnp(`float`,`char`) | bnp(`float`,`int`)
`Float` | bnp(`Float`,`byte`) | bnp(`Float`,`short`) | bnp(`Float`,`char`) | bnp(`Float`,`int`)
`double` | bnp(`double`,`byte`) | bnp(`double`,`short`) | bnp(`double`,`char`) | bnp(`double`,`int`)
`Double` | bnp(`Double`,`byte`) | bnp(`Double`,`short`) | bnp(`Double`,`char`) | bnp(`Double`,`int`)
`boolean` | lub(`Boolean`,`Byte`) | lub(`Boolean`,`Short`) | lub(`Boolean`,`Character`) | lub(`Boolean`,`Integer`)
`Boolean` | lub(`Boolean`,`Byte`) | lub(`Boolean`,`Short`) | lub(`Boolean`,`Character`) | lub(`Boolean`,`Integer`)
`null` | lub(`null`,`Byte`) | lub(`null`,`Short`) | lub(`null`,`Character`) | lub(`null`,`Integer`)
`Object` | lub(`Object`,`Byte`) | lub(`Object`,`Short`) | lub(`Object`,`Character`) | lub(`Object`,`Integer`)

**Tabela 15.25-B. Tipo de expressão condicional (3º operando primitivo, Parte II)**

3º -> | `long` | `float` | `double` | `boolean`
---|---|---|---|---
2º ↓ | | | |
`byte` | bnp(`byte`,`long`) | bnp(`byte`,`float`) | bnp(`byte`,`double`) | lub(`Byte`,`Boolean`)
`Byte` | bnp(`Byte`,`long`) | bnp(`Byte`,`float`) | bnp(`Byte`,`double`) | lub(`Byte`,`Boolean`)
`short` | bnp(`short`,`long`) | bnp(`short`,`float`) | bnp(`short`,`double`) | lub(`Short`,`Boolean`)
`Short` | bnp(`Short`,`long`) | bnp(`Short`,`float`) | bnp(`Short`,`double`) | lub(`Short`,`Boolean`)
`char` | bnp(`char`,`long`) | bnp(`char`,`float`) | bnp(`char`,`double`) | lub(`Character`,`Boolean`)
`Character` | bnp(`Character`,`long`) | bnp(`Character`,`float`) | bnp(`Character`,`double`) | lub(`Character`,`Boolean`)
`int` | bnp(`int`,`long`) | bnp(`int`,`float`) | bnp(`int`,`double`) | lub(`Integer`,`Boolean`)
`Integer` | bnp(`Integer`,`long`) | bnp(`Integer`,`float`) | bnp(`Integer`,`double`) | lub(`Integer`,`Boolean`)
`long` | `long` | bnp(`long`,`float`) | bnp(`long`,`double`) | lub(`Long`,`Boolean`)
`Long` | `long` | bnp(`Long`,`float`) | bnp(`Long`,`double`) | lub(`Long`,`Boolean`)
`float` | bnp(`float`,`long`) | `float` | bnp(`float`,`double`) | lub(`Float`,`Boolean`)
`Float` | bnp(`Float`,`long`) | `float` | bnp(`Float`,`double`) | lub(`Float`,`Boolean`)
`double` | bnp(`double`,`long`) | bnp(`double`,`float`) | `double` | lub(`Double`,`Boolean`)
`Double` | bnp(`Double`,`long`) | bnp(`Double`,`float`) | `double` | lub(`Double`,`Boolean`)
`boolean` | lub(`Boolean`,`Long`) | lub(`Boolean`,`Float`) | lub(`Boolean`,`Double`) | `boolean`
`Boolean` | lub(`Boolean`,`Long`) | lub(`Boolean`,`Float`) | lub(`Boolean`,`Double`) | `boolean`
`null` | lub(`null`,`Long`) | lub(`null`,`Float`) | lub(`null`,`Double`) | lub(`null`,`Boolean`)
`Object` | lub(`Object`,`Long`) | lub(`Object`,`Float`) | lub(`Object`,`Double`) | lub(`Object`,`Boolean`)

**Tabela 15.25-C. Tipo de expressão condicional (3º operando de referência, Parte I)**

3º -> | `Byte` | `Short` | `Character` | `Integer`
---|---|---|---|---
2º ↓ | | | |
`byte` | `byte` | `short` | bnp(`byte`,`Character`) | bnp(`byte`,`Integer`)
`Byte` | `Byte` | `short` | bnp(`Byte`,`Character`) | bnp(`Byte`,`Integer`)
`short` | `short` | `short` | bnp(`short`,`Character`) | bnp(`short`,`Integer`)
`Short` | `short` | `Short` | bnp(`Short`,`Character`) | bnp(`Short`,`Integer`)
`char` | bnp(`char`,`Byte`) | bnp(`char`,`Short`) | `char` | bnp(`char`,`Integer`)
`Character` | bnp(`Character`,`Byte`) | bnp(`Character`,`Short`) | `Character` | bnp(`Character`,`Integer`)
`int` | `byte` | bnp(`int`,`Byte`) | `short` | bnp(`int`,`Short`) | `char` | bnp(`int`,`Character`) | `int`
`Integer` | bnp(`Integer`,`Byte`) | bnp(`Integer`,`Short`) | bnp(`Integer`,`Character`) | `Integer`
`long` | bnp(`long`,`Byte`) | bnp(`long`,`Short`) | bnp(`long`,`Character`) | bnp(`long`,`Integer`)
`Long` | bnp(`Long`,`Byte`) | bnp(`Long`,`Short`) | bnp(`Long`,`Character`) | bnp(`Long`,`Integer`)
`float` | bnp(`float`,`Byte`) | bnp(`float`,`Short`) | bnp(`float`,`Character`) | bnp(`float`,`Integer`)
`Float` | bnp(`Float`,`Byte`) | bnp(`Float`,`Short`) | bnp(`Float`,`Character`) | bnp(`Float`,`Integer`)
`double` | bnp(`double`,`Byte`) | bnp(`double`,`Short`) | bnp(`double`,`Character`) | bnp(`double`,`Integer`)
`Double` | bnp(`Double`,`Byte`) | bnp(`Double`,`Short`) | bnp(`Double`,`Character`) | bnp(`Double`,`Integer`)
`boolean` | lub(`Boolean`,`Byte`) | lub(`Boolean`,`Short`) | lub(`Boolean`,`Character`) | lub(`Boolean`,`Integer`)
`Boolean` | lub(`Boolean`,`Byte`) | lub(`Boolean`,`Short`) | lub(`Boolean`,`Character`) | lub(`Boolean`,`Integer`)
`null` | `Byte` | `Short` | `Character` | `Integer`
`Object` | lub(`Object`,`Byte`) | lub(`Object`,`Short`) | lub(`Object`,`Character`) | lub(`Object`,`Integer`)

**Tabela 15.25-D. Tipo de expressão condicional (3º operando de referência, Parte II)**

3º -> | `Long` | `Float` | `Double` | `Boolean`
---|---|---|---|---
2º ↓ | | | |
`byte` | bnp(`byte`,`Long`) | bnp(`byte`,`Float`) | bnp(`byte`,`Double`) | lub(`Byte`,`Boolean`)
`Byte` | bnp(`Byte`,`Long`) | bnp(`Byte`,`Float`) | bnp(`Byte`,`Double`) | lub(`Byte`,`Boolean`)
`short` | bnp(`short`,`Long`) | bnp(`short`,`Float`) | bnp(`short`,`Double`) | lub(`Short`,`Boolean`)
`Short` | bnp(`Short`,`Long`) | bnp(`Short`,`Float`) | bnp(`Short`,`Double`) | lub(`Short`,`Boolean`)
`char` | bnp(`char`,`Long`) | bnp(`char`,`Float`) | bnp(`char`,`Double`) | lub(`Character`,`Boolean`)
`Character` | bnp(`Character`,`Long`) | bnp(`Character`,`Float`) | bnp(`Character`,`Double`) | lub(`Character`,`Boolean`)
`int` | bnp(`int`,`Long`) | bnp(`int`,`Float`) | bnp(`int`,`Double`) | lub(`Integer`,`Boolean`)
`Integer` | bnp(`Integer`,`Long`) | bnp(`Integer`,`Float`) | bnp(`Integer`,`Double`) | lub(`Integer`,`Boolean`)
`long` | `long` | bnp(`long`,`Float`) | bnp(`long`,`Double`) | lub(`Long`,`Boolean`)
`Long` | `Long` | bnp(`Long`,`Float`) | bnp(`Long`,`Double`) | lub(`Long`,`Boolean`)
`float` | bnp(`float`,`Long`) | `float` | bnp(`float`,`Double`) | lub(`Float`,`Boolean`)
`Float` | bnp(`Float`,`Long`) | `Float` | bnp(`Float`,`Double`) | lub(`Float`,`Boolean`)
`double` | bnp(`double`,`Long`) | bnp(`double`,`Float`) | `double` | lub(`Double`,`Boolean`)
`Double` | bnp(`Double`,`Long`) | bnp(`Double`,`Float`) | `Double` | lub(`Double`,`Boolean`)
`boolean` | lub(`Boolean`,`Long`) | lub(`Boolean`,`Float`) | lub(`Boolean`,`Double`) | `boolean`
`Boolean` | lub(`Boolean`,`Long`) | lub(`Boolean`,`Float`) | lub(`Boolean`,`Double`) | `Boolean`
`null` | `Long` | `Float` | `Double` | `Boolean`
`Object` | lub(`Object`,`Long`) | lub(`Object`,`Float`) | lub(`Object`,`Double`) | lub(`Object`,`Boolean`)

**Tabela 15.25-E. Tipo de expressão condicional (3º operando de referência, Parte III)**

3º -> | `null` | `Object`
---|---|---
2º ↓ | |
`byte` | lub(`Byte`,`null`) | lub(`Byte`,`Object`)
`Byte` | `Byte` | lub(`Byte`,`Object`)
`short` | lub(`Short`,`null`) | lub(`Short`,`Object`)
`Short` | `Short` | lub(`Short`,`Object`)
`char` | lub(`Character`,`null`) | lub(`Character`,`Object`)
`Character` | `Character` | lub(`Character`,`Object`)
`int` | lub(`Integer`,`null`) | lub(`Integer`,`Object`)
`Integer` | `Integer` | lub(`Integer`,`Object`)
`long` | lub(`Long`,`null`) | lub(`Long`,`Object`)
`Long` | `Long` | lub(`Long`,`Object`)
`float` | lub(`Float`,`null`) | lub(`Float`,`Object`)
`Float` | `Float` | lub(`Float`,`Object`)
`double` | lub(`Double`,`null`) | lub(`Double`,`Object`)
`Double` | `Double` | lub(`Double`,`Object`)
`boolean` | lub(`Boolean`,`null`) | lub(`Boolean`,`Object`)
`Boolean` | `Boolean` | lub(`Boolean`,`Object`)
`null` | `null` | lub(`null`,`Object`)
`Object` | `Object` | `Object`

Em tempo de execução, a primeira expressão de operando da expressão condicional é avaliada primeiro. Se necessário, a conversão unboxing é realizada no resultado.

O valor `boolean` resultante é então usado para escolher a segunda ou a terceira expressão de operando:

  * Se o valor do primeiro operando for `true`, então a segunda expressão de operando é escolhida.

  * Se o valor do primeiro operando for `false`, então a terceira expressão de operando é escolhida.

A expressão de operando escolhida é então avaliada e o valor resultante é convertido para o tipo da expressão condicional, conforme determinado pelas regras estabelecidas abaixo.

Esta conversão pode incluir conversão boxing ou unboxing ([§5.1.7](<#/doc/jls/jls-05>), [§5.1.8](<#/doc/jls/jls-05>)).

A expressão de operando não escolhida não é avaliada para aquela avaliação particular da expressão condicional.

### 15.25.1. Expressões Condicionais Booleanas

Expressões condicionais booleanas são expressões autônomas ([§15.2](<#/doc/jls/jls-15>)).

O tipo de uma expressão condicional booleana é determinado da seguinte forma:

  * Se o segundo e o terceiro operandos forem ambos do tipo `Boolean`, a expressão condicional tem o tipo `Boolean`.

  * Caso contrário, a expressão condicional tem o tipo `boolean`.

### 15.25.2. Expressões Condicionais Numéricas

Expressões condicionais numéricas são expressões autônomas ([§15.2](<#/doc/jls/jls-15>)).

O tipo de uma expressão condicional numérica é determinado da seguinte forma:

  * Se o segundo e o terceiro operandos tiverem o mesmo tipo, então esse é o tipo da expressão condicional.

  * Se um dos segundo e terceiro operandos for do tipo primitivo T, e o tipo do outro for o resultado da aplicação da conversão boxing ([§5.1.7](<#/doc/jls/jls-05>)) a T, então o tipo da expressão condicional é T.

  * Se um dos operandos for do tipo `byte` ou `Byte` e o outro for do tipo `short` ou `Short`, então o tipo da expressão condicional é `short`.

  * Se um dos operandos for do tipo T onde T é `byte`, `short` ou `char`, e o outro operando for uma expressão constante ([§15.29](<#/doc/jls/jls-15>)) do tipo `int` cujo valor é representável no tipo T, então o tipo da expressão condicional é T.

  * Se um dos operandos for do tipo T, onde T é `Byte`, `Short` ou `Character`, e o outro operando for uma expressão constante do tipo `int` cujo valor é representável no tipo U que é o resultado da aplicação da conversão unboxing a T, então o tipo da expressão condicional é U.

  * Caso contrário, a promoção numérica geral ([§5.6](<#/doc/jls/jls-05>)) é aplicada ao segundo e terceiro operandos, e o tipo da expressão condicional é o tipo promovido do segundo e terceiro operandos.

Note que a promoção numérica pode incluir conversão unboxing ([§5.1.8](<#/doc/jls/jls-05>)).

### 15.25.3. Expressões Condicionais de Referência

Uma expressão condicional de referência é uma poly expression se aparecer em um contexto de atribuição ou um contexto de invocação ([§5.2](<#/doc/jls/jls-05>). [§5.3](<#/doc/jls/jls-05>)). Caso contrário, é uma expressão autônoma.

Onde uma poly reference conditional expression aparece em um contexto de um tipo particular com o tipo alvo T, suas segunda e terceira expressões de operando aparecem de forma semelhante em um contexto do mesmo tipo com o tipo alvo T.

Uma poly reference conditional expression é compatível com um tipo alvo T se suas segunda e terceira expressões de operando forem compatíveis com T.

O tipo de uma poly reference conditional expression é o mesmo que seu tipo alvo.

O tipo de uma expressão condicional de referência autônoma é determinado da seguinte forma:

  * Se o segundo e o terceiro operandos tiverem o mesmo tipo (que pode ser o tipo null), então esse é o tipo da expressão condicional.

  * Se o tipo de um dos segundo e terceiro operandos for o tipo null, e o tipo do outro operando for um tipo de referência, então o tipo da expressão condicional é esse tipo de referência.

  * Caso contrário, o segundo e o terceiro operandos são dos tipos S1 e S2, respectivamente. Seja T1 o tipo que resulta da aplicação da conversão boxing a S1, e seja T2 o tipo que resulta da aplicação da conversão boxing a S2. O tipo da expressão condicional é o resultado da aplicação da capture conversion ([§5.1.10](<#/doc/jls/jls-05>)) a lub(T1, T2).

Como as expressões condicionais de referência podem ser poly expressions, elas podem "passar" o contexto para seus operandos. Isso permite que lambda expressions e method reference expressions apareçam como operandos:
```
    return ... ? (x -> x) : (x -> -x);
    
```

Também permite o uso de informações extras para melhorar a verificação de tipo de invocações de métodos genéricos. Antes do Java SE 8, esta atribuição era bem tipada:
```
    List<String> ls = Arrays.asList();
    
```

mas esta não era:
```
    List<String> ls = ... ? Arrays.asList() : Arrays.asList("a","b");
    
```

As regras acima permitem que ambas as atribuições sejam consideradas bem tipadas.

Note que uma expressão condicional de referência não precisa _conter_ uma poly expression como operando para _ser_ uma poly expression. Ela é uma poly expression simplesmente em virtude do contexto em que aparece. Por exemplo, no código a seguir, a expressão condicional é uma poly expression, e cada operando é considerado em um contexto de atribuição visando `Class<? super Integer>`:
```
    
    Class<? super Integer> choose(boolean b,
                                  Class<Integer> c1,
                                  Class<Number> c2) {
        return b ? c1 : c2;
    }
    
    
```

Se a expressão condicional não fosse uma poly expression, então ocorreria um erro em tempo de compilação, pois seu tipo seria lub(`Class<Integer>`, `Class<Number>`) = `Class<? extends Number>` que é incompatível com o tipo de retorno de `choose`.
## 15.26. Operadores de Atribuição

Existem 12 _operadores de atribuição_ ; todos são sintaticamente associativos à direita (eles agrupam da direita para a esquerda). Assim, `a=b=c` significa `a=(b=c)`, que atribui o valor de `c` a `b` e então atribui o valor de `b` a `a`.

AssignmentExpression:

[ConditionalExpression](<#/doc/jls/jls-15>)   
[Assignment](<#/doc/jls/jls-15>)

Assignment:

[LeftHandSide](<#/doc/jls/jls-15>) [AssignmentOperator](<#/doc/jls/jls-15>) [Expression](<#/doc/jls/jls-15>)

LeftHandSide:

[ExpressionName](<#/doc/jls/jls-06>)   
[FieldAccess](<#/doc/jls/jls-15>)   
[ArrayAccess](<#/doc/jls/jls-15>)

AssignmentOperator:

(um de)   

```
    =  *=  /=  %=  +=  -=  <<=  >>=  >>>=  &=  ^=  |=
```

O resultado do primeiro operando de um operador de atribuição deve ser uma variável, ou ocorre um erro em tempo de compilação.

Este operando pode ser uma variável nomeada, como uma variável local ou um campo do objeto ou classe atual, ou pode ser uma variável computada, como pode resultar de um acesso a campo ([§15.11](<#/doc/jls/jls-15>)) ou um acesso a array ([§15.10.3](<#/doc/jls/jls-15>)).

O tipo da expressão de atribuição é o tipo da variável após a conversão de captura ([§5.1.10](<#/doc/jls/jls-05>)).

Em tempo de execução, o resultado da expressão de atribuição é o valor da variável após a ocorrência da atribuição. O resultado de uma expressão de atribuição não é uma variável em si.

Uma variável declarada `final` não pode receber atribuição (a menos que esteja definitivamente não atribuída ([§16 (_Definite Assignment_)](<#/doc/jls/jls-16>))), porque quando um acesso a tal variável `final` é usado como uma expressão, o resultado é um valor, não uma variável, e, portanto, não pode ser usado como o primeiro operando de um operador de atribuição.

### 15.26.1. Operador de Atribuição Simples `=`

Se o tipo do operando do lado direito não for compatível para atribuição com o tipo da variável ([§5.2](<#/doc/jls/jls-05>)), então ocorre um erro em tempo de compilação.

Caso contrário, em tempo de execução, a expressão é avaliada de uma de três maneiras.

Se a expressão do operando do lado esquerdo for uma expressão de acesso a campo `e`.`f` ([§15.11](<#/doc/jls/jls-15>)), possivelmente entre um ou mais pares de parênteses, então:

  * Primeiro, a expressão `e` é avaliada. Se a avaliação de `e` for concluída abruptamente, a expressão de atribuição será concluída abruptamente pelo mesmo motivo.

  * Em seguida, o operando do lado direito é avaliado. Se a avaliação da expressão do lado direito for concluída abruptamente, a expressão de atribuição será concluída abruptamente pelo mesmo motivo.

  * Então, se o campo denotado por `e`.`f` não for `static` e o resultado da avaliação de `e` acima for `null`, então uma `NullPointerException` é lançada.

  * Caso contrário, a variável denotada por `e`.`f` recebe o valor do operando do lado direito conforme calculado acima.

Se o operando do lado esquerdo for uma expressão de acesso a array ([§15.10.3](<#/doc/jls/jls-15>)), possivelmente entre um ou mais pares de parênteses, então:

  * Primeiro, a subexpressão de referência de array da expressão de acesso a array do operando do lado esquerdo é avaliada. Se esta avaliação for concluída abruptamente, então a expressão de atribuição será concluída abruptamente pelo mesmo motivo; a subexpressão de índice (da expressão de acesso a array do operando do lado esquerdo) e o operando do lado direito não são avaliados e nenhuma atribuição ocorre.

  * Caso contrário, a subexpressão de índice da expressão de acesso a array do operando do lado esquerdo é avaliada. Se esta avaliação for concluída abruptamente, então a expressão de atribuição será concluída abruptamente pelo mesmo motivo e o operando do lado direito não é avaliado e nenhuma atribuição ocorre.

  * Caso contrário, o operando do lado direito é avaliado. Se esta avaliação for concluída abruptamente, então a expressão de atribuição será concluída abruptamente pelo mesmo motivo e nenhuma atribuição ocorre.

  * Caso contrário, se o valor da subexpressão de referência de array for `null`, então nenhuma atribuição ocorre e uma `NullPointerException` é lançada.

  * Caso contrário, o valor da subexpressão de referência de array de fato se refere a um array. Se o valor da subexpressão de índice for menor que zero, ou maior ou igual ao `length` do array, então nenhuma atribuição ocorre e uma `ArrayIndexOutOfBoundsException` é lançada.

  * Caso contrário, o valor da subexpressão de índice é usado para selecionar um componente do array referido pelo valor da subexpressão de referência de array.

Este componente é uma variável; chame seu tipo de SC. Além disso, seja TC o tipo do operando do lado esquerdo do operador de atribuição conforme determinado em tempo de compilação. Então existem duas possibilidades:

    * Se TC for um tipo primitivo, então SC é necessariamente o mesmo que TC.

O valor do operando do lado direito é convertido para o tipo do componente de array selecionado, e o resultado da conversão é armazenado no componente de array.

    * Se TC for um tipo de referência, então SC pode não ser o mesmo que TC, mas sim um tipo que estende ou implementa TC.

Seja RC a classe do objeto referido pelo valor do operando do lado direito em tempo de execução.

Um compilador Java pode ser capaz de provar em tempo de compilação que o componente do array será exatamente do tipo TC (por exemplo, TC pode ser `final`). Mas se um compilador Java não puder provar em tempo de compilação que o componente do array será exatamente do tipo TC, então uma verificação deve ser realizada em tempo de execução para garantir que a classe RC seja compatível para atribuição ([§5.2](<#/doc/jls/jls-05>)) com o tipo real SC do componente do array.

Esta verificação é semelhante a um _narrowing cast_ ([§5.5](<#/doc/jls/jls-05>), [§15.16](<#/doc/jls/jls-15>)), exceto que, se a verificação falhar, uma `ArrayStoreException` é lançada em vez de uma `ClassCastException`.

Se a classe RC não for atribuível ao tipo SC, então nenhuma atribuição ocorre e uma `ArrayStoreException` é lançada.

Caso contrário, o valor de referência do operando do lado direito é armazenado no componente de array selecionado.

Caso contrário, três passos são necessários:

  * Primeiro, o operando do lado esquerdo é avaliado para produzir uma variável. Se esta avaliação for concluída abruptamente, então a expressão de atribuição será concluída abruptamente pelo mesmo motivo; o operando do lado direito não é avaliado e nenhuma atribuição ocorre.

  * Caso contrário, o operando do lado direito é avaliado. Se esta avaliação for concluída abruptamente, então a expressão de atribuição será concluída abruptamente pelo mesmo motivo e nenhuma atribuição ocorre.

  * Caso contrário, o valor do operando do lado direito é convertido para o tipo da variável do lado esquerdo, e o resultado da conversão é armazenado na variável.

**Exemplo 15.26.1-1. Atribuição Simples a um Componente de Array**
```
    class ArrayReferenceThrow extends RuntimeException { }
    class IndexThrow          extends RuntimeException { }
    class RightHandSideThrow  extends RuntimeException { }
    
    class IllustrateSimpleArrayAssignment {
        static Object[] objects = { new Object(), new Object() };
        static Thread[] threads = { new Thread(), new Thread() };
    
        static Object[] arrayThrow() {
            throw new ArrayReferenceThrow();
        }
        static int indexThrow() {
            throw new IndexThrow();
        }
        static Thread rightThrow() {
            throw new RightHandSideThrow();
        }
        static String name(Object q) {
            String sq = q.getClass().getName();
            int k = sq.lastIndexOf('.');
            return (k < 0) ? sq : sq.substring(k+1);
        }
    
        static void testFour(Object[] x, int j, Object y) {
            String sx = x == null ? "null" : name(x[0]) + "s";
            String sy = name(y);
            System.out.println();
            try {
                System.out.print(sx + "[throw]=throw => ");
                x[indexThrow()] = rightThrow();
                System.out.println("Okay!");
            } catch (Throwable e) { System.out.println(name(e)); }
            try {
                System.out.print(sx + "[throw]=" + sy + " => ");
                x[indexThrow()] = y;
                System.out.println("Okay!");
            } catch (Throwable e) { System.out.println(name(e)); }
            try {
                System.out.print(sx + "[" + j + "]=throw => ");
                x[j] = rightThrow();
                System.out.println("Okay!");
            } catch (Throwable e) { System.out.println(name(e)); }
            try {
                System.out.print(sx + "[" + j + "]=" + sy + " => ");
                x[j] = y;
                System.out.println("Okay!");
            } catch (Throwable e) { System.out.println(name(e)); }
        }
    
        public static void main(String[] args) {
            try {
                System.out.print("throw[throw]=throw => ");
                arrayThrow()[indexThrow()] = rightThrow();
                System.out.println("Okay!");
            } catch (Throwable e) { System.out.println(name(e)); }
            try {
                System.out.print("throw[throw]=Thread => ");
                arrayThrow()[indexThrow()] = new Thread();
                System.out.println("Okay!");
            } catch (Throwable e) { System.out.println(name(e)); }
            try {
                System.out.print("throw[1]=throw => ");
                arrayThrow()[1] = rightThrow();
                System.out.println("Okay!");
            } catch (Throwable e) { System.out.println(name(e)); }
            try {
                System.out.print("throw[1]=Thread => ");
                arrayThrow()[1] = new Thread();
                System.out.println("Okay!");
            } catch (Throwable e) { System.out.println(name(e)); }
    
            testFour(null, 1, new StringBuffer());
            testFour(null, 9, new Thread());
            testFour(objects, 1, new StringBuffer());
            testFour(objects, 1, new Thread());
            testFour(objects, 9, new StringBuffer());
            testFour(objects, 9, new Thread());
            testFour(threads, 1, new StringBuffer());
            testFour(threads, 1, new Thread());
            testFour(threads, 9, new StringBuffer());
            testFour(threads, 9, new Thread());
        }
    }
    
```

Este programa produz a seguinte saída:
```
    throw[throw]=throw => ArrayReferenceThrow
    throw[throw]=Thread => ArrayReferenceThrow
    throw[1]=throw => ArrayReferenceThrow
    throw[1]=Thread => ArrayReferenceThrow
    
    null[throw]=throw => IndexThrow
    null[throw]=StringBuffer => IndexThrow
    null[1]=throw => RightHandSideThrow
    null[1]=StringBuffer => NullPointerException
    
    null[throw]=throw => IndexThrow
    null[throw]=Thread => IndexThrow
    null[9]=throw => RightHandSideThrow
    null[9]=Thread => NullPointerException
    
    Objects[throw]=throw => IndexThrow
    Objects[throw]=StringBuffer => IndexThrow
    Objects[1]=throw => RightHandSideThrow
    Objects[1]=StringBuffer => Okay!
    
    Objects[throw]=throw => IndexThrow
    Objects[throw]=Thread => IndexThrow
    Objects[1]=throw => RightHandSideThrow
    Objects[1]=Thread => Okay!
    
    Objects[throw]=throw => IndexThrow
    Objects[throw]=StringBuffer => IndexThrow
    Objects[9]=throw => RightHandSideThrow
    Objects[9]=StringBuffer => ArrayIndexOutOfBoundsException
    
    Objects[throw]=throw => IndexThrow
    Objects[throw]=Thread => IndexThrow
    Objects[9]=throw => RightHandSideThrow
    Objects[9]=Thread => ArrayIndexOutOfBoundsException
    
    Threads[throw]=throw => IndexThrow
    Threads[throw]=StringBuffer => IndexThrow
    Threads[1]=throw => RightHandSideThrow
    Threads[1]=StringBuffer => ArrayStoreException
    
    Threads[throw]=throw => IndexThrow
    Threads[throw]=Thread => IndexThrow
    Threads[1]=throw => RightHandSideThrow
    Threads[1]=Thread => Okay!
    
    Threads[throw]=throw => IndexThrow
    Threads[throw]=StringBuffer => IndexThrow
    Threads[9]=throw => RightHandSideThrow
    Threads[9]=StringBuffer => ArrayIndexOutOfBoundsException
    
    Threads[throw]=throw => IndexThrow
    Threads[throw]=Thread => IndexThrow
    Threads[9]=throw => RightHandSideThrow
    Threads[9]=Thread => ArrayIndexOutOfBoundsException
    
```

O caso mais interessante de todos é o décimo terceiro a partir do final:
```
    Threads[1]=StringBuffer => ArrayStoreException
    
```

o que indica que a tentativa de armazenar uma referência a um `StringBuffer` em um array cujos componentes são do tipo `Thread` lança uma `ArrayStoreException`. O código está correto em termos de tipo em tempo de compilação: a atribuição tem um lado esquerdo do tipo `Object[]` e um lado direito do tipo `Object`. Em tempo de execução, o primeiro argumento real para o método `testFour` é uma referência a uma instância de "array de `Thread`" e o terceiro argumento real é uma referência a uma instância da classe `StringBuffer`.

### 15.26.2. Operadores de Atribuição Composta

Uma expressão de atribuição composta da forma `E1 op= E2` é equivalente a `E1 = (T) ((E1) op (E2))`, onde T é o tipo de `E1`, exceto que `E1` é avaliado apenas uma vez.

Por exemplo, o seguinte código está correto:
```
    short x = 3;
    x += 4.6;
    
```

e resulta em `x` tendo o valor `7` porque é equivalente a:
```
    short x = 3;
    x = (short)(x + 4.6);
    
```

Em tempo de execução, a expressão é avaliada de uma de duas maneiras.

Se a expressão do operando do lado esquerdo não for uma expressão de acesso a array, então:

  * Primeiro, o operando do lado esquerdo é avaliado para produzir uma variável. Se esta avaliação for concluída abruptamente, então a expressão de atribuição será concluída abruptamente pelo mesmo motivo; o operando do lado direito não é avaliado e nenhuma atribuição ocorre.

  * Caso contrário, o valor do operando do lado esquerdo é salvo e então o operando do lado direito é avaliado. Se esta avaliação for concluída abruptamente, então a expressão de atribuição será concluída abruptamente pelo mesmo motivo e nenhuma atribuição ocorre.

  * Caso contrário, o valor salvo da variável do lado esquerdo e o valor do operando do lado direito são usados para realizar a operação binária indicada pelo operador de atribuição composta. Se esta operação for concluída abruptamente, então a expressão de atribuição será concluída abruptamente pelo mesmo motivo e nenhuma atribuição ocorre.

  * Caso contrário, o resultado da operação binária é convertido para o tipo da variável do lado esquerdo, e o resultado da conversão é armazenado na variável.

Se a expressão do operando do lado esquerdo for uma expressão de acesso a array ([§15.10.3](<#/doc/jls/jls-15>)), então:

  * Primeiro, a subexpressão de referência de array da expressão de acesso a array do operando do lado esquerdo é avaliada. Se esta avaliação for concluída abruptamente, então a expressão de atribuição será concluída abruptamente pelo mesmo motivo; a subexpressão de índice (da expressão de acesso a array do operando do lado esquerdo) e o operando do lado direito não são avaliados e nenhuma atribuição ocorre.

  * Caso contrário, a subexpressão de índice da expressão de acesso a array do operando do lado esquerdo é avaliada. Se esta avaliação for concluída abruptamente, então a expressão de atribuição será concluída abruptamente pelo mesmo motivo e o operando do lado direito não é avaliado e nenhuma atribuição ocorre.

  * Caso contrário, se o valor da subexpressão de referência de array for `null`, então nenhuma atribuição ocorre e uma `NullPointerException` é lançada.

  * Caso contrário, o valor da subexpressão de referência de array de fato se refere a um array. Se o valor da subexpressão de índice for menor que zero, ou maior ou igual ao `length` do array, então nenhuma atribuição ocorre e uma `ArrayIndexOutOfBoundsException` é lançada.

  * Caso contrário, o valor da subexpressão de índice é usado para selecionar um componente do array referido pelo valor da subexpressão de referência de array. O valor deste componente é salvo e então o operando do lado direito é avaliado. Se esta avaliação for concluída abruptamente, então a expressão de atribuição será concluída abruptamente pelo mesmo motivo e nenhuma atribuição ocorre.

Para um operador de atribuição simples, a avaliação do operando do lado direito ocorre antes das verificações da subexpressão de referência de array e da subexpressão de índice, mas para um operador de atribuição composta, a avaliação do operando do lado direito ocorre após essas verificações.

  * Caso contrário, considere o componente de array selecionado na etapa anterior, cujo valor foi salvo. Este componente é uma variável; chame seu tipo de S. Além disso, seja T o tipo do operando do lado esquerdo do operador de atribuição conforme determinado em tempo de compilação.

    * Se T for um tipo primitivo, então S é necessariamente o mesmo que T.

O valor salvo do componente de array e o valor do operando do lado direito são usados para realizar a operação binária indicada pelo operador de atribuição composta.

Se esta operação for concluída abruptamente (a única possibilidade é uma divisão inteira por zero - veja [§15.17.2](<#/doc/jls/jls-15>)), então a expressão de atribuição será concluída abruptamente pelo mesmo motivo e nenhuma atribuição ocorre.

Caso contrário, o resultado da operação binária é convertido para o tipo do componente de array selecionado, e o resultado da conversão é armazenado no componente de array.

    * Se T for um tipo de referência, então deve ser `String`. Como a classe `String` é uma classe `final`, S também deve ser `String`.

Portanto, a verificação em tempo de execução que às vezes é exigida para o operador de atribuição simples nunca é exigida para um operador de atribuição composta.

O valor salvo do componente de array e o valor do operando do lado direito são usados para realizar a operação binária (concatenação de strings) indicada pelo operador de atribuição composta (que é necessariamente `+=`). Se esta operação for concluída abruptamente, então a expressão de atribuição será concluída abruptamente pelo mesmo motivo e nenhuma atribuição ocorre.

Caso contrário, o resultado `String` da operação binária é armazenado no componente de array.

**Exemplo 15.26.2-1. Atribuição Composta a um Componente de Array**
```
    class ArrayReferenceThrow extends RuntimeException { }
    class IndexThrow          extends RuntimeException { }
    class RightHandSideThrow  extends RuntimeException { }
    
    class IllustrateCompoundArrayAssignment {
        static String[] strings = { "Simon", "Garfunkel" };
        static double[] doubles = { Math.E, Math.PI };
    
        static String[] stringsThrow() {
            throw new ArrayReferenceThrow();
        }
        static double[] doublesThrow() {
            throw new ArrayReferenceThrow();
        }
        static int indexThrow() {
            throw new IndexThrow();
        }
        static String stringThrow() {
            throw new RightHandSideThrow();
        }
        static double doubleThrow() {
            throw new RightHandSideThrow();
        }
        static String name(Object q) {
            String sq = q.getClass().getName();
            int k = sq.lastIndexOf('.');
            return (k < 0) ? sq : sq.substring(k+1);
        }
    
        static void testEight(String[] x, double[] z, int j) {
            String sx = (x == null) ? "null" : "Strings";
            String sz = (z == null) ? "null" : "doubles";
            System.out.println();
            try {
                System.out.print(sx + "[throw]+=throw => ");
                x[indexThrow()] += stringThrow();
                System.out.println("Okay!");
            } catch (Throwable e) { System.out.println(name(e)); }
            try {
                System.out.print(sz + "[throw]+=throw => ");
                z[indexThrow()] += doubleThrow();
                System.out.println("Okay!");
            } catch (Throwable e) { System.out.println(name(e)); }
            try {
                System.out.print(sx + "[throw]+=\"heh\" => ");
                x[indexThrow()] += "heh";
                System.out.println("Okay!");
            } catch (Throwable e) { System.out.println(name(e)); }
            try {
                System.out.print(sz + "[throw]+=12345 => ");
                z[indexThrow()] += 12345;
                System.out.println("Okay!");
            } catch (Throwable e) { System.out.println(name(e)); }
            try {
                System.out.print(sx + "[" + j + "]+=throw => ");
                x[j] += stringThrow();
                System.out.println("Okay!");
            } catch (Throwable e) { System.out.println(name(e)); }
            try {
                System.out.print(sz + "[" + j + "]+=throw => ");
                z[j] += doubleThrow();
                System.out.println("Okay!");
            } catch (Throwable e) { System.out.println(name(e)); }
            try {
                System.out.print(sx + "[" + j + "]+=\"heh\" => ");
                x[j] += "heh";
                System.out.println("Okay!");
            } catch (Throwable e) { System.out.println(name(e)); }
            try {
                System.out.print(sz + "[" + j + "]+=12345 => ");
                z[j] += 12345;
                System.out.println("Okay!");
            } catch (Throwable e) { System.out.println(name(e)); }
        }
    
        public static void main(String[] args) {
            try {
                System.out.print("throw[throw]+=throw => ");
                stringsThrow()[indexThrow()] += stringThrow();
                System.out.println("Okay!");
            } catch (Throwable e) { System.out.println(name(e)); }
            try {
                System.out.print("throw[throw]+=throw => ");
                doublesThrow()[indexThrow()] += doubleThrow();
                System.out.println("Okay!");
            } catch (Throwable e) { System.out.println(name(e)); }
            try {
                System.out.print("throw[throw]+=\"heh\" => ");
                stringsThrow()[indexThrow()] += "heh";
                System.out.println("Okay!");
            } catch (Throwable e) { System.out.println(name(e)); }
            try {
                System.out.print("throw[throw]+=12345 => ");
                doublesThrow()[indexThrow()] += 12345;
                System.out.println("Okay!");
            } catch (Throwable e) { System.out.println(name(e)); }
            try {
                System.out.print("throw[1]+=throw => ");
                stringsThrow()[1] += stringThrow();
                System.out.println("Okay!");
            } catch (Throwable e) { System.out.println(name(e)); }
            try {
                System.out.print("throw[1]+=throw => ");
                doublesThrow()[1] += doubleThrow();
                System.out.println("Okay!");
            } catch (Throwable e) { System.out.println(name(e)); }
            try {
                System.out.print("throw[1]+=\"heh\" => ");
                stringsThrow()[1] += "heh";
                System.out.println("Okay!");
            } catch (Throwable e) { System.out.println(name(e)); }
            try {
                System.out.print("throw[1]+=12345 => ");
                doublesThrow()[1] += 12345;
                System.out.println("Okay!");
            } catch (Throwable e) { System.out.println(name(e)); }
            testEight(null, null, 1);
            testEight(null, null, 9);
            testEight(strings, doubles, 1);
            testEight(strings, doubles, 9);
        }
    }
    
```

Este programa produz a seguinte saída:
```
    throw[throw]+=throw => ArrayReferenceThrow
    throw[throw]+=throw => ArrayReferenceThrow
    throw[throw]+="heh" => ArrayReferenceThrow
    throw[throw]+=12345 => ArrayReferenceThrow
    throw[1]+=throw => ArrayReferenceThrow
    throw[1]+=throw => ArrayReferenceThrow
    throw[1]+="heh" => ArrayReferenceThrow
    throw[1]+=12345 => ArrayReferenceThrow
    
    null[throw]+=throw => IndexThrow
    null[throw]+=throw => IndexThrow
    null[throw]+="heh" => IndexThrow
    null[throw]+=12345 => IndexThrow
    null[1]+=throw => NullPointerException
    null[1]+=throw => NullPointerException
    null[1]+="heh" => NullPointerException
    null[1]+=12345 => NullPointerException
    
    null[throw]+=throw => IndexThrow
    null[throw]+=throw => IndexThrow
    null[throw]+="heh" => IndexThrow
    null[throw]+=12345 => IndexThrow
    null[9]+=throw => NullPointerException
    null[9]+=throw => NullPointerException
    null[9]+="heh" => NullPointerException
    null[9]+=12345 => NullPointerException
    
    Strings[throw]+=throw => IndexThrow
    doubles[throw]+=throw => IndexThrow
    Strings[throw]+="heh" => IndexThrow
    doubles[throw]+=12345 => IndexThrow
    Strings[1]+=throw => RightHandSideThrow
    doubles[1]+=throw => RightHandSideThrow
    Strings[1]+="heh" => Okay!
    doubles[1]+=12345 => Okay!
    
    Strings[throw]+=throw => IndexThrow
    doubles[throw]+=throw => IndexThrow
    Strings[throw]+="heh" => IndexThrow
    doubles[throw]+=12345 => IndexThrow
    Strings[9]+=throw => ArrayIndexOutOfBoundsException
    doubles[9]+=throw => ArrayIndexOutOfBoundsException
    Strings[9]+="heh" => ArrayIndexOutOfBoundsException
    doubles[9]+=12345 => ArrayIndexOutOfBoundsException
    
```

Os casos mais interessantes de todos são o décimo primeiro e o décimo segundo a partir do final:
```
    Strings[1]+=throw => RightHandSideThrow
    doubles[1]+=throw => RightHandSideThrow
    
```

São os casos em que um lado direito que lança uma exceção realmente consegue lançar a exceção; além disso, são os únicos casos desse tipo. Isso demonstra que a avaliação do operando do lado direito de fato ocorre após as verificações de um valor de referência de array nulo e de um valor de índice fora dos limites.

**Exemplo 15.26.2-2. O Valor do Lado Esquerdo da Atribuição Composta é Salvo Antes da Avaliação do Lado Direito**
```
    class Test {
        public static void main(String[] args) {
            int k = 1;
            int[] a = { 1 };
            k += (k = 4) * (k + 2);
            a[0] += (a[0] = 4) * (a[0] + 2);
            System.out.println("k==" + k + " and a[0]==" + a[0]);
        }
    }
    
```

Este programa produz a seguinte saída:
```
    k==25 and a[0]==25
    
```

O valor `1` de `k` é salvo pelo operador de atribuição composta `+=` antes que seu operando do lado direito `(k = 4) * (k + 2)` seja avaliado. A avaliação deste operando do lado direito então atribui `4` a `k`, calcula o valor `6` para `k + 2`, e então multiplica `4` por `6` para obter `24`. Isso é adicionado ao valor salvo `1` para obter `25`, que é então armazenado em `k` pelo operador `+=`. Uma análise idêntica se aplica ao caso que usa `a[0]`.

Em resumo, as declarações:
```
    k += (k = 4) * (k + 2);
    a[0] += (a[0] = 4) * (a[0] + 2);
    
```

comportam-se exatamente da mesma maneira que as declarações:
```
    k = k + (k = 4) * (k + 2);
    a[0] = a[0] + (a[0] = 4) * (a[0] + 2);
    
```
## 15.27. Expressões Lambda

Uma expressão lambda é como um método: ela fornece uma lista de parâmetros formais e um corpo - uma expressão ou bloco - expressos em termos desses parâmetros.

LambdaExpression:

[LambdaParameters](<#/doc/jls/jls-15>) `->` [LambdaBody](<#/doc/jls/jls-15>)

Expressões lambda são sempre poly expressions ([§15.2](<#/doc/jls/jls-15>)).

É um erro em tempo de compilação se uma expressão lambda ocorrer em um programa em outro lugar que não seja um contexto de atribuição ([§5.2](<#/doc/jls/jls-05>)), um contexto de invocação ([§5.3](<#/doc/jls/jls-05>)), ou um contexto de casting ([§5.5](<#/doc/jls/jls-05>)).

A avaliação de uma expressão lambda produz uma instância de uma functional interface ([§9.8](<#/doc/jls/jls-09>)). A avaliação da expressão lambda _não_ causa a execução do corpo da expressão; em vez disso, isso pode ocorrer em um momento posterior, quando um método apropriado da functional interface for invocado.

Aqui estão alguns exemplos de expressões lambda:
```

    () -> {}                // No parameters; result is void
    () -> 42                // No parameters, expression body
    () -> null              // No parameters, expression body
    () -> { return 42; }    // No parameters, block body with return
    () -> { System.gc(); }  // No parameters, void block body

    () -> {                 // Complex block body with returns
      if (true) return 12;
      else {
        int result = 15;
        for (int i = 1; i < 10; i++)
          result *= i;
        return result;
      }
    }

    (int x) -> x+1              // Single declared-type parameter
    (int x) -> { return x+1; }  // Single declared-type parameter
    (x) -> x+1                  // Single inferred-type parameter
    x -> x+1                    // Parentheses optional for
                                // single inferred-type parameter

    (String s) -> s.length()      // Single declared-type parameter
    (Thread t) -> { t.start(); }  // Single declared-type parameter
    s -> s.length()               // Single inferred-type parameter
    t -> { t.start(); }           // Single inferred-type parameter

    (int x, int y) -> x+y  // Multiple declared-type parameters
    (x, y) -> x+y          // Multiple inferred-type parameters
    (x, int y) -> x+y    // Illegal: can't mix inferred and declared types
    (x, final y) -> x+y  // Illegal: no modifiers with inferred types


```

Essa sintaxe tem a vantagem de minimizar o "ruído" de colchetes em torno de expressões lambda simples, o que é especialmente benéfico quando uma expressão lambda é um argumento para um método, ou quando o corpo é outra expressão lambda. Ela também distingue claramente entre suas formas de expressão e de declaração, o que evita ambiguidades ou dependência excessiva de tokens '`;`'. Quando é necessário um agrupamento extra para distinguir visualmente a expressão lambda completa ou sua expressão de corpo, os parênteses são naturalmente suportados (assim como em outros casos em que a precedência do operador não é clara).

A sintaxe apresenta alguns desafios de parsing. A linguagem de programação Java sempre exigiu lookahead arbitrário para distinguir entre tipos e expressões após um token '`(`': o que se segue pode ser um cast ou uma expressão entre parênteses. Isso piorou quando generics reutilizaram os operadores binários '`<`' e '`>`' em tipos. Expressões lambda introduzem uma nova possibilidade: os tokens que seguem '`(`' podem descrever um tipo, uma expressão ou uma lista de parâmetros lambda. Alguns tokens indicam imediatamente uma lista de parâmetros (annotations, `final`); em outros casos, existem certos padrões que devem ser interpretados como listas de parâmetros (dois nomes seguidos, uma '`,`' não aninhada dentro de '`<`' e '`>`'); e, às vezes, a decisão não pode ser tomada até que um '`->`' seja encontrado após um '`)`'. A maneira mais simples de pensar em como isso pode ser analisado eficientemente é com uma máquina de estados: cada estado representa um subconjunto de interpretações possíveis (tipo, expressão ou parâmetros), e quando a máquina transita para um estado em que o conjunto é um singleton, o parser sabe qual caso é. No entanto, isso não se mapeia de forma muito elegante para uma gramática de lookahead fixo.

Não existe uma forma nula especial: uma expressão lambda com zero argumentos é expressa como `() `->` ...`. A sintaxe especial óbvia, `->` ...`, não funciona porque introduz uma ambiguidade entre listas de argumentos e casts: `(x) `->` ...`.

Expressões lambda não podem declarar parâmetros de tipo. Embora fizesse sentido semanticamente fazê-lo, a sintaxe natural (preceder a lista de parâmetros com uma lista de parâmetros de tipo) introduz ambiguidades confusas. Por exemplo, considere:
```

    foo( (x) < y , z > (w) -> v )

```

Isso poderia ser uma invocação de `foo` com um argumento (uma lambda genérica convertida para o tipo `x`), ou poderia ser uma invocação de `foo` com dois argumentos, ambos resultados de comparações, o segundo comparando `z` com uma expressão lambda. (Estritamente falando, uma expressão lambda é sem sentido como operando para o operador relacional `>`, mas essa é uma suposição tênue sobre a qual construir a gramática.)

Existe um precedente para resolução de ambiguidade envolvendo casts, que essencialmente proíbe o uso de `-` e `+` após um cast não primitivo ([§15.15](<#/doc/jls/jls-15>)), mas estender essa abordagem para lambdas genéricas envolveria mudanças invasivas na gramática.

### 15.27.1. Parâmetros Lambda

Os parâmetros formais de uma expressão lambda, se houver, são especificados por uma lista entre parênteses de especificadores de parâmetros normais separados por vírgulas, ou uma lista entre parênteses de especificadores de parâmetros concisos separados por vírgulas, ou um único especificador de parâmetro conciso sem parênteses.

Assim, se a expressão lambda tiver exatamente um parâmetro formal, ele pode ser especificado pela lista singleton `(int x)` ou `(x)`, ou omitindo os parênteses completamente, como `x`.

Um especificador de parâmetro normal consiste em modificadores opcionais, um tipo (ou `var`), e um identificador ou a palavra-chave `_` (underscore). Se um identificador estiver presente, ele especifica o nome do parâmetro formal. Se a palavra-chave `_` estiver presente, o parâmetro formal não pode ser referenciado pelo nome.

Um especificador de parâmetro conciso consiste em um identificador ou na palavra-chave `_`. Se um identificador estiver presente, ele especifica o nome do parâmetro formal. Se a palavra-chave `_` estiver presente, o parâmetro formal não pode ser referenciado pelo nome.

Um parâmetro formal de uma expressão lambda que não pode ser referenciado pelo nome é chamado de _parâmetro lambda sem nome_.

Se uma expressão lambda não tiver parâmetros formais, então um par de parênteses vazio aparece antes de `->` e do corpo da lambda.

LambdaParameters:

`(` [[LambdaParameterList](<#/doc/jls/jls-15>)] `)`
[ConciseLambdaParameter](<#/doc/jls/jls-15>)

LambdaParameterList:

[NormalLambdaParameter](<#/doc/jls/jls-15>) {`,` [NormalLambdaParameter](<#/doc/jls/jls-15>)}
[ConciseLambdaParameter](<#/doc/jls/jls-15>) {`,` [ConciseLambdaParameter](<#/doc/jls/jls-15>)}

NormalLambdaParameter:

{[VariableModifier](<#/doc/jls/jls-08>)} [LambdaParameterType](<#/doc/jls/jls-15>) [VariableDeclaratorId](<#/doc/jls/jls-08>)
[VariableArityParameter](<#/doc/jls/jls-08>)

LambdaParameterType:

[UnannType](<#/doc/jls/jls-08>)
`var`

ConciseLambdaParameter:

[Identifier](<#/doc/jls/jls-03>)
`_`

As seguintes produções de [§8.4.1](<#/doc/jls/jls-08>), [§8.3](<#/doc/jls/jls-08>) e [§4.3](<#/doc/jls/jls-04>) são mostradas aqui para conveniência:

VariableArityParameter:

{[VariableModifier](<#/doc/jls/jls-08>)} [UnannType](<#/doc/jls/jls-08>) {[Annotation](<#/doc/jls/jls-09>)} `...` [Identifier](<#/doc/jls/jls-03>)

VariableModifier:

[Annotation](<#/doc/jls/jls-09>)
`final`

VariableDeclaratorId:

[Identifier](<#/doc/jls/jls-03>) [[Dims](<#/doc/jls/jls-04>)]
`_`

Dims:

{[Annotation](<#/doc/jls/jls-09>)} `[` `]` {{[Annotation](<#/doc/jls/jls-09>)} `[` `]`}

Um parâmetro formal de uma expressão lambda pode ser declarado `final`, ou anotado, somente se especificado por um especificador de parâmetro normal. Se um parâmetro formal for especificado por um especificador formal conciso, então o parâmetro formal não é `final` e não possui annotations.

Um parâmetro formal de uma expressão lambda pode ser um _parâmetro de aridade variável_, indicado por uma elipse após o tipo em um especificador de parâmetro normal. No máximo um parâmetro de aridade variável é permitido para uma expressão lambda. É um erro em tempo de compilação se um parâmetro de aridade variável aparecer em qualquer lugar na lista de especificadores de parâmetros normais, exceto na última posição.

Cada parâmetro formal de uma expressão lambda tem um _tipo inferido_ ou um _tipo declarado_:

*   Se um parâmetro formal for especificado por um especificador de parâmetro normal que usa `var`, ou por um especificador de parâmetro conciso, então o parâmetro formal tem um tipo inferido. O tipo é inferido do tipo da functional interface alvo da expressão lambda ([§15.27.3](<#/doc/jls/jls-15>)).

*   Se um parâmetro formal for especificado por um especificador de parâmetro normal que não usa `var`, então o parâmetro formal tem um tipo declarado. O tipo declarado é determinado da seguinte forma:

    *   Se o parâmetro formal não for um parâmetro de aridade variável, então o tipo declarado é denotado por _UnannType_ se nenhum par de colchetes aparecer em _UnannType_ e _VariableDeclaratorId_, e especificado por [§10.2](<#/doc/jls/jls-10>) caso contrário.

    *   Se o parâmetro formal for um parâmetro de aridade variável, então o tipo declarado é um tipo de array especificado por [§10.2](<#/doc/jls/jls-10>).

Nenhuma distinção é feita entre as seguintes listas de parâmetros lambda:
```

    (int... x) -> BODY
    (int[] x) -> BODY

```

Qualquer um pode ser usado, seja o método `abstract` da functional interface de aridade fixa ou de aridade variável. (Isso é consistente com as regras para sobrescrita de métodos.) Como as expressões lambda nunca são invocadas diretamente, usar `int...` para o parâmetro formal onde a functional interface usa `int[]` não pode ter impacto no programa circundante. Em um corpo lambda, um parâmetro de aridade variável é tratado exatamente como um parâmetro do tipo array.

Uma expressão lambda onde todos os parâmetros formais têm tipos declarados é dita ser _explicitamente tipada_. Uma expressão lambda onde todos os parâmetros formais têm tipos inferidos é dita ser _implicitamente tipada_. Uma expressão lambda sem parâmetros formais é explicitamente tipada.

Se uma expressão lambda for implicitamente tipada, então seu corpo lambda é interpretado de acordo com o contexto em que aparece. Especificamente, os tipos das expressões no corpo, e as checked exceptions lançadas pelo corpo, e a correção de tipo do código no corpo, tudo depende dos tipos inferidos para os parâmetros formais. Isso implica que a inferência dos tipos de parâmetros formais deve ocorrer "antes" de tentar verificar o tipo do corpo lambda.

É um erro em tempo de compilação se uma expressão lambda declarar um parâmetro formal com um tipo declarado _e_ um parâmetro formal com um tipo inferido.

Esta regra impede uma mistura de tipos inferidos e declarados nos parâmetros formais, como `(x, int y) -> BODY` ou `(var x, int y) -> BODY`. Note que se todos os parâmetros formais tiverem tipos inferidos, a gramática impede uma mistura de identificadores e especificadores de parâmetro `var`, como `(x, var y) -> BODY` ou `(var x, y) -> BODY`.

As regras relativas aos modificadores de annotation para uma declaração de parâmetro formal são especificadas em [§9.7.4](<#/doc/jls/jls-09>) e [§9.7.5](<#/doc/jls/jls-09>).

É um erro em tempo de compilação se `final` aparecer mais de uma vez como modificador para uma declaração de parâmetro formal.

É um erro em tempo de compilação se o _LambdaParameterType_ de um parâmetro formal for `var` e o _VariableDeclaratorId_ do mesmo parâmetro formal tiver um ou mais pares de colchetes.

O escopo e o sombreamento de um parâmetro formal são especificados em [§6.3](<#/doc/jls/jls-06>) e [§6.4](<#/doc/jls/jls-06>).

Referências a um parâmetro formal de uma classe ou interface aninhada, ou uma expressão lambda aninhada, são restritas, conforme especificado em [§6.5.6.1](<#/doc/jls/jls-06>).

É um erro em tempo de compilação para uma expressão lambda declarar dois parâmetros formais com o mesmo nome. (Ou seja, suas declarações mencionam o mesmo _Identifier_.)

Note que, em contraste, é possível para uma expressão lambda declarar mais de um parâmetro lambda sem nome, como `(_, _) -> BODY` ou `(String _, int _) -> BODY`.

É um erro em tempo de compilação se um parâmetro formal que é declarado `final` for atribuído dentro do corpo da expressão lambda.

Quando a expressão lambda é invocada (via uma expressão de invocação de método ([§15.12](<#/doc/jls/jls-15>))), os valores das expressões de argumento reais inicializam variáveis de parâmetro recém-criadas, cada uma do tipo declarado ou inferido, antes da execução do corpo lambda. Um _Identifier_ que aparece no _NormalLambdaParameter_ ou _ConciseLambdaParameter_ pode ser usado como um nome simples no corpo lambda para se referir ao parâmetro formal.

### 15.27.2. Corpo Lambda

Um corpo lambda é uma única expressão ou um bloco ([§14.2](<#/doc/jls/jls-14>)). Assim como um corpo de método, um corpo lambda descreve o código que será executado sempre que ocorrer uma invocação.

LambdaBody:

[Expression](<#/doc/jls/jls-15>)
[Block](<#/doc/jls/jls-14>)

Ao contrário do código que aparece em declarações de classes anônimas, o significado dos nomes e das palavras-chave `this` e `super` que aparecem em um corpo lambda, juntamente com a acessibilidade das declarações referenciadas, são os mesmos do contexto circundante (exceto que os parâmetros lambda podem introduzir novos nomes).

A transparência de `this` (tanto explícita quanto implícita) no corpo de uma expressão lambda - ou seja, tratá-la da mesma forma que no contexto circundante - permite mais flexibilidade para as implementações e impede que o significado de nomes não qualificados no corpo dependa da resolução de sobrecarga.

Praticamente falando, é incomum que uma expressão lambda precise falar sobre si mesma (seja para chamar-se recursivamente ou para invocar seus outros métodos), enquanto é mais comum querer usar nomes para se referir a coisas na classe envolvente que de outra forma seriam sombreadas (`this`, `toString()`). Se for necessário que uma expressão lambda se refira a si mesma (como se fosse via `this`), uma referência de método ou uma classe interna anônima deve ser usada em vez disso.

Um corpo lambda de bloco é _void-compatible_ se cada instrução `return` no bloco tiver a forma `return`;`.

Um corpo lambda de bloco é _value-compatible_ se não puder ser concluído normalmente ([§14.22](<#/doc/jls/jls-14>)) e cada instrução `return` no bloco tiver a forma `return` _Expression_`;`.

É um erro em tempo de compilação se um corpo lambda de bloco não for nem void-compatible nem value-compatible.

Em um corpo lambda de bloco value-compatible, as _expressões de resultado_ são quaisquer expressões que podem produzir o valor de uma invocação. Especificamente, para cada instrução na forma `return` _Expression_ `;` contida pelo corpo, a _Expression_ é uma expressão de resultado.

Os seguintes corpos lambda são void-compatible:
```

    () -> {}
    () -> { System.out.println("done"); }

```

Estes são value-compatible:
```

    () -> { return "done"; }
    () -> { if (...) return 1; else return 0; }

```

Estes são ambos:
```

    () -> { throw new RuntimeException(); }
    () -> { while (true); }

```

Este não é nenhum dos dois:
```

    () -> { if (...) return "done"; System.out.println("done"); }

```

O tratamento de void/value-compatible e o significado dos nomes no corpo servem conjuntamente para minimizar a dependência de um tipo de destino particular no contexto dado, o que é útil tanto para implementações quanto para a compreensão do programador. Embora as expressões possam receber tipos diferentes durante a resolução de sobrecarga, dependendo do tipo de destino, o significado dos nomes não qualificados e a estrutura básica do corpo lambda não mudam.

Note que a definição void/value-compatible não é uma propriedade estritamente estrutural: "pode ser concluída normalmente" depende dos valores de expressões constantes, e estas podem incluir nomes que referenciam variáveis constantes.

Qualquer variável local, parâmetro formal ou parâmetro de exceção usado, mas não declarado em uma expressão lambda, deve ser `final` ou efetivamente final ([§4.12.4](<#/doc/jls/jls-04>)), conforme especificado em [§6.5.6.1](<#/doc/jls/jls-06>).

Qualquer variável local usada, mas não declarada em um corpo lambda, deve ser definitivamente atribuída ([§16 (_Atribuição Definida_)](<#/doc/jls/jls-16>)) antes do corpo lambda, ou ocorre um erro em tempo de compilação.

Regras semelhantes sobre o uso de variáveis se aplicam no corpo de uma inner class ([§8.1.3](<#/doc/jls/jls-08>)). A restrição a variáveis efetivamente final proíbe o acesso a variáveis locais que mudam dinamicamente, cuja captura provavelmente introduziria problemas de concorrência. Comparado à restrição `final`, ela reduz a carga burocrática sobre os programadores.

A restrição a variáveis efetivamente final inclui variáveis de loop padrão, mas não variáveis de loop enhanced-`for`, que são tratadas como distintas para cada iteração do loop ([§14.14.2](<#/doc/jls/jls-14>)).

Os seguintes corpos lambda demonstram o uso de variáveis efetivamente final.
```

    void m1(int x) {
        int y = 1;
        foo(() -> x+y);
        // Legal: x and y are both effectively final.
    }

    void m2(int x) {
        int y;
        y = 1;
        foo(() -> x+y);
        // Legal: x and y are both effectively final.
    }

    void m3(int x) {
        int y;
        if (...) y = 1;
        foo(() -> x+y);
        // Illegal: y is effectively final, but not definitely assigned.
    }

    void m4(int x) {
        int y;
        if (...) y = 1; else y = 2;
        foo(() -> x+y);
        // Legal: x and y are both effectively final.
    }


```
```

    void m5(int x) {
        int y;
        if (...) y = 1;
        y = 2;
        foo(() -> x+y);
        // Illegal: y is not effectively final.
    }

    void m6(int x) {
        foo(() -> x+1);
        x++;
        // Illegal: x is not effectively final.
    }

    void m7(int x) {
        foo(() -> x=1);
        // Illegal: x is not effectively final.
    }

    void m8() {
        int y;
        foo(() -> y=1);
        // Illegal: y is not definitely assigned before the lambda.
    }

    void m9(String[] arr) {
        for (String s : arr) {
            foo(() -> s);
            // Legal: s is effectively final
            // (it is a new variable on each iteration)
        }
    }

    void m10(String[] arr) {
        for (int i = 0; i < arr.length; i++) {
            foo(() -> arr[i]);
            // Illegal: i is not effectively final
            // (it is not final, and is incremented)
        }
    }


```

### 15.27.3. Tipo de uma Expressão Lambda

Uma expressão lambda é compatível em um contexto de atribuição, contexto de invocação ou contexto de casting com um tipo de destino T se T for um tipo de functional interface ([§9.8](<#/doc/jls/jls-09>)) e a expressão for _congruente_ com o tipo de função do _ground target type_ derivado de T.

O _ground target type_ é derivado de T da seguinte forma:

*   Se T for um tipo de functional interface parametrizado por wildcard e a expressão lambda for explicitamente tipada, então o ground target type é inferido conforme descrito em [§18.5.3](<#/doc/jls/jls-18>).

*   Se T for um tipo de functional interface parametrizado por wildcard e a expressão lambda for implicitamente tipada, então o ground target type é a parametrização sem wildcard ([§9.9](<#/doc/jls/jls-09>)) de T.

*   Caso contrário, o ground target type é T.

Uma expressão lambda é _congruente_ com um tipo de função se todas as seguintes condições forem verdadeiras:

*   O tipo de função não tem parâmetros de tipo.

*   O número de parâmetros lambda é o mesmo que o número de tipos de parâmetros do tipo de função.

*   Se a expressão lambda for explicitamente tipada, seus tipos de parâmetros formais são os mesmos que os tipos de parâmetros do tipo de função.

*   Se os parâmetros lambda forem assumidos como tendo os mesmos tipos que os tipos de parâmetros do tipo de função, então:

    *   Se o resultado do tipo de função for `void`, o corpo lambda é uma statement expression ([§14.8](<#/doc/jls/jls-14>)) ou um bloco `void`-compatible.

    *   Se o resultado do tipo de função for um tipo R (não-`void`), então (i) o corpo lambda é uma expressão compatível com R em um contexto de atribuição, ou (ii) o corpo lambda é um bloco value-compatible, e cada expressão de resultado ([§15.27.2](<#/doc/jls/jls-15>)) é compatível com R em um contexto de atribuição.

Se uma expressão lambda for compatível com um tipo de destino T, então o tipo da expressão, U, é o ground target type derivado de T.

É um erro em tempo de compilação se qualquer classe ou interface mencionada por U ou pelo tipo de função de U não for acessível ([§6.6](<#/doc/jls/jls-06>)) da classe ou interface em que a expressão lambda aparece.

Para cada método membro não-`static` `m` de U, se o tipo de função de U tiver uma subassinatura da assinatura de `m`, então um método nocional cujo tipo de método é o tipo de função de U é considerado para sobrescrever `m`, e qualquer erro em tempo de compilação ou aviso não verificado especificado em [§8.4.8.3](<#/doc/jls/jls-08>) pode ocorrer.

Uma checked exception que pode ser lançada no corpo da expressão lambda pode causar um erro em tempo de compilação, conforme especificado em [§11.2.3](<#/doc/jls/jls-11>).

Os tipos de parâmetros de lambdas explicitamente tipadas são exigidos para corresponder exatamente aos do tipo de função. Embora fosse possível ser mais flexível - permitir boxing ou contravariância, por exemplo - esse tipo de generalidade parece desnecessário e é inconsistente com a forma como a sobrescrita funciona em declarações de classe. Um programador deve saber exatamente qual tipo de função está sendo visado ao escrever uma expressão lambda, então o programador deve saber exatamente qual assinatura deve ser sobrescrita. (Este não é o caso para referências de método, então mais flexibilidade é permitida quando elas são usadas.) Além disso, mais flexibilidade com os tipos de parâmetros aumentaria a complexidade da inferência de tipos e da resolução de sobrecarga.

Note que, embora o boxing não seja permitido em um contexto de invocação estrito, o boxing de expressões de resultado lambda é _sempre_ permitido - ou seja, a expressão de resultado aparece em um contexto de atribuição, independentemente do contexto que envolve a expressão lambda. No entanto, se uma expressão lambda explicitamente tipada for um argumento para um método sobrecarregado, uma assinatura de método que evita o boxing ou unboxing do resultado lambda é preferida pela verificação mais específica ([§15.12.2.5](<#/doc/jls/jls-15>)).

Se o corpo de uma lambda for uma statement expression (ou seja, uma expressão que seria permitida sozinha como uma instrução), ela é compatível com um tipo de função que produz `void`; qualquer resultado é simplesmente descartado. Assim, por exemplo, ambos os seguintes são legais:
```

    // Predicate has a boolean result
    java.util.function.Predicate<String> p = s -> list.add(s);
    // Consumer has a void result
    java.util.function.Consumer<String> c = s -> list.add(s);

```

De modo geral, uma lambda na forma `(`)` `->` _expr_, onde _expr_ é uma statement expression, é interpretada como `(`)` `->` `{` `return` _expr_`;` `}` ou `(`)` `->` `{` _expr_`;` `}`, dependendo do tipo de destino.

### 15.27.4. Avaliação em Tempo de Execução de Expressões Lambda

Em tempo de execução, a avaliação de uma expressão lambda é semelhante à avaliação de uma expressão de criação de instância de classe, na medida em que a conclusão normal produz uma referência a um objeto. A avaliação de uma expressão lambda é distinta da execução do corpo lambda.

Uma nova instância de uma classe com as propriedades abaixo é alocada e inicializada, ou uma instância existente de uma classe com as propriedades abaixo é referenciada. Se uma nova instância for criada, mas não houver espaço suficiente para alocar o objeto, a avaliação da expressão lambda é concluída abruptamente lançando um `OutOfMemoryError`.

Isso implica que a identidade do resultado da avaliação de uma expressão lambda (ou da serialização e desserialização de uma expressão lambda) é imprevisível e, portanto, operações sensíveis à identidade (como igualdade de referência ([§15.21.3](<#/doc/jls/jls-15>)), bloqueio de objeto ([§14.19](<#/doc/jls/jls-14>)) e o método `System.identityHashCode`) podem produzir resultados diferentes em diferentes implementações da linguagem de programação Java, ou mesmo em diferentes avaliações de expressões lambda na mesma implementação.

O valor de uma expressão lambda é uma referência a uma instância de uma classe com as seguintes propriedades:

*   A classe implementa o tipo de functional interface alvo e, se o tipo de destino for um tipo de interseção, todos os outros tipos de interface mencionados na interseção.

*   Onde a expressão lambda tem o tipo U, para cada método membro não-`static` `m` de U:

    Se o tipo de função de U tiver uma subassinatura da assinatura de `m`, então a classe declara um método que sobrescreve `m`. O corpo do método tem o efeito de avaliar o corpo lambda, se for uma expressão, ou de executar o corpo lambda, se for um bloco; se um resultado for esperado, ele é retornado do método.

    Se a erasure do tipo de um método sendo sobrescrito difere em sua assinatura da erasure do tipo de função de U, então, antes de avaliar ou executar o corpo lambda, o corpo do método verifica se cada valor de argumento é uma instância de uma subclasse ou subinterface da erasure do tipo de parâmetro correspondente no tipo de função de U; caso contrário, uma `ClassCastException` é lançada.

*   A classe não sobrescreve nenhum outro método do tipo de functional interface alvo ou outros tipos de interface mencionados acima, embora possa sobrescrever métodos da classe `Object`.

Essas regras visam oferecer flexibilidade às implementações da linguagem de programação Java, no sentido de que:

*   Um novo objeto não precisa ser alocado em cada avaliação.

*   Objetos produzidos por diferentes expressões lambda não precisam pertencer a classes diferentes (se os corpos forem idênticos, por exemplo).

*   Cada objeto produzido pela avaliação não precisa pertencer à mesma classe (variáveis locais capturadas podem ser inlined, por exemplo).

*   Se uma "instância existente" estiver disponível, ela não precisa ter sido criada em uma avaliação lambda anterior (ela pode ter sido alocada durante a inicialização da classe envolvente, por exemplo).

Se o tipo de functional interface alvo for um subtipo de `java.io.Serializable`, o objeto resultante será automaticamente uma instância de uma classe serializável. Tornar um objeto derivado de uma expressão lambda serializável pode ter sobrecarga extra em tempo de execução e implicações de segurança, portanto, objetos derivados de lambda não são obrigados a ser serializáveis "por padrão".
## 15.28. `switch` Expressions

Uma `switch` expression transfere o controle para uma de várias declarações ou expressões, dependendo do valor de uma expressão; todos os valores possíveis dessa expressão devem ser tratados, e todas as várias declarações e expressões devem produzir um valor para o resultado da `switch` expression.

SwitchExpression:

`switch` `(` [Expression](<#/doc/jls/jls-15>) `)` [SwitchBlock](<#/doc/jls/jls-14>)

A _Expression_ é chamada de _selector expression_. O tipo da selector expression deve ser `char`, `byte`, `short`, `int`, ou um tipo de referência, ou ocorre um erro em tempo de compilação.

O corpo tanto de uma `switch` expression quanto de uma `switch` statement ([§14.11](<#/doc/jls/jls-14>)) é chamado de _switch block_. Regras gerais que se aplicam a todos os switch blocks, quer apareçam em `switch` expressions ou `switch` statements, são dadas em [§14.11.1](<#/doc/jls/jls-14>). As seguintes produções de [§14.11.1](<#/doc/jls/jls-14>) são mostradas aqui para conveniência:

SwitchBlock:

`{` [SwitchRule](<#/doc/jls/jls-14>) {[SwitchRule](<#/doc/jls/jls-14>)} `}`   
`{` {[SwitchBlockStatementGroup](<#/doc/jls/jls-14>)} {[SwitchLabel](<#/doc/jls/jls-14>) `:`} `}`

SwitchRule:

[SwitchLabel](<#/doc/jls/jls-14>) `->` [Expression](<#/doc/jls/jls-15>) `;`   
[SwitchLabel](<#/doc/jls/jls-14>) `->` [Block](<#/doc/jls/jls-14>)   
[SwitchLabel](<#/doc/jls/jls-14>) `->` [ThrowStatement](<#/doc/jls/jls-14>)

SwitchBlockStatementGroup:

[SwitchLabel](<#/doc/jls/jls-14>) `:` {[SwitchLabel](<#/doc/jls/jls-14>) `:`} [BlockStatements](<#/doc/jls/jls-14>)

SwitchLabel:

`case` [CaseConstant](<#/doc/jls/jls-14>) {`,` [CaseConstant](<#/doc/jls/jls-14>)}   
`case` `null` [`,` `default`]   
`case` [CasePattern](<#/doc/jls/jls-14>) {`,` [CasePattern](<#/doc/jls/jls-14>)} [[Guard](<#/doc/jls/jls-14>)]   
`default`

CaseConstant:

[ConditionalExpression](<#/doc/jls/jls-15>)

CasePattern:

[Pattern](<#/doc/jls/jls-14>)

Guard:

`when` [Expression](<#/doc/jls/jls-15>)

### 15.28.1. O Switch Block de uma `switch` Expression

Além das regras gerais para switch blocks ([§14.11.1](<#/doc/jls/jls-14>)), existem regras adicionais para switch blocks em `switch` expressions.

É um erro em tempo de compilação se o switch block de uma `switch` expression consistir em switch rules, mas um ou mais switch rule blocks puderem ser concluídos normalmente ([§14.22](<#/doc/jls/jls-14>)).

É um erro em tempo de compilação se o switch block de uma `switch` expression consistir em switch labeled statement groups, mas a última declaração no switch block puder ser concluída normalmente, ou o switch block tiver um ou mais switch labels após o último switch labeled statement group.

É um erro em tempo de compilação se uma `switch` expression não for exaustiva ([§14.11.1.1](<#/doc/jls/jls-14>)).

`switch` expressions diferem de `switch` statements em termos de quais expressões podem aparecer à direita de uma seta (`->`) no switch block, ou seja, quais expressões podem ser usadas como _switch rule expressions_. Em uma `switch` expression, qualquer expressão pode ser usada como uma switch rule expression, mas em uma `switch` statement, apenas uma statement expression pode ser usada ([§14.11.1](<#/doc/jls/jls-14>)).

As _result expressions_ de uma `switch` expression são determinadas da seguinte forma:

  * Se o switch block consistir em switch rules, então cada switch rule é considerada por sua vez:

    * Se a switch rule for da forma `...` `->` _Expression_ `;` então _Expression_ é uma result expression da `switch` expression.

    * Se a switch rule for da forma `...` `->` _Block_ então toda expressão que está imediatamente contida em uma `yield` statement em _Block_ cujo yield target é a `switch` expression dada, é uma result expression da `switch` expression.

  * Se o switch block consistir em switch labeled statement groups, então toda expressão imediatamente contida em uma `yield` statement no switch block cujo yield target é a `switch` expression dada, é uma result expression da `switch` expression.

É um erro em tempo de compilação se uma `switch` expression não tiver result expressions.

Uma `switch` expression é uma poly expression se aparecer em um assignment context ou um invocation context ([§5.2](<#/doc/jls/jls-05>), [§5.3](<#/doc/jls/jls-05>)). Caso contrário, é uma standalone expression.

Onde uma poly `switch` expression aparece em um contexto de um tipo particular com target type T, suas result expressions aparecem similarmente em um contexto do mesmo tipo com target type T.

Uma poly `switch` expression é compatível com um target type T se cada uma de suas result expressions for compatível com T.

O tipo de uma poly `switch` expression é o mesmo que seu target type.

O tipo de uma standalone `switch` expression é determinado da seguinte forma:

  * Se todas as result expressions tiverem o mesmo tipo (que pode ser o null type ([§4.1](<#/doc/jls/jls-04>))), então esse é o tipo da `switch` expression.

  * Caso contrário, se o tipo de cada result expression for `boolean` ou `Boolean`, então uma unboxing conversion ([§5.1.8](<#/doc/jls/jls-05>)) é aplicada a cada result expression do tipo `Boolean`, e a `switch` expression tem o tipo `boolean`.

  * Caso contrário, se o tipo de cada result expression for conversível para um tipo numérico ([§5.1.8](<#/doc/jls/jls-05>)), então o tipo da `switch` expression é o resultado da general numeric promotion ([§5.6](<#/doc/jls/jls-05>)) aplicada às result expressions.

  * Caso contrário, boxing conversion ([§5.1.7](<#/doc/jls/jls-05>)) é aplicada a cada result expression que tem um tipo primitivo, após o que o tipo da `switch` expression é o resultado da aplicação de capture conversion ([§5.1.10](<#/doc/jls/jls-05>)) ao least upper bound ([§4.10.4](<#/doc/jls/jls-04>)) dos tipos das result expressions.

### 15.28.2. Avaliação em Tempo de Execução de `switch` Expressions

Uma `switch` expression é avaliada primeiro avaliando a selector expression. Se a avaliação da selector expression for concluída abruptamente, então a avaliação de toda a `switch` expression é concluída abruptamente pela mesma razão.

Se a avaliação da selector expression for concluída normalmente, então a avaliação da `switch` expression continua determinando se um switch label associado ao switch block se aplica ao valor da selector expression ([§14.11.1.2](<#/doc/jls/jls-14>)). Então:

  * Se o processo de determinar qual switch label se aplica for concluído abruptamente, então toda a `switch` expression é concluída abruptamente pela mesma razão.

  * Se nenhum switch label se aplicar, então uma das seguintes condições é verdadeira:

    * Se o valor da selector expression for `null`, então uma `NullPointerException` é lançada e a avaliação da `switch` expression é concluída abruptamente por essa razão.

    * Caso contrário, uma `MatchException` é lançada e a avaliação da `switch` expression é concluída abruptamente por essa razão.

  * Se um switch label se aplicar, então uma das seguintes condições é verdadeira:

    * Se for o switch label para uma switch rule expression, então a expressão é avaliada. Se o resultado da avaliação for um valor, então a `switch` expression é concluída normalmente com o mesmo valor.

    * Se for o switch label para um switch rule block, então o block é executado. Se este block for concluído normalmente, então a `switch` expression é concluída normalmente.

    * Se for o switch label para uma switch rule `throw` statement, então a `throw` statement é executada.

    * Caso contrário, todas as statements no switch block após o switch label que se aplica são executadas em ordem. Se essas statements forem concluídas normalmente, então a `switch` expression é concluída normalmente.

Se a execução de qualquer statement ou expression no switch block for concluída abruptamente, ela é tratada da seguinte forma:

  * Se a avaliação de uma expression for concluída abruptamente, então a avaliação da `switch` expression é concluída abruptamente pela mesma razão.

  * Se a execução de uma statement for concluída abruptamente por causa de um `yield` com o valor V, então a avaliação da `switch` expression é concluída normalmente e o valor da `switch` expression é V.

  * Se a execução de uma statement for concluída abruptamente por qualquer outra razão que não seja um `yield` com um valor, então a avaliação da `switch` expression é concluída abruptamente pela mesma razão.

## 15.29. Constant Expressions

Uma _constant expression_ é uma expressão que denota um valor de tipo primitivo ou uma `String` que não é concluída abruptamente e é composta usando apenas o seguinte:

  * Literais de tipo primitivo ([§3.10.1](<#/doc/jls/jls-03>), [§3.10.2](<#/doc/jls/jls-03>), [§3.10.3](<#/doc/jls/jls-03>), [§3.10.4](<#/doc/jls/jls-03>)), string literals ([§3.10.5](<#/doc/jls/jls-03>)), e text blocks ([§3.10.6](<#/doc/jls/jls-03>))

  * Casts para tipos primitivos e casts para o tipo `String` ([§15.16](<#/doc/jls/jls-15>))

  * Os operadores unários `+`, `-`, `~`, e `!` (mas não `++` ou `--`) ([§15.15.3](<#/doc/jls/jls-15>), [§15.15.4](<#/doc/jls/jls-15>), [§15.15.5](<#/doc/jls/jls-15>), [§15.15.6](<#/doc/jls/jls-15>))

  * Os operadores multiplicativos `*`, `/`, e `%` ([§15.17](<#/doc/jls/jls-15>))

  * Os operadores aditivos `+` e `-` ([§15.18](<#/doc/jls/jls-15>))

  * Os operadores de deslocamento `<<`, `>>`, e `>>>` ([§15.19](<#/doc/jls/jls-15>))

  * Os operadores relacionais `<`, `<=`, `>`, e `>=` (mas não `instanceof`) ([§15.20](<#/doc/jls/jls-15>))

  * Os operadores de igualdade `==` e `!=` ([§15.21](<#/doc/jls/jls-15>))

  * Os operadores bitwise e lógicos `&`, `^`, e `|` ([§15.22](<#/doc/jls/jls-15>))

  * O operador condicional-e `&&` e o operador condicional-ou `||` ([§15.23](<#/doc/jls/jls-15>), [§15.24](<#/doc/jls/jls-15>))

  * O operador condicional ternário `? :` ([§15.25](<#/doc/jls/jls-15>))

  * Expressões entre parênteses ([§15.8.5](<#/doc/jls/jls-15>)) cuja expressão contida é uma constant expression.

  * Nomes simples ([§6.5.6.1](<#/doc/jls/jls-06>)) que se referem a constant variables ([§4.12.4](<#/doc/jls/jls-04>)).

  * Nomes qualificados ([§6.5.6.2](<#/doc/jls/jls-06>)) da forma _TypeName_ `.` _Identifier_ que se referem a constant variables ([§4.12.4](<#/doc/jls/jls-04>)).

Constant expressions do tipo `String` são sempre "interned" para compartilhar instâncias únicas, usando o método `String.intern`.

Constant expressions são usadas como `case` labels em `switch` statements e `switch` expressions ([§14.11](<#/doc/jls/jls-14>), [§15.28](<#/doc/jls/jls-15>)) e têm um significado especial em assignment contexts ([§5.2](<#/doc/jls/jls-05>)) e na inicialização de uma class ou interface ([§12.4.2](<#/doc/jls/jls-12>)). Elas também podem governar a capacidade de uma `while`, `do`, ou `for` statement de ser concluída normalmente ([§14.22](<#/doc/jls/jls-14>)), e o tipo de um operador condicional `? :` com operandos numéricos.

**Example 15.29-1. Constant Expressions**
```
    true
    (short)(1*2*3*4*5*6)
    Integer.MAX_VALUE / 2
    2.0 * Math.PI
    "The integer " + Long.MAX_VALUE + " is mighty big."

```

* * *

[Prev](<#/doc/jls/jls-14>) | | [Next](<#/doc/jls/jls-16>)
---|---|---
Chapter 14. Blocks, Statements, and Patterns | [Home](<#/doc/jls/jls-01>) | Chapter 16. Definite Assignment

* * *

[ Legal Notice ](<#/>)