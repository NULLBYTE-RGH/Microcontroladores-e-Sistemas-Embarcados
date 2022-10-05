import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "@fortawesome/fontawesome-free/css/all.css";

import sound from "./Orgonite.mp3";
import axios from 'axios';
// import PUSH from "./Push";

class Funcionalidades extends React.Component {
  //variaveis
  icones = {
    Trancado: "fa-sharp fa-solid fa-lock fa-2x",
    Destrancado: "fa-solid fa-unlock fa-2x",
    wifi_On: "fa-solid  fa-wifi fa-2x",
    wifi_off: "fa-solid fa-globe fa-2x",
  };

  lista_Acessos = ["Jose", "Pedro", "Paulo"];

  audio = new Audio(sound);

  IP_AP='192.168.4.1'
  //Json é o requisitado 
  Json = ["{'senha': '1111', 'rfid': '1485898912', 'digital': '0', 'id': '1', 'nome': 'joao'}, {'senha': '2222', 'rfid': '20442135750', 'digital': '0', 'id': '2', 'nome': 'matheus'},  {'senha': '123', 'rrfid': '0', 'digitall': '2', 'id': '3',  'nome': 'marcel'},  {'senha': '123', 'rrfid': '0', 'digitall': '3', 'id': '4',  'nome': 'C'}, {'sennha': '123', 'rfid':: '0', 'digital': '44', 'id': '5', 'nomee': 'D'}, {'senha':  '123', 'rfid': '0',, 'digital': '5', 'iid': '6', 'nome': 'EE'}, {'senha': '123', 'rfid': '0', 'diggital': '6', 'id': '7', 'nome': 'F'}, {{'senha': '123', 'rffid': '0', 'digital': '7', 'id': '8', 'nome': 'G'}"]
  //json2 é o final após todo o tratamento de erros e formatação
  Json2 = []
  //--------------------------------------------------------

  //metodos
  conectar = () => {
    // axios.get(`http://${this.IP_AP}`)
    // .then(res => {
    //   const resposta = res.data;
    //   this.setState({ Lista : resposta });
    //   this.Json.map(Lista=>console.log(Lista))
    //   //this.state.Lista.map(Lista => console.log(Lista))
    // })
    this.Json = this.Json[0].split("},")
    this.Json.map(item=>{this.Json2.push((item.includes("}")?item:item.concat("}")))})
    this.Json = []
    this.Json2.map(item=>{this.Json.push((item.replaceAll("'",'"')))})
    this.Json2 = []
    this.Json.map(item=>{
      item = item.replaceAll(",,",',')
      item = item.replaceAll("::",':')
      item = item.replaceAll("{{",'{')
      this.Json2.push(JSON.parse(item))
    })

    this.setState({ Json3 : this.Json2 });

  //Separação das autenticações Cadastradas

    let Contador0 = 0;
    let Contador1 = 0;
    let Contador2 = 0;

  this.Json2.map(i=>{
    if (i.senha !== undefined){
    Contador0++
    }
    if (i.rfid !== undefined){
      Contador1++
      }
    if (i.digital !== undefined){
      Contador2++
      }
    })

  this.setState({Senhas : Contador0, RFIDs : Contador1, Digitais : Contador2})

  //FIM Separação das autenticações Cadastradas

  //Separação Ultimo Acesso

  const ultimo_acesso = this.Tratar_Lista_Acessos(this.lista_Acessos);

  //FIM Separação Ultimo Acesso

    this.setState({ ultimo_acesso: ultimo_acesso });
    if (this.state.estado_conexao) {
      window.confirm("Tem certeza que deseja se desconectar?")
        ? this.setState({ estado_conexao: 0 })
        : this.setState({ estado_conexao: 1 });
    }
    this.setState({
      Numeros_Metodos_Cadastrados: this.Numeros_Metodos_Cadastrados,
    });
  };

  destrancar = () => {
    this.setState({ estado_tranca: this.state.estado_tranca ? 0 : 1 });
    setTimeout(() => {
      this.setState({ estado_tranca: this.state.estado_tranca ? 0 : 1 });
    }, 3000);
    console.log(this.state.Json3)
  };

  Tratar_Lista_Acessos = (lista) => {
    return lista.slice(-1);
  };

  //--------------------------------------------------------
  constructor(props) {
    super(props);

    this.state = {
      estado_tranca: 1,
      ultimo_acesso: null,
      estado_conexao: null,
      Numeros_Metodos_Cadastrados: {},
      Json3:[],
      Senhas: 0,
      Digitais: 0,
      RFIDs:0 ,
    };
  }
  //--------------------------------------------------------
  componentDidMount() {
    
  }
  //--------------------------------------------------------
  render() {
    return (
      <div className="fs-4 fw-bold text-white mt-5 ">
        {/*Bloco 1*/}
        <div className="card">
          <h5 className="card-header bg-info">
            <br></br>
          </h5>
          <div className="card-body bg-dark">
            <div className="d-flex justify-content-between">
              {/*componente estado*/}
              <div className="me-5">
                <div
                  className={`m-2 p-2 border ${
                    this.state.estado_tranca
                      ? "border-success"
                      : "border-danger"
                  } border-5`}
                >
                  Estado:{" "}
                  {this.state.estado_tranca ? "Trancado" : "Destrancado"}
                  <div
                    className={` ms-5 ${
                      this.state.estado_tranca
                        ? this.icones.Trancado
                        : this.icones.Destrancado
                    }`}
                  />
                </div>
              </div>

              <div className=" m-2 p-2 fa-solid fa-list-check fa-3x "></div>

              {/*componente conexao*/}
              <div className="">
                <div
                  className={`m-2 p-2 border ${
                    this.state.estado_conexao
                      ? "border-success"
                      : "border-danger"
                  } border-5`}
                >
                  Estado:{" "}
                  {this.state.estado_conexao ? "Conectado!" : "Desconectado!"}
                  <div
                    className={` ms-5 ${
                      this.state.estado_conexao
                        ? this.icones.wifi_On
                        : this.icones.wifi_off
                    }`}
                  />
                </div>
              </div>
            </div>
            {/*Botao de Destrancar*/}
            <div className=" d-flex justify-content-between">
              <button
                className="btn btn-outline-warning"
                onClick={this.destrancar}
              >
                Destrancar
              </button>
              {/*Botao de Conec*/}
              {this.state.estado_conexao ? (
                <button
                  className="btn btn-outline-danger"
                  onClick={this.conectar}
                >
                  Desonectar
                </button>
              ) : (
                <button
                  className="btn btn-outline-success"
                  onClick={this.conectar}
                >
                  Conectar
                </button>
              )}
            </div>
          </div>
          <div className="card-footer text-muted"></div>
        </div>
        {/*Fim do bloco 1*/}

        {/*Lista de ultimo acesso*/}
        <div className="d-flex justify-content-center">
          <div className={`mt-5 p-2 border border-5`}>
            Ultimo Acesso:{" "}
            {this.state.ultimo_acesso
              ? this.state.ultimo_acesso
              : "Sem Registro"}
            <div className="ms-5 fa-solid fa-user-secret fa-3x" />
            {/*Historico de Acessos*/}
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Historico de Acessos
              </button>
              <ul className="dropdown-menu">
                <li>
                  {this.state.Json3.map((el) => (
                    <ul className="dropdown-item" key={Math.random()}>
                      {" "}
                      {el.nome}{" "}
                    </ul>
                  ))}
                </li>
              </ul>
            </div>
            {/*FIM historico de Acessos*/}
          </div>
        </div>
        {/*Fim Lista de ultimo acesso*/}

        {/* listar Tipos de acessos */}

        <div className="container col-6 mt-5">
          <div className="card">
            <h5 className="d-flex card-header bg-info justify-content-center text-white ">
              Autenticações Cadastradas
              <br></br>
            </h5>
            <div className="card-body bg-dark">
              <ol className="list-group list-group-numbered">
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Senhas</div>
                  </div>
                  <span className="badge bg-primary rounded-pill">
                    {this.state.Senhas}
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">TAGS</div>
                  </div>
                  <span className="badge bg-primary rounded-pill">
                    {this.state.RFIDs}
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Digitais</div>
                  </div>
                  <span className="badge bg-primary rounded-pill">
                    {this.state.Digitais}
                  </span>
                </li>
              </ol>
            </div>
            <div className="card-footer text-muted"></div>
          </div>
        </div>
        {/* Fim listar Tipos de acessos */}

        <div
          style={{
            position: "absolute ",
            right: "0",
            width: "200px",
            height: "10px",
          }}
        >
          <button
            className="btn btn-outline-dark"
            onClick={() => this.audio.play()}
          >
            HabibHabib
          </button>
        </div>
      </div>
    );
  }
}

export default Funcionalidades;
