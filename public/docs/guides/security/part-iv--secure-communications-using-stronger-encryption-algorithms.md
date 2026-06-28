# Parte IV : Comunicações Seguras Usando Algoritmos de Criptografia Mais Fortes

## Parte IV : Comunicações Seguras Usando Algoritmos de Criptografia Mais Fortes

### Exercício 6: Configurando para Usar Algoritmos de Criptografia Mais Fortes em um Ambiente Kerberos, para Proteger a Comunicação

Objetivo Deste Exercício

O objetivo deste exercício é aprender como usar vários algoritmos de criptografia Kerberos para proteger a comunicação. Java GSS/Kerberos oferece uma ampla gama de algoritmos de criptografia, incluindo AES256, AES128, 3DES, RC4-HMAC e DES.

Nota:

Tipos de criptografia baseados em DES, DES3 e RC4 são desabilitados por padrão. Se você deseja usar um desses tipos de criptografia desabilitados, você deve definir o parâmetro `allow_weak_crpyto` como `true` em seu arquivo de configuração Kerberos. Consulte [Configurações krb5.conf Suportadas](<#/doc/guides/security/kerberos-5-gss-api-mechanism>).

A seguir está uma lista de todos os tipos de criptografia suportados pelo provedor Java GSS/Kerberos no Java SE:

  * AES256-CTS
  * AES128-CTS
  * AES256-SHA2
  * AES128-SHA2
  * RC4-HMAC
  * DES3-CBC-SHA1
  * DES-CBC-MD5
  * DES-CBC-CRC

Passos a Seguir

  1. Configure o Key Distribution Center (KDC) e atualize o banco de dados Kerberos.

Primeiro, você precisa atualizar para usar o KDC que suporta os tipos de criptografia Kerberos necessários.

Você precisa atualizar o banco de dados Kerberos para gerar as novas chaves com algoritmos de criptografia mais fortes.

  2. Se necessário, edite o arquivo de configuração Kerberos ([`krb5.conf`](<#/doc/guides/security/source-code-advanced-security-programming-java-se-authentication-secure-communication-single-sign>)).

Você pode editar o arquivo de configuração Kerberos para selecionar os tipos de criptografia desejados. Por exemplo, para habilitar apenas o tipo de criptografia AES256-CTS, adicione o seguinte:
`[libdefaults]
         default_tkt_enctypes = aes256-cts
         default_tgs_enctypes = aes256-cts
         permitted_enctypes = aes256-cts
```

Para habilitar apenas o tipo de criptografia AES128-CTS, adicione o seguinte:
`[libdefaults]
         default_tkt_enctypes = aes128-cts
         default_tgs_enctypes = aes128-cts
         permitted_enctypes = aes128-cts
```

Nota:

Destrua qualquer TGT Kerberos pré-existente no cache de tickets do exercício anterior da seguinte forma:
` % kdestroy
```

  3. Inicie uma nova janela e inicie o servidor usando o `krb5.conf` atualizado da seguinte forma:
`% java -Djava.security.auth.login.config=jaas-krb5.conf \
         -Djava.security.krb5.conf=krb5.conf GSSServer
```

  4. Execute o aplicativo cliente usando o `krb5.conf` atualizado. A classe GSSClient aceita dois parâmetros: o nome do serviço e o nome do servidor no qual o serviço está sendo executado. Por exemplo, se o serviço for host executando na máquina j1hol-001, use o seguinte (forneça uma senha segura quando solicitado):
`% java -Djava.security.auth.login.config=jaas-krb5.conf \
         -Djava.security.krb5.conf=krb5.conf \
         GSSClient host j1hol-001
```

Resumo

Neste exercício, você aprendeu como escrever um aplicativo cliente-servidor que usa a Java GSS API para autenticar e comunicar-se de forma segura usando algoritmos de criptografia Kerberos mais fortes. Você pode habilitar a depuração Kerberos (`-Dsun.security.krb5.debug=true`), para obter informações sobre o tipo de criptografia Kerberos usado.