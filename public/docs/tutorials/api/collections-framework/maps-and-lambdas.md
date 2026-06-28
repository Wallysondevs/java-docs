# Manipulando Valores de Map com Expressões Lambda

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ The Collections Framework ](<#/doc/tutorials/api/collections-framework>) > Manipulando Valores de Map com Expressões Lambda

**Anterior na Série**

[Gerenciando o Conteúdo de um Map](<#/doc/tutorials/api/collections-framework/working-with-keys-and-values>)

➜

**Tutorial Atual**

Manipulando Valores de Map com Expressões Lambda

➜

**Próximo na Série**

[Mantendo Chaves Ordenadas com SortedMap e NavigableMap](<#/doc/tutorials/api/collections-framework/sorted-maps>)

**Anterior na Série:** [Gerenciando o Conteúdo de um Map](<#/doc/tutorials/api/collections-framework/working-with-keys-and-values>)

**Próximo na Série:** [Mantendo Chaves Ordenadas com SortedMap e NavigableMap](<#/doc/tutorials/api/collections-framework/sorted-maps>)

# Manipulando Valores de Map com Expressões Lambda

## Consumindo o Conteúdo de um Map

A interface [`Map`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>) possui um método [`forEach()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#forEach\(java.util.function.BiConsumer\)>) que funciona da mesma forma que o método [`forEach()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Iterable.html#forEach\(java.util.function.Consumer\)>) na interface [`Iterable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Iterable.html>). A diferença é que este método [`forEach()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#forEach\(java.util.function.BiConsumer\)>) recebe um [`BiConsumer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/BiConsumer.html>) como argumento em vez de um [`Consumer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Consumer.html>) simples.

Se você está ansioso para praticar operações de map, pode pular diretamente para o final desta página: [Praticando Operações de Map](<#/doc/tutorials/api/collections-framework/maps-and-lambdas>)

Vamos criar um map simples e imprimir seu conteúdo.

```java
import java.util.Map;

public class MapForEach {
    public static void main(String[] args) {
        Map<Integer, String> map = Map.of(
            1, "one",
            2, "two",
            3, "three"
        );

        map.forEach((k, v) -> System.out.println(k + "=" + v));
    }
}
```

Este código produz o seguinte resultado:

```
1=one
2=two
3=three
```

## Substituindo Valores

A interface [`Map`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>) oferece três métodos para substituir um valor associado a uma chave por outro valor.

O primeiro é [`replace(key, value)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#replace\(K,V\)>), que substitui o valor existente pelo novo, cegamente. Isso é o equivalente a uma operação put-if-present. Este método retorna o valor que foi removido do seu map.

Se você precisa de um controle mais preciso, pode usar uma sobrecarga deste método, que recebe o valor antigo como argumento: [`replace(key, oldValue, newValue)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#replace\(K,V,V\)>). Neste caso, o valor atualmente mapeado é substituído por `newValue` apenas se corresponder a `oldValue`. Este método retorna `true` se a substituição ocorreu.

A interface [`Map`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>) também possui um método para substituir todos os valores do seu map usando uma [`BiFunction`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/BiFunction.html>). Esta [`BiFunction`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/BiFunction.html>) é uma função de remapeamento, que recebe a chave e o valor como argumentos, e retorna um novo valor, que substituirá o valor existente. Uma chamada a este método itera internamente sobre todos os pares chave/valor do seu map.

O exemplo a seguir mostra como você pode usar este método [`replaceAll()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#replaceAll\(java.util.function.BiFunction\)>):

```java
import java.util.HashMap;
import java.util.Map;

public class MapReplaceAll {
    public static void main(String[] args) {
        Map<Integer, String> map = new HashMap<>(Map.of(
            1, "one",
            2, "two",
            3, "three"
        ));

        map.replaceAll((k, v) -> v.toUpperCase());
        System.out.println(map);
    }
}
```

A execução deste código produz o seguinte resultado:

```
{1=ONE, 2=TWO, 3=THREE}
```

## Calculando Valores

A interface [`Map`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>) oferece um terceiro padrão para adicionar pares chave-valor a um map ou modificar os valores existentes de um map na forma de três métodos: [`compute()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#compute\(K,java.util.function.BiFunction\)>), [`computeIfPresent()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#computeIfPresent\(K,java.util.function.BiFunction\)>) e [`computeIfAbsent()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#computeIfAbsent\(K,java.util.function.Function\)>).

Estes três métodos recebem os seguintes argumentos:

*   a chave na qual o cálculo é feito,
*   uma [`BiFunction`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/BiFunction.html>) que atua como uma função de remapeamento, ou uma função de mapeamento no caso de [`computeIfAbsent()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#computeIfAbsent\(K,java.util.function.Function\)>).

No caso de [`compute()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#compute\(K,java.util.function.BiFunction\)>) e [`computeIfPresent()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#computeIfPresent\(K,java.util.function.BiFunction\)>), esta bifunção recebe a chave e o valor atualmente associado a essa chave.

No caso de [`compute()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#compute\(K,java.util.function.BiFunction\)>), a bifunção de remapeamento é chamada com dois argumentos. O primeiro é a chave, e o segundo é o valor existente, se houver, ou `null` se não houver. Sua bifunção de remapeamento pode ser chamada com um valor nulo.

Para [`computeIfPresent()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#computeIfPresent\(K,java.util.function.BiFunction\)>), a função de remapeamento também é uma [`BiFunction`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/BiFunction.html>) que recebe a chave e o valor associado a ela. Ela é chamada se houver um valor não nulo associado a essa chave. Se a chave estiver associada a um valor nulo, a função de remapeamento não é chamada. Sua função de remapeamento não pode ser chamada com um valor nulo.

Para [`computeIfAbsent()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#computeIfAbsent\(K,java.util.function.Function\)>), como não há valor associado a essa chave, a função de remapeamento é, na verdade, uma [`Function`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Function.html>) simples que recebe a chave como argumento. Esta função é chamada se a chave não estiver presente no map ou se estiver associada a um valor nulo.

Em todos os casos, se sua bifunção (ou função) retornar um valor nulo, a chave é removida do map: nenhum mapeamento é criado para essa chave. Nenhum par chave/valor com um valor nulo pode ser inserido no map usando um desses três métodos.

Em todos os casos, o valor retornado é o novo valor associado a essa chave no map ou nulo se a função de remapeamento retornou nulo. Vale ressaltar que esta semântica é diferente dos métodos [`put()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#put\(K,V\)>). Os métodos [`put()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#put\(K,V\)>) retornam o valor anterior, enquanto os métodos [`compute()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#compute\(K,java.util.function.BiFunction\)>) retornam o novo valor.

Um caso de uso muito interessante para o método [`computeIfAbsent()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#computeIfAbsent\(K,java.util.function.Function\)>) é a criação de maps com listas como valores. Suponha que você tenha a seguinte lista de strings: `[one two three four five six seven]`. Você precisa criar um map, onde as chaves são o comprimento das palavras dessa lista, e os valores são as listas dessas palavras. O que você precisa criar é o seguinte map:

```
{3=[one, two, six], 4=[four], 5=[three, seven], 7=[seven]}
```

Sem os métodos [`compute()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#compute\(K,java.util.function.BiFunction\)>), você provavelmente escreveria isto:

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MapComputeOldWay {
    public static void main(String[] args) {
        List<String> words = List.of("one", "two", "three", "four", "five", "six", "seven");
        Map<Integer, List<String>> result = new HashMap<>();

        for (String word : words) {
            Integer length = word.length();
            List<String> list = result.get(length);
            if (list == null) {
                list = new ArrayList<>();
                result.put(length, list);
            }
            list.add(word);
        }
        System.out.println(result);
    }
}
```

A execução deste código produz o resultado esperado:

```
{3=[one, two, six], 4=[four], 5=[three, seven], 7=[seven]}
```

A propósito, você poderia usar um [`putIfAbsent()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#putIfAbsent\(K,V\)>) para simplificar este loop `for`:

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MapPutIfAbsent {
    public static void main(String[] args) {
        List<String> words = List.of("one", "two", "three", "four", "five", "six", "seven");
        Map<Integer, List<String>> result = new HashMap<>();

        for (String word : words) {
            Integer length = word.length();
            result.putIfAbsent(length, new ArrayList<>());
            result.get(length).add(word);
        }
        System.out.println(result);
    }
}
```

O que lhe daria o seguinte.

```
{3=[one, two, six], 4=[four], 5=[three, seven], 7=[seven]}
```

Mas usar [`computeIfAbsent()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#computeIfAbsent\(K,java.util.function.Function\)>) pode tornar este código ainda melhor:

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MapComputeIfAbsent {
    public static void main(String[] args) {
        List<String> words = List.of("one", "two", "three", "four", "five", "six", "seven");
        Map<Integer, List<String>> result = new HashMap<>();

        for (String word : words) {
            Integer length = word.length();
            result.computeIfAbsent(length, k -> new ArrayList<>()).add(word);
        }
        System.out.println(result);
    }
}
```

O que dá o seguinte.

```
{3=[one, two, six], 4=[four], 5=[three, seven], 7=[seven]}
```

Como este código funciona?

*   Se a chave não estiver no map, a função de mapeamento é chamada, o que cria uma lista vazia. Esta lista é retornada pelo método [`computeIfAbsent()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#computeIfAbsent\(K,java.util.function.Function\)>). Esta é a lista vazia na qual o código adiciona `word`.
*   Se a chave estiver no map, a função de mapeamento não é chamada, e o valor atual associado a essa chave é retornado. Esta é a lista parcialmente preenchida na qual você precisa adicionar `word`.

Este código é muito mais eficiente do que o [`putIfAbsent()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#putIfAbsent\(K,V\)>), principalmente porque, nesse caso, a lista vazia é criada apenas se necessário. A chamada [`putIfAbsent()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#putIfAbsent\(K,V\)>) requer uma lista vazia existente, que é usada apenas se a chave não estiver no map. Em casos onde o objeto que você adiciona ao map precisa ser criado sob demanda, então o uso de [`computeIfAbsent()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#computeIfAbsent\(K,java.util.function.Function\)>) deve ser preferido em relação a [`putIfAbsent()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#putIfAbsent\(K,V\)>).

## Mesclando Valores

O padrão [`computeIfAbsent()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#computeIfAbsent\(K,java.util.function.Function\)>) funciona bem se o seu map tiver valores que são agregações de outros valores. Mas há uma restrição na estrutura que suporta essa agregação: ela precisa ser mutável. Este é o caso para [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>), e é isso que o código que você escreveu faz: ele adiciona seus valores a um [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>).

Em vez de criar listas de palavras, suponha que você precise criar uma concatenação de palavras. A classe [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) é vista aqui como uma agregação de outras strings, mas não é um contêiner mutável: você não pode usar o padrão [`computeIfAbsent()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#computeIfAbsent\(K,java.util.function.Function\)>) para fazer isso.

É aqui que o padrão [`merge()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#merge\(K,V,java.util.function.BiFunction\)>) vem ao resgate. O método [`merge()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#merge\(K,V,java.util.function.BiFunction\)>) recebe três argumentos:

*   uma chave
*   um valor, que você precisa associar a essa chave
*   uma [`BiFunction`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/BiFunction.html>) de remapeamento.

Se a chave não estiver no map ou estiver associada a um valor nulo, então o valor é associado a essa chave. A função de remapeamento não é chamada neste caso.

Pelo contrário, se a chave já estiver associada a um valor não nulo, a função de remapeamento é chamada com o valor existente e o novo valor passado como argumento. Se esta função de remapeamento retornar nulo, a chave é removida do map. O valor que ela produz é associado a essa chave, caso contrário.

Você pode ver este padrão [`merge()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#merge\(K,V,java.util.function.BiFunction\)>) em ação no exemplo a seguir:

```java
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MapMerge {
    public static void main(String[] args) {
        List<String> words = List.of("one", "two", "three", "four", "five", "six", "seven");
        Map<Integer, String> result = new HashMap<>();

        for (String word : words) {
            Integer length = word.length();
            result.merge(length, word, (oldValue, newValue) -> oldValue + "," + newValue);
        }
        System.out.println(result);
    }
}
```

Neste caso, se a chave `length` não estiver no map, a chamada [`merge()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#merge\(K,V,java.util.function.BiFunction\)>) simplesmente a adiciona e a associa a `word`. Por outro lado, se a chave `length` já estiver no map, a bifunção é chamada com o valor existente e `word`. O resultado da bifunção então substitui o valor atual.

A execução deste código produz o seguinte resultado:

```
{3=one,two,six, 4=four, 5=three,seven, 7=seven}
```

Em ambos os padrões, [`computeIfAbsent()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#computeIfAbsent\(K,java.util.function.Function\)>) e [`merge()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#merge\(K,V,java.util.function.BiFunction\)>), você pode estar se perguntando por que a lambda criada recebe um argumento que está sempre disponível no contexto desta lambda, e que poderia ser capturado desse contexto. A resposta é: você deve favorecer lambdas que não capturam variáveis em detrimento das que capturam, por razões de desempenho.

## Praticando Operações de Map

### Imprimindo o Conteúdo de um Map com um BiConsumer

Você pode usar o método [`map.forEach()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#forEach\(java.util.function.BiConsumer\)>) que recebe um [`BiConsumer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/BiConsumer.html>) para imprimir o conteúdo de um [`Map`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>).

```java
import java.util.Map;

public class MapForEachExample {
    public static void main(String[] args) {
        Map<String, Integer> map = Map.of("A", 1, "B", 2, "C", 3);
        map.forEach((key, value) -> System.out.println(key + " -> " + value));
    }
}
```

A execução do código anterior imprime o seguinte.

```
A -> 1
B -> 2
C -> 3
```

### Substituindo Valores

Existem vários métodos para substituir valores em um [`Map`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>).

```java
import java.util.HashMap;
import java.util.Map;

public class MapReplaceExample {
    public static void main(String[] args) {
        Map<String, String> map = new HashMap<>(Map.of("key1", "value1", "key2", "value2"));

        // replace(key, value)
        String oldValue = map.replace("key1", "newValue1");
        System.out.println("replace(key1, newValue1): " + map + ", old value: " + oldValue);

        // replace(key, oldValue, newValue)
        boolean replaced = map.replace("key2", "value2", "newValue2");
        System.out.println("replace(key2, value2, newValue2): " + map + ", replaced: " + replaced);

        // replaceAll
        map.replaceAll((k, v) -> v.toUpperCase());
        System.out.println("replaceAll: " + map);
    }
}
```

A execução do código anterior imprime o seguinte.

```
replace(key1, newValue1): {key1=newValue1, key2=value2}, old value: value1
replace(key2, value2, newValue2): {key1=newValue1, key2=newValue2}, replaced: true
replaceAll: {key1=NEWVALUE1, key2=NEWVALUE2}
```

### Praticando Operações de Cálculo de Map

A interface [`Map`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>) oferece várias operações de cálculo.

```java
import java.util.HashMap;
import java.util.Map;

public class MapComputeExample {
    public static void main(String[] args) {
        Map<String, Integer> map = new HashMap<>(Map.of("A", 1, "B", 2));

        // computeIfAbsent
        map.computeIfAbsent("C", k -> 3);
        System.out.println("computeIfAbsent(\"C\", k -> 3): " + map);

        // computeIfPresent
        map.computeIfPresent("A", (k, v) -> v * 10);
        System.out.println("computeIfPresent(\"A\", (k, v) -> v * 10): " + map);

        // compute
        map.compute("D", (k, v) -> (v == null) ? 4 : v + 1);
        System.out.println("compute(\"D\", (k, v) -> (v == null) ? 4 : v + 1): " + map);
        map.compute("B", (k, v) -> (v == null) ? 4 : v + 1);
        System.out.println("compute(\"B\", (k, v) -> (v == null) ? 4 : v + 1): " + map);
    }
}
```

A execução do código anterior imprime o seguinte.

```
computeIfAbsent("C", k -> 3): {A=1, B=2, C=3}
computeIfPresent("A", (k, v) -> v * 10): {A=10, B=2, C=3}
compute("D", (k, v) -> (v == null) ? 4 : v + 1): {A=10, B=2, C=3, D=4}
compute("B", (k, v) -> (v == null) ? 4 : v + 1): {A=10, B=3, C=3, D=4}
```

### Agrupando Lista com ComputeIfAbsent

Você pode usar [`map.computeIfAbsent()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#computeIfAbsent\(K,java.util.function.Function\)>) para agrupar elementos de listas.

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class GroupingListExample {
    public static void main(String[] args) {
        List<String> items = List.of("apple", "banana", "apricot", "berry", "cherry");
        Map<Character, List<String>> groupedItems = new HashMap<>();

        for (String item : items) {
            groupedItems.computeIfAbsent(item.charAt(0), k -> new ArrayList<>()).add(item);
        }
        System.out.println(groupedItems);
    }
}
```

A execução do código anterior imprime o seguinte.

```
{a=[apple, apricot], b=[banana, berry], c=[cherry]}
```

Neste outro exemplo, você pode agrupar alunos por nota.

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Student {
    String name;
    int grade;

    public Student(String name, int grade) {
        this.name = name;
        this.grade = grade;
    }

    @Override
    public String toString() {
        return name;
    }
}

public class GroupStudentsByGrade {
    public static void main(String[] args) {
        List<Student> students = List.of(
            new Student("Alice", 90),
            new Student("Bob", 85),
            new Student("Charlie", 90),
            new Student("David", 78),
            new Student("Eve", 85)
        );

        Map<Integer, List<Student>> grades = new HashMap<>();

        for (Student student : students) {
            grades.computeIfAbsent(student.grade, k -> new ArrayList<>()).add(student);
        }
        System.out.println(grades);
    }
}
```

A execução do código anterior imprime o seguinte.

```
{78=[David], 85=[Bob, Eve], 90=[Alice, Charlie]}
```

### Usando Merge

O método [`Map.merge()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#merge\(K,V,java.util.function.BiFunction\)>) mescla um determinado par chave/valor a uma chave/associação existente.

```java
import java.util.HashMap;
import java.util.Map;

public class MapMergeSimpleExample {
    public static void main(String[] args) {
        Map<String, String> map = new HashMap<>(Map.of("key1", "value1", "key2", "value2"));

        // Merge a new value for an existing key
        map.merge("key1", "newValue", (oldVal, newVal) -> oldVal + "-" + newVal);
        System.out.println("After merging 'newValue' to 'key1': " + map);

        // Merge a new key-value pair
        map.merge("key3", "value3", (oldVal, newVal) -> oldVal + "-" + newVal);
        System.out.println("After merging 'key3'='value3': " + map);
    }
}
```

A execução do código anterior imprime o seguinte.

```
After merging 'newValue' to 'key1': {key1=value1-newValue, key2=value2}
After merging 'key3'='value3': {key1=value1-newValue, key2=value2, key3=value3}
```

Você também pode contar as frequências de palavras em algum texto.

```java
import java.util.HashMap;
import java.util.Map;

public class WordFrequencyCounter {
    public static void main(String[] args) {
        String text = "apple banana apple orange banana apple";
        String[] words = text.split(" ");
        Map<String, Integer> wordFrequencies = new HashMap<>();

        for (String word : words) {
            wordFrequencies.merge(word, 1, Integer::sum);
        }
        System.out.println(wordFrequencies);
    }
}
```

A execução do código anterior imprime o seguinte.

```
{apple=3, orange=1, banana=2}
```

Você também pode usar [`Map.merge()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#merge\(K,V,java.util.function.BiFunction\)>) para mesclar maps inteiros.

```java
import java.util.HashMap;
import java.util.Map;

public class MapMergeMapsExample {
    public static void main(String[] args) {
        Map<String, Integer> map1 = new HashMap<>(Map.of("A", 1, "B", 2));
        Map<String, Integer> map2 = Map.of("B", 10, "C", 3);
        Map<String, Integer> map3 = new HashMap<>(map1); // Start with map1's content

        map2.forEach((key, value) -> map3.merge(key, value, (v1, v2) -> v1 + v2));

        System.out.println("Map1: " + map1);
        System.out.println("Map2: " + map2);
        System.out.println("Merged Map (map3): " + map3);
    }
}
```

A execução do código anterior imprime o seguinte.

```
Map1: {A=1, B=2}
Map2: {B=10, C=3}
Merged Map (map3): {A=1, B=12, C=3}
```

### Neste tutorial

Consumindo o Conteúdo de um Map Substituindo Valores Calculando Valores Mesclando Valores Praticando Operações de Map

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Gerenciando o Conteúdo de um Map](<#/doc/tutorials/api/collections-framework/working-with-keys-and-values>)

➜

**Tutorial Atual**

Manipulando Valores de Map com Expressões Lambda

➜

**Próximo na Série**

[Mantendo Chaves Ordenadas com SortedMap e NavigableMap](<#/doc/tutorials/api/collections-framework/sorted-maps>)

**Anterior na Série:** [Gerenciando o Conteúdo de um Map](<#/doc/tutorials/api/collections-framework/working-with-keys-and-values>)

**Próximo na Série:** [Mantendo Chaves Ordenadas com SortedMap e NavigableMap](<#/doc/tutorials/api/collections-framework/sorted-maps>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ The Collections Framework ](<#/doc/tutorials/api/collections-framework>) > Manipulando Valores de Map com Expressões Lambda