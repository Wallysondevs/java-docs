# Criando Variáveis e Nomeando-as

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Fundamentos da Linguagem Java ](<#/doc/tutorials/language-basics>) > Criando Variáveis e Nomeando-as

**Tutorial Atual**

Criando Variáveis e Nomeando-as

➜

**Próximo na Série**

[Criando Variáveis de Tipo Primitivo em Seus Programas](<#/doc/tutorials/language-basics/primitive-types>)

**Próximo na Série:** [Criando Variáveis de Tipo Primitivo em Seus Programas](<#/doc/tutorials/language-basics/primitive-types>)

# Criando Variáveis e Nomeando-as

## Variáveis

Como você aprendeu na seção anterior, um objeto armazena seu estado em _campos_.

A discussão [O Que É um Objeto?](<#/doc/tutorials/oop>) apresentou os campos, mas você provavelmente ainda tem algumas perguntas, como: Quais são as regras e convenções para nomear um campo? Além de `int`, quais outros tipos de dados existem? Os campos precisam ser inicializados quando são declarados? Os campos recebem um valor padrão se não forem explicitamente inicializados? Exploraremos as respostas para essas perguntas nesta seção, mas antes de fazê-lo, há algumas distinções técnicas das quais você deve primeiro tomar conhecimento. Na linguagem de programação Java, os termos "campo" e "variável" são ambos usados; esta é uma fonte comum de confusão entre novos desenvolvedores, já que ambos frequentemente parecem se referir à mesma coisa.

A linguagem de programação Java define os seguintes tipos de variáveis:

  * **Variáveis de Instância (Campos Não Estáticos)** Tecnicamente falando, objetos armazenam seus estados individuais em "campos não estáticos", ou seja, campos declarados sem a palavra-chave `static`. Campos não estáticos também são conhecidos como variáveis de instância porque seus valores são únicos para cada instância de uma classe (para cada objeto, em outras palavras); o `currentSpeed` de uma bicicleta é independente do `currentSpeed` de outra.
  * **Variáveis de Classe (Campos Estáticos)** Uma variável de classe é qualquer campo declarado com o modificador `static`; isso informa ao compilador que existe exatamente uma cópia desta variável, independentemente de quantas vezes a classe tenha sido instanciada. Um campo que define o número de marchas para um tipo específico de bicicleta poderia ser marcado como `static`, já que conceitualmente o mesmo número de marchas se aplicará a todas as instâncias. O código `static int numGears = 6;` criaria tal campo `static`. Além disso, a palavra-chave `final` poderia ser adicionada para indicar que o número de marchas nunca mudará.
  * **Variáveis Locais** Assim como um objeto armazena seu estado em campos, um método frequentemente armazenará seu estado temporário em variáveis locais. A sintaxe para declarar uma variável local é semelhante à de declarar um campo (por exemplo, `int count = 0;`). Não há uma palavra-chave especial que designe uma variável como local; essa determinação vem inteiramente do local em que a variável é declarada — que é entre as chaves de abertura e fechamento de um método. Como tal, as variáveis locais são visíveis apenas para os métodos nos quais são declaradas; elas não são acessíveis do restante da classe.
  * **Parâmetros** Você já viu exemplos de parâmetros, tanto na classe `Bicycle` quanto no método `main` da aplicação "Hello World!". Lembre-se de que a assinatura para o método `main` é `public static void main(String[] args)`. Aqui, a variável `args` é o parâmetro para este método. O importante a lembrar é que os parâmetros são sempre classificados como "variáveis" e não "campos". Isso se aplica também a outras construções que aceitam parâmetros (como construtores e manipuladores de exceção) que você aprenderá mais tarde no tutorial.

Dito isso, o restante deste tutorial usa as seguintes diretrizes gerais ao discutir campos e variáveis. Se estivermos falando sobre "campos em geral" (excluindo variáveis locais e parâmetros), podemos simplesmente dizer "campos". Se a discussão se aplica a "todos os itens acima", podemos simplesmente dizer "variáveis". Se o contexto exigir uma distinção, usaremos termos específicos (campo estático, variáveis locais, etc.) conforme apropriado. Você também pode ocasionalmente ver o termo "membro" sendo usado. Os campos, métodos e tipos aninhados de um tipo são coletivamente chamados de seus _membros_.

## Nomeando Variáveis

Toda linguagem de programação tem seu próprio conjunto de regras e convenções para os tipos de nomes que você pode usar, e a linguagem de programação Java não é diferente. As regras e convenções para nomear suas variáveis podem ser resumidas da seguinte forma:

  * Nomes de variáveis diferenciam maiúsculas de minúsculas. O nome de uma variável pode ser qualquer identificador legal — uma sequência de comprimento ilimitado de letras e dígitos Unicode, começando com uma letra, o cifrão `$`, ou o caractere sublinhado `_`. A convenção, no entanto, é sempre começar os nomes de suas variáveis com uma letra, não com `$` ou `_`. Além disso, o caractere cifrão, por convenção, nunca é usado. Você pode encontrar algumas situações em que nomes gerados automaticamente conterão o cifrão, mas os nomes de suas variáveis devem sempre evitar usá-lo. Uma convenção semelhante existe para o caractere sublinhado; embora seja tecnicamente legal começar o nome de sua variável com `_`, essa prática é desencorajada. Espaços em branco não são permitidos.
  * Caracteres subsequentes podem ser letras, dígitos, cifrões ou caracteres sublinhados. Convenções (e bom senso) também se aplicam a esta regra. Ao escolher um nome para suas variáveis, use palavras completas em vez de abreviações crípticas. Fazer isso tornará seu código mais fácil de ler e entender. Em muitos casos, também tornará seu código autodocumentado; campos nomeados `cadence`, `speed` e `gear`, por exemplo, são muito mais intuitivos do que versões abreviadas, como `s`, `c` e `g`. Lembre-se também de que o nome que você escolher não deve ser uma palavra-chave ou palavra reservada.
  * Se o nome que você escolher consistir em apenas uma palavra, escreva essa palavra em todas as letras minúsculas. Se consistir em mais de uma palavra, capitalize a primeira letra de cada palavra subsequente. Os nomes `gearRatio` e `currentGear` são exemplos primários desta convenção. Se sua variável armazena um valor constante, como `static final int NUM_GEARS = 6`, a convenção muda ligeiramente, capitalizando cada letra e separando as palavras subsequentes com o caractere sublinhado. Por convenção, o caractere sublinhado nunca é usado em outro lugar.

### Neste tutorial

Variáveis Nomeando Variáveis

Última atualização: 23 de setembro de 2021

**Tutorial Atual**

Criando Variáveis e Nomeando-as

➜

**Próximo na Série**

[Criando Variáveis de Tipo Primitivo em Seus Programas](<#/doc/tutorials/language-basics/primitive-types>)

**Próximo na Série:** [Criando Variáveis de Tipo Primitivo em Seus Programas](<#/doc/tutorials/language-basics/primitive-types>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Fundamentos da Linguagem Java ](<#/doc/tutorials/language-basics>) > Criando Variáveis e Nomeando-as