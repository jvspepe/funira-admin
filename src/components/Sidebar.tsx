import Link from "@/components/Link";

const Sidebar = () => {
  return (
    <div className="fixed left-0 top-0 h-screen bg-gray-900 text-gray-50 shadow">
      <div className="flex flex-col items-start p-4">
        <Link to="/">Início</Link>
        <Link to="/produtos">Produtos</Link>
        <Link to="/adicionar-produto">Adicionar Produto</Link>
        <Link to="/adicionar-categoria">Adicionar Categoria</Link>
      </div>
    </div>
  );
};

export default Sidebar;
