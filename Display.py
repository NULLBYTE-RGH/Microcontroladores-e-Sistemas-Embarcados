from machine import Pin, SPI
from __Oled import SSD1306_SPI
import framebuf
from utime import sleep_ms

####################PARAMETROS###################
__SPI=0 #SPI-ID--->SPI1
__LarguraPX = 128
__AlturaPX = 64
__PinoMISO = 17 #dc = MISO
__PinoMOSI = 19
__PinoSCK= 18
__PinoRST = 20
__Frequencia = 100000
__CS = 16  #SDA/CS
#################################################
class Display(object):
    
    def __init__(self,__SPI=__SPI,__LarguraPX=__LarguraPX,__AlturaPX=__AlturaPX,__PinoMISO=__PinoMISO,__PinoMOSI=__PinoMOSI,__PinoSCK=__PinoSCK,__PinoRST=__PinoRST,__Frequencia=__Frequencia,__CS=__CS):
        spi = SPI(__SPI, __Frequencia, mosi=Pin(__PinoMOSI), sck=Pin(__PinoSCK))
        self.oled = SSD1306_SPI(__LarguraPX, __AlturaPX, spi, Pin(__PinoMISO),Pin(__PinoRST), Pin(__CS))
        
    def Escrever(self,texto,x=0,y=30):
        try:
            texto = texto.upper()
            texto = [string.strip() for string in texto]
            texto = " ".join(texto)
            print(texto)
            self.oled.fill(0)
            self.oled.show()
            self.oled.hline(0, 9, 128, 0xffff)
            self.oled.hline(0, 55, 128, 0xffff)
            self.oled.text(texto, x, y)
            self.oled.text(texto, x, y+1)
            self.oled.show()
        except KeyboardInterrupt:
            print("a")

