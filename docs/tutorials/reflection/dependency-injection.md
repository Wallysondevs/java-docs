# Criando um Framework de Injeção de Dependência

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de Reflection ](<#/doc/tutorials/reflection>) > Criando um Framework de Injeção de Dependência

**Anterior na Série**

[Criando um Interceptor com Anotações](<#/doc/tutorials/reflection/interceptor>)

➜

**Tutorial Atual**

Criando um Framework de Injeção de Dependência

➜

Este é o fim da série!

**Anterior na Série:** [Criando um Interceptor com Anotações](<#/doc/tutorials/reflection/interceptor>)

# Criando um Framework de Injeção de Dependência

O segundo exemplo que você vai executar consiste em projetar um framework simples de injeção de dependência. Este é um sistema que existe em Java EE, Jakarta EE e outros frameworks de aplicação corporativa. O conceito é simples: em vez de criar os objetos que sua aplicação precisa por conta própria, você delega essa tarefa a uma factory. Esta factory pode então explorar sua classe de forma reflexiva, verificar se alguns campos precisam ser inicializados e, se for o caso, fazer isso por você.

## O que é Injeção de Dependência?

A Injeção de Dependência é usada em aplicações para garantir que todos os seus objetos de negócio sejam inicializados corretamente e que todos os seus campos recebam um valor correto ao fazer isso. Inicializar um conjunto de objetos de negócio pode ser complexo, pois seus objetos dependem de outros objetos colaboradores, que precisam ser inicializados adequadamente em uma ordem específica. Frameworks de injeção de dependência podem ajudar muito nisso.

Esta seção mostra duas funcionalidades que esses frameworks oferecem. A primeira é o conceito de singleton, e a segunda é a própria injeção de dependência.

## Criando uma Bean Factory

Vamos primeiro implementar uma bean factory simples. Ou seja, uma factory que você pode usar com o seguinte padrão.

```java
public class Main {
  public static void main(String[] args) {
    BeanFactory beanFactory = BeanFactory.SINGLETON;
    Message message = beanFactory.getInstanceOf(Message.class, "Hello");
    System.out.println(message.getMessage());
  }
}

class Message {
  private final String message;

  public Message(String message) {
    this.message = message;
  }

  public String getMessage() {
    return message;
  }
}
```

Esta classe implementa o padrão singleton, que você pode facilmente implementar com uma enumeração. Em seguida, ela possui um método `getInstanceOf()`, que recebe uma classe, a qual você deseja construir uma instância, e os argumentos recebidos pelo construtor desta classe.

A implementação da classe `BeanFactory` é bastante simples.

Primeiro, você precisa de um array com os tipos dos argumentos que você recebe. Isso pode ser feito com o seguinte padrão de stream.

```java
public enum BeanFactory {
  SINGLETON;

  public <T> T getInstanceOf(Class<T> beanClass, Object... arguments) {
    Class<?>[] argumentTypes = Stream.of(arguments)
        .map(Object::getClass)
        .toArray(Class[]::new);
    // ...
  }
}
```

Segundo, você precisa localizar o construtor correspondente da classe `beanClass`. Se ele não existir, uma exceção é lançada.

```java
public enum BeanFactory {
  SINGLETON;

  public <T> T getInstanceOf(Class<T> beanClass, Object... arguments) {
    Class<?>[] argumentTypes = Stream.of(arguments)
        .map(Object::getClass)
        .toArray(Class[]::new);
    try {
      Constructor<T> constructor = beanClass.getConstructor(argumentTypes);
      // ...
    } catch (NoSuchMethodException e) {
      throw new IllegalArgumentException("No constructor found for " + beanClass.getName() + " with arguments " + Arrays.toString(argumentTypes), e);
    }
  }
}
```

E, por último, você precisa invocar este construtor com os argumentos que você recebeu.

```java
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.util.Arrays;
import java.util.stream.Stream;

public enum BeanFactory {
  SINGLETON;

  public <T> T getInstanceOf(Class<T> beanClass, Object... arguments) {
    Class<?>[] argumentTypes = Stream.of(arguments)
        .map(Object::getClass)
        .toArray(Class[]::new);
    try {
      Constructor<T> constructor = beanClass.getConstructor(argumentTypes);
      return constructor.newInstance(arguments);
    } catch (NoSuchMethodException e) {
      throw new IllegalArgumentException("No constructor found for " + beanClass.getName() + " with arguments " + Arrays.toString(argumentTypes), e);
    } catch (InvocationTargetException | InstantiationException | IllegalAccessException e) {
      throw new IllegalArgumentException("Cannot instantiate " + beanClass.getName(), e);
    }
  }
}
```

Lembre-se que para o [`getConstructor()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#getConstructor\(java.lang.Class...\)>) encontrar o construtor que você está procurando, os tipos precisam ser exatos. Se o construtor aceitar um [`CharSequence`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/CharSequence.html>) em vez de uma [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>), então a chamada `beanFactory.getInstanceOf(Message.class, "Hello")` lançaria uma [`NoSuchMethodException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/NoSuchMethodException.html>).

Executar o método `main()` anterior resulta no seguinte.

```
Hello
```

## Criando Singletons

Um padrão muito comum usado em aplicações corporativas é ter sua factory para criar singletons. Isso faz sentido se seus beans são usados para acessar serviços como um banco de dados ou algum servidor REST. Você pode implementar tal padrão na classe `BeanFactory`.

Vamos primeiro definir a anotação que você precisa.

```java
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
public @interface Singleton {
}
```

E vamos criar uma classe de serviço, por exemplo `DBService`.

```java
@Singleton
public class DBService {
  public DBService() {
    System.out.println("DBService created");
  }

  public String getDBConnection() {
    return "DB Connection";
  }
}
```

A `BeanFactory` precisa ser refatorada para detectar esta anotação `@Singleton` e, nesse caso, criar apenas uma instância dessa classe. Esta parte é um pouco sutil de escrever, porque precisa de um registro, que precisa ser thread-safe e usado de forma thread-safe.

Aqui está a classe. Você pode ver que o código que você escreveu na iteração anterior foi colocado em um método privado `instantiateBeanClass()`, para evitar ter que duplicá-lo no método `getInstanceOf()`.

```java
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.util.Arrays;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Stream;

public enum BeanFactory {
  SINGLETON;

  private final Map<Class<?>, Object> registry = new ConcurrentHashMap<>();

  public <T> T getInstanceOf(Class<T> beanClass, Object... arguments) {
    if (beanClass.isAnnotationPresent(Singleton.class)) {
      Object instance = registry.get(beanClass);
      if (instance == null) {
        instance = instantiateBeanClass(beanClass, arguments);
        Object oldInstance = registry.putIfAbsent(beanClass, instance);
        if (oldInstance != null) {
          instance = oldInstance;
        }
      }
      return beanClass.cast(instance);
    } else {
      return instantiateBeanClass(beanClass, arguments);
    }
  }

  private <T> T instantiateBeanClass(Class<T> beanClass, Object... arguments) {
    Class<?>[] argumentTypes = Stream.of(arguments)
        .map(Object::getClass)
        .toArray(Class[]::new);
    try {
      Constructor<T> constructor = beanClass.getConstructor(argumentTypes);
      return constructor.newInstance(arguments);
    } catch (NoSuchMethodException e) {
      throw new IllegalArgumentException("No constructor found for " + beanClass.getName() + " with arguments " + Arrays.toString(argumentTypes), e);
    } catch (InvocationTargetException | InstantiationException | IllegalAccessException e) {
      throw new IllegalArgumentException("Cannot instantiate " + beanClass.getName(), e);
    }
  }
}
```

O primeiro passo consiste em verificar se a anotação `@Singleton` foi declarada na classe `beanClass`. Se esta anotação não for encontrada, então o código continua como na primeira versão desta classe.

```java
    if (beanClass.isAnnotationPresent(Singleton.class)) {
      // ...
    } else {
      return instantiateBeanClass(beanClass, arguments);
    }
```

Se a anotação for encontrada, então você precisa impor o padrão Singleton. Para isso, você pode usar um registro, implementado por um [`ConcurrentMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/ConcurrentMap.html>), que é uma extensão thread-safe da interface [`Map`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>).

```java
  private final Map<Class<?>, Object> registry = new ConcurrentHashMap<>();
```

Se o registro já tiver uma instância de `beanClass`, então o código a retorna, não há necessidade de construir outra.

```java
      Object instance = registry.get(beanClass);
      if (instance == null) {
        // ...
      }
      return beanClass.cast(instance);
```

Então você precisa criar uma nova instância de `beanClass`. Note que esta parte pode ser executada por várias threads concorrentemente. Então, neste ponto, você pode construir várias instâncias de `beanClass`. Você poderia evitar isso sincronizando todo este código, mas isso criaria alguma contenção.

```java
        instance = instantiateBeanClass(beanClass, arguments);
```

Note que a chamada para [`ConcurrentMap.putIfAbsent()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/ConcurrentMap.html#putIfAbsent\(\)>) é uma chamada atômica no caso de [`ConcurrentMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/ConcurrentMap.html>), então você não precisa sincronizar esta parte.

```java
        Object oldInstance = registry.putIfAbsent(beanClass, instance);
```

Há uma ressalva, no entanto: o valor que você passou para [`ConcurrentMap.putIfAbsent()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/ConcurrentMap.html#putIfAbsent\(\)>) pode não ser aquele que, no final, foi colocado no mapa. Isso poderia acontecer se várias threads chamassem este [`ConcurrentMap.putIfAbsent()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/ConcurrentMap.html#putIfAbsent\(\)>) concorrentemente, com instâncias diferentes. No final, há um vencedor, e pode ser outra thread que não a sua. Então, para superar isso, você precisa chamar [`ConcurrentMap.get()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#get\(java.lang.Object\)>), para retornar o singleton.

```java
        if (oldInstance != null) {
          instance = oldInstance;
        }
```

Com esta classe, você pode executar este método `main()`.

```java
public class Main {
  public static void main(String[] args) {
    BeanFactory beanFactory = BeanFactory.SINGLETON;
    DBService dbService1 = beanFactory.getInstanceOf(DBService.class);
    DBService dbService2 = beanFactory.getInstanceOf(DBService.class);
    System.out.println(dbService1 == dbService2);
  }
}
```

Executar o exemplo anterior imprime o seguinte.

```
DBService created
true
```

## Injetando Dependências

O último passo é habilitar a varredura de `beanClass` em busca de campos anotados.

Vamos definir a seguinte anotação.

```java
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
public @interface Inject {
}
```

E vamos definir o seguinte serviço, que depende de `DBService`.

```java
public class MyApplication {
  @Inject
  private DBService dbService;

  public MyApplication() {
    System.out.println("MyApplication created");
  }

  public String getDBConnection() {
    return dbService.getDBConnection();
  }
}
```

O que você precisa agora é que sua factory coloque uma instância correta de `DBService` no campo certo de `MyApplication`. Então você precisa adicionar algum código no método privado `instantiateBeanClass()` para escanear os campos, procurando aqueles que declaram a anotação `@Inject`.

Vamos refatorar este método privado para fazer o seguinte.

```java
import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.util.Arrays;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Stream;

public enum BeanFactory {
  SINGLETON;

  private final Map<Class<?>, Object> registry = new ConcurrentHashMap<>();

  public <T> T getInstanceOf(Class<T> beanClass, Object... arguments) {
    if (beanClass.isAnnotationPresent(Singleton.class)) {
      Object instance = registry.get(beanClass);
      if (instance == null) {
        instance = instantiateBeanClass(beanClass, arguments);
        Object oldInstance = registry.putIfAbsent(beanClass, instance);
        if (oldInstance != null) {
          instance = oldInstance;
        }
      }
      return beanClass.cast(instance);
    } else {
      return instantiateBeanClass(beanClass, arguments);
    }
  }

  private <T> T instantiateBeanClass(Class<T> beanClass, Object... arguments) {
    Class<?>[] argumentTypes = Stream.of(arguments)
        .map(Object::getClass)
        .toArray(Class[]::new);
    try {
      Constructor<T> constructor = beanClass.getConstructor(argumentTypes);
      T bean = constructor.newInstance(arguments);
      for (Field field : beanClass.getDeclaredFields()) {
        if (field.isAnnotationPresent(Inject.class)) {
          field.setAccessible(true);
          field.set(bean, getInstanceOf(field.getType()));
        }
      }
      return bean;
    } catch (NoSuchMethodException e) {
      throw new IllegalArgumentException("No constructor found for " + beanClass.getName() + " with arguments " + Arrays.toString(argumentTypes), e);
    } catch (InvocationTargetException | InstantiationException | IllegalAccessException e) {
      throw new IllegalArgumentException("Cannot instantiate " + beanClass.getName(), e);
    }
  }
}
```

O código para construir o bean a partir de `beanClass` e `arguments` é o mesmo. O que você obtém neste ponto é um bean, mas todos os seus campos são nulos.

```java
      T bean = constructor.newInstance(arguments);
```

O próximo passo é obter todos os campos declarados deste bean (independentemente de seus modificadores de visibilidade) e manter aqueles que declaram a anotação `@Inject`.

```java
      for (Field field : beanClass.getDeclaredFields()) {
        if (field.isAnnotationPresent(Inject.class)) {
          // ...
        }
      }
```

Então, para cada um desses campos anotados, você precisa instanciar o tipo correto e definir o campo para este valor. Note que a instanciação usa `BeanFactory`, então esta instanciação segue a declaração `@Singleton` que você pode ter nesta classe. Note que `setAccessible(true)` é chamado independentemente, mesmo que o campo seja público. Nesse caso, não seria necessário.

```java
          field.setAccessible(true);
          field.set(bean, getInstanceOf(field.getType()));
```

Você pode então executar o seguinte código para verificar se tudo foi configurado corretamente.

```java
public class Main {
  public static void main(String[] args) {
    BeanFactory beanFactory = BeanFactory.SINGLETON;
    MyApplication myApplication = beanFactory.getInstanceOf(MyApplication.class);
    System.out.println(myApplication.getDBConnection());
  }
}
```

Executar o código anterior imprime o seguinte.

```
MyApplication created
DBService created
DB Connection
```

### Neste tutorial

O que é Injeção de Dependência? Criando uma Bean Factory Criando Singletons Injetando Dependências

Última atualização: 25 de julho de 2024

**Anterior na Série**

[Criando um Interceptor com Anotações](<#/doc/tutorials/reflection/interceptor>)

➜

**Tutorial Atual**

Criando um Framework de Injeção de Dependência

➜

Este é o fim da série!

**Anterior na Série:** [Criando um Interceptor com Anotações](<#/doc/tutorials/reflection/interceptor>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de Reflection ](<#/doc/tutorials/reflection>) > Criando um Framework de Injeção de Dependência