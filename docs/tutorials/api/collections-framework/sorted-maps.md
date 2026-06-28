# Mantendo Chaves Ordenadas com SortedMap e NavigableMap

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ The Collections Framework ](<#/doc/tutorials/api/collections-framework>) > Mantendo Chaves Ordenadas com SortedMap e NavigableMap

**Anterior na Série**

[Manipulando Valores de Map com Expressões Lambda](<#/doc/tutorials/api/collections-framework/maps-and-lambdas>)

➜

**Tutorial Atual**

Mantendo Chaves Ordenadas com SortedMap e NavigableMap

➜

**Próximo na Série**

[Escolhendo Tipos Imutáveis para Sua Chave](<#/doc/tutorials/api/collections-framework/choosing-keys>)

**Anterior na Série:** [Manipulando Valores de Map com Expressões Lambda](<#/doc/tutorials/api/collections-framework/maps-and-lambdas>)

**Próximo na Série:** [Escolhendo Tipos Imutáveis para Sua Chave](<#/doc/tutorials/api/collections-framework/choosing-keys>)

# Mantendo Chaves Ordenadas com SortedMap e NavigableMap

## Métodos Adicionados por SortedMap

O JDK fornece duas extensões da interface [`Map`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>): [`SortedMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/SortedMap.html>) e [`NavigableMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableMap.html>). [`NavigableMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableMap.html>) é uma extensão de [`SortedMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/SortedMap.html>). [`TreeMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/TreeMap.html>) implementa ambas as interfaces. A classe [`TreeMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/TreeMap.html>) é uma árvore rubro-negra (red-black tree), uma estrutura de dados bem conhecida. O JDK também oferece a [`ConcurrentSkipListMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/ConcurrentSkipListMap.html>), que é uma implementação thread-safe.

[`SortedMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/SortedMap.html>) e [`NavigableMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableMap.html>) mantêm seus pares chave/valor ordenados pela chave. Assim como para [`SortedSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/SortedSet.html>) e [`NavigableSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableSet.html>), você precisa fornecer uma maneira de comparar essas chaves. Você tem duas soluções para fazer isso: ou a classe de suas chaves implementa [`Comparable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Comparable.html>), ou você fornece um [`Comparator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html>) para suas chaves ao criar seu [`TreeMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/TreeMap.html>). Se você fornecer um [`Comparator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html>), ele será usado mesmo que suas chaves sejam comparáveis.

Se a implementação que você escolheu para seu [`SortedMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/SortedMap.html>) ou [`NavigableMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableMap.html>) for [`TreeMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/TreeMap.html>), então você pode seguramente fazer um cast do conjunto retornado por uma chamada a [`keySet()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#keySet\(\)>) ou [`entrySet()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#entrySet\(\)>) para [`SortedSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/SortedSet.html>) ou [`NavigableSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableSet.html>). [`NavigableMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableMap.html>) possui um método, [`navigableKeySet()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableMap.html#navigableKeySet\(\)>) que retorna uma instância de [`NavigableSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableSet.html>) que você pode usar em vez do método simples [`keySet()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#keySet\(\)>). Ambos os métodos retornam o mesmo objeto.

A interface [`SortedMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/SortedMap.html>) adiciona os seguintes métodos a [`Map`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>):

  * [`firstKey()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/SortedMap.html#firstKey\(\)>) e [`lastKey()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/SortedMap.html#lastKey\(\)>): retornam a menor e a maior chave do seu map;
  * [`headMap(toKey)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/SortedMap.html#headMap\(K\)>) e [`tailMap(fromKey)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/SortedMap.html#tailMap\(K\)>): retornam um [`SortedMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/SortedMap.html>) cujas chaves são estritamente menores que `toKey`, ou maiores ou iguais a `fromKey`;
  * [`subMap(fromKey, toKey)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/SortedMap.html#subMap\(K,K\)>): retorna um [`SortedMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/SortedMap.html>) cujas chaves são estritamente menores que `toKey`, ou maiores ou iguais a `fromKey`.

Esses maps são instâncias de [`SortedMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/SortedMap.html>) e são views (visões) apoiadas por este map. Qualquer alteração feita neste map será vista nessas views. Essas views podem ser atualizadas, com uma restrição: você não pode inserir uma chave fora dos limites do map que você construiu.

Você pode ver este comportamento no exemplo a seguir:

## Métodos Adicionados por NavigableMap

### Acessando Chaves ou Entradas Específicas

O [`NavigableMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableMap.html>) adiciona mais métodos a [`SortedMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/SortedMap.html>). O primeiro conjunto de métodos lhe dá acesso a chaves e entradas específicas em seu map.

  * [`firstEntry()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableMap.html#firstEntry\(\)>), e [`lastEntry()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableMap.html#lastEntry\(\)>): retornam a menor ou maior entrada deste map.
  * [`ceilingKey(key)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableMap.html#ceilingKey\(K\)>), [`ceilingEntry(key)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableMap.html#ceilingEntry\(K\)>), [`higherKey(key)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableMap.html#higherKey\(K\)>), [`higherEntry(key)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableMap.html#higherEntry\(K\)>): retornam a menor chave ou entrada maior que a chave fornecida. Os métodos `ceiling` podem retornar uma chave que é igual à chave fornecida, enquanto a chave retornada pelos métodos `higher` é estritamente maior.
  * [`floorKey(key)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableMap.html#floorKey\(K\)>), [`floorEntry(key)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableMap.html#floorEntry\(K\)>), [`lowerKey(key)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableMap.html#lowerKey\(K\)>), [`lowerEntry(key)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableMap.html#lowerEntry\(K\)>): retornam a maior chave ou entrada menor que a chave fornecida. Os métodos `floor` podem retornar uma chave que é igual à chave fornecida, enquanto a chave retornada pelos métodos `lower` é estritamente menor.

### Acessando seu Map com Recursos Semelhantes a Fila

O segundo conjunto oferece recursos semelhantes a fila:

  * [`pollFirstEntry()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableMap.html#pollFirstEntry\(\)>): retorna e remove a menor entrada
  * [`pollLastEntry()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableMap.html#pollLastEntry\(\)>): retorna e remove a maior entrada.

### Percorrendo seu Map na Ordem Inversa

O terceiro conjunto inverte seu map, como se tivesse sido construído com a lógica de comparação invertida.

  * [`navigableKeySet()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableMap.html#navigableKeySet\(\)>) é um método de conveniência que retorna um [`NavigableSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableMap.html>) para que você não precise fazer o cast do resultado de [`keySet()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#keySet\(\)>)
  * [`descendingKeySet()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableMap.html#descendingKeySet\(\)>): retorna um [`NavigableSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableMap.html>) apoiado pelo map, no qual você pode iterar em ordem decrescente
  * [`descendingMap()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableMap.html#descendingMap\(\)>): retorna um [`NavigableMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableMap.html>) com a mesma semântica.

Ambas as views suportam a remoção de elementos, mas você não pode adicionar nada através delas.

Aqui está um exemplo para demonstrar como você pode usá-los.

A execução deste código imprime o seguinte resultado.

### Obtendo Views de Submap

O último conjunto de métodos lhe dá acesso a views em porções do seu map.

  * [`subMap(fromKey, fromInclusive, toKey, toInclusive)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableMap.html#subMap\(K,boolean,K,boolean\)>): retorna um submap onde você pode decidir incluir ou não os limites
  * [`headMap(toKey, inclusive)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableMap.html#headMap\(K\)>): o mesmo para o head map
  * [`tailMap(fromKey, inclusive)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableMap.html#tailMap\(K\)>): o mesmo para o tail map.

Esses maps são views neste map, que você pode atualizar removendo ou adicionando pares chave/valor. Há uma restrição na adição de elementos, no entanto: você não pode adicionar chaves fora dos limites nos quais a view foi criada.

### Neste tutorial

Métodos Adicionados por SortedMap Métodos Adicionados por NavigableMap

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Manipulando Valores de Map com Expressões Lambda](<#/doc/tutorials/api/collections-framework/maps-and-lambdas>)

➜

**Tutorial Atual**

Mantendo Chaves Ordenadas com SortedMap e NavigableMap

➜

**Próximo na Série**

[Escolhendo Tipos Imutáveis para Sua Chave](<#/doc/tutorials/api/collections-framework/choosing-keys>)

**Anterior na Série:** [Manipulando Valores de Map com Expressões Lambda](<#/doc/tutorials/api/collections-framework/maps-and-lambdas>)

**Próximo na Série:** [Escolhendo Tipos Imutáveis para Sua Chave](<#/doc/tutorials/api/collections-framework/choosing-keys>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ The Collections Framework ](<#/doc/tutorials/api/collections-framework>) > Mantendo Chaves Ordenadas com SortedMap e NavigableMap