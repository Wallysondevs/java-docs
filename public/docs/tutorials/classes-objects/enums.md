# Enums

[Home](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Classes e Objetos ](<#/doc/tutorials/classes-objects>) > Enums

**Anterior na Série**

[Classes Aninhadas](<#/doc/tutorials/classes-objects/nested-classes>)

➜

**Tutorial Atual**

Enums

➜

**Próximo na Série**

[Quando Usar Classes Aninhadas, Classes Locais, Classes Anônimas e Expressões Lambda](<#/doc/tutorials/classes-objects/design-best-practices>)

**Anterior na Série:** [Classes Aninhadas](<#/doc/tutorials/classes-objects/nested-classes>)

**Próximo na Série:** [Quando Usar Classes Aninhadas, Classes Locais, Classes Anônimas e Expressões Lambda](<#/doc/tutorials/classes-objects/design-best-practices>)

# Enums

Esta página foi contribuída por [Daniel Schmid](</author/DanielSchmid>) sob a [UPL](<https://oss.oracle.com/licenses/upl/>)

## O que são enums?

Enums são classes onde todas as instâncias são conhecidas pelo compilador. Elas são usadas para criar tipos que podem ter apenas alguns valores possíveis.

Enums podem ser criadas de forma similar a classes, mas usam a palavra-chave `enum` em vez de `class`. No corpo, há uma lista de instâncias do enum chamadas constantes enum, que são separadas por `,`. Nenhuma instância do enum pode ser criada fora das constantes enum.

Todos os enums estendem implicitamente [`java.lang.Enum`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Enum.html>) e não podem ter subclasses nomeadas.

## Acessando, avaliando e comparando enums

Os valores de um enum podem ser usados como constantes. Para verificar se duas instâncias de um enum são as mesmas, o operador `==` pode ser usado.

Também é possível usar `switch` para realizar ações dependendo do valor do enum.

Com [switch expressions](<#/doc/tutorials/language-basics/switch-expression>), o compilador pode verificar se todos os valores do enum são tratados. Se algum valor possível estiver faltando em uma switch expression, haverá um erro de compilação. Isso é conhecido como Exaustividade e também pode ser alcançado com classes regulares através de [JEP 409: Sealed Classes](<https://openjdk.org/jeps/409>) e [pattern matching](<#/doc/tutorials/pattern-matching>).

## Adicionando membros a enums

Assim como classes, enums podem ter construtores, métodos e campos. Para adicioná-los, é necessário adicionar um `;` após a lista de constantes enum. Os argumentos para o construtor são passados entre parênteses após a declaração da constante enum.

## Métodos especiais

Todos os enums possuem alguns métodos que são adicionados implicitamente.

Por exemplo, o método `name()` está presente em todas as instâncias de enum e pode ser usado para obter o nome da constante enum. Similarmente, um método chamado `ordinal()` retorna a posição da constante enum na declaração.

Além dos métodos de instância, também há métodos estáticos adicionados a todos os enums. O método `values()` retorna um array contendo todas as instâncias do enum e o método `valueOf(String)` pode ser usado para obter uma instância específica pelo seu nome.

Além disso, enums implementam a interface [`Comparable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Comparable.html>). Por padrão, enums são ordenados de acordo com seu número ordinal, ou seja, na ordem de ocorrência da constante enum. Isso permite comparar instâncias de enums, bem como ordenar ou pesquisar.

## Usando enums como singletons

Como enums podem ter apenas um número específico de instâncias, é possível criar um singleton criando um enum com apenas uma única constante enum.

## Métodos abstratos em enums

Embora enums não possam ser estendidos, eles ainda podem ter métodos `abstract`. Nesse caso, uma implementação deve estar presente em cada constante enum.

## Precauções

Deve-se ter cuidado ao usar enums onde o número (ou nomes) de instâncias está sujeito a alterações. Sempre que as constantes enum são alteradas, outro código que espera a versão antiga do enum pode não funcionar como esperado. Isso pode se manifestar em erros de compilação (por exemplo, ao referenciar uma constante enum removida), erros de tempo de execução (por exemplo, se houver um caso `default` mesmo que a nova constante enum deva ser tratada separadamente) ou outras inconsistências (por exemplo, se o valor do enum foi salvo em um arquivo que é então lido e espera que esse valor ainda exista).

Ao alterar constantes enum, é recomendável revisar todo o código que usa o enum. Isso é especialmente importante em casos onde o enum também é usado pelo código de outras pessoas.

Além disso, pode valer a pena considerar o uso de outras opções no caso de muitas instâncias, já que listar muitas instâncias em um único local no código pode ser inflexível. Por exemplo, pode ser melhor usar um arquivo de configuração para listar todas as instâncias e ler esses arquivos de configuração no programa em casos como este.

## Conclusão

Enums fornecem uma maneira simples e segura de representar um conjunto fixo de constantes, mantendo a maioria das flexibilidades das classes. Eles são um tipo especial de classe que pode ser usado para escrever código elegante, legível, de fácil manutenção e que funciona bem com outros recursos modernos do Java, como [switch expressions](<#/doc/tutorials/language-basics/switch-expression>). Outra classe especial é a classe [`Record`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Record.html>) adicionada no Java 16. Você pode visitar nossa [seção de Records](<#/doc/tutorials/records>) para saber mais.

Para saber mais sobre enums, visite o javadoc de [`java.lang.Enum`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Enum.html>).

### Neste tutorial

O que são enums? Acessando, avaliando e comparando enums Adicionando membros a enums Métodos especiais Usando enums como singletons Métodos abstratos em enums Precauções Conclusão

Última atualização: 8 de julho de 2024

**Anterior na Série**

[Classes Aninhadas](<#/doc/tutorials/classes-objects/nested-classes>)

➜

**Tutorial Atual**

Enums

➜

**Próximo na Série**

[Quando Usar Classes Aninhadas, Classes Locais, Classes Anônimas e Expressões Lambda](<#/doc/tutorials/classes-objects/design-best-practices>)

**Anterior na Série:** [Classes Aninhadas](<#/doc/tutorials/classes-objects/nested-classes>)

**Próximo na Série:** [Quando Usar Classes Aninhadas, Classes Locais, Classes Anônimas e Expressões Lambda](<#/doc/tutorials/classes-objects/design-best-practices>)

[Home](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Classes e Objetos ](<#/doc/tutorials/classes-objects>) > Enums