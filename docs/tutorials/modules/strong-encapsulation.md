# Encapsulamento Forte (de Internos do JDK)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Módulos ](<#/doc/tutorials/modules>) > Encapsulamento Forte (de Internos do JDK)

**Anterior na Série**

[Construindo Módulos na Linha de Comando](<#/doc/tutorials/modules/building>)

➜

**Tutorial Atual**

Encapsulamento Forte (de Internos do JDK)

➜

**Próximo na Série**

[Contornando o Encapsulamento Forte com `--add-exports` e `--add-opens`](<#/doc/tutorials/modules/add-exports-opens>)

**Anterior na Série:** [Construindo Módulos na Linha de Comando](<#/doc/tutorials/modules/building>)

**Próximo na Série:** [Contornando o Encapsulamento Forte com `--add-exports` e `--add-opens`](<#/doc/tutorials/modules/add-exports-opens>)

# Encapsulamento Forte (de Internos do JDK)

Quase todas as dependências - sejam frameworks, bibliotecas, APIs do JDK ou seus próprios (sub)projetos - possuem uma API pública, suportada e estável, bem como código interno necessário para fazer a parte pública funcionar. O encapsulamento forte visa evitar o uso (acidental) de APIs internas para tornar os projetos mais robustos e fáceis de manter. Exploraremos por que isso é necessário, o que exatamente constitui APIs internas (particularmente para o JDK) e como o encapsulamento forte funciona na prática.

**Nota** : Você precisa conhecer [os fundamentos do sistema de módulos](<#/doc/tutorials/modules/intro>) e sobre [o suporte para reflection](<#/doc/tutorials/modules/opening-for-reflection>) para aproveitar ao máximo este artigo.

## O Que É Encapsulamento Forte?

Em muitos aspectos, a base de código do OpenJDK é semelhante a qualquer outro projeto de software e uma constante é o refactoring. O código é alterado, movido, removido, etc., para manter a base de código limpa e fácil de manter. Nem todo o código, é claro: A API pública, o contrato com os usuários do Java, é extremamente estável.

Como você pode ver, a distinção entre API pública e código interno é fundamental para manter a compatibilidade, tanto para os desenvolvedores do JDK quanto para você. Você precisa ter certeza de que seu projeto, ou seja, seu código _e_ suas dependências, não dependa de internos que podem mudar em qualquer atualização menor do JDK, causando trabalho surpreendente e desnecessário. Pior, tais dependências podem impedi-lo de atualizar o JDK. Ao mesmo tempo, você pode estar em uma situação em que uma API interna fornece capacidades únicas sem as quais seu projeto não poderia competir.

Juntos, isso significa que um mecanismo que bloqueia APIs internas por padrão, mas permite que você desbloqueie APIs específicas para casos de uso específicos, é essencial. O encapsulamento forte é esse mecanismo.

Como apenas tipos em pacotes exportados ou abertos são acessíveis fora de um módulo, todo o resto é considerado interno e, portanto, inacessível. Em primeiro lugar, isso se aplica ao próprio JDK, que é dividido em módulos desde o Java 9.

## O Que São APIs Internas?

Então, quais APIs do JDK são internas? Para responder a isso, precisamos analisar três namespaces:

Primeiro `java.*`: É claro que esses pacotes compõem a API pública, mas isso se estende apenas a membros públicos de classes públicas. Classes e membros menos visíveis são internos e fortemente encapsulados pelo sistema de módulos.

Depois, há `sun.*`. Quase todos esses pacotes são internos, mas há duas exceções: Os pacotes `sun.misc` e `sun.reflect` são exportados e abertos pelo módulo _jdk.unsupported_ porque fornecem funcionalidades críticas para vários projetos e não possuem alternativas viáveis dentro ou fora do JDK (mais proeminentemente `sun.misc.Unsafe`). Não deixe que essas exceções muito específicas confundam o ponto principal, no entanto: De modo geral, os pacotes `sun.*` devem ser vistos como internos e todos, exceto esses dois, realmente o são.

Por último, `com.sun.*`, que é mais complicado. Todo o namespace é específico do JDK, o que significa que não faz parte da API padrão do Java, e alguns JDKs podem não contê-lo. Cerca de 90% dele são pacotes não exportados e são internos. Os 10% restantes são pacotes exportados por módulos _jdk.*_ e são suportados para uso fora do JDK. Isso significa que eles são desenvolvidos com uma consideração semelhante pela compatibilidade como as APIs padronizadas. [Aqui está uma lista](<https://cr.openjdk.org/~mr/jigsaw/jdk8-packages-strongly-encapsulated>) de pacotes internos versus exportados.

Em resumo, use `java.*`, evite `sun.*`, tenha cuidado com `com.sun.*`.

## Experimentos com Encapsulamento Forte

Para experimentar o encapsulamento forte, vamos criar uma classe simples que usa uma classe de uma API pública:

```java
import java.util.List;

class PublicAPI {
    public static void main(String[] args) {
        System.out.println(List.class.getName());
    }
}
```

Como é uma única classe, você pode executá-la imediatamente sem compilação explícita:

```bash
java PublicAPI.java
```

Isso deve ser executado com sucesso e imprimir "List".

Em seguida, vamos incluir uma daquelas exceções que são acessíveis por motivos de compatibilidade:

```java
import java.util.List;
import sun.misc.Unsafe;

class PublicAndSupportedInternalAPI {
    public static void main(String[] args) {
        System.out.println(List.class.getName());
        System.out.println(Unsafe.class.getName());
    }
}
```

Você ainda poderá executar isso imediatamente, imprimindo "List" e "Unsafe".

```bash
java PublicAndSupportedInternalAPI.java
```

Agora vamos usar uma classe interna que não é acessível:

```java
import java.util.List;
import sun.util.locale.provider.LocaleProviderAdapter;

class InternalAPI {
    public static void main(String[] args) {
        System.out.println(List.class.getName());
        System.out.println(LocaleProviderAdapter.class.getName());
    }
}
```

Se você tentar executar isso como antes, obterá um erro de compilação (o comando `java` compila em memória):

```bash
java InternalAPI.java
```

A mensagem de erro é bastante clara: O pacote `sun.util` pertence ao módulo _java.base_ e, como este não o exporta, ele é considerado interno e, portanto, inacessível.

Podemos evitar o tipo durante a compilação e usar reflection em vez disso:

```java
import java.util.List;

class InternalAPIWithReflection {
    public static void main(String[] args) throws Exception {
        System.out.println(List.class.getName());
        Class<?> clazz = Class.forName("sun.util.locale.provider.LocaleProviderAdapter");
        System.out.println(clazz.getName());
    }
}
```

A execução disso leva a uma exceção em tempo de execução:

```bash
java InternalAPIWithReflection.java
```

## Encapsulamento Forte na Prática

Se você realmente precisa acessar APIs internas, existem duas flags de linha de comando que permitem contornar o encapsulamento forte:

  * `--add-exports` torna tipos e membros públicos nos pacotes exportados acessíveis em tempo de compilação ou execução
  * `--add-opens` torna todos os tipos e seus membros no pacote aberto acessíveis em tempo de execução para reflection

Mais sobre as duas opções e como usá-las [neste artigo](<#/doc/tutorials/modules/add-exports-opens>).

Ao aplicar `--add-exports` durante a compilação, ele deve ser aplicado novamente ao executar o aplicativo e, claro, `--add-opens` só faz sentido em tempo de execução. Isso significa que, qualquer que seja o código (seu ou de suas dependências) que precise de acesso a internos do JDK, as exceções precisam ser configuradas ao iniciar o aplicativo. Isso dá ao proprietário do aplicativo total transparência sobre esses problemas e permite que ele avalie a situação e altere o código/dependência ou aceite conscientemente o risco de manutenção que advém do uso de APIs internas.

O encapsulamento forte está em vigor em torno de todos os módulos explícitos. Isso inclui todo o JDK, que é totalmente modularizado, mas potencialmente também seu código e suas dependências, caso venham como JARs modulares que você coloca no module path. Nesse caso, tudo o que foi dito até agora se aplica a esses módulos também:

  * apenas tipos e membros públicos em pacotes exportados são acessíveis fora do módulo em tempo de compilação e execução
  * todos os tipos e membros em pacotes abertos são acessíveis fora do módulo em tempo de execução
  * outros tipos e membros são inacessíveis durante a compilação e em tempo de execução
  * exceções podem ser criadas com `--add-exports` (para dependências estáticas) e `--add-opens` (para acesso via reflection)

Isso significa que você pode expandir os benefícios do encapsulamento forte além das APIs do JDK para incluir seu código e suas dependências.

## Evolução do Encapsulamento Forte

O encapsulamento forte é um pilar do sistema de módulos, que foi introduzido no Java 9, mas por razões de compatibilidade, o código do classpath ainda podia acessar APIs internas do JDK. Isso era gerenciado com a opção de linha de comando `--illegal-access`, que tinha o valor padrão `permit` do JDK 9 ao 15. O JDK 16 mudou esse padrão para `deny` e o 17 desativa a opção completamente.

A partir do 17, apenas `--add-exports` e `--add-opens` dão acesso a APIs internas.

### Neste tutorial

O Que É Encapsulamento Forte? O Que São APIs Internas? Experimentos com Encapsulamento Forte Encapsulamento Forte na Prática Evolução do Encapsulamento Forte

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Construindo Módulos na Linha de Comando](<#/doc/tutorials/modules/building>)

➜

**Tutorial Atual**

Encapsulamento Forte (de Internos do JDK)

➜

**Próximo na Série**

[Contornando o Encapsulamento Forte com `--add-exports` e `--add-opens`](<#/doc/tutorials/modules/add-exports-opens>)

**Anterior na Série:** [Construindo Módulos na Linha de Comando](<#/doc/tutorials/modules/building>)

**Próximo na Série:** [Contornando o Encapsulamento Forte com `--add-exports` e `--add-opens`](<#/doc/tutorials/modules/add-exports-opens>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Módulos ](<#/doc/tutorials/modules>) > Encapsulamento Forte (de Internos do JDK)