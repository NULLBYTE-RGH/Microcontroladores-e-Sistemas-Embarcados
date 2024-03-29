from machine import Pin
import time
import Tranca
####################PARAMETROS###################
__Pino1=16
__Pino2=17
__Pino3=18
__Pino4=19
__Pino5=20
__Pino6=21
__Pino7=3
__Pino8=2
__GPIOTransistor = 22
__Tamanho_Senha = 4
__teclas = [['1', '2', '3', 'A'], ['4', '5', '6', 'B'], ['7', '8', '9', 'C'], ['*', '0', '#', 'D']]
#################################################

class Teclado(object):
    
    def __init__(self, Pino1 = __Pino1, Pino2 = __Pino2 ,Pino3 = __Pino3,Pino4 = __Pino4 ,Pino5 = __Pino5 ,Pino6 = __Pino6 ,Pino7 = __Pino7, Pino8 = __Pino8 ):

        Linhas = [Pino1,Pino2,Pino3,Pino4]
        Colunas = [Pino5,Pino6,Pino7,Pino8]


        self.Lista_Linha_Pinos = [Pin(Pino, mode=Pin.OUT) for Pino in Linhas]

        self.Lista_Coluna_Pinos = [Pin(Pino, mode=Pin.IN, pull=Pin.PULL_DOWN) for Pino in Colunas]
        
        self.tranca = Tranca.Tranca(__GPIOTransistor)
        
        for Linha in range(0,4):
            for Coluna in range(0,4):
                self.Lista_Linha_Pinos[Linha].low()



    def __Ler_Teclado(self, Linha, Coluna):

        self.Lista_Linha_Pinos[Linha].high()
        tecla = None

        if self.Lista_Coluna_Pinos[Coluna].value() == 1:
            tecla = 1
        if self.Lista_Coluna_Pinos[Coluna].value() == 0:
            tecla = 0
        self.Lista_Linha_Pinos[Linha].low()

        return tecla

    def LerTeclado(self, Numero_de_caracteres):
        lidos = ''
        while len(lidos) < Numero_de_caracteres:
            for Linha in range(4):
                for Coluna in range(4):
                    tecla = self.__Ler_Teclado(Linha,Coluna)
                    if  tecla == 1:
                        #print("Tecla :"+str(Linha)+str(Coluna))
                        tecla = __teclas[Linha][Coluna]
                        if tecla != '':
                            lidos = lidos + tecla
                        time.sleep(0.2)
        return lidos
                        

    def Criar_Senha(self, id, Tamanho_Senha = __Tamanho_Senha):
        
        try:
            arquivo = open('Usuarios.txt', 'r')
            usuarios = []
            for linha in arquivo:
                item = linha.split(",")
                item[4] = item[4].replace("\r\n","")
                item1 = item[0:2]
                item2 = item[3:]
                
                if str(item1[0]) == str(id):
                    print("Cadastrando Senha para "+ item1[1])
                    senha = self.LerTeclado(Tamanho_Senha)
                    item1.append(senha)
                    usuarios.append(item1+item2)
                else:
                    usuarios.append(item1+[item[2]]+item2)
                    
            arquivo.close()
            arquivo = open('Usuarios.txt', 'w')
            for i in usuarios:
                arquivo.write(",".join(i)+"\r\n")
            arquivo.close()
            return 1
        except Exception as e:
            print(e)
            return -1
        
    def Validar_Senha(self, Tamanho_Senha = __Tamanho_Senha):
        acesso = 0
        try:
            print("Digite a Senha:")
            senha = self.LerTeclado(Tamanho_Senha)
            print(senha)
            arquivo = open('Usuarios.txt', 'r')
            for linha in arquivo:
                item = linha.split(",")
                if str(item[2]) == str(senha):
                    print("Acesso Liberado "+ item[1])
                    acesso = 1
                    self.tranca.Destrancar()
                    time.sleep(0.8)
                    self.tranca.Trancar()
                    return 1
                    break
            if acesso == 0:
                print("Acesso negado!")
                
            arquivo.close()
            acesso = 1
            return 0
        except Exception as e:
            print(e)
            return -1
