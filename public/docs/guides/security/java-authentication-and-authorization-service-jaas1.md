# Serviço de Autenticação e Autorização Java (JAAS)

## 6 Serviço de Autenticação e Autorização Java (JAAS)

Nota:

O JAAS está vinculado à classe AccessControlContext e a vários métodos da classe Subject, que estão marcados para remoção. Consulte [Migrando dos Métodos Subject.getSubject e Subject.doAs, Marcados para Remoção, para os Métodos Subject.current e Subject.callAs](<#/doc/guides/security/migrating-from-deprecated-removal-subject-getsubject-subject-doas-methods-subject-current-subject-callas-methods>) para mais informações.

[Guia de Referência do Serviço de Autenticação e Autorização Java (JAAS)](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>) descreve o Serviço de Autenticação e Autorização Java (JAAS), que permite autenticar usuários e determinar de forma segura quem está executando o código Java atualmente.

[Tutorial de Autenticação JAAS](<#/doc/guides/security/jaas-authentication-tutorial>) descreve como usar o JAAS para a autenticação de usuários: para determinar de forma confiável e segura quem está em execução atualmente.

[Serviço de Autenticação e Autorização Java (JAAS): Guia do Desenvolvedor do LoginModule](<#/doc/guides/security/java-authentication-and-authorization-service-jaas-loginmodule-developers-guide1>) mostra como implementar a interface LoginModule, que você conecta a um aplicativo para fornecer um tipo específico de autenticação.