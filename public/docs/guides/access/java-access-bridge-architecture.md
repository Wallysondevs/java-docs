# Arquitetura do Java Access Bridge

## 4 Arquitetura do Java Access Bridge

O Java Access Bridge consiste em um pacote de classes e DLLs, que permitem a comunicação entre tecnologias assistivas e aplicações Java.

A figura a seguir mostra como os componentes do Java Access Bridge e do Java Accessibility Utilities interagem entre si:

Figura 4-1 Diagrama da Arquitetura do Java Access Bridge

  
[Descrição de "Figura 4-1 Diagrama da Arquitetura do Java Access Bridge"](<#/>)

O Java Access Bridge fornece um subconjunto da Java Accessibility API através da DLL do Windows `Windows\System32\windowsaccessbridge-64.dll`. Tecnologias assistivas no Microsoft Windows carregam e se vinculam a esta DLL. O Java Access Bridge também fornece `javaaccessbridge.dll`, que o Java runtime carrega. Esta DLL se comunica com a aplicação através da Java Accessibility API e, por meio dela, com o toolkit e os componentes da interface do usuário. A DLL também se comunica com a aplicação através do Java Accessibility Utilities, uma coleção de classes que coalescem eventos e fornecem funcionalidade de ciclo de vida da aplicação para tecnologias assistivas (e para o Java Access Bridge, que atua como uma tecnologia assistiva); veja [Visão Geral do Java Accessibility Utilities](<#/doc/guides/access/java-accessibility-utilities-overview>). O componente Java do Java Access Bridge gerencia a comunicação entre a DLL carregada no Java runtime e o outro código Java no Java runtime. O componente Java do Java Access Bridge é carregado no Java SE runtime através do que é especificado na propriedade `assistive_technologies` (veja [Propriedades de Acessibilidade](<#/doc/guides/access/accessibility-properties>)) e, por sua vez, carrega a DLL do lado Java através de Java Native Interfaces (JNI). A comunicação que o Java Access Bridge permite entre tecnologias assistivas e aplicações Java através do Java Accessibility Utilities é chamada de comunicação interprocesso.