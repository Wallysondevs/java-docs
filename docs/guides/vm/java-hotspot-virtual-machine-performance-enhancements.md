# Aprimoramentos de Desempenho da Java HotSpot Virtual Machine

## 5 Aprimoramentos de Desempenho da Java HotSpot Virtual Machine

Este capítulo descreve os aprimoramentos de desempenho na tecnologia HotSpot Virtual Machine da Oracle.

Tópicos:

  * [Strings Compactas](<#/doc/guides/vm/java-hotspot-virtual-machine-performance-enhancements>)
  * [Compilação em Camadas](<#/doc/guides/vm/java-hotspot-virtual-machine-performance-enhancements>)
  * [Ponteiro de Objeto Comum Comprimido](<#/doc/guides/vm/java-hotspot-virtual-machine-performance-enhancements>)
  * [Ponteiros de Objeto Comum Comprimidos Baseados em Zero](<#/doc/guides/vm/java-hotspot-virtual-machine-performance-enhancements>)
  * [Análise de Escape](<#/doc/guides/vm/java-hotspot-virtual-machine-performance-enhancements>)



### Strings Compactas

O recurso de strings compactas introduz uma representação interna eficiente em termos de espaço para strings.

Dados de diferentes aplicações sugerem que as strings são um componente importante do uso da heap Java e que a maioria dos objetos `java.lang.String` contém apenas caracteres Latin-1. Tais caracteres requerem apenas um byte de armazenamento. Como resultado, metade do espaço nos arrays de caracteres internos dos objetos `java.lang.String` não é utilizada. O recurso de strings compactas, introduzido no Java SE 9, reduz o consumo de memória (memory footprint) e diminui a atividade do garbage collector. Este recurso pode ser desativado se você observar problemas de regressão de desempenho em uma aplicação.

O recurso de strings compactas não introduz novas APIs públicas ou interfaces. Ele modifica a representação interna da classe `java.lang.String` de um array de caracteres UTF-16 (dois bytes) para um array de bytes com um campo adicional para identificar a codificação de caracteres. Outras classes relacionadas a strings, como `AbstractStringBuilder`, `StringBuilder` e `StringBuffer`, são atualizadas para usar uma representação interna semelhante.

No Java SE 9, o recurso de strings compactas é habilitado por padrão. Portanto, a classe `java.lang.String` armazena caracteres como um byte para cada caractere, codificado como Latin-1. O campo adicional de codificação de caracteres indica a codificação utilizada. Os intrinsics de string da HotSpot VM são atualizados e otimizados para suportar a representação interna.

Você pode desativar o recurso de strings compactas usando a flag `-XX:-CompactStrings` com a linha de comando `java`. Quando o recurso é desativado, a classe `java.lang.String` armazena caracteres como dois bytes, codificados como UTF-16, e os intrinsics de string da HotSpot VM usam a codificação UTF-16.

### Compilação em Camadas

A compilação em camadas (tiered compilation), introduzida no Java SE 7, traz as velocidades de inicialização da VM cliente para a VM de servidor. Sem a compilação em camadas, uma VM de servidor usa o interpretador para coletar informações de perfil sobre métodos que são enviadas ao compilador. Com a compilação em camadas, a VM de servidor também usa o compilador cliente para gerar versões compiladas de métodos que coletam informações de perfil sobre si mesmos. O código compilado é substancialmente mais rápido que o interpretador, e o programa é executado com maior desempenho durante a fase de perfil. Frequentemente, a inicialização é mais rápida do que a velocidade de inicialização da VM cliente porque o código final produzido pelo compilador de servidor pode estar disponível durante os estágios iniciais da inicialização da aplicação. A compilação em camadas também pode alcançar um desempenho de pico melhor do que uma VM de servidor regular, porque a fase de perfil mais rápida permite um período mais longo de perfil, o que pode resultar em melhor otimização.

A compilação em camadas é habilitada por padrão para a VM de servidor. O modo de 64 bits e o [Ponteiro de Objeto Comum Comprimido](<#/doc/guides/vm/java-hotspot-virtual-machine-performance-enhancements>) são suportados. Você pode desativar a compilação em camadas usando a flag `-XX:-TieredCompilation` com o comando `java`.

Para acomodar o código de perfil adicional gerado com a compilação em camadas, o tamanho padrão do cache de código é multiplicado por 5x. Para organizar e gerenciar o espaço maior de forma eficaz, é utilizado o [cache de código segmentado](<#/doc/guides/vm/java-hotspot-virtual-machine-performance-enhancements>).

#### Cache de Código Segmentado

O cache de código é a área de memória onde a Java Virtual Machine armazena código nativo gerado. Ele é organizado como uma única estrutura de dados de heap sobre um bloco contíguo de memória.

Em vez de ter uma única heap de código, o cache de código é dividido em segmentos, cada um contendo código compilado de um tipo específico. Essa segmentação proporciona melhor controle do consumo de memória da JVM, encurta o tempo de varredura de métodos compilados, diminui significativamente a fragmentação do cache de código e melhora o desempenho.

O cache de código é dividido nos três segmentos a seguir:

Tabela 5-1 Cache de Código Segmentado

Segmentos do Cache de Código | Descrição | Argumentos de Linha de Comando da JVM
---|---|---
Non-method | Esta heap de código contém código não-método, como buffers do compilador e interpretador de bytecode. Este tipo de código permanece no cache de código para sempre. A heap de código tem um tamanho fixo de 3 MB e o cache de código restante é distribuído uniformemente entre as heaps de código perfiladas e não-perfiladas. | `-XX:NonMethodCodeHeapSize`
Profiled | Esta heap de código contém métodos perfilados, levemente otimizados, com um tempo de vida curto. | `-XX:ProfiledCodeHeapSize`
Non-profiled | Esta heap de código contém métodos não-perfilados, totalmente otimizados, com um tempo de vida potencialmente longo. | `-XX:NonProfiledCodeHeapSize`

### Ponteiro de Objeto Comum Comprimido

Um ponteiro de objeto comum (oop), na linguagem do Java HotSpot, é um ponteiro gerenciado para um objeto. Tipicamente, um oop tem o mesmo tamanho de um ponteiro de máquina nativo, que é de 64 bits em um sistema LP64. Em um sistema ILP32, o tamanho máximo da heap é inferior a 4 gigabytes, o que é insuficiente para muitas aplicações. Em um sistema LP64, a heap usada por um determinado programa pode ter que ser cerca de 1,5 vezes maior do que quando executado em um sistema ILP32. Este requisito se deve ao tamanho expandido dos ponteiros gerenciados. A memória é barata, mas hoje em dia a largura de banda e o cache são escassos, então aumentar significativamente o tamanho da heap e obter apenas um pouco mais do limite de 4 gigabytes é indesejável.

Ponteiros gerenciados na heap Java apontam para objetos que estão alinhados em limites de endereço de 8 bytes. Oops comprimidos representam ponteiros gerenciados (em muitos, mas não em todos os lugares no software da Java Virtual Machine (JVM)) como offsets de objeto de 32 bits a partir do endereço base da heap Java de 64 bits. Como são offsets de objeto em vez de offsets de byte, os oops podem ser usados para endereçar até quatro bilhões de objetos (não bytes), ou um tamanho de heap de até cerca de 32 gigabytes. Para usá-los, eles devem ser escalados por um fator de 8 e adicionados ao endereço base da heap Java para encontrar o objeto ao qual se referem. Os tamanhos de objeto usando oops comprimidos são comparáveis aos do modo ILP32.

O termo decodificar refere-se à operação pela qual um oop comprimido de 32 bits é convertido em um endereço nativo de 64 bits e adicionado à heap gerenciada. O termo codificar refere-se à operação inversa.

Oops comprimidos são suportados e habilitados por padrão no Java SE 6u23 e versões posteriores. No Java SE 7, oops comprimidos são habilitados por padrão para processos JVM de 64 bits quando `-Xmx` não é especificado e para valores de `-Xmx` menores que 32 gigabytes. Para versões do JDK anteriores à 6u23, use a flag `-XX:+UseCompressedOops` com o comando `java` para habilitar os oops comprimidos.

### Ponteiros de Objeto Comum Comprimidos Baseados em Zero

Quando a JVM usa ponteiros de objeto comum comprimidos (oops) em um processo JVM de 64 bits, o software da JVM envia uma solicitação ao sistema operacional para reservar memória para a heap Java começando no endereço virtual zero. Se o sistema operacional suportar tal solicitação e puder reservar memória para a heap Java no endereço virtual zero, então oops comprimidos baseados em zero são usados.

Quando oops comprimidos baseados em zero são usados, um ponteiro de 64 bits pode ser decodificado a partir de um offset de objeto de 32 bits sem incluir o endereço base da heap Java. Para tamanhos de heap menores que 4 gigabytes, o software da JVM pode usar um offset de byte em vez de um offset de objeto e, assim, também evitar escalar o offset por 8. Codificar um endereço de 64 bits em um offset de 32 bits é correspondentemente eficiente.

Para tamanhos de heap Java de até 26 gigabytes, os sistemas operacionais Linux e Windows tipicamente podem alocar a heap Java no endereço virtual zero.

### Análise de Escape

Análise de escape é uma técnica pela qual o Java HotSpot Server Compiler pode analisar o escopo dos usos de um novo objeto e decidir se deve alocar o objeto na heap Java.

A análise de escape é suportada e habilitada por padrão no Java SE 6u23 e versões posteriores.

O Java HotSpot Server Compiler implementa o algoritmo de análise de escape flow-insensitive descrito em:
```
     [Choi99] Jong-Deok Choi, Manish Gupta, Mauricio Seffano,
              Vugranam C. Sreedhar, Sam Midkiff,
              "Escape Analysis for Java", Procedings of ACM SIGPLAN
              OOPSLA  Conference, November 1, 1999
    
```

O estado de escape de um objeto, baseado na análise de escape, pode ser um dos seguintes estados:

  * `GlobalEscape`: O objeto escapa do método e da thread. Por exemplo, um objeto armazenado em um campo estático, armazenado em um campo de um objeto que escapou, ou retornado como resultado do método atual.
  * `ArgEscape`: O objeto é passado como argumento ou referenciado por um argumento, mas não escapa globalmente durante uma chamada. Este estado é determinado pela análise do bytecode do método chamado.
  * `NoEscape`: O objeto é um objeto substituível por escalar, o que significa que sua alocação poderia ser removida do código gerado.

Após a análise de escape, o compilador de servidor elimina as alocações de objetos substituíveis por escalar e os bloqueios associados do código gerado. O compilador de servidor também elimina bloqueios para objetos que não escapam globalmente. Ele não substitui uma alocação de heap por uma alocação de stack para objetos que não escapam globalmente.

Os exemplos a seguir descrevem alguns cenários para análise de escape:

  * O compilador de servidor pode eliminar certas alocações de objetos. Por exemplo, um método faz uma cópia defensiva de um objeto e retorna a cópia para o chamador.
```java
public class Person {
          private String name;
          private int age;
          public Person(String personName, int personAge) {
            name = personName;
                        age = personAge;
          }
                
          public Person(Person p) { this(p.getName(), p.getAge()); }
          public int getName() { return name; }
          public int getAge() { return age; }
        }
        
        public class Employee {
          private Person person;
          
                // makes a defensive copy to protect against modifications by caller
                public Person getPerson() { return new Person(person) };
                
                public void printEmployeeDetail(Employee emp) {
                  Person person = emp.getPerson();
                  // this caller does not modify the object, so defensive copy was unnecessary
                        System.out.println ("Employee's name: " + person.getName() + "; age: "  + person.getAge());     
                }
        }       
                
        
```

O método faz uma cópia para evitar a modificação do objeto original pelo chamador. Se o compilador determinar que o método `getPerson` está sendo invocado em um loop, então o compilador faz o inlining desse método. Usando a análise de escape, quando o compilador determina que o objeto original nunca é modificado, o compilador pode otimizar e eliminar a chamada para fazer uma cópia.

  * O compilador de servidor pode eliminar blocos de sincronização (lock elision) se determinar que um objeto é thread local. Por exemplo, métodos de classes como `StringBuffer` e `Vector` são sincronizados porque podem ser acessados por diferentes threads. No entanto, na maioria dos cenários, eles são usados de forma thread local. Nos casos em que o uso é thread local, o compilador pode otimizar e remover os blocos de sincronização.