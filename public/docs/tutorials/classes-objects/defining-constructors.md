# Fornecendo Construtores para suas Classes

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Classes e Objetos ](<#/doc/tutorials/classes-objects>) > Fornecendo Construtores para suas Classes

**Anterior na Série**

[Definindo Métodos](<#/doc/tutorials/classes-objects/defining-methods>)

➜

**Tutorial Atual**

Fornecendo Construtores para suas Classes

➜

**Próximo na Série**

[Chamando Métodos e Construtores](<#/doc/tutorials/classes-objects/calling-methods-constructors>)

**Anterior na Série:** [Definindo Métodos](<#/doc/tutorials/classes-objects/defining-methods>)

**Próximo na Série:** [Chamando Métodos e Construtores](<#/doc/tutorials/classes-objects/calling-methods-constructors>)

# Fornecendo Construtores para suas Classes

## Definindo um Construtor

Uma classe contém construtores que são invocados para criar objetos a partir do "blueprint" da classe. As declarações de construtores se parecem com declarações de métodos — exceto que eles usam o nome da classe e não têm tipo de retorno. Por exemplo, `Bicycle` tem um construtor:

Para criar um novo objeto `Bicycle` chamado `myBike`, um construtor é chamado pelo operador `new`:

```java
Bicycle myBike = new Bicycle(30, 0, 8);
```

O código `new Bicycle(30, 0, 8)` cria espaço na memória para o objeto e inicializa seus campos.

Embora `Bicycle` tenha apenas um construtor, ela poderia ter outros, incluindo um construtor sem argumentos:

O código `Bicycle yourBike = new Bicycle();` invoca o construtor sem argumentos para criar um novo objeto `Bicycle` chamado `yourBike`.

Ambos os construtores poderiam ter sido declarados em `Bicycle` porque eles têm listas de argumentos diferentes. Assim como nos métodos, a plataforma Java diferencia construtores com base no número de argumentos na lista e seus tipos. Você não pode escrever dois construtores que tenham o mesmo número e tipo de argumentos para a mesma classe, porque o compiler não seria capaz de distingui-los. Fazer isso causa um erro em tempo de compilação.

Você não precisa fornecer nenhum construtor para sua classe, mas deve ter cuidado ao fazer isso. O compiler fornece automaticamente um construtor padrão sem argumentos para qualquer classe sem construtores. Este construtor padrão chamará o construtor sem argumentos da superclass. Nesta situação, o compiler reclamará se a superclass não tiver um construtor sem argumentos, então você deve verificar se ela tem. Se sua classe não tiver uma superclass explícita, então ela tem uma superclass implícita de `Object`, que possui um construtor sem argumentos.

Você pode usar um construtor de superclass você mesmo. A classe `MountainBike` no início desta lição fez exatamente isso.

Você pode usar access modifiers na declaração de um construtor para controlar quais outras classes podem chamar o construtor.

### Neste tutorial

Definindo um Construtor

Última atualização: 5 de janeiro de 2024

**Anterior na Série**

[Definindo Métodos](<#/doc/tutorials/classes-objects/defining-methods>)

➜

**Tutorial Atual**

Fornecendo Construtores para suas Classes

➜

**Próximo na Série**

[Chamando Métodos e Construtores](<#/doc/tutorials/classes-objects/calling-methods-constructors>)

**Anterior na Série:** [Definindo Métodos](<#/doc/tutorials/classes-objects/defining-methods>)

**Próximo na Série:** [Chamando Métodos e Construtores](<#/doc/tutorials/classes-objects/calling-methods-constructors>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Classes e Objetos ](<#/doc/tutorials/classes-objects>) > Fornecendo Construtores para suas Classes