'''
UART_SYN_ACK
Autor #NULLBYTE-RGH#
'''
from machine import UART
from machine import Pin
import network
import time
import json

####################PARAMETROS###################
__SYN=1
__ACK=2
__UTF = 'utf-8'
__Delay = 0.1
__TimeOut = 10
#################################################
__SYN=__SYN.to_bytes(1, 'big')
__ACK=__ACK.to_bytes(1, 'big')

# parse x:
#y = json.loads(a.decode('utf-8'))

uart = UART(2, baudrate=115200, rx = 16, tx = 17, timeout=10)


def Serial(Modo,Dados=''):
    '''
Modo 1 ==> receber
Modo 2 ==> enviar
conteudo ==> necessario se utilizado com Modo 2, tipo : STR
    '''
    
    tentativas = 0
    
    if Modo == 1:
        __BUS__= uart.read(1)
        print("Aguardando Sincronizacao...")
        while tentativas < __TimeOut:
            __BUS__= uart.read(1)
            #print("Aguardando Sincronizacao...")
            time.sleep(__Delay)
            tentativas+=1
            if(__BUS__ ==__SYN):
                print("SYN Recebido!\nIniciando Comunicacao...")
                tentativas = 0
                break
        if(tentativas != 0):
            raise Exception("ERRO SYN!! recebido:",__BUS__)

        uart.write(__ACK)
        print("ACK enviado...")
        time.sleep(__Delay)

        __BUS__= uart.read(2)
        print("Aguardando tamanho do Buffer...")
        while tentativas < __TimeOut :
            __BUS__= uart.read(2)
            #print("Aguardando tamanho do Buffer...")
            time.sleep(__Delay)
            tentativas+=1
            if(__BUS__ != None):
                tamanho = int.from_bytes(__BUS__, "big")
                print("Buffer:",tamanho,"Bytes")
                tentativas = 0
                break
        if(tentativas != 0):
            raise Exception("ERRO Buffer!! recebido:",__BUS__)
        

        uart.write(__ACK)
        time.sleep(__Delay)

        __BUS__= uart.read(tamanho)
        print("Aguardando dados...")
        while tentativas < __TimeOut:
            __BUS__= uart.read(tamanho)
            #print("Aguardando dados...")
            time.sleep(__Delay)
            tentativas+=1
            if(__BUS__ != None):
                print("Recebido:", __BUS__.decode(__UTF))
                tentativas = 0
                break
        if(tentativas != 0):
            raise Exception("ERRO Dados!! recebido:",__BUS__)
        
        uart.write(__ACK)
        time.sleep(__Delay)
        
        return(__BUS__.decode(__UTF))
 #----------------------------------------------------------------   
    if Modo == 2:
        
        uart.write(__SYN)
        print("SYN enviado...")
        time.sleep(__Delay)

        __BUS__= uart.read(1)
        print("Aguardando Confirmacao...")
        while tentativas < __TimeOut :
            __BUS__= uart.read(1)
            #print("Aguardando Confirmacao...")
            time.sleep(__Delay)
            tentativas+=1
            if(__BUS__ ==__ACK):
                print("ACK Recebido!\nIniciando Comunicacao...")
                tentativas = 0
                break
        if(tentativas != 0):
            raise Exception("ERRO ACK 1!! recebido:",__BUS__)
        
        buffer = len(Dados)
        print("Enviando tamanho do buffer...\nBuffer:",buffer," Bytes ","==>",buffer.to_bytes(2, 'big'),"<==")
        uart.write(buffer.to_bytes(2, 'big'))
        time.sleep(__Delay)

        __BUS__= uart.read(1)
        print("Aguardando Confirmacao...")
        while tentativas < __TimeOut:
            __BUS__= uart.read(1)
            #print("Aguardando Confirmacao...")
            time.sleep(__Delay)
            tentativas+=1
            if(__BUS__ ==__ACK):
                print("ACK Recebido!\nIniciando o enviado de Dados...")
                tentativas = 0
                break
        if(tentativas != 0):
            raise Exception("ERRO ACK 2!! recebido:",__BUS__)

        uart.write(Dados)

        __BUS__= uart.read(1)
        print("Aguardando Confirmacao...")
        while tentativas < __TimeOut:
            __BUS__= uart.read(1)
            #print("Aguardando Confirmacao...")
            time.sleep(__Delay)
            tentativas+=1
            if(__BUS__ ==__ACK):
                print("ACK Recebido!\nFinalizando Comunicacao com Sucesso!...")
                tentativas = 0
                break
        if(tentativas != 0):
            raise Exception("ERRO ACK 3!! recebido:",__BUS__)
        
        return(0)
        
try:    
    Serial(1)
except Exception as e:
    print(e)
