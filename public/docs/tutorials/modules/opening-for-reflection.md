# Acesso Reflexivo com Módulos Abertos e Pacotes Abertos

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Módulos ](<#/doc/tutorials/modules>) > Acesso Reflexivo com Módulos Abertos e Pacotes Abertos

**Anterior na Série**

[Introdução aos Módulos em Java](<#/doc/tutorials/modules/intro>)

➜

**Tutorial Atual**

Acesso Reflexivo com Módulos Abertos e Pacotes Abertos

➜

**Próximo na Série**

[Dependências Opcionais com `requires static`](<#/doc/tutorials/modules/optional-dependencies>)

**Anterior na Série:** [Introdução aos Módulos em Java](<#/doc/tutorials/modules/intro>)

**Próximo na Série:** [Dependências Opcionais com `requires static`](<#/doc/tutorials/modules/optional-dependencies>)

# Acesso Reflexivo com Módulos Abertos e Pacotes Abertos

A forte encapsulação do sistema de módulos também se aplica à reflection, que perdeu seu "superpoder" de invadir APIs internas. É claro que a reflection é uma parte importante do ecossistema Java e, portanto, o sistema de módulos possui diretivas específicas que a suportam. Ele permite a abertura de pacotes, o que os mantém inacessíveis em tempo de compilação, mas permite reflection profunda em tempo de execução, e a abertura de módulos inteiros.

**Nota** : Você precisa conhecer [os fundamentos do sistema de módulos](<#/doc/tutorials/modules/intro>) para aproveitar ao máximo este artigo.

## Por Que Exportar Pacotes É Inadequado para Reflection

O principal mecanismo para tornar tipos acessíveis fora de um módulo é exportar o pacote que os contém com uma diretiva `exports` na declaração do módulo. Isso é inadequado para reflection por duas razões:

  1. Exportar um pacote o torna parte da API pública de um módulo. Isso convida outros módulos a usar os tipos que ele contém e transmite um grau de estabilidade. Isso geralmente não é uma boa opção para classes que lidam com requisições HTTP ou interagem com o banco de dados.
  2. Um problema mais técnico é que, mesmo em pacotes exportados, apenas membros públicos de tipos públicos são acessíveis. Mas frameworks que dependem de reflection frequentemente acessam tipos não públicos, construtores, acessores ou campos, o que ainda falharia.

Pacotes abertos (e módulos) são projetados especificamente para abordar esses dois pontos.

## Abrindo Pacotes para Reflection

Um módulo pode _abrir um pacote_ para reflection adicionando a diretiva `opens` à declaração do módulo:

Em tempo de compilação, o pacote é totalmente encapsulado como se a diretiva não estivesse lá. Isso significa que o código fora do módulo _com.example.app_ que usa tipos do pacote `com.example.entities` não compilará.

Em tempo de execução, por outro lado, os tipos do pacote estão disponíveis para reflection. Isso significa que a reflection pode interagir livremente com todos os tipos e membros - públicos ou não (usando [`AccessibleObject.setAccessible()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/AccessibleObject.html#setAccessible\(boolean\)>) como de costume para membros não públicos).

Como você provavelmente pode perceber, `opens` foi projetado especificamente para o caso de uso de reflection e se comporta de forma muito diferente de `exports`:

  * permite acesso a todos os membros, não impactando suas decisões em relação à visibilidade
  * impede a compilação contra código em pacotes abertos e permite acesso apenas em tempo de execução
  * comunica a intenção de usar o pacote com um framework baseado em reflection

Caso seja necessário, um pacote pode ser exportado e aberto.

## Abrindo Módulos

Se você tem um módulo grande com muitos pacotes que precisam ser expostos à reflection, pode achar tedioso abrir cada um deles individualmente. Embora não exista um curinga como `opens com.example.*`, algo próximo a isso existe. Ao colocar a palavra-chave `open` antes de `module` na declaração do módulo, um _módulo aberto_ é criado:

Um módulo aberto abre todos os pacotes que contém como se cada um deles fosse usado individualmente em uma diretiva `opens`. Consequentemente, não faz sentido abrir manualmente outros pacotes, e é por isso que as diretivas `opens` nos pacotes de um módulo aberto levam a erros de compilação.

### Neste tutorial

Por Que Exportar Pacotes É Inadequado para Reflection Abrindo Pacotes para Reflection Abrindo Módulos

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Introdução aos Módulos em Java](<#/doc/tutorials/modules/intro>)

➜

**Tutorial Atual**

Acesso Reflexivo com Módulos Abertos e Pacotes Abertos

➜

**Próximo na Série**

[Dependências Opcionais com `requires static`](<#/doc/tutorials/modules/optional-dependencies>)

**Anterior na Série:** [Introdução aos Módulos em Java](<#/doc/tutorials/modules/intro>)

**Próximo na Série:** [Dependências Opcionais com `requires static`](<#/doc/tutorials/modules/optional-dependencies>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Módulos ](<#/doc/tutorials/modules>) > Acesso Reflexivo com Módulos Abertos e Pacotes Abertos