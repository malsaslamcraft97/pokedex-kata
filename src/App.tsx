import { BrowserRouter, Route, Routes } from "react-router-dom";
import PokemonListPage from "./features/pokemon/pages/PokemonListPage";
import PokemonDetailPage from "./features/pokemon/pages/PokemonDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PokemonListPage />} />
        <Route path="/pokemon/:name" element={<PokemonDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
