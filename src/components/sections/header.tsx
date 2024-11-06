import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutUser } from "@/firebase/users";
import useAuth from "@/contexts/auth/use-auth";

const Header = () => {
  const { currentUser } = useAuth();

  const handleSignOut = async () => {
    try {
      await logoutUser();
    } catch (error) {
      throw error;
    }
  };

  return (
    <header className="sticky top-0 z-[1] border-b bg-sidebar">
      <nav className="flex items-center justify-between p-5">
        <SidebarTrigger />
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-4 rounded px-2 hover:bg-primary/10">
            <span>{currentUser?.displayName}</span>
            <Avatar>
              <AvatarImage src={currentUser?.photoURL || ""} />
              <AvatarFallback>
                {currentUser?.displayName
                  ?.split(" ")
                  .map((element) => element[0])
                  .join(" ")}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Configurações</DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut}>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  );
};

export default Header;
