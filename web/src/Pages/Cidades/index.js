import React, { useEffect, useState } from "react";
import "./cidadeStyle.css";
import api from "../../services/api";
import Select from "react-select";

function Cidades() {
  return (
    <div className="Cidades centralized">
      <div className="titulo">
        <h1>Sistema de Gerenciamento de Doação de Sangue</h1>
        <h1>Cidades</h1>
      </div>
      <div className="input-div">
        <div className="centralized">
          <ListCidades className="centralized" />
        </div>
      </div>
    </div>
  );
}

const ListCidades = () => {
  const [cidades, setCidades] = useState([]);
  const [nomeCidade, setNomeCidade] = useState("");
  const [siglaEstado, setSiglaEstado] = useState();
  const [cidadeId, setCidadeId] = useState();
  const [estados, setEstados] = useState([]);
  const [estadoId, setEstadoId] = useState();

  const getCidades = () => {
    api.get("/cidades").then((response) => {
      setCidades(response.data);
    });
  };

  const getEstados = () => {
    api.get("/estados").then((response) => {
      setEstados(response.data);
      console.log(response.data);
    });
  };

  const getEstadosById = (id) => {
    for (let estado of estados) {
      if (estado.id === id) {
        return estado.sigla;
      }
    }
  };

  const options = estados.map((estado) => ({
    value: estado.id,
    label: `${estado.sigla}`,
  }));

  const atualizarButton = async () => {
    if (nomeCidade === "" || cidadeId == null || estadoId == null) {
      return;
    }
    api
      .post(`/cidades/${cidadeId}`, {
        nome: nomeCidade,
        estadoId: estadoId,
      })
      .then((response) => {
        console.log(response.data);
        getCidades();
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
    if (cidadeId == null) {
      return;
    }
    api
      .delete(`/cidades/${cidadeId}`, {})
      .then((response) => {
        console.log(response.data);
        getCidades();
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

  const criarButton = async () => {
    let index = cidades.length - 1;
    let id = cidades[index].id;
    console.log(id);
    console.log(cidades[index].id);
    console.log("Cidade id:", id);

    console.log(nomeCidade, id + 1, estadoId);

    if (nomeCidade === "" || estadoId == null) {
      return;
    }
    api
      .post("/cidades", {
        id: id + 1,
        nome: nomeCidade,
        estadoId: estadoId,
      })
      .then((response) => {
        console.log(response.data);
        let response_arr = [];
        response_arr.push(response.data);
        setCidades([...cidades, ...response_arr]);
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
    api.get("/cidades").then((response) => {
      setCidades(response.data);
      console.log(response.data);
      getEstados();
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
              setCidadeId(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <input
            placeholder="Nome da cidade"
            onChange={(e) => {
              setNomeCidade(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <Select
            placeholder="Selecione uma cidade"
            options={options}
            className="Select"
            onChange={(e) => {
              setEstadoId(e.value);
            }}
          />
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

        <ul>
          {cidades.map((cidade) => (
            <li>
              {cidade.id} - {cidade.nome} - {getEstadosById(cidade.estadoId)} -
              | {cidade.created_at} | {cidade.updated_at}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Cidades;
