const express = require('express')
const axios = require('axios')
const app = express()

const porta = 7000

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
},express.json());

Usuarios = ["{'senha': '1111', 'rfid': '1485898912', 'digital': '0', 'id': '1', 'nome': 'joao'}, {'senha': '2222', 'rfid': '20442135750', 'digital': '0', 'id': '2', 'nome': 'matheus'},  {'senha': '123', 'rrfid': '0', 'digitall': '2', 'id': '3',  'nome': 'marcel'},  {'senha': '123', 'rrfid': '0', 'digitall': '3', 'id': '4',  'nome': 'C'}, {'sennha': '123', 'rfid':: '0', 'digital': '44', 'id': '5', 'nomee': 'D'}, {'senha':  '123', 'rfid': '0',, 'digital': '5', 'iid': '6', 'nome': 'EE'}, {'senha': '123', 'rfid': '0', 'diggital': '6', 'id': '7', 'nome': 'F'}, {{'senha': '123', 'rffid': '0', 'digital': '7', 'id': '8', 'nome': 'G'}"]
Ultimo_Acesso=", {'ultimo': ''}"

app.listen(porta, () => {
    console.log(`Iniciado Cadastro`)
    console.log(`na porta ${porta}`)
})

app.get('/usuarios', (req, res) => {
    console.log("chegou")
    res.send([Usuarios[0].concat(Ultimo_Acesso)])
})

app.post('/adicionar', (req, res) => {
    console.log(req.body.data)
    Usuarios = [Usuarios[0].concat(`, ${JSON.stringify(req.body.data)}`)]
    res.sendStatus(200)
})
