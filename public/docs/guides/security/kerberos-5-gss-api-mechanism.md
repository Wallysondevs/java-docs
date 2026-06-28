# O Mecanismo GSS-API do Kerberos 5

## O Mecanismo GSS-API do Kerberos 5

Esta seção descreve e lista recursos de segurança relacionados aos Java Generic Security Services (Java GSS) para Kerberos 5. Ela também descreve o Object Identifier (OID) para o mecanismo Kerberos V5, os tipos de criptografia e as configurações de `krb5.conf` suportadas pelo Java GSS.

O mecanismo Generic Security Services Application Program Interface (GSS-API) é definido pela [RFC 1964](<https://datatracker.ietf.org/doc/html/rfc1964>) e complementado pela [RFC 4121](<https://datatracker.ietf.org/doc/html/rfc4121>) sob o processo de Padrões da Internet.

O OID para o Mecanismo Kerberos V5

De acordo com a RFC 1964 seção 1, o OID para Java Generic Security Services (Java GSS) para Kerberos 5 é definido como 1.2.840.113554.1.2.2; veja também [GSSAPI Mechanisms](<https://docs.oracle.com/en/java/javase/25/docs/specs/security/standard-names.html#gssapi-mechanisms>) em Java Security Standard Algorithm Names.

Tipos de Criptografia Suportados pelo Java GSS/Kerberos

A tabela a seguir lista a ordem preferencial dos tipos de criptografia suportados pelo Java GSS/Kerberos.

Tabela 7-1 Tipos de Criptografia Suportados pelo Java GSS/Kerberos

Nome | Aliases | Número etype
---|---|---
aes256-cts-hmac-sha1-96 | aes256-sha1, aes256-cts | 18
aes128-cts-hmac-sha1-96 | aes128-sha1, aes128-cts | 17
aes256-cts-hmac-sha384-192 | aes256-sha2 | 20
aes128-cts-hmac-sha256-128 | aes128-sha2 | 19
des3-cbc-sha1 | des3-hmac-sha1 | 16
arcfour-hmac-md5 | arcfour-hmac, rc4-hmac | 23
des-cbc-crc | None | 1
des-cbc-md5 | None | 3

Nota:

Os tipos de criptografia AES-128 e AES-256 são habilitados por padrão. Os seguintes tipos de criptografia legados são desabilitados por padrão:

  * Tipos de criptografia baseados em DES, incluindo des-cbc-crc e dec-cbc-md5
  * O tipo de criptografia baseado em DES3, des3-cbc-sha1
  * O tipo de criptografia baseado em RC4, arcfour-hmac-md5 (alias rc4-hmac)

Um usuário pode restringir o uso de criptografia para várias finalidades em `krb5.conf`, na seção `[libdefaults]`.

Configurações Suportadas de krb5.conf

Os seguintes parâmetros são suportados:
```
    include FILENAME
    includedir DIRNAME
    
    [libdefaults]
    allow_weak_crypto
    canonicalize
    clockskew
    default_keytab_name
    default_realm
    default_tgs_enctypes
    default_tkt_enctypes
    dns_canonicalize_hostname
    dns_fallback
    dns_lookup_kdc
    dns_lookup_realm
    extra_addresses
    forwardable
    kdc_default_options
    kdc_timeout
    max_retries
    no_addresses
    noaddresses
    permitted_enctypes
    proxiable
    renew_lifetime
    renewable
    ticket_lifetime
    udp_preference_limit
     
    [realms]
      REALM.NAME = {
          kdc
          kdc_timeout
          udp_preference_limit
          max_retries
      }
     
    [capaths]
      A = {
        I = .
        B = I
      }
     
    [domain_realm]
      domain=REALM
    
```

A seguir estão os valores padrão para os parâmetros do arquivo `krb5.conf`:
```
    allow_weak_crypto = false
    canonicalize = false
    clockskew = 300
    default_tgs_enctypes = <value of permitted_enctypes>
    default_tkt_enctypes = <value of permitted_enctypes>
    dns_canonicalize_hostname = true
    dns_lookup_kdc = true
    dns_lookup_realm = false
    forwardable = false
    kdc_timeout = 30s
    max_retries = 3
    no_addresses = true
    noaddresses = true
    permitted_enctypes = <encryption types enabled by default, AES-128 and AES-256; see Table 7-1>
    proxiable = false
    renewable = false
    udp_preference_limit = 1465
```

Se nenhum arquivo `krb5.conf` for encontrado ou uma configuração não existir em um arquivo `krb5.conf`, então esses valores padrão serão usados. Por exemplo, uma consulta DNS será realizada para buscar detalhes do KDC porque o valor padrão de `dns_lookup_kdc` é `true`.