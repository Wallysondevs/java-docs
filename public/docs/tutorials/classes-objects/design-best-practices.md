# Quando Usar Classes Aninhadas, Classes Locais, Classes Anônimas e Expressões Lambda

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Classes e Objetos ](<#/doc/tutorials/classes-objects>) > Quando Usar Classes Aninhadas, Classes Locais, Classes Anônimas e Expressões Lambda

**Anterior na Série**

[Enums](<#/doc/tutorials/classes-objects/enums>)

➜

**Tutorial Atual**

Quando Usar Classes Aninhadas, Classes Locais, Classes Anônimas e Expressões Lambda

➜

Este é o fim da série!

**Anterior na Série:** [Enums](<#/doc/tutorials/classes-objects/enums>)

# Quando Usar Classes Aninhadas, Classes Locais, Classes Anônimas e Expressões Lambda

## Escolhendo Entre Classes Aninhadas, Classes Locais, Classes Anônimas e Expressões Lambda

Conforme mencionado na seção Classes Aninhadas, as classes aninhadas permitem agrupar logicamente classes que são usadas apenas em um lugar, aumentar o uso da encapsulação e criar um código mais legível e fácil de manter. Classes locais, classes anônimas e expressões lambda também conferem essas vantagens; no entanto, elas são destinadas a serem usadas em situações mais específicas:

  1. Classe local: Use-a se precisar criar mais de uma instância de uma classe, acessar seu construtor ou introduzir um novo tipo nomeado (porque, por exemplo, você precisa invocar métodos adicionais mais tarde).
  2. Classe anônima: Use-a se precisar declarar campos ou métodos adicionais.
  3. Expressão lambda:
  * Use-a se estiver encapsulando uma única unidade de comportamento que deseja passar para outro código. Por exemplo, você usaria uma expressão lambda se quisesse que uma determinada ação fosse executada em cada elemento de uma coleção, quando um processo é concluído ou quando um processo encontra um erro.
  * Use-a se precisar de uma instância simples de uma interface funcional e nenhum dos critérios anteriores se aplicar (por exemplo, você não precisa de um construtor, um tipo nomeado, campos ou métodos adicionais).
  4. Classe aninhada: Use-a se seus requisitos forem semelhantes aos de uma classe local, você quiser tornar o tipo mais amplamente disponível e não precisar de acesso a variáveis locais ou parâmetros de método.
  5. Use uma classe aninhada não estática (ou classe interna) se precisar de acesso aos campos e métodos não públicos de uma instância envolvente. Use uma classe aninhada estática se não precisar desse acesso.

### Neste tutorial

Escolhendo Entre Classes Aninhadas, Classes Locais, Classes Anônimas e Expressões Lambda

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Enums](<#/doc/tutorials/classes-objects/enums>)

➜

**Tutorial Atual**

Quando Usar Classes Aninhadas, Classes Locais, Classes Anônimas e Expressões Lambda

➜

Este é o fim da série!

**Anterior na Série:** [Enums](<#/doc/tutorials/classes-objects/enums>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Classes e Objetos ](<#/doc/tutorials/classes-objects>) > Quando Usar Classes Aninhadas, Classes Locais, Classes Anônimas e Expressões Lambda