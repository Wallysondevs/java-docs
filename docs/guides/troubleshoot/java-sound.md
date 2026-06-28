# Java Sound

## 16 Java Sound

Este capítulo descreve alguns problemas que podem surgir com a tecnologia de som Java e sugere causas e soluções alternativas.

O tópico a seguir descreve cenários para solucionar problemas de som Java.

  * [Solucionar Problemas de Som Java](<#/doc/guides/troubleshoot/java-sound>)

### Solucionar Problemas de Som Java

Solucione problemas de som Java, como configuração de som do sistema, formato de arquivo de áudio, formato de áudio e condições de overrun e underrun.

Configuração de som do sistema

Certifique-se de que seu sistema de áudio esteja configurado corretamente (driver da placa de som/DirectSound para Windows, ALSA para Linux). Além disso, certifique-se de que seus alto-falantes estejam conectados e que o volume e o estado de mudo da sua placa de som estejam ajustados para o valor apropriado. Para testar sua configuração de som, execute qualquer aplicativo de som nativo e reproduza algum som através dele.

No sistema operacional Linux, você pode não conseguir reproduzir sons porque um aplicativo (ou daemon de som, como `esd` ou `artsd`) abre o dispositivo de áudio exclusivamente, negando assim o acesso do Java Sound ao dispositivo.

Formatos de arquivo de áudio

Java Sound suporta um conjunto de formatos de arquivo de áudio, por exemplo AU, AIF e WAV. A maioria dos formatos de arquivo são apenas contêineres e podem conter dados de áudio em vários formatos de áudio compactados. Os leitores de arquivo do Java Sound suportam alguns formatos (PCM não compactado, a-law, mu-law), mas não suportam ADPCM, MP3 e outros.

Java Sound também suporta plug-ins para leitores e gravadores de arquivos através da interface de provedor de serviços (SPI). Você pode usar plug-ins da Oracle, de terceiros ou seus próprios para ler vários arquivos de áudio. Em qualquer caso, você deve lidar com a presença do plug-in, por exemplo, distribuindo os plug-ins necessários com seu aplicativo ou exigindo que os plug-ins sejam instalados no ambiente Java do cliente.

Formatos de áudio

Java Sound suporta vários formatos de áudio, mas sua disponibilidade depende do sistema operacional. Para usar algum formato de áudio para gravação ou reprodução, o formato deve ser suportado pelo seu sistema (drivers da placa de som). Use formatos suportados o máximo possível: PCM; 8 ou 16 bits; 8000, 11025, 22050, 44100 Hz. Os formatos são suportados pela maioria das placas de som. A maioria das placas de som suporta apenas formatos PCM, e mesmo que o driver suporte mu-law, então ele requer alguma modificação no software. Se você precisar reproduzir ou gravar dados mu-law, a maneira preferida é convertê-los para o formato PCM através de um conversor de formato.

Consulte a documentação de [`AudioSystem.getAudioInputStream`](<https://docs.oracle.com/en/java/javase/24/docs/api/java.desktop/javax/sound/sampled/AudioSystem.html>) para detalhes sobre a conversão de formato.

Condições de overrun e underrun

Os dados gravados são mantidos em um buffer `DataLine`. Se você não leu da linha por um longo tempo, ocorrerá uma condição de overrun, e dados mais antigos serão substituídos por novos dados. Isso produzirá artefatos nos dados de áudio gravados.

Uma situação semelhante ocorre com a reprodução. Se todos os dados do buffer foram reproduzidos e nenhum dado novo é gravado na linha, ocorrerá uma condição de underrun, e o silêncio será reproduzido até que você grave uma nova porção de dados de áudio na linha.

A maneira preferida de gravar é ler dados em uma thread separada para evitar a possível influência de outras tarefas (por exemplo, manipulação de UI). Se você usa `SourceDataLine` para reprodução, então uma thread separada para gravar dados na linha também é o método preferido a ser usado. Se você usa `Clip` para reprodução, a implementação de `Clip` cria esse tipo de thread por si mesma.