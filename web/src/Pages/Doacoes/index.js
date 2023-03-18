import React, { useEffect, useState } from "react";
import "./doacoesStyle.css";
import api from "../../services/api";
import Select from "react-select";
function Doacoes() {
  return (
    <div className="Doacoes centralized">
      <div className="titulo">
        <h1>Sistema de Gerenciamento de Doação de Sangue</h1>
        <h1>Doações</h1>
      </div>
      <div className="input-div">
        <div className="centralized">
          <ListDoacoes className="centralized" />
        </div>
      </div>
    </div>
  );
}

const ListDoacoes = () => {
  const [doacoes, setDoacoes] = useState([]);

  const [pessoaId, setPessoaId] = useState();
  const [localId, setLocalId] = useState();
  const [dataDoacao, setDataDoacao] = useState("");
  const [id, setId] = useState(null);

  const getDoacoes = () => {
    api.get("/doacoes").then((response) => {
      setDoacoes(response.data);
    });
  };

  const getPessoas = () => {
    api.get("/pessoas").then((response) => {
      setPessoas(response.data);
      console.log(response.data);
    });
  };
  const getLocais = () => {
    api.get("/locaisColeta").then((response) => {
      setLocais(response.data);
      console.log(response.data);
    });
  };

  const getNomePessoa = (id) => {
    for (let pessoa of pessoas) {
      if (pessoa.id == id) return pessoa.nome;
    }
  };
  const getNomeLocal = (id) => {
    for (let local of locais) {
      if (local.id == id) return local.nome;
    }
  };

  const atualizarButton = () => {
    if (localId === null || pessoaId === null || id === null) {
      return;
    }

    api
      .post(`/doacoes/${id}`, {
        pessoaId: pessoaId,
        localId: localId,
        data: dataDoacao,
      })
      .then((response) => {
        console.log(response.data);
        getDoacoes();
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
    api
      .delete(`/doacoes/${id}`, {})
      .then((response) => {
        console.log(response.data);
        getDoacoes();
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
    if (localId === null || pessoaId === null) {
      return;
    }
    let index = doacoes.length - 1;
    let id = doacoes[index].id;
    console.log(id + 1);
    api
      .post("/doacoes", {
        id: id + 1,
        pessoaId: pessoaId,
        localId: localId,
        data: dataDoacao,
      })
      .then((response) => {
        console.log(response.data);
        let response_arr = [];
        response_arr.push(response.data);
        setDoacoes([...doacoes, ...response_arr]);
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
    getDoacoes();
    getLocais();
    getPessoas();
    console.log(locais);
  }, []);

  const [pessoas, setPessoas] = useState([]);
  const [locais, setLocais] = useState([]);

  const options = locais.map((local) => ({
    value: local.id,
    label: `${local.nome} - ${local.rua}`,
  }));

  const options2 = pessoas.map((pessoa) => ({
    value: pessoa.id,
    label: `${pessoa.nome} - ${pessoa.documento}`,
  }));
  return (
    <div>
      <div className="doacoes">
        <div>
          <input
            placeholder="Id (Nao usar para criar)"
            type="number"
            onChange={(e) => {
              setId(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <Select
            placeholder="Selecione um local de coleta"
            options={options}
            className="Select"
            onChange={(e) => {
              setLocalId(e.value);
            }}
          />
        </div>
        <div>
          <Select
            placeholder="Selecione uma pessoa"
            options={options2}
            className="Select"
            onChange={(e) => {
              setPessoaId(e.value);
            }}
          />
        </div>
        <div>
          <input
            placeholder="Data"
            type="date"
            onChange={(e) => {
              setDataDoacao(e.target.value);
            }}
          ></input>
        </div>
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

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome do Doador</th>
            <th>Local</th>
            <th>Data da Doação</th>
          </tr>
        </thead>
        <tbody>
          {doacoes.map((doacao) => (
            <tr key={doacao.id}>
              <td>{doacao.id}</td>
              <td>{getNomePessoa(doacao.pessoaId)}</td>
              <td>{getNomeLocal(doacao.localId)}</td>
              <td>{doacao.data}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Doacoes;
