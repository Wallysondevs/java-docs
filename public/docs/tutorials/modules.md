# Módulos

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > Módulos

# Módulos

1.  [Introdução aos Módulos em Java](<#/doc/tutorials/modules/intro>)

    Entenda os fundamentos do sistema de módulos, como criar e construir módulos, e como aumentar a manutenibilidade e o encapsulamento.

2.  [Acesso Reflexivo com Módulos Abertos e Pacotes Abertos](<#/doc/tutorials/modules/opening-for-reflection>)

    Use pacotes abertos e módulos abertos para permitir acesso reflexivo a pacotes que de outra forma seriam encapsulados.

3.  [Dependências Opcionais com `requires static`](<#/doc/tutorials/modules/optional-dependencies>)

    Use `requires static` para dependências opcionais - módulos requeridos desta forma são acessíveis em tempo de compilação, mas podem estar ausentes em tempo de execução.

4.  [Legibilidade Implícita com `requires transitive`](<#/doc/tutorials/modules/implied-readability>)

    Use `requires transitive` para implicar legibilidade, onde um módulo passa sua dependência em outro módulo adiante, permitindo que outros módulos o leiam sem depender explicitamente dele.

5.  [`exports` e `opens` Qualificados](<#/doc/tutorials/modules/qualified-exports-opens>)

    Use `exports ... to ...` e `opens ... to ...` para limitar a acessibilidade de pacotes exportados ou abertos a módulos específicos.

6.  [Desacoplando Módulos com Serviços](<#/doc/tutorials/modules/services>)

    Desacople usuários e provedores de um serviço com a API `ServiceLoader` do Java, que o sistema de módulos torna um conceito de primeira classe com as diretivas `uses` e `provides` na declaração do módulo.

7.  [Código no Class Path - o Módulo Sem Nome](<#/doc/tutorials/modules/unnamed-module>)

    Todos os JARs no class path, modulares ou não, tornam-se parte do módulo sem nome. Isso faz com que 'tudo seja um módulo', enquanto o caos do class path pode continuar.

8.  [Modularização Incremental com Módulos Automáticos](<#/doc/tutorials/modules/automatic-module>)

    JARs simples no module path tornam-se módulos automáticos, onde podem atuar como uma ponte de JARs modulares para o class path.

9.  [Construindo Módulos na Linha de Comando](<#/doc/tutorials/modules/building>)

    Aprenda a usar os comandos `javac`, `jar` e `java` para compilar, empacotar e iniciar sua aplicação modular manualmente - bom saber, mesmo que as ferramentas de construção façam a maior parte do trabalho pesado.

10. [Encapsulamento Forte (de Internos do JDK)](<#/doc/tutorials/modules/strong-encapsulation>)

    O encapsulamento forte é um pilar do sistema de módulos. Ele evita o uso (acidental) de APIs internas, principalmente tipos/membros não públicos em pacotes `java.*` e grande parte de `sun.*` e `com.sun.*`.

11. [Contornando o Encapsulamento Forte com `--add-exports` e `--add-opens`](<#/doc/tutorials/modules/add-exports-opens>)

    As flags de linha de comando `--add-exports` e `--add-opens` dão acesso a uma API interna, seja ela parte do JDK ou de uma dependência, exportando um pacote em tempo de compilação ou execução, ou abrindo-o para reflexão em tempo de execução.

12. [Estendendo o Grafo de Módulos com `--add-modules` e `--add-reads`](<#/doc/tutorials/modules/add-modules-reads>)

    As opções de linha de comando `--add-modules` e `--add-reads` expandem o grafo de módulos gerado pelo sistema de módulos com módulos adicionais (nós) e relações de legibilidade (arestas).

## Mais Aprendizado

[Voltar para a Lista de Tutoriais](<#/doc/tutorials/learn>)