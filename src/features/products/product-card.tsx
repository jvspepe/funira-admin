import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TProduct } from "@/@types/product";
import { Button } from "../../components/ui/button";
import { deleteProduct } from "@/lib/firebase/firestore/products";

type Props = {
  product: TProduct;
};

const ProductCard = ({ product }: Props) => {
  async function handleDeleteProduct(product: TProduct) {
    try {
      await deleteProduct(product);
    } catch (error) {
      throw error;
    }
  }

  return (
    <Card key={product.uid} className="flex flex-col">
      <img src={product.images[0]} alt="" />
      <CardHeader className="grow">
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.category}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <span>{product.price}</span>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="flex items-center gap-2"
          >
            Editar
          </Button>
          <Button
            type="button"
            onClick={() => handleDeleteProduct(product)}
            variant="secondary"
            size="sm"
            className="flex items-center gap-2"
          >
            Excluir
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
