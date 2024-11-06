import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import Header from "@/components/sections/header";

const MainLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex h-screen grow flex-col">
        <Header />
        <main className="grow">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
