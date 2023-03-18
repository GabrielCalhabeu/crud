import api from "../../services/api";
import React, { useEffect, useState } from "react";
import "./tiposStyle.css";
const ListTiposSanguineos = () => {
  const [tiposSanguineos, setTiposSanguineos] = useState([]);
  const [nomeTipoSanguineo, setNomeTipoSanguineo] = useState("");
  const [fatorTipoSanguineo, setFatorTipoSanguineo] = useState("");
  const [tipoSanguineoId, setTipoSanguineoId] = useState();

  const getTiposSanguineos = () => {
    api.get("/tipoSanguinio").then((response) => {
      setTiposSanguineos(response.data);
    });
  };

  const atualizarButton = () => {
    if (nomeTipoSanguineo === "" || tipoSanguineoId == null) {
      return;
    }
    console.log(tipoSanguineoId);
    api
      .post(`/tipoSanguinio/${tipoSanguineoId}`, {
        tipo: nomeTipoSanguineo,
        fator: fatorTipoSanguineo,
      })
      .then((response) => {
        console.log(response.data);
        getTiposSanguineos();
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
    if (tipoSanguineoId == null) {
      return;
    }
    console.log(tipoSanguineoId);
    api
      .delete(`/tipoSanguinio/${tipoSanguineoId}`, {})
      .then((response) => {
        console.log(response.data);
        getTiposSanguineos();
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
    console.log(nomeTipoSanguineo);
    let index = tiposSanguineos.length - 1;
    let id = tiposSanguineos[index].id;
    console.log(id);
    console.log(tiposSanguineos[index].id);
    console.log("Tipo Sanguíneo id:", id);
    if (nomeTipoSanguineo === "") {
      return;
    }
    api
      .post("/tipoSanguinio", {
        id: id + 1,
        tipo: nomeTipoSanguineo,
        fator: fatorTipoSanguineo,
      })
      .then((response) => {
        console.log(response.data);
        let response_arr = [];
        response_arr.push(response.data);
        setTiposSanguineos([...tiposSanguineos, ...response_arr]);
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
    api.get("/tipoSanguinio").then((response) => {
      setTiposSanguineos(response.data);
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
              setTipoSanguineoId(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <input
            placeholder="Tipo"
            onChange={(e) => {
              setNomeTipoSanguineo(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <input
            placeholder="Fator"
            onChange={(e) => {
              setFatorTipoSanguineo(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <button onClick={criarButton}>Criar</button>
        </div>
        <div>
          <button onClick={atualizarButton}>Atualizar</button>
        </div>
        <div>
          <button className="remove" onClick={removeButton}>
            Remover
          </button>
        </div>

        <div>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Tipo</th>
                <th>Fator</th>
              </tr>
            </thead>
            <tbody>
              {tiposSanguineos.map((tipo) => (
                <tr key={tipo.id}>
                  <td>{tipo.id}</td>
                  <td>{tipo.tipo}</td>
                  <td>{tipo.fator}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
function TipoSanguineo() {
  return (
    <div className="TipoSanguineo centralized">
      <div className="titulo">
        <h1>Sistema de Gerenciamento de Doação de Sangue</h1>
        <h1>Tipos Sanguíneos</h1>
      </div>
      <div className="input-div">
        <div className="centralized">
          <ListTiposSanguineos className="centralized" />
        </div>
      </div>
    </div>
  );
}
export default TipoSanguineo;
