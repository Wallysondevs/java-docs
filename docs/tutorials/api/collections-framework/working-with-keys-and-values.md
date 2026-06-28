# Gerenciando o Conteúdo de um Map

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ O Framework de Coleções ](<#/doc/tutorials/api/collections-framework>) > Gerenciando o Conteúdo de um Map

**Anterior na Série**

[Usando Maps para Armazenar Pares Chave-Valor](<#/doc/tutorials/api/collections-framework/maps>)

➜

**Tutorial Atual**

Gerenciando o Conteúdo de um Map

➜

**Próximo na Série**

[Manipulando Valores de Map com Expressões Lambda](<#/doc/tutorials/api/collections-framework/maps-and-lambdas>)

**Anterior na Série:** [Usando Maps para Armazenar Pares Chave-Valor](<#/doc/tutorials/api/collections-framework/maps>)

**Próximo na Série:** [Manipulando Valores de Map com Expressões Lambda](<#/doc/tutorials/api/collections-framework/maps-and-lambdas>)

# Gerenciando o Conteúdo de um Map

## Adicionando um Par Chave-Valor a um Map

Você pode simplesmente adicionar um par chave/valor em um map com [`put(key, value)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#put\(K,V\)>). Se a chave ainda não estiver presente no map, então o par chave/valor é simplesmente adicionado ao map. Se estiver, então o valor existente é substituído pelo novo.

Em ambos os casos, o método [`put()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#put\(K,V\)>) retorna o valor existente atualmente vinculado à chave. Isso significa que, se esta for uma nova chave, uma chamada a [`put()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#put\(K,V\)>) retornará null.

Java SE 8 introduz o método [`putIfAbsent()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#putIfAbsent\(K,V\)>). Este método também pode adicionar um par chave/valor ao map, somente se a chave ainda não estiver presente _e_ não estiver associada a um valor null. Isso pode parecer um pouco confuso no início, mas [`putIfAbsent()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#putIfAbsent\(K,V\)>) substituirá um valor null pelo novo valor fornecido.

Este método é muito útil se você precisar se livrar de valores null problemáticos em seu map. Por exemplo, o código a seguir falhará com uma [`NullPointerException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/NullPointerException.html>) porque você não pode fazer o auto-unboxing de um [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>) null para um valor `int`.

Se você observar atentamente este código, verá que [`map.values()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#values\(\)>) é uma [`Collection<Integer>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>). Portanto, iterar sobre esta coleção produz instâncias de [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>). Como você declarou `value` como um `int`, o compilador fará o auto-unboxing deste [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>) para um valor `int`. Este mecanismo falha com uma [`NullPointerException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/NullPointerException.html>) se a instância de [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>) for null.

Você pode corrigir este map com o código a seguir, que substitui os valores null problemáticos por um valor padrão, `-1`, que não gerará mais nenhuma [`NullPointerException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/NullPointerException.html>).

Executar o código anterior imprimirá o seguinte. Como você pode ver, este map não contém mais nenhum valor null:

## Obtendo um Valor a Partir de uma Chave

Você pode obter um valor vinculado a uma determinada chave simplesmente chamando o método [`get(key)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#get\(java.lang.Object\)>).

Java SE 8 introduziu o método [`getOrDefault()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#getOrDefault\(java.lang.Object,V\)>) que recebe uma chave e um valor padrão que é retornado se a chave não estiver no map.

Vamos ver este método em ação em um exemplo:

Ou, se você estiver familiarizado com streams (que são abordados mais adiante neste tutorial):

Ambos os códigos imprimem o mesmo resultado:

## Removendo uma Chave de um Map

A remoção de um par chave/valor é feita chamando o método [`remove(key)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#remove\(java.lang.Object\)>). Este método retorna o valor que estava vinculado a essa chave, então pode retornar `null`.

Pode ser arriscado remover cegamente um par chave/valor de um map se você não souber o valor que está vinculado a essa chave. Assim, Java SE 8 adicionou uma sobrecarga que recebe um valor como segundo argumento. Desta vez, o par chave/valor é removido somente se corresponder completamente ao par chave/valor no map.

Este método [`remove(key, value)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#remove\(java.lang.Object,java.lang.Object\)>) retorna um valor booleano, `true` se o par chave/valor foi removido do map.

## Verificando a Presença de uma Chave ou um Valor

Você tem dois métodos para verificar a presença de uma determinada chave ou de um determinado valor: [`containsKey(key)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#containsKey\(java.lang.Object\)>) e [`containsValue(value)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#containsValue\(java.lang.Object\)>). Ambos os métodos retornam `true` se o map contiver a chave ou o valor fornecido.

## Verificando o Conteúdo de um Map

A interface [`Map`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>) também traz métodos que se parecem com os que você tem na interface [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>). Esses métodos são autoexplicativos: [`isEmpty()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#isEmpty\(\)>) retorna `true` para maps vazios, [`size()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#size\(\)>) retorna o número de pares chave/valor, e [`clear()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#clear\(\)>) remove todo o conteúdo do map.

Há também um método para adicionar o conteúdo de um determinado map ao map atual: [`putAll(otherMap)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#putAll\(java.util.Map\)>). Se algumas chaves estiverem presentes em ambos os maps, então os valores de `otherMap` apagarão os deste map.

## Obtendo uma Visão das Chaves, dos Valores ou das Entradas de um Map

Você também pode obter diferentes coleções de um map.

*   [`keySet()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#keySet\(\)>): retorna uma instância de [`Set`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html>), contendo as chaves definidas no map
*   [`entrySet()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#entrySet\(\)>): retorna uma instância de [`Set<Map.Entry>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html>), contendo os pares chave/valor contidos no map
*   [`values()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#values\(\)>): retorna uma instância de [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>), contendo os valores presentes no map.

Os exemplos a seguir mostram esses três métodos em ação:

A execução deste código produz o seguinte resultado:

Esses sets são _visões_ apoiadas pelo map atual. Qualquer alteração feita no map é refletida nessas visões.

### Removendo uma Chave do Set de Chaves

Modificar um desses sets também será refletido no map: por exemplo, remover uma chave do set retornado por uma chamada a [`keySet()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#keySet\(\)>) remove o par chave/valor correspondente do map.

Por exemplo, você pode executar este código no map anterior:

Ele produzirá o seguinte resultado:

### Removendo um Valor da Coleção de Valores

Remover um valor não é tão simples porque um valor pode ser encontrado mais de uma vez em um map. Nesse caso, remover um valor da coleção de valores apenas remove o primeiro par chave/valor correspondente.

Você pode ver isso no exemplo a seguir.

A execução deste código produzirá o seguinte resultado.

Como você pode ver, apenas o primeiro par chave/valor foi removido neste exemplo. Você precisa ter cuidado neste caso porque, se a implementação que você escolheu for um [`HashMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/HashMap.html>), você não pode saber de antemão qual par chave/valor será encontrado.

No entanto, você não tem acesso a todas as operações nesses sets. Por exemplo, você não pode adicionar um elemento ao set de chaves, ou à coleção de valores. Se você tentar fazer isso, receberá uma [`UnsupportedOperationException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/UnsupportedOperationException.html>).

Se o que você precisa é iterar sobre os pares chave/valor de um map, então sua melhor escolha é iterar diretamente sobre o set de pares chave/valor. É muito mais eficiente fazer isso, em vez de iterar sobre o set de chaves e obter o valor correspondente. O melhor padrão que você pode usar é o seguinte:

### Neste tutorial

Adicionando um Par Chave-Valor a um Map Obtendo um Valor a Partir de uma Chave Removendo uma Chave de um Map Verificando a Presença de uma Chave ou um Valor Verificando o Conteúdo de um Map Obtendo uma Visão das Chaves, dos Valores ou das Entradas de um Map

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Usando Maps para Armazenar Pares Chave-Valor](<#/doc/tutorials/api/collections-framework/maps>)

➜

**Tutorial Atual**

Gerenciando o Conteúdo de um Map

➜

**Próximo na Série**

[Manipulando Valores de Map com Expressões Lambda](<#/doc/tutorials/api/collections-framework/maps-and-lambdas>)

**Anterior na Série:** [Usando Maps para Armazenar Pares Chave-Valor](<#/doc/tutorials/api/collections-framework/maps>)

**Próximo na Série:** [Manipulando Valores de Map com Expressões Lambda](<#/doc/tutorials/api/collections-framework/maps-and-lambdas>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ O Framework de Coleções ](<#/doc/tutorials/api/collections-framework>) > Gerenciando o Conteúdo de um Map