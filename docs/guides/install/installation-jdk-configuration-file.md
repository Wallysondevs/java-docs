# Instalação do JDK com um Arquivo de Configuração na Plataforma Microsoft Windows

## 6 Instalação do JDK com um Arquivo de Configuração na Plataforma Microsoft Windows

Você pode usar um arquivo de configuração para padronizar instalações do JDK e especificar opções que não estão disponíveis na linha de comando.

Este tópico descreve o arquivo de configuração que complementa as opções de instalação do JDK via linha de comando. Um arquivo de configuração do instalador é uma alternativa e uma extensão das opções especificadas na linha de comando do instalador.

Este tópico inclui as seguintes seções:

  * [Usando um Arquivo de Configuração](<#/doc/guides/install/installation-jdk-configuration-file>)

  * [Opções do Arquivo de Configuração](<#/doc/guides/install/installation-jdk-configuration-file>)

  * [Exemplo de Arquivo de Configuração](<#/doc/guides/install/installation-jdk-configuration-file>)

### Usando um Arquivo de Configuração

Use a opção de linha de comando `INSTALLCFG` para especificar um arquivo de configuração durante a instalação do JDK no Windows:

`jdk INSTALLCFG=configuration_file_path `

  * `jdk` é o nome base do arquivo do instalador, por exemplo, `jdk-25_windows-x64_bin.exe`.

  * `configuration_file_path` é o caminho para o arquivo de configuração.

### Opções do Arquivo de Configuração

A Tabela lista as opções do arquivo de configuração do instalador que se aplicam ao sistema operacional Windows.

Nota:

Substitua o valor de `Enable` por `1` e o valor de `Disable` por `0`.

Tabela 6-1 Opções do Arquivo de Configuração

Opção | Sistemas Operacionais | Valores | Descrição
---|---|---|---
`INSTALL_SILENT=` | Windows | `Enable`, `Disable` | Instalação silenciosa (não interativa). Padrão: `Disable`
`INSTALLDIR=` | Windows | `path` | Pasta/diretório onde os arquivos são instalados. Padrão: Caminho padrão do sistema operacional. Para Windows, isso funcionará apenas na primeira instalação.
`REBOOT=` | Windows | `Enable`, `Disable` | Se desabilitado, o instalador nunca solicitará que você reinicie seu computador após instalar o JDK. No entanto, na maioria dos casos, o instalador não precisa reiniciar seu computador após instalar o JRE. Padrão: `Enable`

### Exemplo de Arquivo de Configuração

O seguinte é um exemplo de arquivo de configuração para Windows. Ele especifica o seguinte:

  * Realizar uma instalação silenciosa.

  * Instalar o JDK no diretório `C:\java\jdk`.

Exemplo 6-1 Exemplo de Arquivo de Configuração para Windows
```
    INSTALL_SILENT=Enable
    INSTALLDIR=C:\java\jdk
```