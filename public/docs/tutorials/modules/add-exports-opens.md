# Contornando a Encapsulação Forte com `--add-exports` e `--add-opens`

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Módulos ](<#/doc/tutorials/modules>) > Contornando a Encapsulação Forte com `--add-exports` e `--add-opens`

**Anterior na Série**

[Encapsulação Forte (de Internos do JDK)](<#/doc/tutorials/modules/strong-encapsulation>)

➜

**Tutorial Atual**

Contornando a Encapsulação Forte com `--add-exports` e `--add-opens`

➜

**Próximo na Série**

[Estendendo o Grafo de Módulos com `--add-modules` e `--add-reads`](<#/doc/tutorials/modules/add-modules-reads>)

**Anterior na Série:** [Encapsulação Forte (de Internos do JDK)](<#/doc/tutorials/modules/strong-encapsulation>)

**Próximo na Série:** [Estendendo o Grafo de Módulos com `--add-modules` e `--add-reads`](<#/doc/tutorials/modules/add-modules-reads>)

# Contornando a Encapsulação Forte com `--add-exports` e `--add-opens`

O sistema de módulos é muito rigoroso quanto ao acesso a APIs internas: Se o pacote não for exportado ou aberto, o acesso será negado. Mas um pacote não pode ser apenas exportado ou aberto pelo autor de um módulo - existem também as flags de linha de comando `--add-exports` e `--add-opens`, que permitem que o _usuário_ do módulo faça isso também.

Dessa forma, é possível escrever e executar código que acessa internos das dependências do aplicativo ou das APIs do JDK. Como isso vem com uma troca entre mais recursos ou desempenho (presumivelmente) versus menos manutenibilidade ou integridade da plataforma comprometida, essa decisão não deve ser tomada levianamente. E porque isso, em última análise, diz respeito não apenas ao desenvolvedor, mas também ao usuário do aplicativo resultante, essas flags de linha de comando devem ser aplicadas no momento do lançamento, para que o usuário esteja ciente de que a troca está sendo feita.

**Nota** : Para entender completamente este recurso, você precisa de uma compreensão aprofundada de alguns aspectos diferentes do sistema de módulos, a saber [seus fundamentos](<#/doc/tutorials/modules/intro>), [o suporte para reflexão](<#/doc/tutorials/modules/opening-for-reflection>), [`exports` e `opens` qualificados](<#/doc/tutorials/modules/qualified-exports-opens>), [como construir e lançar a partir da linha de comando](<#/doc/tutorials/modules/building>), e [por que a encapsulação forte é importante](<#/doc/tutorials/modules/strong-encapsulation>).

## Exportando Pacotes com `--add-exports`

A opção `--add-exports $MODULE/$PACKAGE=$READING_MODULE`, disponível para os comandos `java` e `javac`, exporta `$PACKAGE` de _$MODULE_ para _$READING_MODULE_. O código em _$READING_MODULE_ pode, portanto, acessar todos os tipos e membros públicos em `$PACKAGE`, mas outros módulos não podem. Ao definir _$READING_MODULE_ como `ALL-UNNAMED`, todo o código do classpath pode acessar esse pacote. Em um projeto que não usa módulos, você sempre usará esse placeholder - somente quando seu próprio código for executado em módulos você poderá limitar os pacotes exportados a módulos específicos.

O espaço após `--add-exports` pode ser substituído por um sinal de igual `=`, o que ajuda em algumas configurações de ferramentas (Maven, por exemplo): `--add-exports=.../...=...`.

### Em Tempo de Compilação

Como exemplo, veja este código que tenta criar uma instância da classe interna `sun.util.BuddhistCalendar`:

```java
package com.example.internal;

import sun.util.BuddhistCalendar;

public class Internal {
  public static void main(String[] args) {
    System.out.println(new BuddhistCalendar());
  }
}
```

Se o compilarmos assim, obtemos o seguinte erro, seja na importação ou na própria linha se não houver importação:

```
Internal.java:3: error: package sun.util is not visible
import sun.util.BuddhistCalendar;
       ^
  (package sun.util is declared in module java.base, but module com.example.internal does not read it)
```

A opção `--add-exports` pode contornar isso. Se o código acima for compilado sem declaração de módulo, precisamos abrir o pacote para `ALL-UNNAMED`:

```bash
javac --add-exports java.base/sun.util=ALL-UNNAMED Internal.java
```

Se estiver em um módulo chamado _com.example.internal_, podemos ser mais precisos e, assim, minimizar a exposição de internos:

```bash
javac --module com.example.internal --add-exports java.base/sun.util=com.example.internal Internal.java
```

### Em Tempo de Execução

Ao lançar o código (no JDK 17 e superior), obtemos um erro em tempo de execução:

```
Exception in thread "main" java.lang.IllegalAccessError: class com.example.internal.Internal (in module com.example.internal) cannot access class sun.util.BuddhistCalendar (in module java.base) because module java.base does not export sun.util to module com.example.internal
```

Para resolver este problema, precisamos repetir a opção `--add-exports` no momento do lançamento. Para código no classpath:

```bash
java --add-exports java.base/sun.util=ALL-UNNAMED Internal
```

Se estiver em um módulo chamado _com.example.internal_ (que define uma classe principal), podemos novamente ser mais precisos:

```bash
java --module com.example.internal --add-exports java.base/sun.util=com.example.internal
```

## Abrindo Pacotes com `--add-opens`

A opção de linha de comando `--add-opens $MODULE/$PACKAGE=$REFLECTING_MODULE` abre `$PACKAGE` de _$MODULE_ para _$REFLECTING_MODULE_. O código em _$REFLECTING_MODULE_ pode, portanto, acessar reflexivamente todos os tipos e membros, públicos e não públicos, em `$PACKAGE`, mas outros módulos não podem. Ao definir _$READING_MODULE_ como `ALL-UNNAMED`, todo o código do classpath pode acessar reflexivamente esse pacote. Em um projeto que não usa módulos, você sempre usará esse placeholder - somente quando seu próprio código for executado em módulos você poderá limitar os pacotes abertos a módulos específicos.

O espaço após `--add-opens` pode ser substituído por um sinal de igual `=`, o que ajuda em algumas configurações de ferramentas: `--add-opens=.../...=...`.

Como `--add-opens` está vinculado à reflexão, um conceito puramente de tempo de execução, ele só faz sentido para o comando `java`. Mas, dado que inúmeras opções de linha de comando funcionam em várias ferramentas, é útil relatar e explicar quando uma opção _não_ funciona e, portanto, `javac` não rejeita a opção e, em vez disso, emite o aviso de que "--add-opens has no effect at compile time".

### Em Tempo de Execução

Como exemplo, veja este código em uma classe `Internal` que tenta usar reflexão para criar uma instância da classe interna `sun.util.BuddhistCalendar`:

```java
package com.example.internal;

import java.lang.reflect.Constructor;

public class Internal {
  public static void main(String[] args) throws Exception {
    Class<?> clazz = Class.forName("sun.util.BuddhistCalendar");
    Constructor<?> constructor = clazz.getDeclaredConstructor();
    constructor.setAccessible(true); // this line will fail
    Object instance = constructor.newInstance();
    System.out.println(instance);
  }
}
```

Como o código não _compila_ contra a classe interna `BuddhistCalendar`, a compilação funciona sem flags de linha de comando adicionais. Mas no JDK 17 e superior, a execução do código resultante leva a uma exceção em tempo de execução:

```
Exception in thread "main" java.lang.reflect.InaccessibleObjectException: Unable to make field private final int java.util.Calendar.ERA accessible: module java.base does not open java.util to unnamed module @...
```

A opção `--add-opens` pode contornar isso. Se o código acima estiver em um JAR no classpath, precisamos abrir o pacote `sun.util` para `ALL-UNNAMED`:

```bash
java --add-opens java.base/sun.util=ALL-UNNAMED Internal
```

(Lembre-se do [artigo sobre encapsulação forte](<#/doc/tutorials/modules/strong-encapsulation>), que não é necessário abrir os pacotes `sun.misc` e `sun.reflect` porque eles são exportados por _jdk.unsupported_.)

Se estiver em um módulo chamado _com.example.internal_ (que define uma classe principal), podemos ser mais precisos e, assim, minimizar a exposição de internos:

```bash
java --module com.example.internal --add-opens java.base/sun.util=com.example.internal
```

### Neste tutorial

Exportando Pacotes com `--add-exports` Abrindo Pacotes com `--add-opens`

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Encapsulação Forte (de Internos do JDK)](<#/doc/tutorials/modules/strong-encapsulation>)

➜

**Tutorial Atual**

Contornando a Encapsulação Forte com `--add-exports` e `--add-opens`

➜

**Próximo na Série**

[Estendendo o Grafo de Módulos com `--add-modules` e `--add-reads`](<#/doc/tutorials/modules/add-modules-reads>)

**Anterior na Série:** [Encapsulação Forte (de Internos do JDK)](<#/doc/tutorials/modules/strong-encapsulation>)

**Próximo na Série:** [Estendendo o Grafo de Módulos com `--add-modules` e `--add-reads`](<#/doc/tutorials/modules/add-modules-reads>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Módulos ](<#/doc/tutorials/modules>) > Contornando a Encapsulação Forte com `--add-exports` e `--add-opens`