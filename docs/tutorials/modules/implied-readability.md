# Legibilidade Implícita com `requires transitive`

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Módulos ](<#/doc/tutorials/modules>) > Legibilidade Implícita com `requires transitive`

**Anterior na Série**

[Dependências Opcionais com `requires static`](<#/doc/tutorials/modules/optional-dependencies>)

➜

**Tutorial Atual**

Legibilidade Implícita com `requires transitive`

➜

**Próximo na Série**

[exports e opens Qualificados](<#/doc/tutorials/modules/qualified-exports-opens>)

**Anterior na Série:** [Dependências Opcionais com `requires static`](<#/doc/tutorials/modules/optional-dependencies>)

**Próximo na Série:** [exports e opens Qualificados](<#/doc/tutorials/modules/qualified-exports-opens>)

# Legibilidade Implícita com `requires transitive`

O sistema de módulos possui regras estritas para acessar código em outros módulos e uma delas é que o módulo que acessa deve _ler_ o módulo acessado. A forma mais comum de estabelecer legibilidade é um módulo requerer outro, mas não é a única. Se um módulo usa tipos de outro módulo em sua própria API, todo módulo externo que usa o primeiro seria forçado a também requerer o segundo. A menos que o primeiro módulo use `requires transitive` para o segundo, o que implica a legibilidade do segundo módulo para qualquer módulo que lê o primeiro. Isso é um pouco confuso, mas você entenderá em alguns minutos.

**Nota** : Você precisa conhecer [os fundamentos do sistema de módulos](<#/doc/tutorials/modules/intro>) para aproveitar ao máximo este artigo.

## Legibilidade Implícita

No caso comum, um módulo usa uma dependência internamente sem que o mundo exterior tenha qualquer conhecimento dela. Veja, por exemplo, [`java.prefs`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.prefs/module-summary.html>), que `requires` [`java.xml`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.xml/module-summary.html>): Ele precisa das capacidades de parsing de XML, mas sua própria API não aceita nem retorna tipos dos pacotes de _java.xml_.

Mas há outro caso de uso onde a dependência não é inteiramente interna, mas reside na fronteira entre módulos. Nesse cenário, um módulo depende de outro e expõe tipos do módulo dependido em sua própria API pública. Um bom exemplo é [`java.sql`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.sql/module-summary.html>). Ele também usa _java.xml_, mas, ao contrário de _java.prefs_, não apenas internamente - a classe pública `java.sql.SQLXML` mapeia o tipo SQL XML e, como tal, usa tipos de _java.xml_ em sua própria API. Da mesma forma, o [`Driver`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.sql/java/sql/Driver.html>) de _java.sql_ tem um método [`getParentLogger()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.sql/java/sql/Driver.html#getParentLogger\(\)>) que retorna um `Logger`, que é um tipo do módulo _java.logging_.

Em tais situações, o código que deseja chamar o módulo (por exemplo, _java.sql_) pode ter que usar tipos do módulo dependido (por exemplo, _java.xml_, _java.logging_). Mas ele não pode fazer isso se também não ler o módulo dependido. Consequentemente, para que o módulo seja utilizável, todos os clientes teriam que depender explicitamente desse segundo módulo também. Identificar e resolver manualmente tais dependências ocultas seria uma tarefa tediosa e propensa a erros.

É aqui que entra a _legibilidade implícita_. Ela estende as declarações de módulo para que um módulo possa conceder legibilidade dos módulos dos quais ele depende a qualquer módulo que dependa dele. Tal legibilidade implícita é expressa incluindo o modificador `transitive` em uma cláusula `requires`.

É por isso que a declaração de módulo de _java.sql_ se parece com o seguinte:

Isso significa que qualquer módulo que lê _java.sql_ (geralmente ao requerê-lo) automaticamente também lerá _java.logging_, _java.transaction.xa_ e _java.xml_.

## Quando Confiar na Legibilidade Implícita

Os explicadores originais do sistema de módulos incluem uma recomendação clara sobre quando usar a legibilidade implícita:

> Em geral, se um módulo exporta um pacote contendo um tipo cuja assinatura se refere a um pacote em um segundo módulo, então a declaração do primeiro módulo deve incluir uma dependência `requires transitive` no segundo. Isso garantirá que outros módulos que dependem do primeiro módulo serão automaticamente capazes de ler o segundo módulo e, portanto, acessar todos os tipos nos pacotes exportados desse módulo.

Mas até onde você deve levar isso? Voltando ao exemplo de _java.sql_, um módulo que o usa deveria requerer _java.logging_ também? Tecnicamente, tal declaração não é necessária e pode parecer redundante.

Para responder a essa pergunta, precisamos analisar como exatamente o módulo fictício usa _java.logging_. Ele pode precisar apenas lê-lo para que você possa chamar `Driver.getParentLogger()`, por exemplo, para alterar o nível de log do `logger`, e nada mais. Neste caso, a interação do seu código com _java.logging_ acontece na vizinhança imediata de sua interação com `Driver` de _java.sql_. Acima, chamamos isso de fronteira entre dois módulos.

Alternativamente, seu módulo pode realmente usar logging em todo o seu próprio código. Então, os tipos de _java.logging_ aparecem em muitos lugares independentemente de `Driver` e não podem mais ser considerados limitados à fronteira do seu módulo e _java.sql_.

Recomenda-se confiar na legibilidade implícita de um módulo (por exemplo, _java.logging_) apenas se seus tipos forem usados apenas na fronteira com o módulo que o `requires transitive` (por exemplo, _java.sql_). Caso contrário, mesmo que não seja estritamente necessário, ele deve ser explicitamente requerido. Essa abordagem esclarece a estrutura do sistema e também prepara a declaração do módulo para o futuro em relação a várias refatorações.

### Neste tutorial

Legibilidade Implícita Quando Confiar na Legibilidade Implícita

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Dependências Opcionais com `requires static`](<#/doc/tutorials/modules/optional-dependencies>)

➜

**Tutorial Atual**

Legibilidade Implícita com `requires transitive`

➜

**Próximo na Série**

[exports e opens Qualificados](<#/doc/tutorials/modules/qualified-exports-opens>)

**Anterior na Série:** [Dependências Opcionais com `requires static`](<#/doc/tutorials/modules/optional-dependencies>)

**Próximo na Série:** [exports e opens Qualificados](<#/doc/tutorials/modules/qualified-exports-opens>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Módulos ](<#/doc/tutorials/modules>) > Legibilidade Implícita com `requires transitive`