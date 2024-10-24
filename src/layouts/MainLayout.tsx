import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";

const MainLayout = () => {
  return (
    <div className="flex max-h-screen overflow-hidden">
      <Sidebar />
      <div className="h-screen grow overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
