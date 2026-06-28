# Iterando sobre os Elementos de uma Collection

[Home](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ O Collections Framework ](<#/doc/tutorials/api/collections-framework>) > Iterando sobre os Elementos de uma Collection

**Anterior na Série**

[Armazenando Elementos em uma Collection](<#/doc/tutorials/api/collections-framework/collection-interface>)

➜

**Tutorial Atual**

Iterando sobre os Elementos de uma Collection

➜

**Próximo na Série**

[Estendendo Collection com List](<#/doc/tutorials/api/collections-framework/lists>)

**Anterior na Série:** [Armazenando Elementos em uma Collection](<#/doc/tutorials/api/collections-framework/collection-interface>)

**Próximo na Série:** [Estendendo Collection com List](<#/doc/tutorials/api/collections-framework/lists>)

# Iterando sobre os Elementos de uma Collection

## Usando o Padrão for-each

Sua escolha mais simples para iterar sobre os elementos de uma collection é usar o padrão for-each.

```java
import java.util.ArrayList;
import java.util.Collection;

public class ForEachPattern {
    public static void main(String[] args) {
        Collection<String> names = new ArrayList<>();
        names.add("João");
        names.add("Maria");
        names.add("Pedro");

        for (String name : names) {
            System.out.println(name);
        }
    }
}
```

A execução deste código produz o seguinte resultado:

```
João
Maria
Pedro
```

Este padrão é muito eficiente, desde que você precise apenas ler os elementos da sua collection. O padrão [`Iterator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Iterator.html>) permite remover alguns dos elementos da sua collection enquanto você itera sobre eles. Se você precisar fazer isso, então você deve usar o padrão [`Iterator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Iterator.html>).

## Usando um Iterator em uma Collection

Iterar sobre os elementos de uma collection usa um objeto especial, uma instância da interface [`Iterator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Iterator.html>). Você pode obter um objeto [`Iterator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Iterator.html>) de qualquer extensão da interface [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>). O método [`iterator()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#iterator\(\)>) é definido na interface [`Iterable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Iterable.html>), estendida pela interface [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>), e ainda mais estendida por todas as interfaces da hierarquia de collections.

Iterar sobre os elementos de uma collection usando este objeto é um processo de duas etapas.

1.  Primeiro você precisa verificar se há mais elementos a serem visitados com o método [`hasNext()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Iterator.html#hasNext\(\)>)
2.  Em seguida, você pode avançar para o próximo elemento com o método [`next()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Iterator.html#next\(\)>).

Se você chamar o método [`next()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Iterator.html#next\(\)>) mas não houver mais elementos na collection, você receberá uma [`NoSuchElementException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NoSuchElementException.html>). Chamar [`hasNext()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Iterator.html#hasNext\(\)>) não é obrigatório, ele está lá para ajudar você a garantir que realmente existe um próximo elemento.

Aqui está o padrão:

```java
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;

public class IteratorPattern {
    public static void main(String[] args) {
        Collection<String> names = new ArrayList<>();
        names.add("João");
        names.add("Maria");
        names.add("Pedro");

        Iterator<String> iterator = names.iterator();
        while (iterator.hasNext()) {
            String name = iterator.next();
            System.out.println(name);
        }
    }
}
```

Este código produz o seguinte resultado:

```
João
Maria
Pedro
```

A interface [`Iterator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Iterator.html>) possui um terceiro método: [`remove()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Iterator.html#remove\(\)>). Chamar este método remove o elemento atual da collection. Existem casos, no entanto, em que este método não é suportado, ele lançará uma [`UnsupportedOperationException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/UnsupportedOperationException.html>). Obviamente, chamar [`remove()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Iterator.html#remove\(\)>) em uma collection imutável não pode funcionar, então este é um desses casos. As implementações de [`Iterator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Iterator.html>) que você obtém de [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>), [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>) e [`HashSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/HashSet.html>) todas suportam esta operação de remoção.

## Atualizando uma Collection Enquanto Itera sobre Ela

Se você modificar o conteúdo de uma collection enquanto itera sobre ela, você pode receber uma [`ConcurrentModificationException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ConcurrentModificationException.html>). Obter esta exceção pode ser um pouco confuso, porque esta exceção também é usada em programação concorrente. No contexto do Collections Framework, você pode obtê-la sem tocar em programação multithread.

O código a seguir lança uma [`ConcurrentModificationException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ConcurrentModificationException.html>).

```java
import java.util.ArrayList;
import java.util.Collection;

public class ConcurrentModification {
    public static void main(String[] args) {
        Collection<String> names = new ArrayList<>();
        names.add("João");
        names.add("Maria");
        names.add("Pedro");

        for (String name : names) {
            if (name.equals("Maria")) {
                names.remove(name); // Isso lançará uma ConcurrentModificationException
            }
        }
    }
}
```

Se o que você precisa é remover os elementos de uma collection que satisfazem um determinado critério, você pode usar o método [`removeIf()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#removeIf\(java.util.function.Predicate\)>).

```java
import java.util.ArrayList;
import java.util.Collection;

public class RemoveIf {
    public static void main(String[] args) {
        Collection<String> names = new ArrayList<>();
        names.add("João");
        names.add("Maria");
        names.add("Pedro");

        names.removeIf(name -> name.equals("Maria"));

        for (String name : names) {
            System.out.println(name);
        }
    }
}
```

## Implementando a Interface Iterable

Agora que você viu o que é um iterator no Collection Framework, você pode criar uma implementação simples da interface [`Iterable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Iterable.html>).

Suponha que você precise criar uma classe `Range` que modele um intervalo de inteiros entre dois limites. Tudo o que você precisa fazer é iterar do primeiro inteiro ao último.

Você pode implementar a interface [`Iterable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Iterable.html>) com um record, um recurso introduzido no Java SE 16:

```java
import java.util.Iterator;
import java.util.NoSuchElementException;

public record Range(int start, int end) implements Iterable<Integer> {
    @Override
    public Iterator<Integer> iterator() {
        return new Iterator<>() {
            private int current = start;

            @Override
            public boolean hasNext() {
                return current <= end;
            }

            @Override
            public Integer next() {
                if (!hasNext()) {
                    throw new NoSuchElementException();
                }
                return current++;
            }
        };
    }
}
```

Você pode fazer o mesmo com uma classe comum, caso sua aplicação ainda não suporte Java SE 16. Observe que o código da implementação de [`Iterator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Iterator.html>) é exatamente o mesmo.

```java
import java.util.Iterator;
import java.util.NoSuchElementException;

public class RangeClass implements Iterable<Integer> {
    private final int start;
    private final int end;

    public RangeClass(int start, int end) {
        this.start = start;
        this.end = end;
    }

    @Override
    public Iterator<Integer> iterator() {
        return new Iterator<>() {
            private int current = start;

            @Override
            public boolean hasNext() {
                return current <= end;
            }

            @Override
            public Integer next() {
                if (!hasNext()) {
                    throw new NoSuchElementException();
                }
                return current++;
            }
        };
    }
}
```

Em ambos os casos, você pode usar uma instância de `Range` em uma instrução for-each, já que ela implementa [`Iterable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Iterable.html>):

```java
public class RangeDemo {
    public static void main(String[] args) {
        Range range = new Range(1, 5);
        for (int i : range) {
            System.out.println(i);
        }

        RangeClass rangeClass = new RangeClass(6, 10);
        for (int i : rangeClass) {
            System.out.println(i);
        }
    }
}
```

A execução deste código fornece o seguinte resultado:

```
1
2
3
4
5
6
7
8
9
10
```

### Neste tutorial

Usando o Padrão For-each Usando um Iterator em uma Collection Atualizando uma Collection Enquanto Itera sobre Ela Implementando a Interface Iterable

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Armazenando Elementos em uma Collection](<#/doc/tutorials/api/collections-framework/collection-interface>)

➜

**Tutorial Atual**

Iterando sobre os Elementos de uma Collection

➜

**Próximo na Série**

[Estendendo Collection com List](<#/doc/tutorials/api/collections-framework/lists>)

**Anterior na Série:** [Armazenando Elementos em uma Collection](<#/doc/tutorials/api/collections-framework/collection-interface>)

**Próximo na Série:** [Estendendo Collection com List](<#/doc/tutorials/api/collections-framework/lists>)

[Home](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ O Collections Framework ](<#/doc/tutorials/api/collections-framework>) > Iterando sobre os Elementos de uma Collection