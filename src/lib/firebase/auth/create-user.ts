import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../config";
import { createUserDoc } from "../firestore/users";

export const createUser = async (
  displayName: string,
  email: string,
  password: string,
) => {
  try {
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
