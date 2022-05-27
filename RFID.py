import __RFID
import utime
import Tranca

####################PARAMETROS###################
__Pino1=0
__Pino2=2
__Pino3=4
__Pino4=3
__Pino5=1
__Pino6=0
__GPIOTransistor = 22
#################################################
class RFID(object):
    
    def __init__(self, spi_id=__Pino1,sck=__Pino2,miso=__Pino3,mosi=__Pino4,cs=__Pino5,rst=__Pino6):
        
        self.__Pino1=spi_id
        self.__Pino2=sck
        self.__Pino3=miso
        self.__Pino4=mosi
        self.__Pino5=cs
        self.__Pino6=rst
        
        self.r = __RFID.MFRC522(spi_id = self.__Pino1 , sck = self.__Pino2 , miso = self.__Pino3 , mosi = self.__Pino4 , cs = self.__Pino5 , rst = self.__Pino6)
        self.tranca = Tranca.Tranca(__GPIOTransistor)

    def __Ler_Tag(self):
        print("Aguardando TAG")
        self.r.init()
        while(1):
            (stat, tag_type) = self.r.request(self.r.REQIDL)
            if stat == self.r.OK:
                (stat, uid) = self.r.SelectTagSN()
                if stat == self.r.OK:
                    card = int.from_bytes(bytes(uid),"little",False)
                    #print("ID: "+str(card))
                    return str(card)
                    break
            utime.sleep_ms(500)
            
    def Cadastar_Tag(self,id):
        '''id,nome,senha,id-digital,ID-RF'''
        try:
            arquivo = open('Usuarios.txt', 'r')
            usuarios = []
            for linha in arquivo:
                item = linha.split(",")
                pivo = item[4].replace("\r\n","")
                item = item[0:4]
                if str(item[0]) == str(id):
                    print("Cadastrando TAG para "+ item[1])
                    tag = self.__Ler_Tag()
                    item.append(str(tag))
                else:
                    item.append(pivo)

                usuarios.append(item)
                
            arquivo.close()
            arquivo = open('Usuarios.txt', 'w')
            for i in usuarios:
                arquivo.write(",".join(i)+"\r\n")
            arquivo.close()
            return 1
        except:
            return -1
        
    def Validar_Tag(self):
        acesso = 0
        try:
            tag = self.__Ler_Tag()
            arquivo = open('Usuarios.txt', 'r')
            for linha in arquivo:
                item = linha.split(",")
                pivo = item[4].replace("\r\n","")
                if str(pivo) == str(tag):
                    print("Acesso Liberado "+ item[1])
                    acesso = 1
                    self.tranca.Destrancar()
                    time.sleep(1)
                    self.tranca.Trancar()
                    return 1
                    break
            if acesso == 0:
                print("Acesso negado!")
                
            arquivo.close()
            acesso = 1
            return 0
        except:
            return -1
