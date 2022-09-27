'''
UART_SYN_ACK
Autor NULLBYTE-RGH
''' 

from machine import UART
from machine import Pin
import time

####################PARAMETROS###################
__SYN=1 #b'\x01'
__ACK=2 #b'\x02'
__Codificacao = 'utf-8'
__Delay = 0.5
__TimeOut_SYN_ACK = 20
__Frequencia = 115200
__UART = 0
__RX_PIN = 1
__TX_PIN = 0
__Timeout = 10
__ESP32 = False
#################################################

class UART_SYN(object):
    
    def __init__(self,__UART=__UART,__Frequencia=__Frequencia,__RX_PIN=__RX_PIN,__TX_PIN=__TX_PIN,__Timeout=__Timeout,__SYN=__SYN,__ACK=__ACK,__Codificacao=__Codificacao,__Delay=__Delay,__TimeOut_SYN_ACK=__TimeOut_SYN_ACK,__ESP32=__ESP32):
        self.__SYN=__SYN.to_bytes(1, 'big')
        self.__ACK=__ACK.to_bytes(1, 'big')
        self.__Codificacao=__Codificacao
        self.__Delay=__Delay
        self.__TimeOut_SYN_ACK=__TimeOut_SYN_ACK
        if __ESP32 == False:
            self.uart = UART(__UART, baudrate=__Frequencia, rx=Pin(__RX_PIN), tx=Pin(__TX_PIN), timeout=__Timeout)
        else:
            self.uart = UART(__UART, baudrate=__Frequencia, rx=__RX_PIN, tx=__TX_PIN, timeout=__Timeout)
    def Serial(self,Modo,Dados=''):
        '''
    Modo 1 ==> receber
    Modo 2 ==> enviar
    Dados ==> necessario se utilizado com Modo 2, tipo : STR
        '''
        tentativas = 0
        
        if Modo == 1:
            __BUS__= self.uart.read(1)
            print("Aguardando Sincronizacao...")
            while tentativas < self.__TimeOut_SYN_ACK:
                __BUS__= self.uart.read(1)
                time.sleep(self.__Delay)
                tentativas+=1
                if(__BUS__ ==self.__SYN):
                    print("SYN Recebido!\nIniciando Comunicacao...")
                    tentativas = 0
                    break
            if(tentativas != 0):
                raise Exception("ERRO SYN!! recebido:",__BUS__)

            self.uart.write(self.__ACK)
            print("ACK enviado...")
            time.sleep(self.__Delay)

            __BUS__= self.uart.read(2)
            print("Aguardando tamanho do Buffer...")
            while tentativas < self.__TimeOut_SYN_ACK :
                __BUS__= self.uart.read(2)
                time.sleep(self.__Delay)
                tentativas+=1
                if(__BUS__ != None):
                    tamanho = int.from_bytes(__BUS__, "big")
                    print("Buffer:",tamanho,"Bytes")
                    tentativas = 0
                    break
            if(tentativas != 0):
                raise Exception("ERRO Buffer!! recebido:",__BUS__)
            

            self.uart.write(self.__ACK)
            time.sleep(self.__Delay)

            __BUS__= self.uart.read(tamanho)
            print("Aguardando dados...")
            while tentativas < self.__TimeOut_SYN_ACK:
                __BUS__= self.uart.read(tamanho)
                time.sleep(self.__Delay)
                tentativas+=1
                if(__BUS__ != None):
                    print("Recebido:", __BUS__.decode(self.__Codificacao))
                    tentativas = 0
                    break
            if(tentativas != 0):
                raise Exception("ERRO Dados!! recebido:",__BUS__)
            
            self.uart.write(self.__ACK)
            time.sleep(self.__Delay)
            
            return(__BUS__.decode(self.__Codificacao))
    #---------------------------------------------------------------- 
        if Modo == 2:
            Dados = Dados.encode(self.__Codificacao)
            self.uart.write(self.__SYN)
            print("SYN enviado...")
            time.sleep(self.__Delay)

            __BUS__= self.uart.read(1)
            print("Aguardando Confirmacao...")
            while tentativas < self.__TimeOut_SYN_ACK :
                __BUS__= self.uart.read(1)
                time.sleep(self.__Delay)
                tentativas+=1
                if(__BUS__ ==self.__ACK):
                    print("ACK Recebido!\nIniciando Comunicacao...")
                    tentativas = 0
                    break
            if(tentativas != 0):
                raise Exception("ERRO ACK 1!! recebido:",__BUS__)
            
            buffer = len(Dados)
            print("Enviando tamanho do buffer...\nBuffer:",buffer," Bytes ","==>",buffer.to_bytes(2, 'big'),"<==")
            self.uart.write(buffer.to_bytes(2, 'big'))
            time.sleep(self.__Delay)

            __BUS__= self.uart.read(1)
            print("Aguardando Confirmacao...")
            while tentativas < self.__TimeOut_SYN_ACK:
                __BUS__= self.uart.read(1)
                time.sleep(self.__Delay)
                tentativas+=1
                if(__BUS__ ==self.__ACK):
                    print("ACK Recebido!\nIniciando o enviado de Dados...")
                    tentativas = 0
                    break
            if(tentativas != 0):
                raise Exception("ERRO ACK 2!! recebido:",__BUS__)

            self.uart.write(Dados)

            __BUS__= self.uart.read(1)
            print("Aguardando Confirmacao...")
            while tentativas < self.__TimeOut_SYN_ACK:
                __BUS__= self.uart.read(1)
                time.sleep(self.__Delay)
                tentativas+=1
                if(__BUS__ ==self.__ACK):
                    print("ACK Recebido!\nFinalizando Comunicacao com Sucesso!...")
                    tentativas = 0
                    break
            if(tentativas != 0):
                raise Exception("ERRO ACK 3!! recebido:",__BUS__)
            
            return(0)

