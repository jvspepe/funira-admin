import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useAuth from "@/contexts/auth/use-auth";

const Home = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) navigate("/dashboard");
  }, [currentUser]);

  return (
    <div className="container mx-auto flex h-screen items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Painel Funira</CardTitle>
          <CardDescription>Bem-vindo!</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <Button asChild>
            <Link to="/login">Conectar</Link>
          </Button>
          <Button asChild>
            <Link to="/criar-conta">Criar Conta</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
