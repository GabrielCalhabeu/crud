import React, { useEffect, useState } from "react";
import Select from "react-select";
import "./localColetaStyle.css";
import api from "../../services/api";

function LocalColeta() {
  return (
    <div className="LocalColeta centralized">
      <div className="titulo">
        <h1>Sistema de Gerenciamento de Doação de Sangue</h1>
        <h1>Locais de Coleta</h1>
      </div>
      <div className="input-div">
        <div className="centralized">
          <ListLocaisColeta className="centralized" />
        </div>
      </div>
    </div>
  );
}

const ListLocaisColeta = () => {
  const [locaisColeta, setLocaisColeta] = useState([]);
  const [nomeLocalColeta, setNomeLocalColeta] = useState("");
  const [localColetaId, setLocalColetaId] = useState();
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [cidades, setCidades] = useState([]);
  const [cidadeId, setCidadeId] = useState();

  const getCidades = () => {
    api.get("/cidades").then((response) => {
      setCidades(response.data);
    });
  };

  const getLocaisColeta = () => {
    api.get("/locaisColeta").then((response) => {
      setLocaisColeta(response.data);
    });
  };

  const getCidadeNome = (id) => {
    for (let cidade of cidades) {
      if (cidade.id == id) return cidade.nome;
    }
  };

  const atualizarButton = () => {
    if (nomeLocalColeta === "" || localColetaId == null) {
      return;
    }
    console.log(localColetaId);
    api
      .post(`/locaisColeta/${localColetaId}`, {
        nome: nomeLocalColeta,
        rua: rua,
        numero: numero,
        complemento: complemento,
        cidadeId: cidadeId,
      })
      .then((response) => {
        console.log(response.data);
        getLocaisColeta();
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
    if (localColetaId == null) {
      return;
    }
    console.log(localColetaId);
    api
      .delete(`/locaisColeta/${localColetaId}`, {})
      .then((response) => {
        console.log(response.data);
        getLocaisColeta();
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
    console.log(nomeLocalColeta);
    let index = locaisColeta.length - 1;
    let id = locaisColeta[index].id;
    console.log(id);
    console.log(locaisColeta[index].id);
    console.log("Local Coleta id:", id);
    if (nomeLocalColeta === "") {
      return;
    }
    api
      .post("/locaisColeta", {
        id: id + 1,
        nome: nomeLocalColeta,
        rua: rua,
        numero: numero,
        complemento: complemento,
        cidadeId: cidadeId,
      })
      .then((response) => {
        console.log(response.data);
        let response_arr = [];
        response_arr.push(response.data);
        setLocaisColeta([...locaisColeta, ...response_arr]);
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
  const options = cidades.map((cidade) => ({
    value: cidade.id,
    label: `${cidade.nome}`,
  }));
  useEffect(() => {
    api.get("/locaisColeta").then((response) => {
      setLocaisColeta(response.data);
      getCidades();
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
              setLocalColetaId(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <input
            placeholder="Nome"
            onChange={(e) => {
              setNomeLocalColeta(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <input
            placeholder="Rua"
            onChange={(e) => {
              setRua(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <input
            placeholder="Numero"
            onChange={(e) => {
              setNumero(e.target.value);
            }}
          ></input>
        </div>

        <div>
          <input
            placeholder="Complemento"
            onChange={(e) => {
              setComplemento(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <Select
            placeholder="Selecione uma cidade"
            options={options}
            className="Select"
            onChange={(e) => {
              setCidadeId(e.value);
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

        <div>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Rua</th>
                <th>Numero</th>
                <th>Complemento</th>
                <th>Cidade</th>
              </tr>
            </thead>
            <tbody>
              {locaisColeta.map((local) => (
                <tr key={local.id}>
                  <td>{local.id}</td>
                  <td>{local.nome}</td>
                  <td>{local.rua}</td>
                  <td>{local.numero}</td>
                  <td>{local.complemento}</td>
                  <td>{getCidadeNome(local.cidadeId)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default LocalColeta;
