import { createContext } from "react";
import { User } from "firebase/auth";
import TUser from "@/@types/user";

export type TAuthContext = {
  currentUser: User | null;
  currentUserData: TUser | null;
};

const AuthContext = createContext<TAuthContext>({
  currentUser: null,
  currentUserData: null,
});

export default AuthContext;
