import { ReactNode, useEffect, useState } from "react";
import { authState, getUserDoc } from "@/firebase/users";
import AuthContext, { TAuthContext } from "./auth-context";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] =
    useState<TAuthContext["currentUser"]>(null);
  const [currentUserData, setCurrentUserData] =
    useState<TAuthContext["currentUserData"]>(null);

  useEffect(() => {
    const unsub = authState(setCurrentUser, setLoading);
    return () => unsub();
  }, []);

  useEffect(() => {
    if (currentUser) {
      getUserDoc(currentUser.uid).then((data) => setCurrentUserData(data));
    } else {
      setCurrentUserData(null);
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, currentUserData }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
