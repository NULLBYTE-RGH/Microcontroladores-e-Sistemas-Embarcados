import React from "react"

export default function Login (props) {

  function envio(event){
    event.preventDefault()
    props.login(event)
  }

  return (
    <div className="">
      <form className="Auth-form" onSubmit={this.login}>
        <div className="Auth-form-content">
          <div className="form-group mt-3">
            <label>Nome</label>
            <input
              type="nome"
              name="nome"
              className="form-control mt-1"
              placeholder="Digite o Nome"
            />
          </div>
          <div className="form-group mt-3">
            <label>Senha</label>
            <input
              type="senha"
              name="senha"
              className="form-control mt-1"
              placeholder="Digite a senha"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Confirmar
            </button>
          </div>
        </div>
      </form>
      </div>
  )
}