try:
  import usocket as socket
except:
  import socket

import network

import esp
import UART_SYN_ACK
from machine import Pin
import json
esp.osdebug(None)

import gc
gc.collect()
serial = UART_SYN_ACK.UART_SYN()
ssid = 'MicroPython-AP'
password = '124679999'
Pino_SYN = Pin(23, Pin.OUT)

ap = network.WLAN(network.AP_IF)
ap.active(True)
ap.config(essid=ssid, authmode=network.AUTH_WPA_WPA2_PSK, password=password)

while ap.active() == False:
  pass

print('Configuracao Completa')
print(ap.ifconfig())

def web_page():
    try:
        Pino_SYN.value(1)
        resposta = serial.Serial(1)
        Pino_SYN.value(0)
        resposta = resposta[0]+'"'+resposta[1:len(resposta)-1]+'"'+resposta[-1]
        resposta = resposta.replace("'",'"')
        resposta = resposta.replace(",,",",")
        resposta = resposta.replace("::",":")
        resposta = resposta.replace("{{","{")
    except Exception as e:
        print(e)
        resposta = "ocorreu um Erro !"
        Pino_SYN.value(0)
    html = resposta
    return html

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.settimeout(None)
s.bind(('', 80))
s.listen(5)

while True:
  conn, addr = s.accept()
  print('Recebendo Solicitacao de %s' % str(addr))
  request = conn.recv(1024)
  print('Requisicao = %s' % str(request))
  response = web_page()
  conn.send(response)
  Pino_SYN.value(0)
  conn.close()
