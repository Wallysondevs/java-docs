# Usando Records para Modelar Dados Imutáveis

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > Usando Records para Modelar Dados Imutáveis

# Usando Records para Modelar Dados Imutáveis

A linguagem Java oferece várias maneiras de criar uma classe imutável. Provavelmente a maneira mais direta é criar uma classe final com campos final e um construtor para inicializar esses campos. Aqui está um exemplo de tal classe.

```java
class Point {
    private final int x;
    private final int y;

    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }
}
```

Agora que você escreveu esses elementos, precisa adicionar os acessores para seus campos. Você também adicionará um método [`toString()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#toString\(\)>) e provavelmente um [`equals()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#equals\(java.lang.Object\)>) juntamente com um método [`hashCode()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#hashCode\(\)>). Escrever tudo isso manualmente é bastante tedioso e propenso a erros; felizmente, sua IDE está lá para gerar esses métodos para você.

Se você precisar transportar as instâncias desta classe de uma aplicação para outra, seja enviando-as por uma rede ou através de um sistema de arquivos, você também pode considerar tornar esta classe serializable. Se o fizer, pode ser necessário adicionar algumas informações sobre como as instâncias desta classe são serializadas. O JDK oferece várias maneiras de controlar a serialização.

No final, sua classe `Point` pode ter cem linhas, a maioria preenchida com código gerado pela sua IDE, apenas para modelar uma agregação imutável de dois inteiros que você precisa gravar em um arquivo.

Records foram adicionados ao JDK para mudar isso. Records oferecem tudo isso com uma única linha de código. Tudo o que você precisa fazer é declarar o estado de um record; o restante é gerado para você pelo compilador.

## Records ao Resgate

Records estão aqui para ajudar você a tornar este código muito mais simples. A partir do Java SE 14, você pode escrever o seguinte código.

```java
record Point(int x, int y) {}
```

Esta única linha de código cria os seguintes elementos para você.

1.  É uma classe imutável com dois campos: `x` e `y`, do tipo `int`.
2.  Possui um construtor canônico, para inicializar esses dois campos.
3.  Os métodos [`toString()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#toString\(\)>), [`equals()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#equals\(java.lang.Object\)>) e [`hashCode()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#hashCode\(\)>) foram criados para você pelo compilador com um comportamento padrão que corresponde ao que uma IDE teria gerado. Você pode modificar esse comportamento, se necessário, adicionando suas próprias implementações desses métodos.
4.  Pode implementar a interface [`Serializable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/Serializable.html>), para que você possa enviar instâncias de `Point` para outras aplicações por uma rede ou através de um sistema de arquivos. A forma como um record é serializado e desserializado segue algumas regras especiais que são abordadas no final deste tutorial.

Records estão tornando a criação de agregados imutáveis de dados muito mais simples, sem a ajuda de nenhuma IDE. Isso reduz o risco de bugs porque, toda vez que você modifica os componentes de um record, o compilador atualiza automaticamente os métodos [`equals()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#equals\(java.lang.Object\)>) e [`hashCode()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#hashCode\(\)>) para você.

## A Classe de um Record

Um record é uma classe declarada com a palavra-chave `record` em vez da palavra-chave `class`. Vamos declarar o seguinte record.

```java
record Point(int x, int y) {}
```

A classe que o compilador cria para você quando você cria um record é final.

Esta classe estende a classe [`java.lang.Record`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Record.html>). Portanto, seu record não pode estender nenhuma classe.

Um record pode implementar qualquer número de interfaces.

```java
record Point(int x, int y) implements Comparable<Point> {
    @Override
    public int compareTo(Point o) {
        return Integer.compare(x, o.x);
    }
}
```

## Declarando os Componentes de um Record

O bloco que segue imediatamente o nome do record é `(int x, int y)`. Ele declara os _componentes_ do record chamado `Point`. Para cada componente de um record, o compilador cria um campo private final com o mesmo nome deste componente. Você pode ter qualquer número de componentes declarados em um record.

```java
record Point(int x, int y) {}
```

Neste exemplo, o compilador cria dois campos private final do tipo `int`: `x` e `y`, correspondendo aos dois componentes que você declarou.

Juntamente com esses campos, o compilador gera um _acessor_ para cada componente. Este acessor é um método que tem o mesmo nome do componente e retorna seu valor. No caso deste record `Point`, os dois métodos gerados são os seguintes.

```java
public int x() {
    return this.x;
}

public int y() {
    return this.y;
}
```

Se esta implementação funcionar para sua aplicação, então você não precisa adicionar nada. No entanto, você pode definir seus próprios métodos acessores. Isso pode ser útil no caso em que você precisa retornar uma cópia defensiva de um campo específico.

```java
record Point(int x, int y) {
    public int x() {
        System.out.println("Returning x");
        return x;
    }
}
```

Os últimos elementos gerados para você pelo compilador são as sobrescritas dos métodos [`toString()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#toString\(\)>), [`equals()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#equals\(java.lang.Object\)>) e [`hashCode()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#hashCode\(\)>) da classe [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>). Você pode definir suas próprias sobrescritas desses métodos, se necessário.

```java
record Point(int x, int y) {
    @Override
    public String toString() {
        return "Point(" + x + ", " + y + ")";
    }
}
```

## Coisas que Você Não Pode Adicionar a um Record

Existem três coisas que você não pode adicionar a um record:

1.  Você não pode declarar nenhum campo de instância em um record. Você não pode adicionar nenhum campo de instância que não corresponda a um componente.
2.  Você não pode definir nenhum inicializador de campo.
3.  Você não pode adicionar nenhum inicializador de instância.

Você pode criar campos static com inicializadores e inicializadores static.

```java
record Point(int x, int y) {
    static int originX = 0;
    static {
        System.out.println("Point record initialized");
    }
}
```

## Construindo um Record com seu Construtor Canônico

O compilador também cria um construtor para você, chamado de _construtor canônico_. Este construtor recebe os componentes do seu record como argumentos e copia seus valores para os campos da classe record.

```java
public Point(int x, int y) {
    this.x = x;
    this.y = y;
}
```

Existem situações em que você precisa sobrescrever este comportamento padrão. Vamos examinar dois casos de uso:

1.  Você precisa validar o estado do seu record
2.  Você precisa fazer uma cópia defensiva de um componente mutável.

## Usando o Construtor Compacto

Você pode usar duas sintaxes diferentes para redefinir o construtor canônico de um record. Você pode usar um construtor compacto ou o próprio construtor canônico.

Suponha que você tenha o seguinte record.

```java
record Range(int start, int end) {}
```

Para um record com esse nome, seria de se esperar que o `end` fosse maior que o `start`. Você pode adicionar uma regra de validação escrevendo o construtor compacto em seu record.

```java
record Range(int start, int end) {
    public Range {
        if (start > end) {
            throw new IllegalArgumentException("start cannot be greater than end");
        }
    }
}
```

O construtor canônico compacto não precisa declarar seu bloco de parâmetros.

Observe que, se você escolher esta sintaxe, não poderá atribuir diretamente os campos do record, por exemplo com `this.start = start` - isso é feito para você pelo código adicionado pelo compilador. Mas você pode atribuir novos valores aos parâmetros, o que leva ao mesmo resultado porque o código gerado pelo compilador atribuirá esses novos valores aos campos.

```java
record Range(int start, int end) {
    public Range {
        if (start > end) {
            int temp = start;
            start = end;
            end = temp;
        }
    }
}
```

## Usando o Construtor Canônico

Se você preferir a forma não compacta, por exemplo, porque prefere não reatribuir parâmetros, você pode definir o construtor canônico você mesmo, como no exemplo a seguir.

```java
record Range(int start, int end) {
    public Range(int start, int end) {
        if (start > end) {
            throw new IllegalArgumentException("start cannot be greater than end");
        }
        this.start = start;
        this.end = end;
    }
}
```

Neste caso, o construtor que você escreve precisa atribuir valores aos campos do seu record.

Se os componentes do seu record não forem imutáveis, você deve considerar fazer cópias defensivas deles tanto no construtor canônico quanto nos acessores.

## Definindo Qualquer Construtor

Você também pode adicionar qualquer construtor a um record, desde que este construtor chame o construtor canônico do seu record. A sintaxe é a mesma da sintaxe clássica que chama um construtor com outro construtor. A partir do JDK 25, você pode adicionar algumas instruções antes da chamada a `this()` com restrições.

Vamos examinar o seguinte record `State`. Ele é definido em três componentes:

1.  o nome deste estado
2.  o nome da capital deste estado
3.  uma lista de nomes de cidades, que pode estar vazia.

```java
record State(String name, String capital, List<String> cities) {}
```

Precisamos armazenar uma cópia defensiva da lista de cidades, para garantir que ela não será modificada de fora deste record. Isso pode ser feito redefinindo o construtor canônico com uma forma compacta que reatribui o parâmetro à cópia defensiva.

```java
import java.util.List;

record State(String name, String capital, List<String> cities) {
    public State {
        cities = List.copyOf(cities);
    }
}
```

Ter um construtor que não recebe esta lista de cidades pode ser útil em sua aplicação. Este pode ser outro construtor, que recebe apenas o nome do estado e o nome da capital. Este segundo construtor deve chamar o construtor canônico.

```java
import java.util.List;

record State(String name, String capital, List<String> cities) {
    public State {
        cities = List.copyOf(cities);
    }

    public State(String name, String capital) {
        this(name, capital, List.of());
    }
}
```

Então, em vez de passar uma lista de cidades, você pode passar as cidades como um vararg. Para fazer isso, você pode criar um terceiro construtor, que deve chamar o construtor canônico com a lista apropriada.

```java
import java.util.List;

record State(String name, String capital, List<String> cities) {
    public State {
        cities = List.copyOf(cities);
    }

    public State(String name, String capital) {
        this(name, capital, List.of());
    }

    public State(String name, String capital, String... cities) {
        this(name, capital, List.of(cities));
    }
}
```

Observe que o método [`List.copyOf()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html#copyOf\(java.util.Collection\)>) não aceita valores nulos na coleção que recebe como argumento.

## Obtendo o Estado de um Record

Você não precisa adicionar nenhum acessor a um record, porque o compilador faz isso por você. Um record possui um método acessor por componente, que tem o nome deste componente.

```java
record Point(int x, int y) {}

Point p = new Point(10, 20);
int x = p.x();
int y = p.y();
```

O record `Point` da primeira seção deste tutorial possui dois métodos acessores: `x()` e `y()` que retornam o valor dos componentes correspondentes.

Existem casos em que você precisa definir seus próprios acessores, no entanto. Por exemplo, suponha que o record `State` da seção anterior não tenha criado uma cópia defensiva imutável da lista `cities` durante a construção - então ele deveria fazer isso no acessor para garantir que os chamadores não possam mutar seu estado interno. Você pode adicionar o seguinte código em seu record `State` para retornar esta cópia defensiva.

```java
import java.util.List;

record State(String name, String capital, List<String> cities) {
    public State {
        cities = List.copyOf(cities);
    }

    public List<String> cities() {
        return List.copyOf(cities);
    }
}
```

## Serializando Records

Records podem ser serializados e desserializados se sua classe record implementar [`Serializable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/Serializable.html>). No entanto, existem restrições.

1.  Nenhum dos sistemas que você pode usar para substituir o processo de serialização padrão está disponível para records. Criar um método [`writeObject()`](<https://docs.oracle.com/en/java/javase/26/docs/specs/serialization/output.html#the-writeobject-method>) e [`readObject()`](<https://docs.oracle.com/en/java/javase/26/docs/specs/serialization/input.html#the-readobject-method>) não tem efeito, nem implementar [`Externalizable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/Externalizable.html>).
2.  Records podem ser usados como objetos proxy para serializar outros objetos. Um método [`readResolve()`](<https://docs.oracle.com/en/java/javase/26/docs/specs/serialization/input.html#the-readresolve-method>) pode retornar um record. Adicionar um [`writeReplace()`](<https://docs.oracle.com/en/java/javase/26/docs/specs/serialization/output.html#the-writereplace-method>) em um record também é possível.
3.  Desserializar um record _sempre_ chama o construtor canônico. Assim, todas as regras de validação que você possa adicionar neste construtor serão aplicadas ao desserializar um record.

Isso torna os records uma excelente escolha para criar objetos de transporte de dados em sua aplicação.

## Usando Records em um Caso de Uso Real

Records são um conceito versátil que você pode usar em muitos contextos.

O primeiro é para transportar dados no modelo de objeto da sua aplicação. Você pode usar records para o que eles foram projetados: atuar como um portador de dados imutável.

Como você pode declarar records locais, você também pode usá-los para melhorar a legibilidade do seu código.

Vamos considerar o seguinte caso de uso. Você tem duas entidades modeladas como records: `City` e `State`.

```java
import java.util.List;

record City(String name, State state) {}
record State(String name, String capital, List<String> cities) {}
```

Suponha que você tenha uma lista de cidades e precise calcular o estado que possui o maior número de cidades. Você pode usar a Stream API para primeiro construir o histograma dos estados com o número de cidades que cada um possui. Este histograma é modelado por um [`Map`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>).

```java
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

record City(String name, State state) {}
record State(String name, String capital, List<String> cities) {}

public class CityAnalyzer {
    public static void main(String[] args) {
        State california = new State("California", "Sacramento", List.of("Los Angeles", "San Francisco"));
        State texas = new State("Texas", "Austin", List.of("Houston", "Dallas", "San Antonio"));
        State newYork = new State("New York", "Albany", List.of("New York City", "Buffalo"));

        List<City> cities = List.of(
            new City("Los Angeles", california),
            new City("San Francisco", california),
            new City("Houston", texas),
            new City("Dallas", texas),
            new City("San Antonio", texas),
            new City("New York City", newYork),
            new City("Buffalo", newYork)
        );

        Map<State, Long> numberOfCitiesPerState = cities.stream()
            .collect(Collectors.groupingBy(City::state, Collectors.counting()));

        System.out.println(numberOfCitiesPerState);
    }
}
```

Obter o máximo deste histograma é o seguinte código genérico. Observe que este exemplo não gerencia empates: se vários estados tivessem o mesmo número de cidades, apenas um record `NumberOfCitiesPerState` com um único estado seria reportado.

```java
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

record City(String name, State state) {}
record State(String name, String capital, List<String> cities) {}

public class CityAnalyzer {
    public static void main(String[] args) {
        State california = new State("California", "Sacramento", List.of("Los Angeles", "San Francisco"));
        State texas = new State("Texas", "Austin", List.of("Houston", "Dallas", "San Antonio"));
        State newYork = new State("New York", "Albany", List.of("New York City", "Buffalo"));

        List<City> cities = List.of(
            new City("Los Angeles", california),
            new City("San Francisco", california),
            new City("Houston", texas),
            new City("Dallas", texas),
            new City("San Antonio", texas),
            new City("New York City", newYork),
            new City("Buffalo", newYork)
        );

        Map<State, Long> numberOfCitiesPerState = cities.stream()
            .collect(Collectors.groupingBy(City::state, Collectors.counting()));

        Optional<Map.Entry<State, Long>> max = numberOfCitiesPerState.entrySet()
            .stream()
            .max(Comparator.comparingLong(Map.Entry::getValue));

        max.ifPresent(entry -> System.out.println("State with most cities: " + entry.getKey().name() + " with " + entry.getValue() + " cities."));
    }
}
```

Esta última parte do código é técnica; não carrega nenhum significado de negócio; porque usa uma instância de [`Map.Entry`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>) para modelar cada elemento do histograma.

Usar um record local pode melhorar muito esta situação. O código a seguir cria uma nova classe record, que agrega um estado e o número de cidades neste estado. Ele possui um construtor que recebe uma instância de [`Map.Entry`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>) como parâmetro, para mapear o stream de pares chave-valor para um stream de records.

```java
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Comparator;
import java.util.stream.Collectors;

record City(String name, State state) {}
record State(String name, String capital, List<String> cities) {}

public class CityAnalyzer {
    public static void main(String[] args) {
        State california = new State("California", "Sacramento", List.of("Los Angeles", "San Francisco"));
        State texas = new State("Texas", "Austin", List.of("Houston", "Dallas", "San Antonio"));
        State newYork = new State("New York", "Albany", List.of("New York City", "Buffalo"));

        List<City> cities = List.of(
            new City("Los Angeles", california),
            new City("San Francisco", california),
            new City("Houston", texas),
            new City("Dallas", texas),
            new City("San Antonio", texas),
            new City("New York City", newYork),
            new City("Buffalo", newYork)
        );

        Map<State, Long> numberOfCitiesPerState = cities.stream()
            .collect(Collectors.groupingBy(City::state, Collectors.counting()));

        record NumberOfCitiesPerState(State state, long numberOfCities) {
            public NumberOfCitiesPerState(Map.Entry<State, Long> entry) {
                this(entry.getKey(), entry.getValue());
            }
        }

        Optional<NumberOfCitiesPerState> max = numberOfCitiesPerState.entrySet()
            .stream()
            .map(NumberOfCitiesPerState::new)
            .max(Comparator.comparingLong(NumberOfCitiesPerState::numberOfCities));

        max.ifPresent(entry -> System.out.println("State with most cities: " + entry.state().name() + " with " + entry.numberOfCities() + " cities."));
    }
}
```

Como você precisa comparar esses agregados pelo número de cidades, você pode adicionar um método de fábrica para fornecer este comparator. O código se torna o seguinte.

```java
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Comparator;
import java.util.stream.Collectors;

record City(String name, State state) {}
record State(String name, String capital, List<String> cities) {}

public class CityAnalyzer {
    public static void main(String[] args) {
        State california = new State("California", "Sacramento", List.of("Los Angeles", "San Francisco"));
        State texas = new State("Texas", "Austin", List.of("Houston", "Dallas", "San Antonio"));
        State newYork = new State("New York", "Albany", List.of("New York City", "Buffalo"));

        List<City> cities = List.of(
            new City("Los Angeles", california),
            new City("San Francisco", california),
            new City("Houston", texas),
            new City("Dallas", texas),
            new City("San Antonio", texas),
            new City("New York City", newYork),
            new City("Buffalo", newYork)
        );

        Map<State, Long> numberOfCitiesPerState = cities.stream()
            .collect(Collectors.groupingBy(City::state, Collectors.counting()));

        record NumberOfCitiesPerState(State state, long numberOfCities) {
            public NumberOfCitiesPerState(Map.Entry<State, Long> entry) {
                this(entry.getKey(), entry.getValue());
            }

            public static Comparator<NumberOfCitiesPerState> numberOfCitiesComparator() {
                return Comparator.comparingLong(NumberOfCitiesPerState::numberOfCities);
            }
        }

        Optional<NumberOfCitiesPerState> max = numberOfCitiesPerState.entrySet()
            .stream()
            .map(NumberOfCitiesPerState::new)
            .max(NumberOfCitiesPerState.numberOfCitiesComparator());

        max.ifPresent(entry -> System.out.println("State with most cities: " + entry.state().name() + " with " + entry.numberOfCities() + " cities."));
    }
}
```

Seu código agora extrai um máximo de forma significativa. Seu código é mais legível, mais fácil de entender e menos propenso a erros e, a longo prazo, mais fácil de manter.

## Mais Aprendizado

### Neste tutorial

Records ao Resgate A Classe de um Record Declarando os Componentes de um Record Coisas que Você Não Pode Adicionar a um Record Construindo um Record com seu Construtor Canônico Usando o Construtor Compacto Usando o Construtor Canônico Definindo Qualquer Construtor Obtendo o Estado de um Record Serializando Records Usando Records em um Caso de Uso Real Mais Aprendizado

Última atualização: 5 de janeiro de 2024

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > Usando Records para Modelar Dados Imutáveis

[Voltar para a Lista de Tutoriais](<#/doc/tutorials/learn>)