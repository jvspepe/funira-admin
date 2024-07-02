import { Fragment, useEffect, useState } from "react";
import { getAllProducts } from "@/libs/firebase/firestore/products";
import { TProduct } from "@/types/product";

const AllProducts = () => {
  const [products, setProducts] = useState<TProduct[]>([]);

  useEffect(() => {
    getAllProducts().then((data) => setProducts(data.databaseProducts));
  }, []);

  return (
    <div className="h-screen">
      <div className="mx-auto flex w-[1440px] items-center justify-center">
        <table>
          <thead>
            <tr>
              <th className="border border-black text-start">Imagem</th>
              <th className="border border-black text-start">Nome</th>
              <th className="border border-black text-start">Preço</th>
              <th className="border border-black text-start">Categoria</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <Fragment key={product.uid}>
                <tr>
                  <td className="border border-black">
                    <img
                      src={product.images[0]}
                      alt=""
                      width={48}
                      className="aspect-[3/4]"
                    />
                  </td>
                  <td className="border border-black">{product.name}</td>
                  <td className="border border-black">
                    {Intl.NumberFormat("pt-BR", {
                      currency: "BRL",
                      style: "currency",
                    }).format(product.price)}
                  </td>
                  <td className="border border-black">{product.category}</td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProducts;
