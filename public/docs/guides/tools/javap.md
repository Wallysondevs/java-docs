# O Comando javap

## Nome

javap - desmonta um ou mais arquivos de classe

## Sinopse

`javap` [_opções_] _classes_...

_opções_
     Especifica as opções de linha de comando. Veja Opções para javap.
_classes_
    

Especifica uma ou mais classes separadas por espaços para serem processadas para anotações. Você pode especificar uma classe que pode ser encontrada no classpath pelo seu nome de arquivo, URL, ou pelo seu nome de classe totalmente qualificado.

Exemplos:

> `path/to/MyClass.class`

> `jar:file:///path/to/MyJar.jar!/mypkg/MyClass.class`

> `java.lang.Object`

## Descrição

O comando `javap` desmonta um ou mais arquivos de classe. A saída depende das opções utilizadas. Quando nenhuma opção é usada, o comando `javap` imprime os campos e métodos protegidos e públicos das classes passadas a ele.

O comando `javap` não reconhece JARs multirelease. Usar a forma de classpath do comando resulta na visualização da entrada base em todos os arquivos JAR, multirelease ou não. Usando a forma de URL, você pode usar a forma de URL de um argumento para especificar uma versão específica de uma classe a ser desmontada.

O comando `javap` imprime sua saída para `stdout`.

**Nota:**

Em ferramentas que suportam opções no estilo `--`, as opções no estilo GNU podem usar o sinal de igual (`=`) em vez de um espaço em branco para separar o nome de uma opção de seu valor.

## Opções para javap

`--help`, `-help` , `-h`, ou `-?`
     Imprime uma mensagem de ajuda para o comando `javap`.
`-version`
     Imprime informações de lançamento.
`-verbose` ou `-v`
     Imprime informações adicionais sobre a classe selecionada.
`-l`
     Imprime tabelas de linha e de variáveis locais.
`-public`
     Mostra apenas classes e membros públicos.
`-protected`
     Mostra apenas classes e membros protegidos e públicos.
`-package`
     Mostra classes e membros de pacote/protegidos/públicos (padrão).
`-private` ou `-p`
     Mostra todas as classes e membros.
`-c`
     Imprime o código desmontado, por exemplo, as instruções que compõem os bytecodes Java, para cada um dos métodos na classe.
`-s`
     Imprime assinaturas de tipo internas.
`-sysinfo`
     Mostra informações do sistema (caminho, tamanho, data, hash SHA-256) da classe sendo processada.
`-verify`
     Imprime informações adicionais de verificação de classe.
`-constants`
     Mostra constantes `static final`.
`--module` _módulo_ ou `-m` _módulo_
     Especifica o módulo contendo as classes a serem desmontadas.
`--module-path` _caminho_
     Especifica onde encontrar módulos de aplicação.
`--system` _jdk_
     Especifica onde encontrar módulos do sistema.
`--class-path` _caminho_ , `-classpath` _caminho_ , ou `-cp` _caminho_
     Especifica o caminho que o comando `javap` usa para encontrar arquivos de classe do usuário. Ele substitui o padrão ou a variável de ambiente `CLASSPATH` quando definida.
`-bootclasspath` _caminho_
     Substitui o local dos arquivos de classe de bootstrap.
`--multi-release` _versão_
     Especifica a versão a ser selecionada em arquivos JAR multirelease.
`-J` _opção_
    

Passa a opção especificada para a JVM. Por exemplo:
```
    javap -J-version
    
    javap -J-Djava.security.manager -J-Djava.security.policy=MyPolicy MyClassName
```

Veja _Overview of Java Options_ em [java](<#/doc/guides/tools/java>).

## Exemplo de javap

Compile a seguinte classe `HelloWorldFrame`:
```java
    import java.awt.Graphics;
    
    import javax.swing.JFrame;
    import javax.swing.JPanel;
    
    public class HelloWorldFrame extends JFrame {
    
       String message = "Hello World!";
    
       public HelloWorldFrame(){
            setContentPane(new JPanel(){
                @Override
                protected void paintComponent(Graphics g) {
                    g.drawString(message, 15, 30);
                }
            });
            setSize(100, 100);
        }
        public static void main(String[] args) {
            HelloWorldFrame frame = new HelloWorldFrame();
            frame.setVisible(true);
    
        }
    
    }
```

A saída do comando `javap HelloWorldFrame.class` produz o seguinte:
```
    Compiled from "HelloWorldFrame.java"
    public class HelloWorldFrame extends javax.swing.JFrame {
      java.lang.String message;
      public HelloWorldFrame();
      public static void main(java.lang.String[]);
    }
```

A saída do comando `javap -c HelloWorldFrame.class` produz o seguinte:
```
    Compiled from "HelloWorldFrame.java"
    public class HelloWorldFrame extends javax.swing.JFrame {
      java.lang.String message;
    
      public HelloWorldFrame();
        Code:
           0: aload_0
           1: invokespecial #1        // Method javax/swing/JFrame."<init>":()V
           4: aload_0
           5: ldc           #2        // String Hello World!
           7: putfield      #3        // Field message:Ljava/lang/String;
          10: aload_0
          11: new           #4        // class HelloWorldFrame$1
          14: dup
          15: aload_0
          16: invokespecial #5        // Method HelloWorldFrame$1."<init>":(LHelloWorldFrame;)V
          19: invokevirtual #6        // Method setContentPane:(Ljava/awt/Container;)V
          22: aload_0
          23: bipush        100
          25: bipush        100
          27: invokevirtual #7        // Method setSize:(II)V
          30: return
    
      public static void main(java.lang.String[]);
        Code:
           0: new           #8        // class HelloWorldFrame
           3: dup
           4: invokespecial #9        // Method "<init>":()V
           7: astore_1
           8: aload_1
           9: iconst_1
          10: invokevirtual #10       // Method setVisible:(Z)V
          13: return
    }
```