# Diretrizes para Nomear e Rotular Eventos

## 3 Diretrizes para Nomear e Rotular Eventos

Você deve nomear e rotular todos os seus eventos definindo as anotações @Name e @Label.

Diretrizes para Nomear Eventos

Use o seguinte formato para nomear seus eventos, onde `www.example.com` é o domínio da sua organização e `Name` é o nome da sua classe de evento:
```
    com.example.Name
```

Ao nomear sua classe de evento, omita a palavra "Event".

Por padrão, um evento obtém seu nome a partir de seu nome de classe totalmente qualificado. Por exemplo, no exemplo `SetMetadataSample.java` (veja [Metadados de Evento](<#/doc/guides/jrtflightrecorder/event-metadata>)), o nome padrão do evento `Hello` é `frexamples.SetMetadataSample$Hello`.

Isso funciona bem para experimentação, mas evite omitir a anotação @Name para código de produção. Você pode ter que refatorar seu código-fonte e mover a classe de evento para um pacote diferente. Se você não especificou o nome do evento com a anotação @Name, então a refatoração de uma classe de evento pode quebrar código ou arquivos de configuração que configuram o evento. Também pode quebrar código que analisa arquivos de gravação que usam o nome padrão para identificar um evento.

O nome de classe totalmente qualificado também pode conter strings redundantes ou desnecessárias, como `jfr`, `internal`, `events` ou `Events`, que você deve omitir.

Um nome de evento deve ser curto, mas não tão curto a ponto de colidir com outras organizações ou produtos. O nome deve ser fácil de entender para usuários que desejam configurar o evento. Isso é especialmente verdadeiro se o evento faz parte de um framework ou biblioteca que se destina a ser usado por outros. Geralmente é suficiente colocar todos os eventos de uma biblioteca ou produto no mesmo namespace. Por exemplo, todos os eventos para OpenJDK estão no namespace `jdk`. Não há sub-namespaces para `hotspot`, `gc` ou `compiler`, pois isso apenas complicaria as coisas. No entanto, é possível dividir eventos em categorias com a anotação @Category, que você pode alterar livremente sem interrupção.

Diretrizes para Rotular Eventos

Para rótulos, use capitalização estilo título: Capitalize a primeira e a última palavra e todos os substantivos, pronomes, adjetivos, verbos e advérbios. Não inclua pontuação final. Assim como nos nomes de eventos, omita a palavra "Event". Observe que você não deve usar @Label como um identificador; use a anotação @Name em vez disso.

Use rótulos para exibir eventos em interfaces de usuário, como uma ferramenta de visualização personalizada. Por exemplo, o Event Browser do JDK Mission Control usa o rótulo para exibir eventos em sua Árvore de Tipos de Evento.