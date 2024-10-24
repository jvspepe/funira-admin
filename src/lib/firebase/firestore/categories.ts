import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { firestore } from "@/lib/firebase/config";
import { converter } from "@/lib/utils";
import { TCategory } from "@/@types/category";

export async function createCategory(categoryData: TCategory) {
  try {
    await setDoc(
      doc(firestore, "categories", categoryData.uid).withConverter(
        converter<TCategory>(),
      ),
      {
        ...categoryData,
      },
    );
  } catch (error) {
    throw error;
  }
}

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
