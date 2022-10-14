const express = require("express");
const axios = require("axios");
const app = express();

const porta = 5000;
const IP = "127.0.0.1";
const Porta_Cadastro = 7000;
const Porta_Fechadura = 9000;

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
}, express.json());

app.listen(porta, () => {
  console.log(`Iniciado Barramento`);
  console.log(`na porta ${porta}`);
});

const Cadastro = `http://${IP}:${Porta_Cadastro}/usuarios`;
const Adicionar = `http://${IP}:${Porta_Cadastro}/adicionar`;
const Destrancar = `http://${IP}:${Porta_Fechadura}/Destrancar`;
const Trancar = `http://${IP}:${Porta_Fechadura}/Trancar`;
const Ultimo = `http://${IP}:${Porta_Cadastro}/ultimo`;

app.get("/GET", (req, res) => {
  axios
    .get(Cadastro)
    .then((res) => {
      return res.data;
    })
    .then((resposta) => {
      res.send(resposta);
    });
});

app.post("/ADD", (req, res) => {
  axios
    .post(Adicionar,{data:req.body})
    .then((res) => {
      return res.data;
    })
    .then((resposta) => {
      res.send(resposta);
    });
});

app.post("/DEST", (req, res) => {
    axios
    .post(Destrancar,{data:req.body})
    .then((res) => {
      return res.data;
    })
    .then((resposta) => {
      res.sendStatus(resposta);
    });
});

app.get("/TRANC", (req, res) => {
    axios
      .get(Trancar)
      .then((res) => {
        return res.data;
      })
      .then((resposta) => {
        res.sendStatus(resposta);
      });
  });

  app.post("/ULT", (req, res) => {
    axios
      .post(Ultimo,{data:req.body})
      .then((res) => {
        return res.data;
      })
      .then((resposta) => {
        res.sendStatus(200);
      });
  });

  app.post("/GET", (req, res) => {
    axios
      .post(Cadastro)
      .then((res) => {
        return res.data;
      })
      .then((resposta) => {
        res.send(resposta);
      });
  });
