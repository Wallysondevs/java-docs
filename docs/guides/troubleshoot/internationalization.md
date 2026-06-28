# Internacionalização

## 15 Internacionalização

Informações e orientações sobre a solução de problemas que podem ser encontrados na área de suporte à internacionalização.

Para informações detalhadas, visite a [Visão Geral da Internacionalização](<https://docs.oracle.com/en/java/javase/16/intl/internationalization-overview.html>).

Este capítulo descreve técnicas de solução de problemas para internacionalização e localização.

  * [Solução de Problemas de Internacionalização e Localização](<#/doc/guides/troubleshoot/internationalization>)

### Solução de Problemas de Internacionalização e Localização

Antes de solucionar problemas, certifique-se de que você entende a diferença entre internacionalização e localização:

  * **Internacionalização** é o processo de projetar software de forma que ele possa ser adaptado (localizado) para várias linguagens e regiões facilmente, de forma econômica e sem alterações no software. Este processo geralmente envolve isolar as partes de um programa que dependem de linguagem e cultura. Por exemplo, o texto das mensagens de erro é mantido separado do código-fonte do programa porque as mensagens devem ser traduzidas durante a localização.

  * **Localização** é o processo de adaptar um programa para uso em uma localidade específica. Uma localidade é uma região geográfica ou política que compartilha a mesma linguagem e costumes. A localização inclui a tradução de texto, como rótulos de interface de usuário, mensagens de erro e ajuda online. Também inclui a formatação específica da cultura de itens de dados, como valores monetários, horários, datas e números.

As bibliotecas de interface de usuário na plataforma Java SE permitem o desenvolvimento de aplicações interativas ricas. Os aspectos de internacionalização incluem entrada de texto, exibição de texto e layout da interface de usuário. As descrições a seguir mostram a relação entre internacionalização e a funcionalidade fornecida pelas APIs AWT, Java 2D e Swing:

  * A entrada de texto é o processo de inserir novo texto em um documento, seja digitando em um teclado ou através de software de front-end, como métodos de entrada, reconhecimento de escrita manual ou entrada de voz.

  * A exibição de texto é um processo de várias etapas que inclui a seleção de uma fonte, o arranjo de texto em parágrafos e linhas, a seleção de glifos para caracteres ou sequências de caracteres e a renderização desses glifos. Alguns sistemas de escrita exigem layout de texto bidirecional ou mapeamentos complexos de caractere para glifo. A exibição de texto é tratada pelo sistema gráfico Java 2D e pelo toolkit Swing para componentes de interface de usuário leves e pelo AWT para componentes de interface de usuário emparelhados.

  * O layout da interface de usuário precisa acomodar a expansão ou contração de texto causada pela localização e corresponder à direção do sistema de escrita do usuário.