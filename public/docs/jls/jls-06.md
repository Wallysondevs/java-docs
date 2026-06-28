# Nomes

[Java SE](<https://docs.oracle.com/en/java/javase/25/>) > [Java SE Specifications](<#/>) > [Java Language Specification](<#/doc/jls/jls-01>)

Capítulo 6. Nomes  
---  
[Anterior](<#/doc/jls/jls-05>)  |   |  [Próximo](<#/doc/jls/jls-07>)  
  
* * *

# Capítulo 6. Nomes 

**Sumário**

[6.1. Declarações](<#/doc/jls/jls-06>)
[6.2. Nomes e Identificadores](<#/doc/jls/jls-06>)
[6.3. Escopo de uma Declaração](<#/doc/jls/jls-06>)
    

[6.3.1. Escopo para Variáveis de Padrão em Expressões](<#/doc/jls/jls-06>)
    

[6.3.1.1. Operador Condicional-E `&&`](<#/doc/jls/jls-06>)
[6.3.1.2. Operador Condicional-Ou `||`](<#/doc/jls/jls-06>)
[6.3.1.3. Operador de Complemento Lógico `!`](<#/doc/jls/jls-06>)
[6.3.1.4. Operador Condicional `? :`](<#/doc/jls/jls-06>)
[6.3.1.5. Operador de Correspondência de Padrão `instanceof`](<#/doc/jls/jls-06>)
[6.3.1.6. Expressões `switch`](<#/doc/jls/jls-06>)
[6.3.1.7. Expressões Entre Parênteses](<#/doc/jls/jls-06>)
[6.3.2. Escopo para Variáveis de Padrão em Declarações](<#/doc/jls/jls-06>)
    

[6.3.2.1. Blocos](<#/doc/jls/jls-06>)
[6.3.2.2. Declarações `if`](<#/doc/jls/jls-06>)
[6.3.2.3. Declarações `while`](<#/doc/jls/jls-06>)
[6.3.2.4. Declarações `do`](<#/doc/jls/jls-06>)
[6.3.2.5. Declarações `for`](<#/doc/jls/jls-06>)
[6.3.2.6. Declarações `switch`](<#/doc/jls/jls-06>)
[6.3.2.7. Declarações Rotuladas](<#/doc/jls/jls-06>)
[6.3.3. Escopo para Variáveis de Padrão em Rótulos `case`](<#/doc/jls/jls-06>)
[6.4. Sombreamento e Obscurecimento](<#/doc/jls/jls-06>)
    

[6.4.1. Sombreamento](<#/doc/jls/jls-06>)
[6.4.2. Obscurecimento](<#/doc/jls/jls-06>)
[6.5. Determinando o Significado de um Nome](<#/doc/jls/jls-06>)
    

[6.5.1. Classificação Sintática de um Nome de Acordo com o Contexto](<#/doc/jls/jls-06>)
[6.5.2. Reclassificação de Nomes Contextualmente Ambíguos](<#/doc/jls/jls-06>)
[6.5.3. Significado de Nomes de Módulos e Nomes de Pacotes](<#/doc/jls/jls-06>)
    

[6.5.3.1. Nomes de Pacotes Simples](<#/doc/jls/jls-06>)
[6.5.3.2. Nomes de Pacotes Qualificados](<#/doc/jls/jls-06>)
[6.5.4. Significado de _PackageOrTypeNames_](<#/doc/jls/jls-06>)
    

[6.5.4.1. _PackageOrTypeNames_ Simples](<#/doc/jls/jls-06>)
[6.5.4.2. _PackageOrTypeNames_ Qualificados](<#/doc/jls/jls-06>)
[6.5.5. Significado de Nomes de Tipos](<#/doc/jls/jls-06>)
    

[6.5.5.1. Nomes de Tipos Simples](<#/doc/jls/jls-06>)
[6.5.5.2. Nomes de Tipos Qualificados](<#/doc/jls/jls-06>)
[6.5.6. Significado de Nomes de Expressões](<#/doc/jls/jls-06>)
    

[6.5.6.1. Nomes de Expressões Simples](<#/doc/jls/jls-06>)
[6.5.6.2. Nomes de Expressões Qualificados](<#/doc/jls/jls-06>)
[6.5.7. Significado de Nomes de Métodos](<#/doc/jls/jls-06>)
    

[6.5.7.1. Nomes de Métodos Simples](<#/doc/jls/jls-06>)
[6.6. Controle de Acesso](<#/doc/jls/jls-06>)
    

[6.6.1. Determinando a Acessibilidade](<#/doc/jls/jls-06>)
[6.6.2. Detalhes sobre Acesso `protected`](<#/doc/jls/jls-06>)
    

[6.6.2.1. Acesso a um Membro `protected`](<#/doc/jls/jls-06>)
[6.6.2.2. Acesso a um Construtor `protected`](<#/doc/jls/jls-06>)
[6.7. Nomes Totalmente Qualificados e Nomes Canônicos](<#/doc/jls/jls-06>)

Nomes são usados para se referir a entidades declaradas em um programa. 

Uma entidade declarada ([§6.1](<#/doc/jls/jls-06>)) é um pacote, uma classe, uma interface, um membro (classe, interface, campo ou método) de um tipo de referência, um parâmetro de tipo, um parâmetro formal, um parâmetro de exceção ou uma variável local. 

Nomes em programas são _simples_, consistindo de um único identificador, ou _qualificados_, consistindo de uma sequência de identificadores separados por tokens "`.`" ([§6.2](<#/doc/jls/jls-06>)). 

Toda declaração que introduz um nome tem um _escopo_ ([§6.3](<#/doc/jls/jls-06>)), que é a parte do texto do programa dentro da qual a entidade declarada pode ser referenciada por um nome simples. 

Um nome qualificado `N.x` pode ser usado para se referir a um _membro_ de um pacote ou tipo de referência, onde `N` é um nome simples ou qualificado e `x` é um identificador. Se `N` nomeia um pacote, então `x` é um membro desse pacote, que é uma classe, uma interface ou um subpacote. Se `N` nomeia um tipo de referência ou uma variável de um tipo de referência, então `x` nomeia um membro desse tipo, que é uma classe, uma interface, um campo ou um método. 

Ao determinar o significado de um nome ([§6.5](<#/doc/jls/jls-06>)), o contexto da ocorrência é usado para desambiguar entre pacotes, tipos, variáveis e métodos com o mesmo nome. 

O controle de acesso ([§6.6](<#/doc/jls/jls-06>)) pode ser especificado em uma declaração de classe, interface, método ou campo para controlar quando o _acesso_ a um membro é permitido. Acesso é um conceito diferente de escopo. Acesso especifica a parte do texto do programa dentro da qual a entidade declarada pode ser referenciada por um nome qualificado. O acesso a uma entidade declarada também é relevante em uma expressão de acesso a campo ([§15.11](<#/doc/jls/jls-15>)), uma expressão de invocação de método na qual o método não é especificado por um nome simples ([§15.12](<#/doc/jls/jls-15>)), uma expressão de referência de método ([§15.13](<#/doc/jls/jls-15>)), ou uma expressão de criação de instância de classe qualificada ([§15.9](<#/doc/jls/jls-15>)). Na ausência de um modificador de acesso, a maioria das declarações tem acesso de pacote, permitindo acesso em qualquer lugar dentro do pacote que contém sua declaração; outras possibilidades são `public`, `protected` e `private`. 

Nomes totalmente qualificados e canônicos ([§6.7](<#/doc/jls/jls-06>)) também são discutidos neste capítulo. 

## 6.1. Declarações 

Uma _declaração_ introduz uma das seguintes entidades em um programa: 

  * Um módulo, declarado em uma declaração `module` ([§7.7](<#/doc/jls/jls-07>)) 

  * Um pacote, declarado em uma declaração `package` ([§7.4](<#/doc/jls/jls-07>)) 

  * Uma classe ou interface importada, declarada em uma declaração de importação de tipo único, uma declaração de importação de tipo sob demanda, ou uma declaração de importação de módulo único ([§7.5.1](<#/doc/jls/jls-07>), [§7.5.2](<#/doc/jls/jls-07>), [§7.5.5](<#/doc/jls/jls-07>)) 

  * Um membro `static` importado, declarado em uma declaração de importação estática única ou uma declaração de importação estática sob demanda ([§7.5.3](<#/doc/jls/jls-07>), [§7.5.4](<#/doc/jls/jls-07>)) 

  * Uma classe, declarada por uma declaração de classe normal ([§8.1](<#/doc/jls/jls-08>)), uma declaração `enum` ([§8.9](<#/doc/jls/jls-08>)), uma declaração `record` ([§8.10](<#/doc/jls/jls-08>)), ou implicitamente por uma unidade de compilação compacta ([§7.3](<#/doc/jls/jls-07>)) 

  * Uma interface, declarada por uma declaração de interface normal ([§9.1](<#/doc/jls/jls-09>)) ou uma declaração de interface de anotação ([§9.6](<#/doc/jls/jls-09>)). 

  * Um parâmetro de tipo, declarado como parte da declaração de uma classe, interface, método ou construtor genérico ([§8.1.2](<#/doc/jls/jls-08>), [§9.1.2](<#/doc/jls/jls-09>), [§8.4.4](<#/doc/jls/jls-08>), [§8.8.4](<#/doc/jls/jls-08>)) 

  * Um membro de um tipo de referência ([§8.2](<#/doc/jls/jls-08>), [§9.2](<#/doc/jls/jls-09>), [§8.9.3](<#/doc/jls/jls-08>), [§9.6](<#/doc/jls/jls-09>), [§10.7](<#/doc/jls/jls-10>)), um dos seguintes: 

    * Uma classe membro ([§8.5](<#/doc/jls/jls-08>), [§9.5](<#/doc/jls/jls-09>)) 

    * Uma interface membro ([§8.5](<#/doc/jls/jls-08>), [§9.5](<#/doc/jls/jls-09>)) 

    * Um campo, um dos seguintes: 

      * Um campo declarado em uma classe ([§8.3](<#/doc/jls/jls-08>)) 

      * Um campo declarado em uma interface ([§9.3](<#/doc/jls/jls-09>)) 

      * Um campo implicitamente declarado de uma classe correspondente a uma constante `enum` ou um componente `record` 

      * O campo `length`, que é implicitamente um membro de todo tipo de array ([§10.7](<#/doc/jls/jls-10>)) 

    * Um método, um dos seguintes: 

      * Um método (`abstract` ou não) declarado em uma classe ([§8.4](<#/doc/jls/jls-08>)) 

      * Um método (`abstract` ou não) declarado em uma interface ([§9.4](<#/doc/jls/jls-09>)) 

      * Um método acessor implicitamente declarado correspondente a um componente `record` 

  * Uma constante `enum` ([§8.9.1](<#/doc/jls/jls-08>)) 

  * Um componente `record` ([§8.10.3](<#/doc/jls/jls-08>)) 

  * Um parâmetro formal, um dos seguintes: 

    * Um parâmetro formal de um método de uma classe ou interface ([§8.4.1](<#/doc/jls/jls-08>)) 

    * Um parâmetro formal de um construtor de uma classe ([§8.8.1](<#/doc/jls/jls-08>)) 

    * Um parâmetro formal de uma expressão `lambda` ([§15.27.1](<#/doc/jls/jls-15>)) 

  * Um parâmetro de exceção de um manipulador de exceção declarado em uma cláusula `catch` de uma declaração `try` ([§14.20](<#/doc/jls/jls-14>)) 

  * Uma variável local, uma das seguintes: 

    * Uma variável local declarada por uma declaração de variável local em um bloco ([§14.4.2](<#/doc/jls/jls-14>)) 

    * Uma variável local declarada por uma declaração `for` ou uma declaração `try`-with-resources ([§14.14](<#/doc/jls/jls-14>), [§14.20.3](<#/doc/jls/jls-14>)) 

    * Uma variável local declarada por um padrão ([§14.30.1](<#/doc/jls/jls-14>)) 

  * Uma classe ou interface local ([§14.3](<#/doc/jls/jls-14>)), uma das seguintes: 

    * Uma classe local declarada por uma declaração de classe normal 

    * Uma classe local declarada por uma declaração `enum` 

    * Uma classe local declarada por uma declaração `record` 

    * Uma interface local declarada por uma declaração de interface normal 




Construtores ([§8.8](<#/doc/jls/jls-08>), [§8.10.4](<#/doc/jls/jls-08>)) também são introduzidos por declarações, mas usam o nome da classe na qual são declarados em vez de introduzir um novo nome. 

Uma declaração comumente inclui um identificador ([§3.8](<#/doc/jls/jls-03>)) que pode ser usado em um nome para se referir à entidade declarada. O identificador é restrito para evitar certas palavras-chave contextuais quando a entidade sendo introduzida é uma classe, interface ou parâmetro de tipo. 

Se uma declaração não incluir um identificador, mas em vez disso incluir a palavra-chave `_` (underscore), então a entidade não pode ser referenciada por nome. Os seguintes tipos de entidade podem ser declarados usando um underscore: 

  * Uma variável local, uma das seguintes: 

    * Uma variável local declarada por uma declaração de variável local ([§14.4.2](<#/doc/jls/jls-14>)) 

    * Uma variável local declarada por uma declaração `for` ou uma declaração `try`-with-resources ([§14.14](<#/doc/jls/jls-14>), [§14.20.3](<#/doc/jls/jls-14>)) 

    * Uma variável local declarada por um padrão ([§14.30.1](<#/doc/jls/jls-14>)) 

  * Um parâmetro de exceção de um manipulador de exceção declarado em uma cláusula `catch` de uma declaração `try` ([§14.20](<#/doc/jls/jls-14>)) 

  * Um parâmetro formal de uma expressão `lambda` ([§15.27.1](<#/doc/jls/jls-15>)) 




Uma variável local, parâmetro de exceção ou parâmetro `lambda` que é declarado usando um underscore é chamado, respectivamente, de _variável local sem nome_, _parâmetro de exceção sem nome_ ou _parâmetro lambda sem nome_. 

A declaração de uma classe ou interface genérica (`class` C`<`T`>` `...` ou `interface` C`<`T`>` `...`) introduz tanto uma classe chamada C quanto uma família de tipos: o tipo bruto C, o tipo parametrizado C`<`Foo`>`, o tipo parametrizado C`<`Bar`>`, etc. 

Quando uma referência a C ocorre onde a genericidade é sem importância, identificada abaixo como um dos contextos não genéricos, a referência a C denota a classe ou interface C. Em outros contextos, a referência a C denota um tipo, ou parte de um tipo, introduzido por C. 

Os 15 contextos não genéricos são os seguintes:

  1. Em uma diretiva `uses` ou `provides` em uma declaração de módulo ([§7.7.1](<#/doc/jls/jls-07>)) 

  2. Em uma declaração de importação de tipo único ([§7.5.1](<#/doc/jls/jls-07>)) 

  3. À esquerda do `.` em uma declaração de importação estática única ([§7.5.3](<#/doc/jls/jls-07>)) 

  4. À esquerda do `.` em uma declaração de importação estática sob demanda ([§7.5.4](<#/doc/jls/jls-07>)) 

  5. Em uma cláusula `permits` de uma declaração de classe ou interface `sealed` ([§8.1.6](<#/doc/jls/jls-08>), [§9.1.4](<#/doc/jls/jls-09>)). 

  6. À esquerda do `(` em uma declaração de construtor ([§8.8](<#/doc/jls/jls-08>)) 

  7. Após o sinal `@` em uma anotação ([§9.7](<#/doc/jls/jls-09>)) 

  8. À esquerda de `.`class` em um literal de classe ([§15.8.2](<#/doc/jls/jls-15>)) 

  9. À esquerda de `.`this` em uma expressão `this` qualificada ([§15.8.4](<#/doc/jls/jls-15>)) 

  10. À esquerda de `.`super` em uma expressão de acesso a campo de superclasse qualificada ([§15.11.2](<#/doc/jls/jls-15>)) 

  11. À esquerda de `.`_Identifier_ ou `.`super`.`_Identifier_ em uma expressão de invocação de método qualificada ([§15.12](<#/doc/jls/jls-15>)) 

  12. À esquerda de `.`super`::` em uma expressão de referência de método ([§15.13](<#/doc/jls/jls-15>)) 

  13. Em um nome de expressão qualificado em uma expressão postfix ou uma declaração `try`-with-resources ([§15.14.1](<#/doc/jls/jls-15>), [§14.20.3](<#/doc/jls/jls-14>)) 

  14. Em uma cláusula `throws` de um método ou construtor ([§8.4.6](<#/doc/jls/jls-08>), [§8.8.5](<#/doc/jls/jls-08>), [§9.4](<#/doc/jls/jls-09>)) 

  15. Em uma declaração de parâmetro de exceção ([§14.20](<#/doc/jls/jls-14>)) 




Os primeiros doze contextos não genéricos correspondem aos primeiros doze contextos sintáticos para um _TypeName_ em [§6.5.1](<#/doc/jls/jls-06>). O décimo terceiro contexto não genérico é onde um _ExpressionName_ qualificado como `C.x` pode incluir um _TypeName_ `C` para denotar acesso a membro estático. O uso comum de _TypeName_ nesses treze contextos é significativo: indica que esses contextos envolvem um uso de tipo de menos de primeira classe. Em contraste, o décimo quarto e o décimo quinto contextos não genéricos empregam _ClassType_, indicando que as cláusulas `throws` e `catch` usam tipos de forma de primeira classe, em linha com, por exemplo, declarações de campo. A caracterização desses dois contextos como não genéricos se deve ao fato de que um tipo de exceção não pode ser parametrizado ([§8.1.2](<#/doc/jls/jls-08>)). 

Note que a produção _ClassType_ permite anotações, então é possível anotar o uso de um tipo em uma cláusula `throws` ou `catch`, enquanto a produção _TypeName_ não permite anotações, então não é possível anotar o nome de um tipo em, por exemplo, uma declaração de importação de tipo único. 

_Convenções de Nomenclatura_

As bibliotecas de classes da Plataforma Java SE tentam usar, sempre que possível, nomes escolhidos de acordo com as convenções apresentadas abaixo. Essas convenções ajudam a tornar o código mais legível e a evitar certos tipos de conflitos de nomes. 

Recomendamos essas convenções para uso em todos os programas escritos na linguagem de programação Java. No entanto, essas convenções não devem ser seguidas cegamente se o uso convencional de longa data ditar o contrário. Assim, por exemplo, os métodos `sin` e `cos` da classe `java.lang.Math` têm nomes matematicamente convencionais, embora esses nomes de métodos desrespeitem a convenção sugerida aqui porque são curtos e não são verbos. 

_Nomes de Pacotes e Nomes de Módulos_

Os programadores devem tomar medidas para evitar a possibilidade de dois pacotes publicados terem o mesmo nome, escolhendo _nomes de pacotes únicos_ para pacotes que são amplamente distribuídos. Isso permite que os pacotes sejam instalados e catalogados de forma fácil e automática. Esta seção especifica uma convenção sugerida para gerar esses nomes de pacotes únicos. As implementações da Plataforma Java SE são encorajadas a fornecer suporte automático para converter um conjunto de pacotes de nomes de pacotes locais e casuais para o formato de nome único descrito aqui. 

Se nomes de pacotes únicos não forem usados, conflitos de nomes de pacotes podem surgir longe do ponto de criação de qualquer um dos pacotes conflitantes. Isso pode criar uma situação difícil ou impossível de resolver para o usuário ou programador. As classes `ClassLoader` e `ModuleLayer` podem ser usadas para isolar pacotes com o mesmo nome uns dos outros nos casos em que os pacotes terão interações restritas, mas não de uma forma transparente para um programa ingênuo. 

Você forma um nome de pacote único tendo (ou pertencendo a uma organização que tem) um nome de domínio da Internet, como `oracle.com`. Em seguida, você inverte esse nome, componente por componente, para obter, neste exemplo, `com.oracle`, e usa isso como um prefixo para seus nomes de pacotes, usando uma convenção desenvolvida dentro de sua organização para administrar ainda mais os nomes de pacotes. Tal convenção pode especificar que certos componentes do nome do pacote sejam nomes de divisão, departamento, projeto, máquina ou login. 

**Exemplo 6.1-1. Nomes de Pacotes Únicos**
```
    com.nighthacks.scrabble.dictionary
    org.openjdk.compiler.source.tree
    net.jcip.annotations
    edu.cmu.cs.bovik.cheese
    gov.whitehouse.socks.mousefinder
    
```

  


O primeiro componente de um nome de pacote único é sempre escrito em letras ASCII minúsculas e deve ser um dos nomes de domínio de nível superior, como `com`, `edu`, `gov`, `mil`, `net` ou `org`, ou um dos códigos de duas letras em inglês que identificam países conforme especificado na _ISO Standard 3166_. 

Em alguns casos, o nome de domínio da Internet pode não ser um nome de pacote válido. Aqui estão algumas convenções sugeridas para lidar com essas situações: 

  * Se o nome de domínio contiver um hífen, ou qualquer outro caractere especial não permitido em um identificador ([§3.8](<#/doc/jls/jls-03>)), converta-o em um underscore. 

  * Se qualquer um dos componentes do nome do pacote resultante for uma palavra-chave ([§3.9](<#/doc/jls/jls-03>)), adicione um underscore a eles. 

  * Se qualquer um dos componentes do nome do pacote resultante começar com um dígito, ou qualquer outro caractere que não seja permitido como caractere inicial de um identificador, prefixe o componente com um underscore. 




O nome de um módulo deve corresponder ao nome de seu principal pacote exportado. Se um módulo não tiver tal pacote, ou se por razões de legado ele deve ter um nome que não corresponda a um de seus pacotes exportados, então seu nome ainda deve começar com a forma invertida de um domínio da Internet ao qual seu autor está associado. 

**Exemplo 6.1-2. Nomes de Módulos Únicos**
```
    com.nighthacks.scrabble
    org.openjdk.compiler
    net.jcip.annotations
    
```

  


O primeiro componente de um nome de pacote ou módulo não deve ser o identificador `java`. Nomes de pacotes e módulos que começam com o identificador `java` são reservados para pacotes e módulos da Plataforma Java SE. 

O nome de um pacote ou módulo não tem a intenção de implicar onde o pacote ou módulo está armazenado na Internet. Por exemplo, um pacote chamado `edu.cmu.cs.bovik.cheese` não é necessariamente obtível do host `cmu.edu` ou `cs.cmu.edu` ou `bovik.cs.cmu.edu`. A convenção sugerida para gerar nomes de pacotes e módulos únicos é meramente uma forma de aproveitar uma convenção de nomenclatura de pacotes e módulos sobre um registro de nomes únicos existente e amplamente conhecido, em vez de ter que criar um registro separado para nomes de pacotes e módulos. 

_Nomes de Classes e Interfaces_

Os nomes de classes devem ser substantivos ou frases nominais descritivas, não excessivamente longos, em camel case com a primeira letra de cada palavra capitalizada. 

**Exemplo 6.1-3. Nomes de Classes Descritivos**
```
    ClassLoader
    ProcessBuilder
    Thread
    Dictionary
    BufferedInputStream
    
```

  


Da mesma forma, os nomes de interfaces devem ser curtos e descritivos, não excessivamente longos, em camel case com a primeira letra de cada palavra capitalizada. O nome pode ser um substantivo ou frase nominal descritiva, o que é apropriado quando uma interface é usada como se fosse uma superclasse abstrata, como as interfaces `java.io.DataInput` e `java.io.DataOutput`; ou pode ser um adjetivo descrevendo um comportamento, como para as interfaces `Runnable` e `Cloneable`. 

_Nomes de Variáveis de Tipo_

Os nomes de variáveis de tipo devem ser concisos (um único caractere, se possível), mas evocativos, e não devem incluir letras minúsculas. Isso facilita a distinção entre parâmetros de tipo e classes e interfaces comuns. 

Classes e interfaces de contêiner devem usar o nome `E` para seu tipo de elemento. Mapas devem usar `K` para o tipo de suas chaves e `V` para o tipo de seus valores. O nome `X` deve ser usado para tipos de exceção arbitrários. Usamos `T` para tipo, sempre que não houver algo mais específico sobre o tipo para distingui-lo. (Este é frequentemente o caso em métodos genéricos.) 

Se houver vários parâmetros de tipo que denotam tipos arbitrários, deve-se usar letras que sejam vizinhas de `T` no alfabeto, como `S`. Alternativamente, é aceitável usar subscritos numéricos (por exemplo, `T1`, `T2`) para distinguir entre as diferentes variáveis de tipo. Nesses casos, todas as variáveis com o mesmo prefixo devem ser subscritas. 

Se um método genérico aparecer dentro de uma classe genérica, é uma boa ideia evitar usar os mesmos nomes para os parâmetros de tipo do método e da classe, para evitar confusão. O mesmo se aplica a classes genéricas aninhadas. 

**Exemplo 6.1-4. Nomes Convencionais de Variáveis de Tipo**
```
    
    public class HashSet<E> extends AbstractSet<E> { ... }
    public class HashMap<K,V> extends AbstractMap<K,V> { ... }
    public class ThreadLocal<T> { ... }
    public interface Functor<T, X extends Throwable> {
        T eval() throws X;
    }
    
    
```

  


Quando os parâmetros de tipo não se encaixam convenientemente em uma das categorias mencionadas, os nomes devem ser escolhidos para serem o mais significativos possível dentro dos limites de uma única letra. Os nomes mencionados acima (`E`, `K`, `V`, `X`, `T`) não devem ser usados para parâmetros de tipo que não se enquadram nas categorias designadas. 

_Nomes de Métodos_

Os nomes de métodos devem ser verbos ou frases verbais, em camel case, com a primeira letra minúscula e a primeira letra de quaisquer palavras subsequentes capitalizada. Aqui estão algumas convenções específicas adicionais para nomes de métodos: 

  * Métodos para obter e definir um atributo que pode ser considerado uma variável _V_ devem ser nomeados `get _V_` e `set _V_`. Um exemplo são os métodos `getPriority` e `setPriority` da classe `Thread`. 

  * Um método que retorna o comprimento de algo deve ser nomeado `length`, como na classe `String`. 

  * Um método que testa uma condição booleana _V_ sobre um objeto deve ser nomeado `is _V_`. Um exemplo é o método `isInterrupted` da classe `Thread`. 

  * Um método que converte seu objeto para um formato particular _F_ deve ser nomeado `to _F_`. Exemplos são o método `toString` da classe `Object` e os métodos `toLocaleString` e `toGMTString` da classe `java.util.Date`. 




Sempre que possível e apropriado, basear os nomes de métodos em uma nova classe em nomes de uma classe existente que seja similar, especialmente uma classe da API da Plataforma Java SE, tornará mais fácil de usar. 

_Nomes de Campos_

Nomes de campos que não são `final` devem estar em camel case com a primeira letra minúscula e as primeiras letras das palavras subsequentes capitalizadas. Note que classes bem projetadas têm muito poucos campos `public` ou `protected`, exceto por campos que são constantes (campos `static` `final`). 

Os campos devem ter nomes que sejam substantivos, frases nominais ou abreviações para substantivos. 

Exemplos dessa convenção são os campos `buf`, `pos` e `count` da classe `java.io.ByteArrayInputStream` e o campo `bytesTransferred` da classe `java.io.InterruptedIOException`. 

_Nomes de Constantes_

Os nomes de constantes em interfaces devem ser, e as variáveis `final` de classes podem convencionalmente ser, uma sequência de uma ou mais palavras, acrônimos ou abreviações, todas em maiúsculas, com componentes separados por caracteres underscore "`_`". Os nomes de constantes devem ser descritivos e não abreviados desnecessariamente. Convencionalmente, eles podem ser qualquer parte do discurso apropriada. 

Exemplos de nomes para constantes incluem `MIN_VALUE`, `MAX_VALUE`, `MIN_RADIX` e `MAX_RADIX` da classe `Character`. 

Um grupo de constantes que representam valores alternativos de um conjunto, ou, menos frequentemente, bits de mascaramento em um valor inteiro, são às vezes utilmente especificados com um acrônimo comum como prefixo de nome. 

Por exemplo:
```
    interface ProcessStates {
        int PS_RUNNING   = 0;
        int PS_SUSPENDED = 1;
    }
    
```

_Nomes de Variáveis Locais e Parâmetros_

Nomes de variáveis locais e parâmetros devem ser curtos, mas significativos. Eles são frequentemente sequências curtas de letras minúsculas que não são palavras, como: 

  * Acrônimos, ou seja, a primeira letra de uma série de palavras, como em `cp` para uma variável que contém uma referência a um `ColoredPoint`

  * Abreviações, como em `buf` contendo um ponteiro para um buffer de algum tipo 

  * Termos mnemônicos, organizados de alguma forma para auxiliar a memória e a compreensão, tipicamente usando um conjunto de variáveis locais com nomes convencionais padronizados após os nomes de parâmetros para classes amplamente usadas. Por exemplo: 

    * `in` e `out`, sempre que algum tipo de entrada e saída estiver envolvido, padronizados após os campos de `System`

    * `off` e `len`, sempre que um offset e um length estiverem envolvidos, padronizados após os parâmetros para os métodos `read` e `write` das interfaces `DataInput` e `DataOutput` de `java.io`




Nomes de variáveis locais ou parâmetros de um único caractere devem ser evitados, exceto para variáveis temporárias e de loop, ou onde uma variável contém um valor indistinto de um tipo. Nomes convencionais de um único caractere são: 

  * `b` para um `byte`

  * `c` para um `char`

  * `d` para um `double`

  * `e` para uma `Exception`

  * `f` para um `float`

  * `i`, `j` e `k` para `int`s 

  * `l` para um `long`

  * `o` para um `Object`

  * `s` para um `String`

  * `v` para um valor arbitrário de algum tipo 




Nomes de variáveis locais ou parâmetros que consistem em apenas duas ou três letras minúsculas não devem entrar em conflito com os códigos de país iniciais e nomes de domínio que são o primeiro componente de nomes de pacotes únicos.
## 6.2. Nomes e Identificadores

Um _nome_ é usado para se referir a uma entidade declarada em um programa.

Existem duas formas de nomes: nomes simples e nomes qualificados.

Um _nome simples_ é um identificador único.

Um _nome qualificado_ consiste em um nome, um token "`.`" e um identificador.

Ao determinar o significado de um nome ([§6.5](<#/doc/jls/jls-06>)), o contexto em que o nome aparece é levado em consideração. As regras de [§6.5](<#/doc/jls/jls-06>) distinguem entre contextos onde um nome deve denotar (referir-se a) um pacote ([§6.5.3](<#/doc/jls/jls-06>)); uma classe, interface ou parâmetro de tipo ([§6.5.5](<#/doc/jls/jls-06>)); uma variável ou valor em uma expressão ([§6.5.6](<#/doc/jls/jls-06>)); ou um método ([§6.5.7](<#/doc/jls/jls-06>)).

Pacotes, classes, interfaces e parâmetros de tipo possuem membros que podem ser acessados por nomes qualificados. Como pano de fundo para a discussão de nomes qualificados e a determinação do significado de nomes, veja as descrições de associação em [§4.4](<#/doc/jls/jls-04>), [§4.5.2](<#/doc/jls/jls-04>), [§4.8](<#/doc/jls/jls-04>), [§4.9](<#/doc/jls/jls-04>), [§7.1](<#/doc/jls/jls-07>), [§8.2](<#/doc/jls/jls-08>), [§9.2](<#/doc/jls/jls-09>), e [§10.7](<#/doc/jls/jls-10>).

Nem todos os identificadores em um programa fazem parte de um nome. Identificadores também são usados nas seguintes situações:

  * Em declarações ([§6.1](<#/doc/jls/jls-06>)), onde um identificador pode ocorrer para especificar o nome pelo qual a entidade declarada será conhecida.

  * Como rótulos em instruções rotuladas ([§14.7](<#/doc/jls/jls-14>)) e em instruções `break` e `continue` ([§14.15](<#/doc/jls/jls-14>), [§14.16](<#/doc/jls/jls-14>)) que se referem a rótulos de instrução.

Os identificadores usados em instruções rotuladas e suas instruções `break` e `continue` associadas são completamente separados daqueles usados em declarações.

  * Em expressões de acesso a campo ([§15.11](<#/doc/jls/jls-15>)), onde um identificador ocorre após um token "`.`" para indicar um membro do objeto denotado pela expressão antes do token "`.`", ou o objeto denotado por `super` ou _TypeName_`.`super` antes do token "`.`".

  * Em algumas expressões de invocação de método ([§15.12](<#/doc/jls/jls-15>)), onde quer que um identificador ocorra após um token "`.`" e antes de um token "`(`" para indicar um método a ser invocado para o objeto denotado pela expressão antes do token "`.`", ou o tipo denotado por _TypeName_ antes do token "`.`", ou o objeto denotado por `super` ou _TypeName_`.`super` antes do token "`.`".

  * Em algumas expressões de referência de método ([§15.13](<#/doc/jls/jls-15>)), onde quer que um identificador ocorra após um token "`::`" para indicar um método do objeto denotado pela expressão antes do token "`::`", ou o tipo denotado por _TypeName_ antes do token "`::`", ou o objeto denotado por `super` ou _TypeName_`.`super` antes do token "`::`".

  * Em expressões qualificadas de criação de instância de classe ([§15.9](<#/doc/jls/jls-15>)), onde um identificador ocorre à direita do token `new` para indicar um tipo que é um membro do tipo em tempo de compilação da expressão que precede o token `new`.

  * Em pares de elemento-valor de anotações ([§9.7.1](<#/doc/jls/jls-09>)), para denotar um elemento da interface de anotação correspondente.

Neste programa:
```
    class Test {
        public static void main(String[] args) {
            Class c = System.out.getClass();
            System.out.println(c.toString().length() +
                               args[0].length() + args.length);
        }
    }
    
```

os identificadores `Test`, `main`, e as primeiras ocorrências de `args` e `c` não são nomes. Em vez disso, são identificadores usados em declarações para especificar os nomes das entidades declaradas. Os nomes `String`, `Class`, `System.out.getClass`, `System.out.println`, `c.toString`, `args`, e `args.length` aparecem no exemplo.

A ocorrência de `length` em `args.length` é um nome porque `args.length` é um nome qualificado ([§6.5.6.2](<#/doc/jls/jls-06>)) e não uma expressão de acesso a campo ([§15.11](<#/doc/jls/jls-15>)). Uma expressão de acesso a campo, assim como uma expressão de invocação de método, uma expressão de referência de método e uma expressão qualificada de criação de instância de classe, usa um identificador em vez de um nome para denotar o membro de interesse. Assim, a ocorrência de `length` em `args[0].length()` _não_ é um nome, mas sim um identificador que aparece em uma expressão de invocação de método.

Pode-se perguntar por que esses tipos de expressão usam um identificador em vez de um nome simples, que afinal é apenas um identificador. A razão é que um nome de expressão simples é definido em termos do ambiente léxico; ou seja, um nome de expressão simples deve estar no escopo de uma declaração de variável ([§6.5.6.1](<#/doc/jls/jls-06>)). Por outro lado, acesso a campo, invocação de método qualificada, referências de método e criação qualificada de instância de classe referem-se a membros cujos nomes não estão no ambiente léxico. Por definição, tais nomes são vinculados apenas no contexto fornecido pelo _Primary_ da expressão de acesso a campo, expressão de invocação de método, expressão de referência de método ou expressão de criação de instância de classe; ou pelo `super` ou _TypeName_`.`super` da expressão de acesso a campo, expressão de invocação de método ou expressão de referência de método; e assim por diante. Assim, denotamos tais membros com identificadores em vez de nomes simples.

Para complicar ainda mais, uma expressão de acesso a campo não é a única maneira de denotar um campo de um objeto. Por razões de análise sintática, um nome qualificado é usado para denotar um campo de uma variável em escopo. (A própria variável é denotada com um nome simples, aludido acima.) É necessário que o controle de acesso ([§6.6](<#/doc/jls/jls-06>)) se aplique a ambas as denotações de um campo.

## 6.3. Escopo de uma Declaração

O _escopo_ de uma declaração é a região do programa dentro da qual a entidade declarada pela declaração pode ser referida usando um nome simples, desde que não seja sombreada ([§6.4.1](<#/doc/jls/jls-06>)).

Uma declaração é considerada _em escopo_ em um determinado ponto de um programa se e somente se o escopo da declaração incluir esse ponto.

O escopo da declaração de um pacote de nível superior observável ([§7.4.3](<#/doc/jls/jls-07>)) são todas as unidades de compilação observáveis associadas a módulos para os quais o pacote é unicamente visível ([§7.4.3](<#/doc/jls/jls-07>)).

A declaração de um pacote que não é observável nunca está em escopo.

A declaração de um subpacote nunca está em escopo.

O pacote `java` está sempre em escopo.

O escopo de uma classe ou interface importada por uma declaração de importação de tipo único ([§7.5.1](<#/doc/jls/jls-07>)), uma declaração de importação de tipo sob demanda ([§7.5.2](<#/doc/jls/jls-07>)), ou uma declaração de importação de módulo único ([§7.5.5](<#/doc/jls/jls-07>)) é a declaração de módulo ([§7.7](<#/doc/jls/jls-07>)) e todas as declarações de classe e interface ([§8.1](<#/doc/jls/jls-08>), [§9.1](<#/doc/jls/jls-09>)) da unidade de compilação na qual a declaração `import` aparece, bem como quaisquer anotações na declaração de módulo ou declaração de pacote da unidade de compilação.

O escopo de um membro importado por uma declaração de importação estática única ([§7.5.3](<#/doc/jls/jls-07>)) ou uma declaração de importação estática sob demanda ([§7.5.4](<#/doc/jls/jls-07>)) é a declaração de módulo e todas as declarações de classe e interface da unidade de compilação na qual a declaração `import` aparece, bem como quaisquer anotações na declaração de módulo ou declaração de pacote da unidade de compilação.

O escopo de uma classe ou interface de nível superior ([§7.6](<#/doc/jls/jls-07>)) declarada em uma unidade de compilação comum são todas as declarações de classe e interface no pacote em que a classe ou interface de nível superior é declarada.

O escopo da declaração implícita de uma classe de nível superior em uma unidade de compilação compacta ([§7.3](<#/doc/jls/jls-07>)) é vazio; a classe nunca está em escopo.

O escopo de uma declaração de um membro `m` declarado ou herdado por uma classe ou interface C ([§8.2](<#/doc/jls/jls-08>), [§9.2](<#/doc/jls/jls-09>)) é o corpo inteiro de C, incluindo quaisquer declarações de classe ou interface aninhadas. Se C for uma record class, então o escopo de `m` inclui adicionalmente o cabeçalho da declaração record de C.

O escopo de um parâmetro formal de um método ([§8.4.1](<#/doc/jls/jls-08>)), construtor ([§8.8.1](<#/doc/jls/jls-08>)), ou lambda expression ([§15.27](<#/doc/jls/jls-15>)) é o corpo inteiro do método, construtor ou lambda expression.

O escopo de um parâmetro de tipo de uma classe ([§8.1.2](<#/doc/jls/jls-08>)) é a seção de parâmetro de tipo da declaração de classe, e a seção de parâmetro de tipo de qualquer tipo de superclasse ou tipo de superinterface da declaração de classe, e o corpo da classe. Se a classe for uma record class ([§8.10](<#/doc/jls/jls-08>)), então o escopo do parâmetro de tipo inclui adicionalmente o cabeçalho da declaração record ([§8.10.1](<#/doc/jls/jls-08>)).

O escopo de um parâmetro de tipo de uma interface ([§9.1.2](<#/doc/jls/jls-09>)) é a seção de parâmetro de tipo da declaração de interface, e a seção de parâmetro de tipo de qualquer tipo de superinterface da declaração de interface, e o corpo da interface.

O escopo de um parâmetro de tipo de um método ([§8.4.4](<#/doc/jls/jls-08>)) é a declaração inteira do método, incluindo a seção de parâmetro de tipo, mas excluindo os modificadores do método.

O escopo de um parâmetro de tipo de um construtor ([§8.8.4](<#/doc/jls/jls-08>)) é a declaração inteira do construtor, incluindo a seção de parâmetro de tipo, mas excluindo os modificadores do construtor.

O escopo de uma declaração de classe ou interface local imediatamente contida por um bloco ([§14.2](<#/doc/jls/jls-14>)) é o restante do bloco imediatamente envolvente, incluindo a própria declaração de classe ou interface local.

O escopo de uma declaração de classe ou interface local imediatamente contida por um grupo de instruções de bloco `switch` ([§14.11](<#/doc/jls/jls-14>)) é o restante do grupo de instruções de bloco `switch` imediatamente envolvente, incluindo a própria declaração de classe ou interface local.

O escopo de uma variável local declarada em um bloco por uma instrução de declaração de variável local ([§14.4.2](<#/doc/jls/jls-14>)) é o restante do bloco, começando com o próprio inicializador da declaração e incluindo quaisquer outros declaradores à direita na instrução de declaração de variável local.

O escopo de uma variável local declarada na parte _ForInit_ de uma instrução `for` básica ([§14.14.1](<#/doc/jls/jls-14>)) inclui tudo o que segue:

  * Seu próprio inicializador

  * Quaisquer outros declaradores à direita na parte _ForInit_ da instrução `for`

  * As partes _Expression_ e _ForUpdate_ da instrução `for`

  * A _Instrução_ contida

O escopo de uma variável local declarada no cabeçalho de uma instrução `for` aprimorada ([§14.14.2](<#/doc/jls/jls-14>)) é a _Instrução_ contida.

O escopo de uma variável local declarada na especificação de recurso de uma instrução `try`-with-resources ([§14.20.3](<#/doc/jls/jls-14>)) vai da declaração para a direita sobre o restante da especificação de recurso e todo o bloco `try` associado à instrução `try`-with-resources.

A tradução de uma instrução `try`-with-resources implica a regra acima.

O escopo de um parâmetro de um manipulador de exceção que é declarado em uma cláusula `catch` de uma instrução `try` ([§14.20](<#/doc/jls/jls-14>)) é o bloco inteiro associado ao `catch`.

**Exemplo 6.3-1. Escopo de Declarações de Classe**

Essas regras implicam que as declarações de tipos de classe e interface não precisam aparecer antes dos usos dos tipos. No programa a seguir, o uso de `PointList` na classe `Point` é válido, porque o escopo da declaração de classe `PointList` inclui tanto a classe `Point` quanto a classe `PointList`, bem como quaisquer outras declarações de classe ou interface em outras unidades de compilação do pacote `points`.
```
    package points;
    class Point {
        int x, y;
        PointList list;
        Point next;
    }
    
    class PointList {
        Point first;
    }
    
```

**Exemplo 6.3-2. Escopo de Declarações de Variáveis Locais**

O programa a seguir causa um erro em tempo de compilação porque a inicialização da variável local `x` está dentro do escopo da declaração da variável local `x`, mas a variável local `x` ainda não possui um valor e não pode ser usada. O campo `x` tem um valor de `0` (atribuído quando `Test1` foi inicializado), mas é uma pista falsa, pois é sombreado ([§6.4.1](<#/doc/jls/jls-06>)) pela variável local `x`.
```
    class Test1 {
        static int x;
        public static void main(String[] args) {
            int x = x;
        }
    }
    
```

O programa a seguir compila:
```
    class Test2 {
        static int x;
        public static void main(String[] args) {
            int x = (x=2)*2;
            System.out.println(x);
        }
    }
    
```

porque a variável local `x` é definitivamente atribuída ([§16 (_Definite Assignment_)](<#/doc/jls/jls-16>)) antes de ser usada. Ele imprime:
```
    4
    
```

No programa a seguir, o inicializador para `three` pode referir-se corretamente à variável `two` declarada em um declarador anterior, e a invocação de método na próxima linha pode referir-se corretamente à variável `three` declarada anteriormente no bloco.
```
    class Test3 {
        public static void main(String[] args) {
            System.out.print("2+1=");
            int two = 2, three = two + 1;
            System.out.println(three);
        }
    }
    
```

Este programa produz a saída:
```
    2+1=3
    
```

O escopo de uma declaração de variável de padrão (ou seja, uma variável local declarada por um padrão) é a parte do programa que pode ser executada após o sucesso da correspondência de um valor com o padrão ([§14.30.2](<#/doc/jls/jls-14>)). É determinado considerando os pontos do programa onde a variável de padrão é _definitivamente correspondida_ em uma região que começa com o padrão que declara a variável de padrão.

O restante desta seção é dedicado a uma explicação precisa das palavras "definitivamente correspondida". A análise leva em consideração a estrutura de instruções e expressões, com um tratamento especial para os operadores de expressão booleana e certas formas de instrução.

Verifica-se que o escopo de uma declaração de variável de padrão é um conceito dependente de fluxo semelhante à atribuição definitiva ([§16 (_Definite Assignment_)](<#/doc/jls/jls-16>)). As regras definidas no restante desta seção têm deliberadamente uma forma semelhante às regras de atribuição definitiva.

A análise baseia-se no termo técnico "introduzido por", que tem a seguinte forma:

  * uma variável de padrão é _introduzida por_ uma expressão _quando verdadeira_

  * uma variável de padrão é _introduzida por_ uma expressão _quando falsa_

  * uma variável de padrão é _introduzida por_ uma instrução

O exemplo mais simples é que a variável de padrão `s` é introduzida pela expressão `a instanceof String s` quando verdadeira. Em outras palavras, se o valor da expressão for `true`, então a correspondência de padrão deve ter sido bem-sucedida, e assim a variável de padrão deve ter recebido um valor.

Em contraste, a variável de padrão `t` é introduzida pela expressão `!(b instanceof Integer t)` quando falsa. Isso ocorre porque a correspondência de padrão só poderia ter sido bem-sucedida se o valor da expressão fosse `false`.

### 6.3.1. Escopo para Variáveis de Padrão em Expressões

Apenas certos tipos de expressões booleanas estão envolvidos na introdução de variáveis de padrão e na determinação de onde essas variáveis são definitivamente correspondidas. Se uma expressão não for uma expressão condicional-e, expressão condicional-ou, expressão de complemento lógico, expressão condicional, expressão `instanceof`, expressão `switch` ou expressão entre parênteses, então nenhuma regra de escopo se aplica.

#### 6.3.1.1. Operador Condicional-E `&&`

As seguintes regras se aplicam a uma expressão condicional-e `a` `&&` `b` ([§15.23](<#/doc/jls/jls-15>)):

  * Uma variável de padrão introduzida por `a` quando verdadeira é definitivamente correspondida em `b`.

  * Uma variável de padrão é introduzida por `a` `&&` `b` quando verdadeira se e somente se (i) for introduzida por `a` quando verdadeira ou (ii) for introduzida por `b` quando verdadeira.

Deve-se notar que não há regra para introduzir uma variável de padrão por `a` `&&` `b` quando falsa. Isso ocorre porque não pode ser determinado em tempo de compilação qual operando será avaliado como `false`.

É um erro em tempo de compilação se alguma das seguintes condições for verdadeira:

  * Uma variável de padrão é (i) introduzida por `a` quando verdadeira e (ii) introduzida por `b` quando verdadeira.

  * Uma variável de padrão é (i) introduzida por `a` quando falsa e (ii) introduzida por `b` quando falsa.

Esses dois casos de erro excluem a possibilidade de ambos os operandos do operador `&&` declararem uma variável de padrão com o mesmo nome. Por exemplo, considere a expressão problemática `(a instanceof String s)` `&&` `(b instanceof String s)`. O primeiro caso de erro cobre a expressão inteira sendo avaliada como `true`, onde (se o código fosse legal) duas declarações de uma variável de padrão `s` precisariam ser inicializadas, dado que tanto o operando esquerdo quanto o operando direito foram avaliados como `true`. Como não há como distinguir as duas variáveis chamadas `s` no restante do programa, a expressão inteira é considerada errônea. O segundo caso de erro cobre o cenário oposto, onde a expressão inteira é avaliada como `false`.

#### 6.3.1.2. Operador Condicional-Ou `||`

As seguintes regras se aplicam a uma expressão condicional-ou `a` `||` `b` ([§15.24](<#/doc/jls/jls-15>)):

  * Uma variável de padrão introduzida por `a` quando falsa é definitivamente correspondida em `b`.

  * Uma variável de padrão é introduzida por `a` `||` `b` quando falsa se e somente se (i) for introduzida por `a` quando falsa ou (ii) for introduzida por `b` quando falsa.

Deve-se notar que não há regra para introduzir uma variável de padrão por `a` `||` `b` quando verdadeira. Isso ocorre porque não pode ser determinado em tempo de compilação qual operando será avaliado como `true`.

É um erro em tempo de compilação se alguma das seguintes condições for verdadeira:

  * Uma variável de padrão é (i) introduzida por `a` quando verdadeira e (ii) introduzida por `b` quando verdadeira.

  * Uma variável de padrão é (i) introduzida por `a` quando falsa e (ii) introduzida por `b` quando falsa.

Esses dois casos de erro excluem a possibilidade de ambos os operandos do operador `||` declararem uma variável de padrão com o mesmo nome. Por exemplo, considere a expressão problemática `(a instanceof String s)` `||` `(b instanceof String s)`. O primeiro caso de erro cobre a expressão inteira sendo avaliada como `true`, onde (se o código fosse legal) exatamente uma declaração de uma variável de padrão `s` seria inicializada dependendo se o operando esquerdo ou o operando direito foi avaliado como `true`. Como não pode ser determinado em tempo de compilação qual operando será avaliado como `true`, e portanto qual declaração de `s` será inicializada, a expressão inteira é considerada errônea. O segundo caso de erro cobre o cenário oposto, onde a expressão inteira é avaliada como `false`.

#### 6.3.1.3. Operador de Complemento Lógico `!`

As seguintes regras se aplicam a uma expressão de complemento lógico `!`a` ([§15.15.6](<#/doc/jls/jls-15>)):

  * Uma variável de padrão é introduzida por `!`a` quando verdadeira se e somente se for introduzida por `a` quando falsa.

  * Uma variável de padrão é introduzida por `!`a` quando falsa se e somente se for introduzida por `a` quando verdadeira.

#### 6.3.1.4. Operador Condicional `? :`

As seguintes regras se aplicam a uma expressão condicional `a` `?` `b` `:` `c` ([§15.25](<#/doc/jls/jls-15>)):

  * Uma variável de padrão introduzida por `a` quando verdadeira é definitivamente correspondida em `b`.

  * Uma variável de padrão introduzida por `a` quando falsa é definitivamente correspondida em `c`.

Deve-se notar que não há regras para introduzir uma variável de padrão por `a` `?` `b` `:` `c` quando verdadeira ou falsa. Isso ocorre porque não pode ser determinado em tempo de compilação se o operando `a` será avaliado como `true`.

É um erro em tempo de compilação se alguma das seguintes condições for verdadeira:

  * Uma variável de padrão é (i) introduzida por `a` quando verdadeira e (ii) introduzida por `c` quando verdadeira.

  * Uma variável de padrão é (i) introduzida por `a` quando verdadeira e (ii) introduzida por `c` quando falsa.

  * Uma variável de padrão é (i) introduzida por `a` quando falsa e (ii) introduzida por `b` quando verdadeira.

  * Uma variável de padrão é (i) introduzida por `a` quando falsa e (ii) introduzida por `b` quando falsa.

  * Uma variável de padrão é (i) introduzida por `b` quando verdadeira e (ii) introduzida por `c` quando verdadeira.

  * Uma variável de padrão é (i) introduzida por `b` quando falsa e (ii) introduzida por `c` quando falsa.

Esses casos de erro são análogos a casos de erro semelhantes para os operadores `&&` e `||`. Eles eliminam casos confusos onde múltiplas declarações da mesma variável de padrão podem ocorrer entre os operandos do operador `? :`.

#### 6.3.1.5. Operador de Correspondência de Padrão `instanceof`

A seguinte regra se aplica a uma expressão `instanceof` com um operando de padrão, `a` `instanceof` `p` ([§15.20.2](<#/doc/jls/jls-15>)):

  * Uma variável de padrão é introduzida por `a` `instanceof` `p` quando verdadeira se e somente se o padrão `p` contiver uma declaração da variável de padrão ([§14.30.1](<#/doc/jls/jls-14>)).

Uma variável de padrão não tem permissão para sombrear outra variável local ([§6.4](<#/doc/jls/jls-06>)).

Deve-se notar que não há regra para introduzir uma variável de padrão por `a` `instanceof` `p` quando falsa.

#### 6.3.1.6. Expressões `switch`

A seguinte regra se aplica a uma expressão `switch` com um bloco `switch` consistindo de regras `switch` ([§14.11.1](<#/doc/jls/jls-14>)):

  * Uma variável de padrão introduzida por um rótulo `switch` é definitivamente correspondida na expressão da regra `switch` associada, bloco da regra `switch` ou instrução `throw` da regra `switch`.

As seguintes regras se aplicam a uma expressão `switch` com um bloco `switch` consistindo de grupos de instruções rotuladas `switch` ([§14.11.1](<#/doc/jls/jls-14>)):

  * Uma variável de padrão introduzida por um rótulo `switch` é definitivamente correspondida em todas as instruções do grupo de instruções rotuladas `switch` associado.

  * Uma variável de padrão introduzida por uma instrução S contida em um grupo de instruções rotuladas `switch` é definitivamente correspondida em todas as instruções que seguem S, se houver, no grupo de instruções rotuladas `switch`.

#### 6.3.1.7. Expressões Entre Parênteses

As seguintes regras se aplicam a uma expressão entre parênteses `(`a`)` ([§15.8.5](<#/doc/jls/jls-15>)):

  * Uma variável de padrão é introduzida por `(`a`)` quando verdadeira se e somente se for introduzida por `a` quando verdadeira.

  * Uma variável de padrão é introduzida por `(`a`)` quando falsa se e somente se for introduzida por `a` quando falsa.

### 6.3.2. Escopo para Variáveis de Padrão em Instruções

Apenas alguns tipos de instruções desempenham um papel significativo na determinação do escopo das variáveis de padrão.

Quando uma instrução `if`, `while`, `do` ou `for` contém uma expressão que introduz variáveis de padrão, o escopo dessas variáveis pode, em certas circunstâncias, incluir subinstruções da instrução.

Por exemplo, na seguinte instrução `if`-`then`-`else`, o escopo da variável de padrão `s` inclui uma subinstrução, mas não outra:
```
    Object o = ...
    if (o instanceof String s)
        // s em escopo para esta subinstrução; nenhum cast de o é necessário
        System.out.println(s.replace('*', '_'));
    else
        // s não em escopo para esta subinstrução (portanto, erro)
        System.out.println(s);
    
```

Além disso, em certas circunstâncias, uma variável de padrão pode ser introduzida por uma instrução em si, em vez de por uma expressão dentro da instrução. Uma variável de padrão introduzida por uma instrução está em escopo nas instruções seguintes no bloco envolvente.

Por exemplo, no método a seguir, o escopo da variável de padrão `s` inclui o corpo do método após a instrução `if`:
```
    void test(Object o) {
        if (!(o instanceof String s)) {
            throw new IllegalArgumentException();
        }
        // Este ponto só é alcançável se a correspondência de padrão foi bem-sucedida
        // Assim, s está em escopo para o restante do bloco
        ...
        System.out.println(s.repeat(5));
        ...
    }
    
```

#### 6.3.2.1. Blocos

A seguinte regra se aplica a uma instrução de bloco S contida em um bloco ([§14.2](<#/doc/jls/jls-14>)) que não é um bloco `switch` ([§14.11.1](<#/doc/jls/jls-14>)):

  * Uma variável de padrão introduzida por S é definitivamente correspondida em todas as instruções de bloco que seguem S, se houver, no bloco.

#### 6.3.2.2. Instruções `if`

As seguintes regras se aplicam a uma instrução `if` `(`e`)` S ([§14.9.1](<#/doc/jls/jls-14>)):

  * Uma variável de padrão introduzida por `e` quando verdadeira é definitivamente correspondida em S.

  * Uma variável de padrão é introduzida por `if` `(`e`)` S se e somente se (i) for introduzida por `e` quando falsa e (ii) S não puder ser concluída normalmente.

A regra sobre uma instrução `if`-`then` que introduz uma variável de padrão baseia-se na noção de "não pode ser concluída normalmente" ([§14.22](<#/doc/jls/jls-14>)), que por sua vez se baseia no conceito de uma expressão constante ([§15.29](<#/doc/jls/jls-15>)). Isso significa que o cálculo do escopo de uma variável de padrão pode exigir a determinação se um nome simples, ou um nome qualificado na forma _TypeName_ `.` _Identifier_ , se refere a uma variável constante. Como as variáveis de padrão nunca podem se referir a uma variável constante, não há circularidade.

As seguintes regras se aplicam a uma instrução `if` `(`e`)` S `else` T ([§14.9.2](<#/doc/jls/jls-14>)):

  * Uma variável de padrão introduzida por `e` quando verdadeira é definitivamente correspondida em S.

  * Uma variável de padrão introduzida por `e` quando falsa é definitivamente correspondida em T.

  * Uma variável de padrão é introduzida por `if` `(`e`)` S `else` T se e somente se:

    * For introduzida por `e` quando verdadeira, e S puder ser concluída normalmente, e T não puder ser concluída normalmente; ou

    * For introduzida por `e` quando falsa, e S não puder ser concluída normalmente, e T puder ser concluída normalmente.

Essas regras destacam a natureza de fluxo do escopo para variáveis de padrão. Por exemplo, na seguinte instrução:
```
    if (e instanceof String s) {
        counter += s.length();
    } else {
        System.out.println(e);  // s not in scope
    }
    
```

A variável de padrão `s` é introduzida pela expressão `instanceof` e está em escopo na primeira instrução contida (a instrução de atribuição no bloco `then`), mas não está em escopo na segunda instrução contida (a instrução de expressão no bloco `else`).

Além disso, combinada com o tratamento para expressões booleanas, o escopo das variáveis de padrão é robusto contra refatorações de código que exploram as equivalências lógicas booleanas familiares. Por exemplo, o código anterior pode ser reescrito como:
```
    if (!(e instanceof String s)) {
        System.out.println(e);  // s not in scope
    } else {
        counter += s.length();
    }
    
```

O código pode até ser reescrito da seguinte forma, embora o uso duplo do operador `!` não seja necessariamente recomendado:
```
    if (!!(e instanceof String s)) {
        counter += s.length();
    } else {
        System.out.println(e);  // s not in scope
    }
    
```

#### 6.3.2.3. Instruções `while`

As seguintes regras se aplicam a uma instrução `while` `(`e`)` S ([§14.12](<#/doc/jls/jls-14>)):

  * Uma variável de padrão introduzida por `e` quando verdadeira é definitivamente correspondida em S.

  * Uma variável de padrão é introduzida por `while` `(`e`)` S se e somente se (i) for introduzida por `e` quando falsa e (ii) S não contiver uma instrução `break` alcançável para a qual a instrução `while` seja o alvo do `break` ([§14.15](<#/doc/jls/jls-14>)).

#### 6.3.2.4. Instruções `do`

A seguinte regra se aplica a uma instrução `do` S `while` `(`e`)` ([§14.13](<#/doc/jls/jls-14>)):

  * Uma variável de padrão é introduzida por `do` S `while` `(`e`)` se e somente se (i) for introduzida por `e` quando falsa e (ii) S não contiver uma instrução `break` alcançável para a qual a instrução `do` seja o alvo do `break` ([§14.15](<#/doc/jls/jls-14>)).

#### 6.3.2.5. Instruções `for`

As seguintes regras se aplicam a uma instrução `for` básica ([§14.14.1](<#/doc/jls/jls-14>)):

  * Uma variável de padrão introduzida pela expressão de condição quando verdadeira é definitivamente correspondida tanto na parte de incremento quanto na instrução contida.

  * Uma variável de padrão é introduzida por uma instrução `for` básica se e somente se (i) for introduzida pela expressão de condição quando falsa e (ii) a instrução contida, S, não contiver um `break` alcançável para o qual a instrução `for` básica seja o alvo do `break` ([§14.15](<#/doc/jls/jls-14>)).

Uma instrução `for` aprimorada ([§14.14.2](<#/doc/jls/jls-14>)) é definida por tradução para uma instrução `for` básica, portanto, nenhuma regra especial precisa ser fornecida para ela.

#### 6.3.2.6. Instruções `switch`

A seguinte regra se aplica a uma instrução `switch` com um bloco `switch` consistindo de regras `switch` ([§14.11.1](<#/doc/jls/jls-14>)):

  * Uma variável de padrão introduzida por um rótulo `switch` é definitivamente correspondida na expressão da regra `switch` associada, bloco da regra `switch` ou instrução `throw` da regra `switch`.

As seguintes regras se aplicam a uma instrução `switch` com um bloco `switch` consistindo de grupos de instruções rotuladas `switch` ([§14.11.1](<#/doc/jls/jls-14>)):
*   Uma variável de padrão introduzida por um rótulo `switch` é definitivamente correspondida em todas as instruções do grupo de instruções rotuladas `switch` associado.
*   Uma variável de padrão introduzida por uma instrução S contida em um grupo de instruções de bloco `switch` é definitivamente correspondida em todas as instruções que seguem S, se houver, no grupo de instruções de bloco `switch`.

#### 6.3.2.7. Instruções Rotuladas

A seguinte regra se aplica a uma instrução rotulada ([§14.7](<#/doc/jls/jls-14>)):
*   Uma variável de padrão é introduzida por uma instrução rotulada `L`:` S (onde `L` é um rótulo) se e somente se (i) ela for introduzida pela instrução S, e (ii) S não contiver uma instrução `break` alcançável para a qual a instrução rotulada é o alvo do `break` ([§14.15](<#/doc/jls/jls-14>)).

### 6.3.3. Escopo para Variáveis de Padrão em Rótulos `case`

Variáveis de padrão podem ser introduzidas por rótulos `case` com um padrão `case`, seja pelo próprio padrão ou por uma guarda, e estão no escopo para as partes relevantes da expressão `switch` associada ([§6.3.1.6](<#/doc/jls/jls-06>)) ou instrução `switch` ([§6.3.2.6](<#/doc/jls/jls-06>)).

As seguintes regras se aplicam aos rótulos `case`:
*   Uma variável de padrão é introduzida por um rótulo `case` com um padrão `case` `p` se `p` contiver uma declaração da variável de padrão.
*   Se um padrão `case` em um rótulo `case` guardado contiver uma declaração de uma variável de padrão, então a variável de padrão é definitivamente correspondida na guarda associada.
*   Uma variável de padrão é introduzida por um rótulo `case` guardado se for introduzida pela guarda associada quando verdadeira ([§6.3.1](<#/doc/jls/jls-06>)).

## 6.4. Sombreamento e Obscurecimento

Uma variável local ([§14.4](<#/doc/jls/jls-14>)), parâmetro formal ([§8.4.1](<#/doc/jls/jls-08>), [§8.8.1](<#/doc/jls/jls-08>), [§15.27.1](<#/doc/jls/jls-15>)), parâmetro de exceção ([§14.20](<#/doc/jls/jls-14>)), classe local ou interface local ([§14.3](<#/doc/jls/jls-14>)) só pode ser referenciada usando um nome simples, não um nome qualificado ([§6.2](<#/doc/jls/jls-06>)).

Algumas declarações não são permitidas dentro do escopo de uma declaração de variável local, declaração de parâmetro formal, declaração de parâmetro de exceção, declaração de classe local ou declaração de interface local porque seria impossível distinguir entre as entidades declaradas usando apenas nomes simples.

Por exemplo, se o nome de um parâmetro formal de um método pudesse ser redeclarado como o nome de uma variável local no corpo do método, então a variável local sombrearia o parâmetro formal e não haveria como referenciar o parâmetro formal - um resultado indesejável.

É um erro em tempo de compilação se o nome de um parâmetro formal for usado para declarar uma nova variável dentro do corpo do método, construtor ou expressão lambda, a menos que a nova variável seja declarada dentro de uma declaração de classe ou interface contida pelo método, construtor ou expressão lambda.

É um erro em tempo de compilação se o nome de uma variável local `v` for usado para declarar uma nova variável dentro do escopo de `v`, a menos que a nova variável seja declarada dentro de uma declaração de classe ou interface que apareça dentro do escopo de `v`.

É um erro em tempo de compilação se o nome de um parâmetro de exceção for usado para declarar uma nova variável dentro do _Bloco_ da cláusula `catch`, a menos que a nova variável seja declarada dentro de uma declaração de classe ou interface contida pelo _Bloco_ da cláusula `catch`.

É um erro em tempo de compilação se o nome de uma classe ou interface local C for usado para declarar uma nova classe ou interface local dentro do escopo de C, a menos que a nova classe ou interface local seja declarada dentro de uma declaração de classe ou interface que apareça dentro do escopo de C.

Essas regras permitem a redeclaração de uma variável, classe local ou interface local em declarações de classe ou interface aninhadas que ocorrem no escopo da variável, classe local ou interface local; tais declarações de classe ou interface aninhadas podem ser declarações de classe ou interface local ([§14.3](<#/doc/jls/jls-14>)) ou declarações de classe anônima ([§15.9.5](<#/doc/jls/jls-15>)). Assim, a declaração de um parâmetro formal, variável local, classe local ou interface local pode ser sombreada em uma declaração de classe ou interface aninhada dentro de um método, construtor ou expressão lambda; e a declaração de um parâmetro de exceção pode ser sombreada em uma declaração de classe ou interface aninhada dentro do _Bloco_ da cláusula `catch`.

Existem duas alternativas de design para lidar com conflitos de nomes criados por parâmetros lambda e outras variáveis declaradas em expressões lambda. Uma é imitar declarações de classe: como classes locais, expressões lambda introduzem um novo "nível" para nomes, e todos os nomes de variáveis fora da expressão podem ser redeclarados. Outra é uma estratégia "local": como cláusulas `catch`, laços `for` e blocos, expressões lambda operam no mesmo "nível" que o contexto envolvente, e variáveis locais fora da expressão não podem ser sombreadas. As regras acima usam a estratégia local; não há uma dispensa especial que permita que uma variável declarada em uma expressão lambda sombreie uma variável declarada em um método envolvente.

**Exemplo 6.4-1. Tentativa de Sombreamento de Uma Variável Local**

Como a declaração de um identificador como variável local de um método, construtor ou bloco inicializador não deve aparecer dentro do escopo de um parâmetro ou variável local com o mesmo nome, ocorre um erro em tempo de compilação para o seguinte programa:
```
    class Test1 {
        public static void main(String[] args) {
            int i;
            for (int i = 0; i < 10; i++)
                System.out.println(i);
        }
    }
    
```

Essa restrição ajuda a detectar alguns bugs que, de outra forma, seriam muito obscuros. Uma restrição semelhante ao sombreamento de membros por variáveis locais foi considerada impraticável, porque a adição de um membro em uma superclasse poderia fazer com que as subclasses tivessem que renomear variáveis locais. Considerações relacionadas tornam as restrições ao sombreamento de variáveis locais por membros de classes aninhadas, ou ao sombreamento de variáveis locais por variáveis locais declaradas dentro de classes aninhadas, igualmente pouco atraentes.

Portanto, o seguinte programa compila sem erro:
```
    class Test2 {
        public static void main(String[] args) {
            int i;
            class Local {
                {
                    for (int i = 0; i < 10; i++)
                        System.out.println(i);
                }
            }
            new Local();
        }
    }
    
```

Por outro lado, variáveis locais com o mesmo nome podem ser declaradas em dois blocos separados ou instruções `for`, nenhum dos quais contém o outro:
```
    class Test3 {
        public static void main(String[] args) {
            for (int i = 0; i < 10; i++)
                System.out.print(i + " ");
            for (int i = 10; i > 0; i--)
                System.out.print(i + " ");
            System.out.println();
        }
    }
    
```

Este programa compila sem erro e, quando executado, produz a saída:
```
    0 1 2 3 4 5 6 7 8 9 10 9 8 7 6 5 4 3 2 1
    
```

Este estilo também é comum com a correspondência de padrões (pattern matching), onde padrões repetidos frequentemente empregam o mesmo nome:
```
    class Point {
        int x, y;
        Point(int x, int y) { this.x = x; this.y = y; }
    }
    
    class Test4 {
        static void test(Object a, Object b, Object c) {
            if (a instanceof Point p) {
                System.out.println("a is a point ("+p.x+","+p.y+")");
            }
            if (b instanceof Point p){
                System.out.println("b is a point ("+p.x+","+p.y+")");
            } else if (c instanceof Point p) {
                System.out.println("c is a point ("+p.x+","+p.y+")");
            }
        }
    
        public static void main(String[] args) {
            Point p = new Point(2,3);
            Point q = new Point(4,5);
            Point r = new Point(6,7);
            test(p, q, r);
        }
    }
    
    
```

No entanto, variáveis de padrão não podem sombrear variáveis locais, incluindo outras variáveis de padrão, então dois erros em tempo de compilação ocorrem para o seguinte programa:
```
    class Point {
        int x, y;
        Point(int x, int y) { this.x = x; this.y = y; }
    }
    
    class Test5 {
        static void test(Object a, Object b, Object c) {
            if (a instanceof Point p) {
                System.out.println("a is a point ("+p.x+","+p.y+")");
    
                if (b instanceof Point p) {  // compile-time error
                    System.out.println("b is a point ("+p.x+","+p.y+")");
                }
            }
        }
    
        public static void main(String[] args) {
            Point p = new Point(2,3);
            Point q = new Point(4,5);
            Point r = new Point(6,7);
            test(p, q, r);
    
            if (new Object() instanceof Point q)  // compile-time error
                System.out.println("I get your point");
        }
    }
    
    
```

### 6.4.1. Sombreamento

Algumas declarações podem ser _sombreadas_ em parte de seu escopo por outra declaração com o mesmo nome, caso em que um nome simples não pode ser usado para referenciar a entidade declarada.

O sombreamento é distinto do ocultamento ([§8.3](<#/doc/jls/jls-08>), [§8.4.8.2](<#/doc/jls/jls-08>), [§8.5](<#/doc/jls/jls-08>), [§9.3](<#/doc/jls/jls-09>), [§9.5](<#/doc/jls/jls-09>)), que se aplica apenas a membros que seriam herdados, mas não o são devido a uma declaração em uma subclasse. O sombreamento também é distinto do obscurecimento ([§6.4.2](<#/doc/jls/jls-06>)).

Uma declaração d de um tipo nomeado n sombreia as declarações de quaisquer outros tipos nomeados n que estão no escopo no ponto onde d ocorre, em todo o escopo de d.

Uma declaração d de um campo ou parâmetro formal nomeado n sombreia, em todo o escopo de d, as declarações de quaisquer outras variáveis nomeadas n que estão no escopo no ponto onde d ocorre.

Uma declaração d de uma variável local ou parâmetro de exceção nomeado n sombreia, em todo o escopo de d, (a) as declarações de quaisquer outros campos nomeados n que estão no escopo no ponto onde d ocorre, e (b) as declarações de quaisquer outras variáveis nomeadas n que estão no escopo no ponto onde d ocorre, mas _não_ são declaradas na classe mais interna na qual d é declarada.

Uma declaração d de um método nomeado n sombreia as declarações de quaisquer outros métodos nomeados n que estão em um escopo envolvente no ponto onde d ocorre, em todo o escopo de d.

Uma declaração de pacote nunca sombreia qualquer outra declaração.

Uma declaração de importação de tipo sob demanda d em uma unidade de compilação c do pacote p que importa um tipo nomeado n sombreia, em toda c, as declarações de qualquer tipo nomeado n importado por uma declaração de importação de módulo único em c.

Em particular, como todas as unidades de compilação são tratadas como se contivessem a declaração implícita `import java.lang.*;` ([§7.3](<#/doc/jls/jls-07>)), isso significa que a declaração de um tipo importado por uma declaração de importação de módulo único com o mesmo nome de um importado do pacote `java.lang` é sempre sombreada.

Uma declaração de importação estática sob demanda d em uma unidade de compilação c do pacote p que importa um tipo nomeado n sombreia, em toda c, as declarações de qualquer tipo nomeado n importado por uma declaração de importação de módulo único em c.

Uma declaração de importação de módulo único nunca causa o sombreamento de qualquer outra declaração.

Uma declaração de importação de tipo único d em uma unidade de compilação c do pacote p que importa um tipo nomeado n sombreia, em toda c, as declarações de:
*   qualquer tipo de nível superior nomeado n declarado em outra unidade de compilação de p
*   qualquer tipo nomeado n importado por uma declaração de importação de tipo sob demanda em c
*   qualquer tipo nomeado n importado por uma declaração de importação estática sob demanda em c
*   qualquer tipo nomeado n importado por uma declaração de importação de módulo único em c

Uma declaração de importação estática única `d` em uma unidade de compilação `c` do pacote `p` que importa um campo nomeado `n` sombreia a declaração de qualquer campo estático nomeado `n` importado por uma declaração de importação estática sob demanda em `c`, em toda `c`.

Uma declaração de importação estática única `d` em uma unidade de compilação `c` do pacote `p` que importa um método nomeado `n` com assinatura s sombreia a declaração de qualquer método estático nomeado n com assinatura s importado por uma declaração de importação estática sob demanda em `c`, em toda `c`.

Uma declaração de importação estática única `d` em uma unidade de compilação `c` do pacote `p` que importa um tipo nomeado n sombreia, em toda `c`, as declarações de:
*   qualquer tipo estático nomeado n importado por uma declaração de importação estática sob demanda em `c`;
*   qualquer tipo de nível superior ([§7.6](<#/doc/jls/jls-07>)) nomeado n declarado em outra unidade de compilação ([§7.3](<#/doc/jls/jls-07>)) de `p`;
*   qualquer tipo nomeado n importado por uma declaração de importação de tipo sob demanda ([§7.5.2](<#/doc/jls/jls-07>)) em `c`;
*   qualquer tipo nomeado n importado por uma declaração de importação de módulo único ([§7.5.5](<#/doc/jls/jls-07>)) em `c`.

**Exemplo 6.4.1-1. Sombreamento de uma Declaração de Campo por uma Declaração de Variável Local**
```
    class Test {
        static int x = 1;
        public static void main(String[] args) {
            int x = 0;
            System.out.print("x=" + x);
            System.out.println(", Test.x=" + Test.x);
        }
    }
    
```

Este programa produz a saída:
```
    x=0, Test.x=1
    
```

Este programa declara:
*   uma classe `Test`
*   uma variável de classe (`static`) `x` que é membro da classe `Test`
*   um método de classe `main` que é membro da classe `Test`
*   um parâmetro `args` do método `main`
*   uma variável local `x` do método `main`

Como o escopo de uma variável de classe inclui todo o corpo da classe ([§8.2](<#/doc/jls/jls-08>)), a variável de classe `x` normalmente estaria disponível em todo o corpo do método `main`. Neste exemplo, no entanto, a variável de classe `x` é sombreada dentro do corpo do método `main` pela declaração da variável local `x`.

Uma variável local tem como seu escopo o restante do bloco em que é declarada ([§6.3](<#/doc/jls/jls-06>)); neste caso, é o restante do corpo do método `main`, ou seja, seu inicializador "`0`" e as invocações de `System.out.print` e `System.out.println`.

Isso significa que:
*   A expressão `x` na invocação de `print` refere-se (denota) ao valor da variável local `x`.
*   A invocação de `println` usa um nome qualificado ([§6.6](<#/doc/jls/jls-06>)) `Test.x`, que usa o nome do tipo de classe `Test` para acessar a variável de classe `x`, porque a declaração de `Test.x` é sombreada neste ponto e não pode ser referenciada por seu nome simples.

A palavra-chave `this` também pode ser usada para acessar um campo sombreado `x`, usando a forma `this.x`. De fato, este idioma tipicamente aparece em construtores ([§8.8](<#/doc/jls/jls-08>)):
```
    class Pair {
        Object first, second;
        public Pair(Object first, Object second) {
            this.first = first;
            this.second = second;
        }
    }
    
```

Aqui, o construtor recebe parâmetros com os mesmos nomes dos campos a serem inicializados. Isso é mais simples do que ter que inventar nomes diferentes para os parâmetros e não é muito confuso neste contexto estilizado. Em geral, no entanto, é considerado um estilo ruim ter variáveis locais com os mesmos nomes dos campos.

**Exemplo 6.4.1-2. Sombreamento de uma Declaração de Tipo por Outra Declaração de Tipo**
```
    import java.util.*;
    
    class Vector {
        int[] val = { 1 , 2 };
    }
    
    class Test {
        public static void main(String[] args) {
            Vector v = new Vector();
            System.out.println(v.val[0]);
        }
    }
    
    
```

O programa compila e imprime:
```
    1
    
```

usando a classe `Vector` declarada aqui em preferência à classe genérica `java.util.Vector` ([§8.1.2](<#/doc/jls/jls-08>)) que poderia ser importada sob demanda.

### 6.4.2. Obscurecimento

Um nome simples pode ocorrer em contextos onde pode ser potencialmente interpretado como o nome de uma variável, um tipo ou um pacote. Nessas situações, as regras de [§6.5.2](<#/doc/jls/jls-06>) especificam que uma variável será escolhida em preferência a um tipo, e que um tipo será escolhido em preferência a um pacote. Assim, às vezes pode ser impossível referenciar um tipo ou pacote através de seu nome simples, mesmo que sua declaração esteja no escopo e não seja sombreada. Dizemos que tal declaração é _obscurecida_.

O obscurecimento é distinto do sombreamento ([§6.4.1](<#/doc/jls/jls-06>)) e do ocultamento ([§8.3](<#/doc/jls/jls-08>), [§8.4.8.2](<#/doc/jls/jls-08>), [§8.5](<#/doc/jls/jls-08>), [§9.3](<#/doc/jls/jls-09>), [§9.5](<#/doc/jls/jls-09>)).

Não há obscurecimento entre o nome de um módulo e o nome de uma variável, tipo ou pacote; assim, módulos podem compartilhar nomes com variáveis, tipos e pacotes, embora não seja necessariamente recomendado nomear um módulo com o mesmo nome de um pacote que ele contém.

As convenções de nomenclatura de [§6.1](<#/doc/jls/jls-06>) ajudam a reduzir o obscurecimento, mas se ele ocorrer, aqui estão algumas notas sobre o que você pode fazer para evitá-lo.

Quando nomes de pacotes ocorrem em expressões:
*   Se um nome de pacote for obscurecido por uma declaração de campo, então as declarações `import` ([§7.5](<#/doc/jls/jls-07>)) geralmente podem ser usadas para disponibilizar os nomes de tipo declarados nesse pacote.
*   Se um nome de pacote for obscurecido por uma declaração de um parâmetro ou variável local, então o nome do parâmetro ou variável local pode ser alterado sem afetar outro código.

O primeiro componente de um nome de pacote normalmente não é facilmente confundido com um nome de tipo, pois um nome de tipo normalmente começa com uma única letra maiúscula. (A linguagem de programação Java não depende realmente de distinções de maiúsculas e minúsculas para determinar se um nome é um nome de pacote ou um nome de tipo.)

O obscurecimento envolvendo nomes de tipos de classes e interfaces é raro. Nomes de campos, parâmetros e variáveis locais normalmente não obscurecem nomes de tipos porque eles convencionalmente começam com uma letra minúscula, enquanto nomes de tipos convencionalmente começam com uma letra maiúscula.

Nomes de métodos não podem obscurecer ou ser obscurecidos por outros nomes ([§6.5.7](<#/doc/jls/jls-06>)).

O obscurecimento envolvendo nomes de campos é raro; no entanto:
*   Se um nome de campo obscurecer um nome de pacote, então uma declaração `import` ([§7.5](<#/doc/jls/jls-07>)) geralmente pode ser usada para disponibilizar os nomes de tipo declarados nesse pacote.
*   Se um nome de campo obscurecer um nome de tipo, então um nome totalmente qualificado para o tipo pode ser usado, a menos que o nome do tipo denote uma classe ou interface local ([§14.3](<#/doc/jls/jls-14>)).
*   Nomes de campos não podem obscurecer nomes de métodos.
*   Se um nome de campo for sombreado por uma declaração de um parâmetro ou variável local, então o nome do parâmetro ou variável local pode ser alterado sem afetar outro código.

O obscurecimento envolvendo nomes de constantes é raro:
*   Nomes de constantes normalmente não têm letras minúsculas, então eles normalmente não obscurecerão nomes de pacotes ou tipos, nem sombrearão campos, cujos nomes tipicamente contêm pelo menos uma letra minúscula.
*   Nomes de constantes não podem obscurecer nomes de métodos, porque eles são distinguidos sintaticamente.
## 6.5. Determinando o Significado de um Nome

O significado de um nome depende do contexto em que é usado. A determinação do significado de um nome requer três etapas:

  * Primeiro, o contexto faz com que um nome caia sintaticamente em uma das sete categorias: _ModuleName_, _PackageName_, _TypeName_, _ExpressionName_, _MethodName_, _PackageOrTypeName_ ou _AmbiguousName_.

_TypeName_ e _MethodName_ são menos expressivos que as outras cinco categorias, porque são denotados por _TypeIdentifier_ e _UnqualifiedMethodIdentifier_, respectivamente ([§3.8](<#/doc/jls/jls-03>)).

  * Segundo, um nome que é inicialmente classificado por seu contexto como um _AmbiguousName_ ou como um _PackageOrTypeName_ é então reclassificado para ser um _PackageName_, _TypeName_ ou _ExpressionName_.

  * Terceiro, a categoria resultante então dita a determinação final do significado do nome (ou um erro em tempo de compilação se o nome não tiver significado).

ModuleName:

[Identifier](<#/doc/jls/jls-03>)
[ModuleName](<#/doc/jls/jls-06>) `.` [Identifier](<#/doc/jls/jls-03>)

PackageName:

[Identifier](<#/doc/jls/jls-03>)
[PackageName](<#/doc/jls/jls-06>) `.` [Identifier](<#/doc/jls/jls-03>)

TypeName:

[TypeIdentifier](<#/doc/jls/jls-03>)
[PackageOrTypeName](<#/doc/jls/jls-06>) `.` [TypeIdentifier](<#/doc/jls/jls-03>)

PackageOrTypeName:

[Identifier](<#/doc/jls/jls-03>)
[PackageOrTypeName](<#/doc/jls/jls-06>) `.` [Identifier](<#/doc/jls/jls-03>)

ExpressionName:

[Identifier](<#/doc/jls/jls-03>)
[AmbiguousName](<#/doc/jls/jls-06>) `.` [Identifier](<#/doc/jls/jls-03>)

MethodName:

[UnqualifiedMethodIdentifier](<#/doc/jls/jls-03>)

AmbiguousName:

[Identifier](<#/doc/jls/jls-03>)
[AmbiguousName](<#/doc/jls/jls-06>) `.` [Identifier](<#/doc/jls/jls-03>)

O uso do contexto ajuda a minimizar conflitos de nomes entre entidades de diferentes tipos. Tais conflitos serão raros se as convenções de nomenclatura descritas em [§6.1](<#/doc/jls/jls-06>) forem seguidas. No entanto, conflitos podem surgir involuntariamente à medida que tipos desenvolvidos por diferentes programadores ou diferentes organizações evoluem. Por exemplo, tipos, métodos e campos podem ter o mesmo nome. É sempre possível distinguir entre um método e um campo com o mesmo nome, pois o contexto de uso sempre indica se um método é pretendido.

### 6.5.1. Classificação Sintática de um Nome de Acordo com o Contexto

Um nome é sintaticamente classificado como um _ModuleName_ nestes contextos:

  * Em uma diretiva `requires` em uma declaração de módulo ([§7.7.1](<#/doc/jls/jls-07>))

  * À direita de `to` em uma diretiva `exports` ou `opens` em uma declaração de módulo ([§7.7.2](<#/doc/jls/jls-07>))

  * À direita de `module` em uma declaração de importação de módulo único ([§7.5.5](<#/doc/jls/jls-07>))

Um nome é sintaticamente classificado como um _PackageName_ nestes contextos:

  * À direita de `exports` ou `opens` em uma declaração de módulo

  * À esquerda do "`.`" em um _PackageName_ qualificado

Um nome é sintaticamente classificado como um _TypeName_ nestes contextos:

  * Para nomear uma classe ou interface:

    1. Em uma diretiva `uses` ou `provides` em uma declaração de módulo ([§7.7.1](<#/doc/jls/jls-07>))

    2. Em uma declaração de importação de tipo único ([§7.5.1](<#/doc/jls/jls-07>))

    3. À esquerda do `.` em uma declaração de importação estática única ([§7.5.3](<#/doc/jls/jls-07>))

    4. À esquerda do `.` em uma declaração de importação estática sob demanda ([§7.5.4](<#/doc/jls/jls-07>))

    5. Em uma cláusula `permits` de uma declaração de classe ou interface `sealed` ([§8.1.6](<#/doc/jls/jls-08>), [§9.1.4](<#/doc/jls/jls-09>)).

    6. À esquerda do `(` em uma declaração de construtor ([§8.8](<#/doc/jls/jls-08>))

    7. Após o sinal `@` em uma anotação ([§9.7](<#/doc/jls/jls-09>))

    8. À esquerda de `.`class` em um literal de classe ([§15.8.2](<#/doc/jls/jls-15>))

    9. À esquerda de `.`this` em uma expressão `this` qualificada ([§15.8.4](<#/doc/jls/jls-15>))

    10. À esquerda de `.`super` em uma expressão de acesso a campo de superclasse qualificada ([§15.11.2](<#/doc/jls/jls-15>))

    11. À esquerda de `.`_Identifier_ ou `.`super`.`_Identifier_ em uma expressão de invocação de método qualificada ([§15.12](<#/doc/jls/jls-15>))

    12. À esquerda de `.`super`::` em uma expressão de referência de método ([§15.13](<#/doc/jls/jls-15>))

  * Como a sequência _Identifier_ ou _Identifier_ pontilhada que constitui qualquer _ReferenceType_ (incluindo um _ReferenceType_ à esquerda dos colchetes em um tipo de array, ou à esquerda do < em um tipo parametrizado, ou em um argumento de tipo não-coringa de um tipo parametrizado, ou em uma cláusula `extends` ou `super` de um argumento de tipo coringa de um tipo parametrizado) nos 17 contextos onde os tipos são usados ([§4.11](<#/doc/jls/jls-04>)):

    1. Em uma cláusula `extends` ou `implements` de uma declaração de classe ([§8.1.4](<#/doc/jls/jls-08>), [§8.1.5](<#/doc/jls/jls-08>))

    2. Em uma cláusula `extends` de uma declaração de interface ([§9.1.3](<#/doc/jls/jls-09>))

    3. O tipo de retorno de um método ([§8.4.5](<#/doc/jls/jls-08>), [§9.4](<#/doc/jls/jls-09>)), incluindo o tipo de um elemento de uma interface de anotação ([§9.6.1](<#/doc/jls/jls-09>))

    4. Na cláusula `throws` de um método ou construtor ([§8.4.6](<#/doc/jls/jls-08>), [§8.8.5](<#/doc/jls/jls-08>), [§9.4](<#/doc/jls/jls-09>))

    5. Em uma cláusula `extends` de uma declaração de parâmetro de tipo de uma classe, interface, método ou construtor genérico ([§8.1.2](<#/doc/jls/jls-08>), [§9.1.2](<#/doc/jls/jls-09>), [§8.4.4](<#/doc/jls/jls-08>), [§8.8.4](<#/doc/jls/jls-08>))

    6. O tipo em uma declaração de campo de uma classe ou interface ([§8.3](<#/doc/jls/jls-08>), [§9.3](<#/doc/jls/jls-09>))

    7. O tipo em uma declaração de parâmetro formal de um método, construtor ou expressão lambda ([§8.4.1](<#/doc/jls/jls-08>), [§8.8.1](<#/doc/jls/jls-08>), [§9.4](<#/doc/jls/jls-09>), [§15.27.1](<#/doc/jls/jls-15>))

    8. O tipo do parâmetro receptor de um método ([§8.4](<#/doc/jls/jls-08>))

    9. O tipo em uma declaração de variável local em uma instrução ([§14.4.2](<#/doc/jls/jls-14>), [§14.14.1](<#/doc/jls/jls-14>), [§14.14.2](<#/doc/jls/jls-14>), [§14.20.3](<#/doc/jls/jls-14>)) ou um padrão ([§14.30.1](<#/doc/jls/jls-14>))

    10. Um tipo em uma declaração de parâmetro de exceção ([§14.20](<#/doc/jls/jls-14>))

    11. O tipo em uma declaração de componente de registro de uma classe record ([§8.10.1](<#/doc/jls/jls-08>))

    12. Em uma lista explícita de argumentos de tipo para uma invocação de construtor ou expressão de criação de instância de classe ou expressão de invocação de método ([§8.8.7.1](<#/doc/jls/jls-08>), [§15.9](<#/doc/jls/jls-15>), [§15.12](<#/doc/jls/jls-15>))

    13. Em uma expressão de criação de instância de classe não qualificada, seja como o tipo de classe a ser instanciado ([§15.9](<#/doc/jls/jls-15>)) ou como a superclasse direta ou superinterface direta de uma classe anônima a ser instanciada ([§15.9.5](<#/doc/jls/jls-15>))

    14. O tipo de elemento em uma expressão de criação de array ([§15.10.1](<#/doc/jls/jls-15>))

    15. O tipo no operador de cast de uma expressão de cast ([§15.16](<#/doc/jls/jls-15>))

    16. O tipo que segue o operador relacional `instanceof` ([§15.20.2](<#/doc/jls/jls-15>))

    17. Em uma expressão de referência de método ([§15.13](<#/doc/jls/jls-15>)), como o tipo de referência para procurar um método membro ou como o tipo de classe ou tipo de array para construir.

A extração de um _TypeName_ dos identificadores de um _ReferenceType_ nos 17 contextos acima se destina a ser aplicada recursivamente a todos os subtermos do _ReferenceType_, como seu tipo de elemento e quaisquer argumentos de tipo.

Por exemplo, suponha que uma declaração de campo use o tipo `p.q.Foo[]`. Os colchetes do tipo de array são ignorados, e o termo `p.q.Foo` é extraído como uma sequência pontilhada de _Identifiers_ à esquerda dos colchetes em um tipo de array, e classificado como um _TypeName_. Uma etapa posterior determina qual de `p`, `q` e `Foo` é um nome de tipo ou um nome de pacote.

Como outro exemplo, suponha que um operador de cast use o tipo `p.q.Foo<? extends String>`. O termo `p.q.Foo` é novamente extraído como uma sequência pontilhada de termos _Identifier_, desta vez à esquerda do `<` em um tipo parametrizado, e classificado como um _TypeName_. O termo `String` é extraído como um _Identifier_ em uma cláusula `extends` de um argumento de tipo coringa de um tipo parametrizado, e classificado como um _TypeName_.

Um nome é sintaticamente classificado como um _ExpressionName_ nestes contextos:

  * Como a expressão qualificadora em uma invocação de construtor de superclasse qualificada ([§8.8.7.1](<#/doc/jls/jls-08>))

  * Como a expressão qualificadora em uma expressão de criação de instância de classe qualificada ([§15.9](<#/doc/jls/jls-15>))

  * Como a expressão de referência de array em uma expressão de acesso a array ([§15.10.3](<#/doc/jls/jls-15>))

  * Como um _PostfixExpression_ ([§15.14](<#/doc/jls/jls-15>))

  * Como o operando esquerdo de um operador de atribuição ([§15.26](<#/doc/jls/jls-15>))

  * Como um _VariableAccess_ em uma instrução `try`-with-resources ([§14.20.3](<#/doc/jls/jls-14>))

Um nome é sintaticamente classificado como um _MethodName_ neste contexto:

  * Antes do "`(`" em uma expressão de invocação de método ([§15.12](<#/doc/jls/jls-15>))

Um nome é sintaticamente classificado como um _PackageOrTypeName_ nestes contextos:

  * À esquerda do "`.`" em um _TypeName_ qualificado

  * Em uma declaração de importação de tipo sob demanda ([§7.5.2](<#/doc/jls/jls-07>))

Um nome é sintaticamente classificado como um _AmbiguousName_ nestes contextos:

  * À esquerda do "`.`" em um _ExpressionName_ qualificado

  * À esquerda do `.` mais à direita que ocorre antes do "`(`" em uma expressão de invocação de método

  * À esquerda do "`.`" em um _AmbiguousName_ qualificado

  * Na cláusula de valor padrão de uma declaração de elemento de anotação ([§9.6.2](<#/doc/jls/jls-09>))

  * À direita de um "`=`" em um par elemento-valor ([§9.7.1](<#/doc/jls/jls-09>))

  * À esquerda de `::` em uma expressão de referência de método ([§15.13](<#/doc/jls/jls-15>))

O efeito da classificação sintática é restringir certos tipos de entidades a certas partes de expressões:

  * O nome de um campo, parâmetro ou variável local pode ser usado como uma expressão ([§15.14.1](<#/doc/jls/jls-15>)).

  * O nome de um método pode aparecer em uma expressão apenas como parte de uma expressão de invocação de método ([§15.12](<#/doc/jls/jls-15>)).

  * O nome de uma classe ou interface pode aparecer em uma expressão apenas como parte de um literal de classe ([§15.8.2](<#/doc/jls/jls-15>)), uma expressão `this` qualificada ([§15.8.4](<#/doc/jls/jls-15>)), uma expressão de criação de instância de classe ([§15.9](<#/doc/jls/jls-15>)), uma expressão de criação de array ([§15.10.1](<#/doc/jls/jls-15>)), uma expressão de cast ([§15.16](<#/doc/jls/jls-15>)), uma expressão `instanceof` ([§15.20.2](<#/doc/jls/jls-15>)), uma constante enum ([§8.9](<#/doc/jls/jls-08>)), ou como parte de um nome qualificado para um campo ou método.

  * O nome de um pacote pode aparecer em uma expressão apenas como parte de um nome qualificado para uma classe ou interface.

### 6.5.2. Reclassificação de Nomes Contextualmente Ambíguos

Um _AmbiguousName_ é então reclassificado da seguinte forma.

Se o _AmbiguousName_ for um nome simples, consistindo de um único _Identifier_, então:

  * Se o _Identifier_ aparecer dentro do escopo de uma declaração ([§6.3](<#/doc/jls/jls-06>)) denotando uma variável local, parâmetro formal, parâmetro de exceção ou campo com esse nome ([§14.4](<#/doc/jls/jls-14>), [§8.4.1](<#/doc/jls/jls-08>), [§8.8.1](<#/doc/jls/jls-08>), [§15.27.1](<#/doc/jls/jls-15>), [§14.20](<#/doc/jls/jls-14>), [§8.3](<#/doc/jls/jls-08>)), então o _AmbiguousName_ é reclassificado como um _ExpressionName_.

  * Caso contrário, se o _Identifier_ for um _TypeIdentifier_ válido ([§3.8](<#/doc/jls/jls-03>)) e aparecer dentro do escopo de uma declaração denotando uma classe, interface ou parâmetro de tipo com esse nome ([§8.1](<#/doc/jls/jls-08>), [§9.1](<#/doc/jls/jls-09>), [§8.4.4](<#/doc/jls/jls-08>), [§8.8.4](<#/doc/jls/jls-08>)), então o _AmbiguousName_ é reclassificado como um _TypeName_.

  * Caso contrário, o _AmbiguousName_ é reclassificado como um _PackageName_. Uma etapa posterior determina se um pacote com esse nome realmente existe.

Se o _AmbiguousName_ for um nome qualificado, consistindo de um nome, um "`.`" e um _Identifier_, então o nome à esquerda do "`.`" é primeiro reclassificado, pois ele próprio é um _AmbiguousName_. Há então uma escolha:

  * Se o nome à esquerda do "`.`" for reclassificado como um _PackageName_, então:

    * Se o _Identifier_ for um _TypeIdentifier_ válido, e houver um pacote cujo nome seja o nome à esquerda do "`.`", e esse pacote contiver uma declaração de um tipo cujo nome seja o mesmo que o _Identifier_, então este _AmbiguousName_ é reclassificado como um _TypeName_.

    * Caso contrário, este _AmbiguousName_ é reclassificado como um _PackageName_. Uma etapa posterior determina se um pacote com esse nome realmente existe.

  * Se o nome à esquerda do "`.`" for reclassificado como um _TypeName_, então:

    * Se o _Identifier_ for o nome de um método ou campo do tipo denotado por _TypeName_, então este _AmbiguousName_ é reclassificado como um _ExpressionName_.

    * Caso contrário, se o _Identifier_ for um _TypeIdentifier_ válido e for o nome de um tipo membro do tipo denotado por _TypeName_, então este _AmbiguousName_ é reclassificado como um _TypeName_.

    * Caso contrário, ocorre um erro em tempo de compilação.

  * Se o nome à esquerda do "`.`" for reclassificado como um _ExpressionName_, então este _AmbiguousName_ é reclassificado como um _ExpressionName_. Uma etapa posterior determina se um membro com o nome _Identifier_ realmente existe.

A exigência de que um nome de tipo potencial seja "um _TypeIdentifier_ válido" impede que `var` e `yield` sejam tratados como um nome de tipo. Isso geralmente é redundante, porque as regras para declarações já impedem a introdução de tipos nomeados `var` e `yield`. No entanto, em alguns casos, um compilador pode encontrar uma classe binária nomeada `var` ou `yield`, e queremos deixar claro que tais classes nunca podem ser nomeadas. A solução mais simples é verificar consistentemente um _TypeIdentifier_ válido.

**Exemplo 6.5.2-1. Reclassificação de Nomes Contextualmente Ambíguos**

Considere o seguinte "código de biblioteca" artificial:
```java
    package org.rpgpoet;
    import java.util.Random;
    public interface Music { Random[] wizards = new Random[4]; }
    
```

e então considere este código de exemplo em outro pacote:
```java
    package bazola;
    class Gabriel {
        static int n = org.rpgpoet.Music.wizards.length;
    }
    
```

Primeiramente, o nome `org.rpgpoet.Music.wizards.length` é classificado como um _ExpressionName_ porque funciona como um _PostfixExpression_. Portanto, cada um dos nomes:
```
    org.rpgpoet.Music.wizards
    org.rpgpoet.Music
    org.rpgpoet
    org
    
```

é inicialmente classificado como um _AmbiguousName_. Estes são então reclassificados:

  * O nome simples `org` é reclassificado como um _PackageName_ (já que não há variável ou tipo nomeado org no escopo).

  * Em seguida, assumindo que não há classe ou interface nomeada `rpgpoet` em nenhuma unidade de compilação do pacote `org` (e sabemos que não há tal classe ou interface porque o pacote `org` tem um subpacote nomeado `rpgpoet`), o nome qualificado `org.rpgpoet` é reclassificado como um _PackageName_.

  * Em seguida, como o pacote `org.rpgpoet` tem um tipo de interface acessível ([§6.6](<#/doc/jls/jls-06>)) nomeado `Music`, o nome qualificado `org.rpgpoet.Music` é reclassificado como um _TypeName_.

  * Finalmente, como o nome `org.rpgpoet.Music` é um _TypeName_, o nome qualificado `org.rpgpoet.Music.wizards` é reclassificado como um _ExpressionName_.

### 6.5.3. Significado de Nomes de Módulos e Nomes de Pacotes

O nome do módulo M, seja simples ou qualificado, denota o módulo (se houver) com esse nome.

Esta seção não impõe um erro em tempo de compilação se nenhum módulo com esse nome for observável. Em vez disso, a diretiva `requires` em uma declaração de módulo ([§7.7.1](<#/doc/jls/jls-07>)) realiza sua própria validação do nome do módulo, enquanto as diretivas `exports` e `opens` ([§7.7.2](<#/doc/jls/jls-07>)) são tolerantes a nomes de módulos inexistentes.

O significado de um nome classificado como _PackageName_ é determinado da seguinte forma.

#### 6.5.3.1. Nomes de Pacotes Simples

Se um nome de pacote consistir em um único _Identifier_, então o identificador deve ocorrer no escopo de exatamente uma declaração de um pacote de nível superior com este nome ([§6.3](<#/doc/jls/jls-06>)), e esse pacote deve ser unicamente visível para o módulo atual ([§7.4.3](<#/doc/jls/jls-07>)), ou ocorre um erro em tempo de compilação. O significado do nome do pacote é esse pacote.

#### 6.5.3.2. Nomes de Pacotes Qualificados

Se um nome de pacote for da forma `Q.Id`, então `Q` também deve ser um nome de pacote. O nome de pacote `Q.Id` nomeia um pacote que é o membro nomeado `Id` dentro do pacote nomeado por `Q`.

Se `Q.Id` não nomear um pacote que seja unicamente visível para o módulo atual ([§7.4.3](<#/doc/jls/jls-07>)), então ocorre um erro em tempo de compilação.

### 6.5.4. Significado de _PackageOrTypeNames_

#### 6.5.4.1. _PackageOrTypeNames_ Simples

Se o _PackageOrTypeName_, `Q`, for um _TypeIdentifier_ válido e ocorrer no escopo de uma classe, interface ou parâmetro de tipo nomeado `Q`, então o _PackageOrTypeName_ é reclassificado como um _TypeName_.

Caso contrário, o _PackageOrTypeName_ é reclassificado como um _PackageName_. O significado do _PackageOrTypeName_ é o significado do nome reclassificado.

#### 6.5.4.2. _PackageOrTypeNames_ Qualificados

Dado um _PackageOrTypeName_ qualificado da forma `Q.Id`, se `Id` for um _TypeIdentifier_ válido e a classe, interface, parâmetro de tipo ou pacote denotado por `Q` tiver uma classe ou interface membro nomeada `Id`, então o nome _PackageOrTypeName_ qualificado é reclassificado como um _TypeName_.

Caso contrário, é reclassificado como um _PackageName_. O significado do _PackageOrTypeName_ qualificado é o significado do nome reclassificado.

### 6.5.5. Significado de Nomes de Tipo

O significado de um nome classificado como _TypeName_ é determinado da seguinte forma.

#### 6.5.5.1. Nomes de Tipo Simples

Se um nome de tipo consistir em um único _Identifier_, então o identificador deve ocorrer no escopo de exatamente uma declaração de uma classe, interface ou parâmetro de tipo com este nome ([§6.3](<#/doc/jls/jls-06>)), ou ocorre um erro em tempo de compilação.

Se a declaração denotar um parâmetro de tipo de uma classe ou interface genérica C ([§8.1.2](<#/doc/jls/jls-08>), [§9.1.2](<#/doc/jls/jls-09>)), então ambas as seguintes condições devem ser verdadeiras, ou ocorre um erro em tempo de compilação:

  * O nome do tipo não ocorre em um contexto `static` ([§8.1.3](<#/doc/jls/jls-08>)).

  * Se o nome do tipo aparecer em uma declaração de classe ou interface aninhada de C, então a declaração de classe ou interface imediatamente envolvente do nome do tipo é uma classe interna de C.

Por exemplo, o nome do tipo não deve aparecer no corpo de um método `static` declarado por C, nem no corpo de um método de instância de uma classe `static` aninhada dentro de C.

Se a declaração denotar um parâmetro de tipo de um método ou construtor genérico `m` ([§8.4.4](<#/doc/jls/jls-08>), [§8.8.4](<#/doc/jls/jls-08>)), e o nome do tipo aparecer direta ou indiretamente no corpo de uma classe local, interface local ou classe anônima D declarada diretamente no corpo de `m`, então ambas as seguintes condições devem ser verdadeiras, ou ocorre um erro em tempo de compilação:

  * O nome do tipo não ocorre em um contexto `static`.

  * D é uma classe interna, e a declaração de classe ou interface imediatamente envolvente do nome do tipo é D ou uma classe interna de D.

Por exemplo, o nome do tipo não deve aparecer no corpo de um método `static` declarado por D, nem (se D for uma interface local) no corpo de um método `default` de D.

O significado do nome do tipo é a classe, interface ou parâmetro de tipo no escopo.

**Exemplo 6.5.5.1-1. Referências a Parâmetros de Tipo**
```java
    class Box<T> {
        T val;
        Box(T t) { val = t; }
    
        static Box<T> empty() {  // compile-time error
            return new Box<>(null);
        }
    
        static <U> Box<U> make(U val) {
            interface Checker {
                void check(U val);  // compile-time error
            }
    
            class NullChecker implements Checker {
                public void check(U val) {
                    if (val == null) {
                        throw new IllegalArgumentException();
                    }
                }
            }
    
            new NullChecker().check(val);
            return new Box<U>(val);
        }
    }
    
    
```

O parâmetro de tipo de classe T está no escopo em toda a declaração da classe `Box`; no entanto, usar o nome T na declaração do método `static` `empty` é ilegal.

Da mesma forma, o parâmetro de tipo de método U está no escopo em toda a declaração do método `make`; no entanto, usar o nome U na declaração da interface local (implicitamente `static`) `Checker` é ilegal.

#### 6.5.5.2. Nomes de Tipo Qualificados

Se um nome de tipo for da forma `Q.Id`, então `Q` deve ser o nome de uma classe, interface ou parâmetro de tipo em um pacote unicamente visível para o módulo atual, ou o nome de um pacote unicamente visível para o módulo atual ([§7.4.3](<#/doc/jls/jls-07>)).

Se `Id` nomear exatamente uma classe ou interface acessível ([§6.6](<#/doc/jls/jls-06>)) que seja membro da classe, interface, parâmetro de tipo ou pacote denotado por `Q`, então o nome de tipo qualificado denota essa classe ou interface.

Se `Id` não nomear uma classe ou interface membro dentro de `Q` ([§8.5](<#/doc/jls/jls-08>), [§9.5](<#/doc/jls/jls-09>)), ou a classe ou interface membro nomeada `Id` dentro de `Q` não for acessível, ou `Id` nomear mais de uma classe ou interface membro dentro de `Q`, então ocorre um erro em tempo de compilação.

**Exemplo 6.5.5.2-1. Nomes de Tipo Qualificados**
```java
    class Test {
        public static void main(String[] args) {
            java.util.Date date =
                new java.util.Date(System.currentTimeMillis());
            System.out.println(date.toLocaleString());
        }
    }
    
```

Este programa produziu a seguinte saída na primeira vez que foi executado:
```
    Sun Jan 21 22:56:29 1996
    
```

Neste exemplo, o nome `java.util.Date` deve denotar um tipo, então primeiro usamos o procedimento recursivamente para determinar se `java.util` é uma classe ou interface acessível ou parâmetro de tipo, ou um pacote, o que é, e então procuramos para ver se a classe `Date` é acessível neste pacote.

### 6.5.6. Significado de Nomes de Expressão

O significado de um nome classificado como _ExpressionName_ é determinado da seguinte forma.

#### 6.5.6.1. Nomes de Expressão Simples

Se um nome de expressão consistir em um único _Identifier_, então:

  * Se o nome da expressão aparecer como um _CaseConstant_ em um rótulo `switch` ([§14.11.1](<#/doc/jls/jls-14>)), e o tipo da expressão seletora da instrução `switch` ou expressão `switch` envolvente for um tipo de classe `enum` ([§8.9](<#/doc/jls/jls-08>)), e a classe `enum` declarar uma constante `enum` com o nome _Identifier_, então o nome da expressão se refere ao campo implícito correspondente da classe `enum`.

  * Caso contrário, se houver exatamente uma declaração denotando uma variável local, parâmetro formal, parâmetro de exceção ou campo no escopo no ponto em que o identificador ocorre, então o nome da expressão se refere à variável no escopo.

  * Caso contrário, ocorre um erro em tempo de compilação.

Se a declaração denotar uma variável de instância de uma classe C ([§8.3.1.1](<#/doc/jls/jls-08>)), então todas as seguintes condições devem ser verdadeiras, ou ocorre um erro em tempo de compilação:

  * O nome da expressão não ocorre em um contexto `static` ([§8.1.3](<#/doc/jls/jls-08>)).

  * Se o nome da expressão ocorrer em um contexto de construção inicial de C ([§8.8.7](<#/doc/jls/jls-08>)), então ele é o operando esquerdo de uma expressão de atribuição simples ([§15.26](<#/doc/jls/jls-15>)), a declaração da variável nomeada não possui um inicializador, e a expressão de atribuição simples não está contida em uma expressão lambda ou declaração de classe interna que esteja contida no contexto de construção inicial de C.

  * O nome da expressão não ocorre em um contexto de construção inicial de uma subclasse de C.

  * Se o nome da expressão aparecer em uma declaração de classe ou interface aninhada de C, então a declaração de classe ou interface imediatamente envolvente do nome da expressão é uma classe interna de C.

Por exemplo, o nome da expressão não deve aparecer no corpo de um método `static` declarado por C, nem no corpo de um método de instância de uma classe `static` aninhada dentro de C.

Se a declaração denotar uma variável local, parâmetro formal ou parâmetro de exceção, seja X a declaração de método, declaração de construtor, inicializador de instância, inicializador `static`, declaração de campo ou invocação de construtor mais interna que envolve a declaração de variável local ou parâmetro. Se o nome da expressão aparecer direta ou indiretamente no corpo de uma classe local, interface local ou classe anônima D declarada diretamente em X, então ambas as seguintes condições devem ser verdadeiras, ou ocorre um erro em tempo de compilação:

  * O nome da expressão não ocorre em um contexto `static`.

  * D é uma classe interna, e a declaração de classe ou interface imediatamente envolvente do nome da expressão é D ou uma classe interna de D.

Por exemplo, o nome da expressão não deve aparecer no corpo de um método `static` declarado por D, nem (se D for uma interface local) no corpo de um método `default` de D.

Se a declaração denotar uma variável local, parâmetro formal ou parâmetro de exceção que não é `final` nem efetivamente `final` ([§4.12.4](<#/doc/jls/jls-04>)), é um erro em tempo de compilação se o nome da expressão aparecer em uma classe interna contida direta ou indiretamente por X, ou em uma expressão lambda contida por X ([§15.27](<#/doc/jls/jls-15>)).

O efeito líquido dessas regras é que uma variável local, parâmetro formal ou parâmetro de exceção só pode ser referenciado de uma classe ou interface aninhada declarada dentro de seu escopo se (i) a referência não estiver dentro de um contexto `static`, (ii) houver uma cadeia de classes internas (não-`static`) da referência à declaração da variável, e (iii) a variável for `final` ou efetivamente `final`. Referências de expressões lambda também exigem que a variável seja `final` ou efetivamente `final`.

Se a declaração declarar uma variável `final` que é definitivamente atribuída antes da expressão simples, o significado do nome é o valor dessa variável. Caso contrário, o significado do nome da expressão é a variável declarada pela declaração.

Se o nome da expressão aparecer em um contexto de atribuição, contexto de invocação ou contexto de cast, então o tipo do nome da expressão é o tipo declarado do campo, variável local ou parâmetro após a conversão de captura ([§5.1.10](<#/doc/jls/jls-05>)).

Caso contrário, o tipo do nome da expressão é o tipo declarado do campo, variável local ou parâmetro.

Ou seja, se o nome da expressão aparecer "no lado direito", seu tipo está sujeito à conversão de captura. Se o nome da expressão for uma variável que aparece "no lado esquerdo", seu tipo não está sujeito à conversão de captura.

**Exemplo 6.5.6.1-1. Nomes de Expressão Simples**
```java
    class Test {
        static int v;
        static final int f = 3;
        public static void main(String[] args) {
            int i;
            i = 1;
            v = 2;
            f = 33;  // compile-time error
            System.out.println(i + " " + v + " " + f);
        }
    }
    
```

Neste programa, os nomes usados como lados esquerdos nas atribuições a `i`, `v` e `f` denotam a variável local `i`, o campo `v` e o valor de `f` (não a variável `f`, porque `f` é uma variável `final`). O exemplo, portanto, produz um erro em tempo de compilação porque a última atribuição não tem uma variável como seu lado esquerdo. Se a atribuição errônea for removida, o código modificado pode ser compilado e produzirá a saída:
    1 2 3
    
```

**Exemplo 6.5.6.1-2. Referências a Variáveis de Instância**
``` 
    class Test {
        static String a;
        String b;
    
        String concat1() {
            return a + b;
        }
    
        static String concat2() {
            return a + b;  // compile-time error
        }
    
        int index() {
            interface I {
                class Matcher {
                    void check() {
                        if (a == null ||
                            b == null) {  // compile-time error
                            throw new IllegalArgumentException();
                        }
                    }
                    int match(String s, String t) {
                        return s.indexOf(t);
                    }
                }
            }
    
            I.Matcher matcher = new I.Matcher();
            matcher.check();
            return matcher.match(a, b);
        }
    }
    
    
```

Os campos `a` e `b` estão no escopo em todo o corpo da classe `Test`. No entanto, usar o nome `b` no contexto estático do método `concat2`, ou na declaração da classe aninhada `Matcher` que não é uma classe interna de `Test`, é ilegal.

**Exemplo 6.5.6.1-3. Referências a Variáveis Locais e Parâmetros Formais**
``` 
    class Test {
        public static void main(String[] args) {
            String first = args[0];
    
            class Checker {
                void checkWhitespace(int x) {
                    String arg = args[x];
                    if (!arg.trim().equals(arg)) {
                        throw new IllegalArgumentException();
                    }
                }
    
                static void checkFlag(int x) {
                    String arg = args[x];  // compile-time error
                    if (!arg.startsWith("-")) {
                        throw new IllegalArgumentException();
                    }
                }
    
                static void checkFirst() {
                    Runnable r = new Runnable() {
                        public void run() {
                            if (first == null) {  // compile-time error
                                throw new IllegalArgumentException();
                            }
                        }
                    };
                    r.run();
                }
            }
    
            final Checker c = new Checker();
            c.checkFirst();
            for (int i = 1; i < args.length; i++) {
                Runnable r = () -> {
                    c.checkWhitespace(i);  // compile-time error
                    c.checkFlag(i);  // compile-time error
                };
            }
        }
    }
    
    
```

O parâmetro formal `args` está no escopo em todo o corpo do método `main`. `args` é efetivamente final, então o nome `args` pode ser usado no método de instância `checkWhitespace` da classe local `Checker`. No entanto, usar o nome `args` no contexto estático do método `checkFlag` da classe local `Checker` é ilegal.

A variável local `first` está no escopo para o restante do corpo do método `main`. `first` também é efetivamente final. No entanto, a classe anônima declarada em `checkFirst` não é uma classe interna de `Checker`, então usar o nome `first` no corpo da classe anônima é ilegal. (Uma expressão lambda no corpo de `checkFirst` seria igualmente incapaz de se referir a `first`, porque a expressão lambda ocorreria em um contexto estático.)

A variável local `c` está no escopo para as últimas linhas do corpo do método `main`, e é declarada `final`, então o nome `c` pode ser usado no corpo da expressão lambda.

A variável local `i` está no escopo em todo o loop `for`. No entanto, `i` não é efetivamente final, então usar o nome `i` no corpo da expressão lambda é ilegal.

#### 6.5.6.2. Nomes de Expressões Qualificadas

Se um nome de expressão é da forma `Q.Id`, então `Q` já foi classificado como um nome de pacote, um nome de tipo ou um nome de expressão.

Se `Q` é um nome de pacote, então ocorre um erro em tempo de compilação.

Se `Q` é um nome de tipo que nomeia um tipo de classe, então:

  * Se não houver exatamente um membro acessível (§6.6) do tipo de classe que seja um campo nomeado `Id`, então ocorre um erro em tempo de compilação.

  * Caso contrário, se o único campo membro acessível não for uma variável de classe (ou seja, não for declarado `static`), então ocorre um erro em tempo de compilação.

  * Caso contrário, se a variável de classe for declarada `final`, então `Q.Id` denota o valor da variável de classe.

O tipo da expressão `Q.Id` é o tipo declarado da variável de classe após a conversão de captura (§5.1.10).

Se `Q.Id` aparece em um contexto que requer uma variável e não um valor, então ocorre um erro em tempo de compilação.

  * Caso contrário, `Q.Id` denota a variável de classe.

O tipo da expressão `Q.Id` é o tipo declarado da variável de classe após a conversão de captura (§5.1.10).

Note que esta cláusula cobre o uso de constantes `enum` (§8.9), uma vez que estas sempre têm uma variável de classe `final` correspondente.

Se `Q` é um nome de tipo que nomeia um tipo de interface, então:

  * Se não houver exatamente um membro acessível do tipo de interface que seja um campo nomeado `Id`, então ocorre um erro em tempo de compilação.

  * Caso contrário, `Q.Id` denota o valor do campo.

O tipo da expressão `Q.Id` é o tipo declarado do campo após a conversão de captura (§5.1.10).

Se `Q.Id` aparece em um contexto que requer uma variável e não um valor, então ocorre um erro em tempo de compilação.

Se `Q` é um nome de expressão, seja T o tipo da expressão `Q`:

  * Se T não é um tipo de referência, ocorre um erro em tempo de compilação.

  * Se não houver exatamente um membro acessível do tipo T que seja um campo nomeado `Id`, então ocorre um erro em tempo de compilação.

  * Caso contrário, se este campo for um dos seguintes:

    * Um campo de um tipo de interface

    * Um campo `final` de um tipo de classe (que pode ser uma variável de classe ou uma variável de instância)

    * O campo `final` `length` de um tipo de array (§10.7)

então `Q.Id` denota o valor do campo, a menos que apareça em um contexto que requer uma variável e o campo seja um campo `final` em branco definitivamente não atribuído, caso em que ele produz uma variável.

O tipo da expressão `Q.Id` é o tipo declarado do campo após a conversão de captura (§5.1.10).

Se `Q.Id` aparece em um contexto que requer uma variável e não um valor, e o campo denotado por `Q.Id` é definitivamente atribuído, então ocorre um erro em tempo de compilação.

  * Caso contrário, `Q.Id` denota uma variável, o campo `Id` da classe T, que pode ser uma variável de classe ou uma variável de instância.

O tipo da expressão `Q.Id` é o tipo do membro do campo após a conversão de captura (§5.1.10).

**Exemplo 6.5.6.2-1. Nomes de Expressões Qualificadas**
``` 
    class Point {
        int x, y;
        static int nPoints;
    }
    
    class Test {
        public static void main(String[] args) {
            int i = 0;
            i.x++;        // compile-time error
            Point p = new Point();
            p.nPoints();  // compile-time error
        }
    }
    
```

Este programa encontra dois erros em tempo de compilação, porque a variável `int` `i` não tem membros, e porque `nPoints` não é um método da classe `Point`.

**Exemplo 6.5.6.2-2. Qualificando uma Expressão com um Nome de Tipo**

Note que os nomes de expressões podem ser qualificados por nomes de tipos, mas não por tipos em geral. Uma consequência é que não é possível acessar uma variável de classe através de um tipo parametrizado. Por exemplo, dado o código:
```
    
    class Foo<T> {
        public static int classVar = 42;
    }
    
    
```

a seguinte atribuição é ilegal:
```
    
    Foo<String>.classVar = 91; // illegal
    
    
```

Em vez disso, escreve-se:
```
    
    Foo.classVar = 91;
    
    
```

Isso não restringe a linguagem de programação Java de forma significativa. Parâmetros de tipo não podem ser usados nos tipos de variáveis estáticas, e, portanto, os argumentos de tipo de um tipo parametrizado nunca podem influenciar o tipo de uma variável estática. Consequentemente, nenhuma capacidade expressiva é perdida. O nome de tipo `Foo` parece ser um tipo bruto (raw type), mas não é; em vez disso, é o nome do tipo não genérico `Foo` cujo membro estático deve ser acessado (§6.1). Como não há uso de um tipo bruto, não há avisos não verificados (unchecked warnings).

### 6.5.7. Significado dos Nomes de Métodos

O significado de um nome classificado como um _MethodName_ é determinado da seguinte forma.

#### 6.5.7.1. Nomes de Métodos Simples

Um nome de método simples aparece no contexto de uma expressão de invocação de método (§15.12). O nome de método simples consiste em um único _UnqualifiedMethodIdentifier_ que especifica o nome do método a ser invocado. As regras de invocação de método exigem que o _UnqualifiedMethodIdentifier_ denote um método que esteja no escopo no ponto da invocação do método. As regras também proíbem (§15.12.3) uma referência a um método de instância ocorrendo em um contexto estático (§8.1.3), ou em uma classe ou interface aninhada que não seja uma classe interna da classe ou interface que declara o método de instância, ou em um contexto de construção inicial (§8.8.7) de uma classe onde o método de instância é um membro.

**Exemplo 6.5.7.1-1. Nomes de Métodos Simples**

O programa a seguir demonstra o papel do escopo ao determinar qual método invocar.
```
    class Super {
        void f2(String s)       {}
        void f3(String s)       {}
        void f3(int i1, int i2) {}
    }
    
    class Test {
        void f1(int i) {}
        void f2(int i) {}
        void f3(int i) {}
    
        void m() {
            new Super() {
                {
                    f1(0);  // OK, resolves to Test.f1(int)
                    f2(0);  // compile-time error
                    f3(0);  // compile-time error
                }
            };
        }
    }
    
```

Para a invocação `f1(0)`, apenas um método nomeado `f1` está no escopo. É o método `Test.f1(int)`, cuja declaração está no escopo em todo o corpo de `Test`, incluindo a declaração da classe anônima. §15.12.1 escolhe pesquisar na classe `Test` já que a declaração da classe anônima não tem nenhum membro nomeado `f1`. Eventualmente, `Test.f1(int)` é resolvido.

Para a invocação `f2(0)`, dois métodos nomeados `f2` estão no escopo. Primeiro, a declaração do método `Super.f2(String)` está no escopo em toda a declaração da classe anônima. Segundo, a declaração do método `Test.f2(int)` está no escopo em todo o corpo de `Test`, incluindo a declaração da classe anônima. (Note que nenhuma declaração sombreia a outra, porque no ponto em que cada uma é declarada, a outra não está no escopo.) §15.12.1 escolhe pesquisar na classe `Super` porque ela tem um membro nomeado `f2`. No entanto, `Super.f2(String)` não é aplicável a `f2(0)`, então ocorre um erro em tempo de compilação. Note que a classe `Test` não é pesquisada.

Para a invocação `f3(0)`, três métodos nomeados `f3` estão no escopo. Primeiro e segundo, as declarações dos métodos `Super.f3(String)` e `Super.f3(int,int)` estão no escopo em toda a declaração da classe anônima. Terceiro, a declaração do método `Test.f3(int)` está no escopo em todo o corpo de `Test`, incluindo a declaração da classe anônima. §15.12.1 escolhe pesquisar na classe `Super` porque ela tem um membro nomeado `f3`. No entanto, `Super.f3(String)` e `Super.f3(int,int)` não são aplicáveis a `f3(0)`, então ocorre um erro em tempo de compilação. Note que a classe `Test` não é pesquisada.

Escolher pesquisar a hierarquia de superclasses de uma classe aninhada antes do escopo lexicalmente envolvente é chamado de "regra do pente" (§15.12.1).

## 6.6. Controle de Acesso

A linguagem de programação Java fornece mecanismos para _controle de acesso_, para evitar que os usuários de um pacote ou classe dependam de detalhes desnecessários da implementação desse pacote ou classe. Se o acesso é permitido, então a entidade acessada é considerada _acessível_.

Note que a acessibilidade é uma propriedade estática que pode ser determinada em tempo de compilação; ela depende apenas de tipos e modificadores de declaração.

Nomes qualificados são um meio de acesso a membros de pacotes, classes, interfaces, parâmetros de tipo e tipos de referência. Quando o nome de tal membro é classificado a partir de seu contexto (§6.5.1) como um nome de tipo qualificado (denotando um membro de um pacote, classe, interface ou parâmetro de tipo) ou um nome de expressão qualificado (denotando um membro de um tipo de referência), o controle de acesso é aplicado.

Por exemplo, uma declaração de importação de tipo único usa um nome de tipo qualificado (§7.5.1), então a classe ou interface nomeada deve ser acessível a partir da unidade de compilação que contém a declaração `import`. Como outro exemplo, uma declaração de classe pode usar um nome de tipo qualificado para um tipo de superclasse (§8.1.5), então novamente a classe nomeada deve ser acessível.

Algumas expressões óbvias estão "ausentes" da classificação de contexto em §6.5.1: acesso a campo em um _Primary_ (§15.11.1), invocação de método em um _Primary_ (§15.12), referência de método via um _Primary_ (§15.13), e a classe instanciada em uma criação de instância de classe qualificada (§15.9). Cada uma dessas expressões usa identificadores, em vez de nomes, pela razão dada em §6.2. Consequentemente, o controle de acesso a membros (sejam campos, métodos, classes ou interfaces) é aplicado _explicitamente_ por expressões de acesso a campo, expressões de invocação de método, expressões de referência de método e expressões de criação de instância de classe qualificadas. (Note que o acesso a um campo também pode ser denotado por um nome qualificado ocorrendo como uma expressão postfix.)

Além disso, muitas declarações e expressões permitem o uso de tipos que não são expressos exclusivamente com nomes de tipos. Por exemplo, uma declaração de classe pode usar um tipo parametrizado (§4.5) para denotar o tipo da superclasse. Como um tipo parametrizado não é um nome de tipo qualificado, é necessário que a declaração de classe execute explicitamente o controle de acesso para a superclasse denotada. Consequentemente, das declarações e expressões que fornecem contextos em §6.5.1 para classificar um _TypeName_, a maioria executa suas próprias verificações de controle de acesso.

Além do acesso a membros de um pacote, classe, interface ou parâmetro de tipo, há a questão do acesso a construtores de uma classe. O controle de acesso deve ser verificado quando um construtor é invocado explicitamente ou implicitamente. Consequentemente, o controle de acesso é verificado por uma invocação de construtor (§8.8.7.1) e por uma expressão de criação de instância de classe (§15.9.3). Tais verificações são necessárias porque §6.5.1 não menciona a invocação de construtor (já que eles se referem a construtores indiretamente, em vez de via nomes) e não está ciente da distinção entre a classe denotada por uma expressão de criação de instância de classe não qualificada e um construtor dessa classe. Além disso, os construtores não têm nomes qualificados, então não podemos confiar que o controle de acesso seja verificado durante a classificação de nomes de tipos qualificados.

A acessibilidade afeta a herança de membros de classe (§8.2), incluindo ocultação e sobrescrita de método (§8.4.8.1")).

### 6.6.1. Determinando a Acessibilidade

  * Se uma classe ou interface de nível superior (§7.6) for declarada `public` e for membro de um pacote exportado por um módulo, então a classe ou interface pode ser acessada por qualquer código no mesmo módulo, e por qualquer código em outro módulo para o qual o pacote é exportado, desde que a unidade de compilação na qual a classe ou interface é declarada seja visível para esse outro módulo (§7.3).

  * Se uma classe ou interface de nível superior for declarada `public` e for membro de um pacote que não é exportado por um módulo, então a classe ou interface pode ser acessada por qualquer código no mesmo módulo.

  * Se uma classe ou interface de nível superior for declarada com acesso de pacote, então ela pode ser acessada apenas de dentro do pacote no qual é declarada.

Uma classe ou interface de nível superior declarada sem um modificador de acesso implicitamente tem acesso de pacote.

  * Um membro (classe, interface, campo ou método) de uma classe, interface, parâmetro de tipo ou tipo de referência, ou um construtor de uma classe, é acessível somente se (i) a classe, interface, parâmetro de tipo ou tipo de referência for acessível, e (ii) o membro ou construtor for declarado para permitir acesso:

    * Se o membro ou construtor for declarado `public`, então o acesso é permitido.

Todos os membros de interfaces que não possuem modificadores de acesso são implicitamente `public`.

    * Caso contrário, se o membro ou construtor for declarado `protected`, então o acesso é permitido apenas quando uma das seguintes condições for verdadeira:

      * O acesso ao membro ou construtor ocorre de dentro do pacote que contém a classe na qual o membro ou construtor `protected` é declarado.

      * O acesso está correto conforme descrito em §6.6.2.

    * Caso contrário, se o membro ou construtor for declarado com acesso de pacote, então o acesso é permitido apenas quando o acesso ocorre de dentro do pacote no qual a classe, interface, parâmetro de tipo ou tipo de referência é declarado.

Um membro de classe ou construtor declarado sem um modificador de acesso implicitamente tem acesso de pacote.

    * Caso contrário, o membro ou construtor é declarado `private`. O acesso é permitido apenas quando uma das seguintes condições for verdadeira:

      * O acesso ocorre de dentro do corpo da classe ou interface de nível superior que envolve a declaração do membro ou construtor.

      * O acesso ocorre na cláusula `permits` da classe ou interface de nível superior que envolve a declaração do membro.

      * O acesso ocorre na lista de componentes de registro da classe de registro de nível superior que envolve a declaração do membro.

  * Um tipo de array é acessível se e somente se seu tipo de elemento for acessível.

**Exemplo 6.6-1. Controle de Acesso**

Considere as duas unidades de compilação:
```
    package points;
    class PointVec { Point[] vec; }
    
```

e:
```
    package points;
    public class Point {
        protected int x, y;
        public void move(int dx, int dy) { x += dx; y += dy; }
        public int getX() { return x; }
        public int getY() { return y; }
    }
    
```

que declaram dois tipos de classe no pacote `points`:

  * O tipo de classe `PointVec` não é `public` e não faz parte da interface `public` do pacote `points`, mas pode ser usado apenas por outras classes no pacote.

  * O tipo de classe `Point` é declarado `public` e está disponível para outros pacotes. Faz parte da interface `public` do pacote `points`.

  * Os métodos `move`, `getX` e `getY` da classe `Point` são declarados `public` e, portanto, estão disponíveis para qualquer código que use um objeto do tipo `Point`.

  * Os campos `x` e `y` são declarados `protected` e são acessíveis fora do pacote `points` apenas em subclasses da classe `Point`, e somente quando são campos de objetos que estão sendo implementados pelo código que os está acessando.

Veja §6.6.2 para um exemplo de como o modificador de acesso `protected` limita o acesso.

**Exemplo 6.6-2. Acesso a Campos, Métodos e Construtores `public`**

Um membro de classe ou construtor `public` é acessível em todo o pacote onde é declarado e de qualquer outro pacote, desde que o pacote no qual é declarado seja observável (§7.4.3). Por exemplo, na unidade de compilação:
```
    package points;
    public class Point {
        int x, y;
        public void move(int dx, int dy) {
            x += dx; y += dy;
            moves++;
        }
        public static int moves = 0;
    }
    
```

a classe `public` `Point` tem como membros `public` o método `move` e o campo `moves`. Esses membros `public` são acessíveis a qualquer outro pacote que tenha acesso ao pacote `points`. Os campos `x` e `y` não são `public` e, portanto, são acessíveis apenas de dentro do pacote `points`.

**Exemplo 6.6-3. Acesso a Classes `public` e Não-`public`**

Se uma classe não possui o modificador `public`, o acesso à declaração da classe é limitado ao pacote no qual ela é declarada (§6.6). No exemplo:
```
    package points;
    public class Point {
        public int x, y;
        public void move(int dx, int dy) { x += dx; y += dy; }
    }
    class PointList {
        Point next, prev;
    }
    
```

duas classes são declaradas na unidade de compilação. A classe `Point` está disponível fora do pacote `points`, enquanto a classe `PointList` está disponível para acesso apenas dentro do pacote. Assim, uma unidade de compilação em outro pacote pode acessar `points.Point`, seja usando seu nome totalmente qualificado:
```
    package pointsUser;
    class Test1 {
        public static void main(String[] args) {
            points.Point p = new points.Point();
            System.out.println(p.x + " " + p.y);
        }
    }
    
```

ou usando uma declaração de importação de tipo único (§7.5.1) que menciona o nome totalmente qualificado, para que o nome simples possa ser usado posteriormente:
```
    package pointsUser;
    import points.Point;
    class Test2 {
        public static void main(String[] args) {
            Point p = new Point();
            System.out.println(p.x + " " + p.y);
        }
    }
    
```

No entanto, esta unidade de compilação não pode usar ou importar `points.PointList`, que não é declarada `public` e, portanto, é inacessível fora do pacote `points`.

**Exemplo 6.6-4. Acesso a Campos, Métodos e Construtores com Acesso de Pacote**

Se nenhum dos modificadores de acesso `public`, `protected` ou `private` for especificado, um membro de classe ou construtor tem acesso de pacote: ele é acessível em todo o pacote que contém a declaração da classe na qual o membro de classe é declarado, mas o membro de classe ou construtor não é acessível em nenhum outro pacote.

Se uma classe `public` tem um método ou construtor com acesso de pacote, então este método ou construtor não é acessível ou herdado por uma subclasse declarada fora deste pacote.

Por exemplo, se tivermos:
```
    package points;
    public class Point {
        public int x, y;
        void move(int dx, int dy) { x += dx; y += dy; }
        public void moveAlso(int dx, int dy) { move(dx, dy); }
    }
    
```

então uma subclasse em outro pacote pode declarar um método `move` não relacionado, com a mesma assinatura (§8.4.2) e tipo de retorno. Como o método `move` original não é acessível do pacote `morepoints`, `super` não pode ser usado:
```
    package morepoints;
    public class PlusPoint extends points.Point {
        public void move(int dx, int dy) {
            super.move(dx, dy);  // compile-time error
            moveAlso(dx, dy);
        }
    }
    
```

Como `move` de `Point` não é sobrescrito por `move` em `PlusPoint`, o método `moveAlso` em `Point` nunca chama o método `move` em `PlusPoint`. Assim, se você excluir a chamada `super.move` de `PlusPoint` e executar o programa de teste:
```
    import points.Point;
    import morepoints.PlusPoint;
    class Test {
        public static void main(String[] args) {
            PlusPoint pp = new PlusPoint();
            pp.move(1, 1);
        }
    }
    
```

ele termina normalmente. Se `move` de `Point` fosse sobrescrito por `move` em `PlusPoint`, então este programa recursaria infinitamente, até que ocorresse um `StackOverflowError`.

**Exemplo 6.6-5. Acesso a Campos, Métodos e Construtores `private`**

Um membro de classe ou construtor `private` é acessível apenas dentro do corpo da classe de nível superior (§7.6) que envolve a declaração do membro ou construtor. Ele não é herdado por subclasses. No exemplo:
```
    class Point {
        Point() { setMasterID(); }
        int x, y;
        private int ID;
        private static int masterID = 0;
        private void setMasterID() { ID = masterID++; }
    }
    
```

os membros `private` `ID`, `masterID` e `setMasterID` podem ser usados apenas dentro do corpo da classe `Point`. Eles não podem ser acessados por nomes qualificados, expressões de acesso a campo ou expressões de invocação de método fora do corpo da declaração de `Point`.

Veja §8.8.10 para um exemplo que usa um construtor `private`.

### 6.6.2. Detalhes sobre Acesso `protected`

Um membro ou construtor `protected` de um objeto pode ser acessado de fora do pacote no qual é declarado apenas por código que é responsável pela implementação desse objeto.

#### 6.6.2.1. Acesso a um Membro `protected`

Seja C a classe na qual um membro `protected` é declarado. O acesso é permitido apenas dentro do corpo de uma subclasse S de C.

Uma subclasse S é considerada responsável pela implementação de objetos da classe C. Dependendo da acessibilidade de C, S pode ser declarada no mesmo pacote que C, ou em um pacote diferente do mesmo módulo que C, ou em um pacote de um módulo totalmente diferente.

Além disso, o acesso a um campo de instância ou método de instância é permitido com base na forma do nome qualificado, expressão de acesso a campo (§15.11), expressão de invocação de método (§15.12), ou expressão de referência de método (§15.13):

  * Se o acesso for por (i) um nome qualificado da forma `ExpressionName.Id` ou `TypeName.Id`, ou (ii) uma expressão de acesso a campo da forma `Primary.Id`, então o acesso ao campo de instância `Id` é permitido se e somente se o tipo qualificador for S ou uma subclasse de S.

O tipo qualificador é o tipo do _ExpressionName_ ou _Primary_, ou o tipo denotado por _TypeName_.

  * Se o acesso for por (i) uma expressão de invocação de método da forma `ExpressionName.Id(...)` ou `TypeName.Id(...)` ou `Primary.Id(...)`, ou (ii) uma expressão de referência de método da forma `ExpressionName `::` Id` ou `Primary `::` Id` ou `ReferenceType `::` Id`, então o acesso ao método de instância `Id` é permitido se e somente se o tipo qualificador for S ou uma subclasse de S.

O tipo qualificador é o tipo do _ExpressionName_ ou _Primary_, ou o tipo denotado por _TypeName_ ou _ReferenceType_.

Mais informações sobre o acesso a membros `protected` podem ser encontradas em _Checking Access to Protected Members in the Java Virtual Machine_ por Alessandro Coglio, no _Journal of Object Technology_, Outubro de 2005.

#### 6.6.2.2. Acesso a um Construtor `protected`

Seja C a classe na qual um construtor `protected` é declarado e seja S a classe mais interna em cuja declaração ocorre o uso do construtor `protected`. Então:

  * Se o acesso for por uma invocação de construtor de superclasse `super``(...)`, ou uma invocação de construtor de superclasse qualificada `E``.``super``(...)`, onde `E` é uma expressão _Primary_, então o acesso é permitido.

  * Se o acesso for por uma expressão de criação de instância de classe anônima `new` C`(...){...}`, ou uma expressão de criação de instância de classe anônima qualificada E`.``new` C`(...){...}`, onde E é uma expressão _Primary_, então o acesso é permitido.

  * Se o acesso for por uma expressão de criação de instância de classe simples `new` C`(...)`, ou uma expressão de criação de instância de classe qualificada E`.``new` C`(...)`, onde E é uma expressão _Primary_, ou uma expressão de referência de método C `::` `new`, onde C é um _ClassType_, então o acesso não é permitido. Um construtor `protected` pode ser acessado por uma expressão de criação de instância de classe (que não declara uma classe anônima) ou uma expressão de referência de método apenas de dentro do pacote no qual é definido.

**Exemplo 6.6.2-1. Acesso a Campos, Métodos e Construtores `protected`**

Considere este exemplo, onde o pacote `points` declara:
```
    package points;
    public class Point {
        protected int x, y;
        void warp(threePoint.Point3d a) {
            if (a.z > 0)  // compile-time error: cannot access a.z
                a.delta(this);
        }
    }
    
```

e o pacote `threePoint` declara:
```
    package threePoint;
    import points.Point;
    public class Point3d extends Point {
        protected int z;
        public void delta(Point p) {
            p.x += this.x;  // compile-time error: cannot access p.x
            p.y += this.y;  // compile-time error: cannot access p.y
        }
        public void delta3d(Point3d q) {
            q.x += this.x;
            q.y += this.y;
            q.z += this.z;
        }
    }
    
```

Um erro em tempo de compilação ocorre no método `delta` aqui: ele não pode acessar os membros `protected` `x` e `y` de seu parâmetro `p`, porque embora `Point3d` (a classe na qual as referências aos campos `x` e `y` ocorrem) seja uma subclasse de `Point` (a classe na qual `x` e `y` são declarados), ela não está envolvida na implementação de um `Point` (o tipo do parâmetro `p`). O método `delta3d` pode acessar os membros `protected` de seu parâmetro `q`, porque a classe `Point3d` é uma subclasse de `Point` e está envolvida na implementação de um `Point3d`.

O método `delta` poderia tentar fazer um cast (§5.5, §15.16) de seu parâmetro para ser um `Point3d`, mas este cast falharia, causando uma exceção, se a classe de `p` em tempo de execução não fosse `Point3d`.

Um erro em tempo de compilação também ocorre no método `warp`: ele não pode acessar o membro `protected` `z` de seu parâmetro `a`, porque embora a classe `Point` (a classe na qual a referência ao campo `z` ocorre) esteja envolvida na implementação de um `Point3d` (o tipo do parâmetro `a`), ela não é uma subclasse de `Point3d` (a classe na qual `z` é declarado).
## 6.7. Nomes Totalmente Qualificados e Nomes Canônicos

Todo tipo primitivo, pacote nomeado, classe de nível superior e interface de nível superior possui um _nome totalmente qualificado_ :

  * O nome totalmente qualificado de um tipo primitivo é a palavra-chave para esse tipo primitivo, ou seja, `byte`, `short`, `char`, `int`, `long`, `float`, `double`, ou `boolean`.

  * O nome totalmente qualificado de um pacote nomeado que não é um subpacote de um pacote nomeado é seu nome simples.

  * O nome totalmente qualificado de um pacote nomeado que é um subpacote de outro pacote nomeado consiste no nome totalmente qualificado do pacote contendo, seguido por "`.`", seguido pelo nome simples (membro) do subpacote.

  * O nome totalmente qualificado de uma classe de nível superior ou interface de nível superior que é declarada em um pacote sem nome é o nome simples da classe ou interface.

Em particular, isso significa que uma classe de nível superior que é implicitamente declarada por uma unidade de compilação compacta (§7.3) possui um nome totalmente qualificado, que é o nome simples determinado pelo sistema hospedeiro (§8.1.8).

  * O nome totalmente qualificado de uma classe de nível superior ou interface de nível superior que é declarada em um pacote nomeado consiste no nome totalmente qualificado do pacote, seguido por "`.`", seguido pelo nome simples da classe ou interface.

Cada classe membro, interface membro e tipo array _pode_ ter um nome totalmente qualificado:

  * Uma classe membro ou interface membro `M` de outra classe ou interface C tem um nome totalmente qualificado se e somente se C tiver um nome totalmente qualificado.

Nesse caso, o nome totalmente qualificado de `M` consiste no nome totalmente qualificado de C, seguido por "`.`", seguido pelo nome simples de `M`.

  * Um tipo array tem um nome totalmente qualificado se e somente se seu tipo de elemento tiver um nome totalmente qualificado.

Nesse caso, o nome totalmente qualificado de um tipo array consiste no nome totalmente qualificado do tipo de componente do tipo array seguido por "`[]`".

Uma classe local, interface local ou classe anônima não possui um nome totalmente qualificado.

Todo tipo primitivo, pacote nomeado, classe de nível superior e interface de nível superior possui um _nome canônico_ :

  * Para todo tipo primitivo, pacote nomeado, classe de nível superior e interface de nível superior, o nome canônico é o mesmo que o nome totalmente qualificado.

Cada classe membro, interface membro e tipo array _pode_ ter um nome canônico:

  * Uma classe membro ou interface membro `M` declarada em outra classe ou interface C tem um nome canônico se e somente se C tiver um nome canônico.

Nesse caso, o nome canônico de `M` consiste no nome canônico de C, seguido por "`.`", seguido pelo nome simples de `M`.

  * Um tipo array tem um nome canônico se e somente se seu tipo de componente tiver um nome canônico.

Nesse caso, o nome canônico do tipo array consiste no nome canônico do tipo de componente do tipo array seguido por "`[]`".

Uma classe local, interface local ou classe anônima não possui um nome canônico.

**Exemplo 6.7-1. Nomes Totalmente Qualificados**

  * O nome totalmente qualificado do tipo `long` é "`long`".

  * O nome totalmente qualificado do pacote `java.lang` é "`java.lang`" porque é o subpacote `lang` do pacote `java`.

  * O nome totalmente qualificado da classe `Object`, que é definida no pacote `java.lang`, é "`java.lang.Object`".

  * O nome totalmente qualificado da interface `Enumeration`, que é definida no pacote `java.util`, é "`java.util.Enumeration`".

  * O nome totalmente qualificado do tipo "array de `double`" é "`double``[]`".

  * O nome totalmente qualificado do tipo "array de array de array de array de `String`" é "`java.lang.String[][][][]`".

No código:
```java
    package points;
    class Point    { int x, y; }
    class PointVec { Point[] vec; }
    
```

o nome totalmente qualificado do tipo `Point` é "`points.Point`"; o nome totalmente qualificado do tipo `PointVec` é "`points.PointVec`"; e o nome totalmente qualificado do tipo do campo `vec` da classe `PointVec` é "`points.Point[]`".

**Exemplo 6.7-2. Nomes Totalmente Qualificados vs. Nome Canônico**

A diferença entre um nome totalmente qualificado e um nome canônico pode ser vista em códigos como:
```java
    package p;
    class O1 { class I {} }
    class O2 extends O1 {}
    
```

Ambos `p.O1.I` e `p.O2.I` são nomes totalmente qualificados que denotam a classe membro `I`, mas apenas `p.O1.I` é seu nome canônico.

* * *

Anterior | | Próximo
---|---|---
Capítulo 5. Conversões e Contextos | Início | Capítulo 7. Pacotes e Módulos

* * *

 Aviso Legal 