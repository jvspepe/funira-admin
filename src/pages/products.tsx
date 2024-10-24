import { useEffect, useState } from "react";
import { getAllProducts } from "@/lib/firebase/firestore/products";
import { TProduct } from "@/@types/product";
import ProductCard from "@/features/products/product-card";
import PageHeader from "@/components/PageHeader";
import AddProduct from "@/features/products/add-product";

const Products = () => {
  const [products, setProducts] = useState<TProduct[]>([]);

  useEffect(() => {
    getAllProducts().then(({ databaseProducts }) =>
      setProducts(databaseProducts),
    );
  }, []);

  return (
    <div className="container mx-auto">
      <PageHeader title="Produtos" />
      <AddProduct />
      <div className="grid grid-cols-4 gap-4 pb-8">
        {products.map((product) => (
          <ProductCard key={product.uid} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
