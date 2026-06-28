# Próximos Passos

## 8 Próximos Passos

Depois que sua aplicação estiver funcionando no JDK 25, aqui estão algumas sugestões que podem ajudá-lo a aproveitar ao máximo a Plataforma Java SE:

  * Use a flag `--release` para compilar para a sua versão preferida do JDK. Veja [Compile Sua Aplicação se Necessário](<#/doc/guides/migrate/preparing-migration>) para detalhes.

  * Aproveite as sugestões da sua IDE para atualizar seu código com os recursos mais recentes.

  * Descubra se seu código está usando APIs descontinuadas executando a ferramenta de análise estática [jdeprscan](<#/>). Como já mencionado neste guia, APIs podem ser removidas do JDK, mas apenas com aviso prévio.

  * Familiarize-se com novos recursos como arquivos JAR multi-release (veja [jar](<#/>)).

  * Se você é um usuário de macOS, então habilite o novo pipeline de renderização (introduzido no JDK 17), que usa a Apple Metal API. Veja [JEP 382: Novo Pipeline de Renderização do macOS](<https://openjdk.java.net/jeps/382>). Esta opção não está habilitada por padrão.