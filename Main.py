import leitorDigital
    
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


digital = Iniciar()
digital.SalvarDigital()       