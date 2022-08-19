import leitorDigital
from machine import Pin
import Tranca
import time
import Teclado
import RFID
import Display
import Giroscopio

def IniciarDigital():
    try:
        leitor = leitorDigital.leitorDigital()
        return leitor
    except Exception as e:
        try:
            leitor = leitorDigital.leitorDigital()
            return leitor
        except Exception as e:
            print(e)
            
def Interrupcao_Interecao_Teclado():           
 T = True
 
def Interrupcao_Interecao_Digital():           
 D = True
 
def Interrupcao_Interecao_RFID():           
 R = True

def IniciarSistema():
    teclado = Teclado.Teclado()
    rfid = RFID.RFID()
    digital = IniciarDigital()
    while True:
        print("Escolha uma Opção: A, B, C")
        opcao = teclado.LerTeclado(1)
        if (opcao == "A"):
            teclado.Validar_Senha()
        elif(opcao == "B"):
            rfid.Validar_Tag()
        elif(opcao == "C"):
            digital.ValidarDigital()
        
        

IniciarSistema()
