import TUser from "@/@types/user";
import { auth } from "@/lib/firebase/config";
import { getUserDoc } from "@/lib/firebase/firestore/users";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type TAuthContext = {
  currentUser: User | null;
  currentUserData: TUser | null;
};

const AuthContext = createContext<TAuthContext>({
  currentUser: null,
  currentUserData: null,
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] =
    useState<TAuthContext["currentUser"]>(null);
  const [currentUserData, setCurrentUserData] =
    useState<TAuthContext["currentUserData"]>(null);

  const getCurrentUserData = async (user: User) => {
    try {
      const userData = await getUserDoc(user.uid);
      return userData;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (currentUser) {
      getCurrentUserData(currentUser).then((data) => setCurrentUserData(data));
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

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Must be used within the correct context.");
  }
  return context;
};

export { AuthProvider, useAuth };
