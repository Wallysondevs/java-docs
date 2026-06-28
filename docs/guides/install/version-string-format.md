# Formato da String de Versão

## 2 Formato da String de Versão

A plataforma Java SE adotou um modelo de lançamento baseado em tempo, com o JDK sendo lançado a cada seis meses.

A partir do JDK 10 e versões posteriores, o formato da string de versão, que reflete o modelo de lançamento baseado em tempo da plataforma Java SE, é `$FEATURE.$INTERIM.$UPDATE.$PATCH`.

  * `$FEATURE` é o número da versão que é incrementado a cada lançamento de recurso. O lançamento de recurso contém novas funcionalidades e alterações nas funcionalidades existentes, conforme especificado pela especificação da plataforma Java SE. O número da versão é incrementado a cada seis meses. Por exemplo, o número da versão para o lançamento de março de 2018 é 10, o número da versão para o lançamento de setembro de 2018 é 11, e assim por diante.

  * `$INTERIM` é o número da versão que é incrementado a cada lançamento provisório, que contém correções de bugs e melhorias. Um lançamento provisório não contém alterações incompatíveis, remoções de recursos, nem quaisquer alterações nas APIs padrão. O número da versão para o lançamento provisório é sempre zero (0), pois o modelo de lançamento de seis meses não inclui lançamentos provisórios. No entanto, este número de versão é reservado para futuros lançamentos provisórios, se houver.

  * `$UPDATE` é o número da versão que é incrementado para um lançamento de atualização, que inclui correções para problemas de segurança, regressões e bugs em novos recursos. O número da versão é incrementado um mês após o lançamento `$FEATURE` e a cada três meses a partir daí. Por exemplo, a string de versão completa para o lançamento de atualização de outubro é 25.0.1, a string de versão completa para o lançamento de atualização de janeiro é 25.0.2, e assim por diante.

  * `$PATCH` é o número da versão que é incrementado para um lançamento de patch de emergência para corrigir um problema crítico.

A string de versão não possui elementos zero à direita. Por exemplo, se o valor de `$FEATURE` for 25, o valor de `$INTERIM` for 0, o valor de `$UPDATE` for 1 e o valor de `$PATCH` for 0, então a string de versão completa é 25.0.1.