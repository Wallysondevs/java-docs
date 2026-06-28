# Classes de Caracteres Predefinidas

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Expressões Regulares ](<#/doc/tutorials/regex>) > Classes de Caracteres Predefinidas

**Anterior na Série**

[Classes de Caracteres](<#/doc/tutorials/regex/character-classes>)

➜

**Tutorial Atual**

Classes de Caracteres Predefinidas

➜

**Próximo na Série**

[Quantificadores](<#/doc/tutorials/regex/quantifiers>)

**Anterior na Série:** [Classes de Caracteres](<#/doc/tutorials/regex/character-classes>)

**Próximo na Série:** [Quantificadores](<#/doc/tutorials/regex/quantifiers>)

# Classes de Caracteres Predefinidas

## Classes de Caracteres Predefinidas

A API [`Pattern`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Pattern.html>) contém várias classes de caracteres predefinidas úteis, que oferecem atalhos convenientes para expressões regulares comumente usadas:

Construto | Descrição
---|---
`.` | Qualquer caractere (pode ou não corresponder a terminadores de linha)
`\d` | Um dígito: `[0-9]`
`\D` | Um não-dígito: `[^0-9]`
`\s` | Um caractere de espaço em branco: `[ \t\n\x0B\f\r]`
`\S` | Um caractere não-espaço em branco: `[^\s]`
`\w` | Um caractere de palavra: `[a-zA-Z_0-9]`
`\W` | Um caractere não-palavra: `[^\w]`

Na tabela acima, cada construto na coluna da esquerda é um atalho para a classe de caracteres na coluna da direita. Por exemplo, `\d` significa um intervalo de dígitos (0-9), e `\w` significa um caractere de palavra (qualquer letra minúscula, qualquer letra maiúscula, o caractere de sublinhado, ou qualquer dígito). Use as classes predefinidas sempre que possível. Elas tornam seu código mais fácil de ler e eliminam erros introduzidos por classes de caracteres malformadas.

Construtos que começam com uma barra invertida são chamados de construtos de escape. Nós pré-visualizamos os construtos de escape na seção [`String Literals`](<#/doc/tutorials/regex/string-literals>) onde mencionamos o uso da barra invertida e de `\Q` e `\E` para citação. Se você estiver usando um construto de escape dentro de um literal de string, você deve preceder a barra invertida com outra barra invertida para que a string compile. Por exemplo:

Neste exemplo `\d` é a expressão regular; a barra invertida extra é necessária para que o código compile. O harness de teste lê as expressões diretamente do console, no entanto, então a barra invertida extra é desnecessária.

## Exemplos

Os exemplos a seguir demonstram o uso de classes de caracteres predefinidas.

Nos três primeiros exemplos, a expressão regular é simplesmente `.` (o metacaractere "ponto") que indica "qualquer caractere". Portanto, a correspondência é bem-sucedida em todos os três casos (um caractere `@` selecionado aleatoriamente, um dígito e uma letra). Os exemplos restantes usam cada um um único construto de expressão regular da tabela [Classes de Caracteres Predefinidas](<#/doc/tutorials/regex/predefined-character-classes>). Você pode consultar esta tabela para entender a lógica por trás de cada correspondência:

*   `\d` corresponde a todos os dígitos
*   `\s` corresponde a espaços
*   `\w` corresponde a caracteres de palavra

Alternativamente, uma letra maiúscula significa o oposto:

*   `\D` corresponde a não-dígitos
*   `\S` corresponde a não-espaços
*   `\W` corresponde a não-caracteres de palavra

### Neste tutorial

Classes de Caracteres Predefinidas Exemplos

Última atualização: 10 de janeiro de 2022

**Anterior na Série**

[Classes de Caracteres](<#/doc/tutorials/regex/character-classes>)

➜

**Tutorial Atual**

Classes de Caracteres Predefinidas

➜

**Próximo na Série**

[Quantificadores](<#/doc/tutorials/regex/quantifiers>)

**Anterior na Série:** [Classes de Caracteres](<#/doc/tutorials/regex/character-classes>)

**Próximo na Série:** [Quantificadores](<#/doc/tutorials/regex/quantifiers>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Expressões Regulares ](<#/doc/tutorials/regex>) > Classes de Caracteres Predefinidas