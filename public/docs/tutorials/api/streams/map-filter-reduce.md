# Processando Dados em Memória Usando a Stream API

[Home](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A Stream API ](<#/doc/tutorials/api/streams>) > Processando Dados em Memória Usando a Stream API

**Tutorial Atual**

Processando Dados em Memória Usando a Stream API

➜

**Próximo na Série**

[Adicionando Operações Intermediárias em um Stream](<#/doc/tutorials/api/streams/intermediate-operation>)

**Próximo na Série:** [Adicionando Operações Intermediárias em um Stream](<#/doc/tutorials/api/streams/intermediate-operation>)

# Processando Dados em Memória Usando a Stream API

## Introduzindo a Stream API

A Stream API é provavelmente o segundo recurso mais importante adicionado ao Java SE 8, depois das expressões lambda. Em resumo, a Stream API visa fornecer uma implementação do conhecido algoritmo map-filter-reduce ao JDK.

O Collections Framework trata de armazenar e organizar seus dados na memória da sua JVM. Você pode ver a Stream API como um framework complementar ao Collections Framework, para processar esses dados de uma forma muito eficiente. De fato, você pode abrir um stream em uma collection para processar os dados que ela contém.

Não para por aqui: a Stream API pode fazer muito mais por você do que apenas processar dados de suas collections. O JDK oferece vários padrões para criar streams em outras fontes, incluindo fontes de I/O. Além disso, você pode criar suas próprias fontes de dados para se adequar perfeitamente às suas necessidades, com pouco esforço.

Quando você domina a Stream API, você é capaz de escrever código muito expressivo. Aqui está um pequeno trecho de código, que você pode compilar com os imports estáticos corretos:

```java
import static java.util.stream.Collectors.counting;
import static java.util.stream.Collectors.groupingBy;

import java.util.List;
import java.util.Map;

public class GroupingStrings {

    public static void main(String[] args) {
        List<String> strings = List.of("one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten");
        Map<Integer, Long> result = strings.stream()
                .collect(groupingBy(String::length, counting()));
        System.out.println(result);
    }
}
```

O agrupamento das strings funciona em três etapas.

1.  Ele agrupa as strings pelo seu comprimento com `String::length`.
2.  Em seguida, ele conta o número de strings para cada comprimento com [`counting()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#counting\(\)>).
3.  Em seguida, ele cria um [`Map<Integer, Long>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>) para armazenar o resultado.

A execução deste código produz o seguinte resultado.

```
{3=3, 4=2, 5=2, 6=1, 7=1, 8=1}
```

Mesmo que você não esteja familiarizado com a Stream API, ler o código que a utiliza lhe dá uma ideia do que ele está fazendo à primeira vista.

## Introduzindo o Algoritmo Map-Filter-Reduce

Antes de mergulhar na Stream API em si, vamos ver os elementos do algoritmo map-filter-reduce que você vai precisar.

Este algoritmo é um algoritmo muito clássico para processar dados. Vamos pegar um exemplo. Suponha que você tenha um conjunto de objetos `Sale` com três propriedades: uma data, uma referência de produto e um valor. Para simplificar, vamos supor que o valor é apenas um inteiro. Aqui está sua classe `Sale`. Nós a escrevemos como um record para simplificar. Você pode aprender mais sobre classes Record nesta [página](<#/doc/tutorials/records>).

```java
import java.time.LocalDate;

public record Sale(LocalDate date, String productRef, int amount) {
}
```

Suponha que você precise calcular o valor total das vendas em outubro. Você provavelmente escreverá o seguinte código.

```java
import java.time.LocalDate;
import java.time.Month;
import java.util.List;

public class SalesProcessor {

    public static void main(String[] args) {
        List<Sale> sales = List.of(
                new Sale(LocalDate.of(2023, Month.OCTOBER, 1), "A", 100),
                new Sale(LocalDate.of(2023, Month.SEPTEMBER, 15), "B", 200),
                new Sale(LocalDate.of(2023, Month.OCTOBER, 20), "C", 50),
                new Sale(LocalDate.of(2023, Month.NOVEMBER, 5), "D", 150)
        );

        int totalAmount = 0;
        for (Sale sale : sales) {
            if (sale.date().getMonth() == Month.OCTOBER) {
                totalAmount += sale.amount();
            }
        }
        System.out.println("Total sales in October: " + totalAmount);
    }
}
```

Você pode ver três etapas neste algoritmo simples de processamento de dados.

A primeira etapa consiste em levar em consideração apenas as vendas que ocorreram em outubro. Você está _filtrando_ alguns elementos que está processando, com base em um determinado critério. Esta é precisamente a etapa de filtragem.

A segunda etapa consiste em extrair uma propriedade do objeto `sale`. Você não está interessado no objeto inteiro; o que você precisa é da sua propriedade `amount`. Você está _mapeando_ o objeto `sale` para um valor, ou seja, um valor `int`. Esta é a etapa de mapeamento; ela consiste em transformar os objetos que você está processando em outros objetos ou valores.

A última etapa consiste em somar todos esses valores em um único valor. Se você está familiarizado com a linguagem SQL, pode ver que esta última etapa se parece com uma agregação. De fato, ela faz o mesmo. Esta soma é uma _redução_ dos valores individuais em um único valor.

A propósito, a linguagem SQL faz um trabalho muito bom ao expressar esse tipo de processamento de forma legível. O código SQL que você precisa é realmente muito fácil de ler:

```sql
SELECT SUM(amount)
FROM Sale
WHERE MONTH(date) = 10;
```

## Especificando um Resultado em Vez de Programar um Algoritmo

Você pode ver que em SQL, o que você está escrevendo é uma descrição do resultado que você precisa: a soma dos valores de todas as vendas realizadas em março. É responsabilidade do seu servidor de banco de dados descobrir como calcular isso de forma eficiente.

O trecho de código Java que calcula esse valor é uma descrição passo a passo de como esse valor é calculado. Ele é descrito precisamente, de forma imperativa. Isso deixa pouco espaço para o runtime Java otimizar essa computação.

Dois dos objetivos da Stream API são permitir que você crie um código mais legível e expressivo e dar ao runtime Java alguma margem para otimizar suas computações.

## Mapeando Objetos para Outros Objetos ou Valores

A primeira etapa do algoritmo map-filter-reduce é a etapa de _mapeamento_. Um mapeamento consiste em transformar os objetos ou os valores que você está processando. Um mapeamento é uma transformação um-para-um: se você mapear uma lista de 10 objetos, você obterá uma lista de 10 objetos transformados.

Na Stream API, a etapa de mapeamento adiciona mais uma restrição. Suponha que você esteja processando uma collection de objetos _ordenados_. Pode ser uma lista, ou alguma outra fonte de objetos ordenados. Quando você mapeia essa lista, o primeiro objeto que você obtém deve ser o mapeamento do primeiro objeto da fonte. Em outras palavras: a etapa de mapeamento respeita a ordem dos seus objetos; ela não os embaralha.

> Um mapeamento altera os tipos de objetos; ele não altera o número deles.

Um mapeamento é modelado pela interface funcional [`Function`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Function.html>). De fato, uma função pode receber qualquer tipo de objeto e retornar um objeto de outro tipo. Além disso, funções especializadas podem mapear objetos para tipos primitivos e vice-versa.

## Filtrando Objetos

Por outro lado, a filtragem não toca nos objetos que você está processando. Ela apenas decide selecionar alguns deles e remover os outros.

> Uma filtragem altera o número de objetos; ela não altera o tipo deles.

Uma filtragem é modelada pela interface funcional [`Predicate`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Predicate.html>). De fato, um predicate pode receber qualquer tipo de objeto ou tipo primitivo e retornar um valor booleano.

## Reduzindo Objetos para Produzir um Resultado

A etapa de redução é mais complexa do que parece. Por enquanto, vamos nos contentar com esta definição, de que é o mesmo tipo de coisa que uma agregação SQL. Pense em _COUNT_ , _SUM_ , _MIN_ , _MAX_ , _AVERAGE_. A propósito, todas essas agregações são suportadas pela Stream API.

Apenas para lhe dar uma dica do que o espera neste caminho: a etapa de redução permite construir estruturas complexas com seus dados, incluindo listas, sets, maps de qualquer tipo, ou até mesmo estruturas que você pode construir por conta própria. Basta dar uma olhada no primeiro exemplo desta página: você pode ver uma chamada para um método [`collect()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#collect\(java.util.stream.Collector\)>), que recebe um objeto construído por um método de fábrica [`groupingBy()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#groupingBy\(java.util.function.Function,java.util.stream.Collector\)>). Este objeto é um [`Collector`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collector.html>). A redução pode consistir em coletar seus dados usando um collector. Collectors são abordados em detalhes mais adiante neste tutorial.

## Otimizando o Algoritmo Map-Filter-Reduce

Vamos pegar outro exemplo. Suponha que você tenha uma collection de cidades. Cada cidade é modelada por uma classe `City`, que possui duas propriedades: um nome e uma população, ou seja, o número de pessoas que vivem nela. Você precisa calcular a população total que vive em cidades com mais de 100 mil habitantes.

Sem usar a Stream API, você provavelmente escreverá o seguinte código.

```java
import java.util.List;

public class City {
    private String name;
    private int population;

    public City(String name, int population) {
        this.name = name;
        this.population = population;
    }

    public String getName() { return name; }
    public int getPopulation() { return population; }

    public static void main(String[] args) {
        List<City> cities = List.of(
                new City("New York", 8000000),
                new City("London", 9000000),
                new City("Paris", 2000000),
                new City("Tokyo", 14000000),
                new City("Brasilia", 3000000),
                new City("Smallville", 50000)
        );

        int totalPopulation = 0;
        for (City city : cities) {
            if (city.getPopulation() > 100_000) {
                totalPopulation += city.getPopulation();
            }
        }
        System.out.println("Total population in large cities: " + totalPopulation);
    }
}
```

Você pode reconhecer outro processamento map-filter-reduce em uma lista de cidades.

Agora, vamos fazer um pequeno experimento mental: suponha que a Stream API não exista, e que um método `map()` e um método `filter()` existam na interface [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>), assim como um método [`sum()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/IntStream.html#sum\(\)>).

Com esses métodos (fictícios), o código anterior poderia se tornar o seguinte.

```java
// Este código é hipotético e não compilaria
import java.util.List;
import java.util.Collection; // Supondo que Collection tenha map e filter

public class City {
    private String name;
    private int population;

    public City(String name, int population) {
        this.name = name;
        this.population = population;
    }

    public String getName() { return name; }
    public int getPopulation() { return population; }

    public static void main(String[] args) {
        List<City> cities = List.of(
                new City("New York", 8000000),
                new City("London", 9000000),
                new City("Paris", 2000000),
                new City("Tokyo", 14000000),
                new City("Brasilia", 3000000),
                new City("Smallville", 50000)
        );

        // Código hipotético
        int totalPopulation = cities.map(City::getPopulation)
                                    .filter(p -> p > 100_000)
                                    .sum();
        System.out.println("Total population in large cities: " + totalPopulation);
    }
}
```

Do ponto de vista de legibilidade e expressividade, este código é muito fácil de entender. Então você pode estar se perguntando: por que esses métodos map e filter não foram adicionados à interface [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>)?

Vamos aprofundar um pouco mais: qual seria o tipo de retorno desses métodos `map()` e `filter()`? Bem, como estamos no Collections Framework, retornar uma collection parece natural. Então você poderia escrever este código desta forma.

```java
// Este código é hipotético e não compilaria
import java.util.List;
import java.util.Collection; // Supondo que Collection tenha map e filter

public class City {
    private String name;
    private int population;

    public City(String name, int population) {
        this.name = name;
        this.population = population;
    }

    public String getName() { return name; }
    public int getPopulation() { return population; }

    public static void main(String[] args) {
        List<City> cities = List.of(
                new City("New York", 8000000),
                new City("London", 9000000),
                new City("Paris", 2000000),
                new City("Tokyo", 14000000),
                new City("Brasilia", 3000000),
                new City("Smallville", 50000)
        );

        // Código hipotético
        Collection<Integer> populations = cities.map(City::getPopulation);
        Collection<Integer> filteredPopulations = populations.filter(p -> p > 100_000);
        int totalPopulation = 0;
        for (int p : filteredPopulations) {
            totalPopulation += p;
        }
        System.out.println("Total population in large cities: " + totalPopulation);
    }
}
```

Mesmo que o encadeamento de chamadas melhore a legibilidade, este código ainda deve estar correto.

Agora vamos analisar este código.

*   A primeira etapa é a etapa de mapeamento. Você viu que se você tiver que processar 1.000 cidades, então esta etapa de mapeamento produz 1.000 inteiros e os coloca em uma collection.
*   A segunda etapa é a etapa de filtragem. Ela percorre todos os elementos e remove alguns deles seguindo o critério dado. São mais 1.000 elementos para testar e outra collection para criar, provavelmente menor.

Como este código retorna uma collection, ele mapeia todas as cidades e depois filtra a collection resultante de inteiros. Isso funciona de forma muito diferente do _loop for_ que você escreveu inicialmente. Armazenar esta collection intermediária de inteiros pode resultar em muita sobrecarga, especialmente se você tiver muitas cidades para processar. O loop for não tem essa sobrecarga: ele soma diretamente os inteiros no resultado, sem armazená-los em uma estrutura intermediária.

Essa sobrecarga é ruim, e há casos em que pode ser ainda pior. Suponha que você precise saber se há cidades com mais de 100 mil habitantes na collection. Talvez a primeira cidade da collection seja uma dessas cidades. Nesse caso, você será capaz de produzir um resultado com quase nenhum esforço. Primeiro, construir a collection de todas as populações de suas cidades, depois filtrá-la e verificar se o resultado está vazio ou não seria ridículo.

Por razões óbvias de desempenho, criar um método `map()` que retornaria uma [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>) na interface [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>) não é o caminho certo. Você acabaria criando estruturas intermediárias desnecessárias com uma alta sobrecarga tanto na memória quanto na CPU.

Esta é a razão pela qual os métodos `map()` e `filter()` não foram adicionados à interface [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>). Em vez disso, eles foram criados na interface [`Stream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html>).

O padrão correto é o seguinte.

```java
import java.util.List;

public class City {
    private String name;
    private int population;

    public City(String name, int population) {
        this.name = name;
        this.population = population;
    }

    public String getName() { return name; }
    public int getPopulation() { return population; }

    public static void main(String[] args) {
        List<City> cities = List.of(
                new City("New York", 8000000),
                new City("London", 9000000),
                new City("Paris", 2000000),
                new City("Tokyo", 14000000),
                new City("Brasilia", 3000000),
                new City("Smallville", 50000)
        );

        int totalPopulation = cities.stream()
                                    .mapToInt(City::getPopulation)
                                    .filter(p -> p > 100_000)
                                    .sum();
        System.out.println("Total population in large cities: " + totalPopulation);
    }
}
```

A interface [`Stream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html>) evita a criação de estruturas intermediárias para armazenar objetos mapeados ou filtrados. Aqui, os métodos [`map()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#map\(java.util.function.Function\)>) e [`filter()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#filter\(java.util.function.Predicate\)>) ainda estão retornando novos streams. Portanto, para que este código funcione e seja eficiente, nenhum dado deve ser armazenado nesses streams. Os streams criados neste código, `streamOfCities`, `populations` e `filteredPopulations` devem ser todos objetos vazios.

Isso leva a uma propriedade muito importante dos streams:

> Um stream é um objeto que não armazena nenhum dado.

A Stream API foi projetada de tal forma que, enquanto você não criar nenhum objeto não-stream em um padrão de stream, nenhuma computação de seus dados será realizada. No exemplo anterior, você está calculando a soma dos elementos processados pelo seu stream.

Esta operação de soma aciona a computação: todos os objetos da lista `cities` são puxados um por um através de todas as operações do stream. Primeiro eles são mapeados, depois filtrados e somados se passarem pela etapa de filtragem.

Um stream processa os dados na mesma ordem como se você escrevesse um loop for equivalente. Desta forma, não há sobrecarga de memória. Além disso, há casos em que você pode produzir um resultado sem ter que percorrer todos os elementos da sua collection.

Usar streams é sobre criar pipelines de operações. Em algum momento, seus dados viajarão por este pipeline e serão transformados, filtrados e, em seguida, participarão da produção de um resultado.

Um pipeline é composto por uma série de chamadas de método em um stream. Cada chamada produz outro stream. Então, em algum momento, uma última chamada produz um resultado. Uma operação que retorna outro stream é chamada de operação intermediária. Por outro lado, uma operação que retorna outra coisa, incluindo void, é chamada de operação terminal.

## Criando um Pipeline com Operações Intermediárias

Uma operação intermediária é uma operação que retorna outro stream. Invocar tal operação adiciona mais uma operação a um pipeline de operações existente sem processar nenhum dado. Ela é modelada por um método que retorna um stream.

## Calculando um Resultado com uma Operação Terminal

Uma operação terminal é uma operação que não retorna um stream. Invocar tal operação aciona o consumo dos elementos da fonte do stream. Esses elementos são então processados pelo pipeline de operações intermediárias, um elemento por vez.

Uma operação terminal é modelada por um método que retorna qualquer coisa, exceto um stream, incluindo void.

Você não pode chamar mais de um método intermediário ou terminal em uma dada instância de stream. Se você fizer isso, você receberá uma [`IllegalStateException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/IllegalStateException.html>) com a seguinte mensagem: "stream has already been operated upon or closed", como no exemplo a seguir. Você não pode chamar o método `toList()` em `stream`, porque você já chamou `map()` nele.

```java
import java.util.List;
import java.util.stream.Stream;

public class StreamError {

    public static void main(String[] args) {
        Stream<String> stream = List.of("one", "two", "three").stream();
        stream.map(String::toUpperCase); // Operação intermediária
        // stream.toList(); // Isso causaria IllegalStateException
    }
}
```

## Evitando Boxing com Streams Especializados de Números

A Stream API oferece quatro interfaces.

A primeira é [`Stream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html>), que você pode usar para definir pipelines de operações em qualquer tipo de objeto.

Em seguida, existem três interfaces especializadas para lidar com streams de números: [`IntStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/IntStream.html>), [`LongStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/LongStream.html>) e [`DoubleStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/DoubleStream.html>). Esses três streams usam tipos primitivos para números em vez dos tipos wrapper para evitar boxing e unboxing. Eles têm quase os mesmos métodos que os métodos definidos em [`Stream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html>), com algumas exceções. Como eles lidam com números, eles têm algumas operações terminais que não existem em [`Stream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html>):

*   [`sum()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/IntStream.html#sum\(\)>): para calcular a soma
*   [`min()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/IntStream.html#min\(\)>), [`max()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/IntStream.html#max\(\)>): para calcular o número mínimo ou máximo de um stream
*   [`average()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/IntStream.html#average\(\)>): para calcular o valor médio dos números
*   [`summaryStatistics()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/IntStream.html#summaryStatistics\(\)>): esta chamada produz um objeto especial que contém várias estatísticas, todas calculadas em uma única passagem sobre seus dados. Essas estatísticas são o número de elementos processados por esse stream, o mínimo, o máximo, a soma e a média.

## Seguindo Boas Práticas

Como você viu, é permitido chamar apenas um método em um stream, mesmo que este método seja intermediário. Portanto, é inútil, e às vezes perigoso, armazenar streams em campos ou variáveis locais. Escrever métodos que recebem streams como argumentos também pode ser perigoso, porque você não pode ter certeza de que o stream que você recebe ainda não foi operado. Um stream deve ser criado e consumido no local.

Um stream é um objeto conectado a uma fonte. Ele puxa os elementos que processa desta fonte. Esta fonte não deve ser modificada pelo próprio stream. Fazer isso levará a resultados não especificados. Em alguns casos, esta fonte é imutável ou somente leitura, então você não será capaz de fazer isso, mas há casos em que você poderia.

Existem muitos métodos disponíveis na interface [`Stream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html>), e você verá a maioria deles neste tutorial. Escrever uma operação que modifica algumas variáveis ou campos fora do próprio stream é uma má ideia que sempre pode ser evitada. Um stream não deve ter nenhum _efeito colateral_.

### Neste tutorial

Introduzindo a Stream API Introduzindo o Algoritmo Map-Filter-Reduce Especificando um Resultado em Vez de Programar um Algoritmo Mapeando Objetos para Outros Objetos ou Valores Filtrando Objetos Reduzindo Objetos para Produzir um Resultado Otimizando o Algoritmo Map-Filter-Reduce Criando um Pipeline com Operações Intermediárias Calculando um Resultado com uma Operação Terminal Evitando Boxing com Streams Especializados de Números Seguindo Boas Práticas

Última atualização: 14 de setembro de 2021

**Tutorial Atual**

Processando Dados em Memória Usando a Stream API

➜

**Próximo na Série**

[Adicionando Operações Intermediárias em um Stream](<#/doc/tutorials/api/streams/intermediate-operation>)

**Próximo na Série:** [Adicionando Operações Intermediárias em um Stream](<#/doc/tutorials/api/streams/intermediate-operation>)

[Home](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A Stream API ](<#/doc/tutorials/api/streams>) > Processando Dados em Memória Usando a Stream API