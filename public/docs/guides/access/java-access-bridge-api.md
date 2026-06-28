# API Java Access Bridge

## 5 API Java Access Bridge

A API Java Access Bridge permite que você desenvolva aplicações de tecnologia assistiva para o sistema operacional Microsoft Windows que funcionam com aplicações Java. Ela contém métodos nativos que permitem visualizar e manipular informações sobre elementos da GUI em uma aplicação Java, que são encaminhadas para sua aplicação de tecnologia assistiva através do Java Access Bridge.

Tópicos

  * [Arquivos da API Java Access Bridge](<#/doc/guides/access/java-access-bridge-api>)
  * [Chamadas da API Java Access Bridge](<#/doc/guides/access/java-access-bridge-api>)
  * [Estruturas de Dados da API Java Access Bridge](<#/doc/guides/access/java-access-bridge-api>)
  * [Callbacks da API Java Access Bridge](<#/doc/guides/access/java-access-bridge-api>)
  * [Solução de Problemas do Java Access Bridge](<#/doc/guides/access/java-access-bridge-api>)



### Arquivos da API Java Access Bridge

A API Java Access Bridge pode ser encontrada em quatro arquivos: `AccessBridgeCalls.h` e `AccessBridgeCalls.c` (chamadas de API), `AccessBridgePackages.h` (estruturas de dados) e `AccessBridgeCallbacks.h` (callbacks).

Localização dos Arquivos da API Java Access Bridge

Encontre os seguintes arquivos de inclusão (cabeçalho) da API Java Access Bridge em `%JAVA_HOME%\include\win32\bridge`:

  * `AccessBridgeCallbacks.h`

  * `AccessBridgeCalls.h`

  * `AccessBridgePackages.h`




Encontre o arquivo [`AccessBridgeCalls.c`](<#/>), que define algumas interfaces chave, no repositório de código-fonte do JDK.

### Chamadas da API Java Access Bridge

O arquivo `AccessBridgeCalls.h` contém as chamadas da API Java Access Bridge. Para usá-las, compile o arquivo `AccessBridgeCalls.c`. As chamadas da API Java Access Bridge atuam como a interface entre sua aplicação e `WindowsAccessBridge.dll`.

Funções de Inicialização/Desligamento

Estas duas funções iniciam e desligam o Java Access Bridge.

  *
`BOOL initializeAccessBridge();
```

Inicia o Java Access Bridge. Você não pode usar nenhuma parte da API Java Access Bridge até chamar esta função.

  *
`BOOL shutdownAccessBridge();
```

Desliga o Java Access Bridge. É importante chamar esta função quando sua aplicação terminar de usar o Java Access Bridge (antes que sua aplicação seja encerrada) para que o Java Access Bridge possa realizar a limpeza de memória adequadamente.

Nota: Chamar a função shutdownAccessBridge não substitui a liberação de quaisquer estruturas de dados mantidas pela JVM; faça isso chamando a função ReleaseJavaObject.




Funções Gateway

Você geralmente chama estas funções antes de chamar qualquer outra função da API Java Access Bridge:

  *
`BOOL IsJavaWindow(HWND window);
```

Verifica se a janela fornecida implementa a Java Accessibility API.

  *
`BOOL GetAccessibleContextFromHWND(HWND target, long *vmID, AccessibleContext *ac);
```

Obtém os valores `AccessibleContext` e `vmID` para a janela fornecida. Muitas funções do Java Access Bridge exigem os valores `AccessibleContext` e `vmID`.




Funções de Manipulação de Eventos

Estas recebem um ponteiro de função para a função que manipulará o tipo de evento. Quando você não estiver mais interessado em receber esses tipos de eventos, chame a função novamente, passando o valor `NULL`. Encontre protótipos para os ponteiros de função que você precisa passar para essas funções no arquivo `AccessBridgeCallbacks.h`. [Callbacks da API Java Access Bridge](<#/doc/guides/access/java-access-bridge-api>) descreve esses protótipos.

Funções Gerais

  *
`void ReleaseJavaObject(long vmID, Java_Object object);
```

Libera a memória usada pelo objeto Java `object`, onde `object` é um objeto retornado a você pelo Java Access Bridge. O Java Access Bridge mantém automaticamente uma referência a todos os objetos Java que ele retorna a você na JVM para que não sejam coletados pelo garbage collector. Para evitar memory leaks, chame `ReleaseJavaObject` em todos os objetos Java retornados a você pelo Java Access Bridge assim que terminar de usá-los.

  *
`BOOL GetVersionInfo(long vmID, AccessBridgeVersionInfo *info);
```

Obtém as informações de versão da instância do Java Access Bridge que sua aplicação está usando. Você pode usar essas informações para determinar a funcionalidade disponível em sua versão do Java Access Bridge.

Nota:

Para determinar a versão da JVM, você precisa passar um `vmID` válido; caso contrário, tudo o que é retornado é a versão do arquivo `WindowsAccessBridge.DLL` ao qual sua aplicação está conectada.




Funções de Contexto Acessível

Estas funções fornecem o núcleo da Java Accessibility API que é exposta pelo Java Access Bridge.

As funções `GetAccessibleContextAt` e `GetAccessibleContextWithFocus` recuperam um objeto `AccessibleContext`, que é um magic cookie (uma referência de `Object` Java) para um objeto `Accessible` e um cookie da JVM. Você usa esses dois cookies para referenciar objetos através do Java Access Bridge. A maioria das funções da API Java Access Bridge exige que você passe esses dois parâmetros.

Nota:

Objetos `AccessibleContext` são referências de 64 bits em comunicação interprocesso de 64 bits (que usa o arquivo `windowsaccessbridge-64.dll`). No entanto, antes do JDK 9, objetos `AccessibleContext` eram referências de 32 bits em comunicação interprocesso de 32 bits (que usa o arquivo `windowsaccessbridge.dll` sem `-32` ou `-64` no nome do arquivo). Consequentemente, se você estiver convertendo suas aplicações de tecnologia assistiva para rodar em sistemas Windows de 64 bits, então você precisará recompilar suas aplicações de tecnologia assistiva.

A função `GetAccessibleContextInfo` retorna informações detalhadas sobre um objeto `AccessibleContext` pertencente à JVM. A fim de melhorar o desempenho, os vários métodos distintos na Java Accessibility API são agrupados em algumas rotinas na API Java Access Bridge e retornados em valores `struct`. O arquivo `AccessBridgePackages.h` define esses valores `struct` e [Callbacks da API Java Access Bridge](<#/doc/guides/access/java-access-bridge-api>) os descreve.

As funções `GetAccessibleChildFromContext` e `GetAccessibleParentFromContext` permitem que você percorra a hierarquia de componentes da GUI, recuperando o enésimo filho, ou o pai, de um objeto GUI específico.

  *
`BOOL GetAccessibleContextAt(long vmID, AccessibleContext acParent, jint x, jint y, AccessibleContext *ac)
```

Recupera um objeto `AccessibleContext` da janela ou objeto que está sob o ponteiro do mouse.

  *
`BOOL GetAccessibleContextWithFocus(HWND window, long *vmID, AccessibleContext *ac);
```

Recupera um objeto `AccessibleContext` da janela ou objeto que tem o foco.

  *
`BOOL GetAccessibleContextInfo(long vmID, AccessibleContext ac, AccessibleContextInfo *info);
```

Recupera um objeto `AccessibleContextInfo` do objeto `AccessibleContext` `ac`.

  *
`AccessibleContext GetAccessibleChildFromContext(long vmID, AccessibleContext ac, jint index);
```

Retorna um objeto `AccessibleContext` que representa o enésimo filho do objeto `ac`, onde n é especificado pelo valor index.

  *
`AccessibleContext GetAccessibleParentFromContext(long vmID, AccessibleContext ac);
```

Retorna um objeto `AccessibleContext` que representa o pai do objeto `ac`.

  *
`HWND getHWNDFromAccessibleContext(long vmID, AccessibleContext ac);
```

Retorna o HWND do AccessibleContext de uma janela de nível superior.




Funções de Texto Acessível

Estas funções obtêm informações `AccessibleText` fornecidas pela Java Accessibility API, divididas em sete partes para eficiência. Um `AccessibleContext` contém informações `AccessibleText` se você definir a flag `accessibleText` na estrutura de dados `AccessibleContextInfo` como `TRUE`. O arquivo `AccessBridgePackages.h` define os valores `struct` usados nestas funções [Callbacks da API Java Access Bridge](<#/doc/guides/access/java-access-bridge-api>) os descreve.

  *
`BOOL GetAccessibleTextInfo(long vmID, AccessibleText at, AccessibleTextInfo
        *textInfo, jint x, jint y);
```

  *
`BOOL GetAccessibleTextItems(long vmID, AccessibleText at, AccessibleTextItemsInfo
        *textItems, jint index);
```

  *
`BOOL GetAccessibleTextSelectionInfo(long vmID, AccessibleText
        at, AccessibleTextSelectionInfo *textSelection);
```

  *
`char *GetAccessibleTextAttributes(long vmID, AccessibleText
        at, jint index, AccessibleTextAttributesInfo *attributes);
```

  *
`BOOL GetAccessibleTextRect(long vmID, AccessibleText at, AccessibleTextRectInfo
        *rectInfo, jint index);
```

  *
`BOOL GetAccessibleTextRange(long vmID, AccessibleText at, jint
        start, jint end, wchar_t *text, short len);
```

  *
`BOOL GetAccessibleTextLineBounds(long vmID, AccessibleText
        at, jint index, jint *startIndex, jint *endIndex);
```




Funções de Texto Adicionais

  *
`BOOL selectTextRange(const long vmID, const AccessibleContext accessibleContext, const int startIndex, const int endIndex);
```

Seleciona texto entre dois índices. A seleção inclui o texto no índice inicial e o texto no índice final. Retorna se foi bem-sucedido.

  *
`BOOL getTextAttributesInRange(const long vmID, const AccessibleContext accessibleContext, const int startIndex, const int endIndex, [AccessibleTextAttributesInfo](<#/doc/guides/access/java-access-bridge-api>) *attributes, short *len);
```

Obtém atributos de texto entre dois índices. A lista de atributos inclui o texto no índice inicial e o texto no índice final. Retorna se foi bem-sucedido.

  *
`BOOL setCaretPosition(const long vmID, const AccessibleContext accessibleContext, const int position);
```

Define o cursor para uma posição de texto. Retorna se foi bem-sucedido.

  *
`BOOL getCaretLocation(long vmID, AccessibleContext ac, [AccessibleTextRectInfo](<#/doc/guides/access/java-access-bridge-api>) *rectInfo, jint index);
```

Obtém a localização do cursor de texto.

  *
`BOOL setTextContents (const long vmID, const AccessibleContext accessibleContext, const wchar_t *text);
```

Define o conteúdo de texto editável. O AccessibleContext deve implementar AccessibleEditableText e ser editável. O comprimento máximo de texto que pode ser definido é `MAX_STRING_SIZE - 1`. Retorna se foi bem-sucedido.




Funções de Tabela Acessível

  *
`BOOL getAccessibleTableInfo(long vmID, AccessibleContext acParent, [AccessibleTableInfo](<#/doc/guides/access/java-access-bridge-api>) *tableInfo);
```

Retorna informações sobre a tabela, por exemplo, legenda, resumo, contagem de linhas e colunas, e o AccessibleTable.

  *
`BOOL getAccessibleTableCellInfo(long vmID, AccessibleTable accessibleTable, jint row, jint column, AccessibleTableCellInfo *tableCellInfo);
```

Retorna informações sobre a célula da tabela especificada. Os especificadores de linha e coluna são baseados em zero.

  *
`BOOL getAccessibleTableRowHeader(long vmID, AccessibleContext acParent, AccessibleTableInfo *tableInfo);
```

Retorna os cabeçalhos de linha da tabela especificada como uma tabela.

  *
`BOOL getAccessibleTableColumnHeader(long vmID, AccessibleContext acParent, AccessibleTableInfo *tableInfo);
```

Retorna os cabeçalhos de coluna da tabela especificada como uma tabela.

  *
`AccessibleContext getAccessibleTableRowDescription(long vmID, AccessibleContext acParent, jint row);
```

Retorna a descrição da linha especificada na tabela especificada. O especificador de linha é baseado em zero.

  *
`AccessibleContext getAccessibleTableColumnDescription(long vmID, AccessibleContext acParent, jint column);
```

Retorna a descrição da coluna especificada na tabela especificada. O especificador de coluna é baseado em zero.

  *
`jint getAccessibleTableRowSelectionCount(long vmID, AccessibleTable table);
```

Retorna quantas linhas na tabela estão selecionadas.

  *
`BOOL isAccessibleTableRowSelected(long vmID, AccessibleTable table, jint row);
```

Retorna true se a linha especificada (baseada em zero) estiver selecionada.

  *
`BOOL getAccessibleTableRowSelections(long vmID, AccessibleTable table, jint count, jint *selections);
```

Retorna um array de índices baseados em zero das linhas selecionadas.

  *
`jint getAccessibleTableColumnSelectionCount(long vmID, AccessibleTable table);
```

Retorna quantas colunas na tabela estão selecionadas.

  *
`BOOL isAccessibleTableColumnSelected(long vmID, AccessibleTable table, jint column);
```

Retorna true se a coluna especificada (baseada em zero) estiver selecionada.

  *
`BOOL getAccessibleTableColumnSelections(long vmID, AccessibleTable table, jint count, jint *selections);
```

Retorna um array de índices baseados em zero das colunas selecionadas.

  *
`jint getAccessibleTableRow(long vmID, AccessibleTable table, jint index);
```

Retorna o número da linha da célula no índice de célula especificado. Os valores são baseados em zero.

  *
`jint getAccessibleTableColumn(long vmID, AccessibleTable table, jint index);
```

Retorna o número da coluna da célula no índice de célula especificado. Os valores são baseados em zero.

  *
`jint getAccessibleTableIndex(long vmID, AccessibleTable table, jint row, jint column);
```

Retorna o índice na tabela do deslocamento de linha e coluna especificado. Os valores são baseados em zero.




Função de Conjunto de Relações Acessíveis

  *
`BOOL getAccessibleRelationSet(long vmID, AccessibleContext accessibleContext, AccessibleRelationSetInfo *relationSetInfo);
```

Retorna informações sobre os objetos relacionados de um objeto.




Funções de Hipertexto Acessível

  *
`BOOL getAccessibleHypertext(long vmID, AccessibleContext accessibleContext, [AccessibleHypertextInfo](<#/doc/guides/access/java-access-bridge-api>) *hypertextInfo);
```

Retorna informações de hipertexto associadas a um componente.

  *
`BOOL activateAccessibleHyperlink(long vmID, AccessibleContext accessibleContext, AccessibleHyperlink accessibleHyperlink);
```

Solicita que um hiperlink seja ativado.

  *
`jint getAccessibleHyperlinkCount(const long vmID, const AccessibleHypertext hypertext);
```

Retorna o número de hiperlinks em um componente. Mapeia para AccessibleHypertext.getLinkCount. Retorna -1 em caso de erro.

  *
`BOOL getAccessibleHypertextExt(const long vmID, const AccessibleContext accessibleContext, const jint nStartIndex, AccessibleHypertextInfo *hypertextInfo);
```

Itera pelos hiperlinks em um componente. Retorna informações de hipertexto para um componente começando no índice de hiperlink nStartIndex. Não mais que MAX_HYPERLINKS objetos AccessibleHypertextInfo serão retornados para cada chamada a este método. Retorna FALSE em caso de erro.

  *
`jint getAccessibleHypertextLinkIndex(const long vmID, const AccessibleHypertext hypertext, const jint nIndex);
```

Retorna o índice em um array de hiperlinks que está associado a um índice de caractere no documento. Mapeia para AccessibleHypertext.getLinkIndex. Retorna -1 em caso de erro.

  *
`BOOL getAccessibleHyperlink(const long vmID, const AccessibleHypertext hypertext, const jint nIndex, AccessibleHypertextInfo *hyperlinkInfo);
```

Retorna o enésimo hiperlink em um documento. Mapeia para AccessibleHypertext.getLink. Retorna FALSE em caso de erro.




Função de Atribuição de Teclas Acessíveis

  *
`BOOL getAccessibleKeyBindings(long vmID, AccessibleContext accessibleContext, [AccessibleKeyBindings](<#/doc/guides/access/java-access-bridge-api>) *keyBindings);
```

Retorna uma lista de atribuições de teclas associadas a um componente.




Função de Ícone Acessível

  *
`BOOL getAccessibleIcons(long vmID, AccessibleContext accessibleContext, AccessibleIcons *icons);
```

Retorna uma lista de ícones associados a um componente.




Funções de Ação Acessível

  *
`BOOL getAccessibleActions(long vmID, AccessibleContext accessibleContext, [AccessibleActions](<#/doc/guides/access/java-access-bridge-api>) *actions);
```

Retorna uma lista de ações que um componente pode realizar.

  *
`BOOL doAccessibleActions(long vmID, AccessibleContext accessibleContext, AccessibleActionsToDo *actionsToDo, jint *failure);
```

Solicita que uma lista de AccessibleActions seja executada por um componente. Retorna TRUE se todas as ações forem executadas. Retorna FALSE quando a primeira ação solicitada falha, caso em que "failure" contém o índice da ação que falhou.




Funções de Utilitário

  *
`BOOL IsSameObject(long vmID, JOBJECT64 obj1, JOBJECT64 obj2);
```

Retorna se duas referências de objeto se referem ao mesmo objeto.

  *
`AccessibleContext getParentWithRole (const long vmID, const AccessibleContext accessibleContext, const wchar_t *role);
```

Retorna o AccessibleContext com a função especificada que é o ancestral de um determinado objeto. A função é uma das strings de função definidas em [Estruturas de Dados da API Java Access Bridge](<#/doc/guides/access/java-access-bridge-api>). Se não houver um objeto ancestral que tenha a função especificada, retorna (AccessibleContext)0.

  *
`AccessibleContext getParentWithRoleElseRoot (const long vmID, const AccessibleContext accessibleContext, const wchar_t *role);
```

Retorna o AccessibleContext com a função especificada que é o ancestral de um determinado objeto. A função é uma das strings de função definidas em Estruturas de Dados da API Java Access Bridge. Se um objeto com a função especificada não existir, retorna o objeto de nível superior para a janela Java. Retorna (AccessibleContext)0 em caso de erro.

  *
`AccessibleContext getTopLevelObject (const long vmID, const AccessibleContext accessibleContext);
```

Retorna o AccessibleContext para o objeto de nível superior em uma janela Java. Este é o mesmo AccessibleContext que é obtido de GetAccessibleContextFromHWND para aquela janela. Retorna (AccessibleContext)0 em caso de erro.

  *
`int getObjectDepth (const long vmID, const AccessibleContext accessibleContext);
```

Retorna a profundidade de um determinado objeto na hierarquia de objetos. O objeto mais superior na hierarquia de objetos tem uma profundidade de objeto de 0. Retorna -1 em caso de erro.

  *
`AccessibleContext getActiveDescendent (const long vmID, const AccessibleContext accessibleContext);
```

Retorna o AccessibleContext do ActiveDescendent atual de um objeto. Este método assume que o ActiveDescendent é o componente atualmente selecionado em um objeto contêiner. Retorna (AccessibleContext)0 em caso de erro ou se não houver seleção.

  *
`BOOL requestFocus(const long vmID, const AccessibleContext accessibleContext);
```

Solicita foco para um componente. Retorna se foi bem-sucedido.

  *
`int getVisibleChildrenCount(const long vmID, const AccessibleContext accessibleContext);
```

Retorna o número de filhos visíveis de um componente. Retorna -1 em caso de erro.

  *
`BOOL getVisibleChildren(const long vmID, const AccessibleContext accessibleContext, const int startIndex, [VisibleChildrenInfo](<#/doc/guides/access/java-access-bridge-api>) *visibleChildrenInfo);
```

Obtém os filhos visíveis de um AccessibleContext. Retorna se foi bem-sucedido.

  *
`int getEventsWaiting();
```

Obtém o número de eventos aguardando para serem disparados.




Funções de Valor Acessível

Estas funções obtêm informações `AccessibleValue` fornecidas pela Java Accessibility API. Um objeto `AccessibleContext` contém informações `AccessibleValue` se a flag `accessibleValue` na estrutura de dados `AccessibleContextInfo` for definida como `TRUE`. Os valores retornados são `strings (char *value)` porque não há como saber antecipadamente se o valor é um inteiro, um valor de ponto flutuante ou algum outro objeto que subclasse a construção da linguagem Java `java.lang.Number`.

  *
`BOOL GetCurrentAccessibleValueFromContext(long vmID, AccessibleValue av, wchar_t *value, short len);
```

  *
`BOOL GetMaximumAccessibleValueFromContext(long vmID, AccessibleValue av, wchar_ *value, short len);
```

  *
`BOOL GetMinimumAccessibleValueFromContext(long vmID, AccessibleValue av, wchar_ *value, short len);
```




Funções de Seleção Acessível

Estas funções obtêm e manipulam informações `AccessibleSelection` fornecidas pela Java Accessibility API. Um `AccessibleContext` contém informações `AccessibleSelection` se a flag `accessibleSelection` na estrutura de dados `AccessibleContextInfo` for definida como `TRUE`. O suporte a `AccessibleSelection` é o primeiro lugar onde a interface do usuário pode ser manipulada, em vez de ser apenas consultada, através da adição e remoção de itens de uma seleção. Algumas das funções usam um índice que está em coordenadas de filho, enquanto outras usam coordenadas de seleção. Por exemplo, adicionar ou remover de uma seleção passando índices de filho (por exemplo, adicionar o quarto filho à seleção). Por outro lado, a enumeração dos filhos selecionados é feita em coordenadas de seleção (por exemplo, obter o `AccessibleContext` do primeiro objeto selecionado).

  *
`void AddAccessibleSelectionFromContext(long vmID, AccessibleSelection
        as, int i);
```

  *
`void ClearAccessibleSelectionFromContext(long vmID, AccessibleSelection
        as);
```

  *
`jobject GetAccessibleSelectionFromContext(long vmID, AccessibleSelection
        as, int i);
```

  *
`int GetAccessibleSelectionCountFromContext(long vmID, AccessibleSelection
        as);
```

  *
`BOOL IsAccessibleChildSelectedFromContext(long vmID, AccessibleSelection
        as, int i);
```

  *
`void RemoveAccessibleSelectionFromContext(long vmID, AccessibleSelection
        as, int i);
```

  *
`void SelectAllAccessibleSelectionFromContext(long vmID, AccessibleSelection
        as);
```




### Estruturas de Dados da API Java Access Bridge

As estruturas de dados da API Java Access Bridge estão contidas no arquivo `AccessBridgePackages.h`.

Estruturas de Dados Importantes

Existem estruturas de dados neste arquivo que você não precisa (e pode ignorar); elas são usadas como parte do mecanismo de comunicação interprocesso das duas DLLs do Java Access Bridge. As estruturas de dados importantes são as seguintes:
```
    #define MAX_STRING_SIZE     1024
    #define SHORT_STRING_SIZE    256
    
    typedef struct AccessibleContextInfoTag {
      wchar_ name[MAX_STRING_SIZE];        // the AccessibleName of the object
      wchar_ description[MAX_STRING_SIZE]; // the AccessibleDescription of the object
      wchar_ role[SHORT_STRING_SIZE];      // localized AccesibleRole string
      wchar_ states[SHORT_STRING_SIZE];    // localized AccesibleStateSet string
                                           //   (comma separated)
      jint indexInParent                   // index of object in parent
      jint childrenCount                   // # of children, if any
      jint x;                              // screen x-axis co-ordinate in pixels
      jint y;                              // screen y-axis co-ordinate in pixels
      jint width;                          // pixel width of object
      jint height;                         // pixel height of object
      BOOL accessibleComponent;            // flags for various additional
      BOOL accessibleAction;               // Java Accessibility interfaces
      BOOL accessibleSelection;            // FALSE if this object doesn't
      BOOL accessibleText;                 // implement the additional interface
      BOOL accessibleInterfaces;           // new bitfield containing additional
                                           //   interface flags
    } AccessibleContextInfo;
     
    typedef struct AccessibleTextInfoTag {
      jint charCount;       // # of characters in this text object
      jint caretIndex;      // index of caret
      jint indexAtPoint;    // index at the passsed in point
    } AccessibleTextInfo;
    
    typedef struct AccessibleTextItemsInfoTag {
      wchar_t letter;
      wchar_t word[SHORT_STRING_SIZE];
      wchar_t sentence[MAX_STRING_SIZE];
    } AccessibleTextItemsInfo;
     
    typedef struct AccessibleTextSelectionInfoTag {
      jint selectionStartIndex;
      jint selectionEndIndex;
      wchar_t selectedText[MAX_STRING_SIZE];
    } AccessibleTextSelectionInfo;
     
    typedef struct AccessibleTextRectInfoTag  {
      jint x;          // bounding rectangle of char at index, x-axis co-ordinate
      jint y;          // y-axis co-ordinate
      jint width;      // bounding rectangle width
      jint height;     // bounding rectangle height
    } AccessibleTextRectInfo;
     
    typedef struct AccessibleTextAttributesInfoTag {
      BOOL bold;
      BOOL italic;
      BOOL underline;
      BOOL strikethrough;
      BOOL superscript;
      BOOL subscript;
      wchar_t backgroundColor[SHORT_STRING_SIZE];
      wchar_t foregroundColor[SHORT_STRING_SIZE];
      wchar_t fontFamily[SHORT_STRING_SIZE];
      jint fontSize;
      jint alignment;
      jint bidiLevel;
      jfloat firstLineIndent;
      jfloat leftIndent;
      jfloat rightIndent;
      jfloat lineSpacing;
      jfloat spaceAbove;
      jfloat spaceBelow;
      wchar_t fullAttributesString[MAX_STRING_SIZE];
    } AccessibleTextAttributesInfo;
    
    typedef struct AccessibleTableInfoTag  {
      JOBJECT64 caption;  // AccesibleContext
      JOBJECT64 summary;  // AccessibleContext
      jint rowCount;
      jint columnCount;
      JOBJECT64 accessibleContext;
      JOBJECT64 accessibleTable;
    } AccessibleTableInfo;
    
    typedef struct AccessibleTableCellInfoTag  {
      JOBJECT64  accessibleContext;
      jint       index;
      jint       row;
      jint       column;
      jint       rowExtent;
      jint       columnExtent;
      jboolean   isSelected;
    } AccessibleTableCellInfo;
    
    typedef struct AccessibleRelationSetInfoTag {
      jint relationCount;
      AccessibleRelationInfo relations[MAX_RELATIONS];
    } AccessibleRelationSetInfo;
    
    typedef struct AccessibleRelationInfoTag {
      wchar_t key[SHORT_STRING_SIZE];
      jint targetCount;
      JOBJECT64 targets[MAX_RELATION_TARGETS];  // AccessibleContexts
    } AccessibleRelationInfo;
    
    
    typedef struct AccessibleHypertextInfoTag {
      jint linkCount;                                 // number of hyperlinks
      AccessibleHyperlinkInfo links[MAX_HYPERLINKS];  // the hyperlinks
      JOBJECT64 accessibleHypertext;                  // AccessibleHypertext object
    } AccessibleHypertextInfo;
    
    typedef struct AccessibleHyperlinkInfoTag {
      wchar_t text[SHORT_STRING_SIZE]; // the hyperlink text
      jint startIndex;                 // index in the hypertext document where the link begins
      jint endIndex;                   // index in the hypertext document where the link ends
      JOBJECT64 accessibleHyperlink;   // AccessibleHyperlink object
    } AccessibleHyperlinkInfo;
    
    typedef struct AccessibleKeyBindingsTag {
      int keyBindingsCount; // number of key bindings
      AccessibleKeyBindingInfo keyBindingInfo[MAX_KEY_BINDINGS];
    } AccessibleKeyBindings;
    
    typedef struct AccessibleKeyBindingInfoTag {
      jchar character; // the key character
      jint modifiers;  // the key modifiers
    } AccessibleKeyBindingInfo;
    
    typedef struct  AccessibleIconsTag {
      jint iconsCount;                            // number of icons
      AccessibleIconInfo iconInfo[MAX_ICON_INFO]; // the icons
    } AccessibleIcons;
    
    typedef struct AccessibleIconInfoTag {
      wchar_t description[SHORT_STRING_SIZE]; // icon description
      jint height;                            // icon height
      jint width;                             // icon width
    } AccessibleIconInfo;
    
    typedef struct AccessibleActionsTag {
      jint actionsCount;                                // number of actions
      AccessibleActionInfo actionInfo[MAX_ACTION_INFO]; // the action information
    } AccessibleActions;
    
    typedef struct AccessibleActionInfoTag {
      wchar_t name[SHORT_STRING_SIZE]; // action name
    } AccessibleActionInfo;
    
    typedef struct AccessibleActionsToDoTag {
      jint actionsCount;                               // number of actions to do
      AccessibleActionInfo actions[MAX_ACTIONS_TO_DO]; // the accessible actions to do
    } AccessibleActionsToDo;
    
    typedef struct VisibleChildenInfoTag {
      int returnedChildrenCount;                        // number of children returned
      AccessibleContext children[MAX_VISIBLE_CHILDREN]; // the visible children
    } VisibleChildenInfo;
    
```

### Callbacks da API Java Access Bridge

Os callbacks da API Java Access Bridge estão contidos no arquivo `AccessBridgeCallbacks.h`. Suas funções de manipulação de eventos devem corresponder a esses protótipos.

Você deve chamar a função `ReleaseJavaObject` em cada `JOBJECT64` retornado através desses manipuladores de eventos assim que terminar de usá-los para evitar memory leaks na JVM.

Se você estiver usando APIs legadas, defina `ACCESSBRIDGE_ARCH_LEGACY`.

`JOBJECT64` é definido como `jlong` em sistemas de 64 bits e `jobject` em versões legadas do Java Access Bridge. Para definições, consulte a seção `ACCESSBRIDGE_ARCH_LEGACY` no arquivo de cabeçalho `AccessBridgePackages.h`.

  *
`typedef void (*AccessBridge_FocusGainedFP) (long vmID, JOBJECT64 event, JOBJECT64 source);
```

  *
`typedef void (*AccessBridge_FocusLostFP) (long vmID, JOBJECT64 event, JOBJECT64 source);
```

  *
`typedef void (*AccessBridge_CaretUpdateFP) (long vmID, JOBJECT64 event, JOBJECT64 source);
```

  *
`typedef void (*AccessBridge_MouseClickedFP) (long vmID, JOBJECT64 event, JOBJECT64 source);
```

  *
`typedef void (*AccessBridge_MouseEnteredFP) (long vmID, JOBJECT64 event, JOBJECT64 source);
```
```c
typedef void (*AccessBridge_MouseExitedFP) (long vmID, JOBJECT64
        event, JOBJECT64 source);
```

  * 
```c
typedef void (*AccessBridge_MousePressedFP)
        (long vmID, JOBJECT64 event, JOBJECT64 source);
```

  * 
```c
typedef
        void (*AccessBridge_MouseReleasedFP) (long vmID, JOBJECT64 event,
        JOBJECT64 source);
```

  * 
```c
typedef void (*AccessBridge_MenuCanceledFP)
        (long vmID, JOBJECT64 event, JOBJECT64 source);
```

  * 
```c
typedef
        void (*AccessBridge_MenuDeselectedFP) (long vmID, JOBJECT64 event,
        JOBJECT64 source);
```

  * 
```c
typedef void (*AccessBridge_MenuSelectedFP)
        (long vmID, JOBJECT64 event, JOBJECT64 source);
```

  * 
```c
typedef
        void (*AccessBridge_PopupMenuCanceledFP) (long vmID JOBJECT64 event,
        JOBJECT64 source);
```

  * 
```c
typedef void (*AccessBridge_PopupMenuWillBecomeInvisibleFP)
        (long vmID, JOBJECT64 event, JOBJECT64 source);
```

  * 
```c
typedef
        void (*AccessBridge_PopupMenuWillBecomeVisibleFP) (long vmID, JOBJECT64
        event, JOBJECT64 source);
```

  * 
```c
typedef void (*AccessBridge_PropertyNameChangeFP)
        (long vmID, JOBJECT64 event, JOBJECT64 source, wchar_t *oldName, wchar_t
        *newName);
```

  * 
```c
typedef void (*AccessBridge_PropertyDescriptionChangeFP)
        (long vmID, JOBJECT64 event, JOBJECT64 source, wchar_t *oldDescription,
        wchar_t *newDescription);
```

  * 
```c
typedef void (*AccessBridge_PropertyStateChangeFP)
        (long vmID, JOBJECT64 event, JOBJECT64 source, wchar_t *oldState,
        wchar_t *newState);
```

  * 
```c
typedef void (*AccessBridge_PropertyValueChangeFP)
        (long vmID, JOBJECT64 event, JOBJECT64 source, wchar_t *oldValue,
        wchar_t *newValue);
```

  * 
```c
typedef void (*AccessBridge_PropertySelectionChangeFP)
        (long vmID, JOBJECT64 event, JOBJECT64 source);
```

  * 
```c
typedef
        void (*AccessBridge_PropertyTextChangeFP) (long vmID, JOBJECT64 event,
        JOBJECT64 source);
```

  * 
```c
typedef void (*AccessBridge_PropertyCaretChangeFP)
        (long vmID, JOBJECT64 event, JOBJECT64 source, int oldPosition, int
        newPosition);
```

  * 
```c
typedef void (*AccessBridge_PropertyVisibleDataChangeFP)
        (long vmID, JOBJECT64 event, JOBJECT64 source);
```

  * 
```c
typedef
        void (*AccessBridge_PropertyChildChangeFP) (long vmID, JOBJECT64 event,
        JOBJECT64 source, JOBJECT64 oldChild, JOBJECT64 newChild);
```

  * 
```c
typedef void (*AccessBridge_PropertyActiveDescendentChangeFP)
        (long vmID, JOBJECT64 event, JOBJECT64 source, JOBJECT64 oldActiveDescendent,
        JOBJECT64 newActiveDescendent);
```

### Solução de Problemas do Java Access Bridge

Este tópico descreve problemas conhecidos e dicas de uso para aqueles que desenvolvem aplicativos de Tecnologia Assistiva para o Java Access Bridge.

Problemas Conhecidos

Registrar Eventos de Menu Novamente Gera Cópias Duplicadas: Se você registrar um evento de menu, desregistrá-lo e depois registrá-lo novamente, o Java Access Bridge gerará cópias duplicadas do evento de menu.

Eventos `MenuDeselected` Gerados Quando o Menu é Fechado: Você não está recebendo eventos MenuCanceled (ou PopupMenuCanceled). Para determinar que um menu foi fechado, procure por eventos MenuDeselected.

Dicas de Uso

Determinando Alterações na Seleção de Itens de Menu: Use eventos State `PropertyChange` para determinar alterações na seleção de itens de menu (por exemplo, quando o usuário usa os botões de seta ou teclas para subir ou descer dentro de um menu).

Rastreando Valores de Elementos da GUI: Use o suporte `AccessibleValue` e eventos Value `PropertyChange` para rastrear os valores de elementos da GUI como sliders e barras de rolagem.

Determinando Itens Selecionados: Use o suporte `AccessibleSelection` para determinar quais itens estão selecionados em contêineres que contêm itens como listas e tabelas. Isso é mais eficiente do que enumerar todos os filhos e examinar seu atributo `StateSet` para ver se o valor Selected está entre eles.

Ferramentas de Teste do Java Access Bridge: As ferramentas de teste do Java Access Bridge `jaccessinspector` e `jaccesswalker` estão localizadas no diretório `bin` do Java.