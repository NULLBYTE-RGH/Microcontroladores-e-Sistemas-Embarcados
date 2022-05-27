import leitorDigital
from machine import Pin
import Tranca
import time
import Teclado
import RFID


    
def Iniciar():
    try:
        leitor = leitorDigital.leitorDigital()
        return leitor
    except Exception as e:
        try:
            leitor = leitorDigital.leitorDigital()
            return leitor
        except Exception as e:
            print(e)



#r = RFID.RFID()
#r.Validar_Tag()
#r.Cadastar_Tag(2)
#id = r.Ler_Tag()
#print(id)
T = Teclado.Teclado()
lidos = T.Criar_Senha(1,4)
print(lidos)
#digital = Iniciar()
#digital.SalvarDigital()
#digital.ValidarDigital()





