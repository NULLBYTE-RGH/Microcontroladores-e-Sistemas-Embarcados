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
            let Json = []
            let Json2 = []
            Usuarios = resposta
            Json = Usuarios[0].split("},")
            Json.map(item => { Json2.push((item.includes("}") ? item : item.concat("}"))); return 0 })
            Json = []
            Json2.map(item => { Json.push((item.replaceAll("'", '"'))); return 0 })
            Json2 = []
            Json.map(item => {
                item = item.replaceAll(",,", ',')
                item = item.replaceAll("::", ':')
                item = item.replaceAll("{{", '{')
                item = item.replaceAll("ee", 'e')
                item = item.replaceAll("ii", 'i')
                item = item.replaceAll("nn", 'n')
                item = item.replaceAll("rr", 'r')
                item = item.replaceAll("ff", 'f')
                item = item.replaceAll("ll", 'l')
                item = item.replaceAll("gg", 'g')
                Json2.push(JSON.parse(item))
                return 0
            })
            // { senha: '123', rrfid: '0', digitall: '2', id: '3', nome: 'marcel' },
            //console.log(Json2)
            console.log(req.body.data)
            Json2.map(i => {
                if (i.nome === req.body.data.nome) {
                    if (i.senha === req.body.data.senha || i.rfid === req.body.data.rfid || i.digital === req.body.data.digital) {
                        Estado = 1
                        axios
                            .post(Ultimo, { data: i.nome })
                    }
                    else{
                    Estado = 0
                }
                }
            })
            console.log(Estado)
            if (Estado === 0) { res.send('500') }
            else { res.send('200') }
        });
})

app.get('/Trancar', (req, res) => {
    console.log('Estado atual:'.concat(Estado ? 'Destrancado' : 'Trancado'))
    Estado = 0
    console.log("Trancado")
    res.send('200')
})
