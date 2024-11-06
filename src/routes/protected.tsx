import { Navigate, Outlet } from "react-router-dom";
import useAuth from "@/contexts/auth/use-auth";

function Protected() {
  const { currentUser } = useAuth();

  return currentUser ? <Outlet /> : <Navigate to="/" />;
}

export default Protected;
