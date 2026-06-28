# Introdução ao JShell

## 1 Introdução ao JShell

A ferramenta Java Shell (JShell) é uma ferramenta interativa para aprender a linguagem de programação Java e prototipar código Java. Foi introduzida no JDK 9. O JShell é uma ferramenta Read-Evaluate-Print Loop (REPL), que avalia declarações, instruções e expressões à medida que são inseridas e mostra imediatamente os resultados. A ferramenta é executada a partir da linha de comando.

Tópicos

  * [Por Que Usar o JShell?](<#/doc/guides/jshell/introduction-jshell>)

  * [Iniciando e Parando o JShell](<#/doc/guides/jshell/introduction-jshell>)

Para informações de referência sobre esta ferramenta, consulte [O Comando jshell](<#/>) nas Especificações da Ferramenta do Java Development Kit.

### Por Que Usar o JShell?

Usando o JShell, você pode inserir elementos do programa um de cada vez, ver imediatamente o resultado e fazer ajustes conforme necessário.

O desenvolvimento de programas Java geralmente envolve o seguinte processo:

  * Escrever um programa completo.

  * Compilá-lo e corrigir quaisquer erros.

  * Executar o programa.

  * Descobrir o que está errado com ele.

  * Editá-lo.

  * Repetir o processo.

O JShell ajuda você a testar códigos e explorar opções facilmente enquanto desenvolve seu programa. Você pode testar instruções individuais, experimentar diferentes variações de um método e experimentar APIs desconhecidas dentro de uma sessão JShell. O JShell não substitui uma IDE. Ao desenvolver seu programa, cole o código no JShell para testá-lo e, em seguida, cole o código funcionando do JShell em seu editor de programa ou IDE.

### Iniciando e Parando o JShell

O JShell foi introduzido no JDK 9. Para iniciar o JShell, digite o comando `jshell` na linha de comando.

O JDK 9 ou superior deve estar instalado em seu sistema. Se seu path não incluir o diretório bin, por exemplo `java-home/jdk-16.0.1/bin`, então inicie a ferramenta de dentro desse diretório.

O exemplo a seguir mostra o comando e a resposta do JShell. O texto que você digita é mostrado em negrito:
```
    % jshell
    |  Welcome to JShell -- Version 17.0.1
    |  For an introduction type: /help intro
    
    jshell>
```

Os exemplos neste tutorial usam o modo verbose. O modo verbose é recomendado enquanto você trabalha neste tutorial para que o que você vê corresponda aos exemplos. Quando você estiver mais familiarizado com a ferramenta, poderá preferir executá-la no modo normal ou em um modo mais conciso.

Para iniciar o JShell no modo verbose, use a opção `-v`:
```
    % jshell -v
```

Para sair do JShell, digite `/exit`:
```
    jshell> /exit
    |  Goodbye
```