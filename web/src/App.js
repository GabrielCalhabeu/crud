import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cidades from "./Pages/Cidades";
import Estados from "./Pages/Estados";
import Pessoas from "./Pages/Pessoas";
import TipoSanguineo from "./Pages/TipoSanguinios";
import LocaisColeta from "./Pages/LocaisColeta";
import Doacoes from "./Pages/Doacoes";
import Home from "./Pages/Home";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/cidades" element={<Cidades />}></Route>
          <Route path="/estados" element={<Estados />}></Route>
          <Route path="/pessoas" element={<Pessoas />}></Route>
          <Route path="/tipoSanguinios" element={<TipoSanguineo />}></Route>
          <Route path="/locaisColeta" element={<LocaisColeta />}></Route>
          <Route path="/doacoes" element={<Doacoes />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
