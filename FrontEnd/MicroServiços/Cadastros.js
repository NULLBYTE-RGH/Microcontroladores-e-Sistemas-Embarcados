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

Usuarios = ["{'senha': '1111', 'rfid': '1485898912', 'digital': '0', 'id': '1', 'nome': 'joao'}, {'senha': '2222', 'rfid': '20442135750', 'digital': '', 'id': '2', 'nome': 'matheus'},  {'senha': '123', 'rrfid': '', 'digitall': '2', 'id': '3',  'nome': 'marcel'},  {'senha': '123', 'rrfid': '', 'digitall': '3', 'id': '4',  'nome': 'C'}, {'sennha': '123', 'rfid':: '', 'digital': '44', 'id': '5', 'nomee': 'D'}, {'senha':  '123', 'rfid': '',, 'digital': '5', 'iid': '6', 'nome': 'EE'}, {'senha': '123', 'rfid': '', 'diggital': '6', 'id': '7', 'nome': 'F'}, {{'senha': '123', 'rffid': '', 'digital': '7', 'id': '8', 'nome': 'G'}"]
Ultimo_Acesso=", {'ultimo': ''}"

function limpar(lista){
    lista = lista.map(item=>{
        item = item.includes("}") ? item : item.concat("}")
        item = item.replaceAll("'", '"')
        item = item.replaceAll(",,", ",");
        item = item.replaceAll("::", ":");
        item = item.replaceAll("{{", "{");
        item = item.replaceAll(",,", ',')
        item = item.replaceAll("ee", 'e')
        item = item.replaceAll("ii", 'i')
        item = item.replaceAll("nn", 'n')
        item = item.replaceAll("rr", 'r')
        item = item.replaceAll("ff", 'f')
        item = item.replaceAll("ll", 'l')
        item = item.replaceAll("gg", 'g')
        return item
    })
    return lista
}

app.listen(porta, () => {
    console.log(`Iniciado Cadastro`)
    console.log(`na porta ${porta}`)
})

//envios dos usuarios com senhas e indentificaçoes limpas para o front
app.post('/usuarios', (req, res) => {
    limpo = []
    //essa limpeza esta sendo feita a cada requisição, pois no projeto real com o microcontrolador esses lixos aparecem durante a conec serial via UART
    console.log("POST usuarios")
    enviar = Usuarios[0].concat(Ultimo_Acesso).split("},")
    enviar = limpar(enviar)

    enviar.map(i=>{
        i = JSON.parse(i)
        if(i.ultimo === undefined){
        if(i.senha == ""){i.senha= undefined}else{i.senha = "*"}
        if(i.rfid == ""){i.rfid= undefined}else{i.rfid = "*"}
        if(i.digital == ""){i.digital= undefined}else{i.digital = "*"}
        }
        limpo.push(i)
    }
        )
    enviar = limpo
    res.send(enviar)
})

app.get('/usuarios', (req, res) => {
    console.log("GET usuarios")
    //essa limpeza esta sendo feita a cada requisição, pois no projeto real com o microcontrolador esses lixos aparecem durante a conec serial via UART
    enviar = Usuarios[0].concat(Ultimo_Acesso).split("},")
    enviar = limpar(enviar)
    res.send(enviar)
})

app.post('/adicionar', (req, res) => {
    //console.log(req.body.data)
    Usuarios = [Usuarios[0].concat(`, ${JSON.stringify(req.body.data)}`)]
    res.sendStatus(200)
})

app.post('/ultimo', (req, res) => {
    // console.log(req.body.data)
    // console.log(req.body.data.data)
    Acesso = ''
    if(req.body.data.data===undefined){Acesso = ''}else{Acesso =  req.body.data.data}
    Ultimo_Acesso = `, {'ultimo': '${Acesso}'}`
    //console.log(Ultimo_Acesso)
    res.sendStatus(200)
})
