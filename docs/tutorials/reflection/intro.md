# Apresentando a API de Reflection

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de Reflection ](<#/doc/tutorials/reflection>) > Apresentando a API de Reflection

**Tutorial Atual**

Apresentando a API de Reflection

➜

**Próximo na Série**

[Recuperando Classes](<#/doc/tutorials/reflection/classes>)

**Próximo na Série:** [Recuperando Classes](<#/doc/tutorials/reflection/classes>)

# Apresentando a API de Reflection

## Usos da Reflection

Reflection é comumente usada por programas que exigem a capacidade de examinar ou modificar o comportamento em tempo de execução de aplicações rodando na Java virtual machine. Esta é uma funcionalidade relativamente avançada e deve ser usada apenas por desenvolvedores que possuam um forte domínio dos fundamentos da linguagem. Com essa ressalva em mente, reflection é uma técnica poderosa e pode permitir que aplicações realizem operações que de outra forma seriam impossíveis.

### Funcionalidades de Extensibilidade

Uma aplicação pode fazer uso de classes externas, definidas pelo usuário, criando instâncias de objetos de extensibilidade usando seus nomes totalmente qualificados.

### Navegadores de Classes e Ambientes de Desenvolvimento Visual

Um navegador de classes precisa ser capaz de enumerar os membros das classes. Ambientes de desenvolvimento visual podem se beneficiar do uso de informações de tipo disponíveis na reflection para auxiliar o desenvolvedor na escrita de código correto.

### Depuradores e Ferramentas de Teste

Depuradores precisam ser capazes de examinar membros privados em classes. Ferramentas de teste podem fazer uso da reflection para chamar sistematicamente um conjunto de APIs detectáveis definidas em uma classe, para garantir um alto nível de cobertura de código em um conjunto de testes.

## Desvantagens da Reflection

Reflection é poderosa, mas não deve ser usada indiscriminadamente. Se for possível realizar uma operação sem usar reflection, então é preferível evitar seu uso. As seguintes preocupações devem ser levadas em consideração ao acessar código via reflection.

### Sobrecarga de Performance

Como reflection envolve tipos que são resolvidos dinamicamente, certas otimizações da Java virtual machine não podem ser realizadas. Consequentemente, operações reflexivas têm um desempenho mais lento do que suas contrapartes não reflexivas, e devem ser evitadas em seções de código que são chamadas frequentemente em aplicações sensíveis ao desempenho.

### Restrições de Segurança

Reflection pode ser controlada em tempo de execução, e módulos podem proibir o acesso reflexivo aos seus próprios internos. Esta é uma consideração importante ao projetar aplicações que usam reflection.

Você também precisa estar ciente de que reflection perdeu sua capacidade de introspectar as classes da API padrão do Java. Você pode ler a página [Acesso Reflexivo com Módulos Abertos e Pacotes Abertos](<#/doc/tutorials/modules/opening-for-reflection>) para mais informações.

### Exposição de Internos

Como reflection permite que o código execute operações que seriam ilegais em código não reflexivo, como acessar campos e métodos privados, o uso de reflection pode resultar em efeitos colaterais inesperados, o que pode tornar o código disfuncional e pode destruir a portabilidade. O código reflexivo quebra abstrações e, portanto, pode mudar o comportamento com atualizações da plataforma.

### Neste tutorial

Usos da Reflection Desvantagens da Reflection

Última atualização: 19 de julho de 2024

**Tutorial Atual**

Apresentando a API de Reflection

➜

**Próximo na Série**

[Recuperando Classes](<#/doc/tutorials/reflection/classes>)

**Próximo na Série:** [Recuperando Classes](<#/doc/tutorials/reflection/classes>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de Reflection ](<#/doc/tutorials/reflection>) > Apresentando a API de Reflection