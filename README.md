Microcontroladores-e-Sistemas-Embarcados

# Projeto Fechadura Smart:

## Microcontrolador: raspberry pi pico

## Lista de componentes:

- Leitor de Digital DY50
- Teclado Matricial 4x4
- Solenoid 12v 0,9 A
- Display OLed SPI 128 X 32
- RFID MFRC-522
- Acelerometro MPU 6050
- Buzzer
- ESP 8266

## Placa e componentes Basicos:

- Placa de fenolite 10 x 20 Cm 
- Transistor TIP-310
- Reguladores [LM1117, L7805] 12 v -> 6 v e 6 v -> 3.3
- Resistores [300 Ω, 2.2k Ω] 300 Ω controle base do Transistor e 2.2k Ω PULL-UP na entrada RX do leitor de Digital
- 3 Capacitores 100 µF para remoção de ruído das entradas e saidas dos reguladores

## FrontEnd:

- React
- Bootstrap
- Fontawesome

- [x] O Servidor de aplicação sera um Raspberry Pi 3, o qual ira se comunicar com a fechadura por meio de WIFI com um AP gerado pelo ESP-8266 que ficara junto com a fechadura.
- [x] A comunicação se dara por meio de uma API REST.

### Trilhas

![EsquemaDeTrilhas](https://github.com/NULLBYTE-RGH/Microcontroladores-e-Sistemas-Embarcados/blob/734ec019039ff5427eab8e21dd8d972c1e32a424/foto/Esquematico.png)

### UI

![FrontEnd](https://github.com/NULLBYTE-RGH/Arquitetura-de-Sistemas-Computacionais-T2/blob/92e824de3a616be7479e22cee170b40187b5cd5f/foto/Front.PNG)

## BackEnd:

* Possui um barramento de MicroServiços com 2 serviços
* Os MicroServiços tem proposito de facilitar o gerenciamento das informaçoes, para não sobrecarregar os MicroControladores que ja gerenciam:
###### [X] Leitor de Digital
###### [X] RFID 
###### [X] Teclado numerico
###### [X] Giroscopio com acelerometro, para detectar arrombamento
###### [X] Visor Oled
###### [X] comunicação serial com o outro Microcontrolador ESP32 via UART
###### [X] abertura e fechamento do solenoid
###### [X} WIFI

* O Front faz atualizaçoes constantes sobre o estado da fechadura por meio de chamadas de conexao com o barramento a cada 1 segundo. Recebendo numero de usuarios cadastrados,nomes e tipos de autenticações. Juntamente com o nome do ultimo usuario a desbloquear a fechadura.

* O desbloqueio somente pode ser feito mediante previa autenticação 

* O cadastro de usuarios deve ser feito manualmente no banco de dados local volatil ou no arquivo dentro do Microcontrolador RaspPico.

* O acesso as funcionalidades que podem ser feitas devem ser acessadas via barramento, pelas seguintes partes:

[X] http://127.0.0.1:5000/GET -> para recebimento dos usuarios com senhas e ids (não deve ser utilizado pelo front por questao de segurança dos dados, é apenas para uso interno e autenticação entre os MiroSrviços)

+ ***A variavel Usuarios, dentro de Cadastro.js, sera obtida via requisição ao ESP32, atualmente esta sendo simulado via uma variavel com formatação incorreta de JSON***

* Ao se fazer a requisição para esse endereço via metodo *GET* é retornado a lista completa do banco de dados, isso inclui nomes, senhas etc.
* Com metodo *POST*, o Json retornado contem as mesmas partes que o riginal, porem, as senhas,IDs, e outras formas de autenticações sao substituidas por um * ('*')

[X] http://127.0.0.1:5000/ADD -> feito para cadastramento de usuarios novos ao banco de dados, o envio deve ser um Json, contendo (Nome,ID,SENHA,RFID,DIGITAL), no caso da fechadura real, tanto o RFID como a a Digital sao codigos templates, no RFID representa o codigo contido no cartao, e na Digital, representa o id da digital salva internamente no leitor.

[X] http://127.0.0.1:5000/DEST -> Utilizado para o destravamento da fechadura, deve ser utilizado mediante envio de um JSON, contendo o nome do usuario e uma das maneiras de autenticação, podendo ser Senha, RFID ou digital. Sera implementado o envio de um corpo de requisição contendo informaçoes para que o ESP32 coloque uma saida GPIO em nivel alto, ligado ao mesmo transistor que a RaspPico.

[X] http://127.0.0.1:5000/TRANC -> Utilizado para o travamento da fechadura, na fechadura real, isso nao cabe ao front, o controlador que gerencia o tempo de abertura, pois como a abertura é feita por meio de um solenoid, o mesmo consome muita corrente, e caso permaneça muito tempo aberto causara danos ao sistema. no caso da simulação o gerenciamento é feito no proprio front, esperando 3 segundos antes de mandar a requisição de fechamento.Na implementação real, o /TRANC tera apenas efeito ilustrativo, com o fechamento sendo feito via [Tranca.py](https://github.com/NULLBYTE-RGH/Microcontroladores-e-Sistemas-Embarcados/blob/dea4bf5e9c3107b0daa8275c070d7ebce901915b/Tranca.py)

[X] http://127.0.0.1:5000/ULT -> Feito para utilização interna entre os Serviçoes para alertar quem foi o ultimo a desbloquear a fechadura, por meio de um JSON contendo o nome da pessoa.

## Uso:
- Inicar o *Barramento* dentro da pasta MicroServiços/Barramento.js com o comando (node ./Barramento.js)
- Inicar o MicroServiço *Cadastro* dentro da pasta MicroServiços/Cadastro.js com o comando (node ./Cadastro.js)
- Inicar o MicroServiço *Fechadura* dentro da pasta MicroServiços/Fechadura.js com o comando (node ./Fechadura.js)
- Iniciar o servidor React dentro da pasta Raiz, com o comando (npm start)

