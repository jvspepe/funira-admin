import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
