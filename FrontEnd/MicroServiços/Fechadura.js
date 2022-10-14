const express = require('express')
const axios = require('axios')
const app = express()

const porta = 9000
const porta_barramento = 5000
const IP = "127.0.0.1";

const Barramento = `http://${IP}:${porta_barramento}/GET`;
const Ultimo = `http://${IP}:${porta_barramento}/ULT`;
let Usuarios = []
let Estado = 0

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
}, express.json());

app.listen(porta, () => {
    console.log(`Iniciado Fechadura`)
    console.log(`na porta ${porta}`)
})

app.post('/destrancar', (req, res) => {
    Estado = 0
    axios
        .get(Barramento)
        .then((res) => {
            return res.data;
        })
        .then((resposta) => {
            Usuarios = resposta
            console.log("Recebido: ")
            console.log(req.body.data)
            Usuarios.map( i => {
                i = JSON.parse(i)
                if (i.nome === req.body.data.nome) {
                    if (i.senha === req.body.data.senha || i.rfid === req.body.data.rfid || i.digital === req.body.data.digital) {
                        Estado = 1
                        console.log('Estado atual:'.concat(Estado ? 'Destrancado' : 'Trancado'))
                        axios
                            .post(Ultimo, { data: i.nome })
                    }
                    else{
                    Estado = 0
                }
                }
            })
            console.log(Estado ? "Usuario Autenticado" : "Credenciais Incorretas")
            console.log(Estado ? "Efetuando desbloqueio para : " + req.body.data.nome : "")
            if (Estado === 0) { res.send('500') }
            else { res.send('200') }
        });
})

app.get('/Trancar', (req, res) => {
    Estado = 0
    console.log('Estado atual:'.concat(Estado ? 'Destrancado' : 'Trancado'))
    res.send('200')
})
