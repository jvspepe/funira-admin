import { useContext } from "react";
import AuthContext from "./auth-context";

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Must be used within the correct context.");
  }
  return context;
};

export default useAuth;
