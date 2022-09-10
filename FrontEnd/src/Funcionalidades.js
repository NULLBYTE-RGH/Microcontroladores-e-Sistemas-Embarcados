import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "@fortawesome/fontawesome-free/css/all.css";

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

  Numeros_Metodos_Cadastrados = { senha: 3, TAG: 7, digital: 9 };

  //--------------------------------------------------------

  //metodos
  conectar = () => {
    this.setState({ estado_conexao: this.state.estado_conexao ? 0 : 1 });
    const ultimo_acesso = this.Tratar_Lista_Acessos(this.lista_Acessos);
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
    };
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
              {this.state.estado_conexao ? <button
                className="btn btn-outline-danger"
                onClick={this.conectar}
              >
                Desonectar
              </button>
              : 
              <button
                className="btn btn-outline-success"
                onClick={this.conectar}
              >
                Conectar
              </button>}
              
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
                  {this.lista_Acessos.map((el) => (
                    <ul className="dropdown-item" key={el}>
                      {" "}
                      {el}{" "}
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
                    {this.state.Numeros_Metodos_Cadastrados.senha}
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">TAGS</div>
                  </div>
                  <span className="badge bg-primary rounded-pill">
                    {this.state.Numeros_Metodos_Cadastrados.TAG}
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Digitais</div>
                  </div>
                  <span className="badge bg-primary rounded-pill">
                    {this.state.Numeros_Metodos_Cadastrados.digital}
                  </span>
                </li>
              </ol>
            </div>
            <div className="card-footer text-muted"></div>
          </div>
        </div>
        {/* Fim listar Tipos de acessos */}
      </div>
    );
  }
}

export default Funcionalidades;
