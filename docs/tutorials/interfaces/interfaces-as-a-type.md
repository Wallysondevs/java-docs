# Usando uma Interface como um Tipo

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Interfaces ](<#/doc/tutorials/interfaces>) > Usando uma Interface como um Tipo

**Anterior na Série**

[Implementando uma Interface](<#/doc/tutorials/interfaces/examples>)

➜

**Tutorial Atual**

Usando uma Interface como um Tipo

➜

Este é o fim da série!

**Anterior na Série:** [Implementando uma Interface](<#/doc/tutorials/interfaces/examples>)

# Usando uma Interface como um Tipo

## Usando uma Interface como um Tipo

Ao definir uma nova interface, você está definindo um novo tipo de dado de referência. Você pode usar nomes de interface em qualquer lugar onde possa usar qualquer outro nome de tipo de dado. Se você definir uma variável de referência cujo tipo é uma interface, qualquer objeto que você atribuir a ela deve ser uma instância de uma classe que implementa a interface.

Como exemplo, aqui está um método para encontrar o maior objeto em um par de objetos, para quaisquer objetos que são instanciados a partir de uma classe que implementa `Relatable`:

Ao fazer um *cast* de `object1` para um tipo `Relatable`, ele pode invocar o método `isLargerThan()`.

Se você se dedicar a implementar `Relatable` em uma ampla variedade de classes, os objetos instanciados de qualquer uma dessas classes podem ser comparados com o método `findLargest()` — desde que ambos os objetos sejam da mesma classe. Similarmente, todos eles podem ser comparados com os seguintes métodos:

Esses métodos funcionam para quaisquer objetos "relacionáveis", independentemente de sua herança de classe. Quando eles implementam `Relatable`, eles podem ser tanto do seu próprio tipo de classe (ou superclasse) quanto de um tipo `Relatable`. Isso lhes confere algumas das vantagens da herança múltipla, onde eles podem ter comportamento tanto de uma superclasse quanto de uma interface.

### Neste tutorial

Usando uma Interface como um Tipo

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Implementando uma Interface](<#/doc/tutorials/interfaces/examples>)

➜

**Tutorial Atual**

Usando uma Interface como um Tipo

➜

Este é o fim da série!

**Anterior na Série:** [Implementando uma Interface](<#/doc/tutorials/interfaces/examples>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Interfaces ](<#/doc/tutorials/interfaces>) > Usando uma Interface como um Tipo