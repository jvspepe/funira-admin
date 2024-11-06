import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { firestore } from "@/firebase/config";
import { converter } from "@/lib/utils";
import { TCategory } from "@/@types/category";

export const createCategory = async (category: TCategory) => {
  try {
    await setDoc(
      doc(firestore, "categories", category.uid).withConverter(
        converter<TCategory>(),
      ),
      {
        ...category,
      },
    );
  } catch (error) {
    throw error;
  }
};

export const getCategory = async (categoryUID: string): Promise<TCategory> => {
  try {
    const category = await getDoc(
      doc(firestore, "categories", categoryUID).withConverter(
        converter<TCategory>(),
      ),
    );

    if (!category.exists()) throw new Error("Produto não existe.");

    return category.data();
  } catch (error) {
    throw error;
  }
};

export const deleteCategory = async (categoryUID: string) => {
  try {
    await deleteDoc(
      doc(firestore, "categories", categoryUID).withConverter(
        converter<TCategory>(),
      ),
    );
  } catch (error) {
    throw error;
  }
};

export async function getAllCategories() {
  const dataCollection: TCategory[] = [];

  const collectionReference = query(
    collection(firestore, "categories"),
    orderBy("label", "asc"),
  );

  try {
    const data = await getDocs(
      collectionReference.withConverter(converter<TCategory>()),
    );

    data.forEach((item) => {
      if (!item.exists()) return;
      dataCollection.push(item.data());
    });

    return dataCollection;
  } catch (error) {
    throw new Error(String(error));
  }
}
