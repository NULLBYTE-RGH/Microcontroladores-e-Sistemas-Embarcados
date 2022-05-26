import leitorDigital
from machine import Pin
import Tranca
import time
import Teclado
    
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



#T = Teclado.Teclado()
#T.LerTeclado()
#digital = Iniciar()
#digital.SalvarDigital()
#digital.ValidarDigital()
