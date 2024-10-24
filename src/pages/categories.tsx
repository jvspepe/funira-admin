import { useEffect, useState } from "react";
import { TCategory } from "@/@types/category";
import PageHeader from "@/components/PageHeader";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CategoryCard from "@/features/categories/category-card";
import { getAllCategories } from "@/lib/firebase/firestore/categories";
import AddCategory from "@/features/categories/add-category";

export default function Categories() {
  const [categories, setCategories] = useState<TCategory[]>();
  useEffect(() => {
    getAllCategories()
      .then((data) => setCategories(data))
      .catch((error) => {
        throw error;
      });
  }, []);

  return (
    <div>
      <PageHeader title="Categorias" />
      <AddCategory />
      <Table className="grow">
        <TableHeader>
          <TableRow>
            <TableHead>UID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Referência</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories?.map((category) => (
            <CategoryCard key={category.uid} category={category} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
