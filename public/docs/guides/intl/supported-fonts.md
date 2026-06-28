# Fontes Suportadas

## 4 Fontes Suportadas

Diferentes plataformas OS podem fornecer fontes que são implementadas usando diferentes tecnologias de fonte. Para suportar o uso multiplataforma, a API Java SE define cinco famílias de fontes "lógicas" que podem ser usadas com segurança por uma aplicação usando qualquer implementação Java SE. Os nomes dessas famílias são definidos na descrição da classe [Font](<https://docs.oracle.com/en/java/javase/25/docs/api/java.desktop/java/awt/Font.html>).

Além disso, uma implementação Java SE pode expor as fontes da plataforma para serem usadas diretamente pelo nome. Essas fontes são chamadas de fontes "físicas".

Para mais informações sobre a terminologia usada aqui, consulte a descrição da classe Font.

### Suporte para Fontes Físicas

O JDK suporta fontes TrueType, OpenType e PostScript Type 1.

As fontes físicas precisam ser instaladas em locais conhecidos pelo ambiente de tempo de execução Java. O JDK localiza as fontes nos locais de fonte padrão definidos pelo sistema operacional hospedeiro.

Você pode adicionar fontes físicas que usam uma tecnologia de fonte suportada, instalando-as de uma forma suportada pelo sistema operacional hospedeiro. O local recomendado para adicionar fontes por usuário no Linux é o diretório `$HOME/.fonts`, que é pesquisado pelo `libfontconfig` da plataforma e, por sua vez, é usado pelo JDK.

### Suporte para Fontes Lógicas

Tipicamente, uma fonte lógica mapeia para várias fontes físicas a fim de cobrir um intervalo maior de pontos de código do que é possível com uma única fonte. As fontes lógicas são mapeadas para fontes físicas de maneiras dependentes da implementação e podem variar de plataforma para plataforma e de versão para versão.

Arquivos de configuração de fonte são usados por algumas implementações para lidar com o mapeamento, veja [Arquivos de Configuração de Fonte](<#/doc/guides/intl/font-configuration-files>):

  * Versões atuais para Windows sempre usam arquivos de configuração de fonte.
  * A implementação macOS sempre ignora arquivos de configuração de fonte.
  * Versões para Linux usam arquivos de configuração de fonte apenas se houver uma correspondência exata para a versão do OS; caso contrário, os arquivos de configuração de fonte são ignorados e as APIs da plataforma são usadas para preencher as fontes lógicas.