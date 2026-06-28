# Sintaxe

[Java SE](<https://docs.oracle.com/en/java/javase/25/>) > [Java SE Specifications](<#/>) > [Java Language Specification](<#/doc/jls/jls-01>)

Capítulo 19. Sintaxe  
---  
[Anterior](<#/doc/jls/jls-18>) | | [Próximo](<#/>)  
  
* * *

# Capítulo 19. Sintaxe 

Este capítulo repete a gramática sintática apresentada nos Capítulos 4, 6-10, 14 e 15, bem como partes-chave da gramática lexical do Capítulo 3, utilizando a notação de [§2.4](<#/doc/jls/jls-02>). 

**Produções de[§3 (_Estrutura Léxica_)](<#/doc/jls/jls-03>)**

Identifier:

[IdentifierChars](<#/doc/jls/jls-03>) mas não um [ReservedKeyword](<#/doc/jls/jls-03>) ou [BooleanLiteral](<#/doc/jls/jls-03>) ou [NullLiteral](<#/doc/jls/jls-03>)

IdentifierChars:

[JavaLetter](<#/doc/jls/jls-03>) {[JavaLetterOrDigit](<#/doc/jls/jls-03>)} 

JavaLetter:

qualquer caractere Unicode que seja uma "letra Java"

JavaLetterOrDigit:

qualquer caractere Unicode que seja uma "letra ou dígito Java"

TypeIdentifier:

[Identifier](<#/doc/jls/jls-03>) mas não `permits`, `record`, `sealed`, `var`, ou `yield`

UnqualifiedMethodIdentifier:

[Identifier](<#/doc/jls/jls-03>) mas não `yield`

Literal:

[IntegerLiteral](<#/doc/jls/jls-03>)   
[FloatingPointLiteral](<#/doc/jls/jls-03>)   
[BooleanLiteral](<#/doc/jls/jls-03>)   
[CharacterLiteral](<#/doc/jls/jls-03>)   
[StringLiteral](<#/doc/jls/jls-03>)   
[TextBlock](<#/doc/jls/jls-03>)   
[NullLiteral](<#/doc/jls/jls-03>)

**Produções de[§4 (_Tipos, Valores e Variáveis_)](<#/doc/jls/jls-04>)**

Type:

[PrimitiveType](<#/doc/jls/jls-04>)   
[ReferenceType](<#/doc/jls/jls-04>)

PrimitiveType:

{[Annotation](<#/doc/jls/jls-09>)} [NumericType](<#/doc/jls/jls-04>)   
{[Annotation](<#/doc/jls/jls-09>)} `boolean`

NumericType:

[IntegralType](<#/doc/jls/jls-04>)   
[FloatingPointType](<#/doc/jls/jls-04>)

IntegralType:

(um de)   
`byte` `short` `int` `long` `char`

FloatingPointType:

(um de)   
`float` `double`

ReferenceType:

[ClassOrInterfaceType](<#/doc/jls/jls-04>)   
[TypeVariable](<#/doc/jls/jls-04>)   
[ArrayType](<#/doc/jls/jls-04>)

ClassOrInterfaceType:

[ClassType](<#/doc/jls/jls-04>)   
[InterfaceType](<#/doc/jls/jls-04>)

ClassType:

{[Annotation](<#/doc/jls/jls-09>)} [TypeIdentifier](<#/doc/jls/jls-03>) [[TypeArguments](<#/doc/jls/jls-04>)]   
[PackageName](<#/doc/jls/jls-06>) `.` {[Annotation](<#/doc/jls/jls-09>)} [TypeIdentifier](<#/doc/jls/jls-03>) [[TypeArguments](<#/doc/jls/jls-04>)]   
[ClassOrInterfaceType](<#/doc/jls/jls-04>) `.` {[Annotation](<#/doc/jls/jls-09>)} [TypeIdentifier](<#/doc/jls/jls-03>) [[TypeArguments](<#/doc/jls/jls-04>)] 

InterfaceType:

[ClassType](<#/doc/jls/jls-04>)

TypeVariable:

{[Annotation](<#/doc/jls/jls-09>)} [TypeIdentifier](<#/doc/jls/jls-03>)

ArrayType:

[PrimitiveType](<#/doc/jls/jls-04>) [Dims](<#/doc/jls/jls-04>)   
[ClassOrInterfaceType](<#/doc/jls/jls-04>) [Dims](<#/doc/jls/jls-04>)   
[TypeVariable](<#/doc/jls/jls-04>) [Dims](<#/doc/jls/jls-04>)

Dims:

{[Annotation](<#/doc/jls/jls-09>)} `[` `]` {{[Annotation](<#/doc/jls/jls-09>)} `[` `]`} 

TypeParameter:

{[TypeParameterModifier](<#/doc/jls/jls-04>)} [TypeIdentifier](<#/doc/jls/jls-03>) [[TypeBound](<#/doc/jls/jls-04>)] 

TypeParameterModifier:

[Annotation](<#/doc/jls/jls-09>)

TypeBound:

`extends` [TypeVariable](<#/doc/jls/jls-04>)   
`extends` [ClassOrInterfaceType](<#/doc/jls/jls-04>) {[AdditionalBound](<#/doc/jls/jls-04>)} 

AdditionalBound:

`&` [InterfaceType](<#/doc/jls/jls-04>)

TypeArguments:

`<` [TypeArgumentList](<#/doc/jls/jls-04>) `>`

TypeArgumentList:

[TypeArgument](<#/doc/jls/jls-04>) {`,` [TypeArgument](<#/doc/jls/jls-04>)} 

TypeArgument:

[ReferenceType](<#/doc/jls/jls-04>)   
[Wildcard](<#/doc/jls/jls-04>)

Wildcard:

{[Annotation](<#/doc/jls/jls-09>)} `?` [[WildcardBounds](<#/doc/jls/jls-04>)] 

WildcardBounds:

`extends` [ReferenceType](<#/doc/jls/jls-04>)   
`super` [ReferenceType](<#/doc/jls/jls-04>)

**Produções de[§6 (_Nomes_)](<#/doc/jls/jls-06>)**

ModuleName:

[Identifier](<#/doc/jls/jls-03>)   
[ModuleName](<#/doc/jls/jls-06>) `.` [Identifier](<#/doc/jls/jls-03>)

PackageName:

[Identifier](<#/doc/jls/jls-03>)   
[PackageName](<#/doc/jls/jls-06>) `.` [Identifier](<#/doc/jls/jls-03>)

TypeName:

[TypeIdentifier](<#/doc/jls/jls-03>)   
[PackageOrTypeName](<#/doc/jls/jls-06>) `.` [TypeIdentifier](<#/doc/jls/jls-03>)

ExpressionName:

[Identifier](<#/doc/jls/jls-03>)   
[AmbiguousName](<#/doc/jls/jls-06>) `.` [Identifier](<#/doc/jls/jls-03>)

MethodName:

[UnqualifiedMethodIdentifier](<#/doc/jls/jls-03>)

PackageOrTypeName:

[Identifier](<#/doc/jls/jls-03>)   
[PackageOrTypeName](<#/doc/jls/jls-06>) `.` [Identifier](<#/doc/jls/jls-03>)

AmbiguousName:

[Identifier](<#/doc/jls/jls-03>)   
[AmbiguousName](<#/doc/jls/jls-06>) `.` [Identifier](<#/doc/jls/jls-03>)

**Produções de[§7 (_Pacotes e Módulos_)](<#/doc/jls/jls-07>)**

CompilationUnit:

[OrdinaryCompilationUnit](<#/doc/jls/jls-07>)   
[CompactCompilationUnit](<#/doc/jls/jls-07>)   
[ModularCompilationUnit](<#/doc/jls/jls-07>)

OrdinaryCompilationUnit:

[[PackageDeclaration](<#/doc/jls/jls-07>)] {[ImportDeclaration](<#/doc/jls/jls-07>)} {[TopLevelClassOrInterfaceDeclaration](<#/doc/jls/jls-07>)} 

ModularCompilationUnit:

{[ImportDeclaration](<#/doc/jls/jls-07>)} [ModuleDeclaration](<#/doc/jls/jls-07>)

PackageDeclaration:

{[PackageModifier](<#/doc/jls/jls-07>)} `package` [Identifier](<#/doc/jls/jls-03>) {`.` [Identifier](<#/doc/jls/jls-03>)} `;`

PackageModifier:

[Annotation](<#/doc/jls/jls-09>)

ImportDeclaration:

[SingleTypeImportDeclaration](<#/doc/jls/jls-07>)   
[TypeImportOnDemandDeclaration](<#/doc/jls/jls-07>)   
[SingleStaticImportDeclaration](<#/doc/jls/jls-07>)   
[StaticImportOnDemandDeclaration](<#/doc/jls/jls-07>)   
[SingleModuleImportDeclaration](<#/doc/jls/jls-07>)

SingleTypeImportDeclaration:

`import` [TypeName](<#/doc/jls/jls-06>) `;`

TypeImportOnDemandDeclaration:

`import` [PackageOrTypeName](<#/doc/jls/jls-06>) `.` `*` `;`

SingleStaticImportDeclaration:

`import` `static` [TypeName](<#/doc/jls/jls-06>) `.` [Identifier](<#/doc/jls/jls-03>) `;`

StaticImportOnDemandDeclaration:

`import` `static` [TypeName](<#/doc/jls/jls-06>) `.` `*` `;`

TopLevelClassOrInterfaceDeclaration:

[ClassDeclaration](<#/doc/jls/jls-08>)   
[InterfaceDeclaration](<#/doc/jls/jls-09>)   
`;`

ModuleDeclaration:

{[Annotation](<#/doc/jls/jls-09>)} [`open`] `module` [Identifier](<#/doc/jls/jls-03>) {`.` [Identifier](<#/doc/jls/jls-03>)} `{` {[ModuleDirective](<#/doc/jls/jls-07>)} `}`

ModuleDirective:

`requires` {[RequiresModifier](<#/doc/jls/jls-07>)} [ModuleName](<#/doc/jls/jls-06>) `;`   
`exports` [PackageName](<#/doc/jls/jls-06>) [`to` [ModuleName](<#/doc/jls/jls-06>) {`,` [ModuleName](<#/doc/jls/jls-06>)}] `;`   
`opens` [PackageName](<#/doc/jls/jls-06>) [`to` [ModuleName](<#/doc/jls/jls-06>) {`,` [ModuleName](<#/doc/jls/jls-06>)}] `;`   
`uses` [TypeName](<#/doc/jls/jls-06>) `;`   
`provides` [TypeName](<#/doc/jls/jls-06>) `with` [TypeName](<#/doc/jls/jls-06>) {`,` [TypeName](<#/doc/jls/jls-06>)} `;`

RequiresModifier:

(um de)   
`transitive` `static`

**Produções de[§8 (_Classes_)](<#/doc/jls/jls-08>)**

ClassDeclaration:

[NormalClassDeclaration](<#/doc/jls/jls-08>)   
[EnumDeclaration](<#/doc/jls/jls-08>)   
[RecordDeclaration](<#/doc/jls/jls-08>)

NormalClassDeclaration:

{[ClassModifier](<#/doc/jls/jls-08>)} `class` [TypeIdentifier](<#/doc/jls/jls-03>) [[TypeParameters](<#/doc/jls/jls-08>)] [[ClassExtends](<#/doc/jls/jls-08>)] [[ClassImplements](<#/doc/jls/jls-08>)] [[ClassPermits](<#/doc/jls/jls-08>)] [ClassBody](<#/doc/jls/jls-08>)

ClassModifier:

(um de)   
[Annotation](<#/doc/jls/jls-09>) `public` `protected` `private`   
`abstract` `static` `final` `sealed` `non-sealed` `strictfp`

TypeParameters:

`<` [TypeParameterList](<#/doc/jls/jls-08>) `>`

TypeParameterList:

[TypeParameter](<#/doc/jls/jls-04>) {`,` [TypeParameter](<#/doc/jls/jls-04>)} 

ClassExtends:

`extends` [ClassType](<#/doc/jls/jls-04>)

ClassImplements:

`implements` [InterfaceTypeList](<#/doc/jls/jls-08>)

InterfaceTypeList:

[InterfaceType](<#/doc/jls/jls-04>) {`,` [InterfaceType](<#/doc/jls/jls-04>)} 

ClassPermits:

`permits` [TypeName](<#/doc/jls/jls-06>) {`,` [TypeName](<#/doc/jls/jls-06>)} 

ClassBody:

`{` {[ClassBodyDeclaration](<#/doc/jls/jls-08>)} `}`

ClassBodyDeclaration:

[ClassMemberDeclaration](<#/doc/jls/jls-08>)   
[InstanceInitializer](<#/doc/jls/jls-08>)   
[StaticInitializer](<#/doc/jls/jls-08>)   
[ConstructorDeclaration](<#/doc/jls/jls-08>)

ClassMemberDeclaration:

[FieldDeclaration](<#/doc/jls/jls-08>)   
[MethodDeclaration](<#/doc/jls/jls-08>)   
[ClassDeclaration](<#/doc/jls/jls-08>)   
[InterfaceDeclaration](<#/doc/jls/jls-09>)   
`;`

FieldDeclaration:

{[FieldModifier](<#/doc/jls/jls-08>)} [UnannType](<#/doc/jls/jls-08>) [VariableDeclaratorList](<#/doc/jls/jls-08>) `;`

FieldModifier:

(um de)   
[Annotation](<#/doc/jls/jls-09>) `public` `protected` `private`   
`static` `final` `transient` `volatile`

VariableDeclaratorList:

[VariableDeclarator](<#/doc/jls/jls-08>) {`,` [VariableDeclarator](<#/doc/jls/jls-08>)} 

VariableDeclarator:

[VariableDeclaratorId](<#/doc/jls/jls-08>) [`=` [VariableInitializer](<#/doc/jls/jls-08>)] 

VariableDeclaratorId:

[Identifier](<#/doc/jls/jls-03>) [[Dims](<#/doc/jls/jls-04>)]   
`_`

VariableInitializer:

[Expression](<#/doc/jls/jls-15>)   
[ArrayInitializer](<#/doc/jls/jls-10>)

UnannType:

[UnannPrimitiveType](<#/doc/jls/jls-08>)   
[UnannReferenceType](<#/doc/jls/jls-08>)

UnannPrimitiveType:

[NumericType](<#/doc/jls/jls-04>)   
`boolean`

UnannReferenceType:

[UnannClassOrInterfaceType](<#/doc/jls/jls-08>)   
[UnannTypeVariable](<#/doc/jls/jls-08>)   
[UnannArrayType](<#/doc/jls/jls-08>)

UnannClassOrInterfaceType:

[UnannClassType](<#/doc/jls/jls-08>)   
[UnannInterfaceType](<#/doc/jls/jls-08>)

UnannClassType:

[TypeIdentifier](<#/doc/jls/jls-03>) [[TypeArguments](<#/doc/jls/jls-04>)]   
[PackageName](<#/doc/jls/jls-06>) `.` {[Annotation](<#/doc/jls/jls-09>)} [TypeIdentifier](<#/doc/jls/jls-03>) [[TypeArguments](<#/doc/jls/jls-04>)]   
[UnannClassOrInterfaceType](<#/doc/jls/jls-08>) `.` {[Annotation](<#/doc/jls/jls-09>)} [TypeIdentifier](<#/doc/jls/jls-03>) [[TypeArguments](<#/doc/jls/jls-04>)] 

UnannInterfaceType:

[UnannClassType](<#/doc/jls/jls-08>)

UnannTypeVariable:

[TypeIdentifier](<#/doc/jls/jls-03>)

UnannArrayType:

[UnannPrimitiveType](<#/doc/jls/jls-08>) [Dims](<#/doc/jls/jls-04>)   
[UnannClassOrInterfaceType](<#/doc/jls/jls-08>) [Dims](<#/doc/jls/jls-04>)   
[UnannTypeVariable](<#/doc/jls/jls-08>) [Dims](<#/doc/jls/jls-04>)

MethodDeclaration:

{[MethodModifier](<#/doc/jls/jls-08>)} [MethodHeader](<#/doc/jls/jls-08>) [MethodBody](<#/doc/jls/jls-08>)

MethodModifier:

(um de)   
[Annotation](<#/doc/jls/jls-09>) `public` `protected` `private`   
`abstract` `static` `final` `synchronized` `native` `strictfp`

MethodHeader:

[Result](<#/doc/jls/jls-08>) [MethodDeclarator](<#/doc/jls/jls-08>) [[Throws](<#/doc/jls/jls-08>)]   
[TypeParameters](<#/doc/jls/jls-08>) {[Annotation](<#/doc/jls/jls-09>)} [Result](<#/doc/jls/jls-08>) [MethodDeclarator](<#/doc/jls/jls-08>) [[Throws](<#/doc/jls/jls-08>)] 

Result:

[UnannType](<#/doc/jls/jls-08>)   
`void`

MethodDeclarator:

[Identifier](<#/doc/jls/jls-03>) `(` [[ReceiverParameter](<#/doc/jls/jls-08>) `,`] [[FormalParameterList](<#/doc/jls/jls-08>)] `)` [[Dims](<#/doc/jls/jls-04>)] 

ReceiverParameter:

{[Annotation](<#/doc/jls/jls-09>)} [UnannType](<#/doc/jls/jls-08>) [[Identifier](<#/doc/jls/jls-03>) `.`] `this`

FormalParameterList:

[FormalParameter](<#/doc/jls/jls-08>) {`,` [FormalParameter](<#/doc/jls/jls-08>)} 

FormalParameter:

{[VariableModifier](<#/doc/jls/jls-08>)} [UnannType](<#/doc/jls/jls-08>) [VariableDeclaratorId](<#/doc/jls/jls-08>)   
[VariableArityParameter](<#/doc/jls/jls-08>)

VariableArityParameter:

{[VariableModifier](<#/doc/jls/jls-08>)} [UnannType](<#/doc/jls/jls-08>) {[Annotation](<#/doc/jls/jls-09>)} `...` [Identifier](<#/doc/jls/jls-03>)

VariableModifier:

[Annotation](<#/doc/jls/jls-09>)   
`final`

Throws:

`throws` [ExceptionTypeList](<#/doc/jls/jls-08>)

ExceptionTypeList:

[ExceptionType](<#/doc/jls/jls-08>) {`,` [ExceptionType](<#/doc/jls/jls-08>)} 

ExceptionType:

[ClassType](<#/doc/jls/jls-04>)   
[TypeVariable](<#/doc/jls/jls-04>)

MethodBody:

[Block](<#/doc/jls/jls-14>)   
`;`

InstanceInitializer:

[Block](<#/doc/jls/jls-14>)

StaticInitializer:

`static` [Block](<#/doc/jls/jls-14>)

ConstructorDeclaration:

{[ConstructorModifier](<#/doc/jls/jls-08>)} [ConstructorDeclarator](<#/doc/jls/jls-08>) [[Throws](<#/doc/jls/jls-08>)] [ConstructorBody](<#/doc/jls/jls-08>)

ConstructorModifier:

(um de)   
[Annotation](<#/doc/jls/jls-09>) `public` `protected` `private`

ConstructorDeclarator:

[[TypeParameters](<#/doc/jls/jls-08>)] [SimpleTypeName](<#/doc/jls/jls-08>) `(` [[ReceiverParameter](<#/doc/jls/jls-08>) `,`] [[FormalParameterList](<#/doc/jls/jls-08>)] `)`

SimpleTypeName:

[TypeIdentifier](<#/doc/jls/jls-03>)

ConstructorBody:

`{` [[BlockStatements](<#/doc/jls/jls-14>)] [ConstructorInvocation](<#/doc/jls/jls-08>) [[BlockStatements](<#/doc/jls/jls-14>)] `}`   
`{` [[BlockStatements](<#/doc/jls/jls-14>)] `}`

ConstructorInvocation:

[[TypeArguments](<#/doc/jls/jls-04>)] `this` `(` [[ArgumentList](<#/doc/jls/jls-15>)] `)` `;`   
[[TypeArguments](<#/doc/jls/jls-04>)] `super` `(` [[ArgumentList](<#/doc/jls/jls-15>)] `)` `;`   
[ExpressionName](<#/doc/jls/jls-06>) `.` [[TypeArguments](<#/doc/jls/jls-04>)] `super` `(` [[ArgumentList](<#/doc/jls/jls-15>)] `)` `;`   
[Primary](<#/doc/jls/jls-15>) `.` [[TypeArguments](<#/doc/jls/jls-04>)] `super` `(` [[ArgumentList](<#/doc/jls/jls-15>)] `)` `;`

EnumDeclaration:

{[ClassModifier](<#/doc/jls/jls-08>)} `enum` [TypeIdentifier](<#/doc/jls/jls-03>) [[ClassImplements](<#/doc/jls/jls-08>)] [EnumBody](<#/doc/jls/jls-08>)

EnumBody:

`{` [[EnumConstantList](<#/doc/jls/jls-08>)] [`,`] [[EnumBodyDeclarations](<#/doc/jls/jls-08>)] `}`

EnumConstantList:

[EnumConstant](<#/doc/jls/jls-08>) {`,` [EnumConstant](<#/doc/jls/jls-08>)} 

EnumConstant:

{[EnumConstantModifier](<#/doc/jls/jls-08>)} [Identifier](<#/doc/jls/jls-03>) [`(` [[ArgumentList](<#/doc/jls/jls-15>)] `)`] [[ClassBody](<#/doc/jls/jls-08>)] 

EnumConstantModifier:

[Annotation](<#/doc/jls/jls-09>)

EnumBodyDeclarations:

`;` {[ClassBodyDeclaration](<#/doc/jls/jls-08>)} 

RecordDeclaration:

{[ClassModifier](<#/doc/jls/jls-08>)} `record` [TypeIdentifier](<#/doc/jls/jls-03>) [[TypeParameters](<#/doc/jls/jls-08>)] [RecordHeader](<#/doc/jls/jls-08>) [[ClassImplements](<#/doc/jls/jls-08>)] [RecordBody](<#/doc/jls/jls-08>)

RecordHeader:

`(` [[RecordComponentList](<#/doc/jls/jls-08>)] `)`

RecordComponentList:

[RecordComponent](<#/doc/jls/jls-08>) {`,` [RecordComponent](<#/doc/jls/jls-08>)} 

RecordComponent:

{[RecordComponentModifier](<#/doc/jls/jls-08>)} [UnannType](<#/doc/jls/jls-08>) [Identifier](<#/doc/jls/jls-03>)   
[VariableArityRecordComponent](<#/doc/jls/jls-08>)

VariableArityRecordComponent:

{[RecordComponentModifier](<#/doc/jls/jls-08>)} [UnannType](<#/doc/jls/jls-08>) {[Annotation](<#/doc/jls/jls-09>)} `...` [Identifier](<#/doc/jls/jls-03>)

RecordComponentModifier:

[Annotation](<#/doc/jls/jls-09>)

RecordBody:

`{` {[RecordBodyDeclaration](<#/doc/jls/jls-08>)} `}`

RecordBodyDeclaration:

[ClassBodyDeclaration](<#/doc/jls/jls-08>)   
[CompactConstructorDeclaration](<#/doc/jls/jls-08>)

CompactConstructorDeclaration:

{[ConstructorModifier](<#/doc/jls/jls-08>)} [SimpleTypeName](<#/doc/jls/jls-08>) [ConstructorBody](<#/doc/jls/jls-08>)

**Produções de[§9 (_Interfaces_)](<#/doc/jls/jls-09>)**

InterfaceDeclaration:

[NormalInterfaceDeclaration](<#/doc/jls/jls-09>)   
[AnnotationInterfaceDeclaration](<#/doc/jls/jls-09>)

NormalInterfaceDeclaration:

{[InterfaceModifier](<#/doc/jls/jls-09>)} `interface` [TypeIdentifier](<#/doc/jls/jls-03>) [[TypeParameters](<#/doc/jls/jls-08>)] [[InterfaceExtends](<#/doc/jls/jls-09>)] [[InterfacePermits](<#/doc/jls/jls-09>)] [InterfaceBody](<#/doc/jls/jls-09>)

InterfaceModifier:

(um de)   
[Annotation](<#/doc/jls/jls-09>) `public` `protected` `private`   
`abstract` `static` `sealed` `non-sealed` `strictfp`

InterfaceExtends:

`extends` [InterfaceTypeList](<#/doc/jls/jls-08>)

InterfacePermits:

`permits` [TypeName](<#/doc/jls/jls-06>) {`,` [TypeName](<#/doc/jls/jls-06>)} 

InterfaceBody:

`{` {[InterfaceMemberDeclaration](<#/doc/jls/jls-09>)} `}`

InterfaceMemberDeclaration:

[ConstantDeclaration](<#/doc/jls/jls-09>)   
[InterfaceMethodDeclaration](<#/doc/jls/jls-09>)   
[ClassDeclaration](<#/doc/jls/jls-08>)   
[InterfaceDeclaration](<#/doc/jls/jls-09>)   
`;`

ConstantDeclaration:

{[ConstantModifier](<#/doc/jls/jls-09>)} [UnannType](<#/doc/jls/jls-08>) [VariableDeclaratorList](<#/doc/jls/jls-08>) `;`

ConstantModifier:

(um de)   
[Annotation](<#/doc/jls/jls-09>) `public`   
`static` `final`

InterfaceMethodDeclaration:

{[InterfaceMethodModifier](<#/doc/jls/jls-09>)} [MethodHeader](<#/doc/jls/jls-08>) [MethodBody](<#/doc/jls/jls-08>)

InterfaceMethodModifier:

(um de)   
[Annotation](<#/doc/jls/jls-09>) `public` `private`   
`abstract` `default` `static` `strictfp`

AnnotationInterfaceDeclaration:

{[InterfaceModifier](<#/doc/jls/jls-09>)} `@` `interface` [TypeIdentifier](<#/doc/jls/jls-03>) [AnnotationInterfaceBody](<#/doc/jls/jls-09>)

AnnotationInterfaceBody:

`{` {[AnnotationInterfaceMemberDeclaration](<#/doc/jls/jls-09>)} `}`

AnnotationInterfaceMemberDeclaration:

[AnnotationInterfaceElementDeclaration](<#/doc/jls/jls-09>)   
[ConstantDeclaration](<#/doc/jls/jls-09>)   
[ClassDeclaration](<#/doc/jls/jls-08>)   
[InterfaceDeclaration](<#/doc/jls/jls-09>)   
`;`

AnnotationInterfaceElementDeclaration:

{[AnnotationInterfaceElementModifier](<#/doc/jls/jls-09>)} [UnannType](<#/doc/jls/jls-08>) [Identifier](<#/doc/jls/jls-03>) `(` `)` [[Dims](<#/doc/jls/jls-04>)] [[DefaultValue](<#/doc/jls/jls-09>)] `;`

AnnotationInterfaceElementModifier:

(um de)   
[Annotation](<#/doc/jls/jls-09>) `public`   
`abstract`

DefaultValue:

`default` [ElementValue](<#/doc/jls/jls-09>)

Annotation:

[NormalAnnotation](<#/doc/jls/jls-09>)   
[MarkerAnnotation](<#/doc/jls/jls-09>)   
[SingleElementAnnotation](<#/doc/jls/jls-09>)

NormalAnnotation:

`@` [TypeName](<#/doc/jls/jls-06>) `(` [[ElementValuePairList](<#/doc/jls/jls-09>)] `)`

ElementValuePairList:

[ElementValuePair](<#/doc/jls/jls-09>) {`,` [ElementValuePair](<#/doc/jls/jls-09>)} 

ElementValuePair:

[Identifier](<#/doc/jls/jls-03>) `=` [ElementValue](<#/doc/jls/jls-09>)

ElementValue:

[ConditionalExpression](<#/doc/jls/jls-15>)   
[ElementValueArrayInitializer](<#/doc/jls/jls-09>)   
[Annotation](<#/doc/jls/jls-09>)

ElementValueArrayInitializer:

`{` [[ElementValueList](<#/doc/jls/jls-09>)] [`,`] `}`

ElementValueList:

[ElementValue](<#/doc/jls/jls-09>) {`,` [ElementValue](<#/doc/jls/jls-09>)} 

MarkerAnnotation:

`@` [TypeName](<#/doc/jls/jls-06>)

SingleElementAnnotation:

`@` [TypeName](<#/doc/jls/jls-06>) `(` [ElementValue](<#/doc/jls/jls-09>) `)`

**Produções de[§10 (_Arrays_)](<#/doc/jls/jls-10>)**

ArrayInitializer:

`{` [[VariableInitializerList](<#/doc/jls/jls-10>)] [`,`] `}`

VariableInitializerList:

[VariableInitializer](<#/doc/jls/jls-08>) {`,` [VariableInitializer](<#/doc/jls/jls-08>)} 

**Produções de[§14 (_Blocos, Declarações e Padrões_)](<#/doc/jls/jls-14>)**

Block:

`{` [[BlockStatements](<#/doc/jls/jls-14>)] `}`

BlockStatements:

[BlockStatement](<#/doc/jls/jls-14>) {[BlockStatement](<#/doc/jls/jls-14>)} 

BlockStatement:

[LocalClassOrInterfaceDeclaration](<#/doc/jls/jls-14>)   
[LocalVariableDeclarationStatement](<#/doc/jls/jls-14>)   
[Statement](<#/doc/jls/jls-14>)

LocalClassOrInterfaceDeclaration:

[ClassDeclaration](<#/doc/jls/jls-08>)   
[NormalInterfaceDeclaration](<#/doc/jls/jls-09>)

LocalVariableDeclarationStatement:

[LocalVariableDeclaration](<#/doc/jls/jls-14>) `;`

LocalVariableDeclaration:

{[VariableModifier](<#/doc/jls/jls-08>)} [LocalVariableType](<#/doc/jls/jls-14>) [VariableDeclaratorList](<#/doc/jls/jls-08>)

LocalVariableType:

[UnannType](<#/doc/jls/jls-08>)   
`var`

Statement:

[StatementWithoutTrailingSubstatement](<#/doc/jls/jls-14>)   
[LabeledStatement](<#/doc/jls/jls-14>)   
[IfThenStatement](<#/doc/jls/jls-14>)   
[IfThenElseStatement](<#/doc/jls/jls-14>)   
[WhileStatement](<#/doc/jls/jls-14>)   
[ForStatement](<#/doc/jls/jls-14>)

StatementNoShortIf:

[StatementWithoutTrailingSubstatement](<#/doc/jls/jls-14>)   
[LabeledStatementNoShortIf](<#/doc/jls/jls-14>)   
[IfThenElseStatementNoShortIf](<#/doc/jls/jls-14>)   
[WhileStatementNoShortIf](<#/doc/jls/jls-14>)   
[ForStatementNoShortIf](<#/doc/jls/jls-14>)

StatementWithoutTrailingSubstatement:

[Block](<#/doc/jls/jls-14>)   
[EmptyStatement](<#/doc/jls/jls-14>)   
[ExpressionStatement](<#/doc/jls/jls-14>)   
[AssertStatement](<#/doc/jls/jls-14>)   
[SwitchStatement](<#/doc/jls/jls-14>)   
[DoStatement](<#/doc/jls/jls-14>)   
[BreakStatement](<#/doc/jls/jls-14>)   
[ContinueStatement](<#/doc/jls/jls-14>)   
[ReturnStatement](<#/doc/jls/jls-14>)   
[SynchronizedStatement](<#/doc/jls/jls-14>)   
[ThrowStatement](<#/doc/jls/jls-14>)   
[TryStatement](<#/doc/jls/jls-14>)   
[YieldStatement](<#/doc/jls/jls-14>)

EmptyStatement:

`;`

LabeledStatement:

[Identifier](<#/doc/jls/jls-03>) `:` [Statement](<#/doc/jls/jls-14>)

LabeledStatementNoShortIf:

[Identifier](<#/doc/jls/jls-03>) `:` [StatementNoShortIf](<#/doc/jls/jls-14>)

ExpressionStatement:

[StatementExpression](<#/doc/jls/jls-14>) `;`

StatementExpression:

[Assignment](<#/doc/jls/jls-15>)   
[PreIncrementExpression](<#/doc/jls/jls-15>)   
[PreDecrementExpression](<#/doc/jls/jls-15>)   
[PostIncrementExpression](<#/doc/jls/jls-15>)   
[PostDecrementExpression](<#/doc/jls/jls-15>)   
[MethodInvocation](<#/doc/jls/jls-15>)   
[ClassInstanceCreationExpression](<#/doc/jls/jls-15>)

IfThenStatement:

`if` `(` [Expression](<#/doc/jls/jls-15>) `)` [Statement](<#/doc/jls/jls-14>)

IfThenElseStatement:

`if` `(` [Expression](<#/doc/jls/jls-15>) `)` [StatementNoShortIf](<#/doc/jls/jls-14>) `else` [Statement](<#/doc/jls/jls-14>)

IfThenElseStatementNoShortIf:

`if` `(` [Expression](<#/doc/jls/jls-15>) `)` [StatementNoShortIf](<#/doc/jls/jls-14>) `else` [StatementNoShortIf](<#/doc/jls/jls-14>)

AssertStatement:

`assert` [Expression](<#/doc/jls/jls-15>) `;`   
`assert` [Expression](<#/doc/jls/jls-15>) `:` [Expression](<#/doc/jls/jls-15>) `;`

SwitchStatement:

`switch` `(` [Expression](<#/doc/jls/jls-15>) `)` [SwitchBlock](<#/doc/jls/jls-14>)

SwitchBlock:

`{` [SwitchRule](<#/doc/jls/jls-14>) {[SwitchRule](<#/doc/jls/jls-14>)} `}`   
`{` {[SwitchBlockStatementGroup](<#/doc/jls/jls-14>)} {[SwitchLabel](<#/doc/jls/jls-14>) `:`} `}`

SwitchRule:

[SwitchLabel](<#/doc/jls/jls-14>) `->` [Expression](<#/doc/jls/jls-15>) `;`   
[SwitchLabel](<#/doc/jls/jls-14>) `->` [Block](<#/doc/jls/jls-14>)   
[SwitchLabel](<#/doc/jls/jls-14>) `->` [ThrowStatement](<#/doc/jls/jls-14>)

SwitchBlockStatementGroup:

[SwitchLabel](<#/doc/jls/jls-14>) `:` {[SwitchLabel](<#/doc/jls/jls-14>) `:`} [BlockStatements](<#/doc/jls/jls-14>)

SwitchLabel:

`case` [CaseConstant](<#/doc/jls/jls-14>) {`,` [CaseConstant](<#/doc/jls/jls-14>)}   
`case` `null` [`,` `default`]   
`case` [CasePattern](<#/doc/jls/jls-14>) {`,` [CasePattern](<#/doc/jls/jls-14>)} [[Guard](<#/doc/jls/jls-14>)]   
`default`

CaseConstant:

[ConditionalExpression](<#/doc/jls/jls-15>)

CasePattern:

[Pattern](<#/doc/jls/jls-14>)

Guard:

`when` [Expression](<#/doc/jls/jls-15>)

WhileStatement:

`while` `(` [Expression](<#/doc/jls/jls-15>) `)` [Statement](<#/doc/jls/jls-14>)

WhileStatementNoShortIf:

`while` `(` [Expression](<#/doc/jls/jls-15>) `)` [StatementNoShortIf](<#/doc/jls/jls-14>)

DoStatement:

`do` [Statement](<#/doc/jls/jls-14>) `while` `(` [Expression](<#/doc/jls/jls-15>) `)` `;`

ForStatement:

[BasicForStatement](<#/doc/jls/jls-14>)   
[EnhancedForStatement](<#/doc/jls/jls-14>)

ForStatementNoShortIf:

[BasicForStatementNoShortIf](<#/doc/jls/jls-14>)   
[EnhancedForStatementNoShortIf](<#/doc/jls/jls-14>)

BasicForStatement:

`for` `(` [[ForInit](<#/doc/jls/jls-14>)] `;` [[Expression](<#/doc/jls/jls-15>)] `;` [[ForUpdate](<#/doc/jls/jls-14>)] `)` [Statement](<#/doc/jls/jls-14>)

BasicForStatementNoShortIf:

`for` `(` [[ForInit](<#/doc/jls/jls-14>)] `;` [[Expression](<#/doc/jls/jls-15>)] `;` [[ForUpdate](<#/doc/jls/jls-14>)] `)` [StatementNoShortIf](<#/doc/jls/jls-14>)

ForInit:

[StatementExpressionList](<#/doc/jls/jls-14>)   
[LocalVariableDeclaration](<#/doc/jls/jls-14>)

ForUpdate:

[StatementExpressionList](<#/doc/jls/jls-14>)

StatementExpressionList:

[StatementExpression](<#/doc/jls/jls-14>) {`,` [StatementExpression](<#/doc/jls/jls-14>)} 

EnhancedForStatement:

`for` `(` [LocalVariableDeclaration](<#/doc/jls/jls-14>) `:` [Expression](<#/doc/jls/jls-15>) `)` [Statement](<#/doc/jls/jls-14>)

EnhancedForStatementNoShortIf:

`for` `(` [LocalVariableDeclaration](<#/doc/jls/jls-14>) `:` [Expression](<#/doc/jls/jls-15>) `)` [StatementNoShortIf](<#/doc/jls/jls-14>)

BreakStatement:

`break` [[Identifier](<#/doc/jls/jls-03>)] `;`

YieldStatement:

`yield` [Expression](<#/doc/jls/jls-15>) `;`

ContinueStatement:

`continue` [[Identifier](<#/doc/jls/jls-03>)] `;`

ReturnStatement:

`return` [[Expression](<#/doc/jls/jls-15>)] `;`

ThrowStatement:

`throw` [Expression](<#/doc/jls/jls-15>) `;`

SynchronizedStatement:

`synchronized` `(` [Expression](<#/doc/jls/jls-15>) `)` [Block](<#/doc/jls/jls-14>)

TryStatement:

`try` [Block](<#/doc/jls/jls-14>) [Catches](<#/doc/jls/jls-14>)   
`try` [Block](<#/doc/jls/jls-14>) [[Catches](<#/doc/jls/jls-14>)] [Finally](<#/doc/jls/jls-14>)   
[TryWithResourcesStatement](<#/doc/jls/jls-14>)

Catches:

[CatchClause](<#/doc/jls/jls-14>) {[CatchClause](<#/doc/jls/jls-14>)} 

CatchClause:

`catch` `(` [CatchFormalParameter](<#/doc/jls/jls-14>) `)` [Block](<#/doc/jls/jls-14>)

CatchFormalParameter:

{[VariableModifier](<#/doc/jls/jls-08>)} [CatchType](<#/doc/jls/jls-14>) [VariableDeclaratorId](<#/doc/jls/jls-08>)

CatchType:

[UnannClassType](<#/doc/jls/jls-08>) {`|` [ClassType](<#/doc/jls/jls-04>)} 

Finally:

`finally` [Block](<#/doc/jls/jls-14>)

TryWithResourcesStatement:

`try` [ResourceSpecification](<#/doc/jls/jls-14>) [Block](<#/doc/jls/jls-14>) [[Catches](<#/doc/jls/jls-14>)] [[Finally](<#/doc/jls/jls-14>)] 

ResourceSpecification:

`(` [ResourceList](<#/doc/jls/jls-14>) [`;`] `)`

ResourceList:

[Resource](<#/doc/jls/jls-14>) {`;` [Resource](<#/doc/jls/jls-14>)} 

Resource:

[LocalVariableDeclaration](<#/doc/jls/jls-14>)   
[VariableAccess](<#/doc/jls/jls-14>)

VariableAccess:

[ExpressionName](<#/doc/jls/jls-06>)   
[FieldAccess](<#/doc/jls/jls-15>)

Pattern:

[TypePattern](<#/doc/jls/jls-14>)   
[RecordPattern](<#/doc/jls/jls-14>)

TypePattern:

[LocalVariableDeclaration](<#/doc/jls/jls-14>)

RecordPattern:

[ReferenceType](<#/doc/jls/jls-04>) `(` [[ComponentPatternList](<#/doc/jls/jls-14>)] `)`

ComponentPatternList:

[ComponentPattern](<#/doc/jls/jls-14>) {`,` [ComponentPattern](<#/doc/jls/jls-14>) } 

ComponentPattern:

[Pattern](<#/doc/jls/jls-14>)   
[MatchAllPattern](<#/doc/jls/jls-14>)

MatchAllPattern:

`_`

**Produções de[§15 (_Expressões_)](<#/doc/jls/jls-15>)**

Primary:

[PrimaryNoNewArray](<#/doc/jls/jls-15>)   
[ArrayCreationExpression](<#/doc/jls/jls-15>)

PrimaryNoNewArray:

[Literal](<#/doc/jls/jls-03>)   
[ClassLiteral](<#/doc/jls/jls-15>)   
`this`   
[TypeName](<#/doc/jls/jls-06>) `.` `this`   
`(` [Expression](<#/doc/jls/jls-15>) `)`   
[ClassInstanceCreationExpression](<#/doc/jls/jls-15>)   
[FieldAccess](<#/doc/jls/jls-15>)   
[ArrayAccess](<#/doc/jls/jls-15>)   
[MethodInvocation](<#/doc/jls/jls-15>)   
[MethodReference](<#/doc/jls/jls-15>)

ClassLiteral:

[TypeName](<#/doc/jls/jls-06>) {`[` `]`} `.` `class`   
[NumericType](<#/doc/jls/jls-04>) {`[` `]`} `.` `class`   
`boolean` {`[` `]`} `.` `class`   
`void` `.` `class`

ClassInstanceCreationExpression:

[UnqualifiedClassInstanceCreationExpression](<#/doc/jls/jls-15>)   
[ExpressionName](<#/doc/jls/jls-06>) `.` [UnqualifiedClassInstanceCreationExpression](<#/doc/jls/jls-15>)   
[Primary](<#/doc/jls/jls-15>) `.` [UnqualifiedClassInstanceCreationExpression](<#/doc/jls/jls-15>)

UnqualifiedClassInstanceCreationExpression:

`new` [[TypeArguments](<#/doc/jls/jls-04>)] [ClassOrInterfaceTypeToInstantiate](<#/doc/jls/jls-15>) `(` [[ArgumentList](<#/doc/jls/jls-15>)] `)` [[ClassBody](<#/doc/jls/jls-08>)] 

ClassOrInterfaceTypeToInstantiate:

{[Annotation](<#/doc/jls/jls-09>)} [Identifier](<#/doc/jls/jls-03>) {`.` {[Annotation](<#/doc/jls/jls-09>)} [Identifier](<#/doc/jls/jls-03>)} [[TypeArgumentsOrDiamond](<#/doc/jls/jls-15>)] 

TypeArgumentsOrDiamond:

[TypeArguments](<#/doc/jls/jls-04>)   
`<>`

ArrayCreationExpression:

[ArrayCreationExpressionWithoutInitializer](<#/doc/jls/jls-15>)   
[ArrayCreationExpressionWithInitializer](<#/doc/jls/jls-15>)

ArrayCreationExpressionWithoutInitializer:

`new` [PrimitiveType](<#/doc/jls/jls-04>) [DimExprs](<#/doc/jls/jls-15>) [[Dims](<#/doc/jls/jls-04>)]   
`new` [ClassOrInterfaceType](<#/doc/jls/jls-04>) [DimExprs](<#/doc/jls/jls-15>) [[Dims](<#/doc/jls/jls-04>)] 

ArrayCreationExpressionWithInitializer:

`new` [PrimitiveType](<#/doc/jls/jls-04>) [Dims](<#/doc/jls/jls-04>) [ArrayInitializer](<#/doc/jls/jls-10>)   
`new` [ClassOrInterfaceType](<#/doc/jls/jls-04>) [Dims](<#/doc/jls/jls-04>) [ArrayInitializer](<#/doc/jls/jls-10>)

DimExprs:

[DimExpr](<#/doc/jls/jls-15>) {[DimExpr](<#/doc/jls/jls-15>)} 

DimExpr:

{[Annotation](<#/doc/jls/jls-09>)} `[` [Expression](<#/doc/jls/jls-15>) `]`

ArrayAccess:

[ExpressionName](<#/doc/jls/jls-06>) `[` [Expression](<#/doc/jls/jls-15>) `]`   
[PrimaryNoNewArray](<#/doc/jls/jls-15>) `[` [Expression](<#/doc/jls/jls-15>) `]`   
[ArrayCreationExpressionWithInitializer](<#/doc/jls/jls-15>) `[` [Expression](<#/doc/jls/jls-15>) `]`

FieldAccess:

[Primary](<#/doc/jls/jls-15>) `.` [Identifier](<#/doc/jls/jls-03>)   
`super` `.` [Identifier](<#/doc/jls/jls-03>)   
[TypeName](<#/doc/jls/jls-06>) `.` `super` `.` [Identifier](<#/doc/jls/jls-03>)

MethodInvocation:

[MethodName](<#/doc/jls/jls-06>) `(` [[ArgumentList](<#/doc/jls/jls-15>)] `)`   
[TypeName](<#/doc/jls/jls-06>) `.` [[TypeArguments](<#/doc/jls/jls-04>)] [Identifier](<#/doc/jls/jls-03>) `(` [[ArgumentList](<#/doc/jls/jls-15>)] `)`   
[ExpressionName](<#/doc/jls/jls-06>) `.` [[TypeArguments](<#/doc/jls/jls-04>)] [Identifier](<#/doc/jls/jls-03>) `(` [[ArgumentList](<#/doc/jls/jls-15>)] `)`   
[Primary](<#/doc/jls/jls-15>) `.` [[TypeArguments](<#/doc/jls/jls-04>)] [Identifier](<#/doc/jls/jls-03>) `(` [[ArgumentList](<#/doc/jls/jls-15>)] `)`   
`super` `.` [[TypeArguments](<#/doc/jls/jls-04>)] [Identifier](<#/doc/jls/jls-03>) `(` [[ArgumentList](<#/doc/jls/jls-15>)] `)`   
[TypeName](<#/doc/jls/jls-06>) `.` `super` `.` [[TypeArguments](<#/doc/jls/jls-04>)] [Identifier](<#/doc/jls/jls-03>) `(` [[ArgumentList](<#/doc/jls/jls-15>)] `)`

ArgumentList:

[Expression](<#/doc/jls/jls-15>) {`,` [Expression](<#/doc/jls/jls-15>)} 

MethodReference:

[ExpressionName](<#/doc/jls/jls-06>) `::` [[TypeArguments](<#/doc/jls/jls-04>)] [Identifier](<#/doc/jls/jls-03>)   
[Primary](<#/doc/jls/jls-15>) `::` [[TypeArguments](<#/doc/jls/jls-04>)] [Identifier](<#/doc/jls/jls-03>)   
[ReferenceType](<#/doc/jls/jls-04>) `::` [[TypeArguments](<#/doc/jls/jls-04>)] [Identifier](<#/doc/jls/jls-03>)   
`super` `::` [[TypeArguments](<#/doc/jls/jls-04>)] [Identifier](<#/doc/jls/jls-03>)   
[TypeName](<#/doc/jls/jls-06>) `.` `super` `::` [[TypeArguments](<#/doc/jls/jls-04>)] [Identifier](<#/doc/jls/jls-03>)   
[ClassType](<#/doc/jls/jls-04>) `::` [[TypeArguments](<#/doc/jls/jls-04>)] `new`   
[ArrayType](<#/doc/jls/jls-04>) `::` `new`

Expression:

[LambdaExpression](<#/doc/jls/jls-15>)   
[AssignmentExpression](<#/doc/jls/jls-15>)

LambdaExpression:

[LambdaParameters](<#/doc/jls/jls-15>) `->` [LambdaBody](<#/doc/jls/jls-15>)

LambdaParameters:

`(` [[LambdaParameterList](<#/doc/jls/jls-15>)] `)`   
[ConciseLambdaParameter](<#/doc/jls/jls-15>)

LambdaParameterList:

[NormalLambdaParameter](<#/doc/jls/jls-15>) {`,` [NormalLambdaParameter](<#/doc/jls/jls-15>)}   
[ConciseLambdaParameter](<#/doc/jls/jls-15>) {`,` [ConciseLambdaParameter](<#/doc/jls/jls-15>)} 

NormalLambdaParameter:

{[VariableModifier](<#/doc/jls/jls-08>)} [LambdaParameterType](<#/doc/jls/jls-15>) [VariableDeclaratorId](<#/doc/jls/jls-08>)   
[VariableArityParameter](<#/doc/jls/jls-08>)

LambdaParameterType:

[UnannType](<#/doc/jls/jls-08>)   
`var`

ConciseLambdaParameter:

[Identifier](<#/doc/jls/jls-03>)   
`_`

LambdaBody:

[Expression](<#/doc/jls/jls-15>)   
[Block](<#/doc/jls/jls-14>)

AssignmentExpression:

[ConditionalExpression](<#/doc/jls/jls-15>)   
[Assignment](<#/doc/jls/jls-15>)

Assignment:

[LeftHandSide](<#/doc/jls/jls-15>) [AssignmentOperator](<#/doc/jls/jls-15>) [Expression](<#/doc/jls/jls-15>)

LeftHandSide:

[ExpressionName](<#/doc/jls/jls-06>)   
[FieldAccess](<#/doc/jls/jls-15>)   
[ArrayAccess](<#/doc/jls/jls-15>)

AssignmentOperator:

(um de)   

```
=  *=  /=  %=  +=  -=  <<=  >>=  >>>=  &=  ^=  |=
```

ConditionalExpression:

[ConditionalOrExpression](<#/doc/jls/jls-15>)   
[ConditionalOrExpression](<#/doc/jls/jls-15>) `?` [Expression](<#/doc/jls/jls-15>) `:` [ConditionalExpression](<#/doc/jls/jls-15>)   
[ConditionalOrExpression](<#/doc/jls/jls-15>) `?` [Expression](<#/doc/jls/jls-15>) `:` [LambdaExpression](<#/doc/jls/jls-15>)   


ConditionalOrExpression:

[ConditionalAndExpression](<#/doc/jls/jls-15>)   
[ConditionalOrExpression](<#/doc/jls/jls-15>) `||` ConditionalAndExpression 

ConditionalAndExpression:

[InclusiveOrExpression](<#/doc/jls/jls-15>)   
[ConditionalAndExpression](<#/doc/jls/jls-15>) `&&` [InclusiveOrExpression](<#/doc/jls/jls-15>)

InclusiveOrExpression:

[ExclusiveOrExpression](<#/doc/jls/jls-15>)   
[InclusiveOrExpression](<#/doc/jls/jls-15>) `|` [ExclusiveOrExpression](<#/doc/jls/jls-15>)

ExclusiveOrExpression:

[AndExpression](<#/doc/jls/jls-15>)   
[ExclusiveOrExpression](<#/doc/jls/jls-15>) `^` [AndExpression](<#/doc/jls/jls-15>)

AndExpression:

[EqualityExpression](<#/doc/jls/jls-15>)   
[AndExpression](<#/doc/jls/jls-15>) `&` [EqualityExpression](<#/doc/jls/jls-15>)

EqualityExpression:

[RelationalExpression](<#/doc/jls/jls-15>)   
[EqualityExpression](<#/doc/jls/jls-15>) `==` [RelationalExpression](<#/doc/jls/jls-15>)   
[EqualityExpression](<#/doc/jls/jls-15>) `!=` [RelationalExpression](<#/doc/jls/jls-15>)

RelationalExpression:

[ShiftExpression](<#/doc/jls/jls-15>)   
[RelationalExpression](<#/doc/jls/jls-15>) `<` [ShiftExpression](<#/doc/jls/jls-15>)   
[RelationalExpression](<#/doc/jls/jls-15>) `>` [ShiftExpression](<#/doc/jls/jls-15>)   
[RelationalExpression](<#/doc/jls/jls-15>) `<=` [ShiftExpression](<#/doc/jls/jls-15>)   
[RelationalExpression](<#/doc/jls/jls-15>) `>=` [ShiftExpression](<#/doc/jls/jls-15>)   
[InstanceofExpression](<#/doc/jls/jls-15>)

InstanceofExpression:

[RelationalExpression](<#/doc/jls/jls-15>) `instanceof` [ReferenceType](<#/doc/jls/jls-04>)   
[RelationalExpression](<#/doc/jls/jls-15>) `instanceof` [Pattern](<#/doc/jls/jls-14>)

ShiftExpression:

[AdditiveExpression](<#/doc/jls/jls-15>)   
[ShiftExpression](<#/doc/jls/jls-15>) `<<` [AdditiveExpression](<#/doc/jls/jls-15>)   
[ShiftExpression](<#/doc/jls/jls-15>) `>>` [AdditiveExpression](<#/doc/jls/jls-15>)   
[ShiftExpression](<#/doc/jls/jls-15>) `>>>` [AdditiveExpression](<#/doc/jls/jls-15>)

AdditiveExpression:

[MultiplicativeExpression](<#/doc/jls/jls-15>)   
[AdditiveExpression](<#/doc/jls/jls-15>) `+` [MultiplicativeExpression](<#/doc/jls/jls-15>)   
[AdditiveExpression](<#/doc/jls/jls-15>) `-` [MultiplicativeExpression](<#/doc/jls/jls-15>)

MultiplicativeExpression:

[UnaryExpression](<#/doc/jls/jls-15>)   
[MultiplicativeExpression](<#/doc/jls/jls-15>) `*` [UnaryExpression](<#/doc/jls/jls-15>)   
[MultiplicativeExpression](<#/doc/jls/jls-15>) `/` [UnaryExpression](<#/doc/jls/jls-15>)   
[MultiplicativeExpression](<#/doc/jls/jls-15>) `%` [UnaryExpression](<#/doc/jls/jls-15>)

UnaryExpression:

[PreIncrementExpression](<#/doc/jls/jls-15>)   
[PreDecrementExpression](<#/doc/jls/jls-15>)   
`+` [UnaryExpression](<#/doc/jls/jls-15>)   
`-` [UnaryExpression](<#/doc/jls/jls-15>)   
[UnaryExpressionNotPlusMinus](<#/doc/jls/jls-15>)

PreIncrementExpression:

`++` [UnaryExpression](<#/doc/jls/jls-15>)

PreDecrementExpression:

`--` [UnaryExpression](<#/doc/jls/jls-15>)

UnaryExpressionNotPlusMinus:

[PostfixExpression](<#/doc/jls/jls-15>)   
`~` [UnaryExpression](<#/doc/jls/jls-15>)   
`!` [UnaryExpression](<#/doc/jls/jls-15>)   
[CastExpression](<#/doc/jls/jls-15>)   
[SwitchExpression](<#/doc/jls/jls-15>)

PostfixExpression:

[Primary](<#/doc/jls/jls-15>)   
[ExpressionName](<#/doc/jls/jls-06>)   
[PostIncrementExpression](<#/doc/jls/jls-15>)   
[PostDecrementExpression](<#/doc/jls/jls-15>)

PostIncrementExpression:

[PostfixExpression](<#/doc/jls/jls-15>) `++`

PostDecrementExpression:

[PostfixExpression](<#/doc/jls/jls-15>) `--`

CastExpression:

`(` [PrimitiveType](<#/doc/jls/jls-04>) `)` [UnaryExpression](<#/doc/jls/jls-15>)   
`(` [ReferenceType](<#/doc/jls/jls-04>) {[AdditionalBound](<#/doc/jls/jls-04>)} `)` [UnaryExpressionNotPlusMinus](<#/doc/jls/jls-15>)   
`(` [ReferenceType](<#/doc/jls/jls-04>) {[AdditionalBound](<#/doc/jls/jls-04>)} `)` [LambdaExpression](<#/doc/jls/jls-15>)   


SwitchExpression:

`switch` `(` [Expression](<#/doc/jls/jls-15>) `)` [SwitchBlock](<#/doc/jls/jls-14>)

* * *

[Anterior](<#/doc/jls/jls-18>)  |   |  [Próximo](<#/>)  
---|---|---  
Capítulo 18. Inferência de Tipo  | [Início](<#/doc/jls/jls-01>) |  Apêndice A. Concessão de Licença Limitada  
  
* * *

[ Aviso Legal ](<#/>)