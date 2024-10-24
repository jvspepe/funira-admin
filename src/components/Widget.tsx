import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  title: string;
  icon?: ReactNode;
  description?: string;
  children: ReactNode;
};

const Widget = ({ title, icon, description, children }: Props) => {
  return (
    <Card className="flex justify-between p-6">
      <div className="flex flex-col justify-between">
        <CardHeader className="p-0">
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className="flex items-center gap-4 p-0">
          {children}
        </CardContent>
      </div>
      {icon && icon}
    </Card>
  );
};

export default Widget;
