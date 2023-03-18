import React, { useEffect, useState } from "react";
import "./pessoaStyle.css";
import api from "../../services/api";
import Select from "react-select";

function Pessoas() {
  return (
    <div className="Pessoas centralized">
      <div className="titulo">
        <h1>Sistema de Gerenciamento de Doação de Sangue</h1>
        <h1>Pessoas</h1>
      </div>
      <div className="input-div">
        <div className="centralized">
          <ListPessoas className="centralized" />
        </div>
      </div>
    </div>
  );
}

const ListPessoas = () => {
  const [pessoas, setPessoas] = useState([]);
  const [nome, setNome] = useState("");
  const [idSelect, setIdSelect] = useState();
  const [cpf, setCpf] = useState("");
  const [cidadeId, setCidadeId] = useState();
  const [tipoId, setTipoId] = useState();
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");

  const getCidades = () => {
    api.get("/cidades").then((response) => {
      setCidades(response.data);
    });
  };

  const getCidadeNome = (id) => {
    for (let cidade of cidades) {
      if (cidade.id == id) return cidade.nome;
    }
  };
  const getTipoNome = (id) => {
    for (let tipo of tipos) {
      if (tipo.id == id) return tipo.tipo + tipo.fator;
    }
  };
  const getTipos = () => {
    api.get("/tipoSanguinio").then((response) => {
      setTipos(response.data);
    });
  };

  const getPessoas = () => {
    api.get("/pessoas").then((response) => {
      setPessoas(response.data);
    });
  };

  const criarButton = () => {
    console.log(tipoId, cidadeId);
    if (nome === "" || cpf === "" || tipoId === "" || cidadeId === null) {
      return;
    }
    let index = pessoas.length - 1;
    let id = pessoas[index].id;
    console.log(id + 1);
    api
      .post("/pessoas", {
        id: id + 1,
        nome: nome,
        rua: rua,
        numero: numero,
        complemento: complemento,
        documento: cpf,
        cidadeId: cidadeId,
        tipoId: tipoId,
      })
      .then((response) => {
        console.log(response.data);
        let response_arr = [];
        response_arr.push(response.data);
        setPessoas([...pessoas, ...response_arr]);
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

  const atualizarButton = () => {
    console.log(tipoId, cidadeId);
    if (nome === "" || cpf === "" || tipoId === "" || cidadeId === null) {
      return;
    }
    api
      .post(`/pessoas/${idSelect}`, {
        nome: nome,
        rua: rua,
        numero: numero,
        complemento: complemento,
        documento: cpf,
        cidadeId: cidadeId,
        tipoId: tipoId,
      })
      .then((response) => {
        console.log(response.data);
        getPessoas();
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
    console.log(tipoId, cidadeId);
    if (idSelect === null) {
      return;
    }
    api
      .delete(`/pessoas/${idSelect}`)
      .then((response) => {
        console.log(response.data);
        getPessoas();
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
    getCidades();
    getPessoas();
    getTipos();
  }, []);

  const [cidades, setCidades] = useState([]);
  const [tipos, setTipos] = useState([]);

  const options = cidades.map((cidade) => ({
    value: cidade.id,
    label: `${cidade.nome}`,
  }));
  const optionsTipos = tipos.map((tipo) => ({
    value: tipo.id,
    label: `${tipo.tipo}${tipo.fator}`,
  }));
  return (
    <div className="centralized">
      <div>
        <div>
          <input
            placeholder="Id (Nao usar para criar)"
            type="number"
            onChange={(e) => {
              setIdSelect(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <input
            placeholder="Nome"
            onChange={(e) => {
              setNome(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <input
            placeholder="CPF"
            onChange={(e) => {
              setCpf(e.target.value);
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
          <Select
            placeholder="Selecione o Tipo Sanguinio"
            options={optionsTipos}
            className="Select"
            onChange={(e) => {
              setTipoId(e.value);
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
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>CPF</th>
              <th>Tipo sanguíneo</th>
              <th>Cidade</th>
              <th>Rua</th>
              <th>Numero</th>
              <th>Complemento</th>
            </tr>
          </thead>
          <tbody>
            {pessoas.map((pessoa) => (
              <tr key={pessoa.id}>
                <td>{pessoa.id}</td>
                <td>{pessoa.nome}</td>
                <td>{pessoa.documento}</td>
                <td>{getTipoNome(pessoa.tipoId)}</td>
                <td>{getCidadeNome(pessoa.cidadeId)}</td>
                <td>{pessoa.rua}</td>
                <td>{pessoa.numero}</td>
                <td>{pessoa.complemento}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Pessoas;
