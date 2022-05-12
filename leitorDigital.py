import pyfingerprint, time
from machine import UART, Pin

####################PARAMETROS###################
__PinoTX=4
__PinoRX=5
__Frequencia=6
__UARTPICO=1
__PontosAceitavel = 600
#################################################

class leitorDigital(object):
    
    try:
        
        def __init__(self, PinoTX = __PinoTX, PinoRX = __PinoRX, Frequencia = __Frequencia, UARTPICO = __UARTPICO, PontosAceitavel = __PontosAceitavel):
            
            if ( PinoTX < 0 or PinoRX < 0 ):
                raise ValueError('Pinagem incorreta!')
            
            if ( Frequencia < 6 or Frequencia > 12):
                raise ValueError('Frequencia incorreta!\nDEVER SER ENTRE 6 E 12')
            
            if ( UARTPICO < 0):
                raise ValueError('Pinagem incorreta!')
            
            if ( PontosAceitavel < 0):
                raise ValueError('Valor deve ser maior do que 0!')
            
            self.__PinoTX = PinoTX
            self.__PinoRX = PinoRX
            self.__Frequencia = Frequencia
            self.__UARTPICO = UARTPICO
            self.__PontosAceitavel = PontosAceitavel
            
            self.uart = UART(__UARTPICO,9600*__Frequencia, tx=Pin(__PinoTX), rx=Pin(__PinoRX))
            self.Digital = pyfingerprint.PyFingerprint(self.uart)
            #self.__iniciar()
            print('Digitais salvas: ' + str(self.Digital.getTemplateCount()) +'/'+ str(self.Digital.getStorageCapacity()))
        
        #-------------------------------------------------------     
        def SalvarDigital(self):
            
            print("\t\t========>Cadastrando Nova Digital!<========\n\n")
            
            Digitais = self.Digital.getTemplateCount()
            
            self.ValidarDigital(2)
            
            print("\t\t========>Validando Digital!<========\n\n")
            
            if (Digitais>0):

                Resultado = self.ValidarDigital(1,Digitais)
                print('Pontos = '+ str(Resultado))
                if Resultado >= self.__PontosAceitavel:
                    
                    print('Semelhança aceitavel!')
                else:
                    
                    print('Semelhança baixa!\nRefazendo leitura.....\n')
                    self.Digital.deleteTemplate(Digitais)
                    print("================================")
                    self.SalvarDigital()
            else:
                
                Resultado = self.ValidarDigital(1)
                print('Pontos = '+ str(Resultado))
                if Resultado >= self.__PontosAceitavel:
                    print('Semelhança aceitavel!')
                else:
                    print('Semelhança baixa!\nRefazendo leitura.....\n')
                    self.Digital.deleteTemplate(Digitais)
                    print("================================")
                    self.SalvarDigital()
        #-------------------------------------------------------
        def __LerDigital(self,Buffer = 0):
            
            """
            Buffer = 0 Leitura padrao : cria a imagem e salva o template no buffer 1 e 2
            Buffer = 1 Leitura dupla para armazenamento : A primeira leitura é salva no buffer 1 e a segunda no buffer 2, após isso as caracteristicas são mescladas e salvas em um template no metodo ValidarDigital.
            """
            
            if Buffer == 0 :
                
                print('Aguardando Digital...')
                while ( self.Digital.readImage() == False ):
                    pass
                self.Digital.convertImage()
                self.Digital.createTemplate()
                print("Lido!")
                
            elif Buffer == 1:
                
                print('Aguardando Digital...')
                
                while ( self.Digital.readImage() == False ):
                    pass
                
                print("Lido!")
                
                self.Digital.convertImage(pyfingerprint.FINGERPRINT_CHARBUFFER1)
                
                print('Posicione o dedo novamente...')
                
                while ( self.Digital.readImage() == False ):
                    pass
                
                print("Lido!")
                
                self.Digital.convertImage(pyfingerprint.FINGERPRINT_CHARBUFFER2)
                
                
            
            
        #------------------------------------------------------- 
        def ValidarDigital(self,opcao = 0,index = 0):
            """
            opcao = 0 leitura padrao e busca entre todas as digitais salvas, retornando o indic do template e pontuação de coincidencia
            opcao = 1 validação de 1 digital especifica após a criação do template, para verificar consistencia, necessario o index do template da mesma.
            opcao = 2 cria e armazena a combinação das 2 digitais em um tamplate
            """
            if opcao == 0 :
                
                self.__LerDigital()
                Template = self.Digital.searchTemplate()
                if (Template[0] != -1 and Template[1] != -1 ):
                    print("Digital reconhecida!")
                    print("Template numero : " + str(Template[0]))
                    print("Pontos : "+ str(Template[1]))
                    
                else :
            
                    print("Digital nao encontrada.")
                        
            elif opcao == 1 :
                
                self.__LerDigital()
                
                self.Digital.loadTemplate(index,pyfingerprint.FINGERPRINT_CHARBUFFER2)
                return self.Digital.compareCharacteristics()
            
            elif opcao == 2:
                
                self.__LerDigital(1)
                self.Digital.createTemplate()
                self.Digital.storeTemplate()

                
        #-------------------------------------------------------
        def __iniciar(self):
            try:
                self.Digital.getSystemParameters()
            except Exception as e:
                pass
            #self.Digital.deleteTemplate(2)
            #SalvarDigital()
            #ValidarDigital()

    except Exception as e:
        print('ERRO : ' + str(e))
        exit(1)
