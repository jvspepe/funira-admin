import { TCategory } from "@/@types/category";
import { TableCell, TableRow } from "@/components/ui/table";

type Props = {
  category: TCategory;
};

export default function CategoryCard({ category }: Props) {
  return (
    <TableRow>
      <TableCell
        title={category.uid}
        className="max-w-20 overflow-hidden text-ellipsis whitespace-nowrap"
      >
        {category.uid}
      </TableCell>
      <TableCell>{category.label}</TableCell>
      <TableCell>{category.value}</TableCell>
    </TableRow>
  );
}
