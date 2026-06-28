# O Conjunto de Instruções da JVM

[Java SE](<https://docs.oracle.com/en/java/javase/25/>) > [Java SE Specifications](<#/>) > [Java Virtual Machine Specification](<#/doc/jvms/jvms-01>)

Chapter 6. The Java Virtual Machine Instruction Set  
---  
[Prev](<#/doc/jvms/jvms-05>)  |   |  [Next](<#/doc/jvms/jvms-07>)  
  
* * *

# Capítulo 6. O Conjunto de Instruções da Java Virtual Machine

**Sumário**

[6.1. Pressupostos: O Significado de "Deve"](<#/doc/jvms/jvms-06>)
[6.2. Opcodes Reservados](<#/doc/jvms/jvms-06>)
[6.3. Erros da Virtual Machine](<#/doc/jvms/jvms-06>)
[6.4. Formato das Descrições das Instruções](<#/doc/jvms/jvms-06>)
    

[mnemonic](<#/doc/jvms/jvms-06>)
    

[6.5. Instruções](<#/doc/jvms/jvms-06>)
    

[_aaload_](<#/doc/jvms/jvms-06>)
    

[_aastore_](<#/doc/jvms/jvms-06>)
    

[_aconst_null_](<#/doc/jvms/jvms-06>)
    

[_aload_](<#/doc/jvms/jvms-06>)
    

[_aload_ &lt;n&gt;_](<#/doc/jvms/jvms-06>)
    

[_anewarray_](<#/doc/jvms/jvms-06>)
    

[_areturn_](<#/doc/jvms/jvms-06>)
    

[_arraylength_](<#/doc/jvms/jvms-06>)
    

[_astore_](<#/doc/jvms/jvms-06>)
    

[_astore_ &lt;n&gt;_](<#/doc/jvms/jvms-06>)
    

[_athrow_](<#/doc/jvms/jvms-06>)
    

[_baload_](<#/doc/jvms/jvms-06>)
    

[_bastore_](<#/doc/jvms/jvms-06>)
    

[_bipush_](<#/doc/jvms/jvms-06>)
    

[_caload_](<#/doc/jvms/jvms-06>)
    

[_castore_](<#/doc/jvms/jvms-06>)
    

[_checkcast_](<#/doc/jvms/jvms-06>)
    

[_d2f_](<#/doc/jvms/jvms-06>)
    

[_d2i_](<#/doc/jvms/jvms-06>)
    

[_d2l_](<#/doc/jvms/jvms-06>)
    

[_dadd_](<#/doc/jvms/jvms-06>)
    

[_daload_](<#/doc/jvms/jvms-06>)
    

[_dastore_](<#/doc/jvms/jvms-06>)
    

[_dcmp &lt;op&gt;_](<#/doc/jvms/jvms-06>)
    

[_dconst_ &lt;d&gt;_](<#/doc/jvms/jvms-06>)
    

[_ddiv_](<#/doc/jvms/jvms-06>)
    

[_dload_](<#/doc/jvms/jvms-06>)
    

[_dload_ &lt;n&gt;_](<#/doc/jvms/jvms-06>)
    

[_dmul_](<#/doc/jvms/jvms-06>)
    

[_dneg_](<#/doc/jvms/jvms-06>)
    

[_drem_](<#/doc/jvms/jvms-06>)
    

[_dreturn_](<#/doc/jvms/jvms-06>)
    

[_dstore_](<#/doc/jvms/jvms-06>)
    

[_dstore_ &lt;n&gt;_](<#/doc/jvms/jvms-06>)
    

[_dsub_](<#/doc/jvms/jvms-06>)
    

[_dup_](<#/doc/jvms/jvms-06>)
    

[_dup_x1_](<#/doc/jvms/jvms-06>)
    

[_dup_x2_](<#/doc/jvms/jvms-06>)
    

[_dup2_](<#/doc/jvms/jvms-06>)
    

[_dup2_x1_](<#/doc/jvms/jvms-06>)
    

[_dup2_x2_](<#/doc/jvms/jvms-06>)
    

[_f2d_](<#/doc/jvms/jvms-06>)
    

[_f2i_](<#/doc/jvms/jvms-06>)
    

[_f2l_](<#/doc/jvms/jvms-06>)
    

[_fadd_](<#/doc/jvms/jvms-06>)
    

[_faload_](<#/doc/jvms/jvms-06>)
    

[_fastore_](<#/doc/jvms/jvms-06>)
    

[_fcmp &lt;op&gt;_](<#/doc/jvms/jvms-06>)
    

[_fconst_ &lt;f&gt;_](<#/doc/jvms/jvms-06>)
    

[_fdiv_](<#/doc/jvms/jvms-06>)
    

[_fload_](<#/doc/jvms/jvms-06>)
    

[_fload_ &lt;n&gt;_](<#/doc/jvms/jvms-06>)
    

[_fmul_](<#/doc/jvms/jvms-06>)
    

[_fneg_](<#/doc/jvms/jvms-06>)
    

[_frem_](<#/doc/jvms/jvms-06>)
    

[_freturn_](<#/doc/jvms/jvms-06>)
    

[_fstore_](<#/doc/jvms/jvms-06>)
    

[_fstore_ &lt;n&gt;_](<#/doc/jvms/jvms-06>)
    

[_fsub_](<#/doc/jvms/jvms-06>)
    

[_getfield_](<#/doc/jvms/jvms-06>)
    

[_getstatic_](<#/doc/jvms/jvms-06>)
    

[_goto_](<#/doc/jvms/jvms-06>)
    

[_goto_w_](<#/doc/jvms/jvms-06>)
    

[_i2b_](<#/doc/jvms/jvms-06>)
    

[_i2c_](<#/doc/jvms/jvms-06>)
    

[_i2d_](<#/doc/jvms/jvms-06>)
    

[_i2f_](<#/doc/jvms/jvms-06>)
    

[_i2l_](<#/doc/jvms/jvms-06>)
    

[_i2s_](<#/doc/jvms/jvms-06>)
    

[_iadd_](<#/doc/jvms/jvms-06>)
    

[_iaload_](<#/doc/jvms/jvms-06>)
    

[_iand_](<#/doc/jvms/jvms-06>)
    

[_iastore_](<#/doc/jvms/jvms-06>)
    

[_iconst_ <i>_](<#/doc/jvms/jvms-06>)
    

[_idiv_](<#/doc/jvms/jvms-06>)
    

[_if_acmp &lt;cond&gt;_](<#/doc/jvms/jvms-06>)
    

[_if_icmp &lt;cond&gt;_](<#/doc/jvms/jvms-06>)
    

[_if &lt;cond&gt;_](<#/doc/jvms/jvms-06>)
    

[_ifnonnull_](<#/doc/jvms/jvms-06>)
    

[_ifnull_](<#/doc/jvms/jvms-06>)
    

[_iinc_](<#/doc/jvms/jvms-06>)
    

[_iload_](<#/doc/jvms/jvms-06>)
    

[_iload_ &lt;n&gt;_](<#/doc/jvms/jvms-06>)
    

[_imul_](<#/doc/jvms/jvms-06>)
    

[_ineg_](<#/doc/jvms/jvms-06>)
    

[_instanceof_](<#/doc/jvms/jvms-06>)
    

[_invokedynamic_](<#/doc/jvms/jvms-06>)
    

[_invokeinterface_](<#/doc/jvms/jvms-06>)
    

[_invokespecial_](<#/doc/jvms/jvms-06>)
    

[_invokestatic_](<#/doc/jvms/jvms-06>)
    

[_invokevirtual_](<#/doc/jvms/jvms-06>)
    

[_ior_](<#/doc/jvms/jvms-06>)
    

[_irem_](<#/doc/jvms/jvms-06>)
    

[_ireturn_](<#/doc/jvms/jvms-06>)
    

[_ishl_](<#/doc/jvms/jvms-06>)
    

[_ishr_](<#/doc/jvms/jvms-06>)
    

[_istore_](<#/doc/jvms/jvms-06>)
    

[_istore_ &lt;n&gt;_](<#/doc/jvms/jvms-06>)
    

[_isub_](<#/doc/jvms/jvms-06>)
    

[_iushr_](<#/doc/jvms/jvms-06>)
    

[_ixor_](<#/doc/jvms/jvms-06>)
    

[_jsr_](<#/doc/jvms/jvms-06>)
    

[_jsr_w_](<#/doc/jvms/jvms-06>)
    

[_l2d_](<#/doc/jvms/jvms-06>)
    

[_l2f_](<#/doc/jvms/jvms-06>)
    

[_l2i_](<#/doc/jvms/jvms-06>)
    

[_ladd_](<#/doc/jvms/jvms-06>)
    

[_laload_](<#/doc/jvms/jvms-06>)
    

[_land_](<#/doc/jvms/jvms-06>)
    

[_lastore_](<#/doc/jvms/jvms-06>)
    

[_lcmp_](<#/doc/jvms/jvms-06>)
    

[_lconst_ &lt;l&gt;_](<#/doc/jvms/jvms-06>)
    

[_ldc_](<#/doc/jvms/jvms-06>)
    

[_ldc_w_](<#/doc/jvms/jvms-06>)
    

[_ldc2_w_](<#/doc/jvms/jvms-06>)
    

[_ldiv_](<#/doc/jvms/jvms-06>)
    

[_lload_](<#/doc/jvms/jvms-06>)
    

[_lload_ &lt;n&gt;_](<#/doc/jvms/jvms-06>)
    

[_lmul_](<#/doc/jvms/jvms-06>)
    

[_lneg_](<#/doc/jvms/jvms-06>)
    

[_lookupswitch_](<#/doc/jvms/jvms-06>)
    

[_lor_](<#/doc/jvms/jvms-06>)
    

[_lrem_](<#/doc/jvms/jvms-06>)
    

[_lreturn_](<#/doc/jvms/jvms-06>)
    

[_lshl_](<#/doc/jvms/jvms-06>)
    

[_lshr_](<#/doc/jvms/jvms-06>)
    

[_lstore_](<#/doc/jvms/jvms-06>)
    

[_lstore_ &lt;n&gt;_](<#/doc/jvms/jvms-06>)
    

[_lsub_](<#/doc/jvms/jvms-06>)
    

[_lushr_](<#/doc/jvms/jvms-06>)
    

[_lxor_](<#/doc/jvms/jvms-06>)
    

[_monitorenter_](<#/doc/jvms/jvms-06>)
    

[_monitorexit_](<#/doc/jvms/jvms-06>)
    

[_multianewarray_](<#/doc/jvms/jvms-06>)
    

[_new_](<#/doc/jvms/jvms-06>)
    

[_newarray_](<#/doc/jvms/jvms-06>)
    

[_nop_](<#/doc/jvms/jvms-06>)
    

[_pop_](<#/doc/jvms/jvms-06>)
    

[_pop2_](<#/doc/jvms/jvms-06>)
    

[_putfield_](<#/doc/jvms/jvms-06>)
    

[_putstatic_](<#/doc/jvms/jvms-06>)
    

[_ret_](<#/doc/jvms/jvms-06>)
    

[_return_](<#/doc/jvms/jvms-06>)
    

[_saload_](<#/doc/jvms/jvms-06>)
    

[_sastore_](<#/doc/jvms/jvms-06>)
    

[_sipush_](<#/doc/jvms/jvms-06>)
    

[_swap_](<#/doc/jvms/jvms-06>)
    

[_tableswitch_](<#/doc/jvms/jvms-06>)
    

[_wide_](<#/doc/jvms/jvms-06>)
    

Uma instrução da Java Virtual Machine consiste em um `opcode` especificando a operação a ser realizada, seguido por zero ou mais `operand`s que incorporam valores a serem operados. Este capítulo detalha o formato de cada instrução da Java Virtual Machine e a operação que ela executa.

## 6.1. Pressupostos: O Significado de "Deve"

A descrição de cada instrução é sempre dada no contexto do código da Java Virtual Machine que satisfaz as restrições estáticas e estruturais da [§4 (_The`class` File Format_)](<#/doc/jvms/jvms-04>). Na descrição de instruções individuais da Java Virtual Machine, frequentemente declaramos que alguma situação "deve" ou "não deve" ocorrer: "O _value2_ deve ser do tipo `int`." As restrições da [§4 (_The`class` File Format_)](<#/doc/jvms/jvms-04>) garantem que todas essas expectativas serão de fato atendidas. Se alguma restrição (um "deve" ou "não deve") na descrição de uma instrução não for satisfeita em tempo de execução, o comportamento da Java Virtual Machine é indefinido.

A Java Virtual Machine verifica se o código da Java Virtual Machine satisfaz as restrições estáticas e estruturais em tempo de linkagem usando um verificador de `class` file ([§4.10](<#/doc/jvms/jvms-04>)). Assim, a Java Virtual Machine só tentará executar código de `class` files válidos. Realizar a verificação em tempo de linkagem é atraente, pois as verificações são realizadas apenas uma vez, reduzindo substancialmente a quantidade de trabalho que deve ser feita em tempo de execução. Outras estratégias de implementação são possíveis, desde que estejam em conformidade com _The Java Language Specification, Java SE 25 Edition_ e _The Java Virtual Machine Specification, Java SE 25 Edition_.

## 6.2. Opcodes Reservados

Além dos `opcode`s das instruções especificadas posteriormente neste capítulo, que são usados em `class` files ([§4 (_The`class` File Format_)](<#/doc/jvms/jvms-04>)), três `opcode`s são reservados para uso interno por uma implementação da Java Virtual Machine. Se o conjunto de instruções da Java Virtual Machine for estendido no futuro, esses `opcode`s reservados são garantidos para não serem usados.

Dois dos `opcode`s reservados, números 254 (0xfe) e 255 (0xff), têm os `mnemonic`s _impdep1_ e _impdep2_, respectivamente. Essas instruções destinam-se a fornecer "portas dos fundos" ou "armadilhas" para funcionalidades específicas da implementação, implementadas em software e hardware, respectivamente. O terceiro `opcode` reservado, número 202 (0xca), tem o `mnemonic` _breakpoint_ e destina-se a ser usado por depuradores para implementar pontos de interrupção.

Embora esses `opcode`s tenham sido reservados, eles só podem ser usados dentro de uma implementação da Java Virtual Machine. Eles não podem aparecer em `class` files válidos. Ferramentas como depuradores ou `JIT code generators` ([§2.13](<#/doc/jvms/jvms-02>)) que possam interagir diretamente com o código da Java Virtual Machine que já foi carregado e executado podem encontrar esses `opcode`s. Tais ferramentas devem tentar se comportar graciosamente se encontrarem alguma dessas instruções reservadas.

## 6.3. Erros da Virtual Machine

Uma implementação da Java Virtual Machine lança um objeto que é uma instância de uma subclasse da classe `VirtualMachineError` quando um erro interno ou limitação de recurso a impede de implementar a semântica descrita neste capítulo. Esta especificação não pode prever onde erros internos ou limitações de recursos podem ser encontrados e não exige precisamente quando eles podem ser relatados. Assim, qualquer uma das subclasses de `VirtualMachineError` definidas abaixo pode ser lançada a qualquer momento durante a operação da Java Virtual Machine:

  * `InternalError`: Ocorreu um erro interno na implementação da Java Virtual Machine devido a uma falha no software que implementa a máquina virtual, uma falha no software do sistema host subjacente ou uma falha no hardware. Este erro é entregue assincronamente ([§2.10](<#/doc/jvms/jvms-02>)) quando detectado e pode ocorrer em qualquer ponto de um programa.

  * `OutOfMemoryError`: A implementação da Java Virtual Machine ficou sem memória virtual ou física, e o gerenciador de armazenamento automático não conseguiu recuperar memória suficiente para satisfazer uma solicitação de criação de objeto.

  * `StackOverflowError`: A implementação da Java Virtual Machine ficou sem espaço de pilha para uma `thread`, tipicamente porque a `thread` está realizando um número ilimitado de invocações recursivas como resultado de uma falha no programa em execução.

  * `UnknownError`: Ocorreu uma exceção ou erro, mas a implementação da Java Virtual Machine não consegue relatar a exceção ou erro real.

## 6.4. Formato das Descrições das Instruções

As instruções da Java Virtual Machine são representadas neste capítulo por entradas do formato mostrado abaixo, em ordem alfabética e cada uma começando em uma nova página.

### mnemonic

#### Operation

Breve descrição da instrução

#### Format

  
_mnemonic_  
_operand1_  
_operand2_  
...  


#### Forms

_mnemonic_ = opcode

#### Operand Stack

..., _value1_ , _value2_ ->

..., _value3_

#### Description

Uma descrição mais longa detalhando restrições sobre o conteúdo da `operand stack` ou entradas do `constant pool`, a operação realizada, o tipo dos resultados, etc.

#### Linking Exceptions

Se quaisquer exceções de linkagem puderem ser lançadas pela execução desta instrução, elas são listadas uma por linha, na ordem em que devem ser lançadas.

#### Run-time Exceptions

Se quaisquer exceções de tempo de execução puderem ser lançadas pela execução de uma instrução, elas são listadas uma por linha, na ordem em que devem ser lançadas.

Além das exceções de linkagem e de tempo de execução, se houver, listadas para uma instrução, essa instrução não deve lançar nenhuma exceção de tempo de execução, exceto instâncias de `VirtualMachineError` ou suas subclasses.

#### Notes

Comentários não estritamente parte da especificação de uma instrução são separados como notas no final da descrição.

Cada célula no diagrama de formato da instrução representa um único `byte` de 8 bits. O `mnemonic` da instrução é seu nome. Seu `opcode` é sua representação numérica e é dado nas formas decimal e hexadecimal. Apenas a representação numérica está realmente presente no código da Java Virtual Machine em um `class` file.

Tenha em mente que existem "operands" gerados em tempo de compilação e incorporados nas instruções da Java Virtual Machine, bem como "operands" calculados em tempo de execução e fornecidos na `operand stack`. Embora sejam fornecidos de várias áreas diferentes, todos esses `operand`s representam a mesma coisa: valores a serem operados pela instrução da Java Virtual Machine que está sendo executada. Ao pegar implicitamente muitos de seus `operand`s de sua `operand stack`, em vez de representá-los explicitamente em seu código compilado como `operand` bytes adicionais, números de registro, etc., o código da Java Virtual Machine permanece compacto.

Algumas instruções são apresentadas como membros de uma família de instruções relacionadas que compartilham uma única descrição, formato e diagrama de `operand stack`. Como tal, uma família de instruções inclui vários `opcode`s e `mnemonic`s de `opcode`; apenas o `mnemonic` da família aparece no diagrama de formato da instrução, e uma linha de `forms` separada lista todos os `mnemonic`s e `opcode`s dos membros. Por exemplo, a linha `Forms` para a família de instruções _lconst_ &lt;l&gt;_, fornecendo informações de `mnemonic` e `opcode` para as duas instruções dessa família (_lconst_0_ e _lconst_1_), é

_lconst_0_ = 9 (0x9)

_lconst_1_ = 10 (0xa)

Na descrição das instruções da Java Virtual Machine, o efeito da execução de uma instrução na `operand stack` ([§2.6.2](<#/doc/jvms/jvms-02>)) do `current frame` ([§2.6](<#/doc/jvms/jvms-02>)) é representado textualmente, com a pilha crescendo da esquerda para a direita e cada valor representado separadamente. Assim,

..., _value1_ , _value2_ ->

..., _result_

mostra uma operação que começa com _value2_ no topo da `operand stack` com _value1_ logo abaixo. Como resultado da execução da instrução, _value1_ e _value2_ são removidos da `operand stack` e substituídos pelo valor _result_, que foi calculado pela instrução. O restante da `operand stack`, representado por uma elipse (...), não é afetado pela execução da instrução.

Valores dos tipos `long` e `double` são representados por uma única entrada na `operand stack`.

Na Primeira Edição de _The Java® Virtual Machine Specification_, os valores na `operand stack` dos tipos `long` e `double` eram representados no diagrama de pilha por duas entradas cada.

## 6.5. Instruções

### _aaload_

#### Operation

Carrega `reference` de um array

#### Format

  
_aaload_  


#### Forms

_aaload_ = 50 (0x32)

#### Operand Stack

..., _arrayref_ , _index_ ->

..., _value_

#### Description

O _arrayref_ deve ser do tipo `reference` e deve se referir a um array cujos componentes são do tipo `reference`. O _index_ deve ser do tipo `int`. Ambos _arrayref_ e _index_ são removidos da `operand stack`. O `reference` _value_ no componente do array em _index_ é recuperado e empilhado na `operand stack`.

#### Run-time Exceptions

Se _arrayref_ for `null`, _aaload_ lança uma `NullPointerException`.

Caso contrário, se _index_ não estiver dentro dos limites do array referenciado por _arrayref_, a instrução _aaload_ lança uma `ArrayIndexOutOfBoundsException`.

### _aastore_

#### Operation

Armazena em um array de `reference`

#### Format

  
_aastore_  


#### Forms

_aastore_ = 83 (0x53)

#### Operand Stack

..., _arrayref_ , _index_ , _value_ ->

...

#### Description

O _arrayref_ deve ser do tipo `reference` e deve se referir a um array cujos componentes são do tipo `reference`. O _index_ deve ser do tipo `int`, e _value_ deve ser do tipo `reference`. O _arrayref_, _index_ e _value_ são removidos da `operand stack`.

Se _value_ for `null`, então _value_ é armazenado como o componente do array em _index_.

Caso contrário, _value_ é não-`null`. Se _value_ for um valor do tipo de componente do array referenciado por _arrayref_, então _value_ é armazenado como o componente do array em _index_.

Se _value_ é um valor do tipo de componente do array é determinado de acordo com as regras dadas para [§ _checkcast_](<#/doc/jvms/jvms-06>).

#### Run-time Exceptions

Se _arrayref_ for `null`, _aastore_ lança uma `NullPointerException`.

Caso contrário, se _index_ não estiver dentro dos limites do array referenciado por _arrayref_, a instrução _aastore_ lança uma `ArrayIndexOutOfBoundsException`.

Caso contrário, se o _value_ não-`null` não for um valor do tipo de componente do array, _aastore_ lança uma `ArrayStoreException`.

### _aconst_null_

#### Operation

Empilha `null`

#### Format

  
_aconst_null_  


#### Forms

_aconst_null_ = 1 (0x1)

#### Operand Stack

... ->

..., `null`

#### Description

Empilha a `reference` de objeto `null` na `operand stack`.

#### Notes

A Java Virtual Machine não exige um valor concreto para `null`.

### _aload_

#### Operation

Carrega `reference` de uma variável local

#### Format

  
_aload_  
_index_  


#### Forms

_aload_ = 25 (0x19)

#### Operand Stack

... ->

..., _objectref_

#### Description

O _index_ é um `byte` sem sinal que deve ser um índice no `local variable array` do `current frame` ([§2.6](<#/doc/jvms/jvms-02>)). A variável local em _index_ deve conter uma `reference`. O _objectref_ na variável local em _index_ é empilhado na `operand stack`.

#### Notes

A instrução _aload_ não pode ser usada para carregar um valor do tipo `returnAddress` de uma variável local para a `operand stack`. Essa assimetria com a instrução _astore_ ([§ _astore_](<#/doc/jvms/jvms-06>)) é intencional.

O `opcode` _aload_ pode ser usado em conjunto com a instrução _wide_ ([§ _wide_](<#/doc/jvms/jvms-06>)) para acessar uma variável local usando um índice sem sinal de dois `byte`s.

### _aload_ &lt;n&gt;_

#### Operation

Carrega `reference` de uma variável local

#### Format

  
_aload_ &lt;n&gt;_  


#### Forms

_aload_0_ = 42 (0x2a)

_aload_1_ = 43 (0x2b)

_aload_2_ = 44 (0x2c)

_aload_3_ = 45 (0x2d)

#### Operand Stack

... ->

..., _objectref_

#### Description

O <_n_> deve ser um índice no `local variable array` do `current frame` ([§2.6](<#/doc/jvms/jvms-02>)). A variável local em <_n_> deve conter uma `reference`. O _objectref_ na variável local em <_n_> é empilhado na `operand stack`.

#### Notes

Uma instrução _aload_ &lt;n&gt;_ não pode ser usada para carregar um valor do tipo `returnAddress` de uma variável local para a `operand stack`. Essa assimetria com a instrução _astore_ &lt;n&gt;_ correspondente ([§ _astore_ &lt;n&gt;_](<#/doc/jvms/jvms-06>)) é intencional.

Cada uma das instruções _aload_ &lt;n&gt;_ é a mesma que _aload_ com um _index_ de <_n_>, exceto que o `operand` <_n_> é implícito.

### _anewarray_

#### Operation

Cria um novo array de `reference`

#### Format

  
_anewarray_  
_indexbyte1_  
_indexbyte2_  


#### Forms

anewarray = 189 (0xbd)

#### Operand Stack

..., _count_ ->

..., _arrayref_

#### Description

O _count_ deve ser do tipo `int`. Ele é removido da `operand stack`. O _count_ representa o número de componentes do array a ser criado. Os `byte`s sem sinal _indexbyte1_ e _indexbyte2_ são usados para construir um índice no `run-time constant pool` da `current class` ([§2.6](<#/doc/jvms/jvms-02>)), onde o valor do índice é (_indexbyte1_ `<<` 8) | _indexbyte2_. A entrada do `run-time constant pool` no índice deve ser uma `symbolic reference` para uma `class`, `array` ou `interface type`. A `class`, `array` ou `interface type` nomeada é resolvida ([§5.4.3.1](<#/doc/jvms/jvms-05>)). Um novo array com componentes desse tipo, de comprimento _count_, é alocado do `garbage-collected heap`, e uma `reference` _arrayref_ para este novo objeto array é empilhada na `operand stack`. Todos os componentes do novo array são inicializados para `null`, o valor padrão para tipos `reference` ([§2.4](<#/doc/jvms/jvms-02>)).

#### Linking Exceptions

Durante a resolução da `symbolic reference` para a `class`, `array` ou `interface type`, qualquer uma das exceções documentadas em [§5.4.3.1](<#/doc/jvms/jvms-05>) pode ser lançada.

#### Run-time Exceptions

Caso contrário, se _count_ for menor que zero, a instrução _anewarray_ lança uma `NegativeArraySizeException`.

#### Notes

A instrução _anewarray_ é usada para criar uma única dimensão de um array de `object reference`s ou parte de um array multidimensional.

### _areturn_

#### Operation

Retorna `reference` de um método

#### Format

  
_areturn_  


#### Forms

_areturn_ = 176 (0xb0)

#### Operand Stack

..., _objectref_ ->

[empty]

#### Description

O _objectref_ deve ser do tipo `reference` e deve se referir a um objeto de um tipo que seja `assignment compatible` (JLS §5.2) com o tipo representado pelo `return descriptor` ([§4.3.3](<#/doc/jvms/jvms-04>)) do `current method`. Se o `current method` for um método `synchronized`, o `monitor` entrado ou reentrado na invocação do método é atualizado e possivelmente saído como se pela execução de uma instrução _monitorexit_ ([§ _monitorexit_](<#/doc/jvms/jvms-06>)) na `current thread`. Se nenhuma exceção for lançada, _objectref_ é removido da `operand stack` do `current frame` ([§2.6](<#/doc/jvms/jvms-02>)) e empilhado na `operand stack` do `frame` do `invoker`. Quaisquer outros valores na `operand stack` do `current method` são descartados.

O interpretador então restabelece o `frame` do `invoker` e retorna o controle ao `invoker`.

#### Run-time Exceptions

Se a implementação da Java Virtual Machine não impuser as regras sobre `structured locking` descritas em [§2.11.10](<#/doc/jvms/jvms-02>), então se o `current method` for um método `synchronized` e a `current thread` não for a proprietária do `monitor` entrado ou reentrado na invocação do método, _areturn_ lança uma `IllegalMonitorStateException`. Isso pode acontecer, por exemplo, se um método `synchronized` contiver uma instrução _monitorexit_, mas nenhuma instrução _monitorenter_, no objeto no qual o método é `synchronized`.

Caso contrário, se a implementação da Java Virtual Machine impuser as regras sobre `structured locking` descritas em [§2.11.10](<#/doc/jvms/jvms-02>) e se a primeira dessas regras for violada durante a invocação do `current method`, então _areturn_ lança uma `IllegalMonitorStateException`.

### _arraylength_

#### Operation

Obtém o comprimento do array

#### Format

  
_arraylength_  


#### Forms

_arraylength_ = 190 (0xbe)

#### Operand Stack

..., _arrayref_ ->

..., _length_

#### Description

O _arrayref_ deve ser do tipo `reference` e deve se referir a um array. Ele é removido da `operand stack`. O _length_ do array que ele referencia é determinado. Esse _length_ é empilhado na `operand stack` como um `int`.

#### Run-time Exceptions

Se o _arrayref_ for `null`, a instrução _arraylength_ lança uma `NullPointerException`.

### _astore_

#### Operation

Armazena `reference` em uma variável local

#### Format

  
_astore_  
_index_  


#### Forms

_astore_ = 58 (0x3a)

#### Operand Stack

..., _objectref_ ->

...

#### Description

O _index_ é um `byte` sem sinal que deve ser um índice no `local variable array` do `current frame` ([§2.6](<#/doc/jvms/jvms-02>)). O _objectref_ no topo da `operand stack` deve ser do tipo `returnAddress` ou do tipo `reference`. Ele é removido da `operand stack`, e o valor da variável local em _index_ é definido como _objectref_.

#### Notes

A instrução _astore_ é usada com um _objectref_ do tipo `returnAddress` ao implementar a cláusula `finally` da linguagem de programação Java ([§3.13](<#/doc/jvms/jvms-03>)).

A instrução _aload_ ([§ _aload_](<#/doc/jvms/jvms-06>)) não pode ser usada para carregar um valor do tipo `returnAddress` de uma variável local para a `operand stack`. Essa assimetria com a instrução _astore_ é intencional.

O `opcode` _astore_ pode ser usado em conjunto com a instrução _wide_ ([§ _wide_](<#/doc/jvms/jvms-06>)) para acessar uma variável local usando um índice sem sinal de dois `byte`s.

### _astore_ &lt;n&gt;_

#### Operation

Armazena `reference` em uma variável local

#### Format

  
_astore_ &lt;n&gt;_  


#### Forms

_astore_0_ = 75 (0x4b)

_astore_1_ = 76 (0x4c)

_astore_2_ = 77 (0x4d)

_astore_3_ = 78 (0x4e)

#### Operand Stack

..., _objectref_ ->

...

#### Description

O <_n_> deve ser um índice no `local variable array` do `current frame` ([§2.6](<#/doc/jvms/jvms-02>)). O _objectref_ no topo da `operand stack` deve ser do tipo `returnAddress` ou do tipo `reference`. Ele é removido da `operand stack`, e o valor da variável local em <_n_> é definido como _objectref_.

#### Notes

Uma instrução _astore_ &lt;n&gt;_ é usada com um _objectref_ do tipo `returnAddress` ao implementar as cláusulas `finally` da linguagem de programação Java ([§3.13](<#/doc/jvms/jvms-03>)).

Uma instrução _aload_ &lt;n&gt;_ ([§ _aload_ &lt;n&gt;_](<#/doc/jvms/jvms-06>)) não pode ser usada para carregar um valor do tipo `returnAddress` de uma variável local para a `operand stack`. Essa assimetria com a instrução _astore_ &lt;n&gt;_ correspondente é intencional.

Cada uma das instruções _astore_ &lt;n&gt;_ é a mesma que _astore_ com um _index_ de <_n_>, exceto que o `operand` <_n_> é implícito.

### _athrow_

#### Operation

Lança exceção ou erro

#### Format

  
_athrow_  


#### Forms

_athrow_ = 191 (0xbf)

#### Operand Stack

..., _objectref_ ->

_objectref_

#### Description

O _objectref_ deve ser do tipo `reference` e deve se referir a um objeto que é uma instância da classe `Throwable` ou de uma subclasse de `Throwable`. Ele é removido da `operand stack`. O _objectref_ é então lançado procurando no `current method` ([§2.6](<#/doc/jvms/jvms-02>)) pelo primeiro `exception handler` que corresponde à `class` de _objectref_, conforme o algoritmo em [§2.10](<#/doc/jvms/jvms-02>).

Se um `exception handler` que corresponde a _objectref_ for encontrado, ele contém a localização do código destinado a tratar essa exceção. O registro `pc` é redefinido para essa localização, a `operand stack` do `current frame` é limpa, _objectref_ é empilhado novamente na `operand stack`, e a execução continua.

Se nenhum `exception handler` correspondente for encontrado no `current frame`, esse `frame` é removido. Se o `current frame` representa uma invocação de um método `synchronized`, o `monitor` entrado ou reentrado na invocação do método é saído como se pela execução de uma instrução _monitorexit_ ([§ _monitorexit_](<#/doc/jvms/jvms-06>)). Finalmente, o `frame` de seu `invoker` é restabelecido, se tal `frame` existir, e o _objectref_ é relançado. Se nenhum `frame` desse tipo existir, a `current thread` é encerrada.

#### Run-time Exceptions

Se _objectref_ for `null`, _athrow_ lança uma `NullPointerException` em vez de _objectref_.

Caso contrário, se a implementação da Java Virtual Machine não impuser as regras sobre `structured locking` descritas em [§2.11.10](<#/doc/jvms/jvms-02>), então se o método do `current frame` for um método `synchronized` e a `current thread` não for a proprietária do `monitor` entrado ou reentrado na invocação do método, _athrow_ lança uma `IllegalMonitorStateException` em vez do objeto que estava sendo lançado anteriormente. Isso pode acontecer, por exemplo, se um método `synchronized` que completa abruptamente contiver uma instrução _monitorexit_, mas nenhuma instrução _monitorenter_, no objeto no qual o método é `synchronized`.

Caso contrário, se a implementação da Java Virtual Machine impuser as regras sobre `structured locking` descritas em [§2.11.10](<#/doc/jvms/jvms-02>) e se a primeira dessas regras for violada durante a invocação do `current method`, então _athrow_ lança uma `IllegalMonitorStateException` em vez do objeto que estava sendo lançado anteriormente.

#### Notes

O diagrama da `operand stack` para a instrução _athrow_ pode ser enganoso: Se um `handler` para esta exceção for correspondido no `current method`, a instrução _athrow_ descarta todos os valores na `operand stack`, então empilha o objeto lançado na `operand stack`. No entanto, se nenhum `handler` for correspondido no `current method` e a exceção for lançada mais acima na cadeia de invocação do método, então a `operand stack` do método (se houver) que trata a exceção é limpa e _objectref_ é empilhado nessa `operand stack` vazia. Todos os `frame`s intermediários do método que lançou a exceção até, mas não incluindo, o método que trata a exceção são descartados.

### _baload_

#### Operation

Carrega `byte` ou `boolean` de um array

#### Format

  
_baload_  


#### Forms

_baload_ = 51 (0x33)

#### Operand Stack

..., _arrayref_ , _index_ ->

..., _value_

#### Description

O _arrayref_ deve ser do tipo `reference` e deve se referir a um array cujos componentes são do tipo `byte` ou do tipo `boolean`. O _index_ deve ser do tipo `int`. Ambos _arrayref_ e _index_ são removidos da `operand stack`. O `byte` _value_ no componente do array em _index_ é recuperado, estendido por sinal para um `int` _value_, e empilhado no topo da `operand stack`.

#### Run-time Exceptions

Se _arrayref_ for `null`, _baload_ lança uma `NullPointerException`.

Caso contrário, se _index_ não estiver dentro dos limites do array referenciado por _arrayref_, a instrução _baload_ lança uma `ArrayIndexOutOfBoundsException`.

#### Notes

A instrução _baload_ é usada para carregar valores de arrays de `byte` e `boolean`. Na implementação da Java Virtual Machine da Oracle, arrays de `boolean` - ou seja, arrays do tipo `T_BOOLEAN` ([§2.2](<#/doc/jvms/jvms-02>), [§ _newarray_](<#/doc/jvms/jvms-06>)) - são implementados como arrays de valores de 8 bits. Outras implementações podem implementar arrays de `boolean` compactados; a instrução _baload_ de tais implementações deve ser usada para acessar esses arrays.
### _bastore_

#### Operação

Armazenar em array de `byte` ou `boolean`

#### Formato

  
_bastore_  


#### Formas

_bastore_ = 84 (0x54)

#### Pilha de Operandos

..., _arrayref_ , _index_ , _value_ ->

...

#### Descrição

O _arrayref_ deve ser do tipo `reference` e deve se referir a um array cujos componentes são do tipo `byte` ou do tipo `boolean`. O _index_ e o _value_ devem ser ambos do tipo `int`. O _arrayref_ , _index_ e _value_ são removidos da pilha de operandos.

Se o _arrayref_ se refere a um array cujos componentes são do tipo `byte`, então o `int` _value_ é truncado para um `byte` e armazenado como o componente do array indexado por _index_.

Se o _arrayref_ se refere a um array cujos componentes são do tipo `boolean`, então o `int` _value_ é reduzido aplicando-se o AND bit a bit de _value_ e 1; o resultado é armazenado como o componente do array indexado por _index_.

#### Exceções em Tempo de Execução

Se _arrayref_ é `null`, _bastore_ lança uma `NullPointerException`.

Caso contrário, se _index_ não estiver dentro dos limites do array referenciado por _arrayref_ , a instrução _bastore_ lança uma `ArrayIndexOutOfBoundsException`.

#### Notas

A instrução _bastore_ é usada para armazenar valores em arrays de `byte` e `boolean`. Na implementação da Java Virtual Machine da Oracle, arrays de `boolean` - ou seja, arrays do tipo `T_BOOLEAN` ([§2.2](<#/doc/jvms/jvms-02>), [§ _newarray_](<#/doc/jvms/jvms-06>)) - são implementados como arrays de valores de 8 bits. Outras implementações podem implementar arrays de `boolean` compactados; em tais implementações, a instrução _bastore_ deve ser capaz de armazenar valores `boolean` em arrays de `boolean` compactados, bem como valores `byte` em arrays de `byte`.

### _bipush_

#### Operação

Empilhar `byte`

#### Formato

  
_bipush_  
_byte_  


#### Formas

_bipush_ = 16 (0x10)

#### Pilha de Operandos

... ->

..., _value_

#### Descrição

O _byte_ imediato é estendido por sinal para um `int` _value_. Esse _value_ é empilhado na pilha de operandos.

### _caload_

#### Operação

Carregar `char` de array

#### Formato

  
_caload_  


#### Formas

_caload_ = 52 (0x34)

#### Pilha de Operandos

..., _arrayref_ , _index_ ->

..., _value_

#### Descrição

O _arrayref_ deve ser do tipo `reference` e deve se referir a um array cujos componentes são do tipo `char`. O _index_ deve ser do tipo `int`. Ambos _arrayref_ e _index_ são removidos da pilha de operandos. O componente do array no _index_ é recuperado e estendido com zeros para um `int` _value_. Esse _value_ é empilhado na pilha de operandos.

#### Exceções em Tempo de Execução

Se _arrayref_ é `null`, _caload_ lança uma `NullPointerException`.

Caso contrário, se _index_ não estiver dentro dos limites do array referenciado por _arrayref_ , a instrução _caload_ lança uma `ArrayIndexOutOfBoundsException`.

### _castore_

#### Operação

Armazenar em array de `char`

#### Formato

  
_castore_  


#### Formas

_castore_ = 85 (0x55)

#### Pilha de Operandos

..., _arrayref_ , _index_ , _value_ ->

...

#### Descrição

O _arrayref_ deve ser do tipo `reference` e deve se referir a um array cujos componentes são do tipo `char`. O _index_ e o _value_ devem ser ambos do tipo `int`. O _arrayref_ , _index_ e _value_ são removidos da pilha de operandos. O `int` _value_ é truncado para um `char` e armazenado como o componente do array indexado por _index_.

#### Exceções em Tempo de Execução

Se _arrayref_ é `null`, _castore_ lança uma `NullPointerException`.

Caso contrário, se _index_ não estiver dentro dos limites do array referenciado por _arrayref_ , a instrução _castore_ lança uma `ArrayIndexOutOfBoundsException`.

### _checkcast_

#### Operação

Verificar se o objeto é do tipo fornecido

#### Formato

  
_checkcast_  
_indexbyte1_  
_indexbyte2_  


#### Formas

_checkcast_ = 192 (0xc0)

#### Pilha de Operandos

..., _objectref_ ->

..., _objectref_

#### Descrição

O _objectref_ deve ser do tipo `reference`. Os _indexbyte1_ e _indexbyte2_ não assinados são usados para construir um índice para o pool de constantes em tempo de execução da classe atual ([§2.6](<#/doc/jvms/jvms-02>)), onde o valor do índice é (_indexbyte1_ `<<` 8) | _indexbyte2_. A entrada do pool de constantes em tempo de execução no índice deve ser uma referência simbólica a uma classe, array ou tipo de interface.

Se _objectref_ é `null`, a pilha de operandos permanece inalterada.

Caso contrário, a classe, array ou tipo de interface nomeado é resolvido ([§5.4.3.1](<#/doc/jvms/jvms-05>)). Se _objectref_ é um valor do tipo fornecido pela classe, array ou tipo de interface resolvido, a pilha de operandos permanece inalterada.

As seguintes regras são usadas para determinar se uma referência não-`null` a um objeto é um valor de um tipo de referência, T.

  * Se a referência é para uma instância de uma classe C, então:

    * Se T é o tipo de uma classe D, então a referência é um valor de T se C é D ou uma subclasse de D;

    * Se T é o tipo de uma interface I, então a referência é um valor de T se C implementa I.

  * Se a referência é para um array com tipo de componente SC, então:

    * Se T é um tipo de classe, então a referência é um valor de T se T é `Object`;

    * Se T é um tipo de interface, então a referência é um valor de T se T é `Cloneable` ou `java.io.Serializable`, conforme definido pelo bootstrap class loader ([§5.3](<#/doc/jvms/jvms-05>));

    * Se T é um tipo de array TC`[]`, ou seja, um array de componentes do tipo TC, então a referência é um valor de T se uma das seguintes condições for verdadeira:

      * TC e SC são do mesmo tipo;

      * TC é o tipo de classe `Object`;

      * TC é um tipo de classe ou interface, SC é um tipo de classe ou interface, e a classe ou interface nomeada por SC estende ou implementa a classe ou interface nomeada por TC;

      * SC é um tipo de array SCC`[]`, e (aplicando estas regras recursivamente) uma referência a um array com tipo de componente SCC é um valor do tipo TC.

#### Exceções de Ligação

Durante a resolução da referência simbólica para a classe, array ou tipo de interface, qualquer uma das exceções documentadas em [§5.4.3.1](<#/doc/jvms/jvms-05>) pode ser lançada.

#### Exceção em Tempo de Execução

Caso contrário, se _objectref_ não é `null` e não é um valor do tipo fornecido pela classe, array ou tipo de interface resolvido, a instrução _checkcast_ lança uma `ClassCastException`.

#### Notas

A instrução _checkcast_ é muito semelhante à instrução _instanceof_ ([§ _instanceof_](<#/doc/jvms/jvms-06>)). Ela difere no seu tratamento de `null`, no seu comportamento quando o teste falha (_checkcast_ lança uma exceção, _instanceof_ empilha um código de resultado), e no seu efeito na pilha de operandos.

### _d2f_

#### Operação

Converter `double` para `float`

#### Formato

  
_d2f_  


#### Formas

_d2f_ = 144 (0x90)

#### Pilha de Operandos

..., _value_ ->

..., _result_

#### Descrição

O _value_ no topo da pilha de operandos deve ser do tipo `double`. Ele é removido da pilha de operandos e convertido para um `float` _result_ usando a política de arredondamento para o mais próximo ([§2.8](<#/doc/jvms/jvms-02>)). O _result_ é empilhado na pilha de operandos.

Um _value_ finito muito pequeno para ser representado como um `float` é convertido para um zero do mesmo sinal; um _value_ finito muito grande para ser representado como um `float` é convertido para um infinito do mesmo sinal. Um `double` NaN é convertido para um `float` NaN.

#### Notas

A instrução _d2f_ realiza uma conversão primitiva de estreitamento (JLS §5.1.3). Ela pode perder informações sobre a magnitude geral de _value_ e também pode perder precisão.

### _d2i_

#### Operação

Converter `double` para `int`

#### Formato

  
_d2i_  


#### Formas

_d2i_ = 142 (0x8e)

#### Pilha de Operandos

..., _value_ ->

..., _result_

#### Descrição

O _value_ no topo da pilha de operandos deve ser do tipo `double`. Ele é removido da pilha de operandos e convertido para um `int` _result_. O _result_ é empilhado na pilha de operandos:

  * Se o _value_ é NaN, o resultado da conversão é um `int` 0\.

  * Caso contrário, se o _value_ não é um infinito, ele é arredondado para um valor inteiro V usando a política de arredondamento em direção a zero ([§2.8](<#/doc/jvms/jvms-02>)). Se este valor inteiro V pode ser representado como um `int`, então o resultado é o valor `int` V.

  * Caso contrário, ou o _value_ deve ser muito pequeno (um valor negativo de grande magnitude ou infinito negativo), e o resultado é o menor valor representável do tipo `int`, ou o _value_ deve ser muito grande (um valor positivo de grande magnitude ou infinito positivo), e o resultado é o maior valor representável do tipo `int`.

#### Notas

A instrução _d2i_ realiza uma conversão primitiva de estreitamento (JLS §5.1.3). Ela pode perder informações sobre a magnitude geral de _value_ e também pode perder precisão.

### _d2l_

#### Operação

Converter `double` para `long`

#### Formato

  
_d2l_  


#### Formas

_d2l_ = 143 (0x8f)

#### Pilha de Operandos

..., _value_ ->

..., _result_

#### Descrição

O _value_ no topo da pilha de operandos deve ser do tipo `double`. Ele é removido da pilha de operandos e convertido para um `long`. O _result_ é empilhado na pilha de operandos:

  * Se o _value_ é NaN, o resultado da conversão é um `long` 0\.

  * Caso contrário, se o _value_ não é um infinito, ele é arredondado para um valor inteiro V usando a política de arredondamento em direção a zero ([§2.8](<#/doc/jvms/jvms-02>)). Se este valor inteiro V pode ser representado como um `long`, então o resultado é o valor `long` V.

  * Caso contrário, ou o _value_ deve ser muito pequeno (um valor negativo de grande magnitude ou infinito negativo), e o resultado é o menor valor representável do tipo `long`, ou o _value_ deve ser muito grande (um valor positivo de grande magnitude ou infinito positivo), e o resultado é o maior valor representável do tipo `long`.

#### Notas

A instrução _d2l_ realiza uma conversão primitiva de estreitamento (JLS §5.1.3). Ela pode perder informações sobre a magnitude geral de _value_ e também pode perder precisão.

### _dadd_

#### Operação

Somar `double`

#### Formato

  
_dadd_  


#### Formas

_dadd_ = 99 (0x63)

#### Pilha de Operandos

..., _value1_ , _value2_ ->

..., _result_

#### Descrição

Ambos _value1_ e _value2_ devem ser do tipo `double`. Os valores são removidos da pilha de operandos. O `double` _result_ é _value1_ \+ _value2_. O _result_ é empilhado na pilha de operandos.

O resultado de uma instrução _dadd_ é governado pelas regras da aritmética IEEE 754:

  * Se _value1_ ou _value2_ é NaN, o resultado é NaN.

  * A soma de dois infinitos de sinais opostos é NaN.

  * A soma de dois infinitos do mesmo sinal é o infinito desse sinal.

  * A soma de um infinito e qualquer valor finito é igual ao infinito.

  * A soma de dois zeros de sinais opostos é zero positivo.

  * A soma de dois zeros do mesmo sinal é o zero desse sinal.

  * A soma de um zero e um valor finito não-zero é igual ao valor não-zero.

  * A soma de dois valores finitos não-zero da mesma magnitude e sinais opostos é zero positivo.

  * Nos casos restantes, onde nenhum operando é um infinito, um zero ou NaN e os valores têm o mesmo sinal ou magnitudes diferentes, a soma é calculada e arredondada para o valor representável mais próximo usando a política de arredondamento para o mais próximo ([§2.8](<#/doc/jvms/jvms-02>)). Se a magnitude é muito grande para ser representada como um `double`, dizemos que a operação transborda (overflow); o resultado é então um infinito de sinal apropriado. Se a magnitude é muito pequena para ser representada como um `double`, dizemos que a operação subflui (underflow); o resultado é então um zero de sinal apropriado.

A Java Virtual Machine requer suporte a subfluxo gradual. Apesar do fato de que overflow, underflow ou perda de precisão podem ocorrer, a execução de uma instrução _dadd_ nunca lança uma exceção em tempo de execução.

### _daload_

#### Operação

Carregar `double` de array

#### Formato

  
_daload_  


#### Formas

_daload_ = 49 (0x31)

#### Pilha de Operandos

..., _arrayref_ , _index_ ->

..., _value_

#### Descrição

O _arrayref_ deve ser do tipo `reference` e deve se referir a um array cujos componentes são do tipo `double`. O _index_ deve ser do tipo `int`. Ambos _arrayref_ e _index_ são removidos da pilha de operandos. O `double` _value_ no componente do array no _index_ é recuperado e empilhado na pilha de operandos.

#### Exceções em Tempo de Execução

Se _arrayref_ é `null`, _daload_ lança uma `NullPointerException`.

Caso contrário, se _index_ não estiver dentro dos limites do array referenciado por _arrayref_ , a instrução _daload_ lança uma `ArrayIndexOutOfBoundsException`.

### _dastore_

#### Operação

Armazenar em array de `double`

#### Formato

  
_dastore_  


#### Formas

_dastore_ = 82 (0x52)

#### Pilha de Operandos

..., _arrayref_ , _index_ , _value_ ->

...

#### Descrição

O _arrayref_ deve ser do tipo `reference` e deve se referir a um array cujos componentes são do tipo `double`. O _index_ deve ser do tipo `int`, e _value_ deve ser do tipo `double`. O _arrayref_ , _index_ e _value_ são removidos da pilha de operandos. O `double` _value_ é armazenado como o componente do array indexado por _index_.

#### Exceções em Tempo de Execução

Se _arrayref_ é `null`, _dastore_ lança uma `NullPointerException`.

Caso contrário, se _index_ não estiver dentro dos limites do array referenciado por _arrayref_ , a instrução _dastore_ lança uma `ArrayIndexOutOfBoundsException`.

### _dcmp &lt;op&gt;_

#### Operação

Comparar `double`

#### Formato

  
_dcmp &lt;op&gt;_  


#### Formas

_dcmpg_ = 152 (0x98)

_dcmpl_ = 151 (0x97)

#### Pilha de Operandos

..., _value1_ , _value2_ ->

..., _result_

#### Descrição

Ambos _value1_ e _value2_ devem ser do tipo `double`. Os valores são removidos da pilha de operandos e uma comparação de ponto flutuante é realizada:

  * Se _value1_ é maior que _value2_ , o valor `int` 1 é empilhado na pilha de operandos.

  * Caso contrário, se _value1_ é igual a _value2_ , o valor `int` 0 é empilhado na pilha de operandos.

  * Caso contrário, se _value1_ é menor que _value2_ , o valor `int` -1 é empilhado na pilha de operandos.

  * Caso contrário, pelo menos um de _value1_ ou _value2_ é NaN. A instrução _dcmpg_ empilha o valor `int` 1 na pilha de operandos e a instrução _dcmpl_ empilha o valor `int` -1 na pilha de operandos.

A comparação de ponto flutuante é realizada de acordo com o IEEE 754\. Todos os valores, exceto NaN, são ordenados, com infinito negativo menor que todos os valores finitos e infinito positivo maior que todos os valores finitos. Zero positivo e zero negativo são considerados iguais.

#### Notas

As instruções _dcmpg_ e _dcmpl_ diferem apenas no tratamento de uma comparação envolvendo NaN. NaN é não ordenado, então qualquer comparação de `double` falha se um ou ambos os seus operandos são NaN. Com _dcmpg_ e _dcmpl_ disponíveis, qualquer comparação de `double` pode ser compilada para empilhar o mesmo _result_ na pilha de operandos, quer a comparação falhe em valores não-NaN ou falhe porque encontrou um NaN. Para mais informações, consulte [§3.5](<#/doc/jvms/jvms-03>).

### _dconst &lt;d&gt;_

#### Operação

Empilhar `double`

#### Formato

  
_dconst_ &lt;d&gt;_  


#### Formas

_dconst_0_ = 14 (0xe)

_dconst_1_ = 15 (0xf)

#### Pilha de Operandos

... ->

..., <_d_ >

#### Descrição

Empilha a constante `double` <_d_ > (0.0 ou 1.0) na pilha de operandos.

### _ddiv_

#### Operação

Dividir `double`

#### Formato

  
_ddiv_  


#### Formas

_ddiv_ = 111 (0x6f)

#### Pilha de Operandos

..., _value1_ , _value2_ ->

..., _result_

#### Descrição

Ambos _value1_ e _value2_ devem ser do tipo `double`. Os valores são removidos da pilha de operandos. O `double` _result_ é _value1_ / _value2_. O _result_ é empilhado na pilha de operandos.

O resultado de uma instrução _ddiv_ é governado pelas regras da aritmética IEEE 754:

  * Se _value1_ ou _value2_ é NaN, o resultado é NaN.

  * Se nem _value1_ nem _value2_ é NaN, o sinal do resultado é positivo se ambos os valores têm o mesmo sinal, negativo se os valores têm sinais diferentes.

  * A divisão de um infinito por um infinito resulta em NaN.

  * A divisão de um infinito por um valor finito resulta em um infinito com sinal, com a regra de produção de sinal recém-mencionada.

  * A divisão de um valor finito por um infinito resulta em um zero com sinal, com a regra de produção de sinal recém-mencionada.

  * A divisão de um zero por um zero resulta em NaN; a divisão de zero por qualquer outro valor finito resulta em um zero com sinal, com a regra de produção de sinal recém-mencionada.

  * A divisão de um valor finito não-zero por um zero resulta em um infinito com sinal, com a regra de produção de sinal recém-mencionada.

  * Nos casos restantes, onde nenhum operando é um infinito, um zero ou NaN, o quociente é calculado e arredondado para o `double` mais próximo usando a política de arredondamento para o mais próximo ([§2.8](<#/doc/jvms/jvms-02>)). Se a magnitude é muito grande para ser representada como um `double`, dizemos que a operação transborda (overflow); o resultado é então um infinito de sinal apropriado. Se a magnitude é muito pequena para ser representada como um `double`, dizemos que a operação subflui (underflow); o resultado é então um zero de sinal apropriado.

A Java Virtual Machine requer suporte a subfluxo gradual. Apesar do fato de que overflow, underflow, divisão por zero ou perda de precisão podem ocorrer, a execução de uma instrução _ddiv_ nunca lança uma exceção em tempo de execução.

### _dload_

#### Operação

Carregar `double` de variável local

#### Formato

  
_dload_  
_index_  


#### Formas

_dload_ = 24 (0x18)

#### Pilha de Operandos

... ->

..., _value_

#### Descrição

O _index_ é um byte sem sinal. Ambos _index_ e _index_ +1 devem ser índices para o array de variáveis locais do frame atual ([§2.6](<#/doc/jvms/jvms-02>)). A variável local em _index_ deve conter um `double`. O _value_ da variável local em _index_ é empilhado na pilha de operandos.

#### Notas

O opcode _dload_ pode ser usado em conjunto com a instrução _wide_ ([§ _wide_](<#/doc/jvms/jvms-06>)) para acessar uma variável local usando um índice sem sinal de dois bytes.

### _dload &lt;n&gt;_

#### Operação

Carregar `double` de variável local

#### Formato

  
_dload_ &lt;n&gt;_  


#### Formas

_dload_0_ = 38 (0x26)

_dload_1_ = 39 (0x27)

_dload_2_ = 40 (0x28)

_dload_3_ = 41 (0x29)

#### Pilha de Operandos

... ->

..., _value_

#### Descrição

Ambos <_n_ > e <_n_ >+1 devem ser índices para o array de variáveis locais do frame atual ([§2.6](<#/doc/jvms/jvms-02>)). A variável local em <_n_ > deve conter um `double`. O _value_ da variável local em <_n_ > é empilhado na pilha de operandos.

#### Notas

Cada uma das instruções _dload_ &lt;n&gt;_ é a mesma que _dload_ com um _index_ de <_n_ >, exceto que o operando <_n_ > é implícito.

### _dmul_

#### Operação

Multiplicar `double`

#### Formato

  
_dmul_  


#### Formas

_dmul_ = 107 (0x6b)

#### Pilha de Operandos

..., _value1_ , _value2_ ->

..., _result_

#### Descrição

Ambos _value1_ e _value2_ devem ser do tipo `double`. Os valores são removidos da pilha de operandos. O `double` _result_ é _value1_ * _value2_. O _result_ é empilhado na pilha de operandos.

O resultado de uma instrução _dmul_ é governado pelas regras da aritmética IEEE 754:

  * Se _value1_ ou _value2_ é NaN, o resultado é NaN.

  * Se nem _value1_ nem _value2_ é NaN, o sinal do resultado é positivo se ambos os valores têm o mesmo sinal e negativo se os valores têm sinais diferentes.

  * A multiplicação de um infinito por um zero resulta em NaN.

  * A multiplicação de um infinito por um valor finito resulta em um infinito com sinal, com a regra de produção de sinal recém-mencionada.

  * Nos casos restantes, onde nem um infinito nem NaN estão envolvidos, o produto é calculado e arredondado para o valor representável mais próximo usando a política de arredondamento para o mais próximo ([§2.8](<#/doc/jvms/jvms-02>)). Se a magnitude é muito grande para ser representada como um `double`, dizemos que a operação transborda (overflow); o resultado é então um infinito de sinal apropriado. Se a magnitude é muito pequena para ser representada como um `double`, dizemos que a operação subflui (underflow); o resultado é então um zero de sinal apropriado.

A Java Virtual Machine requer suporte a subfluxo gradual. Apesar do fato de que overflow, underflow ou perda de precisão podem ocorrer, a execução de uma instrução _dmul_ nunca lança uma exceção em tempo de execução.

### _dneg_

#### Operação

Negar `double`

#### Formato

  
_dneg_  


#### Formas

_dneg_ = 119 (0x77)

#### Pilha de Operandos

..., _value_ ->

..., _result_

#### Descrição

O valor deve ser do tipo `double`. Ele é removido da pilha de operandos. O `double` _result_ é a negação aritmética de _value_. O _result_ é empilhado na pilha de operandos.

Para valores `double`, a negação não é o mesmo que a subtração de zero. Se `x` é `+0.0`, então `0.0-x` é igual a `+0.0`, mas `-x` é igual a `-0.0`. O menos unário simplesmente inverte o sinal de um `double`.

Casos especiais de interesse:

  * Se o operando é NaN, o resultado é NaN (lembre-se que NaN não tem sinal).

A Java Virtual Machine não adotou o requisito mais rigoroso da versão 2019 do Padrão IEEE 754 de que a negação inverte o bit de sinal para todas as entradas, incluindo NaN.

  * Se o operando é um infinito, o resultado é o infinito de sinal oposto.

  * Se o operando é um zero, o resultado é o zero de sinal oposto.

### _drem_

#### Operação

Resto `double`

#### Formato

  
_drem_  


#### Formas

_drem_ = 115 (0x73)

#### Pilha de Operandos

..., _value1_ , _value2_ ->

..., _result_

#### Descrição

Ambos _value1_ e _value2_ devem ser do tipo `double`. Os valores são removidos da pilha de operandos. O `double` _result_ é calculado e empilhado na pilha de operandos.

O resultado de uma instrução _drem_ não é o mesmo que o resultado da operação de resto definida pelo IEEE 754, devido à escolha da política de arredondamento na Java Virtual Machine ([§2.8](<#/doc/jvms/jvms-02>)). A operação de resto IEEE 754 calcula o resto de uma divisão com arredondamento, não de uma divisão com truncamento, e, portanto, seu comportamento _não_ é análogo ao do operador de resto inteiro usual. Em vez disso, a Java Virtual Machine define _drem_ para se comportar de maneira análoga à das instruções de resto inteiro _irem_ e _lrem_ , com uma divisão implícita usando a política de arredondamento em direção a zero; isso pode ser comparado com a função da biblioteca C `fmod`.

O resultado de uma instrução _drem_ é governado pelas seguintes regras, que correspondem à aritmética IEEE 754, exceto pela forma como a divisão implícita é calculada:

  * Se _value1_ ou _value2_ é NaN, o resultado é NaN.

  * Se nem _value1_ nem _value2_ é NaN, o sinal do resultado é igual ao sinal do dividendo.

  * Se o dividendo é um infinito ou o divisor é um zero ou ambos, o resultado é NaN.

  * Se o dividendo é finito e o divisor é um infinito, o resultado é igual ao dividendo.

  * Se o dividendo é um zero e o divisor é finito, o resultado é igual ao dividendo.

  * Nos casos restantes, onde nenhum operando é um infinito, um zero ou NaN, o resto de ponto flutuante _result_ de um dividendo _value1_ e um divisor _value2_ é definido pela relação matemática _result_ = _value1_ \- (_value2_ * _q_), onde _q_ é um inteiro que é negativo apenas se _value1_ / _value2_ é negativo, e positivo apenas se _value1_ / _value2_ é positivo, e cuja magnitude é tão grande quanto possível sem exceder a magnitude do verdadeiro quociente matemático de _value1_ e _value2_.

Apesar do fato de que a divisão por zero pode ocorrer, a avaliação de uma instrução _drem_ nunca lança uma exceção em tempo de execução. Overflow, underflow ou perda de precisão não podem ocorrer.

#### Notas

A operação de resto IEEE 754 pode ser calculada pela rotina de biblioteca `Math.IEEEremainder` ou `StrictMath.IEEEremainder`.

### _dreturn_

#### Operação

Retornar `double` de método

#### Formato

  
_dreturn_  


#### Formas

_dreturn_ = 175 (0xaf)

#### Pilha de Operandos

..., _value_ ->

[empty]

#### Descrição

O método atual deve ter tipo de retorno `double`. O _value_ deve ser do tipo `double`. Se o método atual é um método `synchronized`, o monitor entrado ou reentrado na invocação do método é atualizado e possivelmente saído como se pela execução de uma instrução _monitorexit_ ([§ _monitorexit_](<#/doc/jvms/jvms-06>)) na thread atual. Se nenhuma exceção for lançada, _value_ é removido da pilha de operandos do frame atual ([§2.6](<#/doc/jvms/jvms-02>)) e empilhado na pilha de operandos do frame do invocador. Quaisquer outros valores na pilha de operandos do método atual são descartados.

O interpretador então retorna o controle ao invocador do método, reinstaurando o frame do invocador.

#### Exceções em Tempo de Execução

Se a Java Virtual Machine implementação não impõe as regras de bloqueio estruturado descritas em [§2.11.10](<#/doc/jvms/jvms-02>), então, se o método atual é um método `synchronized` e a thread atual não é a proprietária do monitor entrado ou reentrado na invocação do método, _dreturn_ lança uma `IllegalMonitorStateException`. Isso pode acontecer, por exemplo, se um método `synchronized` contém uma instrução _monitorexit_, mas nenhuma instrução _monitorenter_, no objeto no qual o método é sincronizado.

Caso contrário, se a Java Virtual Machine implementação impõe as regras de bloqueio estruturado descritas em [§2.11.10](<#/doc/jvms/jvms-02>) e se a primeira dessas regras é violada durante a invocação do método atual, então _dreturn_ lança uma `IllegalMonitorStateException`.

### _dstore_

#### Operação

Armazenar `double` em variável local

#### Formato

  
_dstore_  
_index_  


#### Formas

_dstore_ = 57 (0x39)

#### Pilha de Operandos

..., _value_ ->

...

#### Descrição

O _index_ é um byte sem sinal. Ambos _index_ e _index_ +1 devem ser índices para o array de variáveis locais do frame atual ([§2.6](<#/doc/jvms/jvms-02>)). O _value_ no topo da pilha de operandos deve ser do tipo `double`. Ele é removido da pilha de operandos. As variáveis locais em _index_ e _index_ +1 são definidas como _value_.

#### Notas

O opcode _dstore_ pode ser usado em conjunto com a instrução _wide_ ([§ _wide_](<#/doc/jvms/jvms-06>)) para acessar uma variável local usando um índice sem sinal de dois bytes.

### _dstore &lt;n&gt;_

#### Operação

Armazenar `double` em variável local

#### Formato

  
_dstore_ &lt;n&gt;_  


#### Formas

_dstore_0_ = 71 (0x47)

_dstore_1_ = 72 (0x48)

_dstore_2_ = 73 (0x49)

_dstore_3_ = 74 (0x4a)

#### Pilha de Operandos

..., _value_ ->

...

#### Descrição

Ambos <_n_ > e <_n_ >+1 devem ser índices para o array de variáveis locais do frame atual ([§2.6](<#/doc/jvms/jvms-02>)). O _value_ no topo da pilha de operandos deve ser do tipo `double`. Ele é removido da pilha de operandos. As variáveis locais em <_n_ > e <_n_ >+1 são definidas como _value_.

#### Notas

Cada uma das instruções _dstore_ &lt;n&gt;_ é a mesma que _dstore_ com um _index_ de <_n_ >, exceto que o operando <_n_ > é implícito.

### _dsub_

#### Operação

Subtrair `double`

#### Formato

  
_dsub_  


#### Formas

_dsub_ = 103 (0x67)

#### Pilha de Operandos

..., _value1_ , _value2_ ->

..., _result_

#### Descrição

Ambos _value1_ e _value2_ devem ser do tipo `double`. Os valores são removidos da pilha de operandos. O `double` _result_ é _value1_ \- _value2_. O _result_ é empilhado na pilha de operandos.

Para a subtração de `double`, é sempre verdade que `a-b` produz o mesmo resultado que `a+(-b)`. No entanto, para a instrução _dsub_, a subtração de zero não é o mesmo que a negação, porque se `x` é `+0.0`, então `0.0-x` é igual a `+0.0`, mas `-x` é igual a `-0.0`.

A Java Virtual Machine requer suporte a subfluxo gradual. Apesar do fato de que overflow, underflow ou perda de precisão podem ocorrer, a execução de uma instrução _dsub_ nunca lança uma exceção em tempo de execução.

### _dup_

#### Operação

Duplicar o valor superior da pilha de operandos

#### Formato

  
_dup_  


#### Formas

_dup_ = 89 (0x59)

#### Pilha de Operandos

..., _value_ ->

..., _value_ , _value_

#### Descrição

Duplica o valor superior na pilha de operandos e empilha o valor duplicado na pilha de operandos.

A instrução _dup_ não deve ser usada a menos que _value_ seja um valor de um tipo computacional de categoria 1 ([§2.11.1](<#/doc/jvms/jvms-02>)).

### _dup_x1_

#### Operação

Duplicar o valor superior da pilha de operandos e inserir duas posições abaixo

#### Formato

  
_dup_x1_  


#### Formas

_dup_x1_ = 90 (0x5a)

#### Pilha de Operandos

..., _value2_ , _value1_ ->

..., _value1_ , _value2_ , _value1_

#### Descrição

Duplica o valor superior na pilha de operandos e insere o valor duplicado duas posições abaixo na pilha de operandos.

A instrução _dup_x1_ não deve ser usada a menos que _value1_ e _value2_ sejam ambos valores de um tipo computacional de categoria 1 ([§2.11.1](<#/doc/jvms/jvms-02>)).

### _dup_x2_

#### Operação

Duplicar o valor superior da pilha de operandos e inserir duas ou três posições abaixo

#### Formato

  
_dup_x2_  


#### Formas

_dup_x2_ = 91 (0x5b)

#### Pilha de Operandos

Forma 1:

..., _value3_ , _value2_ , _value1_ ->

..., _value1_ , _value3_ , _value2_ , _value1_

onde _value1_ , _value2_ e _value3_ são todos valores de um tipo computacional de categoria 1 ([§2.11.1](<#/doc/jvms/jvms-02>)).

Forma 2:

..., _value2_ , _value1_ ->

..., _value1_ , _value2_ , _value1_

onde _value1_ é um valor de um tipo computacional de categoria 1 e _value2_ é um valor de um tipo computacional de categoria 2 ([§2.11.1](<#/doc/jvms/jvms-02>)).

#### Descrição

Duplica o valor superior na pilha de operandos e insere o valor duplicado duas ou três posições abaixo na pilha de operandos.

### _dup2_

#### Operação

Duplicar o(s) valor(es) superior(es) da pilha de operandos (um ou dois)

#### Formato

  
_dup2_  


#### Formas

_dup2_ = 92 (0x5c)

#### Pilha de Operandos

Forma 1:

..., _value2_ , _value1_ ->

..., _value2_ , _value1_ , _value2_ , _value1_

onde _value1_ e _value2_ são ambos valores de um tipo computacional de categoria 1 ([§2.11.1](<#/doc/jvms/jvms-02>)).

Forma 2:

..., _value_ ->

..., _value_ , _value_

onde _value_ é um valor de um tipo computacional de categoria 2 ([§2.11.1](<#/doc/jvms/jvms-02>)).

#### Descrição

Duplica o(s) valor(es) superior(es) da pilha de operandos (um ou dois) e empilha o(s) valor(es) duplicado(s) de volta na pilha de operandos na ordem original.

### _dup2_x1_

#### Operação

Duplicar o(s) valor(es) superior(es) da pilha de operandos (um ou dois) e inserir duas ou três posições abaixo

#### Formato

  
_dup2_x1_  


#### Formas

_dup2_x1_ = 93 (0x5d)

#### Pilha de Operandos

Forma 1:

..., _value3_ , _value2_ , _value1_ ->

..., _value2_ , _value1_ , _value3_ , _value2_ , _value1_

onde _value1_ , _value2_ e _value3_ são todos valores de um tipo computacional de categoria 1 ([§2.11.1](<#/doc/jvms/jvms-02>)).

Forma 2:

..., _value2_ , _value1_ ->

..., _value1_ , _value2_ , _value1_

onde _value1_ é um valor de um tipo computacional de categoria 2 e _value2_ é um valor de um tipo computacional de categoria 1 ([§2.11.1](<#/doc/jvms/jvms-02>)).

#### Descrição

Duplica o(s) valor(es) superior(es) da pilha de operandos (um ou dois) e insere os valores duplicados, na ordem original, uma posição abaixo do(s) valor(es) original(is) na pilha de operandos.

### _dup2_x2_

#### Operação

Duplicar o(s) valor(es) superior(es) da pilha de operandos (um ou dois) e inserir duas, três ou quatro posições abaixo

#### Formato

  
_dup2_x2_  
#### Formas

_dup2_x2_ = 94 (0x5e)

#### Pilha de Operandos

Forma 1:

..., _value4_ , _value3_ , _value2_ , _value1_ ->

..., _value2_ , _value1_ , _value4_ , _value3_ , _value2_ , _value1_

onde _value1_ , _value2_ , _value3_ e _value4_ são todos valores de um tipo computacional de categoria 1 ([§2.11.1](<#/doc/jvms/jvms-02>)).

Forma 2:

..., _value3_ , _value2_ , _value1_ ->

..., _value1_ , _value3_ , _value2_ , _value1_

onde _value1_ é um valor de um tipo computacional de categoria 2 e _value2_ e _value3_ são ambos valores de um tipo computacional de categoria 1 ([§2.11.1](<#/doc/jvms/jvms-02>)).

Forma 3:

..., _value3_ , _value2_ , _value1_ ->

..., _value2_ , _value1_ , _value3_ , _value2_ , _value1_

onde _value1_ e _value2_ são ambos valores de um tipo computacional de categoria 1 e _value3_ é um valor de um tipo computacional de categoria 2 ([§2.11.1](<#/doc/jvms/jvms-02>)).

Forma 4:

..., _value2_ , _value1_ ->

..., _value1_ , _value2_ , _value1_

onde _value1_ e _value2_ são ambos valores de um tipo computacional de categoria 2 ([§2.11.1](<#/doc/jvms/jvms-02>)).

#### Descrição

Duplica o(s) um ou dois valores do topo da pilha de operandos e insere os valores duplicados, na ordem original, na pilha de operandos.

### _f2d_

#### Operação

Converte `float` para `double`

#### Formato

_f2d_

#### Formas

_f2d_ = 141 (0x8d)

#### Pilha de Operandos

..., _value_ ->

..., _result_

#### Descrição

O _value_ no topo da pilha de operandos deve ser do tipo `float`. Ele é removido da pilha de operandos e convertido para um `double` _result_. O _result_ é empilhado na pilha de operandos.

#### Notas

A instrução _f2d_ realiza uma conversão primitiva de alargamento (JLS §5.1.2).

### _f2i_

#### Operação

Converte `float` para `int`

#### Formato

_f2i_

#### Formas

_f2i_ = 139 (0x8b)

#### Pilha de Operandos

..., _value_ ->

..., _result_

#### Descrição

O _value_ no topo da pilha de operandos deve ser do tipo `float`. Ele é removido da pilha de operandos e convertido para um `int` _result_. O _result_ é empilhado na pilha de operandos:

*   Se o _value_ for NaN, o _result_ da conversão é um `int` 0.

*   Caso contrário, se o _value_ não for um infinito, ele é arredondado para um valor inteiro V usando a política de arredondamento em direção a zero ([§2.8](<#/doc/jvms/jvms-02>)). Se este valor inteiro V puder ser representado como um `int`, então o _result_ é o valor `int` V.

*   Caso contrário, ou o _value_ deve ser muito pequeno (um valor negativo de grande magnitude ou infinito negativo), e o _result_ é o menor valor representável do tipo `int`, ou o _value_ deve ser muito grande (um valor positivo de grande magnitude ou infinito positivo), e o _result_ é o maior valor representável do tipo `int`.

#### Notas

A instrução _f2i_ realiza uma conversão primitiva de estreitamento (JLS §5.1.3). Ela pode perder informações sobre a magnitude geral de _value_ e também pode perder precisão.

### _f2l_

#### Operação

Converte `float` para `long`

#### Formato

_f2l_

#### Formas

_f2l_ = 140 (0x8c)

#### Pilha de Operandos

..., _value_ ->

..., _result_

#### Descrição

O _value_ no topo da pilha de operandos deve ser do tipo `float`. Ele é removido da pilha de operandos e convertido para um `long` _result_. O _result_ é empilhado na pilha de operandos:

*   Se o _value_ for NaN, o resultado da conversão é um `long` 0.

*   Caso contrário, se o _value_ não for um infinito, ele é arredondado para um valor inteiro V usando a política de arredondamento em direção a zero ([§2.8](<#/doc/jvms/jvms-02>)). Se este valor inteiro V puder ser representado como um `long`, então o _result_ é o valor `long` V.

*   Caso contrário, ou o _value_ deve ser muito pequeno (um valor negativo de grande magnitude ou infinito negativo), e o _result_ é o menor valor representável do tipo `long`, ou o _value_ deve ser muito grande (um valor positivo de grande magnitude ou infinito positivo), e o _result_ é o maior valor representável do tipo `long`.

#### Notas

A instrução _f2l_ realiza uma conversão primitiva de estreitamento (JLS §5.1.3). Ela pode perder informações sobre a magnitude geral de _value_ e também pode perder precisão.

### _fadd_

#### Operação

Adiciona `float`

#### Formato

_fadd_

#### Formas

_fadd_ = 98 (0x62)

#### Pilha de Operandos

..., _value1_ , _value2_ ->

..., _result_

#### Descrição

Ambos _value1_ e _value2_ devem ser do tipo `float`. Os valores são removidos da pilha de operandos. O `float` _result_ é _value1_ + _value2_. O _result_ é empilhado na pilha de operandos.

O resultado de uma instrução _fadd_ é regido pelas regras da aritmética IEEE 754:

*   Se _value1_ ou _value2_ for NaN, o resultado é NaN.

*   A soma de dois infinitos de sinal oposto é NaN.

*   A soma de dois infinitos do mesmo sinal é o infinito desse sinal.

*   A soma de um infinito e qualquer valor finito é igual ao infinito.

*   A soma de dois zeros de sinal oposto é zero positivo.

*   A soma de dois zeros do mesmo sinal é o zero desse sinal.

*   A soma de um zero e um valor finito não zero é igual ao valor não zero.

*   A soma de dois valores finitos não zero da mesma magnitude e sinal oposto é zero positivo.

*   Nos casos restantes, onde nenhum operando é um infinito, um zero ou NaN e os valores têm o mesmo sinal ou magnitudes diferentes, a soma é calculada e arredondada para o valor representável mais próximo usando a política de arredondamento para o mais próximo ([§2.8](<#/doc/jvms/jvms-02>)). Se a magnitude for muito grande para ser representada como um `float`, dizemos que a operação transborda (overflow); o resultado é então um infinito com o sinal apropriado. Se a magnitude for muito pequena para ser representada como um `float`, dizemos que a operação subflui (underflow); o resultado é então um zero com o sinal apropriado.

A Java Virtual Machine requer suporte a subfluxo gradual. Apesar do fato de que overflow, underflow ou perda de precisão podem ocorrer, a execução de uma instrução _fadd_ nunca lança uma exceção em tempo de execução.

### _faload_

#### Operação

Carrega `float` de array

#### Formato

_faload_

#### Formas

_faload_ = 48 (0x30)

#### Pilha de Operandos

..., _arrayref_ , _index_ ->

..., _value_

#### Descrição

O _arrayref_ deve ser do tipo `reference` e deve referir-se a um array cujos componentes são do tipo `float`. O _index_ deve ser do tipo `int`. Ambos _arrayref_ e _index_ são removidos da pilha de operandos. O valor `float` no componente do array no _index_ é recuperado e empilhado na pilha de operandos.

#### Exceções em Tempo de Execução

Se _arrayref_ for `null`, _faload_ lança uma `NullPointerException`.

Caso contrário, se _index_ não estiver dentro dos limites do array referenciado por _arrayref_ , a instrução _faload_ lança uma `ArrayIndexOutOfBoundsException`.

### _fastore_

#### Operação

Armazena em array de `float`

#### Formato

_fastore_

#### Formas

_fastore_ = 81 (0x51)

#### Pilha de Operandos

..., _arrayref_ , _index_ , _value_ ->

...

#### Descrição

O _arrayref_ deve ser do tipo `reference` e deve referir-se a um array cujos componentes são do tipo `float`. O _index_ deve ser do tipo `int`, e o _value_ deve ser do tipo `float`. O _arrayref_ , _index_ e _value_ são removidos da pilha de operandos. O `float` _value_ é armazenado como o componente do array indexado por _index_.

#### Exceções em Tempo de Execução

Se _arrayref_ for `null`, _fastore_ lança uma `NullPointerException`.

Caso contrário, se _index_ não estiver dentro dos limites do array referenciado por _arrayref_ , a instrução _fastore_ lança uma `ArrayIndexOutOfBoundsException`.

### _fcmp &lt;op&gt;_

#### Operação

Compara `float`

#### Formato

_fcmp &lt;op&gt;_

#### Formas

_fcmpg_ = 150 (0x96)

_fcmpl_ = 149 (0x95)

#### Pilha de Operandos

..., _value1_ , _value2_ ->

..., _result_

#### Descrição

Ambos _value1_ e _value2_ devem ser do tipo `float`. Os valores são removidos da pilha de operandos e uma comparação de ponto flutuante é realizada:

*   Se _value1_ for maior que _value2_ , o valor `int` 1 é empilhado na pilha de operandos.

*   Caso contrário, se _value1_ for igual a _value2_ , o valor `int` 0 é empilhado na pilha de operandos.

*   Caso contrário, se _value1_ for menor que _value2_ , o valor `int` -1 é empilhado na pilha de operandos.

*   Caso contrário, pelo menos um de _value1_ ou _value2_ é NaN. A instrução _fcmpg_ empilha o valor `int` 1 na pilha de operandos e a instrução _fcmpl_ empilha o valor `int` -1 na pilha de operandos.

A comparação de ponto flutuante é realizada de acordo com o IEEE 754. Todos os valores, exceto NaN, são ordenados, com infinito negativo menor que todos os valores finitos e infinito positivo maior que todos os valores finitos. Zero positivo e zero negativo são considerados iguais.

#### Notas

As instruções _fcmpg_ e _fcmpl_ diferem apenas no tratamento de uma comparação envolvendo NaN. NaN é não ordenado, então qualquer comparação `float` falha se um ou ambos os seus operandos forem NaN. Com _fcmpg_ e _fcmpl_ disponíveis, qualquer comparação `float` pode ser compilada para empilhar o mesmo _result_ na pilha de operandos, quer a comparação falhe em valores não-NaN ou falhe porque encontrou um NaN. Para mais informações, consulte [§3.5](<#/doc/jvms/jvms-03>).

### _fconst_ &lt;f&gt;_

#### Operação

Empilha `float`

#### Formato

_fconst_ &lt;f&gt;_

#### Formas

_fconst_0_ = 11 (0xb)

_fconst_1_ = 12 (0xc)

_fconst_2_ = 13 (0xd)

#### Pilha de Operandos

... ->

..., <_f_ >

#### Descrição

Empilha a constante `float` <_f_ > (0.0, 1.0 ou 2.0) na pilha de operandos.

### _fdiv_

#### Operação

Divide `float`

#### Formato

_fdiv_

#### Formas

_fdiv_ = 110 (0x6e)

#### Pilha de Operandos

..., _value1_ , _value2_ ->

..., _result_

#### Descrição

Ambos _value1_ e _value2_ devem ser do tipo `float`. Os valores são removidos da pilha de operandos. O `float` _result_ é _value1_ / _value2_. O _result_ é empilhado na pilha de operandos.

O resultado de uma instrução _fdiv_ é regido pelas regras da aritmética IEEE 754:

*   Se _value1_ ou _value2_ for NaN, o resultado é NaN.

*   Se nem _value1_ nem _value2_ for NaN, o sinal do resultado é positivo se ambos os valores tiverem o mesmo sinal, negativo se os valores tiverem sinais diferentes.

*   A divisão de um infinito por um infinito resulta em NaN.

*   A divisão de um infinito por um valor finito resulta em um infinito com sinal, com a regra de produção de sinal recém-dada.

*   A divisão de um valor finito por um infinito resulta em um zero com sinal, com a regra de produção de sinal recém-dada.

*   A divisão de um zero por um zero resulta em NaN; a divisão de zero por qualquer outro valor finito resulta em um zero com sinal, com a regra de produção de sinal recém-dada.

*   A divisão de um valor finito não zero por um zero resulta em um infinito com sinal, com a regra de produção de sinal recém-dada.

*   Nos casos restantes, onde nenhum operando é um infinito, um zero ou NaN, o quociente é calculado e arredondado para o `float` mais próximo usando a política de arredondamento para o mais próximo ([§2.8](<#/doc/jvms/jvms-02>)). Se a magnitude for muito grande para ser representada como um `float`, dizemos que a operação transborda (overflow); o resultado é então um infinito com o sinal apropriado. Se a magnitude for muito pequena para ser representada como um `float`, dizemos que a operação subflui (underflow); o resultado é então um zero com o sinal apropriado.

A Java Virtual Machine requer suporte a subfluxo gradual. Apesar do fato de que overflow, underflow, divisão por zero ou perda de precisão podem ocorrer, a execução de uma instrução _fdiv_ nunca lança uma exceção em tempo de execução.

### _fload_

#### Operação

Carrega `float` de variável local

#### Formato

_fload_
_index_

#### Formas

_fload_ = 23 (0x17)

#### Pilha de Operandos

... ->

..., _value_

#### Descrição

O _index_ é um byte sem sinal que deve ser um índice no array de variáveis locais do frame atual ([§2.6](<#/doc/jvms/jvms-02>)). A variável local no _index_ deve conter um `float`. O _value_ da variável local no _index_ é empilhado na pilha de operandos.

#### Notas

O opcode _fload_ pode ser usado em conjunto com a instrução _wide_ ([§ _wide_](<#/doc/jvms/jvms-06>)) para acessar uma variável local usando um índice sem sinal de dois bytes.

### _fload_ &lt;n&gt;_

#### Operação

Carrega `float` de variável local

#### Formato

_fload_ &lt;n&gt;_

#### Formas

_fload_0_ = 34 (0x22)

_fload_1_ = 35 (0x23)

_fload_2_ = 36 (0x24)

_fload_3_ = 37 (0x25)

#### Pilha de Operandos

... ->

..., _value_

#### Descrição

O <_n_ > deve ser um índice no array de variáveis locais do frame atual ([§2.6](<#/doc/jvms/jvms-02>)). A variável local em <_n_ > deve conter um `float`. O _value_ da variável local em <_n_ > é empilhado na pilha de operandos.

#### Notas

Cada uma das instruções _fload_ &lt;n&gt;_ é a mesma que _fload_ com um _index_ de <_n_ >, exceto que o operando <_n_ > é implícito.

### _fmul_

#### Operação

Multiplica `float`

#### Formato

_fmul_

#### Formas

_fmul_ = 106 (0x6a)

#### Pilha de Operandos

..., _value1_ , _value2_ ->

..., _result_

#### Descrição

Ambos _value1_ e _value2_ devem ser do tipo `float`. Os valores são removidos da pilha de operandos. O `float` _result_ é _value1_ * _value2_. O _result_ é empilhado na pilha de operandos.

O resultado de uma instrução _fmul_ é regido pelas regras da aritmética IEEE 754:

*   Se _value1_ ou _value2_ for NaN, o resultado é NaN.

*   Se nem _value1_ nem _value2_ for NaN, o sinal do resultado é positivo se ambos os valores tiverem o mesmo sinal, e negativo se os valores tiverem sinais diferentes.

*   A multiplicação de um infinito por um zero resulta em NaN.

*   A multiplicação de um infinito por um valor finito resulta em um infinito com sinal, com a regra de produção de sinal recém-dada.

*   Nos casos restantes, onde nem um infinito nem NaN estão envolvidos, o produto é calculado e arredondado para o valor representável mais próximo usando a política de arredondamento para o mais próximo ([§2.8](<#/doc/jvms/jvms-02>)). Se a magnitude for muito grande para ser representada como um `float`, dizemos que a operação transborda (overflow); o resultado é então um infinito com o sinal apropriado. Se a magnitude for muito pequena para ser representada como um `float`, dizemos que a operação subflui (underflow); o resultado é então um zero com o sinal apropriado.

A Java Virtual Machine requer suporte a subfluxo gradual. Apesar do fato de que overflow, underflow ou perda de precisão podem ocorrer, a execução de uma instrução _fmul_ nunca lança uma exceção em tempo de execução.

### _fneg_

#### Operação

Nega `float`

#### Formato

_fneg_

#### Formas

_fneg_ = 118 (0x76)

#### Pilha de Operandos

..., _value_ ->

..., _result_

#### Descrição

O _value_ deve ser do tipo `float`. Ele é removido da pilha de operandos. O `float` _result_ é a negação aritmética de _value_. O _result_ é empilhado na pilha de operandos.

Para valores `float`, a negação não é o mesmo que a subtração de zero. Se `x` for `+0.0`, então `0.0-x` é igual a `+0.0`, mas `-x` é igual a `-0.0`. O menos unário simplesmente inverte o sinal de um `float`.

Casos especiais de interesse:

*   Se o operando for NaN, o resultado é NaN (lembre-se que NaN não tem sinal).

A Java Virtual Machine não adotou o requisito mais forte da versão 2019 do Padrão IEEE 754 de que a negação inverte o bit de sinal para todas as entradas, incluindo NaN.

*   Se o operando for um infinito, o resultado é o infinito de sinal oposto.

*   Se o operando for um zero, o resultado é o zero de sinal oposto.

### _frem_

#### Operação

Resto `float`

#### Formato

_frem_

#### Formas

_frem_ = 114 (0x72)

#### Pilha de Operandos

..., _value1_ , _value2_ ->

..., _result_

#### Descrição

Ambos _value1_ e _value2_ devem ser do tipo `float`. Os valores são removidos da pilha de operandos. O `float` _result_ é calculado e empilhado na pilha de operandos.

O resultado de uma instrução _frem_ não é o mesmo que o resultado da operação de resto definida pelo IEEE 754, devido à escolha da política de arredondamento na Java Virtual Machine ([§2.8](<#/doc/jvms/jvms-02>)). A operação de resto IEEE 754 calcula o resto de uma divisão com arredondamento, não uma divisão com truncamento, e, portanto, seu comportamento _não_ é análogo ao do operador de resto inteiro usual. Em vez disso, a Java Virtual Machine define _frem_ para se comportar de maneira análoga à das instruções de resto inteiro _irem_ e _lrem_ , com uma divisão implícita usando a política de arredondamento em direção a zero; isso pode ser comparado com a função da biblioteca C `fmod`.

O resultado de uma instrução _frem_ é regido pelas seguintes regras, que correspondem à aritmética IEEE 754, exceto pela forma como a divisão implícita é calculada:

*   Se _value1_ ou _value2_ for NaN, o resultado é NaN.

*   Se nem _value1_ nem _value2_ for NaN, o sinal do resultado é igual ao sinal do dividendo.

*   Se o dividendo for um infinito ou o divisor for um zero ou ambos, o resultado é NaN.

*   Se o dividendo for finito e o divisor for um infinito, o resultado é igual ao dividendo.

*   Se o dividendo for um zero e o divisor for finito, o resultado é igual ao dividendo.

*   Nos casos restantes, onde nenhum operando é um infinito, um zero ou NaN, o resto de ponto flutuante _result_ de um dividendo _value1_ e um divisor _value2_ é definido pela relação matemática _result_ = _value1_ - (_value2_ * _q_), onde _q_ é um inteiro que é negativo apenas se _value1_ / _value2_ for negativo, e positivo apenas se _value1_ / _value2_ for positivo, e cuja magnitude é tão grande quanto possível sem exceder a magnitude do verdadeiro quociente matemático de _value1_ e _value2_.

Apesar do fato de que a divisão por zero pode ocorrer, a avaliação de uma instrução _frem_ nunca lança uma exceção em tempo de execução. Overflow, underflow ou perda de precisão não podem ocorrer.

#### Notas

A operação de resto IEEE 754 pode ser calculada pela rotina de biblioteca `Math.IEEEremainder` ou `StrictMath.IEEEremainder`.

### _freturn_

#### Operação

Retorna `float` de método

#### Formato

_freturn_

#### Formas

_freturn_ = 174 (0xae)

#### Pilha de Operandos

..., _value_ ->

[empty]

#### Descrição

O método atual deve ter tipo de retorno `float`. O _value_ deve ser do tipo `float`. Se o método atual for um método `synchronized`, o monitor entrado ou reentrado na invocação do método é atualizado e possivelmente saído como se pela execução de uma instrução _monitorexit_ ([§ _monitorexit_](<#/doc/jvms/jvms-06>)) na thread atual. Se nenhuma exceção for lançada, _value_ é removido da pilha de operandos do frame atual ([§2.6](<#/doc/jvms/jvms-02>)) e empilhado na pilha de operandos do frame do invocador. Quaisquer outros valores na pilha de operandos do método atual são descartados.

O interpretador então retorna o controle ao invocador do método, restabelecendo o frame do invocador.

#### Exceções em Tempo de Execução

Se a implementação da Java Virtual Machine não impuser as regras de bloqueio estruturado descritas em [§2.11.10](<#/doc/jvms/jvms-02>), então se o método atual for um método `synchronized` e a thread atual não for a proprietária do monitor entrado ou reentrado na invocação do método, _freturn_ lança uma `IllegalMonitorStateException`. Isso pode acontecer, por exemplo, se um método `synchronized` contiver uma instrução _monitorexit_ , mas nenhuma instrução _monitorenter_ , no objeto no qual o método é sincronizado.

Caso contrário, se a implementação da Java Virtual Machine impuser as regras de bloqueio estruturado descritas em [§2.11.10](<#/doc/jvms/jvms-02>) e se a primeira dessas regras for violada durante a invocação do método atual, então _freturn_ lança uma `IllegalMonitorStateException`.

### _fstore_

#### Operação

Armazena `float` em variável local

#### Formato

_fstore_
_index_

#### Formas

_fstore_ = 56 (0x38)

#### Pilha de Operandos

..., _value_ ->

...

#### Descrição

O _index_ é um byte sem sinal que deve ser um índice no array de variáveis locais do frame atual ([§2.6](<#/doc/jvms/jvms-02>)). O _value_ no topo da pilha de operandos deve ser do tipo `float`. Ele é removido da pilha de operandos, e o valor da variável local no _index_ é definido como _value_.

#### Notas

O opcode _fstore_ pode ser usado em conjunto com a instrução _wide_ ([§ _wide_](<#/doc/jvms/jvms-06>)) para acessar uma variável local usando um índice sem sinal de dois bytes.

### _fstore_ &lt;n&gt;_

#### Operação

Armazena `float` em variável local

#### Formato

_fstore_ &lt;n&gt;_

#### Formas

_fstore_0_ = 67 (0x43)

_fstore_1_ = 68 (0x44)

_fstore_2_ = 69 (0x45)

_fstore_3_ = 70 (0x46)

#### Pilha de Operandos

..., _value_ ->

...

#### Descrição

O <_n_ > deve ser um índice no array de variáveis locais do frame atual ([§2.6](<#/doc/jvms/jvms-02>)). O _value_ no topo da pilha de operandos deve ser do tipo `float`. Ele é removido da pilha de operandos, e o valor da variável local em <_n_ > é definido como _value_.

#### Notas

Cada uma das instruções _fstore_ &lt;n&gt;_ é a mesma que _fstore_ com um _index_ de <_n_ >, exceto que o operando <_n_ > é implícito.

### _fsub_

#### Operação

Subtrai `float`

#### Formato

_fsub_

#### Formas

_fsub_ = 102 (0x66)

#### Pilha de Operandos

..., _value1_ , _value2_ ->

..., _result_

#### Descrição

Ambos _value1_ e _value2_ devem ser do tipo `float`. Os valores são removidos da pilha de operandos. O `float` _result_ é _value1_ - _value2_. O _result_ é empilhado na pilha de operandos.

Para a subtração de `float`, é sempre o caso que `a-b` produz o mesmo resultado que `a+(-b)`. No entanto, para a instrução _fsub_ , a subtração de zero não é o mesmo que a negação, porque se `x` for `+0.0`, então `0.0-x` é igual a `+0.0`, mas `-x` é igual a `-0.0`.

A Java Virtual Machine requer suporte a subfluxo gradual. Apesar do fato de que overflow, underflow ou perda de precisão podem ocorrer, a execução de uma instrução _fsub_ nunca lança uma exceção em tempo de execução.

### _getfield_

#### Operação

Busca campo de objeto

#### Formato

_getfield_
_indexbyte1_
_indexbyte2_

#### Formas

_getfield_ = 180 (0xb4)

#### Pilha de Operandos

..., _objectref_ ->

..., _value_

#### Descrição

Os bytes sem sinal _indexbyte1_ e _indexbyte2_ são usados para construir um índice na pool de constantes em tempo de execução da classe atual ([§2.6](<#/doc/jvms/jvms-02>)), onde o valor do índice é (_indexbyte1_ `<<` 8) | _indexbyte2_. A entrada da pool de constantes em tempo de execução no índice deve ser uma referência simbólica a um campo ([§5.1](<#/doc/jvms/jvms-05>)), que fornece o nome e o descritor do campo, bem como uma referência simbólica à classe na qual o campo deve ser encontrado. O campo referenciado é resolvido ([§5.4.3.2](<#/doc/jvms/jvms-05>)).

O _objectref_ , que deve ser do tipo `reference` mas não um tipo de array, é removido da pilha de operandos. O _value_ do campo referenciado em _objectref_ é buscado e empilhado na pilha de operandos.

#### Exceções de Linkagem

Durante a resolução da referência simbólica ao campo, qualquer um dos erros relacionados à resolução de campo ([§5.4.3.2](<#/doc/jvms/jvms-05>)) pode ser lançado.

Caso contrário, se o campo resolvido for um campo `static`, _getfield_ lança uma `IncompatibleClassChangeError`.

#### Exceção em Tempo de Execução

Caso contrário, se _objectref_ for `null`, a instrução _getfield_ lança uma `NullPointerException`.

#### Notas

A instrução _getfield_ não pode ser usada para acessar o campo `length` de um array. A instrução _arraylength_ ([§ _arraylength_](<#/doc/jvms/jvms-06>)) é usada em vez disso.

### _getstatic_

#### Operação

Obtém campo `static` de classe

#### Formato

_getstatic_
_indexbyte1_
_indexbyte2_

#### Formas

_getstatic_ = 178 (0xb2)

#### Pilha de Operandos

..., ->

..., _value_

#### Descrição

Os bytes sem sinal _indexbyte1_ e _indexbyte2_ são usados para construir um índice na pool de constantes em tempo de execução da classe atual ([§2.6](<#/doc/jvms/jvms-02>)), onde o valor do índice é (_indexbyte1_ `<<` 8) | _indexbyte2_. A entrada da pool de constantes em tempo de execução no índice deve ser uma referência simbólica a um campo ([§5.1](<#/doc/jvms/jvms-05>)), que fornece o nome e o descritor do campo, bem como uma referência simbólica à classe ou interface na qual o campo deve ser encontrado. O campo referenciado é resolvido ([§5.4.3.2](<#/doc/jvms/jvms-05>)).

Após a resolução bem-sucedida do campo, a classe ou interface que declarou o campo resolvido é inicializada se essa classe ou interface ainda não tiver sido inicializada ([§5.5](<#/doc/jvms/jvms-05>)).

O _value_ do campo da classe ou interface é buscado e empilhado na pilha de operandos.

#### Exceções de Linkagem

Durante a resolução da referência simbólica ao campo da classe ou interface, qualquer uma das exceções relacionadas à resolução de campo ([§5.4.3.2](<#/doc/jvms/jvms-05>)) pode ser lançada.

Caso contrário, se o campo resolvido não for um campo `static` (de classe) ou um campo de interface, _getstatic_ lança uma `IncompatibleClassChangeError`.

#### Exceção em Tempo de Execução

Caso contrário, se a execução desta instrução _getstatic_ causar a inicialização da classe ou interface referenciada, _getstatic_ pode lançar um `Error` conforme detalhado em [§5.5](<#/doc/jvms/jvms-05>).

### _goto_

#### Operação

Salto incondicional

#### Formato

_goto_
_branchbyte1_
_branchbyte2_

#### Formas

_goto_ = 167 (0xa7)

#### Pilha de Operandos

Nenhuma alteração

#### Descrição

Os bytes sem sinal _branchbyte1_ e _branchbyte2_ são usados para construir um _branchoffset_ assinado de 16 bits, onde _branchoffset_ é (_branchbyte1_ `<<` 8) | _branchbyte2_. A execução prossegue nesse offset a partir do endereço do opcode desta instrução _goto_. O endereço de destino deve ser o de um opcode de uma instrução dentro do método que contém esta instrução _goto_.

### _goto_w_

#### Operação

Salto incondicional (índice amplo)

#### Formato

_goto_w_
_branchbyte1_
_branchbyte2_
_branchbyte3_
_branchbyte4_

#### Formas

_goto_w_ = 200 (0xc8)

#### Pilha de Operandos

Nenhuma alteração

#### Descrição

Os bytes sem sinal _branchbyte1_ , _branchbyte2_ , _branchbyte3_ e _branchbyte4_ são usados para construir um _branchoffset_ assinado de 32 bits, onde _branchoffset_ é (_branchbyte1_ `<<` 24) | (_branchbyte2_ `<<` 16) | (_branchbyte3_ `<<` 8) | _branchbyte4_. A execução prossegue nesse offset a partir do endereço do opcode desta instrução _goto_w_. O endereço de destino deve ser o de um opcode de uma instrução dentro do método que contém esta instrução _goto_w_.

#### Notas

Embora a instrução _goto_w_ aceite um offset de branch de 4 bytes, outros fatores limitam o tamanho de um método a 65535 bytes ([§4.11](<#/doc/jvms/jvms-04>)). Este limite pode ser aumentado em uma futura versão da Java Virtual Machine.

### _i2b_

#### Operação

Converte `int` para `byte`

#### Formato

_i2b_

#### Formas

_i2b_ = 145 (0x91)

#### Pilha de Operandos

..., _value_ ->

..., _result_

#### Descrição

O _value_ no topo da pilha de operandos deve ser do tipo `int`. Ele é removido da pilha de operandos, truncado para um `byte`, e então estendido por sinal para um `int` _result_. O _result_ é empilhado na pilha de operandos.

#### Notas

A instrução _i2b_ realiza uma conversão primitiva de estreitamento (JLS §5.1.3). Ela pode perder informações sobre a magnitude geral de _value_. O _result_ também pode não ter o mesmo sinal que _value_.

### _i2c_

#### Operação

Converte `int` para `char`

#### Formato

_i2c_

#### Formas

_i2c_ = 146 (0x92)

#### Pilha de Operandos

..., _value_ ->

..., _result_

#### Descrição

O _value_ no topo da pilha de operandos deve ser do tipo `int`. Ele é removido da pilha de operandos, truncado para `char`, e então estendido por zero para um `int` _result_. O _result_ é empilhado na pilha de operandos.

#### Notas

A instrução _i2c_ realiza uma conversão primitiva de estreitamento (JLS §5.1.3). Ela pode perder informações sobre a magnitude geral de _value_. O _result_ (que é sempre positivo) também pode não ter o mesmo sinal que _value_.

### _i2d_

#### Operação

Converte `int` para `double`

#### Formato

_i2d_

#### Formas

_i2d_ = 135 (0x87)

#### Pilha de Operandos

..., _value_ ->

..., _result_

#### Descrição

O _value_ no topo da pilha de operandos deve ser do tipo `int`. Ele é removido da pilha de operandos e convertido para um `double` _result_. O _result_ é empilhado na pilha de operandos.

#### Notas

A instrução _i2d_ realiza uma conversão primitiva de alargamento (JLS §5.1.2). Como todos os valores do tipo `int` são exatamente representáveis pelo tipo `double`, a conversão é exata.

### _i2f_

#### Operação

Converte `int` para `float`

#### Formato

_i2f_

#### Formas

_i2f_ = 134 (0x86)

#### Pilha de Operandos

..., _value_ ->

..., _result_

#### Descrição

O _value_ no topo da pilha de operandos deve ser do tipo `int`. Ele é removido da pilha de operandos e convertido para um `float` _result_ usando a política de arredondamento para o mais próximo ([§2.8](<#/doc/jvms/jvms-02>)). O _result_ é empilhado na pilha de operandos.

#### Notas

A instrução _i2f_ realiza uma conversão primitiva de alargamento (JLS §5.1.2), mas pode resultar em perda de precisão porque valores do tipo `float` têm apenas 24 bits de significando.

### _i2l_

#### Operação

Converte `int` para `long`

#### Formato

_i2l_

#### Formas

_i2l_ = 133 (0x85)

#### Pilha de Operandos

..., _value_ ->

..., _result_

#### Descrição

O _value_ no topo da pilha de operandos deve ser do tipo `int`. Ele é removido da pilha de operandos e estendido por sinal para um `long` _result_. O _result_ é empilhado na pilha de operandos.

#### Notas

A instrução _i2l_ realiza uma conversão primitiva de alargamento (JLS §5.1.2). Como todos os valores do tipo `int` são exatamente representáveis pelo tipo `long`, a conversão é exata.

### _i2s_

#### Operação

Converte `int` para `short`

#### Formato

_i2s_

#### Formas

_i2s_ = 147 (0x93)

#### Pilha de Operandos

..., _value_ ->

..., _result_

#### Descrição

O _value_ no topo da pilha de operandos deve ser do tipo `int`. Ele é removido da pilha de operandos, truncado para um `short`, e então estendido por sinal para um `int` _result_. O _result_ é empilhado na pilha de operandos.

#### Notas

A instrução _i2s_ realiza uma conversão primitiva de estreitamento (JLS §5.1.3). Ela pode perder informações sobre a magnitude geral de _value_. O _result_ também pode não ter o mesmo sinal que _value_.

### _iadd_

#### Operação

Adiciona `int`

#### Formato

_iadd_

#### Formas

_iadd_ = 96 (0x60)

#### Pilha de Operandos

..., _value1_ , _value2_ ->

..., _result_

#### Descrição

Ambos _value1_ e _value2_ devem ser do tipo `int`. Os valores são removidos da pilha de operandos. O `int` _result_ é _value1_ + _value2_. O _result_ é empilhado na pilha de operandos.

O resultado são os 32 bits de baixa ordem do verdadeiro resultado matemático em um formato de complemento de dois suficientemente amplo, representado como um valor do tipo `int`. Se ocorrer overflow, o sinal do resultado pode não ser o mesmo que o sinal da soma matemática dos dois valores.

Apesar do fato de que overflow pode ocorrer, a execução de uma instrução _iadd_ nunca lança uma exceção em tempo de execução.

### _iaload_

#### Operação

Carrega `int` de array

#### Formato

_iaload_

#### Formas

_iaload_ = 46 (0x2e)
#### Pilha de Operandos
..., _arrayref_ , _index_ ->
..., _value_

#### Descrição
O _arrayref_ deve ser do tipo `reference` e deve referenciar um array cujos componentes são do tipo `int`. O _index_ deve ser do tipo `int`. Ambos _arrayref_ e _index_ são removidos da pilha de operandos. O `int` _value_ no componente do array em _index_ é recuperado e empilhado na pilha de operandos.

#### Exceções em Tempo de Execução
Se _arrayref_ for `null`, _iaload_ lança uma `NullPointerException`.

Caso contrário, se _index_ não estiver dentro dos limites do array referenciado por _arrayref_, a instrução _iaload_ lança uma `ArrayIndexOutOfBoundsException`.

### _iand_

#### Operação
AND bit a bit de `int`

#### Formato

  
_iand_  


#### Formas

_iand_ = 126 (0x7e) 

#### Pilha de Operandos

..., _value1_ , _value2_ ->

..., _result_

#### Descrição
Ambos _value1_ e _value2_ devem ser do tipo `int`. Eles são removidos da pilha de operandos. Um `int` _result_ é calculado aplicando o AND bit a bit (conjunção) de _value1_ e _value2_. O _result_ é empilhado na pilha de operandos.

### _iastore_

#### Operação
Armazenar em array de `int`

#### Formato

  
_iastore_  


#### Formas

_iastore_ = 79 (0x4f) 

#### Pilha de Operandos

..., _arrayref_ , _index_ , _value_ ->

...

#### Descrição
O _arrayref_ deve ser do tipo `reference` e deve referenciar um array cujos componentes são do tipo `int`. Ambos _index_ e _value_ devem ser do tipo `int`. O _arrayref_, _index_ e _value_ são removidos da pilha de operandos. O `int` _value_ é armazenado como o componente do array indexado por _index_.

#### Exceções em Tempo de Execução
Se _arrayref_ for `null`, _iastore_ lança uma `NullPointerException`.

Caso contrário, se _index_ não estiver dentro dos limites do array referenciado por _arrayref_, a instrução _iastore_ lança uma `ArrayIndexOutOfBoundsException`.

### _iconst_ <i>_

#### Operação
Empilhar constante `int`

#### Formato

  
_iconst_ <i>_  


#### Formas

_iconst_m1_ = 2 (0x2) 

_iconst_0_ = 3 (0x3) 

_iconst_1_ = 4 (0x4) 

_iconst_2_ = 5 (0x5) 

_iconst_3_ = 6 (0x6) 

_iconst_4_ = 7 (0x7) 

_iconst_5_ = 8 (0x8) 

#### Pilha de Operandos

... ->

..., <_i_ >

#### Descrição
Empilha a constante `int` <_i_ > (-1, 0, 1, 2, 3, 4 ou 5) na pilha de operandos.

#### Notas
Cada instrução desta família é equivalente a _bipush_ <_i_ > para o respectivo valor de <_i_ >, exceto que o operando <_i_ > é implícito.

### _idiv_

#### Operação
Dividir `int`

#### Formato

  
_idiv_  


#### Formas

_idiv_ = 108 (0x6c) 

#### Pilha de Operandos

..., _value1_ , _value2_ ->

..., _result_

#### Descrição
Ambos _value1_ e _value2_ devem ser do tipo `int`. Os valores são removidos da pilha de operandos. O `int` _result_ é o valor da expressão da linguagem de programação Java _value1_ / _value2_ (JLS §15.17.2). O _result_ é empilhado na pilha de operandos.

Uma divisão de `int` arredonda em direção a 0; ou seja, o quociente produzido para valores `int` em _n_ /_d_ é um valor `int` _q_ cuja magnitude é a maior possível, satisfazendo |_d_ ⋅ _q_ | ≤ |_n_ |. Além disso, _q_ é positivo quando |_n_ | ≥ |_d_ | e _n_ e _d_ têm o mesmo sinal, mas _q_ é negativo quando |_n_ | ≥ |_d_ | e _n_ e _d_ têm sinais opostos.

Existe um caso especial que não satisfaz esta regra: se o dividendo for o inteiro negativo de maior magnitude possível para o tipo `int`, e o divisor for -1, então ocorre overflow, e o resultado é igual ao dividendo. Apesar do overflow, nenhuma exceção é lançada neste caso.

#### Exceção em Tempo de Execução
Se o valor do divisor em uma divisão de `int` for 0, _idiv_ lança uma `ArithmeticException`.

### _if_acmp &lt;cond&gt;_

#### Operação
Desviar se a comparação de `reference` for bem-sucedida

#### Formato

  
_if_acmp &lt;cond&gt;_  
_branchbyte1_  
_branchbyte2_  


#### Formas

_if_acmpeq_ = 165 (0xa5) 

_if_acmpne_ = 166 (0xa6) 

#### Pilha de Operandos

..., _value1_ , _value2_ ->

...

#### Descrição
Ambos _value1_ e _value2_ devem ser do tipo `reference`. Ambos são removidos da pilha de operandos e comparados. Os resultados da comparação são os seguintes:

  * _if_acmpeq_ é bem-sucedido se e somente se _value1_ = _value2_

  * _if_acmpne_ é bem-sucedido se e somente se _value1_ ≠ _value2_




Se a comparação for bem-sucedida, os _branchbyte1_ e _branchbyte2_ não-assinados são usados para construir um offset assinado de 16 bits, onde o offset é calculado como (_branchbyte1_ `<<` 8) | _branchbyte2_. A execução então prossegue nesse offset a partir do endereço do opcode desta instrução _if_acmp &lt;cond&gt;_. O endereço de destino deve ser o de um opcode de uma instrução dentro do método que contém esta instrução _if_acmp &lt;cond&gt;_.

Caso contrário, se a comparação falhar, a execução prossegue no endereço da instrução seguinte a esta instrução _if_acmp &lt;cond&gt;_.

### _if_icmp &lt;cond&gt;_

#### Operação
Desviar se a comparação de `int` for bem-sucedida

#### Formato

  
_if_icmp &lt;cond&gt;_  
_branchbyte1_  
_branchbyte2_  


#### Formas

_if_icmpeq_ = 159 (0x9f) 

_if_icmpne_ = 160 (0xa0) 

_if_icmplt_ = 161 (0xa1) 

_if_icmpge_ = 162 (0xa2) 

_if_icmpgt_ = 163 (0xa3) 

_if_icmple_ = 164 (0xa4) 

#### Pilha de Operandos

..., _value1_ , _value2_ ->

...

#### Descrição
Ambos _value1_ e _value2_ devem ser do tipo `int`. Ambos são removidos da pilha de operandos e comparados. Todas as comparações são assinadas. Os resultados da comparação são os seguintes:

  * _if_icmpeq_ é bem-sucedido se e somente se _value1_ = _value2_

  * _if_icmpne_ é bem-sucedido se e somente se _value1_ ≠ _value2_

  * _if_icmplt_ é bem-sucedido se e somente se _value1_ < _value2_

  * _if_icmple_ é bem-sucedido se e somente se _value1_ ≤ _value2_

  * _if_icmpgt_ é bem-sucedido se e somente se _value1_ > _value2_

  * _if_icmpge_ é bem-sucedido se e somente se _value1_ ≥ _value2_




Se a comparação for bem-sucedida, os _branchbyte1_ e _branchbyte2_ não-assinados são usados para construir um offset assinado de 16 bits, onde o offset é calculado como (_branchbyte1_ `<<` 8) | _branchbyte2_. A execução então prossegue nesse offset a partir do endereço do opcode desta instrução _if_icmp &lt;cond&gt;_. O endereço de destino deve ser o de um opcode de uma instrução dentro do método que contém esta instrução _if_icmp &lt;cond&gt;_.

Caso contrário, a execução prossegue no endereço da instrução seguinte a esta instrução _if_icmp &lt;cond&gt;_.

### _if &lt;cond&gt;_

#### Operação
Desviar se a comparação de `int` com zero for bem-sucedida

#### Formato

  
_if &lt;cond&gt;_  
_branchbyte1_  
_branchbyte2_  


#### Formas

_ifeq_ = 153 (0x99) 

_ifne_ = 154 (0x9a) 

_iflt_ = 155 (0x9b) 

_ifge_ = 156 (0x9c) 

_ifgt_ = 157 (0x9d) 

_ifle_ = 158 (0x9e) 

#### Pilha de Operandos

..., _value_ ->

...

#### Descrição
O _value_ deve ser do tipo `int`. Ele é removido da pilha de operandos e comparado com zero. Todas as comparações são assinadas. Os resultados das comparações são os seguintes:

  * _ifeq_ é bem-sucedido se e somente se _value_ = 0 

  * _ifne_ é bem-sucedido se e somente se _value_ ≠ 0 

  * _iflt_ é bem-sucedido se e somente se _value_ < 0 

  * _ifle_ é bem-sucedido se e somente se _value_ ≤ 0 

  * _ifgt_ é bem-sucedido se e somente se _value_ > 0 

  * _ifge_ é bem-sucedido se e somente se _value_ ≥ 0 




Se a comparação for bem-sucedida, os _branchbyte1_ e _branchbyte2_ não-assinados são usados para construir um offset assinado de 16 bits, onde o offset é calculado como (_branchbyte1_ `<<` 8) | _branchbyte2_. A execução então prossegue nesse offset a partir do endereço do opcode desta instrução _if &lt;cond&gt;_. O endereço de destino deve ser o de um opcode de uma instrução dentro do método que contém esta instrução _if &lt;cond&gt;_.

Caso contrário, a execução prossegue no endereço da instrução seguinte a esta instrução _if &lt;cond&gt;_.

### _ifnonnull_

#### Operação
Desviar se `reference` não for `null`

#### Formato

  
_ifnonnull_  
_branchbyte1_  
_branchbyte2_  


#### Formas

_ifnonnull_ = 199 (0xc7) 

#### Pilha de Operandos

..., _value_ ->

...

#### Descrição
O _value_ deve ser do tipo `reference`. Ele é removido da pilha de operandos. Se _value_ não for `null`, os _branchbyte1_ e _branchbyte2_ não-assinados são usados para construir um offset assinado de 16 bits, onde o offset é calculado como (_branchbyte1_ `<<` 8) | _branchbyte2_. A execução então prossegue nesse offset a partir do endereço do opcode desta instrução _ifnonnull_. O endereço de destino deve ser o de um opcode de uma instrução dentro do método que contém esta instrução _ifnonnull_.

Caso contrário, a execução prossegue no endereço da instrução seguinte a esta instrução _ifnonnull_.

### _ifnull_

#### Operação
Desviar se `reference` for `null`

#### Formato

  
_ifnull_  
_branchbyte1_  
_branchbyte2_  


#### Formas

_ifnull_ = 198 (0xc6) 

#### Pilha de Operandos

..., _value_ ->

...

#### Descrição
O _value_ deve ser do tipo `reference`. Ele é removido da pilha de operandos. Se _value_ for `null`, os _branchbyte1_ e _branchbyte2_ não-assinados são usados para construir um offset assinado de 16 bits, onde o offset é calculado como (_branchbyte1_ `<<` 8) | _branchbyte2_. A execução então prossegue nesse offset a partir do endereço do opcode desta instrução _ifnull_. O endereço de destino deve ser o de um opcode de uma instrução dentro do método que contém esta instrução _ifnull_.

Caso contrário, a execução prossegue no endereço da instrução seguinte a esta instrução _ifnull_.

### _iinc_

#### Operação
Incrementar variável local por constante

#### Formato

  
_iinc_  
_index_  
_const_  


#### Formas

_iinc_ = 132 (0x84) 

#### Pilha de Operandos

Nenhuma alteração

#### Descrição
O _index_ é um byte não-assinado que deve ser um índice no array de variáveis locais do frame atual ([§2.6](<#/doc/jvms/jvms-02>)). O _const_ é um byte assinado imediato. A variável local em _index_ deve conter um `int`. O valor _const_ é primeiro estendido por sinal para um `int`, e então a variável local em _index_ é incrementada por essa quantidade.

#### Notas
O opcode _iinc_ pode ser usado em conjunto com a instrução _wide_ ([§ _wide_](<#/doc/jvms/jvms-06>)) para acessar uma variável local usando um índice não-assinado de dois bytes e para incrementá-la por um valor assinado imediato de dois bytes.

### _iload_

#### Operação
Carregar `int` de variável local

#### Formato

  
_iload_  
_index_  


#### Formas

_iload_ = 21 (0x15) 

#### Pilha de Operandos

... ->

..., _value_

#### Descrição
O _index_ é um byte não-assinado que deve ser um índice no array de variáveis locais do frame atual ([§2.6](<#/doc/jvms/jvms-02>)). A variável local em _index_ deve conter um `int`. O _value_ da variável local em _index_ é empilhado na pilha de operandos.

#### Notas
O opcode _iload_ pode ser usado em conjunto com a instrução _wide_ ([§ _wide_](<#/doc/jvms/jvms-06>)) para acessar uma variável local usando um índice não-assinado de dois bytes.

### _iload_ &lt;n&gt;_

#### Operação
Carregar `int` de variável local

#### Formato

  
_iload_ &lt;n&gt;_  


#### Formas

_iload_0_ = 26 (0x1a) 

_iload_1_ = 27 (0x1b) 

_iload_2_ = 28 (0x1c) 

_iload_3_ = 29 (0x1d) 

#### Pilha de Operandos

... ->

..., _value_

#### Descrição
O <_n_ > deve ser um índice no array de variáveis locais do frame atual ([§2.6](<#/doc/jvms/jvms-02>)). A variável local em <_n_ > deve conter um `int`. O _value_ da variável local em <_n_ > é empilhado na pilha de operandos.

#### Notas
Cada uma das instruções _iload_ &lt;n&gt;_ é a mesma que _iload_ com um _index_ de <_n_ >, exceto que o operando <_n_ > é implícito.

### _imul_

#### Operação
Multiplicar `int`

#### Formato

  
_imul_  


#### Formas

_imul_ = 104 (0x68) 

#### Pilha de Operandos

..., _value1_ , _value2_ ->

..., _result_

#### Descrição
Ambos _value1_ e _value2_ devem ser do tipo `int`. Os valores são removidos da pilha de operandos. O `int` _result_ é _value1_ * _value2_. O _result_ é empilhado na pilha de operandos.

O resultado são os 32 bits de baixa ordem do verdadeiro resultado matemático em um formato de complemento de dois suficientemente amplo, representado como um valor do tipo `int`. Se ocorrer overflow, o sinal do resultado pode não ser o mesmo que o sinal da multiplicação matemática dos dois valores.

Apesar do fato de que pode ocorrer overflow, a execução de uma instrução _imul_ nunca lança uma exceção em tempo de execução.

### _ineg_

#### Operação
Negar `int`

#### Formato

  
_ineg_  


#### Formas

_ineg_ = 116 (0x74) 

#### Pilha de Operandos

..., _value_ ->

..., _result_

#### Descrição
O _value_ deve ser do tipo `int`. Ele é removido da pilha de operandos. O `int` _result_ é a negação aritmética de _value_, -_value_. O _result_ é empilhado na pilha de operandos.

Para valores `int`, a negação é o mesmo que a subtração de zero. Como a Java Virtual Machine usa a representação de complemento de dois para inteiros e o intervalo de valores de complemento de dois não é simétrico, a negação do `int` negativo de maior valor resulta no mesmo número negativo máximo. Apesar do fato de que ocorreu overflow, nenhuma exceção é lançada.

Para todos os valores `int` `x`, `-x` é igual a `(~x)+1`.

### _instanceof_

#### Operação
Determinar se o objeto é de um dado tipo

#### Formato

  
_instanceof_  
_indexbyte1_  
_indexbyte2_  


#### Formas

_instanceof_ = 193 (0xc1) 

#### Pilha de Operandos

..., _objectref_ ->

..., _result_

#### Descrição
O _objectref_, que deve ser do tipo `reference`, é removido da pilha de operandos. Os _indexbyte1_ e _indexbyte2_ não-assinados são usados para construir um índice na pool de constantes em tempo de execução da classe atual ([§2.6](<#/doc/jvms/jvms-02>)), onde o valor do índice é (_indexbyte1_ `<<` 8) | _indexbyte2_. A entrada da pool de constantes em tempo de execução no índice deve ser uma referência simbólica a um tipo de classe, array ou interface.

Se _objectref_ for `null`, a instrução _instanceof_ empilha um `int` _result_ de 0 na pilha de operandos.

Caso contrário, o tipo de classe, array ou interface nomeado é resolvido ([§5.4.3.1](<#/doc/jvms/jvms-05>)). Se _objectref_ for um valor do tipo dado pela classe, array ou tipo de interface resolvido, a instrução _instanceof_ empilha um `int` _result_ de 1 na pilha de operandos; caso contrário, ela empilha um `int` _result_ de 0.

Se _objectref_ é um valor do tipo dado pela classe, array ou tipo de interface resolvido é determinado de acordo com as regras dadas para [§ _checkcast_](<#/doc/jvms/jvms-06>).

#### Exceções de Ligação
Durante a resolução da referência simbólica ao tipo de classe, array ou interface, qualquer uma das exceções documentadas em [§5.4.3.1](<#/doc/jvms/jvms-05>) pode ser lançada.

#### Notas
A instrução _instanceof_ é muito semelhante à instrução _checkcast_ ([§ _checkcast_](<#/doc/jvms/jvms-06>)). Ela difere em seu tratamento de `null`, seu comportamento quando seu teste falha (_checkcast_ lança uma exceção, _instanceof_ empilha um código de resultado), e seu efeito na pilha de operandos.

### _invokedynamic_

#### Operação
Invocar um _call site_ computado dinamicamente

#### Formato

  
_invokedynamic_  
_indexbyte1_  
_indexbyte2_  
_0_  
_0_  


#### Formas

_invokedynamic_ = 186 (0xba) 

#### Pilha de Operandos

..., [_arg1_ , [_arg2_ ...]] ->

...

#### Descrição
Primeiro, os _indexbyte1_ e _indexbyte2_ não-assinados são usados para construir um índice na pool de constantes em tempo de execução da classe atual ([§2.6](<#/doc/jvms/jvms-02>)), onde o valor do índice é (_indexbyte1_ `<<` 8) | _indexbyte2_. A entrada da pool de constantes em tempo de execução no índice deve ser uma referência simbólica a um _call site_ computado dinamicamente ([§5.1](<#/doc/jvms/jvms-05>)). Os valores do terceiro e quarto bytes de operando devem ser sempre zero.

A referência simbólica é resolvida ([§5.4.3.6](<#/doc/jvms/jvms-05>)) _para esta instrução_ _invokedynamic_ _específica_ para obter uma `reference` para uma instância de `java.lang.invoke.CallSite`. A instância de `java.lang.invoke.CallSite` é considerada "vinculada" a esta instrução _invokedynamic_ específica.

A instância de `java.lang.invoke.CallSite` indica um _target method handle_. Os _nargs_ valores de argumento são removidos da pilha de operandos, e o _target method handle_ é invocado. A invocação ocorre como se pela execução de uma instrução _invokevirtual_ que indica um índice da pool de constantes em tempo de execução para uma referência simbólica R onde:

  * R é uma referência simbólica a um método de uma classe; 

  * para a referência simbólica à classe na qual o método deve ser encontrado, R especifica `java.lang.invoke.MethodHandle`; 

  * para o nome do método, R especifica `invokeExact`; 

  * para o descritor do método, R especifica o _method descriptor_ no _call site_ computado dinamicamente. 




e onde é como se os seguintes itens fossem empilhados, em ordem, na pilha de operandos:

  * uma `reference` para o _target method handle_; 

  * os _nargs_ valores de argumento, onde o número, tipo e ordem dos valores devem ser consistentes com o _method descriptor_ no _call site_ computado dinamicamente. 




#### Exceções de Ligação
Durante a resolução da referência simbólica a um _call site_ computado dinamicamente, qualquer uma das exceções pertinentes à resolução de _call site_ computado dinamicamente pode ser lançada.

#### Notas
Se a referência simbólica ao _call site_ computado dinamicamente puder ser resolvida, isso implica que uma `reference` não-`null` para uma instância de `java.lang.invoke.CallSite` está vinculada à instrução _invokedynamic_. Portanto, o _target method handle_, indicado pela instância de `java.lang.invoke.CallSite`, não é `null`.

Similarmente, a resolução bem-sucedida implica que o _method descriptor_ na referência simbólica é semanticamente igual ao _type descriptor_ do _target method handle_.

Juntas, essas invariantes significam que uma instrução _invokedynamic_ que está vinculada a uma instância de `java.lang.invoke.CallSite` nunca lança uma `NullPointerException` ou uma `java.lang.invoke.WrongMethodTypeException`.

### _invokeinterface_

#### Operação
Invocar método de interface

#### Formato

  
_invokeinterface_  
_indexbyte1_  
_indexbyte2_  
_count_  
_0_  


#### Formas

_invokeinterface_ = 185 (0xb9) 

#### Pilha de Operandos

..., _objectref_ , [_arg1_ , [_arg2_ ...]] ->

...

#### Descrição
Os _indexbyte1_ e _indexbyte2_ não-assinados são usados para construir um índice na pool de constantes em tempo de execução da classe atual ([§2.6](<#/doc/jvms/jvms-02>)), onde o valor do índice é (_indexbyte1_ `<<` 8) | _indexbyte2_. A entrada da pool de constantes em tempo de execução no índice deve ser uma referência simbólica a um método de interface ([§5.1](<#/doc/jvms/jvms-05>)), que fornece o nome e o descritor ([§4.3.3](<#/doc/jvms/jvms-04>)) do método de interface, bem como uma referência simbólica à interface na qual o método de interface deve ser encontrado. O método de interface nomeado é resolvido ([§5.4.3.4](<#/doc/jvms/jvms-05>)).

O método de interface resolvido não deve ser um método de inicialização de instância, ou o método de inicialização de classe ou interface ([§2.9.1](<#/doc/jvms/jvms-02>), [§2.9.2](<#/doc/jvms/jvms-02>)).

O operando _count_ é um byte não-assinado que não deve ser zero. O _objectref_ deve ser do tipo `reference` e deve ser seguido na pilha de operandos por _nargs_ valores de argumento, onde o número, tipo e ordem dos valores devem ser consistentes com o descritor do método de interface resolvido. O valor do quarto byte de operando deve ser sempre zero.

Seja C a classe de _objectref_. Um método é selecionado em relação a C e ao método resolvido ([§5.4.6](<#/doc/jvms/jvms-05>)). Este é o _method to be invoked_.

Se o _method to be invoked_ for `synchronized`, o monitor associado a _objectref_ é entrado ou reentrado como se pela execução de uma instrução _monitorenter_ ([§ _monitorenter_](<#/doc/jvms/jvms-06>)) na thread atual.

Se o _method to be invoked_ não for `native`, os _nargs_ valores de argumento e _objectref_ são removidos da pilha de operandos. Um novo frame é criado na pilha da Java Virtual Machine para o método sendo invocado. O _objectref_ e os valores de argumento são consecutivamente tornados os valores das variáveis locais do novo frame, com _objectref_ na variável local 0, _arg1_ na variável local 1 (ou, se _arg1_ for do tipo `long` ou `double`, nas variáveis locais 1 e 2), e assim por diante. O novo frame é então tornado atual, e o `pc` da Java Virtual Machine é definido para o opcode da primeira instrução do _method to be invoked_. A execução continua com a primeira instrução do método.

Se o _method to be invoked_ for `native` e o código dependente da plataforma que o implementa ainda não tiver sido vinculado ([§5.6](<#/doc/jvms/jvms-05>)) na Java Virtual Machine, então isso é feito. Os _nargs_ valores de argumento e _objectref_ são removidos da pilha de operandos e são passados como parâmetros para o código que implementa o método. Os parâmetros são passados e o código é invocado de maneira dependente da implementação. Quando o código dependente da plataforma retorna:

  * Se o método `native` for `synchronized`, o monitor associado a _objectref_ é atualizado e possivelmente saído como se pela execução de uma instrução _monitorexit_ ([§ _monitorexit_](<#/doc/jvms/jvms-06>)) na thread atual. 

  * Se o método `native` retornar um valor, o valor de retorno do código dependente da plataforma é convertido de uma maneira dependente da implementação para o tipo de retorno do método `native` e empilhado na pilha de operandos. 




#### Exceções de Ligação
Durante a resolução da referência simbólica ao método de interface, qualquer uma das exceções pertinentes à resolução de método de interface ([§5.4.3.4](<#/doc/jvms/jvms-05>)) pode ser lançada.

Caso contrário, se o método resolvido for `static`, a instrução _invokeinterface_ lança uma `IncompatibleClassChangeError`.

Note que _invokeinterface_ pode se referir a métodos `private` declarados em interfaces, incluindo _nestmate interfaces_.

#### Exceções em Tempo de Execução
Caso contrário, se _objectref_ for `null`, a instrução _invokeinterface_ lança uma `NullPointerException`.

Caso contrário, se a classe de _objectref_ não implementar a interface resolvida, _invokeinterface_ lança uma `IncompatibleClassChangeError`.

Caso contrário, se o método selecionado não for nem `public` nem `private`, _invokeinterface_ lança uma `IllegalAccessError`.

Caso contrário, se o método selecionado for `abstract`, _invokeinterface_ lança uma `AbstractMethodError`.

Caso contrário, se o método selecionado for `native` e o código que implementa o método não puder ser vinculado, _invokeinterface_ lança uma `UnsatisfiedLinkError`.

Caso contrário, se nenhum método for selecionado, e houver múltiplos _maximally-specific superinterface methods_ de C que correspondam ao nome e descritor do método resolvido e não sejam `abstract`, _invokeinterface_ lança uma `IncompatibleClassChangeError`.

Caso contrário, se nenhum método for selecionado, e não houver _maximally-specific superinterface methods_ de C que correspondam ao nome e descritor do método resolvido e não sejam `abstract`, _invokeinterface_ lança uma `AbstractMethodError`.

#### Notas
O operando _count_ da instrução _invokeinterface_ registra uma medida do número de valores de argumento, onde um valor de argumento do tipo `long` ou `double` contribui com duas unidades para o valor de _count_ e um argumento de qualquer outro tipo contribui com uma unidade. Esta informação também pode ser derivada do descritor do método selecionado. A redundância é histórica.

O quarto byte de operando existe para reservar espaço para um operando adicional usado em certas implementações da Java Virtual Machine da Oracle, que substituem a instrução _invokeinterface_ por uma pseudo-instrução especializada em tempo de execução. Ele deve ser mantido para compatibilidade retroativa.

Os _nargs_ valores de argumento e _objectref_ não correspondem um a um com as primeiras _nargs_ +1 variáveis locais. Valores de argumento dos tipos `long` e `double` devem ser armazenados em duas variáveis locais consecutivas, portanto, mais de _nargs_ variáveis locais podem ser necessárias para passar _nargs_ valores de argumento para o método invocado.

A lógica de seleção permite que um método não-`abstract` declarado em uma _superinterface_ seja selecionado. Métodos em interfaces são considerados apenas se não houver um método correspondente na hierarquia de classes. No caso de haver dois métodos não-`abstract` na hierarquia de _superinterface_, sem que nenhum seja mais específico que o outro, ocorre um erro; não há tentativa de desambiguação (por exemplo, um pode ser o método referenciado e um pode ser não relacionado, mas não preferimos o método referenciado). Por outro lado, se houver muitos métodos `abstract` mas apenas um método não-`abstract`, o método não-`abstract` é selecionado (a menos que um método `abstract` seja mais específico).

### _invokespecial_

#### Operação
Invocar método de instância; invocação direta de métodos de inicialização de instância e métodos da classe atual e seus supertipos

#### Formato

  
_invokespecial_  
_indexbyte1_  
_indexbyte2_  


#### Formas

_invokespecial_ = 183 (0xb7) 

#### Pilha de Operandos

..., _objectref_ , [_arg1_ , [_arg2_ ...]] ->

...

#### Descrição
Os _indexbyte1_ e _indexbyte2_ não-assinados são usados para construir um índice na pool de constantes em tempo de execução da classe atual ([§2.6](<#/doc/jvms/jvms-02>)), onde o valor do índice é (_indexbyte1_ `<<` 8) | _indexbyte2_. A entrada da pool de constantes em tempo de execução no índice deve ser uma referência simbólica a um método ou um método de interface ([§5.1](<#/doc/jvms/jvms-05>)), que fornece o nome e o descritor ([§4.3.3](<#/doc/jvms/jvms-04>)) do método ou método de interface, bem como uma referência simbólica à classe ou interface na qual o método ou método de interface deve ser encontrado. O método nomeado é resolvido ([§5.4.3.3](<#/doc/jvms/jvms-05>), [§5.4.3.4](<#/doc/jvms/jvms-05>)).

Se todas as seguintes condições forem verdadeiras, seja C a superclasse direta da classe atual:

  * O método resolvido não é um método de inicialização de instância ([§2.9.1](<#/doc/jvms/jvms-02>)). 

  * A referência simbólica nomeia uma classe (não uma interface), e essa classe é uma superclasse da classe atual. 

  * A flag `ACC_SUPER` está definida para o arquivo `class` ([§4.1](<#/doc/jvms/jvms-04>)). 




Caso contrário, seja C a classe ou interface nomeada pela referência simbólica.

O método real a ser invocado é selecionado pelo seguinte procedimento de busca:

  1. Se C contém uma declaração para um método de instância com o mesmo nome e descritor que o método resolvido, então este é o _method to be invoked_. 

  2. Caso contrário, se C é uma classe e tem uma superclasse, uma busca por uma declaração de um método de instância com o mesmo nome e descritor que o método resolvido é realizada, começando com a superclasse direta de C e continuando com a superclasse direta dessa classe, e assim por diante, até que uma correspondência seja encontrada ou não existam mais superclasses. Se uma correspondência for encontrada, então este é o _method to be invoked_. 

  3. Caso contrário, se C é uma interface e a classe `Object` contém uma declaração de um método de instância `public` com o mesmo nome e descritor que o método resolvido, então este é o _method to be invoked_. 

  4. Caso contrário, se houver exatamente um método _maximally-specific_ ([§5.4.3.3](<#/doc/jvms/jvms-05>)) nas _superinterfaces_ de C que corresponda ao nome e descritor do método resolvido e não seja `abstract`, então este é o _method to be invoked_. 




O _objectref_ deve ser do tipo `reference` e deve ser seguido na pilha de operandos por _nargs_ valores de argumento, onde o número, tipo e ordem dos valores devem ser consistentes com o descritor do método de instância selecionado.

Se o método for `synchronized`, o monitor associado a _objectref_ é entrado ou reentrado como se pela execução de uma instrução _monitorenter_ ([§ _monitorenter_](<#/doc/jvms/jvms-06>)) na thread atual.

Se o método não for `native`, os _nargs_ valores de argumento e _objectref_ são removidos da pilha de operandos. Um novo frame é criado na pilha da Java Virtual Machine para o método sendo invocado. O _objectref_ e os valores de argumento são consecutivamente tornados os valores das variáveis locais do novo frame, com _objectref_ na variável local 0, _arg1_ na variável local 1 (ou, se _arg1_ for do tipo `long` ou `double`, nas variáveis locais 1 e 2), e assim por diante. O novo frame é então tornado atual, e o `pc` da Java Virtual Machine é definido para o opcode da primeira instrução do _method to be invoked_. A execução continua com a primeira instrução do método.

Se o método for `native` e o código dependente da plataforma que o implementa ainda não tiver sido vinculado ([§5.6](<#/doc/jvms/jvms-05>)) na Java Virtual Machine, isso é feito. Os _nargs_ valores de argumento e _objectref_ são removidos da pilha de operandos e são passados como parâmetros para o código que implementa o método. Os parâmetros são passados e o código é invocado de maneira dependente da implementação. Quando o código dependente da plataforma retorna, o seguinte ocorre:

  * Se o método `native` for `synchronized`, o monitor associado a _objectref_ é atualizado e possivelmente saído como se pela execução de uma instrução _monitorexit_ ([§ _monitorexit_](<#/doc/jvms/jvms-06>)) na thread atual. 

  * Se o método `native` retornar um valor, o valor de retorno do código dependente da plataforma é convertido de uma maneira dependente da implementação para o tipo de retorno do método `native` e empilhado na pilha de operandos. 




#### Exceções de Ligação
Durante a resolução da referência simbólica ao método, qualquer uma das exceções pertinentes à resolução de método ([§5.4.3.3](<#/doc/jvms/jvms-05>)) pode ser lançada.

Caso contrário, se o método resolvido for um método de inicialização de instância, e a classe na qual ele é declarado não for a classe referenciada simbolicamente pela instrução, uma `NoSuchMethodError` é lançada.

Caso contrário, se o método resolvido for um método de classe (`static`), a instrução _invokespecial_ lança uma `IncompatibleClassChangeError`.

#### Exceções em Tempo de Execução
Caso contrário, se _objectref_ for `null`, a instrução _invokespecial_ lança uma `NullPointerException`.

Caso contrário, se o passo 1, passo 2 ou passo 3 do procedimento de busca selecionar um método `abstract`, _invokespecial_ lança uma `AbstractMethodError`.

Caso contrário, se o passo 1, passo 2 ou passo 3 do procedimento de busca selecionar um método `native` e o código que implementa o método não puder ser vinculado, _invokespecial_ lança uma `UnsatisfiedLinkError`.

Caso contrário, se o passo 4 do procedimento de busca determinar que existem múltiplos métodos _maximally-specific superinterface_ de C que correspondem ao nome e descritor do método resolvido e não são `abstract`, _invokespecial_ lança uma `IncompatibleClassChangeError`.

Caso contrário, se o passo 4 do procedimento de busca determinar que não existem métodos _maximally-specific superinterface_ de C que correspondam ao nome e descritor do método resolvido e não são `abstract`, _invokespecial_ lança uma `AbstractMethodError`.

#### Notas
A diferença entre a instrução _invokespecial_ e a instrução _invokevirtual_ ([§ _invokevirtual_](<#/doc/jvms/jvms-06>)) é que _invokevirtual_ invoca um método baseado na classe do objeto. A instrução _invokespecial_ é usada para invocar diretamente métodos de inicialização de instância ([§2.9.1](<#/doc/jvms/jvms-02>)), bem como métodos da classe atual e seus supertipos.

A instrução _invokespecial_ era chamada `invokenonvirtual` antes do lançamento do JDK 1.0.2.
Os valores de argumento `_nargs_` e `_objectref_` não são um para um com as primeiras `_nargs_` +1 variáveis locais. Valores de argumento dos tipos `long` e `double` devem ser armazenados em duas variáveis locais consecutivas, assim, mais de `_nargs_` variáveis locais podem ser necessárias para passar `_nargs_` valores de argumento para o método invocado.

A instrução `_invokespecial_` lida com a invocação de um método de interface não-`abstract`, referenciado tanto por meio de uma superinterface direta quanto por meio de uma superclasse. Nesses casos, as regras de seleção são essencialmente as mesmas que para `_invokeinterface_` (exceto que a busca começa a partir de uma classe diferente).

### `_invokestatic_`

#### Operation

Invoca um método de classe (`static`)

#### Format

```
_invokestatic_
_indexbyte1_
_indexbyte2_
```

#### Forms

`_invokestatic_` = 184 (0xb8)

#### Operand Stack

..., [`_arg1_` , [`_arg2_` ...]] ->

...

#### Description

Os `_indexbyte1_` e `_indexbyte2_` não-assinados são usados para construir um índice na pool de constantes de tempo de execução da classe atual ([§2.6](<#/doc/jvms/jvms-02>)), onde o valor do índice é (`_indexbyte1_` `<<` 8) | `_indexbyte2_`. A entrada da pool de constantes de tempo de execução no índice deve ser uma referência simbólica a um método ou a um método de interface ([§5.1](<#/doc/jvms/jvms-05>)), que fornece o nome e o descritor ([§4.3.3](<#/doc/jvms/jvms-04>)) do método ou método de interface, bem como uma referência simbólica à classe ou interface na qual o método ou método de interface deve ser encontrado. O método nomeado é resolvido ([§5.4.3.3](<#/doc/jvms/jvms-05>), [§5.4.3.4](<#/doc/jvms/jvms-05>)).

O método resolvido não deve ser um método de inicialização de instância, ou o método de inicialização de classe ou interface ([§2.9.1](<#/doc/jvms/jvms-02>), [§2.9.2](<#/doc/jvms/jvms-02>)).

O método resolvido deve ser `static`, e, portanto, não pode ser `abstract`.

Após a resolução bem-sucedida do método, a classe ou interface que declarou o método resolvido é inicializada se essa classe ou interface ainda não tiver sido inicializada ([§5.5](<#/doc/jvms/jvms-05>)).

A pilha de operandos deve conter `_nargs_` valores de argumento, onde o número, tipo e ordem dos valores devem ser consistentes com o descritor do método resolvido.

Se o método for `synchronized`, o monitor associado ao objeto `Class` resolvido é entrado ou reentrado como se pela execução de uma instrução `_monitorenter_` ([§ _monitorenter_](<#/doc/jvms/jvms-06>)) na thread atual.

Se o método não for `native`, os `_nargs_` valores de argumento são desempilhados da pilha de operandos. Um novo frame é criado na pilha da Java Virtual Machine para o método sendo invocado. Os `_nargs_` valores de argumento são consecutivamente tornados os valores das variáveis locais do novo frame, com `_arg1_` na variável local 0 (ou, se `_arg1_` for do tipo `long` ou `double`, nas variáveis locais 0 e 1) e assim por diante. O novo frame é então tornado atual, e o `pc` da Java Virtual Machine é definido para o `opcode` da primeira instrução do método a ser invocado. A execução continua com a primeira instrução do método.

Se o método for `native` e o código dependente da plataforma que o implementa ainda não tiver sido ligado ([§5.6](<#/doc/jvms/jvms-05>)) na Java Virtual Machine, isso é feito. Os `_nargs_` valores de argumento são desempilhados da pilha de operandos e passados como parâmetros para o código que implementa o método. Os parâmetros são passados e o código é invocado de maneira dependente da implementação. Quando o código dependente da plataforma retorna, o seguinte ocorre:

  * Se o método `native` for `synchronized`, o monitor associado ao objeto `Class` resolvido é atualizado e possivelmente saído como se pela execução de uma instrução `_monitorexit_` ([§ _monitorexit_](<#/doc/jvms/jvms-06>)) na thread atual.

  * Se o método `native` retornar um valor, o valor de retorno do código dependente da plataforma é convertido de uma maneira dependente da implementação para o tipo de retorno do método `native` e empilhado na pilha de operandos.

#### Linking Exceptions

Durante a resolução da referência simbólica ao método, qualquer uma das exceções pertinentes à resolução de método ([§5.4.3.3](<#/doc/jvms/jvms-05>)) pode ser lançada.

Caso contrário, se o método resolvido for um método de instância, a instrução `_invokestatic_` lança um `IncompatibleClassChangeError`.

#### Run-time Exceptions

Caso contrário, se a execução desta instrução `_invokestatic_` causar a inicialização da classe ou interface referenciada, `_invokestatic_` pode lançar um `Error` conforme detalhado em [§5.5](<#/doc/jvms/jvms-05>).

Caso contrário, se o método resolvido for `native` e o código que implementa o método não puder ser ligado, `_invokestatic_` lança um `UnsatisfiedLinkError`.

#### Notes

Os `_nargs_` valores de argumento não são um para um com as primeiras `_nargs_` variáveis locais. Valores de argumento dos tipos `long` e `double` devem ser armazenados em duas variáveis locais consecutivas, assim, mais de `_nargs_` variáveis locais podem ser necessárias para passar `_nargs_` valores de argumento para o método invocado.

### `_invokevirtual_`

#### Operation

Invoca método de instância; despacho baseado na classe

#### Format

```
_invokevirtual_
_indexbyte1_
_indexbyte2_
```

#### Forms

`_invokevirtual_` = 182 (0xb6)

#### Operand Stack

..., `_objectref_` , [`_arg1_` , [`_arg2_` ...]] ->

...

#### Description

Os `_indexbyte1_` e `_indexbyte2_` não-assinados são usados para construir um índice na pool de constantes de tempo de execução da classe atual ([§2.6](<#/doc/jvms/jvms-02>)), onde o valor do índice é (`_indexbyte1_` `<<` 8) | `_indexbyte2_`. A entrada da pool de constantes de tempo de execução no índice deve ser uma referência simbólica a um método ([§5.1](<#/doc/jvms/jvms-05>)), que fornece o nome e o descritor ([§4.3.3](<#/doc/jvms/jvms-04>)) do método, bem como uma referência simbólica à classe na qual o método deve ser encontrado. O método nomeado é resolvido ([§5.4.3.3](<#/doc/jvms/jvms-05>)).

Se o método resolvido não for polimórfico por assinatura ([§2.9.3](<#/doc/jvms/jvms-02>)), então a instrução `_invokevirtual_` prossegue da seguinte forma.

Seja C a classe de `_objectref_`. Um método é selecionado em relação a C e ao método resolvido ([§5.4.6](<#/doc/jvms/jvms-05>)). Este é o _método a ser invocado_.

O `_objectref_` deve ser seguido na pilha de operandos por `_nargs_` valores de argumento, onde o número, tipo e ordem dos valores devem ser consistentes com o descritor do método de instância selecionado.

Se o método a ser invocado for `synchronized`, o monitor associado a `_objectref_` é entrado ou reentrado como se pela execução de uma instrução `_monitorenter_` ([§ _monitorenter_](<#/doc/jvms/jvms-06>)) na thread atual.

Se o método a ser invocado não for `native`, os `_nargs_` valores de argumento e `_objectref_` são desempilhados da pilha de operandos. Um novo frame é criado na pilha da Java Virtual Machine para o método sendo invocado. O `_objectref_` e os valores de argumento são consecutivamente tornados os valores das variáveis locais do novo frame, com `_objectref_` na variável local 0, `_arg1_` na variável local 1 (ou, se `_arg1_` for do tipo `long` ou `double`, nas variáveis locais 1 e 2), e assim por diante. O novo frame é então tornado atual, e o `pc` da Java Virtual Machine é definido para o `opcode` da primeira instrução do método a ser invocado. A execução continua com a primeira instrução do método.

Se o método a ser invocado for `native` e o código dependente da plataforma que o implementa ainda não tiver sido ligado ([§5.6](<#/doc/jvms/jvms-05>)) na Java Virtual Machine, isso é feito. Os `_nargs_` valores de argumento e `_objectref_` são desempilhados da pilha de operandos e passados como parâmetros para o código que implementa o método. Os parâmetros são passados e o código é invocado de maneira dependente da implementação. Quando o código dependente da plataforma retorna, o seguinte ocorre:

  * Se o método `native` for `synchronized`, o monitor associado a `_objectref_` é atualizado e possivelmente saído como se pela execução de uma instrução `_monitorexit_` ([§ _monitorexit_](<#/doc/jvms/jvms-06>)) na thread atual.

  * Se o método `native` retornar um valor, o valor de retorno do código dependente da plataforma é convertido de uma maneira dependente da implementação para o tipo de retorno do método `native` e empilhado na pilha de operandos.

Se o método resolvido for polimórfico por assinatura ([§2.9.3](<#/doc/jvms/jvms-02>)), e declarado na classe `java.lang.invoke.MethodHandle`, então a instrução `_invokevirtual_` prossegue da seguinte forma, onde D é o descritor do método referenciado simbolicamente pela instrução.

Primeiro, uma `reference` a uma instância de `java.lang.invoke.MethodType` é obtida como se pela resolução de uma referência simbólica a um tipo de método ([§5.4.3.5](<#/doc/jvms/jvms-05>)) com os mesmos tipos de parâmetro e retorno que D.

  * Se o método nomeado for `invokeExact`, a instância de `java.lang.invoke.MethodType` deve ser semanticamente igual ao descritor de tipo do `_objectref_` do `method handle` receptor. O _method handle a ser invocado_ é `_objectref_`.

  * Se o método nomeado for `invoke`, e a instância de `java.lang.invoke.MethodType` for semanticamente igual ao descritor de tipo do `_objectref_` do `method handle` receptor, então o _method handle a ser invocado_ é `_objectref_`.

  * Se o método nomeado for `invoke`, e a instância de `java.lang.invoke.MethodType` não for semanticamente igual ao descritor de tipo do `_objectref_` do `method handle` receptor, então a Java Virtual Machine tenta ajustar o descritor de tipo do `method handle` receptor, como se pela invocação do método `asType` de `java.lang.invoke.MethodHandle`, para obter um `method handle` `m` exatamente invocável. O _method handle a ser invocado_ é `m`.

O `_objectref_` deve ser seguido na pilha de operandos por `_nargs_` valores de argumento, onde o número, tipo e ordem dos valores devem ser consistentes com o descritor de tipo do `method handle` a ser invocado. (Este descritor de tipo corresponderá ao descritor de método apropriado para o tipo de `method handle` a ser invocado, conforme especificado em [§5.4.3.5](<#/doc/jvms/jvms-05>).)

Então, se o `method handle` a ser invocado tiver comportamento de `bytecode`, a Java Virtual Machine invoca o `method handle` como se pela execução do comportamento de `bytecode` associado ao tipo do `method handle`. Se o tipo for 5 (`REF_invokeVirtual`), 6 (`REF_invokeStatic`), 7 (`REF_invokeSpecial`), 8 (`REF_newInvokeSpecial`), ou 9 (`REF_invokeInterface`), então um frame será criado e tornado atual _no curso da execução do comportamento de bytecode_ ; no entanto, este frame não é visível, e quando o método invocado pelo comportamento de `bytecode` é concluído (normalmente ou abruptamente), o _frame de seu invocador_ é considerado o frame para o método que contém esta instrução `_invokevirtual_`.

Caso contrário, se o `method handle` a ser invocado não tiver comportamento de `bytecode`, a Java Virtual Machine o invoca de uma maneira dependente da implementação.

Se o método resolvido for polimórfico por assinatura e declarado na classe `java.lang.invoke.VarHandle`, então a instrução `_invokevirtual_` prossegue da seguinte forma, onde `N` e D são o nome e o descritor do método referenciado simbolicamente pela instrução.

Primeiro, uma `reference` a uma instância de `java.lang.invoke.VarHandle.AccessMode` é obtida como se pela invocação do método `valueFromMethodName` de `java.lang.invoke.VarHandle.AccessMode` com um argumento `String` denotando `N`.

Segundo, uma `reference` a uma instância de `java.lang.invoke.MethodType` é obtida como se pela invocação do método `accessModeType` de `java.lang.invoke.VarHandle` na instância `_objectref_`, com a instância de `java.lang.invoke.VarHandle.AccessMode` como argumento.

Terceiro, uma `reference` a uma instância de `java.lang.invoke.MethodHandle` é obtida como se pela invocação do método `varHandleExactInvoker` de `java.lang.invoke.MethodHandles` com a instância de `java.lang.invoke.VarHandle.AccessMode` como o primeiro argumento e a instância de `java.lang.invoke.MethodType` como o segundo argumento. A instância resultante é chamada de _invoker method handle_.

Finalmente, os `_nargs_` valores de argumento e `_objectref_` são desempilhados da pilha de operandos, e o _invoker method handle_ é invocado. A invocação ocorre como se pela execução de uma instrução `_invokevirtual_` que indica um índice da pool de constantes de tempo de execução para uma referência simbólica R onde:

  * R é uma referência simbólica a um método de uma classe;

  * para a referência simbólica à classe na qual o método deve ser encontrado, R especifica `java.lang.invoke.MethodHandle`;

  * para o nome do método, R especifica `invoke`;

  * para o descritor do método, R especifica um tipo de retorno indicado pelo descritor de retorno de D, e especifica um primeiro tipo de parâmetro de `java.lang.invoke.VarHandle` seguido pelos tipos de parâmetro indicados pelos descritores de parâmetro de D (se houver) em ordem.

e onde é como se os seguintes itens fossem empilhados, em ordem, na pilha de operandos:

  * uma `reference` à instância de `java.lang.invoke.MethodHandle` (o _invoker method handle_);

  * `_objectref_` ;

  * os `_nargs_` valores de argumento, onde o número, tipo e ordem dos valores devem ser consistentes com o descritor de tipo do _invoker method handle_.

#### Linking Exceptions

Durante a resolução da referência simbólica ao método, qualquer uma das exceções pertinentes à resolução de método ([§5.4.3.3](<#/doc/jvms/jvms-05>)) pode ser lançada.

Caso contrário, se o método resolvido for um método de classe (`static`), a instrução `_invokevirtual_` lança um `IncompatibleClassChangeError`.

Caso contrário, se o método resolvido for polimórfico por assinatura e declarado na classe `java.lang.invoke.MethodHandle`, então durante a resolução do tipo de método derivado do descritor na referência simbólica ao método, qualquer uma das exceções pertinentes à resolução de tipo de método ([§5.4.3.5](<#/doc/jvms/jvms-05>)) pode ser lançada.

Caso contrário, se o método resolvido for polimórfico por assinatura e declarado na classe `java.lang.invoke.VarHandle`, então qualquer exceção de ligação que possa surgir da invocação do _invoker method handle_ pode ser lançada. Nenhuma exceção de ligação é lançada da invocação dos métodos `valueFromMethodName`, `accessModeType` e `varHandleExactInvoker`.

#### Run-time Exceptions

Caso contrário, se `_objectref_` for `null`, a instrução `_invokevirtual_` lança uma `NullPointerException`.

Caso contrário, se o método resolvido não for polimórfico por assinatura:

  * Se o método selecionado for `abstract`, `_invokevirtual_` lança um `AbstractMethodError`.

  * Caso contrário, se o método selecionado for `native` e o código que implementa o método não puder ser ligado, `_invokevirtual_` lança um `UnsatisfiedLinkError`.

  * Caso contrário, se nenhum método for selecionado, e houver múltiplos métodos de superinterface de C maximamente específicos que correspondam ao nome e descritor do método resolvido e não sejam `abstract`, `_invokevirtual_` lança um `IncompatibleClassChangeError`.

  * Caso contrário, se nenhum método for selecionado, e não houver métodos de superinterface de C maximamente específicos que correspondam ao nome e descritor do método resolvido e não sejam `abstract`, `_invokevirtual_` lança um `AbstractMethodError`.

Caso contrário, se o método resolvido for polimórfico por assinatura e declarado na classe `java.lang.invoke.MethodHandle`, então:

  * Se o nome do método for `invokeExact`, e a instância obtida de `java.lang.invoke.MethodType` não for semanticamente igual ao descritor de tipo do `_objectref_` do `method handle` receptor, a instrução `_invokevirtual_` lança uma `java.lang.invoke.WrongMethodTypeException`.

  * Se o nome do método for `invoke`, e a instância obtida de `java.lang.invoke.MethodType` não for um argumento válido para o método `asType` de `java.lang.invoke.MethodHandle` invocado no `_objectref_` do `method handle` receptor, a instrução `_invokevirtual_` lança uma `java.lang.invoke.WrongMethodTypeException`.

Caso contrário, se o método resolvido for polimórfico por assinatura e declarado na classe `java.lang.invoke.VarHandle`, então qualquer exceção de tempo de execução que possa surgir da invocação do _invoker method handle_ pode ser lançada. Nenhuma exceção de tempo de execução é lançada da invocação dos métodos `valueFromMethodName`, `accessModeType` e `varHandleExactInvoker`, exceto `NullPointerException` se `_objectref_` for `null`.

#### Notes

Os `_nargs_` valores de argumento e `_objectref_` não são um para um com as primeiras `_nargs_` +1 variáveis locais. Valores de argumento dos tipos `long` e `double` devem ser armazenados em duas variáveis locais consecutivas, assim, mais de `_nargs_` variáveis locais podem ser necessárias para passar `_nargs_` valores de argumento para o método invocado.

É possível que a referência simbólica de uma instrução `_invokevirtual_` se resolva para um método de interface. Neste caso, é possível que não haja um método sobrescrito na hierarquia de classes, mas que um método de interface não-`abstract` corresponda ao descritor do método resolvido. A lógica de seleção corresponde a tal método, usando as mesmas regras que para `_invokeinterface_`.

### `_ior_`

#### Operation

OR bit a bit de `int`

#### Format

```
_ior_
```

#### Forms

`_ior_` = 128 (0x80)

#### Operand Stack

..., `_value1_` , `_value2_` ->

..., `_result_`

#### Description

Ambos `_value1_` e `_value2_` devem ser do tipo `int`. Eles são desempilhados da pilha de operandos. Um `_result_` `int` é calculado aplicando o OR inclusivo bit a bit em `_value1_` e `_value2_`. O `_result_` é empilhado na pilha de operandos.

### `_irem_`

#### Operation

Resto de `int`

#### Format

```
_irem_
```

#### Forms

`_irem_` = 112 (0x70)

#### Operand Stack

..., `_value1_` , `_value2_` ->

..., `_result_`

#### Description

Ambos `_value1_` e `_value2_` devem ser do tipo `int`. Os valores são desempilhados da pilha de operandos. O `_result_` `int` é `_value1_` - (`_value1_` / `_value2_`) * `_value2_`. O `_result_` é empilhado na pilha de operandos.

O resultado da instrução `_irem_` é tal que `(a/b)*b + (a%b)` é igual a `a`. Esta identidade se mantém mesmo no caso especial em que o dividendo é o `int` negativo de maior magnitude possível para seu tipo e o divisor é -1 (o resto é 0). Segue-se desta regra que o resultado da operação de resto pode ser negativo apenas se o dividendo for negativo e pode ser positivo apenas se o dividendo for positivo. Além disso, a magnitude do resultado é sempre menor que a magnitude do divisor.

#### Run-time Exception

Se o valor do divisor para um operador de resto `int` for 0, `_irem_` lança uma `ArithmeticException`.

### `_ireturn_`

#### Operation

Retorna `int` de um método

#### Format

```
_ireturn_
```

#### Forms

`_ireturn_` = 172 (0xac)

#### Operand Stack

..., `_value_` ->

[empty]

#### Description

O método atual deve ter tipo de retorno `boolean`, `byte`, `char`, `short` ou `int`. O `_value_` deve ser do tipo `int`. Se o método atual for um método `synchronized`, o monitor entrado ou reentrado na invocação do método é atualizado e possivelmente saído como se pela execução de uma instrução `_monitorexit_` ([§ _monitorexit_](<#/doc/jvms/jvms-06>)) na thread atual. Se nenhuma exceção for lançada, `_value_` é desempilhado da pilha de operandos do frame atual ([§2.6](<#/doc/jvms/jvms-02>)) e empilhado na pilha de operandos do frame do invocador. Quaisquer outros valores na pilha de operandos do método atual são descartados.

Antes de empilhar `_value_` na pilha de operandos do frame do invocador, ele pode ter que ser convertido. Se o tipo de retorno do método invocado era `byte`, `char` ou `short`, então `_value_` é convertido de `int` para o tipo de retorno como se pela execução de `_i2b_`, `_i2c_` ou `_i2s_`, respectivamente. Se o tipo de retorno do método invocado era `boolean`, então `_value_` é estreitado de `int` para `boolean` aplicando o AND bit a bit em `_value_` e 1.

O interpretador então retorna o controle ao invocador do método, restaurando o frame do invocador.

#### Run-time Exceptions

Se a implementação da Java Virtual Machine não impõe as regras sobre travamento estruturado descritas em [§2.11.10](<#/doc/jvms/jvms-02>), então, se o método atual for um método `synchronized` e a thread atual não for a proprietária do monitor entrado ou reentrado na invocação do método, `_ireturn_` lança uma `IllegalMonitorStateException`. Isso pode acontecer, por exemplo, se um método `synchronized` contiver uma instrução `_monitorexit_`, mas nenhuma instrução `_monitorenter_`, no objeto no qual o método é sincronizado.

Caso contrário, se a implementação da Java Virtual Machine impõe as regras sobre travamento estruturado descritas em [§2.11.10](<#/doc/jvms/jvms-02>) e se a primeira dessas regras for violada durante a invocação do método atual, então `_ireturn_` lança uma `IllegalMonitorStateException`.

### `_ishl_`

#### Operation

Deslocamento à esquerda de `int`

#### Format

```
_ishl_
```

#### Forms

`_ishl_` = 120 (0x78)

#### Operand Stack

..., `_value1_` , `_value2_` ->

..., `_result_`

#### Description

Ambos `_value1_` e `_value2_` devem ser do tipo `int`. Os valores são desempilhados da pilha de operandos. Um `_result_` `int` é calculado deslocando `_value1_` para a esquerda por `_s_` posições de bit, onde `_s_` é o valor dos 5 bits de baixa ordem de `_value2_`. O `_result_` é empilhado na pilha de operandos.

#### Notes

Isso é equivalente (mesmo que ocorra overflow) à multiplicação por 2 elevado à potência `_s_`. A distância de deslocamento realmente usada está sempre no intervalo de 0 a 31, inclusive, como se `_value2_` fosse submetido a um AND lógico bit a bit com o valor de máscara `0x1f`.

### `_ishr_`

#### Operation

Deslocamento aritmético à direita de `int`

#### Format

```
_ishr_
```

#### Forms

`_ishr_` = 122 (0x7a)

#### Operand Stack

..., `_value1_` , `_value2_` ->

..., `_result_`

#### Description

Ambos `_value1_` e `_value2_` devem ser do tipo `int`. Os valores são desempilhados da pilha de operandos. Um `_result_` `int` é calculado deslocando `_value1_` para a direita por `_s_` posições de bit, com extensão de sinal, onde `_s_` é o valor dos 5 bits de baixa ordem de `_value2_`. O `_result_` é empilhado na pilha de operandos.

#### Notes

O valor resultante é _floor_(`_value1_` / 2 `_s_`), onde `_s_` é `_value2_` & `0x1f`. Para `_value1_` não negativo, isso é equivalente a truncar a divisão `int` por 2 elevado à potência `_s_`. A distância de deslocamento realmente usada está sempre no intervalo de 0 a 31, inclusive, como se `_value2_` fosse submetido a um AND lógico bit a bit com o valor de máscara `0x1f`.

### `_istore_`

#### Operation

Armazena `int` em variável local

#### Format

```
_istore_
_index_
```

#### Forms

`_istore_` = 54 (0x36)

#### Operand Stack

..., `_value_` ->

...

#### Description

O `_index_` é um byte não-assinado que deve ser um índice no array de variáveis locais do frame atual ([§2.6](<#/doc/jvms/jvms-02>)). O `_value_` no topo da pilha de operandos deve ser do tipo `int`. Ele é desempilhado da pilha de operandos, e o valor da variável local em `_index_` é definido como `_value_`.

#### Notes

O `opcode` `_istore_` pode ser usado em conjunto com a instrução `_wide_` ([§ _wide_](<#/doc/jvms/jvms-06>)) para acessar uma variável local usando um índice não-assinado de dois bytes.

### `_istore_ <n>_`

#### Operation

Armazena `int` em variável local

#### Format

```
_istore_ <n>_
```

#### Forms

`_istore_0_` = 59 (0x3b)

`_istore_1_` = 60 (0x3c)

`_istore_2_` = 61 (0x3d)

`_istore_3_` = 62 (0x3e)

#### Operand Stack

..., `_value_` ->

...

#### Description

O `<_n_>` deve ser um índice no array de variáveis locais do frame atual ([§2.6](<#/doc/jvms/jvms-02>)). O `_value_` no topo da pilha de operandos deve ser do tipo `int`. Ele é desempilhado da pilha de operandos, e o valor da variável local em `<_n_>` é definido como `_value_`.

#### Notes

Cada uma das instruções `_istore_ <n>_` é a mesma que `_istore_` com um `_index_` de `<_n_>`, exceto que o operando `<_n_>` é implícito.

### `_isub_`

#### Operation

Subtrai `int`

#### Format

```
_isub_
```

#### Forms

`_isub_` = 100 (0x64)

#### Operand Stack

..., `_value1_` , `_value2_` ->

..., `_result_`

#### Description

Ambos `_value1_` e `_value2_` devem ser do tipo `int`. Os valores são desempilhados da pilha de operandos. O `_result_` `int` é `_value1_` - `_value2_`. O `_result_` é empilhado na pilha de operandos.

Para subtração de `int`, `a-b` produz o mesmo resultado que `a+(-b)`. Para valores `int`, a subtração de zero é o mesmo que a negação.

O resultado são os 32 bits de baixa ordem do verdadeiro resultado matemático em um formato de complemento de dois suficientemente amplo, representado como um valor do tipo `int`. Se ocorrer overflow, o sinal do resultado pode não ser o mesmo que o sinal da diferença matemática dos dois valores.

Apesar do fato de que overflow pode ocorrer, a execução de uma instrução `_isub_` nunca lança uma exceção de tempo de execução.

### `_iushr_`

#### Operation

Deslocamento lógico à direita de `int`

#### Format

```
_iushr_
```

#### Forms

`_iushr_` = 124 (0x7c)

#### Operand Stack

..., `_value1_` , `_value2_` ->

..., `_result_`

#### Description

Ambos `_value1_` e `_value2_` devem ser do tipo `int`. Os valores são desempilhados da pilha de operandos. Um `_result_` `int` é calculado deslocando `_value1_` para a direita por `_s_` posições de bit, com extensão de zero, onde `_s_` é o valor dos 5 bits de baixa ordem de `_value2_`. O `_result_` é empilhado na pilha de operandos.

#### Notes

Se `_value1_` for positivo e `_s_` for `_value2_` & `0x1f`, o resultado é o mesmo que o de `_value1_` `>>` `_s_` ; se `_value1_` for negativo, o resultado é igual ao valor da expressão (`_value1_` `>>` `_s_`) + (2 `<<` `~_s_`). A adição do termo (2 `<<` `~_s_`) cancela o bit de sinal propagado. A distância de deslocamento realmente usada está sempre no intervalo de 0 a 31, inclusive.

### `_ixor_`

#### Operation

XOR bit a bit de `int`

#### Format

```
_ixor_
```

#### Forms

`_ixor_` = 130 (0x82)

#### Operand Stack

..., `_value1_` , `_value2_` ->

..., `_result_`

#### Description

Ambos `_value1_` e `_value2_` devem ser do tipo `int`. Eles são desempilhados da pilha de operandos. Um `_result_` `int` é calculado aplicando o XOR exclusivo bit a bit em `_value1_` e `_value2_`. O `_result_` é empilhado na pilha de operandos.

### `_jsr_`

#### Operation

Salta para sub-rotina

#### Format

```
_jsr_
_branchbyte1_
_branchbyte2_
```

#### Forms

`_jsr_` = 168 (0xa8)

#### Operand Stack

... ->

..., `_address_`

#### Description

O `_address_` do `opcode` da instrução imediatamente seguinte a esta instrução `_jsr_` é empilhado na pilha de operandos como um valor do tipo `returnAddress`. Os `_branchbyte1_` e `_branchbyte2_` não-assinados são usados para construir um offset assinado de 16 bits, onde o offset é (`_branchbyte1_` `<<` 8) | `_branchbyte2_`. A execução prossegue nesse offset a partir do endereço desta instrução `_jsr_`. O endereço de destino deve ser o de um `opcode` de uma instrução dentro do método que contém esta instrução `_jsr_`.

#### Notes

Note que `_jsr_` empilha o endereço na pilha de operandos e `_ret_` ([§ _ret_](<#/doc/jvms/jvms-06>)) o retira de uma variável local. Esta assimetria é intencional.

Na implementação da Oracle de um compilador para a linguagem de programação Java antes do Java SE 6, a instrução `_jsr_` era usada com a instrução `_ret_` na implementação da cláusula `finally` ([§3.13](<#/doc/jvms/jvms-03>), [§4.10.2.5](<#/doc/jvms/jvms-04>)).

### `_jsr_w_`

#### Operation

Salta para sub-rotina (índice amplo)

#### Format

```
_jsr_w_
_branchbyte1_
_branchbyte2_
_branchbyte3_
_branchbyte4_
```

#### Forms

`_jsr_w_` = 201 (0xc9)

#### Operand Stack

... ->

..., `_address_`

#### Description

O `_address_` do `opcode` da instrução imediatamente seguinte a esta instrução `_jsr_w_` é empilhado na pilha de operandos como um valor do tipo `returnAddress`. Os `_branchbyte1_`, `_branchbyte2_`, `_branchbyte3_` e `_branchbyte4_` não-assinados são usados para construir um offset assinado de 32 bits, onde o offset é (`_branchbyte1_` `<<` 24) | (`_branchbyte2_` `<<` 16) | (`_branchbyte3_` `<<` 8) | `_branchbyte4_`. A execução prossegue nesse offset a partir do endereço desta instrução `_jsr_w_`. O endereço de destino deve ser o de um `opcode` de uma instrução dentro do método que contém esta instrução `_jsr_w_`.

#### Notes

Note que `_jsr_w_` empilha o endereço na pilha de operandos e `_ret_` ([§ _ret_](<#/doc/jvms/jvms-06>)) o retira de uma variável local. Esta assimetria é intencional.

Na implementação da Oracle de um compilador para a linguagem de programação Java antes do Java SE 6, a instrução `_jsr_w_` era usada com a instrução `_ret_` na implementação da cláusula `finally` ([§3.13](<#/doc/jvms/jvms-03>), [§4.10.2.5](<#/doc/jvms/jvms-04>)).

Embora a instrução `_jsr_w_` aceite um offset de branch de 4 bytes, outros fatores limitam o tamanho de um método a 65535 bytes ([§4.11](<#/doc/jvms/jvms-04>)). Este limite pode ser aumentado em uma futura versão da Java Virtual Machine.

### `_l2d_`

#### Operation

Converte `long` para `double`

#### Format

```
_l2d_
```

#### Forms

`_l2d_` = 138 (0x8a)

#### Operand Stack

..., `_value_` ->

..., `_result_`

#### Description

O `_value_` no topo da pilha de operandos deve ser do tipo `long`. Ele é desempilhado da pilha de operandos e convertido para um `_result_` `double` usando a política de arredondamento para o mais próximo ([§2.8](<#/doc/jvms/jvms-02>)). O `_result_` é empilhado na pilha de operandos.

#### Notes

A instrução `_l2d_` realiza uma conversão primitiva de alargamento (JLS §5.1.2) que pode perder precisão porque valores do tipo `double` têm apenas 53 bits de significando.

### `_l2f_`

#### Operation

Converte `long` para `float`

#### Format

```
_l2f_
```

#### Forms

`_l2f_` = 137 (0x89)

#### Operand Stack

..., `_value_` ->

..., `_result_`

#### Description

O `_value_` no topo da pilha de operandos deve ser do tipo `long`. Ele é desempilhado da pilha de operandos e convertido para um `_result_` `float` usando a política de arredondamento para o mais próximo ([§2.8](<#/doc/jvms/jvms-02>)). O `_result_` é empilhado na pilha de operandos.

#### Notes

A instrução `_l2f_` realiza uma conversão primitiva de alargamento (JLS §5.1.2) que pode perder precisão porque valores do tipo `float` têm apenas 24 bits de significando.

### `_l2i_`

#### Operation

Converte `long` para `int`

#### Format

```
_l2i_
```

#### Forms

`_l2i_` = 136 (0x88)

#### Operand Stack

..., `_value_` ->

..., `_result_`

#### Description

O `_value_` no topo da pilha de operandos deve ser do tipo `long`. Ele é desempilhado da pilha de operandos e convertido para um `_result_` `int` pegando os 32 bits de baixa ordem do valor `long` e descartando os 32 bits de alta ordem. O `_result_` é empilhado na pilha de operandos.

#### Notes

A instrução `_l2i_` realiza uma conversão primitiva de estreitamento (JLS §5.1.3). Ela pode perder informações sobre a magnitude geral de `_value_`. O `_result_` também pode não ter o mesmo sinal que `_value_`.

### `_ladd_`

#### Operation

Soma `long`

#### Format

```
_ladd_
```

#### Forms

`_ladd_` = 97 (0x61)

#### Operand Stack

..., `_value1_` , `_value2_` ->

..., `_result_`

#### Description

Ambos `_value1_` e `_value2_` devem ser do tipo `long`. Os valores são desempilhados da pilha de operandos. O `_result_` `long` é `_value1_` + `_value2_`. O `_result_` é empilhado na pilha de operandos.
O resultado são os 64 bits de baixa ordem do verdadeiro resultado matemático em um formato de complemento de dois suficientemente amplo, representado como um valor do tipo `long`. Se ocorrer um overflow, o sinal do resultado pode não ser o mesmo que o sinal da soma matemática dos dois valores.

Apesar do fato de que um overflow pode ocorrer, a execução de uma instrução _ladd_ nunca lança uma exceção em tempo de execução.

### _laload_

#### Operação
Carrega `long` de um array

#### Formato

_laload_

#### Formas

_laload_ = 47 (0x2f)

#### Pilha de Operandos

..., _arrayref_ , _index_ ->

..., _value_

#### Descrição

O _arrayref_ deve ser do tipo `reference` e deve se referir a um array cujos componentes são do tipo `long`. O _index_ deve ser do tipo `int`. Ambos _arrayref_ e _index_ são removidos da pilha de operandos. O `long` _value_ no componente do array em _index_ é recuperado e empilhado na pilha de operandos.

#### Exceções em Tempo de Execução

Se _arrayref_ for `null`, _laload_ lança uma `NullPointerException`.

Caso contrário, se _index_ não estiver dentro dos limites do array referenciado por _arrayref_, a instrução _laload_ lança uma `ArrayIndexOutOfBoundsException`.

### _land_

#### Operação

AND bit a bit de `long`

#### Formato

_land_

#### Formas

_land_ = 127 (0x7f)

#### Pilha de Operandos

..., _value1_ , _value2_ ->

..., _result_

#### Descrição

Ambos _value1_ e _value2_ devem ser do tipo `long`. Eles são removidos da pilha de operandos. Um `long` _result_ é calculado realizando o AND bit a bit de _value1_ e _value2_. O _result_ é empilhado na pilha de operandos.

### _lastore_

#### Operação

Armazena em array de `long`

#### Formato

_lastore_

#### Formas

_lastore_ = 80 (0x50)

#### Pilha de Operandos

..., _arrayref_ , _index_ , _value_ ->

...

#### Descrição

O _arrayref_ deve ser do tipo `reference` e deve se referir a um array cujos componentes são do tipo `long`. O _index_ deve ser do tipo `int`, e _value_ deve ser do tipo `long`. O _arrayref_, _index_ e _value_ são removidos da pilha de operandos. O `long` _value_ é armazenado como o componente do array indexado por _index_.

#### Exceções em Tempo de Execução

Se _arrayref_ for `null`, _lastore_ lança uma `NullPointerException`.

Caso contrário, se _index_ não estiver dentro dos limites do array referenciado por _arrayref_, a instrução _lastore_ lança uma `ArrayIndexOutOfBoundsException`.

### _lcmp_

#### Operação

Compara `long`

#### Formato

_lcmp_

#### Formas

_lcmp_ = 148 (0x94)

#### Pilha de Operandos

..., _value1_ , _value2_ ->

..., _result_

#### Descrição

Ambos _value1_ e _value2_ devem ser do tipo `long`. Ambos são removidos da pilha de operandos, e uma comparação de inteiros com sinal é realizada. Se _value1_ for maior que _value2_, o valor `int` 1 é empilhado na pilha de operandos. Se _value1_ for igual a _value2_, o valor `int` 0 é empilhado na pilha de operandos. Se _value1_ for menor que _value2_, o valor `int` -1 é empilhado na pilha de operandos.

### _lconst_ &lt;l&gt;_

#### Operação

Empilha constante `long`

#### Formato

_lconst_ &lt;l&gt;_

#### Formas

_lconst_0_ = 9 (0x9)

_lconst_1_ = 10 (0xa)

#### Pilha de Operandos

... ->

..., <_l_ >

#### Descrição

Empilha a constante `long` <_l_ > (0 ou 1) na pilha de operandos.

### _ldc_

#### Operação

Empilha item do pool de constantes em tempo de execução

#### Formato

_ldc_
_index_

#### Formas

_ldc_ = 18 (0x12)

#### Pilha de Operandos

... ->

..., _value_

#### Descrição

O _index_ é um byte sem sinal que deve ser um índice válido no pool de constantes em tempo de execução da classe atual ([§2.5.5](<#/doc/jvms/jvms-02>)). A entrada do pool de constantes em tempo de execução em _index_ deve ser carregável ([§5.1](<#/doc/jvms/jvms-05>)), e não pode ser nenhuma das seguintes:

  * Uma constante numérica do tipo `long` ou `double`.

  * Uma referência simbólica a uma constante computada dinamicamente cujo descritor de campo é `J` (denotando `long`) ou `D` (denotando `double`).

Se a entrada do pool de constantes em tempo de execução for uma constante numérica do tipo `int` ou `float`, então o _value_ dessa constante numérica é empilhado na pilha de operandos como um `int` ou `float`, respectivamente.

Caso contrário, se a entrada do pool de constantes em tempo de execução for uma constante de string, ou seja, uma `reference` para uma instância da classe `String`, então _value_, uma `reference` para essa instância, é empilhado na pilha de operandos.

Caso contrário, se a entrada do pool de constantes em tempo de execução for uma referência simbólica a uma classe ou interface, então a classe ou interface nomeada é resolvida ([§5.4.3.1](<#/doc/jvms/jvms-05>)) e _value_, uma `reference` para o objeto `Class` que representa essa classe ou interface, é empilhado na pilha de operandos.

Caso contrário, a entrada do pool de constantes em tempo de execução é uma referência simbólica a um tipo de método, um handle de método ou uma constante computada dinamicamente. A referência simbólica é resolvida ([§5.4.3.5](<#/doc/jvms/jvms-05>), [§5.4.3.6](<#/doc/jvms/jvms-05>)) e _value_, o resultado da resolução, é empilhado na pilha de operandos.

#### Exceções de Ligação

Durante a resolução de uma referência simbólica, qualquer uma das exceções pertinentes à resolução desse tipo de referência simbólica pode ser lançada.

### _ldc_w_

#### Operação

Empilha item do pool de constantes em tempo de execução (índice amplo)

#### Formato

_ldc_w_
_indexbyte1_
_indexbyte2_

#### Formas

_ldc_w_ = 19 (0x13)

#### Pilha de Operandos

... ->

..., _value_

#### Descrição

Os _indexbyte1_ e _indexbyte2_ sem sinal são combinados em um índice de 16 bits sem sinal no pool de constantes em tempo de execução da classe atual ([§2.5.5](<#/doc/jvms/jvms-02>)), onde o valor do índice é calculado como (_indexbyte1_ `<<` 8) | _indexbyte2_. O índice deve ser um índice válido no pool de constantes em tempo de execução da classe atual. A entrada do pool de constantes em tempo de execução no índice deve ser carregável ([§5.1](<#/doc/jvms/jvms-05>)), e não pode ser nenhuma das seguintes:

  * Uma constante numérica do tipo `long` ou `double`.

  * Uma referência simbólica a uma constante computada dinamicamente cujo descritor de campo é `J` (denotando `long`) ou `D` (denotando `double`).

Se a entrada do pool de constantes em tempo de execução for uma constante numérica do tipo `int` ou `float`, ou uma constante de string, então _value_ é determinado e empilhado na pilha de operandos de acordo com as regras fornecidas para a instrução _ldc_.

Caso contrário, a entrada do pool de constantes em tempo de execução é uma referência simbólica a uma classe, interface, tipo de método, handle de método ou constante computada dinamicamente. Ela é resolvida e _value_ é determinado e empilhado na pilha de operandos de acordo com as regras fornecidas para a instrução _ldc_.

#### Exceções de Ligação

Durante a resolução de uma referência simbólica, qualquer uma das exceções pertinentes à resolução desse tipo de referência simbólica pode ser lançada.

#### Notas

A instrução _ldc_w_ é idêntica à instrução _ldc_ ([§ _ldc_](<#/doc/jvms/jvms-06>)) exceto pelo seu índice mais amplo no pool de constantes em tempo de execução.

### _ldc2_w_

#### Operação

Empilha `long` ou `double` do pool de constantes em tempo de execução (índice amplo)

#### Formato

_ldc2_w_
_indexbyte1_
_indexbyte2_

#### Formas

_ldc2_w_ = 20 (0x14)

#### Pilha de Operandos

... ->

..., _value_

#### Descrição

Os _indexbyte1_ e _indexbyte2_ sem sinal são combinados em um índice de 16 bits sem sinal no pool de constantes em tempo de execução da classe atual ([§2.5.5](<#/doc/jvms/jvms-02>)), onde o valor do índice é calculado como (_indexbyte1_ `<<` 8) | _indexbyte2_. O índice deve ser um índice válido no pool de constantes em tempo de execução da classe atual. A entrada do pool de constantes em tempo de execução no índice deve ser carregável ([§5.1](<#/doc/jvms/jvms-05>)), e em particular uma das seguintes:

  * Uma constante numérica do tipo `long` ou `double`.

  * Uma referência simbólica a uma constante computada dinamicamente cujo descritor de campo é `J` (denotando `long`) ou `D` (denotando `double`).

Se a entrada do pool de constantes em tempo de execução for uma constante numérica do tipo `long` ou `double`, então o _value_ dessa constante numérica é empilhado na pilha de operandos como um `long` ou `double`, respectivamente.

Caso contrário, a entrada do pool de constantes em tempo de execução é uma referência simbólica a uma constante computada dinamicamente. A referência simbólica é resolvida ([§5.4.3.6](<#/doc/jvms/jvms-05>)) e _value_, o resultado da resolução, é empilhado na pilha de operandos.

#### Exceções de Ligação

Durante a resolução de uma referência simbólica a uma constante computada dinamicamente, qualquer uma das exceções pertinentes à resolução de constante computada dinamicamente pode ser lançada.

#### Notas

Existe apenas uma versão de índice amplo da instrução _ldc2_w_; não há instrução _ldc2_ que empilhe um `long` ou `double` com um índice de byte único.

### _ldiv_

#### Operação

Divide `long`

#### Formato

_ldiv_

#### Formas

_ldiv_ = 109 (0x6d)

#### Pilha de Operandos

..., _value1_ , _value2_ ->

..., _result_

#### Descrição

Ambos _value1_ e _value2_ devem ser do tipo `long`. Os valores são removidos da pilha de operandos. O `long` _result_ é o valor da expressão da linguagem de programação Java _value1_ / _value2_. O _result_ é empilhado na pilha de operandos.

Uma divisão de `long` arredonda em direção a 0; ou seja, o quociente produzido para valores `long` em _n_ / _d_ é um valor `long` _q_ cuja magnitude é a maior possível, satisfazendo |_d_ ⋅ _q_ | ≤ |_n_ |. Além disso, _q_ é positivo quando |_n_ | ≥ |_d_ | e _n_ e _d_ têm o mesmo sinal, mas _q_ é negativo quando |_n_ | ≥ |_d_ | e _n_ e _d_ têm sinais opostos.

Existe um caso especial que não satisfaz esta regra: se o dividendo for o inteiro negativo de maior magnitude possível para o tipo `long` e o divisor for -1, então ocorre um overflow e o resultado é igual ao dividendo; apesar do overflow, nenhuma exceção é lançada neste caso.

#### Exceção em Tempo de Execução

Se o valor do divisor em uma divisão de `long` for 0, _ldiv_ lança uma `ArithmeticException`.

### _lload_

#### Operação

Carrega `long` de variável local

#### Formato

_lload_
_index_

#### Formas

_lload_ = 22 (0x16)

#### Pilha de Operandos

... ->

..., _value_

#### Descrição

O _index_ é um byte sem sinal. Ambos _index_ e _index_ +1 devem ser índices no array de variáveis locais do frame atual ([§2.6](<#/doc/jvms/jvms-02>)). A variável local em _index_ deve conter um `long`. O _value_ da variável local em _index_ é empilhado na pilha de operandos.

#### Notas

O opcode _lload_ pode ser usado em conjunto com a instrução _wide_ ([§ _wide_](<#/doc/jvms/jvms-06>)) para acessar uma variável local usando um índice sem sinal de dois bytes.

### _lload_ &lt;n&gt;_

#### Operação

Carrega `long` de variável local

#### Formato

_lload_ &lt;n&gt;_

#### Formas

_lload_0_ = 30 (0x1e)

_lload_1_ = 31 (0x1f)

_lload_2_ = 32 (0x20)

_lload_3_ = 33 (0x21)

#### Pilha de Operandos

... ->

..., _value_

#### Descrição

Ambos <_n_ > e <_n_ >+1 devem ser índices no array de variáveis locais do frame atual ([§2.6](<#/doc/jvms/jvms-02>)). A variável local em <_n_ > deve conter um `long`. O _value_ da variável local em <_n_ > é empilhado na pilha de operandos.

#### Notas

Cada uma das instruções _lload_ &lt;n&gt;_ é a mesma que _lload_ com um _index_ de <_n_ >, exceto que o operando <_n_ > é implícito.

### _lmul_

#### Operação

Multiplica `long`

#### Formato

_lmul_

#### Formas

_lmul_ = 105 (0x69)

#### Pilha de Operandos

..., _value1_ , _value2_ ->

..., _result_

#### Descrição

Ambos _value1_ e _value2_ devem ser do tipo `long`. Os valores são removidos da pilha de operandos. O `long` _result_ é _value1_ * _value2_. O _result_ é empilhado na pilha de operandos.

O resultado são os 64 bits de baixa ordem do verdadeiro resultado matemático em um formato de complemento de dois suficientemente amplo, representado como um valor do tipo `long`. Se ocorrer um overflow, o sinal do resultado pode não ser o mesmo que o sinal da multiplicação matemática dos dois valores.

Apesar do fato de que um overflow pode ocorrer, a execução de uma instrução _lmul_ nunca lança uma exceção em tempo de execução.

### _lneg_

#### Operação

Nega `long`

#### Formato

_lneg_

#### Formas

_lneg_ = 117 (0x75)

#### Pilha de Operandos

..., _value_ ->

..., _result_

#### Descrição

O _value_ deve ser do tipo `long`. Ele é removido da pilha de operandos. O `long` _result_ é a negação aritmética de _value_, -_value_. O _result_ é empilhado na pilha de operandos.

Para valores `long`, a negação é o mesmo que a subtração de zero. Como a Java Virtual Machine usa a representação de complemento de dois para inteiros e o intervalo de valores de complemento de dois não é simétrico, a negação do `long` negativo de maior valor resulta no mesmo número negativo máximo. Apesar do fato de que um overflow ocorreu, nenhuma exceção é lançada.

Para todos os valores `long` `x`, `-x` é igual a `(~x)+1`.

### _lookupswitch_

#### Operação

Acessa tabela de salto por correspondência de chave e salta

#### Formato

_lookupswitch_
_< 0-3 byte pad>_
_defaultbyte1_
_defaultbyte2_
_defaultbyte3_
_defaultbyte4_
_npairs1_
_npairs2_
_npairs3_
_npairs4_
_match-offset pairs..._

#### Formas

_lookupswitch_ = 171 (0xab)

#### Pilha de Operandos

..., _key_ ->

...

#### Descrição

Uma _lookupswitch_ é uma instrução de comprimento variável. Imediatamente após o opcode _lookupswitch_, entre zero e três bytes devem atuar como preenchimento (padding), de modo que _defaultbyte1_ comece em um endereço que seja um múltiplo de quatro bytes a partir do início do método atual (o opcode de sua primeira instrução). Imediatamente após o preenchimento, segue uma série de valores de 32 bits com sinal: _default_, _npairs_, e então _npairs_ pares de valores de 32 bits com sinal. O _npairs_ deve ser maior ou igual a 0. Cada um dos _npairs_ pares consiste em um `int` _match_ e um _offset_ de 32 bits com sinal. Cada um desses valores de 32 bits com sinal é construído a partir de quatro bytes sem sinal como (_byte1_ `<<` 24) | (_byte2_ `<<` 16) | (_byte3_ `<<` 8) | _byte4_.

A tabela de pares _match-offset_ da instrução _lookupswitch_ deve ser ordenada em ordem numérica crescente por _match_.

O _key_ deve ser do tipo `int` e é removido da pilha de operandos. O _key_ é comparado com os valores _match_. Se for igual a um deles, então um endereço de destino é calculado adicionando o _offset_ correspondente ao endereço do opcode desta instrução _lookupswitch_. Se o _key_ não corresponder a nenhum dos valores _match_, o endereço de destino é calculado adicionando _default_ ao endereço do opcode desta instrução _lookupswitch_. A execução então continua no endereço de destino.

O endereço de destino que pode ser calculado a partir do _offset_ de cada par _match-offset_, bem como aquele calculado a partir de _default_, deve ser o endereço de um opcode de uma instrução dentro do método que contém esta instrução _lookupswitch_.

#### Notas

O alinhamento exigido dos operandos de 4 bytes da instrução _lookupswitch_ garante o alinhamento de 4 bytes desses operandos se e somente se o método que contém a _lookupswitch_ estiver posicionado em um limite de 4 bytes.

Os pares _match-offset_ são ordenados para suportar rotinas de busca que são mais rápidas que a busca linear.

### _lor_

#### Operação

OR bit a bit de `long`

#### Formato

_lor_

#### Formas

_lor_ = 129 (0x81)

#### Pilha de Operandos

..., _value1_ , _value2_ ->

..., _result_

#### Descrição

Ambos _value1_ e _value2_ devem ser do tipo `long`. Eles são removidos da pilha de operandos. Um `long` _result_ é calculado realizando o OR inclusivo bit a bit de _value1_ e _value2_. O _result_ é empilhado na pilha de operandos.

### _lrem_

#### Operação

Resto de `long`

#### Formato

_lrem_

#### Formas

_lrem_ = 113 (0x71)

#### Pilha de Operandos

..., _value1_ , _value2_ ->

..., _result_

#### Descrição

Ambos _value1_ e _value2_ devem ser do tipo `long`. Os valores são removidos da pilha de operandos. O `long` _result_ é _value1_ \- (_value1_ / _value2_) * _value2_. O _result_ é empilhado na pilha de operandos.

O resultado da instrução _lrem_ é tal que `(a/b)*b + (a%b)` é igual a `a`. Esta identidade é válida mesmo no caso especial em que o dividendo é o `long` negativo de maior magnitude possível para seu tipo e o divisor é -1 (o resto é 0). Segue-se desta regra que o resultado da operação de resto pode ser negativo apenas se o dividendo for negativo e pode ser positivo apenas se o dividendo for positivo; além disso, a magnitude do resultado é sempre menor que a magnitude do divisor.

#### Exceção em Tempo de Execução

Se o valor do divisor para um operador de resto de `long` for 0, _lrem_ lança uma `ArithmeticException`.

### _lreturn_

#### Operação

Retorna `long` de método

#### Formato

_lreturn_

#### Formas

_lreturn_ = 173 (0xad)

#### Pilha de Operandos

..., _value_ ->

[vazia]

#### Descrição

O método atual deve ter tipo de retorno `long`. O _value_ deve ser do tipo `long`. Se o método atual for um método `synchronized`, o monitor entrado ou reentrado na invocação do método é atualizado e possivelmente saído como se pela execução de uma instrução _monitorexit_ ([§ _monitorexit_](<#/doc/jvms/jvms-06>)) na thread atual. Se nenhuma exceção for lançada, _value_ é removido da pilha de operandos do frame atual ([§2.6](<#/doc/jvms/jvms-02>)) e empilhado na pilha de operandos do frame do invocador. Quaisquer outros valores na pilha de operandos do método atual são descartados.

O interpretador então retorna o controle ao invocador do método, reinstaurando o frame do invocador.

#### Exceções em Tempo de Execução

Se a implementação da Java Virtual Machine não impuser as regras sobre travamento estruturado descritas em [§2.11.10](<#/doc/jvms/jvms-02>), então se o método atual for um método `synchronized` e a thread atual não for a proprietária do monitor entrado ou reentrado na invocação do método, _lreturn_ lança uma `IllegalMonitorStateException`. Isso pode acontecer, por exemplo, se um método `synchronized` contiver uma instrução _monitorexit_, mas nenhuma instrução _monitorenter_, no objeto no qual o método é `synchronized`.

Caso contrário, se a implementação da Java Virtual Machine impuser as regras sobre travamento estruturado descritas em [§2.11.10](<#/doc/jvms/jvms-02>) e se a primeira dessas regras for violada durante a invocação do método atual, então _lreturn_ lança uma `IllegalMonitorStateException`.

### _lshl_

#### Operação

Deslocamento à esquerda de `long`

#### Formato

_lshl_

#### Formas

_lshl_ = 121 (0x79)

#### Pilha de Operandos

..., _value1_ , _value2_ ->

..., _result_

#### Descrição

O _value1_ deve ser do tipo `long`, e _value2_ deve ser do tipo `int`. Os valores são removidos da pilha de operandos. Um `long` _result_ é calculado deslocando _value1_ para a esquerda por _s_ posições de bit, onde _s_ são os 6 bits de baixa ordem de _value2_. O _result_ é empilhado na pilha de operandos.

#### Notas

Isso é equivalente (mesmo que ocorra overflow) à multiplicação por 2 elevado à potência _s_. A distância de deslocamento realmente usada está, portanto, sempre no intervalo de 0 a 63, inclusive, como se _value2_ fosse submetido a um AND lógico bit a bit com o valor de máscara 0x3f.

### _lshr_

#### Operação

Deslocamento aritmético à direita de `long`

#### Formato

_lshr_

#### Formas

_lshr_ = 123 (0x7b)

#### Pilha de Operandos

..., _value1_ , _value2_ ->

..., _result_

#### Descrição

O _value1_ deve ser do tipo `long`, e _value2_ deve ser do tipo `int`. Os valores são removidos da pilha de operandos. Um `long` _result_ é calculado deslocando _value1_ para a direita por _s_ posições de bit, com extensão de sinal, onde _s_ é o valor dos 6 bits de baixa ordem de _value2_. O _result_ é empilhado na pilha de operandos.

#### Notas

O valor resultante é _floor_(_value1_ / 2 _s_), onde _s_ é _value2_ & 0x3f. Para _value1_ não negativo, isso é equivalente a truncar a divisão de `long` por 2 elevado à potência _s_. A distância de deslocamento realmente usada está, portanto, sempre no intervalo de 0 a 63, inclusive, como se _value2_ fosse submetido a um AND lógico bit a bit com o valor de máscara 0x3f.

### _lstore_

#### Operação

Armazena `long` em variável local

#### Formato

_lstore_
_index_

#### Formas

_lstore_ = 55 (0x37)

#### Pilha de Operandos

..., _value_ ->

...

#### Descrição

O _index_ é um byte sem sinal. Ambos _index_ e _index_ +1 devem ser índices no array de variáveis locais do frame atual ([§2.6](<#/doc/jvms/jvms-02>)). O _value_ no topo da pilha de operandos deve ser do tipo `long`. Ele é removido da pilha de operandos, e as variáveis locais em _index_ e _index_ +1 são definidas como _value_.

#### Notas

O opcode _lstore_ pode ser usado em conjunto com a instrução _wide_ ([§ _wide_](<#/doc/jvms/jvms-06>)) para acessar uma variável local usando um índice sem sinal de dois bytes.

### _lstore_ &lt;n&gt;_

#### Operação

Armazena `long` em variável local

#### Formato

_lstore_ &lt;n&gt;_

#### Formas

_lstore_0_ = 63 (0x3f)

_lstore_1_ = 64 (0x40)

_lstore_2_ = 65 (0x41)

_lstore_3_ = 66 (0x42)

#### Pilha de Operandos

..., _value_ ->

...

#### Descrição

Ambos <_n_ > e <_n_ >+1 devem ser índices no array de variáveis locais do frame atual ([§2.6](<#/doc/jvms/jvms-02>)). O _value_ no topo da pilha de operandos deve ser do tipo `long`. Ele é removido da pilha de operandos, e as variáveis locais em <_n_ > e <_n_ >+1 são definidas como _value_.

#### Notas

Cada uma das instruções _lstore_ &lt;n&gt;_ é a mesma que _lstore_ com um _index_ de <_n_ >, exceto que o operando <_n_ > é implícito.

### _lsub_

#### Operação

Subtrai `long`

#### Formato

_lsub_

#### Formas

_lsub_ = 101 (0x65)

#### Pilha de Operandos

..., _value1_ , _value2_ ->

..., _result_

#### Descrição

Ambos _value1_ e _value2_ devem ser do tipo `long`. Os valores são removidos da pilha de operandos. O `long` _result_ é _value1_ \- _value2_. O _result_ é empilhado na pilha de operandos.

Para subtração de `long`, `a-b` produz o mesmo resultado que `a+(-b)`. Para valores `long`, a subtração de zero é o mesmo que a negação.

O resultado são os 64 bits de baixa ordem do verdadeiro resultado matemático em um formato de complemento de dois suficientemente amplo, representado como um valor do tipo `long`. Se ocorrer um overflow, o sinal do resultado pode não ser o mesmo que o sinal da diferença matemática dos dois valores.

Apesar do fato de que um overflow pode ocorrer, a execução de uma instrução _lsub_ nunca lança uma exceção em tempo de execução.

### _lushr_

#### Operação

Deslocamento lógico à direita de `long`

#### Formato

_lushr_

#### Formas

_lushr_ = 125 (0x7d)

#### Pilha de Operandos

..., _value1_ , _value2_ ->

..., _result_

#### Descrição

O _value1_ deve ser do tipo `long`, e _value2_ deve ser do tipo `int`. Os valores são removidos da pilha de operandos. Um `long` _result_ é calculado deslocando _value1_ para a direita logicamente por _s_ posições de bit, com extensão de zero, onde _s_ é o valor dos 6 bits de baixa ordem de _value2_. O _result_ é empilhado na pilha de operandos.

#### Notas

Se _value1_ for positivo e _s_ for _value2_ & 0x3f, o resultado é o mesmo que o de _value1_ `>>` _s_; se _value1_ for negativo, o resultado é igual ao valor da expressão (_value1_ `>>` _s_) + (2L `<<` ~_s_). A adição do termo (2L `<<` ~_s_) cancela o bit de sinal propagado. A distância de deslocamento realmente usada está sempre no intervalo de 0 a 63, inclusive.

### _lxor_

#### Operação

XOR bit a bit de `long`

#### Formato

_lxor_

#### Formas

_lxor_ = 131 (0x83)

#### Pilha de Operandos

..., _value1_ , _value2_ ->

..., _result_

#### Descrição

Ambos _value1_ e _value2_ devem ser do tipo `long`. Eles são removidos da pilha de operandos. Um `long` _result_ é calculado realizando o OR exclusivo bit a bit de _value1_ e _value2_. O _result_ é empilhado na pilha de operandos.

### _monitorenter_

#### Operação

Entra no monitor para objeto

#### Formato

_monitorenter_

#### Formas

_monitorenter_ = 194 (0xc2)

#### Pilha de Operandos

..., _objectref_ ->

...

#### Descrição

O _objectref_ deve ser do tipo `reference`.

Cada objeto está associado a um monitor. Um monitor é travado se e somente se tiver um proprietário. A thread que executa _monitorenter_ tenta obter a propriedade do monitor associado a _objectref_, da seguinte forma:

  * Se a contagem de entrada do monitor associado a _objectref_ for zero, a thread entra no monitor e define sua contagem de entrada para um. A thread é então a proprietária do monitor.

  * Se a thread já possui o monitor associado a _objectref_, ela reentra no monitor, incrementando sua contagem de entrada.

  * Se outra thread já possui o monitor associado a _objectref_, a thread bloqueia até que a contagem de entrada do monitor seja zero, então tenta novamente obter a propriedade.

#### Exceção em Tempo de Execução

Se _objectref_ for `null`, _monitorenter_ lança uma `NullPointerException`.

#### Notas

Uma instrução _monitorenter_ pode ser usada com uma ou mais instruções _monitorexit_ ([§ _monitorexit_](<#/doc/jvms/jvms-06>)) para implementar uma declaração `synchronized` na linguagem de programação Java ([§3.14](<#/doc/jvms/jvms-03>)). As instruções _monitorenter_ e _monitorexit_ não são usadas na implementação de métodos `synchronized`, embora possam ser usadas para fornecer semânticas de travamento equivalentes. A entrada no monitor na invocação de um método `synchronized`, e a saída do monitor em seu retorno, são tratadas implicitamente pelas instruções de invocação e retorno de método da Java Virtual Machine, como se _monitorenter_ e _monitorexit_ fossem usados.

A associação de um monitor a um objeto pode ser gerenciada de várias maneiras que estão além do escopo desta especificação. Por exemplo, o monitor pode ser alocado e desalocado ao mesmo tempo que o objeto. Alternativamente, ele pode ser alocado dinamicamente no momento em que uma thread tenta obter acesso exclusivo ao objeto e liberado em algum momento posterior, quando nenhuma thread permanece no monitor para o objeto.

As construções de sincronização da linguagem de programação Java exigem suporte para operações em monitores além da entrada e saída. Isso inclui esperar em um monitor (`Object.wait`) e notificar outras threads esperando em um monitor (`Object.notifyAll` e `Object.notify`). Essas operações são suportadas no pacote padrão `java.lang` fornecido com a Java Virtual Machine. Nenhum suporte explícito para essas operações aparece no conjunto de instruções da Java Virtual Machine.

### _monitorexit_

#### Operação

Sai do monitor para objeto

#### Formato

_monitorexit_

#### Formas

_monitorexit_ = 195 (0xc3)

#### Pilha de Operandos

..., _objectref_ ->

...

#### Descrição

A thread que executa _monitorexit_ deve ser a proprietária do monitor associado à instância referenciada por _objectref_.

A thread decrementa a contagem de entrada do monitor associado a _objectref_. Se, como resultado, o valor da contagem de entrada for zero, a thread sai do monitor e não é mais sua proprietária. Outras threads que estão bloqueando para entrar no monitor são permitidas a tentar fazê-lo.

#### Exceções em Tempo de Execução

Se _objectref_ for `null`, _monitorexit_ lança uma `NullPointerException`.

Caso contrário, se a thread que executa _monitorexit_ não for a proprietária do monitor associado à instância referenciada por _objectref_, _monitorexit_ lança uma `IllegalMonitorStateException`.

Caso contrário, se a implementação da Java Virtual Machine impuser as regras sobre travamento estruturado descritas em [§2.11.10](<#/doc/jvms/jvms-02>) e se a segunda dessas regras for violada pela execução desta instrução _monitorexit_, então _monitorexit_ lança uma `IllegalMonitorStateException`.

#### Notas

Uma ou mais instruções _monitorexit_ podem ser usadas com uma instrução _monitorenter_ ([§ _monitorenter_](<#/doc/jvms/jvms-06>)) para implementar uma declaração `synchronized` na linguagem de programação Java ([§3.14](<#/doc/jvms/jvms-03>)). As instruções _monitorenter_ e _monitorexit_ não são usadas na implementação de métodos `synchronized`, embora possam ser usadas para fornecer semânticas de travamento equivalentes.

A Java Virtual Machine suporta exceções lançadas dentro de métodos `synchronized` e declarações `synchronized` de forma diferente:

  * A saída do monitor na conclusão normal de um método `synchronized` é tratada pelas instruções de retorno da Java Virtual Machine. A saída do monitor na conclusão abrupta de um método `synchronized` é tratada implicitamente pela instrução _athrow_ da Java Virtual Machine.

  * Quando uma exceção é lançada de dentro de uma declaração `synchronized`, a saída do monitor entrado antes da execução da declaração `synchronized` é alcançada usando o mecanismo de tratamento de exceções da Java Virtual Machine ([§3.14](<#/doc/jvms/jvms-03>)).

### _multianewarray_

#### Operação

Cria novo array multidimensional

#### Formato

_multianewarray_
_indexbyte1_
_indexbyte2_
_dimensions_

#### Formas

_multianewarray_ = 197 (0xc5)

#### Pilha de Operandos

..., _count1_ , [_count2_ , ...] ->

..., _arrayref_

#### Descrição

O operando _dimensions_ é um byte sem sinal que deve ser maior ou igual a 1. Ele representa o número de dimensões do array a ser criado. A pilha de operandos deve conter _dimensions_ valores. Cada um desses valores representa o número de componentes em uma dimensão do array a ser criado, deve ser do tipo `int` e deve ser não negativo. O _count1_ é o comprimento desejado na primeira dimensão, _count2_ na segunda, etc.

Todos os valores _count_ são removidos da pilha de operandos. Os _indexbyte1_ e _indexbyte2_ sem sinal são usados para construir um índice no pool de constantes em tempo de execução da classe atual ([§2.6](<#/doc/jvms/jvms-02>)), onde o valor do índice é (_indexbyte1_ `<<` 8) | _indexbyte2_. A entrada do pool de constantes em tempo de execução no índice deve ser uma referência simbólica a uma classe, array ou tipo de interface. A classe, array ou tipo de interface nomeado é resolvido ([§5.4.3.1](<#/doc/jvms/jvms-05>)). A entrada resultante deve ser um tipo de classe de array com dimensionalidade maior ou igual a _dimensions_.

Um novo array multidimensional do tipo de array é alocado do heap gerenciado pelo garbage collector. Se qualquer valor _count_ for zero, nenhuma dimensão subsequente é alocada. Os componentes do array na primeira dimensão são inicializados para subarrays do tipo da segunda dimensão, e assim por diante. Os componentes da última dimensão alocada do array são inicializados para o valor inicial padrão ([§2.3](<#/doc/jvms/jvms-02>), [§2.4](<#/doc/jvms/jvms-02>)) para o tipo de elemento do tipo de array. Uma `reference` _arrayref_ para o novo array é empilhada na pilha de operandos.

#### Exceções de Ligação

Durante a resolução da referência simbólica para a classe, array ou tipo de interface, qualquer uma das exceções documentadas em [§5.4.3.1](<#/doc/jvms/jvms-05>) pode ser lançada.

Caso contrário, se a classe atual não tiver permissão para acessar o tipo de elemento da classe de array resolvida, _multianewarray_ lança um `IllegalAccessError`.

#### Exceção em Tempo de Execução

Caso contrário, se qualquer um dos valores _dimensions_ na pilha de operandos for menor que zero, a instrução _multianewarray_ lança uma `NegativeArraySizeException`.

#### Notas

Pode ser mais eficiente usar _newarray_ ou _anewarray_ ([§ _newarray_](<#/doc/jvms/jvms-06>), [§ _anewarray_](<#/doc/jvms/jvms-06>)) ao criar um array de uma única dimensão.
A classe de array referenciada através do pool de constantes em tempo de execução pode ter mais dimensões do que o operando _dimensions_ da instrução _multianewarray_. Nesse caso, apenas as primeiras _dimensions_ das dimensões do array são criadas.

### _new_

#### Operation

Cria novo objeto

#### Format

```
_new_
_indexbyte1_
_indexbyte2_
```

#### Forms

_new_ = 187 (0xbb)

#### Operand Stack

... ->

..., _objectref_

#### Description

Os _indexbyte1_ e _indexbyte2_ não assinados são usados para construir um índice no pool de constantes em tempo de execução da classe atual ([§2.6](<#/doc/jvms/jvms-02>)), onde o valor do índice é (_indexbyte1_ `<<` 8) | _indexbyte2_. A entrada do pool de constantes em tempo de execução no índice deve ser uma referência simbólica a um tipo de classe ou interface. O tipo de classe ou interface nomeado é resolvido ([§5.4.3.1](<#/doc/jvms/jvms-05>)) e deve resultar em um tipo de classe. A memória para uma nova instância dessa classe é alocada do heap com garbage collector, e as variáveis de instância do novo objeto são inicializadas com seus valores iniciais padrão ([§2.3](<#/doc/jvms/jvms-02>), [§2.4](<#/doc/jvms/jvms-02>)). O _objectref_ , uma `reference` para a instância, é empilhado na pilha de operandos.

Após a resolução bem-sucedida da classe, ela é inicializada se ainda não tiver sido inicializada ([§5.5](<#/doc/jvms/jvms-05>)).

#### Linking Exceptions

Durante a resolução da referência simbólica ao tipo de classe ou interface, qualquer uma das exceções documentadas em [§5.4.3.1](<#/doc/jvms/jvms-05>) pode ser lançada.

Caso contrário, se a referência simbólica ao tipo de classe ou interface resolver para uma interface ou uma classe `abstract`, _new_ lança um `InstantiationError`.

#### Run-time Exception

Caso contrário, se a execução desta instrução _new_ causar a inicialização da classe referenciada, _new_ pode lançar um `Error` conforme detalhado em JLS §15.9.4.

#### Notes

A instrução _new_ não cria completamente uma nova instância; a criação da instância não é concluída até que um método de inicialização de instância ([§2.9.1](<#/doc/jvms/jvms-02>)) tenha sido invocado na instância não inicializada.

### _newarray_

#### Operation

Cria novo array

#### Format

```
_newarray_
_atype_
```

#### Forms

_newarray_ = 188 (0xbc)

#### Operand Stack

..., _count_ ->

..., _arrayref_

#### Description

O _count_ deve ser do tipo `int`. Ele é desempilhado da pilha de operandos. O _count_ representa o número de elementos no array a ser criado.

O _atype_ é um código que indica o tipo de array a ser criado. Ele deve assumir um dos seguintes valores:

**Table 6.5.newarray-A. Array type codes**

| Array Type | _atype_ |
| :--------- | :------ |
| `T_BOOLEAN` | 4 |
| `T_CHAR` | 5 |
| `T_FLOAT` | 6 |
| `T_DOUBLE` | 7 |
| `T_BYTE` | 8 |
| `T_SHORT` | 9 |
| `T_INT` | 10 |
| `T_LONG` | 11 |

Um novo array cujos componentes são do tipo _atype_ e de comprimento _count_ é alocado do heap com garbage collector. Uma `reference` _arrayref_ para este novo objeto array é empilhada na pilha de operandos. Cada um dos elementos do novo array é inicializado com o valor inicial padrão ([§2.3](<#/doc/jvms/jvms-02>), [§2.4](<#/doc/jvms/jvms-02>)) para o tipo de elemento do tipo de array.

#### Run-time Exception

Se _count_ for menor que zero, _newarray_ lança uma `NegativeArraySizeException`.

#### Notes

Na implementação da Java Virtual Machine da Oracle, arrays do tipo `boolean` (_atype_ é `T_BOOLEAN`) são armazenados como arrays de valores de 8 bits e são manipulados usando as instruções _baload_ e _bastore_ ([§ _baload_](<#/doc/jvms/jvms-06>), [§ _bastore_](<#/doc/jvms/jvms-06>)) que também acessam arrays do tipo `byte`. Outras implementações podem implementar arrays `boolean` compactados; as instruções _baload_ e _bastore_ ainda devem ser usadas para acessar esses arrays.

### _nop_

#### Operation

Não faz nada

#### Format

```
_nop_
```

#### Forms

_nop_ = 0 (0x0)

#### Operand Stack

Nenhuma alteração

#### Description

Não faz nada.

### _pop_

#### Operation

Desempilha o valor superior da pilha de operandos

#### Format

```
_pop_
```

#### Forms

_pop_ = 87 (0x57)

#### Operand Stack

..., _value_ ->

...

#### Description

Desempilha o valor superior da pilha de operandos.

A instrução _pop_ não deve ser usada a menos que _value_ seja um valor de um tipo computacional de categoria 1 ([§2.11.1](<#/doc/jvms/jvms-02>)).

### _pop2_

#### Operation

Desempilha o(s) um ou dois valores superiores da pilha de operandos

#### Format

```
_pop2_
```

#### Forms

_pop2_ = 88 (0x58)

#### Operand Stack

Form 1:

..., _value2_ , _value1_ ->

...

onde cada um de _value1_ e _value2_ é um valor de um tipo computacional de categoria 1 ([§2.11.1](<#/doc/jvms/jvms-02>)).

Form 2:

..., _value_ ->

...

onde _value_ é um valor de um tipo computacional de categoria 2 ([§2.11.1](<#/doc/jvms/jvms-02>)).

#### Description

Desempilha o(s) um ou dois valores superiores da pilha de operandos.

### _putfield_

#### Operation

Define campo em objeto

#### Format

```
_putfield_
_indexbyte1_
_indexbyte2_
```

#### Forms

_putfield_ = 181 (0xb5)

#### Operand Stack

..., _objectref_ , _value_ ->

...

#### Description

Os _indexbyte1_ e _indexbyte2_ não assinados são usados para construir um índice no pool de constantes em tempo de execução da classe atual ([§2.6](<#/doc/jvms/jvms-02>)), onde o valor do índice é (_indexbyte1_ `<<` 8) | _indexbyte2_. A entrada do pool de constantes em tempo de execução no índice deve ser uma referência simbólica a um campo ([§5.1](<#/doc/jvms/jvms-05>)), que fornece o nome e o descritor do campo, bem como uma referência simbólica à classe na qual o campo deve ser encontrado. O campo referenciado é resolvido ([§5.4.3.2](<#/doc/jvms/jvms-05>)).

O tipo de um _value_ armazenado por uma instrução _putfield_ deve ser compatível com o descritor do campo referenciado ([§4.3.2](<#/doc/jvms/jvms-04>)). Se o tipo do descritor do campo for `boolean`, `byte`, `char`, `short` ou `int`, então o _value_ deve ser um `int`. Se o tipo do descritor do campo for `float`, `long` ou `double`, então o _value_ deve ser um `float`, `long` ou `double`, respectivamente. Se o tipo do descritor do campo for um tipo de classe ou um tipo de array, então o _value_ deve ser um valor do tipo do descritor do campo. Se o campo for `final`, ele deve ser declarado na classe atual, e a instrução deve ocorrer em um método de inicialização de instância da classe atual ([§2.9.1](<#/doc/jvms/jvms-02>)).

O _value_ e o _objectref_ são desempilhados da pilha de operandos.

O _objectref_ deve ser do tipo `reference`, mas não um tipo de array.

Se o _value_ for do tipo `int` e o tipo do descritor do campo for um de `byte`, `char`, `short` ou `boolean`, então o _value_ `int` é convertido para o tipo do descritor do campo da seguinte forma. Se o tipo do descritor do campo for `byte`, `char` ou `short`, então o _value_ `int` é truncado para um valor do tipo do descritor do campo, _value_ '. Se o tipo do descritor do campo for `boolean`, então o _value_ `int` é reduzido pegando o AND bit a bit de _value_ e 1, resultando em _value_ '. O campo referenciado em _objectref_ é definido como _value_ '.

Caso contrário, o campo referenciado em _objectref_ é definido como _value_.

#### Linking Exceptions

Durante a resolução da referência simbólica ao campo, qualquer uma das exceções pertinentes à resolução de campo ([§5.4.3.2](<#/doc/jvms/jvms-05>)) pode ser lançada.

Caso contrário, se o campo resolvido for um campo `static`, _putfield_ lança um `IncompatibleClassChangeError`.

Caso contrário, se o campo resolvido for `final`, ele deve ser declarado na classe atual, e a instrução deve ocorrer em um método de inicialização de instância da classe atual. Caso contrário, um `IllegalAccessError` é lançado.

#### Run-time Exception

Caso contrário, se _objectref_ for `null`, a instrução _putfield_ lança uma `NullPointerException`.

### _putstatic_

#### Operation

Define campo static em classe

#### Format

```
_putstatic_
_indexbyte1_
_indexbyte2_
```

#### Forms

_putstatic_ = 179 (0xb3)

#### Operand Stack

..., _value_ ->

...

#### Description

Os _indexbyte1_ e _indexbyte2_ não assinados são usados para construir um índice no pool de constantes em tempo de execução da classe atual ([§2.6](<#/doc/jvms/jvms-02>)), onde o valor do índice é (_indexbyte1_ `<<` 8) | _indexbyte2_. A entrada do pool de constantes em tempo de execução no índice deve ser uma referência simbólica a um campo ([§5.1](<#/doc/jvms/jvms-05>)), que fornece o nome e o descritor do campo, bem como uma referência simbólica à classe ou interface na qual o campo deve ser encontrado. O campo referenciado é resolvido ([§5.4.3.2](<#/doc/jvms/jvms-05>)).

Após a resolução bem-sucedida do campo, a classe ou interface que declarou o campo resolvido é inicializada se essa classe ou interface ainda não tiver sido inicializada ([§5.5](<#/doc/jvms/jvms-05>)).

O tipo de um _value_ armazenado por uma instrução _putstatic_ deve ser compatível com o descritor do campo referenciado ([§4.3.2](<#/doc/jvms/jvms-04>)). Se o tipo do descritor do campo for `boolean`, `byte`, `char`, `short` ou `int`, então o _value_ deve ser um `int`. Se o tipo do descritor do campo for `float`, `long` ou `double`, então o _value_ deve ser um `float`, `long` ou `double`, respectivamente. Se o tipo do descritor do campo for um tipo de classe ou um tipo de array, então o _value_ deve ser um valor do tipo do descritor do campo. Se o campo for `final`, ele deve ser declarado na classe ou interface atual, e a instrução deve ocorrer no método de inicialização de classe ou interface da classe ou interface atual ([§2.9.2](<#/doc/jvms/jvms-02>)).

O _value_ é desempilhado da pilha de operandos.

Se o _value_ for do tipo `int` e o tipo do descritor do campo for um de `byte`, `char`, `short` ou `boolean`, então o _value_ `int` é convertido para o tipo do descritor do campo da seguinte forma. Se o tipo do descritor do campo for `byte`, `char` ou `short`, então o _value_ `int` é truncado para um valor do tipo do descritor do campo, _value_ '. Se o tipo do descritor do campo for `boolean`, então o _value_ `int` é reduzido pegando o AND bit a bit de _value_ e 1, resultando em _value_ '. O campo referenciado na classe ou interface é definido como _value_ '.

Caso contrário, o campo referenciado na classe ou interface é definido como _value_.

#### Linking Exceptions

Durante a resolução da referência simbólica ao campo de classe ou interface, qualquer uma das exceções pertinentes à resolução de campo ([§5.4.3.2](<#/doc/jvms/jvms-05>)) pode ser lançada.

Caso contrário, se o campo resolvido não for um campo `static` (de classe) ou um campo de interface, _putstatic_ lança um `IncompatibleClassChangeError`.

Caso contrário, se o campo resolvido for `final`, ele deve ser declarado na classe ou interface atual, e a instrução deve ocorrer no método de inicialização de classe ou interface da classe ou interface atual. Caso contrário, um `IllegalAccessError` é lançado.

#### Run-time Exception

Caso contrário, se a execução desta instrução _putstatic_ causar a inicialização da classe ou interface referenciada, _putstatic_ pode lançar um `Error` conforme detalhado em [§5.5](<#/doc/jvms/jvms-05>).

#### Notes

Uma instrução _putstatic_ pode ser usada apenas para definir o valor de um campo de interface na inicialização desse campo. Campos de interface podem ser atribuídos apenas uma vez, na execução de uma expressão de inicialização de variável de interface quando a interface é inicializada ([§5.5](<#/doc/jvms/jvms-05>), JLS §9.3.1).

### _ret_

#### Operation

Retorna de sub-rotina

#### Format

```
_ret_
_index_
```

#### Forms

_ret_ = 169 (0xa9)

#### Operand Stack

Nenhuma alteração

#### Description

O _index_ é um byte não assinado entre 0 e 255, inclusive. A variável local em _index_ no frame atual ([§2.6](<#/doc/jvms/jvms-02>)) deve conter um valor do tipo `returnAddress`. O conteúdo da variável local é escrito no registrador `pc` da Java Virtual Machine, e a execução continua a partir daí.

#### Notes

Note que _jsr_ ([§ _jsr_](<#/doc/jvms/jvms-06>)) empilha o endereço na pilha de operandos e _ret_ o retira de uma variável local. Essa assimetria é intencional.

Na implementação da Oracle de um compilador para a linguagem de programação Java antes do Java SE 6, a instrução _ret_ era usada com as instruções _jsr_ e _jsr_w_ ([§ _jsr_](<#/doc/jvms/jvms-06>), [§ _jsr_w_](<#/doc/jvms/jvms-06>)) na implementação da cláusula `finally` ([§3.13](<#/doc/jvms/jvms-03>), [§4.10.2.5](<#/doc/jvms/jvms-04>)).

A instrução _ret_ não deve ser confundida com a instrução _return_ ([§ _return_](<#/doc/jvms/jvms-06>)). Uma instrução _return_ retorna o controle de um método para seu invocador, sem passar nenhum valor de volta ao invocador.

O opcode _ret_ pode ser usado em conjunto com a instrução _wide_ ([§ _wide_](<#/doc/jvms/jvms-06>)) para acessar uma variável local usando um índice não assinado de dois bytes.

### _return_

#### Operation

Retorna `void` de método

#### Format

```
_return_
```

#### Forms

_return_ = 177 (0xb1)

#### Operand Stack

... ->

[vazio]

#### Description

O método atual deve ter tipo de retorno `void`. Se o método atual for um método `synchronized`, o monitor entrado ou reentrado na invocação do método é atualizado e possivelmente saído como se pela execução de uma instrução _monitorexit_ ([§ _monitorexit_](<#/doc/jvms/jvms-06>)) na thread atual. Se nenhuma exceção for lançada, quaisquer valores na pilha de operandos do frame atual ([§2.6](<#/doc/jvms/jvms-02>)) são descartados.

O interpretador então retorna o controle ao invocador do método, restabelecendo o frame do invocador.

#### Run-time Exceptions

Se a implementação da Java Virtual Machine não impuser as regras sobre travamento estruturado descritas em [§2.11.10](<#/doc/jvms/jvms-02>), então, se o método atual for um método `synchronized` e a thread atual não for a proprietária do monitor entrado ou reentrado na invocação do método, _return_ lança uma `IllegalMonitorStateException`. Isso pode acontecer, por exemplo, se um método `synchronized` contiver uma instrução _monitorexit_, mas nenhuma instrução _monitorenter_, no objeto no qual o método é `synchronized`.

Caso contrário, se a implementação da Java Virtual Machine impuser as regras sobre travamento estruturado descritas em [§2.11.10](<#/doc/jvms/jvms-02>) e se a primeira dessas regras for violada durante a invocação do método atual, então _return_ lança uma `IllegalMonitorStateException`.

### _saload_

#### Operation

Carrega `short` de array

#### Format

```
_saload_
```

#### Forms

_saload_ = 53 (0x35)

#### Operand Stack

..., _arrayref_ , _index_ ->

..., _value_

#### Description

O _arrayref_ deve ser do tipo `reference` e deve referir-se a um array cujos componentes são do tipo `short`. O _index_ deve ser do tipo `int`. Ambos _arrayref_ e _index_ são desempilhados da pilha de operandos. O componente do array em _index_ é recuperado e estendido por sinal para um _value_ `int`. Esse _value_ é empilhado na pilha de operandos.

#### Run-time Exceptions

Se _arrayref_ for `null`, _saload_ lança uma `NullPointerException`.

Caso contrário, se _index_ não estiver dentro dos limites do array referenciado por _arrayref_ , a instrução _saload_ lança uma `ArrayIndexOutOfBoundsException`.

### _sastore_

#### Operation

Armazena em array de `short`

#### Format

```
_sastore_
```

#### Forms

_sastore_ = 86 (0x56)

#### Operand Stack

..., _arrayref_ , _index_ , _value_ ->

...

#### Description

O _arrayref_ deve ser do tipo `reference` e deve referir-se a um array cujos componentes são do tipo `short`. Ambos _index_ e _value_ devem ser do tipo `int`. O _arrayref_ , _index_ e _value_ são desempilhados da pilha de operandos. O _value_ `int` é truncado para um `short` e armazenado como o componente do array indexado por _index_.

#### Run-time Exceptions

Se _arrayref_ for `null`, _sastore_ lança uma `NullPointerException`.

Caso contrário, se _index_ não estiver dentro dos limites do array referenciado por _arrayref_ , a instrução _sastore_ lança uma `ArrayIndexOutOfBoundsException`.

### _sipush_

#### Operation

Empilha `short`

#### Format

```
_sipush_
_byte1_
_byte2_
```

#### Forms

_sipush_ = 17 (0x11)

#### Operand Stack

... ->

..., _value_

#### Description

Os valores imediatos não assinados _byte1_ e _byte2_ são montados em um `short` intermediário, onde o valor do `short` é (_byte1_ `<<` 8) | _byte2_. O valor intermediário é então estendido por sinal para um _value_ `int`. Esse _value_ é empilhado na pilha de operandos.

### _swap_

#### Operation

Troca os dois valores superiores da pilha de operandos

#### Format

```
_swap_
```

#### Forms

_swap_ = 95 (0x5f)

#### Operand Stack

..., _value2_ , _value1_ ->

..., _value1_ , _value2_

#### Description

Troca os dois valores superiores na pilha de operandos.

A instrução _swap_ não deve ser usada a menos que _value1_ e _value2_ sejam ambos valores de um tipo computacional de categoria 1 ([§2.11.1](<#/doc/jvms/jvms-02>)).

#### Notes

A Java Virtual Machine não fornece uma instrução que implemente uma troca em operandos de tipos computacionais de categoria 2.

### _tableswitch_

#### Operation

Acessa tabela de saltos por índice e salta

#### Format

```
_tableswitch_
_< 0-3 byte pad>_
_defaultbyte1_
_defaultbyte2_
_defaultbyte3_
_defaultbyte4_
_lowbyte1_
_lowbyte2_
_lowbyte3_
_lowbyte4_
_highbyte1_
_highbyte2_
_highbyte3_
_highbyte4_
_jump  offsets..._
```

#### Forms

_tableswitch_ = 170 (0xaa)

#### Operand Stack

..., _index_ ->

...

#### Description

Uma _tableswitch_ é uma instrução de comprimento variável. Imediatamente após o opcode _tableswitch_, entre zero e três bytes devem atuar como preenchimento, de modo que _defaultbyte1_ comece em um endereço que seja um múltiplo de quatro bytes a partir do início do método atual (o opcode de sua primeira instrução). Imediatamente após o preenchimento, há bytes que constituem três valores assinados de 32 bits: _default_ , _low_ e _high_. Imediatamente a seguir, há bytes que constituem uma série de _high_ \- _low_ \+ 1 offsets assinados de 32 bits. O valor _low_ deve ser menor ou igual a _high_. Os _high_ \- _low_ \+ 1 offsets assinados de 32 bits são tratados como uma tabela de saltos baseada em 0. Cada um desses valores assinados de 32 bits é construído como (_byte1_ `<<` 24) | (_byte2_ `<<` 16) | (_byte3_ `<<` 8) | _byte4_.

O _index_ deve ser do tipo `int` e é desempilhado da pilha de operandos. Se _index_ for menor que _low_ ou _index_ for maior que _high_ , então um endereço de destino é calculado adicionando _default_ ao endereço do opcode desta instrução _tableswitch_. Caso contrário, o offset na posição _index_ \- _low_ da tabela de saltos é extraído. O endereço de destino é calculado adicionando esse offset ao endereço do opcode desta instrução _tableswitch_. A execução então continua no endereço de destino.

O endereço de destino que pode ser calculado a partir de cada offset da tabela de saltos, bem como aquele que pode ser calculado a partir de _default_ , deve ser o endereço de um opcode de uma instrução dentro do método que contém esta instrução _tableswitch_.

#### Notes

O alinhamento exigido dos operandos de 4 bytes da instrução _tableswitch_ garante o alinhamento de 4 bytes desses operandos se e somente se o método que contém a _tableswitch_ começar em um limite de 4 bytes.

### _wide_

#### Operation

Estende o índice da variável local por bytes adicionais

#### Format 1

```
_wide_
_< opcode>_
_indexbyte1_
_indexbyte2_
```

onde _< opcode>_ é um de _iload_ , _fload_ , _aload_ , _lload_ , _dload_ , _istore_ , _fstore_ , _astore_ , _lstore_ , _dstore_ , ou _ret_

#### Format 2

```
_wide_
_iinc_
_indexbyte1_
_indexbyte2_
_constbyte1_
_constbyte2_
```

#### Forms

_wide_ = 196 (0xc4)

#### Operand Stack

O mesmo que a instrução modificada

#### Description

A instrução _wide_ modifica o comportamento de outra instrução. Ela assume um de dois formatos, dependendo da instrução que está sendo modificada. A primeira forma da instrução _wide_ modifica uma das instruções _iload_ , _fload_ , _aload_ , _lload_ , _dload_ , _istore_ , _fstore_ , _astore_ , _lstore_ , _dstore_ , ou _ret_ ([§ _iload_](<#/doc/jvms/jvms-06>), [§ _fload_](<#/doc/jvms/jvms-06>), [§ _aload_](<#/doc/jvms/jvms-06>), [§ _lload_](<#/doc/jvms/jvms-06>), [§ _dload_](<#/doc/jvms/jvms-06>), [§ _istore_](<#/doc/jvms/jvms-06>), [§ _fstore_](<#/doc/jvms/jvms-06>), [§ _astore_](<#/doc/jvms/jvms-06>), [§ _lstore_](<#/doc/jvms/jvms-06>), [§ _dstore_](<#/doc/jvms/jvms-06>), [§ _ret_](<#/doc/jvms/jvms-06>)). A segunda forma se aplica apenas à instrução _iinc_ ([§ _iinc_](<#/doc/jvms/jvms-06>)).

Em ambos os casos, o próprio opcode _wide_ é seguido no código compilado pelo opcode da instrução que _wide_ modifica. Em qualquer uma das formas, dois bytes não assinados _indexbyte1_ e _indexbyte2_ seguem o opcode modificado e são montados em um índice não assinado de 16 bits para uma variável local no frame atual ([§2.6](<#/doc/jvms/jvms-02>)), onde o valor do índice é (_indexbyte1_ `<<` 8) | _indexbyte2_. O índice calculado deve ser um índice no array de variáveis locais do frame atual. Onde a instrução _wide_ modifica uma instrução _lload_ , _dload_ , _lstore_ ou _dstore_ , o índice seguinte ao índice calculado (index + 1) também deve ser um índice no array de variáveis locais. Na segunda forma, dois bytes imediatos não assinados _constbyte1_ e _constbyte2_ seguem _indexbyte1_ e _indexbyte2_ no fluxo de código. Esses bytes também são montados em uma constante assinada de 16 bits, onde a constante é (_constbyte1_ `<<` 8) | _constbyte2_.

O bytecode estendido opera normalmente, exceto pelo uso do índice mais amplo e, no caso da segunda forma, o maior intervalo de incremento.

#### Notes

Embora digamos que _wide_ "modifica o comportamento de outra instrução", a instrução _wide_ efetivamente trata os bytes que constituem a instrução modificada como operandos, desnaturando a instrução embutida no processo. No caso de uma instrução _iinc_ modificada, um dos operandos lógicos do _iinc_ nem mesmo está no offset normal do opcode. A instrução embutida nunca deve ser executada diretamente; seu opcode nunca deve ser o alvo de qualquer instrução de transferência de controle.

---

[Anterior](<#/doc/jvms/jvms-05>) | | [Próximo](<#/doc/jvms/jvms-07>)
---|---|---
Capítulo 5. Carregamento, Vinculação e Inicialização | [Início](<#/doc/jvms/jvms-01>) | Capítulo 7. Mnemônicos de Opcodes por Opcode

---

[ Aviso Legal ](<#/>)