import React, { useEffect, useState } from "react";
import "./estadoStyle.css";
import api from "../../services/api";
function Estados() {
  return (
    <div className="Estados centralized">
      <div className="titulo">
        <h1>Sistema de Gerenciamento de Doação de Sangue</h1>
        <h1>Estados</h1>
      </div>
      <div className="input-div">
        <div className="centralized">
          <ListEstados className="centralized" />
        </div>
      </div>
    </div>
  );
}

const ListEstados = () => {
  const [estados, setEstados] = useState([]);
  const [nomeEstado, setNomeEstado] = useState("");
  const [siglaEstado, setSiglaEstado] = useState("");
  const [estadoId, setEstadoId] = useState();
  const getEstados = () => {
    api.get("/estados").then((response) => {
      setEstados(response.data);
    });
  };
  const AtualizarButton = () => {
    if (siglaEstado === "" || nomeEstado == "" || estadoId == null) {
      return;
    }
    console.log(estadoId);

    api
      .post(`/estados/${estadoId}`, {
        nome: nomeEstado,
        sigla: siglaEstado.toLocaleUpperCase(),
      })
      .then((response) => {
        console.log(response.data);
        getEstados();
      })
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          alert(error.response.data.error);
        } else if (error.re.quest) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  };

  const removeButton = () => {
    if (estadoId == null) {
      return;
    }
    console.log(estadoId);
    api
      .delete(`/estados/${estadoId}`, {})
      .then((response) => {
        console.log(response.data);
        getEstados();
      })
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          alert(error.response.data.error);
        } else if (error.re.quest) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  };

  const criarButton = () => {
    console.log(nomeEstado, siglaEstado);
    let index = estados.length - 1;
    let id = estados[index].id;
    console.log(id);
    console.log(estados[index].id);
    console.log("Estado id:", id);
    if (siglaEstado === "" || nomeEstado == "") {
      return;
    }
    api
      .post("/estados", {
        nome: nomeEstado,
        sigla: siglaEstado.toLocaleUpperCase(),
        id: id + 1,
      })
      .then((response) => {
        console.log(response.data);
        let response_arr = [];
        response_arr.push(response.data);
        setEstados([...estados, ...response_arr]);
      })
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          alert(error.response.data.error);
        } else if (error.re.quest) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  };

  useEffect(() => {
    api.get("/estados").then((response) => {
      setEstados(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <div className="centralized">
      <div>
        <div>
          <input
            placeholder="Id (Não usar para criar)"
            type="number"
            onChange={(e) => {
              setEstadoId(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <input
            placeholder="Nome do estado"
            onChange={(e) => {
              setNomeEstado(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <input
            placeholder="Sigla"
            onChange={(e) => {
              setSiglaEstado(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <button onClick={criarButton}>Criar</button>
        </div>

        <div>
          <button onClick={AtualizarButton}>Atualizar</button>
        </div>
        <div>
          <button className="remove" onClick={removeButton}>
            Remover
          </button>
        </div>
      </div>

      <ul>
        {estados.map((estado) => (
          <li>
            {estado.id} - {estado.nome} - {estado.sigla} | {estado.created_at} |{" "}
            {estado.updated_at}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Estados;
