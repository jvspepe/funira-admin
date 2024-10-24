import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "../config";
import { converter } from "@/lib/utils";
import TUser from "@/@types/user";

const createUserDoc = async (data: TUser) => {
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

const getUserDoc = async (uid: TUser["uid"]) => {
  try {
    const userDoc = await getDoc(
      doc(firestore, "users", uid).withConverter(converter<TUser>()),
    );
    if (!userDoc.exists()) throw new Error("User does not exist.");
    return userDoc.data();
  } catch (error) {
    throw error;
  }
};

export { createUserDoc, getUserDoc };
