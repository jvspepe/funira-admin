import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ArchiveIcon,
  CubeIcon,
  DashboardIcon,
  ExitIcon,
  ReloadIcon,
} from "@radix-ui/react-icons";
import { useAuth } from "@/contexts/AuthContext";
import { logoutUser } from "@/lib/firebase/auth/logout-user";

type TLink = {
  href: string;
  icon?: ReactNode;
  label: string;
};

const routes: TLink[] = [
  {
    href: "/dashboard",
    icon: <DashboardIcon className="h-4 w-4" />,
    label: "Dashboard",
  },
  {
    href: "/dashboard/produtos",
    icon: <CubeIcon className="h-4 w-4" />,

    label: "Produtos",
  },
  {
    href: "/dashboard/categorias",
    icon: <ArchiveIcon className="h-4 w-4" />,
    label: "Categorias",
  },
  // {
  //   href: "/dashboard/usuarios",
  //   icon: <PersonIcon className="h-4 w-4" />,
  //   label: "Usuários",
  // },
];

const Sidebar = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { currentUser } = useAuth();

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await logoutUser();
    } catch (error) {
      throw error;
    }
    setLoading(false);
  };

  return (
    <div className="h-screen w-fit border-r border-input bg-background shadow transition-all duration-300">
      <div className="flex h-full flex-col justify-between p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={currentUser?.photoURL || ""} />
              <AvatarFallback>
                {currentUser?.displayName
                  ?.split(" ")
                  .map((element) => element[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <span>{currentUser?.displayName}</span>
          </div>
          <div className="flex flex-col gap-4">
            {routes.map((route) => (
              <Button
                key={route.href}
                asChild
                variant="ghost"
                className="flex items-center justify-start gap-2"
              >
                <Link to={route.href}>
                  {route.icon && route.icon}
                  {route.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
        <Button
          onClick={handleSignOut}
          disabled={loading}
          type="button"
          variant="outline"
          className="flex items-center gap-2"
        >
          {loading ? (
            <>
              <ReloadIcon className="h-4 w-4 animate-spin" />
              Carregando...
            </>
          ) : (
            <>
              <ExitIcon className="h-4 w-4" />
              Sair
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
