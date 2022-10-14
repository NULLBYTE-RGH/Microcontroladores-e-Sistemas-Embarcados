import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";


import Funcionalidades from "./Funcionalidades";

function App() {
  return (
    <div className="container" style={{minWidth:  "520px"}}>


      <div className="m-auto border border-info border-4 rounded-pill mt-2 text-center">
        <div
          name="Logo"
          className="fw-bold display-1 p-3 mb-2 text-white d-inline"
        >
          Smart Lock
          <div className="ms-5 fa-sharp fa-solid fa-door-open " />
        </div>
      </div>

      <div>
        <Funcionalidades ></Funcionalidades>
      </div>
    </div>
  );
}

export default App;
