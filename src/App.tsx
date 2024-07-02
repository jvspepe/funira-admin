import { Link } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Link to="/produtos">Ver Produtos</Link>
      <Link to="/adicionar-produto">Criar Produto</Link>
    </div>
  );
};

export default App;
