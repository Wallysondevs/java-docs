# Usando Mapas para Armazenar Pares Chave-Valor

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ O Collections Framework ](<#/doc/tutorials/api/collections-framework>) > Usando Mapas para Armazenar Pares Chave-Valor

**Anterior na Série**

[Armazenando Elementos em Pilhas e Filas](<#/doc/tutorials/api/collections-framework/stacks-queues>)

➜

**Tutorial Atual**

Usando Mapas para Armazenar Pares Chave-Valor

➜

**Próximo na Série**

[Gerenciando o Conteúdo de um Mapa](<#/doc/tutorials/api/collections-framework/working-with-keys-and-values>)

**Anterior na Série:** [Armazenando Elementos em Pilhas e Filas](<#/doc/tutorials/api/collections-framework/stacks-queues>)

**Próximo na Série:** [Gerenciando o Conteúdo de um Mapa](<#/doc/tutorials/api/collections-framework/working-with-keys-and-values>)

# Usando Mapas para Armazenar Pares Chave-Valor

## Introduzindo a Hierarquia de Map

Se você está ansioso para praticar as operações de map mais comuns em código real, pode pular diretamente para o final desta página: [Praticando Operações de Map](<#/doc/tutorials/api/collections-framework/maps>)

A segunda estrutura principal oferecida pelo Collections Framework é uma implementação de uma estrutura de dados muito clássica: a estrutura hashmap. Este conceito não é novo e é fundamental na estruturação de dados, seja em memória ou não. Como funciona e como foi implementado no Collections Framework?

Um hashmap é uma estrutura capaz de armazenar pares chave-valor. O valor é qualquer objeto que sua aplicação precise manipular, e uma chave é algo que pode representar este objeto.

Suponha que você precise criar uma aplicação que deve lidar com faturas, representadas por instâncias de uma classe `Invoice`. Então seus valores são essas instâncias de `Invoice`, e suas chaves poderiam ser os números das faturas. Cada fatura tem um número, e esse número é único entre todas as suas faturas.

De modo geral, cada valor está vinculado a uma chave, assim como uma fatura está vinculada ao seu número de fatura. Se você tem uma chave específica, pode recuperar o valor. Geralmente, uma chave é um objeto simples: pense em uma string de vários caracteres ou um número. O valor, por outro lado, pode ser tão complexo quanto você precisar. É para isso que os hashmaps foram feitos: você pode manipular chaves, movê-las de uma parte da sua aplicação para outra, transmiti-las por uma rede, e quando precisar do objeto completo, então poderá recuperá-lo com sua chave.

Antes de ver todos os detalhes da interface [`Map`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>), aqui estão as noções que você precisa ter em mente.

  * Um hashmap pode armazenar pares chave-valor
  * Uma chave atua como um símbolo para um dado valor
  * Uma chave é um objeto simples, um valor pode ser tão complexo quanto necessário
  * Uma chave é única em um hashmap, um valor não precisa ser único
  * Todo valor armazenado em um hashmap deve estar vinculado a uma chave; um par chave-valor em um map forma uma _entrada_ desse map
  * Uma chave pode ser usada para recuperar seu valor vinculado.

O Collections Framework oferece uma interface [`Map`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>) que implementa este conceito, juntamente com duas extensões, [`SortedMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/SortedMap.html>) e [`NavigableMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableMap.html>), conforme mostrado na figura a seguir.

A Hierarquia da Interface Map

Esta hierarquia é muito simples e se parece com a hierarquia de [`Set`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html>), com [`SortedSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/SortedSet.html>) e [`NavigableSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableSet.html>). De fato, um [`SortedMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/SortedMap.html>) compartilha o mesmo tipo de semântica que o [`SortedSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/SortedSet.html>): um [`SortedMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/SortedMap.html>) é um map que mantém seus pares chave-valor ordenados por suas chaves. O mesmo vale para [`NavigableMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableMap.html>): os métodos adicionados por esta interface são do mesmo tipo que os adicionados por [`NavigableSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableSet.html>) a [`SortedSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/SortedSet.html>).

O JDK oferece várias implementações da interface [`Map`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>), sendo a mais utilizada a classe [`HashMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/HashMap.html>).

Aqui estão as outras duas implementações.

  * [`LinkedHashMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedHashMap.html>) é um [`HashMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/HashMap.html>) com uma estrutura interna para manter os pares chave-valor ordenados. A iteração sobre as chaves ou os pares chave-valor seguirá a ordem em que você adicionou seus pares chave-valor.
  * [`IdentityHashMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/IdentityHashMap.html>) é um [`Map`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>) especializado que você deve usar apenas em casos muito específicos. Esta implementação não se destina a ser usada geralmente em aplicações. Em vez de usar [`equals()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#equals\(java.lang.Object\)>) e [`hashCode()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#hashCode\(\)>) para comparar os objetos chave, esta implementação compara apenas as referências a essas chaves, com um operador de igualdade (`==`). Use-o com cautela, apenas se tiver certeza de que é isso que você precisa.

Você pode ter ouvido falar de multimaps. Multimap é um conceito onde uma única chave pode ser associada a mais de um valor. Este conceito não é diretamente suportado no Collections Framework. No entanto, este recurso pode ser útil, e você verá mais tarde neste tutorial como pode criar maps com valores que são, na verdade, listas de valores. Este padrão permite criar estruturas semelhantes a multimaps.

## Usando os Métodos de Fábrica de Conveniência para Collections para Criar Maps

Como você já viu, o Java SE 9 adicionou métodos às interfaces [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>) e [`Set`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html>) para criar listas e sets imutáveis.

Existem tais métodos na interface [`Map`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>) que criam maps imutáveis e entradas imutáveis.

Você pode criar um Map facilmente com o seguinte padrão.

```java
Map<String, String> map = Map.of("key1", "value1", "key2", "value2");
```

Há uma ressalva, no entanto: você só pode usar este padrão se tiver no máximo 10 pares chave-valor.

Se você tiver mais, então precisará usar outro padrão:

```java
Map<String, String> map = Map.ofEntries(
    Map.entry("key1", "value1"),
    Map.entry("key2", "value2"),
    Map.entry("key3", "value3"),
    Map.entry("key4", "value4"),
    Map.entry("key5", "value5"),
    Map.entry("key6", "value6"),
    Map.entry("key7", "value7"),
    Map.entry("key8", "value8"),
    Map.entry("key9", "value9"),
    Map.entry("key10", "value10"),
    Map.entry("key11", "value11")
);
```

Você também pode escrever este padrão desta forma, e usar imports estáticos para melhorar ainda mais sua legibilidade.

```java
import static java.util.Map.entry;
import static java.util.Map.ofEntries;

Map<String, String> map = ofEntries(
    entry("key1", "value1"),
    entry("key2", "value2")
);
```

Existem restrições para esses maps e entradas criados por esses métodos de fábrica, assim como para os sets:

  * O map e as entradas que você obtém são objetos imutáveis
  * Entradas nulas, chaves nulas e valores nulos não são permitidos
  * Tentar criar um map com chaves duplicadas desta forma não faz sentido, então como um aviso você receberá uma [`IllegalArgumentException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/IllegalArgumentException.html>) na criação do map.

## Armazenando Pares Chave/Valor em um Map

A relação entre uma chave e seu valor vinculado segue estas duas regras simples.

  * Uma chave pode ser vinculada a apenas um valor.
  * Um valor pode ser vinculado a várias chaves.

Isso leva a várias consequências para o conteúdo do map.

  * O conjunto de todas as chaves não pode ter duplicatas, então ele tem a estrutura de um [`Set`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html>)
  * O conjunto de todos os pares chave/valor também não pode ter duplicatas, então ele também tem a estrutura de um [`Set`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html>)
  * O conjunto de todos os valores pode ter duplicatas, então ele tem a estrutura de uma [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>) simples.

Então, você pode definir as seguintes operações em um map:

  * Colocar um par chave/valor no map. Isso pode falhar se a chave já estiver definida no map
  * Obter um valor a partir de uma chave
  * Remover uma chave de um map, juntamente com seu valor.

Você também pode definir as operações clássicas, semelhantes a set:

  * Verificar se o map está vazio ou não
  * Obter o número de pares chave-valor contidos no map
  * Colocar todo o conteúdo de outro map neste map
  * Limpar o conteúdo de um map.

Todas essas operações e conceitos são implementados na interface [`Map`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>), juntamente com algumas outras que você verá a seguir.

## Explorando a interface Map

A interface [`Map`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>) é o tipo base que modela a noção de map no JDK.

Você deve ser extremamente cuidadoso ao escolher o tipo das chaves para seus maps. Em resumo, escolher uma chave mutável não é proibido, mas é perigoso e desencorajado. Uma vez que uma chave foi adicionada a um map, mutá-la pode levar à alteração do seu valor de hash code e da sua identidade. Isso pode tornar seu par chave-valor irrecuperável ou pode retornar um valor diferente ao consultar seu map. Você verá isso mais tarde em um exemplo.

A interface [`Map`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>) define uma interface membro: [`Map.Entry`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.Entry.html>) para modelar um par chave-valor. Esta interface define três métodos para acessar a chave e os valores:

  * [`getKey()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.Entry.html#getKey\(\)>): para ler a chave;
  * [`getValue()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.Entry.html#getValue\(\)>) e [`setValue(value)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.Entry.html#setValue\(V\)>): para ler e atualizar o valor vinculado a essa chave.

Os objetos [`Map.Entry`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.Entry.html>) que você pode obter de um determinado map são visões sobre o conteúdo do map. A modificação do valor de um objeto entry é, portanto, refletida no map e vice-versa. Esta é a razão pela qual você não pode alterar a chave neste objeto: isso poderia corromper seu map.

## Praticando Operações de Map

### Criando e Preenchendo um Map

Você pode criar maps e adicionar pares chave/valor a eles com o seguinte padrão. Observe que você verá mais padrões nos exemplos a seguir.

```java
import java.util.HashMap;
import java.util.Map;

public class MapCreation {
    public static void main(String[] args) {
        Map<String, String> map = new HashMap<>();
        map.put("key1", "value1");
        map.put("key2", "value2");
        map.put("key3", "value3");
        System.out.println(map);
    }
}
```

A execução do exemplo anterior imprime o seguinte.

```
{key1=value1, key2=value2, key3=value3}
```

### Obtendo um Valor a partir de sua Chave

Você pode então obter um valor a partir de sua chave.

```java
import java.util.HashMap;
import java.util.Map;

public class MapGetValue {
    public static void main(String[] args) {
        Map<String, String> map = new HashMap<>();
        map.put("key1", "value1");
        map.put("key2", "value2");
        map.put("key3", "value3");

        String value = map.get("key2");
        System.out.println("Value for key2: " + value);
    }
}
```

A execução do código anterior imprime o seguinte.

```
Value for key2: value2
```

### Verificando se uma Chave ou um Valor Está Presente

Você também pode verificar a presença de uma determinada chave ou de um determinado valor.

```java
import java.util.HashMap;
import java.util.Map;

public class MapContains {
    public static void main(String[] args) {
        Map<String, String> map = new HashMap<>();
        map.put("key1", "value1");
        map.put("key2", "value2");
        map.put("key3", "value3");

        System.out.println("Map contains key 'key1': " + map.containsKey("key1"));
        System.out.println("Map contains key 'key4': " + map.containsKey("key4"));
        System.out.println("Map contains value 'value2': " + map.containsValue("value2"));
        System.out.println("Map contains value 'value4': " + map.containsValue("value4"));
    }
}
```

A execução do código anterior imprime o seguinte.

```
Map contains key 'key1': true
Map contains key 'key4': false
Map contains value 'value2': true
Map contains value 'value4': false
```

### Atualizando e Removendo Pares Chave / Valor Existentes

Você pode atualizar o valor vinculado a uma chave existente, ou adicionar um par chave / valor somente se a chave não estiver no map.

```java
import java.util.HashMap;
import java.util.Map;

public class MapUpdateRemove {
    public static void main(String[] args) {
        Map<String, String> map = new HashMap<>();
        map.put("key1", "value1");
        map.put("key2", "value2");
        map.put("key3", "value3");
        System.out.println("Original map: " + map);

        // Update an existing key
        map.put("key1", "newValue1");
        System.out.println("Map after updating key1: " + map);

        // Add if not present
        map.putIfAbsent("key4", "value4");
        map.putIfAbsent("key1", "anotherValue1"); // This will not update as key1 is present
        System.out.println("Map after putIfAbsent: " + map);

        // Remove a key-value pair
        map.remove("key2");
        System.out.println("Map after removing key2: " + map);
    }
}
```

A execução do código anterior imprime o seguinte.

```
Original map: {key1=value1, key2=value2, key3=value3}
Map after updating key1: {key1=newValue1, key2=value2, key3=value3}
Map after putIfAbsent: {key1=newValue1, key2=value2, key3=value3, key4=value4}
Map after removing key2: {key1=newValue1, key3=value3, key4=value4}
```

### Iterando Sobre as Chaves, os Valores e as Entradas

Existem três collections que você pode obter de um map.

  1. O set de suas chaves.
  2. A collection de seus valores.
  3. O set de seus pares chave / valor, modelados como entradas.

```java
import java.util.HashMap;
import java.util.Map;

public class MapIteration {
    public static void main(String[] args) {
        Map<String, String> map = new HashMap<>();
        map.put("key1", "value1");
        map.put("key2", "value2");
        map.put("key3", "value3");

        System.out.println("Iterating over keys:");
        for (String key : map.keySet()) {
            System.out.println("Key: " + key);
        }

        System.out.println("\nIterating over values:");
        for (String value : map.values()) {
            System.out.println("Value: " + value);
        }

        System.out.println("\nIterating over entries:");
        for (Map.Entry<String, String> entry : map.entrySet()) {
            System.out.println("Key: " + entry.getKey() + ", Value: " + entry.getValue());
        }

        System.out.println("\nUsing forEach (Java 8+):");
        map.forEach((key, value) -> System.out.println("Key: " + key + ", Value: " + value));
    }
}
```

A execução do código anterior imprime o seguinte.

```
Iterating over keys:
Key: key1
Key: key2
Key: key3

Iterating over values:
Value: value1
Value: value2
Value: value3

Iterating over entries:
Key: key1, Value: value1
Key: key2, Value: value2
Key: key3, Value: value3

Using forEach (Java 8+):
Key: key1, Value: value1
Key: key2, Value: value2
Key: key3, Value: value3
```

### Neste tutorial

Introduzindo a Hierarquia de Map Usando os Métodos de Fábrica de Conveniência para Collections para Criar Maps Armazenando Pares Chave/Valor em um Map Explorando a Interface Map Praticando Operações de Map

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Armazenando Elementos em Pilhas e Filas](<#/doc/tutorials/api/collections-framework/stacks-queues>)

➜

**Tutorial Atual**

Usando Mapas para Armazenar Pares Chave-Valor

➜

**Próximo na Série**

[Gerenciando o Conteúdo de um Mapa](<#/doc/tutorials/api/collections-framework/working-with-keys-and-values>)

**Anterior na Série:** [Armazenando Elementos em Pilhas e Filas](<#/doc/tutorials/api/collections-framework/stacks-queues>)

**Próximo na Série:** [Gerenciando o Conteúdo de um Mapa](<#/doc/tutorials/api/collections-framework/working-with-keys-and-values>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ O Collections Framework ](<#/doc/tutorials/api/collections-framework>) > Usando Mapas para Armazenar Pares Chave-Valor