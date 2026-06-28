# Dependências Opcionais com `requires static`

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Módulos ](<#/doc/tutorials/modules>) > Dependências Opcionais com `requires static`

**Anterior na Série**

[Acesso Reflexivo com Módulos Abertos e Pacotes Abertos](<#/doc/tutorials/modules/opening-for-reflection>)

➜

**Tutorial Atual**

Dependências Opcionais com `requires static`

➜

**Próximo na Série**

[Legibilidade Implícita com `requires transitive`](<#/doc/tutorials/modules/implied-readability>)

**Anterior na Série:** [Acesso Reflexivo com Módulos Abertos e Pacotes Abertos](<#/doc/tutorials/modules/opening-for-reflection>)

**Próximo na Série:** [Legibilidade Implícita com `requires transitive`](<#/doc/tutorials/modules/implied-readability>)

# Dependências Opcionais com `requires static`

O sistema de módulos tem uma opinião forte sobre dependências: Por padrão, elas precisam ser requeridas (para serem acessíveis) e então precisam estar presentes tanto em tempo de compilação quanto em tempo de execução. No entanto, isso não funciona com dependências opcionais, onde o código é escrito contra artefatos que não estão necessariamente presentes em tempo de execução. A diretiva `requires static` resolve esse problema exigindo a presença em tempo de compilação, mas tolerando a ausência em tempo de execução.

**Nota**: Você precisa conhecer [os fundamentos do sistema de módulos](<#/doc/tutorials/modules/intro>) para aproveitar ao máximo este artigo.

## Dependências Opcionais com `requires static`

Quando um módulo precisa ser compilado contra tipos de outro módulo, mas não quer depender dele em tempo de execução, ele pode usar uma diretiva `requires static`. Se o módulo _A_ `requires static` o módulo _B_, o sistema de módulos se comporta de forma diferente em tempo de compilação e execução:

  * Em tempo de compilação, _B_ deve estar presente (ou haverá um erro) e _B_ é legível por _A_. (Este é o comportamento comum para dependências.)
  * Em tempo de execução, _B_ pode estar ausente e isso não causará erro nem aviso. Se estiver presente, é legível por _A_.

Como exatamente a presença é tratada não é trivial, mas antes de discutir isso, vejamos um exemplo. Dentro do JDK, nenhuma dependência é opcional, então temos que criar a nossa própria.

Vamos imaginar um aplicativo que resolve seu caso de negócio bem o suficiente, mas pode fazê-lo melhor na presença de uma biblioteca adicional e proprietária. Neste exemplo, chamamos o módulo do aplicativo de _com.example.app_ e a biblioteca de _com.sample.solver_. Também assumimos que a integração é codificada de forma que _com.example.app_ referencia tipos de _com.sample.solver_, o que significa que _app_ precisa ser compilado contra o _solver_, o que por sua vez significa que _app_ deve requerer _solver_:

```java
module com.example.app {
    requires com.sample.solver;
}
```

Mas, como exploramos ao discutir a resolução de módulos, isso significa que o sistema de módulos lançará um erro em tempo de execução se _com.sample.solver_ estiver ausente - claramente a dependência não é opcional. Vamos usar `requires static` em vez disso:

```java
module com.example.app {
    requires static com.sample.solver;
}
```

Para a compilação de _com.example.app_, _com.sample.solver_ é requerido e deve estar presente, o que significa que seus tipos podem ser usados livremente. Em tempo de execução, ele pode estar ausente, o que leva a duas perguntas que responderemos a seguir:

  * Em que circunstâncias a dependência opcional estará presente?
  * Como podemos codificar contra uma dependência opcional?

## Resolução de Dependências Opcionais

A resolução de módulos é o processo que, começando pelos módulos raiz, constrói um grafo de módulos resolvendo diretivas `requires`. Quando um módulo está sendo resolvido, todos os módulos que ele requer devem ser encontrados no runtime ou no module path e, se forem, são adicionados ao grafo de módulos; caso contrário, ocorre um erro. (Note que os módulos que não entraram no grafo de módulos durante a resolução não estão disponíveis posteriormente durante a compilação ou execução.) Em tempo de compilação, a resolução de módulos trata as dependências opcionais exatamente como dependências regulares. Em tempo de execução, no entanto, elas são em sua maioria ignoradas.

Quando o sistema de módulos encontra uma diretiva `requires static`, ele não tenta satisfazê-la, o que significa que ele nem verifica se o módulo referenciado pode ser encontrado. Como consequência, mesmo que um módulo esteja presente no module path (ou no JDK, para esse assunto), ele _não_ será adicionado ao grafo de módulos apenas por causa de uma dependência opcional. Ele só entrará no grafo se também for uma dependência regular de algum outro módulo que está sendo resolvido ou porque foi adicionado explicitamente com a flag de linha de comando `--add-modules`. Nesse caso, o sistema de módulos adicionará uma aresta de legibilidade do módulo requerente para a dependência opcional.

Em outras palavras, uma dependência opcional é ignorada a menos que ela entre no grafo de módulos de alguma outra forma, caso em que o grafo de módulos resultante é o mesmo como se tivesse sido com uma dependência não opcional.

## Codificando Contra Dependências Opcionais

Dependências opcionais exigem um pouco mais de atenção ao escrever código contra elas. De modo geral, quando o código que está sendo executado referencia um tipo, o runtime Java verifica se ele já está carregado. Se não estiver, ele instrui o class loader a fazer isso e, se falhar, o resultado é um `NoClassDefFoundError`, que geralmente trava o aplicativo ou, no mínimo, falha na parte da lógica que estava sendo executada.

Isso é algo pelo qual o JAR hell era famoso e que o sistema de módulos quer superar verificando as dependências declaradas ao iniciar um aplicativo. Mas com `requires static`, optamos por sair dessa verificação, o que significa que podemos acabar com um `NoClassDefFoundError` afinal.

### Verificando a Presença do Módulo

Para evitar isso, podemos consultar o sistema de módulos sobre a presença de um módulo:

```java
public static boolean isModulePresent(Module caller, String moduleName) {
    return caller.getLayer()
        .findModule(moduleName)
        .isPresent();
}
```

O chamador precisa passar a si mesmo para o método para que ele possa determinar a camada correta para consultar o módulo desejado.

### Dependência Estabelecida

No entanto, nem sempre é necessário verificar explicitamente a presença de um módulo. Imagine uma biblioteca _com.example.lib_ que ajuda no uso de várias APIs existentes, entre elas a JDBC API em _java.sql_. Então faz sentido assumir que o código que não usa JDBC não usa essa parte da biblioteca. Dito de outra forma, podemos assumir que as partes JDBC da biblioteca são chamadas apenas por código que já usa JDBC, o que significa que _java.sql_ deve fazer parte do grafo de módulos.

De modo geral, se o código que usa uma dependência opcional só for chamado por código que depende da mesma dependência, sua presença pode ser assumida e não precisa ser verificada.

### Neste tutorial

Dependências Opcionais com `requires static` Resolução de Dependências Opcionais Codificando Contra Dependências Opcionais

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Acesso Reflexivo com Módulos Abertos e Pacotes Abertos](<#/doc/tutorials/modules/opening-for-reflection>)

➜

**Tutorial Atual**

Dependências Opcionais com `requires static`

➜

**Próximo na Série**

[Legibilidade Implícita com `requires transitive`](<#/doc/tutorials/modules/implied-readability>)

**Anterior na Série:** [Acesso Reflexivo com Módulos Abertos e Pacotes Abertos](<#/doc/tutorials/modules/opening-for-reflection>)

**Próximo na Série:** [Legibilidade Implícita com `requires transitive`](<#/doc/tutorials/modules/implied-readability>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Módulos ](<#/doc/tutorials/modules>) > Dependências Opcionais com `requires static`