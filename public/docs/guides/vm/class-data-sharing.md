# Compartilhamento de Dados de Classe

## 4 Compartilhamento de Dados de Classe

Este capítulo descreve o recurso de compartilhamento de dados de classe (CDS) que pode ajudar a reduzir o tempo de inicialização e o consumo de memória para aplicações Java.

Tópicos:

  * [Compartilhamento de Dados de Classe](<#/doc/guides/vm/class-data-sharing>)
  * [Controlando Manualmente o Compartilhamento de Dados de Classe](<#/doc/guides/vm/class-data-sharing>)



### Compartilhamento de Dados de Classe

O recurso de compartilhamento de dados de classe (CDS) ajuda a reduzir o tempo de inicialização e o consumo de memória entre múltiplas Java Virtual Machines (JVM).

A partir do JDK 12, um arquivo CDS padrão é pré-empacotado com o binário do Oracle JDK.

Por padrão, o arquivo CDS padrão é habilitado em tempo de execução. Especifique `-Xshare:off` para desabilitar o arquivo compartilhado padrão.

Quando a JVM inicia, o arquivo compartilhado é mapeado na memória para permitir o compartilhamento de metadados de JVM somente leitura para essas classes entre múltiplos processos JVM. Como acessar o arquivo compartilhado é mais rápido do que carregar as classes, o tempo de inicialização é reduzido.

O compartilhamento de dados de classe é suportado com os garbage collectors ZGC, G1, serial e parallel.

A principal motivação para incluir o CDS no Java SE é a diminuição do tempo de inicialização. Quanto menor a aplicação em relação ao número de classes principais que ela utiliza, maior a fração de tempo de inicialização economizada.

O custo de consumo de memória de novas instâncias de JVM foi reduzido de duas maneiras:

  1. Uma parte do arquivo compartilhado no mesmo host é mapeada como somente leitura e compartilhada entre múltiplos processos JVM. Caso contrário, esses dados precisariam ser replicados em cada instância de JVM, o que aumentaria o tempo de inicialização da sua aplicação.

  2. O arquivo compartilhado contém dados de classe no formato que a Java Hotspot VM os utiliza. A memória que de outra forma seria necessária para acessar as informações originais da classe na imagem modular de tempo de execução não é utilizada. Essas economias de memória permitem que mais aplicações sejam executadas simultaneamente no mesmo sistema. Em aplicações Windows, o consumo de memória de um processo, conforme medido por várias ferramentas, pode parecer aumentar, porque mais páginas são mapeadas para o espaço de endereço do processo. Esse aumento é compensado pela quantidade reduzida de memória (dentro do Windows) que é necessária para manter partes da imagem modular de tempo de execução. Reduzir o consumo de memória continua sendo uma alta prioridade.




#### Compartilhamento de Dados de Classe de Aplicação

Para reduzir ainda mais o tempo de inicialização e o consumo de memória, o Compartilhamento de Dados de Classe de Aplicação (AppCDS) foi introduzido, estendendo o CDS para incluir classes selecionadas do classpath da aplicação.

Este recurso permite que classes de aplicação sejam colocadas em um drive compartilhado. Os metadados de classe comuns são compartilhados entre diferentes processos Java. O AppCDS permite que o class loader de sistema embutido, o class loader de plataforma embutido e class loaders personalizados carreguem as classes arquivadas. Quando múltiplas JVMs compartilham o mesmo arquivo de arquivo, a memória é economizada e o tempo de resposta geral do sistema melhora.

Consulte [Compartilhamento de Dados de Classe de Aplicação](<#/>) nas Especificações da Ferramenta do Java Development Kit.

### Controlando Manualmente o Compartilhamento de Dados de Classe

O compartilhamento de dados de classe é habilitado por padrão. Você pode habilitar e desabilitar este recurso manualmente.

Você pode usar as seguintes opções de linha de comando para fins de diagnóstico e depuração.

`-Xshare:off`
    Para desabilitar o compartilhamento de dados de classe.
`-Xshare:on`
    Para habilitar o compartilhamento de dados de classe. Se o compartilhamento de dados de classe não puder ser habilitado, imprima uma mensagem de erro e saia.

Nota:

A opção `-Xshare:on` é apenas para fins de teste. Ela pode fazer com que a VM saia inesperadamente durante a inicialização quando o arquivo CDS não puder ser usado (por exemplo, quando certos parâmetros da VM são alterados, ou quando um JDK diferente é usado). Esta opção não deve ser usada em ambientes de produção.

`-Xshare:auto`
    Para habilitar o compartilhamento de dados de classe por padrão. Habilite o compartilhamento de dados de classe sempre que possível.

Consulte [Usando Arquivos CDS](<#/>) nas Especificações da Ferramenta do Java Development Kit para mais informações.