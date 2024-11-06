import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PageHeader from "@/components/PageHeader";

const Products = () => {
  return (
    <div className="flex flex-col gap-5 p-5 md:px-5">
      <div className="flex items-center justify-between md:justify-normal md:gap-5">
        <PageHeader title="Produtos" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">Opções</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Link to="/dashboard/produtos">Ver produtos</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/dashboard/produtos/adicionar">Adicionar produto</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Outlet />
    </div>
  );
};

export default Products;
