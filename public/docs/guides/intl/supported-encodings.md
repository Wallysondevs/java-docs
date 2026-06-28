# Codificações Suportadas

## 2 Codificações Suportadas

As classes `java.io.InputStreamReader`, `java.io.OutputStreamWriter`, `java.lang.String` e as classes no pacote `java.nio.charset` podem converter entre Unicode e várias outras codificações de caracteres. As codificações suportadas variam entre diferentes implementações da Plataforma Java SE. A descrição da classe para java.nio.charset.Charset lista as codificações que qualquer implementação da plataforma Java SE é obrigada a suportar.

As tabelas a seguir mostram os conjuntos de codificação suportados por esta versão da plataforma Oracle Java SE. Os nomes canônicos usados pelas APIs `java.nio` em muitos casos não são os mesmos que os usados nas APIs `java.io` e `java.lang`.

### Conjunto de Codificação Básico (contido no módulo java.base)

Nome Canônico para API java.nio | Nome Canônico para API java.io e API java.lang | Alias ou Aliases | Descrição
---|---|---|---
CESU-8 | CESU8 | CESU8 csCESU-8 | Unicode CESU-8
GB18030 | GB18030 | gb18030-2022 or gb18030-2000 if the system property and value `jdk.charset.GB18030=2000` are specified | Chinês Simplificado, padrão da RPC
IBM00858 | Cp858 | cp858 ccsid00858 cp00858 858 PC-Multilingual-850+euro | Variante de Cp850 com caractere Euro
IBM437 | Cp437 | cp437 ibm437 ibm-437 437 cspc8codepage437 windows-437 | MS-DOS Estados Unidos, Austrália, Nova Zelândia, África do Sul
IBM775 | Cp775 | cp775 ibm775 ibm-775 775 | PC Báltico
IBM850 | Cp850 | cp850 ibm-850 ibm850 850 cspc850multilingual | MS-DOS Latin-1
IBM852 | Cp852 | cp852 ibm852 ibm-852 852 csPCp852 | MS-DOS Latin-2
IBM855 | Cp855 | cp855 ibm-855 ibm855 855 cspcp855 | IBM Cirílico
IBM857 | Cp857 | cp857 ibm857 ibm-857 857 csIBM857 | IBM Turco
IBM862 | Cp862 | cp862 ibm862 ibm-862 862 csIBM862 cspc862latinhebrew | PC Hebraico
IBM866 | Cp866 | cp866 ibm866 ibm-866 866 csIBM866 | MS-DOS Russo
ISO-8859-1 | ISO8859_1 | iso-ir-100 ISO_8859-1 latin1 l1 IBM819 cp819 csISOLatin1 819 IBM-819 ISO8859_1 ISO_8859-1:1987 ISO_8859_1 8859_1 ISO8859-1 | ISO-8859-1, Alfabeto Latino Nº 1
ISO-8859-13 | ISO8859_13 | iso8859_13 8859_13 iso_8859-13 ISO8859-13 | Alfabeto Latino Nº 7
ISO-8859-15 | ISO8859_15 | ISO_8859-15 Latin-9 csISO885915 8859_15 ISO-8859-15 ISO8859_15 ISO8859-15 IBM923 IBM-923 cp923 923 LATIN0 LATIN9 L9 csISOlatin0 csISOlatin9 ISO8859_15_FDIS | Alfabeto Latino Nº 9
ISO-8859-16 | ISO8859_16 | iso-ir-226 ISO_8859-16:2001 ISO_8859-16 latin10 l10 csISO885916 | Alfabeto Latino Nº 10 ou Sudeste Europeu
ISO-8859-2 | ISO8859_2 | iso8859_2 8859_2 iso-ir-101 ISO_8859-2 ISO_8859-2:1987 ISO8859-2 latin2 l2 ibm912 ibm-912 cp912 912 csISOLatin2 | Alfabeto Latino Nº 2
ISO-8859-4 | ISO8859_4 | iso8859_4 iso8859-4 8859_4 iso-ir-110 ISO_8859-4 ISO_8859-4:1988 latin4 l4 ibm914 ibm-914 cp914 914 csISOLatin4 | Alfabeto Latino Nº 4
ISO-8859-5 | ISO8859_5 | iso8859_5 8859_5 iso-ir-144 ISO_8859-5 ISO_8859-5:1988 ISO8859-5 cyrillic ibm915 ibm-915 cp915 915 csISOLatinCyrillic | Alfabeto Latino/Cirílico
ISO-8859-7 | ISO8859_7 | iso8859_7 8859_7 iso-ir-126 ISO_8859-7 ISO_8859-7:1987 ELOT_928 ECMA-118 greek greek8 csISOLatinGreek sun_eu_greek ibm813 ibm-813 813 cp813 iso8859-7 | Alfabeto Latino/Grego (ISO-8859-7:2003)
ISO-8859-9 | ISO8859_9 | iso8859_9 8859_9 iso-ir-148 ISO_8859-9 ISO_8859-9:1989 ISO8859-9 latin5 l5 ibm920 ibm-920 920 cp920 csISOLatin5 | Alfabeto Latino Nº 5
KOI8-R | KOI8_R | koi8_r koi8 cskoi8r | KOI8-R, Russo
KOI8-U | KOI8_U | koi8_u | KOI8-U, Ucraniano
US-ASCII | ASCII | iso-ir-6 ANSI_X3.4-1986 ISO_646.irv:1991 ASCII ISO646-US us IBM367 cp367 csASCII default 646 iso_646.irv:1983 ANSI_X3.4-1968 ascii7 | Código Padrão Americano para Intercâmbio de Informações
UTF-16 | UTF-16 | UTF_16 utf16 unicode UnicodeBig | Formato de Transformação Unicode (ou UCS) de dezesseis bits, ordem de bytes identificada por uma marca de ordem de bytes opcional
UTF-16BE | UnicodeBigUnmarked | UTF_16BE ISO-10646-UCS-2 X-UTF-16BE UnicodeBigUnmarked | Formato de Transformação Unicode (ou UCS) de dezesseis bits, ordem de bytes big-endian
UTF-16LE | UnicodeLittleUnmarked | UTF_16LE X-UTF-16LE UnicodeLittleUnmarked | Formato de Transformação Unicode (ou UCS) de dezesseis bits, ordem de bytes little-endian
UTF-32 | UTF-32 | UTF_32 UTF32 | Formato de Transformação Unicode (ou UCS) de 32 bits, ordem de bytes identificada por uma marca de ordem de bytes opcional
UTF-32BE | UTF-32BE | UTF_32BE X-UTF-32BE | Formato de Transformação Unicode (ou UCS) de 32 bits, ordem de bytes big-endian
UTF-32LE | UTF-32LE | UTF_32LE X-UTF-32LE | Formato de Transformação Unicode (ou UCS) de 32 bits, ordem de bytes little-endian
UTF-8 | UTF8 | UTF8 unicode-1-1-utf-8 | Formato de Transformação Unicode (ou UCS) de oito bits
windows-1250 | Cp1250 | cp1250 cp5346 | Windows Europa Oriental
windows-1251 | Cp1251 | cp1251 cp5347 ansi-1251 | Windows Cirílico
windows-1252 | Cp1252 | cp1252 cp5348 ibm-1252 ibm1252 | Windows Latin-1
windows-1253 | Cp1253 | cp1253 cp5349 | Windows Grego
windows-1254 | Cp1254 | cp1254 cp5350 | Windows Turco
windows-1257 | Cp1257 | cp1257 cp5353 | Windows Báltico
x-IBM737 | Cp737 | cp737 ibm737 ibm-737 737 | PC Grego
x-IBM874 | Cp874 | cp874 ibm874 ibm-874 874 | IBM Tailandês
x-UTF-16LE-BOM | UnicodeLittle | UnicodeLittle | Formato de Transformação Unicode (ou UCS) de dezesseis bits, ordem de bytes little-endian, com marca de ordem de bytes
X-UTF-32BE-BOM | X-UTF-32BE-BOM | UTF_32BE_BOM UTF-32BE-BOM | Formato de Transformação Unicode (ou UCS) de 32 bits, ordem de bytes big-endian, com marca de ordem de bytes
X-UTF-32LE-BOM | X-UTF-32LE-BOM | UTF_32LE_BOM UTF-32LE-BOM | Formato de Transformação Unicode (ou UCS) de 32 bits, ordem de bytes little-endian, com marca de ordem de bytes

### Conjunto de Codificação Estendido (contido no módulo jdk.charsets)

Nome Canônico para API java.nio | Nome Canônico para API java.io e API java.lang | Alias ou Aliases | Descrição
---|---|---|---
Big5 | Big5 | csBig5 | Big5, Chinês Tradicional
Big5-HKSCS | Big5_HKSCS | Big5_HKSCS big5hk big5-hkscs big5hkscs | Big5 com extensões de Hong Kong, Chinês Tradicional (incorporando revisão de 2001)
EUC-JP | EUC_JP | euc_jp eucjis eucjp Extended_UNIX_Code_Packed_Format_for_Japanese csEUCPkdFmtjapanese x-euc-jp x-eucjp | JISX 0201, 0208 e 0212, codificação EUC Japonês
EUC-KR | EUC_KR | euc_kr ksc5601 euckr ks_c_5601-1987 ksc5601-1987 ksc5601_1987 ksc_5601 csEUCKR 5601 | KS C 5601, codificação EUC, Coreano
GB2312 | EUC_CN | gb2312 gb2312-80 gb2312-1980 euc-cn euccn x-EUC-CN EUC_CN | GB2312, codificação EUC, Chinês Simplificado
GBK | GBK | windows-936 CP936 | GBK, Chinês Simplificado
IBM01140 | Cp1140 | cp1140 ccsid01140 cp01140 1140 ebcdic-us-037+euro | Variante de Cp037 com caractere Euro
IBM01141 | Cp1141 | cp1141 ccsid01141 cp01141 1141 ebcdic-de-273+euro | Variante de Cp273 com caractere Euro
IBM01142 | Cp1142 | cp1142 ccsid01142 cp01142 1142 ebcdic-no-277+euro ebcdic-dk-277+euro | Variante de Cp277 com caractere Euro
IBM01143 | Cp1143 | cp1143 ccsid01143 cp01143 1143 ebcdic-fi-278+euro ebcdic-se-278+euro | Variante de Cp278 com caractere Euro
IBM01144 | Cp1144 | cp1144 ccsid01144 cp01144 1144 ebcdic-it-280+euro | Variante de Cp280 com caractere Euro
IBM01145 | Cp1145 | cp1145 ccsid01145 cp01145 1145 ebcdic-es-284+euro | Variante de Cp284 com caractere Euro
IBM01146 | Cp1146 | cp1146 ccsid01146 cp01146 1146 ebcdic-gb-285+euro | Variante de Cp285 com caractere Euro
IBM01147 | Cp1147 | cp1147 ccsid01147 cp01147 1147 ebcdic-fr-277+euro | Variante de Cp297 com caractere Euro
IBM01148 | Cp1148 | cp1148 ccsid01148 cp01148 1148 ebcdic-international-500+euro | Variante de Cp500 com caractere Euro
IBM01149 | Cp1149 | cp1149 ccsid01149 cp01149 1149 ebcdic-s-871+euro | Variante de Cp871 com caractere Euro
IBM037 | Cp037 | cp037 ibm037 ebcdic-cp-us ebcdic-cp-ca ebcdic-cp-wt ebcdic-cp-nl csIBM037 cs-ebcdic-cp-us cs-ebcdic-cp-ca cs-ebcdic-cp-wt cs-ebcdic-cp-nl ibm-037 ibm-37 cpibm37 037 | EUA, Canadá (Bilíngue, Francês), Holanda, Portugal, Brasil, Austrália
IBM1026 | Cp1026 | cp1026 ibm1026 ibm-1026 1026 | IBM Latin-5, Turquia
IBM1047 | Cp1047 | cp1047 ibm-1047 1047 | Conjunto de caracteres Latin-1 para hosts EBCDIC
IBM273 | Cp273 | cp273 ibm273 ibm-273 273 | IBM Áustria, Alemanha
IBM277 | Cp277 | cp277 ibm277 ibm-277 277 | IBM Dinamarca, Noruega
IBM278 | Cp278 | cp278 ibm278 ibm-278 278 ebcdic-sv ebcdic-cp-se csIBM278 | IBM Finlândia, Suécia
IBM280 | Cp280 | cp280 ibm280 ibm-280 280 | IBM Itália
IBM284 | Cp284 | cp284 ibm284 ibm-284 284 csIBM284 cpibm284 | IBM Catalão/Espanha, América Latina Espanhola
IBM285 | Cp285 | cp285 ibm285 ibm-285 285 ebcdic-cp-gb ebcdic-gb csIBM285 cpibm285 | IBM Reino Unido, Irlanda
IBM290 | Cp290 | cp290 ibm290 ibm-290 csIBM290 EBCDIC-JP-kana 290 | IBM Japonês Katakana Host Extended SBCS
IBM297 | Cp297 | cp297 ibm297 ibm-297 297 ebcdic-cp-fr cpibm297 csIBM297 | IBM França
IBM420 | Cp420 | cp420 ibm420 ibm-420 ebcdic-cp-ar1 420 csIBM420 | IBM Árabe
IBM424 | Cp424 | cp424 ibm424 ibm-424 424 ebcdic-cp-he csIBM424 | IBM Hebraico
IBM500 | Cp500 | cp500 ibm500 ibm-500 500 ebcdic-cp-ch ebcdic-cp-bh csIBM500 | EBCDIC 500V1
IBM860 | Cp860 | cp860 ibm860 ibm-860 860 csIBM860 | MS-DOS Português
IBM861 | Cp861 | cp861 ibm861 ibm-861 861 csIBM861 cp-is | MS-DOS Islandês
IBM863 | Cp863 | cp863 ibm863 ibm-863 863 csIBM863 | MS-DOS Francês Canadense
IBM864 | Cp864 | cp864 ibm864 ibm-864 864 csIBM864 | PC Árabe
IBM865 | Cp865 | cp865 ibm865 ibm-865 865 csIBM865 | MS-DOS Nórdico
IBM868 | Cp868 | cp868 ibm868 ibm-868 868 cp-ar csIBM868 | MS-DOS Paquistão
IBM869 | Cp869 | cp869 ibm869 ibm-869 869 cp-gr csIBM869 | IBM Grego Moderno
IBM870 | Cp870 | cp870 ibm870 ibm-870 870 ebcdic-cp-roece ebcdic-cp-yu csIBM870 | IBM Multilíngue Latin-2
IBM871 | Cp871 | cp871 ibm871 ibm-871 871 ebcdic-cp-is csIBM871 | IBM Islândia
IBM918 | Cp918 | cp918 ibm-918 918 ebcdic-cp-ar2 | IBM Paquistão (Urdu)
IBM-Thai | Cp838 | cp838 ibm838 ibm-838 838 | IBM Tailândia SBCS estendido
ISO-2022-CN | ISO2022CN | ISO2022CN csISO2022CN | GB2312 e CNS11643 em formato ISO 2022 CN, Chinês Simplificado e Tradicional (conversão para Unicode apenas)
ISO-2022-JP | ISO2022JP | iso2022jp jis csISO2022JP jis_encoding csjisencoding | JIS X 0201, 0208, em formato ISO 2022, Japonês
ISO-2022-JP-2 | ISO2022JP2 | csISO2022JP2 iso2022jp2 | JIS X 0201, 0208, 0212 em formato ISO 2022, Japonês
ISO-2022-KR | ISO2022KR | ISO2022KR csISO2022KR | ISO 2022 KR, Coreano
ISO-8859-3 | ISO8859_3 | iso8859_3 8859_3 ISO_8859-3:1988 iso-ir-109 ISO_8859-3 ISO8859-3 latin3 l3 ibm913 ibm-913 cp913 913 csISOLatin3 | Alfabeto Latino Nº 3
ISO-8859-6 | ISO8859_6 | iso8859_6 8859_6 iso-ir-127 ISO_8859-6 ISO_8859-6:1987 ISO8859-6 ECMA-114 ASMO-708 arabic ibm1089 ibm-1089 cp1089 1089 csISOLatinArabic | Alfabeto Latino/Árabe
ISO-8859-8 | ISO8859_8 | iso8859_8 8859_8 iso-ir-138 ISO_8859-8 ISO_8859-8:1988 ISO8859-8 cp916 916 ibm916 ibm-916 hebrew csISOLatinHebrew | Alfabeto Latino/Hebraico
JIS_X0201 | JIS_X0201 | JIS0201 JIS_X0201 X0201 csHalfWidthKatakana | JIS X 0201
JIS_X0212-1990 | JIS0212 | JIS0212 jis_x0212-1990 x0212 iso-ir-159 csISO159JISX02121990 | JIS X 0212
Shift_JIS | SJIS | sjis shift_jis shift-jis ms_kanji x-sjis csShiftJIS | Shift-JIS, Japonês
TIS-620 | TIS620 | tis620 tis620.2533 | TIS620, Tailandês
windows-1255 | Cp1255 | cp1255 | Windows Hebraico
windows-1256 | Cp1256 | cp1256 | Windows Árabe
windows-1258 | Cp1258 | cp1258 | Windows Vietnamita
windows-31j | MS932 | MS932 windows-932 csWindows31J | Windows Japonês
x-Big5-HKSCS-2001 | x-Big5-HKSCS-2001 | Big5_HKSCS_2001 big5hk-2001 big5-hkscs-2001 big5-hkscs:unicode3.0 big5hkscs-2001 | Big5 com Conjunto de Caracteres Suplementares de Hong Kong, revisão de 2001
x-Big5-Solaris | Big5_Solaris | Big5_Solaris | Big5 com sete mapeamentos adicionais de caracteres ideográficos Hanzi para o locale Solaris zh_TW.BIG5
x-euc-jp-linux | EUC_JP_LINUX | euc_jp_linux euc-jp-linux | JISX 0201, 0208, codificação EUC Japonês
x-eucJP-Open | EUC_JP_Solaris | EUC_JP_Solaris eucJP-open | JISX 0201, 0208, 0212, codificação EUC Japonês
x-EUC-TW | EUC_TW | euc_tw euctw cns11643 EUC-TW | CNS11643 (Plano 1-7,15), codificação EUC, Chinês Tradicional
x-IBM1006 | Cp1006 | cp1006 ibm1006 ibm-1006 1006 | IBM AIX Paquistão (Urdu)
x-IBM1025 | Cp1025 | cp1025 ibm1025 ibm-1025 1025 | IBM Multilíngue Cirílico: Bulgária, Bósnia, Herzegovina, Macedônia (FYR)
x-IBM1046 | Cp1046 | cp1046 ibm1046 ibm-1046 1046 | IBM Árabe - Windows
x-IBM1097 | Cp1097 | cp1097 ibm1097 ibm-1097 1097 | IBM Irã (Farsi)/Persa
x-IBM1098 | Cp1098 | cp1098 ibm1098 ibm-1098 1098 | IBM Irã (Farsi)/Persa (PC)
x-IBM1112 | Cp1112 | cp1112 ibm1112 ibm-1112 1112 | IBM Letônia, Lituânia
x-IBM1122 | Cp1122 | cp1122 ibm1122 ibm-1122 1122 | IBM Estônia
x-IBM1123 | Cp1123 | cp1123 ibm1123 ibm-1123 1123 | IBM Ucrânia
x-IBM1124 | Cp1124 | cp1124 ibm1124 ibm-1124 1124 | IBM AIX Ucrânia
x-IBM1129 | Cp1129 | cp1129 ibm1129 ibm-1129 1129 | IBM AIX Vietnamita
x-IBM1166 | Cp1166 | cp1166 ibm1166 ibm-1166 1166 | IBM Cirílico Multilíngue com euro para o Cazaquistão
x-IBM1364 | Cp1364 | cp1364 ibm1364 ibm-1364 1364 | IBM EBCDIC KS X 1005-1
x-IBM1381 | Cp1381 | cp1381 ibm1381 ibm-1381 1381 | IBM OS/2, DOS República Popular da China (RPC)
x-IBM1383 | Cp1383 | cp1383 ibm1383 ibm-1383 1383 ibmeuccn ibm-euccn cpeuccn | IBM AIX República Popular da China (RPC)
x-IBM300 | Cp300 | cp300 ibm300 ibm-300 300 | IBM Japonês Latin Host Double-Byte
x-IBM33722 | Cp33722 | cp33722 ibm33722 ibm-33722 ibm-5050 ibm-33722_vascii_vpua 33722 | IBM-eucJP - Japonês (supersete de 5050)
x-IBM833 | Cp833 | cp833 ibm833 ibm-833 | IBM Coreano Host Extended SBCS
x-IBM834 | Cp834 | cp834 ibm834 834 ibm-834 | IBM EBCDIC DBCS-only Coreano
x-IBM856 | Cp856 | cp856 ibm-856 ibm856 856 | IBM Hebraico
x-IBM875 | Cp875 | cp875 ibm875 ibm-875 875 | IBM Grego
x-IBM921 | Cp921 | cp921 ibm921 ibm-921 921 | IBM Letônia, Lituânia (AIX, DOS)
x-IBM922 | Cp922 | cp922 ibm922 ibm-922 922 | IBM Estônia (AIX, DOS)
x-IBM930 | Cp930 | cp930 ibm930 ibm-930 930 | Japonês Katakana-Kanji misturado com 4370 UDC, supersete de 5026
x-IBM933 | Cp933 | cp933 ibm933 ibm-933 933 | Coreano misturado com 1880 UDC, supersete de 5029
x-IBM935 | Cp935 | cp935 ibm935 ibm-935 935 | Host Chinês Simplificado misturado com 1880 UDC, supersete de 5031
x-IBM937 | Cp937 | cp937 ibm937 ibm-937 937 | Host Chinês Tradicional misturado com 6204 UDC, supersete de 5033
x-IBM939 | Cp939 | cp939 ibm939 ibm-939 939 | Japonês Latin Kanji misturado com 4370 UDC, supersete de 5035
x-IBM942 | Cp942 | cp942 ibm942 ibm-942 942 | IBM OS/2 Japonês, supersete de Cp932
x-IBM942C | Cp942C | cp942C ibm942C ibm-942C 942C cp932 ibm932 ibm-932 932 x-ibm932 | Variante de Cp942
x-IBM943 | Cp943 | cp943 ibm943 ibm-943 943 | IBM OS/2 Japonês, supersete de Cp932 e Shift-JIS
x-IBM943C | Cp943C | cp943C ibm943C ibm-943C 943C | Variante de Cp943
x-IBM948 | Cp948 | cp948 ibm948 ibm-948 948 | OS/2 Chinês (Taiwan) supersete de 938
x-IBM949 | Cp949 | cp949 ibm949 ibm-949 949 | PC Coreano
x-IBM949C | Cp949C | cp949C ibm949C ibm-949C 949C | Variante de Cp949
x-IBM950 | Cp950 | cp950 ibm950 ibm-950 950 | PC Chinês (Hong Kong, Taiwan)
x-IBM964 | Cp964 | cp964 ibm964 ibm-964 ibm-euctw 964 | AIX Chinês (Taiwan)
x-IBM970 | Cp970 | cp970 ibm970 ibm-970 ibm-eucKR 970 | AIX Coreano
x-ISCII91 | ISCII91 | iscii ST_SEV_358-88 iso-ir-153 csISO153GOST1976874 ISCII91 | Codificação ISCII91 de scripts Indic
x-ISO-2022-CN-CNS | ISO2022CN_CNS | ISO2022CN_CNS ISO-2022-CN-CNS | CNS11643 em formato ISO 2022 CN, Chinês Tradicional (conversão de Unicode apenas)
x-ISO-2022-CN-GB | ISO2022CN_GB | ISO2022CN_GB ISO-2022-CN-GB | GB2312 em formato ISO 2022 CN, Chinês Simplificado (conversão de Unicode apenas)
x-iso-8859-11 | x-iso-8859-11 | iso-8859-11 iso8859_11 | Alfabeto Latino/Tailandês
x-JIS0208 | JIS0208 | JIS0208 JIS_C6226-1983 iso-ir-87 x0208 JIS_X0208-1983 csISO87JISX0208 | JIS X 0208
x-JISAutoDetect | JISAutoDetect | JISAutoDetect | Detecta e converte de Shift-JIS, EUC-JP, ISO 2022 JP (conversão para Unicode apenas)
x-Johab | x-Johab | ksc5601-1992 ksc5601_1992 ms1361 johab | Coreano, conjunto de caracteres Johab
x-MacArabic | MacArabic | MacArabic | Macintosh Árabe
x-MacCentralEurope | MacCentralEurope | MacCentralEurope | Macintosh Latin-2
x-MacCroatian | MacCroatian | MacCroatian | Macintosh Croata
x-MacCyrillic | MacCyrillic | MacCyrillic | Macintosh Cirílico
x-MacDingbat | MacDingbat | MacDingbat | Macintosh Dingbat
x-MacGreek | MacGreek | MacGreek | Macintosh Grego
x-MacHebrew | MacHebrew | MacHebrew | Macintosh Hebraico
x-MacIceland | MacIceland | MacIceland | Macintosh Islandês
x-MacRoman | MacRoman | MacRoman | Macintosh Romano
x-MacRomania | MacRomania | MacRomania | Macintosh Romênia
x-MacSymbol | MacSymbol | MacSymbol | Macintosh Símbolo
x-MacThai | MacThai | MacThai | Macintosh Tailandês
x-MacTurkish | MacTurkish | MacTurkish | Macintosh Turco
x-MacUkraine | MacUkraine | MacUkraine | Macintosh Ucrânia
x-MS932_0213 | x-MS950-HKSCS | MS932-0213 MS932_0213 MS932:2004 windows-932-0213 windows-932:2004 | Shift_JISX0213 Variante Windows MS932
x-MS950-HKSCS | MS950_HKSCS | MS950_HKSCS | Windows Chinês Tradicional com extensões de Hong Kong
x-MS950-HKSCS-XP | x-mswin-936 | MS950_HKSCS_XP | HKSCS Variante Windows XP
x-mswin-936 | MS936 | ms936 ms_936 | Windows Chinês Simplificado
x-PCK | PCK | pck | Versão Solaris de Shift_JIS
x-SJIS_0213 | x-SJIS_0213 | sjis-0213 sjis_0213 sjis:2004 sjis_0213:2004 shift_jis_0213:2004 shift_jis:2004 | Shift_JISX0213
x-windows-50220 | MS50220 | ms50220 cp50220 | Windows Codepage 50220 (implementação de 7 bits)
x-windows-50221 | MS50221 | ms50221 cp50221 | Windows Codepage 50221 (implementação de 7 bits)
x-windows-874 | MS874 | ms874 ms-874 windows-874 | Windows Tailandês
x-windows-949 | MS949 | ms949 windows949 windows-949 ms_949 | Windows Coreano
x-windows-950 | MS950 | ms950 windows-950 | Windows Chinês Tradicional
x-windows-iso2022jp | windows-iso2022jp | windows-iso2022jp | Variante ISO-2022-JP (baseado em MS932)

### Imprimindo Informações de Charset

A seguinte aplicação imprime os aliases de cada charset suportado pelo Java SE:
```java
    import java.nio.charset.*; 
    
    class DisplayCharsetAliases {
        public static void main(String[] args) {
            System.out.println("Charset -> Aliases");
            System.out.println("==================");
            for (Charset cs : Charset.availableCharsets().values()) {
                System.out.println(cs.name() + " -> " + cs.aliases());
            }
        }
    }
```

### Charset Padrão

O charset padrão é UTF-8. No entanto, no JDK 17 e versões anteriores, o charset padrão depende do host e do usuário.

Você pode obter o charset padrão chamando o método estático [Charset.defaultCharset()](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/nio/charset/Charset.html#defaultCharset()>).

As APIs Java padrão usam o charset padrão, a menos que você especifique um. Essas APIs incluem:

  * No pacote java.io, as classes InputStreamReader, FileReader, OutputStreamWriter, FileWriter e PrintStream, que definem construtores para criar leitores, escritores e fluxos de impressão que codificam ou decodificam usando o charset padrão
  * No pacote java.util, as classes Formatter e Scanner, que definem construtores cujos resultados usam o charset padrão

#### Charsets Padrão para Fluxos de Saída Padrão, Entrada Padrão e Erro Padrão

Os charsets padrão para saída padrão, System.out; entrada padrão, System.in; e erro padrão, System.err não usam o charset padrão. Eles usam o charset especificado por uma das seguintes propriedades do sistema:

  * [stdout.encoding](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/System.html#stdout.encoding>)
  * [stdin.encoding](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/System.html#stdin.encoding>)
  * [stderr.encoding](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/System.html#stderr.encoding>)

Por padrão, essas propriedades são definidas de forma específica do sistema com base na plataforma e no ambiente do usuário. Os valores dessas propriedades podem diferir do valor das propriedades do sistema [file.encoding](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/System.html#file.encoding>) (consulte [Alterando o Charset Padrão do JDK](<#/doc/guides/intl/supported-encodings>)) e [native.encoding](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/System.html#native.encoding>) (consulte [Executando Aplicações Java em JDK Cujo Charset Padrão é Determinado pelo Ambiente](<#/doc/guides/intl/supported-encodings>)).

#### Especificando o Charset do Fluxo de Entrada Padrão

Tipicamente, se você deseja ler dados de caracteres de entrada do teclado ou outra fonte de entrada, você envolve [System.in](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/System.html#in>) dentro de um objeto que lida com a codificação de caracteres, como um InputStreamReader ou um Scanner. Por exemplo:
```java
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    Scanner s = new Scanner(System.in);
```

Neste exemplo, o InputStreamReader e o `Scanner` usam o charset padrão. No entanto, é recomendado que você especifique o charset definido pela propriedade de sistema `stdin.encoding` para converter bytes de entrada em dados de caracteres. Por exemplo:
```java
    BufferedReader br = new BufferedReader(
                            new InputStreamReader(
                                System.in,
                                System.getProperty("stdin.encoding")));
    Scanner s = new Scanner(System.in,
                            System.getProperty("stdin.encoding"));
```

Nota:

Se você preferir lidar com entrada interativa com a classe [Console](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/io/Console.html>), observe que suas operações de leitura e escrita usam os charsets especificados pelas propriedades de sistema `stdin.encoding` e `stdout.encoding`, respectivamente. Você pode recuperar o Charset usado para operações de escrita com o método [Console.charset()](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/io/Console.html#charset()>).

#### Charset Padrão para JDK 17 e Versões Anteriores

No JDK 17 e versões anteriores, o charset padrão é determinado quando o tempo de execução Java é iniciado. No macOS, o charset padrão é UTF-8, exceto no locale POSIX C. Em outros sistemas operacionais, ele depende do locale do usuário e da codificação padrão. Por exemplo, no Windows, é um charset baseado em codepage, como `windows-1252` ou `windows-31j`. O método java.nio.charsets.Charset.defaultCharset() retorna o charset padrão.

Você pode executar o seguinte comando para determinar o charset padrão do seu JDK:
```bash
    java -XshowSettings:properties -version 2>&1 | grep file.encoding
```

#### Alterando o Charset Padrão do JDK

Você pode definir o valor da propriedade de sistema `file.encoding` na linha de comando para um dos seguintes valores para especificar que o charset padrão do JDK é UTF-8 ou o charset padrão é determinado como no JDK 17 e versões anteriores:

  * `UTF-8`: O charset padrão é UTF-8.
  * `COMPAT`: O charset padrão é determinado como no JDK 17 e versões anteriores.

Outros valores para `file.encoding` não são suportados.

Nota:

Antes de implantar sua aplicação em um JDK cujo charset padrão é UTF-8, verifique se ela possui algum problema de charset executando-a em um JDK cujo charset padrão não é UTF-8 com o seguinte comando:
```bash
    java -Dfile.encoding=UTF-8 <your application>
```

#### Executando Aplicações Java em JDK Cujo Charset Padrão é Determinado pelo Ambiente

O JDK 17 introduziu a propriedade de sistema `native.encoding`. Use esta propriedade para obter o nome da codificação de caracteres do ambiente host subjacente, especialmente se você especificou que seu JDK determina o charset padrão como no JDK 17 e versões anteriores.

Nota:

Definir o valor da propriedade de sistema `native.encoding` através da linha de comando ou com o método System.setProperty() não tem efeito.

O exemplo a seguir obtém o charset padrão da propriedade de sistema `native.encoding`. Observe que você pode executar este exemplo em qualquer versão do JDK; se a propriedade de sistema `native.encoding` não tiver sido definida, o exemplo obtém o charset padrão do método Charset.defaultCharset():
```java
    String encoding = System.getProperty("native.encoding");
    Charset cs = (encoding != null) ? Charset.forName(encoding) : Charset.defaultCharset();
```

Se sua aplicação espera que o charset padrão seja determinado como no JDK 17 e versões anteriores, então use este charset obtido como um argumento de construtor para objetos que dependem de um charset, por exemplo:
```java
    var reader = new FileReader("file.txt", cs);
```

Nota:

A chamada de método `Charset.forName("default")` lança uma `UnsupportedCharsetException`. Use `Charset.forName("US-ASCII")` ou Charset.defaultCharset() em vez disso. (No JDK 17 e versões anteriores, `Charset.forName("default")` produz o mesmo resultado que `Charset.forName("US-ASCII")`.)

O valor de `native.encoding` afeta o valor de `file.encoding`:

  * Se `file.encoding` for definido como `COMPAT` na linha de comando, então o valor em tempo de execução de `file.encoding` será o mesmo que o valor em tempo de execução de `native.encoding`.
  * Se `file.encoding` for definido como `UTF-8` na linha de comando, então o valor em tempo de execução de `file.encoding` pode diferir do valor em tempo de execução de `native.encoding`.

#### Garantindo que a Codificação do Arquivo Fonte Seja Compatível com Seu JDK

O compilador `javac` assume que os arquivos fonte `.java` são codificados com o charset padrão, a menos que configurado de outra forma com a opção `-encoding`.

Consequentemente, antes de compilar uma aplicação em um JDK cujo charset padrão é UTF-8, verifique se há problemas de charset compilando sua aplicação com o seguinte comando:
```bash
    javac -encoding UTF-8 <source files of your application>
```

Alternativamente, se você preferir salvar seus arquivos fonte com uma codificação diferente de UTF-8, especifique na opção `-encoding` o valor da propriedade de sistema `native.encoding`.