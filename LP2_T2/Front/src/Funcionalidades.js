import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "@fortawesome/fontawesome-free/css/all.css";
import sound from "./Orgonite.mp3";

const axios = require("axios");

class Funcionalidades extends React.Component {
  //variaveis

  timer = null;

  icones = {
    Trancado: "fa-sharp fa-solid fa-lock fa-2x",
    Destrancado: "fa-solid fa-unlock fa-2x",
    wifi_On: "fa-solid  fa-wifi fa-2x",
    wifi_off: "fa-solid fa-globe fa-2x",
  };
  audio = new Audio(sound);
  //IP ESP32
  IP_AP = "127.0.0.1";
  Porta = 5000;
  Porta_Ouvir = 9000;
  servico = `http://${this.IP_AP}:${this.Porta}/GET`;
  Trancar = `http://${this.IP_AP}:${this.Porta}/TRANC`;
  Destrancar = `http://${this.IP_AP}:${this.Porta}/DEST`;
  //Json é o requisitado
  Json2 = [];
  Json = [];
  //--------------------------------------------------------

  //metodos

  conexao() {
    this.Json2 = [];
    this.Json = [];

    this.setState({ Json3: [] });
    axios.get(this.servico).then((res) => {
      this.Json = res.data;
      console.log(this.Json);
      if (this.Json.lengh < 1) {
        this.setState({ estado_conexao: false });
      } else {
        this.setState({ estado_conexao: true });
      }

      this.Json = this.Json[0].split("},");
      this.Json.map((item) => {
        this.Json2.push(item.includes("}") ? item : item.concat("}"));
        return 0;
      });
      this.Json = [];
      this.Json2.map((item) => {
        this.Json.push(item.replaceAll("'", '"'));
        return 0;
      });
      this.Json2 = [];
      this.Json.map((item) => {
        item = item.replaceAll(",,", ",");
        item = item.replaceAll("::", ":");
        item = item.replaceAll("{{", "{");
        this.Json2.push(JSON.parse(item));
        return 0;
      });

      //Separação das autenticações Cadastradas

      let Contador0 = 0;
      let Contador1 = 0;
      let Contador2 = 0;

      this.Json2.map((i) => {
        if (i.senha !== undefined) {
          Contador0++;
        }
        if (i.rfid !== undefined) {
          Contador1++;
        }
        if (i.digital !== undefined) {
          Contador2++;
        }
        return 0;
      });

      //Separação Ultimo Acesso

      const ultimo_acesso = this.Json2[this.Json2.length - 1].ultimo;

      //FIM Separação Ultimo Acesso

      this.setState({
        Senhas: Contador0,
        RFIDs: Contador1,
        Digitais: Contador2,
        Json3: this.Json2,
        ultimo_acesso: ultimo_acesso,
      });

      //FIM Separação das autenticações Cadastradas
    });
  }

  login(event) {
    event.preventDefault();
    this.setState({
      usuario: event.target.elements.nome.value,
      senha: event.target.elements.senha.value,
    });
  }

  conectar = () => {
    this.Json2 = [];
    this.Json = [];
    if (!this.state.estado_conexao) {
      //TIMER://
      this.timer = setInterval(() => {
        this.conexao();
      }, 1000);
      //FIM TIMER://
      this.conexao();
    }
    if (this.state.estado_conexao) {
      if (window.confirm("Tem certeza que deseja se desconectar?")) {
        this.setState({ estado_conexao: false });
        clearInterval(this.timer);
      } else {
        this.setState({ estado_conexao: true });
      }
    }
  };

  destrancar = () => {
    if (this.state.estado_conexao) {
      let json = `{"nome":"${this.state.usuario.toString()}", "senha":"${this.state.senha.toString()}"}`;
      json = JSON.parse(json);
      console.log(json);
      axios
        .post(this.Destrancar, json)
        .then((res) => {
          this.setState({ estado_tranca: this.state.estado_tranca ? 0 : 1 });

          setTimeout(() => {
            axios.get(this.Trancar).then((res) => {
              this.setState({
                estado_tranca: this.state.estado_tranca ? 0 : 1,
              });
            });
          }, 3000);
        })
        .catch((erro) => {
          if (erro.response) {
            window.alert("Credenciais Incorretas!");
          }
        });
    } else {
      window.alert("É necessario se Conectar primeiro");
    }
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
      estado_conexao: false,
      Numeros_Metodos_Cadastrados: {},
      Json3: [],
      Senhas: 0,
      Digitais: 0,
      RFIDs: 0,
      usuario: "",
      senha: "",
    };
    this.login = this.login.bind(this);
  }
  //--------------------------------------------------------
  componentDidMount() {}
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
                  Desconectar
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
        <div className="d-flex justify-content-between">
          <div className="col-4">
            <div className={`mt-5 p-2 border border-5`}>
              {/* form de login */}
              <form className="Auth-form" onSubmit={this.login}>
                <h3 className="Auth-form-title text-center">Autenticação</h3>
                <div className="Auth-form-content">
                  <div className="form-group mt-3">
                    <label>Nome</label>
                    <input
                      type="nome"
                      name="nome"
                      className="form-control mt-1"
                      placeholder="Digite o Nome"
                      onChange={(event) => {
                        this.setState({ usuario: event.target.value });
                      }}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label>Senha</label>
                    <input
                      type="senha"
                      name="senha"
                      className="form-control mt-1"
                      placeholder="Digite a senha"
                      onChange={(event) => {
                        this.setState({ senha: event.target.value });
                      }}
                    />
                  </div>
                  <div className="d-grid gap-2 mt-3"></div>
                </div>
              </form>
              {/* fim do from de login */}
            </div>
          </div>

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
                Usuários
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
