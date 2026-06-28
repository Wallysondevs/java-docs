# Introdução à Coleta de Lixo

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Visão Geral da Coleta de Lixo em Java ](<#/doc/tutorials/jvm/tool/garbage-collection>) > Introdução à Coleta de Lixo

**Tutorial Atual**

Introdução à Coleta de Lixo

➜

**Próximo na Série**

[Coleta de Lixo em Java](<#/doc/tutorials/jvm/tool/garbage-collection/java-specifics>)

**Próximo na Série:** [Coleta de Lixo em Java](<#/doc/tutorials/jvm/tool/garbage-collection/java-specifics>)

# Introdução à Coleta de Lixo

## Gerenciamento de Memória

O gerenciamento de memória é um aspecto central no desenvolvimento de software. Aplicações criam novos objetos regularmente, e objetos regularmente saem do escopo e não são mais capazes de serem referenciados. Vamos dar uma olhada no que isso significa com um trecho de código:

```java
public class Hello {
    public static void main(String[] args) {
        printHelloMessage();
    }

    public static void printHelloMessage() {
        String message = "hello";
        System.out.println(message);
    }
}
```

No exemplo acima, `message` recebe um valor de referência, uma mensagem "hello", no início de `printHelloMessage()`. Uma vez que o escopo sai de `printHelloMessage()`, o valor de referência atribuído a `message` não é mais alcançável, mas ainda existe na memória. Toda vez que `printHelloMessage()` é executado, um novo valor de referência é atribuído a `message` e a memória é alocada. Se não existir um processo para remover essas referências da memória, eventualmente, a aplicação pode ficar sem memória, pois referências mortas consomem toda a memória disponível.

Em linguagens como C e C++, a remoção de uma referência seria tratada manualmente (ex: chamando `free` ou `delete`). Isso remove a referência da memória, permitindo que a memória seja recuperada pelo sistema para reutilização.

O gerenciamento manual de memória tem algumas vantagens. Os desenvolvedores têm controle preciso sobre quando um objeto é removido. O gerenciamento manual de memória também pode ser mais eficiente, pois nenhum processo em segundo plano está em execução, consumindo recursos do sistema e monitorando o uso da memória. Embora essa vantagem seja menos significativa, já que os sistemas modernos de memória automatizada melhoraram em desempenho.

No entanto, o gerenciamento manual de memória apresenta algumas desvantagens significativas. Com o gerenciamento manual de memória, os desenvolvedores devem saber conscientemente como uma aplicação usa a memória. Isso pode ser demorado e difícil, exigindo que os desenvolvedores adicionem código de controle para a alocação e desalocação seguras de objetos da memória. Esse código de controle pode ser uma distração, pois obscurece o trabalho significativo para o negócio que o código tenta realizar. Um desenvolvedor também pode falhar em lidar adequadamente com as condições de erro, resultando em objetos não sendo excluídos, levando a um memory leak.

O esforço considerável envolvido no gerenciamento manual de memória e o rápido aumento da potência dos computadores levaram a uma transição para o gerenciamento automatizado de memória. Hoje, a maioria das linguagens de programação modernas, incluindo Java, lida com o gerenciamento de memória automaticamente com um garbage collector.

## Gerenciamento de Memória em Java

Em Java, o gerenciamento de memória é tratado por um garbage collector, que faz parte da Java Virtual Machine (JVM). Dentro da JVM, um garbage collector é um processo em segundo plano que monitora objetos na memória. Periodicamente, o garbage collector executará uma coleta de lixo que verifica se os objetos na memória ainda são alcançáveis, remove objetos que não são alcançáveis e reorganiza os objetos que ainda estão vivos para fazer um uso mais eficiente da memória e melhorar futuras coletas de lixo.

Os garbage collectors reduzem consideravelmente a quantidade de tempo e esforço que os desenvolvedores devem dedicar ao gerenciamento de memória. Frequentemente, os desenvolvedores não precisam considerar conscientemente o gerenciamento de memória. A coleta de lixo também ajuda a reduzir drasticamente, embora não elimine, problemas como memory leaks.

Na próxima seção, examinaremos mais a fundo como os garbage collectors se comportam em Java.

### Neste tutorial

Gerenciamento de Memória Gerenciamento de Memória em Java

Última atualização: 6 de março de 2022

**Tutorial Atual**

Introdução à Coleta de Lixo

➜

**Próximo na Série**

[Coleta de Lixo em Java](<#/doc/tutorials/jvm/tool/garbage-collection/java-specifics>)

**Próximo na Série:** [Coleta de Lixo em Java](<#/doc/tutorials/jvm/tool/garbage-collection/java-specifics>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Visão Geral da Coleta de Lixo em Java ](<#/doc/tutorials/jvm/tool/garbage-collection>) > Introdução à Coleta de Lixo