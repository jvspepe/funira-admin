import { signOut } from "firebase/auth";
import { auth } from "../config";

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};
