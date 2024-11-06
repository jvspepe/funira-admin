import { useEffect, useState } from "react";
import { TProduct } from "@/@types/product";
import { getAllProducts } from "@/firebase/products";
import ProductCard from "@/features/products/product-card";
import { Skeleton } from "@/components/ui/skeleton";

const ProductsDisplay = () => {
  const [products, setProducts] = useState<TProduct[]>([]);

  useEffect(() => {
    getAllProducts()
      .then((result) => setProducts(result.databaseProducts))
      .catch((error) => {
        throw error;
      });
  }, []);

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {Array.from(Array(6)).map((_, index) => (
        <Skeleton key={index + 1} className="min-h-80" />
      ))}
      {!products ? (
        "Carregando..."
      ) : (
        <>
          {products.map((product) => (
            <ProductCard key={product.uid} product={product} />
          ))}
        </>
      )}
    </div>
  );
};

export default ProductsDisplay;
