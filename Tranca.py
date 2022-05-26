from machine import Pin

tranca = 0

class Tranca(object):
    def __init__(self, Pino ):
        self.tranca = Pin(Pino, Pin.OUT)
        self.tranca.value(0)
    def Destrancar(self):
        self.tranca.value(1)
    def Trancar(self):
        self.tranca.value(0)
