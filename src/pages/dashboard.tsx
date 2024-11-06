import { useEffect, useState } from "react";
import { TProduct } from "@/@types/product";
import { getAllProducts } from "@/firebase/products";

import PageHeader from "@/components/PageHeader";

const Dashboard = () => {
  const [_, setProducts] = useState<TProduct[]>();

  useEffect(() => {
    getAllProducts().then((data) => setProducts(data.databaseProducts));
  }, []);

  return (
    <div className="container mx-auto grid h-screen gap-8 pt-8">
      <PageHeader title="Dashboard" />
    </div>
  );
};

export default Dashboard;
