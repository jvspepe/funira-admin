import { ReactNode } from "react";
import { ArchiveIcon, CubeIcon, DashboardIcon } from "@radix-ui/react-icons";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { Link } from "react-router-dom";

type TLink = {
  url: string;
  icon?: ReactNode;
  label: string;
};

const routes: TLink[] = [
  {
    url: "/dashboard",
    icon: <DashboardIcon className="h-4 w-4" />,
    label: "Dashboard",
  },
  {
    url: "/dashboard/produtos",
    icon: <CubeIcon className="h-4 w-4" />,

    label: "Produtos",
  },
  {
    url: "/dashboard/categorias",
    icon: <ArchiveIcon className="h-4 w-4" />,
    label: "Categorias",
  },
];

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((route) => (
                <SidebarMenuItem key={route.label}>
                  <SidebarMenuButton asChild>
                    <Link to={route.url}>
                      {route.icon}
                      <span>{route.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
