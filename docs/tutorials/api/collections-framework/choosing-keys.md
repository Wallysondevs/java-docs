# Escolhendo Tipos Imutáveis para Sua Chave

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ O Framework de Coleções ](<#/doc/tutorials/api/collections-framework>) > Escolhendo Tipos Imutáveis para Sua Chave

**Anterior na Série**

[Mantendo Chaves Ordenadas com SortedMap e NavigableMap](<#/doc/tutorials/api/collections-framework/sorted-maps>)

➜

**Tutorial Atual**

Escolhendo Tipos Imutáveis para Sua Chave

➜

**Próximo na Série**

[Escolhendo a Implementação Certa Entre ArrayList e LinkedList](<#/doc/tutorials/api/collections-framework/arraylist-vs-linkedlist>)

**Anterior na Série:** [Mantendo Chaves Ordenadas com SortedMap e NavigableMap](<#/doc/tutorials/api/collections-framework/sorted-maps>)

**Próximo na Série:** [Escolhendo a Implementação Certa Entre ArrayList e LinkedList](<#/doc/tutorials/api/collections-framework/arraylist-vs-linkedlist>)

# Escolhendo Tipos Imutáveis para Sua Chave

## Evitando o Uso de Chaves Mutáveis

Usar chaves mutáveis é um antipattern, e você deve definitivamente evitar fazer isso. Os efeitos colaterais que você pode obter se o fizer são terríveis: você pode acabar tornando o conteúdo do seu map inalcançável.

É bem fácil configurar um exemplo para mostrar isso. Aqui está uma classe `Key`, que é apenas um wrapper mutável para uma [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>). Note que os métodos [`equals()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#equals\(java.lang.Object\)>) e [`hashCode()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#hashCode\(\)>) foram sobrescritos por um código que sua IDE poderia gerar.

```java
class Key {
    String key;

    public Key(String key) {
        this.key = key;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Key key1 = (Key) o;
        return key.equals(key1.key);
    }

    @Override
    public int hashCode() {
        return key.hashCode();
    }

    @Override
    public String toString() {
        return "Key{" +
               "key='" + key + '\'' +
               '}';
    }
}
```

Você pode usar este wrapper para criar um map no qual inserir pares chave-valor.

```java
Map<Key, String> map = new HashMap<>();
Key key1 = new Key("key1");
Key key2 = new Key("key2");
map.put(key1, "value1");
map.put(key2, "value2");
System.out.println(map.get(key1));
System.out.println(map.get(key2));
```

Até agora, este código está OK e imprime o seguinte:

```
value1
value2
```

O que acontecerá se alguém mutar sua chave? Bem, isso realmente depende da mutação. Você pode tentar os exemplos a seguir e ver o que acontece quando você tenta recuperar seus valores.

No caso a seguir, você está mutando uma das chaves existentes com um novo valor que não corresponde a uma chave já existente.

```java
System.out.println("Mutating key1 to key3");
key1.setKey("key3");
System.out.println(map.get(key1));
System.out.println(map.get(new Key("key1")));
```

O resultado é o seguinte. Você não consegue mais obter o valor da chave, mesmo que use o mesmo object. E obter o valor de uma chave que está mantendo o valor original também falha. Este par chave-valor é perdido.

```
Mutating key1 to key3
null
null
```

Se você mutar sua chave com um valor que é usado para outra chave existente, o resultado é diferente.

```java
System.out.println("Mutating key1 to key2");
key1.setKey("key2");
System.out.println(map.get(key1));
System.out.println(map.get(new Key("key1")));
```

O resultado agora é o seguinte. Obter o valor vinculado à chave mutada retorna o valor vinculado à outra chave. E, como no exemplo anterior, você não consegue mais obter o valor vinculado à chave mutada.

```
Mutating key1 to key2
value2
null
```

Como você pode ver, mesmo em um exemplo muito simples, as coisas podem dar terrivelmente errado: a primeira chave não pode mais ser usada para acessar o valor correto, e você pode perder valores no processo.

Em resumo: se você realmente não pode evitar usar chaves mutáveis, não as mute. Mas sua melhor escolha é usar chaves imutáveis.

## Aprofundando na Estrutura de HashSet

Você pode estar se perguntando por que seria interessante falar sobre a classe [`HashSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/HashSet.html>) nesta seção? Bem, acontece que a classe [`HashSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/HashSet.html>) é, na verdade, construída sobre um [`HashMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/HashMap.html>) interno. Assim, as duas classes compartilham algumas características comuns.

Aqui está o código do [`add(element)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/HashSet.html#add\(E\)>) da classe [`HashSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/HashSet.html>):

```java
public boolean add(E e) {
    return map.put(e, PRESENT)==null;
}
```

O que você pode ver é que, na verdade, um hashset armazena seu object em um hashmap (a palavra-chave `transient` não é relevante). Seus objects são as chaves deste hashmap, e o valor é apenas um placeholder, um object sem significado.

O ponto importante a lembrar aqui é que se você mutar seus objects depois de adicioná-los a um set, você pode encontrar bugs estranhos em sua aplicação, que serão difíceis de corrigir.

Vamos pegar o exemplo anterior novamente, com a classe `Key` mutável. Desta vez, você vai adicionar instâncias desta classe a um set.

```java
Set<Key> set = new HashSet<>();
Key key1 = new Key("key1");
Key key2 = new Key("key2");
set.add(key1);
set.add(key2);
System.out.println(set);
System.out.println("Mutating key1 to key3");
key1.setKey("key3");
System.out.println(set);
```

Executar este código produz o seguinte resultado:

```
[Key{key='key2'}, Key{key='key1'}]
Mutating key1 to key3
[Key{key='key2'}, Key{key='key3'}]
```

Você pode ver que, na verdade, o primeiro elemento e o último elemento do set são os mesmos:

```java
System.out.println(set.contains(key1));
System.out.println(set.contains(new Key("key1")));
System.out.println(set.contains(new Key("key3")));
```

Se você executar esta última parte do código, obterá o seguinte resultado:

```
true
false
true
```

Neste exemplo, você viu que mutar um object depois de adicionado a um set pode levar a ter o mesmo object mais de uma vez neste set. Simplificando, não faça isso!

### Neste tutorial

Evitando o Uso de Chaves Mutáveis Aprofundando na Estrutura de HashSet

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Mantendo Chaves Ordenadas com SortedMap e NavigableMap](<#/doc/tutorials/api/collections-framework/sorted-maps>)

➜

**Tutorial Atual**

Escolhendo Tipos Imutáveis para Sua Chave

➜

**Próximo na Série**

[Escolhendo a Implementação Certa Entre ArrayList e LinkedList](<#/doc/tutorials/api/collections-framework/arraylist-vs-linkedlist>)

**Anterior na Série:** [Mantendo Chaves Ordenadas com SortedMap e NavigableMap](<#/doc/tutorials/api/collections-framework/sorted-maps>)

**Próximo na Série:** [Escolhendo a Implementação Certa Entre ArrayList e LinkedList](<#/doc/tutorials/api/collections-framework/arraylist-vs-linkedlist>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ O Framework de Coleções ](<#/doc/tutorials/api/collections-framework>) > Escolhendo Tipos Imutáveis para Sua Chave