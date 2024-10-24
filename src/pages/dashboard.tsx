import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TProduct } from "@/@types/product";
import { getAllProducts } from "@/lib/firebase/firestore/products";
import {
  DotsHorizontalIcon,
  PersonIcon,
  ReloadIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Widget from "@/components/Widget";
import PageHeader from "@/components/PageHeader";
import { DollarSign, Package, Truck } from "lucide-react";

const Dashboard = () => {
  const [products, setProducts] = useState<TProduct[]>();

  useEffect(() => {
    getAllProducts().then((data) => setProducts(data.databaseProducts));
  }, []);

  return (
    <div className="container mx-auto grid h-screen gap-8 pt-8">
      <PageHeader title="Dashboard" />
      <div className="grid grid-cols-4 gap-8 pb-8">
        <Widget
          title="Total de Usuários"
          icon={<PersonIcon className="h-16 w-16" />}
        >
          10
        </Widget>
        <Widget
          title="Total de Produtos"
          icon={<Package className="h-16 w-16" />}
        >
          10
        </Widget>
        <Widget
          title="Total de Vendas"
          icon={<DollarSign className="h-16 w-16" />}
        >
          10
        </Widget>
        <Widget title="Total de Pedidos" icon={<Truck className="h-16 w-16" />}>
          10
        </Widget>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Produtos</CardTitle>
            <CardDescription>em nosso banco de dados</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col">
            <Table className="grow">
              <TableHeader>
                <TableRow>
                  <TableHead>UID</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead className="text-right">Editar</TableHead>
                </TableRow>
              </TableHeader>
              {products && products.length > 0 ? (
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.uid}>
                      <TableCell
                        title={product.uid}
                        className="max-w-20 overflow-hidden text-ellipsis whitespace-nowrap"
                      >
                        {product.uid}
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell className="text-right">
                        {product.price}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button type="button" variant="ghost" size="icon">
                          <DotsHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <ReloadIcon className="h-4 w-4 animate-spin" />
                  Carregando informações
                </div>
              )}
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
