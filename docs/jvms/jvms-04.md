# O Formato de Arquivo class

[Java SE](<https://docs.oracle.com/en/java/javase/25/>) > [Java SE Specifications](<#/>) > [Java Virtual Machine Specification](<#/doc/jvms/jvms-01>)

Capítulo 4. O Formato de Arquivo `class`
---
[Anterior](<#/doc/jvms/jvms-03>) | | [Próximo](<#/doc/jvms/jvms-05>)
  
* * *

# Capítulo 4. O Formato de Arquivo `class`

**Sumário**

[4.1. A Estrutura `ClassFile`](<#/doc/jvms/jvms-04>)
[4.2. Nomes](<#/doc/jvms/jvms-04>)
    

[4.2.1. Nomes Binários de Classes e Interfaces](<#/doc/jvms/jvms-04>)
[4.2.2. Nomes Não Qualificados](<#/doc/jvms/jvms-04>)
[4.2.3. Nomes de Módulos e Pacotes](<#/doc/jvms/jvms-04>)
[4.3. Descritores](<#/doc/jvms/jvms-04>)
    

[4.3.1. Notação de Gramática](<#/doc/jvms/jvms-04>)
[4.3.2. Descritores de Campo](<#/doc/jvms/jvms-04>)
[4.3.3. Descritores de Método](<#/doc/jvms/jvms-04>)
[4.4. O Pool de Constantes](<#/doc/jvms/jvms-04>)
    

[4.4.1. A Estrutura `CONSTANT_Class_info`](<#/doc/jvms/jvms-04>)
[4.4.2. As Estruturas `CONSTANT_Fieldref_info`, `CONSTANT_Methodref_info` e `CONSTANT_InterfaceMethodref_info`](<#/doc/jvms/jvms-04>)
[4.4.3. A Estrutura `CONSTANT_String_info`](<#/doc/jvms/jvms-04>)
[4.4.4. As Estruturas `CONSTANT_Integer_info` e `CONSTANT_Float_info`](<#/doc/jvms/jvms-04>)
[4.4.5. As Estruturas `CONSTANT_Long_info` e `CONSTANT_Double_info`](<#/doc/jvms/jvms-04>)
[4.4.6. A Estrutura `CONSTANT_NameAndType_info`](<#/doc/jvms/jvms-04>)
[4.4.7. A Estrutura `CONSTANT_Utf8_info`](<#/doc/jvms/jvms-04>)
[4.4.8. A Estrutura `CONSTANT_MethodHandle_info`](<#/doc/jvms/jvms-04>)
[4.4.9. A Estrutura `CONSTANT_MethodType_info`](<#/doc/jvms/jvms-04>)
[4.4.10. As Estruturas `CONSTANT_Dynamic_info` e `CONSTANT_InvokeDynamic_info`](<#/doc/jvms/jvms-04>)
[4.4.11. A Estrutura `CONSTANT_Module_info`](<#/doc/jvms/jvms-04>)
[4.4.12. A Estrutura `CONSTANT_Package_info`](<#/doc/jvms/jvms-04>)
[4.5. Campos](<#/doc/jvms/jvms-04>)
[4.6. Métodos](<#/doc/jvms/jvms-04>)
[4.7. Atributos](<#/doc/jvms/jvms-04>)
    

[4.7.1. Definindo e Nomeando Novos Atributos](<#/doc/jvms/jvms-04>)
[4.7.2. O Atributo `ConstantValue`](<#/doc/jvms/jvms-04>)
[4.7.3. O Atributo `Code`](<#/doc/jvms/jvms-04>)
[4.7.4. O Atributo `StackMapTable`](<#/doc/jvms/jvms-04>)
[4.7.5. O Atributo `Exceptions`](<#/doc/jvms/jvms-04>)
[4.7.6. O Atributo `InnerClasses`](<#/doc/jvms/jvms-04>)
[4.7.7. O Atributo `EnclosingMethod`](<#/doc/jvms/jvms-04>)
[4.7.8. O Atributo `Synthetic`](<#/doc/jvms/jvms-04>)
[4.7.9. O Atributo `Signature`](<#/doc/jvms/jvms-04>)
    

[4.7.9.1. Assinaturas](<#/doc/jvms/jvms-04>)
[4.7.10. O Atributo `SourceFile`](<#/doc/jvms/jvms-04>)
[4.7.11. O Atributo `SourceDebugExtension`](<#/doc/jvms/jvms-04>)
[4.7.12. O Atributo `LineNumberTable`](<#/doc/jvms/jvms-04>)
[4.7.13. O Atributo `LocalVariableTable`](<#/doc/jvms/jvms-04>)
[4.7.14. O Atributo `LocalVariableTypeTable`](<#/doc/jvms/jvms-04>)
[4.7.15. O Atributo `Deprecated`](<#/doc/jvms/jvms-04>)
[4.7.16. O Atributo `RuntimeVisibleAnnotations`](<#/doc/jvms/jvms-04>)
    

[4.7.16.1. A estrutura `element_value`](<#/doc/jvms/jvms-04>)
[4.7.17. O Atributo `RuntimeInvisibleAnnotations`](<#/doc/jvms/jvms-04>)
[4.7.18. O Atributo `RuntimeVisibleParameterAnnotations`](<#/doc/jvms/jvms-04>)
[4.7.19. O Atributo `RuntimeInvisibleParameterAnnotations`](<#/doc/jvms/jvms-04>)
[4.7.20. O Atributo `RuntimeVisibleTypeAnnotations`](<#/doc/jvms/jvms-04>)
    

[4.7.20.1. A união `target_info`](<#/doc/jvms/jvms-04>)
[4.7.20.2. A estrutura `type_path`](<#/doc/jvms/jvms-04>)
[4.7.21. O Atributo `RuntimeInvisibleTypeAnnotations`](<#/doc/jvms/jvms-04>)
[4.7.22. O Atributo `AnnotationDefault`](<#/doc/jvms/jvms-04>)
[4.7.23. O Atributo `BootstrapMethods`](<#/doc/jvms/jvms-04>)
[4.7.24. O Atributo `MethodParameters`](<#/doc/jvms/jvms-04>)
[4.7.25. O Atributo `Module`](<#/doc/jvms/jvms-04>)
[4.7.26. O Atributo `ModulePackages`](<#/doc/jvms/jvms-04>)
[4.7.27. O Atributo `ModuleMainClass`](<#/doc/jvms/jvms-04>)
[4.7.28. O Atributo `NestHost`](<#/doc/jvms/jvms-04>)
[4.7.29. O Atributo `NestMembers`](<#/doc/jvms/jvms-04>)
[4.7.30. O Atributo `Record`](<#/doc/jvms/jvms-04>)
[4.7.31. O Atributo `PermittedSubclasses`](<#/doc/jvms/jvms-04>)
[4.8. Verificação de Formato](<#/doc/jvms/jvms-04>)
[4.9. Restrições no Código da Java Virtual Machine](<#/doc/jvms/jvms-04>)
    

[4.9.1. Restrições Estáticas](<#/doc/jvms/jvms-04>)
[4.9.2. Restrições Estruturais](<#/doc/jvms/jvms-04>)
[4.10. Verificação de Arquivos `class`](<#/doc/jvms/jvms-04>)
    

[4.10.1. Verificação por Checagem de Tipo](<#/doc/jvms/jvms-04>)
    

[4.10.1.1. Acessadores para Artefatos da Java Virtual Machine](<#/doc/jvms/jvms-04>)
[4.10.1.2. Sistema de Tipos de Verificação](<#/doc/jvms/jvms-04>)
[4.10.1.3. Representação de Instruções](<#/doc/jvms/jvms-04>)
[4.10.1.4. Frames de Mapa de Pilha e Transições de Tipo](<#/doc/jvms/jvms-04>)
[4.10.1.5. Métodos de Checagem de Tipo](<#/doc/jvms/jvms-04>)
[4.10.1.6. Fluxos de Código de Checagem de Tipo](<#/doc/jvms/jvms-04>)
[4.10.1.7. Instruções de Carregamento e Armazenamento de Checagem de Tipo](<#/doc/jvms/jvms-04>)
[4.10.1.8. Checagem de Tipo para Membros `protected`](<#/doc/jvms/jvms-04>)
[4.10.1.9. Instruções de Checagem de Tipo](<#/doc/jvms/jvms-04>)
    

[_aaload_](<#/doc/jvms/jvms-04>)
[_aastore_](<#/doc/jvms/jvms-04>)
[_aconst_null_](<#/doc/jvms/jvms-04>)
[_aload_ , _aload_ &lt;n&gt;_](<#/doc/jvms/jvms-04>)
[_anewarray_](<#/doc/jvms/jvms-04>)
[_areturn_](<#/doc/jvms/jvms-04>)
[_arraylength_](<#/doc/jvms/jvms-04>)
[_astore_ , _astore_ &lt;n&gt;_](<#/doc/jvms/jvms-04>)
[_athrow_](<#/doc/jvms/jvms-04>)
[_baload_](<#/doc/jvms/jvms-04>)
[_bastore_](<#/doc/jvms/jvms-04>)
[_bipush_](<#/doc/jvms/jvms-04>)
[_caload_](<#/doc/jvms/jvms-04>)
[_castore_](<#/doc/jvms/jvms-04>)
[_checkcast_](<#/doc/jvms/jvms-04>)
[_d2f_ , _d2i_ , _d2l_](<#/doc/jvms/jvms-04>)
[_dadd_](<#/doc/jvms/jvms-04>)
[_daload_](<#/doc/jvms/jvms-04>)
[_dastore_](<#/doc/jvms/jvms-04>)
[_dcmp &lt;op&gt;_](<#/doc/jvms/jvms-04>)
[_dconst_ &lt;d&gt;_](<#/doc/jvms/jvms-04>)
[_ddiv_](<#/doc/jvms/jvms-04>)
[_dload_ , _dload_ &lt;n&gt;_](<#/doc/jvms/jvms-04>)
[_dmul_](<#/doc/jvms/jvms-04>)
[_dneg_](<#/doc/jvms/jvms-04>)
[_drem_](<#/doc/jvms/jvms-04>)
[_dreturn_](<#/doc/jvms/jvms-04>)
[_dstore_ , _dstore_ &lt;n&gt;_](<#/doc/jvms/jvms-04>)
[_dsub_](<#/doc/jvms/jvms-04>)
[_dup_](<#/doc/jvms/jvms-04>)
[_dup_x1_](<#/doc/jvms/jvms-04>)
[_dup_x2_](<#/doc/jvms/jvms-04>)
[_dup2_](<#/doc/jvms/jvms-04>)
[_dup2_x1_](<#/doc/jvms/jvms-04>)
[_dup2_x2_](<#/doc/jvms/jvms-04>)
[_f2d_ , _f2i_ , _f2l_](<#/doc/jvms/jvms-04>)
[_fadd_](<#/doc/jvms/jvms-04>)
[_faload_](<#/doc/jvms/jvms-04>)
[_fastore_](<#/doc/jvms/jvms-04>)
[_fcmp &lt;op&gt;_](<#/doc/jvms/jvms-04>)
[_fconst_ &lt;f&gt;_](<#/doc/jvms/jvms-04>)
[_fdiv_](<#/doc/jvms/jvms-04>)
[_fload_ , _fload_ &lt;n&gt;_](<#/doc/jvms/jvms-04>)
[_fmul_](<#/doc/jvms/jvms-04>)
[_fneg_](<#/doc/jvms/jvms-04>)
[_frem_](<#/doc/jvms/jvms-04>)
[_freturn_](<#/doc/jvms/jvms-04>)
[_fstore_ , _fstore_ &lt;n&gt;_](<#/doc/jvms/jvms-04>)
[_fsub_](<#/doc/jvms/jvms-04>)
[_getfield_](<#/doc/jvms/jvms-04>)
[_getstatic_](<#/doc/jvms/jvms-04>)
[_goto_ , _goto_w_](<#/doc/jvms/jvms-04>)
[_i2b_ , _i2c_ , _i2d_ , _i2f_ , _i2l_ , _i2s_](<#/doc/jvms/jvms-04>)
[_iadd_](<#/doc/jvms/jvms-04>)
[_iaload_](<#/doc/jvms/jvms-04>)
[_iand_](<#/doc/jvms/jvms-04>)
[_iastore_](<#/doc/jvms/jvms-04>)
[_iconst_ <i>_](<#/doc/jvms/jvms-04>)
[_idiv_](<#/doc/jvms/jvms-04>)
[_if_acmp &lt;cond&gt;_](<#/doc/jvms/jvms-04>)
[_if_icmp &lt;cond&gt;_](<#/doc/jvms/jvms-04>)
[_if &lt;cond&gt;_](<#/doc/jvms/jvms-04>)
[_ifnonnull_ , _ifnull_](<#/doc/jvms/jvms-04>)
[_iinc_](<#/doc/jvms/jvms-04>)
[_iload_ , _iload_ &lt;n&gt;_](<#/doc/jvms/jvms-04>)
[_imul_](<#/doc/jvms/jvms-04>)
[_ineg_](<#/doc/jvms/jvms-04>)
[_instanceof_](<#/doc/jvms/jvms-04>)
[_invokedynamic_](<#/doc/jvms/jvms-04>)
[_invokeinterface_](<#/doc/jvms/jvms-04>)
[_invokespecial_](<#/doc/jvms/jvms-04>)
[_invokestatic_](<#/doc/jvms/jvms-04>)
[_invokevirtual_](<#/doc/jvms/jvms-04>)
[_ior_ , _irem_](<#/doc/jvms/jvms-04>)
[_ireturn_](<#/doc/jvms/jvms-04>)
[_ishl_ , _ishr_ , _iushr_](<#/doc/jvms/jvms-04>)
[_istore_ , _istore_ &lt;n&gt;_](<#/doc/jvms/jvms-04>)
[_isub_ , _ixor_](<#/doc/jvms/jvms-04>)
[_l2d_ , _l2f_ , _l2i_](<#/doc/jvms/jvms-04>)
[_ladd_](<#/doc/jvms/jvms-04>)
[_laload_](<#/doc/jvms/jvms-04>)
[_land_](<#/doc/jvms/jvms-04>)
[_lastore_](<#/doc/jvms/jvms-04>)
[_lcmp_](<#/doc/jvms/jvms-04>)
[_lconst_ &lt;l&gt;_](<#/doc/jvms/jvms-04>)
[_ldc_ , _ldc_w_ , _ldc2_w_](<#/doc/jvms/jvms-04>)
[_ldiv_](<#/doc/jvms/jvms-04>)
[_lload_ , _lload_ &lt;n&gt;_](<#/doc/jvms/jvms-04>)
[_lmul_](<#/doc/jvms/jvms-04>)
[_lneg_](<#/doc/jvms/jvms-04>)
[_lookupswitch_](<#/doc/jvms/jvms-04>)
[_lor_ , _lrem_](<#/doc/jvms/jvms-04>)
[_lreturn_](<#/doc/jvms/jvms-04>)
[_lshl_ , _lshr_ , _lushr_](<#/doc/jvms/jvms-04>)
[_lstore_ , _lstore_ &lt;n&gt;_](<#/doc/jvms/jvms-04>)
[_lsub_ , _lxor_](<#/doc/jvms/jvms-04>)
[_monitorenter_ , _monitorexit_](<#/doc/jvms/jvms-04>)
[_multianewarray_](<#/doc/jvms/jvms-04>)
[_new_](<#/doc/jvms/jvms-04>)
[_newarray_](<#/doc/jvms/jvms-04>)
[_nop_](<#/doc/jvms/jvms-04>)
[_pop_ , _pop2_](<#/doc/jvms/jvms-04>)
[_putfield_](<#/doc/jvms/jvms-04>)
[_putstatic_](<#/doc/jvms/jvms-04>)
[_return_](<#/doc/jvms/jvms-04>)
[_saload_](<#/doc/jvms/jvms-04>)
[_sastore_](<#/doc/jvms/jvms-04>)
[_sipush_](<#/doc/jvms/jvms-04>)
[_swap_](<#/doc/jvms/jvms-04>)
[_tableswitch_](<#/doc/jvms/jvms-04>)
[_wide_](<#/doc/jvms/jvms-04>)
[4.10.2. Verificação por Inferência de Tipo](<#/doc/jvms/jvms-04>)
    

[4.10.2.1. O Processo de Verificação por Inferência de Tipo](<#/doc/jvms/jvms-04>)
[4.10.2.2. O Verificador de Bytecode](<#/doc/jvms/jvms-04>)
[4.10.2.3. Valores dos Tipos `long` e `double`](<#/doc/jvms/jvms-04>)
[4.10.2.4. Métodos de Inicialização de Instância e Objetos Recém-Criados](<#/doc/jvms/jvms-04>)
[4.10.2.5. Exceções e `finally`](<#/doc/jvms/jvms-04>)
[4.11. Limitações da Java Virtual Machine](<#/doc/jvms/jvms-04>)

Este capítulo descreve o formato de arquivo `class` da Java Virtual Machine. Cada arquivo `class` contém a definição de uma única classe, interface ou módulo. Embora uma classe, interface ou módulo não precise ter uma representação externa literalmente contida em um arquivo (por exemplo, porque a classe é gerada por um class loader), nos referiremos coloquialmente a qualquer representação válida de uma classe, interface ou módulo como estando no formato de arquivo `class`.

Um arquivo `class` consiste em um stream de bytes de 8 bits. Quantidades de 16 e 32 bits são construídas lendo-se dois e quatro bytes consecutivos de 8 bits, respectivamente. Itens de dados multibyte são sempre armazenados em ordem big-endian, onde os bytes mais significativos vêm primeiro. Este capítulo define os tipos de dados `u1`, `u2` e `u4` para representar uma quantidade não-assinada de um, dois ou quatro bytes, respectivamente.

Na API da Plataforma Java SE, o formato de arquivo `class` é suportado pelas interfaces `java.io.DataInput` e `java.io.DataOutput` e classes como `java.io.DataInputStream` e `java.io.DataOutputStream`. Por exemplo, valores dos tipos `u1`, `u2` e `u4` podem ser lidos por métodos como `readUnsignedByte`, `readUnsignedShort` e `readInt` da interface `java.io.DataInput`.

Este capítulo apresenta o formato de arquivo `class` usando pseudoestruturas escritas em uma notação de estrutura semelhante à C. Para evitar confusão com os campos de classes e instâncias de classes, etc., o conteúdo das estruturas que descrevem o formato de arquivo `class` é referido como _itens_. Itens sucessivos são armazenados no arquivo `class` sequencialmente, sem preenchimento ou alinhamento.

_Tabelas_, consistindo de zero ou mais itens de tamanho variável, são usadas em várias estruturas de arquivo `class`. Embora usemos sintaxe de array semelhante à C para nos referir a itens de tabela, o fato de que as tabelas são streams de estruturas de tamanhos variados significa que não é possível traduzir um índice de tabela diretamente para um offset de byte na tabela.

Onde nos referimos a uma estrutura de dados como um _array_, ela consiste em zero ou mais itens contíguos de tamanho fixo e pode ser indexada como um array.

A referência a um caractere ASCII neste capítulo deve ser interpretada como o ponto de código Unicode correspondente ao caractere ASCII.

## 4.1. A Estrutura `ClassFile`

Um arquivo `class` consiste em uma única estrutura `ClassFile`:
```
    ClassFile {
        u4             magic;
        u2             minor_version;
        u2             major_version;
        u2             constant_pool_count;
        cp_info        constant_pool[constant_pool_count-1];
        u2             access_flags;
        u2             this_class;
        u2             super_class;
        u2             interfaces_count;
        u2             interfaces[interfaces_count];
        u2             fields_count;
        field_info     fields[fields_count];
        u2             methods_count;
        method_info    methods[methods_count];
        u2             attributes_count;
        attribute_info attributes[attributes_count];
    }
    
```

Os itens na estrutura `ClassFile` são os seguintes:

`magic`
    

O item `magic` fornece o número mágico que identifica o formato de arquivo `class`; ele tem o valor `0xCAFEBABE`.

`minor_version`, `major_version`
    

Os valores dos itens `minor_version` e `major_version` são os números de versão menor e maior deste arquivo `class`. Juntos, um número de versão maior e um menor determinam a versão do formato de arquivo `class`. Se um arquivo `class` tiver o número de versão maior `M` e o número de versão menor `m`, denotamos a versão do seu formato de arquivo `class` como `M`.`m`.

O item `major_version` deve ser um valor no intervalo de 45 a 69, inclusive. Uma implementação da Java Virtual Machine que está em conformidade com o Java SE 25 suporta precisamente esses números de versão maiores.

Para um arquivo `class` cujo `major_version` é 56 ou superior, o `minor_version` deve ser 0 ou 65535.

Para um arquivo `class` cujo `major_version` está entre 45 e 55, inclusive, o `minor_version` pode ser qualquer valor.

Um arquivo `class` com número de versão 69.65535 depende dos recursos de pré-visualização do Java SE 25 ([§1.5.1](<#/doc/jvms/jvms-01>)). Tal arquivo `class` pode ser carregado apenas quando o usuário indicou, via sistema host, que os recursos de pré-visualização estão habilitados.

Um arquivo `class` com número de versão `M`.65535, onde 56 ≤ `M` < 69, depende dos recursos de pré-visualização de uma versão mais antiga da Plataforma Java SE. Tal arquivo `class` não pode ser carregado, independentemente de os recursos de pré-visualização estarem habilitados. Em vez disso, o arquivo `class` pode ser carregado apenas por uma implementação da Java Virtual Machine que esteja em conformidade com a versão mais antiga.

Um arquivo `class` com qualquer outro número de versão não depende de recursos de pré-visualização e pode ser carregado independentemente de os recursos de pré-visualização estarem habilitados.

Uma perspectiva histórica é justificada sobre o uso do `minor_version` do arquivo `class` pelo JDK. O JDK 1.0.2 suportava as versões 45.0 a 45.3, inclusive. O JDK 1.1 suportava as versões 45.0 a 45.65535, inclusive. Quando o JDK 1.2 introduziu suporte para a versão maior 46, a única versão menor suportada sob essa versão maior era 0. JDKs posteriores continuaram a prática de introduzir suporte para uma nova versão maior (47, 48, etc.), mas suportando apenas uma versão menor de 0 sob a nova versão maior. Finalmente, a introdução de recursos de pré-visualização ([§1.5](<#/doc/jvms/jvms-01>)) no Java SE 12 motivou um papel padrão para a versão menor do formato de arquivo `class`, então o JDK 12 suportou as versões menores 0 _e_ 65535 sob a versão maior 56. JDKs subsequentes introduzem suporte para `N`.0 e `N`.65535, onde `N` é a versão maior correspondente da Plataforma Java SE implementada. Por exemplo, o JDK 13 suporta 57.0 e 57.65535.

`constant_pool_count`
    

O valor do item `constant_pool_count` é igual ao número de entradas na tabela `constant_pool` mais um. Um índice `constant_pool` é considerado válido se for maior que zero e menor que `constant_pool_count`, com a exceção para constantes dos tipos `long` e `double` observada em [§4.4.5](<#/doc/jvms/jvms-04>).

`constant_pool[]`
    

O `constant_pool` é uma tabela de estruturas ([§4.4](<#/doc/jvms/jvms-04>)) que representa várias constantes de string, nomes de classes e interfaces, nomes de campos e outras constantes que são referenciadas dentro da estrutura `ClassFile` e suas subestruturas. O formato de cada entrada da tabela `constant_pool` é indicado pelo seu primeiro byte "tag".

A tabela `constant_pool` é indexada de 1 a `constant_pool_count` \- 1.

`access_flags`
    

O valor do item `access_flags` é uma máscara de flags usada para denotar permissões de acesso e propriedades desta classe ou interface. A interpretação de cada flag, quando definida, é especificada na [Tabela 4.1-B](<#/doc/jvms/jvms-04>).

**Tabela 4.1-B. Modificadores de acesso e propriedade de classe**

Nome da Flag | Valor | Interpretação
---|---|---
`ACC_PUBLIC` | 0x0001 | Declarado `public`; pode ser acessado de fora do seu pacote.
`ACC_FINAL` | 0x0010 | Declarado `final`; nenhuma subclasse permitida.
`ACC_SUPER` | 0x0020 | Tratar métodos de superclasse de forma especial quando invocados pela instrução _invokespecial_.
`ACC_INTERFACE` | 0x0200 | É uma interface, não uma classe.
`ACC_ABSTRACT` | 0x0400 | Declarado `abstract`; não deve ser instanciado.
`ACC_SYNTHETIC` | 0x1000 | Declarado synthetic; não presente no código fonte.
`ACC_ANNOTATION` | 0x2000 | Declarado como uma interface de anotação.
`ACC_ENUM` | 0x4000 | Declarado como uma classe `enum`.
`ACC_MODULE` | 0x8000 | É um módulo, não uma classe ou interface.
  
  

A flag `ACC_MODULE` indica que este arquivo `class` define um módulo, não uma classe ou interface. Se a flag `ACC_MODULE` estiver definida, então regras especiais se aplicam ao arquivo `class`, que são dadas no final desta seção. Se a flag `ACC_MODULE` não estiver definida, então as regras imediatamente abaixo do parágrafo atual se aplicam ao arquivo `class`.

Uma interface é distinguida pela flag `ACC_INTERFACE` estar definida. Se a flag `ACC_INTERFACE` não estiver definida, este arquivo `class` define uma classe, não uma interface ou módulo.

Se a flag `ACC_INTERFACE` estiver definida, a flag `ACC_ABSTRACT` também deve estar definida, e as flags `ACC_FINAL`, `ACC_SUPER`, `ACC_ENUM` e `ACC_MODULE` não devem estar definidas.

Se a flag `ACC_INTERFACE` não estiver definida, qualquer uma das outras flags na [Tabela 4.1-B](<#/doc/jvms/jvms-04>) pode ser definida, exceto `ACC_ANNOTATION` e `ACC_MODULE`. No entanto, tal arquivo `class` não deve ter suas flags `ACC_FINAL` e `ACC_ABSTRACT` definidas simultaneamente (JLS §8.1.1.2).

A flag `ACC_SUPER` indica qual das duas semânticas alternativas deve ser expressa pela instrução _invokespecial_ ([§ _invokespecial_](<#/doc/jvms/jvms-06>)) se ela aparecer nesta classe ou interface. Compiladores para o conjunto de instruções da Java Virtual Machine devem definir a flag `ACC_SUPER`. No Java SE 8 e superior, a Java Virtual Machine considera a flag `ACC_SUPER` definida em todo arquivo `class`, independentemente do valor real da flag no arquivo `class` e da versão do arquivo `class`.

A flag `ACC_SUPER` existe para compatibilidade retroativa com código compilado por compiladores mais antigos para a linguagem de programação Java. Antes do JDK 1.0.2, o compilador gerava `access_flags` nas quais a flag que agora representa `ACC_SUPER` não tinha significado atribuído, e a implementação da Java Virtual Machine da Oracle ignorava a flag se ela estivesse definida.

A flag `ACC_SYNTHETIC` indica que esta classe ou interface foi gerada por um compilador e não aparece no código fonte.

Uma interface de anotação (JLS §9.6) deve ter sua flag `ACC_ANNOTATION` definida. Se a flag `ACC_ANNOTATION` estiver definida, a flag `ACC_INTERFACE` também deve estar definida.

A flag `ACC_ENUM` indica que esta classe ou sua superclasse é declarada como uma classe `enum` (JLS §8.9).

Todos os bits do item `access_flags` não atribuídos na [Tabela 4.1-B](<#/doc/jvms/jvms-04>) são reservados para uso futuro. Eles devem ser definidos como zero em arquivos `class` gerados e devem ser ignorados pelas implementações da Java Virtual Machine.

`this_class`
    

O valor do item `this_class` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Class_info` ([§4.4.1](<#/doc/jvms/jvms-04>)) representando a classe ou interface definida por este arquivo `class`.

`super_class`
    

Para uma classe, o valor do item `super_class` deve ser zero ou um índice válido na tabela `constant_pool`. Se o valor do item `super_class` for diferente de zero, a entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Class_info` representando a superclasse direta da classe definida por este arquivo `class`. Nem a superclasse direta nem qualquer uma de suas superclasses podem ter a flag `ACC_FINAL` definida no item `access_flags` de sua estrutura `ClassFile`.

Se o valor do item `super_class` for zero, então este arquivo `class` deve representar a classe `Object`, a única classe ou interface sem uma superclasse direta.

Para uma interface, o valor do item `super_class` deve ser sempre um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Class_info` representando a classe `Object`.

`interfaces_count`
    

O valor do item `interfaces_count` fornece o número de superinterfaces diretas desta classe ou tipo de interface.

`interfaces[]`
    

Cada valor no array `interfaces` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` em cada valor de `interfaces[_i_]`, onde 0 ≤ _i_ < `interfaces_count`, deve ser uma estrutura `CONSTANT_Class_info` representando uma interface que é uma superinterface direta desta classe ou tipo de interface, na ordem da esquerda para a direita dada na fonte para o tipo.

`fields_count`
    

O valor do item `fields_count` fornece o número de estruturas `field_info` na tabela `fields`. As estruturas `field_info` representam todos os campos, tanto variáveis de classe quanto variáveis de instância, declarados por esta classe ou tipo de interface.

`fields[]`
    

Cada valor na tabela `fields` deve ser uma estrutura `field_info` ([§4.5](<#/doc/jvms/jvms-04>)) fornecendo uma descrição completa de um campo nesta classe ou interface. A tabela `fields` inclui apenas os campos que são declarados por esta classe ou interface. Ela não inclui itens que representam campos herdados de superclasses ou superinterfaces.

`methods_count`
    

O valor do item `methods_count` fornece o número de estruturas `method_info` na tabela `methods`.

`methods[]`
    

Cada valor na tabela `methods` deve ser uma estrutura `method_info` ([§4.6](<#/doc/jvms/jvms-04>)) fornecendo uma descrição completa de um método nesta classe ou interface. Se nenhuma das flags `ACC_NATIVE` e `ACC_ABSTRACT` estiver definida no item `access_flags` de uma estrutura `method_info`, as instruções da Java Virtual Machine que implementam o método também são fornecidas.

As estruturas `method_info` representam todos os métodos declarados por esta classe ou tipo de interface, incluindo métodos de instância, métodos de classe, métodos de inicialização de instância ([§2.9.1](<#/doc/jvms/jvms-02>)) e qualquer método de inicialização de classe ou interface ([§2.9.2](<#/doc/jvms/jvms-02>)). A tabela `methods` não inclui itens que representam métodos herdados de superclasses ou superinterfaces.

`attributes_count`
    

O valor do item `attributes_count` fornece o número de atributos na tabela `attributes` desta classe.

`attributes[]`
    

Cada valor da tabela `attributes` deve ser uma estrutura `attribute_info` ([§4.7](<#/doc/jvms/jvms-04>)).

Os atributos definidos por esta especificação como aparecendo na tabela `attributes` de uma estrutura `ClassFile` estão listados na [Tabela 4.7-C](<#/doc/jvms/jvms-04>).

As regras relativas aos atributos definidos para aparecer na tabela `attributes` de uma estrutura `ClassFile` são dadas em [§4.7](<#/doc/jvms/jvms-04>).

As regras relativas aos atributos não predefinidos na tabela `attributes` de uma estrutura `ClassFile` são dadas em [§4.7.1](<#/doc/jvms/jvms-04>).

Se a flag `ACC_MODULE` estiver definida no item `access_flags`, então nenhuma outra flag no item `access_flags` pode ser definida, e as seguintes regras se aplicam ao restante da estrutura `ClassFile`:

  * `major_version`, `minor_version`: ≥ 53.0 (ou seja, Java SE 9 e superior)

  * `this_class`: `module-info`

  * `super_class`, `interfaces_count`, `fields_count`, `methods_count`: zero

  * `attributes`: Um atributo `Module` deve estar presente. Exceto por `Module`, `ModulePackages`, `ModuleMainClass`, `InnerClasses`, `SourceFile`, `SourceDebugExtension`, `RuntimeVisibleAnnotations` e `RuntimeInvisibleAnnotations`, nenhum dos atributos predefinidos ([§4.7](<#/doc/jvms/jvms-04>)) pode aparecer.
## 4.2. Nomes

### 4.2.1. Nomes Binários de Classes e Interfaces

Nomes de classes e interfaces que aparecem em estruturas de arquivos `class` são sempre representados em uma forma totalmente qualificada conhecida como _nomes binários_ (JLS §13.1). Tais nomes são sempre representados como estruturas `CONSTANT_Utf8_info` ([§4.4.7](<#/doc/jvms/jvms-04>)) e, portanto, podem ser extraídos, onde não houver restrições adicionais, de todo o codespace Unicode. Nomes de classes e interfaces são referenciados a partir das estruturas `CONSTANT_NameAndType_info` ([§4.4.6](<#/doc/jvms/jvms-04>)) que possuem tais nomes como parte de seu descritor ([§4.3](<#/doc/jvms/jvms-04>)), e de todas as estruturas `CONSTANT_Class_info` ([§4.4.1](<#/doc/jvms/jvms-04>)).

Por razões históricas, a sintaxe dos nomes binários que aparecem nas estruturas de arquivos `class` difere da sintaxe dos nomes binários documentados no JLS §13.1. Nesta forma interna, os pontos ASCII (`.`) que normalmente separam os identificadores que compõem o nome binário são substituídos por barras ASCII (`/`). Os próprios identificadores devem ser nomes não qualificados ([§4.2.2](<#/doc/jvms/jvms-04>)).

Por exemplo, o nome binário normal da classe `Thread` é `java.lang.Thread`. Na forma interna usada em descritores no formato de arquivo `class`, uma referência ao nome da classe `Thread` é implementada usando uma estrutura `CONSTANT_Utf8_info` representando a string `java/lang/Thread`.

### 4.2.2. Nomes Não Qualificados

Nomes de métodos, campos, variáveis locais e parâmetros formais são armazenados como _nomes não qualificados_. Um nome não qualificado deve conter pelo menos um code point Unicode e não deve conter nenhum dos caracteres ASCII `.` `;` `[` `/` (ou seja, ponto ou ponto e vírgula ou colchete esquerdo ou barra).

Nomes de métodos são ainda mais restritos de forma que, com exceção dos nomes de métodos especiais `<init>` e `<clinit>` ([§2.9](<#/doc/jvms/jvms-02>)), eles não devem conter os caracteres ASCII `<` ou `>` (ou seja, colchete angular esquerdo ou colchete angular direito).

Note que nenhuma instrução de invocação de método pode referenciar `<clinit>`, e apenas a instrução _invokespecial_ ([§ _invokespecial_](<#/doc/jvms/jvms-06>)) pode referenciar `<init>`.

### 4.2.3. Nomes de Módulos e Pacotes

Nomes de módulos referenciados do atributo `Module` são armazenados em estruturas `CONSTANT_Module_info` no constant pool ([§4.4.11](<#/doc/jvms/jvms-04>)). Uma estrutura `CONSTANT_Module_info` envolve uma estrutura `CONSTANT_Utf8_info` que denota o nome do módulo. Nomes de módulos não são codificados em "forma interna" como nomes de classes e interfaces, ou seja, os pontos ASCII (`.`) que separam os identificadores em um nome de módulo não são substituídos por barras ASCII (`/`).

Nomes de módulos podem ser extraídos de todo o codespace Unicode, sujeitos às seguintes restrições:

  * Um nome de módulo não deve conter nenhum code point no intervalo '`\u0000`' a '`\u001F`' inclusive.

  * A barra invertida ASCII (`\`) é reservada para uso como caractere de escape em nomes de módulos. Ela não deve aparecer em um nome de módulo a menos que seja seguida por uma barra invertida ASCII, um dois pontos ASCII (`:`), ou um arroba ASCII (`@`). A sequência de caracteres ASCII `\`\` pode ser usada para codificar uma barra invertida em um nome de módulo.

  * Os dois pontos ASCII (`:`) e o arroba (`@`) são reservados para uso futuro em nomes de módulos. Eles não devem aparecer em nomes de módulos a menos que sejam escapados. As sequências de caracteres ASCII `\`:` e `\`@` podem ser usadas para codificar um dois pontos e um arroba em um nome de módulo.

Nomes de pacotes referenciados do atributo `Module` são armazenados em estruturas `CONSTANT_Package_info` no constant pool ([§4.4.12](<#/doc/jvms/jvms-04>)). Uma estrutura `CONSTANT_Package_info` envolve uma estrutura `CONSTANT_Utf8_info` que representa um nome de pacote codificado em forma interna.

## 4.3. Descritores

Um _descritor_ é uma string que representa o tipo de um campo ou método. Descritores são representados no formato de arquivo `class` usando strings UTF-8 modificadas ([§4.4.7](<#/doc/jvms/jvms-04>)) e, portanto, podem ser extraídos, onde não houver restrições adicionais, de todo o codespace Unicode.

### 4.3.1. Notação de Gramática

Descritores são especificados usando uma gramática. A gramática é um conjunto de produções que descrevem como sequências de caracteres podem formar descritores sintaticamente corretos de vários tipos. Símbolos terminais da gramática são mostrados em fonte `fixed width` e devem ser interpretados como caracteres ASCII. Símbolos não terminais são mostrados em tipo _itálico_. A definição de um não terminal é introduzida pelo nome do não terminal sendo definido, seguido por dois pontos. Uma ou mais definições alternativas para o não terminal seguem nas linhas subsequentes.

A sintaxe _{x}_ no lado direito de uma produção denota zero ou mais ocorrências de _x_.

A frase _(um de)_ no lado direito de uma produção significa que cada um dos símbolos terminais na linha ou linhas seguintes é uma definição alternativa.

### 4.3.2. Descritores de Campo

Um _descritor de campo_ representa o tipo de um campo, parâmetro, variável local ou valor.

FieldDescriptor:

[FieldType](<#/doc/jvms/jvms-04>)

FieldType:

[BaseType](<#/doc/jvms/jvms-04>)
[ClassType](<#/doc/jvms/jvms-04>)
[ArrayType](<#/doc/jvms/jvms-04>)

BaseType:

(one of)
`B` `C` `D` `F` `I` `J` `S` `Z`

ClassType:

`L` ClassName `;`

ArrayType:

`[` [ComponentType](<#/doc/jvms/jvms-04>)

ComponentType:

[FieldType](<#/doc/jvms/jvms-04>)

_ClassName_ representa um nome binário de classe ou interface codificado em forma interna ([§4.2.1](<#/doc/jvms/jvms-04>)).

Um descritor de campo _menciona_ um nome de classe ou interface se o nome aparecer como um _ClassName_ no descritor. Isso inclui um _ClassName_ aninhado no _ComponentType_ de um _ArrayType_.

A interpretação dos descritores de campo como tipos é mostrada na [Tabela 4.3-A](<#/doc/jvms/jvms-04>). Veja [§2.2](<#/doc/jvms/jvms-02>), [§2.3](<#/doc/jvms/jvms-02>), e [§2.4](<#/doc/jvms/jvms-02>) para o significado desses tipos.

Um descritor de campo que representa um tipo de array é válido apenas se representar um tipo com 255 ou menos dimensões.

**Tabela 4.3-A. Interpretação de descritores de campo**

Termo _FieldType_ | Tipo
---|---
`B` | `byte`
`C` | `char`
`D` | `double`
`F` | `float`
`I` | `int`
`J` | `long`
`L` _ClassName_ `;` | Tipo de classe ou interface nomeado
`S` | `short`
`Z` | `boolean`
`[` _ComponentType_ | Array do tipo de componente dado

O descritor de campo de uma variável de instância do tipo `int` é simplesmente `I`.

O descritor de campo de uma variável de instância do tipo `Object` é `Ljava/lang/Object;`. Note que a forma interna do nome binário para a classe `Object` é usada.

O descritor de campo de uma variável de instância do tipo de array multidimensional `double[][][]` é `[[[D`.

### 4.3.3. Descritores de Método

Um _descritor de método_ contém zero ou mais _descritores de parâmetro_, representando os tipos dos parâmetros que o método aceita, e um _descritor de retorno_, representando o tipo do valor (se houver) que o método retorna.

MethodDescriptor:

`(` {[ParameterDescriptor](<#/doc/jvms/jvms-04>)} `)` [ReturnDescriptor](<#/doc/jvms/jvms-04>)

ParameterDescriptor:

[FieldType](<#/doc/jvms/jvms-04>)

ReturnDescriptor:

[FieldType](<#/doc/jvms/jvms-04>)
[VoidDescriptor](<#/doc/jvms/jvms-04>)

VoidDescriptor:

`V`

O caractere `V` indica que o método não retorna valor (seu resultado é `void`).

Um descritor de método _menciona_ um nome de classe ou interface se o nome aparecer como um _ClassName_ no _FieldType_ de um descritor de parâmetro ou descritor de retorno.

O descritor de método para o método:
```
    Object m(int i, double d, Thread t) {...}
    
```

é:
```
    (IDLjava/lang/Thread;)Ljava/lang/Object;
    
```

Note que as formas internas dos nomes binários de `Thread` e `Object` são usadas.

Um descritor de método é válido apenas se representar parâmetros de método com um comprimento total de 255 ou menos, onde esse comprimento inclui a contribuição para `this` no caso de invocações de métodos de instância ou interface. O comprimento total é calculado somando as contribuições dos parâmetros individuais, onde um parâmetro do tipo `long` ou `double` contribui com duas unidades para o comprimento e um parâmetro de qualquer outro tipo contribui com uma unidade.

Um descritor de método é o mesmo, seja o método que ele descreve um método de classe ou um método de instância. Embora um método de instância receba `this`, uma referência ao objeto no qual o método está sendo invocado, além de seus argumentos pretendidos, esse fato não é refletido no descritor de método. A referência a `this` é passada implicitamente pelas instruções da Java Virtual Machine que invocam métodos de instância ([§2.6.1](<#/doc/jvms/jvms-02>), [§4.11](<#/doc/jvms/jvms-04>)).

## 4.4. O Constant Pool

As instruções da Java Virtual Machine não dependem do layout em tempo de execução de classes, interfaces, instâncias de classes ou arrays. Em vez disso, as instruções referem-se a informações simbólicas na tabela `constant_pool`.

Todas as entradas da tabela `constant_pool` têm o seguinte formato geral:
```
    cp_info {
        u1 tag;
        u1 info[];
    }
    
```

Cada entrada na tabela `constant_pool` deve começar com uma tag de 1 byte indicando o tipo de constante denotado pela entrada. Existem 17 tipos de constantes, listados na [Tabela 4.4-A](<#/doc/jvms/jvms-04>) com suas tags correspondentes, e ordenados pelo número da seção neste capítulo. Cada byte de tag deve ser seguido por dois ou mais bytes fornecendo informações sobre a constante específica. O formato das informações adicionais depende do byte de tag, ou seja, o conteúdo do array `info` varia com o valor de `tag`.

**Tabela 4.4-A. Tags do constant pool (por seção)**

Tipo de Constante | Tag | Seção
---|---|---
`CONSTANT_Class` | 7 | [§4.4.1](<#/doc/jvms/jvms-04>)
`CONSTANT_Fieldref` | 9 | [§4.4.2](<#/doc/jvms/jvms-04>)
`CONSTANT_Methodref` | 10 | [§4.4.2](<#/doc/jvms/jvms-04>)
`CONSTANT_InterfaceMethodref` | 11 | [§4.4.2](<#/doc/jvms/jvms-04>)
`CONSTANT_String` | 8 | [§4.4.3](<#/doc/jvms/jvms-04>)
`CONSTANT_Integer` | 3 | [§4.4.4](<#/doc/jvms/jvms-04>)
`CONSTANT_Float` | 4 | [§4.4.4](<#/doc/jvms/jvms-04>)
`CONSTANT_Long` | 5 | [§4.4.5](<#/doc/jvms/jvms-04>)
`CONSTANT_Double` | 6 | [§4.4.5](<#/doc/jvms/jvms-04>)
`CONSTANT_NameAndType` | 12 | [§4.4.6](<#/doc/jvms/jvms-04>)
`CONSTANT_Utf8` | 1 | [§4.4.7](<#/doc/jvms/jvms-04>)
`CONSTANT_MethodHandle` | 15 | [§4.4.8](<#/doc/jvms/jvms-04>)
`CONSTANT_MethodType` | 16 | [§4.4.9](<#/doc/jvms/jvms-04>)
`CONSTANT_Dynamic` | 17 | [§4.4.10](<#/doc/jvms/jvms-04>)
`CONSTANT_InvokeDynamic` | 18 | [§4.4.10](<#/doc/jvms/jvms-04>)
`CONSTANT_Module` | 19 | [§4.4.11](<#/doc/jvms/jvms-04>)
`CONSTANT_Package` | 20 | [§4.4.12](<#/doc/jvms/jvms-04>)

Em um arquivo `class` cujo número de versão é _v_, cada entrada na tabela `constant_pool` deve ter uma tag que foi definida pela primeira vez na versão _v_ ou anterior do formato de arquivo `class` ([§4.1](<#/doc/jvms/jvms-04>)). Ou seja, cada entrada deve denotar um tipo de constante que é aprovado para uso no arquivo `class`. A [Tabela 4.4-B](<#/doc/jvms/jvms-04>) lista cada tag com a primeira versão do formato de arquivo `class` na qual foi definida. Também é mostrada a versão da Java SE Platform que introduziu essa versão do formato de arquivo `class`.

**Tabela 4.4-B. Tags do constant pool (por tag)**

Tipo de Constante | Tag | Formato de arquivo `class` | Java SE
---|---|---|---
`CONSTANT_Utf8` | 1 | 45.3 | 1.0.2
`CONSTANT_Integer` | 3 | 45.3 | 1.0.2
`CONSTANT_Float` | 4 | 45.3 | 1.0.2
`CONSTANT_Long` | 5 | 45.3 | 1.0.2
`CONSTANT_Double` | 6 | 45.3 | 1.0.2
`CONSTANT_Class` | 7 | 45.3 | 1.0.2
`CONSTANT_String` | 8 | 45.3 | 1.0.2
`CONSTANT_Fieldref` | 9 | 45.3 | 1.0.2
`CONSTANT_Methodref` | 10 | 45.3 | 1.0.2
`CONSTANT_InterfaceMethodref` | 11 | 45.3 | 1.0.2
`CONSTANT_NameAndType` | 12 | 45.3 | 1.0.2
`CONSTANT_MethodHandle` | 15 | 51.0 | 7
`CONSTANT_MethodType` | 16 | 51.0 | 7
`CONSTANT_Dynamic` | 17 | 55.0 | 11
`CONSTANT_InvokeDynamic` | 18 | 51.0 | 7
`CONSTANT_Module` | 19 | 53.0 | 9
`CONSTANT_Package` | 20 | 53.0 | 9

Algumas entradas na tabela `constant_pool` são _carregáveis_ porque representam entidades que podem ser empilhadas em tempo de execução para permitir computações adicionais. Em um arquivo `class` cujo número de versão é _v_, uma entrada na tabela `constant_pool` é carregável se tiver uma tag que foi considerada carregável pela primeira vez na versão _v_ ou anterior do formato de arquivo `class`. A [Tabela 4.4-C](<#/doc/jvms/jvms-04>) lista cada tag com a primeira versão do formato de arquivo `class` na qual foi considerada carregável. Também é mostrada a versão da Java SE Platform que introduziu essa versão do formato de arquivo `class`.

Em todos os casos, exceto `CONSTANT_Class`, uma tag foi considerada carregável pela primeira vez na mesma versão do formato de arquivo `class` que definiu a tag.

**Tabela 4.4-C. Tags de constant pool carregáveis**

Tipo de Constante | Tag | Formato de arquivo `class` | Java SE
---|---|---|---
`CONSTANT_Integer` | 3 | 45.3 | 1.0.2
`CONSTANT_Float` | 4 | 45.3 | 1.0.2
`CONSTANT_Long` | 5 | 45.3 | 1.0.2
`CONSTANT_Double` | 6 | 45.3 | 1.0.2
`CONSTANT_Class` | 7 | 49.0 | 5.0
`CONSTANT_String` | 8 | 45.3 | 1.0.2
`CONSTANT_MethodHandle` | 15 | 51.0 | 7
`CONSTANT_MethodType` | 16 | 51.0 | 7
`CONSTANT_Dynamic` | 17 | 55.0 | 11

### 4.4.1. A Estrutura `CONSTANT_Class_info`

A estrutura `CONSTANT_Class_info` é usada para representar uma classe ou uma interface:
```
    CONSTANT_Class_info {
        u1 tag;
        u2 name_index;
    }
    
```

Os itens da estrutura `CONSTANT_Class_info` são os seguintes:

tag
    

O item `tag` tem o valor `CONSTANT_Class` (7).

name_index
    

O valor do item `name_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Utf8_info` ([§4.4.7](<#/doc/jvms/jvms-04>)) representando um nome binário de classe ou interface válido codificado em forma interna ([§4.2.1](<#/doc/jvms/jvms-04>)).

Como arrays são objetos, os opcodes _anewarray_ e _multianewarray_ - mas não o opcode _new_ - podem referenciar "classes" de array via estruturas `CONSTANT_Class_info` na tabela `constant_pool`. Para tais classes de array, o nome da classe é o descritor do tipo de array ([§4.3.2](<#/doc/jvms/jvms-04>)).

Por exemplo, o nome da classe que representa o tipo de array bidimensional `int[][]` é `[[I`, enquanto o nome da classe que representa o tipo `Thread[]` é `[Ljava/lang/Thread;`.

Um descritor de tipo de array é válido apenas se representar 255 ou menos dimensões.

### 4.4.2. As Estruturas `CONSTANT_Fieldref_info`, `CONSTANT_Methodref_info` e `CONSTANT_InterfaceMethodref_info`

Campos, métodos e métodos de interface são representados por estruturas semelhantes:
```
    CONSTANT_Fieldref_info {
        u1 tag;
        u2 class_index;
        u2 name_and_type_index;
    }
    
    CONSTANT_Methodref_info {
        u1 tag;
        u2 class_index;
        u2 name_and_type_index;
    }
    
    CONSTANT_InterfaceMethodref_info {
        u1 tag;
        u2 class_index;
        u2 name_and_type_index;
    }
    
```

Os itens dessas estruturas são os seguintes:

tag
    

O item `tag` de uma estrutura `CONSTANT_Fieldref_info` tem o valor `CONSTANT_Fieldref` (9).

O item `tag` de uma estrutura `CONSTANT_Methodref_info` tem o valor `CONSTANT_Methodref` (10).

O item `tag` de uma estrutura `CONSTANT_InterfaceMethodref_info` tem o valor `CONSTANT_InterfaceMethodref` (11).

class_index
    

O valor do item `class_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Class_info` ([§4.4.1](<#/doc/jvms/jvms-04>)) representando um tipo de classe ou interface que possui o campo ou método como membro.

Em uma estrutura `CONSTANT_Fieldref_info`, o item `class_index` pode ser um tipo de classe ou um tipo de interface.

Em uma estrutura `CONSTANT_Methodref_info`, o item `class_index` deve ser um tipo de classe, não um tipo de interface.

Em uma estrutura `CONSTANT_InterfaceMethodref_info`, o item `class_index` deve ser um tipo de interface, não um tipo de classe.

name_and_type_index
    

O valor do item `name_and_type_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_NameAndType_info` ([§4.4.6](<#/doc/jvms/jvms-04>)). Esta entrada `constant_pool` indica o nome e o descritor do campo ou método.

Em uma estrutura `CONSTANT_Fieldref_info`, o descritor indicado deve ser um descritor de campo ([§4.3.2](<#/doc/jvms/jvms-04>)). Caso contrário, o descritor indicado deve ser um descritor de método ([§4.3.3](<#/doc/jvms/jvms-04>)).

Se o nome do método em uma estrutura `CONSTANT_Methodref_info` começar com um '`<`' ('`\u003c`'), então o nome deve ser o nome especial `<init>`, representando um método de inicialização de instância ([§2.9.1](<#/doc/jvms/jvms-02>)). O tipo de retorno de tal método deve ser `void`.

### 4.4.3. A Estrutura `CONSTANT_String_info`

A estrutura `CONSTANT_String_info` é usada para representar objetos constantes do tipo `String`:
```
    CONSTANT_String_info {
        u1 tag;
        u2 string_index;
    }
    
```

Os itens da estrutura `CONSTANT_String_info` são os seguintes:

tag
    

O item `tag` tem o valor `CONSTANT_String` (8).

string_index
    

O valor do item `string_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Utf8_info` ([§4.4.7](<#/doc/jvms/jvms-04>)) representando a sequência de code points Unicode com a qual o objeto `String` deve ser inicializado.

### 4.4.4. As Estruturas `CONSTANT_Integer_info` e `CONSTANT_Float_info`

As estruturas `CONSTANT_Integer_info` e `CONSTANT_Float_info` representam constantes numéricas de 4 bytes (`int` e `float`):
```
    CONSTANT_Integer_info {
        u1 tag;
        u4 bytes;
    }
    
    CONSTANT_Float_info {
        u1 tag;
        u4 bytes;
    }
    
```

Os itens dessas estruturas são os seguintes:

tag
    

O item `tag` da estrutura `CONSTANT_Integer_info` tem o valor `CONSTANT_Integer` (3).

O item `tag` da estrutura `CONSTANT_Float_info` tem o valor `CONSTANT_Float` (4).

bytes
    

O item `bytes` da estrutura `CONSTANT_Integer_info` representa o valor da constante `int`. Os bytes do valor são armazenados em ordem big-endian (byte mais significativo primeiro).

O item `bytes` da estrutura `CONSTANT_Float_info` representa o valor da constante `float` no formato de ponto flutuante IEEE 754 binary32 ([§2.3.2](<#/doc/jvms/jvms-02>)). Os bytes do item são armazenados em ordem big-endian (byte mais significativo primeiro).

O valor representado pela estrutura `CONSTANT_Float_info` é determinado da seguinte forma. Os bytes do valor são primeiro convertidos em uma constante `int` _bits_. Então:

  * Se _bits_ for `0x7f800000`, o valor `float` será infinito positivo.

  * Se _bits_ for `0xff800000`, o valor `float` será infinito negativo.

  * Se _bits_ estiver no intervalo `0x7f800001` a `0x7fffffff` ou no intervalo `0xff800001` a `0xffffffff`, o valor `float` será NaN.

  * Em todos os outros casos, sejam `s`, `e` e `m` três valores que podem ser computados a partir de _bits_:
```int s = ((_bits_ >> 31) == 0) ? 1 : -1;
        int e = ((_bits_ >> 23) & 0xff);
        int m = (e == 0) ?
                  (_bits_ & 0x7fffff) << 1 :
                  (_bits_ & 0x7fffff) | 0x800000;
                  
```

Então o valor `float` é igual ao resultado da expressão matemática `s * m * 2e-150`.

### 4.4.5. As Estruturas `CONSTANT_Long_info` e `CONSTANT_Double_info`

As estruturas `CONSTANT_Long_info` e `CONSTANT_Double_info` representam constantes numéricas de 8 bytes (`long` e `double`):
```
    CONSTANT_Long_info {
        u1 tag;
        u4 high_bytes;
        u4 low_bytes;
    }
    
    CONSTANT_Double_info {
        u1 tag;
        u4 high_bytes;
        u4 low_bytes;
    }
    
```

Todas as constantes de 8 bytes ocupam duas entradas na tabela `constant_pool` do arquivo `class`. Se uma estrutura `CONSTANT_Long_info` ou `CONSTANT_Double_info` for a entrada no índice _n_ na tabela `constant_pool`, então a próxima entrada utilizável na tabela estará localizada no índice _n_ +2. O índice `constant_pool` _n_ +1 deve ser válido, mas é considerado inutilizável.

Em retrospecto, fazer com que constantes de 8 bytes ocupassem duas entradas no constant pool foi uma escolha ruim.

Os itens dessas estruturas são os seguintes:

tag
    

O item `tag` da estrutura `CONSTANT_Long_info` tem o valor `CONSTANT_Long` (5).

O item `tag` da estrutura `CONSTANT_Double_info` tem o valor `CONSTANT_Double` (6).

high_bytes, low_bytes
    

Os itens `high_bytes` e `low_bytes` não assinados da estrutura `CONSTANT_Long_info` juntos representam o valor da constante `long`
```
    ((long) high_bytes << 32) + low_bytes
          
```
onde os bytes de cada um de `high_bytes` e `low_bytes` são armazenados em ordem big-endian (byte mais significativo primeiro).

Os itens `high_bytes` e `low_bytes` da estrutura `CONSTANT_Double_info` juntos representam o valor `double` no formato de ponto flutuante IEEE 754 binary64 ([§2.3.2](<#/doc/jvms/jvms-02>)). Os bytes de cada item são armazenados em ordem big-endian (byte mais significativo primeiro).

O valor representado pela estrutura `CONSTANT_Double_info` é determinado da seguinte forma. Os itens `high_bytes` e `low_bytes` são convertidos na constante `long` _bits_, que é igual a
```
    ((long) high_bytes << 32) + low_bytes
          
```
Então:

  * Se _bits_ for `0x7ff0000000000000L`, o valor `double` será infinito positivo.

  * Se _bits_ for `0xfff0000000000000L`, o valor `double` será infinito negativo.

  * Se _bits_ estiver no intervalo `0x7ff0000000000001L` a `0x7fffffffffffffffL` ou no intervalo `0xfff0000000000001L` a `0xffffffffffffffffL`, o valor double será NaN.

  * Em todos os outros casos, sejam `s`, `e` e `m` três valores que podem ser computados a partir de _bits_:
```int s = ((_bits_ >> 63) == 0) ? 1 : -1;
        int e = (int)((_bits_ >> 52) & 0x7ffL);
        long m = (e == 0) ?
                   (_bits_ & 0xfffffffffffffL) << 1 :
                   (_bits_ & 0xfffffffffffffL) | 0x10000000000000L;
                  
```

Então o valor de ponto flutuante é igual ao valor `double` da expressão matemática `s * m * 2e-1075`.

### 4.4.6. A Estrutura `CONSTANT_NameAndType_info`

A estrutura `CONSTANT_NameAndType_info` é usada para representar um campo ou método, sem indicar a qual tipo de classe ou interface ele pertence:
```
    CONSTANT_NameAndType_info {
        u1 tag;
        u2 name_index;
        u2 descriptor_index;
    }
    
```

Os itens da estrutura `CONSTANT_NameAndType_info` são os seguintes:

tag
    

O item `tag` tem o valor `CONSTANT_NameAndType` (12).

name_index
    

O valor do item `name_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Utf8_info` ([§4.4.7](<#/doc/jvms/jvms-04>)) representando um nome não qualificado válido que denota um campo ou método ([§4.2.2](<#/doc/jvms/jvms-04>)), ou o nome de método especial `<init>` ([§2.9.1](<#/doc/jvms/jvms-02>)).

descriptor_index
    

O valor do item `descriptor_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Utf8_info` ([§4.4.7](<#/doc/jvms/jvms-04>)) representando um descritor de campo ou descritor de método válido ([§4.3.2](<#/doc/jvms/jvms-04>), [§4.3.3](<#/doc/jvms/jvms-04>)).

### 4.4.7. A Estrutura `CONSTANT_Utf8_info`

A estrutura `CONSTANT_Utf8_info` é usada para representar valores de string constantes:
```
    CONSTANT_Utf8_info {
        u1 tag;
        u2 length;
        u1 bytes[length];
    }
    
```

Os itens da estrutura `CONSTANT_Utf8_info` são os seguintes:

tag
    

O item `tag` tem o valor `CONSTANT_Utf8` (1).

length
    

O valor do item `length` fornece o número de bytes no array `bytes` (não o comprimento da string resultante).

bytes[]
    

O array `bytes` contém os bytes da string.

Nenhum byte pode ter o valor `(byte)0`.

Nenhum byte pode estar no intervalo `(byte)0xf0` a `(byte)0xff`.

O conteúdo da string é codificado em UTF-8 modificado. Strings UTF-8 modificadas são codificadas de forma que sequências de code points que contêm apenas caracteres ASCII não nulos possam ser representadas usando apenas 1 byte por code point, mas todos os code points no codespace Unicode podem ser representados. Strings UTF-8 modificadas não são terminadas em nulo. A codificação é a seguinte:

  * Code points no intervalo '`\u0001`' a '`\u007F`' são representados por um único byte:

**Tabela 4.6.**

_0_ | _bits 6-0_
---|---

Os 7 bits de dados no byte fornecem o valor do code point representado.

  * O code point nulo ('`\u0000`') e os code points no intervalo '`\u0080`' a '`\u07FF`' são representados por um par de bytes `x` e `y`:

**Tabela 4.7.**

`x`: | **Tabela 4.8.** | _1_ | _1_ | _0_ | _bits 10-6_
---|---|---|---|---



`y`: | **Tabela 4.9.** | _1_ | _0_ | _bits 5-0_
---|---|---

Os dois bytes representam o code point com o valor:
```((x & 0x1f) << 6) + (y & 0x3f)
            
```

  * Code points no intervalo '`\u0800`' a '`\uFFFF`' são representados por 3 bytes `x`, `y` e `z`:

**Tabela 4.10.**

`x`: | **Tabela 4.11.** | _1_ | _1_ | _1_ | _0_ | _bits 15-12_
---|---|---|---|---



`y`: | **Tabela 4.12.** | _1_ | _0_ | _bits 11-6_
---|---|---



`z`: | **Tabela 4.13.** | _1_ | _0_ | _bits 5-0_
---|---|---

Os três bytes representam o code point com o valor:
```((x & 0xf) << 12) + ((y & 0x3f) << 6) + (z & 0x3f)
            
```

  * Caracteres com code points acima de U+FFFF (os chamados _caracteres suplementares_) são representados codificando separadamente as duas unidades de código substitutas de sua representação UTF-16. Cada uma das unidades de código substitutas é representada por três bytes. Isso significa que os caracteres suplementares são representados por seis bytes, `u`, `v`, `w`, `x`, `y` e `z`:

**Tabela 4.14.**

`u`: | **Tabela 4.15.** | _1_ | _1_ | _1_ | _0_ | _1_ | _1_ | _0_ | _1_
---|---|---|---|---|---|---|---



`v`: | **Tabela 4.16.** | _1_ | _0_ | _1_ | _0_ | _(bits 20-16)-1_
---|---|---|---|---



`w`: | **Tabela 4.17.** | _1_ | _0_ | _bits 15-10_
---|---|---



`x`: | **Tabela 4.18.** | _1_ | _1_ | _1_ | _0_ | _1_ | _1_ | _0_ | _1_
---|---|---|---|---|---|---|---



`y`: | **Tabela 4.19.** | _1_ | _0_ | _1_ | _1_ | _bits 9-6_
---|---|---|---|---



`z`: | **Tabela 4.20.** | _1_ | _0_ | _bits 5-0_
---|---|---

Os seis bytes representam o code point com o valor:
```0x10000 + ((v & 0x0f) << 16) + ((w & 0x3f) << 10) +
        ((y & 0x0f) << 6) + (z & 0x3f)
            
```

Os bytes de caracteres multibyte são armazenados no arquivo `class` em ordem big-endian (byte mais significativo primeiro).

Existem duas diferenças entre este formato e o formato UTF-8 "padrão". Primeiro, o caractere nulo `(char)0` é codificado usando o formato de 2 bytes em vez do formato de 1 byte, para que as strings UTF-8 modificadas nunca tenham nulos incorporados. Segundo, apenas os formatos de 1, 2 e 3 bytes do UTF-8 padrão são usados. A Java Virtual Machine não reconhece o formato de quatro bytes do UTF-8 padrão; ela usa seu próprio formato de dois-vezes-três-bytes.

Para mais informações sobre o formato UTF-8 padrão, consulte a Seção 3.9 _Unicode Encoding Forms_ de _The Unicode Standard, Version 16.0.0_.

### 4.4.8. A Estrutura `CONSTANT_MethodHandle_info`

A estrutura `CONSTANT_MethodHandle_info` é usada para representar um method handle:
```
    CONSTANT_MethodHandle_info {
        u1 tag;
        u1 reference_kind;
        u2 reference_index;
    }
    
```

Os itens da estrutura `CONSTANT_MethodHandle_info` são os seguintes:

tag
    

O item `tag` tem o valor `CONSTANT_MethodHandle` (15).

reference_kind
    

O valor do item `reference_kind` deve estar no intervalo de 1 a 9. O valor denota o _tipo_ deste method handle, que caracteriza seu comportamento de bytecode ([§5.4.3.5](<#/doc/jvms/jvms-05>)).

reference_index
    

O valor do item `reference_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser a seguinte:

  * Se o valor do item `reference_kind` for 1 (`REF_getField`), 2 (`REF_getStatic`), 3 (`REF_putField`) ou 4 (`REF_putStatic`), então a entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Fieldref_info` ([§4.4.2](<#/doc/jvms/jvms-04>)) representando um campo para o qual um method handle deve ser criado.

  * Se o valor do item `reference_kind` for 5 (`REF_invokeVirtual`) ou 8 (`REF_newInvokeSpecial`), então a entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Methodref_info` ([§4.4.2](<#/doc/jvms/jvms-04>)) representando um método ou construtor de uma classe ([§2.9.1](<#/doc/jvms/jvms-02>)) para o qual um method handle deve ser criado.
* Se o valor do item `reference_kind` for 6 (`REF_invokeStatic`) ou 7 (`REF_invokeSpecial`), então, se o número da versão do `class` file for menor que 52.0, a entrada da `constant_pool` naquele índice deve ser uma estrutura `CONSTANT_Methodref_info` representando um método de uma classe para o qual um method handle deve ser criado; se o número da versão do `class` file for 52.0 ou superior, a entrada da `constant_pool` naquele índice deve ser uma estrutura `CONSTANT_Methodref_info` ou uma estrutura `CONSTANT_InterfaceMethodref_info` ([§4.4.2](<#/doc/jvms/jvms-04>)) representando um método de uma classe ou interface para o qual um method handle deve ser criado.

* Se o valor do item `reference_kind` for 9 (`REF_invokeInterface`), então a entrada da `constant_pool` naquele índice deve ser uma estrutura `CONSTANT_InterfaceMethodref_info` representando um método de uma interface para o qual um method handle deve ser criado.

Se o valor do item `reference_kind` for 5 (`REF_invokeVirtual`), 6 (`REF_invokeStatic`), 7 (`REF_invokeSpecial`) ou 9 (`REF_invokeInterface`), o nome do método representado por uma estrutura `CONSTANT_Methodref_info` ou uma estrutura `CONSTANT_InterfaceMethodref_info` não deve ser `<init>` ou `<clinit>`.

Se o valor for 8 (`REF_newInvokeSpecial`), o nome do método representado por uma estrutura `CONSTANT_Methodref_info` deve ser `<init>`.

### 4.4.9. A Estrutura `CONSTANT_MethodType_info`

A estrutura `CONSTANT_MethodType_info` é usada para representar um method type:
```
    CONSTANT_MethodType_info {
        u1 tag;
        u2 descriptor_index;
    }
```

Os itens da estrutura `CONSTANT_MethodType_info` são os seguintes:

tag
    

O item `tag` tem o valor `CONSTANT_MethodType` (16).

descriptor_index
    

O valor do item `descriptor_index` deve ser um índice válido na tabela `constant_pool`. A entrada da `constant_pool` naquele índice deve ser uma estrutura `CONSTANT_Utf8_info` ([§4.4.7](<#/doc/jvms/jvms-04>)) representando um method descriptor ([§4.3.3](<#/doc/jvms/jvms-04>)).

### 4.4.10. As Estruturas `CONSTANT_Dynamic_info` e `CONSTANT_InvokeDynamic_info`

A maioria das estruturas na tabela `constant_pool` representa entidades diretamente, combinando nomes, descritores e valores registrados estaticamente na tabela. Em contraste, as estruturas `CONSTANT_Dynamic_info` e `CONSTANT_InvokeDynamic_info` representam entidades indiretamente, apontando para um código que calcula uma entidade dinamicamente. O código, chamado de _bootstrap method_, é invocado pela Java Virtual Machine durante a resolução de referências simbólicas derivadas dessas estruturas ([§5.1](<#/doc/jvms/jvms-05>), [§5.4.3.6](<#/doc/jvms/jvms-05>)). Cada estrutura especifica um bootstrap method, bem como um nome e tipo auxiliares que caracterizam a entidade a ser computada. Em mais detalhes:

* A estrutura `CONSTANT_Dynamic_info` é usada para representar uma _dynamically-computed constant_, um valor arbitrário que é produzido pela invocação de um bootstrap method no curso de uma instrução _ldc_ ([§ _ldc_](<#/doc/jvms/jvms-06>)), entre outras. O tipo auxiliar especificado pela estrutura restringe o tipo da dynamically-computed constant.

* A estrutura `CONSTANT_InvokeDynamic_info` é usada para representar um _dynamically-computed call site_, uma instância de `java.lang.invoke.CallSite` que é produzida pela invocação de um bootstrap method no curso de uma instrução _invokedynamic_ ([§ _invokedynamic_](<#/doc/jvms/jvms-06>)). O tipo auxiliar especificado pela estrutura restringe o method type do dynamically-computed call site.

```
    CONSTANT_Dynamic_info {
        u1 tag;
        u2 bootstrap_method_attr_index;
        u2 name_and_type_index;
    }
    
    CONSTANT_InvokeDynamic_info {
        u1 tag;
        u2 bootstrap_method_attr_index;
        u2 name_and_type_index;
    }
```

Os itens dessas estruturas são os seguintes:

tag
    

O item `tag` de uma estrutura `CONSTANT_Dynamic_info` tem o valor `CONSTANT_Dynamic` (17).

O item `tag` de uma estrutura `CONSTANT_InvokeDynamic_info` tem o valor `CONSTANT_InvokeDynamic` (18).

bootstrap_method_attr_index
    

O valor do item `bootstrap_method_attr_index` deve ser um índice válido no array `bootstrap_methods` da tabela de bootstrap method deste `class` file ([§4.7.23](<#/doc/jvms/jvms-04>)).

As estruturas `CONSTANT_Dynamic_info` são únicas porque são sintaticamente permitidas a se referir a si mesmas através da tabela de bootstrap method. Em vez de exigir que tais ciclos sejam detectados quando as classes são carregadas (uma verificação potencialmente cara), permitimos ciclos inicialmente, mas exigimos uma falha na resolução ([§5.4.3.6](<#/doc/jvms/jvms-05>)).

name_and_type_index
    

O valor do item `name_and_type_index` deve ser um índice válido na tabela `constant_pool`. A entrada da `constant_pool` naquele índice deve ser uma estrutura `CONSTANT_NameAndType_info` ([§4.4.6](<#/doc/jvms/jvms-04>)). Esta entrada da `constant_pool` indica um nome e um descritor.

Em uma estrutura `CONSTANT_Dynamic_info`, o descritor indicado deve ser um field descriptor ([§4.3.2](<#/doc/jvms/jvms-04>)).

Em uma estrutura `CONSTANT_InvokeDynamic_info`, o descritor indicado deve ser um method descriptor ([§4.3.3](<#/doc/jvms/jvms-04>)).

### 4.4.11. A Estrutura `CONSTANT_Module_info`

A estrutura `CONSTANT_Module_info` é usada para representar um module:
```
    CONSTANT_Module_info {
        u1 tag;
        u2 name_index;
    }
```

Os itens da estrutura `CONSTANT_Module_info` são os seguintes:

tag
    

O item `tag` tem o valor `CONSTANT_Module` (19).

name_index
    

O valor do item `name_index` deve ser um índice válido na tabela `constant_pool`. A entrada da `constant_pool` naquele índice deve ser uma estrutura `CONSTANT_Utf8_info` ([§4.4.7](<#/doc/jvms/jvms-04>)) representando um module name válido ([§4.2.3](<#/doc/jvms/jvms-04>)).

Uma estrutura `CONSTANT_Module_info` é permitida apenas na constant pool de um `class` file que declara um module, ou seja, uma estrutura `ClassFile` onde o item `access_flags` tem a flag `ACC_MODULE` definida. Em todos os outros `class` files, uma estrutura `CONSTANT_Module_info` é ilegal.

### 4.4.12. A Estrutura `CONSTANT_Package_info`

A estrutura `CONSTANT_Package_info` é usada para representar um package exportado ou aberto por um module:
```
    CONSTANT_Package_info {
        u1 tag;
        u2 name_index;
    }
```

Os itens da estrutura `CONSTANT_Package_info` são os seguintes:

tag
    

O item `tag` tem o valor `CONSTANT_Package` (20).

name_index
    

O valor do item `name_index` deve ser um índice válido na tabela `constant_pool`. A entrada da `constant_pool` naquele índice deve ser uma estrutura `CONSTANT_Utf8_info` ([§4.4.7](<#/doc/jvms/jvms-04>)) representando um package name válido codificado em formato interno ([§4.2.3](<#/doc/jvms/jvms-04>)).

Uma estrutura `CONSTANT_Package_info` é permitida apenas na constant pool de um `class` file que declara um module, ou seja, uma estrutura `ClassFile` onde o item `access_flags` tem a flag `ACC_MODULE` definida. Em todos os outros `class` files, uma estrutura `CONSTANT_Package_info` é ilegal.

## 4.5. Fields

Cada field é descrito por uma estrutura `field_info`.

Nenhum dois fields em um `class` file podem ter o mesmo nome e descriptor ([§4.3.2](<#/doc/jvms/jvms-04>)).

A estrutura tem o seguinte formato:
```
    field_info {
        u2             access_flags;
        u2             name_index;
        u2             descriptor_index;
        u2             attributes_count;
        attribute_info attributes[attributes_count];
    }
```

Os itens da estrutura `field_info` são os seguintes:

access_flags
    

O valor do item `access_flags` é uma máscara de flags usadas para denotar permissão de acesso e propriedades deste field. A interpretação de cada flag, quando definida, é especificada na [Tabela 4.5-A](<#/doc/jvms/jvms-04>).

**Table 4.5-A. Field access and property flags**

Flag Name | Value | Interpretation
---|---|---
`ACC_PUBLIC` | `0x0001` | Declarado `public`; pode ser acessado de fora do seu package.
`ACC_PRIVATE` | `0x0002` | Declarado `private`; acessível apenas dentro da classe definidora e outras classes pertencentes ao mesmo nest ([§5.4.4](<#/doc/jvms/jvms-05>)).
`ACC_PROTECTED` | `0x0004` | Declarado `protected`; pode ser acessado dentro de subclasses.
`ACC_STATIC` | `0x0008` | Declarado `static`.
`ACC_FINAL` | `0x0010` | Declarado `final`; nunca diretamente atribuído após a construção do objeto (JLS §17.5).
`ACC_VOLATILE` | `0x0040` | Declarado `volatile`; não pode ser armazenado em cache.
`ACC_TRANSIENT` | `0x0080` | Declarado `transient`; não escrito ou lido por um gerenciador de objetos persistentes.
`ACC_SYNTHETIC` | `0x1000` | Declarado synthetic; não presente no código fonte.
`ACC_ENUM` | `0x4000` | Declarado como um elemento de uma classe `enum`.

Fields de classes podem definir qualquer uma das flags na [Tabela 4.5-A](<#/doc/jvms/jvms-04>). No entanto, cada field de uma classe pode ter no máximo uma de suas flags `ACC_PUBLIC`, `ACC_PRIVATE` e `ACC_PROTECTED` definidas (JLS §8.3.1), e não deve ter ambas as flags `ACC_FINAL` e `ACC_VOLATILE` definidas (JLS §8.3.1.4).

Fields de interfaces devem ter suas flags `ACC_PUBLIC`, `ACC_STATIC` e `ACC_FINAL` definidas; eles podem ter sua flag `ACC_SYNTHETIC` definida e não devem ter nenhuma das outras flags na [Tabela 4.5-A](<#/doc/jvms/jvms-04>) definida (JLS §9.3).

A flag `ACC_SYNTHETIC` indica que este field foi gerado por um compilador e não aparece no código fonte.

A flag `ACC_ENUM` indica que este field é usado para armazenar um elemento de uma classe `enum` (JLS §8.9).

Todos os bits do item `access_flags` não atribuídos na [Tabela 4.5-A](<#/doc/jvms/jvms-04>) são reservados para uso futuro. Eles devem ser definidos como zero em `class` files gerados e devem ser ignorados pelas implementações da Java Virtual Machine.

name_index
    

O valor do item `name_index` deve ser um índice válido na tabela `constant_pool`. A entrada da `constant_pool` naquele índice deve ser uma estrutura `CONSTANT_Utf8_info` ([§4.4.7](<#/doc/jvms/jvms-04>)) que representa um unqualified name válido denotando um field ([§4.2.2](<#/doc/jvms/jvms-04>)).

descriptor_index
    

O valor do item `descriptor_index` deve ser um índice válido na tabela `constant_pool`. A entrada da `constant_pool` naquele índice deve ser uma estrutura `CONSTANT_Utf8_info` ([§4.4.7](<#/doc/jvms/jvms-04>)) que representa um field descriptor válido ([§4.3.2](<#/doc/jvms/jvms-04>)).

attributes_count
    

O valor do item `attributes_count` indica o número de atributos adicionais deste field.

attributes[]
    

Cada valor da tabela `attributes` deve ser uma estrutura `attribute_info` ([§4.7](<#/doc/jvms/jvms-04>)).

Um field pode ter qualquer número de atributos opcionais associados a ele.

Os atributos definidos por esta especificação como aparecendo na tabela `attributes` de uma estrutura `field_info` estão listados na [Tabela 4.7-C](<#/doc/jvms/jvms-04>).

As regras relativas aos atributos definidos para aparecer na tabela `attributes` de uma estrutura `field_info` são dadas em [§4.7](<#/doc/jvms/jvms-04>).

As regras relativas aos atributos não predefinidos na tabela `attributes` de uma estrutura `field_info` são dadas em [§4.7.1](<#/doc/jvms/jvms-04>).

## 4.6. Methods

Cada method, incluindo cada instance initialization method ([§2.9.1](<#/doc/jvms/jvms-02>)) e o class or interface initialization method ([§2.9.2](<#/doc/jvms/jvms-02>)), é descrito por uma estrutura `method_info`.

Nenhum dois methods em um `class` file podem ter o mesmo nome e descriptor ([§4.3.3](<#/doc/jvms/jvms-04>)).

A estrutura tem o seguinte formato:
```
    method_info {
        u2             access_flags;
        u2             name_index;
        u2             descriptor_index;
        u2             attributes_count;
        attribute_info attributes[attributes_count];
    }
```

Os itens da estrutura `method_info` são os seguintes:

access_flags
    

O valor do item `access_flags` é uma máscara de flags usadas para denotar permissão de acesso e propriedades deste method. A interpretação de cada flag, quando definida, é especificada na [Tabela 4.6-A](<#/doc/jvms/jvms-04>).

**Table 4.6-A. Method access and property flags**

Flag Name | Value | Interpretation
---|---|---
`ACC_PUBLIC` | `0x0001` | Declarado `public`; pode ser acessado de fora do seu package.
`ACC_PRIVATE` | `0x0002` | Declarado `private`; acessível apenas dentro da classe definidora e outras classes pertencentes ao mesmo nest ([§5.4.4](<#/doc/jvms/jvms-05>)).
`ACC_PROTECTED` | `0x0004` | Declarado `protected`; pode ser acessado dentro de subclasses.
`ACC_STATIC` | `0x0008` | Declarado `static`.
`ACC_FINAL` | `0x0010` | Declarado `final`; não deve ser sobrescrito ([§5.4.5](<#/doc/jvms/jvms-05>)).
`ACC_SYNCHRONIZED` | `0x0020` | Declarado `synchronized`; a invocação é envolvida por um uso de monitor.
`ACC_BRIDGE` | `0x0040` | Um bridge method, gerado pelo compilador.
`ACC_VARARGS` | `0x0080` | Declarado com número variável de argumentos.
`ACC_NATIVE` | `0x0100` | Declarado `native`; implementado em uma linguagem diferente da linguagem de programação Java.
`ACC_ABSTRACT` | `0x0400` | Declarado `abstract`; nenhuma implementação é fornecida.
`ACC_STRICT` | `0x0800` | Em um `class` file cujo número de versão principal é pelo menos 46 e no máximo 60: Declarado `strictfp`.

O valor 0x0800 é interpretado como a flag `ACC_STRICT` apenas em um `class` file cujo número de versão principal é pelo menos 46 e no máximo 60. Para methods em tal `class` file, as regras abaixo determinam se a flag `ACC_STRICT` pode ser definida em combinação com outras flags. (Definir a flag `ACC_STRICT` restringia as instruções floating-point de um method no Java SE 1.2 até 16 ([§2.8](<#/doc/jvms/jvms-02>)).) Para methods em um `class` file cujo número de versão principal é menor que 46 ou maior que 60, o valor 0x0800 não é interpretado como a flag `ACC_STRICT`, mas sim como não atribuído; não é significativo "definir a flag `ACC_STRICT`" em tal `class` file.

Methods de classes podem ter qualquer uma das flags na [Tabela 4.6-A](<#/doc/jvms/jvms-04>) definidas. No entanto, cada method de uma classe pode ter no máximo uma de suas flags `ACC_PUBLIC`, `ACC_PRIVATE` e `ACC_PROTECTED` definidas (JLS §8.4.3).

Methods de interfaces podem ter qualquer uma das flags na [Tabela 4.6-A](<#/doc/jvms/jvms-04>) definidas, exceto `ACC_PROTECTED`, `ACC_FINAL`, `ACC_SYNCHRONIZED` e `ACC_NATIVE` (JLS §9.4). Em um `class` file cujo número de versão é menor que 52.0, cada method de uma interface deve ter suas flags `ACC_PUBLIC` e `ACC_ABSTRACT` definidas; em um `class` file cujo número de versão é 52.0 ou superior, cada method de uma interface deve ter exatamente uma de suas flags `ACC_PUBLIC` e `ACC_PRIVATE` definidas.

Se um method de uma classe ou interface tem sua flag `ACC_ABSTRACT` definida, ele não deve ter nenhuma de suas flags `ACC_PRIVATE`, `ACC_STATIC`, `ACC_FINAL`, `ACC_SYNCHRONIZED` ou `ACC_NATIVE` definidas, nem (em um `class` file cujo número de versão principal é pelo menos 46 e no máximo 60) ter sua flag `ACC_STRICT` definida.

Um instance initialization method ([§2.9.1](<#/doc/jvms/jvms-02>)) pode ter no máximo uma de suas flags `ACC_PUBLIC`, `ACC_PRIVATE` e `ACC_PROTECTED` definidas, e também pode ter suas flags `ACC_VARARGS` e `ACC_SYNTHETIC` definidas, e também pode (em um `class` file cujo número de versão principal é pelo menos 46 e no máximo 60) ter sua flag `ACC_STRICT` definida, mas não deve ter nenhuma das outras flags na [Tabela 4.6-A](<#/doc/jvms/jvms-04>) definida.

Em um `class` file cujo número de versão é 51.0 ou superior, um method cujo nome é `<clinit>` deve ter sua flag `ACC_STATIC` definida.

Um class or interface initialization method ([§2.9.2](<#/doc/jvms/jvms-02>)) é chamado implicitamente pela Java Virtual Machine. O valor do seu item `access_flags` é ignorado, exceto pela definição da flag `ACC_STATIC` e (em um `class` file cujo número de versão principal é pelo menos 46 e no máximo 60) da flag `ACC_STRICT`, e o method está isento das regras precedentes sobre combinações legais de flags.

A flag `ACC_BRIDGE` é usada para indicar um bridge method gerado por um compilador para a linguagem de programação Java.

A flag `ACC_VARARGS` indica que este method aceita um número variável de argumentos no nível do código fonte. Um method declarado para aceitar um número variável de argumentos deve ser compilado com a flag `ACC_VARARGS` definida como 1. Todos os outros methods devem ser compilados com a flag `ACC_VARARGS` definida como 0.

A flag `ACC_SYNTHETIC` indica que este method foi gerado por um compilador e não aparece no código fonte, a menos que seja um dos methods nomeados em [§4.7.8](<#/doc/jvms/jvms-04>).

Todos os bits do item `access_flags` não atribuídos na [Tabela 4.6-A](<#/doc/jvms/jvms-04>) são reservados para uso futuro. (Isso inclui o bit correspondente a 0x0800 em um `class` file cujo número de versão principal é menor que 46 ou maior que 60.) Eles devem ser definidos como zero em `class` files gerados e devem ser ignorados pelas implementações da Java Virtual Machine.

name_index
    

O valor do item `name_index` deve ser um índice válido na tabela `constant_pool`. A entrada da `constant_pool` naquele índice deve ser uma estrutura `CONSTANT_Utf8_info` ([§4.4.7](<#/doc/jvms/jvms-04>)) representando um unqualified name válido denotando um method ([§4.2.2](<#/doc/jvms/jvms-04>)), ou (se este method estiver em uma classe em vez de uma interface) o nome de method especial `<init>`, ou o nome de method especial `<clinit>`.

descriptor_index
    

O valor do item `descriptor_index` deve ser um índice válido na tabela `constant_pool`. A entrada da `constant_pool` naquele índice deve ser uma estrutura `CONSTANT_Utf8_info` representando um method descriptor válido ([§4.3.3](<#/doc/jvms/jvms-04>)). Além disso:

* Se este method estiver em uma classe em vez de uma interface, e o nome do method for `<init>`, então o descriptor deve denotar um method `void`.

* Se o nome do method for `<clinit>`, então o descriptor deve denotar um method `void`, e, em um `class` file cujo número de versão é 51.0 ou superior, um method que não aceita argumentos.

Uma futura edição desta especificação pode exigir que o último parameter descriptor do method descriptor seja um array type se a flag `ACC_VARARGS` estiver definida no item `access_flags`.

attributes_count
    

O valor do item `attributes_count` indica o número de atributos adicionais deste method.

attributes[]
    

Cada valor da tabela `attributes` deve ser uma estrutura `attribute_info` ([§4.7](<#/doc/jvms/jvms-04>)).

Um method pode ter qualquer número de atributos opcionais associados a ele.

Os atributos definidos por esta especificação como aparecendo na tabela `attributes` de uma estrutura `method_info` estão listados na [Tabela 4.7-C](<#/doc/jvms/jvms-04>).

As regras relativas aos atributos definidos para aparecer na tabela `attributes` de uma estrutura `method_info` são dadas em [§4.7](<#/doc/jvms/jvms-04>).

As regras relativas aos atributos não predefinidos na tabela `attributes` de uma estrutura `method_info` são dadas em [§4.7.1](<#/doc/jvms/jvms-04>).
## 4.7. Atributos

_Atributos_ são usados nas estruturas `ClassFile`, `field_info`, `method_info`, `Code_attribute` e `record_component_info` do formato de arquivo `class` ([§4.1](<#/doc/jvms/jvms-04>), [§4.5](<#/doc/jvms/jvms-04>), [§4.6](<#/doc/jvms/jvms-04>), [§4.7.3](<#/doc/jvms/jvms-04>), [§4.7.30](<#/doc/jvms/jvms-04>)).

Todos os atributos possuem o seguinte formato geral:
```
    attribute_info {
        u2 attribute_name_index;
        u4 attribute_length;
        u1 info[attribute_length];
    }
    
```

Para todos os atributos, o item `attribute_name_index` deve ser um índice válido de 16 bits sem sinal na pool de constantes da classe. A entrada `constant_pool` em `attribute_name_index` deve ser uma estrutura `CONSTANT_Utf8_info` ([§4.4.7](<#/doc/jvms/jvms-04>)) representando o nome do atributo. O valor do item `attribute_length` indica o comprimento da informação subsequente em bytes. O comprimento não inclui os seis bytes iniciais que contêm os itens `attribute_name_index` e `attribute_length`.

30 atributos são predefinidos por esta especificação. Eles são listados três vezes, para facilitar a navegação:

  * [Tabela 4.7-A](<#/doc/jvms/jvms-04>) é ordenada pelos números de seção dos atributos neste capítulo. Cada atributo é mostrado com a primeira versão do formato de arquivo `class` em que foi definido. Também é mostrada a versão da Plataforma Java SE que introduziu essa versão do formato de arquivo `class` ([§4.1](<#/doc/jvms/jvms-04>)).

  * [Tabela 4.7-B](<#/doc/jvms/jvms-04>) é ordenada pela primeira versão do formato de arquivo `class` em que cada atributo foi definido.

  * [Tabela 4.7-C](<#/doc/jvms/jvms-04>) é ordenada pela localização em um arquivo `class` onde cada atributo é definido para aparecer.

No contexto de seu uso nesta especificação, ou seja, nas tabelas `attributes` das estruturas de arquivo `class` em que aparecem, os nomes desses atributos predefinidos são reservados.

Quaisquer condições sobre a presença de um atributo predefinido em uma tabela `attributes` são especificadas explicitamente na seção que descreve o atributo. Se nenhuma condição for especificada, então o atributo pode aparecer qualquer número de vezes em uma tabela `attributes`.

Os atributos predefinidos são categorizados em três grupos de acordo com seu propósito:

  1. Sete atributos são críticos para a interpretação correta do arquivo `class` pela Java Virtual Machine:

     * `ConstantValue`

     * `Code`

     * `StackMapTable`

     * `BootstrapMethods`

     * `NestHost`

     * `NestMembers`

     * `PermittedSubclasses`

Em um arquivo `class` cujo número de versão é _v_ , cada um desses atributos deve ser reconhecido e lido corretamente por uma implementação da Java Virtual Machine se a implementação suportar a versão _v_ do formato de arquivo `class`, e o atributo foi definido pela primeira vez na versão _v_ ou anterior do formato de arquivo `class`, e o atributo aparece em um local onde é definido para aparecer.

  2. Dez atributos não são críticos para a interpretação correta do arquivo `class` pela Java Virtual Machine, mas são críticos para a interpretação correta do arquivo `class` pelas bibliotecas de classes da Plataforma Java SE, ou são úteis para ferramentas (nesse caso, a seção que especifica um atributo o descreve como "opcional"):

     * `Exceptions`

     * `InnerClasses`

     * `EnclosingMethod`

     * `Synthetic`

     * `Signature`

     * `Record`

     * `SourceFile`

     * `LineNumberTable`

     * `LocalVariableTable`

     * `LocalVariableTypeTable`

Em um arquivo `class` cujo número de versão é _v_ , cada um desses atributos deve ser reconhecido e lido corretamente por uma implementação da Java Virtual Machine se a implementação suportar a versão _v_ do formato de arquivo `class`, e o atributo foi definido pela primeira vez na versão _v_ ou anterior do formato de arquivo `class`, e o atributo aparece em um local onde é definido para aparecer.

  3. Treze atributos não são críticos para a interpretação correta do arquivo `class` pela Java Virtual Machine, mas contêm metadados sobre o arquivo `class` que são expostos pelas bibliotecas de classes da Plataforma Java SE, ou disponibilizados por ferramentas (nesse caso, a seção que especifica um atributo o descreve como "opcional"):

     * `SourceDebugExtension`

     * `Deprecated`

     * `RuntimeVisibleAnnotations`

     * `RuntimeInvisibleAnnotations`

     * `RuntimeVisibleParameterAnnotations`

     * `RuntimeInvisibleParameterAnnotations`

     * `RuntimeVisibleTypeAnnotations`

     * `RuntimeInvisibleTypeAnnotations`

     * `AnnotationDefault`

     * `MethodParameters`

     * `Module`

     * `ModulePackages`

     * `ModuleMainClass`

Uma implementação da Java Virtual Machine pode usar as informações que esses atributos contêm, ou, caso contrário, deve ignorar silenciosamente esses atributos.

**Tabela 4.7-A. Atributos predefinidos de arquivo `class` (por seção)**

Atributo | Seção | Arquivo `class` | Java SE
---|---|---|---
`ConstantValue` | [§4.7.2](<#/doc/jvms/jvms-04>) | 45.3 | 1.0.2
`Code` | [§4.7.3](<#/doc/jvms/jvms-04>) | 45.3 | 1.0.2
`StackMapTable` | [§4.7.4](<#/doc/jvms/jvms-04>) | 50.0 | 6
`Exceptions` | [§4.7.5](<#/doc/jvms/jvms-04>) | 45.3 | 1.0.2
`InnerClasses` | [§4.7.6](<#/doc/jvms/jvms-04>) | 45.3 | 1.1
`EnclosingMethod` | [§4.7.7](<#/doc/jvms/jvms-04>) | 49.0 | 5.0
`Synthetic` | [§4.7.8](<#/doc/jvms/jvms-04>) | 45.3 | 1.1
`Signature` | [§4.7.9](<#/doc/jvms/jvms-04>) | 49.0 | 5.0
`SourceFile` | [§4.7.10](<#/doc/jvms/jvms-04>) | 45.3 | 1.0.2
`SourceDebugExtension` | [§4.7.11](<#/doc/jvms/jvms-04>) | 49.0 | 5.0
`LineNumberTable` | [§4.7.12](<#/doc/jvms/jvms-04>) | 45.3 | 1.0.2
`LocalVariableTable` | [§4.7.13](<#/doc/jvms/jvms-04>) | 45.3 | 1.0.2
`LocalVariableTypeTable` | [§4.7.14](<#/doc/jvms/jvms-04>) | 49.0 | 5.0
`Deprecated` | [§4.7.15](<#/doc/jvms/jvms-04>) | 45.3 | 1.1
`RuntimeVisibleAnnotations` | [§4.7.16](<#/doc/jvms/jvms-04>) | 49.0 | 5.0
`RuntimeInvisibleAnnotations` | [§4.7.17](<#/doc/jvms/jvms-04>) | 49.0 | 5.0
`RuntimeVisibleParameterAnnotations` | [§4.7.18](<#/doc/jvms/jvms-04>) | 49.0 | 5.0
`RuntimeInvisibleParameterAnnotations` | [§4.7.19](<#/doc/jvms/jvms-04>) | 49.0 | 5.0
`RuntimeVisibleTypeAnnotations` | [§4.7.20](<#/doc/jvms/jvms-04>) | 52.0 | 8
`RuntimeInvisibleTypeAnnotations` | [§4.7.21](<#/doc/jvms/jvms-04>) | 52.0 | 8
`AnnotationDefault` | [§4.7.22](<#/doc/jvms/jvms-04>) | 49.0 | 5.0
`BootstrapMethods` | [§4.7.23](<#/doc/jvms/jvms-04>) | 51.0 | 7
`MethodParameters` | [§4.7.24](<#/doc/jvms/jvms-04>) | 52.0 | 8
`Module` | [§4.7.25](<#/doc/jvms/jvms-04>) | 53.0 | 9
`ModulePackages` | [§4.7.26](<#/doc/jvms/jvms-04>) | 53.0 | 9
`ModuleMainClass` | [§4.7.27](<#/doc/jvms/jvms-04>) | 53.0 | 9
`NestHost` | [§4.7.28](<#/doc/jvms/jvms-04>) | 55.0 | 11
`NestMembers` | [§4.7.29](<#/doc/jvms/jvms-04>) | 55.0 | 11
`Record` | [§4.7.30](<#/doc/jvms/jvms-04>) | 60.0 | 16
`PermittedSubclasses` | [§4.7.31](<#/doc/jvms/jvms-04>) | 61.0 | 17

**Tabela 4.7-B. Atributos predefinidos de arquivo `class` (por formato de arquivo `class`)**

Atributo | Arquivo `class` | Java SE | Seção
---|---|---|---
`ConstantValue` | 45.3 | 1.0.2 | [§4.7.2](<#/doc/jvms/jvms-04>)
`Code` | 45.3 | 1.0.2 | [§4.7.3](<#/doc/jvms/jvms-04>)
`Exceptions` | 45.3 | 1.0.2 | [§4.7.5](<#/doc/jvms/jvms-04>)
`SourceFile` | 45.3 | 1.0.2 | [§4.7.10](<#/doc/jvms/jvms-04>)
`LineNumberTable` | 45.3 | 1.0.2 | [§4.7.12](<#/doc/jvms/jvms-04>)
`LocalVariableTable` | 45.3 | 1.0.2 | [§4.7.13](<#/doc/jvms/jvms-04>)
`InnerClasses` | 45.3 | 1.1 | [§4.7.6](<#/doc/jvms/jvms-04>)
`Synthetic` | 45.3 | 1.1 | [§4.7.8](<#/doc/jvms/jvms-04>)
`Deprecated` | 45.3 | 1.1 | [§4.7.15](<#/doc/jvms/jvms-04>)
`EnclosingMethod` | 49.0 | 5.0 | [§4.7.7](<#/doc/jvms/jvms-04>)
`Signature` | 49.0 | 5.0 | [§4.7.9](<#/doc/jvms/jvms-04>)
`SourceDebugExtension` | 49.0 | 5.0 | [§4.7.11](<#/doc/jvms/jvms-04>)
`LocalVariableTypeTable` | 49.0 | 5.0 | [§4.7.14](<#/doc/jvms/jvms-04>)
`RuntimeVisibleAnnotations` | 49.0 | 5.0 | [§4.7.16](<#/doc/jvms/jvms-04>)
`RuntimeInvisibleAnnotations` | 49.0 | 5.0 | [§4.7.17](<#/doc/jvms/jvms-04>)
`RuntimeVisibleParameterAnnotations` | 49.0 | 5.0 | [§4.7.18](<#/doc/jvms/jvms-04>)
`RuntimeInvisibleParameterAnnotations` | 49.0 | 5.0 | [§4.7.19](<#/doc/jvms/jvms-04>)
`AnnotationDefault` | 49.0 | 5.0 | [§4.7.22](<#/doc/jvms/jvms-04>)
`StackMapTable` | 50.0 | 6 | [§4.7.4](<#/doc/jvms/jvms-04>)
`BootstrapMethods` | 51.0 | 7 | [§4.7.23](<#/doc/jvms/jvms-04>)
`RuntimeVisibleTypeAnnotations` | 52.0 | 8 | [§4.7.20](<#/doc/jvms/jvms-04>)
`RuntimeInvisibleTypeAnnotations` | 52.0 | 8 | [§4.7.21](<#/doc/jvms/jvms-04>)
`MethodParameters` | 52.0 | 8 | [§4.7.24](<#/doc/jvms/jvms-04>)
`Module` | 53.0 | 9 | [§4.7.25](<#/doc/jvms/jvms-04>)
`ModulePackages` | 53.0 | 9 | [§4.7.26](<#/doc/jvms/jvms-04>)
`ModuleMainClass` | 53.0 | 9 | [§4.7.27](<#/doc/jvms/jvms-04>)
`NestHost` | 55.0 | 11 | [§4.7.28](<#/doc/jvms/jvms-04>)
`NestMembers` | 55.0 | 11 | [§4.7.29](<#/doc/jvms/jvms-04>)
`Record` | 60.0 | 16 | [§4.7.30](<#/doc/jvms/jvms-04>)
`PermittedSubclasses` | 61.0 | 17 | [§4.7.31](<#/doc/jvms/jvms-04>)

**Tabela 4.7-C. Atributos predefinidos de arquivo `class` (por localização)**

Atributo | Localização | Arquivo `class`
---|---|---
`SourceFile` | `ClassFile` | 45.3
`InnerClasses` | `ClassFile` | 45.3
`EnclosingMethod` | `ClassFile` | 49.0
`SourceDebugExtension` | `ClassFile` | 49.0
`BootstrapMethods` | `ClassFile` | 51.0
`Module`, `ModulePackages`, `ModuleMainClass` | `ClassFile` | 53.0
`NestHost`, `NestMembers` | `ClassFile` | 55.0
`Record` | `ClassFile` | 60.0
`PermittedSubclasses` | `ClassFile` | 61.0
`ConstantValue` | `field_info` | 45.3
`Code` | `method_info` | 45.3
`Exceptions` | `method_info` | 45.3
`RuntimeVisibleParameterAnnotations`, `RuntimeInvisibleParameterAnnotations` | `method_info` | 49.0
`AnnotationDefault` | `method_info` | 49.0
`MethodParameters` | `method_info` | 52.0

**Tabela 4.7-C (cont.). Atributos predefinidos de arquivo `class` (por localização)**

Atributo | Localização | Arquivo `class`
---|---|---
`Synthetic` | `ClassFile`, `field_info`, `method_info` | 45.3
`Deprecated` | `ClassFile`, `field_info`, `method_info` | 45.3
`Signature` | `ClassFile`, `field_info`, `method_info`, `record_component_info` | 49.0
`RuntimeVisibleAnnotations`, `RuntimeInvisibleAnnotations` | `ClassFile`, `field_info`, `method_info`, `record_component_info` | 49.0
`LineNumberTable` | `Code` | 45.3
`LocalVariableTable` | `Code` | 45.3
`LocalVariableTypeTable` | `Code` | 49.0
`StackMapTable` | `Code` | 50.0
`RuntimeVisibleTypeAnnotations`, `RuntimeInvisibleTypeAnnotations` | `ClassFile`, `field_info`, `method_info`, `Code`, `record_component_info` | 52.0

### 4.7.1. Definindo e Nomeando Novos Atributos

Compiladores têm permissão para definir e emitir arquivos `class` contendo novos atributos nas tabelas `attributes` das estruturas de arquivo `class`, estruturas `field_info`, estruturas `method_info` e atributos `Code` ([§4.7.3](<#/doc/jvms/jvms-04>)). Implementações da Java Virtual Machine têm permissão para reconhecer e usar novos atributos encontrados nessas tabelas `attributes`. No entanto, qualquer atributo não definido como parte desta especificação não deve afetar a semântica do arquivo `class`. As implementações da Java Virtual Machine são obrigadas a ignorar silenciosamente os atributos que não reconhecem.

Por exemplo, a definição de um novo atributo para suportar depuração específica do fornecedor é permitida. Como as implementações da Java Virtual Machine são obrigadas a ignorar atributos que não reconhecem, os arquivos `class` destinados a essa implementação específica da Java Virtual Machine serão utilizáveis por outras implementações, mesmo que essas implementações não possam fazer uso das informações de depuração adicionais que os arquivos `class` contêm.

As implementações da Java Virtual Machine são especificamente proibidas de lançar uma exceção ou de outra forma recusar o uso de arquivos `class` simplesmente devido à presença de algum novo atributo. É claro que as ferramentas que operam em arquivos `class` podem não funcionar corretamente se receberem arquivos `class` que não contêm todos os atributos que elas exigem.

Dois atributos que se destinam a ser distintos, mas que por acaso usam o mesmo nome de atributo e têm o mesmo comprimento, entrarão em conflito em implementações que reconhecem qualquer um dos atributos. Atributos definidos de outra forma que não nesta especificação devem ter nomes escolhidos de acordo com a convenção de nomenclatura de pacotes descrita em _The Java Language Specification, Java SE 25 Edition_ (JLS §6.1).

Versões futuras desta especificação podem definir atributos adicionais.

### 4.7.2. O Atributo `ConstantValue`

O atributo `ConstantValue` é um atributo de comprimento fixo na tabela `attributes` de uma estrutura `field_info` ([§4.5](<#/doc/jvms/jvms-04>)). Um atributo `ConstantValue` representa o valor de uma expressão constante (JLS §15.28), e é usado da seguinte forma:

  * Se o flag `ACC_STATIC` no item `access_flags` da estrutura `field_info` estiver definido, então o campo representado pela estrutura `field_info` recebe o valor representado por seu atributo `ConstantValue` como parte da inicialização da classe ou interface que declara o campo ([§5.5](<#/doc/jvms/jvms-05>)). Isso ocorre antes da invocação do método de inicialização de classe ou interface dessa classe ou interface ([§2.9.2](<#/doc/jvms/jvms-02>)).

  * Caso contrário, a Java Virtual Machine deve ignorar silenciosamente o atributo.

Pode haver no máximo um atributo `ConstantValue` na tabela `attributes` de uma estrutura `field_info`.

O atributo `ConstantValue` tem o seguinte formato:
```
    ConstantValue_attribute {
        u2 attribute_name_index;
        u4 attribute_length;
        u2 constantvalue_index;
    }
    
```

Os itens da estrutura `ConstantValue_attribute` são os seguintes:

attribute_name_index

O valor do item `attribute_name_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Utf8_info` ([§4.4.7](<#/doc/jvms/jvms-04>)) representando a string "`ConstantValue`".

attribute_length

O valor do item `attribute_length` deve ser dois.

constantvalue_index

O valor do item `constantvalue_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice fornece o valor representado por este atributo. A entrada `constant_pool` deve ser de um tipo apropriado para o campo, conforme especificado na [Tabela 4.7.2-A](<#/doc/jvms/jvms-04>).

**Tabela 4.7.2-A. Tipos de atributo de valor constante**

Tipo de Campo | Tipo de Entrada
---|---
`int`, `short`, `char`, `byte`, `boolean` | `CONSTANT_Integer`
`float` | `CONSTANT_Float`
`long` | `CONSTANT_Long`
`double` | `CONSTANT_Double`
`String` | `CONSTANT_String`

### 4.7.3. O Atributo `Code`

O atributo `Code` é um atributo de comprimento variável na tabela `attributes` de uma estrutura `method_info` ([§4.6](<#/doc/jvms/jvms-04>)). Um atributo `Code` contém as instruções da Java Virtual Machine e informações auxiliares para um método, incluindo um método de inicialização de instância e um método de inicialização de classe ou interface ([§2.9.1](<#/doc/jvms/jvms-02>), [§2.9.2](<#/doc/jvms/jvms-02>)).

Se o método for `native` ou `abstract`, e não for um método de inicialização de classe ou interface, então sua estrutura `method_info` não deve ter um atributo `Code` em sua tabela `attributes`. Caso contrário, sua estrutura `method_info` deve ter exatamente um atributo `Code` em sua tabela `attributes`.

O atributo `Code` tem o seguinte formato:
```
    Code_attribute {
        u2 attribute_name_index;
        u4 attribute_length;
        u2 max_stack;
        u2 max_locals;
        u4 code_length;
        u1 code[code_length];
        u2 exception_table_length;
        {   u2 start_pc;
            u2 end_pc;
            u2 handler_pc;
            u2 catch_type;
        } exception_table[exception_table_length];
        u2 attributes_count;
        attribute_info attributes[attributes_count];
    }
    
```

Os itens da estrutura `Code_attribute` são os seguintes:

attribute_name_index

O valor do item `attribute_name_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Utf8_info` ([§4.4.7](<#/doc/jvms/jvms-04>)) representando a string "`Code`".

attribute_length

O valor do item `attribute_length` indica o comprimento do atributo, excluindo os seis bytes iniciais.

max_stack

O valor do item `max_stack` fornece a profundidade máxima da pilha de operandos deste método ([§2.6.2](<#/doc/jvms/jvms-02>)) em qualquer ponto durante a execução do método.

max_locals

O valor do item `max_locals` fornece o número de variáveis locais no array de variáveis locais alocado na invocação deste método ([§2.6.1](<#/doc/jvms/jvms-02>)), incluindo as variáveis locais usadas para passar parâmetros para o método em sua invocação.

O maior índice de variável local para um valor do tipo `long` ou `double` é `max_locals - 2`. O maior índice de variável local para um valor de qualquer outro tipo é `max_locals - 1`.

code_length

O valor do item `code_length` fornece o número de bytes no array `code` para este método.

O valor de `code_length` deve ser maior que zero (já que o array `code` não deve estar vazio) e menor que 65536.

code[]

O array `code` fornece os bytes reais do código da Java Virtual Machine que implementam o método.

Quando o array `code` é lido na memória em uma máquina endereçável por byte, se o primeiro byte do array estiver alinhado em um limite de 4 bytes, os offsets de 32 bits de _tableswitch_ e _lookupswitch_ estarão alinhados em 4 bytes. (Consulte as descrições dessas instruções para obter mais informações sobre as consequências do alinhamento do array `code`.)

As restrições detalhadas sobre o conteúdo do array `code` são extensas e são fornecidas em uma seção separada ([§4.9](<#/doc/jvms/jvms-04>)).

exception_table_length

O valor do item `exception_table_length` fornece o número de entradas no array `exception_table`.

exception_table[]

Cada entrada no array `exception_table` descreve um manipulador de exceção no array `code`. A ordem dos manipuladores no array `exception_table` é significativa ([§2.10](<#/doc/jvms/jvms-02>)).

Cada entrada `exception_table` contém os quatro itens a seguir:

start_pc, end_pc

Os valores dos dois itens `start_pc` e `end_pc` indicam os intervalos no array `code` nos quais o manipulador de exceção está ativo. O valor de `start_pc` deve ser um índice válido no array `code` do opcode de uma instrução. O valor de `end_pc` deve ser um índice válido no array `code` do opcode de uma instrução ou deve ser igual a `code_length`, o comprimento do array `code`. O valor de `start_pc` deve ser menor que o valor de `end_pc`.

O `start_pc` é inclusivo e o `end_pc` é exclusivo; ou seja, o manipulador de exceção deve estar ativo enquanto o contador de programa estiver dentro do intervalo [`start_pc`, `end_pc`).

O fato de `end_pc` ser exclusivo é um erro histórico no design da Java Virtual Machine: se o código da Java Virtual Machine para um método tiver exatamente 65535 bytes de comprimento e terminar com uma instrução de 1 byte, então essa instrução não pode ser protegida por um manipulador de exceção. Um escritor de compilador pode contornar esse bug limitando o tamanho máximo do código da Java Virtual Machine gerado para qualquer método, método de inicialização de instância ou inicializador estático (o tamanho de qualquer array `code`) a 65534 bytes.

handler_pc

O valor do item `handler_pc` indica o início do manipulador de exceção. O valor do item deve ser um índice válido no array `code` e deve ser o índice do opcode de uma instrução.

catch_type

Se o valor do item `catch_type` for diferente de zero, ele deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Class_info` ([§4.4.1](<#/doc/jvms/jvms-04>)) representando uma classe de exceções que este manipulador de exceção é designado para capturar. O manipulador de exceção será chamado apenas se a exceção lançada for uma instância da classe fornecida ou de uma de suas subclasses.

O verificador verifica se a classe é `Throwable` ou uma subclasse de `Throwable` ([§4.9.2](<#/doc/jvms/jvms-04>)).

Se o valor do item `catch_type` for zero, este manipulador de exceção é chamado para todas as exceções.

Isso é usado para implementar `finally` ([§3.13](<#/doc/jvms/jvms-03>)).

attributes_count

O valor do item `attributes_count` indica o número de atributos do atributo `Code`.

attributes[]

Cada valor da tabela `attributes` deve ser uma estrutura `attribute_info` ([§4.7](<#/doc/jvms/jvms-04>)).

Um atributo `Code` pode ter qualquer número de atributos opcionais associados a ele.

Os atributos definidos por esta especificação como aparecendo na tabela `attributes` de um atributo `Code` estão listados na [Tabela 4.7-C](<#/doc/jvms/jvms-04>).

As regras relativas aos atributos definidos para aparecer na tabela `attributes` de um atributo `Code` são fornecidas em [§4.7](<#/doc/jvms/jvms-04>).

As regras relativas a atributos não predefinidos na tabela `attributes` de um atributo `Code` são fornecidas em [§4.7.1](<#/doc/jvms/jvms-04>).

### 4.7.4. O Atributo `StackMapTable`

O atributo `StackMapTable` é um atributo de comprimento variável na tabela `attributes` de um atributo `Code` ([§4.7.3](<#/doc/jvms/jvms-04>)). Um atributo `StackMapTable` é usado durante o processo de verificação por checagem de tipo ([§4.10.1](<#/doc/jvms/jvms-04>)).

Pode haver no máximo um atributo `StackMapTable` na tabela `attributes` de um atributo `Code`.

Em um arquivo `class` cujo número de versão é 50.0 ou superior, se o atributo `Code` de um método não tiver um atributo `StackMapTable`, ele terá um _atributo de mapa de pilha implícito_ ([§4.10.1](<#/doc/jvms/jvms-04>)). Este atributo de mapa de pilha implícito é equivalente a um atributo `StackMapTable` com `number_of_entries` igual a zero.

O atributo `StackMapTable` tem o seguinte formato:
```
    StackMapTable_attribute {
        u2              attribute_name_index;
        u4              attribute_length;
        u2              number_of_entries;
        stack_map_frame entries[number_of_entries];
    }
    
```

Os itens da estrutura `StackMapTable_attribute` são os seguintes:

attribute_name_index

O valor do item `attribute_name_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Utf8_info` ([§4.4.7](<#/doc/jvms/jvms-04>)) representando a string "`StackMapTable`".

attribute_length

O valor do item `attribute_length` indica o comprimento do atributo, excluindo os seis bytes iniciais.

number_of_entries

O valor do item `number_of_entries` fornece o número de entradas `stack_map_frame` na tabela `entries`.

entries[]

Cada entrada na tabela `entries` descreve um frame de mapa de pilha do método. A ordem dos frames de mapa de pilha na tabela `entries` é significativa.

Um _frame de mapa de pilha_ especifica (explicitamente ou implicitamente) o offset do bytecode no qual ele se aplica, e os tipos de verificação de variáveis locais e entradas da pilha de operandos para esse offset.

Cada frame de mapa de pilha descrito na tabela `entries` depende do frame anterior para parte de sua semântica. O primeiro frame de mapa de pilha de um método é implícito e calculado a partir do descritor do método pelo verificador de tipo ([§4.10.1.5](<#/doc/jvms/jvms-04>)). A estrutura `stack_map_frame` em `entries[0]` descreve, portanto, o segundo frame de mapa de pilha do método.

O _offset do bytecode_ no qual um frame de mapa de pilha se aplica é calculado pegando o valor `offset_delta` especificado no frame (explicitamente ou implicitamente), e adicionando `offset_delta + 1` ao offset do bytecode do frame anterior, a menos que o frame anterior seja o frame inicial do método. Nesse caso, o offset do bytecode no qual o frame de mapa de pilha se aplica é o valor `offset_delta` especificado no frame.

Ao usar um delta de offset em vez de armazenar o offset real do bytecode, garantimos, por definição, que os frames de mapa de pilha estejam na ordem corretamente classificada. Além disso, ao usar consistentemente a fórmula `offset_delta + 1` para todos os frames explícitos (em oposição ao primeiro frame implícito), garantimos a ausência de duplicatas.

Dizemos que uma instrução no bytecode tem um _frame de mapa de pilha correspondente_ se a instrução começa no offset _i_ no array `code` de um atributo `Code`, e o atributo `Code` tem um atributo `StackMapTable` cujo array `entries` contém um frame de mapa de pilha que se aplica no offset de bytecode _i_.

Um _tipo de verificação_ especifica o tipo de uma ou duas localizações, onde uma _localização_ é uma única variável local ou uma única entrada da pilha de operandos. Um tipo de verificação é representado por uma união discriminada, `verification_type_info`, que consiste em um tag de um byte, indicando qual item da união está em uso, seguido por zero ou mais bytes, fornecendo mais informações sobre o tag.
```
    union verification_type_info {
        Top_variable_info;
        Integer_variable_info;
        Float_variable_info;
        Long_variable_info;
        Double_variable_info;
        Null_variable_info;
        UninitializedThis_variable_info;
        Object_variable_info;
        Uninitialized_variable_info;
    }
    
```

Um tipo de verificação que especifica uma localização no array de variáveis locais ou na pilha de operandos é representado pelos seguintes itens da união `verification_type_info`:

  * O item `Top_variable_info` indica que a variável local tem o tipo de verificação `top`.
`Top_variable_info {
            u1 tag = ITEM_Top; /* 0 */
        }
            
```

  * O item `Integer_variable_info` indica que a localização tem o tipo de verificação `int`.
`Integer_variable_info {
            u1 tag = ITEM_Integer; /* 1 */
        }
            
```

  * O item `Float_variable_info` indica que a localização tem o tipo de verificação `float`.
`Float_variable_info {
            u1 tag = ITEM_Float; /* 2 */
        }
            
```

  * O tipo `Null_variable_info` indica que a localização tem o tipo de verificação `null`.
`Null_variable_info {
            u1 tag = ITEM_Null; /* 5 */
        }
            
```

  * O item `UninitializedThis_variable_info` indica que a localização tem o tipo de verificação `uninitializedThis`.
`UninitializedThis_variable_info {
            u1 tag = ITEM_UninitializedThis; /* 6 */
        }
            
```

  * O item `Object_variable_info` indica que a localização tem o tipo de verificação que é a classe representada pela estrutura `CONSTANT_Class_info` (§4.4.1) encontrada na tabela `constant_pool` no índice dado por `cpool_index`.
`Object_variable_info {
            u1 tag = ITEM_Object; /* 7 */
            u2 cpool_index;
        }
            
```

  * O item `Uninitialized_variable_info` indica que a localização tem o tipo de verificação `uninitialized(Offset)`. O item `Offset` indica o offset, no array `code` do atributo `Code` que contém este atributo `StackMapTable`, da instrução _new_ ([§ _new_](<#/doc/jvms/jvms-06>)) que criou o objeto sendo armazenado na localização.
`Uninitialized_variable_info {
            u1 tag = ITEM_Uninitialized; /* 8 */
            u2 offset;
        }
            
```

Um tipo de verificação que especifica duas localizações no array de variáveis locais ou na pilha de operandos é representado pelos seguintes itens da união `verification_type_info`:

  * O item `Long_variable_info` indica que a primeira das duas localizações tem o tipo de verificação `long`.
```java
Long_variable_info {
            u1 tag = ITEM_Long; /* 4 */
        }
            
```

  * O item `Double_variable_info` indica que a primeira de duas localizações tem o tipo de verificação `double`.
```java
Double_variable_info {
            u1 tag = ITEM_Double; /* 3 */
        }
            
```

  * Os itens `Long_variable_info` e `Double_variable_info` indicam o tipo de verificação da segunda de duas localizações da seguinte forma:

    * Se a primeira das duas localizações for uma variável local, então:

      * Não deve ser a variável local com o índice mais alto.

      * A próxima variável local com número mais alto tem o tipo de verificação `top`.

    * Se a primeira das duas localizações for uma entrada da pilha de operandos, então:

      * Não deve ser a localização mais ao topo da pilha de operandos.

      * A próxima localização mais próxima do topo da pilha de operandos tem o tipo de verificação `top`.

Um `stack map frame` é representado por uma união discriminada, `stack_map_frame`, que consiste em uma tag de um byte, indicando qual item da união está em uso, seguida por zero ou mais bytes, fornecendo mais informações sobre a tag.
```java
    union stack_map_frame {
        same_frame;
        same_locals_1_stack_item_frame;
        same_locals_1_stack_item_frame_extended;
        chop_frame;
        same_frame_extended;
        append_frame;
        full_frame;
    }
    
```

A tag indica o _tipo de frame_ do `stack map frame`:

  * O tipo de frame `same_frame` é representado por tags no intervalo [0-63]. Este tipo de frame indica que o frame tem exatamente as mesmas variáveis locais que o frame anterior e que a pilha de operandos está vazia. O valor `offset_delta` para o frame é o valor do item da tag, `frame_type`.
```java
same_frame {
            u1 frame_type = SAME; /* 0-63 */
        }
            
```

  * O tipo de frame `same_locals_1_stack_item_frame` é representado por tags no intervalo [64, 127]. Este tipo de frame indica que o frame tem exatamente as mesmas variáveis locais que o frame anterior e que a pilha de operandos tem uma entrada. O valor `offset_delta` para o frame é dado pela fórmula `frame_type - 64`. O tipo de verificação da única entrada da pilha aparece após o tipo de frame.
```java
same_locals_1_stack_item_frame {
            u1 frame_type = SAME_LOCALS_1_STACK_ITEM; /* 64-127 */
            verification_type_info stack[1];
        }
        
```

  * Tags no intervalo [128-246] são reservadas para uso futuro.

  * O tipo de frame `same_locals_1_stack_item_frame_extended` é representado pela tag 247. Este tipo de frame indica que o frame tem exatamente as mesmas variáveis locais que o frame anterior e que a pilha de operandos tem uma entrada. O valor `offset_delta` para o frame é dado explicitamente, ao contrário do tipo de frame `same_locals_1_stack_item_frame`. O tipo de verificação da única entrada da pilha aparece após `offset_delta`.
```java
same_locals_1_stack_item_frame_extended {
            u1 frame_type = SAME_LOCALS_1_STACK_ITEM_EXTENDED; /* 247 */
            u2 offset_delta;
            verification_type_info stack[1];
        }
            
```

  * O tipo de frame `chop_frame` é representado por tags no intervalo [248-250]. Este tipo de frame indica que o frame tem as mesmas variáveis locais que o frame anterior, exceto que as últimas _k_ variáveis locais estão ausentes, e que a pilha de operandos está vazia. O valor de _k_ é dado pela fórmula `251 - frame_type`. O valor `offset_delta` para o frame é dado explicitamente.
```java
chop_frame {
            u1 frame_type = CHOP; /* 248-250 */
            u2 offset_delta;
        }
            
```

Assuma que os tipos de verificação das variáveis locais no frame anterior são dados por `locals`, um array estruturado como no tipo de frame `full_frame`. Se `locals[M-1]` no frame anterior representava a variável local X e `locals[M]` representava a variável local Y, então o efeito de remover uma variável local é que `locals[M-1]` no novo frame representa a variável local X e `locals[M]` é indefinido.

É um erro se _k_ for maior que o número de variáveis locais em `locals` para o frame anterior, ou seja, se o número de variáveis locais no novo frame for menor que zero.

  * O tipo de frame `same_frame_extended` é representado pela tag 251. Este tipo de frame indica que o frame tem exatamente as mesmas variáveis locais que o frame anterior e que a pilha de operandos está vazia. O valor `offset_delta` para o frame é dado explicitamente, ao contrário do tipo de frame `same_frame`.
```java
same_frame_extended {
            u1 frame_type = SAME_FRAME_EXTENDED; /* 251 */
            u2 offset_delta;
        }
            
```

  * O tipo de frame `append_frame` é representado por tags no intervalo [252-254]. Este tipo de frame indica que o frame tem as mesmas variáveis locais que o frame anterior, exceto que _k_ variáveis locais adicionais são definidas, e que a pilha de operandos está vazia. O valor de _k_ é dado pela fórmula `frame_type - 251`. O valor `offset_delta` para o frame é dado explicitamente.
```java
append_frame {
            u1 frame_type = APPEND; /* 252-254 */
            u2 offset_delta;
            verification_type_info locals[frame_type - 251];
        }
            
```

A 0ª entrada em `locals` representa o tipo de verificação da primeira variável local adicional. Se `locals[M]` representa a variável local `N`, então:

    * `locals[M+1]` representa a variável local `N+1` se `locals[M]` for um de `Top_variable_info`, `Integer_variable_info`, `Float_variable_info`, `Null_variable_info`, `UninitializedThis_variable_info`, `Object_variable_info` ou `Uninitialized_variable_info`; e

    * `locals[M+1]` representa a variável local `N+2` se `locals[M]` for `Long_variable_info` ou `Double_variable_info`.

É um erro se, para qualquer índice _i_, `locals[_i_]` representar uma variável local cujo índice é maior que o número máximo de variáveis locais para o método.

  * O tipo de frame `full_frame` é representado pela tag 255. O valor `offset_delta` para o frame é dado explicitamente.
```java
full_frame {
            u1 frame_type = FULL_FRAME; /* 255 */
            u2 offset_delta;
            u2 number_of_locals;
            verification_type_info locals[number_of_locals];
            u2 number_of_stack_items;
            verification_type_info stack[number_of_stack_items];
        }
            
```

A 0ª entrada em `locals` representa o tipo de verificação da variável local 0. Se `locals[M]` representa a variável local `N`, então:

    * `locals[M+1]` representa a variável local `N+1` se `locals[M]` for um de `Top_variable_info`, `Integer_variable_info`, `Float_variable_info`, `Null_variable_info`, `UninitializedThis_variable_info`, `Object_variable_info` ou `Uninitialized_variable_info`; e

    * `locals[M+1]` representa a variável local `N+2` se `locals[M]` for `Long_variable_info` ou `Double_variable_info`.

É um erro se, para qualquer índice _i_, `locals[_i_]` representar uma variável local cujo índice é maior que o número máximo de variáveis locais para o método.

A 0ª entrada em `stack` representa o tipo de verificação da base da pilha de operandos, e as entradas subsequentes em `stack` representam os tipos de verificação das entradas da pilha mais próximas do topo da pilha de operandos. Referimo-nos à base da pilha de operandos como entrada da pilha 0, e às entradas subsequentes da pilha de operandos como entrada da pilha 1, 2, etc. Se `stack[M]` representa a entrada da pilha `N`, então:

    * `stack[M+1]` representa a entrada da pilha `N+1` se `stack[M]` for um de `Top_variable_info`, `Integer_variable_info`, `Float_variable_info`, `Null_variable_info`, `UninitializedThis_variable_info`, `Object_variable_info` ou `Uninitialized_variable_info`; e

    * `stack[M+1]` representa a entrada da pilha `N+2` se `stack[M]` for `Long_variable_info` ou `Double_variable_info`.

É um erro se, para qualquer índice _i_, `stack[_i_]` representar uma entrada da pilha cujo índice é maior que o tamanho máximo da pilha de operandos para o método.

### 4.7.5. O Atributo `Exceptions`

O atributo `Exceptions` é um atributo de comprimento variável na tabela `attributes` de uma estrutura `method_info` (§4.6). O atributo `Exceptions` indica quais exceções verificadas um método pode lançar.

Pode haver no máximo um atributo `Exceptions` na tabela `attributes` de uma estrutura `method_info`.

O atributo `Exceptions` tem o seguinte formato:
```java
    Exceptions_attribute {
        u2 attribute_name_index;
        u4 attribute_length;
        u2 number_of_exceptions;
        u2 exception_index_table[number_of_exceptions];
    }
    
```

Os itens da estrutura `Exceptions_attribute` são os seguintes:

attribute_name_index
    

O valor do item `attribute_name_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser a estrutura `CONSTANT_Utf8_info` (§4.4.7) representando a string "`Exceptions`".

attribute_length
    

O valor do item `attribute_length` indica o comprimento do atributo, excluindo os seis bytes iniciais.

number_of_exceptions
    

O valor do item `number_of_exceptions` indica o número de entradas na `exception_index_table`.

exception_index_table[]
    

Cada valor no array `exception_index_table` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Class_info` (§4.4.1) representando um tipo de classe que este método é declarado para lançar.

Um método deve lançar uma exceção somente se pelo menos um dos três critérios a seguir for atendido:

  * A exceção é uma instância de `RuntimeException` ou uma de suas subclasses.

  * A exceção é uma instância de `Error` ou uma de suas subclasses.

  * A exceção é uma instância de uma das classes de exceção especificadas na `exception_index_table` recém-descrita, ou uma de suas subclasses.

Esses requisitos não são impostos na Java Virtual Machine; eles são impostos apenas em tempo de compilação.

### 4.7.6. O Atributo `InnerClasses`

O atributo `InnerClasses` é um atributo de comprimento variável na tabela `attributes` de uma estrutura `ClassFile` (§4.1).

Se o `constant pool` de uma classe ou interface C contiver pelo menos uma entrada `CONSTANT_Class_info` (§4.4.1) que representa uma classe ou interface que não é membro de um pacote, então deve haver exatamente um atributo `InnerClasses` na tabela `attributes` da estrutura `ClassFile` para C.

O atributo `InnerClasses` tem o seguinte formato:
```java
    InnerClasses_attribute {
        u2 attribute_name_index;
        u4 attribute_length;
        u2 number_of_classes;
        {   u2 inner_class_info_index;
            u2 outer_class_info_index;
            u2 inner_name_index;
            u2 inner_class_access_flags;
        } classes[number_of_classes];
    }
    
```

Os itens da estrutura `InnerClasses_attribute` são os seguintes:

attribute_name_index
    

O valor do item `attribute_name_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Utf8_info` (§4.4.7) representando a string "`InnerClasses`".

attribute_length
    

O valor do item `attribute_length` indica o comprimento do atributo, excluindo os seis bytes iniciais.

number_of_classes
    

O valor do item `number_of_classes` indica o número de entradas no array `classes`.

classes[]
    

Cada entrada `CONSTANT_Class_info` na tabela `constant_pool` que representa uma classe ou interface C que não é membro de um pacote deve ter exatamente uma entrada correspondente no array `classes`.

Se uma classe ou interface tiver membros que são classes ou interfaces, sua tabela `constant_pool` (e, portanto, seu atributo `InnerClasses`) deve referir-se a cada um desses membros (JLS §13.1), mesmo que esse membro não seja mencionado de outra forma pela classe.

Além disso, a tabela `constant_pool` de cada classe aninhada e interface aninhada deve referir-se à sua classe envolvente, de modo que, no total, cada classe aninhada e interface aninhada terá informações `InnerClasses` para cada classe envolvente e para cada uma de suas próprias classes e interfaces aninhadas.

Cada entrada no array `classes` contém os quatro itens a seguir:

inner_class_info_index
    

O valor do item `inner_class_info_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Class_info` representando C.

outer_class_info_index
    

Se C não for membro de uma classe ou interface - ou seja, se C for uma classe ou interface de nível superior (JLS §7.6) ou uma classe local (JLS §14.3) ou uma classe anônima (JLS §15.9.5) - então o valor do item `outer_class_info_index` deve ser zero.

Caso contrário, o valor do item `outer_class_info_index` deve ser um índice válido na tabela `constant_pool`, e a entrada nesse índice deve ser uma estrutura `CONSTANT_Class_info` representando a classe ou interface da qual C é membro. O valor do item `outer_class_info_index` não deve ser igual ao valor do item `inner_class_info_index`.

inner_name_index
    

Se C for anônima (JLS §15.9.5), o valor do item `inner_name_index` deve ser zero.

Caso contrário, o valor do item `inner_name_index` deve ser um índice válido na tabela `constant_pool`, e a entrada nesse índice deve ser uma estrutura `CONSTANT_Utf8_info` que representa o nome simples original de C, conforme fornecido no código-fonte a partir do qual este arquivo `class` foi compilado.

inner_class_access_flags
    

O valor do item `inner_class_access_flags` é uma máscara de flags usadas para denotar permissões de acesso e propriedades da classe ou interface C conforme declarado no código-fonte a partir do qual este arquivo `class` foi compilado. É usado por um compilador para recuperar as informações originais quando o código-fonte não está disponível. As flags são especificadas na Tabela 4.7.6-A.

**Tabela 4.7.6-A. Flags de acesso e propriedade de classes aninhadas**

Nome da Flag | Valor | Interpretação
---|---|---
`ACC_PUBLIC` | 0x0001 | Marcado ou implicitamente `public` no código-fonte.
`ACC_PRIVATE` | 0x0002 | Marcado `private` no código-fonte.
`ACC_PROTECTED` | 0x0004 | Marcado `protected` no código-fonte.
`ACC_STATIC` | 0x0008 | Marcado ou implicitamente `static` no código-fonte.
`ACC_FINAL` | 0x0010 | Marcado ou implicitamente `final` no código-fonte.
`ACC_INTERFACE` | 0x0200 | Era uma `interface` no código-fonte.
`ACC_ABSTRACT` | 0x0400 | Marcado ou implicitamente `abstract` no código-fonte.
`ACC_SYNTHETIC` | 0x1000 | Declarado sintético; não presente no código-fonte.
`ACC_ANNOTATION` | 0x2000 | Declarado como uma interface de anotação.
`ACC_ENUM` | 0x4000 | Declarado como uma classe `enum`.


Todos os bits do item `inner_class_access_flags` não atribuídos na Tabela 4.7.6-A são reservados para uso futuro. Eles devem ser definidos como zero em arquivos `class` gerados e devem ser ignorados pelas implementações da Java Virtual Machine.

Se um arquivo `class` tiver um número de versão 51.0 ou superior, e tiver um atributo `InnerClasses` em sua tabela `attributes`, então para todas as entradas no array `classes` do atributo `InnerClasses`, o valor do item `outer_class_info_index` deve ser zero se o valor do item `inner_name_index` for zero.

A implementação da Java Virtual Machine da Oracle não verifica a consistência de um atributo `InnerClasses` em relação a um arquivo `class` que representa uma classe ou interface referenciada pelo atributo.

### 4.7.7. O Atributo `EnclosingMethod`

O atributo `EnclosingMethod` é um atributo de comprimento fixo na tabela `attributes` de uma estrutura `ClassFile` (§4.1). Uma classe deve ter um atributo `EnclosingMethod` se e somente se ela representa uma classe local ou uma classe anônima (JLS §14.3, JLS §15.9.5).

Pode haver no máximo um atributo `EnclosingMethod` na tabela `attributes` de uma estrutura `ClassFile`.

O atributo `EnclosingMethod` tem o seguinte formato:
```java
    EnclosingMethod_attribute {
        u2 attribute_name_index;
        u4 attribute_length;
        u2 class_index;
        u2 method_index;
    }
    
```

Os itens da estrutura `EnclosingMethod_attribute` são os seguintes:

attribute_name_index
    

O valor do item `attribute_name_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Utf8_info` (§4.4.7) representando a string "`EnclosingMethod`".

attribute_length
    

O valor do item `attribute_length` deve ser quatro.

class_index
    

O valor do item `class_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Class_info` (§4.4.1) representando a classe mais interna que envolve a declaração da classe atual.

method_index
    

Se a classe atual não for imediatamente envolvida por um método ou construtor, então o valor do item `method_index` deve ser zero.

Em particular, `method_index` deve ser zero se a classe atual foi imediatamente envolvida no código-fonte por um inicializador de instância, inicializador estático, inicializador de variável de instância ou inicializador de variável de classe. (Os dois primeiros dizem respeito tanto a classes locais quanto a classes anônimas, enquanto os dois últimos dizem respeito a classes anônimas declaradas no lado direito de uma atribuição de campo.)

Caso contrário, o valor do item `method_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_NameAndType_info` (§4.4.6) representando o nome e o tipo de um método na classe referenciada pelo atributo `class_index` acima.

É responsabilidade de um compilador Java garantir que o método identificado via `method_index` seja de fato o método lexicamente envolvente mais próximo da classe que contém este atributo `EnclosingMethod`.

### 4.7.8. O Atributo `Synthetic`

O atributo `Synthetic` é um atributo de comprimento fixo na tabela `attributes` de uma estrutura `ClassFile`, `field_info` ou `method_info` (§4.1, §4.5, §4.6). Um membro de classe que não aparece no código-fonte deve ser marcado usando um atributo `Synthetic`, ou então deve ter sua flag `ACC_SYNTHETIC` definida. As únicas exceções a este requisito são membros gerados pelo compilador que não são considerados artefatos de implementação, a saber:

  * um método de inicialização de instância representando um construtor padrão da Java programming language (§2.9.1)

  * um método de inicialização de classe ou interface (§2.9.2)

  * os membros implicitamente declarados de classes `enum` e `record` (JLS §8.9.3, JLS §8.10.3)

O atributo `Synthetic` foi introduzido no JDK 1.1 para suportar classes e interfaces aninhadas.

É uma limitação do formato de arquivo `class` que apenas parâmetros formais e módulos podem ser marcados como `ACC_MANDATED` (§4.7.24, §4.7.25) para indicar que, apesar de serem gerados pelo compilador, não são considerados artefatos de implementação. Não há como marcar outras construções geradas pelo compilador para que também não sejam consideradas artefatos de implementação (JLS §13.1). Esta limitação significa que as APIs de reflexão da Plataforma Java SE podem não indicar com precisão o status "mandated" de tais construções.

O atributo `Synthetic` tem o seguinte formato:
```java
    Synthetic_attribute {
        u2 attribute_name_index;
        u4 attribute_length;
    }
    
```

Os itens da estrutura `Synthetic_attribute` são os seguintes:

attribute_name_index
    

O valor do item `attribute_name_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Utf8_info` (§4.4.7) representando a string "`Synthetic`".

attribute_length
    

O valor do item `attribute_length` deve ser zero.

### 4.7.9. O Atributo `Signature`

O atributo `Signature` é um atributo de comprimento fixo na tabela `attributes` de uma estrutura `ClassFile`, `field_info`, `method_info` ou `record_component_info` (§4.1, §4.5, §4.6, §4.7.30). Um atributo `Signature` armazena uma assinatura (§4.7.9.1) para uma classe, interface, construtor, método, campo ou componente de `record` cuja declaração na Java programming language usa `type variables` ou `parameterized types`. Consulte _The Java Language Specification, Java SE 25 Edition_ para detalhes sobre essas construções.

Pode haver no máximo um atributo `Signature` na tabela `attributes` de uma estrutura `ClassFile`, `field_info`, `method_info` ou `record_component_info`.

O atributo `Signature` tem o seguinte formato:
```java
    Signature_attribute {
        u2 attribute_name_index;
        u4 attribute_length;
        u2 signature_index;
    }
    
```

Os itens da estrutura `Signature_attribute` são os seguintes:

attribute_name_index
    

O valor do item `attribute_name_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Utf8_info` (§4.4.7) representando a string "`Signature`".

attribute_length
    

O valor do item `attribute_length` deve ser dois.

signature_index
    

O valor do item `signature_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Utf8_info` (§4.4.7) representando uma `class signature` se este atributo `Signature` for um atributo de uma estrutura `ClassFile`; uma `method signature` se este atributo `Signature` for um atributo de uma estrutura `method_info`; ou uma `field signature` caso contrário.

A implementação da Java Virtual Machine da Oracle não verifica a boa formação dos atributos `Signature` durante o carregamento ou linkagem de classes. Em vez disso, os atributos `Signature` são verificados por métodos das bibliotecas de classes da Plataforma Java SE que expõem assinaturas genéricas de classes, interfaces, construtores, métodos e campos. Exemplos incluem `getGenericSuperclass` em `Class` e `toGenericString` em `java.lang.reflect.Executable`.

#### 4.7.9.1. Assinaturas

_Signatures_ codificam declarações escritas na Java programming language que usam tipos fora do `type system` da Java Virtual Machine. Elas suportam `reflection` e `debugging`, bem como compilação quando apenas arquivos `class` estão disponíveis.

Um compilador Java deve emitir uma `signature` para qualquer classe, interface, construtor, método, campo ou componente de `record` cuja declaração na Java programming language usa `type variables` ou `parameterized types`. Especificamente, um compilador Java deve emitir:

  * Uma `class signature` para qualquer declaração de classe ou interface que seja genérica, ou tenha um `parameterized type` como `superclass` ou `superinterface`, ou ambos.

  * Uma `method signature` para qualquer declaração de método ou construtor que seja genérica, ou tenha uma `type variable` ou `parameterized type` como `return type` ou `formal parameter type`, ou tenha uma `type variable` em uma `throws` clause, ou qualquer combinação disso.

Se a `throws` clause de uma declaração de método ou construtor não envolver `type variables`, então um compilador pode tratar a declaração como não tendo `throws` clause para o propósito de emitir uma `method signature`.

  * Uma `field signature` para qualquer declaração de campo, `formal parameter`, `local variable` ou componente de `record` cujo tipo usa uma `type variable` ou um `parameterized type`.

As `Signatures` são especificadas usando uma gramática que segue a notação de §4.3.1. Além dessa notação:

  * A sintaxe _[x]_ no lado direito de uma produção denota zero ou uma ocorrência de _x_. Ou seja, _x_ é um _símbolo opcional_. A alternativa que contém o símbolo opcional define, na verdade, duas alternativas: uma que omite o símbolo opcional e outra que o inclui.

  * Um lado direito muito longo pode ser continuado em uma segunda linha, indentando claramente a segunda linha.

A gramática inclui o símbolo terminal _Identifier_ para denotar o nome de um tipo, campo, método, `formal parameter`, `local variable` ou `type variable`, conforme gerado por um compilador Java. Tal nome não deve conter nenhum dos caracteres ASCII `.` `;` `` `/` `<` `>` `:` (ou seja, os caracteres proibidos em nomes de métodos ([§4.2.2) e também dois pontos), mas pode conter caracteres que não devem aparecer em um identificador na Java programming language (JLS §3.8).

As `Signatures` dependem de uma hierarquia de não-terminais conhecidos como _type signatures_ :

  * Uma _Java type signature_ representa um `reference type` ou um `primitive type` da Java programming language.

JavaTypeSignature:

ReferenceTypeSignature
BaseType

A seguinte produção de §4.3.2 é repetida aqui para conveniência:

BaseType:

(um de)
`B` `C` `D` `F` `I` `J` `S` `Z`

  * Uma _reference type signature_ representa um `reference type` da Java programming language, ou seja, um `class or interface type`, uma `type variable` ou um `array type`.

Uma _class type signature_ representa um `class or interface type` (possivelmente `parameterized`). Uma `class type signature` deve ser formulada de forma que possa ser mapeada de forma confiável para o `binary name` da classe que denota, em `internal form` (§4.2.1), apagando quaisquer `type arguments` e convertendo cada caractere `.` em um caractere `$`.

Uma _type variable signature_ representa uma `type variable`.

Uma _array type signature_ representa uma dimensão de um `array type`.

ReferenceTypeSignature:

ClassTypeSignature
TypeVariableSignature
ArrayTypeSignature

ClassTypeSignature:

`L` [PackageSpecifier] SimpleClassTypeSignature {ClassTypeSignatureSuffix} `;`

PackageSpecifier:

Identifier `/` {PackageSpecifier}

SimpleClassTypeSignature:

Identifier [TypeArguments]

TypeArguments:

`<` TypeArgument {TypeArgument} `>`

TypeArgument:

[WildcardIndicator] ReferenceTypeSignature
`*`

WildcardIndicator:

`+`
`-`

ClassTypeSignatureSuffix:

`.` SimpleClassTypeSignature

TypeVariableSignature:

`T` Identifier `;`

ArrayTypeSignature:

`` [JavaTypeSignature


Uma _class signature_ codifica informações de tipo sobre uma declaração de classe ou interface (possivelmente genérica). Ela descreve quaisquer `type parameters` da classe ou interface, e lista sua `superclass` direta e `superinterfaces` diretas (possivelmente `parameterized`), se houver. Um `type parameter` é descrito por seu nome, seguido por quaisquer `class bound` e `interface bounds`.

ClassSignature:

[TypeParameters] SuperclassSignature {SuperinterfaceSignature}

TypeParameters:

`<` TypeParameter {TypeParameter} `>`

TypeParameter:

Identifier ClassBound {InterfaceBound}

ClassBound:

`:` [ReferenceTypeSignature]

InterfaceBound:

`:` ReferenceTypeSignature

SuperclassSignature:

ClassTypeSignature

SuperinterfaceSignature:

ClassTypeSignature

Uma _method signature_ codifica informações de tipo sobre uma declaração de método (possivelmente genérica). Ela descreve quaisquer `type parameters` do método; os tipos (possivelmente `parameterized`) de quaisquer `formal parameters`; o `return type` (possivelmente `parameterized`), se houver; e os tipos de quaisquer exceções declaradas na `throws` clause do método.

MethodSignature:

[TypeParameters] `(` {JavaTypeSignature} `)` Result {ThrowsSignature}

Result:

JavaTypeSignature
VoidDescriptor

ThrowsSignature:

`^` ClassTypeSignature
`^` TypeVariableSignature

A seguinte produção de §4.3.3 é repetida aqui para conveniência:

VoidDescriptor:

`V`

Uma `method signature` codificada pelo atributo `Signature` pode não corresponder exatamente ao `method descriptor` na estrutura `method_info` (§4.3.3). Em particular, não há garantia de que o número de `formal parameter types` na `method signature` seja o mesmo que o número de `parameter descriptors` no `method descriptor`. Os números são os mesmos para a maioria dos métodos, mas certos construtores na Java programming language têm um parâmetro implicitamente declarado que um compilador representa com um `parameter descriptor`, mas pode omitir da `method signature`. Veja a nota em §4.7.18 para uma situação semelhante envolvendo `parameter annotations`.

Uma _field signature_ codifica o tipo (possivelmente `parameterized`) de um campo, `formal parameter`, `local variable` ou declaração de componente de `record`.

FieldSignature:

ReferenceTypeSignature
### 4.7.10. O Atributo `SourceFile`

O atributo `SourceFile` é um atributo opcional de tamanho fixo na tabela `attributes` de uma estrutura `ClassFile` (§4.1).

Pode haver no máximo um atributo `SourceFile` na tabela `attributes` de uma estrutura `ClassFile`.

O atributo `SourceFile` tem o seguinte formato:
```
    SourceFile_attribute {
        u2 attribute_name_index;
        u4 attribute_length;
        u2 sourcefile_index;
    }
    
```

Os itens da estrutura `SourceFile_attribute` são os seguintes:

attribute_name_index
    

O valor do item `attribute_name_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Utf8_info` (§4.4.7) representando a string "`SourceFile`".

attribute_length
    

O valor do item `attribute_length` deve ser dois.

sourcefile_index
    

O valor do item `sourcefile_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Utf8_info` representando uma string.

A string referenciada pelo item `sourcefile_index` será interpretada como indicando o nome do arquivo fonte a partir do qual este arquivo `class` foi compilado. Ela não será interpretada como indicando o nome de um diretório contendo o arquivo ou um nome de caminho absoluto para o arquivo; tais informações adicionais específicas da plataforma devem ser fornecidas pelo interpretador de tempo de execução ou ferramenta de desenvolvimento no momento em que o nome do arquivo é realmente usado.

### 4.7.11. O Atributo `SourceDebugExtension`

O atributo `SourceDebugExtension` é um atributo opcional na tabela `attributes` de uma estrutura `ClassFile` (§4.1).

Pode haver no máximo um atributo `SourceDebugExtension` na tabela `attributes` de uma estrutura `ClassFile`.

O atributo `SourceDebugExtension` tem o seguinte formato:
```
    SourceDebugExtension_attribute {
        u2 attribute_name_index;
        u4 attribute_length;
        u1 debug_extension[attribute_length];
    }
    
```

Os itens da estrutura `SourceDebugExtension_attribute` são os seguintes:

attribute_name_index
    

O valor do item `attribute_name_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Utf8_info` (§4.4.7) representando a string "`SourceDebugExtension`".

attribute_length
    

O valor do item `attribute_length` indica o comprimento do atributo, excluindo os seis bytes iniciais.

debug_extension[]
    

O array `debug_extension` contém informações de depuração estendidas que não têm efeito semântico na Java Virtual Machine. A informação é representada usando uma string UTF-8 modificada (§4.4.7) sem byte zero de terminação.

Note que o array `debug_extension` pode denotar uma string mais longa do que a que pode ser representada com uma instância da classe `String`.

### 4.7.12. O Atributo `LineNumberTable`

O atributo `LineNumberTable` é um atributo opcional de comprimento variável na tabela `attributes` de um atributo `Code` (§4.7.3). Ele pode ser usado por depuradores para determinar qual parte do array `code` corresponde a um determinado número de linha no arquivo fonte original.

Se múltiplos atributos `LineNumberTable` estiverem presentes na tabela `attributes` de um atributo `Code`, eles podem aparecer em qualquer ordem.

Pode haver mais de um atributo `LineNumberTable` _por linha de um arquivo fonte_ na tabela `attributes` de um atributo `Code`. Ou seja, os atributos `LineNumberTable` podem juntos representar uma determinada linha de um arquivo fonte, e não precisam ter uma correspondência um-para-um com as linhas do código fonte.

O atributo `LineNumberTable` tem o seguinte formato:
```
    LineNumberTable_attribute {
        u2 attribute_name_index;
        u4 attribute_length;
        u2 line_number_table_length;
        {   u2 start_pc;
            u2 line_number;
        } line_number_table[line_number_table_length];
    }
    
```

Os itens da estrutura `LineNumberTable_attribute` são os seguintes:

attribute_name_index
    

O valor do item `attribute_name_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Utf8_info` (§4.4.7) representando a string "`LineNumberTable`".

attribute_length
    

O valor do item `attribute_length` indica o comprimento do atributo, excluindo os seis bytes iniciais.

line_number_table_length
    

O valor do item `line_number_table_length` indica o número de entradas no array `line_number_table`.

line_number_table[]
    

Cada entrada no array `line_number_table` indica que o número da linha no arquivo fonte original muda em um determinado ponto no array `code`. Cada entrada `line_number_table` deve conter os dois itens a seguir:

start_pc
    

O valor do item `start_pc` deve ser um índice válido no array `code` deste atributo `Code`. O item indica o índice no array `code` onde o código para uma nova linha no arquivo fonte original começa.

line_number
    

O valor do item `line_number` fornece o número da linha correspondente no arquivo fonte original.

### 4.7.13. O Atributo `LocalVariableTable`

O atributo `LocalVariableTable` é um atributo opcional de comprimento variável na tabela `attributes` de um atributo `Code` (§4.7.3). Ele pode ser usado por depuradores para determinar o valor de uma determinada variável local durante a execução de um método.

Se múltiplos atributos `LocalVariableTable` estiverem presentes na tabela `attributes` de um atributo `Code`, eles podem aparecer em qualquer ordem.

Pode haver no máximo um atributo `LocalVariableTable` _por variável local_ na tabela `attributes` de um atributo `Code`.

O atributo `LocalVariableTable` tem o seguinte formato:
```
    LocalVariableTable_attribute {
        u2 attribute_name_index;
        u4 attribute_length;
        u2 local_variable_table_length;
        {   u2 start_pc;
            u2 length;
            u2 name_index;
            u2 descriptor_index;
            u2 index;
        } local_variable_table[local_variable_table_length];
    }
    
```

Os itens da estrutura `LocalVariableTable_attribute` são os seguintes:

attribute_name_index
    

O valor do item `attribute_name_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Utf8_info` (§4.4.7) representando a string "`LocalVariableTable`".

attribute_length
    

O valor do item `attribute_length` indica o comprimento do atributo, excluindo os seis bytes iniciais.

local_variable_table_length
    

O valor do item `local_variable_table_length` indica o número de entradas no array `local_variable_table`.

local_variable_table[]
    

Cada entrada no array `local_variable_table` indica um intervalo de offsets do array `code` dentro do qual uma variável local tem um valor, e indica o índice no array de variáveis locais do frame atual onde essa variável local pode ser encontrada. Cada entrada deve conter os cinco itens a seguir:

start_pc, length
    

O valor do item `start_pc` deve ser um índice válido no array `code` deste atributo `Code` e deve ser o índice do opcode de uma instrução.

O valor de `start_pc + length` deve ser um índice válido no array `code` deste atributo `Code` e ser o índice do opcode de uma instrução, ou deve ser o primeiro índice além do final desse array `code`.

Os itens `start_pc` e `length` indicam que a variável local dada tem um valor nos índices do array `code` no intervalo [`start_pc`, `start_pc + length`), ou seja, entre `start_pc` inclusivo e `start_pc + length` exclusivo.

name_index
    

O valor do item `name_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve conter uma estrutura `CONSTANT_Utf8_info` representando um nome não qualificado válido que denota uma variável local (§4.2.2).

descriptor_index
    

O valor do item `descriptor_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve conter uma estrutura `CONSTANT_Utf8_info` representando um descritor de campo que codifica o tipo de uma variável local no programa fonte (§4.3.2).

index
    

O valor do item `index` deve ser um índice válido no array de variáveis locais do frame atual. A variável local dada está em `index` no array de variáveis locais do frame atual.

Se a variável local dada for do tipo `double` ou `long`, ela ocupa tanto `index` quanto `index + 1`.

### 4.7.14. O Atributo `LocalVariableTypeTable`

O atributo `LocalVariableTypeTable` é um atributo opcional de comprimento variável na tabela `attributes` de um atributo `Code` (§4.7.3). Ele pode ser usado por depuradores para determinar o valor de uma determinada variável local durante a execução de um método.

Se múltiplos atributos `LocalVariableTypeTable` estiverem presentes na tabela `attributes` de um determinado atributo `Code`, eles podem aparecer em qualquer ordem.

Pode haver no máximo um atributo `LocalVariableTypeTable` _por variável local_ na tabela `attributes` de um atributo `Code`.

O atributo `LocalVariableTypeTable` difere do atributo `LocalVariableTable` (§4.7.13) no sentido de que ele fornece informações de assinatura em vez de informações de descritor. Essa diferença é significativa apenas para variáveis cujo tipo usa uma variável de tipo ou tipo parametrizado. Tais variáveis aparecerão em ambas as tabelas, enquanto variáveis de outros tipos aparecerão apenas em `LocalVariableTable`.

O atributo `LocalVariableTypeTable` tem o seguinte formato:
```
    LocalVariableTypeTable_attribute {
        u2 attribute_name_index;
        u4 attribute_length;
        u2 local_variable_type_table_length;
        {   u2 start_pc;
            u2 length;
            u2 name_index;
            u2 signature_index;
            u2 index;
        } local_variable_type_table[local_variable_type_table_length];
    }
    
```

Os itens da estrutura `LocalVariableTypeTable_attribute` são os seguintes:

attribute_name_index
    

O valor do item `attribute_name_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Utf8_info` (§4.4.7) representando a string "`LocalVariableTypeTable`".

attribute_length
    

O valor do item `attribute_length` indica o comprimento do atributo, excluindo os seis bytes iniciais.

local_variable_type_table_length
    

O valor do item `local_variable_type_table_length` indica o número de entradas no array `local_variable_type_table`.

local_variable_type_table[]
    

Cada entrada no array `local_variable_type_table` indica um intervalo de offsets do array `code` dentro do qual uma variável local tem um valor, e indica o índice no array de variáveis locais do frame atual onde essa variável local pode ser encontrada. Cada entrada deve conter os cinco itens a seguir:

start_pc, length
    

O valor do item `start_pc` deve ser um índice válido no array `code` deste atributo `Code` e deve ser o índice do opcode de uma instrução.

O valor de `start_pc + length` deve ser um índice válido no array `code` deste atributo `Code` e ser o índice do opcode de uma instrução, ou deve ser o primeiro índice além do final desse array `code`.

Os itens `start_pc` e `length` indicam que a variável local dada tem um valor nos índices do array `code` no intervalo [`start_pc`, `start_pc + length`), ou seja, entre `start_pc` inclusivo e `start_pc + length` exclusivo.

name_index
    

O valor do item `name_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve conter uma estrutura `CONSTANT_Utf8_info` representando um nome não qualificado válido que denota uma variável local (§4.2.2).

signature_index
    

O valor do item `signature_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve conter uma estrutura `CONSTANT_Utf8_info` representando uma assinatura de campo que codifica o tipo de uma variável local no programa fonte (§4.7.9.1).

index
    

O valor do item `index` deve ser um índice válido no array de variáveis locais do frame atual. A variável local dada está em `index` no array de variáveis locais do frame atual.

Se a variável local dada for do tipo `double` ou `long`, ela ocupa tanto `index` quanto `index + 1`.

### 4.7.15. O Atributo `Deprecated`

O atributo `Deprecated` é um atributo opcional de tamanho fixo na tabela `attributes` de uma estrutura `ClassFile`, `field_info` ou `method_info` (§4.1, §4.5, §4.6). Uma classe, interface, método ou campo pode ser marcado usando um atributo `Deprecated` para indicar que a classe, interface, método ou campo foi substituído.

Um interpretador de tempo de execução ou ferramenta que lê o formato de arquivo `class`, como um compilador, pode usar essa marcação para avisar o usuário que uma classe, interface, método ou campo substituído está sendo referenciado. A presença de um atributo `Deprecated` não altera a semântica de uma classe ou interface.

O atributo `Deprecated` tem o seguinte formato:
```
    Deprecated_attribute {
        u2 attribute_name_index;
        u4 attribute_length;
    }
    
```

Os itens da estrutura `Deprecated_attribute` são os seguintes:

attribute_name_index
    

O valor do item `attribute_name_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Utf8_info` (§4.4.7) representando a string "`Deprecated`".

attribute_length
    

O valor do item `attribute_length` deve ser zero.

### 4.7.16. O Atributo `RuntimeVisibleAnnotations`

O atributo `RuntimeVisibleAnnotations` é um atributo de comprimento variável na tabela `attributes` de uma estrutura `ClassFile`, `field_info`, `method_info` ou `record_component_info` (§4.1, §4.5, §4.6, §4.7.30). O atributo `RuntimeVisibleAnnotations` armazena anotações visíveis em tempo de execução na declaração da classe, campo, método ou componente record correspondente.

Pode haver no máximo um atributo `RuntimeVisibleAnnotations` na tabela `attributes` de uma estrutura `ClassFile`, `field_info`, `method_info` ou `record_component_info`.

O atributo `RuntimeVisibleAnnotations` tem o seguinte formato:
```
    RuntimeVisibleAnnotations_attribute {
        u2         attribute_name_index;
        u4         attribute_length;
        u2         num_annotations;
        annotation annotations[num_annotations];
    }
    
```

Os itens da estrutura `RuntimeVisibleAnnotations_attribute` são os seguintes:

attribute_name_index
    

O valor do item `attribute_name_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Utf8_info` (§4.4.7) representando a string "`RuntimeVisibleAnnotations`".

attribute_length
    

O valor do item `attribute_length` indica o comprimento do atributo, excluindo os seis bytes iniciais.

num_annotations
    

O valor do item `num_annotations` fornece o número de anotações visíveis em tempo de execução representadas pela estrutura.

annotations[]
    

Cada entrada na tabela `annotations` representa uma única anotação visível em tempo de execução em uma declaração. A estrutura `annotation` tem o seguinte formato:
```
    annotation {
        u2 type_index;
        u2 num_element_value_pairs;
        {   u2            element_name_index;
            element_value value;
        } element_value_pairs[num_element_value_pairs];
    }
          
```

Os itens da estrutura `annotation` são os seguintes:

type_index
    

O valor do item `type_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Utf8_info` (§4.4.7) representando um descritor de campo (§4.3.2). O descritor de campo denota o tipo da anotação representada por esta estrutura `annotation`.

num_element_value_pairs
    

O valor do item `num_element_value_pairs` fornece o número de pares elemento-valor da anotação representada por esta estrutura `annotation`.

element_value_pairs[]
    

Cada valor da tabela `element_value_pairs` representa um único par elemento-valor na anotação representada por esta estrutura `annotation`. Cada entrada `element_value_pairs` contém os dois itens a seguir:

element_name_index
    

O valor do item `element_name_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Utf8_info` (§4.4.7). A entrada `constant_pool` denota o nome do elemento do par elemento-valor representado por esta entrada `element_value_pairs`.

Em outras palavras, a entrada denota um elemento da interface de anotação especificada por `type_index`.

value
    

O valor do item `value` representa o valor do par elemento-valor representado por esta entrada `element_value_pairs`.

#### 4.7.16.1. A Estrutura `element_value`

A estrutura `element_value` é uma união discriminada que representa o valor de um par elemento-valor. Ela tem o seguinte formato:
```
    element_value {
        u1 tag;
        union {
            u2 const_value_index;
    
            {   u2 type_name_index;
                u2 const_name_index;
            } enum_const_value;
    
            u2 class_info_index;
    
            annotation annotation_value;
    
            {   u2            num_values;
                element_value values[num_values];
            } array_value;
        } value;
    }
    
```

O item `tag` usa um único caractere ASCII para indicar o tipo do valor do par elemento-valor. Isso determina qual item da união `value` está em uso. Tabela 4.7.16.1-A mostra os caracteres válidos para o item `tag`, o tipo indicado por cada caractere e o item usado na união `value` para cada caractere. A quarta coluna da tabela é usada na descrição abaixo de um item da união `value`.

**Tabela 4.7.16.1-A. Interpretação dos valores de `tag` como tipos**

Item `tag` | Tipo | Item `value` | Tipo Constante
---|---|---|---
`B` | `byte` | `const_value_index` | `CONSTANT_Integer`
`C` | `char` | `const_value_index` | `CONSTANT_Integer`
`D` | `double` | `const_value_index` | `CONSTANT_Double`
`F` | `float` | `const_value_index` | `CONSTANT_Float`
`I` | `int` | `const_value_index` | `CONSTANT_Integer`
`J` | `long` | `const_value_index` | `CONSTANT_Long`
`S` | `short` | `const_value_index` | `CONSTANT_Integer`
`Z` | `boolean` | `const_value_index` | `CONSTANT_Integer`
`s` | `String` | `const_value_index` | `CONSTANT_Utf8`
`e` | Enum class | `enum_const_value` | _Não aplicável_
`c` | `Class` | `class_info_index` | _Não aplicável_
`@` | Annotation interface | `annotation_value` | _Não aplicável_
`[` | Array type | `array_value` | _Não aplicável_
  
  

O item _value_ representa o valor de um par elemento-valor. O item é uma união, cujos próprios itens são os seguintes:

const_value_index
    

O item `const_value_index` denota uma constante de um tipo primitivo ou do tipo `String` como o valor deste par elemento-valor.

O valor do item `const_value_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser de um tipo apropriado ao item `tag`, conforme especificado na quarta coluna da Tabela 4.7.16.1-A.

enum_const_value
    

O item `enum_const_value` denota uma constante enum como o valor deste par elemento-valor.

O item `enum_const_value` consiste nos dois itens a seguir:

type_name_index
    

O valor do item `type_name_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Utf8_info` (§4.4.7) representando um descritor de campo (§4.3.2). A entrada `constant_pool` fornece a forma interna do nome binário do tipo da constante enum representada por esta estrutura `element_value` (§4.2.1).

const_name_index
    

O valor do item `const_name_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Utf8_info` (§4.4.7) que fornece o nome simples da constante enum representada por esta estrutura `element_value`.

class_info_index
    

O item `class_info_index` denota um literal de classe como o valor deste par elemento-valor.

O item `class_info_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Utf8_info` (§4.4.7) representando um descritor de retorno (§4.3.3). O descritor de retorno fornece o tipo correspondente ao literal de classe representado por esta estrutura `element_value`. Os tipos correspondem aos literais de classe da seguinte forma:

  * Para um literal de classe C`.``class`, onde C é o nome de uma classe, interface ou tipo de array, o tipo correspondente é C. O descritor de retorno na `constant_pool` será um _ClassType_ ou um _ArrayType_.

  * Para um literal de classe p`.``class`, onde p é o nome de um tipo primitivo, o tipo correspondente é p. O descritor de retorno na `constant_pool` será um caractere _BaseType_.

  * Para um literal de classe `void``.``class`, o tipo correspondente é `void`. O descritor de retorno na `constant_pool` será _V_.

Por exemplo, o literal de classe `Object.class` corresponde ao tipo `Object`, então a entrada `constant_pool` é `Ljava/lang/Object;`, enquanto o literal de classe `int.class` corresponde ao tipo `int`, então a entrada `constant_pool` é `I`.

O literal de classe `void.class` corresponde a `void`, então a entrada `constant_pool` é _V_, enquanto o literal de classe `Void.class` corresponde ao tipo `Void`, então a entrada `constant_pool` é `Ljava/lang/Void;`.

annotation_value
    

O item `annotation_value` denota uma anotação "aninhada" como o valor deste par elemento-valor.

O valor do item `annotation_value` é uma estrutura `annotation` (§4.7.16) que fornece a anotação representada por esta estrutura `element_value`.

array_value
    

O item `array_value` denota um array como o valor deste par elemento-valor.

O item `array_value` consiste nos dois itens a seguir:

num_values
    

O valor do item `num_values` fornece o número de elementos no array representado por esta estrutura `element_value`.

values[]
    

Cada valor na tabela `values` fornece o elemento correspondente do array representado por esta estrutura `element_value`.

### 4.7.17. O Atributo `RuntimeInvisibleAnnotations`

O atributo `RuntimeInvisibleAnnotations` é um atributo de comprimento variável na tabela `attributes` de uma estrutura `ClassFile`, `field_info`, `method_info` ou `record_component_info` (§4.1, §4.5, §4.6, §4.7.30). O atributo `RuntimeInvisibleAnnotations` armazena anotações invisíveis em tempo de execução na declaração da classe, método, campo ou componente record correspondente.

Pode haver no máximo um atributo `RuntimeInvisibleAnnotations` na tabela `attributes` de uma estrutura `ClassFile`, `field_info`, `method_info` ou `record_component_info`.

O atributo `RuntimeInvisibleAnnotations` é semelhante ao atributo `RuntimeVisibleAnnotations` (§4.7.16), exceto que as anotações representadas por um atributo `RuntimeInvisibleAnnotations` não devem ser disponibilizadas para retorno por APIs de reflexão, a menos que a Java Virtual Machine tenha sido especificamente instruída a reter essas anotações por meio de algum mecanismo específico de implementação, como uma flag de linha de comando. Na ausência de tais instruções, a Java Virtual Machine ignora este atributo.

O atributo `RuntimeInvisibleAnnotations` tem o seguinte formato:
```
    RuntimeInvisibleAnnotations_attribute {
        u2         attribute_name_index;
        u4         attribute_length;
        u2         num_annotations;
        annotation annotations[num_annotations];
    }
    
```

Os itens da estrutura `RuntimeInvisibleAnnotations_attribute` são os seguintes:

attribute_name_index
    

O valor do item `attribute_name_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Utf8_info` (§4.4.7) representando a string "`RuntimeInvisibleAnnotations`".

attribute_length
    

O valor do item `attribute_length` indica o comprimento do atributo, excluindo os seis bytes iniciais.

num_annotations
    

O valor do item `num_annotations` fornece o número de anotações invisíveis em tempo de execução representadas pela estrutura.

annotations[]
    

Cada entrada na tabela `annotations` representa uma única anotação invisível em tempo de execução em uma declaração. A estrutura `annotation` é especificada em §4.7.16.

### 4.7.18. O Atributo `RuntimeVisibleParameterAnnotations`

O atributo `RuntimeVisibleParameterAnnotations` é um atributo de comprimento variável na tabela `attributes` da estrutura `method_info` (§4.6). O atributo `RuntimeVisibleParameterAnnotations` armazena anotações visíveis em tempo de execução nas declarações dos parâmetros formais do método correspondente.

Pode haver no máximo um atributo `RuntimeVisibleParameterAnnotations` na tabela `attributes` de uma estrutura `method_info`.

O atributo `RuntimeVisibleParameterAnnotations` tem o seguinte formato:
```
    RuntimeVisibleParameterAnnotations_attribute {
        u2 attribute_name_index;
        u4 attribute_length;
        u1 num_parameters;
        {   u2         num_annotations;
            annotation annotations[num_annotations];
        } parameter_annotations[num_parameters];
    }
    
```

Os itens da estrutura `RuntimeVisibleParameterAnnotations_attribute` são os seguintes:

attribute_name_index
    

O valor do item `attribute_name_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Utf8_info` (§4.4.7) representando a string "`RuntimeVisibleParameterAnnotations`".

attribute_length
    

O valor do item `attribute_length` indica o comprimento do atributo, excluindo os seis bytes iniciais.

num_parameters
    

O valor do item `num_parameters` fornece o número de anotações de parâmetro visíveis em tempo de execução representadas por esta estrutura.

Não há garantia de que este número seja o mesmo que o número de descritores de parâmetro no descritor do método.

parameter_annotations[]
    

Cada entrada na tabela `parameter_annotations` representa todas as anotações visíveis em tempo de execução na declaração de um único parâmetro formal. Cada entrada `parameter_annotations` contém os dois itens a seguir:

num_annotations
    

O valor do item `num_annotations` indica o número de anotações visíveis em tempo de execução na declaração do parâmetro formal correspondente à entrada `parameter_annotations`.

annotations[]
    

Cada entrada na tabela `annotations` representa uma única anotação visível em tempo de execução na declaração do parâmetro formal correspondente à entrada `parameter_annotations`. A estrutura `annotation` é especificada em §4.7.16.

A _i_-ésima entrada na tabela `parameter_annotations` pode, mas não é obrigada a, corresponder ao _i_-ésimo descritor de parâmetro no descritor do método (§4.3.3).

Por exemplo, um compilador pode optar por criar entradas na tabela correspondendo apenas aos descritores de parâmetro que representam parâmetros explicitamente declarados no código fonte. Na linguagem de programação Java, um construtor de uma classe interna é especificado para ter um parâmetro implicitamente declarado antes de seus parâmetros explicitamente declarados (JLS §8.8.1), então o método `<init>` correspondente em um arquivo `class` tem um descritor de parâmetro representando o parâmetro implicitamente declarado antes de quaisquer descritores de parâmetro representando parâmetros explicitamente declarados. Se o primeiro parâmetro explicitamente declarado for anotado no código fonte, então um compilador pode criar `parameter_annotations[0]` para armazenar anotações correspondentes ao _segundo_ descritor de parâmetro.

### 4.7.19. O Atributo `RuntimeInvisibleParameterAnnotations`

O atributo `RuntimeInvisibleParameterAnnotations` é um atributo de comprimento variável na tabela `attributes` de uma estrutura `method_info` (§4.6). O atributo `RuntimeInvisibleParameterAnnotations` armazena anotações invisíveis em tempo de execução nas declarações dos parâmetros formais do método correspondente.

Pode haver no máximo um atributo `RuntimeInvisibleParameterAnnotations` na tabela `attributes` de uma estrutura `method_info`.

O atributo `RuntimeInvisibleParameterAnnotations` é semelhante ao atributo `RuntimeVisibleParameterAnnotations` (§4.7.18), exceto que as anotações representadas por um atributo `RuntimeInvisibleParameterAnnotations` não devem ser disponibilizadas para retorno por APIs de reflexão, a menos que a Java Virtual Machine tenha sido especificamente instruída a reter essas anotações por meio de algum mecanismo específico de implementação, como uma flag de linha de comando. Na ausência de tais instruções, a Java Virtual Machine ignora este atributo.
O atributo `RuntimeInvisibleParameterAnnotations` tem o seguinte formato:
```
    RuntimeInvisibleParameterAnnotations_attribute {
        u2 attribute_name_index;
        u4 attribute_length;
        u1 num_parameters;
        {   u2         num_annotations;
            annotation annotations[num_annotations];
        } parameter_annotations[num_parameters];
    }
    
```

Os itens da estrutura `RuntimeInvisibleParameterAnnotations_attribute` são os seguintes:

attribute_name_index
    

O valor do item `attribute_name_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Utf8_info` (§4.4.7) representando a string "`RuntimeInvisibleParameterAnnotations`".

attribute_length
    

O valor do item `attribute_length` indica o comprimento do atributo, excluindo os seis bytes iniciais.

num_parameters
    

O valor do item `num_parameters` fornece o número de anotações de parâmetro invisíveis em tempo de execução representadas por esta estrutura.

Não há garantia de que este número seja o mesmo que o número de descritores de parâmetro no descritor de método.

parameter_annotations[]
    

Cada entrada na tabela `parameter_annotations` representa todas as anotações invisíveis em tempo de execução na declaração de um único parâmetro formal. Cada entrada `parameter_annotations` contém os dois itens a seguir:

num_annotations
    

O valor do item `num_annotations` indica o número de anotações invisíveis em tempo de execução na declaração do parâmetro formal correspondente à entrada `parameter_annotations`.

annotations[]
    

Cada entrada na tabela `annotations` representa uma única anotação invisível em tempo de execução na declaração do parâmetro formal correspondente à entrada `parameter_annotations`. A estrutura `annotation` é especificada em §4.7.16.

A _i_-ésima entrada na tabela `parameter_annotations` pode, mas não é obrigada a, corresponder ao _i_-ésimo descritor de parâmetro no descritor de método (§4.3.3).

Consulte a nota em §4.7.18 para um exemplo de quando `parameter_annotations[0]` não corresponde ao primeiro descritor de parâmetro no descritor de método.

### 4.7.20. O Atributo `RuntimeVisibleTypeAnnotations` 

O atributo `RuntimeVisibleTypeAnnotations` é um atributo de comprimento variável na tabela `attributes` de uma estrutura `ClassFile`, `field_info`, `method_info` ou `record_component_info`, ou atributo `Code` (§4.1, §4.5, §4.6, §4.7.30, §4.7.3). O atributo `RuntimeVisibleTypeAnnotations` armazena anotações visíveis em tempo de execução em tipos usados na declaração da classe, campo, método ou componente de record correspondente, ou em uma expressão no corpo do método correspondente. O atributo `RuntimeVisibleTypeAnnotations` também armazena anotações visíveis em tempo de execução em declarações de parâmetros de tipo de classes, interfaces, métodos e construtores genéricos.

Pode haver no máximo um atributo `RuntimeVisibleTypeAnnotations` na tabela `attributes` de uma estrutura `ClassFile`, `field_info`, `method_info` ou `record_component_info`, ou atributo `Code`.

Uma tabela `attributes` contém um atributo `RuntimeVisibleTypeAnnotations` somente se os tipos forem anotados em tipos de declaração ou expressão que correspondam à estrutura pai ou atributo da tabela `attributes`.

Por exemplo, todas as anotações em tipos na cláusula `implements` de uma declaração de classe são registradas no atributo `RuntimeVisibleTypeAnnotations` da estrutura `ClassFile` da classe. Enquanto isso, todas as anotações no tipo em uma declaração de campo são registradas no atributo `RuntimeVisibleTypeAnnotations` da estrutura `field_info` do campo.

O atributo `RuntimeVisibleTypeAnnotations` tem o seguinte formato:
```
    RuntimeVisibleTypeAnnotations_attribute {
        u2              attribute_name_index;
        u4              attribute_length;
        u2              num_annotations;
        type_annotation annotations[num_annotations];
    }
    
```

Os itens da estrutura `RuntimeVisibleTypeAnnotations_attribute` são os seguintes:

attribute_name_index
    

O valor do item `attribute_name_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Utf8_info` representando a string "`RuntimeVisibleTypeAnnotations`".

attribute_length
    

O valor do item `attribute_length` indica o comprimento do atributo, excluindo os seis bytes iniciais.

num_annotations
    

O valor do item `num_annotations` fornece o número de anotações de tipo visíveis em tempo de execução representadas pela estrutura.

annotations[]
    

Cada entrada na tabela `annotations` representa uma única anotação de tipo visível em tempo de execução em um tipo usado em uma declaração ou expressão. A estrutura `type_annotation` tem o seguinte formato:
```
    type_annotation {
        u1 target_type;
        union {
            type_parameter_target;
            supertype_target;
            type_parameter_bound_target;
            empty_target;
            formal_parameter_target;
            throws_target;
            localvar_target;
            catch_target;
            offset_target;
            type_argument_target;
        } target_info;
        type_path target_path;
        u2        type_index;
        u2        num_element_value_pairs;
        {   u2            element_name_index;
            element_value value;
        } element_value_pairs[num_element_value_pairs];
    }
          
```

Os três primeiros itens - `target_type`, `target_info` e `target_path` - especificam a localização precisa do tipo anotado. Os três últimos itens - `type_index`, `num_element_value_pairs` e `element_value_pairs[]` - especificam o próprio tipo da anotação e os pares de elemento-valor.

Os itens da estrutura `type_annotation` são os seguintes:

target_type
    

O valor do item `target_type` denota o tipo de alvo no qual a anotação aparece. Os vários tipos de alvo correspondem aos _contextos de tipo_ da linguagem de programação Java onde os tipos são usados em declarações e expressões (JLS §4.11).

Os valores legais de `target_type` são especificados na Tabela 4.7.20-A") e Tabela 4.7.20-B"). Cada valor é uma tag de um byte indicando qual item da união `target_info` segue o item `target_type` para fornecer mais informações sobre o alvo.

Os tipos de alvo na Tabela 4.7.20-A") e Tabela 4.7.20-B") correspondem aos contextos de tipo em JLS §4.11. Ou seja, os valores de `target_type` 0x10-0x17 e 0x40-0x42 correspondem aos contextos de tipo 1-11, enquanto os valores de `target_type` 0x43-0x4B correspondem aos contextos de tipo 12-17.

O valor do item `target_type` determina se a estrutura `type_annotation` aparece em um atributo `RuntimeVisibleTypeAnnotations` em uma estrutura `ClassFile`, uma estrutura `field_info`, uma estrutura `method_info` ou um atributo `Code`. A Tabela 4.7.20-C fornece a localização do atributo `RuntimeVisibleTypeAnnotations` para uma estrutura `type_annotation` com cada valor `target_type` legal.

target_info
    

O valor do item `target_info` denota precisamente qual tipo em uma declaração ou expressão é anotado.

Os itens da união `target_info` são especificados em §4.7.20.1.

target_path
    

O valor do item `target_path` denota precisamente qual parte do tipo indicado por `target_info` é anotada.

O formato da estrutura `type_path` é especificado em §4.7.20.2.

type_index, num_element_value_pairs, element_value_pairs[]
    

O significado desses itens na estrutura `type_annotation` é o mesmo que seu significado na estrutura `annotation` (§4.7.16).

**Tabela 4.7.20-A. Interpretação dos valores de `target_type` (Parte 1)**

Valor | Tipo de alvo | Item `target_info`   
---|---|---  
0x00 | declaração de parâmetro de tipo de classe ou interface genérica  | `type_parameter_target`  
0x01 | declaração de parâmetro de tipo de método ou construtor genérico  | `type_parameter_target`  
0x10 | tipo na cláusula `extends` ou `implements` de declaração de classe (incluindo a superclasse direta ou superinterface direta de uma declaração de classe anônima), ou na cláusula `extends` de declaração de interface  | `supertype_target`  
0x11 | tipo no limite da declaração de parâmetro de tipo de classe ou interface genérica  | `type_parameter_bound_target`  
0x12 | tipo no limite da declaração de parâmetro de tipo de método ou construtor genérico  | `type_parameter_bound_target`  
0x13 | tipo em declaração de campo ou componente de record  | `empty_target`  
0x14 | tipo de retorno de método, ou tipo de objeto recém-construído  | `empty_target`  
0x15 | tipo receptor de método ou construtor | `empty_target`  
0x16 | tipo em declaração de parâmetro formal de método, construtor ou expressão lambda  | `formal_parameter_target`  
0x17 | tipo na cláusula `throws` de método ou construtor  | `throws_target`  
  
  


**Tabela 4.7.20-B. Interpretação dos valores de `target_type` (Parte 2)**

Valor | Tipo de alvo | Item `target_info`   
---|---|---  
0x40 | tipo em declaração de variável local | `localvar_target`  
0x41 | tipo em declaração de variável de recurso | `localvar_target`  
0x42 | tipo em declaração de parâmetro de exceção | `catch_target`  
0x43 | tipo em expressão _instanceof_  | `offset_target`  
0x44 | tipo em expressão _new_  | `offset_target`  
0x45 | tipo em expressão de referência de método usando `::`_new_ | `offset_target`  
0x46 | tipo em expressão de referência de método usando `::`_Identifier_ | `offset_target`  
0x47 | tipo em expressão de cast | `type_argument_target`  
0x48 | argumento de tipo para construtor genérico em expressão _new_ ou instrução de invocação explícita de construtor  | `type_argument_target`  
0x49 | argumento de tipo para método genérico em expressão de invocação de método  | `type_argument_target`  
0x4A | argumento de tipo para construtor genérico em expressão de referência de método usando `::`_new_ | `type_argument_target`  
0x4B | argumento de tipo para método genérico em expressão de referência de método usando `::`_Identifier_ | `type_argument_target`  
  
  


**Tabela 4.7.20-C. Localização do atributo envolvente para valores de `target_type`**

Valor | Tipo de alvo | Localização  
---|---|---  
0x00 | declaração de parâmetro de tipo de classe ou interface genérica  | `ClassFile`  
0x01 | declaração de parâmetro de tipo de método ou construtor genérico  | `method_info`  
0x10 | tipo na cláusula `extends` de declaração de classe ou interface, ou na cláusula `implements` de declaração de interface  | `ClassFile`  
0x11 | tipo no limite da declaração de parâmetro de tipo de classe ou interface genérica  | `ClassFile`  
0x12 | tipo no limite da declaração de parâmetro de tipo de método ou construtor genérico  | `method_info`  
0x13 | tipo em declaração de campo ou componente de record  | `field_info`, `record_component_info`  
0x14 | tipo de retorno de método ou construtor | `method_info`  
0x15 | tipo receptor de método ou construtor | `method_info`  
0x16 | tipo em declaração de parâmetro formal de método, construtor ou expressão lambda  | `method_info`  
0x17 | tipo na cláusula `throws` de método ou construtor  | `method_info`  
0x40-0x4B | tipos em declarações de variáveis locais, declarações de variáveis de recurso, declarações de parâmetros de exceção, expressões  | `Code`  
  
  


#### 4.7.20.1. A união `target_info` 

Os itens da união `target_info` (exceto o primeiro) especificam precisamente qual tipo em uma declaração ou expressão é anotado. O primeiro item especifica não qual tipo, mas sim qual declaração de um parâmetro de tipo é anotada. Os itens são os seguintes: 

  * O item `type_parameter_target` indica que uma anotação aparece na declaração do _i_-ésimo parâmetro de tipo de uma classe genérica, interface genérica, método genérico ou construtor genérico. 
```type_parameter_target {
            u1 type_parameter_index;
        }
            
```

O valor do item `type_parameter_index` especifica qual declaração de parâmetro de tipo é anotada. Um valor `type_parameter_index` de `0` especifica a primeira declaração de parâmetro de tipo. 

  * O item `supertype_target` indica que uma anotação aparece em um tipo na cláusula `extends` ou `implements` de uma declaração de classe ou interface. 
```supertype_target {
            u2 supertype_index;
        }
            
```

Um valor `supertype_index` de 65535 especifica que a anotação aparece na superclasse em uma cláusula `extends` de uma declaração de classe. 

Qualquer outro valor `supertype_index` é um índice no array `interfaces` da estrutura `ClassFile` envolvente e especifica que a anotação aparece nessa superinterface, seja na cláusula `implements` de uma declaração de classe ou na cláusula `extends` de uma declaração de interface. 

  * O item `type_parameter_bound_target` indica que uma anotação aparece no _i_-ésimo limite da _j_-ésima declaração de parâmetro de tipo de uma classe genérica, interface, método ou construtor. 
```type_parameter_bound_target {
            u1 type_parameter_index;
            u1 bound_index;
        }
            
```

O valor do item `type_parameter_index` especifica qual declaração de parâmetro de tipo tem um limite anotado. Um valor `type_parameter_index` de `0` especifica a primeira declaração de parâmetro de tipo. 

O valor do item `bound_index` especifica qual limite da declaração de parâmetro de tipo indicada por `type_parameter_index` é anotado. Um valor `bound_index` de `0` especifica o primeiro limite de uma declaração de parâmetro de tipo. 

O item `type_parameter_bound_target` registra que um limite é anotado, mas não registra o tipo que constitui o limite. O tipo pode ser encontrado inspecionando a assinatura da classe ou a assinatura do método armazenada no atributo `Signature` apropriado. 

  * O item `empty_target` indica que uma anotação aparece no tipo em uma declaração de campo, no tipo em uma declaração de componente de record, no tipo de retorno de um método, no tipo de um objeto recém-construído ou no tipo receptor de um método ou construtor. 
```empty_target {
        }
            
```

Apenas um tipo aparece em cada uma dessas localizações, portanto, não há informações por tipo para representar na união `target_info`. 

  * O item `formal_parameter_target` indica que uma anotação aparece no tipo em uma declaração de parâmetro formal de um método, construtor ou expressão lambda. 
```formal_parameter_target {
            u1 formal_parameter_index;
        }
            
```

O valor do item `formal_parameter_index` especifica qual declaração de parâmetro formal tem um tipo anotado. Um valor `formal_parameter_index` de _i_ pode, mas não é obrigado a, corresponder ao _i_-ésimo descritor de parâmetro no descritor de método (§4.3.3). 

O item `formal_parameter_target` registra que o tipo de um parâmetro formal é anotado, mas não registra o próprio tipo. O tipo pode ser encontrado inspecionando o descritor de método, embora um valor `formal_parameter_index` de `0` nem sempre indique o primeiro descritor de parâmetro no descritor de método; veja a nota em §4.7.18 para uma situação semelhante envolvendo a tabela `parameter_annotations`. 

  * O item `throws_target` indica que uma anotação aparece no _i_-ésimo tipo na cláusula `throws` de uma declaração de método ou construtor. 
```throws_target {
            u2 throws_type_index;
        }
            
```

O valor do item `throws_type_index` é um índice no array `exception_index_table` do atributo `Exceptions` da estrutura `method_info` que envolve o atributo `RuntimeVisibleTypeAnnotations`. 

  * O item `localvar_target` indica que uma anotação aparece no tipo em uma declaração de variável local, incluindo uma variável declarada como um recurso em uma instrução `try`-with-resources. 
```localvar_target {
            u2 table_length;
            {   u2 start_pc;
                u2 length;
                u2 index;
            } table[table_length];
        }
            
```

O valor do item `table_length` fornece o número de entradas no array `table`. Cada entrada indica um intervalo de offsets do array `code` dentro do qual uma variável local tem um valor. Também indica o índice no array de variáveis locais do frame atual onde essa variável local pode ser encontrada. Cada entrada contém os três itens a seguir: 

start_pc, length
    

A variável local dada tem um valor nos índices do array `code` no intervalo [`start_pc`, `start_pc + length`), ou seja, entre `start_pc` inclusive e `start_pc + length` exclusivo. 

index
    

A variável local dada deve estar em `index` no array de variáveis locais do frame atual. 

Se a variável local em `index` for do tipo `double` ou `long`, ela ocupa `index` e `index + 1`. 

Uma tabela é necessária para especificar completamente a variável local cujo tipo é anotado, porque uma única variável local pode ser representada com diferentes índices de variáveis locais em múltiplos intervalos de vida. Os itens `start_pc`, `length` e `index` em cada entrada da tabela especificam as mesmas informações que um atributo `LocalVariableTable`. 

O item `localvar_target` registra que o tipo de uma variável local é anotado, mas não registra o próprio tipo. O tipo pode ser encontrado inspecionando o atributo `LocalVariableTable` apropriado. 

  * O item `catch_target` indica que uma anotação aparece no _i_-ésimo tipo em uma declaração de parâmetro de exceção. 
```catch_target {
            u2 exception_table_index;
        }
            
```

O valor do item `exception_table_index` é um índice no array `exception_table` do atributo `Code` que envolve o atributo `RuntimeVisibleTypeAnnotations`. 

A possibilidade de mais de um tipo em uma declaração de parâmetro de exceção surge da cláusula multi-`catch` da instrução `try`, onde o tipo do parâmetro de exceção é uma união de tipos (JLS §14.20). Um compilador geralmente cria uma entrada `exception_table` para cada tipo na união, o que permite que o item `catch_target` os distinga. Isso preserva a correspondência entre um tipo e suas anotações. 

  * O item `offset_target` indica que uma anotação aparece no tipo em uma expressão _instanceof_ ou em uma expressão _new_, ou no tipo antes de `::` em uma expressão de referência de método. 
```offset_target {
            u2 offset;
        }
            
```

O valor do item `offset` especifica o offset do array `code` da instrução bytecode correspondente à expressão _instanceof_, da instrução bytecode _new_ correspondente à expressão _new_, ou da instrução bytecode correspondente à expressão de referência de método. 

  * O item `type_argument_target` indica que uma anotação aparece no _i_-ésimo tipo em uma expressão de cast, ou no _i_-ésimo argumento de tipo na lista explícita de argumentos de tipo para qualquer um dos seguintes: uma expressão _new_, uma instrução de invocação explícita de construtor, uma expressão de invocação de método ou uma expressão de referência de método. 
```type_argument_target {
            u2 offset;
            u1 type_argument_index;
        }
            
```

O valor do item `offset` especifica o offset do array `code` da instrução bytecode correspondente à expressão de cast, da instrução bytecode _new_ correspondente à expressão _new_, da instrução bytecode correspondente à instrução de invocação explícita de construtor, da instrução bytecode correspondente à expressão de invocação de método ou da instrução bytecode correspondente à expressão de referência de método. 

Para uma expressão de cast, o valor do item `type_argument_index` especifica qual tipo no operador de cast é anotado. Um valor `type_argument_index` de `0` especifica o primeiro (ou único) tipo no operador de cast. 

A possibilidade de mais de um tipo em uma expressão de cast surge de um cast para um tipo de interseção. 

Para uma lista explícita de argumentos de tipo, o valor do item `type_argument_index` especifica qual argumento de tipo é anotado. Um valor `type_argument_index` de `0` especifica o primeiro argumento de tipo. 




#### 4.7.20.2. A estrutura `type_path` 

Onde quer que um tipo seja usado em uma declaração ou expressão, a estrutura `type_path` identifica qual parte do tipo é anotada. Uma anotação pode aparecer no próprio tipo, mas se o tipo for um tipo de referência, então há locais adicionais onde uma anotação pode aparecer: 

  * Se um tipo de array T`[]` for usado em uma declaração ou expressão, então uma anotação pode aparecer em qualquer tipo de componente do tipo de array, incluindo o tipo de elemento. 

  * Se um tipo aninhado T1`.`T2 for usado em uma declaração ou expressão, então uma anotação pode aparecer no nome do tipo de membro mais interno e em qualquer tipo envolvente para o qual uma anotação de tipo seja admissível (JLS §9.7.4). 

  * Se um tipo parametrizado T`<`A`>` ou T`<`? extends A`>` ou T`<`? super A`>` for usado em uma declaração ou expressão, então uma anotação pode aparecer em qualquer argumento de tipo ou no limite de qualquer argumento de tipo curinga. 




Por exemplo, considere as diferentes partes de `String``[]``[]` que são anotadas em: 
```
    @Foo String[][]   // Annotates the class type String
    String @Foo [][]  // Annotates the array type String[][]
    String[] @Foo []  // Annotates the array type String[]
    
```

ou as diferentes partes do tipo aninhado `Outer.Middle.Inner` que são anotadas em: 
```
    @Foo Outer.Middle.Inner
    Outer.@Foo Middle.Inner
    Outer.Middle.@Foo Inner
    
```

ou as diferentes partes dos tipos parametrizados `Map<String,Object>` e `List<...>` que são anotadas em: 
```
    @Foo Map<String,Object>
    Map<@Foo String,Object>
    Map<String,@Foo Object>
    
    List<@Foo ? extends String>
    List<? extends @Foo String>
    
```

A estrutura `type_path` tem o seguinte formato: 
```
    type_path {
        u1 path_length;
        {   u1 type_path_kind;
            u1 type_argument_index;
        } path[path_length];
    }
    
```

O valor do item `path_length` fornece o número de entradas no array `path`: 

  * Se o valor de `path_length` for `0`, e o tipo sendo anotado for um tipo aninhado, então a anotação se aplica à parte mais externa do tipo para a qual uma anotação de tipo é admissível. 

  * Se o valor de `path_length` for `0`, e o tipo sendo anotado não for um tipo aninhado, então a anotação aparece diretamente no próprio tipo. 

  * Se o valor de `path_length` for diferente de zero, então cada entrada no array `path` representa um passo iterativo, da esquerda para a direita, em direção à localização precisa da anotação em um tipo de array, tipo aninhado ou tipo parametrizado. (Em um tipo de array, a iteração visita o próprio tipo de array, depois seu tipo de componente, depois o tipo de componente desse tipo de componente, e assim por diante, até que o tipo de elemento seja alcançado.) Cada entrada contém os dois itens a seguir: 

type_path_kind
    

Os valores legais para o item `type_path_kind` estão listados na Tabela 4.7.20.2-A. 

**Tabela 4.7.20.2-A. Interpretação dos valores de `type_path_kind`**

Valor | Interpretação  
---|---  
`0` | Anotação está mais profunda em um tipo de array  
`1` | Anotação está mais profunda em um tipo aninhado  
`2` | Anotação está no limite de um argumento de tipo curinga de um tipo parametrizado   
`3` | Anotação está em um argumento de tipo de um tipo parametrizado   
  
  

type_argument_index
    

Se o valor do item `type_path_kind` for `0`, `1` ou `2`, então o valor do item `type_argument_index` é `0`. 

Se o valor do item `type_path_kind` for `3`, então o valor do item `type_argument_index` especifica qual argumento de tipo de um tipo parametrizado é anotado, onde `0` indica o primeiro argumento de tipo de um tipo parametrizado. 




**Tabela 4.7.20.2-B. Estruturas `type_path` para `@A Map<@B ? extends @C String, @D List<@E Object>>` **

Anotação | `path_length` | `path`  
---|---|---  
`@A` | `0` | `[]`  
`@B` | `1` | `[{type_path_kind: 3; type_argument_index: 0}]`  
`@C` | `2` | `[{type_path_kind: 3; type_argument_index: 0}, {type_path_kind: 2; type_argument_index: 0}]`  
`@D` | `1` | `[{type_path_kind: 3; type_argument_index: 1}]`  
`@E` | `2` | `[{type_path_kind: 3; type_argument_index: 1}, {type_path_kind: 3; type_argument_index: 0}]`  
  
  


**Tabela 4.7.20.2-C. Estruturas `type_path` para `@I String @F [] @G [] @H []`**

Anotação | `path_length` | `path`  
---|---|---  
`@F` | `0` | `[]`  
`@G` | `1` | `[{type_path_kind: 0; type_argument_index: 0}]`  
`@H` | `2` | `[{type_path_kind: 0; type_argument_index: 0}, {type_path_kind: 0; type_argument_index: 0}]`  
`@I` | `3` | `[{type_path_kind: 0; type_argument_index: 0}, {type_path_kind: 0; type_argument_index: 0}, {type_path_kind: 0; type_argument_index: 0}]`  
  
  


**Tabela 4.7.20.2-D. Estruturas `type_path` para `@A List<@B Comparable<@F Object @C [] @D [] @E []>>`**

Anotação | `path_length` | `path`  
---|---|---  
`@A` | `0` | `[]`  
`@B` | `1` | `[{type_path_kind: 3; type_argument_index: 0}]`  
`@C` | `2` | `[{type_path_kind: 3; type_argument_index: 0}, {type_path_kind: 3; type_argument_index: 0}]`  
`@D` | `3` | `[{type_path_kind: 3; type_argument_index: 0}, {type_path_kind: 3; type_argument_index: 0}, {type_path_kind: 0; type_argument_index: 0}]`  
`@E` | `4` | `[{type_path_kind: 3; type_argument_index: 0}, {type_path_kind: 3; type_argument_index: 0}, {type_path_kind: 0; type_argument_index: 0}, {type_path_kind: 0; type_argument_index: 0}]`  
`@F` | `5` | `[{type_path_kind: 3; type_argument_index: 0}, {type_path_kind: 3; type_argument_index: 0}, {type_path_kind: 0; type_argument_index: 0}, {type_path_kind: 0; type_argument_index: 0}, {type_path_kind: 0; type_argument_index: 0}]`  
  
  


**Tabela 4.7.20.2-E. Estruturas `type_path` para `@A Outer . @B Middle . @C Inner`**

Assumindo: |   | 
```
    class Outer {
      class Middle {
        class Inner {}
      }
    }
```  
  
---|---|---  
Anotação | `path_length` | `path`  
`@A` | `0` | `[]`  
`@B` | `1` | `[{type_path_kind: 1; type_argument_index: 0}]`  
`@C` | `2` | `[{type_path_kind: 1; type_argument_index: 0}, {type_path_kind: 1; type_argument_index: 0}]`  
  
  


**Tabela 4.7.20.2-F. Estruturas `type_path` para `Outer . @A MiddleStatic . @B Inner`**

Assumindo: |   | 
```
    class Outer {
      static class MiddleStatic {
        class Inner {}
      }
    }
```  
  
---|---|---  
Anotação | `path_length` | `path`  
`@A` | `0` | `[]`  
`@B` | `1` | `[{type_path_kind: 1; type_argument_index: 0}]`  
  |   |  No tipo `Outer . MiddleStatic . Inner`, anotações de tipo no nome simples `Outer` não são admissíveis porque o nome de tipo à sua direita, `MiddleStatic`, não se refere a uma classe interna de `Outer`.   
  
  


**Tabela 4.7.20.2-G. Estruturas `type_path` para `Outer . MiddleStatic . @A InnerStatic`**

Assumindo: |   | 
```
    class Outer {
      static class MiddleStatic {
        static class InnerStatic {}
      }
    }
```  
  
---|---|---  
Anotação | `path_length` | `path`  
`@A` | `0` | `[]`  
  |   |  No tipo `Outer . MiddleStatic . InnerStatic`, anotações de tipo no nome simples `Outer` não são admissíveis porque o nome de tipo à sua direita, `MiddleStatic`, não se refere a uma classe interna de `Outer`. Similarmente, anotações de tipo no nome simples `MiddleStatic` não são admissíveis porque o nome de tipo à sua direita, `InnerStatic`, não se refere a uma classe interna de `MiddleStatic`.   
  
  


**Tabela 4.7.20.2-H. Estruturas `type_path` para `Outer . Middle<@A Foo . @B Bar> . Inner<@D String @C []>`**

Assumindo: |   | 
```
    class Outer {
      class Middle<T> {
        class Inner<U> {}
      }
    }
    
```  
  
---|---|---  
Anotação | `path_length` | `path`  
`@A` | `2` | `[{type_path_kind: 1; type_argument_index: 0}, {type_path_kind: 3; type_argument_index: 0}]`  
`@B` | `3` | `[{type_path_kind: 1; type_argument_index: 0}, {type_path_kind: 3; type_argument_index: 0}, {type_path_kind: 1; type_argument_index: 0}]`  
`@C` | `3` | `[{type_path_kind: 1; type_argument_index: 0}, {type_path_kind: 1; type_argument_index: 0}, {type_path_kind: 3; type_argument_index: 0}]`  
`@D` | `4` | `[{type_path_kind: 1; type_argument_index: 0}, {type_path_kind: 1; type_argument_index: 0}, {type_path_kind: 3; type_argument_index: 0}, {type_path_kind: 0; type_argument_index: 0}]`  
  
  


### 4.7.21. O Atributo `RuntimeInvisibleTypeAnnotations` 

O atributo `RuntimeInvisibleTypeAnnotations` é um atributo de comprimento variável na tabela `attributes` de uma estrutura `ClassFile`, `field_info`, `method_info` ou `record_component_info`, ou atributo `Code` (§4.1, §4.5, §4.6, §4.7.30, §4.7.3). O atributo `RuntimeInvisibleTypeAnnotations` armazena anotações invisíveis em tempo de execução em tipos usados na declaração correspondente de uma classe, campo, método ou componente de record, ou em uma expressão no corpo do método correspondente. O atributo `RuntimeInvisibleTypeAnnotations` também armazena anotações em declarações de parâmetros de tipo de classes, interfaces, métodos e construtores genéricos. 

Pode haver no máximo um atributo `RuntimeInvisibleTypeAnnotations` na tabela `attributes` de uma estrutura `ClassFile`, `field_info`, `method_info` ou `record_component_info`, ou atributo `Code`. 

Uma tabela `attributes` contém um atributo `RuntimeInvisibleTypeAnnotations` somente se os tipos forem anotados em tipos de declaração ou expressão que correspondam à estrutura pai ou atributo da tabela `attributes`. 

O atributo `RuntimeInvisibleTypeAnnotations` tem o seguinte formato: 
```
    RuntimeInvisibleTypeAnnotations_attribute {
        u2              attribute_name_index;
        u4              attribute_length;
        u2              num_annotations;
        type_annotation annotations[num_annotations];
    }
    
```

Os itens da estrutura `RuntimeInvisibleTypeAnnotations_attribute` são os seguintes: 

attribute_name_index
    

O valor do item `attribute_name_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Utf8_info` representando a string "`RuntimeInvisibleTypeAnnotations`". 

attribute_length
    

O valor do item `attribute_length` indica o comprimento do atributo, excluindo os seis bytes iniciais. 

num_annotations
    

O valor do item `num_annotations` fornece o número de anotações de tipo invisíveis em tempo de execução representadas pela estrutura. 

annotations[]
    

Cada entrada na tabela `annotations` representa uma única anotação de tipo invisível em tempo de execução em um tipo usado em uma declaração ou expressão. A estrutura `type_annotation` é especificada em §4.7.20. 
### 4.7.22. O Atributo `AnnotationDefault`

O atributo `AnnotationDefault` é um atributo de comprimento variável na tabela `attributes` de certas estruturas `method_info` (§4.6), ou seja, aquelas que representam elementos de interfaces de anotação (JLS §9.6.1). O atributo `AnnotationDefault` registra o valor padrão (JLS §9.6.2) para o elemento representado pela estrutura `method_info`.

Pode haver no máximo um atributo `AnnotationDefault` na tabela `attributes` de uma estrutura `method_info` que representa um elemento de uma interface de anotação.

O atributo `AnnotationDefault` tem o seguinte formato:
```
    AnnotationDefault_attribute {
        u2            attribute_name_index;
        u4            attribute_length;
        element_value default_value;
    }
    
```

Os itens da estrutura `AnnotationDefault_attribute` são os seguintes:

attribute_name_index
    

O valor do item `attribute_name_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Utf8_info` (§4.4.7) representando a string "`AnnotationDefault`".

attribute_length
    

O valor do item `attribute_length` indica o comprimento do atributo, excluindo os seis bytes iniciais.

default_value
    

O item `default_value` representa o valor padrão do elemento da interface de anotação representado pela estrutura `method_info` que contém este atributo `AnnotationDefault`.

### 4.7.23. O Atributo `BootstrapMethods`

O atributo `BootstrapMethods` é um atributo de comprimento variável na tabela `attributes` de uma estrutura `ClassFile` (§4.1). O atributo `BootstrapMethods` registra métodos bootstrap usados para produzir constantes computadas dinamicamente e call sites computados dinamicamente (§4.4.10).

Deve haver exatamente um atributo `BootstrapMethods` na tabela `attributes` de uma estrutura `ClassFile` se a tabela `constant_pool` da estrutura `ClassFile` tiver pelo menos uma entrada `CONSTANT_Dynamic_info` ou `CONSTANT_InvokeDynamic_info`.

Pode haver no máximo um atributo `BootstrapMethods` na tabela `attributes` de uma estrutura `ClassFile`.

O atributo `BootstrapMethods` tem o seguinte formato:
```
    BootstrapMethods_attribute {
        u2 attribute_name_index;
        u4 attribute_length;
        u2 num_bootstrap_methods;
        {   u2 bootstrap_method_ref;
            u2 num_bootstrap_arguments;
            u2 bootstrap_arguments[num_bootstrap_arguments];
        } bootstrap_methods[num_bootstrap_methods];
    }
    
```

Os itens da estrutura `BootstrapMethods_attribute` são os seguintes:

attribute_name_index
    

O valor do item `attribute_name_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Utf8_info` (§4.4.7) representando a string "`BootstrapMethods`".

attribute_length
    

O valor do item `attribute_length` indica o comprimento do atributo, excluindo os seis bytes iniciais.

num_bootstrap_methods
    

O valor do item `num_bootstrap_methods` determina o número de especificadores de método bootstrap no array `bootstrap_methods`.

bootstrap_methods[]
    

Cada entrada na tabela `bootstrap_methods` contém um índice para uma estrutura `CONSTANT_MethodHandle_info` que especifica um método bootstrap, e uma sequência (talvez vazia) de índices para _argumentos estáticos_ para o método bootstrap.

Cada entrada `bootstrap_methods` deve conter os três itens a seguir:

bootstrap_method_ref
    

O valor do item `bootstrap_method_ref` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_MethodHandle_info` (§4.4.8).

O method handle será resolvido durante a resolução de uma constante computada dinamicamente ou call site (§5.4.3.6), e então invocado como se fosse por invocação de `invokeWithArguments` em `java.lang.invoke.MethodHandle`. O method handle deve ser capaz de aceitar o array de argumentos descrito em §5.4.3.6, ou a resolução falhará.

num_bootstrap_arguments
    

O valor do item `num_bootstrap_arguments` indica o número de itens no array `bootstrap_arguments`.

bootstrap_arguments[]
    

Cada entrada no array `bootstrap_arguments` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser carregável (§4.4).

### 4.7.24. O Atributo `MethodParameters`

O atributo `MethodParameters` é um atributo de comprimento variável na tabela `attributes` de uma estrutura `method_info` (§4.6). Um atributo `MethodParameters` registra informações sobre os parâmetros formais de um método, como seus nomes.

Pode haver no máximo um atributo `MethodParameters` na tabela `attributes` de uma estrutura `method_info`.

O atributo `MethodParameters` tem o seguinte formato:
```
    MethodParameters_attribute {
        u2 attribute_name_index;
        u4 attribute_length;
        u1 parameters_count;
        {   u2 name_index;
            u2 access_flags;
        } parameters[parameters_count];
    }
    
```

Os itens da estrutura `MethodParameters_attribute` são os seguintes:

attribute_name_index
    

O valor do item `attribute_name_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Utf8_info` (§4.4.7) representando a string "`MethodParameters`".

attribute_length
    

O valor do item `attribute_length` indica o comprimento do atributo, excluindo os seis bytes iniciais.

parameters_count
    

O valor do item `parameters_count` indica o número de descritores de parâmetro no descritor de método (§4.3.3) referenciado pelo `descriptor_index` da estrutura `method_info` que contém o atributo.

Esta não é uma restrição que uma implementação da Java Virtual Machine deve impor durante a verificação de formato (§4.8). A tarefa de corresponder descritores de parâmetro em um descritor de método com os itens no array `parameters` abaixo é realizada pelas bibliotecas de reflexão da Plataforma Java SE.

parameters[]
    

Cada entrada no array `parameters` contém o seguinte par de itens:

name_index
    

O valor do item `name_index` deve ser zero ou um índice válido na tabela `constant_pool`.

Se o valor do item `name_index` for zero, então este elemento `parameters` indica um parâmetro formal sem nome.

Se o valor do item `name_index` for diferente de zero, a entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Utf8_info` representando um nome não qualificado válido que denota um parâmetro formal (§4.2.2).

access_flags
    

O valor do item `access_flags` é o seguinte:

0x0010 (`ACC_FINAL`)
    

Indica que o parâmetro formal foi declarado `final`.

0x1000 (`ACC_SYNTHETIC`)
    

Indica que o parâmetro formal não foi declarado explicitamente ou implicitamente no código-fonte, de acordo com a especificação da linguagem em que o código-fonte foi escrito (JLS §13.1). (O parâmetro formal é um artefato de implementação do compilador que produziu este arquivo `class`.)

0x8000 (`ACC_MANDATED`)
    

Indica que o parâmetro formal foi implicitamente declarado no código-fonte, de acordo com a especificação da linguagem em que o código-fonte foi escrito (JLS §13.1). (O parâmetro formal é exigido por uma especificação de linguagem, então todos os compiladores para a linguagem devem emiti-lo.)

A _i_-ésima entrada no array `parameters` corresponde ao _i_-ésimo descritor de parâmetro no descritor do método que o contém. (O item `parameters_count` tem um byte porque um descritor de método é limitado a 255 parâmetros.) Efetivamente, isso significa que o array `parameters` armazena informações para todos os parâmetros do método. Poder-se-ia imaginar outros esquemas, onde as entradas no array `parameters` especificam seus descritores de parâmetro correspondentes, mas isso complicaria indevidamente o atributo `MethodParameters`.

A _i_-ésima entrada no array `parameters` pode ou não corresponder ao _i_-ésimo tipo no atributo `Signature` do método que o contém (se presente), ou à _i_-ésima anotação nas anotações de parâmetro do método que o contém.

### 4.7.25. O Atributo `Module`

O atributo `Module` é um atributo de comprimento variável na tabela `attributes` de uma estrutura `ClassFile` (§4.1). O atributo `Module` indica os módulos exigidos por um módulo; os pacotes exportados e abertos por um módulo; e os serviços usados e fornecidos por um módulo.

Pode haver no máximo um atributo `Module` na tabela `attributes` de uma estrutura `ClassFile`.

O atributo `Module` tem o seguinte formato:
```
    Module_attribute {
        u2 attribute_name_index;
        u4 attribute_length;
    
        u2 module_name_index;
        u2 module_flags;
        u2 module_version_index;
    
        u2 requires_count;
        {   u2 requires_index;
            u2 requires_flags;
            u2 requires_version_index;
        } requires[requires_count];
    
        u2 exports_count;
        {   u2 exports_index;
            u2 exports_flags;
            u2 exports_to_count;
            u2 exports_to_index[exports_to_count];
        } exports[exports_count];
    
        u2 opens_count;
        {   u2 opens_index;
            u2 opens_flags;
            u2 opens_to_count;
            u2 opens_to_index[opens_to_count];
        } opens[opens_count];
    
        u2 uses_count;
        u2 uses_index[uses_count];
    
        u2 provides_count;
        {   u2 provides_index;
            u2 provides_with_count;
            u2 provides_with_index[provides_with_count];
        } provides[provides_count];
    }
    
```

Os itens da estrutura `Module_attribute` são os seguintes:

attribute_name_index
    

O valor do item `attribute_name_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Utf8_info` (§4.4.7) representando a string "`Module`".

attribute_length
    

O valor do item `attribute_length` indica o comprimento do atributo, excluindo os seis bytes iniciais.

module_name_index
    

O valor do item `module_name_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Module_info` (§4.4.11) denotando o módulo atual.

module_flags
    

O valor do item `module_flags` é o seguinte:

0x0020 (`ACC_OPEN`)
    

Indica que este módulo está aberto.

0x1000 (`ACC_SYNTHETIC`)
    

Indica que este módulo não foi declarado explicitamente ou implicitamente.

0x8000 (`ACC_MANDATED`)
    

Indica que este módulo foi implicitamente declarado.

module_version_index
    

O valor do item `module_version_index` deve ser zero ou um índice válido na tabela `constant_pool`. Se o valor do item for zero, nenhuma informação de versão sobre o módulo atual estará presente. Se o valor do item for diferente de zero, a entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Utf8_info` representando a versão do módulo atual.

requires_count
    

O valor do item `requires_count` indica o número de entradas na tabela `requires`.

Se o módulo atual for `java.base`, então `requires_count` deve ser zero.

Se o módulo atual não for `java.base`, então `requires_count` deve ser pelo menos um.

requires[]
    

Cada entrada na tabela `requires` especifica uma dependência do módulo atual. Os itens em cada entrada são os seguintes:

requires_index
    

O valor do item `requires_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Module_info` denotando um módulo do qual o módulo atual depende.

No máximo uma entrada na tabela `requires` pode especificar um módulo de um dado nome com seu item `requires_index`.

requires_flags
    

O valor do item `requires_flags` é o seguinte:

0x0020 (`ACC_TRANSITIVE`)
    

Indica que qualquer módulo que depende do módulo atual, implicitamente declara uma dependência no módulo indicado por esta entrada.

0x0040 (`ACC_STATIC_PHASE`)
    

Indica que esta dependência é obrigatória na fase estática, ou seja, em tempo de compilação, mas é opcional na fase dinâmica, ou seja, em tempo de execução.

0x1000 (`ACC_SYNTHETIC`)
    

Indica que esta dependência não foi declarada explicitamente ou implicitamente na fonte da declaração do módulo.

0x8000 (`ACC_MANDATED`)
    

Indica que esta dependência foi implicitamente declarada na fonte da declaração do módulo.

requires_version_index
    

O valor do item `requires_version_index` deve ser zero ou um índice válido na tabela `constant_pool`. Se o valor do item for zero, nenhuma informação de versão sobre a dependência estará presente. Se o valor do item for diferente de zero, a entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Utf8_info` representando a versão do módulo especificado por `requires_index`.

A menos que o módulo atual seja `java.base`, exatamente uma entrada na tabela `requires` deve ter todos os seguintes:

  * Um item `requires_index` que indica `java.base`.

  * Um item `requires_flags` que não tenha a flag `ACC_SYNTHETIC` definida. (As flags `ACC_MANDATED` e `ACC_TRANSITIVE` podem estar definidas.)

  * Se o número de versão do arquivo `class` for 54.0 ou superior, um item `requires_flags` que não tenha a flag `ACC_STATIC_PHASE` definida.

exports_count
    

O valor do item `exports_count` indica o número de entradas na tabela `exports`.

exports[]
    

Cada entrada na tabela `exports` especifica um pacote exportado pelo módulo atual, de modo que tipos `public` e `protected` no pacote, e seus membros `public` e `protected`, podem ser acessados de fora do módulo atual, possivelmente de um conjunto limitado de módulos "amigos".

Os itens em cada entrada são os seguintes:

exports_index
    

O valor do item `exports_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Package_info` (§4.4.12) representando um pacote exportado pelo módulo atual.

No máximo uma entrada na tabela `exports` pode especificar um pacote de um dado nome com seu item `exports_index`.

exports_flags
    

O valor do item `exports_flags` é o seguinte:

0x1000 (`ACC_SYNTHETIC`)
    

Indica que esta exportação não foi declarada explicitamente ou implicitamente na fonte da declaração do módulo.

0x8000 (`ACC_MANDATED`)
    

Indica que esta exportação foi implicitamente declarada na fonte da declaração do módulo.

exports_to_count
    

O valor de `exports_to_count` indica o número de entradas na tabela `exports_to_index`.

Se `exports_to_count` for zero, então este pacote é exportado pelo módulo atual de forma _não qualificada_; o código em qualquer outro módulo pode acessar os tipos e membros no pacote.

Se `exports_to_count` for diferente de zero, então este pacote é exportado pelo módulo atual de forma _qualificada_; apenas o código nos módulos listados na tabela `exports_to_index` pode acessar os tipos e membros no pacote.

exports_to_index[]
    

O valor de cada entrada na tabela `exports_to_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Module_info` denotando um módulo cujo código pode acessar os tipos e membros neste pacote exportado.

Para cada entrada na tabela `exports`, no máximo uma entrada em sua tabela `exports_to_index` pode especificar um módulo de um dado nome.

opens_count
    

O valor do item `opens_count` indica o número de entradas na tabela `opens`.

`opens_count` deve ser zero se o módulo atual estiver aberto.

opens[]
    

Cada entrada na tabela `opens` especifica um pacote aberto pelo módulo atual, de modo que todos os tipos no pacote, e todos os seus membros, podem ser acessados de fora do módulo atual através das bibliotecas de reflexão da Plataforma Java SE, possivelmente de um conjunto limitado de módulos "amigos".

Os itens em cada entrada são os seguintes:

opens_index
    

O valor do item `opens_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Package_info` representando um pacote aberto pelo módulo atual.

No máximo uma entrada na tabela `opens` pode especificar um pacote de um dado nome com seu item `opens_index`.

opens_flags
    

O valor do item `opens_flags` é o seguinte:

0x1000 (`ACC_SYNTHETIC`)
    

Indica que esta abertura não foi declarada explicitamente ou implicitamente na fonte da declaração do módulo.

0x8000 (`ACC_MANDATED`)
    

Indica que esta abertura foi implicitamente declarada na fonte da declaração do módulo.

opens_to_count
    

O valor de `opens_to_count` indica o número de entradas na tabela `opens_to_index`.

Se `opens_to_count` for zero, então este pacote é aberto pelo módulo atual de forma _não qualificada_; o código em qualquer outro módulo pode acessar reflexivamente os tipos e membros no pacote.

Se `opens_to_count` for diferente de zero, então este pacote é aberto pelo módulo atual de forma _qualificada_; apenas o código nos módulos listados na tabela `opens_to_index` pode acessar reflexivamente os tipos e membros no pacote.

opens_to_index[]
    

O valor de cada entrada na tabela `opens_to_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Module_info` denotando um módulo cujo código pode acessar os tipos e membros neste pacote aberto.

Para cada entrada na tabela `opens`, no máximo uma entrada em sua tabela `opens_to_index` pode especificar um módulo de um dado nome.

uses_count
    

O valor do item `uses_count` indica o número de entradas na tabela `uses_index`.

uses_index[]
    

O valor de cada entrada na tabela `uses_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Class_info` (§4.4.1) representando uma interface de serviço que o módulo atual pode descobrir via `java.util.ServiceLoader`.

No máximo uma entrada na tabela `uses_index` pode especificar uma interface de serviço de um dado nome.

provides_count
    

O valor do item `provides_count` indica o número de entradas na tabela `provides`.

provides[]
    

Cada entrada na tabela `provides` representa uma implementação de serviço para uma dada interface de serviço.

Os itens em cada entrada são os seguintes:

provides_index
    

O valor do item `provides_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Class_info` representando uma interface de serviço para a qual o módulo atual fornece uma implementação de serviço.

No máximo uma entrada na tabela `provides` pode especificar uma interface de serviço de um dado nome com seu item `provides_index`.

provides_with_count
    

O valor de `provides_with_count` indica o número de entradas na tabela `provides_with_index`.

`provides_with_count` deve ser diferente de zero.

provides_with_index[]
    

O valor de cada entrada na tabela `provides_with_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Class_info` representando uma implementação de serviço para a interface de serviço especificada por `provides_index`.

Para cada entrada na tabela `provides`, no máximo uma entrada em sua tabela `provides_with_index` pode especificar uma implementação de serviço de um dado nome.

### 4.7.26. O Atributo `ModulePackages`

O atributo `ModulePackages` é um atributo de comprimento variável na tabela `attributes` de uma estrutura `ClassFile` (§4.1). O atributo `ModulePackages` indica todos os pacotes de um módulo que são exportados ou abertos pelo atributo `Module`, bem como todos os pacotes das implementações de serviço registradas no atributo `Module`. O atributo `ModulePackages` também pode indicar pacotes no módulo que não são exportados nem abertos nem contêm implementações de serviço.

Pode haver no máximo um atributo `ModulePackages` na tabela `attributes` de uma estrutura `ClassFile`.

O atributo `ModulePackages` tem o seguinte formato:
```
    ModulePackages_attribute {
        u2 attribute_name_index;
        u4 attribute_length;
        u2 package_count;
        u2 package_index[package_count];
    }
    
```

Os itens da estrutura `ModulePackages_attribute` são os seguintes:

attribute_name_index
    

O valor do item `attribute_name_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Utf8_info` (§4.4.7) representando a string "`ModulePackages`".

attribute_length
    

O valor do item `attribute_length` indica o comprimento do atributo, excluindo os seis bytes iniciais.

package_count
    

O valor do item `package_count` indica o número de entradas na tabela `package_index`.

package_index[]
    

O valor de cada entrada na tabela `package_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Package_info` (§4.4.12) representando um pacote no módulo atual.

No máximo uma entrada na tabela `package_index` pode especificar um pacote de um dado nome.

### 4.7.27. O Atributo `ModuleMainClass`

O atributo `ModuleMainClass` é um atributo de comprimento fixo na tabela `attributes` de uma estrutura `ClassFile` (§4.1). O atributo `ModuleMainClass` indica a classe principal de um módulo.

Pode haver no máximo um atributo `ModuleMainClass` na tabela `attributes` de uma estrutura `ClassFile`.

O atributo `ModuleMainClass` tem o seguinte formato:
```
    ModuleMainClass_attribute {
        u2 attribute_name_index;
        u4 attribute_length;
        u2 main_class_index;
    }
    
```

Os itens da estrutura `ModuleMainClass_attribute` são os seguintes:

attribute_name_index
    

O valor do item `attribute_name_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Utf8_info` (§4.4.7) representando a string "`ModuleMainClass`".

attribute_length
    

O valor do item `attribute_length` deve ser dois.

main_class_index
    

O valor do item `main_class_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Class_info` (§4.4.1) representando a classe principal do módulo atual.

### 4.7.28. O Atributo `NestHost`

O atributo `NestHost` é um atributo de comprimento fixo na tabela `attributes` de uma estrutura `ClassFile`. O atributo `NestHost` registra o host do nest ao qual a classe ou interface atual afirma pertencer (§5.4.4).

Pode haver no máximo um atributo `NestHost` na tabela `attributes` de uma estrutura `ClassFile`.

O atributo `NestHost` tem o seguinte formato:
```
    NestHost_attribute {
        u2 attribute_name_index;
        u4 attribute_length;
        u2 host_class_index;
    }
    
```

Os itens da estrutura `NestHost_attribute` são os seguintes:

attribute_name_index
    

O valor do item `attribute_name_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Utf8_info` (§4.4.7) representando a string "`NestHost`".

attribute_length
    

O valor do item `attribute_length` deve ser dois.

host_class_index
    

O valor do item `host_class_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Class_info` (§4.4.1) representando uma classe ou interface que é o host do nest para a classe ou interface atual.

Se o host do nest não puder ser carregado, ou não estiver no mesmo pacote de tempo de execução que a classe ou interface atual, ou não autorizar a associação ao nest para a classe ou interface atual, então um erro pode ocorrer durante o controle de acesso (§5.4.4).

### 4.7.29. O Atributo `NestMembers`

O atributo `NestMembers` é um atributo de comprimento variável na tabela `attributes` de uma estrutura `ClassFile` (§4.1). O atributo `NestMembers` registra as classes e interfaces que estão autorizadas a reivindicar associação ao nest hospedado pela classe ou interface atual (§5.4.4).

Pode haver no máximo um atributo `NestMembers` na tabela `attributes` de uma estrutura `ClassFile`.

A tabela `attributes` de uma estrutura `ClassFile` não deve conter tanto um atributo `NestMembers` quanto um atributo `NestHost`.

Esta regra impede que um host de nest reivindique associação a um nest diferente. Ele é implicitamente um membro do nest que hospeda.

O atributo `NestMembers` tem o seguinte formato:
```
    NestMembers_attribute {
        u2 attribute_name_index;
        u4 attribute_length;
        u2 number_of_classes;
        u2 classes[number_of_classes];
    }
    
```

Os itens da estrutura `NestMembers_attribute` são os seguintes:

attribute_name_index
    

O valor do item `attribute_name_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Utf8_info` (§4.4.7) representando a string "`NestMembers`".

attribute_length
    

O valor do item `attribute_length` indica o comprimento do atributo, excluindo os seis bytes iniciais.

number_of_classes
    

O valor do item `number_of_classes` indica o número de entradas no array `classes`.

classes[]
    

Cada valor no array `classes` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Class_info` (§4.4.1) representando uma classe ou interface que é membro do nest hospedado pela classe ou interface atual.

O array `classes` é consultado pelo controle de acesso (§5.4.4). Ele deve consistir em referências a outras classes e interfaces que estão no mesmo pacote de tempo de execução e possuem atributos `NestHost` que referenciam a classe ou interface atual. Itens do array que não atendem a esses critérios são ignorados pelo controle de acesso.

### 4.7.30. O Atributo `Record`

O atributo `Record` é um atributo de comprimento variável na tabela `attributes` de uma estrutura `ClassFile` (§4.1). O atributo `Record` indica que a classe atual é uma classe record (JLS §8.10), e armazena informações sobre os componentes record da classe record (JLS §8.10.1).

Pode haver no máximo um atributo `Record` na tabela `attributes` de uma estrutura `ClassFile`.

O atributo `Record` tem o seguinte formato:
```
    Record_attribute {
        u2                    attribute_name_index;
        u4                    attribute_length;
        u2                    components_count;
        record_component_info components[components_count];
    }
    
```

Os itens da estrutura `Record_attribute` são os seguintes:

attribute_name_index
    

O valor do item `attribute_name_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Utf8_info` (§4.4.7) representando a string "`Record`".

attribute_length
    

O valor do item `attribute_length` indica o comprimento do atributo, excluindo os seis bytes iniciais.

components_count
    

O valor do item `components_count` indica o número de entradas na tabela `components`.

components[]
    

Cada entrada na tabela `components` especifica um componente record da classe atual, na ordem em que os componentes record foram declarados. A estrutura `record_component_info` tem o seguinte formato:
```
    record_component_info {
        u2             name_index;
        u2             descriptor_index;
        u2             attributes_count;
        attribute_info attributes[attributes_count];
    }
          
```

Os itens da estrutura `record_component_info` são os seguintes:

name_index
    

O valor do item `name_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Utf8_info` (§4.4.7) representando um nome não qualificado válido que denota o componente record (§4.2.2).

descriptor_index
    

O valor do item `descriptor_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Utf8_info` (§4.4.7) representando um descritor de campo que codifica o tipo do componente record (§4.3.2).

attributes_count
    

O valor do item `attributes_count` indica o número de atributos adicionais deste componente record.

attributes[]
    

Cada valor da tabela `attributes` deve ser uma estrutura `attribute_info` (§4.7).

Um componente record pode ter qualquer número de atributos opcionais associados a ele.

Os atributos definidos por esta especificação como aparecendo na tabela `attributes` de uma estrutura `record_component_info` estão listados na Tabela 4.7-C").

As regras relativas aos atributos definidos para aparecer na tabela `attributes` de uma estrutura `record_component_info` são dadas em §4.7.

As regras relativas aos atributos não predefinidos na tabela `attributes` de uma estrutura `record_component_info` são dadas em §4.7.1.
### 4.7.31. O Atributo `PermittedSubclasses`

O atributo `PermittedSubclasses` é um atributo de comprimento variável na tabela `attributes` de uma estrutura `ClassFile` (§4.1). O atributo `PermittedSubclasses` registra as classes e interfaces que estão autorizadas a estender ou implementar diretamente a classe ou interface atual (§5.3.5).

A linguagem de programação Java usa o modificador `sealed` para indicar uma classe ou interface que limita suas subclasses diretas ou subinterfaces diretas. Poder-se-ia supor que este modificador corresponderia a um flag `ACC_SEALED` em um arquivo `class`, uma vez que o modificador relacionado `final` corresponde ao flag `ACC_FINAL`. Na verdade, uma classe ou interface `sealed` é indicada em um arquivo `class` pela presença do atributo `PermittedSubclasses`.

Pode haver no máximo um atributo `PermittedSubclasses` na tabela `attributes` de uma estrutura `ClassFile` cujo item `access_flags` não tenha o flag `ACC_FINAL` definido.

Não deve haver nenhum atributo `PermittedSubclasses` na tabela `attributes` de uma estrutura `ClassFile` cujo item `access_flags` tenha o flag `ACC_FINAL` definido.

`sealed` é distinto de `final`: uma classe `sealed` tem uma lista de subclasses autorizadas, enquanto uma classe `final` não tem subclasses. Assim, uma estrutura `ClassFile` pode ter um atributo `PermittedSubclasses`, ou ter seu flag `ACC_FINAL` definido, mas não ambos.

O atributo `PermittedSubclasses` tem o seguinte formato:
```
    PermittedSubclasses_attribute {
        u2 attribute_name_index;
        u4 attribute_length;
        u2 number_of_classes;
        u2 classes[number_of_classes];
    }
    
```

Os itens da estrutura `PermittedSubclasses_attribute` são os seguintes:

attribute_name_index
    

O valor do item `attribute_name_index` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Utf8_info` (§4.4.7) representando a string "`PermittedSubclasses`".

attribute_length
    

O valor do item `attribute_length` indica o comprimento do atributo, excluindo os seis bytes iniciais.

number_of_classes
    

O valor do item `number_of_classes` indica o número de entradas no array `classes`.

classes[]
    

Cada valor no array `classes` deve ser um índice válido na tabela `constant_pool`. A entrada `constant_pool` nesse índice deve ser uma estrutura `CONSTANT_Class_info` (§4.4.1) representando uma classe ou interface que está autorizada a estender ou implementar diretamente a classe ou interface atual.

O array `classes` é consultado quando uma classe ou interface é criada e tenta estender ou implementar diretamente a classe ou interface atual (§5.3.5). Itens do array que representam classes ou interfaces que não tentam estender ou implementar diretamente a classe ou interface atual são ignorados.

## 4.8. Verificação de Formato

Quando um arquivo `class` prospectivo é carregado pela Java Virtual Machine (§5.3), a Java Virtual Machine primeiro garante que o arquivo tenha o formato básico de um arquivo `class` (§4.1). Este processo é conhecido como _verificação de formato_. As verificações são as seguintes:

  * Os primeiros quatro bytes devem conter o `magic number` correto.

  * Todos os atributos predefinidos (§4.7) devem ter o comprimento adequado, exceto para `StackMapTable`, `RuntimeVisibleAnnotations`, `RuntimeInvisibleAnnotations`, `RuntimeVisibleParameterAnnotations`, `RuntimeInvisibleParameterAnnotations`, `RuntimeVisibleTypeAnnotations`, `RuntimeInvisibleTypeAnnotations` e `AnnotationDefault`.

  * O arquivo `class` não deve ser truncado nem ter bytes extras no final.

  * O `constant pool` deve satisfazer as restrições documentadas ao longo de §4.4.

Por exemplo, cada estrutura `CONSTANT_Class_info` no `constant pool` deve conter em seu item `name_index` um índice de `constant pool` válido para uma estrutura `CONSTANT_Utf8_info`.

  * Todas as referências de `field` e referências de `method` no `constant pool` devem ter nomes válidos, classes válidas e `descriptors` válidos (§4.3).

A verificação de formato não garante que o `field` ou `method` fornecido realmente exista na classe fornecida, nem que os `descriptors` fornecidos se refiram a classes reais. A verificação de formato garante apenas que esses itens estejam bem formados. Uma verificação mais detalhada é realizada quando os `bytecodes` são verificados e durante a resolução.

Essas verificações de integridade básica do arquivo `class` são necessárias para qualquer interpretação do conteúdo do arquivo `class`. A verificação de formato é distinta da verificação de `bytecode`, embora historicamente tenham sido confundidas porque ambas são uma forma de verificação de integridade.

## 4.9. Restrições no Código da Java Virtual Machine

O `code` para um `method`, `instance initialization method` (§2.9.1), ou `class` ou `interface initialization method` (§2.9.2) é armazenado no array `code` do atributo `Code` de uma estrutura `method_info` de um arquivo `class` (§4.7.3). Esta seção descreve as restrições associadas ao conteúdo da estrutura `Code_attribute`.

### 4.9.1. Restrições Estáticas

As _restrições estáticas_ em um arquivo `class` são aquelas que definem a boa formação do arquivo. Essas restrições foram apresentadas nas seções anteriores, exceto pelas restrições estáticas no `code` do arquivo `class`. As restrições estáticas no `code` de um arquivo `class` especificam como as `instructions` da Java Virtual Machine devem ser dispostas no array `code` e quais devem ser os `operands` das `instructions` individuais.

As restrições estáticas nas `instructions` no array `code` são as seguintes:

  * Apenas instâncias das `instructions` documentadas em §6.5 podem aparecer no array `code`. Instâncias de `instructions` usando os `opcodes` reservados (§6.2) ou quaisquer `opcodes` não documentados nesta especificação não devem aparecer no array `code`.

Se o número da versão do arquivo `class` for 51.0 ou superior, então instâncias de `instructions` usando os `opcodes` _jsr_, _jsr_w_ ou _ret_ não devem aparecer no array `code`.

  * O `opcode` da primeira `instruction` no array `code` começa no índice `0`.

  * Para cada `instruction` no array `code`, exceto a última, o índice do `opcode` da próxima `instruction` é igual ao índice do `opcode` da `instruction` atual mais o comprimento dessa `instruction`, incluindo todos os seus `operands`.

A `instruction` _wide_ é tratada como qualquer outra `instruction` para esses propósitos; o `opcode` que especifica a operação que uma `instruction` _wide_ deve modificar é tratado como um dos `operands` dessa `instruction` _wide_. Esse `opcode` nunca deve ser diretamente alcançável pela computação.

  * O último `byte` da última `instruction` no array `code` deve ser o `byte` no índice `code_length - 1`.

As restrições estáticas nos `operands` das `instructions` no array `code` são as seguintes:

  * O `target` de cada `instruction` de `jump` e `branch` (_jsr_, _jsr_w_, _goto_, _goto_w_, _ifeq_, _ifne_, _ifle_, _iflt_, _ifge_, _ifgt_, _ifnull_, _ifnonnull_, _if_icmpeq_, _if_icmpne_, _if_icmple_, _if_icmplt_, _if_icmpge_, _if_icmpgt_, _if_acmpeq_, _if_acmpne_) deve ser o `opcode` de uma `instruction` dentro deste `method`.

O `target` de uma `instruction` de `jump` ou `branch` nunca deve ser o `opcode` usado para especificar a operação a ser modificada por uma `instruction` _wide_; um `target` de `jump` ou `branch` pode ser a própria `instruction` _wide_.

  * Cada `target`, incluindo o padrão, de cada `instruction` _tableswitch_ deve ser o `opcode` de uma `instruction` dentro deste `method`.

Cada `instruction` _tableswitch_ deve ter um número de `entries` em sua tabela de `jump` que seja consistente com o valor de seus `operands` de tabela de `jump` _low_ e _high_, e seu valor _low_ deve ser menor ou igual ao seu valor _high_.

Nenhum `target` de uma `instruction` _tableswitch_ pode ser o `opcode` usado para especificar a operação a ser modificada por uma `instruction` _wide_; um `target` de _tableswitch_ pode ser a própria `instruction` _wide_.

  * Cada `target`, incluindo o padrão, de cada `instruction` _lookupswitch_ deve ser o `opcode` de uma `instruction` dentro deste `method`.

Cada `instruction` _lookupswitch_ deve ter um número de pares _match-offset_ que seja consistente com o valor de seu `operand` _npairs_. Os pares _match-offset_ devem ser classificados em ordem numérica crescente pelo valor de `match` assinado.

Nenhum `target` de uma `instruction` _lookupswitch_ pode ser o `opcode` usado para especificar a operação a ser modificada por uma `instruction` _wide_; um `target` de _lookupswitch_ pode ser a própria `instruction` _wide_.

  * Os `operands` de cada `instruction` _ldc_ e de cada `instruction` _ldc_w_ devem representar um índice válido na tabela `constant_pool`. A `constant pool entry` referenciada por esse índice deve ser carregável (§4.4), e não pode ser nenhum dos seguintes:

    * Uma `entry` do tipo `CONSTANT_Long` ou `CONSTANT_Double`.

    * Uma `entry` do tipo `CONSTANT_Dynamic` que referencia uma estrutura `CONSTANT_NameAndType_info` que indica um `descriptor` de `J` (denotando `long`) ou `D` (denotando `double`).

  * Os `operands` de cada `instruction` _ldc2_w_ devem representar um índice válido na tabela `constant_pool`. A `constant pool entry` referenciada por esse índice deve ser carregável, e em particular uma das seguintes:

    * Uma `entry` do tipo `CONSTANT_Long` ou `CONSTANT_Double`.

    * Uma `entry` do tipo `CONSTANT_Dynamic` que referencia uma estrutura `CONSTANT_NameAndType_info` que indica um `descriptor` de `J` (denotando `long`) ou `D` (denotando `double`).

O índice subsequente do `constant pool` também deve ser um índice válido no `constant pool`, e a `constant pool entry` nesse índice não deve ser usada.

  * Os `operands` de cada `instruction` _getfield_, _putfield_, _getstatic_ e _putstatic_ devem representar um índice válido na tabela `constant_pool`. A `constant pool entry` referenciada por esse índice deve ser do tipo `CONSTANT_Fieldref`.

  * Os `operands` _indexbyte_ de cada `instruction` _invokevirtual_ devem representar um índice válido na tabela `constant_pool`. A `constant pool entry` referenciada por esse índice deve ser do tipo `CONSTANT_Methodref`.

  * Os `operands` _indexbyte_ de cada `instruction` _invokespecial_ e _invokestatic_ devem representar um índice válido na tabela `constant_pool`. Se o número da versão do arquivo `class` for inferior a 52.0, a `constant pool entry` referenciada por esse índice deve ser do tipo `CONSTANT_Methodref`; se o número da versão do arquivo `class` for 52.0 ou superior, a `constant pool entry` referenciada por esse índice deve ser do tipo `CONSTANT_Methodref` ou `CONSTANT_InterfaceMethodref`.

  * Os `operands` _indexbyte_ de cada `instruction` _invokeinterface_ devem representar um índice válido na tabela `constant_pool`. A `constant pool entry` referenciada por esse índice deve ser do tipo `CONSTANT_InterfaceMethodref`.

O valor do `operand` _count_ de cada `instruction` _invokeinterface_ deve refletir o número de `local variables` necessárias para armazenar os `arguments` a serem passados para o `interface method`, conforme implícito pelo `descriptor` da estrutura `CONSTANT_NameAndType_info` referenciada pela `constant pool entry` `CONSTANT_InterfaceMethodref`.

O quarto `operand byte` de cada `instruction` _invokeinterface_ deve ter o valor zero.

  * Os `operands` _indexbyte_ de cada `instruction` _invokedynamic_ devem representar um índice válido na tabela `constant_pool`. A `constant pool entry` referenciada por esse índice deve ser do tipo `CONSTANT_InvokeDynamic`.

O terceiro e quarto `operand bytes` de cada `instruction` _invokedynamic_ devem ter o valor zero.

  * Apenas a `instruction` _invokespecial_ é permitida para invocar um `instance initialization method` (§2.9.1).

Nenhum outro `method` cujo nome comece com o caractere '`<`' ('`\u003c`') pode ser chamado pelas `method invocation instructions`. Em particular, o `class` ou `interface initialization method` especialmente nomeado `<clinit>` nunca é chamado explicitamente a partir das `Java Virtual Machine instructions`, mas apenas implicitamente pela própria Java Virtual Machine.

  * Os `operands` de cada `instruction` _instanceof_, _checkcast_, _new_ e _anewarray_, e os `operands` _indexbyte_ de cada `instruction` _multianewarray_, devem representar um índice válido na tabela `constant_pool`. A `constant pool entry` referenciada por esse índice deve ser do tipo `CONSTANT_Class`.

  * Nenhuma `instruction` _new_ pode referenciar uma `constant pool entry` do tipo `CONSTANT_Class` que represente um `array type` (§4.3.2). A `instruction` _new_ não pode ser usada para criar um `array`.

  * Nenhuma `instruction` _anewarray_ pode ser usada para criar um `array` de mais de 255 `dimensions`.

  * Uma `instruction` _multianewarray_ deve ser usada apenas para criar um `array` de um `type` que tenha pelo menos tantas `dimensions` quanto o valor de seu `operand` _dimensions_. Ou seja, embora uma `instruction` _multianewarray_ não seja obrigada a criar todas as `dimensions` do `array type` referenciado por seus `operands` _indexbyte_, ela não deve tentar criar mais `dimensions` do que as existentes no `array type`.

O `operand` _dimensions_ de cada `instruction` _multianewarray_ não deve ser zero.

  * O `operand` _atype_ de cada `instruction` _newarray_ deve assumir um dos valores `T_BOOLEAN` (4), `T_CHAR` (5), `T_FLOAT` (6), `T_DOUBLE` (7), `T_BYTE` (8), `T_SHORT` (9), `T_INT` (10) ou `T_LONG` (11).

  * O `operand` _index_ de cada `instruction` _iload_, _fload_, _aload_, _istore_, _fstore_, _astore_, _iinc_ e _ret_ deve ser um `integer` não negativo não maior que `max_locals - 1`.

O `index` implícito de cada `instruction` _iload_ <n>_, _fload_ <n>_, _aload_ <n>_, _istore_ <n>_, _fstore_ <n>_ e _astore_ <n>_ não deve ser maior que `max_locals - 1`.

  * O `operand` _index_ de cada `instruction` _lload_, _dload_, _lstore_ e _dstore_ não deve ser maior que `max_locals - 2`.

O `index` implícito de cada `instruction` _lload_ <n>_, _dload_ <n>_, _lstore_ <n>_ e _dstore_ <n>_ não deve ser maior que `max_locals - 2`.

  * Os `operands` _indexbyte_ de cada `instruction` _wide_ que modifica uma `instruction` _iload_, _fload_, _aload_, _istore_, _fstore_, _astore_, _iinc_ ou _ret_ devem representar um `integer` não negativo não maior que `max_locals - 1`.

Os `operands` _indexbyte_ de cada `instruction` _wide_ que modifica uma `instruction` _lload_, _dload_, _lstore_ ou _dstore_ devem representar um `integer` não negativo não maior que `max_locals - 2`.

### 4.9.2. Restrições Estruturais

As restrições estruturais no array `code` especificam restrições nas relações entre as `Java Virtual Machine instructions`. As restrições estruturais são as seguintes:

  * Cada `instruction` deve ser executada apenas com o `type` e número apropriados de `arguments` na `operand stack` e no `local variable array`, independentemente do `execution path` que leva à sua invocação.

Conforme observado em §2.3.4 e §2.11.1, a Java Virtual Machine converte implicitamente `values` dos `types` `boolean`, `byte`, `short` e `char` para o `type` `int`, permitindo que `instructions` que esperam `values` do `type` `int` operem sobre eles.

  * Se uma `instruction` pode ser executada ao longo de vários `execution paths` diferentes, a `operand stack` deve ter a mesma profundidade (§2.6.2) antes da execução da `instruction`, independentemente do `path` percorrido.

  * Em nenhum momento durante a execução a `operand stack` pode crescer para uma profundidade maior do que a implícita pelo item `max_stack`.

  * Em nenhum momento durante a execução mais `values` podem ser removidos da `operand stack` do que ela contém.

  * Em nenhum momento durante a execução a ordem do par de `local variable` que contém um `value` do `type` `long` ou `double` pode ser invertida ou o par dividido. Em nenhum momento as `local variables` de tal par podem ser operadas individualmente.

  * Nenhuma `local variable` (ou par de `local variable`, no caso de um `value` do `type` `long` ou `double`) pode ser acessada antes de lhe ser atribuído um `value`.

  * Cada `instruction` _invokespecial_ deve nomear um dos seguintes:

    * um `instance initialization method` (§2.9.1)

    * um `method` na `current class` ou `interface`

    * um `method` em uma `superclass` da `current class`

    * um `method` em uma `direct superinterface` da `current class` ou `interface`

    * um `method` em `Object`

Se uma `instruction` _invokespecial_ nomeia um `instance initialization method`, então a `target reference` na `operand stack` deve ser uma `uninitialized class instance`. Um `instance initialization method` nunca deve ser invocado em uma `initialized class instance`. Além disso:

    * Se a `target reference` na `operand stack` é _uma `uninitialized class instance` para a `current class`_, então _invokespecial_ deve nomear um `instance initialization method` da `current class` ou de sua `direct superclass`.

    * Se a `target reference` na `operand stack` é _uma `class instance` criada por uma `instruction` _new_ anterior_, então _invokespecial_ deve nomear um `instance initialization method` da `class` dessa `class instance`.

    * Em ambos os casos, se a `instruction` for coberta por um `exception handler`, então qualquer cópia da `target reference` armazenada em uma `local variable` deve ser tratada como inutilizável pelo `exception handler code`.

Se uma `instruction` _invokespecial_ nomeia um `method` que não é um `instance initialization method`, então a `target reference` na `operand stack` deve ser uma `class instance` cujo `type` seja `assignment compatible` com a `current class` (JLS §5.2).

A regra geral para _invokespecial_ é que a `class` ou `interface` nomeada por _invokespecial_ deve estar "acima" da `caller class` ou `interface`, enquanto o `receiver object` visado por _invokespecial_ deve estar "em" ou "abaixo" da `caller class` ou `interface`. A última cláusula é especialmente importante: uma `class` ou `interface` só pode executar _invokespecial_ em seus próprios `objects`. Veja § _invokespecial_ para uma explicação de como a última cláusula é implementada em Prolog.

  * Cada `instance initialization method`, exceto o `instance initialization method` derivado do `constructor` da `class` `Object`, deve chamar outro `instance initialization method` de `this` ou um `instance initialization method` de sua `direct superclass` `super` antes que seus `instance members` sejam _acessados_, e antes que o `instance initialization method` chamador retorne.

No entanto, `instance fields` de `this` que são declarados na `current class` podem ser _atribuídos_ por _putfield_ antes de chamar qualquer `instance initialization method`.

  * Quando qualquer `instance method` é invocado ou quando qualquer `instance variable` é acessada, a `class instance` que contém o `instance method` ou `instance variable` já deve estar inicializada.

  *   * Nunca deve haver uma `uninitialized class instance` na `operand stack` ou em uma `local variable` quando uma `instruction` _jsr_ ou _jsr_w_ é executada.

  * O `type` de cada `class instance` que é o `target` de uma `method invocation instruction` (ou seja, o `type` da `target reference` na `operand stack`) deve ser `assignment compatible` com o `class` ou `interface type` especificado na `instruction`.

  * Os `types` dos `arguments` para cada `method invocation` devem ser `method invocation compatible` com o `method descriptor` (JLS §5.3, §4.3.3).

  * Cada `return instruction` deve corresponder ao `return type` de seu `method`:

    * Se o `method` retorna um `boolean`, `byte`, `char`, `short` ou `int`, apenas a `instruction` _ireturn_ pode ser usada.

    * Se o `method` retorna um `float`, `long` ou `double`, apenas uma `instruction` _freturn_, _lreturn_ ou _dreturn_, respectivamente, pode ser usada.

    * Se o `method` retorna um `reference type`, apenas uma `instruction` _areturn_ pode ser usada, e o `type` do `value` retornado deve ser `assignment compatible` com o `return descriptor` do `method` (§4.3.3).

    * Todos os `instance initialization methods`, `class` ou `interface initialization methods`, e `methods` declarados para retornar `void` devem usar apenas a `instruction` _return_.

  * O `type` de cada `class instance` acessada por uma `instruction` _getfield_ ou modificada por uma `instruction` _putfield_ (ou seja, o `type` da `target reference` na `operand stack`) deve ser `assignment compatible` com o `class type` especificado na `instruction`.

  * O `type` de cada `value` armazenado por uma `instruction` _putfield_ ou _putstatic_ deve ser compatível com o `descriptor` do `field` (§4.3.2) da `class instance` ou `class` na qual está sendo armazenado:

    * Se o `descriptor type` é `boolean`, `byte`, `char`, `short` ou `int`, então o `value` deve ser um `int`.

    * Se o `descriptor type` é `float`, `long` ou `double`, então o `value` deve ser um `float`, `long` ou `double`, respectivamente.

    * Se o `descriptor type` é um `reference type`, então o `value` deve ser de um `type` que seja `assignment compatible` com o `descriptor type`.

  * O `type` de cada `value` armazenado em um `array` por uma `instruction` _aastore_ deve ser um `reference type`.

O `component type` do `array` no qual está sendo armazenado pela `instruction` _aastore_ também deve ser um `reference type`.

  * Cada `instruction` _athrow_ deve lançar apenas `values` que são instâncias da `class` `Throwable` ou de `subclasses` de `Throwable`.

Cada `class` mencionada em um item `catch_type` do array `exception_table` da estrutura `Code_attribute` do `method` deve ser `Throwable` ou uma `subclass` de `Throwable`.

  * Se _getfield_ ou _putfield_ é usado para acessar um `protected field` declarado em uma `superclass` que é membro de um `run-time package` diferente da `current class`, então o `type` da `class instance` sendo acessada (ou seja, o `type` da `target reference` na `operand stack`) deve ser `assignment compatible` com a `current class`.

Se _invokevirtual_ ou _invokespecial_ é usado para acessar um `protected method` declarado em uma `superclass` que é membro de um `run-time package` diferente da `current class`, então o `type` da `class instance` sendo acessada (ou seja, o `type` da `target reference` na `operand stack`) deve ser `assignment compatible` com a `current class`.

  * A execução nunca sai do final do array `code`.

  * Nenhum `return address` (um `value` do `type` `returnAddress`) pode ser carregado de uma `local variable`.

  * A `instruction` que segue cada `instruction` _jsr_ ou _jsr_w_ pode ser retornada apenas por uma única `instruction` _ret_.

  * Nenhuma `instruction` _jsr_ ou _jsr_w_ para a qual se retorna pode ser usada para chamar recursivamente uma `subroutine` se essa `subroutine` já estiver presente na `subroutine call chain`. (`Subroutines` podem ser aninhadas ao usar construções `try`-`finally` de dentro de uma cláusula `finally`.)

  * Cada instância do `type` `returnAddress` pode ser retornada no máximo uma vez.

Se uma `instruction` _ret_ retorna para um ponto na `subroutine call chain` acima da `instruction` _ret_ correspondente a uma dada instância do `type` `returnAddress`, então essa instância nunca poderá ser usada como um `return address`.
## 4.10. Verificação de arquivos `class`

Embora um compilador para a linguagem de programação Java deva produzir apenas arquivos `class` que satisfaçam todas as restrições estáticas e estruturais das seções anteriores, a Java Virtual Machine não tem garantia de que qualquer arquivo que lhe seja solicitado carregar foi gerado por esse compilador ou está devidamente formado. Aplicações como navegadores web não baixam código-fonte, que elas então compilam; essas aplicações baixam arquivos `class` já compilados. O navegador precisa determinar se o arquivo `class` foi produzido por um compilador confiável ou por um adversário tentando explorar a Java Virtual Machine.

Um problema adicional com a verificação em tempo de compilação é a distorção de versão. Um usuário pode ter compilado com sucesso uma classe, digamos `PurchaseStockOptions`, para ser uma subclasse de `TradingClass`. Mas a definição de `TradingClass` pode ter mudado desde o momento em que a classe foi compilada de uma forma que não é compatível com binários pré-existentes. Métodos podem ter sido excluídos ou ter seus tipos de retorno ou modificadores alterados. Campos podem ter tido seus tipos alterados ou mudado de variáveis de instância para variáveis de classe. Os modificadores de acesso de um método ou variável podem ter mudado de `public` para `private`. Para uma discussão sobre esses problemas, veja o Capítulo 13, "Compatibilidade Binária", em _The Java Language Specification, Java SE 25 Edition_.

Por causa desses problemas potenciais, a Java Virtual Machine precisa verificar por si mesma se as restrições desejadas são satisfeitas pelos arquivos `class` que ela tenta incorporar. Uma implementação da Java Virtual Machine verifica se cada arquivo `class` satisfaz as restrições necessárias no tempo de ligação (§5.4).

A verificação em tempo de ligação melhora o desempenho do interpretador em tempo de execução. Verificações caras que, de outra forma, teriam que ser realizadas para verificar restrições em tempo de execução para cada instrução interpretada podem ser eliminadas. A Java Virtual Machine pode assumir que essas verificações já foram realizadas. Por exemplo, a Java Virtual Machine já saberá o seguinte:

  * Não há overflows ou underflows na pilha de operandos.

  * Todos os usos e armazenamentos de variáveis locais são válidos.

  * Os argumentos para todas as instruções da Java Virtual Machine são de tipos válidos.

Existem duas estratégias que as implementações da Java Virtual Machine podem usar para verificação:

  * A verificação por checagem de tipo deve ser usada para verificar arquivos `class` cujo número de versão é maior ou igual a 50.0.

  * A verificação por inferência de tipo deve ser suportada por todas as implementações da Java Virtual Machine, exceto aquelas que estão em conformidade com os perfis Java ME CLDC e Java Card, a fim de verificar arquivos `class` cujo número de versão é menor que 50.0.

A verificação em implementações da Java Virtual Machine que suportam os perfis Java ME CLDC e Java Card é regida por suas respectivas especificações.

### 4.10.1. Verificação por Checagem de Tipo

Um arquivo `class` cujo número de versão é 50.0 ou superior (§4.1) deve ser verificado usando as regras de checagem de tipo fornecidas nesta seção.

Se, e somente se, o número de versão de um arquivo `class` for igual a 50.0, então, se a checagem de tipo falhar, uma implementação da Java Virtual Machine pode optar por tentar realizar a verificação por inferência de tipo (§4.10.2).

Este é um ajuste pragmático, projetado para facilitar a transição para a nova disciplina de verificação. Muitas ferramentas que manipulam arquivos `class` podem alterar os bytecodes de um método de uma maneira que exige o ajuste dos stack map frames do método. Se uma ferramenta não fizer os ajustes necessários nos stack map frames, a checagem de tipo pode falhar, mesmo que o bytecode seja em princípio válido (e, consequentemente, verificaria sob o antigo esquema de inferência de tipo). Para dar tempo aos implementadores para adaptar suas ferramentas, as implementações da Java Virtual Machine podem recorrer à disciplina de verificação mais antiga, mas apenas por um tempo limitado.

Em casos onde a checagem de tipo falha, mas a inferência de tipo é invocada e tem sucesso, uma certa penalidade de desempenho é esperada. Tal penalidade é inevitável. Isso também deve servir como um sinal para os fornecedores de ferramentas de que sua saída precisa ser ajustada, e fornece aos fornecedores um incentivo adicional para fazer esses ajustes.

Em resumo, o failover para verificação por inferência de tipo suporta tanto a adição gradual de stack map frames à Java SE Platform (se eles não estiverem presentes em um arquivo `class` versão 50.0, o failover é permitido) quanto a remoção gradual das instruções _jsr_ e _jsr_w_ da Java SE Platform (se elas estiverem presentes em um arquivo `class` versão 50.0, o failover é permitido).

Se uma implementação da Java Virtual Machine tentar realizar a verificação por inferência de tipo em arquivos `class` versão 50.0, ela deve fazê-lo em todos os casos em que a verificação por checagem de tipo falhar.

Isso significa que uma implementação da Java Virtual Machine não pode escolher recorrer à inferência de tipo em um caso e não em outro. Ela deve rejeitar arquivos `class` que não verificam via checagem de tipo, ou então consistentemente fazer o failover para o verificador de inferência de tipo sempre que a checagem de tipo falhar.

O verificador de tipo impõe regras de tipo que são especificadas por meio de cláusulas Prolog. O texto em inglês é usado para descrever as regras de tipo de forma informal, enquanto as cláusulas Prolog fornecem uma especificação formal.

O verificador de tipo requer uma lista de stack map frames para cada método com um atributo `Code` (§4.7.3). Uma lista de stack map frames é fornecida pelo atributo `StackMapTable` (§4.7.4) de um atributo `Code`. A intenção é que um stack map frame deve aparecer no início de cada bloco básico em um método. O stack map frame especifica o tipo de verificação de cada entrada da pilha de operandos e de cada variável local no início de cada bloco básico. O verificador de tipo lê os stack map frames para cada método com um atributo `Code` e usa esses mapas para gerar uma prova da segurança de tipo das instruções no atributo `Code`.

O predicado Prolog `methodIsTypeSafe` (§4.10.1.5) determina se um método com um atributo `Code` é type safe. Se um método com um atributo `Code` não for type safe, a verificação lança um `VerifyError` para indicar que o arquivo `class` está malformado.

Se, para uma dada classe, cada método com um atributo `Code` passar na checagem `methodIsTypeSafe`, o arquivo `class` foi checado com sucesso e a verificação de bytecode foi concluída com sucesso.

O restante desta seção explica o processo de checagem de tipo em detalhes:

  * Primeiro, fornecemos predicados Prolog para artefatos centrais da Java Virtual Machine, como classes e métodos (§4.10.1.1).

  * Segundo, especificamos o sistema de tipos conhecido pelo verificador de tipo (§4.10.1.2).

  * Terceiro, especificamos a representação Prolog de instruções e stack map frames (§4.10.1.3, §4.10.1.4).

  * Quarto, especificamos como um método é checado quanto ao tipo (§4.10.1.5, §4.10.1.6).

  * Quinto, discutimos questões de checagem de tipo comuns a todas as instruções de load e store (§4.10.1.7), e também questões de acesso a membros `protected` (§4.10.1.8).

  * Finalmente, especificamos as regras para checar o tipo de cada instrução (§4.10.1.9).

#### 4.10.1.1. Acessadores para Artefatos da Java Virtual Machine

Estipulamos a existência de 17 predicados Prolog ("acessadores") que possuem certo comportamento esperado, mas cujas definições formais não são fornecidas nesta especificação. O termo Prolog `Class`, como usado aqui, representa uma classe ou interface binária que foi carregada com sucesso (§5.3); o termo Prolog `Method` representa um método de uma `Class`; e o termo Prolog `Loader` representa um class loader de uma `Class`. Esta especificação não exige uma estrutura precisa para essas entidades.

classClassName(Class, ClassName)
    

Extrai o nome, `ClassName`, da classe `Class`.

classIsInterface(Class)
    

Verdadeiro se a classe, `Class`, é uma interface.

classSuperClassName(Class, SuperClassName)
    

Extrai o nome, `SuperClassName`, da superclasse da classe `Class`.

classInterfaceNames(Class, InterfaceNames)
    

Extrai uma lista, `InterfaceNames`, dos nomes das superinterfaces diretas da classe `Class`.

classDeclaresMember(Class, MemberName, MemberDescriptor)
    

Afirma que uma classe, `Class`, declara um campo ou método com nome `MemberName` e descritor `MemberDescriptor`. Esta afirmação não considera membros declarados nas superclasses ou superinterfaces de `Class`.

classDefiningLoader(Class, Loader)
    

Extrai o class loader definidor, `Loader`, da classe `Class`.

isBootstrapLoader(Loader)
    

Verdadeiro se o class loader `Loader` é o bootstrap class loader.

loadedClass(Name, InitiatingLoader, ClassDefinition)
    

Verdadeiro se existe uma classe chamada `Name` cuja representação (de acordo com esta especificação) quando carregada pelo class loader `InitiatingLoader` é `ClassDefinition`.

methodName(Method, Name)
    

Extrai o nome, `Name`, do método `Method`.

methodAccessFlags(Method, AccessFlags)
    

Extrai os access flags, `AccessFlags`, do método `Method`.

methodDescriptor(Method, Descriptor)
    

Extrai o descritor, `Descriptor`, do método `Method`.

isProtected(MemberClass, MemberName, MemberDescriptor)
    

Verdadeiro se existe um membro chamado `MemberName` com descritor `MemberDescriptor` na classe `MemberClass` e ele é `protected`.

isNotProtected(MemberClass, MemberName, MemberDescriptor)
    

Verdadeiro se existe um membro chamado `MemberName` com descritor `MemberDescriptor` na classe `MemberClass` e ele não é `protected`.

parseFieldDescriptor(Descriptor, Type)
    

Converte um descritor de campo, `Descriptor`, no tipo de verificação `Type` correspondente (§4.10.1.2).

O tipo de verificação derivado dos tipos de descritor `byte`, `short`, `boolean` e `char`, quando não usados como tipos de componente de array, é `int`.

parseMethodDescriptor(Descriptor, ArgTypeList, ReturnType)
    

Converte um descritor de método, `Descriptor`, em uma lista de tipos de verificação, `ArgTypeList`, correspondente aos tipos de argumento do método, e um tipo de verificação, `ReturnType`, correspondente ao tipo de retorno.

O tipo de verificação derivado dos tipos de descritor `byte`, `short`, `boolean` e `char`, quando não usados como tipos de componente de array, é `int`. Um retorno `void` é representado com o símbolo especial `void`.

parseCodeAttribute(Class, Method, FrameSize, MaxStack, ParsedCode, Handlers, StackMap)
    

Extrai o instruction stream, `ParsedCode`, do método `Method` em `Class`, bem como o tamanho máximo da pilha de operandos, `MaxStack`, o número máximo de variáveis locais, `FrameSize`, os manipuladores de exceção, `Handlers`, e o stack map `StackMap`.

A representação do instruction stream e do atributo stack map deve ser conforme especificado em §4.10.1.3 e §4.10.1.4.

samePackageName(Class1, Class2)
    

Verdadeiro se os nomes de pacote de `Class1` e `Class2` são os mesmos.

Os acessadores acima são usados para definir `loadedSuperclasses`, que produz uma lista das superclasses de uma classe recorrendo à superclasse direta de cada classe até que `Object`, que não tem superclasse, seja alcançado.
```
    loadedSuperclasses(Class, [ Superclass | Rest ]) :-
        classSuperClassName(Class, SuperclassName),
        classDefiningLoader(Class, L),
        loadedClass(SuperclassName, L, Superclass),
        loadedSuperclasses(Superclass, Rest).
    
    loadedSuperclasses(Class, []) :-
        \+ classSuperClassName(Class, _).
    
```

Ao checar o tipo do corpo de um método, é conveniente acessar informações sobre o método. Para este propósito, definimos um _ambiente_ , uma sêxtupla consistindo de:

  * uma classe

  * um método

  * o tipo de retorno declarado do método (ou `void`)

  * as instruções em um método

  * o tamanho máximo da pilha de operandos

  * uma lista de manipuladores de exceção

Especificamos acessadores para extrair informações do ambiente.
```
    allInstructions(Environment, Instructions) :-
        Environment = environment(_Class, _Method, _ReturnType,
                                  Instructions, _, _).
    
    exceptionHandlers(Environment, Handlers) :-
        Environment = environment(_Class, _Method, _ReturnType,
                                  _Instructions, _, Handlers).
    
    maxOperandStackLength(Environment, MaxStack) :-
        Environment = environment(_Class, _Method, _ReturnType,
                                  _Instructions, MaxStack, _Handlers).
    
    currentClassLoader(Environment, Loader) :-
        Environment = environment(Class, _Method, _ReturnType,
                                  _Instructions, _, _),
        classDefiningLoader(Class, Loader).
    
    thisClass(Environment, Class) :-
        Environment = environment(Class, _Method, _ReturnType,
                                  _Instructions, _, _).
    
    thisType(Environment, class(ClassName, L)) :-
        Environment = environment(Class, _Method, _ReturnType,
                                  _Instructions, _, _),
        classDefiningLoader(Class, L),
        classClassName(Class, ClassName).
    
    thisMethodReturnType(Environment, ReturnType) :-
        Environment = environment(_Class, _Method, ReturnType,
                                  _Instructions, _, _).
    
    offsetStackFrame(Environment, Offset, StackFrame) :-
        allInstructions(Environment, Instructions),
        member(stackMap(Offset, StackFrame), Instructions).
    
```

Finalmente, especificamos um predicado geral usado em todas as regras de tipo:
```
    notMember(_, []).
    notMember(X, [A | More]) :- X \= A, notMember(X, More).
    
```

O princípio que guia a determinação de quais acessadores são estipulados e quais são totalmente especificados é que não queremos superespecificar a representação do arquivo `class`. Fornecer acessadores específicos para o termo `Class` ou `Method` nos forçaria a especificar completamente o formato para um termo Prolog representando o arquivo `class`.

#### 4.10.1.2. Sistema de Tipos de Verificação

O verificador de tipo impõe um sistema de tipos baseado em uma hierarquia de _tipos de verificação_ , ilustrada abaixo.
```
    Verification type hierarchy:
    
                                 top
                     ____________/\____________
                    /                          \
                   /                            \
                oneWord                       twoWord
               /   |   \                     /       \
              /    |    \                   /         \
            int  float  reference        long        double
                         /     \
                        /       \_____________
                       /                      \
                      /                        \
               uninitialized                    +------------------+
                /         \                     |  reference type  |
               /           \                    |  hierarchy       |
    uninitializedThis  uninitialized(Offset)    +------------------+
                                                         |
                                                         |
                                                        null
    
```

A maioria dos tipos de verificação tem uma correspondência direta com os tipos primitivos e de referência descritos em §2.3 e §2.4, e representados por descritores de campo na Tabela 4.3-A:

  * Os tipos primitivos `double`, `float`, `int` e `long` (descritores de campo `D`, `F`, `I`, `J`) correspondem cada um ao tipo de verificação de mesmo nome.

  * Os tipos primitivos `byte`, `char`, `short` e `boolean` (descritores de campo `B`, `C`, `S`, `Z`) todos correspondem ao tipo de verificação `int`.

  * Tipos de classe e interface (descritores de campo começando com `L`) correspondem a tipos de verificação que usam o functor `class`. O tipo de verificação `class(_N_ , _L_)` representa o tipo da classe ou interface cujo nome binário é `_N_` conforme carregado pelo loader `_L_`. Note que `_L_` é um initiating loader (§5.3) da classe representada por `class(_N_ , _L_)` e pode, ou não, ser o defining loader da classe.

Por exemplo, o tipo de classe `Object` seria representado como `class('java/lang/Object', L)`, onde o defining loader da classe `java/lang/Object`, conforme carregado por `L`, é o bootstrap loader.

  * Tipos de array (descritores de campo começando com `[`) correspondem a tipos de verificação que usam o functor `arrayOf`. Note que os tipos primitivos `byte`, `char`, `short` e `boolean` não correspondem a tipos de verificação, mas um tipo de array cujo tipo de elemento é `byte`, `char`, `short` ou `boolean` _corresponde_ a um tipo de verificação; tais tipos de verificação suportam as instruções _baload_ , _bastore_ , _caload_ , _castore_ , _saload_ , _sastore_ e _newarray_.

    * O tipo de verificação `arrayOf(_T_)` representa o tipo de array cujo tipo de componente é o tipo de verificação `_T_`.

    * O tipo de verificação `arrayOf(byte)` representa o tipo de array cujo tipo de componente é `byte`.

    * O tipo de verificação `arrayOf(char)` representa o tipo de array cujo tipo de componente é `char`.

    * O tipo de verificação `arrayOf(short)` representa o tipo de array cujo tipo de componente é `short`.

    * O tipo de verificação `arrayOf(boolean)` representa o tipo de array cujo tipo de componente é `boolean`.

Por exemplo, os tipos de array `int[]` e `Object[]` seriam representados pelos tipos de verificação `arrayOf(int)` e `arrayOf(class('java/lang/Object', L))` respectivamente. Os tipos de array `byte``[]` e `boolean``[]``[]` seriam representados pelos tipos de verificação `arrayOf(byte)` e `arrayOf(arrayOf(boolean))` respectivamente.

Os tipos de verificação restantes são descritos da seguinte forma:

  * Os tipos de verificação `top`, `oneWord`, `twoWord` e `reference` denotam uniões abstratas de outros tipos, conforme ilustrado acima, e são representados em Prolog como átomos.

  * Os tipos de verificação `uninitialized`, `uninitializedThis` e `uninitialized(Offset)` descrevem referências a objetos criados com _new_ que ainda não foram inicializados (§2.9.1). Os tipos `uninitialized` e `uninitializedThis` são representados como átomos. O tipo `uninitialized(Offset)` é representado aplicando o functor `uninitialized` a um argumento que representa o valor numérico do `Offset`.

  * O tipo de verificação `null` descreve o resultado da instrução _aconst_null_ e é representado em Prolog como um átomo.

As regras de subtipagem para tipos de verificação são as seguintes.

A subtipagem é reflexiva.
```
    isAssignable(X, X).
    
```

O tipo `top` é um supertipo de todos os outros tipos.
```
    isAssignable(oneWord, top).
    isAssignable(twoWord, top).
    
```

Um tipo é um subtipo de algum outro tipo, X, se ele tem um supertipo que é um subtipo de X.
```
    isAssignable(int, X)    :- isAssignable(oneWord, X).
    isAssignable(float, X)  :- isAssignable(oneWord, X).
    isAssignable(long, X)   :- isAssignable(twoWord, X).
    isAssignable(double, X) :- isAssignable(twoWord, X).
    
    isAssignable(reference, X)   :- isAssignable(oneWord, X).
    isAssignable(class(_, _), X) :- isAssignable(reference, X).
    isAssignable(arrayOf(_), X)  :- isAssignable(reference, X).
    
    isAssignable(null, X) :- isAssignable(reference, X).
    
    isAssignable(uninitialized, X)     :- isAssignable(reference, X).
    isAssignable(uninitializedThis, X) :- isAssignable(uninitialized, X).
    isAssignable(uninitialized(_), X)  :- isAssignable(uninitialized, X).
    
```

O tipo `null` é um subtipo de todos os tipos de referência.
```
    isAssignable(null, class(_, _)).
    isAssignable(null, arrayOf(_)).
    
```

Essas regras de subtipo não são necessariamente a formulação mais óbvia de subtipagem. Há uma clara divisão entre as regras de subtipagem entre tipos de referência e as regras para os tipos de verificação restantes. A divisão nos permite declarar relações gerais de subtipagem entre tipos de referência e outros tipos de verificação. Essas relações se mantêm independentemente da posição de um tipo de referência na hierarquia de tipos e ajudam a prevenir o carregamento excessivo de classes por uma implementação da Java Virtual Machine. Por exemplo, não queremos começar a subir a hierarquia de superclasses em resposta a uma consulta da forma `class(foo, L) <: twoWord`.

Também temos uma regra que diz que a subtipagem é reflexiva, então é sempre trivialmente possível atribuir entre dois tipos idênticos — tanto no caso de tipos simples, como de `int` para `int`, quanto de tipos mais complexos, como de `arrayOf(int)` para `arrayOf(int)` ou de `class('C', Loader)` para `class('C', Loader)`. Juntas, as regras acima cobrem todas as relações de subtipagem, exceto entre dois tipos de referência distintos.

O predicado `isWideningReference` é usado para determinar se uma atribuição de um tipo de referência para outro tipo de referência, diferente, é permitida.
```
    isAssignable(From, To) :- isWideningReference(From, To).
    
```

O predicado `isWideningReference` não é reflexivo: o alargamento (widening) ocorre apenas ao converter entre tipos de referência distintos.

O verificador permite que qualquer tipo de classe ou interface seja alargado (widened) para qualquer tipo de interface.
```
    isWideningReference(class(_, _), class(To, L)) :-
        loadedClass(To, L, ToClass),
        classIsInterface(ToClass).
    
```

Esta abordagem é menos rigorosa do que a linguagem de programação Java, que não permitirá uma atribuição a uma interface a menos que o objeto referenciado seja estaticamente conhecido por implementar a interface. A Java Virtual Machine, em vez disso, usa uma verificação em tempo de execução para garantir que as invocações de métodos de interface realmente operem em objetos que implementam a interface (§ _invokeinterface_). Não há exigência de que uma referência armazenada por uma variável de um tipo de interface se refira a um objeto que realmente implemente essa interface.

Um tipo de classe pode ser alargado (widened) para outro tipo de classe se o segundo tipo se refere à classe carregada de uma das superclasses do primeiro tipo, ou se ambos se referem à mesma classe com diferentes initiating loaders.
```
    isWideningReference(class(From, L1), class(To, L2)) :-
        From \= To,
        loadedClass(From, L1, FromClass),
        loadedClass(To, L2, ToClass),
        loadedSuperclasses(FromClass, Supers),
        member(ToClass, Supers).
    
    isWideningReference(class(ClassName, L1), class(ClassName, L2)) :-
        L1 \= L2,
        loadedClass(ClassName, L1, Class),
        loadedClass(ClassName, L2, Class).
    
```

Se dois tipos `class` S e T têm o mesmo nome e o mesmo loader, não há necessidade de "alargar" (widen) de um para o outro, pois `isAssignable` já é verdadeiro, de acordo com a regra anterior.

Tipos de array são subtipos de `Object`, `Cloneable` e `java.io.Serializable`. A subtipagem entre arrays de tipo de referência é covariante.
```
    isWideningReference(arrayOf(_), class(ClassName, L)) :-
        (ClassName = 'java/lang/Object' ;
         ClassName = 'java/lang/Cloneable' ;
         ClassName = 'java/io/Serializable')
        loadedClass(ClassName, L, LoadedClass),
        classDefiningLoader(LoadedClass, BL),
        isBootstrapLoader(BL).
    
    isWideningReference(arrayOf(X), arrayOf(Y)) :-
        isWideningReference(X, Y).
    
```

#### 4.10.1.3. Representação de Instruções

Instruções individuais de bytecode são representadas em Prolog como termos cujo functor é o nome da instrução e cujos argumentos são seus operandos analisados.

Por exemplo, uma instrução _aload_ é representada como o termo `aload(N)`, que inclui o índice `N` que é o operando da instrução.

As instruções como um todo são representadas como uma lista de termos da forma:
```
    instruction(Offset, AnInstruction)
    
```

Por exemplo, `instruction(21, aload(1))`.

A ordem das instruções nesta lista deve ser a mesma que no arquivo `class`.

Algumas instruções têm operandos que se referem a entradas na tabela `constant_pool`. Tais entradas são representadas como aplicações de functor da forma:

  * `class(Name, Loader)` ou `arrayOf(ComponentType)` para uma entrada da constant pool que é uma estrutura `CONSTANT_Class_info` (§4.4.1).

Estes são tipos de verificação, conforme descrito em §4.10.1.2.

Se o item `name_index` da estrutura fornece o nome de uma classe ou interface, `Name` é esse nome, e `Loader` é o defining loader da classe ou interface que contém a constant pool.

Se o item `name_index` da estrutura fornece um tipo de array, `ComponentType` é o tipo de componente do array.

  * `field(FieldClassType, FieldName, FieldDescriptor)` para uma entrada da constant pool que é uma estrutura `CONSTANT_Fieldref_info` (§4.4.2).

`FieldClassType` é o tipo de verificação da classe, interface ou tipo de array referenciado pelo item `class_index` na estrutura. `FieldName` e `FieldDescriptor` correspondem ao nome e descritor de campo referenciados pelo item `name_and_type_index` da estrutura.

  * `method(MethodClassType, MethodName, MethodDescriptor)` para uma entrada da constant pool que é uma estrutura `CONSTANT_Methodref_info` (§4.4.2).

`MethodClassType` é o tipo de verificação da classe, interface ou tipo de array referenciado pelo item `class_index` da estrutura. `MethodName` e `MethodDescriptor` correspondem ao nome e descritor de método referenciados pelo item `name_and_type_index` da estrutura.

  * `imethod(MethodClassType, MethodName, MethodDescriptor)` para uma entrada da constant pool que é uma estrutura `CONSTANT_InterfaceMethodref_info` (§4.4.2).

`MethodClassType` é o tipo de verificação da classe, interface ou tipo de array referenciado pelo item `class_index` da estrutura. `MethodName` e `MethodDescriptor` correspondem ao nome e descritor de método referenciados pelo item `name_and_type_index` da estrutura.

  * `string(Value)` para uma entrada da constant pool que é uma estrutura `CONSTANT_String_info` (§4.4.3).

`Value` é a string referenciada pelo item `string_index` da estrutura.

  * `int(Value)` para uma entrada da constant pool que é uma estrutura `CONSTANT_Integer_info` (§4.4.4).

`Value` é a constante `int` representada pelo item `bytes` da estrutura.

  * `float(Value)` para uma entrada da constant pool que é uma estrutura `CONSTANT_Float_info` (§4.4.4).

`Value` é a constante `float` representada pelo item `bytes` da estrutura.

  * `long(Value)` para uma entrada da constant pool que é uma estrutura `CONSTANT_Long_info` (§4.4.5).

`Value` é a constante `long` representada pelos itens `high_bytes` e `low_bytes` da estrutura.

  * `double(Value)` para uma entrada da constant pool que é uma estrutura `CONSTANT_Double_info` (§4.4.5).

`Value` é a constante `double` representada pelos itens `high_bytes` e `low_bytes` da estrutura.

  * `methodHandle(Kind, Reference)` para uma entrada da constant pool que é uma estrutura `CONSTANT_MethodHandle_info` (§4.4.8).

`Kind` é o valor do item `reference_kind` da estrutura. `Reference` é o valor do item `reference_index` da estrutura.

  * `methodType(MethodDescriptor)` para uma entrada da constant pool que é uma estrutura `CONSTANT_MethodType_info` (§4.4.9).

`MethodDescriptor` é o descritor de método referenciado pelo item `descriptor_index` da estrutura.

  * `dconstant(ConstantName, FieldDescriptor)` para uma entrada da constant pool que é uma estrutura `CONSTANT_Dynamic_info` (§4.4.10).

`ConstantName` e `FieldDescriptor` correspondem ao nome e descritor de campo referenciados pelo item `name_and_type_index` da estrutura. (O item `bootstrap_method_attr_index` é irrelevante para a verificação.)

  * `dmethod(CallSiteName, MethodDescriptor)` para uma entrada da constant pool que é uma estrutura `CONSTANT_InvokeDynamic_info` (§4.4.10).

`CallSiteName` e `MethodDescriptor` correspondem ao nome e descritor de método referenciados pelo item `name_and_type_index` da estrutura. (O item `bootstrap_method_attr_index` é irrelevante para a verificação.)

Por exemplo, uma instrução _getfield_ cujo operando se refere a uma entrada da constant pool representando um campo `foo` do tipo `F` na classe `Bar` seria representada como `getfield(field(class('Bar', L), 'foo', 'F'))`, onde `L` é o class loader da classe que contém a instrução. Uma instrução _ldc_ para carregar a constante `int` `91` seria representada como `ldc(int(91))`.

#### 4.10.1.4. Stack Map Frames e Transições de Tipo

Stack map frames são representados em Prolog como uma lista de termos da forma:
```
    stackMap(Offset, TypeState)
    
```

onde:

  * `Offset` é um inteiro indicando o bytecode offset no qual o stack map frame se aplica (§4.7.4).

A ordem dos bytecode offsets nesta lista deve ser a mesma que no arquivo `class`.

  * `TypeState` é o estado de tipo de entrada esperado para a instrução em `Offset`.

Um _estado de tipo_ é um mapeamento de locais na pilha de operandos e variáveis locais de um método para tipos de verificação. Ele tem a forma:
```
    frame(Locals, OperandStack, Flags)
    
```

onde:

  * `Locals` é uma lista de tipos de verificação, de modo que o _i_-ésimo elemento da lista (com indexação baseada em 0) representa o tipo da variável local _i_.

Tipos de tamanho 2 (`long` e `double`) são representados por duas variáveis locais (§2.6.1), sendo a primeira variável local o próprio tipo e a segunda variável local sendo `top` (§4.10.1.7).
*   `OperandStack` é uma lista de tipos de verificação, de modo que o primeiro elemento da lista representa o tipo do topo da pilha de operandos, e os tipos das entradas da pilha abaixo do topo seguem na lista na ordem apropriada.

Tipos de tamanho 2 (`long` e `double`) são representados por duas entradas na pilha, sendo a primeira entrada `top` e a segunda entrada o próprio tipo.

Por exemplo, uma pilha com um valor `double`, um valor `int` e um valor `long` é representada em um estado de tipo como uma pilha com cinco entradas: entradas `top` e `double` para o valor `double`, uma entrada `int` para o valor `int`, e entradas `top` e `long` para o valor `long`. Consequentemente, `OperandStack` é a lista `[top, double, int, top, long]`.

*   `Flags` é uma lista que pode ser vazia ou ter o único elemento `flagThisUninit`.

Se qualquer variável local em `Locals` tiver o tipo `uninitializedThis`, então `Flags` terá o único elemento `flagThisUninit`, caso contrário `Flags` é uma lista vazia.

`flagThisUninit` é usado em construtores para marcar estados de tipo onde a inicialização de `this` ainda não foi concluída. Em tais estados de tipo, é ilegal retornar do método.

Subtipagem de tipos de verificação é estendida ponto a ponto para estados de tipo. O array de variáveis locais de um método tem um comprimento fixo por construção (veja `methodInitialStackFrame` em §4.10.1.5), mas a pilha de operandos cresce e diminui, então exigimos uma verificação explícita no comprimento das pilhas de operandos cuja atribuibilidade é desejada para subtipagem.
```
    frameIsAssignable(frame(Locals1, StackMap1, Flags1),
                      frame(Locals2, StackMap2, Flags2)) :-
        length(StackMap1, StackMapLength),
        length(StackMap2, StackMapLength),
        maplist(isAssignable, Locals1, Locals2),
        maplist(isAssignable, StackMap1, StackMap2),
        subset(Flags1, Flags2).
    
```

A maioria das regras de tipo para instruções individuais (§4.10.1.9) depende da noção de uma _transição de tipo_ válida. Uma transição de tipo é _válida_ se for possível remover uma lista de tipos esperados da pilha de operandos do estado de tipo de entrada e substituí-los por um tipo de resultado esperado, resultando em um novo estado de tipo onde o comprimento da pilha de operandos não excede seu tamanho máximo declarado.
```
    validTypeTransition(Environment, ExpectedTypesOnStack, ResultType,
                        frame(Locals, InputOperandStack, Flags),
                        frame(Locals, NextOperandStack, Flags)) :-
        popMatchingList(InputOperandStack, ExpectedTypesOnStack,
                        InterimOperandStack),
        pushOperandStack(InterimOperandStack, ResultType, NextOperandStack),
        operandStackHasLegalLength(Environment, NextOperandStack).
    
```

Remove uma lista de tipos da pilha.
```
    popMatchingList(OperandStack, [], OperandStack).
    popMatchingList(OperandStack, [P | Rest], NewOperandStack) :-
        popMatchingType(OperandStack, P, TempOperandStack, _ActualType),
        popMatchingList(TempOperandStack, Rest, NewOperandStack).
    
```

Remove um tipo individual da pilha. O comportamento exato depende do conteúdo da pilha. Se o topo lógico da pilha for algum subtipo do tipo especificado, `Type`, então o remove. Se um tipo ocupa duas entradas da pilha, então o topo lógico da pilha é na verdade o tipo logo abaixo do topo, e o topo da pilha é o tipo inutilizável `top`.
```
    popMatchingType([ActualType | OperandStack],
                    Type, OperandStack, ActualType) :-
        sizeOf(Type, 1),
        isAssignable(ActualType, Type).
    
    popMatchingType([top, ActualType | OperandStack],
                    Type, OperandStack, ActualType) :-
        sizeOf(Type, 2),
        isAssignable(ActualType, Type).
    
    sizeOf(X, 2) :- isAssignable(X, twoWord).
    sizeOf(X, 1) :- isAssignable(X, oneWord).
    sizeOf(top, 1).
    
```

Empurra um tipo lógico para a pilha. O comportamento exato varia com o tamanho do tipo. Se o tipo empurrado for de tamanho 1, nós apenas o empurramos para a pilha. Se o tipo empurrado for de tamanho 2, nós o empurramos e, em seguida, empurramos `top`.
```
    pushOperandStack(OperandStack, 'void', OperandStack).
    pushOperandStack(OperandStack, Type, [Type | OperandStack]) :-
        sizeOf(Type, 1).
    pushOperandStack(OperandStack, Type, [top, Type | OperandStack]) :-
        sizeOf(Type, 2).
    
```

O comprimento da pilha de operandos não deve exceder o tamanho máximo declarado.
```
    operandStackHasLegalLength(Environment, OperandStack) :-
        length(OperandStack, Length),
        maxOperandStackLength(Environment, MaxStack),
        Length =< MaxStack.
    
```

As instruções _dup_ removem tipos esperados da pilha de operandos do estado de tipo de entrada e os substituem por tipos de resultado predefinidos, resultando em um novo estado de tipo. No entanto, essas instruções não são definidas em termos de transições de tipo porque não há necessidade de corresponder tipos por meio da relação de subtipagem. Em vez disso, as instruções _dup_ manipulam a pilha de operandos inteiramente em termos da _categoria_ de tipos na pilha (§2.11.1).

Tipos de Categoria 1 ocupam uma única entrada na pilha. Remover um tipo lógico de categoria 1, `Type`, da pilha é possível se o topo da pilha for `Type` e `Type` não for `top` (caso contrário, poderia denotar a metade superior de um tipo de categoria 2). O resultado é a pilha de entrada, com a entrada do topo removida.
```
    popCategory1([Type | Rest], Type, Rest) :-
        Type \= top,
        sizeOf(Type, 1).
    
```

Tipos de Categoria 2 ocupam duas entradas na pilha. Remover um tipo lógico de categoria 2, `Type`, da pilha é possível se o topo da pilha for do tipo `top`, e a entrada diretamente abaixo dele for `Type`. O resultado é a pilha de entrada, com as duas entradas do topo removidas.
```
    popCategory2([top, Type | Rest], Type, Rest) :-
        sizeOf(Type, 2).
    
```

As instruções _dup_ empurram uma lista de tipos para a pilha essencialmente da mesma forma que quando um tipo é empurrado para uma transição de tipo válida.
```
    canSafelyPush(Environment, InputOperandStack, Type, OutputOperandStack) :-
        pushOperandStack(InputOperandStack, Type, OutputOperandStack),
        operandStackHasLegalLength(Environment, OutputOperandStack).
    
    canSafelyPushList(Environment, InputOperandStack, Types,
                      OutputOperandStack) :-
        canPushList(InputOperandStack, Types, OutputOperandStack),
        operandStackHasLegalLength(Environment, OutputOperandStack).
    
    canPushList(InputOperandStack, [], InputOperandStack).
    canPushList(InputOperandStack, [Type | Rest], OutputOperandStack) :-
        pushOperandStack(InputOperandStack, Type, InterimOperandStack),
        canPushList(InterimOperandStack, Rest, OutputOperandStack).
    
```

Muitas das regras de tipo para instruções individuais usam a seguinte cláusula para remover facilmente uma lista de tipos da pilha.
```
    canPop(frame(Locals, OperandStack, Flags), Types,
           frame(Locals, PoppedOperandStack, Flags)) :-
        popMatchingList(OperandStack, Types, PoppedOperandStack).
    
```

Finalmente, certas instruções de array (§ _aaload_, § _arraylength_, § _baload_, § _bastore_) inspecionam os tipos na pilha de operandos para verificar se são tipos de array. A seguinte cláusula acessa o _i_-ésimo elemento da pilha de operandos a partir de um estado de tipo.
```
    nth1OperandStackIs(_i_ , frame(_Locals, OperandStack, _Flags), Element) :-
        nth1(_i_ , OperandStack, Element).
    
```

#### 4.10.1.5. Verificação de Tipos de Métodos

Um método com um atributo `Code` é seguro em termos de tipo se for possível mesclar o código e os frames do mapa de pilha em um único stream, de modo que cada frame do mapa de pilha preceda a instrução à qual corresponde, e o stream mesclado esteja correto em termos de tipo. Os manipuladores de exceção do método, se houver, também devem ser legais.
```
    methodIsTypeSafe(Class, Method) :-
        parseCodeAttribute(Class, Method, FrameSize, MaxStack,
                           ParsedCode, Handlers, StackMap),
        mergeStackMapAndCode(StackMap, ParsedCode, MergedCode),
        methodInitialStackFrame(Class, Method, FrameSize, StackFrame, ReturnType),
        Environment = environment(Class, Method, ReturnType, MergedCode,
                                  MaxStack, Handlers),
        handlersAreLegal(Environment),
        mergedCodeIsTypeSafe(Environment, MergedCode, StackFrame).
    
```

Consideremos primeiro os manipuladores de exceção.

Um manipulador de exceção é representado por uma aplicação de functor na forma:
```
    handler(Start, End, Target, ClassName)
    
```

cujos argumentos são, respectivamente, o início e o fim do intervalo de instruções cobertas pelo manipulador, a primeira instrução do código do manipulador e o nome da classe de exceção que este manipulador foi projetado para tratar.

Um manipulador de exceção é _legal_ se seu início (`Start`) for menor que seu fim (`End`), existir uma instrução cujo offset seja igual a `Start`, existir uma instrução cujo offset seja igual a `End`, e a classe de exceção do manipulador for atribuível à classe `Throwable`. A classe de exceção de um manipulador é `Throwable` se a entrada de classe do manipulador for 0, caso contrário, é a classe nomeada no manipulador.
```
    handlersAreLegal(Environment) :-
        exceptionHandlers(Environment, Handlers),
        checklist(handlerIsLegal(Environment), Handlers).
    
    handlerIsLegal(Environment, Handler) :-
        Handler = handler(Start, End, Target, _),
        Start < End,
        allInstructions(Environment, Instructions),
        member(instruction(Start, _), Instructions),
        offsetStackFrame(Environment, Target, _),
        instructionsIncludeEnd(Instructions, End),
        currentClassLoader(Environment, CurrentLoader),
        handlerExceptionClass(Handler, ExceptionClass, CurrentLoader),
        isBootstrapLoader(BL),
        isAssignable(ExceptionClass, class('java/lang/Throwable', BL)).
    
    instructionsIncludeEnd(Instructions, End) :-
        member(instruction(End, _), Instructions).
    instructionsIncludeEnd(Instructions, End) :-
        member(endOfCode(End), Instructions).
    
    handlerExceptionClass(handler(_, _, _, 0),
                          class('java/lang/Throwable', BL), _) :-
        isBootstrapLoader(BL).
    
    handlerExceptionClass(handler(_, _, _, Name),
                          class(Name, L), L) :-
        Name \= 0.
    
```

Voltemos agora ao stream de instruções e frames do mapa de pilha.

A mesclagem de instruções e frames do mapa de pilha em um único stream envolve quatro casos:

*   Mesclar um `StackMap` vazio e uma lista de instruções resulta na lista original de instruções.
```
mergeStackMapAndCode([], CodeList, CodeList).
        
```

*   Dada uma lista de frames do mapa de pilha começando com o estado de tipo para a instrução em `Offset`, e uma lista de instruções começando em `Offset`, a lista mesclada é o cabeçalho da lista de frames do mapa de pilha, seguido pelo cabeçalho da lista de instruções, seguido pela mesclagem das caudas das duas listas.
```
mergeStackMapAndCode([stackMap(Offset, Map) | RestMap],
                             [instruction(Offset, Parse) | RestCode],
                             [stackMap(Offset, Map),
                               instruction(Offset, Parse) | RestMerge]) :-
            mergeStackMapAndCode(RestMap, RestCode, RestMerge).
        
```

*   Caso contrário, dada uma lista de frames do mapa de pilha começando com o estado de tipo para a instrução em `OffsetM`, e uma lista de instruções começando em `OffsetP`, então, se `OffsetP < OffsetM`, a lista mesclada consiste no cabeçalho da lista de instruções, seguido pela mesclagem da lista de frames do mapa de pilha e da cauda da lista de instruções.
```
mergeStackMapAndCode([stackMap(OffsetM, Map) | RestMap],
                             [instruction(OffsetP, Parse) | RestCode],
                             [instruction(OffsetP, Parse) | RestMerge]) :-
            OffsetP < OffsetM,
            mergeStackMapAndCode([stackMap(OffsetM, Map) | RestMap],
                                 RestCode, RestMerge).
        
```

*   Caso contrário, a mesclagem das duas listas é indefinida. Como a lista de instruções tem offsets monotonicamente crescentes, a mesclagem das duas listas não é definida a menos que cada offset de frame do mapa de pilha tenha um offset de instrução correspondente e os frames do mapa de pilha estejam em ordem monotonicamente crescente.

Para determinar se o stream mesclado para um método está correto em termos de tipo, primeiro inferimos o estado de tipo inicial do método.

O estado de tipo inicial de um método consiste em uma pilha de operandos vazia e tipos de variáveis locais derivados do tipo de `this` e dos argumentos, bem como a flag apropriada, dependendo se este é um método `<init>`.
```
    methodInitialStackFrame(Class, Method, FrameSize, frame(Locals, [], Flags),
                            ReturnType):-
        methodDescriptor(Method, Descriptor),
        parseMethodDescriptor(Descriptor, RawArgs, ReturnType),
        expandTypeList(RawArgs, Args),
        methodInitialThisType(Class, Method, ThisList),
        flags(ThisList, Flags),
        append(ThisList, Args, ThisArgs),
        expandToLength(ThisArgs, FrameSize, top, Locals).
    
```

Dada uma lista de tipos, a seguinte cláusula produz uma lista onde cada tipo de tamanho 2 foi substituído por duas entradas: uma para si mesmo e uma entrada `top`. O resultado então corresponde à representação da lista como palavras de 32 bits na Java Virtual Machine.
```
    expandTypeList([], []).
    expandTypeList([Item | List], [Item | Result]) :-
        sizeOf(Item, 1),
        expandTypeList(List, Result).
    expandTypeList([Item | List], [Item, top | Result]) :-
        sizeOf(Item, 2),
        expandTypeList(List, Result).
    
```
```
    flags([uninitializedThis], [flagThisUninit]).
    flags(X, []) :- X \= [uninitializedThis].
    
    expandToLength(List, Size, _Filler, List) :-
        length(List, Size).
    expandToLength(List, Size, Filler, Result) :-
        length(List, ListLength),
        ListLength < Size,
        Delta is Size - ListLength,
        length(Extra, Delta),
        checklist(=(Filler), Extra),
        append(List, Extra, Result).
    
```

Para o estado de tipo inicial de um método de instância, calculamos o tipo de `this` e o colocamos em uma lista. O tipo de `this` em um método `<init>` de uma classe com uma superclasse (ou seja, de qualquer classe exceto `Object`) é `uninitializedThis`; o tipo de `this` em qualquer outro método de instância, incluindo um método `<init>` de `Object`, é `class(N, L)` onde `N` é o nome da classe que contém o método e `L` é seu class loader definidor.

Para o estado de tipo inicial de um método estático, `this` é irrelevante, então a lista é vazia.
```
    methodInitialThisType(_Class, Method, []) :-
        methodAccessFlags(Method, AccessFlags),
        member(static, AccessFlags),
        methodName(Method, MethodName),
        MethodName \= '<init>'.
    
    methodInitialThisType(Class, Method, [This]) :-
        methodAccessFlags(Method, AccessFlags),
        notMember(static, AccessFlags),
        instanceMethodInitialThisType(Class, Method, This).
    
    instanceMethodInitialThisType(Class, Method, uninitializedThis) :-
        isSubclassInstanceInit(Class, Method).
    
    instanceMethodInitialThisType(Class, Method, class(ClassName, L)) :-
        \+ isSubclassInstanceInit(Class, Method),
        classClassName(Class, ClassName),
        classDefiningLoader(Class, L).
    
    isSubclassInstanceInit(Class, Method) :-
        methodName(Method, '<init>'),
        classSuperClassName(Class, _).
    
```

#### 4.10.1.6. Verificação de Tipos de Streams de Código

Dado um estado de tipo de entrada, o predicado `mergedCodeIsTypeSafe` verifica se um stream mesclado de instruções e frames do mapa de pilha está correto em termos de tipo:

*   Se tivermos um frame do mapa de pilha e um estado de tipo de entrada, o estado de tipo deve ser atribuível ao que está no frame do mapa de pilha. Podemos então prosseguir para verificar o tipo do restante do stream com o estado de tipo fornecido no frame do mapa de pilha.
```
mergedCodeIsTypeSafe(Environment, [stackMap(Offset, MapFrame) | MoreCode],
                             frame(Locals, OperandStack, Flags)) :-
            frameIsAssignable(frame(Locals, OperandStack, Flags), MapFrame),
            mergedCodeIsTypeSafe(Environment, MoreCode, MapFrame).
        
```

*   Um stream de código mesclado é seguro em termos de tipo em relação a um estado de tipo de entrada `T` se ele começa com uma instrução `I` que é segura em termos de tipo em relação a `T`, e `I` _satisfaz_ seus manipuladores de exceção (veja abaixo), e o restante do stream é seguro em termos de tipo dado o estado de tipo após essa execução de `I`.

`NextStackFrame` indica o que passa para a próxima instrução. Para uma instrução de desvio incondicional, ela terá o valor especial `afterGoto`. `ExceptionStackFrame` indica o que é passado para os manipuladores de exceção.
```
mergedCodeIsTypeSafe(Environment, [instruction(Offset, Parse) | MoreCode],
                             frame(Locals, OperandStack, Flags)) :-
            instructionIsTypeSafe(Parse, Environment, Offset,
                                  frame(Locals, OperandStack, Flags),
                                  NextStackFrame, ExceptionStackFrame),
            instructionSatisfiesHandlers(Environment, Offset, ExceptionStackFrame),
            mergedCodeIsTypeSafe(Environment, MoreCode, NextStackFrame).
        
```

*   Após um desvio incondicional (indicado por um estado de tipo de entrada de `afterGoto`), se tivermos um frame do mapa de pilha fornecendo o estado de tipo para as instruções seguintes, podemos prosseguir e verificar seus tipos usando o estado de tipo fornecido pelo frame do mapa de pilha.
```
mergedCodeIsTypeSafe(Environment, [stackMap(Offset, MapFrame) | MoreCode],
                             afterGoto) :-
            mergedCodeIsTypeSafe(Environment, MoreCode, MapFrame).
        
```

*   É ilegal ter código após um desvio incondicional sem que um frame do mapa de pilha seja fornecido para ele.
```
mergedCodeIsTypeSafe(_Environment, [instruction(_, _) | _MoreCode],
                             afterGoto) :-
            write_ln('No stack frame after unconditional branch'),
            fail.
        
```

*   Se tivermos um desvio incondicional no final do código, pare.
```
mergedCodeIsTypeSafe(_Environment, [endOfCode(Offset)],
                             afterGoto).
        
```

Desviar para um alvo é seguro em termos de tipo se o alvo tiver um frame de pilha associado, `Frame`, e o frame de pilha atual, `StackFrame`, for atribuível a `Frame`.
```
    targetIsTypeSafe(Environment, StackFrame, Target) :-
        offsetStackFrame(Environment, Target, Frame),
        frameIsAssignable(StackFrame, Frame).
    
```

Uma instrução _satisfaz seus manipuladores de exceção_ se ela satisfaz todo manipulador de exceção que é aplicável à instrução.
```
    instructionSatisfiesHandlers(Environment, Offset, ExceptionStackFrame) :-
        exceptionHandlers(Environment, Handlers),
        sublist(isApplicableHandler(Offset), Handlers, ApplicableHandlers),
        checklist(instructionSatisfiesHandler(Environment, ExceptionStackFrame),
                  ApplicableHandlers).
    
```

Um manipulador de exceção é _aplicável_ a uma instrução se o offset da instrução for maior ou igual ao início do intervalo do manipulador e menor que o fim do intervalo do manipulador.
```
    isApplicableHandler(Offset, handler(Start, End, _Target, _ClassName)) :-
        Offset >= Start,
        Offset < End.
    
```

Uma instrução _satisfaz_ um manipulador de exceção se o estado de tipo de saída da instrução for `ExcStackFrame`, e o alvo do manipulador (a instrução inicial do código do manipulador) for seguro em termos de tipo assumindo um estado de tipo de entrada `T`. O estado de tipo `T` é derivado de `ExcStackFrame` substituindo a pilha de operandos por uma pilha cujo único elemento é a classe de exceção do manipulador.
```
    instructionSatisfiesHandler(Environment, ExcStackFrame, Handler) :-
        Handler = handler(_, _, Target, _),
        currentClassLoader(Environment, CurrentLoader),
        handlerExceptionClass(Handler, ExceptionClass, CurrentLoader),
        /* The stack consists of just the exception. */
        ExcStackFrame = frame(Locals, _, Flags),
        TrueExcStackFrame = frame(Locals, [ ExceptionClass ], Flags),
        operandStackHasLegalLength(Environment, TrueExcStackFrame),
        targetIsTypeSafe(Environment, TrueExcStackFrame, Target).
    
```

#### 4.10.1.7. Verificação de Tipos para Instruções de Carregamento e Armazenamento

Todas as instruções de carregamento são variações de um padrão comum, variando o tipo do valor que a instrução carrega.

Carregar um valor do tipo `Type` da variável local `Index` é seguro em termos de tipo, se o tipo dessa variável local for `ActualType`, `ActualType` for atribuível a `Type`, e empurrar `ActualType` para a pilha de operandos de entrada for uma transição de tipo válida (§4.10.1.4) que resulta em um novo estado de tipo `NextStackFrame`. Após a execução da instrução de carregamento, o estado de tipo será `NextStackFrame`.
```
    loadIsTypeSafe(Environment, Index, Type, StackFrame, NextStackFrame) :-
        StackFrame = frame(Locals, _OperandStack, _Flags),
        nth0(Index, Locals, ActualType),
        isAssignable(ActualType, Type),
        validTypeTransition(Environment, [], ActualType, StackFrame,
                            NextStackFrame).
    
```

Todas as instruções de armazenamento são variações de um padrão comum, variando o tipo do valor que a instrução armazena.

Em geral, uma instrução de armazenamento é segura em termos de tipo se a variável local que ela referencia for de um tipo que é um supertipo de `Type`, e o topo da pilha de operandos for de um subtipo de `Type`, onde `Type` é o tipo que a instrução foi projetada para armazenar.

Mais precisamente, o armazenamento é seguro em termos de tipo se for possível remover um tipo `ActualType` que "corresponde" a `Type` (ou seja, é um subtipo de `Type`) da pilha de operandos (§4.10.1.4), e então atribuir legalmente esse tipo à variável local `LIndex`.
```
    storeIsTypeSafe(_Environment, Index, Type,
                    frame(Locals, OperandStack, Flags),
                    frame(NextLocals, NextOperandStack, Flags)) :-
        popMatchingType(OperandStack, Type, NextOperandStack, ActualType),
        modifyLocalVariable(Index, ActualType, Locals, NextLocals).
    
```

Dadas as variáveis locais `Locals`, modificar `Index` para ter o tipo `Type` resulta na lista de variáveis locais `NewLocals`. As modificações são um tanto complexas, porque alguns valores (e seus tipos correspondentes) ocupam duas variáveis locais. Assim, modificar `LN` pode exigir a modificação de `LN+1` (porque o tipo ocupará ambos os slots `N` e `N+1`) ou `LN-1` (porque a variável local `N` costumava ser a metade superior do valor/tipo de duas palavras começando na variável local `N-1`, e então a variável local `N-1` deve ser invalidada), ou ambos. Isso é descrito mais adiante. Começamos em `L0` e contamos para cima.
```
    modifyLocalVariable(Index, Type, Locals, NewLocals) :-
        modifyLocalVariable(0, Index, Type, Locals, NewLocals).
    
```

Dado `LocalsRest`, o sufixo da lista de variáveis locais começando no índice `I`, modificar a variável local `Index` para ter o tipo `Type` resulta no sufixo da lista de variáveis locais `NextLocalsRest`.

Se `I < Index-1`, apenas copie a entrada para a saída e recurse para frente. Se `I = Index-1`, o tipo da variável local `I` pode mudar. Isso pode ocorrer se `LI` tiver um tipo de tamanho 2. Uma vez que definimos `LI+1` para o novo tipo (e o valor correspondente), o tipo/valor de `LI` será invalidado, pois sua metade superior será descartada. Então, recurse para frente.
```
    modifyLocalVariable(I, Index, Type,
                        [Locals1 | LocalsRest],
                        [Locals1 | NextLocalsRest] ) :-
        I < Index - 1,
        I1 is I + 1,
        modifyLocalVariable(I1, Index, Type, LocalsRest, NextLocalsRest).
    
    modifyLocalVariable(I, Index, Type,
                        [Locals1 | LocalsRest],
                        [NextLocals1 | NextLocalsRest] ) :-
        I =:= Index - 1,
        modifyPreIndexVariable(Locals1, NextLocals1),
        modifyLocalVariable(Index, Index, Type, LocalsRest, NextLocalsRest).
    
```

Quando encontramos a variável, e ela ocupa apenas uma palavra, nós a mudamos para `Type` e terminamos. Quando encontramos a variável, e ela ocupa duas palavras, nós mudamos seu tipo para `Type` e a próxima palavra para `top`.
```
    modifyLocalVariable(Index, Index, Type,
                        [_ | LocalsRest], [Type | LocalsRest]) :-
        sizeOf(Type, 1).
    
    modifyLocalVariable(Index, Index, Type,
                        [_, _ | LocalsRest], [Type, top | LocalsRest]) :-
        sizeOf(Type, 2).
    
```

Referimo-nos a uma variável local cujo índice precede imediatamente uma variável local cujo tipo será modificado como uma _variável pré-índice_. O tipo futuro de uma variável pré-índice do tipo `InputType` é `Result`. Se o tipo, `Type`, da variável local pré-índice for de tamanho 1, ele não muda. Se o tipo da variável local pré-índice, `Type`, for 2, precisamos marcar a metade inferior de seu valor de duas palavras como inutilizável, definindo seu tipo como `top`.
```
    modifyPreIndexVariable(Type, Type) :- sizeOf(Type, 1).
    modifyPreIndexVariable(Type, top) :- sizeOf(Type, 2).
    
```

#### 4.10.1.8. Verificação de Tipos para Membros `protected`

Todas as instruções que acessam membros devem lidar com as regras relativas aos membros `protected`. Esta seção descreve a verificação `protected` que corresponde a JLS §6.6.2.1.

A verificação `protected` aplica-se apenas a membros `protected` de superclasses da classe atual. Membros `protected` em outras classes serão detectados pela verificação de acesso realizada na resolução (§5.4.4). Existem quatro casos:

*   Se o tipo referenciado não for um tipo de classe com o mesmo nome de uma superclasse, ele não pode ser uma superclasse e, portanto, pode ser ignorado com segurança.
```
passesProtectedCheck(Environment, class(MemberClassName, _), MemberName,
                             MemberDescriptor, StackFrame) :-
            thisClass(Environment, CurrentClass),
            \+ hasSuperclassWithName(CurrentClass, MemberClassName).
        
        passesProtectedCheck(Environment, arrayOf(_), MemberName,
                             MemberDescriptor, StackFrame).
        
        hasSuperclassWithName(Class, SuperclassName) :-
            loadedSuperclasses(Class, Supers),
            member(Super, Supers),
            classClassName(Super, SuperclassName).
        
```

*   Se o `MemberClassName` for o mesmo que o nome de uma superclasse, a classe que está sendo resolvida pode de fato ser uma superclasse. Neste caso, se nenhuma superclasse chamada `MemberClassName` em um pacote de tempo de execução diferente tiver um membro `protected` chamado `MemberName` com descritor `MemberDescriptor`, a verificação `protected` não se aplica.

Isso ocorre porque a classe real que está sendo resolvida será uma dessas superclasses, caso em que sabemos que ela está no mesmo pacote de tempo de execução, e o acesso é legal; ou o membro em questão não é `protected` e a verificação não se aplica; ou será uma subclasse, caso em que a verificação seria bem-sucedida de qualquer forma; ou será alguma outra classe no mesmo pacote de tempo de execução, caso em que o acesso é legal e a verificação não precisa ocorrer; ou o verificador não precisa sinalizar isso como um problema, pois será detectado de qualquer forma porque a resolução falhará por força.
```
passesProtectedCheck(Environment, class(MemberClassName, _), MemberName,
                             MemberDescriptor, StackFrame) :-
            thisClass(Environment, CurrentClass),
            hasSuperclassWithName(CurrentClass, MemberClassName),
            loadedSuperclasses(CurrentClass, Supers),
            classesInOtherPkgWithProtectedMember(
              CurrentClass, MemberName, MemberDescriptor, MemberClassName,
              Supers, []).
        
```

*   Se existir um membro `protected` de superclasse em um pacote de tempo de execução diferente, então carregue `MemberClassName`; se o membro em questão não for `protected`, a verificação não se aplica. (Usar um membro de superclasse que não é `protected` é trivialmente correto.)
```
passesProtectedCheck(Environment, class(MemberClassName, Loader),
                             MemberName, MemberDescriptor, StackFrame) :-
            thisClass(Environment, CurrentClass),
            hasSuperclassWithName(CurrentClass, MemberClassName),
            loadedSuperclasses(CurrentClass, Supers),
            classesInOtherPkgWithProtectedMember(
              CurrentClass, MemberName, MemberDescriptor, MemberClassName,
              Supers, List),
            List \= [],
            loadedClass(MemberClassName, Loader, ReferencedClass),
            isNotProtected(ReferencedClass, MemberName, MemberDescriptor).
        
```

*   Caso contrário, o uso de um membro de um objeto do tipo `Target` exige que `Target` seja atribuível ao tipo da classe atual.
```
passesProtectedCheck(Environment, class(MemberClassName, Loader),
                             MemberName, MemberDescriptor,
                             frame(_Locals, [Target | _Rest], _Flags)) :-
            thisClass(Environment, CurrentClass),
            hasSuperclassWithName(CurrentClass, MemberClassName),
            loadedSuperclasses(CurrentClass, Supers),
            classesInOtherPkgWithProtectedMember(
              CurrentClass, MemberName, MemberDescriptor, MemberClassName,
              Supers, List),
            List \= [],
            loadedClass(MemberClassName, Loader, ReferencedClass),
            isProtected(ReferencedClass, MemberName, MemberDescriptor),
            thisType(Environment, ThisType),
            isAssignable(Target, ThisType).
        
```

O predicado `classesInOtherPkgWithProtectedMember(Class, MemberName, MemberDescriptor, MemberClassName, Supers, List)` é verdadeiro se `List` for o conjunto de classes em `Supers` com o nome `MemberClassName` que estão em um pacote de tempo de execução diferente de `Class` e que declaram um membro `protected` chamado `MemberName` com descritor `MemberDescriptor`.
```
    classesInOtherPkgWithProtectedMember(_, _, _, _, [], []).
    
    classesInOtherPkgWithProtectedMember(Class, MemberName,
                                         MemberDescriptor, MemberClassName,
                                         [Super | Tail], [Super | T]) :-
        classClassName(Super, MemberClassName),
        \+ sameRuntimePackage(Class, Super),
        isProtected(Super, MemberName, MemberDescriptor),
        classesInOtherPkgWithProtectedMember(
          Class, MemberName, MemberDescriptor, MemberClassName, Tail, T).
    
    classesInOtherPkgWithProtectedMember(Class, MemberName,
                                         MemberDescriptor, MemberClassName,
                                         [Super | Tail], T) :-
        classClassName(Super, MemberClassName),
        \+ sameRuntimePackage(Class, Super),
        isNotProtected(Super, MemberName, MemberDescriptor),
        classesInOtherPkgWithProtectedMember(
          Class, MemberName, MemberDescriptor, MemberClassName, Tail, T).
    
    classesInOtherPkgWithProtectedMember(Class, MemberName,
                                         MemberDescriptor, MemberClassName,
                                         [Super | Tail], T) :-
        classClassName(Super, MemberClassName),
        sameRuntimePackage(Class, Super),
        classesInOtherPkgWithProtectedMember(
          Class, MemberName, MemberDescriptor, MemberClassName, Tail, T).
    
    classesInOtherPkgWithProtectedMember(Class, MemberName,
                                         MemberDescriptor, MemberClassName,
                                         [Super | Tail], T) :-
```
        classClassName(Super, SuperClassName),
        SuperClassName \= MemberClassName,
        classesInOtherPkgWithProtectedMember(
          Class, MemberName, MemberDescriptor, MemberClassName, Tail, T).
    
    sameRuntimePackage(Class1, Class2) :-
        classDefiningLoader(Class1, L),
        classDefiningLoader(Class2, L),
        samePackageName(Class1, Class2).
    
```

#### 4.10.1.9. Instruções de Verificação de Tipo

Em geral, a regra de tipo para uma instrução é dada em relação a um ambiente `Environment` que define a classe e o método nos quais a instrução ocorre ([§4.10.1.1](<#/doc/jvms/jvms-04>)), e o deslocamento `Offset` dentro do método no qual a instrução ocorre. A regra estabelece que, se o estado de tipo de entrada `StackFrame` atender a certos requisitos, então:

  * A instrução é segura em termos de tipo.

  * É comprovável que o estado de tipo após a instrução ser concluída normalmente tem uma forma particular dada por `NextStackFrame`, e que o estado de tipo após a instrução ser concluída abruptamente é dado por `ExceptionStackFrame`.

O estado de tipo após uma instrução ser concluída abruptamente é o mesmo que o estado de tipo de entrada, exceto que a pilha de operandos está vazia.
```
exceptionStackFrame(StackFrame, ExceptionStackFrame) :-
            StackFrame = frame(Locals, _OperandStack, Flags),
            ExceptionStackFrame = frame(Locals, [], Flags).
            
```

Muitas instruções possuem regras de tipo que são completamente isomórficas às regras para outras instruções. Se uma instrução `b1` é isomórfica a outra instrução `b2`, então a regra de tipo para `b1` é a mesma que a regra de tipo para `b2`.
```
    instructionIsTypeSafe(Instruction, Environment, Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        instructionHasEquivalentTypeRule(Instruction, IsomorphicInstruction),
        instructionIsTypeSafe(IsomorphicInstruction, Environment, Offset,
                              StackFrame, NextStackFrame,
                              ExceptionStackFrame).
    
```

A descrição em inglês de cada regra destina-se a ser legível, intuitiva e concisa. Como tal, a descrição evita repetir todas as suposições contextuais dadas acima. Em particular:

  * A descrição não menciona explicitamente o ambiente.

  * Quando a descrição fala da pilha de operandos ou variáveis locais a seguir, ela se refere aos componentes da pilha de operandos e variáveis locais de um estado de tipo: seja o estado de tipo de entrada ou o de saída.

  * O estado de tipo após a instrução ser concluída abruptamente é quase sempre idêntico ao estado de tipo de entrada. A descrição discute o estado de tipo após a instrução ser concluída abruptamente apenas quando esse não é o caso.

  * A descrição fala de desempilhar (popping) e empilhar (pushing) tipos na pilha de operandos, e não discute explicitamente questões de underflow ou overflow da pilha. A descrição assume que essas operações podem ser concluídas com sucesso, mas as cláusulas Prolog para manipulação da pilha de operandos garantem que as verificações necessárias sejam feitas.

  * A descrição discute apenas a manipulação de tipos lógicos. Na prática, alguns tipos ocupam mais de uma palavra. A descrição abstrai esses detalhes de representação, mas as cláusulas Prolog que manipulam dados não o fazem.

Quaisquer ambiguidades podem ser resolvidas consultando as cláusulas Prolog formais.

##### _aaload_

Uma instrução _aaload_ é segura em termos de tipo se for possível substituir validamente tipos que correspondem a `int` e um tipo de array com tipo de componente `ComponentType` onde `ComponentType` é um subtipo de `Object`, com `ComponentType` resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(aaload, Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        nth1OperandStackIs(2, StackFrame, ArrayType),
        arrayComponentType(ArrayType, ComponentType),
        isBootstrapLoader(BL),
        validTypeTransition(Environment,
                            [int, arrayOf(class('java/lang/Object', BL))],
                            ComponentType, StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

O tipo de componente de um array de `X` é `X`. Definimos o tipo de componente de `null` como `null`.
```
    arrayComponentType(arrayOf(X), X).
    arrayComponentType(null, null).
    
```

##### _aastore_

Uma instrução _aastore_ é segura em termos de tipo se for possível desempilhar validamente tipos que correspondem a `Object`, `int` e um array de `Object` da pilha de operandos de entrada, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(aastore, _Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        isBootstrapLoader(BL),
        canPop(StackFrame,
               [class('java/lang/Object', BL),
                int,
                arrayOf(class('java/lang/Object', BL))],
               NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

##### _aconst_null_

Uma instrução _aconst_null_ é segura em termos de tipo se for possível empilhar validamente o tipo `null` na pilha de operandos de entrada, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(aconst_null, Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        validTypeTransition(Environment, [], null, StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

##### _aload_ , _aload_ &lt;n&gt;_

Uma instrução _aload_ com operando `Index` é segura em termos de tipo e resulta em um estado de tipo de saída `NextStackFrame`, se uma instrução de carregamento (load) com operando `Index` e tipo `reference` for segura em termos de tipo e resultar em um estado de tipo de saída `NextStackFrame`.
```
    instructionIsTypeSafe(aload(Index), Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        loadIsTypeSafe(Environment, Index, reference, StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

As instruções _aload_ &lt;n&gt;_, para 0 ≤ _n_ ≤ 3, são seguras em termos de tipo se a instrução _aload_ equivalente for segura em termos de tipo.
```
    instructionHasEquivalentTypeRule(aload_0, aload(0)).
    instructionHasEquivalentTypeRule(aload_1, aload(1)).
    instructionHasEquivalentTypeRule(aload_2, aload(2)).
    instructionHasEquivalentTypeRule(aload_3, aload(3)).
    
```

##### _anewarray_

Uma instrução _anewarray_ com operando `CP` é segura em termos de tipo se `CP` se refere a uma entrada da constant pool que denota uma classe, interface ou tipo de array, e for possível substituir legalmente um tipo que corresponde a `int` na pilha de operandos de entrada por um array com tipo de componente `CP`, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(anewarray(CP), Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        (CP = class(_, _) ; CP = arrayOf(_)),
        validTypeTransition(Environment, [int], arrayOf(CP),
                            StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

##### _areturn_

Uma instrução _areturn_ é segura em termos de tipo se o método envolvente tiver um tipo de retorno declarado, `ReturnType`, que seja um tipo `reference`, e for possível desempilhar validamente um tipo que corresponde a `ReturnType` da pilha de operandos de entrada.
```
    instructionIsTypeSafe(areturn, Environment, _Offset, StackFrame,
                          afterGoto, ExceptionStackFrame) :-
        thisMethodReturnType(Environment, ReturnType),
        isAssignable(ReturnType, reference),
        canPop(StackFrame, [ReturnType], _PoppedStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

##### _arraylength_

Uma instrução _arraylength_ é segura em termos de tipo se for possível substituir validamente um tipo de array na pilha de operandos de entrada pelo tipo `int`, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(arraylength, Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        nth1OperandStackIs(1, StackFrame, ArrayType),
        arrayComponentType(ArrayType, _),
        validTypeTransition(Environment, [top], int, StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

##### _astore_ , _astore_ &lt;n&gt;_

Uma instrução _astore_ com operando `Index` é segura em termos de tipo e resulta em um estado de tipo de saída `NextStackFrame`, se uma instrução de armazenamento (store) com operando `Index` e tipo `reference` for segura em termos de tipo e resultar em um estado de tipo de saída `NextStackFrame`.
```
    instructionIsTypeSafe(astore(Index), Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        storeIsTypeSafe(Environment, Index, reference, StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

As instruções _astore_ &lt;n&gt;_, para 0 ≤ _n_ ≤ 3, são seguras em termos de tipo se a instrução _astore_ equivalente for segura em termos de tipo.
```
    instructionHasEquivalentTypeRule(astore_0, astore(0)).
    instructionHasEquivalentTypeRule(astore_1, astore(1)).
    instructionHasEquivalentTypeRule(astore_2, astore(2)).
    instructionHasEquivalentTypeRule(astore_3, astore(3)).
    
```

##### _athrow_

Uma instrução _athrow_ é segura em termos de tipo se o topo da pilha de operandos corresponder a `Throwable`.
```
    instructionIsTypeSafe(athrow, _Environment, _Offset, StackFrame,
                          afterGoto, ExceptionStackFrame) :-
        isBootstrapLoader(BL),
        canPop(StackFrame, [class('java/lang/Throwable', BL)], _PoppedStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

##### _baload_

Uma instrução _baload_ é segura em termos de tipo se for possível substituir validamente tipos que correspondem a `int` e um tipo de array pequeno na pilha de operandos de entrada por `int`, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(baload, Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :
        nth1OperandStackIs(2, StackFrame, ArrayType),
        isSmallArray(ArrayType),
        validTypeTransition(Environment, [int, top], int,
                            StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

Um tipo de array é um _tipo de array pequeno_ se for um array de `byte`, um array de `boolean`, ou um subtipo disso (`null`).
```
    isSmallArray(arrayOf(byte)).
    isSmallArray(arrayOf(boolean)).
    isSmallArray(null).
    
```

##### _bastore_

Uma instrução _bastore_ é segura em termos de tipo se for possível desempilhar validamente tipos que correspondem a `int`, `int` e um tipo de array pequeno da pilha de operandos de entrada, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(bastore, _Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        nth1OperandStackIs(3, StackFrame, ArrayType),
        isSmallArray(ArrayType),
        canPop(StackFrame, [int, int, top], NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

##### _bipush_

Uma instrução _bipush_ é segura em termos de tipo se a instrução _sipush_ equivalente for segura em termos de tipo.
```
    instructionHasEquivalentTypeRule(bipush(Value), sipush(Value)).
    
```

##### _caload_

Uma instrução _caload_ é segura em termos de tipo se for possível substituir validamente tipos que correspondem a `int` e array de `char` na pilha de operandos de entrada por `int`, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(caload, Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        validTypeTransition(Environment, [int, arrayOf(char)], int,
                            StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

##### _castore_

Uma instrução _castore_ é segura em termos de tipo se for possível desempilhar validamente tipos que correspondem a `int`, `int` e array de `char` da pilha de operandos de entrada, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(castore, _Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        canPop(StackFrame, [int, int, arrayOf(char)], NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

##### _checkcast_

Uma instrução _checkcast_ com operando `CP` é segura em termos de tipo se `CP` se refere a uma entrada da constant pool que denota uma classe ou um array, e for possível substituir validamente o tipo `Object` no topo da pilha de operandos de entrada pelo tipo denotado por `CP`, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(checkcast(CP), Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        (CP = class(_, _) ; CP = arrayOf(_)),
        isBootstrapLoader(BL),
        validTypeTransition(Environment, [class('java/lang/Object', BL)], CP,
                            StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

##### _d2f_ , _d2i_ , _d2l_

Uma instrução _d2f_ é segura em termos de tipo se for possível desempilhar validamente `double` da pilha de operandos de entrada e substituí-lo por `float`, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(d2f, Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        validTypeTransition(Environment, [double], float,
                            StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

Uma instrução _d2i_ é segura em termos de tipo se for possível desempilhar validamente `double` da pilha de operandos de entrada e substituí-lo por `int`, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(d2i, Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        validTypeTransition(Environment, [double], int,
                            StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

Uma instrução _d2l_ é segura em termos de tipo se for possível desempilhar validamente `double` da pilha de operandos de entrada e substituí-lo por `long`, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(d2l, Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        validTypeTransition(Environment, [double], long,
                            StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

##### _dadd_

Uma instrução _dadd_ é segura em termos de tipo se for possível substituir validamente tipos que correspondem a `double` e `double` na pilha de operandos de entrada por `double`, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(dadd, Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        validTypeTransition(Environment, [double, double], double,
                            StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

##### _daload_

Uma instrução _daload_ é segura em termos de tipo se for possível substituir validamente tipos que correspondem a `int` e array de `double` na pilha de operandos de entrada por `double`, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(daload, Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        validTypeTransition(Environment, [int, arrayOf(double)], double,
                            StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

##### _dastore_

Uma instrução _dastore_ é segura em termos de tipo se for possível desempilhar validamente tipos que correspondem a `double`, `int` e array de `double` da pilha de operandos de entrada, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(dastore, _Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        canPop(StackFrame, [double, int, arrayOf(double)], NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

##### _dcmp &lt;op&gt;_

Uma instrução _dcmpg_ é segura em termos de tipo se for possível substituir validamente tipos que correspondem a `double` e `double` na pilha de operandos de entrada por `int`, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(dcmpg, Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        validTypeTransition(Environment, [double, double], int,
                            StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

Uma instrução _dcmpl_ é segura em termos de tipo se a instrução _dcmpg_ equivalente for segura em termos de tipo.
```
    instructionHasEquivalentTypeRule(dcmpl, dcmpg).
    
```

##### _dconst_ &lt;d&gt;_

Uma instrução _dconst_0_ é segura em termos de tipo se for possível empilhar validamente o tipo `double` na pilha de operandos de entrada, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(dconst_0, Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        validTypeTransition(Environment, [], double, StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

Uma instrução _dconst_1_ é segura em termos de tipo se a instrução _dconst_0_ equivalente for segura em termos de tipo.
```
    instructionHasEquivalentTypeRule(dconst_1, dconst_0).
    
```

##### _ddiv_

Uma instrução _ddiv_ é segura em termos de tipo se a instrução _dadd_ equivalente for segura em termos de tipo.
```
    instructionHasEquivalentTypeRule(ddiv, dadd).
    
```

##### _dload_ , _dload_ &lt;n&gt;_

Uma instrução _dload_ com operando `Index` é segura em termos de tipo e resulta em um estado de tipo de saída `NextStackFrame`, se uma instrução de carregamento (load) com operando `Index` e tipo `double` for segura em termos de tipo e resultar em um estado de tipo de saída `NextStackFrame`.
```
    instructionIsTypeSafe(dload(Index), Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        loadIsTypeSafe(Environment, Index, double, StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

As instruções _dload_ &lt;n&gt;_, para 0 ≤ _n_ ≤ 3, são seguras em termos de tipo se a instrução _dload_ equivalente for segura em termos de tipo.
```
    instructionHasEquivalentTypeRule(dload_0, dload(0)).
    instructionHasEquivalentTypeRule(dload_1, dload(1)).
    instructionHasEquivalentTypeRule(dload_2, dload(2)).
    instructionHasEquivalentTypeRule(dload_3, dload(3)).
    
```

##### _dmul_

Uma instrução _dmul_ é segura em termos de tipo se a instrução _dadd_ equivalente for segura em termos de tipo.
```
    instructionHasEquivalentTypeRule(dmul, dadd).
    
```

##### _dneg_

Uma instrução _dneg_ é segura em termos de tipo se houver um tipo que corresponda a `double` na pilha de operandos de entrada. A instrução _dneg_ não altera o estado de tipo.
```
    instructionIsTypeSafe(dneg, Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        validTypeTransition(Environment, [double], double,
                            StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

##### _drem_

Uma instrução _drem_ é segura em termos de tipo se a instrução _dadd_ equivalente for segura em termos de tipo.
```
    instructionHasEquivalentTypeRule(drem, dadd).
    
```

##### _dreturn_

Uma instrução _dreturn_ é segura em termos de tipo se o método envolvente tiver um tipo de retorno declarado de `double`, e for possível desempilhar validamente um tipo que corresponda a `double` da pilha de operandos de entrada.
```
    instructionIsTypeSafe(dreturn, Environment, _Offset, StackFrame,
                          afterGoto, ExceptionStackFrame) :-
        thisMethodReturnType(Environment, double),
        canPop(StackFrame, [double], _PoppedStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

##### _dstore_ , _dstore_ &lt;n&gt;_

Uma instrução _dstore_ com operando `Index` é segura em termos de tipo e resulta em um estado de tipo de saída `NextStackFrame`, se uma instrução de armazenamento (store) com operando `Index` e tipo `double` for segura em termos de tipo e resultar em um estado de tipo de saída `NextStackFrame`.
```
    instructionIsTypeSafe(dstore(Index), Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        storeIsTypeSafe(Environment, Index, double, StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

As instruções _dstore_ &lt;n&gt;_, para 0 ≤ _n_ ≤ 3, são seguras em termos de tipo se a instrução _dstore_ equivalente for segura em termos de tipo.
```
    instructionHasEquivalentTypeRule(dstore_0, dstore(0)).
    instructionHasEquivalentTypeRule(dstore_1, dstore(1)).
    instructionHasEquivalentTypeRule(dstore_2, dstore(2)).
    instructionHasEquivalentTypeRule(dstore_3, dstore(3)).
    
```

##### _dsub_

Uma instrução _dsub_ é segura em termos de tipo se a instrução _dadd_ equivalente for segura em termos de tipo.
```
    instructionHasEquivalentTypeRule(dsub, dadd).
    
```

##### _dup_

Uma instrução _dup_ é segura em termos de tipo se for possível substituir validamente um tipo de categoria 1, `Type`, pelos tipos `Type`, `Type`, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(dup, Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        StackFrame = frame(Locals, InputOperandStack, Flags),
        popCategory1(InputOperandStack, Type, _),
        canSafelyPush(Environment, InputOperandStack, Type, OutputOperandStack),
        NextStackFrame = frame(Locals, OutputOperandStack, Flags),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

##### _dup_x1_

Uma instrução _dup_x1_ é segura em termos de tipo se for possível substituir validamente dois tipos de categoria 1, `Type1` e `Type2`, na pilha de operandos de entrada pelos tipos `Type1`, `Type2`, `Type1`, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(dup_x1, Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        StackFrame = frame(Locals, InputOperandStack, Flags),
        popCategory1(InputOperandStack, Type1, Stack1),
        popCategory1(Stack1, Type2, Rest),
        canSafelyPushList(Environment, Rest, [Type1, Type2, Type1],
                          OutputOperandStack),
        NextStackFrame = frame(Locals, OutputOperandStack, Flags),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

##### _dup_x2_

Uma instrução _dup_x2_ é segura em termos de tipo se for uma _forma segura em termos de tipo_ da instrução _dup_x2_.
```
    instructionIsTypeSafe(dup_x2, Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        StackFrame = frame(Locals, InputOperandStack, Flags),
        dup_x2FormIsTypeSafe(Environment, InputOperandStack, OutputOperandStack),
        NextStackFrame = frame(Locals, OutputOperandStack, Flags),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

Uma instrução _dup_x2_ é uma _forma segura em termos de tipo_ da instrução _dup_x2_ se for uma instrução _dup_x2_ de _forma segura em termos de tipo 1_ ou uma instrução _dup_x2_ de _forma segura em termos de tipo 2_.
```
    dup_x2FormIsTypeSafe(Environment, InputOperandStack, OutputOperandStack) :-
        dup_x2Form1IsTypeSafe(Environment, InputOperandStack, OutputOperandStack).
    
    dup_x2FormIsTypeSafe(Environment, InputOperandStack, OutputOperandStack) :-
        dup_x2Form2IsTypeSafe(Environment, InputOperandStack, OutputOperandStack).
    
```

Uma instrução _dup_x2_ é uma instrução _dup_x2_ de _forma segura em termos de tipo 1_ se for possível substituir validamente três tipos de categoria 1, `Type1`, `Type2`, `Type3` na pilha de operandos de entrada pelos tipos `Type1`, `Type2`, `Type3`, `Type1`, resultando no estado de tipo de saída.
```
    dup_x2Form1IsTypeSafe(Environment, InputOperandStack, OutputOperandStack) :-
        popCategory1(InputOperandStack, Type1, Stack1),
        popCategory1(Stack1, Type2, Stack2),
        popCategory1(Stack2, Type3, Rest),
        canSafelyPushList(Environment, Rest, [Type1, Type3, Type2, Type1],
                          OutputOperandStack).
    
```

Uma instrução _dup_x2_ é uma instrução _dup_x2_ de _forma segura em termos de tipo 2_ se for possível substituir validamente um tipo de categoria 1, `Type1`, e um tipo de categoria 2, `Type2`, na pilha de operandos de entrada pelos tipos `Type1`, `Type2`, `Type1`, resultando no estado de tipo de saída.
```
    dup_x2Form2IsTypeSafe(Environment, InputOperandStack, OutputOperandStack) :-
        popCategory1(InputOperandStack, Type1, Stack1),
        popCategory2(Stack1, Type2, Rest),
        canSafelyPushList(Environment, Rest, [Type1, Type2, Type1],
                          OutputOperandStack).
    
```

##### _dup2_

Uma instrução _dup2_ é segura em termos de tipo se for uma _forma segura em termos de tipo_ da instrução _dup2_.
```
    instructionIsTypeSafe(dup2, Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        StackFrame = frame(Locals, InputOperandStack, Flags),
        dup2FormIsTypeSafe(Environment,InputOperandStack, OutputOperandStack),
        NextStackFrame = frame(Locals, OutputOperandStack, Flags),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

Uma instrução _dup2_ é uma _forma segura em termos de tipo_ da instrução _dup2_ se for uma instrução _dup2_ de _forma segura em termos de tipo 1_ ou uma instrução _dup2_ de _forma segura em termos de tipo 2_.
```
    dup2FormIsTypeSafe(Environment, InputOperandStack, OutputOperandStack) :-
        dup2Form1IsTypeSafe(Environment,InputOperandStack, OutputOperandStack).
    
    dup2FormIsTypeSafe(Environment, InputOperandStack, OutputOperandStack) :-
        dup2Form2IsTypeSafe(Environment,InputOperandStack, OutputOperandStack).
    
```

Uma instrução _dup2_ é uma instrução _dup2_ de _forma segura em termos de tipo 1_ se for possível substituir validamente dois tipos de categoria 1, `Type1` e `Type2` na pilha de operandos de entrada pelos tipos `Type1`, `Type2`, `Type1`, `Type2`, resultando no estado de tipo de saída.
```
    dup2Form1IsTypeSafe(Environment, InputOperandStack, OutputOperandStack):-
        popCategory1(InputOperandStack, Type1, TempStack),
        popCategory1(TempStack, Type2, _),
        canSafelyPushList(Environment, InputOperandStack, [Type2, Type1],
                          OutputOperandStack).
    
```

Uma instrução _dup2_ é uma instrução _dup2_ de _forma segura em termos de tipo 2_ se for possível substituir validamente um tipo de categoria 2, `Type` na pilha de operandos de entrada pelos tipos `Type`, `Type`, resultando no estado de tipo de saída.
```
    dup2Form2IsTypeSafe(Environment, InputOperandStack, OutputOperandStack):-
        popCategory2(InputOperandStack, Type, _),
        canSafelyPush(Environment, InputOperandStack, Type, OutputOperandStack).
    
```

##### _dup2_x1_

Uma instrução _dup2_x1_ é segura em termos de tipo se for uma _forma segura em termos de tipo_ da instrução _dup2_x1_.
```
    instructionIsTypeSafe(dup2_x1, Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        StackFrame = frame(Locals, InputOperandStack, Flags),
        dup2_x1FormIsTypeSafe(Environment, InputOperandStack, OutputOperandStack),
        NextStackFrame = frame(Locals, OutputOperandStack, Flags),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

Uma instrução _dup2_x1_ é uma _forma segura em termos de tipo_ da instrução _dup2_x1_ se for uma instrução _dup2_x1_ de _forma segura em termos de tipo 1_ ou uma instrução _dup_x2_ de _forma segura em termos de tipo 2_.
```
    dup2_x1FormIsTypeSafe(Environment, InputOperandStack, OutputOperandStack) :-
        dup2_x1Form1IsTypeSafe(Environment, InputOperandStack, OutputOperandStack).
    
    dup2_x1FormIsTypeSafe(Environment, InputOperandStack, OutputOperandStack) :-
        dup2_x1Form2IsTypeSafe(Environment, InputOperandStack, OutputOperandStack).
    
```

Uma instrução _dup2_x1_ é uma instrução _dup2_x1_ de _forma segura em termos de tipo 1_ se for possível substituir validamente três tipos de categoria 1, `Type1`, `Type2`, `Type3`, na pilha de operandos de entrada pelos tipos `Type1`, `Type2`, `Type3`, `Type1`, `Type2`, resultando no estado de tipo de saída.
```
    dup2_x1Form1IsTypeSafe(Environment, InputOperandStack, OutputOperandStack) :-
        popCategory1(InputOperandStack, Type1, Stack1),
        popCategory1(Stack1, Type2, Stack2),
        popCategory1(Stack2, Type3, Rest),
        canSafelyPushList(Environment, Rest, [Type2, Type1, Type3, Type2, Type1],
                          OutputOperandStack).
    
```

Uma instrução _dup2_x1_ é uma instrução _dup2_x1_ de _forma segura em termos de tipo 2_ se for possível substituir validamente um tipo de categoria 2, `Type1`, e um tipo de categoria 1, `Type2`, na pilha de operandos de entrada pelos tipos `Type1`, `Type2`, `Type1`, resultando no estado de tipo de saída.
```
    dup2_x1Form2IsTypeSafe(Environment, InputOperandStack, OutputOperandStack) :-
        popCategory2(InputOperandStack, Type1, Stack1),
        popCategory1(Stack1, Type2, Rest),
        canSafelyPushList(Environment, Rest, [Type1, Type2, Type1],
                          OutputOperandStack).
    
```

##### _dup2_x2_

Uma instrução _dup2_x2_ é segura em termos de tipo se for uma _forma segura em termos de tipo_ da instrução _dup2_x2_.
```
    instructionIsTypeSafe(dup2_x2, Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        StackFrame = frame(Locals, InputOperandStack, Flags),
        dup2_x2FormIsTypeSafe(Environment, InputOperandStack, OutputOperandStack),
        NextStackFrame = frame(Locals, OutputOperandStack, Flags),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

Uma instrução _dup2_x2_ é uma _forma segura em termos de tipo_ da instrução _dup2_x2_ se uma das seguintes condições for verdadeira:

  * for uma instrução _dup2_x2_ de _forma segura em termos de tipo 1_.

  * for uma instrução _dup2_x2_ de _forma segura em termos de tipo 2_.

  * for uma instrução _dup2_x2_ de _forma segura em termos de tipo 3_.

  * for uma instrução _dup2_x2_ de _forma segura em termos de tipo 4_.

```
    dup2_x2FormIsTypeSafe(Environment, InputOperandStack, OutputOperandStack) :-
        dup2_x2Form1IsTypeSafe(Environment, InputOperandStack, OutputOperandStack).
    
    dup2_x2FormIsTypeSafe(Environment, InputOperandStack, OutputOperandStack) :-
        dup2_x2Form2IsTypeSafe(Environment, InputOperandStack, OutputOperandStack).
    
    dup2_x2FormIsTypeSafe(Environment, InputOperandStack, OutputOperandStack) :-
        dup2_x2Form3IsTypeSafe(Environment, InputOperandStack, OutputOperandStack).
    
    dup2_x2FormIsTypeSafe(Environment, InputOperandStack, OutputOperandStack) :-
        dup2_x2Form4IsTypeSafe(Environment, InputOperandStack, OutputOperandStack).
    
```

Uma instrução _dup2_x2_ é uma instrução _dup2_x2_ de _forma segura em termos de tipo 1_ se for possível substituir validamente quatro tipos de categoria 1, `Type1`, `Type2`, `Type3`, `Type4`, na pilha de operandos de entrada pelos tipos `Type1`, `Type2`, `Type3`, `Type4`, `Type1`, `Type2`, resultando no estado de tipo de saída.
```
    dup2_x2Form1IsTypeSafe(Environment, InputOperandStack, OutputOperandStack) :-
        popCategory1(InputOperandStack, Type1, Stack1),
        popCategory1(Stack1, Type2, Stack2),
        popCategory1(Stack2, Type3, Stack3),
        popCategory1(Stack3, Type4, Rest),
        canSafelyPushList(Environment, Rest,
                          [Type2, Type1, Type4, Type3, Type2, Type1],
                          OutputOperandStack).
    
```

Uma instrução _dup2_x2_ é uma instrução _dup2_x2_ de _forma segura em termos de tipo 2_ se for possível substituir validamente um tipo de categoria 2, `Type1`, e dois tipos de categoria 1, `Type2`, `Type3`, na pilha de operandos de entrada pelos tipos `Type1`, `Type2`, `Type3`, `Type1`, resultando no estado de tipo de saída.
```
    dup2_x2Form2IsTypeSafe(Environment, InputOperandStack, OutputOperandStack) :-
        popCategory2(InputOperandStack, Type1, Stack1),
        popCategory1(Stack1, Type2, Stack2),
        popCategory1(Stack2, Type3, Rest),
        canSafelyPushList(Environment, Rest,
                          [Type1, Type3, Type2, Type1],
                          OutputOperandStack).
    
```

Uma instrução _dup2_x2_ é uma instrução _dup2_x2_ de _forma segura em termos de tipo 3_ se for possível substituir validamente dois tipos de categoria 1, `Type1`, `Type2`, e um tipo de categoria 2, `Type3`, na pilha de operandos de entrada pelos tipos `Type1`, `Type2`, `Type3`, `Type1`, `Type2`, resultando no estado de tipo de saída.
    dup2_x2Form3IsTypeSafe(Environment, InputOperandStack, OutputOperandStack) :-
        popCategory1(InputOperandStack, Type1, Stack1),
        popCategory1(Stack1, Type2, Stack2),
        popCategory2(Stack2, Type3, Rest),
        canSafelyPushList(Environment, Rest,
                          [Type2, Type1, Type3, Type2, Type1],
                          OutputOperandStack).
    
```

Uma instrução _dup2_x2_ é uma instrução _dup2_x2_ _type safe form 4_ se for possível substituir validamente dois tipos de categoria 2, `Type1`, `Type2`, na pilha de operandos de entrada pelos tipos `Type1`, `Type2`, `Type1`, resultando no estado de tipo de saída.
```
    dup2_x2Form4IsTypeSafe(Environment, InputOperandStack, OutputOperandStack) :-
        popCategory2(InputOperandStack, Type1, Stack1),
        popCategory2(Stack1, Type2, Rest),
        canSafelyPushList(Environment, Rest, [Type1, Type2, Type1],
                          OutputOperandStack).
    
```

##### _f2d_ , _f2i_ , _f2l_

Uma instrução _f2d_ é type safe se for possível remover validamente `float` da pilha de operandos de entrada e substituí-lo por `double`, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(f2d, Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        validTypeTransition(Environment, [float], double,
                            StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

Uma instrução _f2i_ é type safe se for possível remover validamente `float` da pilha de operandos de entrada e substituí-lo por `int`, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(f2i, Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        validTypeTransition(Environment, [float], int,
                            StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

Uma instrução _f2l_ é type safe se for possível remover validamente `float` da pilha de operandos de entrada e substituí-lo por `long`, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(f2l, Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        validTypeTransition(Environment, [float], long,
                            StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

##### _fadd_

Uma instrução _fadd_ é type safe se for possível substituir validamente tipos que correspondam a `float` e `float` na pilha de operandos de entrada por `float`, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(fadd, Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        validTypeTransition(Environment, [float, float], float,
                            StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

##### _faload_

Uma instrução _faload_ é type safe se for possível substituir validamente tipos que correspondam a `int` e array de `float` na pilha de operandos de entrada por `float`, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(faload, Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        validTypeTransition(Environment, [int, arrayOf(float)], float,
                            StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

##### _fastore_

Uma instrução _fastore_ é type safe se for possível remover validamente tipos que correspondam a `float`, `int` e array de `float` da pilha de operandos de entrada, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(fastore, _Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        canPop(StackFrame, [float, int, arrayOf(float)], NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

##### _fcmp <op>_

Uma instrução _fcmpg_ é type safe se for possível substituir validamente tipos que correspondam a `float` e `float` na pilha de operandos de entrada por `int`, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(fcmpg, Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        validTypeTransition(Environment, [float, float], int,
                            StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

Uma instrução _fcmpl_ é type safe se a instrução _fcmpg_ equivalente for type safe.
```
    instructionHasEquivalentTypeRule(fcmpl, fcmpg).
    
```

##### _fconst_ <f>_

Uma instrução _fconst_0_ é type safe se for possível empurrar validamente o tipo `float` para a pilha de operandos de entrada, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(fconst_0, Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        validTypeTransition(Environment, [], float, StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

As regras para as outras variantes de _fconst_ são equivalentes.
```
    instructionHasEquivalentTypeRule(fconst_1, fconst_0).
    instructionHasEquivalentTypeRule(fconst_2, fconst_0).
    
```

##### _fdiv_

Uma instrução _fdiv_ é type safe se a instrução _fadd_ equivalente for type safe.
```
    instructionHasEquivalentTypeRule(fdiv, fadd).
    
```

##### _fload_ , _fload_ <n>_

Uma instrução _fload_ com operando `Index` é type safe e resulta em um estado de tipo de saída `NextStackFrame`, se uma instrução de carregamento com operando `Index` e tipo `float` for type safe e resultar em um estado de tipo de saída `NextStackFrame`.
```
    instructionIsTypeSafe(fload(Index), Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        loadIsTypeSafe(Environment, Index, float, StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

As instruções _fload_ <n>_, para 0 ≤ _n_ ≤ 3, são typesafe se a instrução _fload_ equivalente for type safe.
```
    instructionHasEquivalentTypeRule(fload_0, fload(0)).
    instructionHasEquivalentTypeRule(fload_1, fload(1)).
    instructionHasEquivalentTypeRule(fload_2, fload(2)).
    instructionHasEquivalentTypeRule(fload_3, fload(3)).
    
```

##### _fmul_

Uma instrução _fmul_ é type safe se a instrução _fadd_ equivalente for type safe.
```
    instructionHasEquivalentTypeRule(fmul, fadd).
    
```

##### _fneg_

Uma instrução _fneg_ é type safe se houver um tipo que corresponda a `float` na pilha de operandos de entrada. A instrução _fneg_ não altera o estado de tipo.
```
    instructionIsTypeSafe(fneg, Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        validTypeTransition(Environment, [float], float,
                            StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

##### _frem_

Uma instrução _frem_ é type safe se a instrução _fadd_ equivalente for type safe.
```
    instructionHasEquivalentTypeRule(frem, fadd).
    
```

##### _freturn_

Uma instrução _freturn_ é type safe se o método que a contém tiver um tipo de retorno declarado de `float`, e for possível remover validamente um tipo que corresponda a `float` da pilha de operandos de entrada.
```
    instructionIsTypeSafe(freturn, Environment, _Offset, StackFrame,
                          afterGoto, ExceptionStackFrame) :-
        thisMethodReturnType(Environment, float),
        canPop(StackFrame, [float], _PoppedStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

##### _fstore_ , _fstore_ <n>_

Uma instrução _fstore_ com operando `Index` é type safe e resulta em um estado de tipo de saída `NextStackFrame`, se uma instrução de armazenamento com operando `Index` e tipo `float` for type safe e resultar em um estado de tipo de saída `NextStackFrame`.
```
    instructionIsTypeSafe(fstore(Index), Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        storeIsTypeSafe(Environment, Index, float, StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

As instruções _fstore_ <n>_, para 0 ≤ _n_ ≤ 3, são typesafe se a instrução _fstore_ equivalente for type safe.
```
    instructionHasEquivalentTypeRule(fstore_0, fstore(0)).
    instructionHasEquivalentTypeRule(fstore_1, fstore(1)).
    instructionHasEquivalentTypeRule(fstore_2, fstore(2)).
    instructionHasEquivalentTypeRule(fstore_3, fstore(3)).
    
```

##### _fsub_

Uma instrução _fsub_ é type safe se a instrução _fadd_ equivalente for type safe.
```
    instructionHasEquivalentTypeRule(fsub, fadd).
    
```

##### _getfield_

Uma instrução _getfield_ com operando `CP` é type safe se `CP` se referir a uma entrada da constant pool que denota um campo cujo tipo declarado é `FieldType` que é membro de um tipo `FieldClassType`, e for possível substituir validamente `FieldClassType` por `FieldType` na pilha de operandos de entrada, resultando no estado de tipo de saída. Campos `protected` estão sujeitos a verificações adicionais (§4.10.1.8).
```
    instructionIsTypeSafe(getfield(CP), Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        CP = field(FieldClassType, FieldName, FieldDescriptor),
        parseFieldDescriptor(FieldDescriptor, FieldType),
        passesProtectedCheck(Environment, FieldClassType, FieldName,
                             FieldDescriptor, StackFrame),
        validTypeTransition(Environment, [FieldClassType], FieldType,
                            StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

##### _getstatic_

Uma instrução _getstatic_ com operando `CP` é type safe se `CP` se referir a uma entrada da constant pool que denota um campo cujo tipo declarado é `FieldType`, e for possível empurrar validamente `FieldType` para a pilha de operandos de entrada, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(getstatic(CP), Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        CP = field(_FieldClassType, _FieldName, FieldDescriptor),
        parseFieldDescriptor(FieldDescriptor, FieldType),
        validTypeTransition(Environment, [], FieldType,
                            StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

##### _goto_ , _goto_w_

Uma instrução _goto_ é type safe se seu operando de destino for um alvo de branch válido.
```
    instructionIsTypeSafe(goto(Target), Environment, _Offset, StackFrame,
                          afterGoto, ExceptionStackFrame) :-
        targetIsTypeSafe(Environment, StackFrame, Target),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

Uma instrução _goto_w_ é type safe se a instrução _goto_ equivalente for type safe.
```
    instructionHasEquivalentTypeRule(goto_w(Target), goto(Target)).
    
```

##### _i2b_ , _i2c_ , _i2d_ , _i2f_ , _i2l_ , _i2s_

Uma instrução _i2b_ é type safe se a instrução _ineg_ equivalente for type safe.
```
    instructionHasEquivalentTypeRule(i2b, ineg).
    
```

Uma instrução _i2c_ é type safe se a instrução _ineg_ equivalente for type safe.
```
    instructionHasEquivalentTypeRule(i2c, ineg).
    
```

Uma instrução _i2d_ é type safe se for possível remover validamente `int` da pilha de operandos de entrada e substituí-lo por `double`, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(i2d, Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        validTypeTransition(Environment, [int], double,
                            StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

Uma instrução _i2f_ é type safe se for possível remover validamente `int` da pilha de operandos de entrada e substituí-lo por `float`, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(i2f, Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        validTypeTransition(Environment, [int], float,
                            StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

Uma instrução _i2l_ é type safe se for possível remover validamente `int` da pilha de operandos de entrada e substituí-lo por `long`, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(i2l, Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        validTypeTransition(Environment, [int], long,
                            StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

Uma instrução _i2s_ é type safe se a instrução _ineg_ equivalente for type safe.
```
    instructionHasEquivalentTypeRule(i2s, ineg).
    
```

##### _iadd_

Uma instrução _iadd_ é type safe se for possível substituir validamente tipos que correspondam a `int` e `int` na pilha de operandos de entrada por `int`, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(iadd, Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        validTypeTransition(Environment, [int, int], int,
                            StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

##### _iaload_

Uma instrução _iaload_ é type safe se for possível substituir validamente tipos que correspondam a `int` e array de `int` na pilha de operandos de entrada por `int`, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(iaload, Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        validTypeTransition(Environment, [int, arrayOf(int)], int,
                            StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

##### _iand_

Uma instrução _iand_ é type safe se a instrução _iadd_ equivalente for type safe.
```
    instructionHasEquivalentTypeRule(iand, iadd).
    
```

##### _iastore_

Uma instrução _iastore_ é type safe se for possível remover validamente tipos que correspondam a `int`, `int` e array de `int` da pilha de operandos de entrada, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(iastore, _Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        canPop(StackFrame, [int, int, arrayOf(int)], NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

##### _iconst_ <i>_

Uma instrução _iconst_m1_ é type safe se for possível empurrar validamente o tipo `int` para a pilha de operandos de entrada, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(iconst_m1, Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        validTypeTransition(Environment, [], int, StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

As regras para as outras variantes de _iconst_ são equivalentes.
```
    instructionHasEquivalentTypeRule(iconst_0, iconst_m1).
    instructionHasEquivalentTypeRule(iconst_1, iconst_m1).
    instructionHasEquivalentTypeRule(iconst_2, iconst_m1).
    instructionHasEquivalentTypeRule(iconst_3, iconst_m1).
    instructionHasEquivalentTypeRule(iconst_4, iconst_m1).
    instructionHasEquivalentTypeRule(iconst_5, iconst_m1).
    
```

##### _idiv_

Uma instrução _idiv_ é type safe se a instrução _iadd_ equivalente for type safe.
```
    instructionHasEquivalentTypeRule(idiv, iadd).
    
```

##### _if_acmp <cond>_

Uma instrução _if_acmpeq_ é type safe se for possível remover validamente tipos que correspondam a `reference` e `reference` da pilha de operandos de entrada, resultando no estado de tipo de saída `NextStackFrame`, e o operando da instrução, `Target`, for um alvo de branch válido, assumindo um estado de tipo de entrada de `NextStackFrame`.
```
    instructionIsTypeSafe(if_acmpeq(Target), Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        canPop(StackFrame, [reference, reference], NextStackFrame),
        targetIsTypeSafe(Environment, NextStackFrame, Target),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

A regra para _if_acmpne_ é idêntica.
```
    instructionHasEquivalentTypeRule(if_acmpne(Target), if_acmpeq(Target)).
    
```

##### _if_icmp <cond>_

Uma instrução _if_icmpeq_ é type safe se for possível remover validamente tipos que correspondam a `int` e `int` da pilha de operandos de entrada, resultando no estado de tipo de saída `NextStackFrame`, e o operando da instrução, `Target`, for um alvo de branch válido, assumindo um estado de tipo de entrada de `NextStackFrame`.
```
    instructionIsTypeSafe(if_icmpeq(Target), Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        canPop(StackFrame, [int, int], NextStackFrame),
        targetIsTypeSafe(Environment, NextStackFrame, Target),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

As regras para todas as outras variantes da instrução _if_icmp <cond>_ são idênticas.
```
    instructionHasEquivalentTypeRule(if_icmpge(Target), if_icmpeq(Target)).
    instructionHasEquivalentTypeRule(if_icmpgt(Target), if_icmpeq(Target)).
    instructionHasEquivalentTypeRule(if_icmple(Target), if_icmpeq(Target)).
    instructionHasEquivalentTypeRule(if_icmplt(Target), if_icmpeq(Target)).
    instructionHasEquivalentTypeRule(if_icmpne(Target), if_icmpeq(Target)).
    
```

##### _if <cond>_

Uma instrução _ifeq_ é type safe se for possível remover validamente um tipo que corresponda a `int` da pilha de operandos de entrada, resultando no estado de tipo de saída `NextStackFrame`, e o operando da instrução, `Target`, for um alvo de branch válido, assumindo um estado de tipo de entrada de `NextStackFrame`.
```
    instructionIsTypeSafe(ifeq(Target), Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        canPop(StackFrame, [int], NextStackFrame),
        targetIsTypeSafe(Environment, NextStackFrame, Target),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

As regras para todas as outras variações da instrução _if <cond>_ são idênticas.
```
    instructionHasEquivalentTypeRule(ifge(Target), ifeq(Target)).
    instructionHasEquivalentTypeRule(ifgt(Target), ifeq(Target)).
    instructionHasEquivalentTypeRule(ifle(Target), ifeq(Target)).
    instructionHasEquivalentTypeRule(iflt(Target), ifeq(Target)).
    instructionHasEquivalentTypeRule(ifne(Target), ifeq(Target)).
    
```

##### _ifnonnull_ , _ifnull_

Uma instrução _ifnonnull_ é type safe se for possível remover validamente um tipo que corresponda a `reference` da pilha de operandos de entrada, resultando no estado de tipo de saída `NextStackFrame`, e o operando da instrução, `Target`, for um alvo de branch válido, assumindo um estado de tipo de entrada de `NextStackFrame`.
```
    instructionIsTypeSafe(ifnonnull(Target), Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        canPop(StackFrame, [reference], NextStackFrame),
        targetIsTypeSafe(Environment, NextStackFrame, Target),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

Uma instrução _ifnull_ é type safe se a instrução _ifnonnull_ equivalente for type safe.
```
    instructionHasEquivalentTypeRule(ifnull(Target), ifnonnull(Target)).
    
```

##### _iinc_

Uma instrução _iinc_ com o primeiro operando `Index` é type safe se `LIndex` tiver o tipo `int`. A instrução _iinc_ não altera o estado de tipo.
```
    instructionIsTypeSafe(iinc(Index, _Value), _Environment, _Offset,
                          StackFrame, StackFrame, ExceptionStackFrame) :-
        StackFrame = frame(Locals, _OperandStack, _Flags),
        nth0(Index, Locals, int),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

##### _iload_ , _iload_ <n>_

Uma instrução _iload_ com operando `Index` é type safe e resulta em um estado de tipo de saída `NextStackFrame`, se uma instrução de carregamento com operando `Index` e tipo `int` for type safe e resultar em um estado de tipo de saída `NextStackFrame`.
```
    instructionIsTypeSafe(iload(Index), Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        loadIsTypeSafe(Environment, Index, int, StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

As instruções _iload_ <n>_, para 0 ≤ _n_ ≤ 3, são typesafe se a instrução _iload_ equivalente for type safe.
```
    instructionHasEquivalentTypeRule(iload_0, iload(0)).
    instructionHasEquivalentTypeRule(iload_1, iload(1)).
    instructionHasEquivalentTypeRule(iload_2, iload(2)).
    instructionHasEquivalentTypeRule(iload_3, iload(3)).
    
```

##### _imul_

Uma instrução _imul_ é type safe se a instrução _iadd_ equivalente for type safe.
```
    instructionHasEquivalentTypeRule(imul, iadd).
    
```

##### _ineg_

Uma instrução _ineg_ é type safe se houver um tipo que corresponda a `int` na pilha de operandos de entrada. A instrução _ineg_ não altera o estado de tipo.
```
    instructionIsTypeSafe(ineg, Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        validTypeTransition(Environment, [int], int, StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

##### _instanceof_

Uma instrução _instanceof_ com operando `CP` é type safe se `CP` se referir a uma entrada da constant pool que denota uma classe ou um array, e for possível substituir validamente o tipo `Object` no topo da pilha de operandos de entrada pelo tipo `int`, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(instanceof(CP), Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        (CP = class(_, _) ; CP = arrayOf(_)),
        isBootstrapLoader(BL),
        validTypeTransition(Environment, [class('java/lang/Object', BL)], int,
                            StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

##### _invokedynamic_

Uma instrução _invokedynamic_ é type safe se todas as seguintes condições forem verdadeiras:

  * Seu primeiro operando, `CP`, se refere a uma entrada da constant pool que denota um call site dinâmico com o nome `CallSiteName` e com o descritor `Descriptor`.

  * `CallSiteName` não é `<init>`.

  * `CallSiteName` não é `<clinit>`.

  * É possível substituir validamente os tipos que correspondem aos tipos de argumento fornecidos em `Descriptor` na pilha de operandos de entrada pelo tipo de retorno fornecido em `Descriptor`, resultando no estado de tipo de saída.

```
    instructionIsTypeSafe(invokedynamic(CP,0,0), Environment, _Offset,
                          StackFrame, NextStackFrame, ExceptionStackFrame) :-
        CP = dmethod(CallSiteName, Descriptor),
        CallSiteName \= '<init>',
        CallSiteName \= '<clinit>',
        parseMethodDescriptor(Descriptor, OperandArgList, ReturnType),
        reverse(OperandArgList, StackArgList),
        validTypeTransition(Environment, StackArgList, ReturnType,
                            StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

##### _invokeinterface_

Uma instrução _invokeinterface_ é type safe se todas as seguintes condições forem verdadeiras:

  * Seu primeiro operando, `CP`, se refere a uma entrada da constant pool que denota um método de interface com o descritor `Descriptor` que é membro de um tipo `MethodClassType`.

  * `MethodName` não é `<init>`.

  * `MethodName` não é `<clinit>`.

  * Seu segundo operando, `Count`, é um operando de contagem válido (veja abaixo).

  * É possível substituir validamente os tipos que correspondem a `MethodClassType` e aos tipos de argumento fornecidos em `Descriptor` na pilha de operandos de entrada pelo tipo de retorno fornecido em `Descriptor`, resultando no estado de tipo de saída.

```
    instructionIsTypeSafe(invokeinterface(CP, Count, 0), Environment, _Offset,
                          StackFrame, NextStackFrame, ExceptionStackFrame) :-
        CP = imethod(MethodClassType, MethodName, Descriptor),
        MethodName \= '<init>',
        MethodName \= '<clinit>',
        parseMethodDescriptor(Descriptor, OperandArgList, ReturnType),
        reverse([MethodClassType | OperandArgList], StackArgList),
        canPop(StackFrame, StackArgList, TempFrame),
        validTypeTransition(Environment, [], ReturnType,
                            TempFrame, NextStackFrame),
        countIsValid(Count, StackFrame, TempFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
```

O operando `Count` de uma instrução _invokeinterface_ é válido se for igual ao tamanho dos argumentos da instrução. Isso é igual à diferença entre o tamanho de `InputFrame` e `OutputFrame`.
```
    countIsValid(Count, InputFrame, OutputFrame) :-
        InputFrame = frame(_Locals1, OperandStack1, _Flags1),
        OutputFrame = frame(_Locals2, OperandStack2, _Flags2),
        length(OperandStack1, Length1),
        length(OperandStack2, Length2),
        Count =:= Length1 - Length2.
    
```

##### _invokespecial_

Uma instrução _invokespecial_ é type safe se todas as seguintes condições forem verdadeiras:

  * Seu primeiro operando, `CP`, se refere a uma entrada da constant pool que denota um método chamado `MethodName` com o descritor `Descriptor` que é membro de um tipo `MethodClassType`.

  * Ou:

    * `MethodName` não é `<init>`.

    * `MethodName` não é `<clinit>`.

    * `MethodClassType` é a classe atual, uma superclasse da classe atual, ou uma superinterface direta da classe atual.

    * É possível substituir validamente os tipos que correspondem à classe atual e aos tipos de argumento fornecidos em `Descriptor` na pilha de operandos de entrada pelo tipo de retorno fornecido em `Descriptor`, resultando no estado de tipo de saída.

```
    instructionIsTypeSafe(invokespecial(CP), Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        (CP = method(MethodClassType, MethodName, Descriptor) ;
         CP = imethod(MethodClassType, MethodName, Descriptor)),
        MethodName \= '<init>',
        MethodName \= '<clinit>',
        validSpecialMethodClassType(Environment, MethodClassType),
        parseMethodDescriptor(Descriptor, OperandArgList, ReturnType),
        thisType(Environment, ThisType),
        reverse([ThisType | OperandArgList], StackArgList),
        validTypeTransition(Environment, StackArgList, ReturnType,
                            StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
    
    validSpecialMethodClassType(Environment, class(MethodClassName, _)) :-
        thisClass(Environment, ThisClass),
        classClassName(ThisClass, MethodClassName).
    
    validSpecialMethodClassType(Environment, class(MethodClassName, L)) :-
        thisClass(Environment, ThisClass),
        loadedSuperclasses(ThisClass, Supers),
        member(Super, Supers),
        classClassName(Super, MethodClassName),
        loadedClass(MethodClassName, L, Super).
    
    validSpecialMethodClassType(Environment, class(MethodClassName, _)) :-
        thisClass(Environment, ThisClass),
        classInterfaceNames(ThisClass, InterfaceNames),
        member(MethodClassName, InterfaceNames).
    
```

A cláusula `validSpecialMethodClassType` impõe a restrição estrutural de que _invokespecial_, para métodos que não sejam de inicialização de instância, deve nomear um método na classe/interface atual ou em uma superclasse/superinterface.

A cláusula `validTypeTransition` impõe a restrição estrutural de que _invokespecial_, para métodos que não sejam de inicialização de instância, tem como alvo um objeto receptor da classe atual ou mais profundo. Para entender o porquê, considere que `StackArgList` simula a lista de tipos na pilha de operandos esperada pelo método, começando com a classe atual (a classe que executa _invokespecial_). Os tipos reais na pilha de operandos estão em `StackFrame`. O efeito de `validTypeTransition` é remover o primeiro tipo da pilha de operandos em `StackFrame` e verificar se ele é um subtipo do primeiro termo de `StackArgList`, ou seja, a classe atual. Assim, o tipo receptor real é compatível com a classe atual.

Um leitor atento pode notar que a imposição desta restrição estrutural substitui a restrição estrutural referente a _invokespecial_ de um método `protected`. Assim, o código Prolog acima não faz referência a `passesProtectedCheck` (§4.10.1.8), enquanto o código Prolog para _invokespecial_ de um método de inicialização de instância usa `passesProtectedCheck` para garantir que o tipo receptor real seja compatível com a classe atual quando certos métodos de inicialização de instância `protected` são nomeados.

  * Ou:

    * MethodName é `<init>`.

    * `Descriptor` especifica um tipo de retorno `void`.

    * É possível remover validamente tipos que correspondam aos tipos de argumento fornecidos em `Descriptor` e `uninitializedThis` da pilha de operandos de entrada, resultando em `OperandStack`.

    * `MethodClassType` é a classe atual ou a superclasse direta da classe atual.

    * O estado de tipo de saída é derivado do estado de tipo de entrada, primeiro substituindo a pilha de operandos de entrada por `OperandStack` e depois substituindo todas as instâncias de `uninitializedThis` pelo tipo da classe atual.

```
    instructionIsTypeSafe(invokespecial(CP), Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        (CP = method(MethodClassType, '<init>', Descriptor) ;
         CP = imethod(MethodClassType, '<init>', Descriptor)),
        parseMethodDescriptor(Descriptor, OperandArgList, void),
        reverse([uninitializedThis | OperandArgList], StackArgList),
        canPop(StackFrame, StackArgList, frame(Locals, OperandStack, Flags)),
        validThisInitClassType(Environment, MethodClassType),
        thisType(Environment, This),
        substitute(uninitializedThis, This, OperandStack, NextOperandStack),
        substitute(uninitializedThis, This, Locals, NextLocals),
        substitute(uninitializedThis, top, Locals, ExceptionLocals),
        NextStackFrame = frame(NextLocals, NextOperandStack, []),
        ExceptionStackFrame = frame(ExceptionLocals, [], Flags).
    
    validThisInitClassType(Environment, class(MethodClassName, _)) :-
        thisClass(Environment, ThisClass),
        classClassName(ThisClass, MethodClassName).
    
    validThisInitClassType(Environment, class(MethodClassName, _)) :-
        thisClass(Environment, ThisClass),
        classSuperClassName(ThisClass, MethodClassName).
    
    substitute(_Old, _New, [], []).
    substitute(Old, New, [Old | FromRest], [New | ToRest]) :-
        substitute(Old, New, FromRest, ToRest).
    substitute(Old, New, [From1 | FromRest], [From1 | ToRest]) :-
        From1 \= Old,
        substitute(Old, New, FromRest, ToRest).
    
```

  * Ou:

    * MethodName é `<init>`.

    * `Descriptor` especifica um tipo de retorno `void`.

    * É possível remover validamente tipos que correspondam aos tipos de argumento fornecidos em `Descriptor` e um tipo não inicializado, `uninitialized(Address)`, da pilha de operandos de entrada, resultando em `OperandStack`.

    * A instrução em `Address` criou um novo `MethodClassType`.

    * O estado de tipo de saída é derivado do estado de tipo de entrada, primeiro substituindo a pilha de operandos de entrada por `OperandStack` e depois substituindo todas as instâncias de `uninitialized(Address)` por `MethodClassType`.

    * Se o método for `protected`, o uso está em conformidade com as regras especiais que regem o acesso a membros `protected` (§4.10.1.8).
```
    instructionIsTypeSafe(invokespecial(CP), Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        (CP = method(MethodClassType, '<init>', Descriptor) ;
         CP = imethod(MethodClassType, '<init>', Descriptor)),
        parseMethodDescriptor(Descriptor, OperandArgList, void),
        reverse([uninitialized(Address) | OperandArgList], StackArgList),
        canPop(StackFrame, StackArgList, frame(Locals, OperandStack, Flags)),
        allInstructions(Environment, Instructions),
        member(instruction(Address, new(MethodClassType)), Instructions),
        substitute(uninitialized(Address), MethodClassType,
                   OperandStack, NextOperandStack),
        substitute(uninitialized(Address), MethodClassType, Locals, NextLocals),
        substitute(uninitialized(Address), top, Locals, ExceptionLocals),
        NextStackFrame = frame(NextLocals, NextOperandStack, Flags),
        ExceptionStackFrame = frame(ExceptionLocals, [], Flags),
        passesProtectedCheck(Environment, MethodClassType, '<init>',
                             Descriptor, NextStackFrame).
```

A regra para `_invokespecial_` de um método `<init>` é a única motivação para retornar um `exception stack frame` distinto. A preocupação é que, ao inicializar um objeto, a invocação `_invokespecial_` pode falhar, deixando o objeto em um estado parcialmente inicializado e permanentemente inutilizável. Para evitar tentativas repetidas de inicialização após um objeto falhar na primeira inicialização, um `exception handler` deve considerar quaisquer referências ao objeto armazenadas em variáveis locais como tendo o tipo `top` em vez de `uninitializedThis` ou `uninitialized(Offset)`.

No caso especial de inicializar o objeto atual (ou seja, ao invocar `<init>` para o tipo `uninitializedThis`), o `frame` original tipicamente mantém um objeto não inicializado na variável local 0 e possui a `flag` `flagThisUninit`. A terminação normal de `_invokespecial_` inicializa o objeto não inicializado e desativa a `flag` `flagThisUninit`. Mas se a invocação `_invokespecial_` lançar uma exceção, o `exception frame` contém o objeto quebrado (com o tipo `top`) e a `flag` `flagThisUninit` (a `flag` antiga). Não há como executar uma instrução de retorno dado esse estado de tipo, então o `handler` teria que lançar outra exceção (ou entrar em loop para sempre). Na verdade, nem é possível expressar um `handler` com esse estado de tipo, porque não há como um `stack frame`, conforme expresso pelo atributo `StackMapTable` (§4.7.4), carregar `flagThisUninit` sem qualquer uso acompanhante do tipo `uninitializedThis`.

Se não fossem essas restrições especiais na inicialização de objetos, os tipos de variáveis locais e as `flags` do `exception stack frame` seriam sempre os mesmos que os tipos de variáveis locais e as `flags` do `input stack frame`.

##### _invokestatic_

Uma instrução `_invokestatic_` é `type safe` se todas as seguintes condições forem verdadeiras:

  * Seu primeiro operando, `CP`, refere-se a uma entrada da `constant pool` que denota um método chamado `MethodName` com `descriptor` `Descriptor`.

  * `MethodName` não é `<init>`.

  * `MethodName` não é `<clinit>`.

  * Pode-se substituir validamente os tipos que correspondem aos tipos de argumento fornecidos em `Descriptor` na `operand stack` de entrada pelo tipo de retorno fornecido em `Descriptor`, resultando no estado de tipo de saída.

```
    instructionIsTypeSafe(invokestatic(CP), Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        (CP = method(_MethodClassType, MethodName, Descriptor) ;
         CP = imethod(_MethodClassType, MethodName, Descriptor)),
        MethodName \= '<init>',
        MethodName \= '<clinit>',
        parseMethodDescriptor(Descriptor, OperandArgList, ReturnType),
        reverse(OperandArgList, StackArgList),
        validTypeTransition(Environment, StackArgList, ReturnType,
                            StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
```

##### _invokevirtual_

Uma instrução `_invokevirtual_` é `type safe` se todas as seguintes condições forem verdadeiras:

  * Seu primeiro operando, `CP`, refere-se a uma entrada da `constant pool` que denota um método chamado `MethodName` com `descriptor` `Descriptor` que é membro de um tipo `MethodClassType`.

  * `MethodName` não é `<init>`.

  * `MethodName` não é `<clinit>`.

  * Pode-se substituir validamente os tipos que correspondem a `MethodClassType` e aos tipos de argumento fornecidos em `Descriptor` na `operand stack` de entrada pelo tipo de retorno fornecido em `Descriptor`, resultando no estado de tipo de saída.

  * Se o método for `protected`, o uso está em conformidade com as regras especiais que regem o acesso a membros `protected` (§4.10.1.8).

```
    instructionIsTypeSafe(invokevirtual(CP), Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        CP = method(MethodClassType, MethodName, Descriptor),
        MethodName \= '<init>',
        MethodName \= '<clinit>',
        parseMethodDescriptor(Descriptor, OperandArgList, ReturnType),
        reverse(OperandArgList, ArgList),
        reverse([MethodClassType | OperandArgList], StackArgList),
        validTypeTransition(Environment, StackArgList, ReturnType,
                            StackFrame, NextStackFrame),
        canPop(StackFrame, ArgList, PoppedFrame),
        passesProtectedCheck(Environment, MethodClassType, MethodName,
                             Descriptor, PoppedFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
```

##### _ior_ , _irem_

Uma instrução `_ior_` é `type safe` se a instrução `_iadd_` equivalente for `type safe`.
```
    instructionHasEquivalentTypeRule(ior, iadd).
```

Uma instrução `_irem_` é `type safe` se a instrução `_iadd_` equivalente for `type safe`.
```
    instructionHasEquivalentTypeRule(irem, iadd).
```

##### _ireturn_

Uma instrução `_ireturn_` é `type safe` se o método que a contém tiver um tipo de retorno declarado como `int`, e for possível remover validamente um tipo que corresponda a `int` da `operand stack` de entrada.
```
    instructionIsTypeSafe(ireturn, Environment, _Offset, StackFrame,
                          afterGoto, ExceptionStackFrame) :-
        thisMethodReturnType(Environment, int),
        canPop(StackFrame, [int], _PoppedStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
```

##### _ishl_ , _ishr_ , _iushr_

Uma instrução `_ishl_` é `type safe` se a instrução `_iadd_` equivalente for `type safe`.
```
    instructionHasEquivalentTypeRule(ishl, iadd).
```

Uma instrução `_ishr_` é `type safe` se a instrução `_iadd_` equivalente for `type safe`.
```
    instructionHasEquivalentTypeRule(ishr, iadd).
```

Uma instrução `_iushr_` é `type safe` se a instrução `_iadd_` equivalente for `type safe`.
```
    instructionHasEquivalentTypeRule(iushr, iadd).
```

##### _istore_ , _istore_ <n>_

Uma instrução `_istore_` com operando `Index` é `type safe` e produz um estado de tipo de saída `NextStackFrame`, se uma instrução de armazenamento com operando `Index` e tipo `int` for `type safe` e produzir um estado de tipo de saída `NextStackFrame`.
```
    instructionIsTypeSafe(istore(Index), Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        storeIsTypeSafe(Environment, Index, int, StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
```

As instruções `_istore_ <n>_`, para 0 ≤ `_n_` ≤ 3, são `type safe` se a instrução `_istore_` equivalente for `type safe`.
```
    instructionHasEquivalentTypeRule(istore_0, istore(0)).
    instructionHasEquivalentTypeRule(istore_1, istore(1)).
    instructionHasEquivalentTypeRule(istore_2, istore(2)).
    instructionHasEquivalentTypeRule(istore_3, istore(3)).
```

##### _isub_ , _ixor_

Uma instrução `_isub_` é `type safe` se a instrução `_iadd_` equivalente for `type safe`.
```
    instructionHasEquivalentTypeRule(isub, iadd).
```

Uma instrução `_ixor_` é `type safe` se a instrução `_iadd_` equivalente for `type safe`.
```
    instructionHasEquivalentTypeRule(ixor, iadd).
```

##### _l2d_ , _l2f_ , _l2i_

Uma instrução `_l2d_` é `type safe` se for possível remover validamente `long` da `operand stack` de entrada e substituí-lo por `double`, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(l2d, Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        validTypeTransition(Environment, [long], double,
                            StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
```

Uma instrução `_l2f_` é `type safe` se for possível remover validamente `long` da `operand stack` de entrada e substituí-lo por `float`, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(l2f, Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        validTypeTransition(Environment, [long], float,
                            StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
```

Uma instrução `_l2i_` é `type safe` se for possível remover validamente `long` da `operand stack` de entrada e substituí-lo por `int`, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(l2i, Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        validTypeTransition(Environment, [long], int,
                            StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
```

##### _ladd_

Uma instrução `_ladd_` é `type safe` se for possível substituir validamente os tipos que correspondem a `long` e `long` na `operand stack` de entrada por `long`, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(ladd, Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        validTypeTransition(Environment, [long, long], long,
                            StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
```

##### _laload_

Uma instrução `_laload_` é `type safe` se for possível substituir validamente os tipos que correspondem a `int` e `array de long` na `operand stack` de entrada por `long`, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(laload, Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        validTypeTransition(Environment, [int, arrayOf(long)], long,
                            StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
```

##### _land_

Uma instrução `_land_` é `type safe` se a instrução `_ladd_` equivalente for `type safe`.
```
    instructionHasEquivalentTypeRule(land, ladd).
```

##### _lastore_

Uma instrução `_lastore_` é `type safe` se for possível remover validamente os tipos que correspondem a `long`, `int` e `array de long` da `operand stack` de entrada, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(lastore, _Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        canPop(StackFrame, [long, int, arrayOf(long)], NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
```

##### _lcmp_

Uma instrução `_lcmp_` é `type safe` se for possível substituir validamente os tipos que correspondem a `long` e `long` na `operand stack` de entrada por `int`, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(lcmp, Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        validTypeTransition(Environment, [long, long], int,
                            StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
```

##### _lconst_ <l>_

Uma instrução `_lconst_0_` é `type safe` se for possível empurrar validamente o tipo `long` para a `operand stack` de entrada, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(lconst_0, Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        validTypeTransition(Environment, [], long, StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
```

Uma instrução `_lconst_1_` é `type safe` se a instrução `_lconst_0_` equivalente for `type safe`.
```
    instructionHasEquivalentTypeRule(lconst_1, lconst_0).
```

##### _ldc_ , _ldc_w_ , _ldc2_w_

Uma instrução `_ldc_` com operando `CP` é `type safe` se `CP` se refere a uma entrada da `constant pool` que denota uma entidade do tipo `Type`, onde `Type` é `loadable` (§4.4), mas não `long` ou `double`, e é possível empurrar validamente `Type` para a `operand stack` de entrada, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(ldc(CP), Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        loadableConstant(CP, Type),
        Type \= long,
        Type \= double,
        validTypeTransition(Environment, [], Type, StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).

    loadableConstant(CP, Type) :-
        member([CP, Type], [
            [int(_),    int],
            [float(_),  float],
            [long(_),   long],
            [double(_), double]
        ]).

    loadableConstant(CP, Type) :-
        isBootstrapLoader(BL),
        member([CP, Type], [
            [class(_,_),        class('java/lang/Class', BL)],
            [arrayOf(_),        class('java/lang/Class', BL)],
            [string(_),         class('java/lang/String', BL)],
            [methodHandle(_,_), class('java/lang/invoke/MethodHandle', BL)],
            [methodType(_,_),   class('java/lang/invoke/MethodType', BL)]
        ]).

    loadableConstant(CP, Type) :-
        CP = dconstant(_, FieldDescriptor),
        parseFieldDescriptor(FieldDescriptor, Type).
```

Uma instrução `_ldc_w_` é `type safe` se a instrução `_ldc_` equivalente for `type safe`.
```
    instructionHasEquivalentTypeRule(ldc_w(CP), ldc(CP))
```

Uma instrução `_ldc2_w_` com operando `CP` é `type safe` se `CP` se refere a uma entrada da `constant pool` que denota uma entidade do tipo `Type`, onde `Type` é `long` ou `double`, e é possível empurrar validamente `Type` para a `operand stack` de entrada, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(ldc2_w(CP), Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        loadableConstant(CP, Type),
        (Type = long ; Type = double),
        validTypeTransition(Environment, [], Type, StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
```

##### _ldiv_

Uma instrução `_ldiv_` é `type safe` se a instrução `_ladd_` equivalente for `type safe`.
```
    instructionHasEquivalentTypeRule(ldiv, ladd).
```

##### _lload_ , _lload_ <n>_

Uma instrução `_lload_` com operando `Index` é `type safe` e produz um estado de tipo de saída `NextStackFrame`, se uma instrução de carregamento com operando `Index` e tipo `long` for `type safe` e produzir um estado de tipo de saída `NextStackFrame`.
```
    instructionIsTypeSafe(lload(Index), Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        loadIsTypeSafe(Environment, Index, long, StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
```

As instruções `_lload_ <n>_`, para 0 ≤ `_n_` ≤ 3, são `type safe` se a instrução `_lload_` equivalente for `type safe`.
```
    instructionHasEquivalentTypeRule(lload_0, lload(0)).
    instructionHasEquivalentTypeRule(lload_1, lload(1)).
    instructionHasEquivalentTypeRule(lload_2, lload(2)).
    instructionHasEquivalentTypeRule(lload_3, lload(3)).
```

##### _lmul_

Uma instrução `_lmul_` é `type safe` se a instrução `_ladd_` equivalente for `type safe`.
```
    instructionHasEquivalentTypeRule(lmul, ladd).
```

##### _lneg_

Uma instrução `_lneg_` é `type safe` se houver um tipo que corresponda a `long` na `operand stack` de entrada. A instrução `_lneg_` não altera o estado de tipo.
```
    instructionIsTypeSafe(lneg, Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        validTypeTransition(Environment, [long], long,
                            StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
```

##### _lookupswitch_

Uma instrução `_lookupswitch_` é `type safe` se suas chaves estiverem ordenadas, for possível remover validamente `int` da `operand stack` de entrada, resultando em um novo estado de tipo `BranchStackFrame`, e todos os alvos da instrução forem alvos de `branch` válidos, assumindo `BranchStackFrame` como seu estado de tipo de entrada.
```
    instructionIsTypeSafe(lookupswitch(Targets, Keys), Environment, _, StackFrame,
                          afterGoto, ExceptionStackFrame) :-
        sort(Keys, Keys),
        canPop(StackFrame, [int], BranchStackFrame),
        checklist(targetIsTypeSafe(Environment, BranchStackFrame), Targets),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
```

##### _lor_ , _lrem_

Uma instrução `_lor_` é `type safe` se a instrução `_ladd_` equivalente for `type safe`.
```
    instructionHasEquivalentTypeRule(lor, ladd).
```

Uma instrução `_lrem_` é `type safe` se a instrução `_ladd_` equivalente for `type safe`.
```
    instructionHasEquivalentTypeRule(lrem, ladd).
```

##### _lreturn_

Uma instrução `_lreturn_` é `type safe` se o método que a contém tiver um tipo de retorno declarado como `long`, e for possível remover validamente um tipo que corresponda a `long` da `operand stack` de entrada.
```
    instructionIsTypeSafe(lreturn, Environment, _Offset, StackFrame,
                          afterGoto, ExceptionStackFrame) :-
        thisMethodReturnType(Environment, long),
        canPop(StackFrame, [long], _PoppedStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
```

##### _lshl_ , _lshr_ , _lushr_

Uma instrução `_lshl_` é `type safe` se for possível substituir validamente os tipos `int` e `long` na `operand stack` de entrada pelo tipo `long`, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(lshl, Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        validTypeTransition(Environment, [int, long], long,
                            StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
```

Uma instrução `_lshr_` é `type safe` se a instrução `_lshl_` equivalente for `type safe`.
```
    instructionHasEquivalentTypeRule(lshr, lshl).
```

Uma instrução `_lushr_` é `type safe` se a instrução `_lshl_` equivalente for `type safe`.
```
    instructionHasEquivalentTypeRule(lushr, lshl).
```

##### _lstore_ , _lstore_ <n>_

Uma instrução `_lstore_` com operando `Index` é `type safe` e produz um estado de tipo de saída `NextStackFrame`, se uma instrução de armazenamento com operando `Index` e tipo `long` for `type safe` e produzir um estado de tipo de saída `NextStackFrame`.
```
    instructionIsTypeSafe(lstore(Index), Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        storeIsTypeSafe(Environment, Index, long, StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
```

As instruções `_lstore_ <n>_`, para 0 ≤ `_n_` ≤ 3, são `type safe` se a instrução `_lstore_` equivalente for `type safe`.
```
    instructionHasEquivalentTypeRule(lstore_0, lstore(0)).
    instructionHasEquivalentTypeRule(lstore_1, lstore(1)).
    instructionHasEquivalentTypeRule(lstore_2, lstore(2)).
    instructionHasEquivalentTypeRule(lstore_3, lstore(3)).
```

##### _lsub_ , _lxor_

Uma instrução `_lsub_` é `type safe` se a instrução `_ladd_` equivalente for `type safe`.
```
    instructionHasEquivalentTypeRule(lsub, ladd).
```

Uma instrução `_lxor_` é `type safe` se a instrução `_ladd_` equivalente for `type safe`.
```
    instructionHasEquivalentTypeRule(lxor, ladd).
```

##### _monitorenter_ , _monitorexit_

Uma instrução `_monitorenter_` é `type safe` se for possível remover validamente um tipo que corresponda a `reference` da `operand stack` de entrada, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(monitorenter, _Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        canPop(StackFrame, [reference], NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
```

Uma instrução `_monitorexit_` é `type safe` se a instrução `_monitorenter_` equivalente for `type safe`.
```
    instructionHasEquivalentTypeRule(monitorexit, monitorenter).
```

##### _multianewarray_

Uma instrução `_multianewarray_` com operandos `CP` e `Dim` é `type safe` se `CP` se refere a uma entrada da `constant pool` que denota um tipo de `array` cuja dimensão é maior ou igual a `Dim`, `Dim` é estritamente positivo, e é possível substituir validamente `Dim` tipos `int` na `operand stack` de entrada pelo tipo denotado por `CP`, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(multianewarray(CP, Dim), Environment, _Offset,
                          StackFrame, NextStackFrame, ExceptionStackFrame) :-
        CP = arrayOf(_),
        arrayDimensions(CP, Dimensions),
        Dimensions >= Dim,
        Dim > 0,
        /* Make a list of Dim ints */
        findall(int, between(1, Dim, _), IntList),
        validTypeTransition(Environment, IntList, CP,
                            StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
```

A dimensão de um tipo de `array` cujo tipo de componente também é um tipo de `array` é um a mais do que a dimensão de seu tipo de componente.
```
    arrayDimensions(arrayOf(X), XDimensions + 1) :-
        arrayDimensions(X, XDimensions).

    arrayDimensions(Type, 0) :-
        Type \= arrayOf(_).
```

##### _new_

Uma instrução `_new_` com operando `CP` no `offset` `Offset` é `type safe` se `CP` se refere a uma entrada da `constant pool` que denota um tipo de classe ou interface, o tipo `uninitialized(Offset)` não aparece na `operand stack` de entrada, e é possível empurrar validamente `uninitialized(Offset)` para a `operand stack` de entrada e substituir `uninitialized(Offset)` por `top` nas variáveis locais de entrada, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(new(CP), Environment, Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        StackFrame = frame(Locals, OperandStack, Flags),
        CP = class(_, _),
        NewItem = uninitialized(Offset),
        notMember(NewItem, OperandStack),
        substitute(NewItem, top, Locals, NewLocals),
        validTypeTransition(Environment, [], NewItem,
                            frame(NewLocals, OperandStack, Flags),
                            NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
```

O predicado `substitute` é definido na regra para `_invokespecial_` (§ _invokespecial_).

##### _newarray_

Uma instrução `_newarray_` com operando `TypeCode` é `type safe` se `TypeCode` corresponde ao tipo primitivo `ElementType`, e é possível substituir validamente o tipo `int` na `operand stack` de entrada pelo tipo 'array de `ElementType`', resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(newarray(TypeCode), Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        primitiveArrayInfo(TypeCode, _TypeChar, ElementType, _VerifierType),
        validTypeTransition(Environment, [int], arrayOf(ElementType),
                            StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
```

A correspondência entre códigos de tipo e tipos primitivos é especificada pelo seguinte predicado:
```
    primitiveArrayInfo(4,  0'Z, boolean, int).
    primitiveArrayInfo(5,  0'C, char,    int).
    primitiveArrayInfo(6,  0'F, float,   float).
    primitiveArrayInfo(7,  0'D, double,  double).
    primitiveArrayInfo(8,  0'B, byte,    int).
    primitiveArrayInfo(9,  0'S, short,   int).
    primitiveArrayInfo(10, 0'I, int,     int).
    primitiveArrayInfo(11, 0'J, long,    long).
```

##### _nop_

Uma instrução `_nop_` é sempre `type safe`. A instrução `_nop_` não afeta o estado de tipo.
```
    instructionIsTypeSafe(nop, _Environment, _Offset, StackFrame,
                          StackFrame, ExceptionStackFrame) :-
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
```

##### _pop_ , _pop2_

Uma instrução `_pop_` é `type safe` se for possível remover validamente um `category 1 type` da `operand stack` de entrada, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(pop, _Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        StackFrame = frame(Locals, [Type | Rest], Flags),
        popCategory1([Type | Rest], Type, Rest),
        NextStackFrame = frame(Locals, Rest, Flags),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
```

Uma instrução `_pop2_` é `type safe` se for uma `_type safe form_` da instrução `_pop2_`.
```
    instructionIsTypeSafe(pop2, _Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        StackFrame = frame(Locals, InputOperandStack, Flags),
        pop2SomeFormIsTypeSafe(InputOperandStack, OutputOperandStack),
        NextStackFrame = frame(Locals, OutputOperandStack, Flags),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
```

Uma instrução `_pop2_` é uma `_type safe form_` da instrução `_pop2_` se for uma `_type safe form 1_` `_pop2_` instruction ou uma `_type safe form 2_` `_pop2_` instruction.
```
    pop2SomeFormIsTypeSafe(InputOperandStack, OutputOperandStack) :-
        pop2Form1IsTypeSafe(InputOperandStack, OutputOperandStack).

    pop2SomeFormIsTypeSafe(InputOperandStack, OutputOperandStack) :-
        pop2Form2IsTypeSafe(InputOperandStack, OutputOperandStack).
```

Uma instrução `_pop2_` é uma `_type safe form 1_` `_pop2_` instruction se for possível remover validamente dois tipos de tamanho 1 da `operand stack` de entrada, resultando no estado de tipo de saída.
```
    pop2Form1IsTypeSafe([Type1, Type2 | Rest], Rest) :-
        popCategory1([Type1 | Rest], Type1, Rest),
        popCategory1([Type2 | Rest], Type2, Rest).
```

Uma instrução `_pop2_` é uma `_type safe form 2_` `_pop2_` instruction se for possível remover validamente um tipo de tamanho 2 da `operand stack` de entrada, resultando no estado de tipo de saída.
```
    pop2Form2IsTypeSafe([top, Type | Rest], Rest) :-
        popCategory2([top, Type | Rest], Type, Rest).
```

##### _putfield_

Uma instrução `_putfield_` com operando `CP` é `type safe` se todas as seguintes condições forem verdadeiras:

  * Seu primeiro operando, `CP`, refere-se a uma entrada da `constant pool` que denota um campo cujo tipo declarado é `FieldType` que é membro de um tipo `FieldClassType`.

  * Ou:

    * Pode-se remover validamente os tipos que correspondem a `FieldType` e `FieldClassType` da `operand stack` de entrada, resultando no estado de tipo de saída.

    * Campos `protected` estão sujeitos a verificações adicionais (§4.10.1.8).

```
    instructionIsTypeSafe(putfield(CP), Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        CP = field(FieldClassType, FieldName, FieldDescriptor),
        parseFieldDescriptor(FieldDescriptor, FieldType),
        canPop(StackFrame, [FieldType], PoppedFrame),
        passesProtectedCheck(Environment, FieldClassType, FieldName,
                             FieldDescriptor, PoppedFrame),
        canPop(StackFrame, [FieldType, FieldClassType], NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
```

  * Ou:

    * Se a instrução ocorrer em um método de inicialização de instância da classe nomeada por `FieldClassType` e atribuir a um campo declarado pela classe, então é possível remover validamente os tipos que correspondem a `FieldType` e `uninitializedThis` da `operand stack` de entrada, resultando no estado de tipo de saída. Isso permite que campos de instância de `this` que são declarados na classe atual sejam atribuídos antes da inicialização completa de `this`.

```
    instructionIsTypeSafe(putfield(CP), Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        CP = field(FieldClassType, FieldName, FieldDescriptor),
        thisType(Environment, FieldClassType),
        Environment = environment(CurrentClass, CurrentMethod, _, _, _, _),
        methodName(CurrentMethod, '<init>'),
        classDeclaresMember(CurrentClass, FieldName, FieldDescriptor),
        parseFieldDescriptor(FieldDescriptor, FieldType),
        canPop(StackFrame, [FieldType, uninitializedThis], NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
```

##### _putstatic_

Uma instrução `_putstatic_` com operando `CP` é `type safe` se `CP` se refere a uma entrada da `constant pool` que denota um campo cujo tipo declarado é `FieldType`, e é possível remover validamente um tipo que corresponda a `FieldType` da `operand stack` de entrada, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(putstatic(CP), _Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        CP = field(_FieldClassType, _FieldName, FieldDescriptor),
        parseFieldDescriptor(FieldDescriptor, FieldType),
        canPop(StackFrame, [FieldType], NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
```

##### _return_

Uma instrução `_return_` é `type safe` se o método que a contém declara um tipo de retorno `void`, e ou:

  * O método que a contém não é um método `<init>`, ou

  * `this` já foi completamente inicializado no ponto onde a instrução ocorre.

```
    instructionIsTypeSafe(return, Environment, _Offset, StackFrame,
                          afterGoto, ExceptionStackFrame) :-
        thisMethodReturnType(Environment, void),
        StackFrame = frame(_Locals, _OperandStack, Flags),
        notMember(flagThisUninit, Flags),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
```

##### _saload_

Uma instrução `_saload_` é `type safe` se for possível substituir validamente os tipos que correspondem a `int` e `array de short` na `operand stack` de entrada por `int`, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(saload, Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        validTypeTransition(Environment, [int, arrayOf(short)], int,
                            StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
```

##### _sastore_

Uma instrução `_sastore_` é `type safe` se for possível remover validamente os tipos que correspondem a `int`, `int` e `array de short` da `operand stack` de entrada, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(sastore, _Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        canPop(StackFrame, [int, int, arrayOf(short)], NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
```

##### _sipush_

Uma instrução `_sipush_` é `type safe` se for possível empurrar validamente o tipo `int` para a `operand stack` de entrada, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(sipush(_Value), Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        validTypeTransition(Environment, [], int, StackFrame, NextStackFrame),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
```
##### _swap_

Uma instrução _swap_ é *type safe* se for possível substituir validamente dois tipos de categoria 1, `Type1` e `Type2`, na pilha de operandos de entrada pelos tipos `Type2` e `Type1`, resultando no estado de tipo de saída.
```
    instructionIsTypeSafe(swap, _Environment, _Offset, StackFrame,
                          NextStackFrame, ExceptionStackFrame) :-
        StackFrame = frame(_Locals, [Type1, Type2 | Rest], _Flags),
        popCategory1([Type1 | Rest], Type1, Rest),
        popCategory1([Type2 | Rest], Type2, Rest),
        NextStackFrame = frame(_Locals, [Type2, Type1 | Rest], _Flags),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
```

##### _tableswitch_

Uma instrução _tableswitch_ é *type safe* se suas chaves estiverem ordenadas, for possível remover validamente um `int` da pilha de operandos de entrada, resultando em um novo estado de tipo `BranchStackFrame`, e todos os alvos da instrução forem alvos de desvio válidos, assumindo `BranchStackFrame` como seu estado de tipo de entrada.
```
    instructionIsTypeSafe(tableswitch(Targets, Keys), Environment, _Offset,
                          StackFrame, afterGoto, ExceptionStackFrame) :-
        sort(Keys, Keys),
        canPop(StackFrame, [int], BranchStackFrame),
        checklist(targetIsTypeSafe(Environment, BranchStackFrame), Targets),
        exceptionStackFrame(StackFrame, ExceptionStackFrame).
```

##### _wide_

As instruções _wide_ seguem as mesmas regras das instruções que elas ampliam.
```
    instructionHasEquivalentTypeRule(wide(WidenedInstruction),
                                     WidenedInstruction).
```

### 4.10.2. Verification by Type Inference

Um arquivo `class` que não contém um atributo `StackMapTable` (que necessariamente tem um número de versão 49.0 ou inferior) deve ser verificado usando inferência de tipo.

#### 4.10.2.1. The Process of Verification by Type Inference

Durante o *linking*, o verificador inspeciona o array `code` do atributo `Code` para cada método do arquivo `class`, realizando uma análise de fluxo de dados em cada método. O verificador garante que, em qualquer ponto do programa, independentemente do caminho de código percorrido para chegar a esse ponto, todas as seguintes condições sejam verdadeiras:

  * A pilha de operandos tem sempre o mesmo tamanho e contém os mesmos tipos de valores.

  * Nenhuma variável local é acessada a menos que se saiba que ela contém um valor de um tipo apropriado.

  * Métodos são invocados com os `arguments` apropriados.

  * `Fields` são atribuídos apenas usando valores de tipos apropriados.

  * Todos os `opcodes` têm `arguments` com tipos apropriados na pilha de operandos e no array de variáveis locais.

Por razões de eficiência, certos testes que poderiam, em princípio, ser realizados pelo verificador são adiados até a primeira vez que o código do método é realmente invocado. Ao fazer isso, o verificador evita carregar arquivos `class` a menos que seja necessário.

Por exemplo, se um método invoca outro método que retorna uma instância da `class` A, e essa instância é atribuída apenas a um `field` do mesmo tipo, o verificador não se preocupa em verificar se a `class` A realmente existe. No entanto, se ela for atribuída a um `field` do tipo B, as definições de A e B devem ser carregadas para garantir que A seja uma `subclass` de B.

#### 4.10.2.2. The Bytecode Verifier

O código para cada método é verificado independentemente. Primeiro, os bytes que compõem o código são divididos em uma sequência de instruções, e o índice no array `code` do início de cada instrução é colocado em um array. O verificador então percorre o código uma segunda vez e analisa as instruções. Durante esta passagem, uma estrutura de dados é construída para armazenar informações sobre cada instrução da Java Virtual Machine no método. Os operandos, se houver, de cada instrução são verificados para garantir que sejam válidos. Por exemplo:

  * Desvios devem estar dentro dos limites do array `code` para o método.

  * Os alvos de todas as instruções de `control transfer` são o início de uma instrução. No caso de uma instrução _wide_, o `opcode` _wide_ é considerado o início da instrução, e o `opcode` que define a operação modificada por essa instrução _wide_ não é considerado o início de uma instrução. Desvios para o meio de uma instrução não são permitidos.

  * Nenhuma instrução pode acessar ou modificar uma variável local em um índice maior ou igual ao número de variáveis locais que seu método indica que aloca.

  * Todas as `reference`s ao *constant pool* devem ser para uma entrada do tipo apropriado. (Por exemplo, a instrução _getfield_ deve referenciar um `field`.)

  * O código não termina no meio de uma instrução.

  * A execução não pode "cair" do final do código.

  * Para cada `exception handler`, o ponto de início e fim do código protegido pelo *handler* deve estar no início de uma instrução ou, no caso do ponto final, imediatamente após o fim do código. O ponto de início deve ser anterior ao ponto final. O código do `exception handler` deve começar em uma instrução válida e não deve começar em um `opcode` sendo modificado pela instrução _wide_.

Para cada instrução do método, o verificador registra o conteúdo da `operand stack` e o conteúdo do `local variable array` antes da execução dessa instrução. Para a `operand stack`, ele precisa saber a altura da pilha e o tipo de cada valor nela. Para cada variável local, ele precisa saber o tipo do conteúdo dessa variável local ou que a variável local contém um valor inutilizável ou desconhecido (pode estar não inicializada). O verificador de `bytecode` não precisa distinguir entre os tipos integrais (por exemplo, `byte`, `short`, `char`) ao determinar os tipos de valores na `operand stack`.

Em seguida, um `data-flow analyzer` é inicializado. Para a primeira instrução do método, as variáveis locais que representam `parameters` inicialmente contêm valores dos tipos indicados pelo `type descriptor` do método; a `operand stack` está vazia. Todas as outras variáveis locais contêm um valor ilegal. Para as outras instruções, que ainda não foram examinadas, nenhuma informação está disponível em relação à `operand stack` ou às variáveis locais.

Finalmente, o `data-flow analyzer` é executado. Para cada instrução, um bit "changed" indica se esta instrução precisa ser examinada. Inicialmente, o bit "changed" é definido apenas para a primeira instrução. O `data-flow analyzer` executa o seguinte loop:

  1. Selecione uma instrução da Java Virtual Machine cujo bit "changed" esteja definido. Se nenhuma instrução restante tiver seu bit "changed" definido, o método foi verificado com sucesso. Caso contrário, desative o bit "changed" da instrução selecionada.

  2. Modele o efeito da instrução na `operand stack` e no `local variable array` fazendo o seguinte:

     * Se a instrução usa valores da `operand stack`, garanta que haja um número suficiente de valores na pilha e que os valores superiores na pilha sejam de um tipo apropriado. Caso contrário, a verificação falha.

     * Se a instrução usa uma variável local, garanta que a variável local especificada contenha um valor do tipo apropriado. Caso contrário, a verificação falha.

     * Se a instrução empurra valores para a `operand stack`, garanta que haja espaço suficiente na `operand stack` para os novos valores. Adicione os tipos indicados ao topo da `operand stack` modelada.

     * Se a instrução modifica uma variável local, registre que a variável local agora contém o novo tipo.

  3. Determine as instruções que podem seguir a instrução atual. As instruções sucessoras podem ser uma das seguintes:

     * A próxima instrução, se a instrução atual não for uma instrução de `control transfer` incondicional (por exemplo, _goto_, _return_ ou _athrow_). A verificação falha se for possível "cair" da última instrução do método.

     * O(s) alvo(s) de um desvio condicional ou incondicional ou *switch*.

     * Quaisquer `exception handler`s para esta instrução.

  4. Mescle o estado da `operand stack` e do `local variable array` no final da execução da instrução atual em cada uma das instruções sucessoras, da seguinte forma:

     * Se esta for a primeira vez que a instrução sucessora foi visitada, registre que os valores da `operand stack` e da variável local calculados na etapa 2 são o estado da `operand stack` e do `local variable array` antes de executar a instrução sucessora. Defina o bit "changed" para a instrução sucessora.

     * Se a instrução sucessora já foi vista antes, mescle os valores da `operand stack` e da variável local calculados na etapa 2 nos valores já existentes. Defina o bit "changed" se houver qualquer modificação nos valores.

No caso especial de `control transfer` para um `exception handler`:

     * Registre que um único `Object`, do `exception type` indicado pelo `exception handler`, é o estado da `operand stack` antes de executar a instrução sucessora. Deve haver espaço suficiente na `operand stack` para este único valor, como se uma instrução o tivesse empurrado.

     * Registre que os valores das variáveis locais de imediatamente antes da etapa 2 são o estado do `local variable array` antes de executar a instrução sucessora. Os valores das variáveis locais calculados na etapa 2 são irrelevantes.

  5. Continue na etapa 1.

Para mesclar duas `operand stack`s, o número de valores em cada pilha deve ser idêntico. Os tipos de valores nas pilhas também devem ser idênticos, exceto que valores `reference` de tipos diferentes podem aparecer em locais correspondentes nas duas pilhas. Neste caso, a `operand stack` mesclada contém um `reference` type representando a primeira `superclass`, `superinterface` ou `array supertype` comum dos dois tipos. Tal `reference` type sempre existe porque o tipo `Object` é uma `superclass` de todos os tipos `class`, `interface` e `array types`. Se as `operand stack`s não puderem ser mescladas, a verificação do método falha.

Para mesclar dois estados de `local variable array`, pares correspondentes de variáveis locais são comparados. O valor da variável local mesclada é calculado usando as regras acima, exceto que os valores correspondentes podem ser `primitive types` diferentes. Nesse caso, o verificador registra que a variável local mesclada contém um valor inutilizável.

Se o `data-flow analyzer` for executado em um método sem relatar uma falha de verificação, então o método foi verificado com sucesso pelo `class` file verifier.

Certas instruções e tipos de dados complicam o `data-flow analyzer`. Agora examinaremos cada um deles em mais detalhes.

#### 4.10.2.3. Values of Types `long` and `double`

Valores dos tipos `long` e `double` são tratados de forma especial pelo processo de verificação.

Sempre que um valor do tipo `long` ou `double` é movido para uma variável local no índice _n_, o índice _n_ +1 é especialmente marcado para indicar que foi reservado pelo valor no índice _n_ e não deve ser usado como um índice de variável local. Qualquer valor anteriormente no índice _n_ +1 torna-se inutilizável.

Sempre que um valor é movido para uma variável local no índice _n_, o índice _n_ -1 é examinado para ver se é o índice de um valor do tipo `long` ou `double`. Se sim, a variável local no índice _n_ -1 é alterada para indicar que agora contém um valor inutilizável. Como a variável local no índice _n_ foi sobrescrita, a variável local no índice _n_ -1 não pode representar um valor do tipo `long` ou `double`.

Lidar com valores dos tipos `long` ou `double` na `operand stack` é mais simples; o verificador os trata como valores únicos na pilha. Por exemplo, o código de verificação para o `opcode` _dadd_ (adicionar dois valores `double`) verifica se os dois itens superiores na pilha são ambos do tipo `double`. Ao calcular o comprimento da `operand stack`, valores do tipo `long` e `double` têm comprimento dois.

Instruções não tipadas que manipulam a `operand stack` devem tratar valores do tipo `long` e `double` como atômicos (indivisíveis). Por exemplo, o verificador relata uma falha se o valor superior na pilha for um `double` e ele encontrar uma instrução como _pop_ ou _dup_. As instruções _pop2_ ou _dup2_ devem ser usadas em vez disso.

#### 4.10.2.4. Instance Initialization Methods and Newly Created Objects

Criar uma nova instância de `class` é um processo de várias etapas. A declaração:
```
    ...
    new myClass(i, j, k);
    ...
```

pode ser implementada pelo seguinte:
```
    ...
    new #1            // Allocate uninitialized space for myClass
    dup               // Duplicate object on the operand stack
    iload_1           // Push i
    iload_2           // Push j
    iload_3           // Push k
    invokespecial #5  // Invoke myClass.<init>
    ...
```

Esta sequência de instruções deixa o `Object` recém-criado e inicializado no topo da `operand stack`. (Exemplos adicionais de compilação para o conjunto de instruções da Java Virtual Machine são fornecidos em §3 (_Compiling for the Java Virtual Machine_).)

O `instance initialization method` (§2.9.1) para a `class` `myClass` vê o novo `uninitialized object` como seu `this` `argument` na variável local 0. Antes que esse método invoque outro `instance initialization method` de `myClass` ou sua `direct superclass` em `this`, a única operação que o método pode realizar em `this` é atribuir `fields` declarados dentro de `myClass`.

Ao realizar a `data-flow analysis` em métodos de instância, o verificador inicializa a variável local 0 para conter um `Object` da `current class` ou, para `instance initialization method`s, a variável local 0 contém um tipo especial indicando um `uninitialized object`. Após um `instance initialization method` apropriado ser invocado (da `current class` ou de sua `direct superclass`) neste `Object`, todas as ocorrências deste tipo especial no modelo da `operand stack` do verificador e no `local variable array` são substituídas pelo tipo da `current class`. O verificador rejeita código que usa o novo `Object` antes de ter sido inicializado ou que inicializa o `Object` mais de uma vez. Além disso, ele garante que cada `return` normal do método tenha invocado um `instance initialization method` seja na `class` deste método ou na `direct superclass`.

Similarmente, um tipo especial é criado e empurrado para o modelo da `operand stack` do verificador como resultado da instrução _new_ da Java Virtual Machine. O tipo especial indica a instrução pela qual a instância da `class` foi criada e o tipo da `uninitialized class instance` criada. Quando um `instance initialization method` declarado na `class` da `uninitialized class instance` é invocado nessa instância da `class`, todas as ocorrências do tipo especial são substituídas pelo tipo pretendido da instância da `class`. Essa mudança de tipo pode se propagar para instruções subsequentes à medida que a `data-flow analysis` avança.

O número da instrução precisa ser armazenado como parte do tipo especial, pois pode haver múltiplas instâncias de uma `class` ainda não inicializadas existindo na `operand stack` ao mesmo tempo. Por exemplo, a sequência de instruções da Java Virtual Machine que implementa:
```
    new InputStream(new Foo(), new InputStream("foo"))
```

pode ter duas instâncias `uninitialized` de `InputStream` na `operand stack` ao mesmo tempo. Quando um `instance initialization method` é invocado em uma instância de `class`, apenas as ocorrências do tipo especial na `operand stack` ou no `local variable array` que são o mesmo `Object` que a instância da `class` são substituídas.

#### 4.10.2.5. Exceptions and `finally`

Para implementar a construção `try`-`finally`, um compilador para a linguagem de programação Java que gera arquivos `class` com número de versão 50.0 ou inferior pode usar os recursos de tratamento de exceções juntamente com duas instruções especiais: _jsr_ ("jump to subroutine") e _ret_ ("return from subroutine"). A cláusula `finally` é compilada como uma `subroutine` dentro do código da Java Virtual Machine para seu método, muito parecido com o código para um `exception handler`. Quando uma instrução _jsr_ que invoca a `subroutine` é executada, ela empurra seu `return address`, o endereço da instrução após o _jsr_ que está sendo executado, para a `operand stack` como um valor do tipo `returnAddress`. O código para a `subroutine` armazena o `return address` em uma variável local. No final da `subroutine`, uma instrução _ret_ busca o `return address` da variável local e transfere o controle para a instrução no `return address`.

O controle pode ser transferido para a cláusula `finally` (a `subroutine` `finally` pode ser invocada) de várias maneiras diferentes. Se a cláusula `try` for concluída normalmente, a `subroutine` `finally` é invocada via uma instrução _jsr_ antes de avaliar a próxima expressão. Um `break` ou `continue` dentro da cláusula `try` que transfere o controle para fora da cláusula `try` executa um _jsr_ para o código da cláusula `finally` primeiro. Se a cláusula `try` executa um _return_, o código compilado faz o seguinte:

  1. Salva o `return value` (se houver) em uma variável local.

  2. Executa um _jsr_ para o código da cláusula `finally`.

  3. Ao retornar da cláusula `finally`, retorna o valor salvo na variável local.

O compilador configura um `exception handler` especial, que captura qualquer exceção lançada pela cláusula `try`. Se uma exceção for lançada na cláusula `try`, este `exception handler` faz o seguinte:

  1. Salva a exceção em uma variável local.

  2. Executa um _jsr_ para a cláusula `finally`.

  3. Ao retornar da cláusula `finally`, relança a exceção.

Para mais informações sobre a implementação da construção `try`-`finally`, consulte §3.13.

O código para a cláusula `finally` apresenta um problema especial para o verificador. Geralmente, se uma instrução específica pode ser alcançada por múltiplos caminhos e uma variável local específica contém valores incompatíveis através desses múltiplos caminhos, então a variável local torna-se inutilizável. No entanto, uma cláusula `finally` pode ser chamada de vários lugares diferentes, resultando em várias circunstâncias diferentes:

  * A invocação do `exception handler` pode ter uma certa variável local que contém uma exceção.

  * A invocação para implementar _return_ pode ter alguma variável local que contém o `return value`.

  * A invocação do final da cláusula `try` pode ter um valor indeterminado nessa mesma variável local.

O código para a cláusula `finally` em si pode passar na verificação, mas após completar a atualização de todos os sucessores da instrução _ret_, o verificador notaria que a variável local que o `exception handler` espera conter uma exceção, ou que o código de `return` espera conter um `return value`, agora contém um valor indeterminado.

Verificar código que contém uma cláusula `finally` é complicado. A ideia básica é a seguinte:

  * Cada instrução mantém um registro da lista de alvos _jsr_ necessários para alcançar essa instrução. Para a maioria do código, esta lista está vazia. Para instruções dentro do código da cláusula `finally`, ela tem comprimento um. Para código `finally` aninhado múltiplas vezes (extremamente raro!), pode ser mais longo que um.

  * Para cada instrução e cada _jsr_ necessário para alcançar essa instrução, um `bit vector` é mantido de todas as variáveis locais acessadas ou modificadas desde a execução da instrução _jsr_.

  * Ao executar a instrução _ret_, que implementa um `return` de uma `subroutine`, deve haver apenas uma `subroutine` possível da qual a instrução pode estar retornando. Duas `subroutine`s diferentes não podem "mesclar" sua execução em uma única instrução _ret_.

  * Para realizar a `data-flow analysis` em uma instrução _ret_, um procedimento especial é usado. Como o verificador conhece a `subroutine` da qual a instrução deve estar retornando, ele pode encontrar todas as instruções _jsr_ que chamam a `subroutine` e mesclar o estado da `operand stack` e do `local variable array` no momento da instrução _ret_ na `operand stack` e no `local variable array` das instruções que seguem o _jsr_. A mesclagem usa um conjunto especial de valores para variáveis locais:

    * Para qualquer variável local que o `bit vector` (construído acima) indica ter sido acessada ou modificada pela `subroutine`, use o tipo da variável local no momento do _ret_.

    * Para outras variáveis locais, use o tipo da variável local antes da instrução _jsr_.
## 4.11. Limitações da Java Virtual Machine

As seguintes limitações da Java Virtual Machine são implícitas no formato do arquivo `class`:

  * O pool de constantes por classe ou por interface é limitado a 65535 entradas pelo campo de 16 bits `constant_pool_count` da estrutura `ClassFile` (§4.1). Isso atua como um limite interno para a complexidade total de uma única classe ou interface.

  * O número de campos que podem ser declarados por uma classe ou interface é limitado a 65535 pelo tamanho do item `fields_count` da estrutura `ClassFile` (§4.1).

Note que o valor do item `fields_count` da estrutura `ClassFile` não inclui campos que são herdados de superclasses ou superinterfaces.

  * O número de métodos que podem ser declarados por uma classe ou interface é limitado a 65535 pelo tamanho do item `methods_count` da estrutura `ClassFile` (§4.1).

Note que o valor do item `methods_count` da estrutura `ClassFile` não inclui métodos que são herdados de superclasses ou superinterfaces.

  * O número de superinterfaces diretas de uma classe ou interface é limitado a 65535 pelo tamanho do item `interfaces_count` da estrutura `ClassFile` (§4.1).

  * O maior número de variáveis locais no array de variáveis locais de um frame criado na invocação de um método (§2.6) é limitado a 65535 pelo tamanho do item `max_locals` do atributo `Code` (§4.7.3) que fornece o código do método, e pela indexação de variáveis locais de 16 bits do conjunto de instruções da Java Virtual Machine.

Note que valores do tipo `long` e `double` são considerados como reservando duas variáveis locais cada e contribuem com duas unidades para o valor `max_locals`, portanto, o uso de variáveis locais desses tipos reduz ainda mais este limite.

  * O tamanho de uma pilha de operandos em um frame (§2.6) é limitado a 65535 valores pelo campo `max_stack` do atributo `Code` (§4.7.3).

Note que valores do tipo `long` e `double` são considerados como contribuindo com duas unidades cada para o valor `max_stack`, portanto, o uso de valores desses tipos na pilha de operandos reduz ainda mais este limite.

  * O número de parâmetros de método é limitado a 255 pela definição de um descritor de método (§4.3.3), onde o limite inclui uma unidade para `this` no caso de invocações de métodos de instância ou de interface.

Note que um descritor de método é definido em termos de uma noção de comprimento de parâmetro de método em que um parâmetro do tipo `long` ou `double` contribui com duas unidades para o comprimento, portanto, parâmetros desses tipos reduzem ainda mais o limite.

  * O comprimento de nomes de campos e métodos, descritores de campos e métodos, e outros valores de string constantes (incluindo aqueles referenciados por atributos `ConstantValue` (§4.7.2)) é limitado a 65535 caracteres pelo item `length` unsigned de 16 bits da estrutura `CONSTANT_Utf8_info` (§4.4.7).

Note que o limite é no número de bytes na codificação e não no número de caracteres codificados. UTF-8 codifica alguns caracteres usando dois ou três bytes. Assim, strings que incorporam caracteres multibyte são ainda mais restritas.

  * O número de dimensões em um array é limitado a 255 pelo tamanho do opcode `_dimensions` da instrução `_multianewarray` e pelas restrições impostas às instruções `_multianewarray` , `_anewarray` e `_newarray` (§4.9.1, §4.9.2).

* * *

Anterior | | Próximo
---|---|---
Capítulo 3. Compilando para a Java Virtual Machine | Início | Capítulo 5. Carregamento, Vinculação e Inicialização

* * *

 Aviso Legal 