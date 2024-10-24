import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config";

export const loginUser = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};
