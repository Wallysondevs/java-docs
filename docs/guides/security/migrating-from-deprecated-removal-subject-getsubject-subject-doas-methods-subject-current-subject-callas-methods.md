# Migrando dos Métodos Subject.getSubject e Subject.doAs (Obsoletos para Remoção) para os Métodos Subject.current e Subject.callAs

## Migrando dos Métodos Subject.getSubject e Subject.doAs (Obsoletos para Remoção) para os Métodos Subject.current e Subject.callAs

Nota:

No JDK 24, o Security Manager foi permanentemente desabilitado. Consulte [JEP 486](<https://openjdk.org/jeps/486>) para mais informações.

Os seguintes métodos da classe javax.security.auth.Subject foram marcados como obsoletos para remoção porque possuem dependências de APIs do Security Manager, que também foram marcadas como obsoletas para remoção:

  * Subject getSubject(AccessControlContext)
  * T doAs(Subject, PrivilegedAction&lt;T&gt;)
  * T doAs(Subject, PrivilegedExceptionAction&lt;T&gt;)
  * T doAsPrivileged(Subject, PrivilegedAction&lt;T&gt;, AccessControlContext)
  * T doAsPrivileged(Subject, PrivilegedExceptionAction&lt;T&gt;, AccessControlContext)

A partir do JDK 24, esses métodos, além de Subject current() e T callAs(Subject, Callable&lt;T&gt;), comportam-se da seguinte forma:

  * getSubject: O método lança uma UnsupportedOperationException.
  * current: O método retorna o Subject vinculado ao período de execução da thread atual.
  * doAs e doAsPrivileged: Esses métodos invocam uma ação com um Subject como o subject atual para o período limitado de execução da ação.
  * callAs: Comporta-se exatamente como doAs, exceto que os tipos de seu argumento de ação, Callable&lt;T&gt;, e da exceção lançada, CompletedException, são diferentes.

Como o Security Manager foi permanentemente desabilitado, substitua os métodos Subject.getSubject(AccessControlContext) e Subject.doAs por Subject.current() e Subject.callAs(Subject, Callable&lt;T&gt;), respectivamente, em seu código. Consulte [Os Métodos callAs e current para Executar uma Ação como um Subject Específico](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>).

Nota:

Os métodos Subject.doAsPrivileged não possuem APIs de substituição.

Você não pode mais armazenar um Subject em um `AccessControlContext`, recuperá-lo com o método Subject.current() e invocar `AccessController.doPrivileged` com esse contexto.

No entanto, você pode acessar o Subject atual da thread pai a partir da thread filha com o método Subject.current() usando concorrência estruturada. Consulte [Structured Concurrency](<#/>) em Java Platform, Standard Edition Core Libraries e [Os Métodos callAs e current para Executar uma Ação como um Subject Específico](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>) para mais informações.

Verifique se as threads filhas em seu código acessam o Subject de suas threads pai através da classe AccessControlContext. Se sim, modifique seu código para que as threads pai passem o Subject para as threads recém-criadas ou use concorrência estruturada.