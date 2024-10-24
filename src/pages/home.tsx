import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Home = () => {
  return (
    <div className="container mx-auto flex h-screen items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-500">Painel Funira</CardTitle>
          <CardDescription>Bem-vindo!</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <Button asChild>
            <Link to="/account-login">Conectar</Link>
          </Button>
          <Button asChild>
            <Link to="/account-create">Criar Conta</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
