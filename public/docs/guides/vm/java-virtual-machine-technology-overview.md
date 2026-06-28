# Visão Geral da Tecnologia Java Virtual Machine

## 1 Visão Geral da Tecnologia Java Virtual Machine   
  
Este capítulo descreve a implementação da Java Virtual Machine (JVM) e as principais características da tecnologia Java HotSpot:

  * Compilador adaptativo: Um interpretador padrão é usado para iniciar as aplicações. Quando a aplicação é executada, o código é analisado para detectar gargalos de desempenho, ou hot spots. A Java HotSpot VM compila as porções de código críticas para o desempenho para um aumento na performance, mas não compila o código raramente usado (a maior parte da aplicação). A Java HotSpot VM usa o compilador adaptativo para decidir como otimizar o código compilado com técnicas como inlining. 
  * Alocação rápida de memória e garbage collection: A tecnologia Java HotSpot oferece alocação rápida de memória para objetos e garbage collectors rápidos, eficientes e de última geração. 
  * Sincronização de threads: A tecnologia Java HotSpot oferece uma capacidade de manipulação de threads que é projetada para escalar para uso em grandes servidores multiprocessadores com memória compartilhada. 

No Oracle Java Runtime Environment (JRE) 8 e anteriores, diferentes implementações da JVM (a client VM, server VM e minimal VM) eram suportadas para configurações comumente usadas como clientes, como servidores e para sistemas embarcados. Como a maioria dos sistemas agora pode tirar proveito da server VM, apenas essa implementação de VM é fornecida em versões posteriores.