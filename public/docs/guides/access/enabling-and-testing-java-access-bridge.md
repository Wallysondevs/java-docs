# Habilitando e Testando o Java Access Bridge

## 3 Habilitando e Testando o Java Access Bridge

Por padrão, o Java Access Bridge não está habilitado. Habilite-o através da linha de comando ou do Painel de Controle do Windows. Teste-o executando uma aplicação Java que usa a Accessibility API.

Tópicos

  * [Habilitando o Java Access Bridge Através da Linha de Comando](<#/doc/guides/access/enabling-and-testing-java-access-bridge>)
  * [Desabilitando o Java Access Bridge](<#/doc/guides/access/enabling-and-testing-java-access-bridge>)
  * [Testando o Java Access Bridge](<#/doc/guides/access/enabling-and-testing-java-access-bridge>)
  * [Ferramentas do Java Access Bridge](<#/doc/guides/access/enabling-and-testing-java-access-bridge>)
  * [Requisitos Mínimos de Versão de Tecnologias Assistivas](<#/doc/guides/access/enabling-and-testing-java-access-bridge>)

### Habilitando o Java Access Bridge Através da Linha de Comando

Habilite o Java Access Bridge com o comando [`jabswitch`](<#/>).

Execute o seguinte comando (onde `%JAVA_HOME%` é o diretório do seu JDK):
```
    %JAVA_HOME%\bin\jabswitch -enable
```

### Desabilitando o Java Access Bridge

Desabilite o Java Access Bridge com o comando `jabswitch`.

Execute o seguinte comando:
```
    %JAVA_HOME%\bin\jabswitch -disable
```

Nota:

Você não pode desabilitar o Java Access Bridge através da Central de Facilidade de Acesso do Windows.

### Testando o Java Access Bridge

Teste o Java Access Bridge primeiro instalando uma tecnologia assistiva suportada e depois executando uma aplicação Java que usa a Accessibility API.

  1. Certifique-se de que o Java Access Bridge esteja habilitado.
  2. Instale um produto de tecnologia assistiva que suporte o Java Access Bridge, como um dos seguintes produtos:

     * [JAWS](<https://www.freedomscientific.com/Products/Blindness/JAWS>)

     * [ZoomText](<https://www.freedomscientific.com/products/software/zoomtext/>)

     * [Dolphin ScreenReader](<https://yourdolphin.com/screenreader>)

  3. Execute uma aplicação Java que usa o pacote [`javax.accessibility`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.desktop/javax/accessibility/package-summary.html>) e certifique-se de que seu produto de tecnologia assistiva funcione corretamente com ele.

### Ferramentas do Java Access Bridge

Use as ferramentas `jaccessinspector` e `jaccesswalker`, que fazem parte do JDK, para testar o Java Access Bridge.

A ferramenta [`jaccessinspector`](<#/>) usa a Java Accessibility Utilities API para examinar informações acessíveis sobre os objetos na Java Virtual Machine. A ferramenta [`jaccesswalker`](<#/>) percorre as árvores de componentes em uma Java Virtual Machine específica e apresenta a hierarquia de acessibilidade em uma visualização em árvore. Encontre essas ferramentas no diretório `bin` do JDK.

### Requisitos Mínimos de Versão de Tecnologias Assistivas

Este tópico lista os requisitos mínimos de versão de algumas tecnologias assistivas.

  * JAWS: Versão 13 e posterior

  * SuperNova: Versão 13 e posterior

  * ZoomText: Versão 10.1.5 e posterior