# Propriedades de Acessibilidade

## 6 Propriedades de Acessibilidade

O pacote `javax.accessibility` fornece as seguintes propriedades: `assistive_technologies` e `screen_magnifier_present`.

Tópicos

  * [Carregando Tecnologias Assistivas](<#/doc/guides/access/accessibility-properties>)
  * [Indicando a Presença de um Ampliador de Tela](<#/doc/guides/access/accessibility-properties>)
  * [Definindo Propriedades](<#/doc/guides/access/accessibility-properties>)



Carregando Tecnologias Assistivas

A propriedade `assistive_technologies` especifica as tecnologias assistivas a serem carregadas na JVM. Ela aceita uma lista de nomes de provedores de serviço delimitada por vírgulas. Consulte o pacote [javax.accessibility](<https://docs.oracle.com/en/java/javase/25/docs/api/java.desktop/javax/accessibility/package-summary.html>), a classe abstrata [javax.accessibility.AccessibilityProvider](<https://docs.oracle.com/en/java/javase/25/docs/api/java.desktop/javax/accessibility/AccessibilityProvider.html>) e o método [java.awt.Toolkit.getDefaultToolkit](<https://docs.oracle.com/en/java/javase/25/docs/api/java.desktop/java/awt/Toolkit.html#getDefaultToolkit\(\)>).

Indicando a Presença de um Ampliador de Tela

Quando a propriedade `screen_magnifier_present` é definida como `true`, ela informa às bibliotecas da plataforma Java que um ampliador de tela está presente no sistema. Desenvolvedores de aplicativos podem verificar esta propriedade e, se um ampliador de tela estiver presente, os desenvolvedores devem garantir que seus aplicativos sejam compatíveis com a ampliação de tela. Por exemplo, em sistemas operacionais Microsoft Windows, a implementação de referência da Java 2D API verifica esta propriedade e, se `true`, desativa o Microsoft DirectDraw para evitar problemas com o ampliador de tela. (Alguns ampliadores de tela podem não ser capazes de ampliar gráficos DirectDraw.)

Definindo Propriedades

Defina uma propriedade em tempo de execução com o seguinte comando:
```
    java -Djavax.accessibility.assistive_technologies=ServiceProviderName
```

`ServiceProvicerName` é o nome de um provedor de serviço que adiciona um recurso de tecnologia assistiva; consulte o método [javax.accessibility.AccessibilityProvider.getName](<https://docs.oracle.com/en/java/javase/25/docs/api/java.desktop/javax/accessibility/AccessibilityProvider.html#getName\(\)>).

Você também pode especificar propriedades em um arquivo chamado `.accessibility.properties` no diretório home do usuário ou em um arquivo chamado `accessibility.properties` no diretório `$JAVA_HOME/conf`. No primeiro caso, as propriedades são usadas para o usuário atual, e no segundo caso, as propriedades são usadas para todos os usuários daquela instalação Java. As propriedades definidas para o usuário atual têm precedência sobre as propriedades definidas para a instalação Java.

Defina uma propriedade no arquivo `accessibility.properties` adicionando a(s) seguinte(s) linha(s):
```
    assistive_technologies=ServiceProviderName
    screen_magnifier_present=true
    
```

Nota:

Você pode especificar mais de um provedor de serviço na propriedade `assistive_technologies` com uma lista delimitada por vírgulas.