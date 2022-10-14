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

![alt text](https://github.com/NULLBYTE-RGH/Microcontroladores-e-Sistemas-Embarcados/blob/734ec019039ff5427eab8e21dd8d972c1e32a424/foto/Esquematico.png)

### UI

![alt text](https://github.com/NULLBYTE-RGH/Arquitetura-de-Sistemas-Computacionais-T2/blob/92e824de3a616be7479e22cee170b40187b5cd5f/foto/Front.PNG)
