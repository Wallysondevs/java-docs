# Código Externo

## 5 Código Externo

Classes externas são acessadas a partir de uma sessão JShell através do classpath. Módulos externos são acessados através do module path, da configuração de módulos adicionais e da configuração de exports de módulos.

Tópicos

  * [Configurando o Classpath](<#/doc/guides/jshell/external-code>)

  * [Configurando Opções de Módulo](<#/doc/guides/jshell/external-code>)




### Configurando o Classpath

Você pode usar código externo acessível através do classpath em sua sessão JShell.

Defina o classpath na linha de comando conforme mostrado no exemplo a seguir:
```
     % jshell --class-path myOwnClassPath
```

Aponte seu classpath para diretórios ou arquivos JAR que contêm os pacotes que você deseja acessar. O código deve ser compilado em arquivos de classe. Código no pacote padrão, também conhecido como pacote sem nome, não pode ser acessado do JShell. Depois de definir o classpath, esses pacotes podem ser importados para sua sessão:
```
    jshell> import my.cool.code.*
```

Você também pode usar o comando `/env` para definir o classpath, conforme mostrado no exemplo a seguir:
```
    jshell> /env --class-path myOwnClassPath
    |  Setting new options and restoring state.
```

O comando `/env` redefine o estado de execução, recarregando quaisquer snippets atuais com a nova configuração de classpath ou outra configuração de ambiente inserida com o comando.

### Configurando Opções de Módulo

Módulos são suportados no JShell. O module path pode ser definido, módulos adicionais para resolver podem ser especificados e exports de módulos podem ser fornecidos.

Opções de módulo podem ser fornecidas como opções para o comando `/env` ou na linha de comando, conforme mostrado no exemplo a seguir:
```
     % jshell --module-path myOwnModulePath  --add-modules my.module
```

Para ver as configurações de ambiente atuais, use `/env` sem opções. O exemplo a seguir inclui informações de classpath que foram definidas em [Configurando o Classpath](<#/doc/guides/jshell/external-code>):
```
     jshell> /env
     |     --add-modules my.module
     |     --module-path myOwnModulePath
     |     --class-path myOwnClassPath
```

Para detalhes sobre as opções, digite o seguinte comando:
```
    jshell> /help context
```