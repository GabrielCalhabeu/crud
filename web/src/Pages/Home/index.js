import { Link } from "react-router-dom";
import "./style.css";
function Home() {
  return (
    <div className="Home">
      <div className="titulo">
        <h1>Sistema de Gerenciamento de Doação de Sangue</h1>
      </div>
      <div>
        <li>
          <button>
            <Link to="/Estados">Estados</Link>
          </button>
        </li>
        <li>
          <button>
            <Link to="/Cidades">Cidades</Link>
          </button>
        </li>
        <li>
          <button>
            <Link to="/Pessoas">Pessoas</Link>
          </button>
        </li>
        <li>
          <button>
            <Link to="/tipoSanguinios">Tipos sanguineos</Link>
          </button>
        </li>
        <li>
          <button>
            <Link to="/locaisColeta">Locais de Coleta</Link>
          </button>
        </li>
        <li>
          <button>
            <Link to="/doacoes">Doacoes</Link>
          </button>
        </li>
      </div>
    </div>
  );
}

export default Home;
