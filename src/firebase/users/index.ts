import { Dispatch, SetStateAction } from "react";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  deleteUser as firebaseDeleteUser,
  onAuthStateChanged,
  setPersistence,
  signOut,
  User,
} from "firebase/auth";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import TUser from "@/@types/user";
import { auth, firestore } from "@/firebase/config";
import { converter } from "@/lib/utils";

// TODO: Criar página de verificação de e-mail
// const ACTION_CODE_SETTINGS: ActionCodeSettings = {
//   url: "localhost:",
// };

// Firestore
export const createUserDoc = async (data: TUser) => {
  try {
    await setDoc(
      doc(firestore, "users", data.uid).withConverter(converter<TUser>()),
      {
        ...data,
      },
    );
  } catch (error) {
    throw error;
  }
};

export const getUserDoc = async (uid: TUser["uid"]) => {
  try {
    const result = await getDoc(
      doc(firestore, "users", uid).withConverter(converter<TUser>()),
    );

    if (!result.exists()) throw new Error("User does not exist.");

    return result.data();
  } catch (error) {
    throw error;
  }
};

const deleteUserDoc = async (uid: TUser["uid"]) => {
  try {
    await deleteDoc(doc(firestore, "users", uid));
  } catch (error) {
    throw error;
  }
};

// Auth

const handlePersistence = async (persistence = false) => {
  try {
    await setPersistence(
      auth,
      persistence ? browserLocalPersistence : browserSessionPersistence,
    );
  } catch (error) {
    throw error;
  }
};

export function authState(
  setCurrentUser: Dispatch<SetStateAction<User | null>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
) {
  const unsub = onAuthStateChanged(auth, (user) => {
    setCurrentUser(user);
    setLoading(false);
  });

  return unsub;
}

export const createUser = async (
  displayName: string,
  email: string,
  password: string,
) => {
  try {
    await handlePersistence();

    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    await Promise.all([
      updateProfile(user, { displayName }),
      createUserDoc({ uid: user.uid, displayName, email, role: "consumer" }),
    ]);
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    await handlePersistence();

    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (user: User) => {
  try {
    await Promise.all([firebaseDeleteUser(user), deleteUserDoc(user.uid)]);
  } catch (error) {
    throw error;
  }
};
