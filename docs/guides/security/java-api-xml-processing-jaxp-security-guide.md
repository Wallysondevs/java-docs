# Guia de Segurança da Java API para Processamento XML (JAXP)

## 12 Guia de Segurança da Java API para Processamento XML (JAXP)

O JDK e as APIs Java XML foram aprimorados ao longo dos anos com várias medidas e ferramentas que podem ajudar a prevenir que aplicações sejam exploradas por ataques relacionados a XML. Este guia mostra como usar os recursos de processamento seguro da Java API para Processamento XML (JAXP) para proteger suas aplicações e sistemas.

Consulte o [resumo do módulo java.xml](<https://docs.oracle.com/en/java/javase/25/docs/api/java.xml/module-summary.html>) para mais informações.

### Problemas de Segurança no Processamento XML

O processamento XML pode expor aplicações a certas vulnerabilidades. Entre os ataques mais proeminentes e conhecidos estão o ataque de injeção de Entidade Externa XML (XXE) e o ataque de expansão exponencial de entidade, também conhecido como XML bomb ou billion laughs attack. Esses ataques podem potencialmente causar sérios danos a um sistema, negando seus serviços ou, pior, levando à perda de dados sensíveis.

Você deve avaliar os requisitos de suas aplicações e o ambiente operacional para determinar o nível de ameaça potencial, por exemplo, se ou em que medida as aplicações estão expostas a fontes XML não confiáveis.

#### Ataque de Injeção de Entidade Externa XML

Os padrões XML, XML Schema e XSLT definem uma série de estruturas que permitem a incorporação de conteúdo externo em documentos XML através de identificadores de sistema que referenciam recursos externos. Em geral, os processadores XML resolvem e recuperam quase todos esses recursos externos; consulte [Recursos Externos Suportados pelos Padrões XML, Schema e XSLT](<#/doc/guides/security/java-api-xml-processing-jaxp-security-guide>) para uma lista de construções que suportam a inclusão de recursos externos. Além disso, algumas construções permitem a execução de aplicações através de funções externas. Ataques de injeção de Entidade Externa XML (XXE) exploram processadores XML que não foram protegidos pela restrição dos recursos externos que podem resolver, recuperar ou executar. Isso pode resultar na divulgação de dados sensíveis, como senhas, ou na habilitação da execução arbitrária de código.

##### Recursos Externos Suportados pelos Padrões XML, Schema e XSLT

Os padrões XML, Schema e XSLT suportam as seguintes construções que exigem recursos externos. O comportamento padrão dos processadores XML do JDK é fazer uma conexão e buscar os recursos externos conforme especificado.

  * DTD Externo: referencia uma Document Type Definition (DTD) externa, por exemplo:
` <!DOCTYPE root_element SYSTEM "url">
```

  * Referência de Entidade Externa: Refere-se a dados externos, a sintaxe é a seguinte:
` <!ENTITY name SYSTEM "url">
```

  * Referência de entidade geral, por exemplo:
` <?xml version="1.0" standalone="no" ?>
        <!DOCTYPE doc [<!ENTITY otherFile SYSTEM "otherFile.xml">]>
        <doc>
            <a>
                <b>&otherFile;</b>
            </a>
        </doc>
```

  * Entidades de Parâmetro Externas: A sintaxe é a seguinte:
` <!ENTITY % name SYSTEM uri>
```

O seguinte é um exemplo:
` <?xml version="1.0" standalone="no"?>
            <!DOCTYPE doc [
              <!ENTITY % ent1 SYSTEM "http://www.example.com/student.dtd">
              %ent1;
            ]>
```

  * XInclude: Inclui um infoset externo em um documento XML, por exemplo:
`<Book xmlns:xi="http://www.w3.org/2001/XInclude">
            <xi:include href=toc.xml"/>
            <xi:include href=part1.xml"/>
            <xi:include href=part2.xml"/>
            <xi:include href=index.xml"/>
        </Book>
```

  * Referências a componentes de XML Schema usando o atributo `schemaLocation` e os elementos `import` e `include`, por exemplo:
` <xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
            <xs:include schemaLocation="http://www.example.com/schema/schema1.xsd"/>
            <!-- ... -->
        </xs:schema>
```

  * Combinando folhas de estilo usando elementos import ou include, a sintaxe é a seguinte:
`<xsl:include href="include.xsl"/>
```

  * Instrução de processamento `xml-stylesheet`: Usada para incluir uma folha de estilo em um documento XML, por exemplo:
`<?xml-stylesheet href="include.xsl" type="text/xsl"?>
```

  * Função XSLT `document()`: Usada para acessar nós em um documento XML externo, por exemplo:
`<xsl:variable name="dummy" select="document('DocumentFunc2.xml')"/>
```

#### Ataque de Expansão Exponencial de Entidade

O ataque de expansão exponencial de entidade, também conhecido como XML bomb ou billion laughs attack, é um ataque de negação de serviço que envolve parsers XML. O exploit básico consiste em ter várias camadas de entidades aninhadas, cada uma referenciando um número de entidades da próxima camada. O seguinte é um exemplo de documento SOAP que contém referências de entidade profundamente aninhadas:
```
    <?xml version="1.0" encoding ="UTF-8"?>
    <!DOCTYPE bbb[
        <!ENTITY x100 "bbb">
        <!ENTITY  x99 "&x100;&x100;">
        <!ENTITY  x98 "&x99;&x99;">
        ...
        <!ENTITY   x2 "&x3;&x3;">
        <!ENTITY   x1 "&x2;&x2;">
    ]>
    <SOAP-ENV:Envelope xmlns:SOAP-ENV=...>
        <SOAP-ENV:Body>
            <ns1:aaa xmlns:ns1="urn:aaa" SOAP-ENV:encodingStyle="...">
                <foobar xsi:type="xsd:string">&x1;</foobar>
            </ns1:aaa>
        </SOAP-ENV:Body>
    </SOAP-ENV:Envelope>
```

Quando um parser XML encontra um documento como este, ele tentará resolver a declaração da entidade expandindo as referências. Como as referências são aninhadas, a expansão se torna exponencial pelo número de entidades que cada uma referencia. Tal processo pode levar o parser XML a consumir 100% do tempo da CPU e uma grande quantidade de memória, e eventualmente o sistema fica sem memória.

### Configurando JAXP para Processamento XML Seguro

JAXP consiste em um conjunto de APIs para analisar (parsing), serializar, transformar, consultar e percorrer documentos XML. Consulte [APIs JAXP](<#/doc/guides/security/java-api-xml-processing-jaxp-security-guide>).

JAXP adiciona uma camada de segurança através de factories e processors. Você acessa as APIs do JAXP através de factories, que garantem que elas sejam configuradas de acordo com as propriedades JAXP que você definiu com base em seus requisitos de segurança. Você configura e instancia factories com seus respectivos processors. Consulte [Factories e Processors](<#/doc/guides/security/java-api-xml-processing-jaxp-security-guide>).

Você configura os processors JAXP através das propriedades JAXP. Você pode definir as propriedades JAXP através de factories JAXP, como System properties, ou em um arquivo de configuração JAXP. Consulte [Configurando com Propriedades JAXP](<#/doc/guides/security/java-api-xml-processing-jaxp-security-guide>).

A seção [Propriedades Relacionadas à Segurança](<#/doc/guides/security/java-api-xml-processing-jaxp-security-guide>) descreve as propriedades que você pode definir para configurar o JAXP para processamento XML seguro.

A seção [Processors Compostos](<#/doc/guides/security/java-api-xml-processing-jaxp-security-guide>) descreve como habilitar FEATURE_SECURE_PROCESSING (FSP) para um processor composto, como um validador ou transformador, também habilita o FSP para qualquer parser interno que o processor composto utilize.

Além disso, o JAXP permite registrar resolvers e catalogs personalizados, que interceptam referências a recursos externos e os resolvem com recursos locais. Isso elimina a necessidade de ler e acessar recursos externos, o que ajuda a remover uma fonte de risco potencial. Consulte [Usando Resolvers e Catalogs](<#/doc/guides/security/java-api-xml-processing-jaxp-security-guide>).

#### Melhores Práticas de Processamento XML Seguro

O JDK suporta JAXP FEATURE_SECURE_PROCESSING (FSP) (consulte [A Diretiva de Segurança FEATURE_SECURE_PROCESSING](<#/doc/guides/security/java-api-xml-processing-jaxp-security-guide>)), que habilita uma base de processamento XML seguro impondo restrições chave através de várias features e propriedades (consulte [Configurando com Propriedades JAXP](<#/doc/guides/security/java-api-xml-processing-jaxp-security-guide>)). Quando o FSP é habilitado em factories XML por padrão ou por configurações explícitas, o JDK aplica valores restritivos às propriedades de segurança relevantes. Você também pode definir essas propriedades diretamente através de chamadas de API ou system properties. Você também pode gerenciá-las centralmente no JAXP Configuration File (JCF) (consulte [Definindo Propriedades JAXP em um Arquivo de Configuração JAXP](<#/doc/guides/security/java-api-xml-processing-jaxp-security-guide>)).

Configurações de Segurança Chave

  * FEATURE_SECURE_PROCESSING (FSP)

A segurança de suas aplicações XML começa com a habilitação da diretiva FSP em factories XML (como DOM, SAX, validação, transformação e XPath). Consulte [A Diretiva de Segurança FEATURE_SECURE_PROCESSING](<#/doc/guides/security/java-api-xml-processing-jaxp-security-guide>). Embora o JDK aplique a maioria dos padrões seguros, ele não restringe as conexões externas por padrão, portanto, uma configuração explícita é necessária. O código a seguir, por exemplo, define FSP em uma factory DOM:
`DocumentBuilderFactory factory = DocumentBuilderFactory.newDefaultNSInstance();
        factory.setFeature(XMLConstants.FEATURE_SECURE_PROCESSING, true);
```

A configuração explícita de FSP impõe limites de recursos (consulte Propriedades JAXP para Limites de Processamento), desabilita a resolução de entidades externas (consulte Propriedades de Acesso Externo, juntamente com suas System properties correspondentes, permitem que você regule as conexões externas.")), impede o uso de overrides de parsers de terceiros (consulte Propriedade JAXP para Parsers de Terceiros), e restringe as funções de extensão XSLT (consulte Propriedade JAXP para Funções de Extensão).

  * Arquivo de Configuração JAXP (JCF)

Você pode definir propriedades JAXP relacionadas à segurança (consulte Configurando com Propriedades JAXP) programaticamente, através de system properties, ou usando o JAXP Configuration File (JCF) (consulte Definindo Propriedades JAXP em um Arquivo de Configuração JAXP). O uso do JCF oferece um meio conveniente e sem código de gerenciar as configurações de segurança em todas as instâncias de processor XML na JVM.

  * Restrições de Acesso Externo

Prevenir o acesso externo arbitrário é essencial para a segurança XML. Isso pode ser alcançado definindo FSP em factories XML ou, onde um controle mais granular é necessário, configurando as External Access Properties (EAP) (consulte Propriedades de Acesso Externo, juntamente com suas System properties correspondentes, permitem que você regule as conexões externas.")) ou a propriedade de resolução do catalog embutido `jdk.xml.jdkcatalog.resolve` (consulte O Catalog Embutido:")). Observe que para o processor StAX (consulte o pacote javax.xml.stream), o FSP não é suportado, portanto, as configurações de EAP ou resolve devem ser usadas.

  * Resolvers e Catalogs

Restringir todo o acesso externo pode ser muito limitante para algumas aplicações. Para lidar com recursos externos de forma segura, implemente resolvers ou catalogs (consulte Usando Resolvers e Catalogs). Esses mecanismos permitem um controle granular sobre como as referências externas são resolvidas, ao mesmo tempo em que bloqueiam conexões indesejadas.

Nota:

Embora o FSP seja habilitado por padrão no JDK, a configuração padrão não restringe a resolução de entidades externas. Para uma segurança abrangente, defina explicitamente o FSP através da API e configure as restrições de acesso externo conforme necessário.

#### APIs JAXP

JAXP consiste em um conjunto de APIs construídas sobre tecnologias e padrões XML que são essenciais para o processamento XML. Estas incluem APIs para o seguinte:

  * Parsing: JAXP Parsing API (pacote javax.xml.parsers, que é baseada no Document Object Model (DOM) (pacote org.w3c.dom) e Simple API for XML Parsing (SAX) (pacote org.xml.sax)
  * Streaming API for XML (StAX) (pacote javax.xml.stream)
  * Serialização: StAX e Extensible Stylesheet Language Transformations (XSLT) (pacote javax.xml.transform)
  * Transformação: JAXP Transformation API (pacote javax.xml.transform) e XSLT (Extensible Stylesheet Language Transformations)
  * Consulta e travessia de documentos XML: XML Path Language (XPath) API (pacote javax.xml.xpath)
  * Resolução de recursos externos: XML Catalog API (pacote javax.xml.catalog)

#### Factories e Processors

Factories são os pontos de entrada de cada API JAXP. Elas fornecem métodos que permitem que as aplicações definam propriedades JAXP programaticamente antes de criar processors. Factories também suportam o mecanismo de lookup JAXP, que permite implantar aplicações com implementações de terceiros em vez de implementações do JDK.

Processors são agregados de parsers (ou readers), serializers (ou writers), validators e transformers que controlam e executam o processamento em suas respectivas áreas. Factories configuram e instanciam suas factories correspondentes. Por exemplo, você configura e instancia os processors DocumentBuilder e SAXParser com as factories DocumentBuilderFactory e SAXParserFactory, respectivamente.

#### Configurando com Propriedades JAXP

Você configura os processors JAXP através das propriedades JAXP. A seguir, são listadas as maneiras pelas quais você pode definir as propriedades JAXP em ordem de precedência, da mais alta para a mais baixa. Por exemplo, se você definir o valor de uma propriedade JAXP através de uma factory, ela substituirá qualquer outro valor definido de outra forma.

  * Definindo Propriedades JAXP Através de Factories JAXP: Você pode definir uma propriedade JAXP através de uma factory JAXP em seu código.
  * Definindo Propriedades JAXP como System Properties: Você pode definir uma propriedade JAXP como uma System property definindo seu valor na linha de comando com a seguinte sintaxe:
`-D<property name>=<property value>
```

Você também pode definir o valor de uma System property com o método System.setProperty(String key, String name) ou System.setProperties(Properties).

  * [Definindo Propriedades JAXP em um Arquivo de Configuração JAXP](<#/doc/guides/security/java-api-xml-processing-jaxp-security-guide>): Você pode definir uma propriedade JAXP em um arquivo de configuração JAXP definido pelo usuário ou no arquivo de configuração JAXP padrão, `<java-home>/conf/jaxp.properties`.

Nem todas as propriedades JAXP podem ser definidas por todas essas maneiras. Consulte o [resumo do módulo java.xml](<https://docs.oracle.com/en/java/javase/25/docs/api/java.xml/module-summary.html>) para determinar qual método você pode usar para definir uma propriedade JAXP específica.

Se você não definiu uma propriedade JAXP específica de uma dessas maneiras, então o Java runtime usa o valor especificado no arquivo de propriedades JAXP padrão. Se uma propriedade não existe neste arquivo, então o Java runtime usa seu valor padrão. No entanto, se FEATURE_SECURE_PROCESSING (FSP) estiver ativado, então o Java runtime usa um valor mais restritivo, se aplicável. Consulte a tabela [Propriedades Específicas da Implementação](<https://docs.oracle.com/en/java/javase/25/docs/api/java.xml/module-summary.html#Properties>) no resumo do módulo java.xml para mais informações.

Consulte o arquivo de configuração JAXP padrão `<java-home>/conf/jaxp.properties` para obter informações sobre propriedades JAXP adicionais.

##### Definindo Propriedades JAXP Através de Factories JAXP

Se você pode modificar o código da sua aplicação, ou está criando uma nova aplicação, então você pode definir propriedades JAXP através de factories JAXP ou de um parser. Defina essas propriedades através das seguintes interfaces:
```
    DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
    dbf.setAttribute(name, value);
     
    SAXParserFactory spf = SAXParserFactory.newInstance();
    SAXParser parser = spf.newSAXParser();
    parser.setProperty(name, value);
    
    SchemaFactory schemaFactory = SchemaFactory.newInstance(schemaLanguage);
    schemaFactory.setProperty(name, value);
     
    TransformerFactory factory = TransformerFactory.newInstance();
    factory.setAttribute(name, value);
     
    XMLInputFactory xif = XMLInputFactory.newInstance();
    xif.setProperty(name, value);
    
    XPathFactory xf = XPathFactory.newInstance();
    xf.setProperty(name, value);
```

O seguinte é um exemplo de definição de limites de processamento:
```
    dbf.setAttribute("jdk.xml.entityExpansionLimit", "2000");
    dbf.setAttribute("jdk.xml.totalEntitySizeLimit", "100000");
    dbf.setAttribute("jdk.xml.maxParameterEntitySizeLimit", "10000"); 
    dbf.setAttribute("jdk.xml.maxElementDepth", "100");
    
    factory.setAttribute("jdk.xml.xpathTotalOpLimit", "1000"); 
    xf.setProperty("jdk.xml.xpathExprGrpLimit", "20");  
```

O seguinte é um exemplo de como limitar um parser DOM a apenas conexões locais para DTDs externos:
```
    dbf.setAttribute(XMLConstants.ACCESS_EXTERNAL_DTD, "file, jar:file");
```

Se um módulo de parser dentro da aplicação lida com fontes não confiáveis, ele pode restringir ainda mais o acesso. O código a seguir substitui as configurações no arquivo de configuração JAXP e as especificadas pelas System properties, e permite que o processor XML leia apenas arquivos locais:
```
    DocumentBuilderFactory dbf =
    DocumentBuilderFactory.newInstance();   
    dbf.setAttribute(XMLConstants.ACCESS_EXTERNAL_DTD, "file");
    // ...   
    SchemaFactory schemaFactory = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);   
    schemaFactory.setProperty(XMLConstants.ACCESS_EXTERNAL_DTD, "file");   
    schemaFactory.setProperty(XMLConstants.ACCESS_EXTERNAL_SCHEMA, "file");
```

Conforme descrito em [Escopo e Ordem de Definição de Propriedades JAXP](<#/doc/guides/security/java-api-xml-processing-jaxp-security-guide>), as propriedades JAXP especificadas através de factories JAXP têm o escopo mais restrito, afetando apenas os processors criados pelas factories, e, portanto, substituem quaisquer configurações padrão, System properties e aquelas no arquivo de configuração JAXP. Ao definir propriedades JAXP através de factories JAXP, você pode garantir que suas aplicações se comportem da mesma forma, independentemente da versão do JDK que você está usando ou se as propriedades JAXP são definidas por outros meios.

##### Definindo Propriedades JAXP como System Properties

System properties podem ser úteis se você não pode modificar o código da sua aplicação.

Para definir propriedades JAXP para uma invocação completa do JDK, defina suas System properties correspondentes na linha de comando. Por exemplo, se sua aplicação, `MyApp` requer acesso a DTDs e schemas externos, então defina as System properties `javax.xml.accessExternalDTD` e `javax.xml.accessExternalSchema` da seguinte forma:

`java -Djavax.xml.accessExternalDTD="file,http" -Djavax.xml.accessExternalSchema="file, http" MyApp`

Para definir propriedades JAXP para apenas uma parte da aplicação, defina suas System properties correspondentes antes dessa parte e, em seguida, limpe-as. Por exemplo, se sua aplicação requer acesso a DTDs e schemas externos, adicione estas linhas ao bloco de código de inicialização da sua aplicação:
```
    System.setProperty("javax.xml.accessExternalDTD", "file, http");
    System.setProperty("javax.xml.accessExternalSchema", "file, http");
```

Então, uma vez que sua aplicação termine de processar documentos XML ou antes de sair, limpe as propriedades da seguinte forma:
```
    System.clearProperty("javax.xml.accessExternalDTD");   
    System.clearProperty("javax.xml.accessExternalSchema");
```

Nota:

As propriedades JAXP relacionadas aos limites de processamento são específicas da implementação do JDK, enquanto aquelas relacionadas às propriedades de acesso externo (EAPs; consulte [External Access Properties](<https://docs.oracle.com/en/java/javase/25/docs/api/java.xml/javax/xml/XMLConstants.html#EAP>) na documentação da API JavaDoc para [XMLConstants](<https://docs.oracle.com/en/java/javase/25/docs/api/java.xml/javax/xml/XMLConstants.html>)) são propriedades padrão.

##### Definindo Propriedades JAXP em um Arquivo de Configuração JAXP

Você pode definir propriedades JAXP em um arquivo de configuração JAXP, que é um arquivo [java.util.Properties](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/Properties.html>). (Consulte [Properties](<https://docs.oracle.com/javase/tutorial/essential/environment/properties.html>) nos Tutoriais Java para mais informações sobre propriedades Java.)

Tópicos

  * [Formato de um Arquivo de Configuração JAXP](<#/doc/guides/security/java-api-xml-processing-jaxp-security-guide>)
  * [Especificando um Arquivo de Configuração JAXP Definido pelo Usuário](<#/doc/guides/security/java-api-xml-processing-jaxp-security-guide>)
  * [Arquivo de Configuração JAXP Padrão](<#/doc/guides/security/java-api-xml-processing-jaxp-security-guide>)
  * [Template de Configuração JAXP com Configurações Estritas](<#/doc/guides/security/java-api-xml-processing-jaxp-security-guide>)

###### Formato de um Arquivo de Configuração JAXP

Um arquivo de configuração JAXP é um arquivo de texto que contém nomes e valores de propriedades JAXP, um par nome-valor em cada linha. Por exemplo, o seguinte arquivo de configuração JAXP define a propriedade de limite de processamento `maxGeneralEntitySizeLimit` para 2000 e restringe o acesso aos protocolos de arquivo e HTTP para referências externas definidas pela instrução de processamento `stylesheet`, função `document` e os elementos `import` e `include`.
```
    jdk.xml.maxGeneralEntitySizeLimit=2000
    javax.xml.accessExternalStylesheet=file, http
```

Se você não deseja permitir nenhuma conexão externa por processors XML, você pode definir todas as restrições de acesso externo para `file` apenas:
```
    javax.xml.accessExternalDTD=file
    javax.xml.accessExternalSchema=file
    javax.xml.accessExternalStylesheet=file
```

Se você deseja evitar que as aplicações leiam acidentalmente arquivos externos através de um processor XML, defina as propriedades de acesso externo (EAPs) como no seguinte arquivo de configuração JAXP:
```
    javax.xml.accessExternalDTD=""   
    javax.xml.accessExternalSchema=""   
    javax.xml.accessExternalStylesheet=""
```

Dica:

Se você pode especificar uma propriedade JAXP como uma System property, então você pode especificar a mesma propriedade JAXP em um arquivo de configuração JAXP. Consulte o [resumo do módulo java.xml](<https://docs.oracle.com/en/java/javase/25/docs/api/java.xml/module-summary.html>) para determinar onde definir o valor de uma propriedade JAXP específica.

###### Especificando um Arquivo de Configuração JAXP Definido pelo Usuário

Para usar seu próprio arquivo de configuração JAXP, especifique seu nome e localização com a System property `java.xml.config.file`. Se você especificar um caminho de arquivo que não seja absoluto, ele será relativo ao diretório de trabalho atual. Se o valor desta System property não tiver sido especificado quando uma factory JAXP for instanciada, nenhuma outra tentativa será feita para verificar seu valor.

Um arquivo de configuração JAXP definido pelo usuário é lido apenas uma vez quando a implementação JAXP é inicializada. Isso significa que ele não funcionará se você o modificar depois que uma factory JAXP tiver sido instanciada.

###### Arquivo de Configuração JAXP Padrão

O JDK contém um arquivo de configuração JAXP padrão `<java_home>/conf/jaxp.properties`. No entanto, é recomendado que você crie seu próprio arquivo de configuração JAXP definido pelo usuário.

Se você especificou um arquivo de configuração JAXP definido pelo usuário com a System property `java.xml.config.file` e esse arquivo existe, então quaisquer configurações nele substituem as do arquivo de configuração JAXP padrão.

###### Template de Configuração JAXP com Configurações Estritas

O template de configuração JAXP pode ajudar você a validar se suas aplicações estão preparadas para futuras versões do JDK. Você pode usar o template, que especifica configurações de processamento XML mais restritivas, para identificar problemas como um processor fazendo conexões de rede de saída sem saber para buscar DTDs ou um processor XML que depende de funções de extensão.

Siga estes passos para testar a prontidão da sua aplicação com o template de configuração JAXP:

  1. Copie o template de configuração JAXP, `<java_home>/conf/jaxp-strict.properties.template`, para um novo arquivo com a extensão `.properties`. Por exemplo, o comando a seguir copia o template para um arquivo chamado `/path/to/jaxp-strict.properties`:

`cp <java_home>/conf/jaxp-strict.properties.template /path/to/jaxp-strict.properties`

  2. Execute sua aplicação, especificando a propriedade de sistema `java.xml.config.file` com o caminho onde você copiou o template do arquivo de configuração JAXP para sobrescrever a configuração padrão. Por exemplo:

`java -Djava.xml.config.file=/path/to/jaxp-strict.properties myApp`

Se você decidir que suas aplicações estão prontas para uma configuração mais segura, então você pode usar o template de configuração como seu arquivo de configuração JAXP.

Consulte a seção [Configuration File](<#/>) na documentação da API JavaDoc do módulo java.xml para mais informações.

##### Escopo e Ordem de Definição das Propriedades JAXP

As propriedades JAXP podem ser definidas de várias maneiras, incluindo através de métodos de API, em propriedades de sistema e em um arquivo de configuração JAXP. Quando não definidas explicitamente, elas serão inicializadas com valores padrão ou valores mais restritivos quando `FEATURE_SECURE_PROCESSING` (FSP) estiver habilitado. A ordem de precedência para as propriedades é a seguinte, da mais alta para a mais baixa:

  * As APIs para factories ou processadores
  * Propriedades de sistema
  * Arquivo de configuração JAXP definido pelo usuário
  * O arquivo de configuração JAXP padrão, `<java_home>/conf/jaxp.properties`
  * Os valores padrão para as propriedades JAXP; se FSP for true, então os valores padrão serão definidos para processar XML de forma segura

Usando a propriedade RESOLVE da classe CatalogFeatures como exemplo, o seguinte ilustra como essas regras são aplicadas:

  * Propriedades especificadas através de APIs de factory ou processador têm a maior precedência. O código a seguir define efetivamente a propriedade RESOLVE como `strict` independentemente das configurações em quaisquer outras fontes de configuração.
` DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
        dbf.setAttribute(CatalogFeatures.Feature.RESOLVE.getPropertyName(), "strict");
```

  * Se a propriedade não for definida pela factory como no exemplo anterior, uma configuração de propriedade de sistema estará em vigor. O exemplo de linha de comando a seguir define a propriedade RESOLVE como `continue` para a aplicação `myApp`:
` java -Djavax.xml.catalog.resolve=continue myApp
```

  * Se a propriedade não for definida pela factory ou em uma propriedade de sistema, a configuração em um arquivo de configuração terá efeito. A entrada a seguir define a propriedade RESOLVE como `continue`.
` javax.xml.catalog.resolve=continue
```

  * Se o valor da propriedade RESOLVE não for definido em nenhum lugar, ele será resolvido para seu valor padrão, `strict`.

#### Propriedades Relacionadas à Segurança

As seções a seguir descrevem as propriedades que você pode definir para configurar o JAXP para processamento seguro de XML:

Existem dois tipos de propriedades JAXP relacionadas à segurança:

  * Propriedades Definidas pela API: São valores de campo constantes que fazem parte da API Java SE, cujos valores você define através do método `setAttribute(String, Object)` ou `setProperty(String, Object)` de uma factory ou parser. Alguns desses campos possuem propriedades de sistema correspondentes que você pode definir na linha de comando ou em um arquivo de configuração JAXP:
    * A Diretiva de Segurança FEATURE_SECURE_PROCESSING, definida pela API JAXP, sinaliza a intenção de impor restrições de segurança durante o processamento de documentos XML. Quando definida como true usando uma factory JAXP da seguinte forma, ela instrui o processador JAXP \(por exemplo, um parser, validador ou transformer\) a aplicar controles de segurança com base no modelo de segurança do processador:")
    * Propriedades de Acesso Externo, juntamente com suas propriedades de sistema correspondentes, permitem que você regule as conexões externas.")
  * Propriedades Específicas do JDK: São propriedades de sistema que você define através de parsers ou factories JAXP, na linha de comando ou em um arquivo de configuração JAXP. Algumas delas não são propriedades de sistema, o que significa que você não pode definir seus valores na linha de comando:
    * Propriedades JAXP para Limites de Processamento
    * Propriedade JAXP para Funções de Extensão
    * Propriedade JAXP para Parsers de Terceiros
    * Propriedades DTD e falsificação de requisição do lado do servidor \(SSRF\).")

##### Propriedades Definidas pela API

Tópicos

  * A Diretiva de Segurança FEATURE_SECURE_PROCESSING, definida pela API JAXP, sinaliza a intenção de impor restrições de segurança durante o processamento de documentos XML. Quando definida como true usando uma factory JAXP da seguinte forma, ela instrui o processador JAXP \(por exemplo, um parser, validador ou transformer\) a aplicar controles de segurança com base no modelo de segurança do processador:")
  * Propriedades de Acesso Externo, juntamente com suas propriedades de sistema correspondentes, permitem que você regule as conexões externas.")

###### A Diretiva de Segurança FEATURE_SECURE_PROCESSING

A diretiva FEATURE_SECURE_PROCESSING (FSP), definida pela API JAXP, sinaliza a intenção de impor restrições de segurança durante o processamento de documentos XML. Quando definida como true usando uma factory JAXP da seguinte forma, ela instrui o processador JAXP (por exemplo, um parser, validador ou transformer) a aplicar controles de segurança com base no modelo de segurança do processador:
```
    factory.setFeature(XMLConstants.FEATURE_SECURE_PROCESSING, true);
```

Quando o FSP está habilitado, o JDK ativa medidas de segurança adicionais usando Propriedades de Acesso Externo (EAPs) e propriedades específicas do JDK. Consulte Propriedades de Acesso Externo, juntamente com suas propriedades de sistema correspondentes, permitem que você regule as conexões externas.") (EAPs) e Propriedades Específicas do JDK.

Por padrão, o JDK ativa o FSP para factories SAX, DOM, de validação e de transformação. No entanto, as conexões externas (como resolução de entidade externa ou acesso a recursos) não são desabilitadas por padrão. Para garantir que o acesso externo seja devidamente restrito, o FSP precisa ser explicitamente definido como mostrado anteriormente.

###### Propriedades de Acesso Externo

As propriedades de acesso externo (EAPs), juntamente com suas propriedades de sistema correspondentes, permitem que você regule as conexões externas.

As EAPs permitem que você especifique o tipo de conexões externas que podem ou não ser permitidas. Os valores das propriedades são uma lista de protocolos. Os processadores JAXP verificam se uma dada conexão externa é permitida, comparando o protocolo com aqueles na lista. Os processadores tentarão estabelecer a conexão se ela estiver na lista, ou a rejeitarão se não estiver. Use essas propriedades JAXP juntamente com resolvedores personalizados e a API Catalog (consulte Usando Resolvedores e Catálogos) para reduzir o risco de conexões externas, rejeitando-as e resolvendo-as com recursos locais.

Nota:

Conexões externas são permitidas mesmo quando o FSP está ativado por padrão. Ativar explicitamente o FSP através da API, por exemplo, `factory.setFeature(XMLConstants.FEATURE_SECURE_PROCESSING, true)`, é necessário para desabilitar todas as conexões externas.

As EAPs são definidas em javax.xml.XMLConstants da seguinte forma:

  * javax.xml.XMLConstants.ACCESS_EXTERNAL_DTD
  * javax.xml.XMLConstants.ACCESS_EXTERNAL_SCHEMA
  * javax.xml.XMLConstants.ACCESS_EXTERNAL_STYLESHEET

Você pode especificar os valores dessas propriedades como uma propriedade de sistema ou em um arquivo de configuração JAXP.

Tabela 12-1 EAPs

Propriedade | Descrição | Valor Padrão
---|---|---
javax.xml.accessExternalDTD | Restringe o acesso a DTDs externos e referências de entidades externas aos protocolos especificados. Consulte javax.xml.XMLConstants.ACCESS_EXTERNAL_DTD. | `all`, conexão permitida a todos os protocolos
`javax.xml.accessExternalSchema` | Restringe o acesso aos protocolos especificados para referências externas definidas pelo atributo `schemaLocation`, elemento `import` e elemento `include`. Consulte javax.xml.XMLConstants.ACCESS_EXTERNAL_SCHEMA. | `all`, conexão permitida a todos os protocolos
`javax.xml.accessExternalStylesheet` | Restringe o acesso aos protocolos especificados para referências externas definidas pela instrução de processamento `stylesheet`, função `document` e elementos `import` e `include`. Consulte javax.xml.XMLConstants.ACCESS_EXTERNAL_STYLESHEET | `all`, conexão permitida a todos os protocolos

Valores das EAPs

Todas as EAPs possuem valores no mesmo formato:

  * Valor: Uma lista de protocolos separados por vírgula. Um protocolo é a parte do esquema de uma URI, ou no caso do protocolo JAR, `jar` mais a parte do esquema separada por dois pontos. Um esquema é definido como:

`scheme = alpha *( alpha | digit | "+" | "-" | "." )`

onde `alpha` = `a-z` e `A-Z`.

O protocolo JAR é definido como: `jar[:scheme]`

Os protocolos não diferenciam maiúsculas de minúsculas. Quaisquer caracteres de espaço em branco, conforme definidos por Character.isSpaceChar no valor, são ignorados. Exemplos de protocolos são `file`, `http` e `jar:file`.

  * Valor padrão: O valor padrão é específico da implementação. Para o JDK, o valor padrão é `all`, que concede permissões a todos os protocolos.

  * Concedendo todo o acesso: A palavra-chave `all` concede permissão a todos os protocolos. Por exemplo, especificar `javax.xml.accessExternalDTD=all` no arquivo de configuração JAXP permite que um sistema funcione como antes, sem restrições no acesso a DTDs externos e referências de entidades.

  * Negando qualquer acesso: Uma string vazia (`""`) significa que nenhuma permissão é concedida a qualquer protocolo. Por exemplo, especificar `javax.xml.accessExternalDTD=""` no arquivo de configuração JAXP instrui os processadores JAXP a negar quaisquer conexões externas.

###### Quando Usar Propriedades de Acesso Externo

Os processadores XML, por padrão, tentam conectar e ler recursos externos que são referenciados em fontes XML. Observe que isso pode potencialmente expor aplicações e sistemas a riscos impostos por conexões externas. É, portanto, recomendado que as aplicações considerem limitar as conexões externas com EAPs.

Aplicações e sistemas internos que lidam apenas com documentos XML confiáveis podem não precisar dessas EAPs. No entanto, tenha em mente que as EAPs são específicas dos processadores XML e estão na camada superior do processo, o que significa que os processadores verificam essas EAPs antes que qualquer conexão seja feita. Elas podem, portanto, servir como uma proteção adicional e mais direta contra riscos de conexão externa.

Você pode usar EAPs juntamente com resolvedores e catálogos personalizados (consulte Usando Resolvedores e Catálogos) para gerenciar efetivamente as conexões externas e reduzir riscos.

Mesmo em um ambiente confiável com fontes confiáveis, é recomendado que você use tanto EAPs quanto resolvedores para minimizar as dependências de fontes externas.

###### Precedência de Propriedades JAXP e Propriedades de Acesso Externo

As EAPs não têm efeito sobre os construtos relevantes que elas tentam restringir nas seguintes situações:

  * Quando há um resolvedor e a fonte retornada pelo resolvedor não é nula: Isso se aplica a resolvedores de entidade que podem ser definidos em parsers SAX e DOM, resolvedores XML em parsers StAX, LSResourceResolver em SchemaFactory, um Validator ou ValidatorHandler, ou URIResolver em um transformer.

  * Quando um schema é criado explicitamente chamando o método newSchema de SchemaFactory.

  * Quando recursos externos não são necessários: Por exemplo, as seguintes features e propriedades são suportadas pelo JDK e podem ser usadas para instruir o processador a não carregar o DTD externo ou resolver entidades externas:
` http://apache.org/xml/features/disallow-doctype-decl true
        http://apache.org/xml/features/nonvalidating/load-external-dtd false
        http://xml.org/sax/features/external-general-entities false
        http://xml.org/sax/features/external-parameter-entities false
```

##### Propriedades Específicas do JDK

Tópicos

  * [Propriedades JAXP para Limites de Processamento](<#/doc/guides/security/java-api-xml-processing-jaxp-security-guide>)
  * [Propriedade JAXP para Funções de Extensão](<#/doc/guides/security/java-api-xml-processing-jaxp-security-guide>)
  * [Propriedade JAXP para Parsers de Terceiros](<#/doc/guides/security/java-api-xml-processing-jaxp-security-guide>)
  * [Propriedades DTD](<#/doc/guides/security/java-api-xml-processing-jaxp-security-guide>)

###### Propriedades JAXP para Limites de Processamento

O processamento de XML pode, às vezes, ser uma operação que consome muita memória. Aplicações, especialmente aquelas que aceitam XML, XSD e XSL de fontes não confiáveis, devem tomar medidas para se proteger contra o consumo excessivo de memória usando propriedades JAXP para limites de processamento.

Avalie os requisitos da sua aplicação e o ambiente operacional para determinar os limites de processamento aceitáveis para as configurações do seu sistema e defina esses limites de acordo. Por exemplo, use limites relacionados ao tamanho para evitar que fontes XML malformadas consumam grandes quantidades de memória. Use a propriedade `jdk.xml.entityExpansionLimit` para permitir que uma aplicação controle o consumo de memória em um nível aceitável.

Os parsers XML do JDK observam os limites de processamento por padrão. Tanto os parsers DOM quanto SAX têm o FSP ativado por padrão e, portanto, ativam os limites. O parser StAX também observa os limites de processamento por padrão, mesmo que não suporte FSP.

A tabela a seguir descreve as propriedades JAXP para limites de processamento suportadas no JDK. O valor para cada um desses limites de processamento é um inteiro positivo. Um valor menor ou igual a 0 indica nenhum limite. Se o valor não for um inteiro, uma `NumericFormatException` é lançada. Você pode especificar os valores dessas propriedades através de sua factory, como uma propriedade de sistema ou em um arquivo de configuração JAXP.

Consulte a tabela [Implementation Specific Properties](<#/>) no resumo do módulo java.xml para mais informações.

Tabela 12-2 Propriedades de Limite de Processamento JAXP

Nome da Propriedade | Descrição | Valor Padrão | Factories Suportadas
---|---|---|---
`jdk.xml.elementAttributeLimit` | Limita o número de atributos que um elemento pode ter. | 200 | DocumentBuilderFactory
SAXParserFactory
XMLInputFactory
SchemaFactory
TransformerFactory
`jdk.xml.entityExpansionLimit` | Limita o número de expansões de entidade. | 2500 | DocumentBuilderFactory
SAXParserFactory
XMLInputFactory
SchemaFactory
TransformerFactory
`jdk.xml.entityReplacementLimit` | Limita o número total de nós em todas as referências de entidade. | 100000 | DocumentBuilderFactory
SAXParserFactory
XMLInputFactory
SchemaFactory
TransformerFactory
`jdk.xml.maxElementDepth` | Limita a profundidade máxima do elemento. | 100 | DocumentBuilderFactory
SAXParserFactory
XMLInputFactory
SchemaFactory
TransformerFactory
`jdk.xml.maxGeneralEntitySizeLimit` | Limita o tamanho máximo de quaisquer entidades gerais. | 100000 | DocumentBuilderFactory
SAXParserFactory
XMLInputFactory
SchemaFactory
TransformerFactory
`jdk.xml.maxOccurLimit` | Limita o número de nós do modelo de conteúdo que podem ser criados ao construir uma gramática para um Schema XML W3C que contém atributos `maxOccurs` com valores diferentes de "unbounded". | 5000 | DocumentBuilderFactory
SAXParserFactory
XMLInputFactory
SchemaFactory
TransformerFactory
`jdk.xml.maxParameterEntitySizeLimit` | Limita o tamanho máximo de quaisquer entidades de parâmetro, incluindo o resultado do aninhamento de múltiplas entidades de parâmetro. | 15000 | DocumentBuilderFactory
SAXParserFactory
XMLInputFactory
SchemaFactory
TransformerFactory
`jdk.xml.maxXMLNameLimit` | Limita o tamanho máximo de nomes XML, incluindo nome do elemento, nome do atributo e prefixo e URI do namespace. | 1000 | DocumentBuilderFactory
SAXParserFactory
XMLInputFactory
SchemaFactory
TransformerFactory
`jdk.xml.totalEntitySizeLimit` | Limita o tamanho total de todas as entidades que incluem entidades gerais e de parâmetro. O tamanho é calculado como uma agregação de todas as entidades. | 100000 | DocumentBuilderFactory
SAXParserFactory
XMLInputFactory
SchemaFactory
TransformerFactory
`jdk.xml.xpathExprGrpLimit` | Limita o número de grupos que uma expressão XPath pode conter. | 10 | TransformerFactory
XPathFactory
`jdk.xml.xpathExprOpLimit` | Limita o número de operadores que uma expressão XPath pode conter. | 100 | TransformerFactory
XPathFactory
`jdk.xml.xpathTotalOpLimit` | Limita o número total de operadores XPath em uma folha de estilo XSL. | 100000 | TransformerFactory

###### Limitações Padrão de FEATURE_SECURE_PROCESSING

A tabela a seguir descreve quais classes de factory relacionadas a XML são desabilitadas e quais limites de processamento são definidos se FEATURE_SECURE_PROCESSING (FSP) estiver habilitado.

Tabela 12-3 Limitações Padrão Definidas por FSP em Classes de Factory Relacionadas a XML

Classe de Factory Relacionada a XML | Habilitado? | Limites de Processamento
---|---|---
DocumentBuilderFactory | true | `jdk.xml.entityExpansionLimit = 2500` `jdk.xml.elementAttributeLimit = 200` `jdk.xml.maxOccurLimit = 5000`
SAXParserFactory | true | `jdk.xml.entityExpansionLimit = 2500` `jdk.xml.elementAttributeLimit = 200` `jdk.xml.maxOccurLimit = 5000`
SchemaFactory | true | `jdk.xml.maxOccurLimit = 5000`
TransformerFactory | false | Funções de extensão desabilitadas
XPathFactory | false | Funções de extensão desabilitadas

###### Limitando a Expansão de Entidades

Limite o número de expansões de entidade definindo a propriedade de sistema `jdk.xml.entityExpansionLimit` ou a propriedade do parser `http://apache.org/xml/properties/entity-expansion-limit`. Ambas as propriedades aceitam valores `java.lang.Integer`. O parser lança um erro fatal assim que atinge o limite de expansão de entidade. Por padrão, `entityExpansionLimit` é definido como 64.000.

O exemplo de linha de comando a seguir define o limite de expansão de entidade para 10.000:
```
    java -DentityExpansionLimit=10000 MyApp
```

O exemplo de código a seguir define o limite de expansão de entidade para 10.000:
```
    System.setProperty("jdk.xml.entityExpansionLimit","10000");
```

O exemplo de código a seguir define a propriedade do parser `http://apache.org/xml/properties/entity-expansion-limit` para 10.000:
```
    DocumentBuilderFactory dfactory = DocumentBuilderFactory.newInstance();
    dfactory.setAttribute(
            "http://apache.org/xml/properties/entity-expansion-limit",
            new Integer("10000"));
        DocumentBuilder docBuilder = dbFactory.newDocumentBuilder();
```

###### Limitando o Número de Atributos de Elementos

Limite o número de atributos em um elemento definindo a propriedade de sistema `jdk.xml.elementAttributeLimit` ou definindo a propriedade do parser `http://apache.org/xml/properties/elementAttributeLimit`. Ambas as propriedades aceitam valores Integer. Por padrão, `jdk.xml.elementAttributeLimit` é definido como 10.000. Quando a propriedade do parser `http://apache.org/xml/properties/elementAttributeLimit` é definida, ela sobrescreve a propriedade de sistema. O parser lança um erro fatal se o número de atributos em um elemento exceder o limite.

O exemplo de linha de comando a seguir define o limite de atributos de elemento para 20:
```
    java -Djdk.xml.elementAttributeLimit=20 MyApp
```

O exemplo de código a seguir define o limite de atributos de elemento para 20:
```
    System.setProperty("jdk.xml.elementAttributeLimit","20");
```

O exemplo de código a seguir define a propriedade do parser `http://apache.org/xml/properties/entity-expansion-limit` para 20:
```
    DocumentBuilderFactory dfactory = DocumentBuilderFactory.newInstance();
    dfactory.setAttribute(
        "http://apache.org/xml/properties/elementAttributeLimit",
        new Integer(20));
    DocumentBuilder docBuilder = dbFactory.newDocumentBuilder();
```

###### Limitando o Número de Nós Criados por Construtos Que Contêm maxOccurs

Em construtos como `xsd:sequence`, o parser validador pode usar espaço (memória) proporcional ao valor do indicador de ocorrência `maxOccurs`. Isso pode fazer com que a VM fique sem memória, ou simplesmente execute por um tempo muito longo. Para prevenir ataques potenciais que exploram esse comportamento, habilite o processamento seguro em uma factory da seguinte forma:
```
    factory.setFeature(XMLConstants.FEATURE_SECURE_PROCESSING, Boolean.TRUE);
```

Observe que para `xsd:element` e `xsd:any`, o parser validador usa uma quantidade constante de espaço, que é independente do valor do indicador de ocorrência `maxOccurs`.

O valor padrão de `jdk.xml.maxOccurLimit` é 5000. Esta propriedade de sistema limita o número de nós do modelo de conteúdo que podem ser criados ao construir uma gramática para um Schema XML W3C que contém indicadores de ocorrência `maxOccurs` com valores diferentes de "unbounded".

###### Quando Usar Limites de Processamento

Ao determinar quais limites de processamento aplicar e quais valores usar, no nível do sistema, considere a quantidade de memória disponível para as aplicações e se fontes XML, XSD ou XSL de origens não confiáveis são aceitas e processadas. No nível da aplicação, considere se certos construtos, como DTDs, são usados.

Configuração e Limites de Memória

O processamento de XML pode ser muito intensivo em memória. A quantidade de memória que deve ser permitida para consumo depende dos requisitos das aplicações em um ambiente específico. O processamento de dados XML malformados deve ser impedido de consumir memória excessiva.

Os limites padrão são geralmente definidos para permitir entradas XML legítimas para a maioria das aplicações, com uso de memória permitido para um sistema de hardware pequeno, como um PC. Recomenda-se que os limites sejam definidos para os menores valores possíveis, para que qualquer entrada malformada possa ser detectada antes que consuma grandes quantidades de memória.

Os limites são correlacionados, mas não totalmente redundantes. Você deve definir valores apropriados para todos os limites: geralmente os limites devem ser definidos para um valor muito menor do que o padrão.

Por exemplo, `ENTITY_EXPANSION_LIMIT` e `GENERAL_ENTITY_SIZE_LIMIT` podem ser definidos para prevenir referências de entidade excessivas. Mas quando a combinação exata da expansão e dos tamanhos das entidades é desconhecida, `TOTAL_ENTITY_SIZE_LIMIT` pode servir como um controle geral. Da mesma forma, enquanto `TOTAL_ENTITY_SIZE_LIMIT` controla o tamanho total de um texto de substituição, se o texto for um pedaço muito grande de XML, `ENTITY_REPLACEMENT_LIMIT` define uma restrição no número total de nós que podem aparecer no texto e previne a sobrecarga do sistema.

Estimando os Limites Usando a Propriedade getEntityCountInfo

Para ajudar a analisar quais valores você deve definir para os limites, uma propriedade especial chamada `http://www.oracle.com/xml/jaxp/properties/getEntityCountInfo` está disponível. O trecho de código a seguir, de [Processing Limit Samples](<https://docs.oracle.com/javase/tutorial/jaxp/limits/sample.html>) nos Tutoriais Java, mostra um exemplo de uso da propriedade:
```
        public static final String ORACLE_JAXP_PROPERTY_PREFIX =
            "http://www.oracle.com/xml/jaxp/properties/";
        // ...
        public static final String JDK_ENTITY_COUNT_INFO =
            ORACLE_JAXP_PROPERTY_PREFIX + "getEntityCountInfo";
        // ...
        parser.setProperty(JDK_ENTITY_COUNT_INFO, "yes");
```

Ao executar o exemplo de limite de processamento com o DTD em W3C MathML 3.0, ele imprime a seguinte tabela:
```
    Sample: parsing W3C MathML


                          Property           Limit      Total size            Size                    Entity Name
            ENTITY_EXPANSION_LIMIT           64000            1417               0                           null
              MAX_OCCUR_NODE_LIMIT            5000               0               0                           null
           ELEMENT_ATTRIBUTE_LIMIT           10000               0               0                           null
           TOTAL_ENTITY_SIZE_LIMIT        50000000           59259               0                           null
         GENERAL_ENTITY_SIZE_LIMIT               0               0              10                           nvlt
       PARAMETER_ENTITY_SIZE_LIMIT         1000000               0            7304         %MultiScriptExpression
           MAX_ELEMENT_DEPTH_LIMIT             100               2               2                           null
                    MAX_NAME_LIMIT            1000              13              13                           null
          ENTITY_REPLACEMENT_LIMIT         3000000               0               0                           null
                 XPATH_GROUP_LIMIT              10               0               0                           null
                    XPATH_OP_LIMIT             100               0               0                           null
               XPATH_TOTALOP_LIMIT           10000               0               0                           null
                               DTD               0               0               0                           null
               XERCES_DISALLOW_DTD               0               0               0                           null
                  STAX_SUPPORT_DTD               1               0               0                           null
                JDKCATALOG_RESOLVE               0               0               0                           null
```

A coluna "Limits" sugere valores que você deve definir para os limites. Neste exemplo, ela sugere 64000 para `ENTITY_EXPANSION_LIMIT`. No entanto, houve um total de 1417 expansões de entidade.

Se o DTD em W3C MathML 3.0 for o maior arquivo que a aplicação deve processar, recomenda-se que os limites sejam definidos para números menores. Por exemplo, 2000 para `ENTITY_EXPANSION_LIMIT`, 100000 para `TOTAL_ENTITY_SIZE_LIMIT` e 10000 para `PARAMETER_ENTITY_SIZE_LIMIT`.

###### Propriedade JAXP para Funções de Extensão

O valor padrão da propriedade `jdk.xml.enableExtensionFunctions` é `false`, o que desabilita as funções externas XSLT e XPath. Funções externas permitem que você invoque seu próprio código ou código de terceiros a partir de uma folha de estilo.

Se uma aplicação lida com transformação XML com uma folha de estilo que usa funções de extensão, ela pode encontrar um erro de processamento, por exemplo:

`Use of the extension function <function name> is not allowed when extension functions are disabled by the secure processing feature or the property jdk.xml.enableExtensionFunctions. To enable extension functions, set jdk.xml.enableExtensionFunctions to true.`

Você pode definir a propriedade `jdk.xml.enableExtensionFunctions` como `true` da seguinte forma:

  * Através da API de Transformação JAXP (pacote [javax.xml.transform](<https://docs.oracle.com/en/java/javase/25/docs/api/java.xml/javax/xml/transform/package-summary.html>)):
` TransformerFactory tf = TransformerFactory.newInstance();
        tf.setFeature("jdk.xml.enableExtensionFunctions", true);
```

  * Através da API XPath (pacote javax.xml.xpath):
` XPathFactory xf = XPathFactory.newInstance();
        xf.setFeature("jdk.xml.enableExtensionFunctions", true);
```

  * No arquivo de configuração JAXP; consulte [Definindo Propriedades JAXP em um Arquivo de Configuração JAXP](<#/doc/guides/security/java-api-xml-processing-jaxp-security-guide>)

  * Na linha de comando:
` java -Djdk.xml.enableExtensionFunctions=true myApp
```

###### Propriedade JAXP para Parsers de Terceiros

O JDK sempre usará seu parser padrão do sistema mesmo quando houver um parser de terceiros no classpath. Para sobrescrever o parser padrão do sistema do JDK, defina a propriedade `jdk.xml.overrideDefaultParser` como true através de TransformerFactory, SchemaFactory ou XPathFactory, como uma propriedade de sistema ou em um arquivo de configuração JAXP.

Tabela 12-4 A Propriedade jdk.xml.enableExtensionFunctions

Propriedade | Descrição | Valor Padrão | Factories Suportadas
---|---|---|---
`jdk.xml.overrideDefaultParser` | Se `true`, então habilita o uso da implementação de parser de terceiros para sobrescrever o parser padrão do sistema para as implementações de Transformer, Validator e XPath do JDK. Se `false`, então desabilita o uso de implementações de parser de terceiros. | `false` | TransformerFactory
SchemaFactory
XPathFactory

###### Propriedades DTD

Se suas aplicações não exigem DTDs, considere desabilitar o processamento de DTD para se proteger contra muitos ataques comuns relacionados a DTDs, incluindo negação de serviço, entidade externa XML (XXE) e falsificação de requisição do lado do servidor (SSRF).

Você pode usar a propriedade de sistema `jdk.xml.dtd.support` para desabilitar o processamento de DTD. Ela pode ter um dos seguintes valores:

  * `allow`: O parser continua a processar DTDs. Este é o valor padrão.
  * `ignore`: O parser ignora DTDs.
  * `deny`: O parser rejeita DTDs como um erro. O parser reporta o erro de acordo com sua especificação.

Nota:

Definir o valor da propriedade de sistema `jdk.xml.dtd.support` é a maneira recomendada de desabilitar o processamento de DTD. Esta propriedade de sistema permite desabilitar o processamento de DTD para todos os parsers e processadores. Além disso, você pode usar esta propriedade em um arquivo de configuração JAXP.

Existem duas outras maneiras de desabilitar o processamento de DTD, mas elas se aplicam a parsers específicos:

  * Para desabilitar o processamento de DTD para parsers SAX e DOM, defina a feature `http://apache.org/xml/features/disallow-doctype-decl` como `true` através de uma factory. O seguinte trecho de código desabilita DTDs para parsers SAX. Um erro fatal é lançado se o documento XML de entrada contiver uma declaração DOCTYPE.
` final static String DISALLOW_DTD =
                "http://apache.org/xml/features/disallow-doctype-decl";
            // ...
            SAXParserFactory spf = SAXParserFactory.newInstance();      
            spf.setFeature(DISALLOW_DTD, true);
```

  * Para desabilitar o processamento de DTD para parsers StAX, defina a propriedade `SupportDTD` como `false` com o método `XMLInputFactory.setProperty`:
` XMLInputFactory xif = XMLInputFactory.newInstance();
            xif.setProperty(XMLInputFactory.SUPPORT_DTD, Boolean.FALSE);
```

Se você usar qualquer uma dessas duas maneiras para desabilitar o processamento de DTD, a propriedade de sistema `jdk.xml.dtd.support` não terá efeito.

#### Processadores Compostos

Processadores compostos como o validador, transformador e processador XPath usam parsers criados internamente para ler a fonte quando não é um `DOMSource` ou `Document`. Quando `FEATURE_SECURE_PROCESSING` (FSP) é ativado através de factories como `SchemeFactory`, `TransformerFactory` e `XPathFactory`, ele também é ativado para qualquer instância de parser interno. Isso significa que o parser interno se comportará da mesma forma que um parser criado através de `SAXParserFactory` ou `DocumentBuilderFactory`.

Por exemplo, o código a seguir cria uma instância de `XPathFactory` com FSP:
```
    XPathFactory xf = XPathFactory.newInstance(); 
    xf.setFeature(XMLConstants.FEATURE_SECURE_PROCESSING, true);  
```

Este processo garante que o FSP também esteja ativado para qualquer parser interno exigido pelo processador XPath, como quando é usado para avaliar uma fonte XML bruta. Consequentemente, quaisquer restrições definidas pelo parser são aplicadas. Por exemplo, se a fonte XML contiver referências externas não resolvidas por um catálogo ou resolver, ela será rejeitada conforme descrito em Propriedades de Acesso Externo, juntamente com suas propriedades de sistema correspondentes, permitem regular conexões externas.") porque o FSP está explicitamente ativado.

#### Usando Resolvers e Catálogos

Você pode registrar resolvers e catálogos personalizados em um processador XML do JDK para interceptar quaisquer referências a recursos externos e resolvê-los com recursos locais. Este recurso elimina a necessidade de ler e acessar recursos externos, ajudando assim a remover uma fonte de risco potencial.

##### Resolvers XML Java

A API XML Java suporta vários resolvers que você pode registrar em processadores XML do JDK para resolver recursos externos. Esses resolvers incluem entity resolvers para parsers SAX e DOM, XML resolvers para parsers StAX, LSResourceResolver para validação e URIResolver para transformação.

###### Entity Resolvers para SAX e DOM

SAX define uma interface que DOM também suporta, `org.xml.sax.EntityResolver`. Ela permite que as aplicações entrem no processo de resolução de entidades e realizem a resolução de entidades em seus próprios termos. A seguir está a definição da interface:
```
    package org.xml.sax;
    
    public interface EntityResolver {
        public InputSource resolveEntity(String publicID, String systemID)
            throws SAXException;
    }
```

Você pode então registrar uma implementação da interface em um driver SAX:
```
        EntityResolver resolver = ...;
        SAXParserFactory factory = SAXParserFactory.newInstance();
        factory.setNamespaceAware(true);
        XMLReader reader = factory.newSAXParser().getXMLReader();
        reader.setEntityResolver(resolver);
```

Alternativamente, você pode registrá-lo em um builder DOM:
```
        DocumentBuilder builder =
            DocumentBuilderFactory.newInstance().newDocumentBuilder();       
        docBuilder.setEntityResolver(resolver);
```

###### XMLResolver para StAX

StAX define uma interface `javax.xml.stream.XMLResolver`:
```
    package javax.xml.stream;
    
    public interface XMLResolver {
        public Object resolveEntity(
            String publicID, String systemID,
            String baseURI, String namespace)
            throws XMLStreamException;
    }
```

Você pode registrá-lo em uma factory StAX:
```
        XMLResolver resolver = ...;
        XMLInputFactory xif = XMLInputFactory.newInstance();
        xif.setProperty(XMLInputFactory.RESOLVER, resolver);
```

###### URIResolver para javax.xml.transform

A API `javax.xml.transform` suporta resolução personalizada de recursos externos através da interface `URIResolver`:
```
    package javax.xml.transform;
    
    public interface URIResolver {
        public Source resolve(String href, String base)
            throws TransformerException;
    }
```

Você pode registrar uma implementação de `URIResolver` em um `Transformer` da seguinte forma:
```
        URIResolver resolver = ...;
        TransformerFactory tf = TransformerFactory.newInstance();
        Transformer t =
          tf.newTransformer(new StreamSource(
            new StringReader("xsl source")));
        t.setURIResolver(resolver);
```

###### LSResourceResolver para javax.xml.validation

A API `javax.xml.validation` suporta Document Object Model Level 3 Load and Save (DOM LS) DOM através da interface `LSResourceResolver`:
```
    package org.w3c.dom.ls;
    
    public interface LSResourceResolver {
        public LSInput resolveResource(
            String type, String namespaceURI, String publicId,
            String systemId, String baseURI);
    }
```

Você pode registrar uma implementação de `LSResourceResolver` em uma `SchemaFactory` da seguinte forma:
```
        SchemaFactory schemaFactory =
            SchemaFactory.newInstance("http://www.w3.org/2001/XMLSchema");
        LSResourceResolver resolver = ...;
        schemaFactory.setResourceResolver(resolver);
```

##### A API de Catálogo

A API XML Catalog suporta os Catálogos XML OASIS (Organization for the Advancement of Structured Information Standards), Padrão OASIS V1.1. Esta API é totalmente implementada pelos processadores XML do JDK e é fácil de usar. Consulte API XML Catalog em Java Platform, Standard Edition Core Libraries.

Use a API XML Catalog para resolver recursos externos com a interface `CatalogResolver` e para habilitar catálogos em processadores XML do JDK.

###### Catalog Resolver

Você pode usar um `CatalogResolver` como um resolver personalizado que substitui referências externas por recursos locais configurados como objetos `Catalog`. Você pode registrar um `CatalogResolver` em factories ou processadores no lugar de `EntityResolver`, `XMLResolver`, `URIResolver` ou `LSResourceResolver`, conforme descrito em Resolvers XML Java. No trecho de código a seguir, um `CatalogResolver` é registrado como um `EntityResolver` em uma `SAXParserFactory`:
```
        URI catalogUri = URI.create("file:///users/auser/catalog/catalog.xml")
        CatalogResolver cr =
            CatalogManager.catalogResolver(CatalogFeatures.defaults(), catalogUri);
        SAXParserFactory factory = SAXParserFactory.newInstance();
        factory.setNamespaceAware(true);
        XMLReader reader = factory.newSAXParser().getXMLReader();
        reader.setEntityResolver(cr);
```

###### Habilitar Catálogos em Processadores XML do JDK

Os processadores XML do JDK implementam a API Catalog como uma função nativa. Portanto, não há necessidade de instanciar um `CatalogResolver` fora dos processadores. Tudo o que você precisa fazer é registrar os arquivos de catálogo nos processadores XML através dos métodos `setProperty` ou `setAttribute`, através de propriedades de sistema, ou no arquivo de configuração JAXP. Os processadores XML então realizam os mapeamentos através dos catálogos automaticamente. O trecho de código a seguir demonstra como registrar catálogos em parsers StAX através de `XMLInputFactory`:
```
        String catalog = "file:///users/auser/catalog/catalog.xml";
        XMLInputFactory factory = XMLInputFactory.newInstance();
        factory.setProperty(CatalogFeatures.Feature.FILES.getPropertyName(), catalog);
```

Para mais exemplos, consulte API XML Catalog em Java Platform, Standard Edition Core Libraries.

##### O Catálogo Embutido

O JDK possui um catálogo embutido que hospeda os seguintes arquivos DTD e XSD conforme definidos pela plataforma Java e pelo World Wide Web Consortium (W3C):

Tabela 12-5 Arquivos DTD e XSD no Catálogo Embutido do JDK

Fonte | Arquivo ou Arquivos DTD ou XSD
---|---
 java.util.prefs.Preferences | `preferences.dtd`
java.util.Properties | `properties.dtd`
XML Schema Part 1: Structures Second Edition, XML Schema Part 2: Datatypes Second Edition | `XMLSchema.dtd`, `datatypes.dtd`, `XMLSchema.xsd`, `datatypes.xsd`
XHTML 1.0 The Extensible HyperText Markup Language | `xhtml1-frameset.dtd`, `xhtml1-strict.dtd xhtml1-transitional.dtd`
XHTML 1.0 in XML Schema | `xhtml1-frameset.xsd`, `xhtml1-strict.xsd xhtml1-transitional.xsd`
XHTML 1.1 - Module-based XHTML - Second Edition | `xhtml11.dtd`
XHTML 1.1 XML Schema Definition | `xhtml11.xsd`
XML DTD for W3C specifications | `xmlspec.dtd`
The "xml:" Namespace | `xml.xsd`

O catálogo embutido é carregado quando a primeira factory de processador JAXP é criada.

O Processo de Resolução de Recursos Externos com o Catálogo Embutido

O JDK cria um `CatalogResolver` com o catálogo embutido quando necessário. Este `CatalogResolver` é o resolver de recursos externos padrão.

Os processadores XML podem usar resolvers (como `EntityResolver`, `XMLResolver` e `CatalogResolver`) para lidar com referências externas. Na ausência de resolvers definidos pelo usuário, os processadores XML do JDK recorrem ao `CatalogResolver` padrão para tentar encontrar uma resolução antes de fazer uma conexão para buscar os recursos. O fallback também ocorre se um resolver definido pelo usuário existir, mas permitir que o processo continue quando não conseguir resolver o recurso.

Se o `CatalogResolver` padrão não conseguir localizar um recurso, ele pode sinalizar aos processadores XML para continuar o processamento, ignorar ou pular o recurso, ou lançar uma `CatalogException`. O comportamento é configurado com a propriedade de sistema `jdk.xml.jdkcatalog.resolve`. Ela pode ter um dos seguintes valores:

  * `continue`: Continua o processamento apesar de não conseguir localizar o recurso. Este é o valor padrão.
  * `ignore`: Pula o recurso que não pode ser localizado.
  * `strict`: Lança uma `CatalogException` se o recurso não puder ser localizado.

### Tratamento de Erros de Propriedades JAXP

É recomendado que as aplicações capturem `org.xml.sax.SAXNotRecognizedException` ao definir propriedades JAXP para que as aplicações funcionem corretamente em versões mais antigas que não as suportam.

Por exemplo, o método a seguir, `isNewPropertySupported`, de Exemplos de Limites de Processamento em The Java Tutorials, detecta se o exemplo está sendo executado com uma versão do JDK que suporta a propriedade `JDK_GENERAL_ENTITY_SIZE_LIMIT`:
```
        public boolean isNewPropertySupported() {
            try {
                SAXParser parser = getSAXParser(false, false, false);
                parser.setProperty(JDK_GENERAL_ENTITY_SIZE_LIMIT, "10000");
            } catch (ParserConfigurationException ex) {
                fail(ex.getMessage());
            } catch (SAXException ex) {
                String err = ex.getMessage();
                if (err.indexOf("Property '" + JDK_GENERAL_ENTITY_SIZE_LIMIT +
                                               "' is not recognized.") > -1) {
                    // expected before this patch
                    debugPrint("New limit properties not supported. Samples not run.");
                    return false;
                }
            }
            return true;
        }
```

Quando os arquivos de entrada contêm construções que causam uma exceção de limite excedido, as aplicações podem verificar o código de erro para determinar a natureza da falha. Os seguintes códigos de erro são definidos para limites de processamento:

  * `EntityExpansionLimit`: JAXP00010001
  * `ElementAttributeLimit`: JAXP00010002
  * `MaxEntitySizeLimit`: JAXP00010003
  * `TotalEntitySizeLimit`: JAXP00010004
  * `MaxXMLNameLimit`: JAXP00010005
  * `maxElementDepth`: JAXP00010006
  * `EntityReplacementLimit`: JAXP00010007

O código de erro tem o seguinte formato:
```
    "JAXP" + components (two digits) + error category (two digits) + sequence number
```

O código JAXP00010001, portanto, representa o limite de segurança do parser base JAXP `EntityExpansionLimit`.

Se o acesso a recursos externos for negado devido às restrições definidas pelas EAPs, uma exceção será lançada com um erro no seguinte formato:
```
    [type of construct]: Failed to read [type of construct]
        "[name of the external resource]", because "[type of restriction]"
        access is not allowed due to restriction set by the
        [property name] property.
```

Por exemplo, suponha o seguinte:

  * A propriedade JAXP `ACCESS_EXTERNAL_DTD` é definida da seguinte forma:
` parser.setProperty(
            "http://javax.xml.XMLConstants/property/accessExternalDTD", "file");
```

  * Sua aplicação tenta buscar um DTD externo com o protocolo HTTP.

  * O parser analisou um arquivo XML que contém uma referência externa a `http://www.example.com/dtd/properties.dtd`.

A mensagem de erro seria semelhante à seguinte:
```
    External DTD: Failed to read external DTD
        "http://www.example.com/dtd/properties.dtd", because "http"
        access is not allowed due to restriction set by the
        accessExternalDTD property.
```

### Recomendações Gerais para Segurança JAXP

A seguir estão recomendações gerais para configurar propriedades e features JAXP para ajudar a proteger suas aplicações e sistemas:

  * Crie e especifique um arquivo de configuração JAXP definido pelo usuário com configurações de propriedade adaptadas ao seu ambiente; consulte [Definindo Propriedades JAXP em um Arquivo de Configuração JAXP](<#/doc/guides/security/java-api-xml-processing-jaxp-security-guide>). Depois, ajuste features e propriedades individuais de acordo com os requisitos específicos das aplicações através de configurações de factory ou propriedades de sistema.
  * Desabilite DTDs com a propriedade de sistema `jdk.xml.dtd.support` se a aplicação não exigir ou processar conteúdo DTD. Consulte [Propriedades DTD](<#/doc/guides/security/java-api-xml-processing-jaxp-security-guide>).
  * Para limites de processamento, ajuste-os para que sejam apenas grandes o suficiente para acomodar a quantidade máxima que suas aplicações exigem.
  * Para EAPs, reduza ou elimine a dependência de suas aplicações em recursos externos, incluindo o uso de resolvers, e então reforce as restrições especificadas pelas EAPs.
  * Configure um catálogo local e habilite a API Catalog em todos os processadores XML para reduzir ainda mais a dependência de suas aplicações em recursos externos.
  * Rejeite quaisquer referências externas não resolvidas por um resolver ou catálogo definido pelo usuário, configurando a propriedade de sistema `jdk.xml.jdkcatalog.resolve` do catálogo embutido. Consulte [O Catálogo Embutido](<#/doc/guides/security/java-api-xml-processing-jaxp-security-guide>).

### Apêndice A: Glossário de Termos e Definições da API Java para Processamento XML

Tabela 12-6 Glossário JAXP

Termo | Definição
---|---
JAXP | Java API for XML Processing
Java SE XML API | APIs definidas no JSR JAXP e integradas ao Java SE
Java XML API | Termo equivalente para Java SE XML API
Java XML Features and Properties | Features e propriedades relacionadas a XML definidas pela especificação Java SE
`java.xml` | O módulo [java.xml](<https://docs.oracle.com/en/java/javase/25/docs/api/java.xml/module-summary.html>)
JDK XML | A implementação JDK da API XML Java
JDK XML Parsers | A implementação JDK dos parsers XML
JDK XML Properties | As propriedades exclusivas da implementação JDK
EAPs | [Propriedades de Acesso Externo](<#/doc/guides/security/java-api-xml-processing-jaxp-security-guide>)
FSP | [A Diretiva de Segurança FEATURE_SECURE_PROCESSING](<#/doc/guides/security/java-api-xml-processing-jaxp-security-guide>)

### Apêndice B: Convenção de Nomenclatura de Features e Propriedades XML Java e JDK

As features e propriedades XML Java e JDK são definidas na classe `javax.xml.XMLConstants`. As features têm o prefixo `http://javax.xml.XMLConstants/feature`; as propriedades, `http://javax.xml.XMLConstants/property`. Se houver uma propriedade de sistema correspondente, seu prefixo é `javax.xml`.

As propriedades XML do JDK são propriedades exclusivas da implementação do JDK. O prefixo das propriedades é `http://www.oracle.com` para JDK 8 e anteriores e `jdk.xml` para JDK 9 e posteriores. A tabela a seguir resume esta convenção de nomenclatura:

Tabela 12-7 Convenção de Nomenclatura de Features e Propriedades XML Java e JDK

Escopo | Prefixo da Propriedade da API | Prefixo da Propriedade do Sistema | Versão Java SE e JDK
---|---|---|---
Java SE | `http://javax.xml.XMLConstants/feature` `http://javax.xml.XMLConstants/property` | `javax.xml` | Desde 1.4
JDK | `http://www.oracle.com/xml/jaxp/properties` | `jdk.xml` | Desde 7
JDK | `jdk.xml` | `jdk.xml` | Desde 9